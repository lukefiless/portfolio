/**
 * ACT — THE PICTURE WITH PIECES MISSING
 *
 * A jigsaw, assembled except for a handful of gaps. The gaps are the slide:
 * the data is nearly all there, and "nearly" is the entire problem.
 *
 * WHY A PUZZLE RATHER THAN AN EMPTY SPACE
 *
 * A missing piece is not the same claim as a blank. A blank says there is
 * nothing; a hole in a jigsaw says there is a shape, it is known exactly, and
 * something that fits it has not arrived. That is precisely the situation the
 * slide describes — the fields are defined, the join is understood, and the
 * key that would complete it does not exist yet.
 *
 * THE ONE RULE THAT MAKES IT LOOK LIKE A JIGSAW
 *
 * Neighbouring pieces have to interlock: a piece's right edge must be the
 * exact negation of the next piece's left edge. Randomise the edges per piece
 * and you get a field of blobs that never reads as a puzzle, however well it
 * is lit. `edgeFor` below is that rule, and it is why the edge signs are
 * derived from grid position rather than stored.
 *
 * WHY IT DOES NOT FINISH ON SCREEN
 *
 * `complete` exists and works, and every slide in the deck currently holds it
 * low. That is deliberate and inherited from the act this replaced: the gap
 * is real and unsolved, so the act is allowed to state the problem and stop.
 * Raising `complete` on a future slide drops the missing pieces into place,
 * for the day there is something to show.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { GOLD_HEX } from "../palette";

import { clamp01, smootherstep } from "../parts/easing";
import {
  createPuzzlePieceGeometry,
  type Edge,
  type PieceEdges,
} from "../parts/puzzlePiece";

const COLS = 6;
const ROWS = 4;

/** Body size of one piece. Pitch equals this, so bodies tile exactly. */
const PIECE = 1.5;

const THICKNESS = 0.34;

/**
 * Which pieces are absent, as grid indices.
 *
 * Hand-picked rather than random, and scattered rather than clustered. A
 * random set clumps often enough to read as one torn corner, which is a
 * different and much less interesting claim than "holes throughout".
 */
const MISSING = new Set([7, 9, 14, 16, 21]);

export interface PuzzleState {
  /**
   * 0 = the gaps are open, 1 = every missing piece has dropped into place.
   *
   * Held near 0 by the deck today. See the note at the top of the file.
   */
  complete: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type PuzzleAct = Act<PuzzleState>;

/**
 * The sign of one edge, derived from the grid rather than stored.
 *
 * Both pieces sharing an edge call this with the SAME `(x, y, horizontal)`
 * and get the same answer, then one of them negates it. That is what
 * guarantees a tab always meets a socket — there is no second copy of the
 * value to fall out of step.
 *
 * The hash is arbitrary; all it has to be is stable and not obviously
 * patterned, or the puzzle grows visible stripes of identical edges.
 */
const edgeFor = (x: number, y: number, horizontal: boolean): Edge => {
  const h = Math.sin((x * 12.9898 + y * 78.233 + (horizontal ? 3.7 : 0)) * 43.1);

  return h > 0 ? 1 : -1;
};

export function createPuzzleAct(): PuzzleAct {
  const root = new THREE.Group();

  root.position.set(0, 2.4, 0);

  const accent = new THREE.Color(GOLD_HEX);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  /** Track a geometry for disposal and hand it straight back. */
  const keepGeometry = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };

  /** Track a material for disposal and hand it straight back. */
  const keepMaterial = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  /* --------------------------------------------------------------- backing */

  /*
   * A dark plate behind the puzzle. Without it a hole shows the void, which
   * at this camera distance is the same colour as the gaps between acts and
   * reads as a rendering fault rather than as an absence.
   */
  const backingGeometry = keepGeometry(
    new THREE.BoxGeometry(COLS * PIECE + 0.5, ROWS * PIECE + 0.5, 0.12)
  );

  const backingMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x0d1220,
      roughness: 0.92,
      metalness: 0.05,
    })
  );

  const backing = new THREE.Mesh(backingGeometry, backingMaterial);
  backing.position.z = -THICKNESS * 0.9;
  backing.receiveShadow = true;
  root.add(backing);

  /* --------------------------------------------------------------- pieces */

  /*
   * Placed pieces and missing ones share a material each. Two materials for
   * twenty-four pieces, so recolouring on accent is two writes rather than
   * twenty-four.
   */
  const placedMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2c3446,
      roughness: 0.55,
      metalness: 0.35,
    })
  );

  /*
   * The missing pieces, once they arrive. Lit rather than shaded, because the
   * point of them is that they are the answer — they should read as arriving
   * with the accent on them, not as more of the same board.
   */
  const arrivingMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2c3446,
      roughness: 0.42,
      metalness: 0.35,
      emissive: accent.clone(),
      emissiveIntensity: 0.55,
    })
  );

  interface Slot {
    mesh: THREE.Mesh;
    missing: boolean;
    homeX: number;
    homeY: number;

    /** Per-piece offsets, so the missing ones do not arrive as one block. */
    delay: number;
    fromX: number;
    fromY: number;
    spin: number;
  }

  const slots: Slot[] = [];

  const originX = -((COLS - 1) * PIECE) / 2;
  const originY = -((ROWS - 1) * PIECE) / 2;

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      const index = y * COLS + x;
      const missing = MISSING.has(index);

      /*
       * Outer edges are flat, inner edges interlock. Each piece NEGATES the
       * shared value on its left and bottom, so the neighbour that owns the
       * other side of that edge gets the opposite sign.
       */
      const edges: PieceEdges = {
        left: x === 0 ? 0 : (-edgeFor(x, y, true) as Edge),
        right: x === COLS - 1 ? 0 : edgeFor(x + 1, y, true),
        bottom: y === 0 ? 0 : (-edgeFor(x, y, false) as Edge),
        top: y === ROWS - 1 ? 0 : edgeFor(x, y + 1, false),
      };

      const geometry = keepGeometry(
        createPuzzlePieceGeometry(edges, {
          size: PIECE,
          thickness: THICKNESS,
        })
      );

      const mesh = new THREE.Mesh(
        geometry,
        missing ? arrivingMaterial : placedMaterial
      );

      const homeX = originX + x * PIECE;
      const homeY = originY + y * PIECE;

      mesh.position.set(homeX, homeY, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      root.add(mesh);

      slots.push({
        mesh,
        missing,
        homeX,
        homeY,
        delay: (index % 7) * 0.09,
        fromX: ((index % 5) - 2) * 1.7,
        fromY: 5.5 + (index % 3) * 1.2,
        spin: ((index % 4) - 1.5) * 0.7,
      });
    }
  }

  let elapsed = 0;

  /**
   * One frame. `complete` drops the missing pieces into their holes; the
   * placed ones only breathe.
   */
  const update = (delta: number, state: PuzzleState) => {
    elapsed += delta;

    const filled = clamp01(state.complete);

    for (const slot of slots) {
      if (!slot.missing) {
        /*
         * A very small lift, out of phase per piece. Enough that the board is
         * not a still image while somebody talks over it, and small enough
         * that it never competes with the holes.
         */
        slot.mesh.position.z =
          Math.sin(elapsed * 0.9 + slot.homeX * 0.6 + slot.homeY) * 0.012;

        continue;
      }

      /* Each missing piece runs its own slice of the ramp. */
      const own = smootherstep(clamp01((filled - slot.delay) / (1 - slot.delay)));

      slot.mesh.visible = own > 0.001;

      slot.mesh.position.set(
        THREE.MathUtils.lerp(slot.homeX + slot.fromX, slot.homeX, own),
        THREE.MathUtils.lerp(slot.homeY + slot.fromY, slot.homeY, own),
        THREE.MathUtils.lerp(3.2, 0, own)
      );

      slot.mesh.rotation.z = THREE.MathUtils.lerp(slot.spin, 0, own);

      /* Bright on the way in, settling to the board once seated. */
      slot.mesh.scale.setScalar(THREE.MathUtils.lerp(1.08, 1, own));
    }

    arrivingMaterial.emissiveIntensity = 0.55 * (1 - filled * 0.7);
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    arrivingMaterial.emissive.copy(color);
  };

  /**
   * Only the clock accumulates; every position is a pure function of
   * `complete`, so there is nothing else to undo.
   */
  const reset = () => {
    elapsed = 0;
  };

  const dispose = () => {
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());

    geometries.length = 0;
    materials.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
