import { graph } from "@/lib/seo";

/* The page's one structured-data block: Organization and WebSite, then the page's own nodes, as a single @graph. */
export default function JsonLd({ nodes = [] }: { nodes?: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)).replace(/</g, "\\u003c") }}
    />
  );
}
