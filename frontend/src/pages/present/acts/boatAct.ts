/**
 * ACT — A SHIP ON OPEN WATER
 *
 * One boat, riding a sea that goes to the horizon. Nothing arrives, nothing
 * is sorted, nothing transforms. The act is a mood rather than a mechanism,
 * and that is deliberate: it replaced a funnel full of moving parts because
 * the slide it sits under wanted a held image to talk over, not a diagram
 * competing for attention.
 *
 * HOW THE SHIP FLOATS
 *
 * Not by having its own bobbing animation. A boat animated on its own clock
 * beside water animated on another is the single most obvious cheat in a
 * scene like this — the hull rises while the swell beneath it falls, and it
 * reads as a toy on a painted backdrop.
 *
 * Instead the hull is FITTED to the water, every frame, by sampling the same
 * wave field the shader draws:
 *
 *   BOW and STERN   two samples along the keel. Their height difference is
 *                   the pitch — nose down into a trough, nose up over a crest.
 *
 *   PORT and STBD   two samples across the beam, giving the roll.
 *
 *   the four        averaged, giving the height to sit the hull at.
 *
 * Three sines times four points is nothing, and the result is a boat that
 * cannot be out of step with its own sea, because it is not keeping time at
 * all — it is reading position.
 *
 * The sample points are spread to a FRACTION of the hull rather than to its
 * ends. A real hull spans many wavelengths of the shorter waves and averages
 * them out; sampling at the true bow and stern picks up every ripple and
 * makes a heavy ship twitch like a cork.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX } from "../palette";

import { clamp01, ease } from "../parts/easing";
import { createOcean, type Ocean } from "../parts/ocean";
import { createPropModel, type PropModel } from "../parts/propModel";

/** The ship. Null falls back to the placeholder hull built below. */
const SHIP_MODEL: string | null = "/models/ship.glb";

/**
 * Length to scale the ship to, along its keel.
 *
 * Sized by DEPTH, not width or height: a ship's length is the dimension it is
 * designed around, and beam and mast height follow from it. The file measures
 * roughly 7 x 18 x 30 once its Z-up correction is applied, so sizing by
 * height would be sizing by the masts.
 */
const SHIP_LENGTH = 17;

/**
 * Y rotation applied before measuring. The file's keel runs along Z already,
 * so this is zero — set it to `Math.PI` if the ship sails backwards, or to a
 * quarter turn if it comes in broadside.
 */
const SHIP_TURN = 0;

/**
 * How far the hull sinks below the waterline it is fitted to.
 *
 * The loader grounds a model on y = 0, meaning the very bottom of the keel is
 * placed on the water rather than in it. Without this the ship skates across
 * the surface like a paper boat.
 */
const DRAFT = 0.7;

/*
 * Where the hull is sampled, as fractions of its own size. See the note at
 * the top on why these are not 0.5.
 */
const KEEL_SPAN = 0.3;
const BEAM_SPAN = 0.34;

export interface BoatState {
  /**
   * 0 = a flat calm, 1 = a working swell.
   *
   * Drives the water and the ship together, because the ship reads the water
   * — there is no separate "rock the boat harder" control, and there could
   * not be one without the two falling out of agreement.
   */
  swell: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type BoatAct = Act<BoatState>;

export function createBoatAct(): BoatAct {
  const root = new THREE.Group();

  const accent = new THREE.Color(SAGE_HEX);

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

  /* ------------------------------------------------------------------ sea */

  const ocean: Ocean = createOcean({ size: 460, segments: 128 });
  root.add(ocean.mesh);

  /* ----------------------------------------------------------------- ship */

  /*
   * The hull rides this, and `hull` inside it carries the model. Two groups
   * rather than one because the pitch and roll are written every frame while
   * the model's own placement inside them is written once — mixing the two
   * means the load handler and the render loop fight over one rotation.
   */
  const boat = new THREE.Group();
  root.add(boat);

  const hull = new THREE.Group();
  boat.add(hull);

  /*
   * A placeholder, shown until the file lands and hidden after. Crude on
   * purpose: it exists so the act is never an empty sea, and so a bad path
   * degrades to something floating rather than to nothing at all.
   */
  const stubGeometry = keepGeometry(
    new THREE.BoxGeometry(SHIP_LENGTH * 0.22, SHIP_LENGTH * 0.1, SHIP_LENGTH)
  );

  const stubMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2a2118,
      roughness: 0.75,
      metalness: 0.1,
    })
  );

  const stub = new THREE.Mesh(stubGeometry, stubMaterial);
  stub.castShadow = true;
  hull.add(stub);

  let ship: PropModel | null = null;

  if (SHIP_MODEL) {
    ship = createPropModel(SHIP_MODEL, {
      depth: SHIP_LENGTH,
      turn: SHIP_TURN,
    });

    /*
     * Dropped by the draft, so the loader's "sitting on y = 0" becomes
     * "floating at its waterline".
     */
    ship.root.position.y = -DRAFT;
    hull.add(ship.root);

    ship.ready
      .then(() => {
        stub.visible = false;
      })
      .catch(error =>
        console.warn("[boat] keeping the placeholder hull:", error.message)
      );
  }

  /* --------------------------------------------------------------- state */

  let elapsed = 0;

  /*
   * Smoothed, so the hull settles into the swell instead of snapping to it on
   * the first frame and whenever `swell` moves.
   */
  let pitch = 0;
  let roll = 0;
  let rise = 0;

  let primed = false;

  const update = (delta: number, state: BoatState) => {
    elapsed += delta;

    const swell = clamp01(state.swell);

    ocean.update(elapsed, swell);

    /*
     * Sample the water under the hull. All four are taken in the boat's own
     * frame, which is axis aligned here — a ship that also turned would need
     * these rotated into world space first.
     */
    const halfKeel = SHIP_LENGTH * KEEL_SPAN;
    const halfBeam = SHIP_LENGTH * BEAM_SPAN * 0.22;

    const bow = ocean.heightAt(0, halfKeel, elapsed, swell);
    const stern = ocean.heightAt(0, -halfKeel, elapsed, swell);
    const port = ocean.heightAt(-halfBeam, 0, elapsed, swell);
    const starboard = ocean.heightAt(halfBeam, 0, elapsed, swell);

    const targetRise = (bow + stern + port + starboard) / 4;

    /*
     * atan2 of rise over run, so the tilt is the true angle of the water
     * between the two samples rather than a height difference scaled by a
     * number that happened to look right.
     */
    const targetPitch = -Math.atan2(bow - stern, halfKeel * 2);
    const targetRoll = Math.atan2(starboard - port, halfBeam * 2);

    if (!primed) {
      /* First frame lands on the water rather than easing down onto it. */
      primed = true;
      rise = targetRise;
      pitch = targetPitch;
      roll = targetRoll;
    } else {
      rise = ease(rise, targetRise, 9, delta);
      pitch = ease(pitch, targetPitch, 7, delta);
      roll = ease(roll, targetRoll, 6, delta);
    }

    boat.position.y = rise;
    boat.rotation.x = pitch;
    boat.rotation.z = roll;
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    ocean.setAccent(accent);
  };

  /**
   * Back to a flat sea at frame zero.
   *
   * `primed` matters as much as the clock: without it a replay eases the hull
   * down from wherever the last run left it, which on a big swell is a
   * visible swoop before the act settles.
   */
  const reset = () => {
    elapsed = 0;
    primed = false;
  };

  const dispose = () => {
    ship?.dispose();
    ocean.dispose();

    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());

    geometries.length = 0;
    materials.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
