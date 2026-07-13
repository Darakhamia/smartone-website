import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Case studies" };

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
  );
  return <StubPage eyebrow={c.eyebrow} title={c.title} description={c.description} />;
}
