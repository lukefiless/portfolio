/**
 * ACT — A ROOM FULL OF WORKERS THAT ARE NOT PEOPLE
 *
 * Six of them, sat at desks in two rows, all working, all of it happening
 * here. There is no before and after: the slide is a picture of what having
 * our own model would look like on an ordinary afternoon.
 *
 * They are the same character the deck has used since the data slide, which
 * is the whole point of reusing it: the audience has already watched that
 * figure carry an export across a room once a day. Here there are six, and
 * none of them tire.
 *
 * NOTHING IS DRAWN LEAVING THE ROOM, and that is the argument. An earlier
 * pass ran a stream of particles from every desk up into a server overhead,
 * which is the picture of work being SENT somewhere — the exact thing this
 * slide exists to say is no longer happening. The room with no outflow in it
 * makes the point better than an arrow to a box ever did.
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

import { SAGE_HEX } from "../palette";

import { clamp01 } from "../parts/easing";

import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";
import { createPropModel, type PropModel } from "../parts/propModel";

/** The same character as the data and "owned" acts. */
const CHARACTER_MODEL: string | null = "/models/character.glb";

/*
 * Imported furniture. Null means "use the built-in boxes", which is what
 * ships today — set either to a path under `public/` and that piece swaps
 * over, with the box staying as the fallback if the file fails to load.
 *
 *   const DESK_MODEL: string | null = "/models/desk.glb";
 *
 * Both are scaled to the constants below rather than to whatever the file
 * was authored at, so a desk from any source lands at the right height.
 */
const DESK_MODEL: string | null = "/models/desk.glb";
const CHAIR_MODEL: string | null = "/models/chair.glb";

/*
 * Imported furniture is sized by WIDTH, not height — see the note on
 * `PropModelOptions.width`. These match the boxes each piece replaces, so the
 * room keeps the spacing it was composed with.
 *
 * TUNING: the loader logs what it measured, once per file, as
 * `[prop] /models/desk.glb — measured ...`. Read the width off that line and
 * change the numbers here; there is no need to touch the model.
 */
const DESK_WIDTH = 2.55;
const CHAIR_WIDTH = 0.98;

/*
 * How far the chairs slide toward their desks.
 *
 * The workers do NOT ride this. They did at first, and it pushed all six into
 * the worktop: an imported desk is over a unit deep, so its back edge already
 * sits close to where a seated figure needs to be, and 0.3 was enough to bury
 * them. The chair has room to move because it is behind the person, not
 * because there is room in front of them.
 */
const CHAIR_TUCK = 0.3;

/*
 * The workers' own slide, kept separate for the reason above. The chair is
 * deep enough that a figure sitting at 0 is still well within its footprint.
 */
const WORKER_TUCK = 0;

/*
 * Quarter turns, because both files were authored with their long axis along
 * Z. The desk measures 2.42 x 3.98 x 5.36 in the file — deeper than it is
 * wide, which is the giveaway that it needs turning before it is measured.
 */
const DESK_TURN = Math.PI / 2;
const CHAIR_TURN = 0;
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

/**
 * Builds the room: six desks in two rows, a worker at each, and the rack they
 * all feed. Every worker shares one parsed GLB via `loadOnce` in riggedFigure.
 *
 * There is no before-and-after here — the act has no second arrangement to
 * blend to. `inHouse` only decides how strongly the room is running.
 */
export function createLocalAiAct(): LocalAiAct {
  const root = new THREE.Group();

  root.position.set(0, 0.5, 0);
  root.rotation.y = -0.1;

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

  /* Imported furniture, when a path is set. Empty otherwise. */
  const props: PropModel[] = [];

  /**
   * Place one imported prop, and hide the box it replaces once it lands.
   *
   * The box is left in the scene until then rather than being removed up
   * front, so a slow file or a bad path degrades to the built-in furniture
   * instead of to an empty floor with six people sitting on nothing.
   */
  const swapIn = (
    url: string | null,
    fallback: THREE.Mesh,
    width: number,
    turn: number,
    x: number,
    y: number,
    z: number
  ) => {
    if (!url) {
      return;
    }

    const prop = createPropModel(url, { width, turn });

    prop.root.position.set(x, y, z);
    root.add(prop.root);
    props.push(prop);

    prop.ready
      .then(() => {
        fallback.visible = false;
      })
      .catch(error =>
        console.warn(`[local-ai] keeping the box for ${url}:`, error.message)
      );
  };

  for (let i = 0; i < WORKERS; i += 1) {
    const seat = seatOf(i);

    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(seat.x, seat.y + DESK_H / 2, seat.z + 0.85);
    desk.castShadow = true;
    desk.receiveShadow = true;
    root.add(desk);

    /*
     * Sized by WIDTH, to the box it replaces, and grounded on its own base so
     * it is placed at the FLOOR of the seat rather than at the box's centre.
     */
    swapIn(
      DESK_MODEL,
      desk,
      DESK_WIDTH,
      DESK_TURN,
      seat.x,
      seat.y,
      seat.z + 0.85
    );

    /* Something to sit ON. A seated figure over bare floor reads as falling. */
    const chair = new THREE.Mesh(chairGeometry, deskMaterial);
    chair.position.set(
      seat.x,
      seat.y + (SEAT_RISE + 0.28) / 2,
      seat.z - 0.4 + CHAIR_TUCK
    );
    chair.castShadow = true;
    root.add(chair);

    swapIn(
      CHAIR_MODEL,
      chair,
      CHAIR_WIDTH,
      CHAIR_TURN,
      seat.x,
      seat.y,
      seat.z - 0.4 + CHAIR_TUCK
    );
  }

  /* --------------------------------------------------------------- workers */

  const fallbacks: Figure[] = [];
  const characters: (RiggedFigure | null)[] = [];

  for (let i = 0; i < WORKERS; i += 1) {
    const seat = seatOf(i);

    /* Angled a little toward the middle of the room. */
    const facing = -(i % COLS) * 0.16 + 0.16;

    const fallback = createFigure();
    fallback.root.scale.setScalar(1.05);
    fallback.root.position.set(
      seat.x,
      seat.y + SEAT_RISE,
      seat.z - 0.15 + WORKER_TUCK
    );
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
      character.root.position.set(
        seat.x,
        seat.y + SEAT_RISE,
        seat.z - 0.15 + WORKER_TUCK
      );
      character.root.rotation.y = facing;
      root.add(character.root);

      character.ready.catch(error =>
        console.warn("[local-ai] procedural fallback:", error.message)
      );
    }

    characters.push(character);
  }

  /* ---------------------------------------------------------------- loop */

  let elapsed = 0;

  /**
   * One frame. Advances every worker's typing cycle, with `inHouse` setting
   * how alive the whole room reads.
   */
  const update = (delta: number, state: LocalAiState) => {
    elapsed += delta;

    const running = clamp01(state.inHouse);

    for (let i = 0; i < WORKERS; i += 1) {
      const drive = {
        phase: 0,
        gait: 0,
        load: 0,

        /*
         * No reach. Cycling it was the old way of suggesting work, and it
         * swung every arm through its full range — six people repeatedly
         * grabbing at their monitors rather than six people typing.
         */
        reach: 0,

        /* Always on. Nothing in this slide asks them to stop. */
        typing: running,

        /*
         * Offset per worker. The hand motion is driven from `time`, so six
         * workers sharing a clock would type in perfect unison — which reads
         * as one animation copied six times, not as six of them working.
         */
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
    }
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

  /**
   * Only the clock accumulates. The typing cycle is a pure function of it, so
   * putting it back to zero is the whole of the reset.
   */
  const reset = () => {
    elapsed = 0;
  };

  const dispose = () => {
    props.forEach(p => p.dispose());

    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());

    fallbacks.forEach(f => f.dispose());
    characters.forEach(c => c?.dispose());

    geometries.length = 0;
    materials.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
