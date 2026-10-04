"use client";

import { 
  GitBranch, 
  FileText, 
  Award, 
  Target, 
  Map, 
  Globe, 
  MessageSquare, 
  Compass, 
  Check,
  Terminal
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: GitBranch,
    title: "GitHub Analysis",
    description: "Deep analytics scanning repository metadata, stars, fork counts, commit velocities, and language distributions.",
    benefits: ["Tracks activity volume", "Calculates repository health"],
    color: "from-blue-500/20 to-cyan-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] text-[9px] space-y-1.5 font-mono text-[var(--foreground-secondary)]">
        <div className="flex justify-between items-center text-[var(--foreground-secondary)]">
          <span>repo: devleveler-core</span>
          <span className="text-[8px] text-blue-600 font-bold">★ 142</span>
        </div>
        <div className="h-1.5 w-full bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-[80%]" />
        </div>
      </div>
    )
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload resumes in PDF format to parse text and test ATS compatibility issues, warning you of missing keywords.",
    benefits: ["ATS keyword compliance", "Formatting layout audit"],
    color: "from-cyan-500/20 to-purple-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] flex items-center justify-between text-[9px] font-mono text-[var(--foreground-secondary)]">
        <div>
          <span className="text-[var(--foreground-muted)] block">ATS Scanner</span>
          <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">89% Match Rate</span>
        </div>
        <FileText className="h-5 w-5 text-emerald-600 shrink-0" />
      </div>
    )
  },
  {
    icon: Award,
    title: "Developer Score",
    description: "A composite, transparent scoring engine aggregating activity, code quality, and skills without hidden formulas.",
    benefits: ["Weighted metrics weights", "Community leaderboard rank"],
    color: "from-purple-500/20 to-pink-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] flex items-center justify-center gap-2 text-[var(--foreground-secondary)]">
        <span className="text-xl font-black text-[var(--foreground)] font-mono">84</span>
        <span className="text-[8px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 rounded-full shadow-xs">Explorer II</span>
      </div>
    )
  },
  {
    icon: Target,
    title: "Skill Gap Detection",
    description: "Compares current technologies with industry standards to highlight library, framework, or utility deficiencies.",
    benefits: ["Targeted requirements matching", "Learning resource mappings"],
    color: "from-pink-500/20 to-rose-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] flex flex-wrap gap-1 justify-center">
        <span className="px-2 py-0.5 bg-red-50 border border-red-200 text-[8px] rounded-full text-red-600 font-bold font-mono">Missing: Docker</span>
        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-[8px] rounded-full text-amber-600 font-bold font-mono">Missing: Redis</span>
      </div>
    )
  },
  {
    icon: Map,
    title: "Career Roadmaps",
    description: "Generates structured 12-week roadmaps complete with weekly targets and monthly milestones to address skill gaps.",
    benefits: ["Progress check tracking", "Targeted project suggestions"],
    color: "from-blue-500/20 to-indigo-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] space-y-1.5 font-mono text-[9px] text-[var(--foreground-secondary)]">
        <div className="flex gap-2 items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
          <span>Week 1: Dockerize PG Client</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-1.5 w-1.5 rounded-full border border-[var(--border)] shrink-0 bg-[var(--surface)]" />
          <span className="text-[var(--foreground-muted)]">Week 2: Set Redis Adapters</span>
        </div>
      </div>
    )
  },
  {
    icon: Globe,
    title: "Portfolio Analysis",
    description: "Audits portfolios for loading speeds, accessibility violations, mobile responsiveness, and design structure grades.",
    benefits: ["PageSpeed performance grades", "UX layout heuristics check"],
    color: "from-emerald-500/20 to-teal-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] flex justify-between items-center text-[9px] font-mono text-[var(--foreground-secondary)]">
        <span>SEO Core: 100/100</span>
        <span className="text-emerald-600 font-bold">Grade A+</span>
      </div>
    )
  },
  {
    icon: MessageSquare,
    title: "Interview Readiness",
    description: "Provides structured HR, technical, and project question scenarios tailored specifically to your target tracks.",
    benefits: ["Sample answer breakdowns", "Difficulty configurations"],
    color: "from-purple-500/20 to-indigo-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] text-[9px] text-[var(--foreground-secondary)] space-y-1">
        <span className="text-[var(--foreground-muted)] font-bold uppercase text-[7px] tracking-wider">Question Mock</span>
        <p className="italic leading-normal">How do you scale stateful APIs in container clusters?</p>
      </div>
    )
  },
  {
    icon: Compass,
    title: "Career Coach",
    description: "Telemetry-driven guidelines, learning suggestions, and structured career instructions. Transparent and invisible.",
    benefits: ["Metrics-focused guidance", "No automated chat wrappers"],
    color: "from-pink-500/20 to-purple-500/10",
    visual: (
      <div className="p-3 bg-[var(--surface-container-low)] rounded-xl border border-[var(--border)] flex items-center gap-2 text-[9px] text-[var(--foreground-secondary)] font-mono">
        <Terminal className="h-4 w-4 text-[var(--primary)] animate-pulse" />
        <span>Deploying roadmap targets...</span>
      </div>
    )
  }
];

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-20 bg-[var(--background)] border-t border-[var(--border)] overflow-hidden">
      
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[450px] h-[450px] bg-blue-500/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-indigo-500/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-xs">
            Platform Capabilities
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            Everything You Need To Level Up
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
            A complete career intelligence toolkit built to analyze, optimize, and verify your technical competencies.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card-interactive p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              id={`feature-card-${idx}`}
            >
              <div className="space-y-4">
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200/60 shadow-xs group-hover:bg-blue-100/70 group-hover:scale-105 transition-all duration-200">
                    <item.icon className="h-5 w-5 text-blue-700" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Benefits Bullet Points */}
                <ul className="space-y-1.5 pt-1">
                  {item.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex gap-2 items-start text-[11px] text-[#334155] font-medium">
                      <Check className="h-3.5 w-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual preview */}
              <div className="mt-5 pt-3.5 border-t border-slate-100">
                {item.visual}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
