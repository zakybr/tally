/*
  Site intro, after tracta.co.nz. Plays on every page load, refresh and page
  change (SiteChrome remounts it per pathname; the admin portal never gets it).

  An orange screen with the Tally mark drawn in charcoal. The cross-stroke
  strikes through, then the view dives slowly into the first stroke and, as it
  goes, the charcoal marks fade to clear: each stroke becomes a window onto the
  page loading behind it, until the first one fills the screen.

  Built without SVG masks, which Safari animates unreliably: the sheet is one
  even-odd orange path with four stroke-shaped holes; each hole is covered by a
  mark group (an orange cap under a charcoal stroke) that fades out during the
  dive; the dive itself is a CSS transform on the <svg> element. Every layer
  ends hidden on its own and the intro never takes pointer events.

  INTRO_SKIP runs inline in <head> before first paint. For reduced motion it
  sets data-intro="calm": the mark simply shows, clears to windows and the
  sheet fades, with no dive.

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

export default function Intro() {
  return (
    <div id="intro" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
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
    </div>
  );
}
