import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Log in", robots: { index: false, follow: false } };

/* TODO: point this at the real merchant portal URL when it's live. */
export default async function LoginPage() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      title: "Your portal is on its way.",
      description: "The Merchant Portal login will live here – what you sold, what you'll receive, receipts and Z-reports, all in one place.",
    },
    {
      title: "Tu portal está en camino.",
      description: "El acceso al Merchant Portal estará aquí: lo que vendiste, lo que vas a recibir, tickets e informes Z, todo en un solo sitio.",
    },
    {
      title: "Ваш портал уже на підході.",
      description: "Тут буде вхід до Merchant Portal – що ви продали, що отримаєте, чеки та Z-звіти, усе в одному місці.",
    },
    {
      title: "Ваш портал уже на подходе.",
      description: "Здесь будет вход в Merchant Portal – что вы продали, что получите, чеки и Z-отчёты, всё в одном месте.",
    },
  );
  return <StubPage eyebrow="Merchant Portal" title={c.title} description={c.description} />;
}
