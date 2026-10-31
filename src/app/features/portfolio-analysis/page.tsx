import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  Globe, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Smartphone,
  Eye,
  Award,
  CheckCircle2,
  AlertCircle,
  Terminal,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Portfolio Analyzer & Web Audit Engine | DevLeveler",
  description:
    "Audit your developer portfolio website across HTML structure, meta tags, responsive viewport indicators, accessibility standards, and proof-of-work credibility.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/portfolio-analysis",
  },
  openGraph: {
    title: "Developer Portfolio Analyzer & Web Audit Engine | DevLeveler",
    description:
      "Audit your developer portfolio website across HTML structure, meta tags, responsive viewport indicators, accessibility standards, and proof-of-work credibility.",
    url: "https://devleveler.vercel.app/features/portfolio-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Portfolio Analyzer" }],
  },
};

const FAQS = [
  {
    q: "How does DevLeveler inspect my portfolio website?",
    a: "DevLeveler performs a server-side fetch of your live portfolio URL using a specialized user-agent to inspect up to 4,500 characters of HTML head metadata, viewport tags, semantic hierarchy, and structural elements."
  },
  {
    q: "Does DevLeveler run a headless browser with Lighthouse or Core Web Vitals?",
    a: "No. DevLeveler performs structural HTML and metadata inspection rather than running an emulated headless browser. It evaluates your site's technical markup, mobile viewport responsiveness indicators, meta tag hygiene, and architectural clarity."
  },
  {
    q: "What 5 dimensions are evaluated in the portfolio audit?",
    a: "The engine scores five dimensions on a 0-100 scale: Performance (HTML payload structure and asset hygiene), SEO (meta tags, descriptions, titles), Mobile (viewport configuration and responsive layout indicators), Design (semantic hierarchy and clean structure), and Accessibility (heading order, contrast cues, and semantic landmark tags)."
  },
  {
    q: "Do I need a custom domain for a strong portfolio score?",
    a: "No. While a custom domain is a professional touch, clean deployments on modern platforms like Vercel, Netlify, Cloudflare Pages, or GitHub Pages are completely acceptable as long as the markup is semantic and live projects are accessible."
  },
  {
    q: "How does portfolio analysis factor into my composite Developer Score?",
    a: "Portfolio deployment and online proof-of-work represent 10% of the composite Developer Score in DevLeveler's scoring engine."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://devleveler.vercel.app/#features" },
      { "@type": "ListItem", position: 3, name: "Portfolio Analysis", item: "https://devleveler.vercel.app/features/portfolio-analysis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler Developer Portfolio Analyzer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Evaluates software engineer portfolio URLs across HTML structure, meta tags, mobile viewport indicators, accessibility standards, and live project proof-of-work."
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

export default function PortfolioAnalysisPage() {
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
            <span className="text-[var(--foreground)] font-semibold">Portfolio Analysis</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-[10px] font-bold text-emerald-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            10% of Composite Developer Score
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Developer Portfolio Analyzer & Web Audit Engine
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Your portfolio website is your primary live proof-of-work. DevLeveler audits your live portfolio URL across HTML structure, meta tags, mobile viewport indicators, accessibility standards, and live demonstration links.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Audit Portfolio Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/what-makes-a-strong-developer-portfolio"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              Read Portfolio Guide
            </Link>
          </div>
        </section>

        {/* 3-Step Actual Product Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#0f172a]">
              How the Portfolio Audit Engine Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#334155]">
              Server-side URL crawler and structural HTML assessment across 5 core technical dimensions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs font-black text-emerald-700 font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Live URL Crawl & Snippet Ingestion</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Provide your portfolio URL. Our crawler safely requests the page, extracting the head metadata, OpenGraph tags, semantic container hierarchy, and title configuration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-black text-blue-700 font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">5-Dimension Structural Audit</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                AI evaluates your technical markup across Performance structure, Discoverability SEO, Mobile viewport compatibility, Design hierarchy, and Semantic Accessibility.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-xs font-black text-purple-700 font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Actionable Polish Recommendations</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Receive categorized suggestions prioritized by impact (high, medium, low) to fix missing meta tags, viewport traps, and proof-of-work link deficiencies.
              </p>
            </div>
          </div>
        </section>

        {/* 5 Evaluated Dimensions */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Structural Performance</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Assesses HTML structure, external asset references, and clean document weight to avoid bloated entry payloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Mobile Viewport & Layout</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Checks for proper viewport meta declarations and responsive layout indicators for mobile hiring managers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Eye className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Semantic Accessibility</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Evaluates semantic HTML structure, proper heading order (H1-H3), and document landmarks for accessible reading.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Award className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Proof-of-Work Credibility</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Audits the presentation of deployed live demonstration links, system architecture notes, and GitHub source links.
              </p>
            </div>
          </div>
        </section>

        {/* Example Output (Clearly Labeled as Illustrative Schema Example) */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Illustrative Output Example
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Granular Audit Dimensions & Prioritized Feedback
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                DevLeveler outputs 5 distinct dimension scores alongside categorized recommendations with impact levels. Here is an illustrative sample of the audit payload:
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Performance Score:</strong> Evaluates clean markup and asset efficiency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>SEO Score:</strong> Verifies meta title, description, and OpenGraph hygiene</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Mobile & Design Score:</strong> Viewport settings and visual semantic hierarchy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Accessibility Score:</strong> Heading sequence and semantic container tags</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Illustrative Output Example</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">portfolio_audit.json</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">Audit Status: Complete</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Performance</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">88 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">SEO Meta</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">92 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Mobile</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">95 / 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Design Structure</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">85 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Accessibility</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">80 / 100</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Sample Recommendations:</span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50/70 border border-amber-200/70 text-amber-950">
                      <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold text-[9px] uppercase mt-0.5">High</span>
                      <span>Add explicit meta description and OpenGraph social preview tags to improve link sharing.</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-50/70 border border-blue-200/70 text-blue-950">
                      <span className="px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 font-bold text-[9px] uppercase mt-0.5">Medium</span>
                      <span>Ensure all project cards provide working live deployment links alongside GitHub source repos.</span>
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
                  <span><strong>Identifies Structural Flaws:</strong> Flags missing viewport configurations, broken titles, or missing meta tags instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Proof-of-Work Verification:</strong> Prompts developers to include verifiable deployed links rather than screenshots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Zero Installation:</strong> Completely server-side; paste your URL and receive feedback in seconds.</span>
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
                  <span><strong>Structural, Not Lighthouse:</strong> Evaluates HTML snippet structure and metadata rather than emulated Core Web Vitals milliseconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Design Taste is Subjective:</strong> Automated tools evaluate semantic layout indicators; human recruiters evaluate brand feel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Requires Public URL:</strong> Portfolios deployed behind authentication or local hosts (localhost) cannot be crawled.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Link Hub */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Want to learn what makes a developer portfolio impress technical recruiters?</span>
              <span className="text-xs text-slate-500">Read our evidence-based guide covering project proof-of-work, system diagrams, and deployment hygiene.</span>
            </div>
            <Link
              href="/guides/what-makes-a-strong-developer-portfolio"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shrink-0"
            >
              Read Portfolio Guide <ChevronRight className="h-3 w-3" />
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
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Is your portfolio ready for job applications?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Enter your live portfolio URL to receive structural audit scores, meta tag checks, and actionable polish tips.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 text-xs font-bold transition-all shadow-md"
              >
                Scan My Portfolio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
