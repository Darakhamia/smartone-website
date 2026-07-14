import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { PortalPreview } from "@/components/product/portal-preview";
import { TwoNumbers, SHOW_TWO_NUMBERS } from "@/components/home/two-numbers";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { MERCHANT_PORTAL_URL } from "@/lib/links";
import type { Lang } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Merchant Portal",
  description:
    "The Merchant Portal behind every SmartOne device: track payments, follow your payouts, reprint receipts and know your numbers – one login.",
};

const featIcons = [
  <path key="0" d="M4 20V10M9 20V4M14 20v-7M19 20V8" />,
  <path key="1" d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />,
  <path key="2" d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3Zm3 5h4m-4 4h4" />,
  <path key="3" d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
];

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "Merchant Portal",
      h1a: "Your business,",
      h1b: "in numbers.",
      sub: "Everything the device does at the counter, the Merchant Portal explains online: payments, payouts, receipts and reports – one login, one clear view.",
      login: "Open the portal →",
      pricing: "See pricing",
      jobsEyebrow: "Four jobs, one login",
      jobsTitle: "The portal behind the counter.",
      jobsSub: "Tap through what merchants use it for every day.",
      featEyebrow: "Why it helps",
      featTitle: "Less admin, more certainty.",
      feats: [
        { title: "Every transaction, with status", text: "See each payment, its method and its status – confirmed to pay, in euros." },
        { title: "Payouts to your own bank", text: "Follow what's landing and when – money to your account, next business day." },
        { title: "Receipts & Z-reports", text: "Reprint or email any fiscal receipt, and close the day with a Z-report." },
        { title: "Know your numbers", text: "What you sold, what you'll receive, and every fee – nothing buried." },
      ],
      ctaTitle: "One login for the whole business.",
      ctaText: "Included with every SmartOne device.",
      get: "Get started →",
      sales: "Contact sales",
    },
    {
      eyebrow: "Merchant Portal",
      h1a: "Tu negocio,",
      h1b: "en cifras.",
      sub: "Todo lo que el dispositivo hace en el mostrador, el Merchant Portal lo explica online: pagos, liquidaciones, tickets e informes, un solo acceso y una vista clara.",
      login: "Abrir el portal →",
      pricing: "Ver precios",
      jobsEyebrow: "Cuatro tareas, un acceso",
      jobsTitle: "El portal detrás del mostrador.",
      jobsSub: "Recorre para qué lo usan los comercios cada día.",
      featEyebrow: "Por qué ayuda",
      featTitle: "Menos gestión, más certeza.",
      feats: [
        { title: "Cada operación, con su estado", text: "Ve cada pago, su método y su estado: confirmado a pagar, en euros." },
        { title: "Liquidaciones a tu propio banco", text: "Sigue qué llega y cuándo: dinero a tu cuenta, al día hábil siguiente." },
        { title: "Tickets e informes Z", text: "Reimprime o envía por email cualquier ticket fiscal y cierra el día con un informe Z." },
        { title: "Conoce tus cifras", text: "Lo que vendiste, lo que vas a recibir y cada comisión, nada oculto." },
      ],
      ctaTitle: "Un solo acceso para todo el negocio.",
      ctaText: "Incluido con cada dispositivo SmartOne.",
      get: "Empezar →",
      sales: "Contactar con ventas",
    },
  );
}

export default async function MerchantPortalPage() {
  const lang = await getActiveLang();
  const c = copyFor(lang);

  return (
    <>
      {/* 1 · hero */}
      <section className="overflow-x-clip pt-16 pb-14 lg:pt-22">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="anim-fade-up eyebrow">{c.eyebrow}</span>
            <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(36px,4.8vw,60px)] leading-[1.04]">
              {c.h1a}{" "}
              <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">{c.h1b}</span>
            </h1>
            <p className="anim-fade-up anim-d-2 mt-5 mb-8 max-w-125 text-lg leading-relaxed text-ink-2">{c.sub}</p>
            <div className="anim-fade-up anim-d-3 flex flex-wrap items-center gap-3.5">
              <a href={MERCHANT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{c.login}</a>
              <Link href="/pricing" className="btn-ghost">{c.pricing}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · portal preview (4 jobs) */}
      <section className="bg-bg-2 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.jobsEyebrow} title={c.jobsTitle} sub={c.jobsSub} />
          <Reveal>
            <PortalPreview />
          </Reveal>
        </div>
      </section>

      {/* 3 · the money (two numbers) */}
      {SHOW_TWO_NUMBERS && <TwoNumbers />}

      {/* 4 · feature grid */}
      <section className={`${SHOW_TWO_NUMBERS ? "bg-bg-2" : ""} py-24`}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow={c.featEyebrow} title={c.featTitle} />
          <div className="mt-11 grid gap-4 sm:grid-cols-2">
            {c.feats.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 100} className="h-full">
                <div className="flex h-full gap-4 rounded-3xl bg-white p-7 shadow-sm shadow-black/3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-tint">
                    <svg viewBox="0 0 24 24" className="size-6 stroke-brand" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {featIcons[i]}
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-d px-8 py-14 text-center text-white">
              <div className="pointer-events-none absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_65%)]" />
              <div className="relative">
                <h2 className="h-display mx-auto max-w-140 text-[clamp(26px,3.2vw,38px)] leading-[1.08]">{c.ctaTitle}</h2>
                <p className="mx-auto mt-3 mb-8 max-w-120 text-[16.5px] leading-relaxed text-white/80">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Link href="/contact" className="btn-light">{c.get}</Link>
                  <Link href="/contact" className="btn-ghost-dark">{c.sales}</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
