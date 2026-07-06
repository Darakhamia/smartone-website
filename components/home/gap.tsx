const gaps = [
  {
    tag: "Durable gap",
    title: "Fiscal core, built in",
    text: "A certified fiscal device, not a card reader bolted onto your tablet. Per-market certification competitors don't have.",
  },
  {
    tag: "Incentive gap",
    title: "Every fee in plain euros",
    text: "The commission stops hiding inside a monthly statement. Competitors could show it — their margin depends on not showing it.",
  },
];

export function Gap() {
  return (
    <section className="bg-night py-20 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow eyebrow-dark">Why no one else does this</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Two gaps your current provider won&apos;t close.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {gaps.map((g) => (
            <div
              key={g.tag}
              className="rounded-2xl border border-white/10 bg-white/4 p-7"
            >
              <span className="rounded-full bg-green-l/15 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-green-l uppercase">
                {g.tag}
              </span>
              <h3 className="mt-4 font-display text-[22px] font-semibold tracking-tight">
                {g.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-white/60">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
