/**
 * WHERE THE MARKET IS
 *
 * A flat slide: six openings as a table — company, title, base pay, and a
 * link straight to the application.
 *
 * THE ONE THING THAT NEEDED CARE
 *
 * Everywhere else in this deck a click means "next slide" — `Present.tsx`
 * advances on any pointer down anywhere on the page. This is the only panel
 * with something worth clicking ON it, so a link here has two ways to fail:
 * the click sails past it to the slide advance, or it opens the application
 * AND jumps the deck forward behind it, which is worse because the presenter
 * cannot see it happen.
 *
 * So the fix is in two halves, and both are needed:
 *
 *   the panel   `pointerEvents: none`, so empty space still advances the
 *               deck and the presenter never has a dead region to click in
 *
 *   each link   `pointerEvents: auto` to become clickable again, plus
 *               `stopPropagation` on pointer down so the advance handler on
 *               <main> never sees it
 *
 * Anything else added to this page has to make the same choice deliberately.
 *
 * The rows are DATA, in `slides.ts`. Fill them in there.
 */

import type { MarketRole } from "./slides";

interface Props {
  visible: boolean;

  /** Six is what the layout is built around; more will wrap, fewer is fine. */
  roles: readonly MarketRole[];

  /** The slide's accent, so this page belongs to the same deck. */
  accent: string;
}

export default function MarketPanel({ visible, roles, accent }: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      aria-label="Open roles"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,

        /* See the note at the top — this is half of the click handling. */
        pointerEvents: "none",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(28px, 5vw, 88px)",
        gap: "clamp(18px, 3vh, 34px)",
      }}
    >
      <header
        style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
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
          Where the market is
        </span>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.7rem, min(4vw, 7vh), 3.4rem)",
            fontWeight: 650,
            letterSpacing: "-.05em",
            lineHeight: 0.98,
          }}
        >
          Open roles, and what they pay
        </h1>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: "clamp(10px, 1.6vh, 18px) clamp(20px, 3vw, 44px)",
          maxWidth: 1240,
        }}
      >
        {roles.map((role, index) => (
          <article
            key={`${role.company}-${index}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "baseline",
              gap: ".15rem .9rem",
              paddingBottom: "clamp(8px, 1.2vh, 14px)",
              borderBottom: "1px solid rgba(36, 36, 36, .16)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.28rem)",
                fontWeight: 650,
                letterSpacing: "-.025em",
              }}
            >
              {role.company}
            </span>

            {/*
             * Pay is the number the room is here for, so it is set in the
             * accent and given its own column rather than trailing the title
             * — a figure buried at the end of a line is a figure nobody reads
             * from the back of a room.
             */}
            <span
              style={{
                fontSize: "clamp(.95rem, 1.5vw, 1.18rem)",
                fontWeight: 640,
                color: accent,
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            >
              {role.pay}
            </span>

            <span
              style={{
                fontSize: "clamp(.8rem, 1.1vw, .98rem)",
                opacity: 0.7,
                lineHeight: 1.4,
              }}
            >
              {role.title}
            </span>

            {role.url ? (
              <a
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                /*
                 * The other half of the click handling. Without the stop, the
                 * deck advances behind the newly opened tab.
                 */
                onPointerDown={event => event.stopPropagation()}
                onClick={event => event.stopPropagation()}
                style={{
                  pointerEvents: "auto",
                  justifySelf: "end",
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: accent,
                  textDecoration: "none",
                  borderBottom: `1px solid ${accent}`,
                  paddingBottom: 1,
                  cursor: "pointer",
                }}
              >
                Apply
              </a>
            ) : (
              /* Keeps the grid aligned before a link has been filled in. */
              <span aria-hidden="true" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
