import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Contact" };

/* TODO: add the real sales email / phone (and later — a lead form). */
export default function ContactPage() {
  return (
    <StubPage
      eyebrow="Contact"
      title="Talk to a human."
      description="Ordering a terminal and sales contacts are being finalised — contact details will appear here shortly."
    />
  );
}
