import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Spain · Verifactu 2027" };

/* Deadline-driven lead-gen page (Segment B) – full version to come. */
export default function SpainPage() {
  return (
    <StubPage
      eyebrow="Spain · Verifactu"
      title="Ready for Verifactu 2027."
      description="SmartOne is Verifactu-ready for Spain's 2027 deadline – a certified fiscal device with card payments in one box. Talk to us and be ready ahead of time."
    />
  );
}
