/* Enquiries sent from the site's forms. Until a CRM is chosen they are
   posted to the team's Telegram group (app/api/leads/route.ts). This file is
   the shape both ends agree on: the forms send it
   (components/lead/submit-lead.ts), /api/leads checks it and passes on only
   what is listed here.

   TODO(crm): once the CRM is chosen, send each lead to it from
   app/api/leads/route.ts – the forms don't need to change. */

export const LEAD_SOURCES = ["contact", "ltd_callback", "talk_to_us"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  contact: "Contact form",
  ltd_callback: "Ltd call-back",
  talk_to_us: "Talk to us",
};

/* The fields a lead may carry, with the longest value passed on. The
   names are the /contact form's own (it also posts them to its original
   endpoint); the call-back forms reuse them – the Ltd form's "Company name"
   is business_name. Anything else in a submission is dropped. */
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
