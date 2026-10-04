"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "What is DevLeveler?",
    a: "DevLeveler is a telemetry-driven developer career intelligence platform. By scanning public GitHub repositories and parsing uploaded resumes, we map out technical proficiencies, identify library or framework skill gaps, and generate step-by-step career roadmaps.",
  },
  {
    q: "How is the score calculated?",
    a: "Your Developer Score is computed as a weighted composite: Projects & Code Quality (30%), GitHub Activity Volume (25%), Skill Balance & Gaps (20%), ATS Resume Quality (15%), and Deployment/DevOps Prep (10%). If some data is not connected, the weights are distributed proportionally among available metrics.",
  },
  {
    q: "Is GitHub required?",
    a: "No. While connecting GitHub unlocks deeper analysis of your coding velocity and repositories, you can still upload your resume, receive skill gap audits, practice technical interview prep questions, and use roadmaps without linking GitHub.",
  },
  {
    q: "Is my resume private?",
    a: "Yes. All resumes are parsed securely using server-side actions, and parsed text fields are stored with encryption. We never share your data. You can delete your resume and all associated audit reports instantly from your settings page.",
  },
  {
    q: "How accurate are recommendations?",
    a: "Our recommendations are calibrated against thousands of software engineering job descriptions and repository structures. The Career Coach engine checks for missing critical tools (e.g. Docker, Redis, Testing suites) corresponding specifically to your target roles to ensure suggestions are practical.",
  },
  {
    q: "Can students use it?",
    a: "Yes! DevLeveler is specifically designed to help students prepare for internships and entry-level positions. Our new student-friendly Starter ($1/mo) and Growth ($3/mo) plans make complete career intelligence accessible to everyone.",
  },
  {
    q: "Can professionals use it?",
    a: "Absolutely. Mid-level and senior developers use the platform to spot deficiencies in their portfolios, audit their resumes for senior-track ATS keywords, and track milestones toward high-scale enterprise engineering roles.",
  },
  {
    q: "How often can I analyze my profile?",
    a: "Free tier users receive one initial analysis session. Starter users can re-scan their GitHub footprint once per month, Growth users can re-scan up to 5 times per month, and Pro users receive unlimited daily scans and roadmaps.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-xs">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            Questions & Answers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] font-normal leading-relaxed">
            Everything you need to know about the DevLeveler scoring and telemetry platform.
          </p>
        </motion.div>

        {/* Accordions */}
        <div className="mt-10 sm:mt-12 space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-2 border-blue-600/40 shadow-sm ring-2 ring-blue-500/5"
                    : "border border-slate-200/90 shadow-xs hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-5.5 text-left text-xs sm:text-sm font-semibold text-[#0f172a] hover:text-blue-700 transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-700" : "text-[#64748b]"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-5.5 text-xs sm:text-sm leading-relaxed text-[#334155] font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
