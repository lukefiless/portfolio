/**
 * DEV / SEC / OPS
 *
 * One word, read three times. The header sets "DevSecOps" and then takes one
 * of its three syllables at a time: the chosen part grows and holds full ink,
 * the other two fall back to a ghost of themselves, and the discipline that
 * part stands for appears underneath.
 *
 * WHY THE OTHER TWO STAY ON SCREEN
 *
 * They could be dropped outright — the brief's first beat says "drop the
 * SecOps" — and that is what the ghost is: dropped in EMPHASIS, not deleted.
 * Removing the letters would reflow the word every slide, so "Sec" would sit
 * somewhere different each time and the three pages would stop reading as one
 * heading being examined. Held in place and faded, the word stays put, the
 * eye is handed each part in turn, and the last slide has visibly assembled
 * the whole thing again.
 *
 * IT IS ONE ELEMENT, NOT THREE
 *
 * Every page that carries it renders the same component with a different
 * `part`. The transition between slides is therefore the browser interpolating
 * two states of one heading rather than a page rebuilding — which is the only
 * reason the letters can appear to slide from one emphasis to the next.
 */

import { TEXT } from "./palette";

/** Which syllable this page is about. */
export type DevSecOpsPart = "dev" | "sec" | "ops";

interface Props {
  /** The syllable to bring forward. */
  part: DevSecOpsPart;

  /** The slide's accent, so the header belongs to the page it is on. */
  accent: string;
}

/**
 * The three syllables, and what each one is short for.
 *
 * In the order they are said, which is also the order the deck takes them —
 * so the word reads left to right as the deck moves forward.
 */
const PARTS: { key: DevSecOpsPart; text: string; expands: string }[] = [
  { key: "dev", text: "Dev", expands: "Software Development" },
  { key: "sec", text: "Sec", expands: "Cyber Security" },
  { key: "ops", text: "Ops", expands: "Operations" },
];

export default function DevSecOpsHeader({ part, accent }: Props) {
  const active = PARTS.find(entry => entry.key === part) ?? PARTS[0];

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(2px, .5vh, 8px)",
        color: TEXT,
      }}
    >
      <style>
        {`
          /*
           * The syllables animate their own weight and colour rather than the
           * heading animating as a block, which is what lets emphasis travel
           * ALONG the word instead of the word fading out and back in.
           *
           * Transitioned, not keyframed: the deck re-renders this element with
           * a new \`part\` on every slide change, and a transition runs from
           * whatever the last state actually was. A keyframe would restart from
           * its own \`from\` every time and throw away where the word had got to.
           */
          .dso-part {
            transition:
              opacity 620ms cubic-bezier(.2, .8, .2, 1),
              transform 620ms cubic-bezier(.2, .8, .2, 1),
              color 620ms cubic-bezier(.2, .8, .2, 1);
            display: inline-block;
            transform-origin: 50% 70%;
          }

          .dso-expands {
            transition: opacity 520ms ease-out 120ms;
          }

          @media (prefers-reduced-motion: reduce) {
            .dso-part, .dso-expands { transition-duration: 1ms; }
          }
        `}
      </style>

      <h1
        style={{
          margin: 0,
          fontSize: "clamp(1.9rem, min(4.6vw, 8vh), 4rem)",
          fontWeight: 650,
          letterSpacing: "-.055em",
          lineHeight: 0.95,
          whiteSpace: "nowrap",
        }}
      >
        {PARTS.map(entry => {
          const on = entry.key === part;

          return (
            <span
              key={entry.key}
              className="dso-part"
              style={{
                /*
                 * The chosen part grows a little and holds full ink. The other
                 * two are still there, and still exactly where they were —
                 * see the note at the top on why they are not removed.
                 */
                opacity: on ? 1 : 0.22,
                transform: on ? "scale(1.1)" : "scale(1)",
                color: TEXT,

                /* A hair of space so the grown syllable never touches its neighbour. */
                marginRight: on ? ".06em" : 0,
                marginLeft: on ? ".06em" : 0,
              }}
            >
              {entry.text}
            </span>
          );
        })}
      </h1>

      {/*
       * What the syllable is short for. Keyed on the part so React swaps the
       * element rather than mutating its text, which is what makes the fade
       * belong to this word rather than to the line.
       */}
      <p
        key={active.key}
        className="dso-expands"
        style={{
          margin: 0,
          fontSize: "clamp(.8rem, 1.05vw, 1rem)",
          fontWeight: 600,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {active.expands}
      </p>
    </header>
  );
}
