import { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import { LEAD_FIELDS, LEAD_SOURCE_LABELS, type LeadField } from "@/lib/leads";
import { signedIn } from "@/lib/leads-auth";
import { listLeads } from "@/lib/leads-store";

/* Every lead as a CSV file, for a spreadsheet or for importing into the CRM
   once there is one. Same sign-in as the inbox (its cookie is scoped to
   /leads, which this path sits under). */

/* A cell starting with = + - @ is run as a formula by Excel and Sheets – a
   name like "=HYPERLINK(…)" typed into a form would become a live link. Such
   cells get a leading apostrophe. A phone number starting with + is left as
   it is: digits and spaces can't form anything harmful. */
function cell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) && !/^\+[\d\s().-]+$/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export async function GET() {
  if (!(await signedIn())) return new Response("Sign in at /leads first.", { status: 401 });

  const fields = Object.keys(LEAD_FIELDS) as LeadField[];
  const header = ["received_utc", "form", "page", "site_country", ...fields, ...ATTRIBUTION_FIELDS];
  const rows = (await listLeads()).map((l) => [
    l.at,
    LEAD_SOURCE_LABELS[l.source] ?? l.source,
    l.page,
    l.site_country,
    ...fields.map((f) => l.fields[f] ?? ""),
    ...ATTRIBUTION_FIELDS.map((f) => l.tags[f] ?? ""),
  ]);
  // the byte-order mark makes Excel read the file as UTF-8 (names, €)
  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  const day = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="smartone-leads-${day}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
