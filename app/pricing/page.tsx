import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TurnoverCalculator } from "@/components/pricing/turnover-calculator";
import { Faq } from "@/components/pricing/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent rates. No hidden fees. Every fee shown in euros before you sign. Slide to your monthly turnover and get your exact rate.",
};

const devices = [
  {
    name: "Buy the device",
    rate: "from 0.90%",
    rateNote: "+ €0.02 / transaction",
    price: "One-time device cost",
    sub: "no monthly fee",
    meta: ["Device is yours from day one", "Fiscal register, printer & portal included", "Rate drops as volume grows"],
    popular: false,
  },
  {
    name: "Rent the device",
    rate: "from 0.85%",
    rateNote: "+ €0.02 / transaction",
    price: "€19 / month",
    sub: "upgrade anytime",
    meta: ["Lower transaction rate", "Free replacement & upgrades", "Fiscal register, printer & portal included"],
    popular: true,
  },
];

const neverPay = [
  { label: "Inactivity fee", desc: "Quiet month? You pay nothing extra." },
  { label: "Statement fee", desc: "Your monthly statement is free." },
  { label: "PCI compliance fee", desc: "No surcharge for staying compliant." },
  { label: "“Service” surcharges", desc: "No vague line items you can’t explain." },
];

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] text-ink-2">
      <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 stroke-brand" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2.5 8.5 3.5 3.5L13.5 4" />
      </svg>
      {children}
    </li>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* 1 · hero */}
      <section className="pt-16 pb-14 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="anim-fade-up eyebrow">Pricing</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              Transparent rates.{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                No hidden fees.
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mx-auto mt-5 max-w-135 text-lg leading-relaxed text-ink-2">
              Every fee shown in euros before you sign. Slide to your monthly
              card turnover and get your exact rate – fiscal register, printer
              and portal included.
            </p>
          </div>
        </div>
      </section>

      {/* 2 · country context + 3 · gap calculator */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] text-ink-2 shadow-sm">
              <span className="text-base">🇲🇹</span>
              <span>
                Rates shown for <b className="font-semibold text-ink">Malta</b>
              </span>
              <span className="text-ink-3">·</span>
              <Link href="/contact" className="font-semibold text-brand hover:text-brand-d">
                Another country?
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <TurnoverCalculator compare />
          </Reveal>
        </div>
      </section>

      {/* 4 · plans */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-165 text-center">
            <Reveal>
              <span className="eyebrow">The device</span>
              <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,42px)] leading-[1.06]">
                Buy it once, or rent it – your call.
              </h2>
              <p className="mx-auto mt-4 max-w-135 text-lg leading-relaxed text-ink-2">
                Both include the fiscal register, receipt printer and merchant
                portal. Your rate is the best band you qualify for, and it drops
                as you grow.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-11 grid max-w-195 gap-4 sm:grid-cols-2">
            {devices.map((d, i) => (
              <Reveal key={d.name} delay={i * 100} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl bg-white p-8 ${
                    d.popular
                      ? "shadow-[0_0_0_2px_var(--color-brand),0_24px_48px_-32px_rgba(90,25,181,0.5)]"
                      : "shadow-sm shadow-black/3"
                  }`}
                >
                  {d.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                      Most popular
                    </span>
                  )}
                  <div className="text-sm font-semibold text-ink-2">{d.name}</div>
                  <div className="h-display mt-2.5 text-[40px] leading-none">
                    {d.rate}
                  </div>
                  <div className="mt-1.5 text-[13.5px] text-ink-3">{d.rateNote}</div>
                  <div className="mt-4 border-t border-line pt-4">
                    <span className="font-display text-[17px] font-semibold">{d.price}</span>
                    <span className="ml-1.5 text-[13.5px] text-ink-3">{d.sub}</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {d.meta.map((m) => (
                      <CheckRow key={m}>{m}</CheckRow>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary mt-7 self-start">
                    Get a terminal →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-6 max-w-195 text-center text-[12.5px] leading-relaxed text-ink-3">
              &ldquo;from&rdquo; = the best volume band. Fiscal register + printer +
              portal included · paid out to your own bank next business day
              (T+1). Device prices are indicative, confirmed at checkout for
              your country.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 · what you'll never pay */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-165 text-center">
            <Reveal>
              <span className="eyebrow">The honest bit</span>
              <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,42px)] leading-[1.06]">
                What you&apos;ll never pay.
              </h2>
              <p className="mx-auto mt-4 max-w-135 text-lg leading-relaxed text-ink-2">
                The line items that quietly inflate a statement elsewhere. Not
                here – contractually.
              </p>
            </Reveal>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {neverPay.map((n, i) => (
              <Reveal key={n.label} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 5l14 14M19 5 5 19" />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight line-through decoration-line-2 decoration-2">
                    {n.label}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · honest FAQ */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Faq />
        </div>
      </section>

      {/* 7 · final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">
                  Get your exact rate.
                </h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">
                  Not sure about your volume? Talk to us and we&apos;ll work it
                  out together.
                </p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">
                    Get a terminal →
                  </Link>
                  <Link href="/contact" className="btn-ghost-dark">
                    Contact sales
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
