/*
  Homepage intro, after tracta.co.nz: a charcoal screen with the Tally mark cut
  out of it as a window onto the film. The four strokes draw in, the orange
  cross-stroke strikes through, then the view dives into the first stroke until
  it fills the screen and the page is simply there.

  Pure CSS plus INTRO_SKIP, a beforeInteractive script in the root layout, so it plays before React hydrates and needs no
  JavaScript to get out of the way: every layer ends hidden on its own. It plays
  once per browser session, never for reduced motion, and it never takes
  pointer events, so nothing underneath is ever blocked.

  Geometry follows TallyMark (viewBox 0 0 26 24, strokes at x 3/9.5/16/22.5,
  y 3 to 21, width 2.5), scaled by 7 and centred in a 1600x1000 frame that is
  sliced to cover any viewport.
*/

export const INTRO_SKIP = `try{var d=document.documentElement;if(location.pathname!=="/"){}else if(sessionStorage.getItem("tally-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","off")}else{sessionStorage.setItem("tally-intro","1")}}catch(e){document.documentElement.setAttribute("data-intro","off")}`;

const BARS = [3, 9.5, 16, 22.5];

export default function Intro() {
  return (
    <div id="intro" aria-hidden="true">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="intro-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
              <rect width="1600" height="1000" fill="#fff" />
              <g className="intro-zoom">
                <g transform="translate(712.5 416) scale(7)">
                  {BARS.map((x, i) => (
                    <rect
                      key={x}
                      className="intro-bar"
                      style={{ animationDelay: `${150 + i * 110}ms` }}
                      x={x - 1.25}
                      y="3"
                      width="2.5"
                      height="18"
                      fill="#000"
                    />
                  ))}
                </g>
              </g>
            </mask>
          </defs>
          <rect width="1600" height="1000" fill="#17191c" mask="url(#intro-mask)" />
          <g transform="translate(712.5 416) scale(7)">
            <line
              className="intro-slash"
              x1="-0.5"
              y1="19"
              x2="25.5"
              y2="5"
              stroke="#ff4a1c"
              strokeWidth="2.5"
              pathLength={1}
            />
          </g>
        </svg>
    </div>
  );
}
