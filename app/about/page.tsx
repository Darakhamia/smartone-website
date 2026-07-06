import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <StubPage
      eyebrow="About"
      title="We think you should see every fee."
      description="The story of SmartOne – why we built a certified fiscal device with honest pricing – is coming soon."
    />
  );
}
