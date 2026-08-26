# SmartOne website

Marketing website for SmartOne — an all-in-one POS device (card terminal +
fiscal register + receipt printer) with a merchant portal that shows every fee
in plain euros.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Tailwind CSS v4
- Self-hosted fonts via Fontsource (Inter, IBM Plex Mono)
- Brand color: `#5A19B5` (design tokens in `app/globals.css`)

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Deployment (Coolify)

The repo ships a multi-stage `Dockerfile` that builds a standalone Next.js
server (`output: "standalone"` in `next.config.ts`).

1. In Coolify create a new **Application** from this Git repository.
2. Build pack: **Dockerfile** (auto-detected from the repo root).
3. Port: **3000** (exposed by the image).
4. Attach the domain — `smartoneglobal.com` — and let Coolify issue the
   Let's Encrypt certificate and redirect HTTP → HTTPS.
5. Deploy. No database is required.

The canonical domain is **smartoneglobal.com**. It is the built-in default, so
production needs no environment variable to get the right absolute URLs in
`robots.txt`, `sitemap.xml`, canonical/OG tags and JSON-LD.

### Build arguments

Both values below are resolved during `next build`, so they must be set as
Docker **build** arguments. Setting them as runtime environment variables in
Coolify has no effect and fails silently: `NEXT_PUBLIC_*` is inlined into the
client bundle, and the `headers()` in `next.config.ts` is compiled into
`.next/routes-manifest.json`. Changing either one needs a **rebuild**, not a
restart.

| Build arg | Purpose |
| --- | --- |
| `ENABLE_HSTS` | Set to `1` to add `Strict-Transport-Security` (2 years, includeSubDomains, preload) and `upgrade-insecure-requests` to the CSP. **Leave unset until HTTPS is live and verified on the production domain** — HSTS is effectively irreversible for the length of its max-age, and `upgrade-insecure-requests` breaks a build still served over plain HTTP. |
| `NEXT_PUBLIC_SITE_URL` | Overrides the canonical origin. Only for a staging build that should advertise itself (e.g. `https://staging.example.com`) instead of the production domain. Leave unset in production. An empty value falls back to the canonical domain. |

### Security headers

`next.config.ts` sends a CSP plus `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy` and `Permissions-Policy`, and disables `X-Powered-By`.

The CSP allows exactly one external origin: the contact-form endpoint
(`LEAD_ENDPOINT` in `lib/links.ts`), in `connect-src` and `form-action`. There
are no third-party scripts. **Adding any embed — a Trustpilot widget,
analytics, an external video — means adding its origins to the CSP _and_
updating `/cookies`** (and, for anything that sets a cookie, gating it behind
consent). The two have to move together, or the published cookie policy stops
being true.

## Structure

- `app/page.tsx` — homepage, composed of section blocks in `components/home/`
- `app/{product,pricing,industries,about,case-studies,contact,login}` — stub
  pages to be filled in next iterations
- `components/home/proof.tsx` — case-studies block, hidden behind
  `SHOW_PROOF = false` until real customer stories exist (real photos and
  quotes only — no fabricated testimonials)

### TODOs before launch

- HTTPS live on `smartoneglobal.com`, then rebuild with `ENABLE_HSTS=1`
- Create the `info@smartoneglobal.com` mailbox — it is already published in
  `/imprint`, `/privacy` and `/cookies` (see `lib/legal.ts`)
- Confirm the Paynetics wording in `/imprint` and the footer disclaimer with
  the partner, and have the legal texts read by Maltese counsel
- Real sales phone number on `/contact`, if one is to be published
- Replace the stock industry photos with the real photo shoot (real merchants,
  aprons, counters)

### Stock photo credits (Unsplash license, free commercial use)

`public/industries/`: events — unsplash.com/photos/1533174072545-7a4b6ad7a6c3,
retail — 1556740738-b6a63e27c4df, cafés — 1509042239860-f550ce710b93,
services-electrician — 1621905251189-08b45d6a269e,
mobile-courier — 1526367790999-0150786686a2,
bakery — 1509440159596-0249088772ff,
beauty-salon — 1521590832167-7bcbfaa6381f,
grocery — 1542838132-92c53300491e

`public/proof/`: shop — 1607631568010-a87245c0daf8,
vet — 1583512603805-3cc6b41f3edb, cafe — 1556740749-887f6717d7e4
