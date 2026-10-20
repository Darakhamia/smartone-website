import { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import { readFirstTouch } from "@/lib/consent";
import type { LeadSource } from "@/lib/leads";

/* Send one enquiry to the site's own inbox (/api/leads → the /leads page).
   The visitor's first-touch campaign tags go with it under their shared
   names – only with Marketing consent (readFirstTouch returns nothing
   without it), and only the ones that have a value. Read now, at sending,
   not when the form opened: consent may have changed since.

   `website` is the honeypot field: real visitors leave it empty.
   Resolves to whether the inbox took the lead; never throws. */
export async function submitLead(
  source: LeadSource,
  fields: Record<string, string | undefined>,
  website = "",
): Promise<boolean> {
  const saved = readFirstTouch() ?? {};
  const tags: Record<string, string> = {};
  for (const f of ATTRIBUTION_FIELDS) if (saved[f]) tags[f] = saved[f];
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, fields, tags, website, page: window.location.pathname }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
