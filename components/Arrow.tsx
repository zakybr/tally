/* House arrow: single stroke, square caps, zero radius. Matches the mark, not a glyph. */
export default function Arrow({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M1.5 8h12M9.5 4l4 4-4 4" />
    </svg>
  );
}
