import Link from "next/link";
import { Brand } from "@/components/site-nav";
import { FooterRegion } from "@/components/country/footer-region";
import { getActiveCountry, getActiveLang } from "@/lib/country-server";
import { DICT, tr } from "@/lib/dictionaries";
import { promotesRegister } from "@/lib/countries";
import { COMPANY, emiPartner } from "@/lib/legal";
import { API_DOCS_URL, MERCHANT_PORTAL_URL } from "@/lib/links";

export async function SiteFooter() {
  const country = await getActiveCountry();
  const lang = await getActiveLang();
  const t = DICT[lang].footer;
  const region =
    country.code === "es"
      ? tr(lang, "Verifactu-ready for 2027", "Preparado para Verifactu 2027")
      : tr(lang, "Connected payments across Europe", "Pagos conectados en toda Europa");
  const l = tr(
    lang,
    {
      paymentsFiscal: "Payments & Fiscal",
      payments: "Payments",
      horeca: "HoReCa",
      cardReader: "Card reader",
      cashRegister: "Cash register",
      whatIs: "What it is",
      login: "Log in",
      apiDocs: "API docs",
      pricing: "Pricing",
      about: "About",
      industries: "Industries",
      contact: "Contact",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      imprint: "Legal Notice",
    },
    {
      paymentsFiscal: "Pagos y fiscal",
      payments: "Pagos",
      horeca: "HoReCa",
      cardReader: "Datáfono",
      cashRegister: "Caja registradora",
      whatIs: "Qué es",
      login: "Iniciar sesión",
      apiDocs: "Documentación de la API",
      pricing: "Precios",
      about: "Nosotros",
      industries: "Sectores",
      contact: "Contacto",
      privacy: "Política de privacidad",
      cookies: "Política de cookies",
      imprint: "Aviso legal",
    },
  );

  /* Names the licensed partner rather than "authorised financial partners",
     and names the right one: UK merchants are served by the FCA-authorised
     company, everyone else by the EEA one. Built here rather than kept in the
     dictionary because it depends on the active country, not just language. */
  const emi = emiPartner(country);
  const disclaimer = tr(
    lang,
    `Product availability may vary by country. Payment, e-money and card-acquiring services are provided by ${emi.name}, an authorised electronic-money institution regulated by ${emi.regulator}; SmartOne is a technology provider and is not itself licensed. Settlement times are subject to banking days and the agreed commercial terms.`,
    `La disponibilidad de los productos puede variar según el país. Los servicios de pago, dinero electrónico y adquirencia de tarjetas los presta ${emi.name}, entidad de dinero electrónico autorizada y supervisada por ${emi.regulatorEs}; SmartOne es un proveedor tecnológico y no está licenciado como tal. Los plazos de liquidación dependen de los días bancarios y de las condiciones comerciales acordadas.`,
  );

  // Mirrors the header's Product mega-menu: Payments & Fiscal, Merchant Portal, HoReCa.
  const register = promotesRegister(country);
  const columns = [
    {
      title: register ? l.paymentsFiscal : l.payments,
      links: [
        { href: "/product/terminals", label: l.cardReader },
        ...(register ? [{ href: "/product/cash-register", label: l.cashRegister }] : []),
        { href: "/product/tap-to-phone", label: "Tap to Phone" },
      ],
    },
    {
      title: "Retail",
      links: [
        { href: "/merchant-portal", label: l.whatIs },
        { href: MERCHANT_PORTAL_URL, label: l.login },
        { href: API_DOCS_URL, label: l.apiDocs },
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
          <p className="text-[12px] leading-relaxed text-white/40">{disclaimer}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 text-[12.5px]">
            {/* The operating company, its registration number and VAT number have
                to be identifiable site-wide (Malta e-Commerce Act Cap. 426,
                Companies Act Cap. 386 s.82) – the full details live on /imprint,
                which is why that link sits on every page. */}
            <span className="text-white/50">
              © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.registrationNumber} · VAT {COMPANY.vat}
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/imprint" className="text-white/60 transition-colors hover:text-white">{l.imprint}</Link>
              <Link href="/privacy" className="text-white/60 transition-colors hover:text-white">{l.privacy}</Link>
              <Link href="/cookies" className="text-white/60 transition-colors hover:text-white">{l.cookies}</Link>
              <span className="text-white/40">{region}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
