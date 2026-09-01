import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Offer from "@/components/Offer";
import SeasonBand from "@/components/SeasonBand";
import Guarantee from "@/components/Guarantee";
import SectorsGrid from "@/components/SectorsGrid";
import Pricing from "@/components/Pricing";
import SeoOverview from "@/components/SeoOverview";
import FooterCta from "@/components/FooterCta";
import { FAQS, faqJsonLd } from "@/lib/seo";

/*
  Reading order is the sales order: what you get, what is live right now, how the
  guarantee works, who we do it for, what it costs, then the argument in full.
  The long-form guarantee terms, method and qualification gate live on /guarantee
  so this page stays walkable on a phone.
*/
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <Offer />
      <SeasonBand />
      <Guarantee />
      <SectorsGrid />
      <Pricing />
      <SeoOverview />
      <FooterCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
    </main>
  );
}
