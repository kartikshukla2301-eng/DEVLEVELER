"use client";

import Link from "next/link";
import { 
  Code2, 
  Globe, 
  Mail 
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 py-16 bg-[#0a0f1d] overflow-hidden text-slate-300">
      {/* Subtle technical aurora glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[220px] bg-gradient-to-t from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <Link
              href="/"
              id="footer-logo"
              className="flex items-center gap-2.5 text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Code2 className="h-4.5 w-4.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                DevLeveler
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs font-normal">
              AI-powered developer intelligence platform. Know your level, find gaps, and map your career trajectory with telemetry.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#about"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  About Platform
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://github.com/kartikshukla2301-eng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href="https://kartik-portfolio-chi-eight.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Developer Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kartik-shukla-cse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  LinkedIn Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Security & Contact
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#trust"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Trust & Security
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Direct Inquiry
                </a>
              </li>
              <li>
                <a
                  href="mailto:kartikshukla2301@gmail.com"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Email Developer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} DevLeveler. Built with precision for developers.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/kartikshukla2301-eng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kartik-shukla-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://kartik-portfolio-chi-eight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="h-4.5 w-4.5" />
            </a>
            <a
              href="mailto:kartikshukla2301@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
