"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneField, COUNTRY_DIAL, flag } from "@/components/lead/phone-field";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";

/* SmartOne lead form. Posts JSON to the Vercel serverless endpoint (no keys
   on the site). The field `name` attributes and every <option> value are
   fixed by the endpoint contract – do not rename or retype them (note the
   en-dash in "€4,000–€15,000"). Labels, order and styling are ours. */

const ENDPOINT = "https://smartone-lead-form.vercel.app/api/lead";

// min-height keeps the label box the same height whether it wraps to one or
// two lines, so the inputs in a row never drift out of alignment.
const labelCls = "mb-1.5 flex min-h-[34px] items-end text-[13.5px] font-medium text-ink-2";
const fieldCls =
  "w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-brand focus:ring-2 focus:ring-brand/15";
const selectCls = `${fieldCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%2386868b%22 stroke-width=%221.6%22 stroke-linecap=%22round%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export function LeadForm() {
  const { lang } = useCountry();
  /* Only the display text is translated – every <option> value stays exactly
     as the endpoint contract expects it. */
  const t = tr(
    lang,
    {
      choose: "Choose…",
      name: "Your name",
      business: "Business name (optional)",
      email: "Email",
      phone: "Phone (optional)",
      countryL: "Country",
      spain: "Spain",
      cyprus: "Cyprus",
      slovakia: "Slovakia",
      uk: "United Kingdom",
      other: "Other",
      typeL: "Type of business",
      vets: "Vets",
      retail: "Retail",
      cafes: "Café & Restaurants",
      services: "Services",
      mobile: "Mobile / Street",
      acquirerL: "Who processes your cards today? (optional)",
      bank: "Bank",
      none: "None",
      volumeL: "Monthly card sales (optional)",
      under: "Under €4,000",
      over: "Over €15,000",
      messageL: "Anything you'd like to ask? (optional)",
      heardL: "How did you hear about us? (optional)",
      submit: "Contact sales",
      sending: "Sending…",
      reply: "We'll reply within one business day.",
      doneTitle: "Thanks — we got it!",
      doneText: "We'll get back to you within one business day.",
      error: "Something went wrong — please try again, or email us directly.",
    },
    {
      choose: "Elige…",
      name: "Tu nombre",
      business: "Nombre del negocio (opcional)",
      email: "Email",
      phone: "Teléfono (opcional)",
      countryL: "País",
      spain: "España",
      cyprus: "Chipre",
      slovakia: "Eslovaquia",
      uk: "Reino Unido",
      other: "Otro",
      typeL: "Tipo de negocio",
      vets: "Veterinaria",
      retail: "Retail",
      cafes: "Cafeterías y restaurantes",
      services: "Servicios",
      mobile: "Móvil / Calle",
      acquirerL: "¿Quién procesa tus tarjetas hoy? (opcional)",
      bank: "Banco",
      none: "Ninguno",
      volumeL: "Ventas mensuales con tarjeta (opcional)",
      under: "Menos de €4,000",
      over: "Más de €15,000",
      messageL: "¿Algo que quieras preguntar? (opcional)",
      heardL: "¿Cómo nos conociste? (opcional)",
      submit: "Contactar con ventas",
      sending: "Enviando…",
      reply: "Respondemos en un día hábil.",
      doneTitle: "¡Gracias, lo recibimos!",
      doneText: "Te responderemos en un día hábil.",
      error: "Algo salió mal. Inténtalo de nuevo o escríbenos por email.",
    },
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // pick a country → prefill the phone dial code (only if phone is empty),
  // so the flag lights up straight away
  const onCountry = (c: string) => {
    setCountry(c);
    if (!phone.trim() && COUNTRY_DIAL[c]) setPhone(`+${COUNTRY_DIAL[c]} `);
  };

  // populate the hidden attribution fields from first-touch storage
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    let saved: Record<string, string> = {};
    try {
      saved = JSON.parse(localStorage.getItem("so_first_touch") || "{}");
    } catch {
      /* ignore */
    }
    (["utm_source", "utm_medium", "utm_campaign", "referrer_first_touch"] as const).forEach((f) => {
      const el = form.elements.namedItem(f) as HTMLInputElement | null;
      if (el) el.value = saved[f] || "";
    });
  }, []);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    setStatus("sending");

    const data: Record<string, string> = {};
    Array.from(form.elements).forEach((el) => {
      const input = el as HTMLInputElement;
      if (input.name) data[input.name] = input.value;
    });

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  };

  if (status === "done") {
    return (
      <div className="anim-tier-in rounded-3xl border border-line bg-white p-10 text-center shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)]">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-tint">
          <svg viewBox="0 0 24 24" className="size-7 stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12.5l5 5L20 6" />
          </svg>
        </span>
        <h2 className="h-display mt-5 text-[28px] leading-tight">{t.doneTitle}</h2>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{t.doneText}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={ENDPOINT}
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name}>
          <input name="name" required maxLength={200} autoComplete="name" className={fieldCls} />
        </Field>
        <Field label={t.business}>
          <input name="business_name" maxLength={200} autoComplete="organization" className={fieldCls} />
        </Field>
        <Field label={t.email}>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldCls} />
        </Field>
        <Field label={t.phone}>
          <PhoneField value={phone} onChange={setPhone} className={fieldCls} />
        </Field>
        <Field label={t.countryL}>
          <select
            name="country"
            required
            value={country}
            onChange={(e) => onCountry(e.target.value)}
            className={selectCls}
          >
            <option value="" disabled>{t.choose}</option>
            <option value="Malta">{flag("MT")} Malta</option>
            <option value="Spain">{flag("ES")} {t.spain}</option>
            <option value="Cyprus">{flag("CY")} {t.cyprus}</option>
            <option value="Slovakia">{flag("SK")} {t.slovakia}</option>
            <option value="United Kingdom">{flag("GB")} {t.uk}</option>
            <option value="Other">🌐 {t.other}</option>
          </select>
        </Field>
        <Field label={t.typeL}>
          <select name="business_type" required defaultValue="" className={selectCls}>
            <option value="" disabled>{t.choose}</option>
            <option value="Vets">{t.vets}</option>
            <option value="Retail">{t.retail}</option>
            <option value="Cafe / HoReCa">{t.cafes}</option>
            <option value="Services">{t.services}</option>
            <option value="Mobile / Street">{t.mobile}</option>
            <option value="Other">{t.other}</option>
          </select>
        </Field>
        <Field label={t.acquirerL}>
          <select name="current_acquirer" defaultValue="" className={selectCls}>
            <option value="">{t.choose}</option>
            <option value="Bank">{t.bank}</option>
            <option>SumUp</option>
            <option>myPOS</option>
            <option>Zettle</option>
            <option>Revolut</option>
            <option value="None">{t.none}</option>
            <option value="Other">{t.other}</option>
          </select>
        </Field>
        <Field label={t.volumeL}>
          <select name="monthly_card_volume" defaultValue="" className={selectCls}>
            <option value="">{t.choose}</option>
            <option value="Under €4,000">{t.under}</option>
            <option>€4,000–€15,000</option>
            <option value="Over €15,000">{t.over}</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label={t.messageL}>
          <textarea name="message" rows={3} maxLength={2000} className={`${fieldCls} resize-y`} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t.heardL}>
          <input name="how_heard" maxLength={300} className={fieldCls} />
        </Field>
      </div>

      {/* honeypot – visually hidden, must NOT be display:none, must stay in DOM */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
      />

      {/* attribution – filled by the effect above, don't touch */}
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="referrer_first_touch" />

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-70">
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p className="text-[13px] text-ink-3">{t.reply}</p>
      </div>
      {status === "error" && (
        <p className="mt-4 rounded-xl bg-[#fbeaea] px-4 py-3 text-[13.5px] text-[#b4231f]">{t.error}</p>
      )}
    </form>
  );
}
