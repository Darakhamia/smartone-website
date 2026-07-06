import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage() {
  return (
    <StubPage
      eyebrow="Product"
      title="One certified device. Everything inside."
      description="Terminal, fiscal register, receipt printer and the merchant portal – the full walkthrough of the SmartOne stack is coming soon."
    />
  );
}
