"use client";

import { useRef, useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { PhoneField } from "@/components/lead/phone-field";
import { PrivacyNote } from "@/components/lead/privacy-note";
import { fieldCls, selectCls } from "@/components/lead/styles";
import { submitLead } from "@/components/lead/submit-lead";
import type { CountryCode } from "@/lib/countries";
import { COMPANY } from "@/lib/legal";
import { BUSINESS_TYPES, MIN_PHONE_DIGITS } from "@/lib/leads";
import { trackLead } from "@/lib/tags";

/* The "call me back" form of the Malta homepage, behind both Get started and
   Talk to us: Name, Phone, Email and Type of business, all required. Since
   the 15.10 correction nobody is sent to sign up in the portal from the
   site: every enquiry is a call-back. It goes to the team's Telegram group
   with its source and the visitor's campaign tags (submitLead → /api/leads).

   Malta-only, so English-only. */

const DIAL: Record<CountryCode, string> = { mt: "356", es: "34", cy: "357", sk: "421", uk: "44" };

const TRACK = { get_started: "form-get-started", talk_to_us: "form-talk-to-us" } as const;

const labelCls = "mb-1.5 block text-[13.5px] font-medium text-ink-2";

export function CallbackForm({ source }: { source: keyof typeof TRACK }) {
  const { country, lang } = useCountry();
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState(`+${DIAL[country.code]} `);
  const [phoneMissing, setPhoneMissing] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    // the field starts as a bare dial code, which "required" would accept
    if (phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS) {
      setPhoneMissing(true);
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const ok = await submitLead(
      source,
      {
        name: String(data.get("name") ?? ""),
        phone,
        email,
        business_type: String(data.get("business_type") ?? ""),
      },
      String(data.get("website") ?? ""),
    );
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("done");
    // conversion for GA4 / Ads / Meta – a no-op unless tags were consented to and loaded
    void trackLead(email, phone, source);
  };

  if (status === "done") {
    return (
      <div className="anim-tier-in mt-6 rounded-2xl bg-brand-tint/60 px-6 py-8 text-center" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white">
          <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12.5l5 5L20 6" />
          </svg>
        </span>
        <p className="mt-4 text-[18px] font-semibold tracking-tight">Thanks — we got it!</p>
        <p className="mt-1.5 text-[14.5px] text-ink-2">We&apos;ll call you within one working day.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} data-track={TRACK[source]} className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Name</span>
          <input name="name" required maxLength={200} autoComplete="name" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <PhoneField
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setPhoneMissing(false);
            }}
            className={fieldCls}
            required
          />
          {phoneMissing && <span className="mt-1.5 block text-[13px] text-[#b4231f]">Enter your phone number.</span>}
        </label>
        <label className="block">
          <span className={labelCls}>Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Type of business</span>
          <select name="business_type" required defaultValue="" className={selectCls}>
            <option value="" disabled>
              Choose…
            </option>
            {BUSINESS_TYPES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
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

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 disabled:opacity-70">
        {status === "sending" ? "Sending…" : "Call me back"}
      </button>
      {status === "error" && (
        <p className="mt-4 rounded-xl bg-[#fbeaea] px-4 py-3 text-[13.5px] text-[#b4231f]">
          Something went wrong — please try again, or email us at{" "}
          <a href={`mailto:${COMPANY.email}`} className="font-semibold underline underline-offset-2">
            {COMPANY.email}
          </a>
          .
        </p>
      )}
      <PrivacyNote lang={lang} className="mt-4" />
    </form>
  );
}
