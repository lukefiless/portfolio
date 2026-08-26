/**
 * THE ACT CONTRACT
 *
 * Every act on this stage is the same shape. That is the only reason
 * `Present.tsx` can hold eight unrelated machines in one array and treat them
 * interchangeably, and it is the first thing to understand before writing a
 * new one.
 *
 * An act is a single object that knows how to pose itself for any value of
 * ONE number. It owns its geometry and its own internal clock. It does not
 * own the camera, the lights, the background, or when it starts — the slide
 * owns all of that, as data, in `slides.ts`.
 *
 * ---------------------------------------------------------------------------
 * THE LIFECYCLE, in the order it happens
 * ---------------------------------------------------------------------------
 *
 *   createXAct()      once, at page load. Build every mesh here. Acts are
 *                     never rebuilt on slide change — they are shown and
 *                     hidden — so construction cost is paid once and a beat
 *                     never stalls behind a few hundred geometries.
 *
 *   reset()           every time its slide is entered or replayed. Undo
 *                     anything that ACCUMULATES: a clock, a queue, a ledger,
 *                     a physics pile. An act that forgets this opens its
 *                     replay halfway through the previous run.
 *
 *   setAccent(colour) every frame it is on stage, before update. Paint
 *                     anything that should read as "lit".
 *
 *   update(dt, state) every frame it is on stage. `dt` is seconds since the
 *                     last frame — multiply all motion by it, or the act runs
 *                     at a different speed on a 120Hz screen.
 *
 *   dispose()         when the page unmounts. Free every GPU resource. Use
 *                     `createResourcePool` and this is one line.
 *
 * ---------------------------------------------------------------------------
 * THE FOUR RULES
 * ---------------------------------------------------------------------------
 *
 * 1. ALLOCATE NOTHING IN UPDATE. It runs sixty times a second. Hoist every
 *    Vector3, Quaternion, Matrix4 and Color to module or closure scope and
 *    reuse them. A `new THREE.Vector3()` inside the loop is the single most
 *    common performance mistake in this codebase's history.
 *
 * 2. BLEND, DO NOT SWITCH. The deck's grammar is "here is the before, here is
 *    the after, here is it becoming the after". A hard threshold throws away
 *    the only part an audience actually reads. `smootherstep` is the curve.
 *
 * 3. NAME THE STATE AFTER WHAT IT MEANS. `automated`, `ordered`, `handsOff`,
 *    `keyed`. A slide that reads `handsOff: 0 -> 1` explains itself in the
 *    deck file; `progress: 0 -> 1` explains nothing and sends the reader here.
 *
 * 4. MeshStandardMaterial IS LIT, MeshBasicMaterial IS NOT. Standard for
 *    anything that should read as a solid object in a room; Basic for
 *    anything that should read as LIT UP rather than well lit. That one
 *    distinction carries most of the deck's look — and note that only Basic
 *    materials at high intensity cross the bloom threshold, so it is also how
 *    you decide what glows.
 */

import type * as THREE from "three";

/**
 * What every act implements.
 *
 * `TState` is the act's own control object — always a single named number.
 * See the four rules above, rule 3.
 */
export interface Act<TState> {
  /**
   * Added to the scene once at build, then shown and hidden per slide.
   * Position the act in WORLD space on this group, once, at construction.
   */
  root: THREE.Group;

  /** Pose the act for this frame. `delta` is seconds. */
  update: (delta: number, state: TState) => void;

  /** The slide's accent colour, every frame. */
  setAccent: (color: THREE.Color) => void;

  /** Return internal state to frame zero. Called on entry and on replay. */
  reset: () => void;

  /** Free every GPU resource this act created. */
  dispose: () => void;
}
