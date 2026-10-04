import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible configuration for NextAuth (Auth.js v5).
 * Contains ONLY lightweight edge-safe callbacks, pages, and session strategies.
 * Does NOT import Prisma, bcrypt, server actions, or Node-specific dependencies.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to /login
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const u = user as { role?: string; plan?: string };
        token.role = u.role || "DEVELOPER";
        token.plan = u.plan || "FREE";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        const sessionUser = session.user as { role?: string; plan?: string };
        sessionUser.role = token.role as string;
        sessionUser.plan = token.plan as string;
      }
      return session;
    },
  },
  providers: [], // Fully populated in Node runtime inside auth.ts
} satisfies NextAuthConfig;
