/* Brand mark: four tally strokes and the amber cross-stroke. */
export default function TallyMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size * (26 / 24)}
      height={size}
      viewBox="0 0 26 24"
      fill="none"
      aria-hidden="true"
    >
      <line x1="3" y1="3" x2="3" y2="21" stroke="#ffffff" strokeWidth="2.5" />
      <line x1="9.5" y1="3" x2="9.5" y2="21" stroke="#ffffff" strokeWidth="2.5" />
      <line x1="16" y1="3" x2="16" y2="21" stroke="#ffffff" strokeWidth="2.5" />
      <line x1="22.5" y1="3" x2="22.5" y2="21" stroke="#ffffff" strokeWidth="2.5" />
      <line x1="-0.5" y1="19" x2="25.5" y2="5" stroke="#d9711a" strokeWidth="2.5" />
    </svg>
  );
}
