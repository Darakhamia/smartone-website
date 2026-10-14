import { Hero } from "@/components/home/hero";
import { Breadth } from "@/components/home/breadth";
import { WhySwitch } from "@/components/home/why-switch";
import { StartingFrom } from "@/components/home/starting-from";
import { DeviceQuiz } from "@/components/home/device-quiz";
import { Gap } from "@/components/home/gap";
import { LocalPartner } from "@/components/home/local-partner";
import { HowItWorks } from "@/components/home/how-it-works";
import { FirstYear } from "@/components/home/first-year";
import { Industries } from "@/components/home/industries";
import { GotDoubts } from "@/components/home/got-doubts";
import { Proof, SHOW_PROOF } from "@/components/home/proof";
import { FinalCta } from "@/components/home/final-cta";
import { getActiveCountry } from "@/lib/country-server";

/* Section order follows the homepage task (13.10.2026). The four sections
   written for Malta – where you're starting from, the local partner, the
   first-year costs and the FAQ – speak about Malta's fiscal approval, partner
   and prices, so every other market goes without them. */
export default async function Home() {
  const malta = (await getActiveCountry()).code === "mt";
  return (
    <>
      <Hero />
      <Breadth />
      <WhySwitch />
      {malta && <StartingFrom />}
      <Gap />
      <DeviceQuiz />
      {malta && <LocalPartner />}
      <HowItWorks />
      {malta && <FirstYear />}
      <Industries />
      {malta && <GotDoubts />}
      {SHOW_PROOF && <Proof />}
      <FinalCta />
    </>
  );
}
