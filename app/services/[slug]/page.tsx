import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell, { FaqList } from "@/components/PageShell";
import { CallZak, CaseGrid, LinkGrid, Prose, StepList } from "@/components/Sections";
import { getIndustry } from "@/lib/industries";
import { routeMetadata } from "@/lib/routes";
import { RECOVERY, SERVICE_PAGES, getService } from "@/lib/services";
import { breadcrumbNode, faqNode, serviceNode, webPageNode } from "@/lib/seo";

/*
  One page per service, from lib/services.ts. Order follows the brief's
  skeleton: what it is, who it is for, what we do, how it is measured, proof,
  pricing, FAQ, then related services and the industries it serves.
*/

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(`/services/${slug}`);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];

  const related = s.related.map((r) => {
    const other = getService(r);
    if (other) return { href: `/services/${other.slug}`, label: other.linkText, body: other.short };
    return { href: RECOVERY.path, label: RECOVERY.linkText, body: RECOVERY.short };
  });
  const industries = s.industries.flatMap((i) => {
    const ind = getIndustry(i);
    return ind ? [{ href: `/industries/${ind.slug}`, label: ind.linkText, body: ind.short }] : [];
  });

  const nodes = [
    webPageNode({ path, name: s.title, description: s.description }),
    serviceNode({ path, name: s.name, serviceType: s.serviceType, description: s.intro }),
    breadcrumbNode(path, crumbs),
    faqNode(path, s.faqs),
  ];

  return (
    <PageShell title={s.h1} accent={s.h1Accent} intro={s.intro} source={`service_${s.slug}`} crumbs={crumbs} nodes={nodes}>
      <CaseGrid heading={s.whoFor.heading} intro={s.whoFor.intro} cases={s.whoFor.cases} />
      <StepList heading={s.steps.heading} items={s.steps.items} />
      {s.extra.map((b) => (
        <Prose key={b.heading} heading={b.heading} body={b.body} />
      ))}
      <Prose heading={s.measured.heading} body={s.measured.body} />
      {/* TODO: case study goes here once a client agrees to be named. Real numbers and a named client only. */}
      <Prose heading={s.proof.heading} body={s.proof.body} />
      <Prose heading={s.pricing.heading} body={s.pricing.body}>
        <CallZak />
      </Prose>
      <FaqList faqs={s.faqs} heading={`${s.name} FAQ`} />
      <LinkGrid heading="Related services" links={related} />
      <LinkGrid heading="Industries we do this for" links={industries} />
    </PageShell>
  );
}
