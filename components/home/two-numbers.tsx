import { Reveal } from "@/components/reveal";

/* The AHA block: two numbers that matter – what you sold, and what lands in
   your bank – with the fee kept deliberately small between them so it never
   dominates. Figures are illustrative. */

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
              What you sold by card, and what lands in your bank the next
              business day. You keep almost all of it – one small, clear fee is
              the only difference.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-11 rounded-3xl border border-line bg-white px-8 py-12 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:py-14">
            <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
              {/* sold */}
              <div className="text-center">
                <div className="h-display text-[clamp(40px,4.6vw,60px)] leading-none tracking-tight text-ink">
                  €980.00
                </div>
                <div className="mt-2.5 text-[13.5px] font-semibold text-ink-2">Card sales today</div>
              </div>

              {/* small, non-dominant fee */}
              <div className="flex items-center justify-center gap-2.5 text-ink-3">
                <span className="hidden h-px w-10 bg-line-2 sm:block" />
                <span className="rounded-full bg-bg-2 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2">
                  − €9.60 fee · 0.98%
                </span>
                <span className="hidden h-px w-10 bg-line-2 sm:block" />
              </div>

              {/* in your bank */}
              <div className="text-center">
                <div className="h-display text-[clamp(40px,4.6vw,60px)] leading-none tracking-tight text-brand">
                  €970.40
                </div>
                <div className="mt-2.5 text-[13.5px] font-semibold text-brand">In your bank, next day</div>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-5 text-[13px] text-ink-3">
          Cash sales stay in your till – they never enter this. Illustrative figures.
        </p>
      </div>
    </section>
  );
}
