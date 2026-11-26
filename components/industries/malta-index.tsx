import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TalkToUs } from "@/components/lead/talk-to-us";
import { TradePhoto } from "@/components/industries/industry-page";
import { INDUSTRIES, INDUSTRY_SHARED } from "@/lib/industries";

/* /industries for Malta: a hero, eight tiles to the industry pages and a
   fallback block. Every word comes from lib/industries.ts. Other markets keep
   the page in app/industries/page.tsx. */
export function MaltaIndustriesIndex() {
  const S = INDUSTRY_SHARED.index;
  const hero = INDUSTRIES[0];
  return (
    <>
      {/* the first screen matches the industry pages: a trade photo (TradePhoto) */}
      <section className="pt-14 pb-14 lg:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="anim-fade-up eyebrow">{S.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">{S.h1}</h1>
            <p className="lead anim-fade-up anim-d-2 mt-5 max-w-130 text-lg leading-relaxed text-ink-2">{S.sub}</p>
          </div>
          <TradePhoto src={hero.image} alt={hero.imageAlt} />
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* the tiles are h3; without this the outline jumps h1 → h3 */}
          <h2 className="sr-only">{S.gridHeading}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-bg-2 p-3 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-tint"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                    <Image
                      src={ind.image}
                      alt={ind.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3.5 px-1.5 font-display text-[16px] font-semibold tracking-tight">{ind.cardTitle}</h3>
                  <p className="mt-0.5 mb-1.5 px-1.5 text-[13px] text-ink-3">{ind.cardLine}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-6 py-14 text-center text-white sm:px-8">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{S.fallbackH2}</h2>
                <p className="lead mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">{S.fallbackSub}</p>
                <TalkToUs location="industries-index-fallback" className="btn-light">
                  {INDUSTRY_SHARED.ctaLabel}
                </TalkToUs>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
