/* Canonical origin for absolute URLs (sitemap, robots, canonical, JSON-LD, OG).
   smartoneglobal.com is the confirmed production domain – nothing else. Set
   NEXT_PUBLIC_SITE_URL per-environment (in Coolify) only to point a staging
   build at itself; production must stay on the canonical domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartoneglobal.com").replace(/\/+$/, "");
