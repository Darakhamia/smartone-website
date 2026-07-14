import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* Social proof. Photos are stock placeholders (Unsplash license) and the
   quotes are illustrative – swap both for REAL customers before public
   launch: the brand guardrail is real merchants only, no fabricated
   testimonials. Deliberately no names or faces until then. */

/* Hidden for now (kept, not deleted) – re-enable once we have real customer
   stories to show. The header/footer "Case studies" links are hidden too. */
export const SHOW_PROOF = false;

const imgs = [
  { img: "/proof/shop.jpg" },
  { img: "/proof/vet.jpg" },
  { img: "/proof/cafe.jpg" },
];

export async function Proof() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Real businesses",
      title: "Stories from the counter.",
      stories: [
        { alt: "Merchant in a red apron behind the counter", quote: "I finally see what I pay – in euros, not in fine print.", role: "Shop owner" },
        { alt: "A French bulldog patient at the clinic", quote: "One box instead of three. Even my accountant noticed.", role: "Vet clinic" },
        { alt: "Barista handing a receipt to a customer at the counter", quote: "The money is on my account next morning. That's it.", role: "Café owner" },
      ],
    },
    {
      eyebrow: "Negocios reales",
      title: "Historias desde el mostrador.",
      stories: [
        { alt: "Comerciante con delantal rojo tras el mostrador", quote: "Por fin veo lo que pago, en euros y no en letra pequeña.", role: "Dueña de tienda" },
        { alt: "Un bulldog francés como paciente en la clínica", quote: "Un solo equipo en lugar de tres. Hasta mi contable lo notó.", role: "Clínica veterinaria" },
        { alt: "Barista entregando un ticket a un cliente en el mostrador", quote: "El dinero está en mi cuenta a la mañana siguiente. Así de simple.", role: "Dueño de cafetería" },
      ],
    },
  );

  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {c.stories.map((s, i) => (
            <Reveal key={s.role} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-3 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={imgs[i].img} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <blockquote className="flex flex-1 flex-col px-4 pt-5 pb-4">
                  <span className="font-display text-4xl leading-none text-brand" aria-hidden>&ldquo;</span>
                  <p className="mt-1 font-display text-[17px] leading-snug font-semibold tracking-tight text-ink">{s.quote}</p>
                  <figcaption className="mt-auto pt-4 text-[13px] font-medium text-ink-3">{s.role}</figcaption>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
