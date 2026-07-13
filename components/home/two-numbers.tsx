import { Reveal } from "@/components/reveal";
import { getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* The AHA block: two numbers that matter – what you sold, and what lands in
   your bank – with the fee kept deliberately small between them so it never
   dominates. Figures are illustrative. */

export async function TwoNumbers() {
  const lang = await getActiveLang();
  const c = tr(
    lang,
    {
      eyebrow: "The 30-second proof",
      title: "Two numbers you can trust.",
      lead: "What you sold by card, and what lands in your bank the next business day. You keep almost all of it – one small, clear fee is the only difference.",
      sold: "Card sales today",
      fee: "− €9.60 fee · 0.98%",
      bank: "In your bank, next day",
      note: "Cash sales stay in your till – they never enter this. Illustrative figures.",
    },
    {
      eyebrow: "La prueba de 30 segundos",
      title: "Dos cifras en las que puedes confiar.",
      lead: "Lo que vendiste con tarjeta y lo que llega a tu banco al día hábil siguiente. Te quedas con casi todo: una única comisión clara es la diferencia.",
      sold: "Ventas con tarjeta hoy",
      fee: "− €9.60 comisión · 0,98%",
      bank: "En tu banco, al día siguiente",
      note: "Las ventas en efectivo se quedan en tu caja, no entran aquí. Cifras ilustrativas.",
    },
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-165">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h-display mt-4 text-[clamp(30px,4vw,48px)] leading-[1.06]">{c.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">{c.lead}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-11 rounded-3xl border border-line bg-white px-8 py-12 shadow-[0_24px_48px_-36px_rgba(29,29,31,0.4)] sm:py-14">
            <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
              <div className="text-center">
                <div className="h-display text-[clamp(40px,4.6vw,60px)] leading-none tracking-tight text-ink">€980.00</div>
                <div className="mt-2.5 text-[13.5px] font-semibold text-ink-2">{c.sold}</div>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-ink-3">
                <span className="hidden h-px w-10 bg-line-2 sm:block" />
                <span className="rounded-full bg-bg-2 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-2">{c.fee}</span>
                <span className="hidden h-px w-10 bg-line-2 sm:block" />
              </div>
              <div className="text-center">
                <div className="h-display text-[clamp(40px,4.6vw,60px)] leading-none tracking-tight text-brand">€970.40</div>
                <div className="mt-2.5 text-[13.5px] font-semibold text-brand">{c.bank}</div>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-5 text-[13px] text-ink-3">{c.note}</p>
      </div>
    </section>
  );
}
