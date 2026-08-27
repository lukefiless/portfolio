/**
 * TEMPLATE ACT — copy this file to start a new one.
 *
 * Nothing imports this. It exists to be duplicated, renamed and edited, so a
 * new act starts from something that already compiles and already obeys the
 * contract. Deleting it breaks nothing.
 *
 * Read `acts/act.ts` first — it has the lifecycle and the four rules. This
 * file is that contract filled in, with every part of the skeleton in the
 * order an act should be written.
 *
 * ---------------------------------------------------------------------------
 * TO USE IT
 * ---------------------------------------------------------------------------
 *
 * 1. Copy to `acts/yourAct.ts` and rename Template -> Your throughout.
 *
 * 2. In `slides.ts`, add a member to the `ActTrack` union:
 *
 *        | {
 *            kind: "yours";
 *            settled: readonly Keyframe<number>[];
 *          }
 *
 * 3. In `slides.ts`, add a slide to `deck` that uses it.
 *
 * 4. In `Present.tsx`, six lines. The compiler points at most of them if you
 *    forget, because the dispatch is exhaustively narrowed on `kind`:
 *
 *        import      at the top
 *        create      const yourAct = createYourAct();
 *        scene.add   yourAct.root
 *        reset       yourAct.reset();
 *        visible     yourAct.root.visible = slide.act.kind === "yours";
 *        dispatch    an else-if branch calling update
 *        dispose     yourAct.dispose();
 *
 * 5. Nothing else. The counter, arrow keys, Home/End and the replay key all
 *    derive from `slides.length`.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX } from "../palette";
import { clamp01, smootherstep } from "../parts/easing";
import { createResourcePool } from "../parts/resources";
import { STRUCTURE, emissive, retint, surface } from "../parts/materials";

/*
 * Constants at the top, named, with reasoning beside anything chosen rather
 * than obvious. When you come back to retune this at 1am, these should be the
 * only lines you need to touch.
 */
const COUNT = 5;
const SPACING = 1.6;

export interface TemplateState {
  /**
   * The one number.
   *
   * Name it after what it MEANS, not after the animation — `automated`,
   * `ordered`, `handsOff`, `keyed`. A slide reading `handsOff: 0 -> 1`
   * explains itself in the deck file; `progress: 0 -> 1` sends the reader
   * here to find out what it does.
   */
  settled: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the lifecycle
 * and the four rules every act follows.
 */
export type TemplateAct = Act<TemplateState>;

/**
 * Build everything here, once. This runs at page load, not on slide entry —
 * see the lifecycle note in `acts/act.ts` for why.
 */
export function createTemplateAct(): TemplateAct {
  const root = new THREE.Group();

  /*
   * Position the act in WORLD space here, once. The slide's camera is then
   * aimed at wherever you put it. Most acts sit a couple of units up so they
   * clear the copy, and turn a few degrees so they read as an object in a
   * room rather than as a diagram.
   */
  root.position.set(0, 2.2, 0);
  root.rotation.y = -0.14;

  const accent = new THREE.Color(SAGE_HEX);

  /*
   * Everything that touches the GPU goes through the pool, at the moment it
   * is created. Then `dispose` is one line and cannot miss anything.
   */
  const pool = createResourcePool();

  /* --------------------------------------------------------------- build */

  const bodyGeometry = pool.geometry(new THREE.BoxGeometry(1, 1, 1));

  /* Lit by the stage rig — a solid object in a room. */
  const bodyMaterial = pool.material(surface(STRUCTURE));

  /* Ignores light entirely — reads as lit UP, and is what bloom catches. */
  const litMaterial = pool.material(emissive(accent, 1.6));

  const blocks: THREE.Mesh[] = [];

  for (let i = 0; i < COUNT; i += 1) {
    const block = new THREE.Mesh(
      bodyGeometry,
      i === COUNT - 1 ? litMaterial : bodyMaterial
    );

    block.castShadow = true;
    root.add(block);
    blocks.push(block);
  }

  /* --------------------------------------------------------------- state */

  /** Seconds this act has been running. Undone by `reset`. */
  let elapsed = 0;

  /*
   * Scratch, hoisted out of the loop. `update` runs sixty times a second, so
   * a `new THREE.Vector3()` inside it is work handed to the garbage collector
   * for no reason. Rule 1 in `act.ts`.
   */
  const scattered = new THREE.Vector3();
  const ordered = new THREE.Vector3();
  const position = new THREE.Vector3();

  /* -------------------------------------------------------------- update */

  const update = (delta: number, state: TemplateState) => {
    elapsed += delta;

    /*
     * Clamp, then ease. The value arrives already interpolated by the
     * timeline; easing again here shapes how the ACT moves through the
     * change rather than how the number got here.
     */
    const settled = smootherstep(clamp01(state.settled));

    for (let i = 0; i < blocks.length; i += 1) {
      /*
       * Blend between two arrangements rather than switching at a threshold.
       * The becoming is the part an audience reads. Rule 2 in `act.ts`.
       */
      scattered.set(i * 0.3, i * 0.9, 0);
      ordered.set((i - (COUNT - 1) / 2) * SPACING, 0, 0);

      position.copy(scattered).lerp(ordered, settled);

      /* A little life that never stops, so a held slide is not a still. */
      position.y += Math.sin(elapsed * 1.4 + i) * 0.06;

      blocks[i].position.copy(position);
      blocks[i].rotation.z = (1 - settled) * 0.4;
    }
  };

  /* ------------------------------------------------------------ lifecycle */

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);

    /* Keeps the emissive multiplier; setting `.color` directly would lose it. */
    retint(litMaterial, color, 1.6);
  };

  /**
   * Undo anything that ACCUMULATES — a clock, a queue, a ledger, a physics
   * pile. An act that forgets opens its replay halfway through the last run.
   */
  const reset = () => {
    elapsed = 0;
  };

  const dispose = () => {
    pool.dispose();
  };

  return { root, update, setAccent, reset, dispose };
}
