"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateSkillGapAnalysis } from "@/lib/gemini";
import type { ApiResponse, SkillGapAnalysis } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export async function analyzeSkillGaps(
  userId: string
): Promise<ApiResponse<SkillGapAnalysis>> {
  try {
    const session = await auth();
    if (!session || session.user?.id !== userId) {
      return { success: false, error: "Unauthorized access" };
    }

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "skills"), RATE_LIMITS.aiAnalysis);

    // 1. Fetch user, GitHub profile, latest resume, portfolios
    const [user, githubProfile, resume, portfolios] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { careerGoals: true, customSkills: true }
      }),
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
      prisma.portfolioAnalysis.findMany({
        where: { userId },
        orderBy: { analyzedAt: "desc" }
      })
    ]);

    // Ensure we have at least one source of skills
    if (!githubProfile && !resume && (!user || JSON.parse(user.customSkills as string || "[]").length === 0)) {
      return {
        success: false,
        error: "Please analyze your GitHub, upload a resume, or customize your skills list first to get skill insights.",
      };
    }

    // 2. Extract and format data
    const githubLanguages: string[] = [];
    if (githubProfile) {
      try {
        const parsedLangs = typeof githubProfile.languages === "string"
          ? JSON.parse(githubProfile.languages || "{}")
          : githubProfile.languages;
        
        // Handle object format e.g. { "TypeScript": 1234 } or array format
        if (parsedLangs && typeof parsedLangs === "object") {
          if (Array.isArray(parsedLangs)) {
            githubLanguages.push(...parsedLangs.map((l: unknown) => {
              if (l && typeof l === "object" && "name" in l) {
                return String((l as { name: unknown }).name || "");
              }
              return String(l || "");
            }));
          } else {
            githubLanguages.push(...Object.keys(parsedLangs));
          }
        }
      } catch (e) {
        console.error("Error parsing github languages:", e);
      }
    }

    const resumeSkills: string[] = [];
    const experienceDetails: string[] = [];
    const educationDetails: string[] = [];
    if (resume) {
      try {
        const parsedSkills = typeof resume.skills === "string" ? JSON.parse(resume.skills || "[]") : resume.skills;
        if (Array.isArray(parsedSkills)) {
          resumeSkills.push(...parsedSkills);
        }
      } catch {}
      try {
        const parsedExp = typeof resume.experience === "string" ? JSON.parse(resume.experience || "[]") : resume.experience;
        if (Array.isArray(parsedExp)) {
          parsedExp.forEach((e: unknown) => {
            if (typeof e === "string") experienceDetails.push(e);
            else if (e && typeof e === "object") {
              const expObj = e as Record<string, unknown>;
              experienceDetails.push(`${String(expObj.role || expObj.title || "")} at ${String(expObj.company || "")}: ${String(expObj.description || "")}`);
            }
          });
        }
      } catch {}
      try {
        const parsedEdu = typeof resume.education === "string" ? JSON.parse(resume.education || "[]") : resume.education;
        if (Array.isArray(parsedEdu)) {
          parsedEdu.forEach((edu: unknown) => {
            if (typeof edu === "string") educationDetails.push(edu);
            else if (edu && typeof edu === "object") {
              const eduObj = edu as Record<string, unknown>;
              educationDetails.push(`${String(eduObj.degree || "")} in ${String(eduObj.field || eduObj.major || "")}, ${String(eduObj.school || eduObj.institution || "")}`);
            }
          });
        }
      } catch {}
    }

    const portfolioTelemetry: string[] = [];
    if (portfolios && portfolios.length > 0) {
      portfolios.forEach(p => {
        portfolioTelemetry.push(`URL: ${p.url}. Scores: SEO ${p.seoScore}, Performance ${p.performanceScore}, Design ${p.designScore}. Recommendations: ${JSON.stringify(p.recommendations)}`);
      });
    }

    const careerGoals: string[] = [];
    if (user?.careerGoals) {
      try {
        const goals = typeof user.careerGoals === "string" ? JSON.parse(user.careerGoals || "[]") : user.careerGoals;
        if (Array.isArray(goals)) careerGoals.push(...goals);
      } catch {}
    }

    const customSkills: string[] = [];
    if (user?.customSkills) {
      try {
        const custom = typeof user.customSkills === "string" ? JSON.parse(user.customSkills || "[]") : user.customSkills;
        if (Array.isArray(custom)) customSkills.push(...custom);
      } catch {}
    }

    // Combine skills for currentSkills list
    const combinedCurrentSkills = Array.from(new Set([...resumeSkills, ...githubLanguages, ...customSkills]));

    // 3. Generate analysis from Gemini
    const analysis = await generateSkillGapAnalysis(
      combinedCurrentSkills,
      githubLanguages,
      careerGoals,
      experienceDetails,
      educationDetails,
      portfolioTelemetry,
      userId
    );

    // 4. Save to database
    await prisma.skillGap.create({
      data: {
        userId,
        currentSkills: JSON.stringify(analysis.currentSkills),
        missingSkills: JSON.stringify(analysis.missingSkills),
        recommendations: JSON.stringify(analysis.recommendations),
        priority: "medium",
      },
    });

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Error in analyzeSkillGaps:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Skill gap analysis failed",
    };
  }
}
