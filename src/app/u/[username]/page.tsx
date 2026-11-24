import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PublicProfileClient } from "@/components/profile/public-profile-client";
import type { RoadmapGoal } from "@/types";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

// Shared between generateMetadata() and the page body so the profile is only fetched
// from the database once per request (React dedupes calls to the same cache()-wrapped
// function within a single render pass).
const getPublicProfile = cache(async (username: string) => {
  return prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    include: {
      githubProfile: true,
      devScore: true,
      readiness: true,
      achievements: true,
      portfolios: {
        orderBy: { analyzedAt: "desc" },
        take: 1,
      },
      roadmaps: {
        where: { status: "active" },
        orderBy: { generatedAt: "desc" },
        take: 1,
      },
      resumes: {
        orderBy: { analyzedAt: "desc" },
        take: 1,
      },
    },
  });
});

const SITE_URL = "https://devleveler.vercel.app";
const DEFAULT_OG_IMAGE = "/github-social-preview.png";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  if (!username) {
    return { title: "Profile Not Found | DevLeveler", robots: { index: false, follow: false } };
  }

  const user = await getPublicProfile(username);

  // Respect the user's own privacy toggle: a profile they've marked private never gets
  // a public title/description generated for it, and is explicitly told not to be
  // indexed (the page itself currently still renders for direct visitors — see the
  // separate note about also gating the page body, which is a product/privacy
  // decision beyond this metadata-only change).
  if (!user || !user.isPublic) {
    return { title: "Profile Not Found | DevLeveler", robots: { index: false, follow: false } };
  }

  const displayName = user.name?.trim() || user.username || "Developer";
  const score = user.devScore ? Math.round(user.devScore.overallScore) : null;
  const canonicalUrl = `${SITE_URL}/u/${user.username}`;

  const title =
    score !== null
      ? `${displayName} (@${user.username}) — Developer Score ${score}/100 | DevLeveler`
      : `${displayName} (@${user.username}) — Developer Profile | DevLeveler`;

  const trimmedBio = user.bio?.trim();
  const description = trimmedBio
    ? `${trimmedBio.slice(0, 140)}${trimmedBio.length > 140 ? "…" : ""} — See ${displayName}'s verified Developer Score, GitHub activity, and skills on DevLeveler.`
    : score !== null
    ? `${displayName} has a Developer Score of ${score}/100 on DevLeveler, verified against real GitHub activity, resume, and skill data.`
    : `View ${displayName}'s developer profile — GitHub activity, skills, and career readiness, verified by DevLeveler.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "profile",
      title,
      description,
      url: canonicalUrl,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1376, height: 768, alt: `${displayName}'s DevLeveler profile` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  if (!username) {
    notFound();
  }

  // Same cached lookup generateMetadata() already ran — no second database round trip.
  const user = await getPublicProfile(username);

  if (!user) {
    notFound();
  }

  // 2. Format database objects into clean structures
  const latestResume = user.resumes[0] ?? null;
  const latestPortfolio = user.portfolios[0] ?? null;
  const activeRoadmap = user.roadmaps[0] ?? null;

  const formattedProfile = {
    name: user.name ?? "Anonymous Developer",
    username: user.username!,
    bio: user.bio ?? "",
    image: user.image,
    level: user.level,
    xp: user.xp,
    plan: user.plan,
    isEarlyAdopter: user.isEarlyAdopter,
    premiumExpiresAt: user.premiumExpiresAt,
    careerGoals: (() => {
      try {
        if (typeof user.careerGoals === "string") return JSON.parse(user.careerGoals) as string[];
        return (user.careerGoals as string[]) || [];
      } catch {
        return [];
      }
    })(),
    connectedAccounts: (() => {
      try {
        if (typeof user.connectedAccounts === "string") return JSON.parse(user.connectedAccounts) as Record<string, string>;
        return (user.connectedAccounts as Record<string, string>) || {};
      } catch {
        return {};
      }
    })(),
    devScore: user.devScore
      ? {
          overallScore: Math.round(user.devScore.overallScore),
          rank: user.devScore.rank,
          level: user.devScore.level,
          githubScore: Math.round(user.devScore.githubScore),
          projectScore: Math.round(user.devScore.projectScore),
          skillScore: Math.round(user.devScore.skillScore),
          resumeScore: Math.round(user.devScore.resumeScore),
          deploymentScore: Math.round(user.devScore.deploymentScore),
        }
      : null,
    github: user.githubProfile
      ? {
          username: user.githubProfile.username,
          avatarUrl: user.githubProfile.avatarUrl,
          publicRepos: user.githubProfile.publicRepos,
          followers: user.githubProfile.followers,
          totalStars: user.githubProfile.totalStars,
          languages: (() => {
            try {
              if (typeof user.githubProfile.languages === "string") {
                return JSON.parse(user.githubProfile.languages) as Record<string, number>;
              }
              return (user.githubProfile.languages as Record<string, number>) || {};
            } catch {
              return {};
            }
          })(),
        }
      : null,
    portfolioScore: latestPortfolio
      ? Math.round(
          (latestPortfolio.performanceScore +
            latestPortfolio.seoScore +
            latestPortfolio.mobileScore +
            latestPortfolio.designScore +
            latestPortfolio.accessScore) /
            5
        )
      : null,
    readinessScore: user.readiness ? Math.round(user.readiness.overallScore) : null,
    skills: (() => {
      const skillsSet = new Set<string>();
      
      // Pull from resume
      if (latestResume) {
        try {
          const parsed = typeof latestResume.skills === "string"
            ? JSON.parse(latestResume.skills) as string[]
            : (latestResume.skills as string[]) || [];
          parsed.forEach((s) => skillsSet.add(s));
        } catch {}
      }

      // Pull from custom settings skills
      if (user.customSkills) {
        try {
          const parsed = typeof user.customSkills === "string"
            ? JSON.parse(user.customSkills) as string[]
            : (user.customSkills as string[]) || [];
          parsed.forEach((s) => skillsSet.add(s));
        } catch {}
      }

      // Pull from github languages
      if (user.githubProfile) {
        try {
          const parsed = typeof user.githubProfile.languages === "string"
            ? JSON.parse(user.githubProfile.languages) as Record<string, number>
            : (user.githubProfile.languages as Record<string, number>) || {};
          Object.keys(parsed).forEach((k) => skillsSet.add(k));
        } catch {}
      }

      return Array.from(skillsSet).slice(0, 15);
    })(),
    achievements: user.achievements.map((a) => ({
      type: a.achievementType,
      title: a.title,
      description: a.description,
      icon: a.icon,
    })),
    roadmap: activeRoadmap
      ? {
          title: activeRoadmap.title,
          techStack: (() => {
            try {
              if (typeof activeRoadmap.techStack === "string") return JSON.parse(activeRoadmap.techStack) as string[];
              return (activeRoadmap.techStack as string[]) || [];
            } catch {
              return [];
            }
          })(),
          weeklyGoals: (() => {
            try {
              if (typeof activeRoadmap.weeklyGoals === "string") return JSON.parse(activeRoadmap.weeklyGoals) as RoadmapGoal[];
              return (activeRoadmap.weeklyGoals as unknown as RoadmapGoal[]) || [];
            } catch {
              return [];
            }
          })(),
        }
      : null,
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[var(--foreground)] py-12 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Branding header in public route */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
            <span className="text-sm font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
            DevLeveler
          </span>
          <span className="text-[10px] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded-full text-[var(--foreground-tertiary)] uppercase font-semibold tracking-wider ml-auto">
            Public Portfolio
          </span>
        </div>

        <PublicProfileClient profile={formattedProfile} />
      </div>
    </div>
  );
}
