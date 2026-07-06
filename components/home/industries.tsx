import Link from "next/link";
import { Reveal } from "@/components/reveal";

/* Persona tiles: emoji placeholders until the real photoshoot — the brief
   calls for photos of real merchants (aprons, counters), not stock art. */
const industries = [
  { em: "🐾", title: "Vets & services", note: "flagship" },
  { em: "🧑‍🍳", title: "Retail", note: "" },
  { em: "☕", title: "Cafés & HoReCa", note: "+ Click" },
  { em: "💈", title: "Professional services", note: "" },
  { em: "🚚", title: "Mobile / street", note: "" },
];

export function Industries() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">Built for your kind of business</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Solutions tailored to your industry.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 70} className="h-full">
            <Link
              href="/industries"
              className="group flex h-full flex-col rounded-3xl bg-bg-2 p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-tint"
            >
              <div className="grid min-h-28 place-items-center rounded-2xl bg-white text-4xl transition-transform duration-300 group-hover:scale-[1.03]">
                {ind.em}
              </div>
              <h3 className="mt-4 px-1 font-display text-[16px] font-semibold tracking-tight">
                {ind.title}
              </h3>
              <p className="mt-0.5 min-h-4.5 px-1 text-[12px] font-medium text-brand">
                {ind.note}
              </p>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
