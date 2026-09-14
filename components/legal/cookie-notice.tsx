"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";
import {
  COOKIE_NOTICE_KEY,
  CONSENT_ACCEPTED,
  CONSENT_DECLINED,
  CONSENT_EVENT,
  noticeAnswered,
} from "@/lib/consent";

/* Cookie notice. The functional cookies (country, language, this answer) need
   no consent and are set regardless. The one thing that does need consent is
   first-touch attribution, which is why this asks rather than merely informs,
   and why refusing is a button rather than a matter of ignoring the banner.
   See lib/consent.ts for how the answer reaches the attribution component.

   The two buttons are deliberately identical – same shape, padding and size,
   neither filled. Consent has to be an active choice, so the button that gives
   it must not be the one the eye lands on: an accent-filled Accept beside a
   plain-text Decline is the pattern EDPB guidance and the 2023 Cookie Banner
   Taskforce report single out. For the same reason the label is "Accept" and
   not "Got it" – "got it" acknowledges that you read something, which is not
   the same as agreeing to it. */
export function CookieNotice() {
  const { lang } = useCountry();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: reveal after mount if unanswered
    if (!noticeAnswered()) setVisible(true);
  }, []);

  if (!visible) return null;

  const c = tr(
    lang,
    {
      text: "We use functional cookies to run the site and remember your country and language. With your agreement we also note which campaign or site brought you here, so we know where enquiries come from. We run no advertising or analytics trackers.",
      link: "Cookie Policy",
      accept: "Accept",
      decline: "Decline",
    },
    {
      text: "Usamos cookies funcionales para que el sitio funcione y para recordar tu país e idioma. Con tu consentimiento también anotamos qué campaña o sitio te trajo hasta aquí, para saber de dónde llegan las consultas. No usamos rastreadores de publicidad ni de analítica.",
      link: "Política de cookies",
      accept: "Aceptar",
      decline: "Rechazar",
    },
  );

  const answer = (value: string) => {
    document.cookie = `${COOKIE_NOTICE_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    if (value === CONSENT_ACCEPTED) window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <p className="flex-1 text-[13.5px] leading-relaxed text-ink-2">
          {c.text}{" "}
          <Link href="/cookies" className="font-semibold text-brand underline-offset-2 hover:underline">
            {c.link}
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center justify-end gap-2.5">
          <button onClick={() => answer(CONSENT_DECLINED)} className="btn-ghost px-6 py-2.5 text-[14px]">
            {c.decline}
          </button>
          <button onClick={() => answer(CONSENT_ACCEPTED)} className="btn-ghost px-6 py-2.5 text-[14px]">
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
