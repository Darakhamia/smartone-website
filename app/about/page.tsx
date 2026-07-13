import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "About",
      title: "We think you should see every fee.",
      description: "The story of SmartOne – why we built a certified fiscal device with honest pricing – is coming soon.",
    },
    {
      eyebrow: "Nosotros",
      title: "Creemos que deberías ver cada comisión.",
      description: "La historia de SmartOne (por qué construimos un dispositivo fiscal certificado con precios honestos) llegará pronto.",
    },
  );
  return <StubPage eyebrow={c.eyebrow} title={c.title} description={c.description} />;
}
