import { getUnifiedReportAction } from "@/actions/intelligence";
import { getTelemetryStatus } from "@/actions/telemetry";
import { IntelligenceClient, type IntelligenceReport } from "@/components/dashboard/intelligence-client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Developer Intelligence - DevLeveler",
  description: "Unified analysis of your developer profile, skills, and industry readiness.",
};

export default async function IntelligencePage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
        Unauthorized access. Please log in.
      </div>
    );
  }

  // Fetch report details & real database telemetry status in parallel
  const [res, telemetry, user] = await Promise.all([
    getUnifiedReportAction(),
    getTelemetryStatus(session.user.id),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { connectedAccounts: true },
    }),
  ]);

  let connectedAccounts: Record<string, string> = {};
  if (user?.connectedAccounts) {
    try {
      connectedAccounts =
        typeof user.connectedAccounts === "string"
          ? JSON.parse(user.connectedAccounts)
          : (user.connectedAccounts as Record<string, string>) || {};
    } catch {}
  }

  return (
    <IntelligenceClient
      initialReport={res.success && res.data ? (res.data as unknown as IntelligenceReport) : null}
      initialTelemetry={telemetry}
      connectedAccounts={connectedAccounts}
      userId={session.user.id}
      userName={session.user.name || "Developer"}
    />
  );
}
