/**
 * THE WALK, AS NUMBERS
 *
 * Every angle and offset the figure needs for one frame, computed from the
 * stride phase and a few blend amounts — and nothing else. No meshes, no
 * bones, no scene graph.
 *
 * Keeping the animation separate from what it drives is what lets the same
 * walk play on the procedural dummy AND on an imported skeleton. Both ask
 * for a pose and apply it to whatever they happen to be made of.
 *
 * The principles this encodes:
 *
 *   squash and stretch  the body compresses on each footfall and extends
 *                       through the passing pose, volume roughly preserved
 *   overlapping action  the head and forearms trail the parts that drag
 *                       them, so nothing arrives all at once
 *   counter-rotation    shoulders twist against the hips, which is what
 *                       stops a walk looking like a marching toy
 *   arcs                the pelvis travels a rounded path, never a straight
 *                       vertical bob
 *   weight              carrying tips the whole body back and drops its
 *                       centre, and the stride gets heavier for it
 */

import * as THREE from "three";

export interface FigureInput {
  /** Stride phase in radians. Keeps increasing; never reset it. */
  phase: number;

  /** 0 = standing still, 1 = walking at full effort. Blend it. */
  gait: number;

  /** 0 = empty handed, 1 = hauling the load. Blend it. */
  load: number;

  /**
   * 0 = hands held normally, 1 = arms extended out to grasp or set down.
   * Drives the grip forward too, so anything following the hands comes with
   * them.
   */
  reach: number;

  /** Seconds. Drives idle motion that must never stop, like breathing. */
  time: number;

  /**
   * 0 = hands wherever the rest of the pose put them, 1 = hands working over
   * a keyboard in front of the figure. Blend it.
   *
   * Distinct from `reach`, and the difference is the whole point. Reaching
   * swings the arms out and back through their full range, which is what a
   * person does to PICK SOMETHING UP; typing holds them at a settled desk
   * posture and moves the hands a little within it. Cycling `reach` to fake
   * typing is what this replaces — it read as six people repeatedly grabbing
   * at their monitors.
   *
   * The two hands are driven from `time` at different rates and offsets, so
   * they never land together. Hands moving in unison is the tell that turns
   * an idle into an animation played twice.
   */
  typing?: number;

  /**
   * 0 = standing, 1 = sat down. Blend it.
   *
   * Optional because most callers never sit. When it is set the thighs swing
   * forward to horizontal, the knees fold to vertical, and the whole body
   * drops by roughly a thigh — a figure that folds its legs without lowering
   * its hips is a figure hovering above a chair.
   */
  seated?: number;
}

/** One side's limb angles, in radians. */
export interface LimbPose {
  /** Hip or shoulder swing. */
  upper: number;

  /** Knee or elbow flex. Only ever bends one way. */
  lower: number;

  /** Ankle, or unused on an arm. */
  tip: number;

  /** Outward lift, used by the arms when carrying or reaching. */
  spread: number;
}

/** Everything one frame of the walk needs, in the rig's own terms. */
export interface Pose {
  legL: LimbPose;
  legR: LimbPose;
  armL: LimbPose;
  armR: LimbPose;

  /** The whole body, moved as one. Sway, bob, lean and squash. */
  body: {
    offsetX: number;
    offsetY: number;
    rotX: number;
    rotZ: number;
    stretchY: number;
    stretchXZ: number;
  };

  /** Hips. `rotY` is the twist that opposes the chest. */
  pelvis: { rotY: number; rotZ: number };

  /** Ribcage. Counter-rotates against the pelvis; `breathe` is idle scale. */
  chest: { rotY: number; rotZ: number; breathe: number };

  /** Skull. Lags the chest, so it reads as carried rather than bolted on. */
  head: { rotX: number; rotY: number; rotZ: number };

  /**
   * Where a carried object should sit, relative to the body. Anything the
   * figure is holding parents here rather than to a hand, so it stays put
   * through a stride instead of jittering with the arm swing.
   */
  grip: { y: number; z: number };
}

const clamp01 = (x: number) => THREE.MathUtils.clamp(x, 0, 1);

/**
 * One frame of the walk, as numbers. Pure — same input, same output, no
 * meshes touched and no state kept between calls.
 *
 * The caller owns `phase` and keeps advancing it; everything else is a blend
 * amount it can move freely. Both figures in the deck call this and then
 * apply the result to whatever they happen to be made of, which is the only
 * reason the procedural dummy and the imported skeleton walk identically.
 */
export function computePose({
  phase,
  gait,
  load,
  reach,
  time,
  typing = 0,
  seated = 0,
}: FigureInput): Pose {
  const walk = clamp01(gait);
  const held = clamp01(load);
  const stretchOut = clamp01(reach);
  const keys = clamp01(typing);
  const sat = clamp01(seated);

  const swing = Math.sin(phase);
  const lagged = Math.sin(phase - 0.55);

  /* Two footfalls per stride, so this drives squash at double rate. */
  const impact = Math.cos(phase * 2);

  /*
   * Knees only ever flex one way. Taking the negative half of a
   * phase-shifted sine gives a bend that peaks through the swing and
   * straightens for the plant, which is what stops the legs looking like
   * scissors.
   */
  const flexL = Math.max(0, -Math.sin(phase - 0.9)) * 0.92 * walk;
  const flexR = Math.max(0, -Math.sin(phase + Math.PI - 0.9)) * 0.92 * walk;

  /* ------------------------------------------------------------------ arms */

  let upperL: number;
  let upperR: number;
  let foreL: number;
  let foreR: number;
  let spreadL: number;
  let spreadR: number;

  if (held > 0.001) {
    /* Out front, elbows tucked, sagging a little under the weight. */
    const strain = Math.sin(time * 5.5) * 0.02 * held;

    /*
     * Lowered from a near-horizontal reach. The grip is the midpoint of the
     * hands, so anything carried rides wherever the arms put it — and at the
     * old angle the load sat at head height and hid the face of whoever was
     * carrying it. Held at chest, the character stays readable as a person
     * doing the work rather than as a box with legs.
     */
    const carry = -0.92 + strain;

    upperL = THREE.MathUtils.lerp(-swing * 0.52 * walk, carry, held);
    upperR = THREE.MathUtils.lerp(swing * 0.52 * walk, carry, held);

    spreadL = held * 0.26;
    spreadR = -held * 0.26;

    foreL = -held * 0.62;
    foreR = -held * 0.62;
  } else {
    upperL = -swing * 0.52 * walk;
    upperR = swing * 0.52 * walk;

    spreadL = 0.07;
    spreadR = -0.07;

    /*
     * NEGATIVE, matching the carry above. An elbow folds one way only, and
     * this branch had the opposite sign to the carrying one — so the arms
     * bent correctly on the way out with the load and hinged BACKWARDS on
     * the empty-handed walk home. The interface has said "only ever bends
     * one way" all along; only this branch disagreed.
     *
     * Trailing is deliberately slight now. A forearm that lags far behind
     * its upper arm is what reads as rubbery, and this figure is meant to
     * look built rather than drawn.
     */
    foreL = -(Math.max(0, -lagged) * 0.3 * walk + 0.1);
    foreR = -(Math.max(0, lagged) * 0.3 * walk + 0.1);
  }

  /*
   * Reaching is layered over whatever the arms were already doing, so it
   * blends out of a carry or a swing rather than replacing either.
   */
  if (stretchOut > 0.001) {
    foreL = THREE.MathUtils.lerp(foreL, -0.1, stretchOut);
    foreR = THREE.MathUtils.lerp(foreR, -0.1, stretchOut);

    upperL = THREE.MathUtils.lerp(upperL, -1.52, stretchOut);
    upperR = THREE.MathUtils.lerp(upperR, -1.52, stretchOut);

    spreadL = THREE.MathUtils.lerp(spreadL, 0.12, stretchOut);
    spreadR = THREE.MathUtils.lerp(spreadR, -0.12, stretchOut);
  }

  /*
   * Typing. Layered last, so it wins over a reach the way it should — a
   * figure told to do both is at a desk, not halfway to a shelf.
   *
   * The posture is upper arms hanging close to the body and elbows folded to
   * roughly a right angle, which is what puts the hands out over a worktop
   * instead of straight out in front of the chest. The two are separate
   * angles rather than one "reach" number precisely so the hands can sit
   * ABOVE the desk rather than pointing at it.
   */
  if (keys > 0.001) {
    /*
     * Two incommensurable rates, so the hands drift in and out of step
     * forever instead of resyncing on a short loop.
     */
    const tapL = Math.sin(time * 8.7);
    const tapR = Math.sin(time * 7.3 + 2.4);

    /* Slower wander, so the hands travel the keyboard rather than drum one spot. */
    const roamL = Math.sin(time * 1.9 + 0.6);
    const roamR = Math.sin(time * 2.3 + 3.1);

    const SHOULDER = -0.34;
    const ELBOW = -1.16;

    upperL = THREE.MathUtils.lerp(upperL, SHOULDER + tapL * 0.045, keys);
    upperR = THREE.MathUtils.lerp(upperR, SHOULDER + tapR * 0.045, keys);

    foreL = THREE.MathUtils.lerp(foreL, ELBOW + tapL * 0.075, keys);
    foreR = THREE.MathUtils.lerp(foreR, ELBOW + tapR * 0.075, keys);

    /* Lateral travel across the keys, which is the part that reads as typing. */
    spreadL = THREE.MathUtils.lerp(spreadL, 0.2 + roamL * 0.075, keys);
    spreadR = THREE.MathUtils.lerp(spreadR, -0.2 + roamR * 0.075, keys);
  }

  /* ------------------------------------------------------------------ body */

  /*
   * Squash and stretch, pulled right down. On a stylised dummy it is charm;
   * on a character with real proportions it reads as the mesh breathing, and
   * that is the single most "wiggly" thing in the whole rig.
   */
  const stretch = 1 + impact * 0.012 * walk;

  return {
    /*
     * The ankle is the term that had to change, and it changed SIGN.
     *
     * Negative here pitches the toe down, and it was scaled off the knee — so
     * the more the leg bent, the harder the foot pointed, and the character
     * walked the entire cycle on tiptoe. It went unnoticed for as long as it
     * did because the procedural dummy's "foot" is a sphere sitting at the
     * ankle: rotating it changes almost nothing you can see. An imported rig
     * has a real foot bone with a real toe on the end of it, and the same
     * numbers read as a ballet pose.
     *
     * Now a small DORSIflexion that rises with the knee — toe up slightly
     * through the swing, flat at the plant, which is what a foot does.
     */
    legL: {
      /*
       * Sitting is a blend, not a branch, so a figure can be part way into a
       * chair and every other term still applies on top of it.
       */
      upper: THREE.MathUtils.lerp(swing * 0.5 * walk + held * 0.06, -1.45, sat),
      lower: THREE.MathUtils.lerp(flexL, 1.5, sat),
      tip: THREE.MathUtils.lerp(flexL * 0.2 - swing * 0.07 * walk, 0.2, sat),
      spread: sat * 0.12,
    },

    legR: {
      upper: THREE.MathUtils.lerp(
        -swing * 0.5 * walk + held * 0.06,
        -1.45,
        sat
      ),
      lower: THREE.MathUtils.lerp(flexR, 1.5, sat),
      tip: THREE.MathUtils.lerp(flexR * 0.2 + swing * 0.07 * walk, 0.2, sat),
      spread: -sat * 0.12,
    },

    armL: { upper: upperL, lower: foreL, tip: 0, spread: spreadL },
    armR: { upper: upperR, lower: foreR, tip: 0, spread: spreadR },

    body: {
      /*
       * Rounded path, not a straight bob — but a shallow one. The sway and
       * the rise are what read as "wiggly" on an imported character, whose
       * proportions are realistic enough that exaggeration looks like a
       * physics glitch rather than like styling. Kept non-zero: a body that
       * travels on a perfectly flat line reads as sliding, not walking.
       */
      offsetX: swing * 0.016 * walk,
      offsetY:
        Math.abs(Math.cos(phase)) * 0.028 * walk - held * 0.05 - sat * 0.37,

      /* Tipped back under the load, leaning into the walk, and into a reach. */
      rotX: -held * 0.17 + walk * 0.06 + stretchOut * 0.13,
      rotZ: -swing * 0.012 * walk,

      /*
       * The horizontal axes take back roughly what the vertical gives up, so
       * the figure does not visibly gain volume as it squashes.
       */
      stretchY: stretch,
      stretchXZ: 1 - (stretch - 1) * 0.55,
    },

    /*
     * Counter-rotation stays, at about a third of its old throw. Removing it
     * outright makes a walk look like a marching toy; leaving it at full
     * makes this character look like it has no spine. A machine that walks
     * still twists a little — it just does not swish.
     */
    pelvis: {
      rotY: swing * 0.06 * walk,
      rotZ: swing * 0.03 * walk,
    },

    chest: {
      rotY: -swing * 0.08 * walk,
      rotZ: -swing * 0.018 * walk,

      /* Breathing continues whether or not the figure is moving. */
      breathe: 1 + Math.sin(time * 1.7) * 0.016,
    },

    head: {
      /*
       * The overlap is nearly gone. A trailing head is the single strongest
       * "hand-animated" cue there is, and it is the first thing to drop when
       * the brief is mechanical. What is left is enough to stop the skull
       * looking welded to the shoulders.
       */
      rotX: held * 0.18 + Math.sin(time * 1.1) * 0.012,
      rotY: lagged * 0.04 * walk + swing * 0.03 * walk,
      rotZ: -lagged * 0.02 * walk,
    },

    grip: {
      y: -0.16 + stretchOut * 0.14 + keys * 0.1,
      z: 0.6 + stretchOut * 0.42 + keys * 0.16,
    },
  };
}
