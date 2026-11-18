/* Enquiries sent from the site's forms. Until a CRM is chosen they are
   posted to the team's Telegram group (app/api/leads/route.ts). This file is
   the shape both ends agree on: the forms send it
   (components/lead/submit-lead.ts), /api/leads checks it and passes on only
   what is listed here.

   TODO(crm): once the CRM is chosen, send each lead to it from
   app/api/leads/route.ts – the forms don't need to change. */

import { COUNTRIES, type Country } from "@/lib/countries";
import { tariffsFor, termsFor } from "@/lib/pricing";

export const LEAD_SOURCES = ["contact", "get_started", "talk_to_us"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  contact: "Contact form",
  get_started: "Get started",
  talk_to_us: "Talk to us",
};

/* The fields a lead may carry, with the longest value passed on. The
   names are the /contact form's own (it also posts them to its original
   endpoint); the call-back forms reuse them. Anything else in a submission
   is dropped. */
export const LEAD_FIELDS = {
  name: 200,
  phone: 50,
  email: 200,
  business_name: 200,
  country: 60,
  business_type: 60,
  current_acquirer: 60,
  monthly_card_volume: 60,
  message: 2000,
  how_heard: 300,
} as const;
export type LeadField = keyof typeof LEAD_FIELDS;

export const LEAD_FIELD_LABELS: Record<LeadField, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  business_name: "Business",
  country: "Country",
  business_type: "Type of business",
  current_acquirer: "Cards processed by",
  monthly_card_volume: "Monthly card sales",
  message: "Message",
  how_heard: "How they heard",
};

/* A phone number counts once it has this many digits. The phone field starts
   as a bare dial code ("+356 "), which is not a number yet. */
export const MIN_PHONE_DIGITS = 8;

/* "Type of business", as both the /contact form and the call-back forms
   offer it. The values are fixed by /contact's original endpoint contract;
   the labels are the English ones. */
export const BUSINESS_TYPES = [
  { value: "Festivals / Events", label: "Festivals & events" },
  { value: "Retail", label: "Retail" },
  { value: "Cafe / HoReCa", label: "Café & Restaurants" },
  { value: "Services", label: "Services" },
  { value: "Mobile / Street", label: "Mobile / Street" },
  { value: "Other", label: "Other" },
] as const;

/* "Who processes your cards today?" – the providers merchants on the site's
   markets (Malta, Spain, Cyprus, Slovakia, the UK) most often already have a
   terminal from, plus a bank, none and other. The value is what /api/leads
   passes on (anything else is dropped); Bank, None and Other are translated
   on /contact, the brand names never are. Viva Wallet joined after the first
   real lead (18.11.2026) had to pick myPOS for want of it. */
export const ACQUIRERS = [
  "Bank",
  "myPOS",
  "Revolut",
  "Square",
  "SumUp",
  "Viva Wallet",
  "Zettle",
  "None",
  "Other",
] as const;

/* "How did you hear about us?" on /contact. The values are the English text
   that goes into the lead; "Our partner in Malta" is offered on the Malta
   site only. "Other" may carry what the visitor typed after it
   ("Other: a trade fair"). */
export const HOW_HEARD = [
  "Google search",
  "ChatGPT or another AI assistant",
  "Facebook or Instagram",
  "A recommendation",
  "Our partner in Malta",
  "Other",
] as const;
export type HowHeard = (typeof HOW_HEARD)[number];

/* "Monthly card sales", in the market's own bands from lib/pricing.ts: the
   volume bands where the rate goes by volume (Malta 4,000 / 15,000, the UK
   5,000 / 20,000), and Light's cap where the market is priced by card type
   (Spain: up to 10,000 is Light, above it Individual). `value` is the
   English text that goes into the lead; the forms turn `kind` and the
   figures into the label in the visitor's language. */
export type CardVolumeBand =
  | { kind: "under" | "upTo" | "over"; value: string; amount: string }
  | { kind: "between"; value: string; amount: string; to: string };

export function cardVolumeBands(country: Country): CardVolumeBand[] {
  const c = country.currencySymbol;
  const tariffs = tariffsFor(country);
  if (tariffs) {
    return [
      { kind: "upTo", value: `Up to ${c}${tariffs.cap}`, amount: tariffs.cap },
      { kind: "over", value: `Over ${c}${tariffs.cap}`, amount: tariffs.cap },
    ];
  }
  const [low, high] = termsFor(country).bands;
  return [
    { kind: "under", value: `Under ${c}${low}`, amount: low },
    // an en-dash, as /contact's original endpoint has always had it
    { kind: "between", value: `${c}${low}–${c}${high}`, amount: low, to: high },
    { kind: "over", value: `Over ${c}${high}`, amount: high },
  ];
}

/* Every value a select on the forms can send, per field. /api/leads drops a
   value that isn't listed, so a form can't put anything else in the chat. */
export const LEAD_FIELD_VALUES: Partial<Record<LeadField, readonly string[]>> = {
  current_acquirer: ACQUIRERS,
  monthly_card_volume: [...new Set(COUNTRIES.flatMap((c) => cardVolumeBands(c).map((b) => b.value)))],
};
