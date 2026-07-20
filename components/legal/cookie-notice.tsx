"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useCountry } from "@/components/country/country-context";
import { tr } from "@/lib/dictionaries";

/* Lightweight cookie notice. We only set strictly-necessary / functional
   cookies (country, language, and this acknowledgement), so this informs
   rather than gates. If analytics or marketing cookies are added later, this
   should become a full consent banner with opt-in categories. */
const KEY = "so_cookie_notice";
const subscribe = () => () => {};
const hasAck = () => document.cookie.split("; ").some((row) => row.startsWith(`${KEY}=`));

export function CookieNotice() {
  const { lang } = useCountry();
  // On the server we report "acknowledged" so nothing renders and there's no
  // hydration mismatch; on the client we read the real cookie value.
  const acknowledged = useSyncExternalStore(subscribe, hasAck, () => true);
  const [dismissed, setDismissed] = useState(false);

  if (acknowledged || dismissed) return null;

  const c = tr(
    lang,
    {
      text: "We use only the cookies needed to run the site and remember your country and language – no tracking without your say-so.",
      link: "Cookie Policy",
      accept: "Got it",
    },
    {
      text: "Usamos solo las cookies necesarias para que el sitio funcione y para recordar tu país e idioma, sin seguimiento sin tu permiso.",
      link: "Política de cookies",
      accept: "Entendido",
    },
  );

  const accept = () => {
    document.cookie = `${KEY}=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setDismissed(true);
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
        <button onClick={accept} className="btn-primary shrink-0 px-6 py-2.5 text-[14px]">
          {c.accept}
        </button>
      </div>
    </div>
  );
}
