/*
  Site intro, after tracta.co.nz. Plays on every page load, refresh and page
  change (SiteChrome remounts it per pathname; the admin portal never gets it).

  An orange screen with the Tally mark drawn in charcoal. The cross-stroke
  strikes through, then the view dives into the centre of the mark with motion
  blur while the charcoal strokes clear to windows onto the page loading behind,
  and the screen fades as the dive finishes.

  Motion blur: CSS has no zoom blur, so the sheet is drawn seven times. The top
  copy is the real one; six softened ghosts sit behind it, each fainter and
  starting its dive a frame or so later. Before the dive they line up exactly and nothing
  shows; during it they trail the edges of the opening strokes, which reads as
  zoom blur.

  Built without SVG masks, which Safari animates unreliably: each sheet is one
  even-odd orange path with four stroke-shaped holes, each hole covered by a
  mark group (an orange cap under a charcoal stroke) that fades during the
  dive, and the dive is a CSS transform on the <svg> element. Every layer ends
  hidden on its own and the intro never takes pointer events.

  INTRO_SKIP runs inline in <head> before first paint. For reduced motion it
  sets data-intro="calm": the mark simply shows, clears to windows and the
  sheet fades, with no dive and no ghosts.

  Geometry follows TallyMark (viewBox 0 0 26 24, strokes at x 3/9.5/16/22.5,
  y 3 to 21, width 2.5), scaled by 7 into a 1600x1000 frame sliced to cover.
*/

export const INTRO_SKIP = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-intro","calm")}catch(e){}`;

const ORANGE = "#ff4a1c";
const CHARCOAL = "#17191c";

/* Stroke holes in frame units: x = 712.5 + (cx - 1.25) * 7, y 437, 17.5 x 126. */
const HOLES = [724.75, 770.25, 815.75, 861.25];
const SHEET =
  "M0 0H1600V1000H0Z " + HOLES.map((x) => `M${x} 437h17.5v126h-17.5z`).join(" ");

/* Ghost lag behind the real sheet, ms, and opacity. Furthest back first, so the real sheet paints last. */
const GHOSTS = [
  { lag: 120, opacity: 0.08 },
  { lag: 100, opacity: 0.1 },
  { lag: 80, opacity: 0.13 },
  { lag: 60, opacity: 0.16 },
  { lag: 40, opacity: 0.2 },
  { lag: 20, opacity: 0.25 },
];

function Sheet({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <path d={SHEET} fill={ORANGE} fillRule="evenodd" />
      {HOLES.map((x, i) => (
        <g key={x} className="intro-mark" style={{ animationDelay: `${1450 + i * 90}ms` }}>
          <rect x={x - 0.5} y="436.5" width="18.5" height="127" fill={ORANGE} />
          <rect
            className="intro-bar"
            style={{ animationDelay: `${120 + i * 110}ms` }}
            x={x - 0.5}
            y="436.5"
            width="18.5"
            height="127"
            fill={CHARCOAL}
          />
        </g>
      ))}
      <line className="intro-slash" x1="709" y1="549" x2="891" y2="451" stroke={CHARCOAL} strokeWidth="17.5" />
    </svg>
  );
}

export default function Intro() {
  return (
    <div id="intro" aria-hidden="true">
      {GHOSTS.map((g) => (
        <Sheet
          key={g.lag}
          className="intro-sheet intro-ghost"
          style={{ opacity: g.opacity, animationDelay: `${1350 + g.lag}ms` }}
        />
      ))}
      <Sheet className="intro-sheet" />
    </div>
  );
}
