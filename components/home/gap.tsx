import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";

const gaps = [
  {
    tag: "Durable gap",
    title: "A cash register, built in",
    text: "A certified fiscal cash register, not a card reader bolted onto your tablet – with per-market certification competitors don't have.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-4.5" />
    ),
  },
  {
    tag: "Incentive gap",
    title: "Clear fees, not fine print",
    text: "The rate you signed up for is the rate you pay. No commission hiding inside a monthly statement – competitors could show it, their margin depends on not showing it.",
    icon: (
      <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
    ),
  },
];

export function Gap() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-tint via-white to-bg-2 py-24 text-ink">
      {/* decorative background: soft brand glow + oversized logo mark */}
      <div className="pointer-events-none absolute -top-40 -left-20 size-140 rounded-full bg-[radial-gradient(circle,rgba(90,25,181,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute right-0 -bottom-24 size-120 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.1),transparent_65%)]" />
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-28 size-110 rotate-12 text-brand/[0.05]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">Why no one else does this</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Two gaps your current provider won&apos;t close.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {gaps.map((g, i) => (
            <Reveal key={g.tag} delay={i * 120} className="h-full">
            <div className="group h-full rounded-3xl border border-line bg-white p-8 shadow-sm shadow-black/3 transition-colors duration-300 hover:bg-brand-tint/50">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6 stroke-brand"
                    fill="none"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {g.icon}
                  </svg>
                </span>
                <span className="rounded-full bg-brand-tint px-3.5 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase">
                  {g.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold tracking-tight">
                {g.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-ink-2">{g.text}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
