/*
  Homepage intro, after tracta.co.nz: a charcoal screen with the Tally mark cut
  out of it as a window onto the film. Shutters over the four strokes slide
  open, the orange cross-stroke strikes through, then the whole sheet dives into
  the first stroke until it fills the screen and the page is simply there.

  Built without SVG masks, which Safari animates unreliably: the sheet is one
  even-odd path with four stroke-shaped holes, charcoal shutters cover the
  holes and scale away, and the zoom is a CSS transform on the <svg> element.
  Every layer ends hidden on its own, so nothing waits on JavaScript.

  INTRO_SKIP runs inline in <head> before first paint and sets data-intro on
  <html>: "off" after the first homepage view of a session (or on any other
  page), "calm" for reduced motion, which gets a still mark and a fade instead
  of the dive. The intro never takes pointer events.

  Geometry follows TallyMark (viewBox 0 0 26 24, strokes at x 3/9.5/16/22.5,
  y 3 to 21, width 2.5), scaled by 7 into a 1600x1000 frame sliced to cover.
*/

export const INTRO_SKIP = `try{var d=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("tally-intro")){d.setAttribute("data-intro","off")}else{sessionStorage.setItem("tally-intro","1");if(matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-intro","calm")}}catch(e){document.documentElement.setAttribute("data-intro","off")}`;

/* Stroke holes in frame units: x = 712.5 + (cx - 1.25) * 7, y 437, 17.5 x 126. */
const HOLES = [724.75, 770.25, 815.75, 861.25];
const SHEET =
  "M0 0H1600V1000H0Z " + HOLES.map((x) => `M${x} 437h17.5v126h-17.5z`).join(" ");

export default function Intro() {
  return (
    <div id="intro" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <path d={SHEET} fill="#17191c" fillRule="evenodd" />
        {HOLES.map((x, i) => (
          <rect
            key={x}
            className="intro-shutter"
            style={{ animationDelay: `${150 + i * 110}ms` }}
            x={x - 0.5}
            y="436.5"
            width="18.5"
            height="127"
            fill="#17191c"
          />
        ))}
        <line className="intro-slash" x1="709" y1="549" x2="891" y2="451" stroke="#ff4a1c" strokeWidth="17.5" />
      </svg>
    </div>
  );
}
