"use client";

import Link from "next/link";
import { useCountry } from "@/components/country/country-context";
import { Flag } from "@/components/country/flag";
import { LANG_NAMES, type Lang } from "@/lib/countries";

/* Footer region control. Country is changed by going back to the /welcome
   picker (not a dropdown); language – for countries that offer more than one
   – is toggled inline here. Styled for the dark footer. */
export function FooterRegion() {
  const { country, lang, setLang } = useCountry();

  return (
    <div className="mt-5 space-y-3">
      <Link
        href="/welcome"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[13px] font-medium text-white/75 transition-colors hover:border-white/40 hover:text-white"
      >
        <Flag code={country.code} className="h-3.5 w-5" />
        <span>{country.name}</span>
        <span className="text-white/40">· Change</span>
      </Link>

      {country.languages.length > 1 && (
        <div className="flex gap-1.5">
          {country.languages.map((l: Lang) => {
            const active = l === lang;
            return (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={active}
                className={`rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                  active
                    ? "bg-white text-brand"
                    : "text-white/65 ring-1 ring-white/20 hover:text-white"
                }`}
              >
                {LANG_NAMES[l]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
