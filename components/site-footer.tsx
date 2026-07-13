import Link from "next/link";
import { Brand } from "@/components/site-nav";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Terminal & device" },
      { href: "/product", label: "Merchant Portal" },
      { href: "/pricing", label: "Pricing" },
      { href: "/product", label: "Compliance" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/industries", label: "Vets & services" },
      { href: "/industries", label: "Retail" },
      { href: "/industries", label: "Cafés & HoReCa" },
      { href: "/industries", label: "Mobile vendors" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-night pt-14 pb-8 text-white/65">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Brand light />
            <p className="mt-4 max-w-70 text-[13.5px] leading-relaxed">
              One device to run your business – payments, fiscal receipts, and
              the money behind them.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-3.5 font-display text-sm font-semibold text-white">
                {col.title}
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
          <p className="text-[12px] leading-relaxed text-white/40">
            Product availability may vary by country. Payment services may be
            provided by authorised financial partners. Settlement times are
            subject to banking days and the agreed commercial terms.
          </p>
          <div className="mt-4 flex flex-wrap justify-between gap-3 text-[12.5px]">
            <span>© {new Date().getFullYear()} SmartOne</span>
            <span>Across Europe · Verifactu-ready for Spain 2027</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
