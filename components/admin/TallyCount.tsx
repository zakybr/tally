/*
  The product counts. So it counts in tally marks, four strokes and the
  amber cross-stroke, the same geometry as the logo. Groups of five.
*/
const GROUP_W = 26;
const GAP = 7;

/*
  One group is one mark: four uprights plus the diagonal fifth. A part-filled
  group keeps its shape and dims the strokes not yet counted, so five always
  reads as five.
*/
function Group({
  size,
  filled,
  tone,
  dim,
}: {
  size: number;
  filled: number;
  tone: string;
  dim: string;
}) {
  const uprights = [3, 9.5, 16, 22.5].slice(0, Math.min(size, 4));
  return (
    <svg
      width={GROUP_W}
      height={24}
      viewBox="0 0 26 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      {uprights.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="3"
          x2={x}
          y2="21"
          stroke={i < filled ? tone : dim}
          strokeWidth="2.5"
        />
      ))}
      {size === 5 && (
        <line
          x1="-0.5"
          y1="19"
          x2="25.5"
          y2="5"
          stroke={filled === 5 ? "var(--accent)" : dim}
          strokeWidth="2.5"
        />
      )}
    </svg>
  );
}

export default function TallyCount({
  value,
  total,
  tone = "var(--ink)",
  dim = "rgba(245,242,234,0.14)",
  max = 40,
  label,
}: {
  value: number;
  total?: number;
  tone?: string;
  dim?: string;
  max?: number;
  label: string;
}) {
  const target = Math.min(total ?? value, max);
  const filled = Math.min(value, target);

  const groups: { size: number; filled: number }[] = [];
  for (let drawn = 0; drawn < target; drawn += 5) {
    const size = Math.min(5, target - drawn);
    groups.push({ size, filled: Math.max(0, Math.min(size, filled - drawn)) });
  }

  const overflow = (total ?? value) > max;

  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex items-end"
      style={{ gap: GAP }}
    >
      {groups.map((g, i) => (
        <Group key={i} size={g.size} filled={g.filled} tone={tone} dim={dim} />
      ))}
      {overflow && (
        <span className="mono-label tnum self-center pl-1 text-[10px] text-[var(--ink-3)]">
          +{(total ?? value) - max}
        </span>
      )}
    </span>
  );
}
