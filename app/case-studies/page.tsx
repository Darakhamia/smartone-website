import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Case studies" };

export default function CaseStudiesPage() {
  return (
    <StubPage
      eyebrow="Case studies"
      title="Stories from the counter."
      description="Real merchants, real numbers — no fabricated testimonials. We'll publish case studies here as soon as our first customers are ready to share theirs."
    />
  );
}
