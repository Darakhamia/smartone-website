import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TalkToUs } from "@/components/lead/talk-to-us";
import { INDUSTRIES, INDUSTRY_SHARED as S, industryFaq, type Industry } from "@/lib/industries";

/* One Malta industry page (/industries/<slug>). Layout per Nadya's prototype
   of 12.11.2026; every word comes from lib/industries.ts. */
export function IndustryPage({ ind }: { ind: Industry }) {
  const others = INDUSTRIES.filter((o) => o.slug !== ind.slug);
  const faq = industryFaq(ind);
  return (
    <>
      <FaqJsonLd items={faq} />

      {/* 1 · first screen */}
      <section className="pt-14 pb-16 lg:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="anim-fade-up eyebrow">{ind.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(34px,4.6vw,56px)] leading-[1.05]">{ind.h1}</h1>
            <p className="lead anim-fade-up anim-d-2 mt-5 max-w-130 text-[17px] leading-relaxed text-ink-2 sm:text-lg">{ind.sub}</p>
            <div className="anim-fade-up anim-d-2 mt-8">
              <TalkToUs location={`industry-${ind.slug}-hero`} className="btn-primary">
                {S.ctaLabel}
              </TalkToUs>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-3">{S.ctaNote}</p>
            </div>
            <ul className="mt-8 space-y-2.5">
              {S.proof.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px] text-ink-2">
                  <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-brand-tint">
                    <Check className="size-3.5 text-brand" strokeWidth={2.5} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,rgba(90,25,181,0.1),transparent_70%)]" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-48px_rgba(90,25,181,0.5)]">
              <Image src={ind.image} alt={ind.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · made for */}
      <section className="pb-14">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-6">
          <h2 className="text-[13px] font-semibold tracking-[0.08em] text-ink-3 uppercase">{S.chipsLabel}</h2>
          <ul className="flex flex-wrap gap-2">
            {ind.chips.map((c) => (
              <li key={c} className="rounded-full bg-bg-2 px-3.5 py-1.5 text-[14px] text-ink-2">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · what it does in your day */}
      <section className="bg-bg-2 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="h-display text-[clamp(28px,3.4vw,40px)] leading-[1.08]">{S.momentsHeading}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ind.moments.map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-3xl bg-white p-7">
                  <span className="eyebrow">{m.when}</span>
                  <h3 className="mt-3 font-display text-[19px] font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · one big fact */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <figure className="grid items-center gap-6 rounded-[32px] bg-brand-tint p-8 sm:p-12 md:grid-cols-[auto_1fr] md:gap-12">
              <div className="h-display text-[clamp(52px,8vw,96px)] leading-none text-brand">{ind.fact.big}</div>
              <div>
                <p className="lead max-w-140 text-[18px] leading-relaxed text-ink sm:text-[20px]">{ind.fact.text}</p>
                {ind.fact.source && (
                  <figcaption className="mt-3 text-[13px] text-ink-3">
                    {S.factSourceLabel}: {ind.fact.source}
                  </figcaption>
                )}
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 5 · price */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <span className="eyebrow">{S.price.eyebrow}</span>
          <h2 className="h-display mt-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08]">{S.price.heading}</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            {S.price.items.map((p) => (
              <div key={p.label} className="rounded-3xl border border-line bg-white p-7">
                <dt className="text-[14px] font-semibold text-ink-3">{p.label}</dt>
                <dd className="mt-2">
                  <span className="block font-display text-[26px] font-semibold tracking-tight">{p.value}</span>
                  {p.note && <span className="mt-1.5 block text-[14px] leading-relaxed text-ink-2">{p.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-160 text-[14.5px] leading-relaxed text-ink-2">{S.price.foot}</p>
          <Link href={S.price.linkHref} className="mt-4 inline-block text-[15px] font-semibold text-brand hover:text-brand-d">
            {S.price.linkLabel}
          </Link>
        </div>
      </section>

      {/* 6 · quick answers */}
      <section className="bg-bg-2 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="h-display text-[clamp(28px,3.4vw,40px)] leading-[1.08]">{S.faqHeading}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faq.map((f) => (
              <div key={f.q} className="rounded-3xl bg-white p-7">
                <h3 className="font-display text-[18px] font-semibold tracking-tight">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
          {/* 7 · what stays with you */}
          <p className="mt-8 text-[15px] leading-relaxed text-ink-2">
            <b className="font-semibold text-ink">{S.staysLabel}:</b> {ind.stays}
          </p>
        </div>
      </section>

      {/* 8 · final */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-6 py-14 text-center text-white sm:px-8">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{ind.finalH2}</h2>
                <p className="lead mx-auto mt-3 mb-8 max-w-130 text-[16.5px] leading-relaxed text-white/80">{S.finalSub}</p>
                <TalkToUs location={`industry-${ind.slug}-final`} className="btn-light">
                  {S.ctaLabel}
                </TalkToUs>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 · other industries */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-[20px] font-semibold tracking-tight">{S.othersLabel}</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/industries/${o.slug}`}
                  className="inline-block rounded-full px-4 py-2 text-[14.5px] text-ink shadow-[inset_0_0_0_1.5px_var(--color-line-2)] transition-colors hover:text-brand hover:shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
                >
                  {o.cardTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* FAQPage markup for "Quick answers" – built from the same list the page
   shows, so the structured data always matches the visible text. */
function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
