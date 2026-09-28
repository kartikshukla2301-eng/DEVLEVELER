"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { ApiResponse, TelemetryStatus } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Get the real persisted telemetry status for a user.
 * Directly reads database records scoped strictly to the given userId.
 */
export async function getTelemetryStatus(userId: string): Promise<TelemetryStatus> {
  const [user, githubProfile, linkedInAnalysis, resume, portfolio] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { connectedAccounts: true },
    }),
    prisma.gitHubProfile.findUnique({
      where: { userId },
      select: {
        username: true,
        avatarUrl: true,
        githubScore: true,
        publicRepos: true,
        analyzedAt: true,
        updatedAt: true,
      },
    }),
    prisma.linkedInAnalysis.findUnique({
      where: { userId },
      select: {
        url: true,
        headline: true,
        analyzedAt: true,
      },
    }),
    prisma.resume.findFirst({
      where: { userId },
      orderBy: { analyzedAt: "desc" },
      select: {
        fileName: true,
        atsScore: true,
        qualityScore: true,
        skills: true,
        analyzedAt: true,
      },
    }),
    prisma.portfolioAnalysis.findFirst({
      where: { userId },
      orderBy: { analyzedAt: "desc" },
      select: {
        url: true,
        performanceScore: true,
        analyzedAt: true,
      },
    }),
  ]);

  let connectedAccounts: Record<string, string> = {};
  if (user?.connectedAccounts) {
    try {
      connectedAccounts =
        typeof user.connectedAccounts === "string"
          ? JSON.parse(user.connectedAccounts)
          : (user.connectedAccounts as Record<string, string>) || {};
    } catch {
      connectedAccounts = {};
    }
  }

  const isGitHubConnected = Boolean(githubProfile || connectedAccounts.github);
  const isLinkedInSynced = Boolean(linkedInAnalysis || connectedAccounts.linkedin);
  const isResumeAvailable = Boolean(resume);
  const isResumeAnalyzed = Boolean(
    resume && (resume.atsScore != null || resume.qualityScore != null || resume.skills != null)
  );
  const isPortfolioAvailable = Boolean(portfolio || connectedAccounts.portfolio);
  const isPortfolioAnalyzed = Boolean(portfolio && portfolio.performanceScore != null);

  const gitHubAnalyzedAt = githubProfile?.analyzedAt || githubProfile?.updatedAt;

  return {
    github: {
      connected: isGitHubConnected,
      username: githubProfile?.username || connectedAccounts.github || null,
      avatarUrl: githubProfile?.avatarUrl || null,
      score: githubProfile?.githubScore ?? null,
      publicRepos: githubProfile?.publicRepos ?? 0,
      analyzedAt: gitHubAnalyzedAt ? gitHubAnalyzedAt.toISOString() : null,
    },
    linkedin: {
      synced: isLinkedInSynced,
      url: linkedInAnalysis?.url || connectedAccounts.linkedin || null,
      headline: linkedInAnalysis?.headline || null,
      analyzedAt: linkedInAnalysis?.analyzedAt ? linkedInAnalysis.analyzedAt.toISOString() : null,
    },
    resume: {
      available: isResumeAvailable,
      analyzed: isResumeAnalyzed,
      fileName: resume?.fileName || null,
      atsScore: resume?.atsScore ?? null,
      analyzedAt: resume?.analyzedAt ? resume.analyzedAt.toISOString() : null,
    },
    portfolio: {
      available: isPortfolioAvailable,
      analyzed: isPortfolioAnalyzed,
      url: portfolio?.url || connectedAccounts.portfolio || null,
      score: portfolio?.performanceScore ?? null,
      analyzedAt: portfolio?.analyzedAt ? portfolio.analyzedAt.toISOString() : null,
    },
  };
}

/**
 * Server action to fetch telemetry status for the currently authenticated user.
 */
export async function getTelemetryStatusAction(): Promise<ApiResponse<TelemetryStatus>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized access" };
    }

    const status = await getTelemetryStatus(session.user.id);
    return { success: true, data: status };
  } catch (error) {
    console.error("Error in getTelemetryStatusAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch telemetry status",
    };
  }
}

/**
 * Revalidate intelligence page caches after telemetry update
 */
export async function revalidateTelemetryCaches(): Promise<void> {
  try {
    revalidatePath("/dashboard/intelligence");
    revalidatePath("/dashboard");
  } catch (error) {
    console.warn("revalidateTelemetryCaches error:", error);
  }
}
