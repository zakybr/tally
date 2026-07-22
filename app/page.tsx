import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import SeoOverview from "@/components/SeoOverview";
import AccountabilityGap from "@/components/AccountabilityGap";
import WorkTriptych from "@/components/WorkTriptych";
import Guarantee from "@/components/Guarantee";
import TracksGrid from "@/components/TracksGrid";
import MissClause from "@/components/MissClause";
import SectorsGrid from "@/components/SectorsGrid";
import Method from "@/components/Method";
import Pricing from "@/components/Pricing";
import Gate from "@/components/Gate";
import FooterCta from "@/components/FooterCta";
import { FAQS, faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <SeoOverview />
      <AccountabilityGap />
      <WorkTriptych />
      <Guarantee />
      <TracksGrid />
      <MissClause />
      <SectorsGrid />
      <Method />
      <Pricing />
      <Gate />
      <FooterCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
    </main>
  );
}
