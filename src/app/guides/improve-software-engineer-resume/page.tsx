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
  title: "How to Optimize a Software Engineer Resume for ATS | DevLeveler Guide",
  description:
    "Learn how to format and optimize your software engineering resume for Applicant Tracking Systems (ATS), technical recruiters, and hiring managers.",
  alternates: {
    canonical: "https://devleveler.vercel.app/guides/improve-software-engineer-resume",
  },
  openGraph: {
    title: "How to Optimize a Software Engineer Resume for ATS | DevLeveler Guide",
    description:
      "Learn how to format and optimize your software engineering resume for Applicant Tracking Systems (ATS), recruiters, and engineering managers.",
    url: "https://devleveler.vercel.app/guides/improve-software-engineer-resume",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "Guide: Improve Software Engineer Resume" }],
  },
};

const FAQS = [
  {
    q: "Should a software engineering resume be one or two pages?",
    a: "For developers with under 5 years of experience, a single-page resume is strongly recommended. It forces density and highlights your highest-impact projects and skills without filler."
  },
  {
    q: "What is the Google XYZ formula for resume bullet points?",
    a: "The Google XYZ formula states: 'Accomplished [X], as measured by [Y], by doing [Z]'. For example: 'Reduced API response latency by 42% (Y) by implementing Redis memory caching (Z) across 15 high-traffic endpoints (X)'."
  },
  {
    q: "Why do graphical multi-column resumes fail ATS systems?",
    a: "Most ATS parsers read PDF documents horizontally from left to right. Multi-column resumes frequently cause lines from column A and column B to merge together into unparseable text fragments, corrupting your skill and experience data."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://devleveler.vercel.app/#guides" },
      { "@type": "ListItem", position: 3, name: "Improve Software Engineer Resume", item: "https://devleveler.vercel.app/guides/improve-software-engineer-resume" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Optimize a Software Engineering Resume for ATS Screening",
    author: { "@type": "Person", name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" },
    publisher: { "@type": "Organization", name: "DevLeveler", url: "https://devleveler.vercel.app" },
    datePublished: "2026-02-10T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    description: "In-depth guide covering ATS parser mechanics, single-column vs multi-column formats, Google XYZ formula, and technical keyword density."
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

export default function ImproveSoftwareEngineerResumeGuidePage() {
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
            <span className="text-[var(--foreground)] font-semibold">Improve Developer Resume</span>
          </nav>
        </div>

        <article className="mx-auto max-w-4xl px-6">
          <header className="pb-8 border-b border-[var(--border)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1 text-[10px] font-bold text-purple-700 tracking-wider uppercase mb-4">
              <BookOpen className="h-3 w-3" /> Resume Architecture Guide
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] leading-tight">
              How to Optimize a Software Engineer Resume for ATS and Recruiters
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
              Up to 75% of qualified engineering candidates are eliminated before a human recruiter reads their resume due to ATS parsing errors and misaligned technical keywords. Here is how to engineer a high-converting technical resume.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#64748b]">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Kartik Shukla</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated October 2026</span>
              <span>10 min read</span>
            </div>
          </header>

          <div className="my-8 p-6 rounded-2xl bg-purple-50/80 border border-purple-200">
            <h2 className="text-sm font-bold text-purple-900 uppercase tracking-wider mb-2">
              Quick Answer: Core Rules for Developer Resumes
            </h2>
            <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
              Use a clean, single-column layout with standard headings (Experience, Projects, Technical Skills, Education). Eliminate tables, columns, and skill rating bars. Phrase every bullet using quantified outcomes (the XYZ formula). Include canonical framework and tool names (e.g., PostgreSQL, Docker, TypeScript, GraphQL) rather than generic phrases.
            </p>
          </div>

          <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                1. Layout Formatting: Why Single-Column Always Wins
              </h2>
              <p>
                Graphic-design templates created on Canva or Figma often feature aesthetic two-column layouts, skill percentage bars, and visual icons. While visually appealing to human designers, automated ATS parsers (Workday, Greenhouse, Lever, Taleo) extract text linearly. Two-column designs often concatenate the left and right columns together, creating garbled text strings.
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                <span className="font-bold text-[#0f172a] block">Formatting Checklist:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Single-column vertical flow from top to bottom.</li>
                  <li>Standard system fonts (Inter, Roboto, Arial, Calibri) to prevent font encoding glitches.</li>
                  <li>Plain text section headers that parsers recognize automatically.</li>
                  <li>Export as standard PDF—never as a flattened image or scanned PNG.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                2. Formatting High-Impact Bullet Points (The Google XYZ Formula)
              </h2>
              <p>
                Weak resumes describe tasks: <em>&quot;Worked on the backend API and fixed bugs in user management.&quot;</em>
              </p>
              <p>
                Strong technical resumes describe quantifiable engineering impact using Google&apos;s proven formula:
              </p>
              <blockquote className="border-l-4 border-blue-600 pl-4 py-1 italic bg-slate-50 rounded-r-lg text-sm text-[#0f172a]">
                &quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;
              </blockquote>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Backend:</strong> &quot;Accelerated database query execution by 65% (Y) by adding composite B-tree indexes and refactoring N+1 queries (Z) across PostgreSQL user order endpoints (X).&quot;</li>
                <li><strong>Frontend:</strong> &quot;Decreased initial bundle size by 380 KB and improved LCP by 1.2s (Y) by implementing dynamic code-splitting and WebP image formats (Z) across core dashboard routes (X).&quot;</li>
                <li><strong>Infrastructure:</strong> &quot;Reduced deployment cycle time from 25 minutes to 4 minutes (Y) by authoring GitHub Actions CI/CD pipelines with parallel build caching (Z).&quot;</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                3. Technical Skills Taxonomy & Keyword Optimization
              </h2>
              <p>
                Recruiters filter candidate databases by searching for exact skill strings. Group your technical skills logically at the top or bottom of your resume:
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                <div><strong>Languages:</strong> TypeScript, JavaScript, Python, Go, SQL</div>
                <div><strong>Frameworks & Libraries:</strong> Next.js, React, Node.js, Express, Tailwind CSS</div>
                <div><strong>Data & Storage:</strong> PostgreSQL, Redis, Prisma ORM, MongoDB</div>
                <div><strong>DevOps & Tooling:</strong> Docker, Git, GitHub Actions, AWS (S3, EC2), Vercel</div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                4. Automated Resume Auditing with DevLeveler
              </h2>
              <p>
                Our interactive <Link href="/features/ats-resume-analysis" className="text-blue-600 font-semibold underline">ATS Resume Analyzer</Link> scans your PDF resume to verify text readability, detect missing industry keywords for your target role, and calculate your ATS alignment score in seconds.
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
            <h3 className="text-xl font-bold">Audit your resume for free</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Get instant feedback on keyword coverage, ATS compatibility, and phrasing improvements before you submit your next application.
            </p>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 text-xs font-bold transition-all shadow-md"
              >
                Scan Resume Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
