import "server-only";
import type { Metadata } from "next";
import { getActiveCountry, getActiveLang } from "./country-server";
import { pageMeta, type PageKey } from "./page-meta";

/** The title and description fields for a page's generateMetadata. Only those
    two fields: spread the result into the page's Metadata next to whatever
    else it sets (canonical, Open Graph, robots). */
export async function pageMetadata(page: PageKey): Promise<Pick<Metadata, "title" | "description">> {
  const [country, lang] = await Promise.all([getActiveCountry(), getActiveLang()]);
  const m = pageMeta(page, country, lang);
  return { title: { absolute: m.title }, description: m.description };
}
