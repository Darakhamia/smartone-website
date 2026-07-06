import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TurnoverCalculator } from "@/components/pricing/turnover-calculator";

const triggers = [
  {
    title: "Every fee in plain euros",
    text: "Stop overpaying a rate you were sold but never see. Commission in euros, no hidden line items – you know exactly what you pay.",
    icon: (
      <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    ),
  },
  {
    title: "Keep your own bank",
    text: "No new account, no unfamiliar interface. Your money settles to your existing bank – through our licensed European bank. Zero switching cost.",
    icon: (
      <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />
    ),
  },
  {
    title: "Your money, next working day",
    text: "Settled T+1 – not day three or four. The cash-flow speed a small business actually needs.",
    icon: (
      <path d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    ),
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
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5.5 stroke-brand"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {t.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
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
