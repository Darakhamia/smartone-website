/* The AHA block: Sales ≠ Settlement, shown as TWO separate views.
   Guardrail: never blend the two into one total; "confirmed to pay",
   never "landed in your account". Figures below are illustrative. */

function ReceiptRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between font-mono text-[13px]">
      <span className="text-ink-3">{label}</span>
      <span className={accent ? "font-semibold text-green-d" : "text-ink-2"}>{value}</span>
    </div>
  );
}

export function TwoNumbers() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">The 30-second proof</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Two numbers you can trust.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            What you sold and what you&apos;ll receive are two different
            numbers. Most providers blur them. We show both — separately, to
            the cent.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-7">
            <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
              № 1 · What you sold
            </div>
            <div className="h-display mt-3 text-[44px] leading-none">€1,240.00</div>
            <p className="mt-2 text-[14.5px] text-ink-2">
              Sales for the period — the fiscal gross, straight from your
              Z-report.
            </p>
            <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
              <ReceiptRow label="Card" value="€980.00" />
              <ReceiptRow label="Cash" value="€260.00" />
              <ReceiptRow label="Receipts" value="41" />
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-7">
            <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-3 uppercase">
              № 2 · What you&apos;ll receive
            </div>
            <div className="h-display mt-3 text-[44px] leading-none text-green-d">
              €970.40
            </div>
            <p className="mt-2 text-[14.5px] text-ink-2">
              Net after commission — what processing has confirmed to pay you,
              every fee in plain euros.
            </p>
            <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
              <ReceiptRow label="Card sales" value="€980.00" />
              <ReceiptRow label="Commission" value="−€9.60" accent />
              <ReceiptRow label="Status" value="Processed" />
            </div>
          </div>
        </div>
        <p className="mt-5 font-mono text-[12.5px] text-ink-3">
          Two views, never blended into one total. Illustrative figures.
        </p>
      </div>
    </section>
  );
}
