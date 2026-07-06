# SmartOne website

Marketing website for SmartOne — an all-in-one POS device (card terminal +
fiscal register + receipt printer) with a merchant portal that shows every fee
in plain euros.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Tailwind CSS v4
- Self-hosted fonts via Fontsource (Bricolage Grotesque, Inter, IBM Plex Mono)

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

No database or environment variables are required at this stage.

## Structure

- `app/page.tsx` — homepage, composed of section blocks in `components/home/`
- `app/{product,pricing,industries,about,case-studies,contact,login}` — stub
  pages to be filled in next iterations
- `components/home/proof.tsx` — case-studies block, hidden behind
  `SHOW_PROOF = false` until real customer stories exist (real photos and
  quotes only — no fabricated testimonials)

### Content TODOs before launch

- Substantiate the trust-line figures (Trustpilot rating, device count) —
  `components/home/trust-line.tsx`
- Real sales email / phone on `/contact`
- Merchant portal URL for `/login`
- Replace the hero SVG placeholder and industry emoji tiles with the real
  photo/video shoot (real merchants, aprons, counters)
