"use client";

import { useEffect, useRef, useState } from "react";
import { useCountry } from "@/components/country/country-context";
import { Flag } from "@/components/country/flag";
import { COUNTRIES, LANG_NAMES, type Lang } from "@/lib/countries";
import { DICT } from "@/lib/dictionaries";

/* Compact region + language switcher for the nav. Region is always shown;
   the language toggle appears only for countries that offer more than one
   language (e.g. Spain → English / Español). */

export function CountrySwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const { country, lang, setCountry, setLang } = useCountry();
  const t = DICT[lang];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-brand/40 hover:text-ink"
      >
        <Flag code={country.code} className="h-3.5 w-5" />
        <span className="uppercase">{country.code}</span>
        {country.languages.length > 1 && (
          <span className="text-ink-3">· {lang.toUpperCase()}</span>
        )}
        <svg
          viewBox="0 0 16 16"
          className={`size-3.5 stroke-ink-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={`anim-fade-up absolute top-[calc(100%+8px)] z-50 w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_24px_48px_-24px_rgba(29,29,31,0.35)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold tracking-wide text-ink-3 uppercase">
            {t.nav.region}
          </p>
          {COUNTRIES.map((c) => {
            const active = c.code === country.code;
            return (
              <button
                key={c.code}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setCountry(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active ? "bg-brand-tint" : "hover:bg-bg-2"
                }`}
              >
                <Flag code={c.code} className="h-4 w-6" />
                <span className={`flex-1 text-[14px] ${active ? "font-semibold text-brand" : "text-ink-2"}`}>
                  {c.name}
                </span>
                {active && (
                  <svg viewBox="0 0 16 16" className="size-4 stroke-brand" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m3 8.5 3 3 7-7" />
                  </svg>
                )}
              </button>
            );
          })}

          {country.languages.length > 1 && (
            <>
              <div className="my-2 border-t border-line" />
              <p className="px-3 pb-1.5 text-[11px] font-semibold tracking-wide text-ink-3 uppercase">
                {t.nav.language}
              </p>
              <div className="flex gap-1.5 px-1.5 pb-1.5">
                {country.languages.map((l: Lang) => {
                  const active = l === lang;
                  return (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setOpen(false);
                      }}
                      className={`flex-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
                        active
                          ? "bg-brand text-white"
                          : "text-ink-2 shadow-[inset_0_0_0_1.5px_var(--color-line-2)] hover:text-ink"
                      }`}
                    >
                      {LANG_NAMES[l]}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
