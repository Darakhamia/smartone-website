import type { Country } from "./countries";

/* Verified legal-entity details, taken from the company's Certificate of
   Registration and VAT Certificate. Published on /imprint (required by the
   Malta e-Commerce Act, Cap. 426, implementing Dir. 2000/31 Art. 5, and the
   Companies Act, Cap. 386 s.82) and reused by the footer and the privacy and
   cookie policies – one copy so the pages can never drift apart.

   Nothing here may be guessed: every value below comes from a corporate
   document or was confirmed by the company. */
export const COMPANY = {
  name: "SmartOne POS Europe Limited",
  /* Malta Business Registry */
  registrationNumber: "C 115037",
  vat: "MT32643225",
  address: "Level 6, Room 2, Tagliaferro Business Centre, Sqaq Gaiety, Sliema SLM 1551, Malta",
  /* One monitored mailbox for both general and privacy enquiries. Split it
     (e.g. privacy@) only once the second mailbox actually exists – a policy
     that names an address nobody reads is worse than one that doesn't. */
  email: "info@smartoneglobal.com",
} as const;

/* SmartOne is a technology provider, not a licensed payment institution: the
   regulated activity sits with the partner below. Trade classification 8299
   ("other business support service activities") matches that.

   Which partner depends on the market. UK merchants are served by a separate
   FCA-authorised company, not by the EEA entity passported across the Union –
   so a hardcoded partner tells a British visitor something untrue about who
   holds their money and who regulates it. Every place that names the partner
   has to ask which country the visitor is on: /imprint, section 5 of /privacy,
   and the footer disclaimer. */
export type EmiPartner = {
  name: string;
  /** Regulator, English. */
  regulator: string;
  /** Regulator, Spanish. */
  regulatorEs: string;
  /** True for the EEA entity, which is passported across the Union. */
  passported: boolean;
};

export function emiPartner(country: Country): EmiPartner {
  if (country.code === "uk") {
    return {
      name: "Paynetics UK Limited",
      regulator: "the Financial Conduct Authority (firm reference number 942777)",
      regulatorEs: "la Financial Conduct Authority (FRN 942777)",
      passported: false,
    };
  }
  return {
    name: "Paynetics AD",
    regulator: "the Bulgarian National Bank",
    regulatorEs: "el Banco Nacional de Bulgaria",
    passported: true,
  };
}

/* Lead supervisory authority – the controller is established in Malta. Other
   national authorities are referred to generically as "your local authority". */
export const IDPC = {
  name: "Office of the Information and Data Protection Commissioner (IDPC)",
  address: "Floor 2, Airways House, High Street, Sliema SLM 1549, Malta",
  phone: "+356 2328 7100",
  email: "idpc.info@gov.mt",
} as const;
