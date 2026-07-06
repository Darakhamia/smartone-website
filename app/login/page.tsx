import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Log in" };

/* TODO: point this at the real merchant portal URL when it's live. */
export default function LoginPage() {
  return (
    <StubPage
      eyebrow="Merchant portal"
      title="Your portal is on its way."
      description="The merchant portal login will live here — what you sold, what you'll receive, receipts and Z-reports, all in one place."
    />
  );
}
