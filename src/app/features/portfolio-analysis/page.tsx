import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Smartphone,
  Eye,
  Award
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Portfolio Analyzer & Audit Engine | DevLeveler",
  description:
    "Audit your developer portfolio website for load speed, mobile responsiveness, project proof-of-work credibility, and accessibility standards.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/portfolio-analysis",
  },
  openGraph: {
    title: "Developer Portfolio Analyzer & Audit Engine | DevLeveler",
    description:
      "Audit your developer portfolio website for load speed, mobile responsiveness, project proof-of-work credibility, and accessibility standards.",
    url: "https://devleveler.vercel.app/features/portfolio-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Portfolio Analyzer" }],
  },
};

const FAQS = [
  {
    q: "What makes a developer portfolio impress technical recruiters?",
    a: "Recruiters and engineering managers look for fast loading times (<2s), responsive mobile layouts, working live demonstration links, clear architecture explanations, and direct links to GitHub source code."
  },
  {
    q: "What metrics does the portfolio audit check?",
    a: "DevLeveler audits 5 core portfolio dimensions: Performance Speed, Search & Discoverability SEO, Mobile Viewport Layout, Design Hierarchy, and Accessibility (a11y) standards."
  },
  {
    q: "Do I need a custom domain for my portfolio?",
    a: "While a custom domain is a professional touch, clean deployments on modern platforms like Vercel, Netlify, or GitHub Pages are completely acceptable if the site is performant, responsive, and contains working live applications."
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
    description: "Evaluates software engineer portfolio URLs across performance, mobile responsiveness, accessibility, design layout, and live project demos."
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

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-[10px] font-bold text-emerald-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Portfolio Audit Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Developer Portfolio Analyzer & Audit Engine
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Your portfolio is your primary proof-of-work. DevLeveler audits your live portfolio URL for speed, mobile responsiveness, project architecture clarity, and accessibility—ensuring technical recruiters stay engaged.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Audit Portfolio Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#preview"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              See Sample Audit
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Zap className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Performance & LCP</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Measures Largest Contentful Paint and JavaScript payload overhead to prevent bounce rates from busy hiring managers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Mobile Responsiveness</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Checks viewport overflow, touch target sizes, and layout fidelity across mobile and tablet devices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Eye className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Accessibility (a11y)</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Verifies contrast ratios, ARIA landmarks, image alt texts, and semantic structure across portfolio pages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Award className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Proof-of-Work Verification</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Scans for active deployment URLs, live demo responsiveness, and linked GitHub source repositories.
              </p>
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
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Is your portfolio ready for job applications?
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Enter your portfolio URL to receive performance metrics, accessibility audit scores, and actionable polish tips.
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
