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
import { HideOnWelcome } from "@/components/country/hide-on-welcome";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";

export const metadata: Metadata = {
  title: {
    default: "SmartOne – One device to run your business",
    template: "%s – SmartOne",
  },
  description:
    "A certified cash register with card payments and a receipt printer in one device – plus a portal with clear fees. The rate you signed up for is the rate you pay.",
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
        <CountryProvider initialCode={country.code} initialLang={lang}>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <HideOnWelcome>
            <SiteFooter />
          </HideOnWelcome>
          <LeadAttribution />
        </CountryProvider>
      </body>
    </html>
  );
}
