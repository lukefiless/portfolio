/**
 * THE ARCHITECTURE PAGE
 *
 * A flat slide whose whole content is one drawing: the system as it actually
 * stands, supplied as an image rather than rebuilt in geometry.
 *
 * WHY AN IMAGE AND NOT AN ACT
 *
 * Every other 3D beat in this deck argues something — a queue backing up, a
 * drawer of finished work, records arriving on their own. An architecture
 * diagram does not argue, it REFERENCES: the room reads it, points at parts of
 * it, and asks about the boxes. That wants the real diagram at full fidelity,
 * authored in whatever tool draws it best and kept current there, not a
 * hand-modelled approximation that goes stale the day a service moves.
 *
 * TO PUT THE DIAGRAM IN
 *
 * Drop the file in `frontend/public/` — say `public/diagrams/architecture.png`
 * — and set `src` on the slide to the path WITHOUT `public`, so
 * "/diagrams/architecture.png". Anything the browser renders works: PNG, JPG,
 * WebP, or an SVG, which stays sharp at any projector resolution and is worth
 * exporting if the drawing tool offers it.
 *
 * Until then the page renders its own placeholder rather than a broken image,
 * so the slide can sit in the running order while the drawing is still being
 * made.
 */

import PageHead from "./PageHead";
import { TEXT } from "./palette";

interface Props {
  visible: boolean;

  /** The page's headline. */
  title: string;

  /** One line under it. Empty omits the line. */
  lede: string;

  /** Path under `public/`. Empty renders the placeholder. */
  src: string;

  /** Alt text. Say what the diagram SHOWS, not that it is a diagram. */
  alt: string;

  /** Optional note under the drawing — a legend, a date, a caveat. */
  caption: string;

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

/* The deck's ink at low alpha. See the same constants in `SecurityPanel`. */
const RULE = `${TEXT}24`;

export default function DiagramPanel({
  visible,
  title,
  lede,
  src,
  alt,
  caption,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label="System architecture"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,

        /* Nothing to interact with; clicks advance the deck. */
        pointerEvents: "none",

        display: "flex",
        flexDirection: "column",

        /*
         * THE RUN'S OWN MEASUREMENTS, and not a set of its own.
         *
         * This page used to carry a hand-built copy of the head block — its
         * own heading, its own lede, its own rule — and the copy had drifted:
         * the headline was two steps smaller than the same headline on Dev,
         * the lede was a different size over a different measure, and the gap
         * between them was .4rem against .5rem. Clicking from Sec to here
         * moved every line on the page a little.
         *
         * So the head is `PageHead`, the same component the three DevSecOps
         * pages use, and the gap and padding below are the literals they set.
         * The deep foot is what clears the corner mark — see the long note in
         * `SecurityPanel`.
         */
        gap: "clamp(14px, 2.4vh, 30px)",
        padding:
          "clamp(24px, 4vw, 72px) clamp(28px, 5vw, 92px) clamp(72px, 14vh, 160px)",
        color: TEXT,
        overflow: "hidden",
      }}
    >
      <PageHead title={title} lede={lede} accent={accent} />

      {/*
       * THE DRAWING TAKES WHATEVER IS LEFT.
       *
       * `minHeight: 0` is load-bearing: a flex child defaults to its content's
       * minimum size, so without it a tall diagram pushes the caption off the
       * bottom of the frame instead of scaling down inside its share of it.
       */}
      <figure
        style={{
          margin: 0,
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(8px, 1.2vh, 16px)",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              /*
               * Contained, never cropped. A diagram with its edges cut off is
               * worse than a smaller diagram — the thing at the edge is
               * usually the boundary the drawing exists to show.
               */
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          /*
           * The placeholder. Deliberately says where the file goes rather than
           * just being an empty box, because the person who sees this is the
           * one who has to put the drawing in.
           */
          <div
            style={{
              width: "min(100%, 900px)",
              flex: "1 1 auto",
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(16px, 3vh, 36px)",
              border: `1px dashed ${RULE}`,
              borderRadius: 4,
              textAlign: "center",
              fontSize: "clamp(.78rem, 1vw, .92rem)",
              lineHeight: 1.6,
              opacity: 0.6,
            }}
          >
            {"Drop the diagram in "}
            <code>public/diagrams/</code>
            {" and set "}
            <code>src</code>
            {" on this slide in "}
            <code>slides.ts</code>
            {"."}
          </div>
        )}

        {caption && (
          <figcaption
            style={{
              maxWidth: "88ch",
              fontSize: "clamp(.72rem, .95vw, .86rem)",
              lineHeight: 1.5,
              opacity: 0.72,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
