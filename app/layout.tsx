import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { LeadAttribution } from "@/components/lead/attribution";
import { CountryProvider } from "@/components/country/country-context";
import { CookieNotice } from "@/components/legal/cookie-notice";
import { HideOnWelcome } from "@/components/country/hide-on-welcome";
import { RegionGate } from "@/components/country/region-gate";
import { OrgJsonLd } from "@/components/seo/jsonld";
import { getActiveLang, getSavedCountry, getSavedLang } from "@/lib/country-server";
import { BUILD_ID } from "@/lib/build-info";
import { SITE_URL } from "@/lib/site";
import { OG_BASE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SmartOne – One device to run your business",
    template: "%s – SmartOne",
  },
  description:
    "A fiscal cash register and payment terminal in one device – plus a portal with clear fees. The rate you signed up for is the rate you pay.",
  /* No canonical here: a layout-level one is inherited by every page that
     doesn't set its own, and "/" made the whole site a duplicate of the
     homepage. Each page sets its own through pageSeo() in lib/seo.ts. These
     Open Graph defaults cover the pages that don't (404, login, welcome). */
  openGraph: OG_BASE,
  twitter: { card: "summary_large_image" },
  /* Lets anyone confirm which build is actually live:
       curl -s https://smartoneglobal.com/ | grep x-build
     Not indexable content – search engines ignore unknown meta names. */
  other: { "x-build": BUILD_ID },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // <html lang> follows the page (a market page is in its market's language);
  // the provider gets the visitor's own choice and applies the market itself.
  const lang = await getActiveLang();
  const saved = await getSavedCountry();
  const savedLang = await getSavedLang();

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <OrgJsonLd />
        <CountryProvider initialCode={saved.code} initialLang={savedLang}>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <HideOnWelcome>
            <SiteFooter />
          </HideOnWelcome>
          <LeadAttribution />
          <CookieNotice />
          <RegionGate />
        </CountryProvider>
      </body>
    </html>
  );
}
