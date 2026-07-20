import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { DeviceChooser } from "@/components/product/device-chooser";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* The "which device do I need?" quiz, surfaced on the homepage. Questions are
   generic for now – Malta-specific wording comes from Chris. */
export async function DeviceQuiz() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    { eyebrow: "Which device do I need?", title: "Answer two questions." },
    { eyebrow: "¿Qué dispositivo necesito?", title: "Responde dos preguntas." },
  );
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow={c.eyebrow} title={c.title} center />
        <Reveal delay={100}>
          <div className="mt-10">
            <DeviceChooser />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
