import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  AlertCircle,
  Terminal,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Programming Skill Gap Analysis for Developers | DevLeveler",
  description:
    "Identify missing programming languages, frameworks, architectural patterns, and database tooling required for your target software engineering roles.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/skill-gap-analysis",
  },
  openGraph: {
    title: "Programming Skill Gap Analysis for Developers | DevLeveler",
    description:
      "Identify missing programming languages, frameworks, architectural patterns, and database tooling required for your target software engineering roles.",
    url: "https://devleveler.vercel.app/features/skill-gap-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Skill Gap Analysis" }],
  },
};

const FAQS = [
  {
    q: "How does DevLeveler identify skill gaps?",
    a: "DevLeveler aggregates your demonstrated technical footprint from parsed resume text, GitHub language distributions, and stated career goals. It cross-references these against industry role taxonomies (Frontend, Backend, Fullstack, DevOps) to spotlight missing core competencies."
  },
  {
    q: "What role categories are covered in the skill audit?",
    a: "The engine categorizes skills across Frontend, Backend, DevOps, Database, Testing, Mobile, and System Design, computing coverage percentages for each engineering domain."
  },
  {
    q: "How are missing skills prioritized?",
    a: "Missing skills are categorized into three priority tiers: Critical (fundamental architectural requirements like containerization or relational databases), Important (caching layers, background queues, testing frameworks), and Nice-to-Have (secondary utility libraries)."
  },
  {
    q: "How does skill gap analysis influence my Developer Score?",
    a: "Skill balance and gap detection account for 20% of your composite Developer Score in DevLeveler's scoring engine."
  },
  {
    q: "Can I connect my diagnosed skill gaps directly to a learning plan?",
    a: "Yes. Diagnosed gaps flow directly into DevLeveler's Career Roadmap Engine, which generates an ordered 12-week curriculum to remediate your highest-priority missing skills."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://devleveler.vercel.app/#features" },
      { "@type": "ListItem", position: 3, name: "Skill Gap Analysis", item: "https://devleveler.vercel.app/features/skill-gap-analysis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler Skill Gap Analyzer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Compares a developer's demonstrated tech stack against industry role requirements to highlight missing frameworks, tools, and architectural practices."
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

export default function SkillGapAnalysisPage() {
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
            <span className="text-[var(--foreground)] font-semibold">Skill Gap Analysis</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            20% of Composite Developer Score
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Programming Skill Gap Analysis for Developers
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Stop guessing what technologies to learn next. DevLeveler compares your code footprint and resume against industry role benchmarks to spotlight high-value missing competencies—from containerization to caching architectures.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Identify Your Gaps Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/identify-programming-skill-gaps"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              Read Skill Gap Guide
            </Link>
          </div>
        </section>

        {/* 3-Step Actual Product Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#0f172a]">
              How the Skill Diagnostic Engine Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#334155]">
              Cross-referencing verified telemetry against industry role requirements in three phases.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-black text-blue-700 font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Demonstrated Stack Aggregation</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Aggregates languages detected across your GitHub repositories with tools and frameworks extracted from your parsed PDF resume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-700 font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Industry Track Calibration</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Compares your demonstrated tools against industry standard tracks: Frontend, Backend, DevOps, Database, Testing, and System Design.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-xs font-black text-purple-700 font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Prioritized Gap Output</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Highlights critical vs nice-to-have gaps with concrete reasoning, feeding directly into your personalized 12-week roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Example Output (Clearly Labeled as Illustrative Schema Example) */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Illustrative Diagnostic Example
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Categorized Gaps with Explicit Priority Tiers
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                Rather than giving you an overwhelming, undifferentiated list of 50 tools, DevLeveler isolates the specific architectural dependencies that matter most for your target track:
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Critical Priority:</strong> Fundamental blockers for production hiring (e.g. Docker, PostgreSQL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Important Priority:</strong> Scalability and resilience tools (e.g. Redis caching, CI/CD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Nice-to-Have:</strong> Optional utilities that polish an already solid profile</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Illustrative Output Example</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">Target: Fullstack / Backend Track</span>
                  </div>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">Audit Status: Complete</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">Demonstrated In Profile:</span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">TypeScript (85%)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">Node.js (78%)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">PostgreSQL (70%)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-1">Critical Missing Tools:</span>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-red-50/60 border border-red-200/60 text-red-950 flex items-start justify-between gap-2">
                        <div>
                          <strong className="block text-red-900 font-mono">Docker Containerization</strong>
                          <span className="text-[10px] text-red-800">No Dockerfile or container configs found in public repositories.</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-red-200 text-red-900 font-bold text-[9px] uppercase shrink-0">Critical</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-amber-950 flex items-start justify-between gap-2">
                        <div>
                          <strong className="block text-amber-900 font-mono">Redis In-Memory Caching</strong>
                          <span className="text-[10px] text-amber-800">Missing caching layers for high-throughput API endpoints.</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[9px] uppercase shrink-0">Important</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Flows automatically into your 12-week roadmap.</span>
                  <Link href="/features/developer-roadmap" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 text-[11px]">
                    View Roadmap Engine <ArrowRight className="h-3 w-3" />
                  </Link>
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
                  <span><strong>Eliminates Tutorial Hell:</strong> Pinpoints the specific architectural components missing from your profile rather than generic advice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Role-Specific Calibration:</strong> Evaluates your stack against Frontend, Backend, Fullstack, or DevOps requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Integrated Roadmap Handoff:</strong> Connects directly with weekly deliverables to turn identified gaps into completed milestones.</span>
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
                  <span><strong>Industry Consensus, Not Custom Stacks:</strong> Evaluates common market requirements; specific startup edge stacks may vary.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Requires Input Data:</strong> Analysis accuracy depends on linking an active GitHub account or uploading an up-to-date resume.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Knowledge Breadth vs Depth:</strong> Identifies tool familiarity, but true depth requires real-world system debugging experience.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Link Hub */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Want to learn how senior engineers identify architectural blind spots?</span>
              <span className="text-xs text-slate-500">Read our practical guide on tech stack benchmarking and escaping tutorial hell.</span>
            </div>
            <Link
              href="/guides/identify-programming-skill-gaps"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shrink-0"
            >
              Read Skill Gap Guide <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-6 py-14 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-center text-[#0f172a] mb-8">
            Frequently Asked Questions
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
          <div className="rounded-3xl bg-blue-600 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bridge your engineering blind spots
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Find out exactly which tools and architectural patterns stand between your current profile and your dream role.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-blue-800 hover:bg-blue-50 px-8 text-xs font-bold transition-all shadow-md"
              >
                Scan My Skills Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
