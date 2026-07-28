"use client";

/* Country → flag emoji, and dial-code detection for the phone field.
   The flag is derived from the ISO2 code (regional indicator letters). */

export function flag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

/* Dial codes for detection – longest matching prefix wins. Order matters
   only where two countries share a code (+1, +7): first entry is picked. */
const DIAL_CODES: { iso: string; dial: string }[] = [
  { iso: "MT", dial: "356" }, { iso: "ES", dial: "34" }, { iso: "SK", dial: "421" },
  { iso: "GB", dial: "44" }, { iso: "IE", dial: "353" }, { iso: "FR", dial: "33" },
  { iso: "DE", dial: "49" }, { iso: "IT", dial: "39" }, { iso: "PT", dial: "351" },
  { iso: "NL", dial: "31" }, { iso: "BE", dial: "32" }, { iso: "AT", dial: "43" },
  { iso: "CH", dial: "41" }, { iso: "PL", dial: "48" }, { iso: "CZ", dial: "420" },
  { iso: "HU", dial: "36" }, { iso: "RO", dial: "40" }, { iso: "BG", dial: "359" },
  { iso: "GR", dial: "30" }, { iso: "HR", dial: "385" }, { iso: "SI", dial: "386" },
  { iso: "DK", dial: "45" }, { iso: "SE", dial: "46" }, { iso: "NO", dial: "47" },
  { iso: "FI", dial: "358" }, { iso: "EE", dial: "372" }, { iso: "LV", dial: "371" },
  { iso: "LT", dial: "370" }, { iso: "LU", dial: "352" }, { iso: "CY", dial: "357" },
  { iso: "IS", dial: "354" }, { iso: "UA", dial: "380" }, { iso: "TR", dial: "90" },
  { iso: "RU", dial: "7" }, { iso: "US", dial: "1" }, { iso: "AE", dial: "971" },
  { iso: "IN", dial: "91" }, { iso: "AU", dial: "61" }, { iso: "SA", dial: "966" },
];

export function detectIso(phone: string): string | null {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+")) return null;
  const digits = cleaned.slice(1);
  let best: { iso: string; dial: string } | null = null;
  for (const c of DIAL_CODES) {
    if (digits.startsWith(c.dial) && (!best || c.dial.length > best.dial.length)) {
      best = c;
    }
  }
  return best ? best.iso : null;
}

/* Dial code for the countries offered in the Country select – used to
   prefill the phone field when a country is chosen. */
export const COUNTRY_DIAL: Record<string, string> = {
  Malta: "356",
  Spain: "34",
  Cyprus: "357",
  Slovakia: "421",
  "United Kingdom": "44",
};

export function PhoneField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className: string;
}) {
  const iso = detectIso(value);
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[18px] leading-none"
        aria-hidden
      >
        {iso ? flag(iso) : "🌐"}
      </span>
      <input
        name="phone"
        type="tel"
        inputMode="tel"
        maxLength={50}
        autoComplete="tel"
        placeholder="+356 …"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} pl-11`}
      />
    </div>
  );
}
