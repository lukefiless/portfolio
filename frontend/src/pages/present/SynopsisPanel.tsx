/**
 * THE SYNOPSIS
 *
 * A flat slide: the role being asked for, and everything the deck has just
 * shown, gathered onto one page.
 *
 * FLAT ON PURPOSE, AND WHY IT IS DOM RATHER THAN GEOMETRY
 *
 * Same reasoning as `BlueprintPanel`. This page is a LIST — a heading, a
 * column of labelled lines, a rule between them. Every one of those is native
 * to the DOM and has to be faked in a 3D scene, where it then catches the
 * stage lighting and stops looking like a page. There is also nothing here to
 * animate: the argument was made by the seven acts before it, and this is the
 * moment the room reads rather than watches.
 *
 * The content is DATA, in `slides.ts`, like everything else in this deck. Edit
 * it there; nothing about the wording lives in this file.
 */

import type { SynopsisPoint } from "./slides";

interface Props {
  visible: boolean;

  /** The job title being asked for. */
  role: string;

  /** What the deck covered, one entry per beat. */
  points: readonly SynopsisPoint[];

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

export default function SynopsisPanel({
  visible,
  role,
  points,
  accent,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label="Role synopsis"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,

        /*
         * Clicks pass straight through to the slide advance underneath. There
         * is nothing to interact with on this page, and a panel that ate the
         * click would strand the presenter mid-deck.
         */
        pointerEvents: "none",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(32px, 6vw, 104px)",
        gap: "clamp(20px, 3.4vh, 40px)",
      }}
    >
      <header
        style={{ display: "flex", flexDirection: "column", gap: ".55rem" }}
      >
        <span
          style={{
            fontSize: ".72rem",
            fontWeight: 700,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          
        </span>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2.2rem, min(6vw, 10vh), 5.4rem)",
            fontWeight: 650,
            letterSpacing: "-.055em",
            lineHeight: 0.95,
            textWrap: "balance",
          }}
        >
          {role}
        </h1>
      </header>

      <div
        aria-hidden="true"
        style={{
          height: 2,
          width: "min(560px, 60%)",
          background: accent,
          opacity: 0.5,
        }}
      />

      {/*
       * Two columns on a wide screen, one on a narrow one. A single column of
       * seven lines runs past the bottom of a 16:9 frame at any type size
       * worth projecting.
       */}
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(12px, 2vh, 26px) clamp(28px, 4vw, 64px)",
          maxWidth: 1180,
        }}
      >
        {points.map(point => (
          <li
            key={point.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".2rem",
              borderLeft: `2px solid ${accent}`,
              paddingLeft: "clamp(12px, 1.2vw, 18px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(.95rem, 1.5vw, 1.2rem)",
                fontWeight: 640,
                letterSpacing: "-.02em",
              }}
            >
              {point.label}
            </span>

            <span
              style={{
                fontSize: "clamp(.82rem, 1.1vw, 1rem)",
                lineHeight: 1.5,
                opacity: 0.72,
              }}
            >
              {point.note}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
