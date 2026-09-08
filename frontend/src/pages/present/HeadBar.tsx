/**
 * THE HEAD OF A SLIDE THAT IS NOT A FLAT PAGE
 *
 * The deck's flat pages — Dev, Sec, Ops, the architecture drawing — all open
 * with the same block: a headline, the line under it, and a rule in the slide's
 * accent closing it off. See `PageHead`, which is that block.
 *
 * This puts the identical block over a slide whose frame belongs to something
 * else. It is a BAND rather than a column: solid in the slide's own ground,
 * across the top of the frame, above the canvas.
 *
 * WHY IT IS SOLID, AND NOT A CAPTION FLOATING OVER THE SCENE
 *
 * The contents slide looks down into an open drawer, and a drawer of files is
 * busy — handwriting, tabs, shadow, the carcass behind it. A headline set over
 * that lands on a different backdrop in every frame as the drawer travels, so
 * it is legible for part of the move and mushy for the rest. Filling the band
 * stops the cabinet at a fixed line: the type sits on flat ground and reads the
 * same at every moment of the animation.
 *
 * The rule is the band's bottom edge, so the thing that closes the heading and
 * the thing that ends the mask are one line rather than two competing ones.
 *
 * HOW IT STAYS IN STEP WITH THE FLAT PAGES
 *
 * By using their component, and their padding. The two numbers below are the
 * same literals every page in the run sets — see the note on `padding` in
 * `SecurityPanel` — so a headline in this band and a headline on the Sec page
 * land on the same pixel, and clicking between them moves nothing.
 */

import PageHead from "./PageHead";

/**
 * The band's share of the run's type ramp.
 *
 * A flat page's headline is the first thing in the frame and has the whole
 * sheet under it to carry, so it is set at the size a document title is set
 * at. This one has a scene under it: it names the slide and then gets out of
 * the way, and at the page's full size it dominates the very thing it is
 * introducing. Two thirds keeps it unmistakably the same face, ramp and rule
 * — see `scale` on `PageHead` — at the weight a caption wants.
 */
const BAR_TYPE = 0.66;

interface Props {
  visible: boolean;

  /** The headline. The slide's own copy, so it is still edited in `slides.ts`. */
  title: string;

  /** The supporting line, if the slide carries one. Empty omits it. */
  lede: string;

  /** The slide's accent, for the rule that closes the band. */
  accent: string;

  /**
   * The slide's ground.
   *
   * Passed in rather than read from the palette, because the band has to be
   * the colour of the frame it is sitting on — a hard-coded ground would show
   * as a seam the moment a slide is composed against anything else.
   */
  background: string;
}

export default function HeadBar({
  visible,
  title,
  lede,
  accent,
  background,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        /*
         * Over the canvas and over the copy layer. Under the veil, which is
         * the one thing in the deck that covers everything — see the note on
         * `VEIL_IN` in `Present.tsx`.
         */
        zIndex: 4,

        /* Clicks advance the deck, the same as everywhere else. */
        pointerEvents: "none",

        /* The mask. See the note at the top on why this is not transparent. */
        background,

        display: "flex",
        flexDirection: "column",

        /*
         * THE RULE IS THE BAND'S BOTTOM EDGE, and the depth is measured
         * against the cabinet rather than chosen.
         *
         * Two things were wrong with sizing this block to its contents. The
         * rule sat directly under the headline with no air, because `PageHead`
         * puts them next to each other and leaves the spacing to the page's
         * own column gap — which a band that only holds a head never set. And
         * the band ended well above the cabinet, so the divider floated over a
         * stripe of empty ground instead of meeting the object it is masking.
         *
         * Measured at 16:9, the cabinet's top edge is at 20.3% of frame height
         * when the slide opens — the camera matches the slide before it, so
         * that is as low as it ever sits — and climbs to about 15% as the
         * camera pushes into the drawer. The rule went at 12%, above the
         * cabinet the whole way, which is why it read as floating.
         *
         * 17.5% is the second pass. The first took 21.5%, which cleared the
         * cabinet at every moment of the slide and was too much band: it hid a
         * quarter of the object the slide is about. This sits inside the range
         * the cabinet's edge travels through, so the divider clips it for most
         * of the slide and leaves a shallow gap over the first second or so,
         * while the camera is still in the wide pose. That is the trade, and
         * it is the right way round — the gap is briefest exactly when there
         * is least to look at.
         *
         * The air this leaves between the headline and the rule is the same
         * change, not a second one — lowering the divider IS what opens that
         * gap, and the band reads as a masthead rather than a caption stuck to
         * a line.
         *
         * A fixed share of HEIGHT because the cabinet's is one too. It is tuned
         * for 16:9, which is what the stage is designed around: on anything
         * wider the cabinet rises and the band simply clips more of it, and on
         * anything squarer it drops and a thin gap can come back.
         */
        minHeight: "clamp(84px, 17.5vh, 210px)",
        justifyContent: "space-between",

        /* The run's own top and side padding, to the pixel. No foot: see above. */
        padding: "clamp(24px, 4vw, 72px) clamp(28px, 5vw, 92px) 0",
      }}
    >
      <PageHead title={title} lede={lede} accent={accent} scale={BAR_TYPE} />
    </section>
  );
}
