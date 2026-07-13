import Link from "next/link";
import { Brand } from "@/components/site-nav";
import { FooterRegion } from "@/components/country/footer-region";
import { getActiveLang } from "@/lib/country-server";
import { DICT } from "@/lib/dictionaries";

const columns = [
  {
    titleKey: "product" as const,
    links: [
      { href: "/product", label: "Terminal & device" },
      { href: "/product", label: "Merchant Portal" },
      { href: "/pricing", label: "Pricing" },
      { href: "/product", label: "Compliance" },
    ],
  },
  {
    titleKey: "industries" as const,
    links: [
      { href: "/industries", label: "Vets & services" },
      { href: "/industries", label: "Retail" },
      { href: "/industries", label: "Cafés & HoReCa" },
      { href: "/industries", label: "Mobile vendors" },
    ],
  },
  {
    titleKey: "company" as const,
    links: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export async function SiteFooter() {
  const lang = await getActiveLang();
  const t = DICT[lang].footer;

  return (
    <footer className="bg-night pt-14 pb-8 text-white/65">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-4 max-w-70 text-[13.5px] leading-relaxed">{t.tagline}</p>
            <FooterRegion />
          </div>
          {columns.map((col) => (
            <div key={col.titleKey}>
              <h5 className="mb-3.5 font-display text-sm font-semibold text-white">
                {t[col.titleKey]}
              </h5>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block py-1 text-[13.5px] text-white/60 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/12 pt-5">
          <p className="text-[12px] leading-relaxed text-white/40">{t.disclaimer}</p>
          <div className="mt-4 flex flex-wrap justify-between gap-3 text-[12.5px]">
            <span>© {new Date().getFullYear()} SmartOne</span>
            <span>Across Europe · Verifactu-ready for Spain 2027</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
