import { Reveal } from "@/components/reveal";

/* The AHA block, kept dead simple: one equation. Card sales minus one
   visible fee equals the payout. Cash is deliberately out of the story
   (one footnote) so the gap can't be misread as commission.
   Figures are illustrative. */

const parts = [
  {
    value: "€980.00",
    caption: "Card sales",
    sub: "today",
    accent: false,
  },
  {
    value: "€9.60",
    caption: "Our fee",
    sub: "0.98% · one clear fee",
    accent: true,
  },
  {
    value: "€970.40",
    caption: "In your bank",
    sub: "next business day · T+1",
    accent: false,
    result: true,
  },
];

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
              What you sold by card – and what lands in your bank the next
              business day. The only thing between them is one small fee,
              clearly shown.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-11 rounded-3xl border border-line bg-white px-8 py-12 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:py-14">
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-10">
              {parts.map((p, i) => (
                <div key={p.caption} className="contents">
                  {i > 0 && (
                    <span
                      className="h-display text-[clamp(28px,3vw,40px)] text-ink-3"
                      aria-hidden
                    >
                      {i === 1 ? "−" : "="}
                    </span>
                  )}
                  <div className="text-center">
                    <div
                      className={`h-display text-[clamp(40px,4.6vw,60px)] leading-none tracking-tight ${
                        p.result ? "text-brand" : "text-ink"
                      }`}
                    >
                      {p.value}
                    </div>
                    <div
                      className={`mt-3 inline-flex items-baseline gap-2 rounded-full px-3.5 py-1 text-[13px] ${
                        p.accent
                          ? "bg-brand-tint font-semibold text-brand"
                          : "font-semibold text-ink-2"
                      }`}
                    >
                      {p.caption}
                      <span className={p.accent ? "font-normal text-brand/70" : "font-normal text-ink-3"}>
                        {p.sub}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="mt-5 text-[13px] text-ink-3">
          Cash sales stay in your till – they never enter this equation.
          Illustrative figures.
        </p>
      </div>
    </section>
  );
}
