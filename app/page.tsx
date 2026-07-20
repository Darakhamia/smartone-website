import { Hero } from "@/components/home/hero";
import { TrustLine } from "@/components/home/trust-line";
import { Breadth } from "@/components/home/breadth";
import { WhySwitch } from "@/components/home/why-switch";
import { DeviceQuiz } from "@/components/home/device-quiz";
import { Gap } from "@/components/home/gap";
import { HowItWorks } from "@/components/home/how-it-works";
import { Industries } from "@/components/home/industries";
import { Proof, SHOW_PROOF } from "@/components/home/proof";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustLine />
      <Breadth />
      <WhySwitch />
      <DeviceQuiz />
      <Gap />
      <HowItWorks />
      <Industries />
      {SHOW_PROOF && <Proof />}
      <FinalCta />
    </>
  );
}
