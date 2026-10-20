import type { Metadata } from "next";
import Link from "next/link";
import { Download, LogOut, TriangleAlert } from "lucide-react";
import { DeleteLead, SignInForm } from "@/app/leads/inbox-client";
import { signOut } from "@/app/leads/actions";
import { COUNTRIES } from "@/lib/countries";
import { LEAD_FIELD_LABELS, LEAD_SOURCE_LABELS, LEAD_SOURCES, type LeadField, type LeadSource } from "@/lib/leads";
import { inboxConfigured, signedIn } from "@/lib/leads-auth";
import { listLeads, storageIsPersistent, type Lead } from "@/lib/leads-store";

/* The team's inbox for enquiries from the site's forms, until a CRM takes
   them over. Reached only by its link: nothing on the site points here, it
   is kept out of search engines and out of the sitemap, and it is not named
   in robots.txt either (that file is public, and would advertise it). The
   password (LEADS_PASSWORD) is what actually protects it. */

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false, nocache: true },
};

const SOURCE_TONE: Record<LeadSource, string> = {
  ltd_callback: "bg-[#fff1dc] text-[#8a4b00]",
  talk_to_us: "bg-brand-tint text-brand",
  contact: "bg-[#e6f4ee] text-[#0e6b4a]",
};

// shown under the name, in this order; name and phone are the headline
const DETAILS: LeadField[] = [
  "business_name",
  "country",
  "business_type",
  "current_acquirer",
  "monthly_card_volume",
  "how_heard",
  "message",
];

const when = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Malta",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="min-h-screen bg-bg-2 px-4 py-10 sm:px-6 sm:py-14">
      <div className={`mx-auto ${wide ? "max-w-4xl" : "max-w-sm"}`}>{children}</div>
    </section>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const f = lead.fields;
  const site = COUNTRIES.find((c) => c.code === lead.site_country);
  const tags = Object.entries(lead.tags);
  return (
    <li className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-ink-3">
            <span className={`rounded-full px-2.5 py-0.5 font-semibold ${SOURCE_TONE[lead.source]}`}>
              {LEAD_SOURCE_LABELS[lead.source]}
            </span>
            <time dateTime={lead.at}>{when.format(new Date(lead.at))}</time>
            {site && (
              <span>
                {site.flag} {site.name} site
              </span>
            )}
          </div>
          <h2 className="mt-3 text-[19px] font-semibold tracking-tight text-ink">{f.name}</h2>
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            {f.phone && (
              <a href={`tel:${f.phone.replace(/[^\d+]/g, "")}`} className="font-medium text-brand hover:underline">
                {f.phone}
              </a>
            )}
            {f.email && (
              <a href={`mailto:${f.email}`} className="font-medium text-brand hover:underline">
                {f.email}
              </a>
            )}
          </div>
        </div>
        <DeleteLead id={lead.id} name={f.name ?? ""} />
      </div>

      {DETAILS.some((k) => f[k]) && (
        <dl className="mt-4 grid gap-x-6 gap-y-2.5 border-t border-line pt-4 text-[14px] sm:grid-cols-2">
          {DETAILS.filter((k) => f[k]).map((k) => (
            <div key={k} className={k === "message" ? "sm:col-span-2" : undefined}>
              <dt className="text-[12px] text-ink-3">{LEAD_FIELD_LABELS[k]}</dt>
              <dd className="whitespace-pre-line text-ink-2">{f[k]}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-4 font-mono text-[11.5px] leading-relaxed break-all text-ink-3">
        {lead.page || "/"}
        {tags.length > 0
          ? tags.map(([k, v]) => ` · ${k}=${v}`).join("")
          : " · no campaign tags (direct, or no Marketing consent)"}
      </p>
    </li>
  );
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  if (!inboxConfigured()) {
    return (
      <Shell>
        <h1 className="h-display text-[30px]">Leads</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
          The inbox is locked: no password is set. Add <code className="font-mono text-[13px]">LEADS_PASSWORD</code>{" "}
          (at least 12 characters) to the site&apos;s environment variables in Coolify and restart it. Leads sent in
          the meantime are kept and will be here.
        </p>
      </Shell>
    );
  }

  if (!(await signedIn())) {
    return (
      <Shell>
        <h1 className="h-display text-[30px]">Leads</h1>
        <p className="mt-2 text-[15px] text-ink-2">Enquiries from the website. Team only.</p>
        <SignInForm />
      </Shell>
    );
  }

  const { source } = await searchParams;
  const filter = LEAD_SOURCES.find((s) => s === source);
  const all = await listLeads();
  const leads = filter ? all.filter((l) => l.source === filter) : all;
  const persistent = storageIsPersistent();
  const count = (s?: LeadSource) => (s ? all.filter((l) => l.source === s).length : all.length);

  return (
    <Shell wide>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h-display text-[34px] leading-none">Leads</h1>
          <p className="mt-2 text-[14.5px] text-ink-2">
            Enquiries from the website, newest first. Times are Malta time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/leads/export"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <Download className="size-4" strokeWidth={2} aria-hidden />
            CSV
          </a>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[14px] font-medium text-ink-3 transition-colors hover:text-ink"
            >
              <LogOut className="size-4" strokeWidth={2} aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </div>

      {persistent === false && (
        <p className="mt-6 flex gap-3 rounded-2xl bg-[#fff1dc] px-5 py-4 text-[14px] leading-relaxed text-[#6b3b00]">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" strokeWidth={1.8} aria-hidden />
          <span>
            Leads are being saved inside the app container, and the next deploy will wipe them. In Coolify, add a
            Volume Mount with the destination <code className="font-mono text-[13px]">/app/data</code> to this
            application and redeploy. Until then, download the CSV now and then.
          </span>
        </p>
      )}

      <nav className="mt-7 flex flex-wrap gap-2" aria-label="Filter by form">
        {[undefined, ...LEAD_SOURCES].map((s) => {
          const active = s === filter;
          return (
            <Link
              key={s ?? "all"}
              href={s ? `/leads?source=${s}` : "/leads"}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                active ? "bg-ink text-white" : "bg-white text-ink-2 hover:text-ink"
              }`}
            >
              {s ? LEAD_SOURCE_LABELS[s] : "All"} <span className="opacity-60">{count(s)}</span>
            </Link>
          );
        })}
      </nav>

      {leads.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line-2 px-6 py-12 text-center text-[15px] text-ink-3">
          No leads yet.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      )}
    </Shell>
  );
}
