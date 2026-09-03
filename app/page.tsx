import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Offer from "@/components/Offer";
import SeasonBand from "@/components/SeasonBand";
import Guarantee from "@/components/Guarantee";
import Pricing from "@/components/Pricing";
import SeoOverview from "@/components/SeoOverview";
import FooterCta from "@/components/FooterCta";
import { FAQS, faqJsonLd } from "@/lib/seo";

/*
  Reading order is the sales order: the claim, what you get, how the guarantee is
  dimensioned, the marine season, what it costs, then the coverage register.

  The sector cards are no longer here. They are independent pages reached from
  the header dropdown, which keeps the homepage to one argument and gives each
  sector a page that can rank on its own.
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
