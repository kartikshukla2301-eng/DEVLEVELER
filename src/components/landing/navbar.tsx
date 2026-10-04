"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "top-3 mx-auto max-w-5xl px-4 w-[calc(100%-1.5rem)]"
          : "top-0 w-full"
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-500 border border-transparent",
          scrolled
            ? "rounded-full bg-white/95 backdrop-blur-xl border-slate-200/90 px-6 py-2.5 shadow-md shadow-slate-200/40"
            : "bg-transparent px-6 py-5 border-b border-transparent"
        )}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            id="navbar-logo"
            className="flex items-center gap-2 text-[#0f172a] hover:opacity-90 transition-opacity group"
          >
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Code2 className="h-4.5 w-4.5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#0f172a]">
              DevLeveler
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex bg-slate-100/90 border border-slate-200 rounded-full p-1 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-[#334155] transition-colors duration-200 hover:text-[#0f172a]"
              >
                {hoveredLink === link.label && (
                  <motion.span
                    layoutId="nav-hover-bg"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/70"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              id="navbar-cta"
              className="relative inline-flex h-8.5 items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-bold text-white transition-all hover:bg-blue-700 hover:scale-[1.02] shadow-sm shadow-blue-500/25 active:scale-[0.98]"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-3 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-2xl px-6 py-5 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-semibold text-[var(--foreground-secondary)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-[var(--border)] pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white hover:bg-[var(--accent-hover)] transition-all text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
