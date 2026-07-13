import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { DeviceChooser } from "@/components/product/device-chooser";
import { DayWalk } from "@/components/product/day-walk";
import { PortalPreview } from "@/components/product/portal-preview";
import { Terminal } from "@/components/product/device-visuals";

export const metadata: Metadata = {
  title: "Product",
  description:
    "One certified device – card terminal, fiscal register and receipt printer – plus the merchant portal behind it. The complete solution, not a card machine.",
};

/* ---------- small shared bits ---------- */

function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={center ? "mx-auto max-w-165 text-center" : "max-w-165"}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h-display mt-4 text-[clamp(28px,3.6vw,44px)] leading-[1.06]">{title}</h2>
        {sub && <p className={`mt-4 text-lg leading-relaxed text-ink-2 ${center ? "mx-auto max-w-135" : ""}`}>{sub}</p>}
      </div>
    </Reveal>
  );
}

const deviceFacts = [
  {
    label: "Battery lasts the shift",
    icon: <path d="M3 9h14v8H3zM17 11h3v4h-3M6 11.5v3m3-3v3m3-3v3" />,
  },
  {
    label: "SIM + Wi-Fi",
    icon: <path d="M2 9a14 14 0 0 1 20 0M5.5 12.5a9 9 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19h.01" />,
  },
  {
    label: "Receipt printer built in",
    icon: <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />,
  },
];

export default function ProductPage() {
  return (
    <>
      {/* 1 · product hero */}
      <section className="overflow-x-clip pt-16 pb-18 lg:pt-22">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="anim-fade-up eyebrow">Product</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              One certified box.{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
                The complete solution.
              </span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">
              Card terminal, fiscal register and receipt printer in one device
              – with the merchant portal behind it. Not a card machine.
            </p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <Link href="/contact" className="btn-primary">
                Get a terminal →
              </Link>
              <Link href="/pricing" className="btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
          <div className="anim-fade-up anim-d-2 relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle,rgba(90,25,181,0.12),transparent_70%)]" />
            <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] shadow-[0_48px_90px_-48px_rgba(90,25,181,0.55)]">
              <Image
                src="/hero-florist.jpg"
                alt="SmartOne terminal taking a contactless payment at a flower shop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · the device */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="The device"
            title="Two sizes. Everything built in."
            sub="Merchant facts, not a spec sheet: it prints, it lasts, it connects – wherever your counter is."
          />
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            {[
              {
                name: "SmartOne Bank Pro",
                for: "For the busy counter",
                text: "The big 6″ screen keeps a queue moving – ring up, tap, receipt out.",
                compact: false,
              },
              {
                name: "SmartOne Bank",
                for: "For the move",
                text: "Compact and light, with a 5″ screen – table service, market stalls, deliveries.",
                compact: true,
              },
            ].map((d, i) => (
              <Reveal key={d.name} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="grid h-64 place-items-center rounded-2xl bg-gradient-to-br from-brand-tint via-bg-2 to-bg-2 py-6">
                    <Terminal compact={d.compact} />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-display text-[22px] font-semibold tracking-tight">{d.name}</h3>
                    <span className="text-[12.5px] font-semibold text-brand">{d.for}</span>
                  </div>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-white px-7 py-5 shadow-sm shadow-black/3 sm:flex-row sm:items-center sm:justify-around">
              {deviceFacts.map((f) => (
                <span key={f.label} className="flex items-center gap-2.5 text-[14.5px] font-medium text-ink-2">
                  <svg viewBox="0 0 24 24" className="size-5.5 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {f.icon}
                  </svg>
                  {f.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-[13px] text-ink-3">
              SmartOne Pro S, the dual-screen model, is available where local
              law requires a customer-facing display.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 · inside the device */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="Inside the device"
            title="Two apps do the work."
            sub="No phone, no laptop, no extra box – the device works standalone."
          />
          <div className="mt-11 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-line bg-white p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                  <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
                    <path d="M2.5 10h19M6 15h4" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">Payment app</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
                  Cards, contactless and cash on one screen. The amount, the
                  tap, the confirmation – done.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-white p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                  <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight">Fiscal app</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
                  A certified fiscal register on the device: fiscal receipts,
                  Z-reports, market-by-market certification.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · which device do I need */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="Which device do I need?"
            title="Answer three questions."
            center
          />
          <Reveal delay={100}>
            <div className="mt-10">
              <DeviceChooser />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 · a day with SmartOne */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="A day with SmartOne"
            title="From the first tap to the accountant."
          />
          <Reveal>
            <DayWalk />
          </Reveal>
        </div>
      </section>

      {/* 6 · merchant portal */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="Merchant Portal"
            title="Four jobs, one login."
            sub="Everything the device does at the counter, the portal explains in numbers."
          />
          <Reveal>
            <PortalPreview />
          </Reveal>
        </div>
      </section>

      {/* 7 · cashbox story + 8 · click */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
              <span className="eyebrow">Cashbox</span>
              <h3 className="h-display mt-4 text-[26px] leading-tight">
                Start with the register alone.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                SmartOne Cashbox, the on-device fiscal register, is certified
                on its own – you can start Cashbox-only and add card payments
                later. Upgrading is a KYC/KYB check, not new hardware.
              </p>
              <div className="mt-auto pt-6">
                <div className="rounded-2xl bg-bg-2 p-4 font-mono text-[12.5px]">
                  <div className="flex justify-between text-ink-2">
                    <span>Z-report #218</span>
                    <span className="font-semibold text-ink">€1,240.00</span>
                  </div>
                  <div className="mt-1 text-[11px] text-ink-3">41 receipts · closed 19:04</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-night-2 to-night p-8 text-white">
              <div className="pointer-events-none absolute -right-10 -bottom-10 size-44 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.55),transparent_70%)]" />
              <span className="eyebrow eyebrow-dark">Click · HoReCa</span>
              <h3 className="h-display mt-4 text-[26px] leading-tight">
                Orders land on the register.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                SmartOne Click takes orders for cafés and restaurants and sends
                them straight to the register – one catalogue, one flow, no
                re-typing.
              </p>
              <div className="mt-auto pt-6">
                <div className="rounded-2xl bg-white/8 p-4 font-mono text-[12.5px] ring-1 ring-white/10">
                  <div className="flex justify-between">
                    <span className="text-white/70">Order #47 · table 3</span>
                    <span className="font-semibold text-brand-l">→ register</span>
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">2× latte · 1× croissant</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 · compliance */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead
            eyebrow="Compliance"
            title="Certified market by market."
            sub="We name what's live and what's dated – nothing else."
          />
          <div className="mx-auto mt-10 grid max-w-185 gap-4 sm:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                <span className="text-3xl">🇲🇹</span>
                <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">Malta – live today</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">
                  Certified fiscal device, merchants on the counter now.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <Link href="/es" className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                <span className="text-3xl">🇪🇸</span>
                <h3 className="mt-4 flex items-center justify-between font-display text-[20px] font-semibold tracking-tight">
                  Spain – Verifactu-ready for 2027
                  <span className="text-brand transition-transform duration-300 group-hover:translate-x-1">→</span>
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">
                  Getting ready ahead of the deadline? Start here.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 · final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">
                  One box on the counter. Everything behind it.
                </h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">
                  Live in four business days or less.
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
