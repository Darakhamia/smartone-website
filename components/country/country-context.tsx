"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  COUNTRY_COOKIE,
  LANG_COOKIE,
  PREF_COOKIE_MAX_AGE,
  getCountry,
  marketForPath,
  type Country,
  type CountryCode,
  type Lang,
} from "@/lib/countries";

type Ctx = {
  country: Country;
  lang: Lang;
  setCountry: (code: CountryCode) => void;
  setLang: (lang: Lang) => void;
  /* Set country (+ language, if one was chosen) without a refresh – used by
     the country picker right before it navigates into the site. */
  enter: (code: CountryCode, lang?: Lang) => void;
};

const CountryContext = createContext<Ctx | null>(null);

/* so_country and so_lang are written only when the visitor makes that choice,
   as /cookies says – a language that merely follows from the country is left
   to the server's fallback (getActiveLang) rather than stored. */
function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${PREF_COOKIE_MAX_AGE};samesite=lax`;
}

export function CountryProvider({
  initialCode,
  initialLang,
  children,
}: {
  initialCode: CountryCode;
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [code, setCode] = useState<CountryCode>(initialCode);
  const [lang, setLangState] = useState<Lang>(initialLang);

  /* `code` and `lang` are the visitor's choice. A market page (/malta/*)
     shows its market instead, in a language that market offers, and leaves
     the choice as it was for the rest of the site (lib/countries.ts). */
  const market = marketForPath(pathname);
  const country = useMemo(() => getCountry(market ?? code), [market, code]);
  const shownLang: Lang = country.languages.includes(lang) ? lang : country.languages[0];

  /* The footer is a server component in the root layout, which a client-side
     navigation doesn't re-render. Crossing into or out of a market page
     changes the country it should show (and <html lang>), so fetch the layout
     again then. */
  const lastMarket = useRef(market);
  useEffect(() => {
    if (lastMarket.current === market) return;
    lastMarket.current = market;
    router.refresh();
  }, [market, router]);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      writeCookie(LANG_COOKIE, next);
      document.documentElement.lang = next;
      router.refresh();
    },
    [router],
  );

  const setCountry = useCallback(
    (next: CountryCode) => {
      setCode(next);
      writeCookie(COUNTRY_COOKIE, next);
      // If the new country doesn't offer the current language, fall back to
      // its default so we never show an unsupported locale.
      const nextCountry = getCountry(next);
      if (!nextCountry.languages.includes(lang)) {
        const fallback = nextCountry.languages[0];
        setLangState(fallback);
        document.documentElement.lang = fallback;
      }
      router.refresh();
    },
    [lang, router],
  );

  const enter = useCallback((code: CountryCode, nextLang?: Lang) => {
    setCode(code);
    writeCookie(COUNTRY_COOKIE, code);
    const c = getCountry(code);
    const chosen = nextLang && c.languages.includes(nextLang) ? nextLang : null;
    const finalLang = chosen ?? c.languages[0];
    setLangState(finalLang);
    if (chosen) writeCookie(LANG_COOKIE, chosen);
    document.documentElement.lang = finalLang;
  }, []);

  const value = useMemo(
    () => ({ country, lang: shownLang, setCountry, setLang, enter }),
    [country, shownLang, setCountry, setLang, enter],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): Ctx {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
