"use client";

import { LeadButton } from "@/components/lead/talk-to-us";

/* "Get started" on the Malta homepage (hero, Where are you starting from,
   A local partner in Malta, first-year costs, final CTA). It opens the same
   call-back form as Talk to us, sent with the source get_started. Until the
   15.10 correction it first asked self-employed or Ltd and sent the
   self-employed to sign up in the Merchant Portal; nobody is sent to the
   portal from the site now.

   Malta-only, so English-only. Keep the data-track value: GTM counts it. */
export function GetStarted({ location, className }: { location: string; className?: string }) {
  return (
    <LeadButton
      source="get_started"
      track="cta-get-started"
      location={location}
      title="Get started"
      intro="Leave your details and we'll call you within one working day."
      className={className}
    >
      Get started →
    </LeadButton>
  );
}
