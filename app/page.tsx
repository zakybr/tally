import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroFilm from "@/components/home/HeroFilm";
import {
  Capabilities,
  HomeFaq,
  HowItWorks,
  Sectors,
  Statement,
  Stats,
} from "@/components/home/HomeSections";
import FooterCta from "@/components/FooterCta";
import JsonLd from "@/components/JsonLd";
import { HOME_FAQS } from "@/lib/home";
import { routeMetadata } from "@/lib/routes";
import { businessNode, faqNode, webPageNode } from "@/lib/seo";

/*
  Reading order is the sales order: the film and the claim, what we believe,
  what we do, the proof, who it is for, how it works and the common questions,
  with the free audit and a call never more than a scroll away. One argument
  per band, light and charcoal in turn.
*/

export const metadata: Metadata = routeMetadata("/");

const nodes = [
  webPageNode({ path: "/", name: "Tally, marketing agency in Auckland", description: metadata.description ?? "" }),
  businessNode(),
  faqNode("/", HOME_FAQS),
];

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
      <HomeFaq />
      <FooterCta />
      <JsonLd nodes={nodes} />
    </main>
  );
}
