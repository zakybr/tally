import Link from "next/link";
import type { Crumb } from "@/lib/seo";

/* Visible trail matching the URL path, mirrored by the page's BreadcrumbList node. */
export default function Breadcrumbs({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="mono-label flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-3">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-x-2">
              {last ? (
                <span aria-current="page" className="text-ink-2">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="link-wipe hover:text-ink">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
