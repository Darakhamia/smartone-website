import Link from "next/link";

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

/* Pricing guardrail: never lead with a raw %-vs-competitor comparison.
   "from" rates are the best-band floor; the calculator on /pricing
   personalises per merchant. */
export function WhySwitch() {
  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">Why merchants switch</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
            Cheaper, safer, faster — and you keep your own bank.
          </h2>
        </div>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {triggers.map((t) => (
            <div key={t.n} className="rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
              <span className="grid size-8 place-items-center rounded-full bg-brand-tint text-[14px] font-semibold text-brand">
                {t.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {t.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
            </div>
          ))}
        </div>

        {/* pricing preview — makes "cheaper" concrete */}
        <div className="mt-14 border-t border-line-2 pt-11">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">See what you&apos;ll pay</span>
              <h3 className="h-display mt-3 text-2xl">
                One clear rate — and it drops as you grow.
              </h3>
            </div>
            <Link href="/pricing" className="btn-ghost px-6 py-2.5">
              See what you&apos;d pay →
            </Link>
          </div>
          <div className="grid max-w-185 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
              <div className="text-sm text-ink-2">Buy the device</div>
              <div className="h-display mt-2.5 text-[40px] leading-none">
                from 0.90%
              </div>
              <div className="mt-2 text-[13.5px] text-ink-3">
                + €0.02 / transaction
              </div>
              <div className="mt-4 border-t border-line pt-4 text-[13px] text-ink-2">
                One-time device · no monthly fee
              </div>
            </div>
            <div className="relative rounded-3xl bg-white p-7 shadow-[0_0_0_2px_var(--color-brand),0_20px_40px_-28px_rgba(90,25,181,0.6)]">
              <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                Most popular
              </span>
              <div className="text-sm text-ink-2">Rent the device</div>
              <div className="h-display mt-2.5 text-[40px] leading-none">
                from 0.85%
              </div>
              <div className="mt-2 text-[13.5px] text-ink-3">
                + €0.02 / transaction
              </div>
              <div className="mt-4 border-t border-line pt-4 text-[13px] text-ink-2">
                €19/mo · lower rate · upgrade anytime
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-185 text-[12.5px] leading-relaxed text-ink-3">
            Fiscal register, printer &amp; portal{" "}
            <b className="text-ink-2">included</b> · money to your own bank
            (T+1) · rate drops as you grow · rates shown for 🇲🇹 Malta — pick
            your country on{" "}
            <Link href="/pricing" className="underline decoration-line-2 underline-offset-2 hover:text-brand">
              Pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
