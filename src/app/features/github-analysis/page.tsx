import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Terminal,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "GitHub Profile Analyzer & Repository Code Telemetry | DevLeveler",
  description:
    "Analyze your public GitHub profile and repositories. Evaluate commit cadence, repository health, language distribution, and documentation hygiene for tech careers.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/github-analysis",
  },
  openGraph: {
    title: "GitHub Profile Analyzer & Repository Code Telemetry | DevLeveler",
    description:
      "Deep telemetry analysis of your public GitHub repositories, commit cadence, and language distribution.",
    url: "https://devleveler.vercel.app/features/github-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler GitHub Analysis" }],
  },
};

const FAQS = [
  {
    q: "Does DevLeveler require private repository or write access to my GitHub account?",
    a: "No. DevLeveler queries the public GitHub REST API using your public username. We never request repository write permissions, SSH keys, admin access, or access to private repositories."
  },
  {
    q: "How does DevLeveler calculate the GitHub analysis score?",
    a: "The overall GitHub score is a weighted composite of four dimensions: Activity (30% - recent 30/90 day pushes and repo count), Repository Health (25% - descriptions, topic tags, licenses, and documentation), Community (25% - non-fork stars, forks, and followers), and Consistency (20% - sustained creation and commit history over time)."
  },
  {
    q: "Are forked repositories counted in language and activity calculations?",
    a: "No. Forked repositories are explicitly filtered out. DevLeveler only evaluates original repositories created by your account to ensure metrics reflect your authentic code and technical contributions."
  },
  {
    q: "What are the limitations of GitHub profile analysis?",
    a: "GitHub telemetry measures public proof-of-work, code cadence, and repository structure. It cannot measure closed-source enterprise code, proprietary internal contributions, or live communication skills evaluated during behavioral and system design interviews."
  },
  {
    q: "How does GitHub analysis impact my composite Developer Score?",
    a: "GitHub activity and repository telemetry account for 25% of the overall composite Developer Score in DevLeveler's scoring engine. If GitHub is not connected, this weight is distributed proportionally across your other active data sources."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://devleveler.vercel.app/#features" },
      { "@type": "ListItem", position: 3, name: "GitHub Analysis", item: "https://devleveler.vercel.app/features/github-analysis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler GitHub Profile Analyzer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Evaluates public GitHub repositories, commit cadence, language breadth, and repository hygiene to quantify developer proof-of-work."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  }
];

export default function GitHubAnalysisPage() {
  const safeJsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#features" className="hover:text-[var(--foreground)] transition-colors">Features</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)] font-semibold">GitHub Analysis</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            25% of Composite Developer Score
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            GitHub Profile Analyzer & Code Telemetry
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            DevLeveler analyzes public GitHub activity to evaluate commit cadence, repository hygiene, language distribution, and open-source presence—turning raw Git metadata into transparent engineering capability indicators.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Analyze Your GitHub Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/analyze-github-profile"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              Read GitHub Audit Guide
            </Link>
          </div>
        </section>

        {/* 3-Step Actual Product Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#0f172a]">
              How the GitHub Telemetry Engine Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#334155]">
              Read-only inspection executed via the public GitHub REST API in three sequential phases.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-black text-blue-700 font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">User & Repository Ingestion</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Connect your public GitHub username. The engine queries public endpoints to fetch user metadata, followers, account creation date, and all non-fork repositories.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-700 font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Cadence & Hygiene Auditing</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Inspects push dates within 30 and 90 days, language byte distribution across projects, and documentation hygiene: descriptions, topics, and open-source licenses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-xs font-black text-purple-700 font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Multi-Pillar Score Calculation</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Generates four normalized component scores (Activity, Repo Health, Community, Consistency) and aggregates them into the overall GitHub Score.
              </p>
            </div>
          </div>
        </section>

        {/* Example Telemetry Output (Clearly Labeled as Illustrative Schema Example) */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Schema Output Example
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Transparent Metrics, Not Black-Box Estimates
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                DevLeveler presents exact telemetry dimensions so you know precisely what is driving your score. Here is an illustrative example of the data generated for an active profile:
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Activity (30% weight):</strong> Recent pushes + account longevity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Repository Health (25% weight):</strong> Descriptions, topics, licenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Community (25% weight):</strong> Organic stars, forks, followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Consistency (20% weight):</strong> Multi-month creation pacing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Illustrative Output Example</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">telemetry_report.json</span>
                  </div>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">Overall: 78 / 100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Activity Score</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">82 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Active pushes in last 30d</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Repo Health</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">75 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">85% repos with README & topics</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Community</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">68 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Stars & forks on original repos</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Consistency</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">88 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Consistent creation over 180d</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Top Languages Distribution</span>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between items-center text-slate-700">
                      <span>TypeScript</span>
                      <span className="font-bold">64.2%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-[64.2%]" />
                    </div>
                    <div className="flex justify-between items-center text-slate-700 pt-1">
                      <span>Python</span>
                      <span className="font-bold">28.5%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full w-[28.5%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits vs Limitations */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wide">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                Verified Benefits
              </div>
              <ul className="space-y-2.5 text-xs text-emerald-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Objective Public Audit:</strong> Removes guesswork by measuring actual public repository structures, licenses, and push cadence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Filters Out Fork Clones:</strong> Evaluates only original codebases to prevent artificial score inflation from starred forks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Zero Write Access Required:</strong> Strictly read-only public queries; no modifications to your account or repositories.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm uppercase tracking-wide">
                <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
                Objective Limitations
              </div>
              <ul className="space-y-2.5 text-xs text-amber-950 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Private Work Is Not Scanned:</strong> Contributions in private enterprise organizations are excluded unless explicitly linked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Commit Volume ≠ Code Architecture:</strong> Commit count shows cadence, but architectural depth is evaluated alongside project reviews.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Not a Hiring Guarantee:</strong> GitHub telemetry complements, but does not replace, technical and behavioral interviews.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Link Hub */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Want to learn how engineering managers evaluate GitHub?</span>
              <span className="text-xs text-slate-500">Read our practical guide on README architecture, pinned repositories, and commit hygiene.</span>
            </div>
            <Link
              href="/guides/analyze-github-profile"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shrink-0"
            >
              Read GitHub Guide <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-6 py-14 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-center text-[#0f172a] mb-8">
            Frequently Asked Questions About GitHub Analysis
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <h3 className="text-sm font-bold text-[#0f172a]">{faq.q}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#334155] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 mt-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to audit your GitHub profile?
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Connect your public GitHub username in seconds to view your commit cadence, language distribution, and Developer Score breakdown.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-blue-800 hover:bg-blue-50 px-8 text-xs font-bold transition-all shadow-md"
              >
                Start Free Analysis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
