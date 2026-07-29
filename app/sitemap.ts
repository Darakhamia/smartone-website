import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Substantive, indexable routes. The /welcome and /login utility pages are
   left out on purpose (they're also disallowed in robots + noindex). */
const PAGES = [
  "",
  "/pricing",
  "/product",
  "/product/terminals",
  "/product/cash-register",
  "/product/tap-to-phone",
  "/merchant-portal",
  "/click",
  "/industries",
  "/about",
  "/case-studies",
  "/contact",
  "/imprint",
  "/privacy",
  "/cookies",
];

const LEGAL = new Set(["/imprint", "/privacy", "/cookies"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency: LEGAL.has(path) ? "yearly" : "monthly",
    priority: path === "" ? 1 : LEGAL.has(path) ? 0.3 : 0.7,
  }));
}
