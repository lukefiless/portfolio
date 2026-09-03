/**
 * OPERATIONS — THE WORK THAT IS NOT CODE
 *
 * The last page of the run, and the one that is an ARGUMENT rather than an
 * inventory. Sec lists what has to hold. Dev shows what got built. This one
 * makes a claim the other two cannot: that the same person can plan the
 * seminar, fill the room, run the day, and put every name that walks out of it
 * back into the system — which is sales work, said out loud.
 *
 * WHY IT IS A STATEMENT AND A LIST OF AREAS
 *
 * A claim needs to be stated, and then it needs to be shown to be WORK rather
 * than an enthusiasm. So the page is asymmetric: the claim is set large down
 * the left, where a headline goes, and the right is what the claim actually
 * consists of — the areas, on a rail, each with the thing that is genuinely
 * owned in it. Read left to right it says "I will do this", and then "here is
 * what doing it means on a Tuesday".
 *
 * THE RAIL IS NOT NUMBERED, AND THAT IS THE POINT
 *
 * It was: five stages of a client event, 01 through 05, which read as a
 * process because it was one. But the page is no longer about running events —
 * that is one item on it now, next to answering the phone and owning the
 * support queue. Numbering a set of concurrent responsibilities says they
 * happen in an order, which is a claim the page is not making. Marks on the
 * rail say "these, all of them", which is.
 *
 * That also makes it the third distinct shape in three pages. The run is one
 * word being examined a part at a time (see `PageHead`), and under the rule
 * the three pages have nothing in common at all — a shelf, a sheet, and this.
 *
 * The content is DATA, in `slides.ts`. Edit it there.
 */

import { BACKGROUND, TEXT } from "./palette";
import PageHead from "./PageHead";
import type { DevSecOpsPart } from "./DevSecOpsHeader";

/** One area of the job, on the rail. */
export interface OpsArea {
  /** The area, in two or three words. Set bold. */
  label: string;

  /** What is actually done in it. One line; two at most. */
  note: string;
}

interface Props {
  visible: boolean;

  /** Which third of "DevSecOps" this page is. See `PageHead`. */
  part?: DevSecOpsPart;

  /** The page's headline, used only when `part` is absent. */
  title: string;

  /** One line under the heading. */
  lede: string;

  /** The claim, set large down the left. This is the pitch. */
  claim: string;

  /** A short paragraph under the claim, backing it up. Empty omits it. */
  support: string;

  /** The areas. Five is what the rail is drawn for; more is fine. */
  areas: readonly OpsArea[];

  /** The closing line, under a rule at the foot. Empty omits both. */
  note: string;

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

const RULE = `${TEXT}24`;

export default function OpsPanel({
  visible,
  part,
  title,
  lede,
  claim,
  support,
  areas,
  note,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label="Operations"
      style={{
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
      }}
    >
      <style>
        {`
          /*
           * THE CLAIM ON THE LEFT, THE ARC ON THE RIGHT.
           *
           * Deliberately uneven. An even split would read as two lists of
           * equal weight; the point of the page is that one statement is being
           * SUPPORTED by what is next to it, and the proportions have to say
           * so before either is read.
           */
          .ops-body {
            flex: 1;
            display: flex;
            align-items: flex-start;
            gap: clamp(28px, 5vw, 96px);
            padding-top: clamp(4px, 1.2vh, 16px);
          }

          .ops-claim { flex: 0 1 34%; }

          .ops-arc { flex: 1; min-width: 0; }

          /* Stacked on anything too narrow to hold two columns of prose. */
          @media (max-width: 900px) {
            .ops-body { flex-direction: column; gap: clamp(18px, 3vh, 32px); }
            .ops-claim { flex: none; }
            .ops-arc { width: 100%; }
          }

          /*
           * THE RAIL.
           *
           * One hairline down the left of the list, with a mark on it beside
           * every area — which is what makes five paragraphs read as one job
           * with five sides to it rather than as five paragraphs. Each mark
           * carries a ring of the page's own ground, so the rail looks
           * threaded through them instead of drawn over.
           */
          .ops-run {
            --ops-rail: clamp(30px, 3.2vw, 54px);

            list-style: none;
            margin: 0;
            padding: 0 0 0 var(--ops-rail);
            border-left: 1px solid ${RULE};

            display: flex;
            flex-direction: column;

            /*
             * TIGHT, and it has to be. Five areas with a two-line note each
             * is most of the page's height before the head and the footnote
             * are counted — measured, the first pass ran sixty pixels past the
             * bottom of a 810-line frame and the closing line went under the
             * corner mark. The page cannot scroll, so the rail gives.
             */
            gap: clamp(9px, 1.7vh, 22px);
          }

          .ops-area { position: relative; }

          .ops-area::before {
            content: "";

            position: absolute;
            left: calc(-1 * var(--ops-rail));
            top: .5em;
            transform: translateX(-50%);

            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: ${accent};

            /*
             * The ring is the mask. A dot alone sits ON the hairline and the
             * line runs straight through it; a ring of the page's ground the
             * same colour as the paper breaks the rule either side, which is
             * what makes the mark look threaded onto it.
             */
            box-shadow: 0 0 0 5px ${BACKGROUND};
          }

          .ops-label {
            margin: 0;
            font-size: calc(clamp(.98rem, 1.5vw, 1.22rem) * var(--ops-type));
            font-weight: 650;
            letter-spacing: -.025em;
            line-height: 1.2;
          }

          .ops-note {
            margin: .18rem 0 0;
            max-width: 68ch;
            font-size: calc(clamp(.78rem, 1.02vw, .92rem) * var(--ops-type));
            line-height: 1.5;
            opacity: .66;
          }

          /*
           * ONE authored moment, and the same one the other two pages use:
           * the content arrives in reading order, at the same tempo, so
           * stepping between the three does not change the pace.
           */
          @keyframes ops-in {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .ops-claim, .ops-area {
            animation: ops-in 520ms cubic-bezier(.2, .8, .2, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .ops-claim, .ops-area {
              animation-duration: 1ms;
              animation-delay: 0ms !important;
            }
          }
        `}
      </style>

      <PageHead part={part} title={title} lede={lede} accent={accent} />

      <div
        className="ops-body"
        style={
          {
            /*
             * The one density knob on this page. A rail of six or seven areas
             * has to set tighter than a rail of four, and it is a step rather
             * than a slide so every edit does not produce a slightly different
             * type size — same reasoning as `density` in `SecurityPanel`.
             */
            "--ops-type": areas.length > 5 ? 0.88 : 0.95,
          } as React.CSSProperties
        }
      >
        <div className="ops-claim">
          {/*
           * The pitch, set at headline weight. It is a claim about a person
           * rather than a description of a page, so it gets the size a claim
           * gets — and nothing else on this half of the frame competes.
           */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(1.3rem, min(2.3vw, 4vh), 2.05rem)",
              fontWeight: 650,
              letterSpacing: "-.035em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            {claim}
          </p>

          {support && (
            <p
              style={{
                margin: "clamp(10px, 1.6vh, 18px) 0 0",
                maxWidth: "42ch",
                fontSize: "clamp(.82rem, 1.05vw, .95rem)",
                lineHeight: 1.55,
                opacity: 0.7,
              }}
            >
              {support}
            </p>
          )}
        </div>

        {/*
         * A `ul`, not an `ol`. These are sides of one job rather than steps of
         * one process — see the note at the top on why the rail lost its
         * numbers — and the list type is the part a screen reader hears.
         */}
        <ul className="ops-arc ops-run">
          {areas.map((area, index) => (
            <li
              key={`${area.label}-${index}`}
              className="ops-area"
              style={{ animationDelay: `${120 + Math.min(index, 8) * 70}ms` }}
            >
              <h2 className="ops-label">{area.label}</h2>
              {area.note && <p className="ops-note">{area.note}</p>}
            </li>
          ))}
        </ul>
      </div>

      {note && (
        <footer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, .9vh, 10px)",
            marginTop: "auto",
            paddingTop: "clamp(10px, 2vh, 26px)",
            flexShrink: 0,
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
