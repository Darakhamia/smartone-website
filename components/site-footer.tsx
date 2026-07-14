import Link from "next/link";
import { Brand } from "@/components/site-nav";
import { FooterRegion } from "@/components/country/footer-region";
import { getActiveLang } from "@/lib/country-server";
import { DICT, tr } from "@/lib/dictionaries";
import { MERCHANT_PORTAL_URL } from "@/lib/links";

export async function SiteFooter() {
  const lang = await getActiveLang();
  const t = DICT[lang].footer;
  const l = tr(
    lang,
    {
      paymentsFiscal: "Payments & Fiscal",
      horeca: "HoReCa",
      cardReader: "Card reader",
      cashRegister: "Cash register",
      whatIs: "What it is",
      login: "Log in",
      pricing: "Pricing",
      about: "About",
      industries: "Industries",
      contact: "Contact",
    },
    {
      paymentsFiscal: "Pagos y fiscal",
      horeca: "HoReCa",
      cardReader: "Datáfono",
      cashRegister: "Caja registradora",
      whatIs: "Qué es",
      login: "Iniciar sesión",
      pricing: "Precios",
      about: "Nosotros",
      industries: "Sectores",
      contact: "Contacto",
    },
  );

  // Mirrors the header's Product mega-menu: Payments & Fiscal, Merchant Portal, HoReCa.
  const columns = [
    {
      title: l.paymentsFiscal,
      links: [
        { href: "/product/terminals", label: l.cardReader },
        { href: "/product/cash-register", label: l.cashRegister },
        { href: "/product/tap-to-phone", label: "Tap to Phone" },
      ],
    },
    {
      title: "Retail",
      links: [
        { href: "/merchant-portal", label: l.whatIs },
        { href: MERCHANT_PORTAL_URL, label: l.login },
      ],
    },
    {
      title: l.horeca,
      links: [{ href: "/click", label: "Click" }],
    },
    {
      title: t.company,
      links: [
        { href: "/about", label: l.about },
        { href: "/industries", label: l.industries },
        { href: "/pricing", label: l.pricing },
        { href: "/contact", label: l.contact },
      ],
    },
  ];

  return (
    <footer className="bg-night pt-14 pb-8 text-white/65">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-4 max-w-70 text-[13.5px] leading-relaxed">{t.tagline}</p>
            <FooterRegion />
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-3.5 font-display text-sm font-semibold text-white">{col.title}</h5>
              {col.links.map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-1 text-[13.5px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-1 text-[13.5px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ),
              )}
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
