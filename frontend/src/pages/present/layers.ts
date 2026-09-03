/**
 * THE TWO OPT-OUTS
 *
 * Everything on this stage is inked and washed onto paper by default — see
 * `sketch.ts`. Two things need to escape that, and they are not the same
 * request.
 *
 * THE WEAK ONE — `NO_INK_LAYER`
 *
 * "Draw me normally, but do not trace a line around me." For an object that
 * is only ever meant to be seen as a smudge of shadow or a patch of colour,
 * never as a shape with an edge: an invisible `ShadowMaterial` floor, a
 * canvas-text label plane, a particle dot. The sketch pass finds edges from
 * depth and normals and has no idea any of these are not meant to read as
 * silhouettes — a 200-unit shadow-catcher plane once inked its own far edge
 * as a hard horizon across three slides. `mesh.layers.set(NO_INK_LAYER)` is
 * the fix, and it is *only* a fix for the outline: the mesh still renders,
 * still receives the wash, because the deck's shared camera is widened to
 * see this layer too — see the note in `sketch.ts` on why that widening
 * lives there and not here.
 *
 * THE STRONG ONE — `UNDRAWN_LAYER`, via `markUndrawn`
 *
 * "I am not a drawing at all." The filing cabinet is the one object on this
 * stage that is real rather than proposed, and the deck's whole visual
 * argument — everything else is inked, this is not — depends on it staying a
 * solid, lit thing straight through the sketch pass, wash and all. See the
 * long comment in `acts/cabinetAct.ts` for why.
 *
 * WHY TWO LAYERS AND NOT ONE
 *
 * A label or a shadow-catcher should still pick up the paper tint like
 * everything else; the cabinet should not. Folding both into one flag would
 * either wash the cabinet (undermining the argument) or leave labels
 * unwashed (a label lit paper-white on a toned page, sitting oddly on top).
 */

import * as THREE from "three";

/** See "THE WEAK ONE" above. */
export const NO_INK_LAYER = 1;

/** See "THE STRONG ONE" above. */
export const UNDRAWN_LAYER = 2;

/**
 * Mark a whole subtree as not a drawing — see "THE STRONG ONE" above.
 *
 * Layers are a per-object property and are never inherited by children, so
 * this has to traverse rather than being set once on a group. Call it AFTER
 * the subtree is attached to its final parent: `traverse` only sees what has
 * already been added.
 */
export function markUndrawn(root: THREE.Object3D): void {
  root.traverse(node => {
    node.layers.set(UNDRAWN_LAYER);
  });
}
