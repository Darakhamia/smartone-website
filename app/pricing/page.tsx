import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <StubPage
      eyebrow="Pricing"
      title="One clear rate — and it drops as you grow."
      description="Country-by-country rates and a calculator that shows your personal effective rate are coming soon. Every fee in plain euros, as always."
    />
  );
}
