import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  ArrowRight, 
  ChevronRight,
  BookOpen,
  Calendar,
  User
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Identify Programming Skill Gaps as a Developer | DevLeveler Guide",
  description:
    "A structured framework for software engineers to diagnose missing technical skills, infrastructure knowledge, and architectural blind spots.",
  alternates: {
    canonical: "https://devleveler.vercel.app/guides/identify-programming-skill-gaps",
  },
  openGraph: {
    title: "How to Identify Programming Skill Gaps as a Developer | DevLeveler Guide",
    description:
      "A structured framework for software engineers to diagnose missing technical skills, infrastructure knowledge, and architectural blind spots.",
    url: "https://devleveler.vercel.app/guides/identify-programming-skill-gaps",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "Guide: Identify Skill Gaps" }],
  },
};

const FAQS = [
  {
    q: "How do I know what technologies to learn next?",
    a: "Collect 10 job descriptions for your target role and list the required technologies. Cross off what you already have in public GitHub repositories. The technologies that appear in >60% of postings but are missing from your code constitute your primary skill gap."
  },
  {
    q: "Why do junior developers get stuck in tutorial hell?",
    a: "Tutorial hell occurs when developers continuously watch video tutorials without building end-to-end applications from scratch. Breaking out requires building a project that connects an external database, implements authentication, handles error states, and is deployed to a live URL."
  },
  {
    q: "What skills differentiate junior and senior engineers?",
    a: "While junior engineers focus on writing feature code, senior engineers prioritize system architecture, data modeling, automated test suites, observability, failure resilience, and CI/CD deployment pipelines."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://devleveler.vercel.app/#guides" },
      { "@type": "ListItem", position: 3, name: "Identify Skill Gaps", item: "https://devleveler.vercel.app/guides/identify-programming-skill-gaps" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Identify Programming Skill Gaps in Your Software Engineering Career",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    datePublished: "2026-03-01T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    description: "Systematic methodology for discovering blind spots in software engineering portfolios: databases, caching, CI/CD, and system architecture."
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

export default function IdentifySkillGapsGuidePage() {
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
            <span className="text-[var(--foreground)] font-semibold">Identify Skill Gaps</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-6">
          <header className="pb-8 border-b border-[var(--border)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[10px] font-bold text-blue-700 tracking-wider uppercase mb-4">
              <BookOpen className="h-3 w-3" /> Career Diagnostics
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              How to Identify Programming Skill Gaps as a Software Engineer
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
              Knowing what to learn next is one of the hardest challenges in software engineering. Here is a framework to uncover your architectural blind spots and focus your learning on high-leverage skills.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Kartik Shukla</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated October 2026</span>
              <span>9 min read</span>
            </div>
          </header>

          <div className="my-8 p-6 rounded-2xl bg-blue-50/80 border border-blue-200">
            <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">
              Quick Answer: The 4-Layer Diagnostic Framework
            </h2>
            <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
              Software engineering proficiency consists of four layers: <strong>Language Fluency</strong> (syntax, async programming), <strong>Data Persistence</strong> (relational schema design, migrations, indexing), <strong>Infrastructure & DevOps</strong> (Docker, CI/CD, cloud deployment), and <strong>Testing & Architecture</strong> (unit/integration tests, design patterns). Most developers are over-indexed on syntax and severely under-indexed on persistence and infrastructure.
            </p>
          </div>

          <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                1. The Common Blind Spots in Developer Profiles
              </h2>
              <p>
                When engineers struggle to break into senior roles or pass technical phone screens, it is rarely because they do not know another frontend framework or syntax trick. The most common deficits occur in infrastructure and data modeling:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-[#0f172a] block text-sm">Blind Spot 1: Relational Data Modeling</strong>
                  <p className="text-xs text-[#334155] mt-1">
                    Relying exclusively on simple NoSQL document stores without understanding relational schemas, foreign key constraints, ACID transactions, and index query plans.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-[#0f172a] block text-sm">Blind Spot 2: Containerization & DevOps</strong>
                  <p className="text-xs text-[#334155] mt-1">
                    Building applications that only run on localhost (`npm run dev`) with no Dockerfile, container orchestration, or automated continuous integration pipeline.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <strong className="text-[#0f172a] block text-sm">Blind Spot 3: Automated Test Coverage</strong>
                  <p className="text-xs text-[#334155] mt-1">
                    Repositories with zero test suites (Jest, Vitest, Playwright, Pytest), sending a signal that code quality has not been verified under edge cases.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                2. How to Benchmark Against Live Market Demand
              </h2>
              <p>
                To calibrate your skills objectively, conduct a 30-minute market audit:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Search for 10 job descriptions on LinkedIn or Indeed matching your exact target title (e.g. &quot;Backend Engineer (Node/Postgres)&quot;).</li>
                <li>Extract all mentioned tools, libraries, and architectural concepts into a spreadsheet.</li>
                <li>Score yourself honestly: Can you build a feature using that tool without following a tutorial step-by-step?</li>
                <li>Filter the list to tools mentioned in 6+ descriptions that you have not deployed to production.</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                3. Automated Skill Gap Detection with DevLeveler
              </h2>
              <p>
                DevLeveler automates this entire diagnostic. By cross-referencing your GitHub language distributions and parsed resume technologies with target engineering roles, our <Link href="/features/skill-gap-analysis" className="text-blue-600 font-semibold underline">Skill Gap Analysis engine</Link> pinpoints exactly which tools and frameworks you need to learn.
              </p>
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
            <h3 className="text-xl font-bold">Discover your technical skill gaps today</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Scan your repositories to see where your profile matches market standards and where blind spots exist.
            </p>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 text-xs font-bold transition-all shadow-md"
              >
                Start Free Diagnostic <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
