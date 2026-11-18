import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { IndustryPage } from "@/components/industries/industry-page";
import { getActiveCountry } from "@/lib/country-server";
import { getIndustry, industryPagesFor, INDUSTRIES } from "@/lib/industries";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/* The eight Malta industry pages. Any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    // the data's titles already end in "– SmartOne"; skip the layout's suffix
    title: { absolute: ind.title },
    description: ind.description,
    alternates: { canonical: `${SITE_URL}/industries/${ind.slug}` },
  };
}

export default async function IndustrySlugPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  /* The copy is Malta's (fiscal receipts, EXO, the cash register). Any other
     market goes to its own /industries, which it sees as before. */
  if (!industryPagesFor(await getActiveCountry())) redirect("/industries");
  return <IndustryPage ind={ind} />;
}
