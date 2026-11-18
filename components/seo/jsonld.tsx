/* schema.org structured data (JSON-LD).
   <OrgJsonLd /> — rendered once in app/layout.tsx.
   <PricingFaqJsonLd /> — rendered on app/pricing/page.tsx.
   <ProductJsonLd /> — rendered on app/pricing/page.tsx, Malta only (below).

   IMPORTANT: the FAQ text below is taken verbatim from the visible /pricing
   FAQ (components/pricing/faq.tsx, Malta/register variant — the default that
   search engines index). Google requires the markup to match visible content:
   if the FAQ copy on the page changes, update it here too. */

import { COMPANY } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";
import { terminalModel, TERMINAL_MODELS, type Country } from "@/lib/countries";
import { termsFor } from "@/lib/pricing";

const ORG_ID = `${SITE_URL}/#organization`;

/* The brand's own profiles, for Organization.sameAs. Only accounts that are
   confirmed to be ours – a wrong one tells search engines a stranger's page
   is SmartOne. Add LinkedIn, Instagram and the like here once confirmed. */
const SOCIAL_PROFILES = ["https://www.facebook.com/smartoneworld"];

export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "SmartOne",
    /* The registered entity behind the brand – same values as /imprint and the
       footer, so the structured data can't contradict the published notice. */
    legalName: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Payment devices for European small businesses: card terminal, fiscal cash register and receipt printer in one box, with a Merchant Portal included.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 6, Room 2, Tagliaferro Business Centre, Sqaq Gaiety",
      addressLocality: "Sliema",
      postalCode: "SLM 1551",
      addressCountry: "MT",
    },
    vatID: COMPANY.vat,
    identifier: COMPANY.registrationNumber,
    email: COMPANY.email,
    sameAs: SOCIAL_PROFILES,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const PRICING_FAQ: Array<[question: string, answer: string]> = [
  [
    "What's included in the price?",
    "Everything: the VAT-approved cash register and payment terminal, plus the Merchant Portal. No separate software subscription, no per-feature charges.",
  ],
  [
    "Do I need to open a new bank account?",
    "No. Payments are processed by a licensed EU acquirer, and your payouts go to the bank account you already have – no new account, nothing to switch.",
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

/* The device as a Product with its purchase price, for Malta only.

   One URL serves every market and the country comes from a cookie, so a
   crawler – which sends none – always gets the default market, Malta. Malta
   is also the only market whose price is a single published figure on
   /pricing (the Buy card, "+ VAT"); Google wants the offer in the markup to be
   what the page shows. Rendering another market's offer would only ever reach
   visitors, never a search engine, so it isn't rendered at all.

   The model is the one terminalModel() gives the market – never a mix – and
   the price is the Buy price from lib/pricing.ts, VAT excluded as the card
   says. If Malta's price ever varies by volume band, this has to change from
   a single Offer to an AggregateOffer. */
export function ProductJsonLd({ country }: { country: Country }) {
  if (country.code !== "mt") return null;
  const model = TERMINAL_MODELS[terminalModel(country)];
  const price = termsFor(country).price.buy[0];
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model.name,
    image: `${SITE_URL}${model.dir}/hero.webp`,
    description:
      "Card payment terminal with a VAT-approved fiscal cash register and receipt printer built in, plus the Merchant Portal.",
    brand: { "@type": "Brand", name: "SmartOne" },
    manufacturer: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pricing`,
      price,
      priceCurrency: country.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: country.currency,
        valueAddedTaxIncluded: false,
      },
      eligibleRegion: { "@type": "Country", name: "MT" },
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
