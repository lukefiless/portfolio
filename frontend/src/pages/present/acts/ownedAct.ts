/**
 * ACT — WE HOLD THE DRAWING (the built half)
 *
 * This act owns only the RIGHT-hand side of its slide: the thing the drawing
 * specifies, standing built and working.
 *
 * The left-hand side is not here. It is a flat cartoon drafting sheet drawn
 * in the DOM by `BlueprintPanel`, over the canvas — see that file for why a
 * drawing has to be drawn rather than modelled.
 *
 * The thing built is the same character the deck has used throughout, and the
 * sheet beside it draws that character rather than a generic robot — so the
 * two halves read as a design and THAT thing, not as a design and a thing.
 *
 * It works rather than walks. Walking is what the earlier acts used to mean
 * "a person is the mechanism"; this one is a built thing doing its job, and
 * the argument is that we drew it, so we can redraw it.
 *
 * Motes drift in from under the sheet, which is the only causal link the two
 * halves need — the drawing is upstream of the thing, and everything moves
 * in that direction.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX } from "../palette";
import { NO_INK_LAYER } from "../layers";

import { clamp01, smootherstep } from "../parts/easing";

import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";

/** The same character as the data and local-AI acts. */
const CHARACTER_MODEL: string | null = "/models/character.glb";
const CHARACTER_HEIGHT = 2.3;
import { createLabel, type Label } from "../parts/label";
import { createParticlePool } from "../parts/particles";

/** Where the built thing stands. The sheet owns the left of frame. */
const STAGE_X = 3.4;

/** Where a change enters the scene, under the sheet's right edge. */
const FROM_X = -1.6;

const MOTES = 60;

export interface OwnedState {
  /** Master level. Pinned at 1 by the slide; nothing animates on it. */
  owned: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type OwnedAct = Act<OwnedState>;

/**
 * Builds the RIGHT half of the "we hold the drawing" slide — the built thing,
 * standing and working. The left half is `BlueprintPanel`, drawn in the DOM.
 *
 * `root` is offset to the right of centre so the SVG sheet has the left of
 * frame to itself; the two halves never overlap and never know about each other.
 */
export function createOwnedAct(): OwnedAct {
  const root = new THREE.Group();

  root.position.set(0, 1.8, 0);
  root.rotation.y = -0.08;

  const accent = new THREE.Color(SAGE_HEX);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const labels: Label[] = [];

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

  /* ----------------------------------------------------------------- floor */

  const floorGeometry = keepGeometry(new THREE.PlaneGeometry(200, 140));

  const floorMaterial = keepMaterial(
    new THREE.ShadowMaterial({ opacity: 0.45 })
  );

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  /* Invisible except for the shadow, so it must not be drawn. See layers.ts. */
  floor.layers.set(NO_INK_LAYER);

  root.add(floor);

  /* ----------------------------------------------------------- the bench */

  const benchGeometry = keepGeometry(new THREE.BoxGeometry(2.7, 0.85, 1.35));

  const benchMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2b3243,
      metalness: 0.45,
      roughness: 0.6,
    })
  );

  const bench = new THREE.Mesh(benchGeometry, benchMaterial);
  bench.position.set(STAGE_X, 0.42, 0.8);
  bench.castShadow = true;
  bench.receiveShadow = true;
  root.add(bench);

  const panelGeometry = keepGeometry(new THREE.BoxGeometry(2.0, 0.1, 0.95));

  const panelMaterial = keepMaterial(new THREE.MeshBasicMaterial());

  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.set(STAGE_X, 0.88, 0.8);
  root.add(panel);

  /* ------------------------------------------------------------ the robot */

  /*
   * The procedural figure, not the imported character. Capsule limbs and
   * exposed ball joints read as something assembled; that is the whole
   * reason this act uses it.
   */
  /*
   * Big. It shares a frame with a drawing that owns half the screen, and at
   * natural scale it read as a doll behind a counter rather than as the thing
   * the sheet specifies.
   */
  const fallback: Figure = createFigure();
  fallback.root.scale.setScalar(1.24);
  fallback.root.position.set(STAGE_X, 0, -0.55);
  root.add(fallback.root);

  const character: RiggedFigure | null = CHARACTER_MODEL
    ? createRiggedFigure(CHARACTER_MODEL, {
        height: CHARACTER_HEIGHT,
        turn: 0,
      })
    : null;

  if (character) {
    character.root.position.set(STAGE_X, 0, -0.55);
    root.add(character.root);

    character.ready.catch(error =>
      console.warn("[owned] procedural fallback:", error.message)
    );
  }

  const builtLabel = createLabel("BUILT", { width: 1.35 });
  builtLabel.mesh.position.set(STAGE_X, -0.55, 0.85);
  root.add(builtLabel.mesh);
  labels.push(builtLabel);

  /* --------------------------------------------------------------- motes */

  const motes = createParticlePool(MOTES, 0.14);
  root.add(motes.points);

  const progress = new Float32Array(MOTES);
  const speed = new Float32Array(MOTES);
  const lane = new Float32Array(MOTES);

  for (let i = 0; i < MOTES; i += 1) {
    progress[i] = Math.random();
    speed[i] = 0.3 + Math.random() * 0.2;
    lane[i] = 1.4 + Math.random() * 2.2;
  }

  /* ----------------------------------------------------------------- loop */

  let elapsed = 0;

  /**
   * One frame. `owned` takes the thing from sealed and metered to open and ours,
   * and drives how brightly the motes flowing through it read.
   */
  const update = (delta: number, state: OwnedState) => {
    elapsed += delta;

    const level = clamp01(state.owned);

    /*
     * Standing and working: no gait, a reach that comes and goes. The figure
     * is at a bench doing a job, which is what a built machine does.
     */
    const reach = smootherstep(Math.sin(elapsed * 1.05) * 0.5 + 0.5) * level;

    const drive = {
      phase: 0,
      gait: 0,
      load: 0,
      reach,
      time: elapsed,
    };

    const imported = character?.isReady() ?? false;

    fallback.root.visible = !imported;
    fallback.step(drive);

    if (character) {
      character.root.visible = imported;
      character.step(drive);
    }

    panelMaterial.color.copy(accent).multiplyScalar(0.3 + reach * 0.7);

    for (let m = 0; m < MOTES; m += 1) {
      progress[m] += speed[m] * delta;

      if (progress[m] >= 1) {
        progress[m] -= 1;
      }

      const p = progress[m];
      const arc = Math.sin(p * Math.PI);

      motes.positions[m * 3] = THREE.MathUtils.lerp(FROM_X, STAGE_X - 1.1, p);
      motes.positions[m * 3 + 1] = lane[m] + arc * 0.5;
      motes.positions[m * 3 + 2] = 0.4 + arc * 0.4;

      const glow = arc * level;

      motes.colors[m * 3] = accent.r * glow;
      motes.colors[m * 3 + 1] = accent.g * glow;
      motes.colors[m * 3 + 2] = accent.b * glow;
    }

    motes.commit();
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

  /** Rescatters the motes so a replay does not open on a single synchronised pulse. */
  const reset = () => {
    elapsed = 0;

    for (let i = 0; i < MOTES; i += 1) {
      progress[i] = Math.random();
    }
  };

  const dispose = () => {
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
    labels.forEach(l => l.dispose());

    fallback.dispose();
    character?.dispose();
    motes.dispose();

    geometries.length = 0;
    materials.length = 0;
    labels.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
