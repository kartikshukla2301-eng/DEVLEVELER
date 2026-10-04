"use client";

import { XCircle, CheckCircle2, ShieldAlert, Award, Compass } from "lucide-react";
import { motion } from "motion/react";

const COMPARISONS = [
  {
    icon: ShieldAlert,
    title: "ATS Resume Rejections",
    problem: "Applying to dozens of roles with a resume that fails basic automated parser keyword tests.",
    solution: "Interactive ATS resume optimizer checks keyword densities and formats files for maximum parser success.",
    color: "from-blue-500/20 to-cyan-500/5",
  },
  {
    icon: Compass,
    title: "Directionless Learning Pathing",
    problem: "Attempting to learn every framework and getting overwhelmed by unstructured documentation.",
    solution: "Weekly and monthly milestones focus on learning high-priority missing technologies for target roles.",
    color: "from-purple-500/20 to-pink-500/5",
  },
  {
    icon: Award,
    title: "Blind Spots in Portfolios",
    problem: "Deploying developer portfolios with slow load times, broken links, or design layouts that turn off recruiters.",
    solution: "Telemetry audits scan portfolio load speeds, accessibility, and code density to calculate design grades.",
    color: "from-emerald-500/20 to-teal-500/5",
  },
  {
    icon: XCircle,
    title: "Market Readiness Unknowns",
    problem: "Entering applications blindly without knowing if you match startup agility or enterprise scale standards.",
    solution: "Composite indicators evaluate coding style, repository structures, and resume depth to measure compatibility.",
    color: "from-pink-500/20 to-violet-500/5",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-16 sm:py-20 border-t border-[var(--border)] bg-[var(--background-secondary)]/30 overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/4 rounded-full blur-[120px] pointer-events-none" />

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
            Problems & Solutions
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            Why Use DevLeveler?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
            Advancing as a software engineer shouldn&apos;t rely on guesswork. We solve the blind spots that prevent developers from advancing their tech careers.
          </p>
        </motion.div>

        {/* Comparisons Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2">
          {COMPARISONS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="premium-glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-[var(--border)] mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-container)] border border-[var(--border)] shadow-xs">
                    <item.icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>

                {/* Problem vs Solution */}
                <div className="grid gap-4">
                  <div className="flex gap-3 items-start text-xs text-red-950 p-3.5 bg-red-50/70 border border-red-200/70 rounded-xl">
                    <XCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-red-800 uppercase text-[9px] tracking-widest block mb-1">The Struggle</span>
                      <p className="leading-relaxed font-medium">{item.problem}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start text-xs text-emerald-950 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-emerald-800 uppercase text-[9px] tracking-widest block mb-1">The DevLeveler Edge</span>
                      <p className="leading-relaxed font-semibold">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
