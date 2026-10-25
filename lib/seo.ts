/* Shared SEO facts, per-page metadata and structured-data builders. */

import type { Metadata } from "next";
import { PEOPLE } from "@/lib/contact";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.tallynz.co";

export const SITE_NAME = "Tally";
export const LEGAL_NAME = "Tally Marketing Limited";
export const NZBN = "9429053993519";

/*
  Google Business Profile. Tally is a service-area business: the street address
  stays off the site and out of the schema, so Auckland and New Zealand are
  given as the area served instead.
  TODO: swap the share link for the profile's maps.google.com/?cid= URL once it
  is copied from the profile, and add the Instagram, Facebook and LinkedIn
  company URLs to SAME_AS when they are confirmed.
*/
export const GBP_URL = "https://share.google/DFyJrJpXeKvjiLh3f";
export const SAME_AS: string[] = [GBP_URL];

/* The long form, for schema and llms.txt where length is not truncated. */
export const LONG_DESCRIPTION =
  "Tally is a social media marketing agency based in Auckland, working with consumer and marine brands across New Zealand. The team has spent 8 years growing, monetising and selling Instagram accounts, with more than 100 million organic views on accounts it has run. Tally runs marketing management, Instagram marketing, Meta ads, social media video production and small business websites, starting from a free audit. It also handles banned Instagram account recovery and username claims, and runs recruitment and reach campaigns for primary industries operators.";

export type FaqItem = { question: string; answer: string };
export type Crumb = { name: string; path: string };

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

/* Auckland first, then the rest of the country, everywhere areaServed appears. */
export const AREA_SERVED = [
  { "@type": "City", name: "Auckland", containedInPlace: { "@type": "Country", name: "New Zealand" } },
  { "@type": "Country", name: "New Zealand" },
];

/*
  Every indexable page gets its own title, description, canonical, Open Graph
  and Twitter tags, and its own social card from /og. Nothing is inherited from
  the homepage, because Next replaces nested metadata objects wholesale.
  Titles are passed whole (`absolute`) so their length is exactly what we count.
*/
export function pageMetadata({
  path,
  title,
  description,
  ogAlt,
  ogPath = path,
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  ogAlt: string;
  /* Which page's card to use, for pages without their own (noindex pages). */
  ogPath?: string;
  noindex?: boolean;
}): Metadata {
  const image = { url: `/og${ogPath === "/" ? "/home" : ogPath}`, width: 1200, height: 630, alt: ogAlt };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NZ",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

function person(p: (typeof PEOPLE)[number]) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#${p.email.split("@")[0]}`,
    name: p.name,
    jobTitle: p.role,
    email: p.email,
    telephone: p.phone,
    worksFor: { "@id": ORG_ID },
    ...(p.sameAs.length ? { sameAs: p.sameAs } : {}),
  };
}

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: ["Tally NZ", "tallynz.co"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/tally-logo.png`,
      caption: SITE_NAME,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    description: LONG_DESCRIPTION,
    slogan: "We sell the tally, not the footage.",
    email: PEOPLE[0].email,
    telephone: PEOPLE[0].phone,
    identifier: { "@type": "PropertyValue", propertyID: "NZBN", value: NZBN },
    areaServed: AREA_SERVED,
    founder: PEOPLE.map((p) => ({ "@id": person(p)["@id"] })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: PEOPLE[0].phone,
      email: PEOPLE[0].email,
      areaServed: "NZ",
      availableLanguage: "en-NZ",
    },
    sameAs: SAME_AS,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-NZ",
    publisher: { "@id": ORG_ID },
  };
}

/* The local business entity, on the homepage and contact page. Service area only, no street address. */
export function businessNode() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/tally-logo.png`,
    logo: { "@id": `${SITE_URL}/#logo` },
    description: LONG_DESCRIPTION,
    telephone: PEOPLE[0].phone,
    email: PEOPLE[0].email,
    areaServed: AREA_SERVED,
    hasMap: GBP_URL,
    parentOrganization: { "@id": ORG_ID },
    sameAs: SAME_AS,
  };
}

export function webPageNode({ path, name, description }: { path: string; name: string; description: string }) {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    name,
    description,
    inLanguage: "en-NZ",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(path === "/" ? {} : { breadcrumb: { "@id": `${SITE_URL}${path}#breadcrumb` } }),
  };
}

export function serviceNode({
  path,
  name,
  serviceType,
  description,
}: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
}) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
  };
}

export function faqNode(path: string, faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

/* Full Person entities, for the About page, where the people are shown. */
export function personNodes() {
  return PEOPLE.map((p) => ({ ...person(p), mainEntityOfPage: `${SITE_URL}/about` }));
}

/* One @graph per page: the sitewide Organization and WebSite, then the page's own nodes. */
export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), ...nodes],
  };
}
