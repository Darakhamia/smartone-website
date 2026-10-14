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
      title: "Know what you sold. Know what you'll receive.",
      text: "Ready to start? Order your terminal today. Still have questions? Our team will walk you through it.",
      cta1: "Get a terminal →",
      cta2: "Contact sales",
    },
    {
      title: "Sabe lo que vendiste. Sabe lo que vas a recibir.",
      text: "¿Listo para empezar? Solicita tu terminal hoy. ¿Aún tienes dudas? Nuestro equipo te acompaña.",
      cta1: "Solicita tu terminal →",
      cta2: "Contactar con ventas",
    },
  );
  /* Malta follows the homepage task (§13): accounts are created online, so
     the main button is Get started (the self-employed / Ltd choice) and the
     second is Talk to us.
     TODO(crm): "Prefer to talk?" should open the Talk to us call-back form;
     until the CRM is chosen it leads to /contact, like Talk to us itself. */
  const malta = country.code === "mt";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-d py-24 text-center text-white">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)]" />
      <Reveal>
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="h-display mx-auto max-w-175 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          <p className="mx-auto mt-4 mb-9 max-w-130 text-lg leading-relaxed text-white/80">
            {malta ? "Ready to start? Create your account today. Still have questions? Our team will walk you through it." : c.text}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {malta ? (
              <>
                <GetStarted location="final" className="btn-light" />
                <Link href="/contact" data-track="cta-talk-to-us" data-location="final" className="btn-ghost-dark">
                  Talk to us
                </Link>
              </>
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
          {malta && (
            <p className="mt-6 text-[14.5px] text-white/75">
              <Link href="/contact" className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white">
                Prefer to talk? Leave your name and number and we&apos;ll call you.
              </Link>
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
