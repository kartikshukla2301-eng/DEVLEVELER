// ============================================================
// Job Agent Profile API (scoped, read-only)
// ============================================================
//
// Exposes the candidate's verified profile to the owner's separate
// "AI Job Application Agent" project, matching the contract in that
// project's locked architecture (Section 5):
//
//   GET /api/v1/me/job-agent-profile
//   Authorization: Bearer <token>
//
// Auth model: a long-lived, read-only, revocable token (see ApiToken in
// prisma/schema.prisma), created once via `npx tsx scripts/create-job-agent-token.ts
// <email>` and never exposed through any UI. This is intentionally separate from
// Auth.js sessions (cookie/browser-based) since this is a server-to-server call.
//
// Only fields that genuinely exist in the database are returned. Nothing here is
// invented: `preferences` (roles/locations/work_modes/levels) is returned empty
// because DevLeveler does not currently model structured job-search preferences —
// the Job Agent side treats missing preferences as "unknown", never guesses them.

import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "unauthorized", detail: "Missing or malformed Authorization header." },
      { status: 401 }
    );
  }

  const rawToken = authHeader.slice("Bearer ".length).trim();
  if (!rawToken) {
    return NextResponse.json(
      { error: "unauthorized", detail: "Empty bearer token." },
      { status: 401 }
    );
  }

  const tokenHash = hashToken(rawToken);

  const apiToken = await prisma.apiToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: {
          resumes: { orderBy: { updatedAt: "desc" }, take: 1 },
        },
      },
    },
  });

  if (!apiToken || apiToken.revokedAt) {
    return NextResponse.json(
      { error: "unauthorized", detail: "Invalid or revoked token." },
      { status: 401 }
    );
  }

  // Best-effort last-used bookkeeping; never blocks the response on failure.
  prisma.apiToken
    .update({ where: { id: apiToken.id }, data: { lastUsedAt: new Date() } })
    .catch(() => {
      /* non-fatal */
    });

  const user = apiToken.user;
  const resume = user.resumes[0];
  const connectedAccounts = (user.connectedAccounts as Record<string, string> | null) ?? {};

  const profileVersionSource = resume?.updatedAt ?? user.updatedAt;

  // Job Agent's CandidateDetails.links is typed Dict[str, str] (no nulls allowed) —
  // only include a key when there is an actual, non-empty string value.
  const links: Record<string, string> = {};
  if (connectedAccounts.github) links.github = connectedAccounts.github;
  if (connectedAccounts.linkedin) links.linkedin = connectedAccounts.linkedin;
  if (connectedAccounts.twitter) links.twitter = connectedAccounts.twitter;

  return NextResponse.json({
    schema_version: 1,
    // Job Agent's ProfileSnapshot.profile_version is typed as a string.
    profile_version: String(Math.floor(profileVersionSource.getTime() / 1000)),
    synced_at: new Date().toISOString(),
    candidate: {
      name: user.name ?? "",
      email: user.email,
      education: resume?.education ?? [],
      experience: resume?.experience ?? [],
      skills: resume?.skills ?? [],
      projects: resume?.projects ?? [],
      links,
    },
    // Not modeled in DevLeveler today — left empty rather than guessed.
    preferences: {
      roles: [],
      locations: [],
      work_modes: [],
      levels: [],
    },
  });
}
