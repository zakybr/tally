const sectors = [
  "Seafood & Aquaculture",
  "Forestry & Wood Processing",
  "Horticulture at Scale",
  "Food Processing",
  "Operators & Co-ops",
  "Funded Agritech",
];

/* Thin, dense manifest strip: stock-ticker treatment, amber dividers. */
export default function Ticker() {
  return (
    <div
      className="overflow-hidden border-y border-hairline bg-panel py-2.5"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sectors.map((s) => (
              <span key={`${copy}-${s}`} className="flex items-center">
                <span className="mono-label whitespace-nowrap px-6 text-ink-2">{s}</span>
                <span className="font-mono text-xs text-amber">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
