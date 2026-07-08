import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

/* Stock photos (Unsplash license – free commercial use) as placeholders
   until the real merchant photoshoot; sources credited in the README.
   The row is an infinite CSS marquee: the track holds two copies of the
   cards and slides -50%; it pauses on hover and stays static for
   prefers-reduced-motion users. */

const industries = [
  { img: "/industries/vets.jpg", alt: "Vet gently examining a cat", title: "Vets & services" },
  { img: "/industries/retail.jpg", alt: "Shop owner taking a card payment at the counter", title: "Retail" },
  { img: "/industries/cafes.jpg", alt: "Freshly made latte art on a café table", title: "Cafés & HoReCa" },
  { img: "/industries/services.jpg", alt: "Mechanic working under the hood at an auto service", title: "Professional services" },
  { img: "/industries/mobile.jpg", alt: "Food truck parked on a city street", title: "Mobile / street" },
  { img: "/industries/bakery.jpg", alt: "Fresh rustic bread loaves", title: "Bakeries" },
  { img: "/industries/beauty.jpg", alt: "Manicured nails close-up", title: "Beauty & wellness" },
  { img: "/industries/grocery.jpg", alt: "Fresh vegetables on grocery shelves", title: "Grocery" },
];

function Cards() {
  return (
    <>
      {industries.map((ind) => (
        <Link
          key={ind.title}
          href="/industries"
          className="group w-56 shrink-0 rounded-3xl bg-bg-2 p-3 transition-colors duration-300 hover:bg-brand-tint sm:w-64"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={ind.img}
              alt={ind.alt}
              fill
              sizes="256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="px-1.5 pt-3.5 pb-1.5 font-display text-[16px] font-semibold tracking-tight">
            {ind.title}
          </h3>
        </Link>
      ))}
      {/* the "many more" card closes each loop */}
      <Link
        href="/contact"
        className="group flex w-56 shrink-0 flex-col justify-between rounded-3xl bg-gradient-to-br from-brand to-brand-d p-6 text-white transition-transform duration-300 sm:w-64"
      >
        <div className="font-display text-[26px] leading-snug font-semibold tracking-tight">
          …and many
          <br />
          more businesses
        </div>
        <div>
          <p className="text-[14px] leading-relaxed text-white/75">
            If you take payments, SmartOne fits your counter.
          </p>
          <span className="mt-4 grid size-10 place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:translate-x-1">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 4 4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </>
  );
}

export function Industries() {
  return (
    <section className="overflow-x-clip py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">Built for your kind of business</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              Solutions tailored to your industry.
            </h2>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="marquee relative mt-11 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee-track flex w-max">
            <div className="flex gap-4 pr-4">
              <Cards />
            </div>
            <div className="flex gap-4 pr-4" aria-hidden>
              <Cards />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
