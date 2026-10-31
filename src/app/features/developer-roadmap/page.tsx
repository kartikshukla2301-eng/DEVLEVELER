import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Terminal,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personalized Developer Career Roadmap & Milestone Engine | DevLeveler",
  description:
    "Generate milestone-driven 12-week software engineering roadmaps customized to your current skills, diagnosed gaps, and target technical roles.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/developer-roadmap",
  },
  openGraph: {
    title: "Personalized Developer Career Roadmap & Milestone Engine | DevLeveler",
    description:
      "Generate milestone-driven 12-week software engineering roadmaps customized to your current skills and target technical roles.",
    url: "https://devleveler.vercel.app/features/developer-roadmap",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Developer Roadmap" }],
  },
};

const FAQS = [
  {
    q: "How does DevLeveler construct my 12-week roadmap?",
    a: "DevLeveler combines identified gaps in your GitHub repositories and resume with your selected target engineering track (e.g., Senior Backend Engineer, Fullstack Architect). It synthesizes an ordered 12-week curriculum with exactly two progressive weekly goals per week, three monthly milestones, and concrete project specifications."
  },
  {
    q: "Does DevLeveler host video tutorials or courses?",
    a: "No. DevLeveler provides an evidence-based engineering curriculum and project milestone deliverables rather than hosting video courses. You build production-ready projects in your own repositories, remediating verified architectural gaps."
  },
  {
    q: "Can I track my roadmap progress over time?",
    a: "Yes. In the DevLeveler dashboard, you can check off weekly goals as completed, earn XP rewards, level up your profile, and trigger re-scans to verify score improvements as your GitHub activity evolves."
  },
  {
    q: "What engineering tracks are supported?",
    a: "DevLeveler generates custom curricula for all major engineering specializations, including Frontend Engineering, Backend Development, Fullstack Systems, Cloud DevOps, and Distributed Architecture."
  },
  {
    q: "How does the roadmap relate to my Developer Score?",
    a: "As you complete roadmap milestones, deploy real applications, and push new commits to GitHub, re-scanning your profile automatically updates your composite Developer Score across the 5 pillars."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://devleveler.vercel.app/#features" },
      { "@type": "ListItem", position: 3, name: "Developer Roadmap", item: "https://devleveler.vercel.app/features/developer-roadmap" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler Career Roadmap Engine",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Generates personalized 12-week milestone curriculum paths based on GitHub analysis and resume skill gaps."
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

export default function DeveloperRoadmapPage() {
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
            <span className="text-[var(--foreground)] font-semibold">Developer Roadmap</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-3.5 py-1 text-[10px] font-bold text-pink-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Milestone Curriculum Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Personalized Developer Career Roadmap
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Generic roadmaps overwhelm developers with hundreds of non-essential tools. DevLeveler produces customized, weekly engineering milestones calibrated specifically to your diagnosed skill gaps and target engineering roles.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Generate My Roadmap Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/build-a-software-engineering-learning-roadmap"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              Read Roadmap Guide
            </Link>
          </div>
        </section>

        {/* 3-Step Actual Product Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#0f172a]">
              How the 12-Week Roadmap Engine Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#334155]">
              Dynamic progression modeling tailored to your verified telemetry in three simple phases.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-pink-50 border border-pink-200 flex items-center justify-center text-xs font-black text-pink-700 font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Ingest Demonstrated Skills & Gaps</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Connects your verified technologies and diagnosed skill gaps so you never waste time studying tools you already demonstrate in GitHub or on your resume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-black text-blue-700 font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">12-Week Milestone Synthesis</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Generates 24 focused weekly deliverables (2 per week) organized into 3 monthly milestones, accompanied by real-world capstone project specifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-700 font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Interactive Progress & XP Tracking</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Check off deliverables in your dashboard, earn developer XP rewards, and trigger updated re-scans to verify score growth as you push code.
              </p>
            </div>
          </div>
        </section>

        {/* 12-Week Progression Structure */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-8 text-center sm:text-left">
            The 3-Month Progression Architecture
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-black text-blue-700 text-xs">
                Month 1
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Core Foundations & Persistence</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Weeks 1 to 4 focus on remediating foundational data modeling, relational databases, migration management, and structured REST/gRPC API contracts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-black text-indigo-700 text-xs">
                Month 2
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Scalability & Performance</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Weeks 5 to 8 introduce in-memory caching layers (Redis), asynchronous task queues, containerization (Docker), and query optimization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-black text-purple-700 text-xs">
                Month 3
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Production CI/CD & Delivery</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Weeks 9 to 12 finalize automated integration test suites, deployment pipelines, error monitoring, and portfolio proof-of-work delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Example Output (Clearly Labeled as Illustrative Schema Example) */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Illustrative Schema Output Example
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Actionable Engineering Deliverables, Week by Week
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                Each weekly milestone includes two concise, progressive deliverables paired with milestone project ideas calibrated to your target track:
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>24 Weekly Deliverables:</strong> Bite-sized, progressive goals without fluff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>3 Monthly Milestones:</strong> Measurable architectural capabilities unlocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span><strong>Capstone Project Ideas:</strong> Real-world applications to showcase on GitHub</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Illustrative Output Example</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">curriculum_schedule.json</span>
                  </div>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">12 Weeks / 24 Goals</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-blue-700">
                      <span>WEEK 1: PERSISTENCE & SCHEMA</span>
                      <span className="font-mono">In Progress</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">Goal 1: Design normalized PostgreSQL schema with Prisma ORM migrations.</p>
                    <p className="text-[11px] text-slate-700 font-medium">Goal 2: Implement structured repository pattern with database health checks.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-indigo-700">
                      <span>WEEK 5: IN-MEMORY CACHING</span>
                      <span className="font-mono text-slate-400">Upcoming</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">Goal 1: Configure Redis container with connection pooling and TTL policies.</p>
                    <p className="text-[11px] text-slate-700 font-medium">Goal 2: Implement cache-aside pattern on high-throughput query endpoints.</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Recommended Capstone Project:</span>
                  <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-200/60 text-purple-950 text-xs">
                    <strong className="block text-purple-900 font-mono">Distributed Rate-Limiter & Event Queue</strong>
                    <span className="text-[11px] text-purple-800">Technologies: Node.js, TypeScript, Redis, Docker, Jest (Estimated 40h)</span>
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
                  <span><strong>Personalized Sequencing:</strong> Skips technologies you already demonstrate to prioritize high-value architectural missing tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Clear Project Deliverables:</strong> Replaces passive video watching with concrete codebases you deploy to public repositories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Built-In Accountability:</strong> Mark weekly goals complete and earn XP as you push commits to GitHub.</span>
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
                  <span><strong>Requires Self-Driven Execution:</strong> DevLeveler provides the curriculum and milestones; you write and debug the code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Not a Coding Bootcamp:</strong> Does not offer 1-on-1 human tutoring or proprietary video lecture libraries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Flexible Pacing:</strong> 12 weeks represents a realistic timeline; busy professionals can adjust pacing to their availability.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Link Hub */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Looking for a framework to structure your engineering study time?</span>
              <span className="text-xs text-slate-500">Read our practical guide on building evidence-based learning roadmaps and balancing theory with code.</span>
            </div>
            <Link
              href="/guides/build-a-software-engineering-learning-roadmap"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shrink-0"
            >
              Read Roadmap Guide <ChevronRight className="h-3 w-3" />
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
              Get your personalized engineering curriculum
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Build the exact skills hiring teams test for, with concrete weekly targets and milestone deliverables.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 text-xs font-bold transition-all shadow-md"
              >
                Start Your Roadmap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
