const steps = [
  {
    n: "01",
    title: "Money & transparency",
    text: "Know what you'll receive and what you paid — in euros.",
  },
  {
    n: "02",
    title: "Reconcile the till",
    text: "Z-report & receipts in one place; reprint or email any one.",
  },
  {
    n: "03",
    title: "Find a transaction",
    text: "Search by RRN / receipt #, settle a dispute on the spot.",
  },
  {
    n: "04",
    title: "See the period",
    text: "Revenue, average check, card vs cash, top categories.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">From the counter to your accountant</span>
          <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
            Close the day. Know your real numbers.
          </h2>
        </div>
        <div className="mt-11 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="border-t-2 border-line-2 pt-5">
              <span className="font-mono text-[13px] font-semibold text-brand">
                {s.n}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
