/*
  Brand mark: four tally strokes and the accent cross-stroke.

  Geometry is locked and must not be redrawn. The four strokes stay pure white
  per the brand lockup rule. Only the cross-stroke reads from the accent token:
  it was still the old #d9711a after the accent moved to #ff4a1c, which put two
  different oranges an inch apart in the header.
*/
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
      <line x1="-0.5" y1="19" x2="25.5" y2="5" stroke="var(--signal)" strokeWidth="2.5" />
    </svg>
  );
}
