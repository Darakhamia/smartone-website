/* Social-proof block. Guardrail from the brief: REAL customers only – no
   fabricated testimonials or numbers (a fake face kills the transparency
   position). Keep SHOW_PROOF = false until real cases / a photoshoot exist,
   then replace the placeholders with real photos, quotes and names. */

export const SHOW_PROOF = false;

const placeholders = [
  { em: "🧑‍🍳", label: "Retail merchant – photo + quote" },
  { em: "🐾", label: "Vet clinic owner – photo + quote" },
  { em: "☕", label: "Café owner – photo + quote" },
];

export function Proof() {
  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-165">
          <span className="eyebrow">Real businesses</span>
          <h2 className="h-display mt-5 text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold">
            Stories from the counter.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {placeholders.map((p) => (
            <div key={p.label} className="rounded-2xl border border-line bg-card p-4">
              <div className="grid min-h-38 place-items-center rounded-xl border border-dashed border-line-2 bg-gradient-to-br from-brand-tint to-white p-4 text-center">
                <div>
                  <span className="block text-3xl">{p.em}</span>
                  <span className="mt-2 block font-mono text-[11px] leading-relaxed text-ink-2">
                    {p.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
