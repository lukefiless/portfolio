/**
 * ACT 2 — ONE PROCESS BECAME MANY
 *
 * The same set of jobs, twice. First as a single always-running program: one
 * undifferentiated mass, every piece jammed against every other, nothing
 * aligned, and the whole thing permanently busy because a loop that never
 * exits is never not running. Then pulled apart into a container per job and
 * settled into departments, each one waking on its own schedule, doing its
 * work, and going quiet.
 *
 * The argument is carried by two contrasts, not by labels:
 *
 *   alignment  in the monolith every box sits at a random angle, because
 *              nothing has a defined place. In the grid they are identical
 *              and square, because every service got the same shape.
 *
 *   rhythm     the monolith churns continuously. The grid blinks — each
 *              container starts, finishes and exits, which is the actual
 *              point of moving off long-running loops and the reason the
 *              runs became auditable.
 *
 * A rail appears under the grid at the end: the shared base image and shared
 * helper package that stop the containers being twenty-four copies of the
 * same code.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { clamp01, smootherstep } from "../parts/easing";

const COLS = 4;
const ROWS = 6;
const COUNT = COLS * ROWS;

const COL_GAP = 1.85;
const ROW_GAP = 1.05;

/** Bottom row of the grid, in act-local space. */
const GRID_BASE = 0.75;

export interface ArchitectureState {
  /** 0 = one tangled always-running process. 1 = scheduled containers. */
  ordered: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type ArchitectureAct = Act<ArchitectureState>;

export function createArchitectureAct(): ArchitectureAct {
  const root = new THREE.Group();

  root.position.set(0, 1.6, 0);
  root.rotation.y = -0.22;

  const accent = new THREE.Color(0x8ea2ff);
  const tangled = new THREE.Color(0xff9d4d);

  /* ------------------------------------------------------------- containers */

  const bodyGeometry = new THREE.BoxGeometry(1.42, 0.76, 0.9);

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a515f,
    metalness: 0.55,
    roughness: 0.44,
  });

  const bodies = new THREE.InstancedMesh(bodyGeometry, bodyMaterial, COUNT);
  bodies.castShadow = true;
  bodies.frustumCulled = false;
  root.add(bodies);

  /*
   * A lit strip on the front of each container, carrying its state. Unlit
   * and instanced so every box can differ without a material each.
   */
  const lampGeometry = new THREE.BoxGeometry(1.02, 0.11, 0.06);

  const lampMaterial = new THREE.MeshBasicMaterial();

  const lamps = new THREE.InstancedMesh(lampGeometry, lampMaterial, COUNT);
  lamps.frustumCulled = false;
  root.add(lamps);

  /* ------------------------------------------------------------------ rail */

  const railGeometry = new THREE.BoxGeometry(COLS * COL_GAP + 0.6, 0.12, 0.55);

  const railMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a3040,
    metalness: 0.6,
    roughness: 0.4,
    emissive: accent.clone(),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0,
  });

  const rail = new THREE.Mesh(railGeometry, railMaterial);
  rail.position.set(0, GRID_BASE - 0.85, 0);
  root.add(rail);

  /* --------------------------------------------------------------- per box */

  const home: THREE.Vector3[] = [];
  const heap: THREE.Vector3[] = [];
  const heapSpin: THREE.Euler[] = [];
  const churnPhase = new Float32Array(COUNT);
  const beatOffset = new Float32Array(COUNT);
  const beatPeriod = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i += 1) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);

    home.push(
      new THREE.Vector3(
        (col - (COLS - 1) / 2) * COL_GAP,
        GRID_BASE + (ROWS - 1 - row) * ROW_GAP,
        0
      )
    );

    /*
     * Packed into a rough lump around the middle of where the grid will be,
     * so the two states occupy the same part of frame and the change reads
     * as reorganisation rather than as movement.
     */
    heap.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 2.6,
        GRID_BASE + (ROWS - 1) * ROW_GAP * 0.5 + (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 1.9
      )
    );

    heapSpin.push(
      new THREE.Euler(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.9,
        (Math.random() - 0.5) * 1.5
      )
    );

    churnPhase[i] = Math.random() * Math.PI * 2;
    beatOffset[i] = Math.random();

    /* Staggered periods, so the grid never pulses in unison. */
    beatPeriod[i] = 2.2 + Math.random() * 3.4;
  }

  /* Scratch, so the loop allocates nothing. */
  const position = new THREE.Vector3();
  const rotation = new THREE.Euler();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  const matrix = new THREE.Matrix4();
  const lampMatrix = new THREE.Matrix4();
  const lampOffset = new THREE.Vector3(0, -0.22, 0.48);
  const colour = new THREE.Color();

  let elapsed = 0;

  const update = (delta: number, target: ArchitectureState) => {
    elapsed += delta;

    const ordered = clamp01(target.ordered);
    const settled = smootherstep(ordered);
    const chaos = 1 - settled;

    for (let i = 0; i < COUNT; i += 1) {
      /* Position: heap toward grid. */
      position.copy(heap[i]).lerp(home[i], settled);

      /*
       * Restlessness that only exists before the split. A loop that never
       * exits is never not running, and this is what that looks like.
       */
      if (chaos > 0.001) {
        const churn = elapsed * 2.4 + churnPhase[i];

        position.x += Math.sin(churn) * 0.06 * chaos;
        position.y += Math.cos(churn * 1.3) * 0.05 * chaos;
        position.z += Math.sin(churn * 0.7) * 0.05 * chaos;
      }

      /* Rotation: random angles toward dead square. */
      rotation.set(
        heapSpin[i].x * chaos,
        heapSpin[i].y * chaos,
        heapSpin[i].z * chaos
      );

      quaternion.setFromEuler(rotation);
      matrix.compose(position, quaternion, scale);
      bodies.setMatrixAt(i, matrix);

      /* The lamp rides on the front face of its box. */
      lampMatrix.makeTranslation(lampOffset.x, lampOffset.y, lampOffset.z);
      lampMatrix.premultiply(matrix);
      lamps.setMatrixAt(i, lampMatrix);

      /*
       * Before: everything lit, always, with a nervous flicker. After: dark
       * until this container's turn, then a bright run that decays away.
       */
      const churnLevel = 0.5 + Math.sin(elapsed * 7 + churnPhase[i]) * 0.18;

      const beat = (elapsed / beatPeriod[i] + beatOffset[i]) % 1;
      const scheduled = Math.max(0, 1 - beat * 7) ** 1.6;

      const level = THREE.MathUtils.lerp(churnLevel, scheduled, settled);

      colour.copy(tangled).lerp(accent, settled).multiplyScalar(level);
      lamps.setColorAt(i, colour);
    }

    bodies.instanceMatrix.needsUpdate = true;
    lamps.instanceMatrix.needsUpdate = true;

    if (lamps.instanceColor) {
      lamps.instanceColor.needsUpdate = true;
    }

    /* The shared foundation only exists once there is something to share. */
    const railIn = smootherstep((ordered - 0.55) / 0.45);

    railMaterial.opacity = railIn;
    railMaterial.emissiveIntensity = railIn * 1.4;
    rail.scale.x = 0.2 + railIn * 0.8;
  };

  /** Restarts the churn and the schedule, so a replay opens on beat zero. */
  const reset = () => {
    elapsed = 0;
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    railMaterial.emissive.copy(color);
  };

  const dispose = () => {
    bodyGeometry.dispose();
    bodyMaterial.dispose();
    lampGeometry.dispose();
    lampMaterial.dispose();
    railGeometry.dispose();
    railMaterial.dispose();

    bodies.dispose();
    lamps.dispose();
  };

  return { root, update, setAccent, reset, dispose };
}
