import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-meta-server";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await pageMetadata("spain")) };
}

/* Deadline-driven lead-gen page (Segment B) – full version to come. */
export default async function SpainPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Spain · Verifactu",
      title: "Ready for Verifactu 2027.",
      description: "SmartOne is Verifactu-ready for Spain's 2027 deadline – a fiscal device with card payments in one box. Talk to us and be ready ahead of time.",
    },
    {
      eyebrow: "España · Verifactu",
      title: "Preparado para Verifactu 2027.",
      description: "SmartOne está preparado para el plazo de Verifactu 2027 en España: un dispositivo fiscal con pagos con tarjeta en una sola caja. Habla con nosotros y adelántate.",
    },
    {
      eyebrow: "Іспанія · Verifactu",
      title: "Готовий до Verifactu 2027.",
      description: "SmartOne готовий до Verifactu ще до граничного терміну 2027 року в Іспанії – фіскальний пристрій і оплата карткою в одному корпусі. Зв’яжіться з нами та підготуйтеся заздалегідь.",
    },
    {
      eyebrow: "Испания · Verifactu",
      title: "Готов к Verifactu 2027.",
      description: "SmartOne готов к Verifactu ещё до крайнего срока 2027 года в Испании – фискальное устройство и оплата картой в одном корпусе. Свяжитесь с нами и подготовьтесь заранее.",
    },
  );
  return <StubPage eyebrow={c.eyebrow} title={c.title} description={c.description} />;
}
