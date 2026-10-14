import { ShieldCheck, Landmark, Clock, type LucideIcon } from "lucide-react";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { tr } from "@/lib/dictionaries";

/* The three facts under the hero. Icons come from the same Lucide set as the
   rest of the site – these used to be hand-drawn paths, which meant this strip
   was the one place with its own icon style.

   Sits between the hero and the first section as a quiet band: enough weight to
   be read rather than skimmed past, not so much that it competes with the
   headline above it. */
type Fact = { label: string; icon: LucideIcon };

export async function TrustLine() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  /* The first fact is the market's own: the fiscal approval only exists in
     Malta (MTCA, January 2025), Spain's is Verifactu readiness, and elsewhere
     what we can stand behind is who processes the payments. */
  const first =
    country.code === "mt"
      ? "VAT-approved in Malta"
      : country.code === "es"
        ? tr(lang, "Verifactu-ready for 2027", "Preparado para Verifactu 2027")
        : "Payments by a licensed acquirer";
  const facts: Fact[] = tr(
    lang,
    [
      { label: first, icon: ShieldCheck },
      { label: "Money to your own bank, T+1", icon: Landmark },
      { label: "Live in ≤4 business days", icon: Clock },
    ],
    [
      { label: first, icon: ShieldCheck },
      { label: "Dinero a tu propio banco, T+1", icon: Landmark },
      { label: "Operativo en ≤4 días hábiles", icon: Clock },
    ],
  );

  return (
    <section className="border-y border-line bg-bg-2/60 py-7 sm:py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
          {facts.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className={`flex items-center justify-center gap-3 sm:flex-1 sm:px-6 ${
                  i > 0 ? "sm:border-l sm:border-line" : ""
                }`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-tint">
                  <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[15px] font-medium text-ink-2">{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
