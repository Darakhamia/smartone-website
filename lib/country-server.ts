import "server-only";
import { cookies, headers } from "next/headers";
import {
  COUNTRY_COOKIE,
  LANG_COOKIE,
  DEFAULT_COUNTRY_CODE,
  MARKET_HEADER,
  getCountry,
  isCountryCode,
  isLang,
  type Country,
  type Lang,
} from "./countries";

/* Server-side readers for the active country/language. With no country
   cookie we fall back to the default, so nothing throws if it's missing.

   A market page (/malta/*) overrides both: proxy.ts sends its market in
   MARKET_HEADER, and the page, nav and footer render as that market. */

/** The country the visitor chose (so_country), ignoring the page's market. */
export async function getSavedCountry(): Promise<Country> {
  const store = await cookies();
  const code = store.get(COUNTRY_COOKIE)?.value;
  return getCountry(isCountryCode(code) ? code : DEFAULT_COUNTRY_CODE);
}

/** The language the visitor chose, if their saved country offers it. */
export async function getSavedLang(): Promise<Lang> {
  return langFor(await getSavedCountry());
}

export async function getActiveCountry(): Promise<Country> {
  const market = (await headers()).get(MARKET_HEADER);
  if (isCountryCode(market)) return getCountry(market);
  return getSavedCountry();
}

export async function getActiveLang(): Promise<Lang> {
  return langFor(await getActiveCountry());
}

async function langFor(country: Country): Promise<Lang> {
  const raw = (await cookies()).get(LANG_COOKIE)?.value;
  // only honour a language the country actually supports
  if (isLang(raw) && country.languages.includes(raw)) return raw;
  return country.languages[0];
}
