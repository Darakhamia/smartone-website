import { Headset, Landmark, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GetStarted } from "@/components/home/get-started";
import { TalkToUs } from "@/components/lead/talk-to-us";

/* "A local partner in Malta" (homepage task §8, Malta only). Only what is
   certain today: a person on the island calls back, a person reviews the
   account, the money goes to the merchant's own bank.

   Waiting on Chris (task, "Ждёт подтверждения"): once confirmed, add "Your
   device is delivered and set up on the island." to the end of the first
   point. Not before. */

const points: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Headset, title: "A person, not a call centre.", text: "Leave your number and our partner on the island calls you back." },
  { icon: UserCheck, title: "A person reviews your account.", text: "Not an algorithm deciding on its own." },
  { icon: Landmark, title: "Your money stays in your bank.", text: "Payouts go to the account you already have, with no wallet in between." },
];

export function LocalPartner() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-white">
      <div className="pointer-events-none absolute -top-40 -right-24 size-140 rounded-full bg-[radial-gradient(circle,rgba(124,60,232,0.35),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow eyebrow-dark">On the island</span>
          <h2 className="h-display mt-4 max-w-165 text-[clamp(30px,4vw,48px)] leading-[1.06]">A local partner in Malta.</h2>
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-night-2 p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-white/10">
                  <p.icon className="size-6 text-brand-l" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <GetStarted location="partner" className="btn-light" />
          <TalkToUs location="partner" className="btn-ghost-dark" />
        </div>
      </div>
    </section>
  );
}
