/* The short industry pages for Malta: /industries (the Malta index) and
   /industries/<slug>. Pure data – safe to import from server and client.

   Every word on those pages lives in this file, so that text edits (Alex's
   review is still to come) happen here and nowhere else. The source is Nadya's
   prototype content.json of 12.11.2026, with these deliberate departures:
   – retail.fact: the prototype's "the only device in Malta that is both…"
     breaks the 05.11 copy rule against "the only". Replaced with a fact that
     makes no comparison.
   – beauty.moments[2]: "what you will receive" reads as money already on the
     merchant's account (05.11 rule 2). Rephrased around the payout.
   – cafes, bakery, services: the Z-report and receipts are "on the device",
     not "in the portal" – reports in the portal are not confirmed yet.
   – prices, rates and the rental term come from lib/pricing.ts, not from
     the prototype's text.
   – image alts describe the photos actually in public/industries (the
     prototype's alts were written for other shots).

   The copy is Malta's: fiscal receipts, EXO, the cash register. It is shown
   only where promotesRegister() holds (see industryPagesFor below) – never
   reuse it for another market. Do not add claims that are not in the source. */

import { COUNTRY_MAP, promotesRegister, type Country } from "@/lib/countries";
import { termsFor } from "@/lib/pricing";

/** Whether the Malta industry pages are served to this market. They talk
    about the cash register throughout, so they follow the register gate. */
export function industryPagesFor(country: Country): boolean {
  return promotesRegister(country);
}

/* Prices, rates and the rental term for the pages' own market. */
const terms = termsFor(COUNTRY_MAP.mt);
const rent = `€${terms.price.rent[0]} + VAT a month`;
const buy = `€${terms.price.buy[0]} + VAT`;
const cardFee = `${terms.rates.rent[0]}% + €${terms.fixed}`;
const rentTerm = terms.rentTermMonths ? `${terms.rentTermMonths}-month term.` : "";

export type IndustrySlug = "cafes" | "retail" | "beauty" | "bakery" | "grocery" | "events" | "mobile" | "services";

export type Industry = {
  slug: IndustrySlug;
  /** Tile on the index and in "Other industries" */
  cardTitle: string;
  cardLine: string;
  image: string;
  imageAlt: string;
  /** <title> (used as is, without the site-wide suffix) and meta description */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  sub: string;
  chips: string[];
  moments: { when: string; title: string; text: string }[];
  /** `source` may be empty – then no source line is shown. */
  fact: { big: string; text: string; source: string };
  faq: { q: string; a: string };
  stays: string;
  finalH2: string;
};

export const INDUSTRY_SHARED = {
  ctaLabel: "Talk to us →",
  ctaNote: "Leave your number – our partner in Malta calls you back.",
  proof: ["VAT-approved fiscal cash register", "Card, contactless and cash", `From ${rent}`],
  chipsLabel: "Made for",
  momentsHeading: "What it does in your day",
  factSourceLabel: "Source",
  price: {
    eyebrow: "Pricing",
    heading: "One device, one price.",
    items: [
      { label: "Rent", value: rent, note: rentTerm },
      { label: "Or buy", value: buy, note: "No minimum term." },
      {
        label: "Card fee",
        value: cardFee,
        note: `Rental plan, local cards, up to €${terms.bands[0]} a month. Lower above that.`,
      },
    ],
    foot: "Cash register, receipt printer and merchant portal included. Bought separately, a fiscal cash register alone costs €800–1,200.",
    linkLabel: "See full pricing →",
    linkHref: "/pricing",
  },
  faqHeading: "Quick answers",
  /* When /malta/fiscal-cash-register is live, link it from this answer. */
  faqExo: {
    q: "Do I need an EXO number?",
    a: "No. SmartOne is approved by Malta's tax authority (MTCA) as a fiscal cash register – Government Gazette, 10 January 2025, Notice 46. The EXO number is for POS software, so an approved cash register does not need one.",
  },
  staysLabel: "What stays with you",
  finalSub:
    "Leave your number and a few details. Our partner in Malta calls you back. Usually live in four business days or less once the details are agreed with them.",
  othersLabel: "Other industries",
  index: {
    title: "Industries – SmartOne Malta",
    description: "One device for the till, the card and the fiscal receipt. See what SmartOne looks like in your trade.",
    eyebrow: "Industries",
    h1: "One device, your kind of business.",
    sub: "It is the same job everywhere – take the payment, print the fiscal receipt, know your money. Pick your trade to see what that looks like at your counter.",
    gridHeading: "Pick your trade",
    fallbackH2: "Don't see your trade? It still fits.",
    fallbackSub: "If you take payments from customers, SmartOne works for you.",
  },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "cafes",
    cardTitle: "Cafés & HoReCa",
    cardLine: "Orders reach the register",
    image: "/industries/cafes.jpg",
    imageAlt: "Latte art in coffee cups on a café table",
    title: "Cash register and card machine for cafés in Malta – SmartOne",
    description: `One device for cafés, bars and restaurants in Malta: VAT-approved fiscal cash register, card terminal and receipt printer. From ${rent}.`,
    eyebrow: "Cafés, bars & restaurants",
    h1: "From order to fiscal receipt, on one device.",
    sub: "Morning flat whites or a full Saturday service – ring it up, take the card or the cash, print the fiscal receipt. One device on the bar instead of three.",
    chips: ["Cafés", "Bars", "Restaurants", "Takeaways", "Kiosks"],
    moments: [
      { when: "At the rush", title: "Tap, print, next", text: "Card, contactless or cash on one screen. The receipt printer is built in, so the queue keeps moving." },
      { when: "At the table", title: "Orders reach the register", text: "With SmartOne Click, an order taken at the table goes straight to the register and the kitchen." },
      { when: "At close", title: "One Z-report for cards and cash", text: "Close the shift on the device. The Z-report and every receipt are on the device, ready for your accountant." },
    ],
    fact: {
      big: "2 in 3",
      text: "in-store payments in Malta are still made in cash. SmartOne puts cash and cards on the same register and the same Z-report.",
      source: "ECB SPACE study, 2024",
    },
    faq: {
      q: "Do I need SmartOne Click to use the device?",
      a: "No. The device works on its own as your cash register, card terminal and printer. Click adds tables, orders and a kitchen display when you need them.",
    },
    stays: "Reservations and delivery apps stay with the tools you use today.",
    finalH2: "Tell us about your café.",
  },
  {
    slug: "retail",
    cardTitle: "Retail",
    cardLine: "Ring up, tap, receipt out",
    image: "/industries/retail.jpg",
    imageAlt: "Clothes on rails in a small boutique",
    title: "Cash register and card machine for shops in Malta – SmartOne",
    description: `One device for retail in Malta: VAT-approved fiscal cash register, card terminal and receipt printer. Card, contactless and cash. From ${rent}.`,
    eyebrow: "Retail",
    h1: "Ring up, tap, receipt out.",
    sub: "A fiscal cash register, a card terminal and a receipt printer in one device on your counter. Set your prices once, then see what sells from your phone.",
    chips: ["Boutiques", "Gift shops", "Hardware stores", "Florists", "Pet shops"],
    moments: [
      { when: "At the counter", title: "Any way they pay", text: "Card, contactless or cash on the same screen, with one fiscal receipt at the end." },
      { when: "Before you open", title: "Price it once", text: "Set products and prices in the portal. The register rings them up the same way every time." },
      { when: "At month-end", title: "Know what sold", text: "Revenue, average basket and top categories for any period – plus the exact card fee, in euros." },
    ],
    /* Replaces the prototype's "the only device in Malta…" (05.11 rule 2). */
    fact: {
      big: "1 device",
      text: "Fiscal cash register, card terminal and receipt printer in one. One contract, one thing on the counter.",
      source: "",
    },
    faq: {
      q: "Does it replace both my cash register and my card machine?",
      a: "Yes. One device does both jobs and prints the receipt, so there is one contract and one thing on the counter.",
    },
    stays: "Stock counts and suppliers stay where you keep them today.",
    finalH2: "Tell us about your shop.",
  },
  {
    slug: "beauty",
    cardTitle: "Beauty & wellness",
    cardLine: "Serve, get paid, hand over the receipt",
    image: "/industries/beauty-salon.jpg",
    imageAlt: "Styling chairs and mirrors in a hair salon",
    title: "Card machine and fiscal cash register for salons in Malta – SmartOne",
    description: `One handheld device for hair salons, barbers and beauty rooms in Malta: take the payment at the chair and print the fiscal receipt. From ${rent}.`,
    eyebrow: "Beauty & wellness",
    h1: "Paid at the chair, receipt in hand.",
    sub: "From a fringe trim to a full colour – take the card or the cash where your client is sitting and print the fiscal receipt on the spot.",
    chips: ["Hair salons", "Barbers", "Nail studios", "Beauty rooms", "Spas"],
    moments: [
      { when: "At the chair", title: "Service, then payment", text: "Finish the appointment and take payment on the same handheld device." },
      { when: "Every client", title: "A receipt every time", text: "The fiscal receipt prints from the device itself. No receipt book, no second printer." },
      /* Prototype: "what you will receive" – rephrased around the payout (05.11 rule 2). */
      { when: "End of the week", title: "Know your week", text: "What you took and what is due in your next payout, in euros, on your phone." },
    ],
    fact: {
      big: "€0",
      text: "extra in a quiet month. No minimum fee and no inactivity fee on your card payments.",
      source: "SmartOne pricing",
    },
    faq: {
      q: "I work alone. Is a cash register too much for me?",
      a: `It is one handheld device, not a till on a desk. Rent it for ${rent} and the cash register, the card terminal and the printer are all covered.`,
    },
    stays: "Appointment booking and reminders stay in your current scheduler.",
    finalH2: "Tell us about your salon.",
  },
  {
    slug: "bakery",
    cardTitle: "Bakeries",
    cardLine: "Fast morning queue",
    image: "/industries/bakery.jpg",
    imageAlt: "Loaves of fresh bread with ears of wheat",
    title: "Cash register and card machine for bakeries in Malta – SmartOne",
    description:
      "One device for bakeries and pastizzerias in Malta: VAT-approved fiscal cash register, card terminal and receipt printer. Card, contactless and cash on one screen.",
    eyebrow: "Bakeries",
    h1: "Keep the morning queue moving.",
    sub: "A ftira, six pastizzi and a coffee – ring it up, tap, receipt out. One device is your till, your card machine and your receipt printer.",
    chips: ["Bakeries", "Pastizzerias", "Confectioneries", "Cake shops"],
    moments: [
      { when: "At 7 a.m.", title: "Fast at the peak", text: "Your products are priced once in the portal, so ringing up a regular order takes a few taps." },
      { when: "Small tickets", title: "Cards for small change", text: "Card, contactless or cash on the same screen – whatever the customer has in hand." },
      { when: "At close", title: "One Z-report", text: "Cash and card sales close together. The Z-report is on the device, ready for your accountant." },
    ],
    fact: {
      big: "2 in 3",
      text: "in-store payments in Malta are still made in cash. SmartOne rings up coins and cards on the same register, with one Z-report at close.",
      source: "ECB SPACE study, 2024",
    },
    faq: {
      q: "Do cash sales go through the same device?",
      a: "Yes. Cash and card sales are rung up on the same register and end up on the same Z-report.",
    },
    stays: "Recipes, production and wholesale orders stay with you.",
    finalH2: "Tell us about your bakery.",
  },
  {
    slug: "grocery",
    cardTitle: "Grocery",
    cardLine: "Card, contactless and cash",
    image: "/industries/grocery.jpg",
    imageAlt: "Fresh vegetables on grocery shop shelves",
    title: "Cash register and card machine for grocery shops in Malta – SmartOne",
    description:
      "One device for mini markets and grocers in Malta: VAT-approved fiscal cash register, card terminal and receipt printer. Card, contactless and cash at one till.",
    eyebrow: "Grocery",
    h1: "Card, contactless and cash at one till.",
    sub: "Small baskets, all day long. SmartOne rings them up, takes whatever the customer pays with and prints the fiscal receipt – from one device.",
    chips: ["Mini markets", "Grocers", "Greengrocers", "Butchers", "Convenience stores"],
    moments: [
      { when: "At the till", title: "Any way they pay", text: "Card, contactless or cash on the same screen. One fiscal receipt either way." },
      { when: "On the shelf", title: "Prices set once", text: "Set products and prices in the portal and the register follows." },
      { when: "At month-end", title: "See what the cards cost you", text: "The portal shows the commission you paid, in euros. No surprise line items." },
    ],
    fact: {
      big: "2 in 3",
      text: "in-store payments in Malta are still made in cash. SmartOne takes cash and cards on one register, so you run one till, not two machines.",
      source: "ECB SPACE study, 2024",
    },
    faq: {
      q: "Will a quiet month cost me extra?",
      a: "No. There is no minimum fee and no inactivity fee. You pay the card fee on what you actually take, plus the device rent if you rent.",
    },
    stays: "Stock counts, scales and suppliers stay where you keep them today.",
    finalH2: "Tell us about your shop.",
  },
  {
    slug: "events",
    cardTitle: "Festivals & events",
    cardLine: "Every bar takes cards",
    image: "/industries/events.jpg",
    imageAlt: "A festival crowd and confetti in front of a lit stage",
    title: "Card terminals and fiscal receipts for events in Malta – SmartOne",
    description:
      "One device per bar for festivals and events in Malta: card terminal, VAT-approved fiscal cash register and receipt printer, with takings visible live in the portal.",
    eyebrow: "Festivals & events",
    h1: "Every bar takes cards. Every bar prints a receipt.",
    sub: "Set the menu once, put a SmartOne at every stand and watch the takings come in while the gates are still open.",
    chips: ["Festivals", "Village festas", "Concerts", "Pop-up bars", "Food courts"],
    moments: [
      { when: "Before doors", title: "One menu, every stand", text: "Set products and prices once in the portal. Every bar rings up the same prices." },
      { when: "During service", title: "A fiscal receipt at every bar", text: "The printer is built in, so each stand hands over its own fiscal receipt." },
      { when: "While it's on", title: "See the takings live", text: "Revenue by day and by bar in the portal, from your phone." },
    ],
    fact: {
      big: "T+1",
      text: "Card takings are paid to your own bank account the next business day.",
      source: "SmartOne pricing",
    },
    faq: {
      q: "Does it work without Wi-Fi?",
      a: "Yes – every device has its own SIM and runs on 4G. It does need a connection to take payments, so check mobile coverage at the venue.",
    },
    stays: "Ticketing and access control stay with your event platform.",
    finalH2: "Tell us about your event.",
  },
  {
    slug: "mobile",
    cardTitle: "Mobile & street",
    cardLine: "No Wi-Fi needed",
    image: "/industries/mobile-courier.jpg",
    imageAlt: "A courier riding through a narrow city street",
    title: "Mobile card machine with fiscal receipts in Malta – SmartOne",
    description:
      "A standalone device for market stalls, food trucks and kiosks in Malta: card terminal, VAT-approved fiscal cash register and receipt printer on 4G.",
    eyebrow: "Mobile & street",
    h1: "Your till goes where you go.",
    sub: "Market stall, food truck or kiosk – one standalone device takes the card, prints the fiscal receipt and runs on mobile data.",
    chips: ["Market stalls", "Food trucks", "Kiosks", "Street hawkers", "Couriers"],
    moments: [
      { when: "No Wi-Fi", title: "4G built in", text: "The device has its own SIM. It needs mobile signal, not a router." },
      { when: "All day", title: "Battery lasts the shift", text: "One charge covers the shift, receipts included." },
      { when: "Nothing else to carry", title: "A standalone device", text: "No phone, no laptop, no separate printer." },
    ],
    fact: {
      big: "€0",
      text: "extra when trade is slow. No minimum fee and no inactivity fee on your card payments.",
      source: "SmartOne pricing",
    },
    faq: {
      q: "What happens if there is no signal?",
      a: "SmartOne needs a connection to take card payments. It runs on 4G through its own SIM, or on Wi-Fi where you have it.",
    },
    stays: "Delivery apps stay separate.",
    finalH2: "Tell us about your business.",
  },
  {
    slug: "services",
    cardTitle: "Professional services",
    cardLine: "Parts and labour, one bill",
    image: "/industries/services-electrician.jpg",
    imageAlt: "An electrician in a hard hat working on a panel",
    title: "Card machine and fiscal receipts for trades and services in Malta – SmartOne",
    description: `One handheld device for electricians, plumbers, garages and vets in Malta: take the payment on site and print the fiscal receipt. From ${rent}.`,
    eyebrow: "Professional services",
    h1: "Job done. Paid on the spot.",
    sub: "Parts and labour on one bill, card or cash at the customer's door, and a fiscal receipt printed before you pack the van.",
    chips: ["Electricians", "Plumbers", "Garages", "Vets", "Repair shops"],
    moments: [
      { when: "On site", title: "Paid before you leave", text: "Take the card at the door instead of sending an invoice and waiting." },
      { when: "On the bill", title: "Parts and labour together", text: "Add both to the same sale and print one fiscal receipt." },
      { when: "At month-end", title: "Ready for your accountant", text: "Receipts and Z-reports are on the device, ready for your accountant." },
    ],
    fact: {
      big: "T+1",
      text: "Paid to the bank account you already have, the next business day. No new account to open.",
      source: "SmartOne pricing",
    },
    faq: {
      q: "I'm on the road all day. Do I need a counter?",
      a: "No. SmartOne is a handheld device with its own SIM, battery and printer. It needs mobile signal to take payments.",
    },
    stays: "Quotes and job scheduling stay in the tools you use today.",
    finalH2: "Tell us about your business.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** The two "Quick answers" on an industry page, in the order shown – the
    visible list and the FAQPage JSON-LD both read this, so they can't drift. */
export function industryFaq(ind: Industry): { q: string; a: string }[] {
  return [ind.faq, INDUSTRY_SHARED.faqExo];
}
