"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Sparkles,
  Route,
  Compass,
  ClipboardCheck,
  FolderCode,
  MessageSquare,
  Zap,
  // Award, // Temporarily disabled with Rankings & Leaderboard
  CreditCard,
  Users,
  Shield,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

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

function DevLevelerLogoIcon() {
  return (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-1.5 shrink-0 shadow-xs border border-slate-700/40">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Radiating node at the top */}
        <circle cx="34" cy="14" r="3" fill="#00f0ff" />
        <path d="M34 11V7M37 12L40 9M38 15H42M37 17L40 20M34 18V21M31 17L28 20M30 15H26M31 12L28 9" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Stairs leading up to node */}
        <path d="M10 38V30H18V22H26V14L34 14" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Isometric 3D depth lines */}
        <path d="M10 38H16L24 30H18M18 30H24L32 22H26M26 22H32L38 16H34" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <path d="M16 38V34M24 30V26M32 22V18" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}

interface SidebarProps {
  user?: {
    name?: string | null;
    image?: string | null;
    role?: string | null;
    plan?: string | null;
    isEarlyAdopter?: boolean;
    avatarSource?: string;
    customAvatar?: string | null;
    googleAvatarUrl?: string | null;
    githubAvatarUrl?: string | null;
    devScore?: number | null;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = user?.role ?? "DEVELOPER";

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Developer Intelligence", icon: Sparkles, href: "/dashboard/intelligence" },
    { label: "GitHub Intelligence", icon: GithubIcon, href: "/dashboard/github" },
    { label: "Readiness & Skills", icon: Zap, href: "/dashboard/readiness" },
    { label: "Career Roadmap", icon: Route, href: "/dashboard/roadmap" },
    { label: "Projects & Code", icon: FolderCode, href: "/dashboard/projects" },
    { label: "Portfolio Audit", icon: ClipboardCheck, href: "/dashboard/portfolio" },
    { label: "AI Career Coach", icon: Compass, href: "/dashboard/career-coach" },
    { label: "Interview Prep", icon: MessageSquare, href: "/dashboard/interview" },
    // Temporarily disabled:
    // { label: "Rankings & Leaderboard", icon: Award, href: "/dashboard/rankings" },
    { label: "Billing & Founding Dev", icon: CreditCard, href: "/dashboard/billing" },
  ];

  if (role === "RECRUITER" || role === "ADMIN") {
    navItems.push({ label: "Recruiter Portal", icon: Users, href: "/dashboard/recruiter" });
  }

  if (role === "ADMIN") {
    navItems.push({ label: "Admin Dashboard", icon: Shield, href: "/dashboard/admin" });
  }

  // Avatar source resolution
  const avatarSrc = (() => {
    const source = user?.avatarSource || "INITIALS";
    if (source === "CUSTOM" && user?.customAvatar) return user.customAvatar;
    if (source === "GOOGLE" && user?.googleAvatarUrl) return user.googleAvatarUrl;
    if (source === "GITHUB" && user?.githubAvatarUrl) return user.githubAvatarUrl;
    return user?.image || "/avatar-sample.png";
  })();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="mobile-sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 top-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-border shadow-xl flex flex-col justify-between overflow-y-auto md:hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {/* Logo Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <DevLevelerLogoIcon />
                  <span className="font-semibold text-lg tracking-tight text-on-surface font-headline">
                    DevLeveler
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[11px] tracking-wider font-mono">
                  PRO
                </span>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-1 mt-2">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors",
                        active
                          ? "bg-primary-container text-white font-semibold shadow-xs"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                      )}
                    >
                      <item.icon className="h-4.5 w-4.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Bottom Area */}
            <div className="p-4 flex flex-col gap-2 bg-surface-container-low border-t border-border">
              <div className="flex flex-col gap-0.5 mb-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-border flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <Image
                      src={avatarSrc}
                      alt="Profile"
                      width={32}
                      height={32}
                      unoptimized
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary-container rounded-full ring-2 ring-white"></span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {user?.name || "Kartik"}
                    </span>
                    <span className="text-[10px] text-on-surface-variant truncate font-mono">
                      Sr. Fullstack Track
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-1">
                  <span className="text-[9px] text-outline uppercase font-mono tracking-wider">
                    Dev Score
                  </span>
                  <span className="text-xs text-primary font-bold font-mono">
                    {user?.devScore !== null && user?.devScore !== undefined ? user.devScore : 87}
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Fixed 72 / 288px) */}
      <aside
        className={cn(
          "sidebar-transition fixed left-0 top-0 h-screen bg-surface-container-lowest border-r border-border shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 hidden md:flex flex-col justify-between overflow-y-auto shrink-0 print:hidden",
          collapsed ? "w-20" : "w-72"
        )}
      >
        <div className="p-4 flex flex-col gap-3">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <DevLevelerLogoIcon />
              {!collapsed && (
                <span className="font-semibold text-lg tracking-tight text-on-surface font-headline truncate">
                  DevLeveler
                </span>
              )}
            </div>

            {!collapsed && (
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px] tracking-wider font-mono">
                  PRO
                </span>
                <button
                  onClick={() => setCollapsed(true)}
                  className="p-1 rounded-md text-outline hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            )}

            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="absolute -right-3 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface-container-lowest text-outline hover:bg-surface-container-high hover:text-on-surface shadow-xs cursor-pointer"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 mt-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                    active
                      ? "bg-primary-container text-white font-semibold shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                    collapsed ? "justify-center px-0 py-2.5" : ""
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Area */}
        <div className="p-3 flex flex-col gap-2 bg-surface-container-low border-t border-border">
          {!collapsed && (
            <div className="flex flex-col gap-0.5 mb-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Bell className="h-4 w-4 text-outline" />
                <span>Notifications</span>
              </Link>
              <Link
                href="/dashboard/roadmap"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-outline" />
                <span>Documentation & Help</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Settings className="h-4 w-4 text-outline" />
                <span>Settings</span>
              </Link>
            </div>
          )}

          {/* Profile Card */}
          <div
            className={cn(
              "p-2.5 rounded-xl bg-surface-container-lowest border border-border flex items-center justify-between shadow-xs",
              collapsed ? "p-1.5 justify-center" : ""
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <Image
                  src={avatarSrc}
                  alt="Profile"
                  width={32}
                  height={32}
                  unoptimized
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary-container rounded-full ring-2 ring-white"></span>
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-on-surface truncate font-headline">
                    {user?.name || "Kartik"}
                  </span>
                  <span className="text-[10px] text-on-surface-variant truncate font-mono">
                    Sr. Fullstack Track
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="flex flex-col items-end shrink-0 pl-1">
                <span className="text-[9px] text-outline uppercase font-mono tracking-wider">
                  Dev Score
                </span>
                <span className="text-xs text-primary font-bold font-mono">
                  {user?.devScore !== null && user?.devScore !== undefined ? user.devScore : 87}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
