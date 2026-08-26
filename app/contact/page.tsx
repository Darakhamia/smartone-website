import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead/lead-form";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a terminal or talk to sales. Tell us about your business and we'll get back to you within one business day.",
};

const icons = [
  <path key="0" d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  <path key="1" d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />,
  <path key="2" d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />,
];

export default async function ContactPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Get started",
      titleA: "Let's get you",
      titleB: "on the counter.",
      pointsHeading: "What you get",
      lead: "Tell us about your business. Ready to order or just have questions – either way, we'll reply within one business day.",
      points: [
        { title: "Live in ≤4 business days", text: "From this form to taking payments – including fiscal registration for your market." },
        { title: "Your exact rate, up front", text: "We'll work out your band from your volume – no effective-rate surprises." },
        { title: "Keep your own bank", text: "Payouts go to the account you already have, next business day." },
      ],
    },
    {
      eyebrow: "Empieza",
      titleA: "Vamos a ponerlo",
      titleB: "en tu mostrador.",
      pointsHeading: "Qué obtienes",
      lead: "Cuéntanos sobre tu negocio. ¿Listo para pedir o solo tienes dudas? En cualquier caso, respondemos en un día hábil.",
      points: [
        { title: "Operativo en ≤4 días hábiles", text: "De este formulario a cobrar, incluida la registración fiscal para tu mercado." },
        { title: "Tu tarifa exacta, por adelantado", text: "Calculamos tu tramo según tu volumen, sin sorpresas de tarifa efectiva." },
        { title: "Mantén tu propio banco", text: "Los pagos llegan a la cuenta que ya tienes, al día hábil siguiente." },
      ],
    },
  );

  return (
    <section className="py-16 lg:py-22">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
          <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(34px,4.4vw,52px)] leading-[1.04]">
            {c.titleA}{" "}
            <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
              {c.titleB}
            </span>
          </h1>
          <p className="anim-fade-up anim-d-2 mt-5 max-w-115 text-lg leading-relaxed text-ink-2">{c.lead}</p>
          {/* keeps the outline from jumping h1 → h3 over these three points */}
          <h2 className="sr-only">{c.pointsHeading}</h2>
          <div className="anim-fade-up anim-d-3 mt-9 space-y-5">
            {c.points.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint">
                  <svg viewBox="0 0 24 24" className="size-5.5 stroke-brand" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {icons[i]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-0.5 max-w-95 text-[14px] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
