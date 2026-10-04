"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  GitBranch,
  CheckCircle2,
  Terminal,
  FileText,
  Sparkles,
  Compass
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Particles } from "@/components/ui/react-bits/particles";

// Helper for generating Radar Chart points
const RADAR_LABELS = [
  "System Architecture",
  "Code Quality",
  "Git Activity",
  "Resume Quality",
  "Deployment Prep",
];

const generateRadarPoints = (scores: number[], center: number, maxRadius: number) => {
  return scores.map((score, index) => {
    const angle = (index * 2 * Math.PI) / scores.length - Math.PI / 2;
    const radius = (score / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  }).map(p => `${p.x},${p.y}`).join(" ");
};

function RadarChart() {
  const center = 80;
  const maxRadius = 55;
  const scores = [88, 82, 94, 75, 70]; // Upgraded demo scores
  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-container-low)] backdrop-blur-md relative overflow-hidden h-full group hover:border-[var(--primary)]/30 transition-all duration-300">
      <div className="absolute top-2 left-3 text-[9px] uppercase font-bold text-[var(--foreground-muted)] tracking-wider">
        Skill Balance
      </div>
      <svg width="150" height="150" viewBox="0 0 160 160" className="mt-3">
        {/* Background grids */}
        {gridLevels.map((lvl) => {
          const points = RADAR_LABELS.map((_, i) => {
            const angle = (i * 2 * Math.PI) / RADAR_LABELS.length - Math.PI / 2;
            const r = (lvl / 100) * maxRadius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ");
          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="0.8"
              strokeDasharray={lvl === 100 ? "none" : "2,2"}
            />
          );
        })}

        {/* Axis lines */}
        {RADAR_LABELS.map((_, i) => {
          const angle = (i * 2 * Math.PI) / RADAR_LABELS.length - Math.PI / 2;
          const targetX = center + maxRadius * Math.cos(angle);
          const targetY = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={targetX}
              y2={targetY}
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Filled polygon for developer stats */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          points={generateRadarPoints(scores, center, maxRadius)}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="url(#radarGradient)"
          strokeWidth="1.8"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004ac6" />
            <stop offset="100%" stopColor="#4b41e1" />
          </linearGradient>
        </defs>

        {/* Vertices indicator dots */}
        {scores.map((score, index) => {
          const angle = (index * 2 * Math.PI) / scores.length - Math.PI / 2;
          const radius = (score / 100) * maxRadius;
          const cx = center + radius * Math.cos(angle);
          const cy = center + radius * Math.sin(angle);
          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="3"
              fill="#004ac6"
              className="pulse-glow-cyan"
            />
          );
        })}
      </svg>
    </div>
  );
}

function ScoreWidget() {
  const score = 88;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-container-low)] backdrop-blur-md relative overflow-hidden h-full group hover:border-[var(--primary)]/30 transition-all duration-300">
      <div className="absolute top-2 left-3 text-[9px] uppercase font-bold text-[var(--foreground-muted)] tracking-wider">
        AI Rating
      </div>
      <div className="relative flex items-center justify-center mt-3">
        <svg width="110" height="110" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            transform="rotate(-90 50 50)"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-black text-[var(--foreground)] tracking-tighter">{score}</span>
          <span className="text-[8px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">Level 4</span>
        </div>
      </div>
    </div>
  );
}

function CareerReadinessWidget() {
  return (
    <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-container-low)] backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full group hover:border-[var(--primary)]/30 transition-all duration-300">
      <div>
        <div className="text-[9px] uppercase font-bold text-[var(--foreground-muted)] tracking-wider mb-4">
          Market Alignment
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-[var(--foreground-secondary)] font-semibold">Startup Readiness</span>
              <span className="text-[var(--foreground)] font-extrabold">94%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-[var(--foreground-secondary)] font-semibold">Big Tech Readiness</span>
              <span className="text-[var(--foreground)] font-extrabold">81%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "81%" }}
                transition={{ duration: 1.2, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-[var(--border)] flex items-center justify-between">
        <span className="text-[10px] text-[var(--foreground-muted)] font-medium">Target Track:</span>
        <span className="text-[9px] font-bold text-[var(--primary)] px-2.5 py-0.5 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full">
          Senior Fullstack
        </span>
      </div>
    </div>
  );
}


export function Hero() {
  const [activeTab, setActiveTab] = useState<"github" | "resume" | "roadmap">("github");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse tilt effects
  const mx = useMotionValue(200);
  const my = useMotionValue(200);
  const rotateX = useTransform(my, [0, 400], [10, -10]);
  const rotateY = useTransform(mx, [0, 400], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const xVal = e.clientX - rect.left;
        const yVal = e.clientY - rect.top;
        mx.set(xVal);
        my.set(yVal);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mx, my]);

  // Tab switcher rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === "github") return "resume";
        if (prev === "resume") return "roadmap";
        return "github";
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-16 bg-[var(--background)]">

      {/* Official React Bits 3D Telemetry Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <Particles
          particleCount={90}
          particleSpread={12}
          speed={0.12}
          particleColors={["#2563eb", "#4f46e5", "#64748b", "#0284c7"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.6}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.8}
          cameraDistance={22}
          disableRotation={false}
        />
      </div>

      {/* Aurora Ambient Glow */}
      <div className="aurora-bg opacity-70" />

      {/* Soft Indigo / Blue Radial Gradient Lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[520px] h-[520px] bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[520px] h-[520px] bg-indigo-500/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Interactive cursor spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-30 md:opacity-60"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.045), transparent 70%)`
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 w-full z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline copy */}
          <div className="text-center lg:text-left lg:col-span-6 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 shadow-xs"
            >
              <Sparkles className="h-3 w-3 text-blue-700 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-700 tracking-widest uppercase">
                The Career Intelligence Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[54px] leading-[1.08] text-[#0f172a]"
            >
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 bg-clip-text text-transparent">AI-Powered</span>
              <br />
              <span className="text-[#0f172a]">Developer Intelligence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-[#334155] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Deep GitHub telemetry analysis, ATS resume audits, skill gap detection against live market demands,
              and personalized AI learning paths. No black boxes. Just absolute clarity for your tech career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link
                href="/login"
                id="hero-cta-primary"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1d4ed8] hover:bg-[#1e40af] px-7 text-xs font-bold text-white transition-all hover:scale-[1.02] shadow-md shadow-blue-600/20 active:scale-[0.98]"
              >
                Start Analyzing Free
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-7 text-xs font-bold text-[#0f172a] transition-all shadow-xs hover:border-slate-400"
              >
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* Right Column: Visual Dashboard Showcase */}
          <div ref={containerRef} className="lg:col-span-6 flex justify-center w-full perspective-[1200px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-[480px] rounded-3xl p-6 shadow-xl relative overflow-hidden bg-white/95 border border-slate-200/90 backdrop-blur-md"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4.5 border-b border-[var(--border)] mb-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-[var(--foreground-muted)] ml-2">devleveler.com/dashboard</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2.5 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                  Telemetry Active
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-1 mb-5 bg-[var(--surface-container-low)] border border-[var(--border)] p-1 rounded-xl text-xs">
                <button
                  onClick={() => setActiveTab("github")}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    activeTab === "github" ? "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-xs" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <GitBranch className="h-3.5 w-3.5 text-blue-600" />
                  GitHub
                </button>
                <button
                  onClick={() => setActiveTab("resume")}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    activeTab === "resume" ? "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-xs" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5 text-purple-600" />
                  Resume
                </button>
                <button
                  onClick={() => setActiveTab("roadmap")}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    activeTab === "roadmap" ? "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-xs" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Compass className="h-3.5 w-3.5 text-pink-600" />
                  Roadmap
                </button>
              </div>

              {/* Interactive Visual Shell */}
              <div className="min-h-[230px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeTab === "github" && (
                    <motion.div
                      key="github"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="col-span-1">
                        <ScoreWidget />
                      </div>
                      <div className="col-span-1">
                        <RadarChart />
                      </div>
                      <div className="col-span-2 rounded-xl border border-[var(--border)] p-3 flex items-center justify-between text-xs bg-[var(--surface-container-low)]">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-[var(--primary)]" />
                          <span className="font-mono text-[var(--foreground-secondary)]">github: /kartikshukla2301-eng</span>
                        </div>
                        <span className="font-bold text-[var(--foreground-muted)]">2.4k Commits</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "resume" && (
                    <motion.div
                      key="resume"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-[var(--border)] p-4 text-center flex flex-col justify-center bg-[var(--surface-container-low)]">
                          <span className="text-[9px] font-bold text-[var(--foreground-muted)] uppercase tracking-wider block">ATS Compliance</span>
                          <span className="text-3xl font-black text-emerald-600 mt-1">91/100</span>
                          <span className="text-[9px] text-emerald-600 font-bold mt-1">✓ Optimized</span>
                        </div>
                        <CareerReadinessWidget />
                      </div>
                      {/* Critical gaps items */}
                      <div className="rounded-2xl border border-[var(--border)] p-3.5 text-xs space-y-2 bg-[var(--surface-container-low)]">
                        <div className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Target Recommendations</div>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] rounded-full text-[9px] font-bold shadow-xs">Redis Cache</span>
                          <span className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] rounded-full text-[9px] font-bold shadow-xs">Docker Compose</span>
                          <span className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-secondary)] rounded-full text-[9px] font-bold shadow-xs">Next.js middleware</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "roadmap" && (
                    <motion.div
                      key="roadmap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-[var(--border)] p-4.5 space-y-4 bg-[var(--surface-container-low)]"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                        <span className="text-xs font-bold text-[var(--foreground)]">Target Learning Roadmap</span>
                        <span className="text-[9px] font-extrabold text-pink-600 uppercase tracking-wider bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">Week 4 of 12</span>
                      </div>
                      <div className="space-y-3.5">
                        <div className="flex gap-3 items-start text-xs">
                          <CheckCircle2 className="h-4.5 w-4.5 text-[var(--primary)] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[var(--foreground)] block">Implement custom NextAuth caching</span>
                            <span className="text-[10px] text-[var(--foreground-muted)]">Configure Redis storage adapters to handle high session volume</span>
                          </div>
                        </div>
                        <div className="flex gap-3 items-start text-xs">
                          <div className="h-4 w-4 rounded-full border border-[var(--border)] shrink-0 mt-0.5 bg-[var(--surface)]" />
                          <div>
                            <span className="font-bold text-[var(--foreground-secondary)] block">Setup horizontal Docker scaling</span>
                            <span className="text-[10px] text-[var(--foreground-muted)]">Build compose files to spin up multi-replica pg clusters locally</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
