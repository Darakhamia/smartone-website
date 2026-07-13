import MT from "country-flag-icons/react/3x2/MT";
import ES from "country-flag-icons/react/3x2/ES";
import CY from "country-flag-icons/react/3x2/CY";
import SK from "country-flag-icons/react/3x2/SK";
import GB from "country-flag-icons/react/3x2/GB";
import type { CountryCode } from "@/lib/countries";

/* Real flag artwork (inline SVG, self-contained) instead of the OS emoji
   flags – they render consistently across platforms. UK maps to the GB
   union flag. */
const MAP: Record<CountryCode, React.ComponentType<{ title?: string; className?: string }>> = {
  mt: MT,
  es: ES,
  cy: CY,
  sk: SK,
  uk: GB,
};

export function Flag({ code, className = "h-6 w-9" }: { code: CountryCode; className?: string }) {
  const Svg = MAP[code];
  return (
    <span className={`inline-block shrink-0 overflow-hidden rounded-[5px] ring-1 ring-black/[0.06] ${className}`}>
      <Svg className="block h-full w-full" />
    </span>
  );
}
