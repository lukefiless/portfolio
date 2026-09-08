/**
 * WHAT YOU CAN'T SEE
 *
 * A flat slide: the security and compliance work, as a ruled table. Every
 * other slide in this deck shows a thing running; this one shows the work
 * that only becomes visible when it fails, which is why it is a page to be
 * read rather than an act to be watched.
 *
 * WHY IT IS A TABLE AND NOT CARDS
 *
 * Cards would float six equal boxes on the ground and say nothing about how
 * they relate. This deck is made of paper — folders, clipped sheets, ink on a
 * tooth — and the honest object for "a list of controls and where each one
 * lives" is a printed spec sheet: hairline rules, columns that line up, no
 * shadows and no rounded containers. The rules do the work a border-box would
 * do, and cost nothing visually.
 *
 * HOW IT DIFFERS FROM THE OTHER FLAT PAGES
 *
 * `SynopsisPanel` and `MarketPanel` are both a heading over a centred column.
 * This one runs the table to the full width and tops each cell with its own
 * rule, so the grid reads as a sheet. Same ink, same accent, same type ramp —
 * a different page in the same document, which is the point.
 *
 * The content is DATA, in `slides.ts`. Edit it there; nothing about the
 * wording lives in this file.
 */

import type { SecurityMeasure } from "./slides";
import { TEXT } from "./palette";
import PageHead from "./PageHead";
import type { DevSecOpsPart } from "./DevSecOpsHeader";

interface Props {
  visible: boolean;

  /**
   * Which third of "DevSecOps" this page is, if any. See `DevSecOpsHeader`.
   * Set, it heads the page in place of `title`.
   */
  part?: DevSecOpsPart;

  /** The page's headline, used only when `part` is absent. */
  title: string;

  /** One line under it, explaining what the cells are. */
  lede: string;

  /** Six is what the layout is built around. */
  measures: readonly SecurityMeasure[];

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

/*
 * Rules, as the deck's ink at low alpha rather than a grey.
 *
 * A neutral grey rule on a warm paper ground reads as a different material —
 * the line has to be made of the same stuff as the type sitting next to it or
 * the sheet stops looking printed. Eight-digit hex, so both come straight off
 * the palette's one definition of ink.
 */
const RULE = `${TEXT}24`;
const RULE_FAINT = `${TEXT}16`;

/**
 * How tightly to set the sheet, from how much is on it.
 *
 * A slide cannot scroll — the presenter is not going to reach for a wheel
 * mid-sentence, and anything past the bottom edge may as well not have been
 * written. So the page has to absorb its own content: more controls means
 * more columns and a smaller setting, decided here rather than left to
 * whoever next adds a row.
 *
 * The steps are deliberately coarse. A scale that slid continuously with the
 * count would give every edit a slightly different type size and the deck
 * would stop looking like one document.
 */
function density(count: number) {
  if (count <= 6) {
    /* What the layout was drawn for: three across, comfortable. */
    return { columns: 3, type: 1, title: 1 };
  }

  if (count <= 8) {
    return { columns: 3, type: 0.92, title: 0.92 };
  }

  if (count <= 12) {
    /*
     * Four across. Below this the legal descriptions start hyphenating.
     *
     * These two were 0.82 / 0.84 and left eighteen pixels hanging past the
     * bottom of a 720-line frame with ten controls on the page — measured,
     * not guessed. Worth knowing if you retune them: the page cannot scroll,
     * so what overflows is simply lost, and it goes silently.
     */
    return { columns: 4, type: 0.78, title: 0.78 };
  }

  return { columns: 5, type: 0.74, title: 0.78 };
}

export default function SecurityPanel({
  visible,
  part,
  title,
  lede,
  measures,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  const fit = density(measures.length);

  return (
    <section
      aria-label="Security and compliance"
      style={
        {
          "--sec-cols": fit.columns,
          "--sec-type": fit.type,
          "--sec-title": fit.title,

          position: "absolute",
          inset: 0,
          zIndex: 3,

          /*
           * Nothing is allowed outside the frame. With the density steps above
           * doing their job this never clips; it is here so that the failure
           * mode of a very long table is a tight page rather than type running
           * off the bottom of a projector.
           */
          overflow: "hidden",

          /*
           * Clicks pass straight through to the slide advance underneath.
           * There is nothing to interact with on this page, and a panel that
           * ate the click would strand the presenter mid-deck.
           */
          pointerEvents: "none",

          display: "flex",
          flexDirection: "column",

          /*
           * TOP-ANCHORED, AND THE PADDING DOES NOT SCALE.
           *
           * Three pages in a row carry the same heading with a different third
           * of it lit — see `DevSecOpsHeader` — and the whole effect is that
           * ONE word is being examined a part at a time. Centred, the word sat
           * wherever its page's table left room for it: halfway down a short
           * one, hard against the top of a full one. Clicking through, the
           * heading jumped the height of a paragraph between every slide and
           * the three pages stopped reading as one.
           *
           * So the column starts at the top on every page, and the top padding
           * is a fixed measure rather than one scaled by `--sec-title` — that
           * variable tracks how dense the TABLE has to be, and letting it move
           * the heading put the word twelve pixels apart between a six-cell
           * page and a ten-cell one. The empty space at the foot takes the
           * slack instead.
           *
           * THE FOOT OF THE PAGE IS NOT EMPTY. The corner mark — the file the
           * cabinet handed over, parked against the lens — sits in the bottom
           * left of every page after the handoff, and a table run to the
           * bottom edge lands underneath it. The bottom padding is what
           * keeps them apart, and it is in `vh` because the mark is pinned in
           * normalised device coordinates: it takes the same share of the
           * frame's height whatever size the frame is, so a padding measured
           * in pixels clears it on one projector and not on the next.
           */
          justifyContent: "flex-start",
          gap: "calc(clamp(14px, 2.4vh, 30px) * var(--sec-title))",
          padding:
            "clamp(24px, 4vw, 72px) clamp(28px, 5vw, 92px) clamp(72px, 14vh, 160px)",
          color: TEXT,
        } as React.CSSProperties
      }
    >
      <style>
        {`
          .sec-grid {
            display: grid;
            /*
             * Column count comes from the density() step above, not from
             * auto-fit — auto-fit strands a ragged last row (4 + 2 on a wide
             * frame) and cannot trade columns against type size the way the
             * page needs to when the table grows.
             */
            grid-template-columns: repeat(var(--sec-cols), minmax(0, 1fr));
            gap:
              calc(clamp(14px, 2.2vh, 28px) * var(--sec-type))
              calc(clamp(20px, 2.6vw, 48px) * var(--sec-type));
          }

          @media (max-width: 1100px) {
            .sec-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }

          @media (max-width: 700px) {
            .sec-grid { grid-template-columns: minmax(0, 1fr); }
          }

          .sec-cell {
            display: flex;
            flex-direction: column;
            gap: .3rem;
          }

          /*
           * THE DIVIDERS LINE UP ACROSS A ROW.
           *
           * Without this each cell stacks to its own content, so a
           * three-line description in one column drops that cell's rule
           * below its neighbours' and the sheet stops looking ruled — which
           * is the one thing a table is for. Subgrid hands every cell in a
           * row the same four tracks, so headers sit on one line, standards
           * on the next, and every divider lands at the same height however
           * uneven the writing above it.
           *
           * The four tracks are the four children below, and they are
           * ALWAYS rendered even when empty — a cell that skipped one would
           * pull the rest of its column up a track and undo this.
           */
          @supports (grid-template-rows: subgrid) {
            .sec-cell {
              display: grid;
              grid-template-rows: subgrid;
              grid-row: span 4;
            }
          }

          /*
           * ONE authored moment: the table draws itself in, cell by cell,
           * left to right. It reads as a sheet being filled rather than as
           * six things arriving, and it is the only motion on the page.
           */
          @keyframes sec-cell-in {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .sec-cell {
            animation: sec-cell-in 520ms cubic-bezier(.2, .8, .2, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .sec-cell { animation-duration: 1ms; animation-delay: 0ms !important; }
          }
        `}
      </style>

      {/*
       * The head, shared with every other flat page in the run — see
       * `PageHead`. It used to be written out here, and scaling it by the
       * density factor below is exactly how the heading came to sit at a
       * different size on the Sec page than on the Dev one.
       */}
      <PageHead part={part} title={title} lede={lede} accent={accent} />

      <div className="sec-grid">
        {measures.map((measure, index) => (
          <article
            key={`${measure.header}-${index}`}
            className="sec-cell"
            style={{
              /* Staggered along the reading order, and capped so a long
               * table never leaves the last cell arriving after the
               * presenter has started talking. */
              animationDelay: `${Math.min(index, 8) * 55}ms`,

              /* The cell's own rule. This is what makes the grid a sheet. */
              borderTop: `1px solid ${RULE}`,
              paddingTop: "calc(clamp(8px, 1.2vh, 14px) * var(--sec-type))",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize:
                  "calc(clamp(.98rem, 1.5vw, 1.22rem) * var(--sec-type))",
                fontWeight: 650,
                letterSpacing: "-.025em",
                lineHeight: 1.15,
              }}
            >
              {measure.header}
            </h2>

            {/*
             * The standard behind the control. Set in the accent and tracked
             * out, because it is almost always a designation rather than a
             * phrase — "TLS 1.3", "SOC 2" — and a designation set as running
             * text reads as a typo.
             *
             * Rendered even when empty, like the two slots below it. See the
             * subgrid note in the stylesheet: these four elements ARE the
             * cell's four tracks, and a missing one shifts everything under
             * it out of line with the rest of the row.
             */}
            <span
              style={{
                fontSize:
                  "calc(clamp(.68rem, .88vw, .78rem) * var(--sec-type))",
                fontWeight: 700,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {measure.subheader}
            </span>

            {/*
             * HELD BACK, so the line under the divider is the one that reads.
             *
             * The description is the control as the regulator words it — true
             * of every firm in the industry, and context the room can skim.
             * What is actually being CLAIMED is underneath. Dropping this to a
             * grey and taking the evidence up to full ink puts the two in the
             * order they should be read in, without moving either of them.
             */}
            <p
              style={{
                margin: 0,
                fontSize:
                  "calc(clamp(.78rem, 1.02vw, .92rem) * var(--sec-type))",
                lineHeight: 1.5,
                opacity: 0.56,
              }}
            >
              {measure.description}
            </p>

            {/*
             * The divider and the evidence share the fourth track, so the rule
             * is dropped along with the text it separates — a half-filled
             * table shows a clean sheet rather than rows with a rule hanging
             * off the bottom of them.
             */}
            <div>
              {measure.applied && (
                <>
                  <div
                    aria-hidden="true"
                    style={{
                      height: 1,
                      background: RULE_FAINT,
                      margin: "0 0 clamp(6px, .9vh, 11px)",
                    }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontSize:
                        "calc(clamp(.76rem, 1vw, .89rem) * var(--sec-type))",
                      lineHeight: 1.45,

                      /*
                       * Held closer to full ink than the description above it.
                       * The description is context the room can skim; this is
                       * the line that says the work was actually done, and it
                       * should be the last thing still legible from the back.
                       */
                      opacity: 0.92,
                    }}
                  >
                    {measure.applied}
                  </p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
