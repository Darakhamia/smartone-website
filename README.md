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
4. Attach your domain and deploy.

No database is required at this stage.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID` | Enables the official Trustpilot TrustBox widget in the trust line (live stars + review count). Get it in Trustpilot Business → Integrations → TrustBox. Until set, the site shows a plain link to the [Trustpilot profile](https://ie.trustpilot.com/review/smartoneglobal.com) instead. Build-time variable — set it in Coolify **build** args/env and redeploy. |

## Structure

- `app/page.tsx` — homepage, composed of section blocks in `components/home/`
- `app/{product,pricing,industries,about,case-studies,contact,login}` — stub
  pages to be filled in next iterations
- `components/home/proof.tsx` — case-studies block, hidden behind
  `SHOW_PROOF = false` until real customer stories exist (real photos and
  quotes only — no fabricated testimonials)

### Content TODOs before launch

- Set `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID` to show the live Trustpilot
  widget (`components/trustpilot.tsx`)
- Real sales email / phone on `/contact`
- Merchant portal URL for `/login`
- Replace the hero SVG placeholder and the stock industry photos with the
  real photo/video shoot (real merchants, aprons, counters)

### Stock photo credits (Unsplash license, free commercial use)

`public/industries/`: vets — unsplash.com/photos/1628009368231-7bb7cfcb0def,
retail — 1556740738-b6a63e27c4df, cafés — 1509042239860-f550ce710b93,
services — 1585747860715-2ba37e788b70, mobile — 1565123409695-7b5ef63a2efb
