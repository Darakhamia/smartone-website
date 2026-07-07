import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { TurnoverCalculator } from "@/components/pricing/turnover-calculator";

/* Three switch triggers, visual-first: a mini receipt, a settle-to-your-bank
   flow, and a T+1 timeline – one line of copy each. */

function FeeVisual() {
  return (
    <div className="rounded-2xl bg-bg-2 p-4 font-mono text-[13px]">
      <div className="flex items-baseline justify-between">
        <span className="text-ink-3">Sale</span>
        <span className="text-ink-2">€24.60</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-line-2 pt-2">
        <span className="text-ink-3">Fee</span>
        <b className="font-semibold text-brand">−€0.24</b>
      </div>
    </div>
  );
}

function BankVisual() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-bg-2 p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand">
        <LogoMark className="size-5.5 text-white" />
      </span>
      <span className="relative flex-1 border-t-2 border-dashed border-line-2">
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[13px] text-ink-3 bg-bg-2 px-1.5 leading-none">
          →
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
        <svg viewBox="0 0 24 24" className="size-4.5 stroke-ink" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />
        </svg>
        <span className="text-[12.5px] font-semibold">Your bank</span>
      </span>
    </div>
  );
}

function TplusOneVisual() {
  return (
    <div className="rounded-2xl bg-bg-2 p-4">
      <div className="flex items-center gap-2">
        <span className="size-2.5 shrink-0 rounded-full bg-ink-3" />
        <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-line-2 to-brand" />
        <span className="size-2.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/20" />
      </div>
      <div className="mt-2.5 flex items-baseline justify-between font-mono text-[12px]">
        <span className="text-ink-3">Sold · Mon</span>
        <b className="font-semibold text-brand">Paid · Tue</b>
      </div>
    </div>
  );
}

const triggers = [
  {
    title: "Every fee in plain euros",
    text: "Commission in euros, not in fine print.",
    visual: <FeeVisual />,
  },
  {
    title: "Keep your own bank",
    text: "Money settles to the account you already have.",
    visual: <BankVisual />,
  },
  {
    title: "Your money, next working day",
    text: "Settled T+1, not day three or four.",
    visual: <TplusOneVisual />,
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
              Cheaper, safer, faster – and you keep your own bank.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {triggers.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                {t.visual}
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* live pricing calculator – makes "cheaper" concrete */}
        <div className="mt-10 border-t border-line-2 pt-10">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="eyebrow">See what you&apos;ll pay</span>
                <h3 className="h-display mt-3 text-2xl">
                  One clear rate – and it drops as you grow.
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
