"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ai, extractJSON } from "@/lib/ai";
import type { ApiResponse } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export interface CoachInsights {
  summary: string;
  improveScore: {
    rating: string;
    tips: string[];
  };
  learnNext: {
    rating: string;
    tips: string[];
  };
  projectsToBuild: {
    rating: string;
    tips: string[];
  };
  internshipReady: {
    status: "Ready" | "Almost Ready" | "Needs Work";
    tips: string[];
  };
}

export async function getCareerCoachInsightsAction(): Promise<ApiResponse<CoachInsights>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "coach"), RATE_LIMITS.aiAnalysis);

    // Fetch user profiles
    const [githubProfile, resume, devScore, skillGap] = await Promise.all([
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
      prisma.developerScore.findUnique({ where: { userId } }),
      prisma.skillGap.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
    ]);

    if (!githubProfile && !resume) {
      return {
        success: false,
        error: "Please connect your GitHub or upload a resume first to generate Career Coach insights.",
      };
    }

    // Prepare context
    const context = {
      github: githubProfile
        ? {
            username: githubProfile.username,
            publicRepos: githubProfile.publicRepos,
            totalStars: githubProfile.totalStars,
            languages: JSON.parse(githubProfile.languages as string || "[]"),
          }
        : null,
      resume: resume
        ? {
            skills: JSON.parse(resume.skills as string || "[]"),
            experienceCount: (JSON.parse(resume.experience as string || "[]") as Array<unknown>).length,
            atsScore: resume.atsScore,
          }
        : null,
      devScore: devScore
        ? {
            overallScore: devScore.overallScore,
            rank: devScore.rank,
            level: devScore.level,
          }
        : null,
      skillGap: skillGap
        ? {
            missingSkills: JSON.parse(skillGap.missingSkills as string || "[]"),
            recommendations: JSON.parse(skillGap.recommendations as string || "[]"),
          }
        : null,
    };

    const prompt = `Analyze this developer profile and generate career growth insights. Be honest, not motivational.

Context: ${JSON.stringify(context)}

Return JSON:
{
  "summary": "2-sentence career summary",
  "improveScore": { "rating": "...", "tips": ["..."] },
  "learnNext": { "rating": "...", "tips": ["..."] },
  "projectsToBuild": { "rating": "...", "tips": ["..."] },
  "internshipReady": { "status": "Ready|Almost Ready|Needs Work", "tips": ["..."] }
}
Return ONLY the JSON.`;

    const { executeWithObservabilityAndCache, CACHE_TTL } = await import("@/lib/ai");
    const insights = await executeWithObservabilityAndCache<CoachInsights>({
      feature: "coach",
      action: "insights",
      userId,
      context,
      prompt,
      options: { json: true },
      ttlSeconds: CACHE_TTL.DEFAULT,
      parseResult: (raw) => extractJSON<CoachInsights>(raw),
    });

    return { success: true, data: insights };
  } catch (error) {
    console.error("Error in getCareerCoachInsightsAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load coach insights",
    };
  }
}

export async function askCareerCoachAction(
  question: string,
  history: { role: "user" | "model"; parts: string }[]
): Promise<ApiResponse<string>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "coach-chat"), RATE_LIMITS.aiAnalysis);

    // Fetch user profiles for context
    const [githubProfile, resume, devScore, skillGap] = await Promise.all([
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
      prisma.developerScore.findUnique({ where: { userId } }),
      prisma.skillGap.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
    ]);

    const context = {
      github: githubProfile ? { username: githubProfile.username, languages: JSON.parse(githubProfile.languages as string || "[]") } : null,
      resume: resume ? { skills: JSON.parse(resume.skills as string || "[]"), atsScore: resume.atsScore } : null,
      devScore: devScore ? { overallScore: devScore.overallScore, rank: devScore.rank } : null,
      skillGap: skillGap ? { missingSkills: JSON.parse(skillGap.missingSkills as string || "[]") } : null,
    };

    const systemPrompt = `You are a Career Coach. Analyze developer profiles and give honest, evidence-based advice. Be direct, not motivational.

Developer Context: ${JSON.stringify(context)}

Rules: No blind agreement. Flag weak projects/fundamentals. Concise, actionable, markdown-formatted. Focus on metrics, projects, skills. Never say "AI" or "assistant".`;

    const chatSession = ai().startChat(history, systemPrompt);
    const response = await chatSession.sendMessage(question);

    return { success: true, data: response };
  } catch (error) {
    console.error("Error in askCareerCoachAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate answer",
    };
  }
}
