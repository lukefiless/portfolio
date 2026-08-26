/**
 * ACT 0 — THE COG
 *
 * The thesis: "I don't want to be just a small cog in a big machine."
 *
 * One shaft, turning at one speed, for the whole beat. What changes is the
 * gear bolted to it: thirteen teeth up to forty-three. Everything downstream
 * is fixed — a small gear meshed to the driver, and a train of four more
 * hanging off that, all of them the same navy, none of them changing size.
 *
 * So the machine is a constant and the cog is the variable, which is the
 * inversion the line is reaching for. The same input drives more and more of
 * the machine, and the train visibly accelerates as the driver grows: the
 * ratio into the first gear climbs from 1:1 to better than 3:1, and every
 * gear after it inherits that. Nothing works harder. The connection changed.
 *
 * Gears grow by GAINING TEETH at a fixed tooth size rather than by scaling.
 * Scaling puts the two out of module, and gears whose teeth are different
 * sizes cannot mesh — they either interpenetrate or drift apart until they
 * are merely touching, and both read as broken. Growing the count keeps a
 * true mesh at every size, and says the better thing anyway: the gear gains
 * capability, it does not simply inflate.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { createGearGeometry, meshPhase, pitchRadius } from "../parts/gear";

const MODULE = 0.2;
const THICKNESS = 0.55;

export const TEETH_MIN = 13;
export const TEETH_MAX = 43;

/** Constant input speed. The shaft never works harder — that is the point. */
const INPUT_RPM = 26;

const TAU = Math.PI * 2;

/**
 * The machine the driver turns. Each entry meshes with the one before it, so
 * the first is the small gear on the driver itself and the rest follow.
 *
 * `angle` is the direction from the previous gear's centre to this one, in
 * radians. The signs alternate so the train curls back on itself instead of
 * marching off the side of the frame — a straight chain of five gears is
 * roughly seventeen units long and no camera framing survives it.
 *
 * All four are deliberately SMALL — eleven to fifteen teeth against a driver
 * that ends on forty-three. The driver opens the beat as just another gear in
 * the train and finishes three times the size of any of them, and that
 * contrast is the only thing on stage doing the arguing. Machine gears any
 * larger and the growth reads as the driver catching up rather than as it
 * outgrowing the lot.
 */
const TRAIN: readonly { teeth: number; angle: number }[] = [
  { teeth: 11, angle: -0.52 },
  { teeth: 14, angle: 0.92 },
  { teeth: 11, angle: -0.98 },
  { teeth: 15, angle: 0.86 },
];

/**
 * Fixed distance from centre for both lit pips, in world units. Pinning the
 * radius is what makes the pips comparable: the driver's orbits at a constant
 * rate no matter how large the gear gets, showing the input never changed,
 * while the first gear's visibly accelerates.
 *
 * Must stay inside the root circle of the smallest gear.
 */
const MARKER_RADIUS = 0.7;

export interface CogState {
  /**
   * Tooth count of the shafted gear. The machine it drives is fixed, so this
   * single number is the only thing in the act that moves.
   */
  driverTeeth: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type CogAct = Act<CogState>;

export function createCogAct(): CogAct {
  const root = new THREE.Group();

  const driverGroup = new THREE.Group();
  root.add(driverGroup);

  /*
   * Every size the driver can take, built once. Each is small, and swapping a
   * prebuilt geometry per frame is far cheaper than regenerating one.
   */
  const driverGeometries = new Map<number, THREE.ExtrudeGeometry>();

  for (let teeth = TEETH_MIN; teeth <= TEETH_MAX; teeth += 1) {
    driverGeometries.set(
      teeth,
      createGearGeometry({
        teeth,
        module: MODULE,
        thickness: THICKNESS,
        bore: 0.3,
      })
    );
  }

  /*
   * Matte rather than mirror-bright. At the old roughness the gears read as
   * chrome ornaments; a machine that does work looks like tooled metal, and
   * the softer highlight also stops the tooth edges strobing as they turn.
   */
  /*
   * Steel, not chrome, and deliberately well short of white.
   *
   * It has to read as the odd one out against the navy machine, and the
   * instinct is to make it bright — but a large pale disc under a key light
   * is the single easiest thing in the deck to push past the bloom threshold,
   * and when it does it stops being a gear and becomes a lamp. The contrast
   * is carried by hue and by the rougher finish, not by brightness.
   */
  const driverMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b94a6,
    metalness: 0.66,
    roughness: 0.58,
  });

  /** One navy for the entire machine, so the driver is the only odd one out. */
  const machineMaterial = new THREE.MeshStandardMaterial({
    color: 0x1d2a4d,
    metalness: 0.58,
    roughness: 0.54,
  });

  const shaftMaterial = new THREE.MeshStandardMaterial({
    color: 0x6c7684,
    metalness: 0.7,
    roughness: 0.4,
  });

  const markerMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: new THREE.Color(0x79f7ff),
    /*
     * Just over the bloom threshold, not far over.
     *
     * At 2.6 each pip was several times full white, and with a pip on every
     * gear the act turned into five floodlights — the machine behind them
     * stopped being visible at all. A reference mark has to be findable, not
     * the brightest thing in the room.
     */
    emissiveIntensity: 3.0,
    roughness: 0.5,
  });

  let driverTeeth = TEETH_MIN;

  const driverMesh = new THREE.Mesh(
    driverGeometries.get(driverTeeth),
    driverMaterial
  );

  driverGroup.add(driverMesh);

  /*
   * The shaft does not grow with its gear. Same input, bigger gear — which is
   * the whole argument. It runs far enough back to disappear into the dark,
   * leaving the door open to follow it into a later act.
   */
  const shaftGeometry = new THREE.CylinderGeometry(0.26, 0.26, 26, 32);
  shaftGeometry.rotateX(Math.PI / 2);
  shaftGeometry.translate(0, 0, -11);

  driverGroup.add(new THREE.Mesh(shaftGeometry, shaftMaterial));

  /* ------------------------------------------------------------- the train */

  const trainGeometries = TRAIN.map(gear =>
    createGearGeometry({
      teeth: gear.teeth,
      module: MODULE,
      thickness: THICKNESS,
      bore: 0.34,
    })
  );

  const trainGroups = TRAIN.map((_gear, index) => {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(trainGeometries[index], machineMaterial));
    root.add(group);

    return group;
  });

  /*
   * Without a reference mark, a large gear turning slowly is hard to read as
   * motion at all. Every gear carries one, at the SAME world radius, which is
   * what makes them comparable: the driver's pip orbits at a constant rate no
   * matter how big the gear gets, and each pip further down the train sweeps
   * visibly faster than the one before it. Reading the speeds off five pips
   * at a shared radius is the beat's entire payload.
   */
  const markerGeometry = new THREE.SphereGeometry(0.115, 20, 20);

  const driverMarker = new THREE.Mesh(markerGeometry, markerMaterial);
  driverGroup.add(driverMarker);

  for (const group of trainGroups) {
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    /* Group scale is 1 on the train, so this radius is already world. */
    marker.position.set(MARKER_RADIUS, 0, THICKNESS * 0.62);
    group.add(marker);
  }

  let driverAngle = 0;

  /*
   * Absorbs the ratio change when the driver changes tooth count. Re-based to
   * exact continuity at the moment of the change and then eased to the
   * nearest valid mesh angle, so the machine glides instead of snapping —
   * snapping up to half a tooth thirty times across the swap reads as jitter.
   */
  let meshCorrection = 0;
  let meshCorrectionTarget = 0;

  /* Scratch, so the loop allocates nothing. */
  const centre = new THREE.Vector2();

  const update = (delta: number, target: CogState) => {
    const teethFloat = THREE.MathUtils.clamp(
      target.driverTeeth,
      TEETH_MIN,
      TEETH_MAX
    );

    const nextDriver = Math.round(teethFloat);

    const firstTeeth = TRAIN[0].teeth;
    const firstAngle = TRAIN[0].angle;

    if (nextDriver !== driverTeeth) {
      const settled = trainGroups[0].rotation.z;

      const ratio = nextDriver / firstTeeth;

      const base =
        -driverAngle * ratio + firstAngle * (1 + ratio) + meshPhase(firstTeeth);

      const step = TAU / firstTeeth;

      /* Start exactly where it already is, then ease onto the true mesh. */
      meshCorrection = settled - base;
      meshCorrectionTarget = Math.round(meshCorrection / step) * step;

      driverTeeth = nextDriver;

      const nextGeometry = driverGeometries.get(driverTeeth);

      if (nextGeometry) {
        driverMesh.geometry = nextGeometry;
      }
    }

    /*
     * The radius comes from the FRACTIONAL tooth count, and the gear is
     * scaled by the small remainder between that and its whole-toothed
     * geometry. Sizing off the integer alone steps the radius by half a
     * module roughly thirty times across the swap, which is what makes it
     * look chunky. The residual scale never exceeds a few percent, so the
     * mesh stays sound.
     */
    const driverRadius = pitchRadius(teethFloat, MODULE);
    const driverScale = driverRadius / pitchRadius(driverTeeth, MODULE);

    driverGroup.scale.setScalar(driverScale);
    driverGroup.position.set(0, 0, 0);

    /* Divided out of the group scale so the WORLD radius stays fixed. */
    driverMarker.position.set(MARKER_RADIUS / driverScale, 0, THICKNESS * 0.62);

    driverAngle += ((INPUT_RPM * TAU) / 60) * delta;

    driverGroup.rotation.z = driverAngle;

    meshCorrection = THREE.MathUtils.lerp(
      meshCorrection,
      meshCorrectionTarget,
      1 - Math.exp(-9 * delta)
    );

    /*
     * Walk the train, carrying position and angle forward from each gear to
     * the next.
     *
     * For an external pair whose line of centres runs at world angle `a`, the
     * driven gear sits at
     *
     *   -ratio * previousAngle + a * (1 + ratio) + meshPhase(teeth)
     *
     * which reduces to the familiar form when a is zero. Deriving it every
     * frame rather than integrating keeps the mesh exact instead of letting
     * rounding accumulate into a visible slip.
     */
    centre.set(0, 0);

    let previousAngle = driverAngle;
    let previousTeeth = driverTeeth;
    let previousRadius = driverRadius;

    for (let i = 0; i < TRAIN.length; i += 1) {
      const { teeth, angle } = TRAIN[i];

      const radius = pitchRadius(teeth, MODULE);

      centre.x += Math.cos(angle) * (previousRadius + radius);
      centre.y += Math.sin(angle) * (previousRadius + radius);

      const ratio = previousTeeth / teeth;

      let spin =
        -previousAngle * ratio + angle * (1 + ratio) + meshPhase(teeth);

      /* Only the first link's ratio ever changes, so only it needs easing. */
      if (i === 0) {
        spin += meshCorrection;
      }

      trainGroups[i].position.set(centre.x, centre.y, 0);
      trainGroups[i].rotation.z = spin;

      previousAngle = spin;
      previousTeeth = teeth;
      previousRadius = radius;
    }

    /*
     * The driver sits on the world origin and STAYS there — it is the subject
     * of the act, so it is the thing the camera is pointed at, and a subject
     * that slides out from under its own framing as it grows is no subject at
     * all. The train is what moves: it gets pushed outward as the gear driving
     * it gets bigger, which is the correct way round.
     */
    root.position.x = 0;
  };

  /**
   * Returns the machine to its starting angle, so a replay opens with the
   * pips where they were rather than wherever the last run left them.
   */
  const reset = () => {
    driverAngle = 0;
    meshCorrection = 0;
    meshCorrectionTarget = 0;
  };

  const setAccent = (color: THREE.Color) => {
    markerMaterial.emissive.copy(color);
  };

  const dispose = () => {
    driverGeometries.forEach(geometry => geometry.dispose());
    driverGeometries.clear();

    trainGeometries.forEach(geometry => geometry.dispose());

    shaftGeometry.dispose();
    markerGeometry.dispose();

    driverMaterial.dispose();
    machineMaterial.dispose();
    shaftMaterial.dispose();
    markerMaterial.dispose();
  };

  return { root, update, setAccent, reset, dispose };
}
