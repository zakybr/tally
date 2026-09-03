const sectors = [
  "Seafood & Aquaculture",
  "Boat Building & Marine Trades",
  "Fishing Charters",
  "Forestry & Wood Processing",
  "Horticulture at Scale",
  "Food Processing",
  "Operators & Co-ops",
  "Funded Agritech",
];

/* Thin, dense manifest strip. The dividers are ink, not signal: the signal
   budget on this page is spent on the guaranteed figures, not on decoration. */
export default function Ticker() {
  return (
    <div
      className="overflow-hidden border-y rule-hair bg-sheet-2 py-2"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sectors.map((s) => (
              <span key={`${copy}-${s}`} className="flex items-center">
                <span className="mono-label whitespace-nowrap px-6 text-ink-3">{s}</span>
                <span className="font-mono text-xs text-ink-3">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
