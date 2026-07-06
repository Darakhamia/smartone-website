import { Reveal } from "@/components/reveal";

/* The AHA block: Sales ≠ Settlement, shown as TWO separate views.
   Guardrail: never blend the two into one total; "confirmed to pay",
   never "landed in your account". Figures below are illustrative. */

function ReceiptRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between font-mono text-[13px]">
      <span className="text-ink-3">{label}</span>
      <span className={accent ? "font-semibold text-brand" : "text-ink-2"}>{value}</span>
    </div>
  );
}

function ReceiptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 stroke-ink-3"
      fill="none"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />
    </svg>
  );
}

export function TwoNumbers() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">The 30-second proof</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Two numbers you can trust.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              What you sold and what you&apos;ll receive are two different
              numbers. Most providers blur them. We show both – separately, to
              the cent.
            </p>
          </div>
        </Reveal>
        <div className="relative mt-11 grid gap-4 md:grid-cols-2 md:gap-6">
          {/* connector between the receipts */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:grid">
            <span className="grid size-12 place-items-center rounded-full bg-brand text-lg text-white shadow-[0_8px_20px_-6px_rgba(90,25,181,0.6)] ring-6 ring-white">
              →
            </span>
          </div>
          <Reveal className="h-full">
          <div className="receipt-bottom h-full rounded-t-3xl border border-line bg-white p-8 pb-10 shadow-[0_20px_40px_-32px_rgba(29,29,31,0.4)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                № 1 · What you sold
              </div>
              <ReceiptIcon />
            </div>
            <div className="h-display mt-4 text-[44px] leading-none">€1,240.00</div>
            <p className="mt-2.5 text-[14.5px] text-ink-2">
              Sales for the period – the fiscal gross, straight from your
              Z-report.
            </p>
            <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
              <ReceiptRow label="Card" value="€980.00" />
              <ReceiptRow label="Cash" value="€260.00" />
              <ReceiptRow label="Receipts" value="41" />
            </div>
          </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
          <div className="receipt-bottom h-full rounded-t-3xl border border-brand/25 bg-gradient-to-b from-brand-tint/70 to-white p-8 pb-10 shadow-[0_20px_40px_-32px_rgba(90,25,181,0.5)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">
                № 2 · What you&apos;ll receive
              </div>
              <ReceiptIcon />
            </div>
            <div className="h-display mt-4 text-[44px] leading-none text-brand">
              €970.40
            </div>
            <p className="mt-2.5 text-[14.5px] text-ink-2">
              Net after commission – what processing has confirmed to pay you,
              every fee in plain euros.
            </p>
            <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
              <ReceiptRow label="Card sales" value="€980.00" />
              <ReceiptRow label="Commission" value="−€9.60" accent />
              <ReceiptRow label="Status" value="Processed" />
            </div>
          </div>
          </Reveal>
        </div>
        <p className="mt-6 text-[13px] text-ink-3">
          Two views, never blended into one total. Illustrative figures.
        </p>
      </div>
    </section>
  );
}
