import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePage from "@/components/GuidePage";
import { GUIDES, getGuide } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: guide.path },
    openGraph: {
      type: "article",
      title: `${guide.title} | Tally`,
      description: guide.description,
      url: guide.path,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
    },
  };
}

export default async function Page(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
