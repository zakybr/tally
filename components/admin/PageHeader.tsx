export default function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="border-b border-hairline px-5 py-6 md:px-8 md:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          {lede && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{lede}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
}
