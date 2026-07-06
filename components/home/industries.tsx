import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

/* Stock photos (Unsplash license — free commercial use) as placeholders
   until the real merchant photoshoot; sources credited in the README. */
const industries = [
  {
    img: "/industries/vets.jpg",
    alt: "Vet gently examining a cat",
    title: "Vets & services",
    note: "flagship",
  },
  {
    img: "/industries/retail.jpg",
    alt: "Shop owner taking a card payment at the counter",
    title: "Retail",
    note: "",
  },
  {
    img: "/industries/cafes.jpg",
    alt: "Freshly made latte art on a café table",
    title: "Cafés & HoReCa",
    note: "+ Click",
  },
  {
    img: "/industries/services.jpg",
    alt: "Barbershop interior with classic chairs",
    title: "Professional services",
    note: "",
  },
  {
    img: "/industries/mobile.jpg",
    alt: "Food truck parked on a city street",
    title: "Mobile / street",
    note: "",
  },
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
              className="group flex h-full flex-col rounded-3xl bg-bg-2 p-3 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-tint"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={ind.img}
                  alt={ind.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 px-1.5 font-display text-[16px] font-semibold tracking-tight">
                {ind.title}
              </h3>
              <p className="mt-0.5 mb-1 min-h-4.5 px-1.5 text-[12px] font-medium text-brand">
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
