"use client";

import { useEffect, useRef, useState } from "react";

/* SmartOne lead form. Posts JSON to the Vercel serverless endpoint (no keys
   on the site). The field `name` attributes and every <option> value are
   fixed by the endpoint contract – do not rename or retype them (note the
   en-dash in "€4,000–€15,000"). Labels, order and styling are ours. */

const ENDPOINT = "https://smartone-lead-form.vercel.app/api/lead";

const labelCls = "mb-1.5 block text-[13.5px] font-medium text-ink-2";
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
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");

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
        <h2 className="h-display mt-5 text-[28px] leading-tight">Thanks — we got it!</h2>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">
          We&apos;ll get back to you within one working day.
        </p>
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
        <Field label="Your name">
          <input name="name" required maxLength={200} autoComplete="name" className={fieldCls} />
        </Field>
        <Field label="Business name (optional)">
          <input name="business_name" maxLength={200} autoComplete="organization" className={fieldCls} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldCls} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" maxLength={50} autoComplete="tel" className={fieldCls} />
        </Field>
        <Field label="Country">
          <select name="country" required defaultValue="" className={selectCls}>
            <option value="" disabled>Choose…</option>
            <option>Malta</option>
            <option>Spain</option>
            <option>Slovakia</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Type of business">
          <select name="business_type" required defaultValue="" className={selectCls}>
            <option value="" disabled>Choose…</option>
            <option>Vets</option>
            <option>Retail</option>
            <option value="Cafe / HoReCa">Café &amp; Restaurants</option>
            <option>Services</option>
            <option value="Mobile / Street">Mobile / Street</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Who processes your cards today? (optional)">
          <select name="current_acquirer" defaultValue="" className={selectCls}>
            <option value="">Choose…</option>
            <option>Bank</option>
            <option>SumUp</option>
            <option>myPOS</option>
            <option>Zettle</option>
            <option>Revolut</option>
            <option>None</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Monthly card sales (optional)">
          <select name="monthly_card_volume" defaultValue="" className={selectCls}>
            <option value="">Choose…</option>
            <option>Under €4,000</option>
            <option>€4,000–€15,000</option>
            <option>Over €15,000</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Anything you'd like to ask? (optional)">
          <textarea name="message" rows={3} maxLength={2000} className={`${fieldCls} resize-y`} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="How did you hear about us? (optional)">
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
          {status === "sending" ? "Sending…" : "Contact sales"}
        </button>
        <p className="text-[13px] text-ink-3">We&apos;ll reply within one working day.</p>
      </div>
      {status === "error" && (
        <p className="mt-4 rounded-xl bg-[#fbeaea] px-4 py-3 text-[13.5px] text-[#b4231f]">
          Something went wrong — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
