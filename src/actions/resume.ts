"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { analyzeResume } from "@/lib/gemini";
import { validateResumeUpload } from "@/lib/validators";
import { calculateLevel, XP_REWARDS } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";
import { calculateScore } from "@/actions/score";
import type { ApiResponse, ResumeAnalysis } from "@/types";
import { PDFParse } from "pdf-parse";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export async function analyzeResumeAction(
  formData: FormData
): Promise<ApiResponse<ResumeAnalysis>> {
  try {
    // 1. Authenticate user session
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized access." };
    }
    const userId = session.user.id;

    // 2. Rate limit check
    enforceRateLimit(rateLimitKey(userId, "resume"), RATE_LIMITS.analysis);

    // 3. SaaS Plan limit check: Free plan users can only upload 1 resume
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    const resumeCount = await prisma.resume.count({
      where: { userId },
    });

    if (userProfile?.plan === "FREE" && resumeCount >= 1) {
      return {
        success: false,
        error: "Resume analysis limit reached on the Free plan. Upgrade to Pro for unlimited resume audits.",
      };
    }

    const firstResume = resumeCount === 0;

    // 3. Validate the file upload
    const validation = validateResumeUpload(formData);
    if (!validation.success || !validation.file) {
      return { success: false, error: validation.error ?? "Invalid file" };
    }

    const file = validation.file;

    // 4. Read PDF file text using pdf-parse PDFParse class
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      return { success: false, error: "Could not extract text from the PDF" };
    }

    // 5. Analyze text with Gemini (with userId context & observability)
    const analysis = await analyzeResume(text, userId);

    // Invalidate stale intelligence & readiness caches when a new resume is uploaded
    const { invalidateUserAICache } = await import("@/lib/ai");
    await invalidateUserAICache(userId, "readiness").catch(() => {});
    await invalidateUserAICache(userId, "intelligence").catch(() => {});

    // 6. Save to database
    await prisma.resume.create({
      data: {
        userId,
        fileName: file.name,
        rawText: text,
        skills: JSON.stringify(analysis.skills),
        education: JSON.stringify(analysis.education),
        experience: JSON.stringify(analysis.experience),
        projects: JSON.stringify(analysis.projects),
        certifications: JSON.stringify(analysis.certifications),
        atsScore: analysis.atsScore,
        qualityScore: analysis.qualityScore,
        missingKeywords: JSON.stringify(analysis.missingKeywords),
        suggestions: JSON.stringify(analysis.suggestions),
        summary: analysis.summary,
      },
    });

    // Award XP for first resume analysis
    if (firstResume) {
      const reward = XP_REWARDS.RESUME_UPLOADED;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true },
      });
      if (user) {
        const newXP = user.xp + reward.amount;
        const levelInfo = calculateLevel(newXP);
        await prisma.$transaction([
          prisma.xPHistory.create({
            data: { userId, amount: reward.amount, reason: reward.reason, category: reward.category },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { xp: newXP, level: levelInfo.level },
          }),
        ]);
      }
    }

    await unlockAchievement(userId, "first_analysis");
    if (analysis.atsScore >= 80) {
      await unlockAchievement(userId, "resume_optimized");
    }
    await calculateScore(userId);

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Error in analyzeResumeAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Resume analysis failed",
    };
  }
}
