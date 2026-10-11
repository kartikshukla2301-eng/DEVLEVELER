import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "How DevLeveler Works: Developer Score & Methodology | DevLeveler",
  description:
    "Learn how DevLeveler calculates your Developer Score across 5 weighted pillars: Projects, GitHub activity, skill balance, ATS resume quality, and DevOps prep.",
  alternates: {
    canonical: "https://devleveler.vercel.app/how-it-works",
  },
  openGraph: {
    title: "How DevLeveler Works: Developer Score & Methodology | DevLeveler",
    description:
      "Transparent breakdown of how DevLeveler audits code, resumes, and skills to produce an objective Developer Score.",
    url: "https://devleveler.vercel.app/how-it-works",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "How DevLeveler Works" }],
  },
};

const FAQS = [
  {
    q: "What are the exact weights used for the Developer Score?",
    a: "The composite Developer Score is weighted across 5 pillars: Projects & Code Quality (30%), GitHub Activity Volume (25%), Skill Balance & Gap Detection (20%), ATS Resume Quality (15%), and Deployment & DevOps Prep (10%)."
  },
  {
    q: "What happens if I don't connect a GitHub account or resume?",
    a: "If a data source is not connected, the weighting algorithm distributes the missing percentages proportionally across your active connected signals, ensuring you receive an unbiased baseline score."
  },
  {
    q: "How does DevLeveler protect user data and privacy?",
    a: "We only inspect public GitHub repository data and securely parsed resume text fields. We never request GitHub write access, and users can delete their stored profile analysis data at any time from account settings."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "How It Works", item: "https://devleveler.vercel.app/how-it-works" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How DevLeveler Works: Developer Score Methodology & System Architecture",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    description: "Detailed methodology explaining the composite 0-100 Developer Score calculation, signal weighting, and data handling privacy standards."
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

export default function HowItWorksPage() {
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
            <span className="text-[var(--foreground)] font-semibold">How It Works</span>
          </nav>
        </div>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Transparent Methodology
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            How DevLeveler Calculates Your Developer Score
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Developer career intelligence should never be a black box. DevLeveler provides complete transparency into how technical signals are gathered, weighted, and analyzed to form an objective 0–100 Developer Score.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-8">
            The 5 Weighted Pillars of Developer Intelligence
          </h2>

          <div className="grid gap-6 md:grid-cols-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <span className="text-2xl font-black text-blue-600 block">30%</span>
              <h3 className="font-bold text-sm text-[#0f172a]">Projects & Code Quality</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Repository completeness, architectural structure, test directories, and documentation quality.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <span className="text-2xl font-black text-indigo-600 block">25%</span>
              <h3 className="font-bold text-sm text-[#0f172a]">GitHub Activity Volume</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Multi-month commit consistency, release cadence, and active development velocity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <span className="text-2xl font-black text-purple-600 block">20%</span>
              <h3 className="font-bold text-sm text-[#0f172a]">Skill Balance & Gaps</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Demonstrated breadth across programming languages, frameworks, and missing high-priority tools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <span className="text-2xl font-black text-pink-600 block">15%</span>
              <h3 className="font-bold text-sm text-[#0f172a]">ATS Resume Quality</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Parser extraction compatibility, keyword density alignment, and quantified impact statements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <span className="text-2xl font-black text-emerald-600 block">10%</span>
              <h3 className="font-bold text-sm text-[#0f172a]">Deployment & DevOps</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Live deployment proof-of-work, Dockerization, CI/CD pipeline presence, and cloud readiness.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-8">
            The 3-Step Analysis Pipeline
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</div>
              <h3 className="font-bold text-base text-[#0f172a]">Input Public Signals</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Provide your public GitHub username (no write permissions required) and upload your resume in PDF format.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">2</div>
              <h3 className="font-bold text-base text-[#0f172a]">Cross-Reference Telemetry</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Our analysis engine evaluates code hygiene, parses resume keywords, and checks against target role hiring benchmarks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">3</div>
              <h3 className="font-bold text-base text-[#0f172a]">Receive Actionable Growth Plan</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Explore your unified score, startup vs enterprise readiness indices, identified skill gaps, and custom 12-week roadmap.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0f172a]">
              <Lock className="h-4 w-4 text-emerald-600" /> Data Handling & Privacy Commitments
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              DevLeveler never requests private repository access or write permissions to your GitHub account. All resume processing occurs on protected server-side actions, and parsed text fields are stored with encryption. Users maintain full data autonomy and can delete their data and audit reports from their settings page at any time.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-14 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-center text-[#0f172a] mb-8">
            Frequently Asked Questions About Methodology
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
              Get your transparent Developer Score
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Start with a free profile analysis and receive actionable clarity for your software engineering career.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-blue-800 hover:bg-blue-50 px-8 text-xs font-bold transition-all shadow-md"
              >
                Analyze Profile Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
