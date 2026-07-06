import Link from "next/link";

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
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">Built for your kind of business</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Solutions tailored to your industry.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((ind) => (
            <Link
              key={ind.title}
              href="/industries"
              className="group rounded-2xl border border-line bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-green/40"
            >
              <div className="grid min-h-28 place-items-center rounded-xl border border-line bg-gradient-to-br from-green-tint to-amber-tint text-4xl">
                {ind.em}
              </div>
              <h3 className="mt-4 font-display text-[16px] font-semibold tracking-tight">
                {ind.title}
              </h3>
              <p className="mt-0.5 min-h-4.5 font-mono text-[11.5px] text-ink-3">
                {ind.note}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
