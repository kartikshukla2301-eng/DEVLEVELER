// ============================================================
// One-off CLI: issue a scoped, read-only ApiToken for the Job Agent integration.
//
// Usage:
//   npx tsx scripts/create-job-agent-token.ts <your-account-email>
//
// Prints the raw token exactly once. It is never stored anywhere — only its
// SHA-256 hash is saved (see ApiToken.tokenHash in prisma/schema.prisma), so if
// you lose it, run this script again to issue a new one (the old one keeps
// working too; revoke old tokens manually via Prisma Studio / SQL if desired).
// ============================================================

import { createHash, randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx scripts/create-job-agent-token.ts <your-account-email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No DevLeveler user found with email: ${email}`);
    process.exit(1);
  }

  const rawToken = `dl_${randomBytes(32).toString("hex")}`;
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");

  await prisma.apiToken.create({
    data: {
      userId: user.id,
      name: "job-agent",
      scope: "profile:read",
      tokenHash,
    },
  });

  console.log("\nJob Agent read-only token created for:", email);
  console.log("Copy this into the Job Agent project's .env as DEVLEVELER_READ_TOKEN");
  console.log("(shown once — it is not recoverable afterwards):\n");
  console.log(rawToken);
  console.log("\nDEVLEVELER_PROFILE_URL should be your deployed base URL, e.g.:");
  console.log("  https://devleveler.vercel.app/api/v1/me/job-agent-profile\n");
}

main()
  .catch((err) => {
    console.error("Failed to create token:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
