/* One drawn set, one stroke weight, one grid. No glyphs standing in for icons. */
const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconDashboard() {
  return (
    <svg {...base}>
      <rect x="2" y="2" width="5" height="5" />
      <rect x="9" y="2" width="5" height="5" />
      <rect x="2" y="9" width="5" height="5" />
      <rect x="9" y="9" width="5" height="5" />
    </svg>
  );
}

export function IconTasks() {
  return (
    <svg {...base}>
      <rect x="2" y="2.5" width="11" height="11" />
      <path d="M5 8.2 7.1 10.3 11 5.9" />
    </svg>
  );
}

export function IconNotes() {
  return (
    <svg {...base}>
      <path d="M3.5 2h6L12.5 5v9h-9z" />
      <path d="M9.2 2v3.2h3.1" />
      <path d="M5.6 9h4.8M5.6 11.4h3.2" />
    </svg>
  );
}

/* The mark itself, reduced, brand lives in the details. */
export function IconBrand() {
  return (
    <svg {...base}>
      <path d="M4 3.4v9.2M7 3.4v9.2M10 3.4v9.2" />
      <path d="M2.4 11.6 12.6 4.4" />
    </svg>
  );
}

export function IconTeam() {
  return (
    <svg {...base}>
      <circle cx="6" cy="5.6" r="2.3" />
      <path d="M2.2 13.4c0-2.2 1.7-3.6 3.8-3.6s3.8 1.4 3.8 3.6" />
      <path d="M10.6 4.1a2.3 2.3 0 0 1 0 4.4M11.4 10.2c1.4.4 2.4 1.6 2.4 3.2" />
    </svg>
  );
}
