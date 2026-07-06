import { Reveal } from "@/components/reveal";

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
    <section className="bg-night py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow eyebrow-dark">Why no one else does this</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Two gaps your current provider won&apos;t close.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {gaps.map((g, i) => (
            <Reveal key={g.tag} delay={i * 120} className="h-full">
            <div
              className="h-full rounded-3xl border border-white/10 bg-white/4 p-8 transition-colors duration-300 hover:bg-white/6"
            >
              <span className="rounded-full bg-brand/30 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand-l uppercase">
                {g.tag}
              </span>
              <h3 className="mt-5 font-display text-[22px] font-semibold tracking-tight">
                {g.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-white/65">{g.text}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
