"use client";

import { LeadButton } from "@/components/lead/talk-to-us";

/* The main call-back button on the Malta homepage (hero, Where are you
   starting from, Our partner in Malta, first-year costs, final CTA). Since
   Alex's 15.10.2026 correction there is no "Get started" and no
   self-employed / Ltd choice anywhere: the visitor sees one button, Talk to
   us, which opens the call-back form. Nobody is sent to the portal from the
   site.

   The name, the source get_started and the data-track value are the old
   Get started ones on purpose: GTM triggers and the lead source in Telegram
   count them, so keep them until GTM is changed.

   Malta-only, so English-only. */
export function GetStarted({ location, className }: { location: string; className?: string }) {
  return (
    <LeadButton
      source="get_started"
      track="cta-get-started"
      location={location}
      title="Talk to us"
      intro="Leave your details and we'll call you within one working day."
      className={className}
    >
      Talk to us →
    </LeadButton>
  );
}
