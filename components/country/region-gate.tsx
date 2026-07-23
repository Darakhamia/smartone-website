"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { CountryPicker } from "@/components/country/country-picker";
import { COUNTRY_COOKIE, DEFAULT_COUNTRY_CODE, getCountry } from "@/lib/countries";

/* First-visit region picker, shown as a dismissable overlay instead of a
   redirect – so every page still serves real, indexable content. It appears
   only when no country cookie is set yet. Dismissing keeps the visitor on the
   default region (they can switch any time from the footer). */
export function RegionGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { enter, lang } = useCountry();
  const [show, setShow] = useState(false);
  const closeLabel = lang === "es" ? "Cerrar" : "Close";

  useEffect(() => {
    const hasCountry = document.cookie.split("; ").some((c) => c.startsWith(`${COUNTRY_COOKIE}=`));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: reveal after mount if no country chosen yet
    if (!hasCountry) setShow(true);
  }, []);

  // Dismiss = accept the default region and stop asking.
  const dismiss = useCallback(() => {
    const c = getCountry(DEFAULT_COUNTRY_CODE);
    enter(DEFAULT_COUNTRY_CODE, c.languages[0]);
    setShow(false);
  }, [enter]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, dismiss]);

  // Never over the full-screen /welcome picker.
  if (pathname === "/welcome" || !show) return null;

  // A real choice was made: re-render server components with the new cookie.
  const complete = () => {
    setShow(false);
    router.refresh();
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-night/50 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={dismiss}
    >
      <div
        className="anim-tier-in relative w-full max-w-lg rounded-3xl border border-line bg-white p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label={closeLabel}
          className="absolute -top-3 -right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <CountryPicker onComplete={complete} />
      </div>
    </div>
  );
}
