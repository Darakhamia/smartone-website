import { cookies } from "next/headers";
import { ATTRIBUTION_FIELDS } from "@/lib/attribution";
import { COUNTRIES, COUNTRY_COOKIE } from "@/lib/countries";
import {
  LEAD_FIELD_LABELS,
  LEAD_FIELDS,
  LEAD_SOURCE_LABELS,
  LEAD_SOURCES,
  MIN_PHONE_DIGITS,
  type LeadField,
  type LeadSource,
} from "@/lib/leads";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { postToTelegram } from "@/lib/telegram";

/* Receives every form on the site – /contact, and the call-back form behind
   Get started and Talk to us – and posts it to the team's Telegram group
   (lib/telegram.ts). Nothing is stored on the site.

   TODO(crm): when the CRM is chosen, send the lead there as well (or
   instead); the forms already send everything it will need. */

const MAX_BODY = 20_000;

const ICON: Record<LeadSource, string> = { get_started: "🚀", talk_to_us: "📞", contact: "✉️" };

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const fail = (status: number) => Response.json({ ok: false }, { status });

function message(
  source: LeadSource,
  fields: Partial<Record<LeadField, string>>,
  tags: [string, string][],
  page: string,
  siteCountry: string,
): string {
  const site = COUNTRIES.find((c) => c.code === siteCountry);
  const lines = [`${ICON[source]} ${LEAD_SOURCE_LABELS[source]}`, ""];
  for (const name of Object.keys(LEAD_FIELDS) as LeadField[]) {
    const value = fields[name];
    if (!value) continue;
    lines.push(name === "message" ? `${LEAD_FIELD_LABELS[name]}:\n${value}` : `${LEAD_FIELD_LABELS[name]}: ${value}`);
  }
  lines.push("", `${site ? `${site.flag} ${site.name} site` : "Site"} · ${page || "/"}`);
  lines.push(
    tags.length
      ? `Campaign: ${tags.map(([k, v]) => `${k}=${v}`).join(" · ")}`
      : "Campaign: none (direct visit, or no marketing consent)",
  );
  return lines.join("\n");
}

export async function POST(request: Request) {
  // Only our own pages send leads. Browsers say where a request comes from;
  // anything that doesn't say is not a browser form, and is let through to the
  // checks below.
  if (request.headers.get("sec-fetch-site") === "cross-site") return fail(403);
  // Keep a flood of fake enquiries out of the team's chat.
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
  // success it can't tell from the real one, and nothing is sent on.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const given = (body.fields ?? {}) as Record<string, unknown>;
  const fields: Partial<Record<LeadField, string>> = {};
  for (const [name, max] of Object.entries(LEAD_FIELDS) as [LeadField, number][]) {
    const value = text(given[name], max);
    if (value) fields[name] = value;
  }

  const taken = (body.tags ?? {}) as Record<string, unknown>;
  const tags: [string, string][] = [];
  for (const name of ATTRIBUTION_FIELDS) {
    const value = text(taken[name], 200);
    if (value) tags.push([name, value]);
  }

  // The same rules the forms check before sending: every form needs a name
  // and an email; the call-back form also a phone and the type of business.
  const phoneDigits = (fields.phone ?? "").replace(/\D/g, "").length;
  if (phoneDigits < MIN_PHONE_DIGITS) delete fields.phone;
  if (!fields.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "")) return fail(400);
  if (source !== "contact" && (!fields.phone || !fields.business_type)) return fail(400);

  const code = (await cookies()).get(COUNTRY_COOKIE)?.value ?? "";
  const note = message(source, fields, tags, text(body.page, 200), code);
  try {
    await postToTelegram(note);
  } catch (e) {
    // The visitor is told it failed and offered the email address. The lead
    // goes to the server log as well, so it can still be found and called.
    console.error("[leads] could not post to Telegram:", e instanceof Error ? e.message : e, `\n${note}`);
    return fail(502);
  }
  return Response.json({ ok: true });
}
