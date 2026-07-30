import { Reveal } from "@/components/reveal";

/* Shared section heading used across the product pages: eyebrow + display
   title + optional lead, revealed on scroll. `center` centres the block. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={center ? "mx-auto max-w-165 text-center" : "max-w-165"}>
        <span className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</span>
        <h2 className={`h-display mt-4 text-[clamp(28px,3.6vw,44px)] leading-[1.06] ${dark ? "text-white" : ""}`}>
          {title}
        </h2>
        {sub && (
          <p className={`lead mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-ink-2"} ${center ? "mx-auto max-w-135" : ""}`}>
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}
