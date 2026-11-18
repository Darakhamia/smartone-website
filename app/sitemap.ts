import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";

/* Substantive, indexable routes. The /welcome and /login utility pages are
   left out on purpose (they're also disallowed in robots + noindex), and so is
   /case-studies: nothing on the site links to it and it has no stories on it
   yet, so listing it only offers search engines an orphaned page whose whole
   content is that we have nothing to show. Put it back the day it has a real
   case study on it. /product/tap-to-phone is out too while the product hasn't
   launched (it is noindex until then); put it back when it does. /es, a
   placeholder for Spain's Verifactu page, stays out until its full version is
   up. Every URL is absolute on SITE_URL, the canonical bare-domain https
   origin – the same as each page's canonical. */
const PAGES = [
  "",
  "/pricing",
  "/product",
  "/product/terminals",
  "/product/cash-register",
  "/merchant-portal",
  "/click",
  "/industries",
  ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
  "/malta/fiscal-cash-register",
  "/malta/compare",
  "/about",
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
