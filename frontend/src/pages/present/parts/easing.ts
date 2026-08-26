/**
 * EASING
 *
 * The three curves the whole deck is animated with. They were copy-pasted
 * into nine files before this existed, which meant nine chances for one of
 * them to drift and for two slides to move on subtly different curves.
 *
 * If you are writing a new act, you almost certainly want one of these three
 * and nothing else.
 */

import * as THREE from "three";

/** Hold a value inside 0..1. Use it on anything arriving from a slide. */
export const clamp01 = (x: number) => THREE.MathUtils.clamp(x, 0, 1);

/**
 * The deck's house curve. Zero velocity AND zero acceleration at both ends.
 *
 * Plain linear reads as mechanical and plain smoothstep still starts with a
 * visible tug; this settles the way something heavy does, which is the feel
 * every act is going for. Reach for it whenever you are blending between two
 * arrangements of the same thing.
 */
export const smootherstep = (x: number): number => {
  const t = clamp01(x);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/**
 * Frame-rate independent chase toward a target.
 *
 * Use this when something FOLLOWS rather than being placed — a figure's gait
 * blending in, a panel catching up to a spec. `speed` is roughly "how many
 * e-foldings per second", so 5 is brisk and 1.5 is languid.
 *
 * The exponential is what makes it frame-rate independent. A plain
 * `lerp(current, target, 0.1)` moves twice as fast on a 120Hz screen as on a
 * 60Hz one, and the deck has to look the same on unknown presenting hardware.
 */
export const ease = (
  current: number,
  target: number,
  speed: number,
  delta: number
) => THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta));
