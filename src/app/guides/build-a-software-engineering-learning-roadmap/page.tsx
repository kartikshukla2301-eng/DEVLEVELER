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
  title: "How to Build a Software Engineering Learning Roadmap | DevLeveler Guide",
  description:
    "A step-by-step guide to structuring a milestone-driven 12-week software engineering curriculum based on your verified skill gaps.",
  alternates: {
    canonical: "https://devleveler.vercel.app/guides/build-a-software-engineering-learning-roadmap",
  },
  openGraph: {
    title: "How to Build a Software Engineering Learning Roadmap | DevLeveler Guide",
    description:
      "A step-by-step guide to structuring a milestone-driven 12-week software engineering curriculum based on verified skill gaps.",
    url: "https://devleveler.vercel.app/guides/build-a-software-engineering-learning-roadmap",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "Guide: Build Developer Roadmap" }],
  },
};

const FAQS = [
  {
    q: "How much time should I spend on a weekly roadmap milestone?",
    a: "A realistic target is 8 to 12 focused hours per week: 3 hours studying architectural concepts and documentation, and 7 to 9 hours implementing code in a deployed repository."
  },
  {
    q: "Should I focus on building multiple small projects or one large project?",
    a: "Building one comprehensive, fullstack production application with auth, database modeling, background queues, and live deployment is significantly more impressive to hiring teams than five superficial to-do apps."
  },
  {
    q: "How can I evaluate if I am ready for job applications?",
    a: "You are application-ready when your pinned GitHub projects demonstrate fullstack integration, your resume passes ATS keyword parsing with quantified bullets, and you can articulate your system design tradeoffs."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://devleveler.vercel.app/#guides" },
      { "@type": "ListItem", position: 3, name: "Build Learning Roadmap", item: "https://devleveler.vercel.app/guides/build-a-software-engineering-learning-roadmap" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Build a 12-Week Software Engineering Learning Roadmap",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    datePublished: "2026-03-20T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    description: "Methodology for designing personalized 12-week engineering progression milestones with weekly deliverables, architecture goals, and proof-of-work deployments."
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

export default function BuildRoadmapGuidePage() {
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
            <span className="text-[var(--foreground)] font-semibold">Build Developer Roadmap</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-6">
          <header className="pb-8 border-b border-[var(--border)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-3 py-1 text-[10px] font-bold text-pink-700 tracking-wider uppercase mb-4">
              <BookOpen className="h-3 w-3" /> Execution Strategy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              How to Build a 12-Week Software Engineering Learning Roadmap
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
              Most developers abandon generic roadmaps because they are too broad and uncalibrated to their existing knowledge. Here is how to construct a personalized 12-week progression plan focused on verifiable proof-of-work.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Kartik Shukla</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated October 2026</span>
              <span>10 min read</span>
            </div>
          </header>

          <div className="my-8 p-6 rounded-2xl bg-pink-50/80 border border-pink-200">
            <h2 className="text-sm font-bold text-pink-900 uppercase tracking-wider mb-2">
              Quick Answer: The 12-Week Milestone Formula
            </h2>
            <p className="text-xs sm:text-sm text-pink-950 leading-relaxed">
              Divide your 12-week plan into three 4-week phases: <strong>Phase 1 (Weeks 1–4): Core Data & Persistence</strong> (relational schema, migrations, API contracts); <strong>Phase 2 (Weeks 5–8): Scale & Caching</strong> (Redis caching, background workers, Docker containerization); <strong>Phase 3 (Weeks 9–12): Production Delivery & CI/CD</strong> (automated tests, GitHub Actions, monitoring, and live deployment). Every week must end with a committed GitHub pull request.
            </p>
          </div>

          <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                1. The Flaw with Generic Public Roadmaps
              </h2>
              <p>
                Public mind-map roadmaps list hundreds of libraries and tools without distinguishing between what is critical for an entry-level or mid-level developer and what is only needed by enterprise principal architects. This causes analysis paralysis and burnout.
              </p>
              <p>
                An effective roadmap must be <strong>subtractive</strong>: it should omit technologies you have already proven in your repositories and focus exclusively on the high-priority missing dependencies identified in your <Link href="/features/skill-gap-analysis" className="text-blue-600 font-semibold underline">Skill Gap Analysis</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                2. Structuring Weekly Deliverables (Proof-of-Work)
              </h2>
              <p>
                A learning goal without a concrete code deliverable rarely leads to retention. Every weekly milestone should have a verifiable deliverable:
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div><strong>Week 2 Deliverable:</strong> A relational PostgreSQL schema with migration scripts and seed data for 10,000 realistic records.</div>
                <div><strong>Week 6 Deliverable:</strong> A Redis caching middleware layer that reduces endpoint latency under simulated k6 load testing.</div>
                <div><strong>Week 10 Deliverable:</strong> A multi-stage Dockerfile that compiles a production bundle under 150 MB with an active GitHub Actions CI pipeline.</div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                3. Automated Roadmap Generation with DevLeveler
              </h2>
              <p>
                Instead of manually compiling learning checklists, you can use <Link href="/features/developer-roadmap" className="text-blue-600 font-semibold underline">DevLeveler&apos;s Roadmap Engine</Link>. It analyzes your GitHub activity and uploaded resume to instantly generate a tailored 12-week roadmap targeted to your specific career path (Frontend, Backend, Fullstack, or DevOps).
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
            <h3 className="text-xl font-bold">Generate your 12-week roadmap</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Get an ordered, milestone-driven curriculum based on your actual skill gaps and target engineering role.
            </p>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 text-xs font-bold transition-all shadow-md"
              >
                Create Roadmap Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
