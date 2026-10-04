"use client";

import { GitBranch, FileText, Target, Compass } from "lucide-react";
import { motion } from "motion/react";
import { PipelineFlowLine } from "./tech-background";

const STEPS = [
  {
    number: "01",
    phase: "DEVELOPER SIGNALS",
    title: "Connect GitHub",
    description: "Link your public GitHub profile. We scan your repositories, commits, code quality, and language distributions.",
    icon: GitBranch,
    color: "from-blue-600 to-indigo-600",
    glow: "shadow-blue-500/20",
    visual: (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/90 w-full max-w-[220px] h-[125px] relative overflow-hidden shadow-xs">
        <GitBranch className="h-7 w-7 text-blue-700 mb-2.5 animate-bounce" />
        <span className="text-[9px] font-mono text-[#334155]">git clone public_profile</span>
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex justify-between text-[8px] text-[#475569] font-bold">
          <span className="text-emerald-700">✓ Scanned</span>
          <span className="text-blue-700">✓ Synced</span>
        </div>
      </div>
    )
  },
  {
    number: "02",
    phase: "AI ANALYSIS",
    title: "Upload Resume",
    description: "Upload your resume in PDF format. Our parser runs an ATS keyword compliance test to spot structural weaknesses.",
    icon: FileText,
    color: "from-cyan-600 to-blue-600",
    glow: "shadow-blue-500/20",
    visual: (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/90 w-full max-w-[220px] h-[125px] relative overflow-hidden shadow-xs">
        <FileText className="h-7 w-7 text-blue-700 mb-2" />
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
            initial={{ width: 0 }}
            whileInView={{ width: "85%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </div>
        <span className="text-[9px] font-bold text-blue-700 mt-2.5">ATS scan complete</span>
      </div>
    )
  },
  {
    number: "03",
    phase: "INTELLIGENCE",
    title: "Analyze Skills",
    description: "DevLeveler cross-references your current technologies against industry benchmarks to map missing capabilities.",
    icon: Target,
    color: "from-indigo-600 to-purple-600",
    glow: "shadow-purple-500/20",
    visual: (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/90 w-full max-w-[220px] h-[125px] relative overflow-hidden shadow-xs">
        <div className="flex gap-1.5 flex-wrap justify-center">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[8px] rounded-full font-bold">React</span>
          <span className="px-2 py-0.5 bg-cyan-50 text-cyan-800 border border-cyan-200 text-[8px] rounded-full font-bold">Node.js</span>
          <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[8px] rounded-full font-bold">SQL</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1 text-[9px] font-bold text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" />
          Missing: Redis, Docker
        </div>
      </div>
    )
  },
  {
    number: "04",
    phase: "ACTION & GROWTH",
    title: "Get Insights",
    description: "Receive your consolidated Developer Score, Career Readiness score, and a personalized 12-week roadmap.",
    icon: Compass,
    color: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20",
    visual: (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/90 w-full max-w-[220px] h-[125px] relative overflow-hidden shadow-xs">
        <span className="text-2xl font-black text-emerald-600 tracking-tighter">84/100</span>
        <span className="text-[9px] font-bold text-[#475569] mt-1 uppercase tracking-widest">Composite Rating</span>
        <span className="text-[8px] font-bold text-emerald-800 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full mt-2">Roadmap Active</span>
      </div>
    )
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 bg-[var(--background-secondary)]/30 border-t border-[var(--border)] overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-xs">
            AI Pipeline Workflow
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            How DevLeveler Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] max-w-xl mx-auto leading-relaxed font-normal">
            Four structured steps to analyze your code, optimize your credentials, and accelerate your professional growth.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative mt-10 sm:mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* AI Pipeline Flow Line Connector (Desktop) */}
          <PipelineFlowLine className="top-[70px]" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center relative group"
              id={`step-${idx + 1}`}
            >
              {/* Top Visual widget */}
              <div className="mb-6 w-full flex justify-center">
                <div className="relative transition-transform duration-300 group-hover:scale-[1.03]">
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {step.visual}
                </div>
              </div>

              {/* Pipeline Phase Label */}
              <span className="text-[9px] font-mono font-bold tracking-widest text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-full mb-3 shadow-xs">
                {step.phase}
              </span>

              {/* Step indicator circle */}
              <div className="relative flex items-center justify-center mb-3 z-10">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${step.color} p-0.5 flex items-center justify-center shadow-md ${step.glow}`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <step.icon className="h-4 w-4 text-blue-700" />
                  </div>
                </div>
                <span className="absolute -right-7 font-black font-mono text-xs text-[#64748b]">
                  {step.number}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed max-w-[210px] font-normal">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
