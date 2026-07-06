"use client";

import Link from "next/link";
import { useState } from "react";

/* FAQ accordion adapted from the 21st.dev "FAQ Accordion" pattern –
   reimplemented on CSS grid-rows transitions, no animation libraries. */

const faqs = [
  {
    q: "What's included in the price?",
    a: "Everything: the certified device with card terminal, fiscal register and receipt printer, plus the merchant portal. No separate software subscription, no per-feature charges.",
  },
  {
    q: "Do I need to open a new bank account?",
    a: "No. Your money settles to the bank account you already have – we work through our licensed European bank, so there's no new interface to learn and zero switching cost.",
  },
  {
    q: "When do I get my money?",
    a: "Next working day (T+1). The portal shows exactly what processing has confirmed to pay you – net of commission, in plain euros.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Your commission is shown in euros on every settlement in the portal. No setup fees, no monthly minimums, no surprise line items in a PDF statement.",
  },
  {
    q: "How fast can I start taking payments?",
    a: "Four working days or less from signing up to going live – including fiscal registration of the device for your market.",
  },
  {
    q: "My turnover is above €10,000 a month – what rate do I get?",
    a: "A personal one. Above €10,000 we price individually, and the rate only drops as you grow. Contact sales and you'll have an offer within one working day.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="eyebrow">FAQ</span>
        <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,40px)] leading-[1.06]">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-4 max-w-130 text-[16px] leading-relaxed text-ink-2">
          Have a question we haven&apos;t answered?{" "}
          <Link href="/contact" className="font-semibold text-brand hover:text-brand-d">
            Talk to us
          </Link>
          .
        </p>
      </div>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border bg-white transition-colors duration-200 ${isOpen ? "border-brand/40" : "border-line hover:border-line-2"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-[16px] font-semibold tracking-tight">
                  {f.q}
                </span>
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full bg-bg-2 text-ink-2 transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-tint text-brand" : ""}`}
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-ink-2">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
