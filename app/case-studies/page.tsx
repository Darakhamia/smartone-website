import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* Kept out of the index until there is a story on it – an empty page saying
   we have no customers to quote is worse than no page at all. Drop the robots
   line and add the route back to app/sitemap.ts once it has content. */
export const metadata: Metadata = {
  title: "Case studies",
  robots: { index: false, follow: true },
};

export default async function CaseStudiesPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Case studies",
      title: "Stories from the counter.",
      description: "Real merchants, real numbers – no fabricated testimonials. We'll publish case studies here as soon as our first customers are ready to share theirs.",
    },
    {
      eyebrow: "Casos de éxito",
      title: "Historias desde el mostrador.",
      description: "Comercios reales, cifras reales, sin testimonios inventados. Publicaremos casos de éxito aquí en cuanto nuestros primeros clientes estén listos para compartir los suyos.",
    },
    {
      eyebrow: "Кейси клієнтів",
      title: "Історії з-за прилавка.",
      description: "Справжні підприємці, справжні цифри – жодних вигаданих відгуків. Ми опублікуємо тут кейси, щойно наші перші клієнти будуть готові поділитися своїми історіями.",
    },
    {
      eyebrow: "Кейсы клиентов",
      title: "Истории из-за прилавка.",
      description: "Настоящие предприниматели, настоящие цифры – никаких выдуманных отзывов. Мы опубликуем здесь кейсы, как только наши первые клиенты будут готовы поделиться своими историями.",
    },
  );
  return <StubPage eyebrow={c.eyebrow} title={c.title} description={c.description} />;
}
