/**
 * THE MATERIAL PALETTE
 *
 * Every surface in the deck comes from here. Acts used to declare their own
 * `MeshStandardMaterial` inline, which is how five acts ended up with five
 * slightly different greys and why the deck read as a set of demos rather
 * than as one film.
 *
 * The palette is built for a dark studio with a warm key, a cool rim and a
 * bloom pass thresholding LINEAR light. Two rules follow from that and both
 * are load-bearing:
 *
 *   nothing diffuse goes pale     a large light surface under the key clears
 *                                 the bloom threshold and turns into a lamp.
 *                                 The brightest body here is mid-grey.
 *
 *   contrast comes from finish    steel against anodised against glass, not
 *                                 light against dark. That is what makes a
 *                                 near-monochrome scene still read as having
 *                                 several materials in it.
 *
 * Anything that should GLOW is unlit and emissive and is the only thing
 * allowed over the line — see `emissive()`.
 */

import * as THREE from "three";

/** Machined aluminium. The default body for anything engineered. */
export const STEEL = {
  color: 0x8b94a6,
  metalness: 0.66,
  roughness: 0.52,
} as const;

/** Dark anodised. Chassis, racks, the bodies of things that hold other things. */
export const ANODISED = {
  color: 0x2a3142,
  metalness: 0.72,
  roughness: 0.44,
} as const;

/** Deeper still. Recesses, vents, the inside of an opening. */
export const SHADOWED = {
  color: 0x161b26,
  metalness: 0.4,
  roughness: 0.85,
} as const;

/** Navy structural. Framing, plinths, the parts that carry load. */
export const STRUCTURE = {
  color: 0x1d2a4d,
  metalness: 0.58,
  roughness: 0.54,
} as const;

/** Smoked glass. Screen fronts, panels you can half see into. */
export const GLASS = {
  color: 0x0d1420,
  metalness: 0.2,
  roughness: 0.12,
  transparent: true,
  opacity: 0.72,
} as const;

type Spec = Record<string, unknown>;

/** A lit surface. Takes the stage rig. */
export const surface = (spec: Spec, over: Spec = {}) =>
  new THREE.MeshStandardMaterial({ ...spec, ...over });

/**
 * A surface that emits.
 *
 * `intensity` is in units of the bloom threshold — 1 sits exactly on the
 * line, so anything meant to visibly halo wants 1.5 or more and anything
 * meant to read as merely lit wants less than 1. Passing a colour and an
 * intensity separately rather than a pre-multiplied colour is what lets an
 * act repaint every emissive surface when the slide accent changes.
 */
export const emissive = (color: THREE.ColorRepresentation, intensity = 1.6) => {
  const material = new THREE.MeshBasicMaterial({ color });

  material.color.multiplyScalar(intensity);

  return material;
};

/**
 * Re-tint an emissive surface, preserving its intensity.
 *
 * Acts get the accent every frame and most of them want to push it into a
 * handful of lit parts. Doing it by hand is where the multiplier gets lost
 * and a status light silently stops blooming.
 */
export const retint = (
  material: THREE.MeshBasicMaterial,
  color: THREE.Color,
  intensity = 1.6
) => {
  material.color.copy(color).multiplyScalar(intensity);
};
