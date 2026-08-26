/**
 * KEYFRAME TIMELINE
 *
 * A slide is no longer a static pose — it is a scene with its own internal
 * timeline. Each property is a track of keyframes in seconds, sampled every
 * frame against the time elapsed since the slide was entered.
 *
 * This is what lets one page carry a whole beat: the camera, the machine and
 * the copy are independent tracks over the same clock, so retiming the story
 * means moving numbers rather than rewriting the render loop.
 */

import * as THREE from "three";

import type { Vec3 } from "./slides";

export interface Keyframe<T> {
  /** Seconds since the slide was entered. */
  at: number;

  value: T;
}

/**
 * Ease with zero velocity AND zero acceleration at both ends. Plain
 * smoothstep still starts with a visible tug; this one settles the way a
 * heavy machine does, which is the whole feel of the act.
 */
const smootherstep = (x: number): number => x * x * x * (x * (x * 6 - 15) + 10);

interface Span {
  from: number;
  to: number;
  blend: number;
}

/**
 * Finds the pair of keyframes surrounding `time` and how far between them it
 * sits. Clamps at both ends, so a track holds its first value before it
 * starts and its last value forever after.
 */
function locate<T>(track: readonly Keyframe<T>[], time: number): Span {
  if (time <= track[0].at) {
    return { from: 0, to: 0, blend: 0 };
  }

  const last = track.length - 1;

  if (time >= track[last].at) {
    return { from: last, to: last, blend: 0 };
  }

  let index = 0;

  while (index < last && track[index + 1].at <= time) {
    index += 1;
  }

  const start = track[index].at;
  const end = track[index + 1].at;
  const span = Math.max(end - start, 1e-6);

  return {
    from: index,
    to: index + 1,
    blend: smootherstep((time - start) / span),
  };
}

export function sampleScalar(
  track: readonly Keyframe<number>[],
  time: number
): number {
  const { from, to, blend } = locate(track, time);

  return THREE.MathUtils.lerp(track[from].value, track[to].value, blend);
}

export function sampleVec3(
  track: readonly Keyframe<Vec3>[],
  time: number,
  out: THREE.Vector3
): THREE.Vector3 {
  const { from, to, blend } = locate(track, time);

  return out
    .fromArray(track[from].value)
    .lerp(scratch.fromArray(track[to].value), blend);
}

export function sampleColor(
  track: readonly Keyframe<string>[],
  time: number,
  out: THREE.Color
): THREE.Color {
  const { from, to, blend } = locate(track, time);

  return out
    .set(track[from].value)
    .lerp(scratchColor.set(track[to].value), blend);
}

/**
 * Step rather than blend — copy swaps outright at its keyframe instead of
 * crossfading through an unreadable middle. The DOM handles the transition.
 */
export function sampleIndex<T>(
  track: readonly Keyframe<T>[],
  time: number
): number {
  let index = 0;

  while (index < track.length - 1 && track[index + 1].at <= time) {
    index += 1;
  }

  return index;
}

const scratch = new THREE.Vector3();
const scratchColor = new THREE.Color();
