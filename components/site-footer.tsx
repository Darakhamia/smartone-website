import Link from "next/link";
import { Brand } from "@/components/site-nav";
import { FooterRegion } from "@/components/country/footer-region";
import { getActiveLang } from "@/lib/country-server";
import { DICT, tr } from "@/lib/dictionaries";

export async function SiteFooter() {
  const lang = await getActiveLang();
  const t = DICT[lang].footer;
  const l = tr(
    lang,
    {
      retail: "Retail",
      horeca: "HoReCa",
      cardReader: "Card reader",
      cashRegister: "Cash register",
      overview: "Overview",
      moneyReports: "Money & reports",
      login: "Log in",
      clickOrdering: "Click ordering",
      dualScreen: "Dual-screen Pro S",
      cafes: "Cafés & restaurants",
      about: "About",
      cases: "Case studies",
      industries: "Industries",
      contact: "Contact",
    },
    {
      retail: "Retail",
      horeca: "HoReCa",
      cardReader: "Datáfono",
      cashRegister: "Caja registradora",
      overview: "Resumen",
      moneyReports: "Dinero e informes",
      login: "Iniciar sesión",
      clickOrdering: "Pedidos Click",
      dualScreen: "Doble pantalla Pro S",
      cafes: "Cafeterías y restaurantes",
      about: "Nosotros",
      cases: "Casos de éxito",
      industries: "Sectores",
      contact: "Contacto",
    },
  );

  // Mirrors the header's Product mega-menu: Retail, Merchant Portal, HoReCa.
  const columns = [
    {
      title: l.retail,
      links: [
        { href: "/product/terminals", label: l.cardReader },
        { href: "/product/cash-register", label: l.cashRegister },
        { href: "/product/tap-to-phone", label: "Tap to Phone" },
      ],
    },
    {
      title: "Merchant Portal",
      links: [
        { href: "/merchant-portal", label: l.overview },
        { href: "/merchant-portal", label: l.moneyReports },
        { href: "/login", label: l.login },
      ],
    },
    {
      title: l.horeca,
      links: [
        { href: "/click", label: l.clickOrdering },
        { href: "/product/terminals", label: l.dualScreen },
        { href: "/industries", label: l.cafes },
      ],
    },
    {
      title: t.company,
      links: [
        { href: "/about", label: l.about },
        { href: "/case-studies", label: l.cases },
        { href: "/industries", label: l.industries },
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
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-1 text-[13.5px] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
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
