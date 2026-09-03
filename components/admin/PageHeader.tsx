/*
  No eyebrow. In a task UI a label above the title is decoration, the title
  and the sidebar's current item already say where you are.
*/
export default function PageHeader({
  title,
  lede,
  actions,
}: {
  title: string;
  lede?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="border-b border-[var(--line)] px-5 py-6 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1
            className="font-sans font-semibold tracking-tight text-[var(--ink)]"
            style={{ fontSize: "var(--t-page)", textWrap: "balance" }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]"
              style={{ textWrap: "pretty" }}
            >
              {lede}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
}
