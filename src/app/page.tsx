import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

const WhyUs = dynamic(() => import("@/components/landing/why-us").then(m => m.WhyUs));
const About = dynamic(() => import("@/components/landing/about").then(m => m.About));
const ProductPreview = dynamic(() => import("@/components/landing/product-preview").then(m => m.ProductPreview));
const HowItWorks = dynamic(() => import("@/components/landing/how-it-works").then(m => m.HowItWorks));
const Features = dynamic(() => import("@/components/landing/features").then(m => m.Features));
const Pricing = dynamic(() => import("@/components/landing/pricing").then(m => m.Pricing));
const Trust = dynamic(() => import("@/components/landing/trust").then(m => m.Trust));
const FAQ = dynamic(() => import("@/components/landing/faq").then(m => m.FAQ));
const Contact = dynamic(() => import("@/components/landing/contact").then(m => m.Contact));

const homeFaqStructuredData = {
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
        text: "Yes! DevLeveler is specifically designed to help students prepare for internships and entry-level positions. Our student-friendly Starter and Growth plans make complete career intelligence accessible to everyone.",
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
};

export default function Home() {
  const safeJsonLd = JSON.stringify(homeFaqStructuredData).replace(/</g, "\\u003c");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <About />
        <ProductPreview />
        <HowItWorks />
        <Features />
        <Pricing />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
