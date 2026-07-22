import Link from "next/link";
import { CreditCard, ReceiptText, ShoppingBag, LineChart, Calculator, Smartphone, FileSpreadsheet, Table2, ChevronRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister } from "@/lib/countries";

// order matches c.jobs: take payments, stay compliant, sell & manage, track money
const jobIcons: LucideIcon[] = [CreditCard, ReceiptText, ShoppingBag, LineChart];
// order matches c.replaceLabels: cash register, payment terminal, accountant tool, spreadsheet
const replaceIcons: LucideIcon[] = [Calculator, Smartphone, FileSpreadsheet, Table2];

export async function BreadthComponent() {
  const lang = await getActiveLang();
  const country = await getActiveCountry();
  const register = promotesRegister(country);
  const c = tr(
    lang,
    {
      eyebrow: "All-in-one device",
      titleA: "Everything your business needs –",
      titleB: "one device.",
      lead: register
        ? "Take payments, stay compliant, sell, and track your money – without a four-vendor stack."
        : "Take payments, sell, and track your money – without a multi-vendor stack.",
      replaces: "Replaces:",
      jobs: [
        { title: "Take payments", text: "Card, contactless and cash.", href: "/product/terminals" },
        { title: "Stay compliant", text: "Fiscal receipts and reports.", href: "/product/cash-register" },
        { title: "Sell & manage", text: "Products, prices and orders.", href: "/click" },
        { title: "Track your money", text: "See what you earned and what's landing in your bank.", href: "/merchant-portal" },
      ],
      replaceLabels: ["Cash register", "Payment terminal", "Accountant tool", "Spreadsheet"],
    },
    {
      eyebrow: "Equipo todo en uno",
      titleA: "Todo lo que tu negocio necesita,",
      titleB: "en un solo equipo.",
      lead: register
        ? "Cobra, cumple con la normativa, vende y controla tu dinero, sin depender de cuatro proveedores."
        : "Cobra, vende y controla tu dinero, sin depender de varios proveedores.",
      replaces: "Sustituye a:",
      jobs: [
        { title: "Cobra", text: "Tarjeta, contactless y efectivo.", href: "/product/terminals" },
        { title: "Cumple la normativa", text: "Tickets fiscales e informes.", href: "/product/cash-register" },
        { title: "Vende y gestiona", text: "Productos, precios y pedidos.", href: "/click" },
        { title: "Controla tu dinero", text: "Mira lo que ganaste y lo que llega a tu banco.", href: "/merchant-portal" },
      ],
      replaceLabels: ["Caja registradora", "Terminal de pago", "Software del contable", "Hoja de cálculo"],
    },
  );

  // The fiscal "Stay compliant" job and the "Cash register" replaced-tool are
  // shown only where the register is offered (Malta today).
  const jobs = c.jobs.map((j, i) => ({ ...j, icon: jobIcons[i] })).filter((_, i) => register || i !== 1);
  const replaceLabels = c.replaceLabels.map((label, i) => ({ label, icon: replaceIcons[i] })).filter((_, i) => register || i !== 0);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">
              {c.titleA} <span className="text-brand">{c.titleB}</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{c.lead}</p>
          </div>
        </Reveal>
        <div className={`mt-11 grid gap-4 sm:grid-cols-2 ${register ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {jobs.map((job, i) => {
            const Icon = job.icon;
            return (
              <Reveal key={job.title} delay={i * 90} className="h-full">
                <Link
                  href={job.href}
                  className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 pb-16 shadow-sm shadow-black/3 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_20px_40px_-28px_rgba(90,25,181,0.4)]"
                >
                  <span className="grid size-13 place-items-center rounded-2xl bg-brand-tint transition-colors duration-300 group-hover:bg-brand/15">
                    <Icon className="size-6.5 text-brand" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight">{job.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{job.text}</p>
                  <span className="absolute right-5 bottom-5 grid size-9 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRight className="size-3.5" strokeWidth={2.4} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-bg-2 px-7 py-5 sm:flex-row sm:items-center">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-brand uppercase">{c.replaces}</span>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-around">
              {replaceLabels.map((r, i) => {
                const Icon = r.icon;
                return (
                <div key={r.label} className="flex items-center gap-4">
                  {i > 0 && <span className="hidden h-8 w-px bg-line-2 sm:block" />}
                  <span className="flex items-center gap-2.5 text-[14.5px] font-medium text-ink-2">
                    <Icon className="size-6 text-ink" strokeWidth={1.75} aria-hidden />
                    {r.label}
                  </span>
                </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { BreadthComponent as Breadth };
