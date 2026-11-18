import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { promotesRegister } from "@/lib/countries";
import { tr } from "@/lib/dictionaries";

export const metadata: Metadata = { title: "Log in", robots: { index: false, follow: false } };

/* TODO: point this at the real merchant portal URL when it's live. */
export default async function LoginPage() {
  const lang = await getActiveLang();
  // Z-reports belong to the cash register: named only where it is promoted.
  const register = promotesRegister(await getActiveCountry());
  const c = tr(
    lang,
    {
      title: "Your portal is on its way.",
      description: register
        ? "The Merchant Portal login will live here – what you sold, your payouts, receipts and Z-reports, all in one place."
        : "The Merchant Portal login will live here – what you sold, your payouts and receipts, all in one place.",
    },
    {
      title: "Tu portal está en camino.",
      description: register
        ? "El acceso al Merchant Portal estará aquí: lo que vendiste, tus cobros, tickets e informes Z, todo en un solo sitio."
        : "El acceso al Merchant Portal estará aquí: lo que vendiste, tus cobros y tickets, todo en un solo sitio.",
    },
    {
      title: "Ваш портал уже на підході.",
      description: register
        ? "Тут буде вхід до Merchant Portal – що ви продали, ваші виплати, чеки та Z-звіти, усе в одному місці."
        : "Тут буде вхід до Merchant Portal – що ви продали, ваші виплати й чеки, усе в одному місці.",
    },
    {
      title: "Ваш портал уже на подходе.",
      description: register
        ? "Здесь будет вход в Merchant Portal – что вы продали, ваши выплаты, чеки и Z-отчёты, всё в одном месте."
        : "Здесь будет вход в Merchant Portal – что вы продали, ваши выплаты и чеки, всё в одном месте.",
    },
  );
  return <StubPage eyebrow="Merchant Portal" title={c.title} description={c.description} />;
}
