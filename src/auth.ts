import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { analyzeGitHubProfile } from "@/lib/github";
import { XP_REWARDS, calculateLevel } from "@/lib/xp";
import { unlockAchievement } from "@/lib/achievements";
import { calculateScore } from "@/actions/score";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        const githubUsername = (profile.login || profile.username) as string;
        if (githubUsername && user.id) {
          const userId = user.id;

          // 1. Sync User fields (username, bio, avatar)
          const name = (profile.name || user.name) as string;
          const image = (profile.avatar_url || user.image) as string;
          const bio = (profile.bio || "") as string;

          // Update user details & add connected github account
          const connectedAccounts = { github: githubUsername };

          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarSource: true }
          });

          if (dbUser) {
            await prisma.user.update({
              where: { id: userId },
              data: {
                username: githubUsername,
                name,
                image,
                bio,
                connectedAccounts: JSON.stringify(connectedAccounts),
                githubAvatarUrl: image,
                avatarSource: dbUser.avatarSource === "INITIALS" ? "GITHUB" : undefined,
              },
            });
          }

          // 2. Launch Non-Blocking GitHub Analysis Import in the background!
          // We trigger analyzeGitHubProfile asynchronously to build their profile instantly
          // without delaying the sign-in redirect response.
          analyzeGitHubProfile(githubUsername)
            .then(async (analysis) => {
              const existingProfile = await prisma.gitHubProfile.findUnique({
                where: { userId },
              });

              await prisma.gitHubProfile.upsert({
                where: { userId },
                update: {
                  username: analysis.user.login,
                  avatarUrl: analysis.user.avatar_url,
                  bio: analysis.user.bio,
                  publicRepos: analysis.stats.totalRepos,
                  followers: analysis.stats.followers,
                  following: analysis.stats.following,
                  totalStars: analysis.stats.totalStars,
                  totalForks: analysis.stats.totalForks,
                  languages: JSON.stringify(analysis.languages),
                  topRepos: JSON.stringify(analysis.topRepos),
                  activityScore: analysis.scores.activity,
                  repoHealth: analysis.scores.repoHealth,
                  githubScore: analysis.scores.overall,
                  analyzedAt: new Date(),
                },
                create: {
                  userId,
                  username: analysis.user.login,
                  avatarUrl: analysis.user.avatar_url,
                  bio: analysis.user.bio,
                  publicRepos: analysis.stats.totalRepos,
                  followers: analysis.stats.followers,
                  following: analysis.stats.following,
                  totalStars: analysis.stats.totalStars,
                  totalForks: analysis.stats.totalForks,
                  languages: JSON.stringify(analysis.languages),
                  topRepos: JSON.stringify(analysis.topRepos),
                  activityScore: analysis.scores.activity,
                  repoHealth: analysis.scores.repoHealth,
                  githubScore: analysis.scores.overall,
                },
              });

              if (!existingProfile) {
                const reward = XP_REWARDS.GITHUB_ANALYZED;
                const dbUser = await prisma.user.findUnique({
                  where: { id: userId },
                  select: { xp: true },
                });
                if (dbUser) {
                  const newXP = dbUser.xp + reward.amount;
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
                      data: { xp: newXP, level: levelInfo.level },
                    }),
                  ]);
                }
              }

              await unlockAchievement(userId, "first_analysis");
              if (analysis.scores.overall >= 75) {
                await unlockAchievement(userId, "github_explorer");
              }
              await calculateScore(userId);
            })
            .catch((err) => {
              console.error("Auto GitHub import failed inside signIn callback:", err);
            });
        }
      } else if (account?.provider === "google" && profile && user.id) {
        const userId = user.id;
        const name = (profile.name || user.name) as string;
        const image = (profile.picture || user.image) as string;

        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarSource: true }
          });

          if (dbUser) {
            await prisma.user.update({
              where: { id: userId },
              data: {
                name,
                image,
                googleAvatarUrl: image,
                avatarSource: dbUser.avatarSource === "INITIALS" ? "GOOGLE" : undefined,
              },
            });
          }
        } catch (err) {
          console.warn("Google profile sync deferred:", err);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const u = user as { role?: string; plan?: string };
        token.role = u.role || "DEVELOPER";
        token.plan = u.plan || "FREE";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        const sessionUser = session.user as { role?: string; plan?: string };
        sessionUser.role = token.role as string;
        sessionUser.plan = token.plan as string;
      }
      return session;
    },
  },
});
