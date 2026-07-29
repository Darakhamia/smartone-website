import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

function FeeVisual({ sale, fee, c$ }: { sale: string; fee: string; c$: string }) {
  return (
    <div className="rounded-2xl bg-bg-2 p-4 font-mono text-[13px]">
      <div className="flex items-baseline justify-between">
        <span className="text-ink-3">{sale}</span>
        <span className="text-ink-2">{c$}24.60</span>
      </div>
      <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-line-2 pt-2">
        <span className="text-ink-3">{fee}</span>
        <b className="fee-pulse -mx-1.5 inline-block rounded-md px-1.5 font-semibold text-brand">−{c$}0.24</b>
      </div>
    </div>
  );
}

function BankVisual({ bank }: { bank: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-bg-2 p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand">
        <LogoMark className="size-5.5 text-white" />
      </span>
      <span
        className="dash-line relative h-0.5 flex-1"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-line-2) 0 6px, transparent 6px 12px)" }}
      >
        <span className="dot-travel absolute -top-[3px] left-0 hidden size-2 rounded-full bg-brand motion-safe:block" />
      </span>
      <span className="flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
        <svg viewBox="0 0 24 24" className="size-4.5 stroke-ink" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />
        </svg>
        <span className="text-[12.5px] font-semibold">{bank}</span>
      </span>
    </div>
  );
}

function TplusOneVisual({ sold, paid }: { sold: string; paid: string }) {
  return (
    <div className="rounded-2xl bg-bg-2 p-4">
      <div className="flex items-center gap-2">
        <span className="size-2.5 shrink-0 rounded-full bg-ink-3" />
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-line-2">
          <span className="tline-fill absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-l to-brand" />
        </span>
        <span className="tline-dot size-2.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/20" />
      </div>
      <div className="mt-2.5 flex items-baseline justify-between font-mono text-[12px]">
        <span className="text-ink-3">{sold}</span>
        <b className="font-semibold text-brand">{paid}</b>
      </div>
    </div>
  );
}

export async function WhySwitch() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "Why merchants switch",
      title: "Cheaper, safer, faster – and you keep your own bank.",
      sale: "Sale",
      fee: "Fee",
      bank: "Your bank",
      sold: "Sold · Mon",
      paid: "Paid · Tue",
      triggers: [
        { title: "Clear fees", text: "The rate you signed up for is the rate you pay." },
        { title: "Keep your own bank", text: "Payouts land in the account you already have." },
        { title: "Your money, next business day", text: "Paid out T+1, not day three or four." },
      ],
    },
    {
      eyebrow: "Por qué los negocios se cambian",
      title: "Más barato, más seguro, más rápido, y mantienes tu propio banco.",
      sale: "Venta",
      fee: "Comisión",
      bank: "Tu banco",
      sold: "Vendido · lun",
      paid: "Pagado · mar",
      triggers: [
        { title: "Comisiones claras", text: "La tarifa que firmaste es la que pagas." },
        { title: "Mantén tu propio banco", text: "Los pagos llegan a la cuenta que ya tienes." },
        { title: "Tu dinero al día hábil siguiente", text: "Abonado en T+1, no al tercer o cuarto día." },
      ],
    },
  );

  const visuals = [
    <FeeVisual key="fee" sale={c.sale} fee={c.fee} c$={country.currencySymbol} />,
    <BankVisual key="bank" bank={c.bank} />,
    <TplusOneVisual key="t1" sold={c.sold} paid={c.paid} />,
  ];

  return (
    <section className="bg-bg-2 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
          </div>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {c.triggers.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm shadow-black/3 transition-transform duration-300 hover:-translate-y-1">
                {visuals[i]}
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
