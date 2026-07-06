import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const gaps = [
  {
    tag: "Durable gap",
    title: "Fiscal core, built in",
    text: "A certified fiscal device, not a card reader bolted onto your tablet. Per-market certification competitors don't have.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />
    ),
  },
  {
    tag: "Incentive gap",
    title: "Every fee in plain euros",
    text: "The commission stops hiding inside a monthly statement. Competitors could show it – their margin depends on not showing it.",
    icon: (
      <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    ),
  },
];

export function Gap() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-white">
      {/* decorative background: brand glow + oversized logo mark */}
      <div className="pointer-events-none absolute -top-40 -left-20 size-140 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute right-0 -bottom-24 size-120 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.25),transparent_65%)]" />
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-28 size-110 rotate-12 text-white/4" />
      <div className="relative mx-auto max-w-6xl px-6">
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
            <div className="group h-full rounded-3xl border border-white/10 bg-white/4 p-8 transition-colors duration-300 hover:bg-white/6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-brand/25 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-brand/40">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6 stroke-brand-l"
                    fill="none"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {g.icon}
                  </svg>
                </span>
                <span className="rounded-full bg-brand/30 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand-l uppercase">
                  {g.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">
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
