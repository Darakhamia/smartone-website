/* Per-page SEO metadata: canonical URL, Open Graph and the Twitter card.

   Every indexable page spreads pageSeo() with its own path into its metadata,
   next to its title and description (per market, from lib/page-meta.ts):

     export async function generateMetadata(): Promise<Metadata> {
       return { ...(await pageMetadata("pricing")), ...pageSeo("/pricing") };
     }

   The path is resolved against metadataBase (SITE_URL, set in app/layout.tsx),
   so canonical and og:url come out as https://smartoneglobal.com/pricing. A
   page that leaves it out gets no canonical at all – never one pointing at the
   homepage, which is what told search engines every page was a copy of "/".

   og:title and og:description are not set here: Next fills them from the
   page's own title and description, so the share card can't drift from the
   <title>. The Twitter card inherits all three from Open Graph. */

import type { Metadata } from "next";

/* Logo and the homepage showcase device (SHOWCASE_DEVICE in lib/countries.ts)
   on a plain background – no copy, so it can't contradict any market's page.
   Rebuild it at 1200×630 if either changes. */
export const OG_IMAGE = {
  url: "/og/smartone.jpg",
  width: 1200,
  height: 630,
  alt: "SmartOne logo and payment terminal",
};

/** Open Graph fields every page shares; og:url is added per page. */
export const OG_BASE: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: "SmartOne",
  images: [OG_IMAGE],
};

export function pageSeo(path: `/${string}`): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { ...OG_BASE, url: path },
  };
}
