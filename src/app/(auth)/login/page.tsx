"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Code2, ArrowLeft, Loader2 } from "lucide-react";

function GithubIcon({ className = "h-5 w-5 shrink-0 text-[#0f172a]", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both your email and password.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Verify your credentials.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-base p-8 w-full max-w-[400px] bg-white border border-slate-200/90 rounded-2xl shadow-xl space-y-6">
      
      {/* Branding */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Link 
          href="/" 
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:opacity-90 transition-opacity shadow-xs"
        >
          <Code2 className="h-5.5 w-5.5" />
        </Link>
        <h2 className="text-xl font-bold text-[#0f172a] mt-2">
          Sign In
        </h2>
        <p className="text-xs text-[#475569]">
          Access your DevLeveler insights & Career Coach.
        </p>
      </div>

      {/* Error block */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-[11px] text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Credentials form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-[#475569] tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="dev@example.com"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[10px] uppercase font-bold text-[#475569] tracking-wider">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-[10px] font-semibold text-blue-600 hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Social Login Separator */}
      <div className="relative flex items-center justify-center py-1">
        <hr className="w-full border-slate-200" />
        <span className="absolute bg-white px-3 text-[9px] uppercase font-bold text-[#64748b] tracking-widest">
          OR CONTINUE WITH
        </span>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-col gap-2.5">
        {/* Google OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          disabled={loading}
          type="button"
          id="google-oauth-btn"
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0f172a] hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.85-.7 1.94l3.11 2.41c1.82-1.68 2.85-4.16 2.85-6.2Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.11-2.41c-.86.58-1.97.92-3.22.92-2.48 0-4.58-1.68-5.33-3.93l-3.21 2.48C7.03 21.84 9.29 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M6.67 15.67A7.15 7.15 0 0 1 6 12c0-1.28.22-2.52.67-3.67l-3.21-2.48A11.94 11.94 0 0 0 0 12c0 2.37.69 4.59 1.88 6.47l4.79-3.8Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.94 1.19 15.22 0 12 0 9.29 0 7.03 2.16 5.46 5.85l3.21 2.48c.75-2.25 2.85-3.93 5.33-3.93Z"
            />
          </svg>
          <span className="font-semibold text-sm text-[#0f172a]">Continue with Google</span>
        </button>

        {/* GitHub OAuth */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          disabled={loading}
          type="button"
          id="github-oauth-btn"
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0f172a] hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <GithubIcon className="h-5 w-5 shrink-0 text-[#0f172a]" />
          <span className="font-semibold text-sm text-[#0f172a]">Continue with GitHub</span>
        </button>
      </div>

      {/* Switch to Sign Up */}
      <div className="text-center pt-2 text-xs text-[#475569] border-t border-slate-200">
        Don&apos;t have an account?{" "}
        <Link 
          href="/signup" 
          className="font-bold text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </div>

      {/* Back Link */}
      <div className="text-center pt-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
