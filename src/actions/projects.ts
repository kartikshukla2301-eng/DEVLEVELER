"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateLevel, XP_REWARDS } from "@/lib/xp";
import { calculateScore } from "@/actions/score";
import { unlockAchievement } from "@/lib/achievements";
import { env } from "@/lib/env";
import { extractJSON } from "@/lib/ai";
import type { ApiResponse } from "@/types";
import type { ProjectAnalysis } from "@prisma/client";
import { enforceRateLimit, RATE_LIMITS, rateLimitKey } from "@/lib/rate-limit";

interface ProjectAnalysisResult {
  overallScore: number;
  architectureScore: number;
  documentationScore: number;
  maintainabilityScore: number;
  deploymentScore: number;
  
  documentationQuality: string;
  readmeQuality: string;
  projectStructure: string;
  folderOrganization: string;
  scalability: string;
  maintainability: string;
  codeComplexity: string;
  deploymentStatus: string;

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  improvementRoadmap: Array<{ week: number; title: string; description: string }>;
}

export async function analyzeProjectAction(
  repoUrl: string
): Promise<ApiResponse<ProjectAnalysisResult>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    // Rate limit check
    enforceRateLimit(rateLimitKey(userId, "project"), RATE_LIMITS.analysis);

    // SaaS Plan limit check: Free plan users can only analyze 1 repository
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });

    if (userProfile?.plan === "FREE") {
      const projectCount = await prisma.projectAnalysis.count({
        where: { userId },
      });
      if (projectCount >= 1) {
        return {
          success: false,
          error: "Project analysis limit reached on the Free plan. Upgrade to Pro for unlimited repository audits.",
        };
      }
    }

    // 1. Parse GitHub URL
    const match = repoUrl.match(/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/);
    if (!match) {
      return { success: false, error: "Please enter a valid GitHub repository URL (e.g. https://github.com/owner/repo)" };
    }

interface GitHubRepoMeta {
  stargazers_count?: number;
  forks_count?: number;
  language?: string;
}

    const [, owner, repo] = match;
    const targetUrl = `https://github.com/${owner}/${repo}`;

    // 2. Fetch repo metadata from GitHub API (with fallback)
    let repoData: GitHubRepoMeta | null = null;
    let directoryStructure = "";
    let readmeText = "";

    const headers: Record<string, string> = {
      "User-Agent": "DevLeveler-App/1.0",
    };
    if (env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${env.GITHUB_TOKEN}`;
    }

    try {
      // Get basic metadata
      const metaRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (metaRes.ok) {
        repoData = await metaRes.json();
      }

      // Get directory structure
      const contentsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (contentsRes.ok) {
        const contents = await contentsRes.json();
        if (Array.isArray(contents)) {
          directoryStructure = contents
            .map((item) => `- ${item.name} (${item.type})`)
            .join("\n");
        }
      }

      // Get README
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
          ...headers,
          Accept: "application/vnd.github.raw+json",
        },
        signal: AbortSignal.timeout(5000),
      });
      if (readmeRes.ok) {
        readmeText = await readmeRes.text();
      }
    } catch (e) {
      console.warn("Failed to fetch repository files from GitHub API, running with fallbacks:", e);
    }

    const prompt = `You are DevLeveler's Career Coach — an expert technical mentor, senior developer, and architect evaluating project codebases from a hiring perspective.
    
    Evaluate the following GitHub Repository:
    URL: ${targetUrl}
    Name: ${repo}
    Owner: ${owner}
    Stars: ${repoData?.stargazers_count ?? "Unknown"}
    Forks: ${repoData?.forks_count ?? "Unknown"}
    Primary Language: ${repoData?.language ?? "Unknown"}
    
    FOLDER STRUCTURE LAYOUT:
    ${directoryStructure || "Not available (private or API limit)"}
    
    README PREVIEW:
    ${readmeText ? readmeText.slice(0, 3000) : "Not available"}
    
    Return a structured JSON object containing:
    {
      "overallScore": 82,
      "architectureScore": 85,
      "documentationScore": 75,
      "maintainabilityScore": 80,
      "deploymentScore": 88,
      
      "documentationQuality": "A detailed audit paragraph on documentation practices, code commenting, and tutorials.",
      "readmeQuality": "Audit details on README comprehensiveness, setup instructions, and details.",
      "projectStructure": "Detailed architectural layout audit.",
      "folderOrganization": "Analysis of directory hierarchy and cleanliness.",
      "scalability": "Detailed scaling audit (modular design, state management).",
      "maintainability": "Review of dependencies, lint configurations, and code style constants.",
      "codeComplexity": "Review of code patterns, duplication, or clean coding practices.",
      "deploymentStatus": "Check for CI/CD workflows, config files (.vercel, dockerfile, github workflows).",

      "strengths": ["list of 3-4 key technical strengths"],
      "weaknesses": ["list of 3-4 architectural weaknesses/gaps"],
      "recommendations": ["list of 3-4 specific actionable next steps"],
      "improvementRoadmap": [
        { "week": 1, "title": "Refactor directory layout", "description": "Move files to src/ components structure..." },
        { "week": 2, "title": "Add testing suites", "description": "Configure Vitest or Jest..." }
      ]
    }
    
    SCORING & AUDITING RULES (HONEST GUIDANCE POLICY):
    - Do not blindly praise. Critically audit code organization, scalability, maintainability, and complexity.
    - If the project is a weak CRUD or standard tutorial project, warn the developer of the low impact this has on recruiters, explain the risks, and recommend advanced engineering upgrades (e.g. database optimizations, containerization, custom API logic).
    - Return ONLY the JSON object, no additional markdown wrapper text.
    - Never refer to yourself as "AI" — you are "Career Coach".`;

    const { executeWithObservabilityAndCache, CACHE_TTL } = await import("@/lib/ai");
    const analysis = await executeWithObservabilityAndCache<ProjectAnalysisResult>({
      feature: "projects",
      action: "analyze",
      userId,
      context: { repoUrl: targetUrl, snippetHash: readmeText.slice(0, 300) },
      prompt,
      options: { json: true },
      ttlSeconds: CACHE_TTL.PORTFOLIO,
      parseResult: (raw) => extractJSON<ProjectAnalysisResult>(raw),
    });

    // 4. Save to Database
    await prisma.projectAnalysis.create({
      data: {
        userId,
        repoUrl: targetUrl,
        overallScore: analysis.overallScore,
        architectureScore: analysis.architectureScore,
        documentationScore: analysis.documentationScore,
        maintainabilityScore: analysis.maintainabilityScore,
        deploymentScore: analysis.deploymentScore,
        documentationQuality: analysis.documentationQuality,
        readmeQuality: analysis.readmeQuality,
        projectStructure: analysis.projectStructure,
        folderOrganization: analysis.folderOrganization,
        scalability: analysis.scalability,
        maintainability: analysis.maintainability,
        codeComplexity: analysis.codeComplexity,
        deploymentStatus: analysis.deploymentStatus,
        strengths: JSON.stringify(analysis.strengths),
        weaknesses: JSON.stringify(analysis.weaknesses),
        recommendations: JSON.stringify(analysis.recommendations),
        improvementRoadmap: JSON.stringify(analysis.improvementRoadmap),
      },
    });

    // 5. Award XP
    const existingAnalyses = await prisma.projectAnalysis.count({
      where: { userId },
    });

    if (existingAnalyses <= 1) {
      const reward = XP_REWARDS.PROJECT_ANALYZED ?? { amount: 500, reason: "Project Analyzed", category: "project" };

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
    await unlockAchievement(userId, "first_analysis");

    // 7. Update overall developer score
    await calculateScore(userId);

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Error in analyzeProjectAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze repository",
    };
  }
}

export async function getProjectAnalysesAction(): Promise<ApiResponse<ProjectAnalysis[]>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const analyses = await prisma.projectAnalysis.findMany({
      where: { userId: session.user.id },
      orderBy: { analyzedAt: "desc" },
    });

    return { success: true, data: analyses };
  } catch (error) {
    console.error("Error in getProjectAnalysesAction:", error);
    return { success: false, error: "Failed to load project analyses" };
  }
}
