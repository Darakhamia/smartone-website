import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TurnoverCalculator } from "@/components/pricing/turnover-calculator";

const triggers = [
  {
    n: "1",
    title: "Every fee in plain euros",
    text: "Stop overpaying a rate you were sold but never see. Commission in euros, no hidden line items — you know exactly what you pay.",
  },
  {
    n: "2",
    title: "Keep your own bank",
    text: "No new account, no unfamiliar interface. Your money settles to your existing bank — through our licensed European bank. Zero switching cost.",
  },
  {
    n: "3",
    title: "Your money, next working day",
    text: "Settled T+1 — not day three or four. The cash-flow speed a small business actually needs.",
  },
];

export function WhySwitch() {
  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">Why merchants switch</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Cheaper, safer, faster — and you keep your own bank.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {triggers.map((t, i) => (
            <Reveal key={t.n} delay={i * 90} className="h-full">
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-8 place-items-center rounded-full bg-brand-tint text-[14px] font-semibold text-brand">
                  {t.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* live pricing calculator — makes "cheaper" concrete */}
        <div className="mt-14 border-t border-line-2 pt-11">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="eyebrow">See what you&apos;ll pay</span>
                <h3 className="h-display mt-3 text-2xl">
                  One clear rate — and it drops as you grow.
                </h3>
              </div>
              <Link href="/pricing" className="btn-ghost px-6 py-2.5">
                Full pricing &amp; FAQ →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <TurnoverCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
