import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Programming Skill Gap Analysis for Developers | DevLeveler",
  description:
    "Identify missing programming languages, frameworks, architecture patterns, and DevOps tooling required for your target software engineering roles.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/skill-gap-analysis",
  },
  openGraph: {
    title: "Programming Skill Gap Analysis for Developers | DevLeveler",
    description:
      "Identify missing programming languages, frameworks, architecture patterns, and DevOps tooling required for your target software engineering roles.",
    url: "https://devleveler.vercel.app/features/skill-gap-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Skill Gap Analysis" }],
  },
};

const FAQS = [
  {
    q: "How does DevLeveler identify skill gaps?",
    a: "DevLeveler compares technologies found in your GitHub repositories and resume against industry role taxonomies (e.g., Docker, PostgreSQL, Redis, Jest) to find missing high-priority tools."
  },
  {
    q: "What engineering tracks does DevLeveler support?",
    a: "DevLeveler benchmarks profiles against common engineering tracks including Frontend Engineering, Backend Engineering, Fullstack Development, and DevOps/Cloud Infrastructure."
  },
  {
    q: "How should developers prioritize missing skills?",
    a: "Prioritize skills based on target job postings: focus first on core system dependencies (e.g. databases, caching, containerization) before secondary UI component libraries."
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
    description: "Compares a developer's demonstrated tech stack against current industry role requirements to highlight missing frameworks, tools, and practices."
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

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Diagnostic Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Programming Skill Gap Analysis for Developers
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Stop guessing what technologies to learn next. DevLeveler compares your code footprint and resume against real hiring benchmarks to spotlight high-value missing competencies—from containerization to caching layers.
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
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              Read Skill Gap Guide
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Multi-Dimensional Skill Calibration
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                Most career plateaus happen not because developers lack coding ability, but because their portfolios miss key architectural components that production engineering teams require.
              </p>
              <ul className="space-y-3 pt-2 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Infrastructure & DevOps:</strong> Verifies knowledge of Docker, CI/CD pipelines, container orchestration, and cloud deployment pipelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Data & Persistence:</strong> Detects whether your experience spans relational modeling (PostgreSQL, MySQL) and memory caches (Redis).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Code Verification & Testing:</strong> Evaluates automated test suites (unit, integration, end-to-end) across repositories.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#0f172a]">Startup vs. Enterprise Readiness</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Early-stage startups prioritize fullstack execution velocity and rapid prototyping. Enterprise companies require strict architectural layering, static typing, comprehensive testing, and observability. DevLeveler rates your readiness across both hiring environments.
              </p>
              <div className="pt-2">
                <Link
                  href="/features/developer-roadmap"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Explore 12-Week Roadmap Engine <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

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
