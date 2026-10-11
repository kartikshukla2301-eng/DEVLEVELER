import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  GitCommit, 
  Code2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "GitHub Profile Analyzer & Code Telemetry | DevLeveler",
  description:
    "Analyze your public GitHub profile and repositories. Evaluate commit velocity, repository architecture, language diversity, and code hygiene for tech careers.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/github-analysis",
  },
  openGraph: {
    title: "GitHub Profile Analyzer & Code Telemetry | DevLeveler",
    description:
      "Deep telemetry analysis of your public GitHub repositories, commit velocity, and language distribution.",
    url: "https://devleveler.vercel.app/features/github-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler GitHub Analysis" }],
  },
};

const FAQS = [
  {
    q: "Does DevLeveler require private or write access to my GitHub account?",
    a: "No. DevLeveler only requires your public GitHub username or read access to public repositories. We never request write permissions, repository admin access, or access to private code."
  },
  {
    q: "What specific GitHub signals does DevLeveler evaluate?",
    a: "DevLeveler analyzes public repository structures, commit velocity over time, primary language distribution, repository documentation hygiene (READMEs, licenses), and project architecture depth."
  },
  {
    q: "Can GitHub telemetry guarantee job placement?",
    a: "No automated tool can guarantee job placement. DevLeveler provides objective telemetry to highlight code quality strengths and blind spots so developers can present credible proof-of-work to recruiters."
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
    description: "Evaluates public GitHub repositories, commit consistency, language breadth, and repository hygiene to quantify developer proof-of-work."
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

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-[10px] font-bold text-blue-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Telemetry Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            GitHub Profile Analyzer & Code Telemetry
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            DevLeveler analyzes public GitHub activity to evaluate commit velocity, codebase structure, language distribution, and repository hygiene—translating raw Git events into transparent developer capability metrics.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Analyze Your GitHub Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              How Telemetry Works
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                What DevLeveler Evaluates in Your GitHub Profile
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                Rather than treating commit count as a superficial vanity metric, DevLeveler inspects the structural characteristics of your public GitHub repositories to measure technical breadth and software engineering hygiene.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs">
                  <div className="flex items-center gap-3 font-bold text-sm text-[#0f172a]">
                    <GitCommit className="h-4 w-4 text-blue-600" /> Commit Velocity & Consistency
                  </div>
                  <p className="mt-1.5 text-xs text-[#334155] leading-relaxed">
                    Evaluates multi-month activity regularity, consistency between major releases, and commit dispersion across projects instead of one-off artificial burst activity.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs">
                  <div className="flex items-center gap-3 font-bold text-sm text-[#0f172a]">
                    <Layers className="h-4 w-4 text-indigo-600" /> Language & Stack Distribution
                  </div>
                  <p className="mt-1.5 text-xs text-[#334155] leading-relaxed">
                    Parses byte-level code volume across languages (TypeScript, Python, Go, Rust, Java) to quantify specialization depth versus multi-paradigm adaptability.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs">
                  <div className="flex items-center gap-3 font-bold text-sm text-[#0f172a]">
                    <Code2 className="h-4 w-4 text-purple-600" /> Repository Architecture & Hygiene
                  </div>
                  <p className="mt-1.5 text-xs text-[#334155] leading-relaxed">
                    Scans repository completeness: comprehensive README documentation, package configurations, license declarations, test coverage directories, and CI/CD workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                Privacy & Technical Integrity
              </h3>
              <ul className="space-y-3 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Write Access:</strong> We strictly query public GitHub APIs; DevLeveler never pushes commits or modifies repository configurations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Public Repositories Only:</strong> Private repositories are never accessed without explicit, granular user consent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Objective Scope:</strong> GitHub metrics represent proof-of-work indicators; they complement but do not replace system design interviews or behavioral assessments.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mx-auto max-w-4xl px-6 mt-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to audit your GitHub profile?
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Connect your public GitHub username in seconds to view your commit patterns, language distribution, and Developer Score breakdown.
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
