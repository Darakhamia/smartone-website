/* schema.org structured data (JSON-LD).
   <OrgJsonLd /> — rendered once in app/layout.tsx.
   <PricingFaqJsonLd /> — rendered on app/pricing/page.tsx.

   IMPORTANT: the FAQ text below is taken verbatim from the visible /pricing
   FAQ (components/pricing/faq.tsx, Malta/register variant — the default that
   search engines index). Google requires the markup to match visible content:
   if the FAQ copy on the page changes, update it here too. */

import { SITE_URL } from "@/lib/site";

export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmartOne",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Fiscally-certified payment devices for European small businesses: card terminal, certified cash register and receipt printer in one box, with a Merchant Portal included.",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const PRICING_FAQ: Array<[question: string, answer: string]> = [
  [
    "What's included in the price?",
    "Everything: the certified cash register and payment terminal, plus the Merchant Portal. No separate software subscription, no per-feature charges.",
  ],
  [
    "Do I need to open a new bank account?",
    "No. Your payouts go to the bank account you already have – we work with a licensed European banking partner, so there's no new interface to learn and no switching cost.",
  ],
  [
    "When do I get my money?",
    "Next business day (T+1). The portal shows exactly what's confirmed to pay you – net of commission, clearly shown.",
  ],
  [
    "Are there any hidden fees?",
    "No. Your commission is shown up front on every settlement in the portal. No setup fees, no monthly minimums, no surprise line items in a PDF statement.",
  ],
  [
    "How fast can I start taking payments?",
    "Four business days or less from signing up to going live – including fiscal registration of the device for your market.",
  ],
  [
    "Buy or rent – which is cheaper?",
    "Renting keeps your upfront cost low with a small monthly fee and a slightly lower transaction rate, on a one-year term. Buying is a one-off device cost with no minimum term. Either way, the same three volume bands apply.",
  ],
  [
    "How is my rate decided?",
    "By your monthly card volume – the more you take, the lower the rate. Pick the band that fits on the table above; if you're near an edge or want a tailored quote, talk to us and we'll confirm your rate within one business day.",
  ],
];

export function PricingFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
