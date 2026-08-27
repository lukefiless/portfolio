/**
 * ACT — THE SIX
 *
 * One screen, six things built, each given its own object rather than its own
 * bullet. A grid of icons would have been faster and would have said nothing;
 * the point of a mechanism is that its SHAPE carries the claim, so a viewer
 * who reads only the movement still learns what the thing does.
 *
 *   exec dashboards   figures rising to different heights and holding
 *   notes importer    loose sheets drawn into a stack, one at a time
 *   call list         a queue advancing, the head of it lit
 *   birthday importer a ring of months with one date coming round
 *   HR timecard       a clock face with a punched block filling
 *   data cleanup      a scattered set snapping onto a line
 *
 * Everything is on ONE clock and deliberately out of phase: six mechanisms
 * cycling together reads as a single pulsing object, and the eye stops
 * separating them. Staggering costs nothing and keeps them six.
 *
 * Laid out 3 x 2 with the caption under each cell. The captions are the only
 * text in the deck that has to be read rather than presented — they are set
 * small and centred, and the objects are what carry across a room.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX } from "../palette";

import { clamp01, smootherstep } from "../parts/easing";

import { createLabel, type Label } from "../parts/label";

const COLS = 3;
const ROWS = 2;

const COL_GAP = 5.6;

/*
 * Tighter than the column gap on purpose. Vertical room is what the copy
 * competes for, and a caption sitting directly under its object already
 * separates the rows without help from the spacing.
 */
const ROW_GAP = 4.5;

/** Where a cell's mechanism sits, above its caption. */
const OBJECT_Y = 1.0;

const CAPTION_Y = -1.5;

const CAPTIONS = [
  "EXEC DASHBOARDS",
  "NOTES IMPORTER",
  "CALL LIST",
  "BIRTHDAY IMPORTER",
  "HR TIMECARD",
  "DATA CLEANUP",
] as const;

export interface ProjectsState {
  /** 0 = nothing placed, 1 = all six settled and running. */
  shown: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type ProjectsAct = Act<ProjectsState>;

/**
 * Builds the six mechanisms and their captions, laid out on one grid.
 *
 * Each project is its own little machine rather than an icon — rising bars, a
 * stacking importer, an advancing queue, a ring of months, a clock face and a
 * snapping scatter — so the SHAPE of each one carries what it does.
 */
export function createProjectsAct(): ProjectsAct {
  const root = new THREE.Group();

  /*
   * Square to camera. Every other act is turned a few degrees into depth so
   * it reads as an object in a room; this one is a table of contents, and a
   * yawed grid puts its two outer columns at different apparent sizes for no
   * reason the audience can see.
   */
  root.position.set(0, 2.5, 0);
  root.rotation.y = 0;

  const accent = new THREE.Color(SAGE_HEX);

  /* Everything disposable, collected as it is built. */
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const labels: Label[] = [];

  /** Track a geometry for disposal and hand it straight back. */
  const keepGeometry = <T extends THREE.BufferGeometry>(geometry: T): T => {
    geometries.push(geometry);
    return geometry;
  };

  /** Track a material for disposal and hand it straight back. */
  const keepMaterial = <T extends THREE.Material>(material: T): T => {
    materials.push(material);
    return material;
  };

  /*
   * One shared body material for every mechanism, so six unrelated objects
   * still read as one family and as part of this deck. Difference is carried
   * by form and motion; colour is reserved for whatever is doing the work.
   */
  const bodyMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x39404f,
      metalness: 0.5,
      roughness: 0.55,
    })
  );

  const dimMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x232935,
      metalness: 0.4,
      roughness: 0.7,
    })
  );

  /** Lit parts. One material, so a single accent change repaints the screen. */
  const litMaterial = keepMaterial(new THREE.MeshBasicMaterial());

  /*
   * Each cell gets its OWN clones of the three materials. Fading is per-cell
   * and opacity lives on the material, so sharing one set would mean all six
   * arriving on the same ramp — and setting opacity for one would set it for
   * every other cell at the same time.
   */
  const cellMaterials: {
    body: THREE.MeshStandardMaterial;
    dim: THREE.MeshStandardMaterial;
    lit: THREE.MeshBasicMaterial;
    caption: THREE.MeshBasicMaterial;
  }[] = [];

  const cells: THREE.Group[] = [];

  for (let i = 0; i < COLS * ROWS; i += 1) {
    const cell = new THREE.Group();

    const col = i % COLS;
    const row = Math.floor(i / COLS);

    cell.position.set(
      (col - (COLS - 1) / 2) * COL_GAP,
      ((ROWS - 1) / 2 - row) * ROW_GAP,
      0
    );

    root.add(cell);
    cells.push(cell);

    const body = keepMaterial(bodyMaterial.clone());
    const dim = keepMaterial(dimMaterial.clone());
    const lit = keepMaterial(litMaterial.clone());

    for (const material of [body, dim, lit]) {
      material.transparent = true;
      material.opacity = 0;
    }

    const caption = createLabel(CAPTIONS[i], {
      width: 2.5,
      tracking: 0.26,
      color: "#242424",
    });

    caption.mesh.position.set(0, CAPTION_Y, 0);
    cell.add(caption.mesh);
    labels.push(caption);

    const captionMaterial = caption.mesh.material as THREE.MeshBasicMaterial;
    captionMaterial.opacity = 0;

    cellMaterials.push({ body, dim, lit, caption: captionMaterial });
  }

  /* ------------------------------------------------- 1. exec dashboards */

  /*
   * Bars that rise to different heights and STAY there. A dashboard is not a
   * thing that flows; it is a thing you look at, so the motion has to settle
   * or it reads as another pipeline.
   */
  const barGeometry = keepGeometry(new THREE.BoxGeometry(0.42, 1, 0.42));

  const bars: THREE.Mesh[] = [];
  const barHeights = [0.75, 1.5, 1.05, 1.85, 1.3];

  for (let i = 0; i < barHeights.length; i += 1) {
    const bar = new THREE.Mesh(
      barGeometry,
      i === 3 ? cellMaterials[0].lit : cellMaterials[0].body
    );
    bar.position.set((i - 2) * 0.58, OBJECT_Y - 0.9, 0);
    cells[0].add(bar);
    bars.push(bar);
  }

  const plinthGeometry = keepGeometry(new THREE.BoxGeometry(3.3, 0.12, 0.8));
  const plinth = new THREE.Mesh(plinthGeometry, cellMaterials[0].dim);
  plinth.position.set(0, OBJECT_Y - 0.96, 0);
  cells[0].add(plinth);

  /* --------------------------------------------------- 2. notes importer */

  /*
   * Loose sheets pulled in and squared into a stack. The stack is what a
   * notes import produces — the point is not that they moved, it is that
   * they ended up aligned.
   */
  const sheetGeometry = keepGeometry(new THREE.BoxGeometry(1.5, 0.07, 1.1));

  const sheets: THREE.Mesh[] = [];
  const SHEET_COUNT = 6;

  for (let i = 0; i < SHEET_COUNT; i += 1) {
    const sheet = new THREE.Mesh(
      sheetGeometry,
      i === 0 ? cellMaterials[1].lit : cellMaterials[1].body
    );
    cells[1].add(sheet);
    sheets.push(sheet);
  }

  /* ------------------------------------------------------- 3. call list */

  /*
   * A queue that advances one place at a time with its head lit. Nothing
   * about a call list is parallel; the whole value is that there is a next
   * one and everybody agrees which it is.
   */
  const rowGeometry = keepGeometry(new THREE.BoxGeometry(2.5, 0.34, 0.34));

  const listRows: THREE.Mesh[] = [];
  const LIST_COUNT = 5;

  for (let i = 0; i < LIST_COUNT; i += 1) {
    const listRow = new THREE.Mesh(rowGeometry, cellMaterials[2].body);
    listRow.position.set(0, OBJECT_Y + 0.95 - i * 0.48, 0);
    cells[2].add(listRow);
    listRows.push(listRow);
  }

  const headGeometry = keepGeometry(new THREE.BoxGeometry(2.62, 0.42, 0.42));
  const head = new THREE.Mesh(headGeometry, cellMaterials[2].lit);
  cells[2].add(head);

  /* ------------------------------------------------ 4. birthday importer */

  /*
   * Twelve marks on a ring with one coming round to the top. A calendar job
   * is the only one of the six whose defining property is that it repeats,
   * so it is the only one built on a cycle.
   */
  const ringGeometry = keepGeometry(
    new THREE.TorusGeometry(1.25, 0.07, 12, 64)
  );
  const ring = new THREE.Mesh(ringGeometry, cellMaterials[3].dim);
  ring.position.y = OBJECT_Y;
  cells[3].add(ring);

  const monthGeometry = keepGeometry(new THREE.BoxGeometry(0.16, 0.3, 0.16));

  const months: THREE.Mesh[] = [];

  for (let i = 0; i < 12; i += 1) {
    const month = new THREE.Mesh(monthGeometry, cellMaterials[3].body);
    const angle = (i / 12) * Math.PI * 2;

    month.position.set(
      Math.sin(angle) * 1.25,
      OBJECT_Y + Math.cos(angle) * 1.25,
      0
    );

    month.rotation.z = -angle;
    cells[3].add(month);
    months.push(month);
  }

  const todayGeometry = keepGeometry(new THREE.SphereGeometry(0.17, 20, 16));
  const today = new THREE.Mesh(todayGeometry, cellMaterials[3].lit);
  cells[3].add(today);

  /* -------------------------------------------------------- 5. timecard */

  /*
   * A clock face with a punched block that fills. A timecard is a span, not
   * an instant, which is why this one grows an arc rather than ticking a
   * hand round.
   */
  const faceGeometry = keepGeometry(
    new THREE.CylinderGeometry(1.2, 1.2, 0.16, 48)
  );
  faceGeometry.rotateX(Math.PI / 2);

  const face = new THREE.Mesh(faceGeometry, cellMaterials[4].dim);
  face.position.y = OBJECT_Y;
  cells[4].add(face);

  const arcGroup = new THREE.Group();
  arcGroup.position.y = OBJECT_Y;
  cells[4].add(arcGroup);

  const arcSegmentGeometry = keepGeometry(
    new THREE.BoxGeometry(0.17, 0.5, 0.1)
  );

  const arcSegments: THREE.Mesh[] = [];
  const ARC_COUNT = 14;

  for (let i = 0; i < ARC_COUNT; i += 1) {
    const segment = new THREE.Mesh(arcSegmentGeometry, cellMaterials[4].lit);
    const angle = (i / ARC_COUNT) * Math.PI * 1.7 - Math.PI * 0.85;

    segment.position.set(Math.sin(angle) * 0.86, Math.cos(angle) * 0.86, 0.14);
    segment.rotation.z = -angle;

    arcGroup.add(segment);
    arcSegments.push(segment);
  }

  /* ---------------------------------------------------- 6. data cleanup */

  /*
   * A scattered set snapping onto a line. Cleanup is the only one of the six
   * whose before and after are the SAME objects, so nothing enters or leaves
   * this cell — they only stop being crooked.
   */
  const chipGeometry = keepGeometry(new THREE.BoxGeometry(0.46, 0.46, 0.16));

  const chips: THREE.Mesh[] = [];
  const chipHome: THREE.Vector3[] = [];
  const chipMess: THREE.Vector3[] = [];
  const chipSpin: number[] = [];

  const CHIP_COLS = 4;
  const CHIP_ROWS = 3;

  for (let i = 0; i < CHIP_COLS * CHIP_ROWS; i += 1) {
    const chip = new THREE.Mesh(chipGeometry, cellMaterials[5].body);
    cells[5].add(chip);
    chips.push(chip);

    const col = i % CHIP_COLS;
    const row = Math.floor(i / CHIP_COLS);

    chipHome.push(
      new THREE.Vector3(
        (col - (CHIP_COLS - 1) / 2) * 0.62,
        OBJECT_Y + ((CHIP_ROWS - 1) / 2 - row) * 0.62,
        0
      )
    );

    chipMess.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 2.6,
        OBJECT_Y + (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 0.8
      )
    );

    chipSpin.push((Math.random() - 0.5) * 2.4);
  }

  /* --------------------------------------------------------------- loop */

  let elapsed = 0;

  /* Scratch, so the loop allocates nothing. */
  const scratch = new THREE.Vector3();

  /**
   * One frame. `shown` places the six in sequence rather than together — each
   * gets its own slice of the ramp, so the grid populates as a list being read
   * out rather than as one bulk reveal. Once placed, each runs its own loop.
   */
  const update = (delta: number, state: ProjectsState) => {
    elapsed += delta;

    const shown = clamp01(state.shown);

    /*
     * A straight fade, in reading order. Nothing moves and nothing scales:
     * an object that grows into its slot draws the eye to the arrival rather
     * than to the thing arriving, and with six of them that is six moving
     * targets before the audience has looked at any of them.
     */
    for (let i = 0; i < cells.length; i += 1) {
      const start = i * 0.09;
      const arrive = smootherstep((shown - start) / (1 - start * 1.2));

      cells[i].visible = arrive > 0.002;

      const set = cellMaterials[i];

      set.body.opacity = arrive;
      set.dim.opacity = arrive;
      set.lit.opacity = arrive;
      set.caption.opacity = arrive;

      set.lit.color.copy(accent);
    }

    /* 1. dashboards — rise, then hold. */
    for (let i = 0; i < bars.length; i += 1) {
      const settle = smootherstep(clamp01(elapsed * 0.55 - i * 0.12));
      const height = Math.max(barHeights[i] * settle, 0.001);

      bars[i].scale.y = height;
      bars[i].position.y = OBJECT_Y - 0.9 + height / 2;
    }

    /* 2. notes — drawn in one at a time and squared up. */
    for (let i = 0; i < sheets.length; i += 1) {
      /* Staggered per sheet, so they are drawn in one at a time. */
      const cycle = (elapsed * 0.5 + i * 0.16) % 1;
      const landed = smootherstep(clamp01(cycle * 2.2));

      sheets[i].position.set(
        THREE.MathUtils.lerp(2.3, 0, landed),
        OBJECT_Y - 0.5 + i * 0.13,
        THREE.MathUtils.lerp(1.4, 0, landed)
      );

      sheets[i].rotation.y = (1 - landed) * 0.9;
      sheets[i].rotation.z = (1 - landed) * 0.35;
    }

    /* 3. call list — the head advances a place at a time. */
    const step = Math.floor(elapsed * 0.8) % LIST_COUNT;
    const within = smootherstep(clamp01(((elapsed * 0.8) % 1) * 3));

    head.position.set(
      0,
      OBJECT_Y + 0.95 - THREE.MathUtils.lerp(step, step + within, 1) * 0.48,
      0.06
    );

    /* 4. birthdays — one date coming round the ring. */
    const turn = elapsed * 0.6;

    for (let i = 0; i < months.length; i += 1) {
      const angle = (i / 12) * Math.PI * 2 - turn;

      months[i].position.set(
        Math.sin(angle) * 1.25,
        OBJECT_Y + Math.cos(angle) * 1.25,
        0
      );

      months[i].rotation.z = -angle;
    }

    today.position.set(0, OBJECT_Y + 1.25, 0.16);

    /* 5. timecard — the shift fills, empties, fills again. */
    const shift = (elapsed * 0.32) % 1;
    const filled = Math.floor(smootherstep(shift) * ARC_COUNT);

    for (let i = 0; i < arcSegments.length; i += 1) {
      arcSegments[i].visible = i < filled;
    }

    /* 6. cleanup — crooked, then square, then crooked again. */
    const tidy = smootherstep(clamp01(Math.sin(elapsed * 0.5) * 1.6 + 0.5));

    for (let i = 0; i < chips.length; i += 1) {
      scratch.copy(chipMess[i]).lerp(chipHome[i], tidy);

      chips[i].position.copy(scratch);
      chips[i].rotation.z = chipSpin[i] * (1 - tidy);
    }
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

  /**
   * Sends every mechanism back to the top of its own cycle, so a replay opens
   * on the same frame the first run did.
   */
  const reset = () => {
    elapsed = 0;
  };

  const dispose = () => {
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    labels.forEach(label => label.dispose());

    geometries.length = 0;
    materials.length = 0;
    labels.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
