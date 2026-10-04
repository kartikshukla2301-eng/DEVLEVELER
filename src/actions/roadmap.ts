"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateRoadmap } from "@/lib/gemini";
import { calculateLevel, XP_REWARDS } from "@/lib/xp";
import { calculateScore } from "@/actions/score";
import { unlockAchievement } from "@/lib/achievements";
import { createNotificationAction } from "@/actions/notifications";
import type { ApiResponse, RoadmapData, RoadmapGoal } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export async function generateRoadmapAction(
  role: string
): Promise<ApiResponse<RoadmapData>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "roadmap"), RATE_LIMITS.aiAnalysis);

    // SaaS Plan limit check: Free plan users can only generate 1 roadmap
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    if (userProfile?.plan === "FREE") {
      const roadmapCount = await prisma.roadmap.count({
        where: { userId },
      });
      if (roadmapCount >= 1) {
        return {
          success: false,
          error: "Roadmap regeneration is restricted on the Free plan. Upgrade to Pro to regenerate your roadmap.",
        };
      }
    }

    // 1. Fetch user data (GitHub + Resume + Skill Gap)
    const [githubProfile, resume, skillGap] = await Promise.all([
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
      prisma.skillGap.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
    ]);

    if (!githubProfile && !resume) {
      return {
        success: false,
        error: "Please connect your GitHub or upload a resume first so we can analyze your skills.",
      };
    }

    // 2. Extract skills and gaps
    const currentSkills: string[] = [];
    if (githubProfile) {
      const parsedLangs = JSON.parse(githubProfile.languages as string || "[]") as Array<{ name: string }>;
      currentSkills.push(...parsedLangs.map((l) => l.name));
    }
    if (resume) {
      const parsedSkills = JSON.parse(resume.skills as string || "[]") as string[];
      currentSkills.push(...parsedSkills);
    }

    const gaps: string[] = [];
    if (skillGap) {
      const parsedMissing = JSON.parse(skillGap.missingSkills as string || "[]") as Array<{ name: string }>;
      gaps.push(...parsedMissing.map((s) => s.name));
    } else {
      // Fallback gaps if none calculated yet
      gaps.push("System Design", "Docker", "CI/CD Pipelines", "Testing");
    }

    // 3. Call Gemini service
    const roadmap = await generateRoadmap(
      Array.from(new Set(currentSkills)),
      gaps,
      role,
      userId
    );

    // 4. Check if user already had an active roadmap (to decide whether to award XP)
    const existingRoadmap = await prisma.roadmap.findFirst({
      where: { userId },
    });

    // 5. Store in database
    const saved = await prisma.roadmap.create({
      data: {
        userId,
        title: roadmap.title,
        weeklyGoals: JSON.stringify(roadmap.weeklyGoals),
        monthlyGoals: JSON.stringify(roadmap.monthlyGoals),
        projectIdeas: JSON.stringify(roadmap.projectIdeas),
        techStack: JSON.stringify(roadmap.techStack),
        status: "active",
      },
    });

    // 6. Award XP if this is the first roadmap generated
    if (!existingRoadmap) {
      const reward = XP_REWARDS.ROADMAP_GENERATED;

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

    // 7. Update developer score
    await calculateScore(userId);

    // Check/unlock achievements
    await unlockAchievement(userId, "career_architect");

    // Trigger Notification
    await createNotificationAction(
      userId,
      "New Career Roadmap Generated",
      `Your 12-week roadmap for ${saved.title} is ready! Check out your goals and recommended projects.`,
      "ROADMAP"
    );

    return {
      success: true,
      data: {
        id: saved.id,
        title: saved.title,
        weeklyGoals: roadmap.weeklyGoals,
        monthlyGoals: roadmap.monthlyGoals,
        projectIdeas: roadmap.projectIdeas,
        techStack: roadmap.techStack,
        status: "active",
      },
    };
  } catch (error) {
    console.error("Error in generateRoadmapAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Roadmap generation failed",
    };
  }
}

export async function toggleRoadmapGoalAction(
  roadmapId: string,
  goalId: string,
  completed: boolean,
  type: "week" | "month"
): Promise<ApiResponse<boolean>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap || roadmap.userId !== session.user.id) {
      return { success: false, error: "Roadmap not found" };
    }

    if (type === "week") {
      const weekly = JSON.parse(roadmap.weeklyGoals as string || "[]") as RoadmapGoal[];
      const updated = weekly.map((g) => (g.id === goalId ? { ...g, completed } : g));

      await prisma.roadmap.update({
        where: { id: roadmapId },
        data: {
          weeklyGoals: JSON.stringify(updated),
        },
      });
    } else {
      const monthly = JSON.parse(roadmap.monthlyGoals as string || "[]") as RoadmapGoal[];
      const updated = monthly.map((g) => (g.id === goalId ? { ...g, completed } : g));

      await prisma.roadmap.update({
        where: { id: roadmapId },
        data: {
          monthlyGoals: JSON.stringify(updated),
        },
      });
    }

    return { success: true, data: true };
  } catch (error) {
    console.error("Error in toggleRoadmapGoalAction:", error);
    return { success: false, error: "Failed to update goal state" };
  }
}
