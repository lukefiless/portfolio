/**
 * THE DRAWING
 *
 * A flat, cartoon drafting sheet laid over the canvas on the left of the "own
 * the systems" slide. What it specifies — a robot — is standing built and
 * working on the right, rendered in three dimensions by `ownedAct`.
 *
 * Drawn flat and drawn in SVG on purpose. A blueprint is hairlines, grid
 * paper, dimension callouts and a title block; every one of those is native
 * to SVG at any resolution, and every one has to be faked with geometry in a
 * 3D scene — geometry that then catches the stage lighting and stops looking
 * like paper. The earlier 3D attempt read as a second object standing beside
 * the first, which is exactly what a drawing must not be.
 *
 * The palette is deliberately NOT the deck's. Everywhere else is near-black
 * with one accent; this is a bright blue sheet with warm drafting tools on
 * it, because the one thing the slide has to say instantly is "this is a
 * drawing, and the thing beside it is what the drawing produced". A sheet
 * rendered in the deck's own colours would read as another dark diagram.
 *
 * The robot draws itself in, holds, and starts again. Nothing here is a
 * before and after — it is a loop, because the point is not that we drew it
 * once but that we can always redraw it.
 */

import { useId } from "react";

/*
 * Cropped to the sheet. With the drafting tools and the field behind them
 * gone there was a third of the box carrying nothing, and an SVG scaled to
 * fit its container spends that emptiness making the drawing smaller.
 */
const VIEW = { x: 40, y: 52, w: 416, h: 332 };

const SHEET = { x: 62, y: 74, w: 384, h: 286 };

/** Flat cartoon palette, fixed. See the note above on why it ignores accent. */
const PAPER = "#4E9BE0";
const PAPER_BACK = "#3576BC";
const INK = "#FFFFFF";

interface Props {
  visible: boolean;
}

export default function BlueprintPanel({ visible }: Props) {
  /*
   * Ids have to be unique per instance or a second copy of this component
   * would capture the first one's pattern and clip references.
   */
  const uid = useId().replace(/:/g, "");

  const grid = `grid-${uid}`;
  const clip = `clip-${uid}`;
  const draw = `draw-${uid}`;

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 2,
        left: "clamp(20px, 4vw, 80px)",
        top: "50%",
        transform: "translateY(-56%)",
        width: "min(520px, 42vw)",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <pattern
            id={grid}
            width="19"
            height="19"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M19 0 H0 V19"
              fill="none"
              stroke={INK}
              strokeOpacity="0.42"
              strokeWidth="1"
            />
          </pattern>

          <clipPath id={clip}>
            <rect
              x={SHEET.x}
              y={SHEET.y}
              width={SHEET.w}
              height={SHEET.h}
              rx="4"
            />
          </clipPath>

          {/*
            The draw-on. Every outline shares one dash cycle, so the robot
            appears to be drafted in a single pass rather than assembling
            itself out of parts that arrive separately.
          */}
          <style>{`
            @keyframes ${draw} {
              0%   { stroke-dashoffset: 900; }
              45%  { stroke-dashoffset: 0; }
              88%  { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 900; }
            }
            .${draw} {
              stroke-dasharray: 900;
              animation: ${draw} 11s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .${draw} { animation: none; stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* Dashed corner mark, the way a cutting guide is shown. */}
        <path
          d="M74 96 V60 H150"
          fill="none"
          stroke={INK}
          strokeOpacity="0.85"
          strokeWidth="5"
          strokeDasharray="15 12"
          strokeLinecap="round"
        />

        {/* The sheet, with the fold showing behind it. */}
        <rect
          x={SHEET.x - 14}
          y={SHEET.y + 14}
          width={SHEET.w}
          height={SHEET.h}
          rx="10"
          fill={PAPER_BACK}
        />

        <rect
          x={SHEET.x}
          y={SHEET.y}
          width={SHEET.w}
          height={SHEET.h}
          rx="4"
          fill={PAPER}
        />

        <g clipPath={`url(#${clip})`}>
          <rect
            x={SHEET.x}
            y={SHEET.y}
            width={SHEET.w}
            height={SHEET.h}
            fill={`url(#${grid})`}
          />
        </g>

        {/* ------------------------------------------------ the figure */}

        {/*
          The deck's own procedural figure, drafted. Every mark here has a
          counterpart in `parts/figure.ts` — capsule limbs, a ball joint at
          every pivot, sphere hands and feet, and an egg head with no face.
          It is drawn to match because the thing standing beside this sheet
          IS this drawing; a generic robot made the two halves read as "a
          design and a thing" rather than "a design and THAT thing".
        */}
        <g
          className={draw}
          fill="none"
          stroke={INK}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath={`url(#${clip})`}
        >
          {/* Head. Egg rather than circle, and blank — a face would be a
              claim the figure itself does not make. */}
          <ellipse cx="188" cy="134" rx="26" ry="31" />

          {/* Neck joint. */}
          <circle cx="188" cy="168" r="9" />

          {/* Torso, a capsule. */}
          <rect x="161" y="178" width="54" height="52" rx="27" />

          {/* Pelvis joint. */}
          <circle cx="188" cy="230" r="11" />

          {/* Shoulders. */}
          <circle cx="155" cy="184" r="10" />
          <circle cx="221" cy="184" r="10" />

          {/* Upper arms, elbows, forearms, hands. */}
          <path d="M150 192 L142 218" />
          <path d="M226 192 L234 218" />
          <circle cx="140" cy="224" r="8" />
          <circle cx="236" cy="224" r="8" />
          <path d="M139 232 L136 254" />
          <path d="M237 232 L240 254" />
          <circle cx="135" cy="262" r="9" />
          <circle cx="241" cy="262" r="9" />

          {/* Hips, thighs, knees, shins, feet. */}
          <circle cx="172" cy="234" r="9" />
          <circle cx="204" cy="234" r="9" />
          <path d="M171 243 L168 278" />
          <path d="M205 243 L208 278" />
          <circle cx="167" cy="286" r="9" />
          <circle cx="209" cy="286" r="9" />
          <path d="M166 295 L165 322" />
          <path d="M210 295 L211 322" />
          <circle cx="164" cy="329" r="9" />
          <circle cx="212" cy="329" r="9" />
        </g>

        {/* Gears alongside, as a drafted detail callout. */}
        <g
          className={draw}
          fill="none"
          stroke={INK}
          strokeWidth="3.4"
          clipPath={`url(#${clip})`}
        >
          <circle cx="330" cy="196" r="26" />
          <circle cx="330" cy="196" r="9" />
          <circle cx="380" cy="238" r="20" />
          <circle cx="380" cy="238" r="7" />

          {/* Eight tick marks around the big gear, drawn as radial spokes. */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const r = (a * Math.PI) / 180;

            return (
              <path
                key={`g1-${a}`}
                d={`M${330 + Math.cos(r) * 26} ${196 + Math.sin(r) * 26} L${
                  330 + Math.cos(r) * 34
                } ${196 + Math.sin(r) * 34}`}
                strokeLinecap="round"
              />
            );
          })}

          {/* Six ticks around the smaller gear. Fewer teeth reads as a faster wheel. */}
          {[0, 60, 120, 180, 240, 300].map(a => {
            const r = (a * Math.PI) / 180;

            return (
              <path
                key={`g2-${a}`}
                d={`M${380 + Math.cos(r) * 20} ${238 + Math.sin(r) * 20} L${
                  380 + Math.cos(r) * 27
                } ${238 + Math.sin(r) * 27}`}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Dimension lines, the detail that makes it a drawing not a picture. */}
        <g
          stroke={INK}
          strokeOpacity="0.9"
          strokeWidth="2"
          fill="none"
          clipPath={`url(#${clip})`}
        >
          <path d="M120 134 V332" />
          <path d="M113 134 H127" />
          <path d="M113 332 H127" />

          <path d="M135 348 H241" />
          <path d="M135 341 V355" />
          <path d="M241 341 V355" />
        </g>

        <g
          fill={INK}
          fontFamily='"SF Mono", Menlo, Consolas, monospace'
          fontSize="13"
          letterSpacing="1"
          clipPath={`url(#${clip})`}
        >
          <text
            x="98"
            y="248"
            transform="rotate(-90 98 248)"
            textAnchor="middle"
          >
            1840
          </text>
          <text x="188" y="370" textAnchor="middle">
            1060
          </text>
        </g>
      </svg>
    </div>
  );
}
