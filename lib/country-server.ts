import "server-only";
import { cookies } from "next/headers";
import {
  COUNTRY_COOKIE,
  LANG_COOKIE,
  DEFAULT_COUNTRY_CODE,
  getCountry,
  isCountryCode,
  isLang,
  type Country,
  type Lang,
} from "./countries";

/* Server-side readers for the active country/language. The `proxy` gate
   guarantees a country cookie exists on normal pages; we still fall back to
   the default so nothing throws if it's missing. */

export async function getActiveCountry(): Promise<Country> {
  const store = await cookies();
  const code = store.get(COUNTRY_COOKIE)?.value;
  return getCountry(isCountryCode(code) ? code : DEFAULT_COUNTRY_CODE);
}

export async function getActiveLang(): Promise<Lang> {
  const store = await cookies();
  const country = await getActiveCountry();
  const raw = store.get(LANG_COOKIE)?.value;
  // only honour a language the active country actually supports
  if (isLang(raw) && country.languages.includes(raw)) return raw;
  return country.languages[0];
}
