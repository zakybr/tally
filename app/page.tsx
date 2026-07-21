import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import AccountabilityGap from "@/components/AccountabilityGap";
import WorkTriptych from "@/components/WorkTriptych";
import Guarantee from "@/components/Guarantee";
import TracksGrid from "@/components/TracksGrid";
import MissClause from "@/components/MissClause";
import SectorsGrid from "@/components/SectorsGrid";
import Record from "@/components/Record";
import Method from "@/components/Method";
import Pricing from "@/components/Pricing";
import Gate from "@/components/Gate";
import FooterCta from "@/components/FooterCta";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <AccountabilityGap />
      <WorkTriptych />
      <Guarantee />
      <TracksGrid />
      <MissClause />
      <SectorsGrid />
      <Record />
      <Method />
      <Pricing />
      <Gate />
      <FooterCta />
    </main>
  );
}
