import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { 
  FileText, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Search,
  Check
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI ATS Resume Analyzer for Software Engineers | DevLeveler",
  description:
    "Audit your software engineer resume against automated ATS parser standards, keyword density requirements, and technical hiring criteria.",
  alternates: {
    canonical: "https://devleveler.vercel.app/features/ats-resume-analysis",
  },
  openGraph: {
    title: "AI ATS Resume Analyzer for Software Engineers | DevLeveler",
    description:
      "Audit your software engineer resume against ATS parser standards, keyword density requirements, and technical hiring criteria.",
    url: "https://devleveler.vercel.app/features/ats-resume-analysis",
    images: [{ url: "/github-social-preview.png", width: 1376, height: 768, alt: "DevLeveler ATS Resume Analyzer" }],
  },
};

const FAQS = [
  {
    q: "What makes software engineering resumes fail ATS filters?",
    a: "Common ATS failure causes include multi-column layouts that break parser reading order, images or tables holding key skills, missing canonical tool keywords (e.g., Docker, Kubernetes, CI/CD), and unquantified project bullet points."
  },
  {
    q: "Does DevLeveler store or share uploaded resumes?",
    a: "No. Resumes are parsed server-side to extract text and keywords for analysis. User data is not sold or shared with external recruiters, and users can delete their uploaded data from account settings at any time."
  },
  {
    q: "How does DevLeveler compare my resume to target roles?",
    a: "DevLeveler parses extracted technical skills, frameworks, and architectural patterns and cross-references them against benchmark role taxonomies (Frontend, Backend, Fullstack, DevOps) to compute an ATS alignment score."
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
    description: "Evaluates software developer resumes for ATS parser compatibility, technical keyword alignment, and quantifiable project achievements."
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

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-[10px] font-bold text-purple-700 tracking-widest uppercase mb-4">
            <Sparkles className="h-3 w-3" />
            Resume Audit Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl leading-tight">
            AI ATS Resume Analyzer for Software Engineers
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#334155] max-w-3xl leading-relaxed">
            Applicant Tracking Systems filter out high-potential developers due to unparseable formatting, missing stack terminology, or vague project impact. DevLeveler audits your resume to ensure it passes automated screening and impresses hiring managers.
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
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 text-xs font-bold text-[#0f172a] transition-all"
            >
              Read Resume Guide
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 border-t border-[var(--border)]">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0f172a]">Parser Extraction Verification</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Verifies that automated OCR and PDF parsers accurately extract your work history, skills inventory, and contact info without text corruption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0f172a]">Technical Keyword Alignment</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Identifies missing high-frequency engineering terms expected for junior, mid-level, and senior software engineering positions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#0f172a]">Actionable Rewrite Recommendations</h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Transforms passive job descriptions into quantified impact statements using the Google XYZ formula (Accomplished [X], as measured by [Y], by doing [Z]).
              </p>
            </div>
          </div>
        </section>

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

        <section className="mx-auto max-w-4xl px-6 mt-8">
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test your resume against real recruiter standards
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Upload your PDF resume to receive a comprehensive ATS compatibility score, identified keyword gaps, and suggestions in under 60 seconds.
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
