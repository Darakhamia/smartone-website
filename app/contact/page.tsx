import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead/lead-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a terminal or talk to sales. Tell us about your business and we'll get back to you within one business day.",
};

const points = [
  {
    title: "Live in ≤4 business days",
    text: "From this form to taking payments – including fiscal registration for your market.",
    icon: <path d="M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
  {
    title: "Your exact rate, in euros",
    text: "We'll work out your band from your volume – no effective-rate surprises.",
    icon: <path d="M4 10h12M4 14h9m6-8a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />,
  },
  {
    title: "Keep your own bank",
    text: "Payouts go to the account you already have, next business day.",
    icon: <path d="M3 10l9-6 9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" />,
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-22">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* left – pitch */}
        <div>
          <span className="anim-fade-up eyebrow">Get started</span>
          <h1 className="anim-fade-up anim-d-1 h-display mt-4 text-[clamp(34px,4.4vw,52px)] leading-[1.04]">
            Let&apos;s get you{" "}
            <span className="bg-gradient-to-r from-brand via-[#7b3ce8] to-[#a86cf5] bg-clip-text text-transparent">
              on the counter.
            </span>
          </h1>
          <p className="anim-fade-up anim-d-2 mt-5 max-w-115 text-lg leading-relaxed text-ink-2">
            Tell us about your business. Ready to order or just have questions –
            either way, we&apos;ll reply within one business day.
          </p>
          <div className="anim-fade-up anim-d-3 mt-9 space-y-5">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint">
                  <svg viewBox="0 0 24 24" className="size-5.5 stroke-brand" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {p.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-0.5 max-w-95 text-[14px] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right – form */}
        <Reveal delay={100}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
