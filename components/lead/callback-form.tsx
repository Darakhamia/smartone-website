"use client";

import { useRef, useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { PhoneField } from "@/components/lead/phone-field";
import { PrivacyNote } from "@/components/lead/privacy-note";
import { fieldCls } from "@/components/lead/styles";
import { submitLead } from "@/components/lead/submit-lead";
import type { CountryCode } from "@/lib/countries";
import { COMPANY } from "@/lib/legal";
import { MIN_PHONE_DIGITS } from "@/lib/leads";
import { trackLead } from "@/lib/tags";

/* The short "call me back" forms of the Malta homepage (task §1):
   - Ltd, inside the Get started window: Name, Phone, Company name;
   - Talk to us: Name and Phone.
   Both go to the team's Telegram group with their source and the visitor's
   campaign tags (submitLead → /api/leads). The data-track values are the ones
   the task fixes for GTM – keep them.

   Malta-only, so English-only. */

const DIAL: Record<CountryCode, string> = { mt: "356", es: "34", cy: "357", sk: "421", uk: "44" };

const TRACK = { ltd_callback: "form-ltd-callback", talk_to_us: "form-talk-to-us" } as const;

export function CallbackForm({ source }: { source: keyof typeof TRACK }) {
  const { country, lang } = useCountry();
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState(`+${DIAL[country.code]} `);
  const [phoneMissing, setPhoneMissing] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const company = source === "ltd_callback";

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
    const ok = await submitLead(
      source,
      {
        name: String(data.get("name") ?? ""),
        phone,
        business_name: company ? String(data.get("business_name") ?? "") : undefined,
      },
      String(data.get("website") ?? ""),
    );
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("done");
    // conversion for GA4 / Ads / Meta – a no-op unless tags were consented to and loaded
    void trackLead("", phone, source);
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
          <span className="mb-1.5 block text-[13.5px] font-medium text-ink-2">Name</span>
          <input name="name" required maxLength={200} autoComplete="name" className={fieldCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13.5px] font-medium text-ink-2">Phone</span>
          <PhoneField
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setPhoneMissing(false);
            }}
            className={fieldCls}
          />
          {phoneMissing && <span className="mt-1.5 block text-[13px] text-[#b4231f]">Enter your phone number.</span>}
        </label>
        {company && (
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[13.5px] font-medium text-ink-2">Company name (optional)</span>
            <input name="business_name" maxLength={200} autoComplete="organization" className={fieldCls} />
          </label>
        )}
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
