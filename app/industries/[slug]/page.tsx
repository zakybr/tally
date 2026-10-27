import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell, { FaqList } from "@/components/PageShell";
import { CallZak, CaseGrid, LinkGrid, Prose } from "@/components/Sections";
import { INDUSTRY_PAGES, getIndustry } from "@/lib/industries";
import { routeMetadata } from "@/lib/routes";
import { getService } from "@/lib/services";
import { breadcrumbNode, faqNode, serviceNode, webPageNode } from "@/lib/seo";

/* One page per industry, from lib/industries.ts, linking to the services that matter most for it. */

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(`/industries/${slug}`);
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const path = `/industries/${ind.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: ind.name, path },
  ];

  const services = ind.services.flatMap((sl) => {
    const s = getService(sl);
    return s ? [{ href: `/services/${s.slug}`, label: s.linkText, body: s.short }] : [];
  });

  const nodes = [
    webPageNode({ path, name: ind.title, description: ind.description }),
    serviceNode({ path, name: `${ind.name} marketing`, serviceType: `${ind.name} marketing`, description: ind.description }),
    breadcrumbNode(path, crumbs),
    faqNode(path, ind.faqs),
  ];

  return (
    <PageShell title={ind.h1} accent={ind.h1Accent} intro={ind.intro} source={`industry_${ind.slug}`} crumbs={crumbs} nodes={nodes}>
      <CaseGrid heading={ind.who.heading} cases={ind.who.cases} />
      {ind.sections.map((b) => (
        <Prose key={b.heading} heading={b.heading} body={b.body} />
      ))}
      <LinkGrid heading="What we usually run" links={services} />
      {/* TODO: case study goes here once a client agrees to be named. Real numbers and a named client only. */}
      <Prose heading={ind.measured.heading} body={ind.measured.body}>
        <CallZak lead="Pricing is set after the free audit." />
      </Prose>
      <FaqList faqs={ind.faqs} heading={`${ind.name} FAQ`} />
    </PageShell>
  );
}
