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
    <section className="bg-paper-2 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">The three reasons merchants leave their provider</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Cheaper, safer, faster — and you keep your own bank.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {triggers.map((t) => (
            <div key={t.n} className="rounded-2xl border border-line bg-card p-6">
              <span className="grid size-8 place-items-center rounded-full bg-green-tint font-mono text-[13px] font-semibold text-green-d">
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
        <div className="mt-12 border-t border-line-2 pt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">See what you&apos;ll pay</span>
              <h3 className="h-display mt-4 text-2xl font-semibold">
                One clear rate — and it drops as you grow.
              </h3>
            </div>
            <Link href="/pricing" className="btn-ghost px-5 py-2.5">
              See what you&apos;d pay →
            </Link>
          </div>
          <div className="grid max-w-185 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card p-6">
              <div className="text-sm text-ink-2">Buy the device</div>
              <div className="h-display mt-2.5 text-[40px] leading-none">
                from 0.90%
              </div>
              <div className="mt-2 text-[13.5px] text-ink-3">
                + €0.02 / transaction
              </div>
              <div className="mt-3.5 border-t border-line pt-3.5 text-[13px] text-ink-2">
                One-time device · no monthly fee
              </div>
            </div>
            <div className="relative rounded-2xl border border-green bg-card p-6 shadow-[0_0_0_1px_var(--color-green),0_20px_40px_-28px_rgba(14,138,95,0.7)]">
              <span className="absolute -top-2.75 left-6 rounded-full bg-green px-2.5 py-0.5 font-mono text-[10.5px] font-semibold tracking-wide text-white uppercase">
                Most popular
              </span>
              <div className="text-sm text-ink-2">Rent the device</div>
              <div className="h-display mt-2.5 text-[40px] leading-none">
                from 0.85%
              </div>
              <div className="mt-2 text-[13.5px] text-ink-3">
                + €0.02 / transaction
              </div>
              <div className="mt-3.5 border-t border-line pt-3.5 text-[13px] text-ink-2">
                €19/mo · lower rate · upgrade anytime
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-185 text-[12.5px] leading-relaxed text-ink-3">
            Fiscal register, printer &amp; portal{" "}
            <b className="text-ink-2">included</b> · money to your own bank
            (T+1) · rate drops as you grow · rates shown for 🇲🇹 Malta — pick
            your country on{" "}
            <Link href="/pricing" className="underline decoration-line-2 underline-offset-2 hover:text-green-d">
              Pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
