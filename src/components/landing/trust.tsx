"use client";

import { Shield, EyeOff, KeyRound, Eraser } from "lucide-react";
import { motion } from "motion/react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Read-Only Scope",
    description: "DevLeveler only accesses public GitHub API endpoints. We never ask for read/write scope permissions on private repositories.",
  },
  {
    icon: EyeOff,
    title: "Data Confidentiality",
    description: "Your analyzed skills data is never sold to third-party databases. Recruiter matching directories are strictly opt-in.",
  },
  {
    icon: KeyRound,
    title: "Document Encryption",
    description: "Uploaded resumes are parsed securely using server-side handlers, and raw document payloads are heavily encrypted.",
  },
  {
    icon: Eraser,
    title: "1-Click Deletion",
    description: "You remain in complete control. Click 'Delete Profile' in your settings to instantly erase all parsed resume and repository records.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-16 sm:py-20 border-t border-[var(--border)] bg-[var(--background-secondary)]/30 overflow-hidden">
      {/* Soft blue-emerald radial aura for subtle visual continuity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-[10px] font-bold text-emerald-800 uppercase tracking-widest shadow-xs">
            Zero-Trust Architecture
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            Security Built For Developers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
            Your career data is sensitive. We build under strict zero-trust guidelines to ensure 
            complete safety and control.
          </p>
        </motion.div>

        {/* Trust Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-interactive p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200/60 shadow-xs">
                  <item.icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#334155] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
