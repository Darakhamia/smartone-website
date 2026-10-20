import { cookies } from "next/headers";
import { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import { COUNTRIES, COUNTRY_COOKIE } from "@/lib/countries";
import { LEAD_FIELDS, LEAD_SOURCES, MIN_PHONE_DIGITS, type LeadField, type LeadSource } from "@/lib/leads";
import { addLead, type AttributionField } from "@/lib/leads-store";
import { clientIp, rateLimited } from "@/lib/rate-limit";

/* Receives every form on the site – /contact, the Ltd call-back in the Get
   started window, Talk to us – and keeps it for the /leads inbox.

   TODO(crm): when the CRM is chosen, forward the lead to it from here as
   well; the forms already send everything it will need. */

const MAX_BODY = 20_000;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const fail = (status: number) => Response.json({ ok: false }, { status });

export async function POST(request: Request) {
  // Only our own pages send leads. Browsers say where a request comes from;
  // anything that doesn't say is not a browser form, and is let through to the
  // checks below.
  if (request.headers.get("sec-fetch-site") === "cross-site") return fail(403);
  if (rateLimited(`lead:${clientIp(request.headers)}`, 8, 10 * 60_000)) return fail(429);
  if (rateLimited("lead:all", 300, 60 * 60_000)) return fail(429);

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return fail(413);
  const raw = await request.text();
  if (raw.length > MAX_BODY) return fail(413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400);
  }
  if (!body || typeof body !== "object") return fail(400);

  const source = body.source as LeadSource;
  if (!LEAD_SOURCES.includes(source)) return fail(400);

  // The honeypot field people never see: a bot that filled it gets a
  // success it can't tell from the real one, and nothing is kept.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const given = (body.fields ?? {}) as Record<string, unknown>;
  const fields: Partial<Record<LeadField, string>> = {};
  for (const [name, max] of Object.entries(LEAD_FIELDS) as [LeadField, number][]) {
    const value = text(given[name], max);
    if (value) fields[name] = value;
  }

  const taken = (body.tags ?? {}) as Record<string, unknown>;
  const tags: Partial<Record<AttributionField, string>> = {};
  for (const name of ATTRIBUTION_FIELDS) {
    const value = text(taken[name], 500);
    if (value) tags[name] = value;
  }

  // The same rules the forms check before sending.
  const phoneDigits = (fields.phone ?? "").replace(/\D/g, "").length;
  if (phoneDigits < MIN_PHONE_DIGITS) delete fields.phone;
  if (!fields.name) return fail(400);
  if (source === "contact" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "") : !fields.phone) {
    return fail(400);
  }

  const code = (await cookies()).get(COUNTRY_COOKIE)?.value ?? "";
  try {
    await addLead({
      source,
      page: text(body.page, 200),
      site_country: COUNTRIES.some((c) => c.code === code) ? code : "",
      fields,
      tags,
    });
  } catch (e) {
    console.error("[leads] could not store a lead", e);
    return fail(500);
  }
  return Response.json({ ok: true });
}
