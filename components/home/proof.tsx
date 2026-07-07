import Image from "next/image";
import { Reveal } from "@/components/reveal";

/* Social proof. Photos are stock placeholders (Unsplash license) and the
   quotes are illustrative – swap both for REAL customers before public
   launch: the brand guardrail is real merchants only, no fabricated
   testimonials. Deliberately no names or faces until then. */

export const SHOW_PROOF = true;

const stories = [
  {
    img: "/proof/shop.jpg",
    alt: "Merchant in a red apron behind the counter",
    quote: "I finally see what I pay – in euros, not in fine print.",
    role: "Shop owner",
  },
  {
    img: "/proof/vet.jpg",
    alt: "A French bulldog patient at the clinic",
    quote: "One box instead of three. Even my accountant noticed.",
    role: "Vet clinic",
  },
  {
    img: "/proof/cafe.jpg",
    alt: "Barista handing a receipt to a customer at the counter",
    quote: "The money is on my account next morning. That's it.",
    role: "Café owner",
  },
];

export function Proof() {
  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">Real businesses</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Stories from the counter.
            </h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.role} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-3 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <blockquote className="flex flex-1 flex-col px-4 pt-5 pb-4">
                  <span className="font-display text-4xl leading-none text-brand" aria-hidden>
                    &ldquo;
                  </span>
                  <p className="mt-1 font-display text-[17px] leading-snug font-semibold tracking-tight text-ink">
                    {s.quote}
                  </p>
                  <figcaption className="mt-auto pt-4 text-[13px] font-medium text-ink-3">
                    {s.role}
                  </figcaption>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
