import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/* Origin of the contact-form endpoint (see LEAD_ENDPOINT in lib/links.ts).
   next.config.ts can't import from lib – it is evaluated before the TS path
   aliases exist – so the origin is repeated here. If it changes there, change
   it here too, or the only form on the site stops submitting. */
const LEAD_ORIGIN = "https://smartone-lead-form.vercel.app";

/* Enable once the site is served over stable HTTPS. HSTS is hard to undo (a
   browser that has seen it refuses plain HTTP for the whole max-age), and
   upgrade-insecure-requests rewrites subresource URLs to https://, so both
   would break a build still being served over plain HTTP. Set ENABLE_HSTS=1
   in Coolify after TLS is live and verified. */
const httpsReady = process.env.ENABLE_HSTS === "1";

/* Google Tag Manager and the tags it is meant to carry: GA4, the Google Ads
   conversion tag and the Meta pixel.

   Every system is named here rather than googletagmanager.com alone. A tag
   added through the GTM interface is still an ordinary third-party script –
   the browser checks the origin the script came from, not who injected it – so
   a container that is allowed while the tags inside it are not would load and
   then fail silently, with the breakage visible only in the console.

   These are allowances, not loads. The container is requested only by
   lib/tags.ts, only after the visitor switches on Analytics or Marketing, and
   only in a build with NEXT_PUBLIC_GTM_ID set – an allowance here never makes
   anything load on its own.

   *.g.doubleclick.net and www.google.com in connect-src cover GA4 with Google
   Signals (stats.g.doubleclick.net) and Enhanced Conversions; the GTM check in
   a clean browser should still show no CSP violations in the console before
   the container goes live.

   td.doubleclick.net is deliberately absent: it is needed only by the Ads
   remarketing tag, for syncing audiences through an iframe, and audiences are
   not being collected. If that changes it goes in frame-src. */
const GTM = "https://www.googletagmanager.com";
const TAG_SCRIPT = [GTM, "https://www.googleadservices.com", "https://connect.facebook.net"];
const TAG_CONNECT = [
  GTM,
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.g.doubleclick.net",
  "https://www.google.com",
  "https://www.facebook.com",
];
const TAG_IMG = [
  GTM,
  "https://*.google-analytics.com",
  "https://www.google.com",
  "https://*.g.doubleclick.net",
  "https://www.facebook.com",
];

/* No nonce: a nonce has to be generated per request, which means every page
   renders dynamically (see the Next CSP guide) – that would undo the static
   generation this marketing site depends on, and the region gate was already
   moved out of a proxy for exactly that reason. 'unsafe-inline' covers Next's
   own hydration scripts, and GTM's loader needs it too; a locked base-uri /
   object-src / frame-ancestors is the proportionate trade.

   frame-ancestors stays 'none', and X-Frame-Options below stays DENY. GTM's
   Preview mode loads the site inside an iframe on tagassistant.google.com and
   will not connect while either is in place: relaxing BOTH (they are separate
   headers and some browsers honour the older one) is a deliberate, temporary
   step for whoever is debugging the container, not something to leave on.

   Adding any further embed – a review widget, a video – means adding its
   origins here AND updating /cookies. Those two move together. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TAG_SCRIPT.join(" ")}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${TAG_IMG.join(" ")}`,
  "font-src 'self'",
  `connect-src 'self' ${LEAD_ORIGIN} ${TAG_CONNECT.join(" ")}${isDev ? " ws: wss:" : ""}`,
  `form-action 'self' ${LEAD_ORIGIN}`,
  `frame-src ${GTM}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(httpsReady ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), camera=(), microphone=(), payment=(), usb=()",
  },
  ...(httpsReady
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
];

/* The Webflow site this replaced used different paths, and those are the URLs
   sitting in Google's index today – all of them now 404. A permanent redirect
   keeps the visitor and hands the ranking to the new page instead of losing
   both. Keep these long after launch: old URLs take months to age out of an
   index, and they stay in other people's links and bookmarks for longer.

   Only paths with a genuine equivalent are listed. The old GovTech pages
   (/government, /smartone-dms, /smartone-tms, /smartone-track-trace) have no
   counterpart here and are deliberately left to 404: pointing them at the
   homepage would be a soft 404 to a search engine and a dead end to a reader. */
const legacyRedirects = [
  { source: "/smartone-click", destination: "/click", permanent: true },
  { source: "/smartone-bank", destination: "/product/terminals", permanent: true },
  { source: "/smartone-merchant-portal", destination: "/merchant-portal", permanent: true },
  { source: "/smartone-about-company", destination: "/about", permanent: true },
];

const nextConfig: NextConfig = {
  // Standalone output for the Docker image deployed via Coolify
  output: "standalone",
  // Don't advertise the framework or its version (X-Powered-By: Next.js)
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
