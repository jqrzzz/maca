/**
 * Brand splash — a brief, calming intro on the first load of a session.
 *
 * Mission cue: the prism mark settles in and "breathes" inside a warm,
 * dawn-like glow, with a single soft pulse of light radiating outward — life,
 * warmth, and hope returning — then the screen fades to reveal the site.
 *
 * - Shown once per session; skipped entirely for `prefers-reduced-motion`.
 * - Pure CSS animation. The inline guard runs before paint, so repeat views
 *   (and reduced-motion visitors) never see a flash.
 * - It's an overlay: the page underneath is fully server-rendered, so this has
 *   no SEO or content cost.
 */
const GUARD = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('prasm:splash')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('prasm-splash-skip');}else{sessionStorage.setItem('prasm:splash','1');}}catch(e){}})();`;

export function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      <div className="prasm-splash" aria-hidden="true">
        <div className="prasm-splash__stage">
          <div className="prasm-splash__markwrap">
            <span className="prasm-splash__glow" />
            <span className="prasm-splash__ring" />
            <svg
              className="prasm-splash__mark"
              viewBox="0 0 40 40"
              width="104"
              height="104"
            >
              <polygon points="20,6 6,34 34,34" fill="#e78b2e" />
              <polygon points="20,6 6,34 20,24.67" fill="#f2a85a" />
              <polygon points="6,34 34,34 20,24.67" fill="#c46a1c" />
              <g
                stroke="#c46a1c"
                strokeWidth="0.6"
                strokeLinejoin="round"
                opacity="0.5"
              >
                <line x1="20" y1="6" x2="20" y2="24.67" />
                <line x1="6" y1="34" x2="20" y2="24.67" />
                <line x1="34" y1="34" x2="20" y2="24.67" />
              </g>
            </svg>
          </div>
          <span className="prasm-splash__word">PRASM</span>
        </div>
      </div>
    </>
  );
}
