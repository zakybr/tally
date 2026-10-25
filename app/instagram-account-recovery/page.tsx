import type { Metadata } from "next";
import PageShell, { FaqList } from "@/components/PageShell";
import { CallZak, CaseGrid, LinkGrid, Prose, StepList } from "@/components/Sections";
import { routeMetadata } from "@/lib/routes";
import { RECOVERY, getService } from "@/lib/services";
import { breadcrumbNode, faqNode, serviceNode, webPageNode } from "@/lib/seo";

/*
  Instagram account recovery, username claims and disabled Meta ad accounts:
  its own long-standing URL, because these are urgent searches. Leads with the
  call. Absorbs the old username-claims page and the recovery guides.
*/

const PATH = RECOVERY.path;

export const metadata: Metadata = routeMetadata(PATH);

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Account recovery", path: PATH },
];

const nodes = [
  webPageNode({ path: PATH, name: RECOVERY.title, description: RECOVERY.description }),
  serviceNode({ path: PATH, name: RECOVERY.name, serviceType: RECOVERY.serviceType, description: RECOVERY.intro }),
  breadcrumbNode(PATH, crumbs),
  faqNode(PATH, RECOVERY.faqs),
];

const related = RECOVERY.related.flatMap((slug) => {
  const s = getService(slug);
  return s ? [{ href: `/services/${s.slug}`, label: s.linkText, body: s.short }] : [];
});

export default function RecoveryPage() {
  return (
    <PageShell
      title={RECOVERY.h1}
      accent={RECOVERY.h1Accent}
      intro={RECOVERY.intro}
      source="recovery_hero"
      callFirst
      crumbs={crumbs}
      nodes={nodes}
    >
      <CaseGrid heading="What we handle" cases={RECOVERY.handles} />

      <section className="mt-24 border-t rule-hair pt-16">
        <h2 className="display text-[2.25rem] text-ink md:text-[3rem]">Banned today? Do this</h2>
        <ol className="mt-8 max-w-3xl space-y-4">
          {RECOVERY.firstSteps.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] text-[1.0625rem] leading-[1.6] text-ink-2">
              <span className="mono-label pt-1 text-signal">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <StepList heading="How a recovery case works" items={RECOVERY.steps} />
      <Prose heading={RECOVERY.adAccounts.heading} body={RECOVERY.adAccounts.body} />
      <Prose heading={RECOVERY.scams.heading} body={RECOVERY.scams.body}>
        <CallZak lead="Not sure whether your case is worth taking?" />
      </Prose>
      <FaqList faqs={RECOVERY.faqs} heading="Account recovery FAQ" />
      <LinkGrid heading="Once the account is back" links={related} />
    </PageShell>
  );
}
