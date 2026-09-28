"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateLinkedInAnalysis, generateDeveloperIntelligenceReport } from "@/lib/gemini";
import type { ApiResponse } from "@/types";
import { calculateLevel } from "@/lib/xp";
import { calculateScore } from "@/actions/score";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

import { revalidatePath } from "next/cache";

export interface FormattedReport {
  id: string;
  userId: string;
  summary: string;
  readinessScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerAlignment: unknown;
  milestones: unknown[];
  skillGapMatrix: unknown;
  cachedAt: string;
  isStale?: boolean;
  linkedin?: string;
  resume?: string;
  portfolio?: string;
}

interface RawReport {
  id: string;
  userId: string;
  summary: string;
  readinessScore: number;
  strengths: unknown;
  weaknesses: unknown;
  recommendations: unknown;
  careerAlignment: unknown;
  milestones: unknown;
  skillGapMatrix: unknown;
  cachedAt: Date;
}

function formatReport(report: RawReport): FormattedReport {
  const parseJson = (val: unknown, fallback: string): unknown => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val || fallback);
      } catch {
        return JSON.parse(fallback);
      }
    }
    return val || JSON.parse(fallback);
  };

  return {
    id: report.id,
    userId: report.userId,
    summary: report.summary,
    readinessScore: report.readinessScore,
    strengths: (parseJson(report.strengths, "[]") as string[]) || [],
    weaknesses: (parseJson(report.weaknesses, "[]") as string[]) || [],
    recommendations: (parseJson(report.recommendations, "[]") as string[]) || [],
    careerAlignment: parseJson(report.careerAlignment, "{}"),
    milestones: (parseJson(report.milestones, "[]") as unknown[]) || [],
    skillGapMatrix: parseJson(report.skillGapMatrix, "{}"),
    cachedAt: report.cachedAt.toISOString(),
  };
}

export async function analyzeLinkedInAction(
  url: string,
  rawText?: string
): Promise<ApiResponse<unknown>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "linkedin"), RATE_LIMITS.aiAnalysis);

    // Validate URL
    if (!url.includes("linkedin.com/")) {
      return { success: false, error: "Please enter a valid LinkedIn profile URL" };
    }

    // 1. If rawText is not provided, try to extract some context from user's resume
    let contextText = rawText || "";
    if (!contextText.trim()) {
      const latestResume = await prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" }
      });
      if (latestResume && latestResume.rawText) {
        contextText = `Based on Resume metadata:\n${latestResume.rawText}`;
      } else {
        contextText = "No copy-pasted text profile details provided. General software engineer profile.";
      }
    }

    // 2. Perform AI audit
    const analysisResult = await generateLinkedInAnalysis(contextText, url);

    // 3. Check if user already had LinkedIn analysis (to calculate XP award)
    const existing = await prisma.linkedInAnalysis.findUnique({
      where: { userId }
    });

    // 4. Save to Database + sync connectedAccounts in one query
    const saved = await prisma.linkedInAnalysis.upsert({
      where: { userId },
      update: {
        url,
        headline: analysisResult.headline,
        summary: analysisResult.summary,
        experience: JSON.stringify(analysisResult.experience),
        education: JSON.stringify(analysisResult.education),
        skills: JSON.stringify(analysisResult.skills),
        analysis: JSON.stringify(analysisResult.analysis),
        rawText: contextText,
        analyzedAt: new Date()
      },
      create: {
        userId,
        url,
        headline: analysisResult.headline,
        summary: analysisResult.summary,
        experience: JSON.stringify(analysisResult.experience),
        education: JSON.stringify(analysisResult.education),
        skills: JSON.stringify(analysisResult.skills),
        analysis: JSON.stringify(analysisResult.analysis),
        rawText: contextText
      }
    });

    // 5. Award XP if first-time + sync connectedAccounts
    const userForSync = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, connectedAccounts: true }
    });

    let connectedAccounts: Record<string, string> = {};
    if (userForSync?.connectedAccounts) {
      try {
        connectedAccounts = typeof userForSync.connectedAccounts === "string"
          ? JSON.parse(userForSync.connectedAccounts)
          : (userForSync.connectedAccounts as Record<string, string>) || {};
      } catch {}
    }
    connectedAccounts.linkedin = url;

    if (!existing && userForSync) {
      const xpReward = 150;
      const newXP = userForSync.xp + xpReward;
      const levelInfo = calculateLevel(newXP);
      await prisma.$transaction([
        prisma.xPHistory.create({
          data: { userId, amount: xpReward, reason: "Synced LinkedIn professional profile", category: "linkedin" }
        }),
        prisma.user.update({
          where: { id: userId },
          data: { xp: newXP, level: levelInfo.level, connectedAccounts }
        })
      ]);
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { connectedAccounts }
      });
    }

    // Trigger score recalculation and report regeneration in parallel
    await Promise.all([
      calculateScore(userId),
      generateUnifiedReportAction()
    ]);

    return { success: true, data: saved };
  } catch (error) {
    console.error("Error in analyzeLinkedInAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze LinkedIn profile"
    };
  }
}

export async function generateUnifiedReportAction(): Promise<ApiResponse<FormattedReport>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "intelligence"), RATE_LIMITS.aiAnalysis);

    // 1. Gather all profile sources
    const [user, github, resume, portfolio, linkedin] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { careerGoals: true, customSkills: true }
      }),
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" }
      }),
      prisma.portfolioAnalysis.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" }
      }),
      prisma.linkedInAnalysis.findUnique({ where: { userId } })
    ]);

    // Parse user goals
    let userGoals: string[] = [];
    if (user?.careerGoals) {
      try {
        userGoals = typeof user.careerGoals === "string"
          ? JSON.parse(user.careerGoals || "[]")
          : (user.careerGoals as string[]);
      } catch {}
    }

    // Clean data for LLM processing
    const promptData = {
      github: github ? {
        username: github.username,
        publicRepos: github.publicRepos,
        followers: github.followers,
        totalStars: github.totalStars,
        languages: typeof github.languages === "string" ? JSON.parse(github.languages || "{}") : github.languages,
        topRepos: typeof github.topRepos === "string" ? JSON.parse(github.topRepos || "[]") : github.topRepos,
        scores: {
          activity: github.activityScore,
          health: github.repoHealth,
          overall: github.githubScore
        }
      } : null,
      resume: resume ? {
        fileName: resume.fileName,
        skills: typeof resume.skills === "string" ? JSON.parse(resume.skills || "[]") : resume.skills,
        atsScore: resume.atsScore,
        qualityScore: resume.qualityScore,
        summary: resume.summary
      } : null,
      portfolio: portfolio ? {
        url: portfolio.url,
        performance: portfolio.performanceScore,
        seo: portfolio.seoScore,
        design: portfolio.designScore,
        accessibility: portfolio.accessScore
      } : null,
      linkedin: linkedin ? {
        headline: linkedin.headline,
        summary: linkedin.summary,
        experience: typeof linkedin.experience === "string" ? JSON.parse(linkedin.experience || "[]") : linkedin.experience,
        skills: typeof linkedin.skills === "string" ? JSON.parse(linkedin.skills || "[]") : linkedin.skills,
        analysis: typeof linkedin.analysis === "string" ? JSON.parse(linkedin.analysis || "{}") : linkedin.analysis
      } : null,
      userGoals
    };

    // 2. Synthesize with Gemini
    const report = await generateDeveloperIntelligenceReport(promptData);

    // 3. Check if user already had a report (for XP award)
    const existingReport = await prisma.developerIntelligenceReport.findUnique({
      where: { userId }
    });

    // 4. Save to Database
    const savedReport = await prisma.developerIntelligenceReport.upsert({
      where: { userId },
      update: {
        summary: report.summary,
        readinessScore: report.readinessScore,
        strengths: JSON.stringify(report.strengths),
        weaknesses: JSON.stringify(report.weaknesses),
        recommendations: JSON.stringify(report.recommendations),
        careerAlignment: JSON.stringify({
          alignment: report.careerAlignment,
          readinessScores: report.readinessScores
        }),
        milestones: JSON.stringify(report.milestones),
        skillGapMatrix: JSON.stringify(report.skillGapMatrix),
        cachedAt: new Date()
      },
      create: {
        userId,
        summary: report.summary,
        readinessScore: report.readinessScore,
        strengths: JSON.stringify(report.strengths),
        weaknesses: JSON.stringify(report.weaknesses),
        recommendations: JSON.stringify(report.recommendations),
        careerAlignment: JSON.stringify({
          alignment: report.careerAlignment,
          readinessScores: report.readinessScores
        }),
        milestones: JSON.stringify(report.milestones),
        skillGapMatrix: JSON.stringify(report.skillGapMatrix)
      }
    });

    // 5. Award XP if first-time report compiled
    if (!existingReport) {
      const xpReward = 200;
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true }
      });
      if (dbUser) {
        const newXP = dbUser.xp + xpReward;
        const levelInfo = calculateLevel(newXP);
        await prisma.$transaction([
          prisma.xPHistory.create({
            data: { userId, amount: xpReward, reason: "Generated Unified Developer Intelligence Report", category: "roadmap" }
          }),
          prisma.user.update({
            where: { id: userId },
            data: { xp: newXP, level: levelInfo.level }
          })
        ]);
      }
    }

    try {
      revalidatePath("/dashboard/intelligence");
      revalidatePath("/dashboard");
    } catch {}

    return {
      success: true,
      data: {
        ...formatReport(savedReport),
        linkedin: linkedin ? linkedin.url : undefined,
        resume: resume ? resume.fileName : undefined,
        portfolio: portfolio ? portfolio.url : undefined
      }
    };
  } catch (error) {
    console.error("Error in generateUnifiedReportAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to compile developer intelligence report"
    };
  }
}

export async function getUnifiedReportAction(): Promise<ApiResponse<FormattedReport>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    // Fetch report, github, linkedin, resume, and portfolio in parallel
    const [report, github, linkedin, resume, portfolio] = await Promise.all([
      prisma.developerIntelligenceReport.findUnique({
        where: { userId }
      }),
      prisma.gitHubProfile.findUnique({
        where: { userId },
        select: { analyzedAt: true, updatedAt: true }
      }),
      prisma.linkedInAnalysis.findUnique({
        where: { userId },
        select: { url: true, analyzedAt: true }
      }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
        select: { fileName: true, analyzedAt: true }
      }),
      prisma.portfolioAnalysis.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
        select: { url: true, analyzedAt: true }
      })
    ]);

    // If report doesn't exist, try to compile it on the fly
    if (!report) {
      const rebuild = await generateUnifiedReportAction();
      if (rebuild.success && rebuild.data) {
        return rebuild;
      }
      return {
        success: true,
        data: {
          id: "",
          userId,
          summary: "Your Developer Intelligence Report is ready to be compiled. Click 'Re-Sync Report' above to generate it.",
          readinessScore: 0,
          strengths: [],
          weaknesses: [],
          recommendations: [],
          careerAlignment: {},
          milestones: [],
          skillGapMatrix: {},
          cachedAt: new Date().toISOString(),
          isStale: false,
          linkedin: linkedin ? linkedin.url : undefined,
          resume: resume ? resume.fileName : undefined,
          portfolio: portfolio ? portfolio.url : undefined
        }
      };
    }

    // Check if report is stale compared to latest telemetry updates
    const reportTime = new Date(report.cachedAt).getTime();
    const githubTime = Math.max(
      github?.analyzedAt ? new Date(github.analyzedAt).getTime() : 0,
      github?.updatedAt ? new Date(github.updatedAt).getTime() : 0
    );
    const linkedinTime = linkedin?.analyzedAt ? new Date(linkedin.analyzedAt).getTime() : 0;
    const resumeTime = resume?.analyzedAt ? new Date(resume.analyzedAt).getTime() : 0;
    const portfolioTime = portfolio?.analyzedAt ? new Date(portfolio.analyzedAt).getTime() : 0;

    const isStale =
      githubTime > reportTime ||
      linkedinTime > reportTime ||
      resumeTime > reportTime ||
      portfolioTime > reportTime;

    return {
      success: true,
      data: {
        ...formatReport(report),
        isStale,
        linkedin: linkedin ? linkedin.url : undefined,
        resume: resume ? resume.fileName : undefined,
        portfolio: portfolio ? portfolio.url : undefined
      }
    };
  } catch (error) {
    console.error("Error in getUnifiedReportAction:", error);
    return { success: false, error: "Failed to load report" };
  }
}

export async function invalidateIntelligenceReportAction(): Promise<ApiResponse<{ invalidated: boolean }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    await prisma.developerIntelligenceReport.deleteMany({
      where: { userId: session.user.id }
    });
    try {
      revalidatePath("/dashboard/intelligence");
    } catch {}
    return { success: true, data: { invalidated: true } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to invalidate report"
    };
  }
}
