"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  COUNTRY_COOKIE,
  LANG_COOKIE,
  getCountry,
  type Country,
  type CountryCode,
  type Lang,
} from "@/lib/countries";

type Ctx = {
  country: Country;
  lang: Lang;
  setCountry: (code: CountryCode) => void;
  setLang: (lang: Lang) => void;
};

const CountryContext = createContext<Ctx | null>(null);

const YEAR = 60 * 60 * 24 * 365;
function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${YEAR};samesite=lax`;
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
  const [code, setCode] = useState<CountryCode>(initialCode);
  const [lang, setLangState] = useState<Lang>(initialLang);

  const country = useMemo(() => getCountry(code), [code]);

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
        writeCookie(LANG_COOKIE, fallback);
        document.documentElement.lang = fallback;
      }
      router.refresh();
    },
    [lang, router],
  );

  const value = useMemo(
    () => ({ country, lang, setCountry, setLang }),
    [country, lang, setCountry, setLang],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry(): Ctx {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
