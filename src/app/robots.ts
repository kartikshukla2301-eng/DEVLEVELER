import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://devleveler.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/forgot-password",
          "/reset-password",
        ],
      },
      {
        userAgent: ["GPTBot", "PerplexityBot", "ClaudeBot", "Applebot-Extended"],
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
