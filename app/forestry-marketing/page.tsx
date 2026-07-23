import type { Metadata } from "next";
import VerticalPage from "@/components/VerticalPage";
import { getVertical } from "@/lib/verticals";

const vertical = getVertical("forestry-marketing")!;

export const metadata: Metadata = {
  title: vertical.title,
  description: vertical.description,
  keywords: vertical.keywords,
  alternates: { canonical: vertical.path },
  openGraph: {
    title: `${vertical.title} | Tally`,
    description: vertical.description,
    url: vertical.path,
  },
};

export default function Page() {
  return <VerticalPage vertical={vertical} />;
}
