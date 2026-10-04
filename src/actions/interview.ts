"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateInterviewQuestions } from "@/lib/gemini";
import { extractJSON } from "@/lib/ai";
import { calculateLevel, XP_REWARDS } from "@/lib/xp";
import { calculateScore } from "@/actions/score";
import type { ApiResponse, InterviewQuestion } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export async function generateInterviewSessionAction(
  type: "hr" | "technical" | "project"
): Promise<ApiResponse<{ id: string; questions: InterviewQuestion[] }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "interview"), RATE_LIMITS.aiAnalysis);

    // SaaS Plan limit check: Free plan users can only practice 1 interview session
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    const interviewCount = await prisma.interviewSession.count({
      where: { userId },
    });

    if (userProfile?.plan === "FREE" && interviewCount >= 1) {
      return {
        success: false,
        error: "Interview preparation limit reached on the Free plan. Upgrade to Pro for unlimited interview sessions.",
      };
    }

    // 1. Fetch user skills
    const [githubProfile, resume] = await Promise.all([
      prisma.gitHubProfile.findUnique({ where: { userId } }),
      prisma.resume.findFirst({
        where: { userId },
        orderBy: { analyzedAt: "desc" },
      }),
    ]);

    if (!githubProfile && !resume) {
      return {
        success: false,
        error: "Please connect your GitHub or upload a resume first so we can tailor the questions to your tech stack.",
      };
    }

    const skills: string[] = [];
    if (githubProfile) {
      const parsedLangs = JSON.parse(githubProfile.languages as string || "[]") as Array<{ name: string }>;
      skills.push(...parsedLangs.map((l) => l.name));
    }
    if (resume) {
      const parsedSkills = JSON.parse(resume.skills as string || "[]") as string[];
      skills.push(...parsedSkills);
    }

    const uniqueSkills = Array.from(new Set(skills));

    // 2. Call Gemini
    const questions = await generateInterviewQuestions(
      uniqueSkills.length > 0 ? uniqueSkills : ["TypeScript", "React", "System Design"],
      type,
      userId
    );

    // 3. Store session in DB
    const saved = await prisma.interviewSession.create({
      data: {
        userId,
        type,
        questions: JSON.stringify(questions),
        skillFocus: JSON.stringify(uniqueSkills.slice(0, 5)),
        difficulty: "intermediate",
      },
    });

    // 4. Award XP for starting interview practice (once per session generation)
    if (interviewCount <= 1) {
      const reward = XP_REWARDS.INTERVIEW_COMPLETED;

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

    // 5. Update developer score
    await calculateScore(userId);

    return {
      success: true,
      data: {
        id: saved.id,
        questions,
      },
    };
  } catch (error) {
    console.error("Error in generateInterviewSessionAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Interview question generation failed",
    };
  }
}

export interface AnswerEvaluation {
  score: number;
  feedback: string;
  improvedAnswer: string;
}

export async function submitInterviewAnswerAction(
  questionText: string,
  userAnswer: string
): Promise<ApiResponse<AnswerEvaluation>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const prompt = `Evaluate this interview answer. Score 0-100, be honest but constructive.

Question: ${questionText}
Answer: ${userAnswer}

Return JSON:
{
  "score": 0-100,
  "feedback": "What they did well and where to improve",
  "improvedAnswer": "Optimized professional response"
}
Check technical correctness, clarity, structured reasoning. Return ONLY the JSON.`;

    const { executeWithObservabilityAndCache } = await import("@/lib/ai");
    const evaluation = await executeWithObservabilityAndCache<AnswerEvaluation>({
      feature: "interview",
      action: "evaluate_answer",
      userId: session.user.id,
      context: { question: questionText.trim(), answer: userAnswer.trim() },
      prompt,
      options: { json: true },
      ttlSeconds: 7 * 24 * 3600,
      parseResult: (raw) => extractJSON<AnswerEvaluation>(raw),
    });

    return { success: true, data: evaluation };
  } catch (error) {
    console.error("Error in submitInterviewAnswerAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to evaluate answer",
    };
  }
}
