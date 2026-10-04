"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { portfolioUrlSchema } from "@/lib/validators";
import { calculateLevel, XP_REWARDS } from "@/lib/xp";
import { calculateScore } from "@/actions/score";
import { unlockAchievement } from "@/lib/achievements";
import { extractJSON } from "@/lib/ai";
import type { ApiResponse, PortfolioAnalysisData } from "@/types";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

export async function analyzePortfolioAction(
  url: string
): Promise<ApiResponse<PortfolioAnalysisData>> {
  try {
    // 1. Authenticate user session
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized access." };
    }
    const userId = session.user.id;

    // 2. Rate limit check
    enforceRateLimit(rateLimitKey(userId, "portfolio"), RATE_LIMITS.analysis);

    // 3. SaaS Plan limit check: Free plan users can only analyze 1 portfolio
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    const portfolioCount = await prisma.portfolioAnalysis.count({
      where: { userId },
    });

    if (userProfile?.plan === "FREE" && portfolioCount >= 1) {
      return {
        success: false,
        error: "Portfolio analysis limit reached on the Free plan. Upgrade to Pro for unlimited portfolio audits.",
      };
    }

    const firstPortfolio = portfolioCount === 0;

    // 3. Validate input
    const parsed = portfolioUrlSchema.safeParse(url);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const targetUrl = parsed.data;

    // 4. Attempt to crawl/fetch portfolio metadata (SEO tags, title, structure)
    let pageHtmlSnippet = "";
    try {
      const res = await fetch(targetUrl, {
        headers: { "User-Agent": "DevLeveler-Crawl/1.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const text = await res.text();
        pageHtmlSnippet = text.substring(0, 4500); // Extract head & structural tags
      }
    } catch (err) {
      console.warn("Portfolio fetch timed out or failed:", err);
    }

    const prompt = `Analyze this portfolio site. Critically assess SEO, mobile, design, performance. No blind praise.

URL: ${targetUrl}
HTML: ${pageHtmlSnippet || "Not available"}

Return JSON:
{
  "url": "${targetUrl}",
  "performanceScore": 0-100,
  "seoScore": 0-100,
  "mobileScore": 0-100,
  "designScore": 0-100,
  "accessibilityScore": 0-100,
  "recommendations": [{ "category": "performance|seo|mobile|design|accessibility", "message": "...", "impact": "high|medium|low" }]
}
Return ONLY the JSON.`;

    const { executeWithObservabilityAndCache, invalidateUserAICache, CACHE_TTL } = await import("@/lib/ai");
    const analysis = await executeWithObservabilityAndCache<PortfolioAnalysisData>({
      feature: "portfolio",
      action: "analyze",
      userId,
      context: { url: targetUrl, snippetHash: pageHtmlSnippet.slice(0, 300) },
      prompt,
      options: { json: true },
      ttlSeconds: CACHE_TTL.PORTFOLIO,
      parseResult: (raw) => extractJSON<PortfolioAnalysisData>(raw),
    });

    await invalidateUserAICache(userId, "readiness").catch(() => {});

    // 6. Save to Database
    await prisma.portfolioAnalysis.create({
      data: {
        userId,
        url: targetUrl,
        performanceScore: analysis.performanceScore,
        seoScore: analysis.seoScore,
        mobileScore: analysis.mobileScore,
        designScore: analysis.designScore,
        accessScore: analysis.accessibilityScore,
        recommendations: JSON.stringify(analysis.recommendations),
      },
    });

    // Award XP
    if (firstPortfolio) {
      const reward = XP_REWARDS.PORTFOLIO_ANALYZED;
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

    await calculateScore(userId);

    const overallPortfolioScore = Math.round(
      (analysis.performanceScore + analysis.seoScore + analysis.mobileScore + analysis.designScore + analysis.accessibilityScore) / 5
    );
    if (overallPortfolioScore >= 75) {
      await unlockAchievement(userId, "portfolio_builder");
    }

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Error in analyzePortfolioAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Portfolio analysis failed",
    };
  }
}
