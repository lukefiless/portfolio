/**
 * THE HEAD OF A FLAT PAGE
 *
 * The word, the discipline under it, the line explaining the page, and the
 * rule that closes the block. Three pages in a row carry it — Dev, Sec and
 * Ops — and the whole effect depends on them being IDENTICAL: the heading is
 * one word being examined a part at a time, so anything that moves or resizes
 * between them reads as three separate titles rather than one.
 *
 * WHY IT IS A COMPONENT AND NOT COPIED MARKUP
 *
 * It was copied markup, and it drifted. `SecurityPanel` scales its type by a
 * density factor worked out from how many cells are on the page — which is
 * right for the table and wrong for the heading, because it made the lede on
 * the ten-cell Sec page smaller than the same line on the six-tile Dev page.
 * The eyebrow underneath the word never scaled at all, so the two lines under
 * the heading disagreed with each other AND with the next page.
 *
 * Nothing here scales with anything. The head is a fixed measure on every
 * page that uses it; only the content BELOW it is allowed to tighten.
 */

import DevSecOpsHeader, { type DevSecOpsPart } from "./DevSecOpsHeader";

interface Props {
  /**
   * Which third of "DevSecOps" this page is, if any. Set, it heads the page
   * in place of `title` — see `DevSecOpsHeader`.
   */
  part?: DevSecOpsPart;

  /** The page's headline, used only when `part` is absent. */
  title: string;

  /** One line under the heading, saying what the page is. Empty omits it. */
  lede: string;

  /** The slide's accent, so the page belongs to the deck it is in. */
  accent: string;
}

export default function PageHead({ part, title, lede, accent }: Props) {
  return (
    <>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",

          /*
           * NEVER SQUEEZED. Both of these are children of the page's own
           * column, and a flex child shrinks when the column runs out of room
           * — so on a page whose body fills the frame the 2px rule below was
           * shrunk to nothing and the heading lost its underline. The body is
           * the thing that should give.
           */
          flexShrink: 0,
        }}
      >
        {/*
         * THE WORD, OR THE TITLE — never both.
         *
         * A page headed "DevSecOps / Cyber Security" has already said what it
         * is; a second headline under that is the same statement twice in two
         * type sizes. The three pages in the run are identified by which part
         * of the word is lit, and anything else they need to say is the
         * lede's job.
         */}
        {part ? (
          <DevSecOpsHeader part={part} accent={accent} />
        ) : (
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.9rem, min(4.6vw, 8vh), 4rem)",
              fontWeight: 650,
              letterSpacing: "-.055em",
              lineHeight: 0.95,
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
        )}

        {lede && (
          <p
            style={{
              margin: 0,
              maxWidth: "62ch",

              /*
               * A fixed measure, and deliberately the same one on every page
               * that carries this head. See the note at the top of the file:
               * this line used to be multiplied by the table's density factor
               * and shrank on whichever page happened to have the most on it.
               */
              fontSize: "clamp(.86rem, 1.15vw, 1.05rem)",
              lineHeight: 1.5,
              opacity: 0.72,
            }}
          >
            {lede}
          </p>
        )}
      </header>

      {/*
       * The head rule. Full width and in the accent, where SynopsisPanel's is
       * short and centred — this is the page announcing itself as a sheet.
       */}
      <div
        aria-hidden="true"
        style={{
          height: 2,
          flexShrink: 0,
          background: accent,
          opacity: 0.55,
        }}
      />
    </>
  );
}
