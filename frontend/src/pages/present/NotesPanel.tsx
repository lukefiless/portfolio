/**
 * THE OPENED FILE'S LEFT PAGE
 *
 * A heading and a short column of lines, set on the slide's own ground, with
 * the act playing on the right half of the frame.
 *
 * WHAT THIS USED TO BE, AND WHY IT IS NOT
 *
 * A sheet of ruled paper under a drawn steel paperclip, on a manila leaf with
 * a fold down the middle — seven hundred lines of it. It was a good illusion
 * and it cost more than it returned: the sheet capped how much could be said
 * before the text ran off the bottom of it, the clip and the fold drew the eye
 * to furniture rather than to the words, and the handwriting face it was set
 * in is the wrong voice for a room being asked to take the contents seriously.
 *
 * So the paper is gone and the words are simply on the page. The ground is
 * still the folder's manila, which is doing the one job the illusion actually
 * needed to do: the file beat before this ends on a frame of nothing but
 * manila, and this page opens on the same colour, so the cut between them is
 * invisible.
 *
 * THE TYPE IS THE DECK'S OWN
 *
 * No family is set here at all, which is the point — it inherits the sans the
 * rest of the deck is set in, so the notes on a project page and the headline
 * on a summary page are the same voice. The handwriting is still used, once,
 * on the cabinet's file tabs, where it means something: a person filed that.
 *
 * The content is DATA, in `slides.ts`. Edit it there; grep for
 * "EDIT THE NOTES HERE".
 */

import { TEXT } from "./palette";

interface Props {
  visible: boolean;

  /**
   * Skip the entrance and appear at once.
   *
   * For a page whose slide opens with a file beat: there is already a folder
   * closing over the frame, so a page that politely faded in on top of it
   * would be animating against a cut it cannot win.
   */
  snap: boolean;

  /** The lines themselves. One string per line; an empty one leaves a gap. */
  notes: readonly string[];

  /** Written at the head of the page. */
  heading?: string;

  /** The slide's accent, so the page belongs to the deck it is in. */
  accent: string;

  /**
   * This column's share of the frame, 0 to 1.
   *
   * Passed in rather than fixed at a half, because the act on the other leaf
   * is framed into whatever is left — see `leafSplit` in `Present.tsx`. The
   * two numbers are the same number, and a column that drew itself at 50%
   * while the projection framed the act against 40% would either overlap it or
   * leave a stripe of nothing down the middle.
   */
  fold: number;
}

export default function NotesPanel({
  visible,
  snap,
  notes,
  heading,
  accent,
  fold,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label={heading ?? "Notes"}
      style={{
        position: "absolute",

        /*
         * The left column, and it stops where the fold is. The act is framed
         * into what is left by the projection — see `leafSplit` in
         * `Present.tsx` — so this column and that one divide the frame between
         * them at one shared number, and neither has to measure the other.
         */
        left: 0,
        top: 0,
        bottom: 0,
        width: `${fold * 100}%`,

        zIndex: 3,
        pointerEvents: "none",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "clamp(14px, 2.4vh, 30px)",
        padding:
          "clamp(32px, 5vh, 72px) clamp(28px, 3.4vw, 60px) clamp(32px, 5vh, 72px) clamp(40px, 6vw, 104px)",

        color: TEXT,
      }}
    >
      <style>
        {`
          /*
           * One authored moment: the page settles up into place. The lines
           * follow the heading rather than arriving with it, which is what
           * makes it read as a page being laid down instead of a block
           * appearing.
           */
          @keyframes notes-in {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            [data-notes] { animation-duration: 1ms !important; }
          }
        `}
      </style>

      {heading && (
        <header
          data-notes
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.4vh, 16px)",
            animation: snap
              ? undefined
              : "notes-in 520ms cubic-bezier(.2, .8, .2, 1) both",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.6rem, min(3.4vw, 6vh), 2.9rem)",
              fontWeight: 650,
              letterSpacing: "-.05em",
              lineHeight: 1,
              textWrap: "balance",
            }}
          >
            {heading}
          </h2>

          {/*
           * The accent rule. The deck's flat pages all carry one under their
           * heading, and this page is now one of them.
           */}
          <div
            aria-hidden="true"
            style={{ height: 2, background: accent, opacity: 0.55 }}
          />
        </header>
      )}

      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px, 1.8vh, 22px)",
        }}
      >
        {notes.map((line, index) => (
          <li
            key={`${index}-${line}`}
            data-notes
            style={{
              display: "flex",
              gap: "clamp(10px, .9vw, 16px)",
              fontSize: "clamp(.92rem, 1.35vw, 1.24rem)",
              lineHeight: 1.5,

              /*
               * Staggered behind the heading, and capped so a long list never
               * leaves its last line arriving after the presenter has started
               * talking about it.
               */
              animation: snap
                ? undefined
                : `notes-in 520ms cubic-bezier(.2, .8, .2, 1) ${
                    120 + Math.min(index, 8) * 70
                  }ms both`,
            }}
          >
            {/*
             * A dash rather than a bullet, in the accent. These are notes
             * somebody took, not a specification — and a round bullet at this
             * size reads as a slide template.
             */}
            <span aria-hidden="true" style={{ color: accent, opacity: 0.8 }}>
              —
            </span>

            <span style={{ opacity: 0.86 }}>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
