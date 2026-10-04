"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateLevel } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";
import { extractJSON } from "@/lib/ai";
import type { ApiResponse } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

interface ReadinessResult {
  overallScore: number;
  entryLevelScore: number;
  graduateScore: number;
  fullStackScore: number;
  frontendScore: number;
  backendScore: number;
  
  strongAreas: string[];
  weakAreas: string[];
  missingRequirements: string[];
  recommendations: string[];
  priorities: string[];
}

export async function analyzeReadinessAction(): Promise<ApiResponse<ReadinessResult>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "readiness"), RATE_LIMITS.aiAnalysis);

    // 1. Fetch user dashboard variables
    const [githubProfile, resume, projectAnalyses, devScore] = await Promise.all([
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
      prisma.projectAnalysis.findMany({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
        take: 3,
      }),
      prisma.developerScore.findUnique({ where: { userId } }),
    ]);

    if (!githubProfile && !resume) {
      return {
        success: false,
        error: "Please complete your GitHub or Resume analysis first to provide inputs for the readiness engine.",
      };
    }

    // 2. Extract profile facts
    const githubLanguages = githubProfile ? JSON.parse(githubProfile.languages as string || "{}") : {};
    const resumeSkills = resume ? JSON.parse(resume.skills as string || "[]") as string[] : [];
    const projectList = projectAnalyses.map(p => ({ url: p.repoUrl, score: p.overallScore }));

    // 3. Trigger Gemini
    const prompt = `You are DevLeveler's Career Coach — an expert technical mentor, senior developer, and recruiter evaluating candidate career and internship readiness.
    
    Evaluate the readiness of the candidate based on these profiles:
    DEVELOPER SCORE: ${devScore?.overallScore ?? "Not calculated"}
    GITHUB LANGUAGES: ${JSON.stringify(githubLanguages)}
    RESUME SKILLS: ${JSON.stringify(resumeSkills)}
    PROJECTS AUDITED: ${JSON.stringify(projectList)}
    
    Return a structured JSON object evaluating readiness across multiple tracks:
    {
      "overallScore": 78,
      "entryLevelScore": 82,
      "graduateScore": 72,
      "fullStackScore": 68,
      "frontendScore": 78,
      "backendScore": 60,
      
      "strongAreas": ["List of 3-4 strong developer skills or qualities"],
      "weakAreas": ["List of 3-4 skill gaps or areas of improvement"],
      "missingRequirements": ["List of 3-4 missing items needed for hiring (e.g. testing, sql database, clean readme, public portfolio)"],
      "recommendations": ["List of 3-4 career recommendations for job matching"],
      "priorities": ["List of 3-4 immediate priorities to focus on this week"]
    }
    
    Rules under the HONEST GUIDANCE POLICY:
    - Never blindly agree with or praise the user. Avoid empty motivational fluff, generic encouragement, and vague career advice.
    - Act from a hiring manager's perspective. If the developer highlights weak or trivial projects (e.g. basic todo lists, weather apps, simple CRUD/tutorial clones) or lacks core computer science and engineering fundamentals (e.g., data structures, systems architecture, indexing, security, HTTP basics), point it out clearly under weakAreas and missingRequirements.
    - Prioritize production-level tools and practices: databases (SQL, Postgres, Mongo), unit/integration testing, Docker containerization, CI/CD pipelines, and clean code documentation.
    - TECHNOLOGY TRACK SCORING: Calculate fullStackScore, frontendScore, and backendScore (0-100) honestly based on their actual demonstrated experience. If they have no backend projects/languages, their backendScore should be very low.
    - overallScore represents internship/junior readiness (0-100).
    - entryLevelScore: suitability for Junior roles (0-100).
    - graduateScore: suitability for Graduate Engineer tracks (0-100).
    - Never use expressions like "AI", "AI mentor", "large language model", or "chatbot". Refer to yourself only as "Career Coach".
    - Return ONLY the JSON object. Do not wrap in extra commentary or text.`;

    const { executeWithObservabilityAndCache, CACHE_TTL } = await import("@/lib/ai");
    const analysis = await executeWithObservabilityAndCache<ReadinessResult>({
      feature: "readiness",
      action: "analyze",
      userId,
      context: {
        devScore: devScore ? devScore.overallScore : 0,
        githubLanguages,
        resumeSkills,
        projectCount: projectList.length,
      },
      prompt,
      options: { json: true },
      ttlSeconds: CACHE_TTL.READINESS,
      parseResult: (raw) => extractJSON<ReadinessResult>(raw),
    });

    // 4. Save to Database
    await prisma.readinessAnalysis.upsert({
      where: { userId },
      update: {
        overallScore: analysis.overallScore,
        entryLevelScore: analysis.entryLevelScore,
        graduateScore: analysis.graduateScore,
        fullStackScore: analysis.fullStackScore,
        frontendScore: analysis.frontendScore,
        backendScore: analysis.backendScore,
        strongAreas: JSON.stringify(analysis.strongAreas),
        weakAreas: JSON.stringify(analysis.weakAreas),
        missingRequirements: JSON.stringify(analysis.missingRequirements),
        recommendations: JSON.stringify(analysis.recommendations),
        priorities: JSON.stringify(analysis.priorities),
        analyzedAt: new Date(),
      },
      create: {
        userId,
        overallScore: analysis.overallScore,
        entryLevelScore: analysis.entryLevelScore,
        graduateScore: analysis.graduateScore,
        fullStackScore: analysis.fullStackScore,
        frontendScore: analysis.frontendScore,
        backendScore: analysis.backendScore,
        strongAreas: JSON.stringify(analysis.strongAreas),
        weakAreas: JSON.stringify(analysis.weakAreas),
        missingRequirements: JSON.stringify(analysis.missingRequirements),
        recommendations: JSON.stringify(analysis.recommendations),
        priorities: JSON.stringify(analysis.priorities),
      },
    });

    // 5. Award XP
    const existingReadiness = await prisma.xPHistory.findFirst({
      where: { userId, category: "interview", reason: { startsWith: "Readiness" } },
    });

    if (!existingReadiness) {
      const reward = { amount: 300, reason: "Readiness Analysis Completed", category: "interview" };

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true },
      });

      if (user) {
        const newXP = user.xp + reward.amount;
        const levelInfo = calculateLevel(newXP);

        await prisma.$transaction([
          prisma.xPHistory.create({
            data: {
              userId,
              amount: reward.amount,
              reason: reward.reason,
              category: reward.category,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: {
              xp: newXP,
              level: levelInfo.level,
            },
          }),
        ]);
      }
    }

    // 6. Check/unlock achievements
    if (analysis.overallScore >= 80) {
      await unlockAchievement(userId, "internship_ready");
    }

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Error in analyzeReadinessAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Readiness analysis failed",
    };
  }
}

export async function getReadinessAnalysisAction(): Promise<ApiResponse<ReadinessResult | null>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const readiness = await prisma.readinessAnalysis.findUnique({
      where: { userId: session.user.id },
    });

    if (!readiness) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: {
        overallScore: readiness.overallScore,
        entryLevelScore: readiness.entryLevelScore,
        graduateScore: readiness.graduateScore,
        fullStackScore: readiness.fullStackScore,
        frontendScore: readiness.frontendScore,
        backendScore: readiness.backendScore,
        strongAreas: JSON.parse(readiness.strongAreas as string || "[]") as string[],
        weakAreas: JSON.parse(readiness.weakAreas as string || "[]") as string[],
        missingRequirements: JSON.parse(readiness.missingRequirements as string || "[]") as string[],
        recommendations: JSON.parse(readiness.recommendations as string || "[]") as string[],
        priorities: JSON.parse(readiness.priorities as string || "[]") as string[],
      },
    };
  } catch (error) {
    console.error("Error in getReadinessAnalysisAction:", error);
    return { success: false, error: "Failed to load readiness analysis" };
  }
}
