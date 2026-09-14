/**
 * THE RECAP
 *
 * The deck's last page. Three things that used to be done by hand, the moment
 * each stopped being done by hand, and what the room is being asked for.
 *
 * IT IS A BEFORE AND AFTER, ON ONE SPINE
 *
 * Earlier versions were a list — six points in six boxes, then three columns
 * of claims. Both said the same thing wrong: a shipped service named on its
 * own is a word. What makes it evidence is the manual job standing opposite
 * it, and a list cannot show two states of the same thing at once.
 *
 * So every row is one job, twice. The old way on the left, set quiet and past
 * tense. The way it works now on the right. Between them a single vertical
 * rule in the accent with a mark on it per row — the divide, which is the
 * only thing on the page drawn in colour, because crossing it IS the argument.
 *
 * The rule runs unbroken through all three rows. That is deliberate and it is
 * why the rows carry no gap between them: three separate uprights would read
 * as three unrelated comparisons, where one continuous line reads as one
 * change that happened to three things.
 *
 * IT IS SET IN THE DECK'S OWN FACE. A pass that moved the claims into the
 * cabinet's serif was reverted: the flat pages are one document and the
 * closing page is part of it. Layout distinguishes this page, not lettering.
 *
 * The content is DATA, in `slides.ts`, like everything else in this deck. Edit
 * it there; nothing about the wording lives in this file.
 */

import PageHead from "./PageHead";
import { TEXT } from "./palette";
import type { RecapBuild, RecapClose } from "./slides";

/** The hairline the flat pages rule their cells with. */
const RULE = `${TEXT}24`;

/**
 * The spine's width.
 *
 * Wide enough to hold the marks clear of the type either side, narrow enough
 * that the two columns still read as a pair rather than two separate lists.
 */
const SPINE = "clamp(34px, 4vw, 72px)";

interface Props {
  visible: boolean;

  /** The page's headline. */
  title: string;

  /** The two sides of the divide, named. */
  headings: { was: string; now: string };

  /** What already exists. Three is what the page is drawn for. */
  built: readonly RecapBuild[];

  /** The word reassembled, and the line the deck ends on. */
  close: RecapClose;

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

/** The small tracked label the two columns are headed with. */
function ColumnHead({ text, align }: { text: string; align: "right" | "left" }) {
  return (
    <span
      style={{
        fontSize: "clamp(.68rem, .85vw, .8rem)",
        fontWeight: 600,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        opacity: 0.45,
        textAlign: align,
      }}
    >
      {text}
    </span>
  );
}

export default function RecapPanel({
  visible,
  title,
  headings,
  built,
  close,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  /*
   * THE GRID IS ONE GRID, not a row component repeated.
   *
   * The spine has to be continuous and the two columns have to agree on their
   * width down the whole page; both fall out for free when every row is a set
   * of cells in the same grid, and both have to be faked if each row owns its
   * own layout.
   */
  const columns = `minmax(0, 1fr) ${SPINE} minmax(0, 1fr)`;

  return (
    <section
      aria-label="Recap"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,

        /* Nothing is allowed outside the frame. See `SecurityPanel`. */
        overflow: "hidden",

        /*
         * Clicks pass straight through to the slide advance underneath. There
         * is nothing to interact with on this page, and a panel that ate the
         * click would strand the presenter mid-deck.
         */
        pointerEvents: "none",

        display: "flex",
        flexDirection: "column",

        /*
         * The run's column, to the pixel. The deep foot is not slack: the
         * corner mark — the file the cabinet handed over — sits in the bottom
         * left of every page after the handoff, and content run to the bottom
         * edge lands underneath it. It is in `vh` because the mark is pinned in
         * normalised device coordinates, so a padding in pixels clears it on
         * one projector and not on the next.
         */
        gap: "clamp(14px, 2.4vh, 30px)",
        padding:
          "clamp(24px, 4vw, 72px) clamp(28px, 5vw, 92px) clamp(72px, 14vh, 160px)",
        color: TEXT,
      }}
    >
      <PageHead title={title} lede="" accent={accent} />

      {/*
       * THE TIMELINE. Centred in the space between the head and the close, so
       * the page reads as three bands rather than a top-heavy block over a
       * hole.
       */}
      <div style={{ margin: "auto 0" }}>
        {/* The two sides, named once at the top rather than on every row. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            alignItems: "end",
            paddingBottom: "clamp(8px, 1.4vh, 16px)",
          }}
        >
          <ColumnHead text={headings.was} align="right" />
          <span />
          <ColumnHead text={headings.now} align="left" />
        </div>

        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: columns,

            /*
             * NO ROW GAP. The spine is drawn by the middle cell of each row,
             * so any gap between rows would cut it into three. The rows are
             * separated by their own padding instead.
             */
            rowGap: 0,
          }}
        >
          {built.map((item, index) => {
            /* Every row but the first is closed off from the one above it. */
            const divider = index > 0 ? `1px solid ${RULE}` : "none";
            const pad = "clamp(12px, 2vh, 24px)";

            return (
              <li
                key={item.name}
                style={{ display: "contents" }}
              >
                {/*
                 * THE OLD WAY. Right-aligned, so the two columns close on the
                 * spine instead of drifting away from it — the comparison is
                 * between the two lines nearest the rule, and ragged inner
                 * edges put a different amount of air on every row.
                 */}
                <div
                  style={{
                    borderTop: divider,
                    paddingTop: pad,
                    paddingBottom: pad,
                    paddingRight: "clamp(10px, 1vw, 18px)",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(.82rem, 1.08vw, .98rem)",
                      lineHeight: 1.5,
                      opacity: 0.55,
                    }}
                  >
                    {item.before}
                  </p>
                </div>

                {/*
                 * THE SPINE. The line is drawn full-bleed through the cell and
                 * the mark sits on it, so the rule is continuous and the marks
                 * land at the vertical centre of their own row.
                 */}
                <div
                  style={{
                    position: "relative",

                    /*
                     * NO ROW DIVIDER HERE. Carried across the spine, the
                     * hairline crossed the accent rule and made a small plus
                     * at every row boundary. The dividers separate the two
                     * columns' rows; the spine is not part of that and runs
                     * through them.
                     */
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: "50%",
                      width: 1,
                      marginLeft: -0.5,
                      background: accent,
                      opacity: 0.75,
                    }}
                  />

                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "clamp(7px, .72vw, 10px)",
                      height: "clamp(7px, .72vw, 10px)",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%",
                      background: accent,
                    }}
                  />
                </div>

                {/* THE WAY IT WORKS NOW. The name, then the claim. */}
                <div
                  style={{
                    borderTop: divider,
                    paddingTop: pad,
                    paddingBottom: pad,
                    paddingLeft: "clamp(10px, 1vw, 18px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: ".2rem",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "clamp(.98rem, 1.5vw, 1.24rem)",
                      fontWeight: 640,
                      letterSpacing: "-.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(.85rem, 1.12vw, 1rem)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.result}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/*
       * THE CLOSE, PINNED TO THE FOOT by the auto margins on the timeline
       * above. It is where a signature goes.
       *
       * THE WORD, PUT BACK TOGETHER. Dev, Sec and Ops each had a page, and on
       * each of them the other two syllables were faded to a ghost so the eye
       * was handed one part at a time — see `DevSecOpsHeader`. This is the
       * only place in the deck where all three are lit at once, which is the
       * point: the run took the word apart, and the last page shows what it
       * adds up to.
       *
       * The syllables are set in the accent and the disciplines under them in
       * the interface face, so the row reads left to right as the word before
       * it reads as three columns.
       */}
      <div
        style={{
          borderTop: `2px solid ${accent}`,
          paddingTop: "clamp(14px, 2.2vh, 26px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(20px, 2.6vw, 48px)",
            alignItems: "start",
          }}
        >
          {close.parts.map(part => (
            <div
              key={part.part}
              style={{ display: "flex", flexDirection: "column", gap: ".1rem" }}
            >
              {/*
               * The syllable, capitalised from the data rather than written
               * out again here — the word is the deck's, not this file's.
               */}
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(1.25rem, 2.3vw, 2rem)",
                  fontWeight: 650,
                  letterSpacing: "-.04em",
                  lineHeight: 1.05,
                  color: accent,
                }}
              >
                {part.part.charAt(0).toUpperCase() + part.part.slice(1)}
              </h2>

              <span
                style={{
                  fontSize: "clamp(.68rem, .85vw, .8rem)",
                  fontWeight: 600,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                }}
              >
                {part.label}
              </span>

              <p
                style={{
                  margin: ".4rem 0 0",
                  fontSize: "clamp(.8rem, 1.05vw, .95rem)",
                  lineHeight: 1.5,
                  opacity: 0.78,
                }}
              >
                {part.note}
              </p>
            </div>
          ))}
        </div>

        {/*
         * THE LAST LINE OF THE DECK. Full width under the three columns, so
         * nothing sits beside it and it is the thing the eye stops on.
         */}
        {close.returns && (
          <p
            style={{
              margin: "clamp(12px, 1.8vh, 22px) 0 0",
              fontSize: "clamp(.88rem, 1.18vw, 1.06rem)",
              lineHeight: 1.5,
            }}
          >
            {close.returns}
          </p>
        )}
      </div>

    </section>
  );
}
