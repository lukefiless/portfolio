/**
 * WHAT I BUILD
 *
 * The Dev page, and the only one in the run that is a set of OBJECTS rather
 * than a table. Sec is compliance and Ops is operations — both are lists of
 * things that must be true, and a ruled sheet is the honest shape for that.
 * This one is a shelf of things that were made, so it is drawn as what they
 * actually are: apps, with an icon and a name under each.
 *
 * WHY THE PAGES ARE ALLOWED TO DIFFER
 *
 * They share the head — the same word, the same discipline line, the same
 * rule, at the same size and the same height on the page (see `PageHead`) —
 * and diverge completely below it. That is the arrangement that makes three
 * slides read as three chapters of one document instead of three copies of
 * one template: the identity is in the masthead, not in the body.
 *
 * THE SHAPES ARE PRINTED, NOT SKEUOMORPHIC
 *
 * A home-screen tile with a gradient and a soft shadow would be the only
 * thing in this deck pretending to be a screenshot. These are the same object
 * drawn the way the rest of the document is drawn: a hairline rule, ink at
 * low alpha for the ground, and a line icon set in the deck's own ink with
 * one detail carrying the accent. It reads as an app without leaving the page.
 *
 * The content is DATA, in `slides.ts`. Edit it there.
 */

import { TEXT } from "./palette";
import PageHead from "./PageHead";
import type { DevSecOpsPart } from "./DevSecOpsHeader";

/**
 * Which drawing goes in the tile.
 *
 * A closed set rather than free SVG in the data, so a slide cannot carry
 * markup and every icon is drawn to the same weight and the same grid. To add
 * one: add its key here and its path in `ICONS` below.
 */
export type AppIcon =
  | "fit"
  | "referral"
  | "meeting"
  | "pipeline"
  | "ai"
  | "app";

/** One tile: a drawing and the name under it. */
export interface AppTile {
  /** The name under the tile. Keep it to two or three words. */
  label: string;

  /** Which drawing goes inside the shape. */
  icon: AppIcon;
}

interface Props {
  visible: boolean;

  /** Which third of "DevSecOps" this page is. See `PageHead`. */
  part?: DevSecOpsPart;

  /** The page's headline, used only when `part` is absent. */
  title: string;

  /** One line under the heading. */
  lede: string;

  /** Five is what the layout is drawn for: three across, then two centred. */
  apps: readonly AppTile[];

  /** Footnote under the shelf. Empty omits the rule and the line. */
  note: string;

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

const RULE = `${TEXT}24`;

/**
 * The drawings.
 *
 * All on a 48-unit grid, all stroked rather than filled, so they hold the
 * same weight at any tile size and take their colour from the tile — which is
 * what `currentColor` is doing. The one element in each that carries the
 * accent is marked with `data-accent`, and the stylesheet colours it: an icon
 * that is entirely one ink reads as a glyph, and one with a single coloured
 * detail reads as a thing that is running.
 */
const ICONS: Record<AppIcon, React.ReactNode> = {
  /* A dumbbell, square on. */
  fit: (
    <>
      <path d="M14 24h20" />
      <path d="M11 17v14M17 14.5v19" data-accent />
      <path d="M37 17v14M31 14.5v19" />
      <path d="M6.5 20.5v7M41.5 20.5v7" />
    </>
  ),

  /* One node branching into two — a referral, as a shape. */
  referral: (
    <>
      <circle cx="12" cy="24" r="4.5" />
      <circle cx="36" cy="13" r="4.5" data-accent />
      <circle cx="36" cy="35" r="4.5" />
      <path d="M16 22 32 15M16 26l16 7" />
    </>
  ),

  /* A microphone on its stand, with the room listening. */
  meeting: (
    <>
      <rect x="19" y="7" width="10" height="18" rx="5" />
      <path d="M13.5 21.5a10.5 10.5 0 0 0 21 0" data-accent />
      <path d="M24 32v7M18 39h12" />
    </>
  ),

  /* A store, a run of pipe, and something coming out the far end. */
  pipeline: (
    <>
      <ellipse cx="13" cy="13" rx="7.5" ry="3.5" />
      <path d="M5.5 13v8c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5v-8" />
      <path d="M13 30v6h20" />
      <path d="m28 31 5 5-5 5" data-accent />
    </>
  ),

  /* A spark. The one icon on the page everybody already reads as this. */
  ai: (
    <>
      <path
        d="M20 8c0 6.6 5.4 12 12 12-6.6 0-12 5.4-12 12 0-6.6-5.4-12-12-12 6.6 0 12-5.4 12-12Z"
        data-accent
      />
      <path d="M36 27c0 3.3 2.7 6 6 6-3.3 0-6 2.7-6 6 0-3.3-2.7-6-6-6 3.3 0 6-2.7 6-6Z" />
    </>
  ),

  /* The fallback: a window. For a tile whose drawing is not decided yet. */
  app: (
    <>
      <rect x="8" y="10" width="32" height="28" rx="4" />
      <path d="M8 18h32" />
      <path d="M13 14h.01M18 14h.01" data-accent />
    </>
  ),
};

export default function AppsPanel({
  visible,
  part,
  title,
  lede,
  apps,
  note,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label="What I build"
      style={
        {
          /*
           * The tile size and the gaps between them live here, in one place:
           * the shelf's width is derived from both — see the stylesheet.
           */
          "--apps-tile": "clamp(140px, 15vw, 220px)",
          "--apps-gap": "clamp(20px, 3.4vw, 64px)",
          "--apps-row-gap": "clamp(18px, 3vh, 44px)",

          position: "absolute",
          inset: 0,
          zIndex: 3,
          overflow: "hidden",

          /* Clicks pass through to the slide advance. Nothing here is live. */
          pointerEvents: "none",

          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2.4vh, 30px)",

          /*
           * The same top padding as every other page in the run, and a bottom
           * one deep enough to clear the corner mark — see the long note in
           * `SecurityPanel`. Every page in the run has to agree on the first
           * number or the heading moves between slides.
           */
          justifyContent: "flex-start",
          padding:
            "clamp(24px, 4vw, 72px) clamp(28px, 5vw, 92px) clamp(72px, 14vh, 160px)",
          color: TEXT,
        } as React.CSSProperties
      }
    >
      <style>
        {`
          /*
           * THREE, THEN TWO — CENTRED.
           *
           * A three-column grid would put the last two tiles under the first
           * two and leave a hole on the right, which reads as a row somebody
           * forgot to finish. Wrapping flex items at a third of the width
           * each fills the first row and centres whatever is left over, so
           * five tiles land as 3 + 2 and six would land as 3 + 3 without the
           * layout being told which case it is in.
           */
          .apps-shelf {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            flex: 1;
            gap: var(--apps-row-gap) var(--apps-gap);

            /*
             * THE ROW IS EXACTLY THREE TILES WIDE, and that is what does the
             * wrapping. Left to the full width of the page, five tiles of this
             * size fit on one line — measured, on a 1440 frame — and the page
             * came out as a single strip with the shelf's whole shape lost.
             * Capping the shelf at three tiles plus the two gaps between them
             * forces the break after the third and centres what is left, with
             * no rule anywhere that says "five".
             */
            width: calc(3 * var(--apps-tile) + 2 * var(--apps-gap));
            max-width: 100%;
            margin: 0 auto;
          }

          .apps-tile {
            flex: 0 0 auto;
            width: var(--apps-tile);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(8px, 1.4vh, 16px);
          }

          /*
           * THE APP SHAPE.
           *
           * A square with a corner radius near a quarter of its side, which is
           * the proportion the eye reads as an app icon rather than as a
           * rounded box. Everything else about it is this document: a hairline
           * rule and a wash of the same ink the type is set in.
           */
          .apps-shape {
            position: relative;
            width: 100%;
            aspect-ratio: 1;
            border-radius: 24%;
            border: 1px solid ${RULE};
            background: ${TEXT}0A;
            display: grid;
            place-items: center;
          }

          .apps-shape svg {
            width: 46%;
            height: 46%;
            overflow: visible;
            fill: none;
            stroke: currentColor;
            stroke-width: 2.6;
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: .82;
          }

          /* The one detail per drawing that is not ink. See ICONS. */
          .apps-shape svg [data-accent] {
            stroke: ${accent};
            opacity: 1;
          }

          .apps-label {
            font-size: clamp(.86rem, 1.15vw, 1.06rem);
            font-weight: 620;
            letter-spacing: -.01em;
            line-height: 1.25;
            text-align: center;
            text-wrap: balance;
          }

          /*
           * ONE authored moment, and the same one the table on the Sec page
           * uses: the shelf fills in reading order. Same curve, same stagger,
           * so stepping between the two pages does not change the tempo.
           */
          @keyframes apps-tile-in {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .apps-tile {
            animation: apps-tile-in 520ms cubic-bezier(.2, .8, .2, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .apps-tile { animation-duration: 1ms; animation-delay: 0ms !important; }
          }

          @media (max-width: 760px) {
            .apps-shelf { --apps-tile: clamp(112px, 26vw, 160px); }
          }
        `}
      </style>

      <PageHead part={part} title={title} lede={lede} accent={accent} />

      <div className="apps-shelf">
        {apps.map((app, index) => (
          <article
            key={`${app.label}-${index}`}
            className="apps-tile"
            style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
          >
            <div className="apps-shape" aria-hidden="true">
              <svg viewBox="0 0 48 48">{ICONS[app.icon] ?? ICONS.app}</svg>
            </div>

            <div className="apps-label">{app.label}</div>
          </article>
        ))}
      </div>

      {note && (
        <footer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, .9vh, 10px)",
            marginTop: "auto",
            paddingTop: "clamp(10px, 2vh, 26px)",
          }}
        >
          <div aria-hidden="true" style={{ height: 1, background: RULE }} />

          <p
            style={{
              margin: 0,
              maxWidth: "88ch",
              fontSize: "clamp(.74rem, .98vw, .88rem)",
              lineHeight: 1.5,
              opacity: 0.78,
            }}
          >
            {note}
          </p>
        </footer>
      )}
    </section>
  );
}
