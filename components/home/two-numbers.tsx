import { Reveal } from "@/components/reveal";

/* The AHA block: Sales ≠ Settlement, told as a money flow so the
   difference is clearly "cash stays in the till + a tiny fee", not
   "the commission ate €270". Guardrail: the two numbers stay separate,
   never blended into one total. Figures are illustrative. */

function Row({ label, value, accent = false, dot }: { label: string; value: string; accent?: boolean; dot?: string }) {
  return (
    <div className="flex items-baseline justify-between font-mono text-[13px]">
      <span className="flex items-center gap-2 text-ink-3">
        {dot && <span className={`size-2 rounded-full ${dot}`} />}
        {label}
      </span>
      <span className={accent ? "font-semibold text-brand" : "text-ink-2"}>{value}</span>
    </div>
  );
}

function FlowChip({
  title,
  sub,
  tint = false,
}: {
  title: string;
  sub: string;
  tint?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        tint ? "border-brand/25 bg-brand-tint" : "border-line bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <span className="text-[13px] text-ink-3">→</span>
      </div>
      <div className={`mt-0.5 text-[12.5px] ${tint ? "font-medium text-brand" : "text-ink-2"}`}>
        {sub}
      </div>
    </div>
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
              numbers – and the gap between them is mostly your own cash, not
              our fee. We show every euro of the difference.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-11 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr_1.1fr]">
              {/* what you sold */}
              <div className="p-8">
                <div className="text-[12px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
                  № 1 · What you sold
                </div>
                <div className="h-display mt-4 text-[44px] leading-none">€1,240.00</div>
                <p className="mt-2.5 text-[14.5px] text-ink-2">
                  The fiscal gross, straight from your Z-report.
                </p>
                <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
                  <Row label="Card" value="€980.00" dot="bg-brand" />
                  <Row label="Cash" value="€260.00" dot="bg-line-2" />
                  <Row label="Receipts" value="41" />
                </div>
              </div>

              {/* the bridge: where every euro goes */}
              <div className="flex flex-col justify-center gap-3 border-y border-dashed border-line-2 bg-bg-2/60 p-6 lg:border-x lg:border-y-0">
                <FlowChip title="Cash · €260.00" sub="stays in your till" />
                <FlowChip title="Card · €980.00" sub="processed overnight" />
                <FlowChip title="Fee · −€9.60" sub="the only cost · 0.98%" tint />
              </div>

              {/* what you'll receive */}
              <div className="bg-gradient-to-b from-brand-tint/70 to-white p-8">
                <div className="text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">
                  № 2 · What you&apos;ll receive
                </div>
                <div className="h-display mt-4 text-[44px] leading-none text-brand">
                  €970.40
                </div>
                <p className="mt-2.5 text-[14.5px] text-ink-2">
                  To your own bank, next working day.
                </p>
                <div className="mt-5 space-y-2 border-t border-dashed border-line-2 pt-4">
                  <Row label="Card sales" value="€980.00" />
                  <Row label="Commission" value="−€9.60" accent />
                  <Row label="Status" value="Processed" />
                </div>
              </div>
            </div>

            {/* the punchline: the fee is the thin slice */}
            <div className="border-t border-line px-8 pt-5 pb-7">
              <div className="flex items-baseline justify-between font-mono text-[11.5px] text-ink-3">
                <span>Where your €1,240 goes</span>
                <span>
                  fee <b className="font-semibold text-brand">€9.60 · 0.8%</b>
                </span>
              </div>
              <div className="mt-2.5 flex h-3 overflow-hidden rounded-full">
                <span className="bg-line-2" style={{ width: "20.9%" }} />
                <span className="bg-brand" style={{ width: "78.3%" }} />
                <span className="min-w-[6px] bg-ink" style={{ width: "0.8%" }} />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11.5px] text-ink-2">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-line-2" /> cash in your till
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-brand" /> to your bank
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-ink" /> fee
                </span>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-5 text-[13px] text-ink-3">
          Two views, never blended into one total. Illustrative figures.
        </p>
      </div>
    </section>
  );
}
