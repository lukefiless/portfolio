/**
 * PARAMETRIC GEAR
 *
 * The first entry in the shared kit of parts. Every machine in the deck is
 * assembled from generators like this one, so nothing looks off-brand and
 * each new act costs a fraction of the one before it.
 *
 * Teeth are trapezoidal rather than true involute curves. At keynote framing
 * the difference is invisible, and the profile stays cheap enough to build a
 * dozen gears without thinking about it.
 */

import * as THREE from "three";

export interface GearOptions {
  /** Number of teeth. Also sets the gear ratio against its partner. */
  teeth: number;

  /**
   * Tooth size. Two gears mesh correctly only when their modules match:
   * pitch radius = module * teeth / 2.
   */
  module: number;

  /** Extrusion depth along Z. */
  thickness: number;

  /** Radius of the centre bore the shaft passes through. */
  bore: number;
}

/** Radius of the imaginary circle where two meshing gears make contact. */
export function pitchRadius(teeth: number, module: number): number {
  return (module * teeth) / 2;
}

/**
 * Rotational offset that lands a tooth gap on the line of centres, so a
 * partner gear's tooth drops into it instead of colliding with a tooth.
 * Apply to whichever gear sits on the +X side of its driver.
 */
export function meshPhase(teeth: number): number {
  return Math.PI - Math.PI / teeth;
}

/**
 * Builds a gear centred on the origin, lying in the XY plane, extruded along
 * Z. Tooth 0 is centred on +X, which is what `meshPhase` assumes.
 */
export function createGearGeometry(
  options: GearOptions
): THREE.ExtrudeGeometry {
  const { teeth, module, thickness, bore } = options;

  const pitch = pitchRadius(teeth, module);
  const tipRadius = pitch + module;
  const rootRadius = pitch - 1.25 * module;

  const anglePerTooth = (Math.PI * 2) / teeth;

  /* Angular half-widths, as a fraction of one tooth pitch. */
  const rootHalf = anglePerTooth * 0.3;
  const tipHalf = anglePerTooth * 0.17;

  const shape = new THREE.Shape();

  /** Polar to cartesian. Every point on the tooth profile comes from here. */
  const pointAt = (radius: number, angle: number) =>
    new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius);

  for (let i = 0; i < teeth; i += 1) {
    const centre = i * anglePerTooth;

    const riseStart = pointAt(rootRadius, centre - rootHalf);
    const tipStart = pointAt(tipRadius, centre - tipHalf);
    const tipEnd = pointAt(tipRadius, centre + tipHalf);
    const fallEnd = pointAt(rootRadius, centre + rootHalf);

    if (i === 0) {
      shape.moveTo(riseStart.x, riseStart.y);
    } else {
      shape.lineTo(riseStart.x, riseStart.y);
    }

    shape.lineTo(tipStart.x, tipStart.y);
    shape.lineTo(tipEnd.x, tipEnd.y);
    shape.lineTo(fallEnd.x, fallEnd.y);

    /*
     * Sweep the root circle across to the next tooth so the valley between
     * teeth is curved rather than a flat chord.
     */
    const valleyStart = centre + rootHalf;
    const valleyEnd = centre + anglePerTooth - rootHalf;
    const valleySteps = 3;

    for (let step = 1; step <= valleySteps; step += 1) {
      const angle =
        valleyStart + ((valleyEnd - valleyStart) * step) / valleySteps;

      const point = pointAt(rootRadius, angle);
      shape.lineTo(point.x, point.y);
    }
  }

  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, bore, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const bevel = module * 0.14;

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 8,
    steps: 1,
  });

  /* Extrusion runs 0 → depth; recentre it on the XY plane. */
  geometry.translate(0, 0, -thickness / 2);
  geometry.computeVertexNormals();

  return geometry;
}
