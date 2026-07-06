import type { Metadata } from "next";
import Link from "next/link";
import { TurnoverCalculator } from "@/components/pricing/turnover-calculator";
import { Faq } from "@/components/pricing/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One clear rate that drops as you grow. Slide to your monthly turnover and see exactly what you'd pay — every fee in plain euros.",
};

const devices = [
  {
    name: "Buy the device",
    price: "€249",
    sub: "one-time",
    meta: ["Device is yours from day one", "No monthly device fee", "Standard tier rate"],
    popular: false,
  },
  {
    name: "Rent the device",
    price: "€19",
    sub: "/ month",
    meta: ["Rate drops another 0.05 pp", "Free replacement & upgrades", "Cancel anytime"],
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-16 pb-14 lg:pt-22">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-170 text-center">
            <span className="eyebrow">Pricing</span>
            <h1 className="h-display mt-4 text-[clamp(36px,4.6vw,60px)] leading-[1.04]">
              One clear rate — and it drops as you grow.
            </h1>
            <p className="mx-auto mt-5 max-w-135 text-lg leading-relaxed text-ink-2">
              Slide to your monthly card turnover and see exactly what
              you&apos;d pay. Fiscal register, printer and portal included —
              every fee in plain euros.
            </p>
          </div>
          <div className="mt-12">
            <TurnoverCalculator />
          </div>
        </div>
      </section>

      <section className="bg-bg-2 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-165 text-center">
            <span className="eyebrow">The device</span>
            <h2 className="h-display mt-4 text-[clamp(28px,3.4vw,40px)] leading-[1.06]">
              Buy it once, or rent it — your call.
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-185 gap-4 sm:grid-cols-2">
            {devices.map((d) => (
              <div
                key={d.name}
                className={`relative rounded-3xl bg-white p-8 ${
                  d.popular
                    ? "shadow-[0_0_0_2px_var(--color-brand),0_20px_40px_-28px_rgba(90,25,181,0.6)]"
                    : "shadow-sm shadow-black/3"
                }`}
              >
                {d.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    Most popular
                  </span>
                )}
                <div className="text-sm text-ink-2">{d.name}</div>
                <div className="h-display mt-2.5 text-[40px] leading-none">
                  {d.price}
                  <span className="ml-1.5 align-middle text-[15px] font-normal tracking-normal text-ink-3">
                    {d.sub}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {d.meta.map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                      <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 stroke-brand" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 8.5 3.5 3.5L13.5 4" />
                      </svg>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-185 text-center text-[12.5px] leading-relaxed text-ink-3">
            Device prices are indicative — final pricing is confirmed at
            checkout for your country. Transaction rate applies per tier, see
            the calculator above.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Faq />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
            <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
            <div className="relative">
              <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">
                Ready to see your real rate?
              </h2>
              <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">
                Order a terminal in minutes — or ask us anything first.
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
        </div>
      </section>
    </>
  );
}
