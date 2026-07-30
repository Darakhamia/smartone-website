/* Canonical origin for absolute URLs (sitemap, robots, canonical, JSON-LD, OG).
   smartoneglobal.com is the confirmed production domain – nothing else.

   Override it only to point a staging build at itself, and only as a Docker
   build arg (see the Dockerfile): the value is inlined at build time, so a
   runtime environment variable in Coolify would be ignored. The check is for a
   non-empty string on purpose – an unset build arg arrives as "", which `??`
   would happily pass through and leave every absolute URL origin-less. */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configured || "https://smartoneglobal.com").replace(/\/+$/, "");
