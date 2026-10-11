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
  title: "How to Analyze Your GitHub Profile for Tech Jobs | DevLeveler Guide",
  description:
    "A practical guide on analyzing your GitHub profile: commit consistency, repository documentation, code architecture, and what tech recruiters look for.",
  alternates: {
    canonical: "https://devleveler.vercel.app/guides/analyze-github-profile",
  },
  openGraph: {
    title: "How to Analyze Your GitHub Profile for Tech Jobs | DevLeveler Guide",
    description:
      "A practical guide on analyzing your GitHub profile: commit consistency, repository documentation, code architecture, and what recruiters evaluate.",
    url: "https://devleveler.vercel.app/guides/analyze-github-profile",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "Guide: Analyze GitHub Profile" }],
  },
};

const FAQS = [
  {
    q: "Do recruiters read every line of code on GitHub?",
    a: "No. Recruiters typically spend 30 to 90 seconds reviewing a GitHub profile. They check pinned repositories, README quality, live demo links, recent commit consistency, and overall repository organization."
  },
  {
    q: "Should I delete old beginner projects from GitHub?",
    a: "You do not need to delete them. Instead, pin your best 3 to 6 production-ready projects to your profile overview, and ensure those pinned repositories have clear READMEs and architecture diagrams."
  },
  {
    q: "What is repository hygiene in software engineering?",
    a: "Repository hygiene includes clear directory structures (src, tests, docs), .gitignore files preventing secrets from leaking, descriptive commit messages, and a reproducible setup command in the README."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://devleveler.vercel.app/#guides" },
      { "@type": "ListItem", position: 3, name: "Analyze GitHub Profile", item: "https://devleveler.vercel.app/guides/analyze-github-profile" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Analyze Your GitHub Profile for Software Engineering Jobs",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    datePublished: "2026-01-15T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    description: "Step-by-step technical guide for software engineers on self-auditing public GitHub repositories, commit hygiene, and code documentation."
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

export default function AnalyzeGitHubProfileGuidePage() {
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--foregroundmuted)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground-muted)]">Guides</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)] font-semibold">Analyze GitHub Profile</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-6">
          <header className="pb-8 border-b border-[var(--border)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[10px] font-bold text-blue-700 tracking-wider uppercase mb-4">
              <BookOpen className="h-3 w-3" /> Developer Career Guide
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              How to Analyze Your GitHub Profile for Software Engineering Roles
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
              For developers with limited formal experience or those transitioning into new tech stacks, a public GitHub profile represents your strongest proof-of-work. Here is how technical hiring teams evaluate your repositories and how to audit your own code.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Kartik Shukla</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated October 2026</span>
              <span>8 min read</span>
            </div>
          </header>

          <div className="my-8 p-6 rounded-2xl bg-blue-50/80 border border-blue-200">
            <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">
              Quick Answer: The 5-Point GitHub Audit
            </h2>
            <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
              Technical recruiters evaluate GitHub profiles in 60 seconds across five dimensions: <strong>Pinned Projects</strong> (3–6 substantial codebases), <strong>README Clarity</strong> (problem statement, architecture diagram, live demo URL), <strong>Commit Discipline</strong> (atomic commits with descriptive messages), <strong>Repository Hygiene</strong> (tests, .gitignore, clean licenses), and <strong>Language Breadth</strong> (modern production stacks over tutorial clones).
            </p>
          </div>

          <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                1. Curating Your Pinned Repositories
              </h2>
              <p>
                When an engineering manager opens your GitHub profile, the pinned repositories section is the first visual element they encounter. If this space is populated by abandoned course assignments or boilerplate tutorial clones (such as basic to-do apps), it sends an immediate signal of junior-level execution.
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                <span className="font-bold text-[#0f172a] block">Pinned Project Checklist:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pin 3 to 6 projects that reflect the stack you want to be hired for.</li>
                  <li>Include at least one fullstack or end-to-end deployed application.</li>
                  <li>Ensure each repository has an active live demo link in the repository header.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                2. Writing Production-Grade READMEs
              </h2>
              <p>
                No matter how elegant your backend architecture or state management is, reviewers will not clone and configure your project unless the README provides an immediate mental model of what it does.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Problem & Context:</strong> What real-world user or business problem does this solve?</li>
                <li><strong>Architecture & System Design:</strong> A clean diagram or bullet breakdown of databases, cache layers, API endpoints, and client frameworks.</li>
                <li><strong>Key Engineering Decisions:</strong> Why did you choose PostgreSQL over MongoDB? Why Redis for rate limiting?</li>
                <li><strong>Local Setup in Under 3 Steps:</strong> Clean clone, environment configuration, and startup scripts.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                3. What GitHub Telemetry Can and Cannot Reveal
              </h2>
              <p>
                Automated telemetry—such as the analysis performed by <Link href="/features/github-analysis" className="text-blue-600 font-semibold underline">DevLeveler&apos;s GitHub Engine</Link>—is powerful for diagnosing consistency, language balance, and repository hygiene.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs space-y-2">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> What Telemetry Confirms
                  </span>
                  <p className="text-emerald-950">
                    Sustained commit velocity over months, code organization standards, test file presence, and multi-language breadth.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-xs space-y-2">
                  <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 text-amber-600" /> What It Cannot Measure
                  </span>
                  <p className="text-amber-950">
                    Live system communication skills, collaborative pair-programming adaptability, and deep business domain intuition.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                4. Automated GitHub Self-Audit with DevLeveler
              </h2>
              <p>
                Instead of guessing where your repositories stand relative to software engineering benchmarks, you can connect your public GitHub username to DevLeveler for an instant audit. The telemetry engine checks your language distribution, commit dispersion, and repository structures to compute an objective score.
              </p>
              <div className="pt-2">
                <Link
                  href="/features/github-analysis"
                  className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 text-sm"
                >
                  Learn more about our GitHub Telemetry Engine <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          <section className="my-14 pt-10 border-t border-[var(--border)]">
            <h2 className="text-2xl font-extrabold text-[#0f172a] mb-6">
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

          <div className="rounded-3xl bg-slate-900 p-8 text-white text-center my-10 shadow-lg">
            <h3 className="text-xl font-bold">Audit your GitHub profile today</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Scan your public repositories to uncover code hygiene insights and calculate your Developer Score in seconds.
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
