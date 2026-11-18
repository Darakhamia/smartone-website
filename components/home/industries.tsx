import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import type { Lang } from "@/lib/countries";
import { industryPagesFor, type IndustrySlug } from "@/lib/industries";

/* `slug` is the tile's page under /industries – linked only where those
   pages are served (Malta); elsewhere every tile goes to /industries. */
const imgs: { img: string; slug: IndustrySlug }[] = [
  { img: "/industries/events.jpg", slug: "events" },
  { img: "/industries/retail.jpg", slug: "retail" },
  { img: "/industries/cafes.jpg", slug: "cafes" },
  { img: "/industries/services-electrician.jpg", slug: "services" },
  { img: "/industries/mobile-courier.jpg", slug: "mobile" },
  { img: "/industries/bakery.jpg", slug: "bakery" },
  { img: "/industries/beauty-salon.jpg", slug: "beauty" },
  { img: "/industries/grocery.jpg", slug: "grocery" },
];

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "Built for your kind of business",
      title: "Solutions tailored to your industry.",
      titles: ["Festivals & events", "Retail", "Cafés & HoReCa", "Professional services", "Mobile / Street", "Bakeries", "Beauty & wellness", "Grocery"],
      more: ["…and many", "more businesses"],
      moreText: "If you take payments, SmartOne fits your counter.",
    },
    {
      eyebrow: "Hecho para tu tipo de negocio",
      title: "Soluciones a la medida de tu sector.",
      titles: ["Festivales y eventos", "Retail", "Cafeterías y HoReCa", "Servicios profesionales", "Móvil / Calle", "Panaderías", "Belleza y bienestar", "Alimentación"],
      more: ["…y muchos", "más negocios"],
      moreText: "Si aceptas pagos, SmartOne encaja en tu mostrador.",
    },
    {
      eyebrow: "Створено для такого бізнесу, як ваш",
      title: "Рішення, адаптовані до вашої галузі.",
      titles: ["Фестивалі та заходи", "Роздрібна торгівля", "Кав’ярні та HoReCa", "Професійні послуги", "Виїзна / вулична торгівля", "Пекарні", "Краса та здоров’я", "Продуктові магазини"],
      more: ["…і багато", "інших видів бізнесу"],
      moreText: "Якщо ви приймаєте оплату, SmartOne знайде місце на вашому прилавку.",
    },
    {
      eyebrow: "Создано для такого бизнеса, как ваш",
      title: "Решения, адаптированные под вашу отрасль.",
      titles: ["Фестивали и мероприятия", "Розничная торговля", "Кафе и HoReCa", "Профессиональные услуги", "Выездная / уличная торговля", "Пекарни", "Красота и здоровье", "Продуктовые магазины"],
      more: ["…и много", "других видов бизнеса"],
      moreText: "Если вы принимаете оплату, SmartOne найдёт место на вашем прилавке.",
    },
  );
}

function Cards({ lang, pages }: { lang: Lang; pages: boolean }) {
  const c = copyFor(lang);
  return (
    <>
      {imgs.map((ind, i) => (
        <Link
          key={c.titles[i]}
          href={pages ? `/industries/${ind.slug}` : "/industries"}
          className="group w-56 shrink-0 rounded-3xl bg-bg-2 p-3 transition-colors duration-300 hover:bg-brand-tint sm:w-64"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={ind.img}
              alt={c.titles[i]}
              fill
              sizes="256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="px-1.5 pt-3.5 pb-1.5 font-display text-[16px] font-semibold tracking-tight">{c.titles[i]}</h3>
        </Link>
      ))}
      <Link
        href="/contact"
        className="group flex w-56 shrink-0 flex-col justify-between rounded-3xl bg-gradient-to-br from-brand to-brand-d p-6 text-white transition-transform duration-300 sm:w-64"
      >
        <div className="font-display text-[26px] leading-snug font-semibold tracking-tight">
          {c.more[0]}
          <br />
          {c.more[1]}
        </div>
        <div>
          <p className="text-[14px] leading-relaxed text-white/75">{c.moreText}</p>
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

export async function Industries() {
  const lang = await getActiveLang();
  const pages = industryPagesFor(await getActiveCountry());
  const c = copyFor(lang);
  return (
    <section className="overflow-x-clip py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="marquee relative mt-11 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee-track flex w-max">
            <div className="flex gap-4 pr-4">
              <Cards lang={lang} pages={pages} />
            </div>
            <div className="flex gap-4 pr-4" aria-hidden>
              <Cards lang={lang} pages={pages} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
