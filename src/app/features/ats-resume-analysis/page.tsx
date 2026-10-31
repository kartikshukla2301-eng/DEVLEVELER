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
  title: "AI ATS Resume Analyzer & Checker for Software Engineers | DevLeveler",
  description:
    "Audit your software engineer resume against ATS keyword requirements, PDF stream parsing standards, and quantifiable achievement benchmarks.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/ats-resume-analysis",
  },
  openGraph: {
    title: "AI ATS Resume Analyzer & Checker for Software Engineers | DevLeveler",
    description:
      "Audit your software engineer resume against ATS keyword requirements, PDF stream parsing standards, and technical hiring criteria.",
    url: "https://devleveler.vercel.app/features/ats-resume-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler ATS Resume Analyzer" }],
  },
};

const FAQS = [
  {
    q: "How does DevLeveler extract text from my uploaded resume?",
    a: "DevLeveler processes uploaded PDF resumes server-side using structured PDF text stream parsing. It extracts the raw textual data across work experience, projects, skills, and education sections without sending your document to public third-party indexing services."
  },
  {
    q: "Does DevLeveler use OCR (Optical Character Recognition)?",
    a: "No. DevLeveler uses native PDF text stream extraction. If a resume is saved as a flattened image or scanned photo rather than selectable text, automated ATS parsers cannot reliably read it. We recommend exporting directly from tools like LaTeX, Google Docs, or Word as standard text-encoded PDFs."
  },
  {
    q: "What is the difference between the ATS Score and Quality Score?",
    a: "The ATS Score evaluates keyword density, canonical software tooling terms, and section formatting. The Quality Score assesses the substance of your accomplishments—penalizing vague job duty descriptions and rewarding quantified engineering achievements."
  },
  {
    q: "Does DevLeveler store or share uploaded resumes?",
    a: "No. Resumes are parsed securely in server memory and parsed text fields are stored with your authenticated account. Your resume is never sold, shared with recruiters, or used to train public models. You can delete your resume data at any time from account settings."
  },
  {
    q: "How does resume analysis impact my Developer Score?",
    a: "Resume quality and ATS keyword alignment contribute 15% toward your composite Developer Score in DevLeveler's scoring engine."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://devleveler.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://devleveler.vercel.app/#features" },
      { "@type": "ListItem", position: 3, name: "ATS Resume Analysis", item: "https://devleveler.vercel.app/features/ats-resume-analysis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler ATS Resume Analyzer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Evaluates software developer resumes for ATS keyword density, PDF stream parsing compatibility, and quantifiable project achievements."
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

export default function AtsResumeAnalysisPage() {
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
            <span className="text-[var(--foreground)] font-semibold">ATS Resume Analysis</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-[10px] font-bold text-purple-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            15% of Composite Developer Score
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            AI ATS Resume Analyzer for Software Engineers
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Applicant Tracking Systems filter out high-potential developers due to unparseable layouts, missing stack keywords, or vague task descriptions. DevLeveler audits your PDF resume to verify keyword density and turn passive duties into quantified impact statements.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
            >
              Audit Your Resume Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/improve-software-engineer-resume"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              Read Resume Guide
            </Link>
          </div>
        </section>

        {/* 3-Step Actual Product Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-[#0f172a]">
              How the Resume Audit Engine Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#334155]">
              Server-side PDF parsing and hiring manager AI evaluation calibrated to software engineering roles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-xs font-black text-purple-700 font-mono">
                01
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">PDF Text Stream Extraction</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Upload your PDF. Server-side parsers extract raw text streams, verifying that text is machine-readable and free from formatting corruption or invisible layer traps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-black text-blue-700 font-mono">
                02
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">Taxonomy & Keyword Matching</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                The engine extracts skills, experience, and projects, cross-referencing your terminology against target engineering tracks to identify missing high-frequency keywords.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs font-black text-emerald-700 font-mono">
                03
              </div>
              <h3 className="font-bold text-sm text-[#0f172a]">ATS & Quality Scoring</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Computes distinct ATS and Quality scores with prioritized suggestions across formatting, content, skills, and experience to strengthen your recruiter impact.
              </p>
            </div>
          </div>
        </section>

        {/* Example Input / Output (Clearly Labeled as Illustrative Schema Example) */}
        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Illustrative Transformation Example
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]">
                Transforming Passive Duties into Concrete Proof-of-Work
              </h2>
              <p className="text-sm text-[#334155] leading-relaxed">
                Most resumes fail not from lack of ability, but because bullet points describe generic duties rather than quantified engineering outcomes. Here is an illustrative before-and-after comparison based on our recommendations:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 text-xs space-y-1">
                  <span className="font-bold text-red-900 block">Before (Weak & Unquantified):</span>
                  <p className="text-red-950 font-mono text-[11px]">
                    &quot;Worked on backend APIs in Node.js and Postgres for an e-commerce platform and fixed bugs.&quot;
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs space-y-1">
                  <span className="font-bold text-emerald-900 block">After (XYZ Formula with Metrics):</span>
                  <p className="text-emerald-950 font-mono text-[11px]">
                    &quot;Architected 12 RESTful microservices in Node.js & PostgreSQL, reducing p95 API response latency by 34% across 1.8M monthly checkout requests.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Illustrative Output Example</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">resume_audit.json</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">ATS Score: 84 / 100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Quality Score</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">79 / 100</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Metrics-driven bullets</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[10px]">Extracted Skills</span>
                    <span className="text-base font-extrabold text-[#0f172a] font-mono">18 Identified</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Frontend, Backend, DB</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Missing High-Frequency Keywords:</span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold">Docker</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold">Redis Caching</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold">CI/CD Pipelines</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Priority Recommendation:</span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    &quot;Add concrete database scaling metrics to your experience section (e.g. table sizes, query latency reductions) to strengthen senior role alignment.&quot;
                  </p>
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
                  <span><strong>Identifies Blind Spots:</strong> Flags missing technologies that modern hiring teams screen for before a human reads your resume.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Actionable Rewrites:</strong> Guides you to rewrite duties into impactful statements using the Google XYZ framework.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span><strong>Data Privacy:</strong> Documents are processed in isolated sessions and can be purged from your account at any time.</span>
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
                  <span><strong>Requires Selectable PDF Text:</strong> Flattened image scans cannot be parsed reliably without direct text encoding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>ATS Engines Differ:</strong> Different enterprise ATS platforms (Workday, Greenhouse, Lever) use custom parsing rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span><strong>Cannot Replace Technical Rigor:</strong> Passing automated filters gets you the interview; deep technical competence wins the offer.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Link Hub */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">Need step-by-step guidance on structuring your resume?</span>
              <span className="text-xs text-slate-500">Read our in-depth technical guide covering single-page layouts, ATS conventions, and bullet formulations.</span>
            </div>
            <Link
              href="/guides/improve-software-engineer-resume"
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-[#0f172a] hover:bg-slate-100 transition-colors shrink-0"
            >
              Read Resume Guide <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-6 py-14 border-t border-[var(--border)]">
          <h2 className="text-2xl font-extrabold text-center text-[#0f172a] mb-8">
            Frequently Asked Questions About Resume Audits
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
              Test your resume against real recruiter standards
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Upload your PDF resume to receive a comprehensive ATS compatibility score, identified keyword gaps, and suggestions in seconds.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 text-xs font-bold transition-all shadow-md"
              >
                Start Resume Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
