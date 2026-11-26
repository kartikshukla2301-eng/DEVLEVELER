import type { Metadata } from "next";
import Script from "next/script";
import { Lexend, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const GTM_ID = "GTM-5V9ZFSTT";

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
    default: "DevLeveler — Free AI Developer Score, GitHub & Resume Analyzer",
    template: "%s | DevLeveler",
  },
  description:
    "DevLeveler is a free AI tool that scores your developer profile 0-100 by analyzing your GitHub activity, resume, and skills. Get a skill gap report and a personalized 12-week career roadmap in minutes — no credit card required.",
  keywords: [
    "developer score",
    "ai developer score",
    "github analyzer",
    "resume analyzer",
    "ats resume checker",
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
    title: "DevLeveler — Free AI Developer Score, GitHub & Resume Analyzer",
    description:
      "Free AI tool that scores your developer profile 0-100 from your GitHub activity, resume, and skills — with a skill gap report and a personalized 12-week career roadmap.",
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
    title: "DevLeveler — Free AI Developer Score, GitHub & Resume Analyzer",
    description:
      "Free AI tool that scores your developer profile 0-100 from your GitHub activity, resume, and skills — with a skill gap report and a personalized 12-week career roadmap.",
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
      "Free AI tool that scores your developer profile 0-100 from your GitHub activity, resume, and skills — with a skill gap report and a personalized 12-week career roadmap.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevLeveler",
    url: CANONICAL_URL,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "DevLeveler is a free AI tool that scores your developer profile 0-100 by analyzing your GitHub activity, resume, and skills. Get a skill gap report and a personalized 12-week career roadmap in minutes.",
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
        {/* Google Tag Manager — loaded after the page is interactive so it never
            blocks first paint. */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${lexend.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* GTM noscript fallback — required by Google so tracking still fires for
            visitors with JavaScript disabled. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
