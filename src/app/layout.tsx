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
  verification: {
    google: "0wCpIGJD3GX2vb4OtMwMl1jkET3Ncdit_8LlUIYrPHE",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevLeveler",
    url: CANONICAL_URL,
    description:
      "AI-Powered Developer Career Intelligence Platform for analyzing GitHub telemetry, ATS resumes, and career roadmaps.",
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
