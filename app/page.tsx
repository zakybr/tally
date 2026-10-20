import Nav from "@/components/Nav";
import HeroFilm from "@/components/home/HeroFilm";
import {
  Capabilities,
  HowItWorks,
  Sectors,
  Statement,
  Stats,
} from "@/components/home/HomeSections";
import FooterCta from "@/components/FooterCta";
import { FAQS, faqJsonLd } from "@/lib/seo";

/*
  Reading order is the sales order: the film and the claim, what we believe,
  what we do, the proof, who it is for and how it works, with the free audit
  and a call never more than a scroll away. One argument per band, light and charcoal in turn.
*/
export default function Home() {
  return (
    <main>
      <Nav />
      <HeroFilm />
      <Statement />
      <Capabilities />
      <Stats />
      <Sectors />
      <HowItWorks />
      <FooterCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
    </main>
  );
}
