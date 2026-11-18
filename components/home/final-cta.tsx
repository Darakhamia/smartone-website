import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { GetStarted } from "@/components/home/get-started";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export async function FinalCta() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Know what you sold. Know your payout.",
      text: "Ready to start? Order your terminal today. Still have questions? Our team will walk you through it.",
      cta1: "Get a terminal →",
      cta2: "Contact sales",
    },
    {
      title: "Sabe lo que vendiste. Conoce tu cobro.",
      text: "¿Listo para empezar? Solicita tu terminal hoy. ¿Aún tienes dudas? Nuestro equipo te acompaña.",
      cta1: "Solicita tu terminal →",
      cta2: "Contactar con ventas",
    },
    {
      title: "Знайте, скільки продали. Знайте свою виплату.",
      text: "Готові почати? Замовте термінал сьогодні. Залишилися запитання? Наша команда все пояснить.",
      cta1: "Замовити термінал →",
      cta2: "Зв’язатися з нами",
    },
    {
      title: "Знайте, сколько продали. Знайте свою выплату.",
      text: "Готовы начать? Закажите терминал сегодня. Остались вопросы? Наша команда всё объяснит.",
      cta1: "Заказать терминал →",
      cta2: "Связаться с нами",
    },
  );
  /* Malta has one button, Talk to us, which opens the call-back form (Alex's
     correction, 15.10.2026: no Get started, no self-employed / Ltd choice).
     There is no second button and no "Prefer to talk?" line under it: they
     opened the same form. */
  const malta = country.code === "mt";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-d py-24 text-center text-white">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)]" />
      <Reveal>
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="h-display mx-auto max-w-175 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          <p className="mx-auto mt-4 mb-9 max-w-130 text-lg leading-relaxed text-white/80">
            {malta ? "Ready to start? Talk to us today. Still have questions? Our team will walk you through it." : c.text}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {malta ? (
              <GetStarted location="final" className="btn-light" />
            ) : (
              <>
                <Link href="/contact" className="btn-light">
                  {c.cta1}
                </Link>
                <Link href="/contact" className="btn-ghost-dark">
                  {c.cta2}
                </Link>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
