import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Spain · Verifactu 2027" };

/* Deadline-driven lead-gen page (Segment B) – full version to come. */
export default async function SpainPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Spain · Verifactu",
      title: "Ready for Verifactu 2027.",
      description: "SmartOne is Verifactu-ready for Spain's 2027 deadline – a certified fiscal device with card payments in one box. Talk to us and be ready ahead of time.",
    },
    {
      eyebrow: "España · Verifactu",
      title: "Preparado para Verifactu 2027.",
      description: "SmartOne está preparado para el plazo de Verifactu 2027 en España: un dispositivo fiscal certificado con pagos con tarjeta en una sola caja. Habla con nosotros y adelántate.",
    },
  );
  return <StubPage eyebrow={c.eyebrow} title={c.title} description={c.description} />;
}
