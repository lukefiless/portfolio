/**
 * ACT — A ROOM FULL OF WORKERS THAT ARE NOT PEOPLE
 *
 * Six of them, sat at desks in two rows, all working, all of it happening
 * here. There is no before and after: the slide is a picture of what having
 * our own model would look like on an ordinary afternoon.
 *
 * They are the same character the deck has used since the data slide, which
 * is the whole point of reusing it: the audience has already watched that
 * figure carry an export across a room once a day. Here there are six, none
 * of them tiring, and the work is going into a model in the same building.
 *
 * All six share one parsed model — see `loadOnce` in riggedFigure. Six
 * separate loads of a nine-megabyte character is most of a second of startup
 * for six copies of the same mesh.
 *
 * Sat rather than standing. Standing at a bench is what a person does for a
 * shift; sat at a desk is what a thing does indefinitely. It also lets the
 * room go two rows deep without the back row being hidden behind the front.
 *
 * Everything they produce goes up into one box and stays there. No boundary
 * is drawn, because a fence suggests something is trying to get out. Nothing
 * on this stage is going anywhere.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { clamp01, smootherstep } from "../parts/easing";

import { createLabel, type Label } from "../parts/label";
import { createParticlePool } from "../parts/particles";
import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";

/** The same character as the data and onboarding acts. */
const CHARACTER_MODEL: string | null = "/models/character.glb";
const CHARACTER_HEIGHT = 1.95;

const COLS = 3;
const ROWS = 2;
const WORKERS = COLS * ROWS;

const COL_GAP = 4.5;

/** Depth between rows. The back row also sits higher, so it reads over. */
const ROW_GAP = 4.0;
const ROW_RISE = 1.15;

/*
 * Low, and the chairs are high. A seated figure loses roughly a thigh in
 * height, and at a normal desk height that left six heads peering over six
 * worktops — the room read as empty furniture. Desk down, seat up, and most
 * of each worker clears the surface.
 */
const DESK_H = 0.72;

/** How far the seat lifts the figure off the floor. */
const SEAT_RISE = 0.2;

/** Where the work ends up. */
const MODEL = new THREE.Vector3(0, 6.4, -3.4);

const MOTES = 120;

export interface LocalAiState {
  /** Master activity level. Pinned at 1 by the slide; nothing animates it. */
  inHouse: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type LocalAiAct = Act<LocalAiState>;

/** Where worker `i` sits. */
const seatOf = (i: number) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);

  return {
    x: (col - (COLS - 1) / 2) * COL_GAP,
    y: (ROWS - 1 - row) * ROW_RISE,
    z: (ROWS - 1 - row) * -ROW_GAP,
  };
};

export function createLocalAiAct(): LocalAiAct {
  const root = new THREE.Group();

  root.position.set(0, 0.5, 0);
  root.rotation.y = -0.1;

  const accent = new THREE.Color(0x7dfcc0);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const labels: Label[] = [];

  const keepGeometry = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };

  const keepMaterial = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  /* ----------------------------------------------------------------- floor */

  const floorGeometry = keepGeometry(new THREE.PlaneGeometry(200, 140));

  const floorMaterial = keepMaterial(
    new THREE.ShadowMaterial({ opacity: 0.4 })
  );

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);

  /* ----------------------------------------------------------- the desks */

  const deskGeometry = keepGeometry(new THREE.BoxGeometry(2.9, DESK_H, 1.5));

  const deskMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2b3243,
      metalness: 0.45,
      roughness: 0.6,
    })
  );

  const chairGeometry = keepGeometry(
    new THREE.BoxGeometry(1.1, SEAT_RISE + 0.28, 1.0)
  );

  const screenGeometry = keepGeometry(new THREE.BoxGeometry(0.95, 0.58, 0.06));

  /** One lit screen per desk, so each worker visibly has something running. */
  const screenMaterials: THREE.MeshBasicMaterial[] = [];

  for (let i = 0; i < WORKERS; i += 1) {
    const seat = seatOf(i);

    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(seat.x, seat.y + DESK_H / 2, seat.z + 0.85);
    desk.castShadow = true;
    desk.receiveShadow = true;
    root.add(desk);

    /* Something to sit ON. A seated figure over bare floor reads as falling. */
    const chair = new THREE.Mesh(chairGeometry, deskMaterial);
    chair.position.set(seat.x, seat.y + (SEAT_RISE + 0.28) / 2, seat.z - 0.4);
    chair.castShadow = true;
    root.add(chair);

    const screenMaterial = keepMaterial(new THREE.MeshBasicMaterial());

    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    /*
     * Standing on the desk, not floating in front of it. At its first size
     * and position each screen sat between its worker and the camera and hid
     * the thing the slide is about.
     */
    screen.position.set(seat.x + 0.7, seat.y + DESK_H + 0.31, seat.z + 0.75);
    screen.rotation.y = -0.35;
    root.add(screen);

    screenMaterials.push(screenMaterial);
  }

  /* ----------------------------------------------------------- the model */

  const modelGeometry = keepGeometry(new THREE.BoxGeometry(3.4, 1.6, 1.3));

  const modelMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x323b4e,
      metalness: 0.55,
      roughness: 0.45,
    })
  );

  const model = new THREE.Mesh(modelGeometry, modelMaterial);
  model.position.copy(MODEL);
  model.castShadow = true;
  root.add(model);

  const bandGeometry = keepGeometry(new THREE.BoxGeometry(2.6, 0.13, 0.06));

  const bandMaterial = keepMaterial(new THREE.MeshBasicMaterial());

  const band = new THREE.Mesh(bandGeometry, bandMaterial);
  band.position.set(MODEL.x, MODEL.y - 0.46, MODEL.z + 0.67);
  root.add(band);

  const modelLabel = createLabel("LOCAL MODEL", { width: 2.6 });
  modelLabel.mesh.position.set(MODEL.x, MODEL.y + 1.2, MODEL.z + 0.2);
  root.add(modelLabel.mesh);
  labels.push(modelLabel);

  /* --------------------------------------------------------------- workers */

  const fallbacks: Figure[] = [];
  const characters: (RiggedFigure | null)[] = [];

  for (let i = 0; i < WORKERS; i += 1) {
    const seat = seatOf(i);

    /* Angled a little toward the middle of the room. */
    const facing = -(i % COLS) * 0.16 + 0.16;

    const fallback = createFigure();
    fallback.root.scale.setScalar(1.05);
    fallback.root.position.set(seat.x, seat.y + SEAT_RISE, seat.z - 0.15);
    fallback.root.rotation.y = facing;
    root.add(fallback.root);
    fallbacks.push(fallback);

    const character = CHARACTER_MODEL
      ? createRiggedFigure(CHARACTER_MODEL, {
          height: CHARACTER_HEIGHT,
          turn: 0,
        })
      : null;

    if (character) {
      character.root.position.set(seat.x, seat.y + SEAT_RISE, seat.z - 0.15);
      character.root.rotation.y = facing;
      root.add(character.root);

      character.ready.catch(error =>
        console.warn("[local-ai] procedural fallback:", error.message)
      );
    }

    characters.push(character);
  }

  /* ----------------------------------------------------------- the output */

  const motes = createParticlePool(MOTES, 0.14);
  root.add(motes.points);

  const progress = new Float32Array(MOTES);
  const speed = new Float32Array(MOTES);
  const owner = new Uint8Array(MOTES);
  const drift = new Float32Array(MOTES);

  for (let i = 0; i < MOTES; i += 1) {
    progress[i] = Math.random();
    speed[i] = 0.35 + Math.random() * 0.28;
    owner[i] = i % WORKERS;
    drift[i] = (Math.random() - 0.5) * 0.8;
  }

  /* ---------------------------------------------------------------- loop */

  let elapsed = 0;

  const colour = new THREE.Color();

  const update = (delta: number, state: LocalAiState) => {
    elapsed += delta;

    const running = clamp01(state.inHouse);

    for (let i = 0; i < WORKERS; i += 1) {
      /*
       * Each worker on its own cycle. Out of phase on purpose: six figures
       * reaching in unison reads as one animation played six times, and the
       * claim is that they are working independently.
       */
      const cycle = elapsed * 1.05 + i * 1.7;

      const reach = smootherstep(Math.sin(cycle) * 0.5 + 0.5) * running;

      const drive = {
        phase: 0,
        gait: 0,
        load: 0,
        reach: reach * 0.75,
        time: elapsed + i * 2.9,
        seated: 1,
      };

      const imported = characters[i]?.isReady() ?? false;

      fallbacks[i].root.visible = !imported;
      fallbacks[i].step(drive);

      const character = characters[i];

      if (character) {
        character.root.visible = imported;
        character.step(drive);
      }

      /* The screen lights with the work rather than pulsing on its own. */
      screenMaterials[i].color.copy(accent).multiplyScalar(0.22 + reach * 0.68);
    }

    /* Output rising from each desk into the model, continuously. */
    for (let m = 0; m < MOTES; m += 1) {
      progress[m] += speed[m] * delta;

      if (progress[m] >= 1) {
        progress[m] -= 1;
      }

      const p = progress[m];
      const seat = seatOf(owner[m]);

      const arc = Math.sin(p * Math.PI);

      motes.positions[m * 3] = THREE.MathUtils.lerp(seat.x, MODEL.x, p);

      motes.positions[m * 3 + 1] =
        THREE.MathUtils.lerp(seat.y + DESK_H + 1.3, MODEL.y - 0.6, p) +
        arc * 0.6;

      motes.positions[m * 3 + 2] =
        THREE.MathUtils.lerp(seat.z + 0.9, MODEL.z, p) + drift[m] * arc;

      const glow = (0.4 + 0.6 * arc) * running;

      motes.colors[m * 3] = accent.r * glow;
      motes.colors[m * 3 + 1] = accent.g * glow;
      motes.colors[m * 3 + 2] = accent.b * glow;
    }

    motes.commit();

    /* The model brightens as it takes work in. */
    colour.copy(accent).multiplyScalar(0.55 + Math.sin(elapsed * 1.7) * 0.12);
    bandMaterial.color.copy(colour);
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

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

    fallbacks.forEach(f => f.dispose());
    characters.forEach(c => c?.dispose());
    motes.dispose();

    geometries.length = 0;
    materials.length = 0;
    labels.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
