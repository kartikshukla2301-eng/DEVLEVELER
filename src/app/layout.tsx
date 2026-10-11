import type { Metadata } from "next";
import { Lexend, JetBrains_Mono } from "next/font/google";
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

const CANONICAL_URL = "https://devleveler.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
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
  authors: [{ name: "Kartik Shukla", url: "https://github.com/kartikshukla2301-eng" }],
  creator: "Kartik Shukla",
  publisher: "DevLeveler",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CANONICAL_URL,
    title: "DevLeveler — Know Your Developer Level",
    description:
      "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
    siteName: "DevLeveler",
    images: [
      {
        url: "/github-social-preview.png",
        width: 1376,
        height: 768,
        alt: "DevLeveler — AI-Powered Developer Intelligence Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLeveler — Know Your Developer Level",
    description:
      "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
    images: ["/github-social-preview.png"],
    creator: "@kartikshukla2301",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevLeveler",
    url: CANONICAL_URL,
    description:
      "AI-Powered Developer Intelligence Platform for analyzing GitHub telemetry, ATS resumes, and career roadmaps.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler",
    url: CANONICAL_URL,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "Analyze your GitHub, Resume, Projects and Skills. Get your Developer Score, Skill Gap Analysis, and personalized Career Roadmap.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with initial developer profile analysis and baseline intelligence.",
    },
    author: {
      "@type": "Person",
      name: "Kartik Shukla",
      url: "https://github.com/kartikshukla2301-eng",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is DevLeveler?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DevLeveler is a telemetry-driven developer career intelligence platform. By scanning public GitHub repositories and parsing uploaded resumes, we map out technical proficiencies, identify library or framework skill gaps, and generate step-by-step career roadmaps.",
        },
      },
      {
        "@type": "Question",
        name: "How is the score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your Developer Score is computed as a weighted composite: Projects & Code Quality (30%), GitHub Activity Volume (25%), Skill Balance & Gaps (20%), ATS Resume Quality (15%), and Deployment/DevOps Prep (10%). If some data is not connected, the weights are distributed proportionally among available metrics.",
        },
      },
      {
        "@type": "Question",
        name: "Is GitHub required?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. While connecting GitHub unlocks deeper analysis of your coding velocity and repositories, you can still upload your resume, receive skill gap audits, practice technical interview prep questions, and use roadmaps without linking GitHub.",
        },
      },
      {
        "@type": "Question",
        name: "Is my resume private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All resumes are parsed securely using server-side actions, and parsed text fields are stored with encryption. We never share your data. You can delete your resume and all associated audit reports instantly from your settings page.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are recommendations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our recommendations are calibrated against thousands of software engineering job descriptions and repository structures. The Career Coach engine checks for missing critical tools (e.g. Docker, Redis, Testing suites) corresponding specifically to your target roles to ensure suggestions are practical.",
        },
      },
      {
        "@type": "Question",
        name: "Can students use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! DevLeveler is specifically designed to help students prepare for internships and entry-level positions. Our new student-friendly Starter ($1/mo) and Growth ($3/mo) plans make complete career intelligence accessible to everyone.",
        },
      },
      {
        "@type": "Question",
        name: "Can professionals use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Mid-level and senior developers use the platform to spot deficiencies in their portfolios, audit their resumes for senior-track ATS keywords, and track milestones toward high-scale enterprise engineering roles.",
        },
      },
      {
        "@type": "Question",
        name: "How often can I analyze my profile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Free tier users receive one initial analysis session. Starter users can re-scan their GitHub footprint once per month, Growth users can re-scan up to 5 times per month, and Pro users receive unlimited daily scans and roadmaps.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const safeJsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
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
