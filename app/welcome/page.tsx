import type { Metadata } from "next";
import { WelcomeScreen } from "@/components/country/welcome-screen";

/* Utility page – kept out of search results. Real content lives on every other
   route now (no redirect gate), so there is nothing to index here. */
export const metadata: Metadata = {
  title: "Choose your region",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return <WelcomeScreen />;
}
