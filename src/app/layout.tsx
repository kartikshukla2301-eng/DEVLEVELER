import type { Metadata } from "next";
import { Lexend, JetBrains_Mono } from "next/font/google";
import { env } from "@/lib/env";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevLeveler — Know Your Developer Level",
    template: "%s | DevLeveler",
  },
  description:
    "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
  keywords: [
    "developer score",
    "github analyzer",
    "resume analyzer",
    "skill gap analysis",
    "career roadmap",
    "developer portfolio",
    "developer analytics",
  ],
  authors: [{ name: "DevLeveler" }],
  creator: "DevLeveler",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_APP_URL,
    title: "DevLeveler — Know Your Developer Level",
    description:
      "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
    siteName: "DevLeveler",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLeveler — Know Your Developer Level",
    description:
      "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body
        suppressHydrationWarning
        className={`${lexend.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
