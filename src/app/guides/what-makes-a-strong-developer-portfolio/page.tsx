import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight,
  BookOpen,
  Calendar,
  User
} from "lucide-react";

export const metadata: Metadata = {
  title: "What Makes a Strong Developer Portfolio | DevLeveler Guide",
  description:
    "An evidence-based guide for software engineers on building a compelling developer portfolio: live proof-of-work, system architecture, and recruiter expectations.",
  alternates: {
    canonical: "https://devleveler.vercel.app/guides/what-makes-a-strong-developer-portfolio",
  },
  openGraph: {
    title: "What Makes a Strong Developer Portfolio | DevLeveler Guide",
    description:
      "An evidence-based guide for software engineers on building a compelling developer portfolio: live proof-of-work, system architecture, and recruiter expectations.",
    url: "https://devleveler.vercel.app/guides/what-makes-a-strong-developer-portfolio",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "Guide: What Makes a Strong Developer Portfolio" }],
  },
};

const FAQS = [
  {
    q: "How long do engineering recruiters spend reviewing a developer portfolio?",
    a: "Technical recruiters and hiring managers typically spend 30 to 60 seconds on a portfolio. They immediately look for working live demo links, clean mobile layout, and direct links to public GitHub repositories."
  },
  {
    q: "Do I need complex 3D animations or WebGL on my developer portfolio?",
    a: "No. Unless you are specifically targeting 3D graphics or creative frontend agency roles, elaborate animations can slow down load times and frustrate hiring managers. Clear technical explanations, fast loading, and working applications are far more persuasive."
  },
  {
    q: "How many projects should I feature on my portfolio?",
    a: "Feature 3 to 4 substantial, production-deployed projects. Two deployed fullstack applications with authentication, databases, and automated testing are far more impressive than eight superficial tutorial clones."
  },
  {
    q: "How does DevLeveler evaluate portfolio websites?",
    a: "DevLeveler's portfolio engine checks the technical markup of your URL: head metadata, viewport tags, semantic hierarchy, and live demonstration links, contributing 10% toward your composite Developer Score."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://devleveler.vercel.app/#guides" },
      { "@type": "ListItem", position: 3, name: "Strong Developer Portfolio", item: "https://devleveler.vercel.app/guides/what-makes-a-strong-developer-portfolio" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "What Makes a Strong Developer Portfolio in 2026: Evidence-Based Engineering Guide",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    datePublished: "2026-03-25T00:00:00Z",
    dateModified: "2026-10-31T00:00:00Z",
    description: "Practical engineering principles for structuring a software developer portfolio that provides credible proof-of-work to technical hiring managers."
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

export default function StrongDeveloperPortfolioGuidePage() {
  const safeJsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-6 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground-muted)]">Guides</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)] font-semibold">Strong Developer Portfolio</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-6">
          <header className="pb-8 border-b border-[var(--border)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[10px] font-bold text-emerald-700 tracking-wider uppercase mb-4">
              <BookOpen className="h-3 w-3" /> Technical Career Guide
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              What Makes a Strong Developer Portfolio: Principles for Software Engineers
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
              In a crowded hiring market, a developer portfolio is not a graphic design showcase—it is technical proof-of-work. Here is what engineering managers look for when reviewing candidates and how to structure a high-signal portfolio.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Kartik Shukla</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated October 2026</span>
              <span>7 min read</span>
            </div>
          </header>

          <div className="my-8 p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <h2 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-2">
              The 60-Second Reality of Portfolio Reviews
            </h2>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              Hiring managers rarely read long introductory essays. Within 60 seconds, they look for: <strong>1. Live Working Demos</strong> (can I click and interact?), <strong>2. GitHub Source Code</strong> (is the repository clean and documented?), <strong>3. Technical Decision Context</strong> (why did you pick this architecture?), and <strong>4. Clean Mobile/Web Layout</strong> (does it render without layout traps?).
            </p>
          </div>

          <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                1. Replace Tutorial Clones with Production Architectures
              </h2>
              <p>
                The fastest way to signal junior execution is featuring generic course projects: basic to-do lists, weather apps pulling from open APIs, or uncustomized boilerplate templates. These signal that you can follow video instructions, but not that you can architect production systems.
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                <span className="font-bold text-[#0f172a] block">What makes a project &quot;production-grade&quot;?</span>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li><strong>Data Persistence & Relationships:</strong> Uses a real database (PostgreSQL, MySQL) with migrations and indexing.</li>
                  <li><strong>Authentication & Security:</strong> Implements secure session handling, protected routes, and input validation.</li>
                  <li><strong>Resilience & Caching:</strong> Includes caching layers (e.g. Redis), rate-limiting, and graceful error handling.</li>
                  <li><strong>Live Public Deployment:</strong> Accessible on a reliable host (Vercel, Netlify, Render, AWS, Fly.io) with HTTPS.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                2. Structure Each Project Card for Rapid Evaluation
              </h2>
              <p>
                Every project listed on your portfolio should answer four questions in under 15 seconds of scanning:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <span className="font-bold text-xs text-[#0f172a] block">1. The Problem</span>
                  <p className="text-xs text-slate-600">What specific technical or user problem does this application solve?</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <span className="font-bold text-xs text-[#0f172a] block">2. The Tech Stack</span>
                  <p className="text-xs text-slate-600">Which frameworks, databases, and cloud services were selected and why?</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <span className="font-bold text-xs text-[#0f172a] block">3. Key Engineering Challenge</span>
                  <p className="text-xs text-slate-600">What was the hardest architectural bottleneck, and how did you resolve it?</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <span className="font-bold text-xs text-[#0f172a] block">4. Direct Links</span>
                  <p className="text-xs text-slate-600">One link to the live demo, and one link directly to the GitHub source repository.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                3. Technical Hygiene: Meta Tags and Mobile Viewports
              </h2>
              <p>
                When an engineering manager shares your portfolio URL in an internal Slack or Teams channel, what happens? If OpenGraph meta tags are configured properly, an informative card with your name, title, and social preview appears. If missing, it renders as a bare, unformatted link.
              </p>
              <p>
                Similarly, many technical reviewers open candidate links on mobile devices while traveling or between meetings. If your navigation menu breaks on small screens or tables overflow horizontally, it creates an immediate negative impression.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                4. How DevLeveler Audits Portfolio URLs
              </h2>
              <p>
                In DevLeveler&apos;s scoring methodology, online deployment and proof-of-work account for <strong>10% of the composite Developer Score</strong>. The <Link href="/features/portfolio-analysis" className="text-blue-600 font-semibold underline">Portfolio Analyzer</Link> fetches your live URL to inspect HTML metadata, semantic hierarchy, responsive viewport declarations, and proof-of-work indicators.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> What Automated Audits Check
                  </span>
                  <p className="text-emerald-950">
                    HTML document structure, viewport tags, OpenGraph hygiene, semantic order, and deployment responsiveness.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-xs space-y-1.5">
                  <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-600" /> What Requires Human Judgment
                  </span>
                  <p className="text-amber-950">
                    Graphic visual style, personal branding voice, and how convincingly you explain system design tradeoffs in interviews.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Cross-Link Hub */}
          <section className="my-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Want to test your live portfolio website?</span>
              <span className="text-xs text-slate-500">Run your URL through DevLeveler&apos;s Portfolio Analyzer for an instant structural audit.</span>
            </div>
            <Link
              href="/features/portfolio-analysis"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-bold transition-all shadow-sm shrink-0"
            >
              Analyze Portfolio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>

          {/* FAQs */}
          <section className="my-14 pt-10 border-t border-[var(--border)]">
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">
              Frequently Asked Questions About Developer Portfolios
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
          <div className="rounded-3xl bg-slate-900 p-8 text-white text-center my-10 shadow-lg">
            <h3 className="text-xl font-bold">Audit your developer portfolio today</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Scan your live URL to uncover structural hygiene improvements and calculate your full Developer Score.
            </p>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 text-xs font-bold transition-all shadow-md"
              >
                Start Free Analysis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
