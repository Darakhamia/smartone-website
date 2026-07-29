/* The live Merchant Portal (an external application). Every "Log in" /
   "Open the portal" link across the site points here. */
export const MERCHANT_PORTAL_URL = "https://smartoneclub.com";

/* Where the contact form posts (a serverless endpoint, so no keys live on the
   site). It is a cross-origin request, so the Content-Security-Policy in
   next.config.ts has to allow this origin in both connect-src (the fetch) and
   form-action (the no-JS <form action> fallback) – a bare 'self' policy
   silently breaks the only data-collection point on the site. Keep the two in
   step: next.config.ts can't import from here (it runs before the TS path
   aliases), so the origin is repeated there with a pointer back to this note. */
export const LEAD_ENDPOINT = "https://smartone-lead-form.vercel.app/api/lead";
