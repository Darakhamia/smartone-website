/* Canonical origin for absolute URLs (sitemap, robots, canonical, JSON-LD, OG).
   Set NEXT_PUBLIC_SITE_URL per-environment (in Coolify) to the real production
   domain; it falls back to the agreed production domain if unset. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartone.global").replace(/\/+$/, "");
