import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { NeedsQuiz } from "@/components/product/needs-quiz";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* The "what do you need?" quiz on the homepage: a few questions that
   recommend which SmartOne products to switch on. */
export async function DeviceQuiz() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    { eyebrow: "Build your setup", title: "Which products do you need?", sub: "Answer a few questions – we'll tell you exactly what to switch on." },
    { eyebrow: "Arma tu configuración", title: "¿Qué productos necesitas?", sub: "Responde unas preguntas y te decimos exactamente qué activar." },
  );
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} center />
        <Reveal delay={100}>
          <div className="mt-10">
            <NeedsQuiz />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
