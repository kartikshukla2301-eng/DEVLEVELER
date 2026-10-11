import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personalized Developer Learning Roadmap | DevLeveler",
  description:
    "Generate milestone-driven 12-week software engineering roadmaps customized to your current skills and target technical roles.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/developer-roadmap",
  },
  openGraph: {
    title: "Personalized Developer Learning Roadmap | DevLeveler",
    description:
      "Generate milestone-driven 12-week software engineering roadmaps customized to your current skills and target technical roles.",
    url: "https://devleveler.vercel.app/features/developer-roadmap",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler Developer Roadmap" }],
  },
};

const FAQS = [
  {
    q: "How are DevLeveler roadmaps generated?",
    a: "DevLeveler combines identified gaps in your GitHub repositories and resume with your selected target engineering track (e.g. Senior Fullstack, Cloud DevOps) to construct an ordered 12-week curriculum."
  },
  {
    q: "Are the roadmaps generic or personalized?",
    a: "Roadmaps are dynamic and personalized: if you already demonstrate expertise in React or Node.js in your repositories, those weeks are skipped in favor of advanced topics like distributed caching, Dockerization, or PostgreSQL query tuning."
  },
  {
    q: "Can I track my progress over time?",
    a: "Yes. Registered users can mark weekly milestones as completed, earn XP, and trigger updated re-scans to verify score improvements as their GitHub activity evolves."
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

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-3.5 py-1 text-[10px] font-bold text-pink-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Milestone Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            Personalized Developer Learning Roadmap
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Generic roadmaps overwhelm developers with hundreds of non-essential tools. DevLeveler produces customized, weekly engineering milestones calibrated specifically to the technologies you are currently missing.
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
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              Read Roadmap Guide
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-8">
            How the 12-Week Progression Model Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-black text-blue-700 text-xs">
                W 1-4
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Core Foundations & Persistence</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Remediates foundational data modeling, relational databases, migrations, and structured API contracts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-black text-indigo-700 text-xs">
                W 5-8
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Scalability & Performance</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Introduces memory caching layers (Redis), asynchronous queues, containerization, and rate-limiting patterns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-9 w-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-black text-purple-700 text-xs">
                W 9-12
              </div>
              <h3 className="font-extrabold text-sm text-[#0f172a]">Testing & Production CI/CD</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Automated integration test suites, deployment pipelines, error monitoring, and portfolio proof-of-work delivery.
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
