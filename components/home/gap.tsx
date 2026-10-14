import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SeeInApp, type GapModal } from "@/components/home/gap-interactive";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";
import { promotesRegister, SHOWCASE_DEVICE, type Lang } from "@/lib/countries";

/* "Why no one else does this": each gap is a row of its own – the claim on
   one side, the product that backs it on the other. Malta has two gaps, the
   built-in register and clear fees; every other market has the fees gap
   alone, which takes the whole section with three proof points under it
   rather than sitting as one lonely card. */

const check = (
  <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" fill="none" stroke="#0e8a5f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

function copyFor(lang: Lang) {
  return tr(
    lang,
    {
      eyebrow: "Why no one else does this",
      title: "Two gaps your current provider won't close.",
      titleOne: "The gap your current provider won't close.",
      register: {
        tag: "Durable gap",
        title: "A cash register, built in",
        text: "A VAT-approved fiscal cash register, not a card reader bolted onto your tablet. Approved by Malta's tax authority (MTCA).",
        approval: "SmartOne Bank Pro ECR — approved fiscal cash register",
        approvalSource: "Government Gazette of Malta, Notice No. 46, 10 January 2025",
        closeDay: "Close the day",
        closeDayText: "Z-report in one tap – the till is reconciled.",
      },
      fees: {
        tag: "Incentive gap",
        title: "Clear fees, not fine print",
        text: "The rate you signed up for is the rate you pay. No commission hiding inside a monthly statement – competitors could show it, their margin depends on not showing it.",
        lead: "Clear fees, not fine print: the rate you signed up for is the rate you pay.",
        points: ["Your rate is published on this website", "Every fee shown on every settlement", "Payouts to your own bank, next working day"],
        frame: "Portal · Money",
        approved: "Approved",
        sale: "Card sale",
        fee: "Fee",
        receive: "You'll receive",
        example: "Example: card sales over €15,000 a month.",
      },
      deviceAlt: "The SmartOne cash-register app on the terminal",
      modal: {
        tap: "See it in the app",
        close: "Close",
        cashbox: {
          caption: "The built-in cash register: open a shift, ring up items, take the payment and print a fiscal receipt – all on the terminal.",
          alt: "The product catalogue in the SmartOne cash-register app",
        },
        portal: {
          frame: "Portal · Money",
          cardSales: "Card sales today",
          receive: "You'll receive",
          commission: "Commission",
          caption: "The rate you signed up for is the rate you pay – every fee visible in the Merchant Portal.",
        },
      } as GapModal,
    },
    {
      eyebrow: "Por qué nadie más hace esto",
      title: "Dos carencias que tu proveedor actual no va a cerrar.",
      titleOne: "La carencia que tu proveedor actual no va a cerrar.",
      register: {
        tag: "Carencia de producto",
        title: "Una caja registradora integrada",
        text: "Una caja registradora fiscal aprobada, no un lector de tarjetas pegado a tu tablet. Aprobada por la autoridad fiscal de Malta (MTCA).",
        approval: "SmartOne Bank Pro ECR — caja registradora fiscal aprobada",
        approvalSource: "Government Gazette de Malta, aviso n.º 46, 10 de enero de 2025",
        closeDay: "Cierra el día",
        closeDayText: "Informe Z con un toque: la caja queda cuadrada.",
      },
      fees: {
        tag: "Carencia de incentivos",
        title: "Comisiones claras, sin letra pequeña",
        text: "La tarifa que firmaste es la que pagas. Sin comisiones escondidas en un extracto mensual: la competencia podría mostrarlas, pero su margen depende de no hacerlo.",
        lead: "Comisiones claras, sin letra pequeña: la tarifa que firmaste es la que pagas.",
        points: ["Tu tarifa está publicada en esta web", "Cada comisión, en cada liquidación", "Cobros en tu propio banco, al siguiente día hábil"],
        frame: "Portal · Dinero",
        approved: "Aprobado",
        sale: "Venta con tarjeta",
        fee: "Comisión",
        receive: "Recibirás",
        example: "Ejemplo: ventas con tarjeta de más de 15.000 € al mes.",
      },
      deviceAlt: "La app de caja registradora de SmartOne en el terminal",
      modal: {
        tap: "Verlo en la app",
        close: "Cerrar",
        cashbox: {
          caption: "La caja registradora integrada: abre turno, cobra artículos, acepta el pago e imprime un ticket fiscal, todo en el terminal.",
          alt: "El catálogo de productos en la app de caja registradora de SmartOne",
        },
        portal: {
          frame: "Portal · Dinero",
          cardSales: "Ventas con tarjeta hoy",
          receive: "Recibirás",
          commission: "Comisión",
          caption: "La tarifa que firmaste es la que pagas: cada comisión visible en el Merchant Portal.",
        },
      } as GapModal,
    },
  );
}

type Copy = ReturnType<typeof copyFor>;

function Tag({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[13px] font-semibold text-brand">{n}</span>
      <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.06em] text-brand uppercase">{label}</span>
    </div>
  );
}

/* The register on its own terminal – the app runs there, not on a phone –
   with the two things it hands over: the fiscal receipt and the Z-report. */
function RegisterVisual({ c, c$ }: { c: Copy; c$: string }) {
  return (
    <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-tint to-[#ebe1fb] sm:h-[400px]">
      <div className="absolute -bottom-10 left-1/2 size-[320px] -translate-x-1/2 sm:-bottom-12 sm:left-[2%] sm:size-[440px] sm:translate-x-0">
        <Image src={SHOWCASE_DEVICE} alt={c.deviceAlt} fill sizes="(max-width: 640px) 320px, 440px" className="object-contain drop-shadow-[0_30px_36px_rgba(42,12,92,0.4)]" />
      </div>
      <div aria-hidden className="absolute top-10 right-[6%] hidden w-[196px] rounded-[14px] bg-white px-4 py-3.5 font-mono text-[11.5px] text-ink-2 shadow-[0_18px_40px_-20px_rgba(42,12,92,0.5)] sm:block">
        <div className="text-[10.5px] font-semibold tracking-[0.08em] text-ink">FISCAL RECEIPT #0421</div>
        <div className="my-2 border-t border-dashed border-line-2" />
        <div className="flex justify-between"><span>Sale</span><span className="text-ink">{c$}24.60</span></div>
        <div className="mt-1 flex justify-between"><span>Paid</span><span className="text-ink">Card</span></div>
        <div className="mt-2 text-[10px] tracking-[0.06em] text-ink-3">VAT · Z-REPORT · T+1</div>
      </div>
      <div aria-hidden className="absolute right-[6%] bottom-11 hidden w-[220px] rounded-2xl bg-white px-4 py-3.5 shadow-[0_18px_40px_-20px_rgba(42,12,92,0.5)] sm:block">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[10px] bg-brand-tint text-brand">
            <svg viewBox="0 0 24 24" className="size-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Zm3 5h6M9 11h6m-6 4h4" /></svg>
          </span>
          <span className="text-[13.5px] font-semibold">{c.register.closeDay}</span>
        </div>
        <div className="mt-2 text-[12.5px] leading-snug text-ink-2">{c.register.closeDayText}</div>
      </div>
    </div>
  );
}

/* The fees gap: a real transaction log behind, and on top the one line that
   matters – the sale, the fee taken from it, what reaches the merchant. Where
   the section has room (one gap, no register row) the terminal joins it. */
function FeesVisual({ c, c$, withDevice, example }: { c: Copy; c$: string; withDevice: boolean; example: boolean }) {
  return (
    <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-bg-2 sm:h-[400px] lg:h-[460px]">
      <Image
        src="/portal/transactions.webp"
        alt=""
        width={1920}
        height={1200}
        sizes="760px"
        className="absolute top-10 left-10 w-[760px] max-w-none rounded-[14px] opacity-55 ring-1 ring-line"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-2/20 to-bg-2/90 to-60%" />
      {withDevice && (
        <div className="absolute -bottom-10 -left-5 hidden size-[300px] sm:block">
          <Image src={SHOWCASE_DEVICE} alt="" fill sizes="300px" className="object-contain drop-shadow-[0_26px_30px_rgba(17,17,20,0.3)]" />
        </div>
      )}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white px-5.5 py-5 shadow-[0_30px_60px_-30px_rgba(17,17,20,0.45),0_0_0_1px_rgba(17,17,20,0.05)] sm:right-[7%] sm:left-auto sm:w-[300px] sm:translate-x-0"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase">{c.fees.frame}</span>
          <span className="rounded-full bg-[#e6f4ee] px-2 py-0.5 text-[11px] font-semibold text-[#0e6b4a]">{c.fees.approved}</span>
        </div>
        <div className="mt-3.5 font-mono text-[13.5px]">
          <div className="flex justify-between text-ink-2"><span>{c.fees.sale}</span><span className="text-ink">{c$}24.60</span></div>
          <div className="mt-2 flex justify-between border-t border-dashed border-line-2 pt-2 text-ink-2">
            <span>{c.fees.fee}</span>
            <span className="rounded-md bg-brand-tint px-1.5 font-semibold text-brand">−{c$}0.24</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-line pt-2 font-semibold"><span>{c.fees.receive}</span><span>{c$}24.36</span></div>
        </div>
        {example && <div className="mt-3 text-[12px] text-ink-3">{c.fees.example}</div>}
      </div>
    </div>
  );
}

export async function Gap() {
  const lang = await getActiveLang();
  const country = await getActiveCountry();
  const register = promotesRegister(country);
  const c$ = country.currencySymbol;
  const c = copyFor(lang);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#fbf9fe] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {register ? (
          <>
            <Reveal>
              <div className="max-w-170">
                <span className="eyebrow">{c.eyebrow}</span>
                <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                  <Tag n="01" label={c.register.tag} />
                  <h3 className="h-display mt-4 text-[clamp(26px,2.6vw,32px)] leading-[1.12]">{c.register.title}</h3>
                  <p className="lead mt-3.5 text-[17px] leading-relaxed text-ink-2">{c.register.text}</p>
                  <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e6f4ee] text-[#0e6b4a]">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4.5" /></svg>
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-semibold">{c.register.approval}</span>
                      <span className="block text-[12.5px] text-ink-3">{c.register.approvalSource}</span>
                    </span>
                  </div>
                  <SeeInApp kind="cashbox" modal={c.modal} />
                </div>
                <RegisterVisual c={c} c$={c$} />
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-20 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                <div className="lg:order-2">
                  <Tag n="02" label={c.fees.tag} />
                  <h3 className="h-display mt-4 text-[clamp(26px,2.6vw,32px)] leading-[1.12]">{c.fees.title}</h3>
                  <p className="lead mt-3.5 text-[17px] leading-relaxed text-ink-2">{c.fees.text}</p>
                  <SeeInApp kind="portal" modal={c.modal} />
                </div>
                <div className="lg:order-1">
                  <FeesVisual c={c} c$={c$} withDevice={false} example />
                </div>
              </div>
            </Reveal>
          </>
        ) : (
          <Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <span className="eyebrow">{c.eyebrow}</span>
                <h2 className="h-display mt-4 text-[clamp(30px,4vw,46px)] leading-[1.06]">{c.titleOne}</h2>
                <p className="lead mt-5 text-[18px] leading-relaxed text-ink-2">{c.fees.lead}</p>
                <ul className="mt-6 space-y-2.5 text-[15px] font-medium">
                  {c.fees.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">{check}{p}</li>
                  ))}
                </ul>
                <SeeInApp kind="portal" modal={c.modal} />
              </div>
              <FeesVisual c={c} c$={c$} withDevice example={false} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
