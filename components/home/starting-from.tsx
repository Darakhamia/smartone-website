import { Banknote, CreditCard, Landmark, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GetStarted } from "@/components/home/get-started";

/* "Where are you starting from?" (homepage task §5, Malta only). Three
   situations a Maltese merchant is in today, each in their own words, each
   pointing to the part of the page that answers it: how the device works,
   or what the first year costs. English only – Malta has no Spanish. */

const situations: { icon: LucideIcon; title: string; text: string; link: string; href: string }[] = [
  {
    icon: Banknote,
    title: "I only take cash.",
    text: "Customers ask to pay by card, and some walk out when they can't. Start taking cards without changing how you handle VAT: the same device prints the fiscal receipt for card and cash sales.",
    link: "See how it works →",
    href: "#how-it-works",
  },
  {
    icon: Landmark,
    title: "A bank terminal and a separate till.",
    text: "Two machines on the counter, two bills, and a rate you have to ask a branch for. One device does both, and your rate is published on this website.",
    link: "See what the first year costs →",
    href: "#first-year",
  },
  {
    icon: CreditCard,
    title: "A card reader and a separate till.",
    text: "The reader takes the card, but the fiscal receipt is still a second box, and with some readers the money lands in the provider's account before it reaches yours. SmartOne prints the receipt and pays out to the bank account you already have.",
    link: "See what the first year costs →",
    href: "#first-year",
  },
];

export function StartingFrom() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="h-display max-w-165 text-[clamp(30px,4vw,48px)] leading-[1.06]">Where are you starting from?</h2>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {situations.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm shadow-black/3">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-tint">
                  <s.icon className="size-6 text-brand" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight">{s.title}</h3>
                <p className="lead mt-2.5 mb-6 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                <a href={s.href} className="mt-auto text-[14.5px] font-semibold text-brand transition-colors hover:text-brand-d">
                  {s.link}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <GetStarted location="starting-from" className="btn-primary" />
          <p className="text-[13.5px] text-ink-3">Free to create · usually live in 4 working days from sign-up</p>
        </div>
      </div>
    </section>
  );
}
