import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <StubPage
      eyebrow="Industries"
      title="Built for your kind of business."
      description="Vets & services, retail, cafés & HoReCa, professional services, mobile vendors – dedicated pages for each industry are coming soon."
    />
  );
}
