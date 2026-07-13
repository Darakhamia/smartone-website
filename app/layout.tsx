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
    "Card terminal, fiscal register, and receipt printer in one certified device – plus a portal that shows every fee in plain euros. No hidden fees.",
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
