"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { getEarlyAdopterStatusAction } from "@/actions/billing";
import type { EarlyAdopterStatus } from "@/actions/billing";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    description: "Essential developer intelligence to get started.",
    features: [
      "GitHub Analysis",
      "Resume Analysis",
      "Developer Score",
      "Skill Gap Analysis",
      "Dashboard & Weekly Goals",
      "Basic Portfolio Analysis",
      "Basic Developer Intelligence",
      "XP & Achievements",
    ],
    cta: "Get Started Free",
    href: "/login",
    popular: false,
  },
  {
    name: "Pro",
    price: "$3",
    description: "Complete career intelligence with unlimited AI-powered insights.",
    features: [
      "Everything in Free",
      "Unlimited AI Analysis",
      "AI Career Coach",
      "AI Career Roadmap",
      "AI Interview Readiness",
      "Advanced Developer Intelligence",
      "Advanced Portfolio Analysis",
      "Deep GitHub Repository Analysis",
      "Export Reports",
      "Priority Processing",
      "Premium Themes",
      "Early Access Features",
    ],
    cta: "Upgrade to Pro",
    href: "/login",
    popular: true,
  },
];

export function Pricing() {
  const [status, setStatus] = useState<EarlyAdopterStatus | null>(null);

  useEffect(() => {
    getEarlyAdopterStatusAction().then((res) => {
      if (res.success && res.data) {
        setStatus(res.data);
      }
    });
  }, []);

  return (
    <section id="pricing" className="relative py-16 sm:py-20 border-t border-[var(--border)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-widest shadow-xs">
            Transparent Pricing
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[#0f172a]">
            Simple, Developer-Friendly Tiers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
            Choose the telemetry scope you need. Student-friendly rates, cancel or modify at any time.
          </p>
        </motion.div>

        {/* Dynamic Early Adopter Program Banner */}
        {status && (
          <div className="mt-10 mx-auto max-w-lg relative z-20">
            {status.isClosed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-center space-y-1.5 shadow-xs relative overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest block font-mono">
                  Early Adopter Program Closed
                </span>
                <p className="text-xs text-[#334155] font-medium">
                  All founding-user spots have been claimed.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50/90 border border-red-200 rounded-2xl px-6 py-4 text-center space-y-2 shadow-sm relative overflow-hidden"
              >
                {/* Red glow pulse in bg */}
                <div className="absolute -inset-10 bg-red-500/5 rounded-full blur-[48px] pointer-events-none animate-pulse" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent" />
                
                <div className="flex items-center justify-center gap-1.5 text-red-700">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    🔥 Early Adopter Program
                  </span>
                </div>
                <p className="text-sm font-bold text-red-950 leading-snug">
                  First 5 users receive DevLeveler Pro completely free for 6 months.
                </p>
                <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                  <span className="rounded-full bg-red-100 border border-red-200 px-3 py-0.5 font-mono text-[10px] font-bold text-red-700">
                    {status.remainingSpots === 5 
                      ? "5 / 5 spots available" 
                      : `${status.remainingSpots} / 5 spots remaining`}
                  </span>
                  <span className="text-[9px] text-[#64748b] uppercase font-semibold tracking-wider font-mono">
                    Limited spots available
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="mt-10 sm:mt-12 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col justify-between p-8 rounded-3xl relative bg-white transition-all duration-200 ${
                tier.popular
                  ? "border-2 border-blue-600 ring-4 ring-blue-500/10 shadow-xl"
                  : "border border-slate-200 shadow-sm hover:shadow-md"
              }`}
              id={`pricing-card-${tier.name.toLowerCase()}`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 shadow-md shadow-blue-500/20">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#0f172a]">
                  {tier.name}
                </h3>
                <p className="mt-2 text-xs text-[#334155] leading-relaxed font-normal">
                  {tier.description}
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#0f172a] font-mono">
                    {tier.price}
                  </span>
                  <span className="ml-1.5 text-xs text-[#475569] font-medium">
                    / 6 Months
                  </span>
                </div>

                <hr className="my-6 border-slate-100" />

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 shrink-0 text-blue-700 mt-0.5" />
                      <span className="text-xs text-[#334155] leading-normal font-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={tier.href}
                  id={`pricing-cta-${tier.name.toLowerCase()}`}
                  className={`inline-flex w-full h-11 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    tier.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:scale-[1.01]"
                      : "border border-slate-300 bg-white hover:bg-slate-50 text-[#0f172a] shadow-xs"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
