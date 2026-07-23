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
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SmartOne – One device to run your business",
    template: "%s – SmartOne",
  },
  description:
    "A certified cash register and payment terminal in one device – plus a portal with clear fees. The rate you signed up for is the rate you pay.",
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const country = await getActiveCountry();
  const lang = await getActiveLang();

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <OrgJsonLd />
        <CountryProvider initialCode={country.code} initialLang={lang}>
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
