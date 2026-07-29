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

/* No nonce: a nonce has to be generated per request, which means every page
   renders dynamically (see the Next CSP guide) – that would undo the static
   generation this marketing site depends on, and the region gate was already
   moved out of a proxy for exactly that reason. With zero third-party scripts
   on the page, 'unsafe-inline' for Next's own hydration scripts plus a locked
   base-uri / object-src / frame-ancestors is the proportionate trade. Adding
   any embed (Trustpilot widget, analytics, a video) means adding its origins
   here AND updating /cookies – the two have to move together. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${LEAD_ORIGIN}${isDev ? " ws: wss:" : ""}`,
  `form-action 'self' ${LEAD_ORIGIN}`,
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

const nextConfig: NextConfig = {
  // Standalone output for the Docker image deployed via Coolify
  output: "standalone",
  // Don't advertise the framework or its version (X-Powered-By: Next.js)
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
