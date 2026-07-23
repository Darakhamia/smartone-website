import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Allow everyone, including AI crawlers (explicitly, as a positive AI-SEO
   signal). Utility pages with no indexable content are disallowed. */
const DISALLOW = ["/welcome", "/login"];
const AI_BOTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
