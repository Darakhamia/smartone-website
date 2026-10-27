/* The site does not link into the Merchant Portal (27.10: no Log in, no
   sign-up from the site – every enquiry goes through a call-back form). The
   per-country portal addresses and the link component that carried the
   campaign tags across are in the git history, should that change. */

/* API documentation, hosted on the portal's own domain – which is why the
   footer lists it beside the Merchant Portal rather than under Company. */
export const API_DOCS_URL = "https://docs.smartoneclub.com";

/* Where the contact form posts (a serverless endpoint, so no keys live on the
   site). It is a cross-origin request, so the Content-Security-Policy in
   next.config.ts has to allow this origin in both connect-src (the fetch) and
   form-action (the no-JS <form action> fallback) – a bare 'self' policy
   silently breaks the only data-collection point on the site. Keep the two in
   step: next.config.ts can't import from here (it runs before the TS path
   aliases), so the origin is repeated there with a pointer back to this note. */
export const LEAD_ENDPOINT = "https://smartone-lead-form.vercel.app/api/lead";
