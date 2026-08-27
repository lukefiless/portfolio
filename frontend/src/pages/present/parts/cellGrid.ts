/**
 * SPREADSHEET GRID
 *
 * A grid of cells drawn as one instanced mesh, each carrying its own
 * freshness from 1 (just written) down to 0 (stale). Colour is the only
 * thing freshness drives, which is what lets the same object tell both
 * halves of the story: dumped all at once and then decaying together, or
 * refreshed cell by cell so it never decays at all.
 *
 * Cells are unlit on purpose. Fresh ones should read as lit up rather than
 * as well-lit, and an unlit material makes the instance colour the whole
 * appearance instead of a tint over shading.
 */

import * as THREE from "three";

export interface CellGrid {
  root: THREE.Group;
  count: number;

  /** Write every cell at once — one bulk import. */
  fillAll: () => void;

  /** Force every cell to a given freshness, without animating there. */
  setAll: (value: number) => void;

  /**
   * Write the next single cell. Walks a shuffled order rather than picking
   * at random, so every cell is refreshed on a predictable cycle — random
   * picking leaves stragglers untouched for long enough to rot, which is the
   * opposite of the point on the automated page.
   */
  touchNext: () => void;

  /** Decay every cell toward stale. */
  age: (delta: number, rate: number) => void;

  /**
   * Folds the sheet between one row and the full grid.
   *
   * 0 is a single line of cells — one record wide, the shape a hand-carried
   * export actually has when somebody is pasting it in a row at a time. 1 is
   * the full rectangle. Everything between is the rows unfolding downward
   * from that first line, which is the moment the thing stops being a list
   * and starts being a table.
   */
  setSpread: (value: number) => void;

  /** Push colours to the GPU. Call once per frame after any changes. */
  commit: () => void;

  dispose: () => void;
}

const COLS = 12;
const ROWS = 9;
const CELL = 0.4;
const GAP = 0.07;

const STRIDE = CELL + GAP;

/**
 * Builds the sheet: one InstancedMesh of COLS x ROWS cells, each carrying its
 * own freshness in a plain Float32Array alongside it.
 *
 * Freshness is stored on the CPU and only ever reaches the GPU as instance
 * COLOUR. Nothing else about a cell changes — no scale, no opacity — so the
 * whole decay story costs one colour buffer upload per frame.
 */
export function createCellGrid(): CellGrid {
  const root = new THREE.Group();

  const count = COLS * ROWS;

  const width = COLS * STRIDE;
  const height = ROWS * STRIDE;

  /* ------------------------------------------------------------ backing */

  const backingGeometry = new THREE.BoxGeometry(
    width + 0.5,
    height + 1.3,
    0.12
  );

  const backingMaterial = new THREE.MeshStandardMaterial({
    color: 0x161b24,
    metalness: 0.2,
    roughness: 0.75,
  });

  const backing = new THREE.Mesh(backingGeometry, backingMaterial);
  backing.position.z = -0.1;
  root.add(backing);

  /* ------------------------------------------------------------- header */

  const headerGeometry = new THREE.BoxGeometry(width, 0.44, 0.06);

  const headerMaterial = new THREE.MeshBasicMaterial({
    color: 0x1c6b48,
  });

  const header = new THREE.Mesh(headerGeometry, headerMaterial);
  header.position.set(0, height / 2 + 0.34, 0);
  root.add(header);

  /* -------------------------------------------------------------- cells */

  const cellGeometry = new THREE.PlaneGeometry(CELL, CELL);

  /* Unlit, so instance colour is the entire appearance. */
  const cellMaterial = new THREE.MeshBasicMaterial();

  const cells = new THREE.InstancedMesh(cellGeometry, cellMaterial, count);

  const matrix = new THREE.Matrix4();

  /*
   * Rows beyond the first are scaled away rather than moved out of sight.
   * Parking them off-screen still costs the same draw and leaves them free to
   * reappear in the wrong place the moment anything else nudges the grid.
   */
  const cellScale = new THREE.Vector3(1, 1, 1);
  const cellPosition = new THREE.Vector3();
  const cellQuaternion = new THREE.Quaternion();

  let spread = 1;

  /**
   * Rewrites every instance matrix for the current `spread`, and recentres
   * the group so the sheet stays pinned to its top edge as rows unfold.
   *
   * Only called when `spread` actually moves, not every frame — the matrix
   * buffer is the expensive one to re-upload.
   */
  const layOut = () => {
    const eased = THREE.MathUtils.clamp(spread, 0, 1);

    for (let row = 0; row < ROWS; row += 1) {
      /*
       * Each row unfolds on its own slice of the ramp, top row first, so the
       * table opens downward instead of every row arriving together.
       */
      const start = row / (ROWS + 1);
      const arrive =
        row === 0
          ? 1
          : THREE.MathUtils.clamp((eased - start) / (1 - start), 0, 1);

      const settle = arrive * arrive * (3 - 2 * arrive);

      for (let col = 0; col < COLS; col += 1) {
        const index = row * COLS + col;

        cellPosition.set(
          (col - (COLS - 1) / 2) * STRIDE,
          THREE.MathUtils.lerp(
            ((ROWS - 1) / 2) * STRIDE,
            ((ROWS - 1) / 2 - row) * STRIDE,
            settle
          ),
          0
        );

        cellScale.setScalar(Math.max(settle, 0.0001));

        matrix.compose(cellPosition, cellQuaternion, cellScale);
        cells.setMatrixAt(index, matrix);
      }
    }

    cells.instanceMatrix.needsUpdate = true;

    /*
     * The backing and header follow the cells. A full-height panel behind a
     * single row would give the fold away before it happened — the frame has
     * to grow with what it is framing.
     */
    const openHeight = THREE.MathUtils.lerp(STRIDE, height, eased);

    /*
     * The first row never moves, so the panel opens DOWNWARD from it: its top
     * edge is pinned and only the bottom travels. Growing it about its centre
     * instead would slide the header up off the sheet as the rows arrived.
     */
    const top = ((ROWS - 1) / 2) * STRIDE + STRIDE / 2;

    backing.scale.y = (openHeight + 1.3) / (height + 1.3);
    backing.position.y = top - openHeight / 2;

    header.position.y = top + 0.34;
  };

  layOut();
  root.add(cells);

  /* ---------------------------------------------------------- freshness */

  const freshness = new Float32Array(count);

  /*
   * A shuffled sweep: every cell gets its turn once per pass, and the order
   * is reshuffled each pass so it never reads as a raster scan.
   */
  const order = new Int32Array(count);

  for (let i = 0; i < count; i += 1) {
    order[i] = i;
  }

  let cursor = 0;

  /** Fisher-Yates over `order`, so `touchNext` walks the grid unpredictably. */
  const shuffle = () => {
    for (let i = count - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
  };

  shuffle();

  /*
   * Freshness reads as a health ramp rather than a fade to grey: just
   * written is green, and it travels through yellow-green, yellow and
   * orange before it hits red. The intermediate stops are the point — two
   * stops would snap from good to bad with nothing in between, and the
   * whole idea is watching data go off gradually.
   */
  const RAMP: ReadonlyArray<{ at: number; color: THREE.Color }> = [
    { at: 0.0, color: new THREE.Color(0xe23b30) },
    { at: 0.2, color: new THREE.Color(0xf2702c) },
    { at: 0.4, color: new THREE.Color(0xf5a623) },
    { at: 0.6, color: new THREE.Color(0xf3d024) },
    { at: 0.8, color: new THREE.Color(0x86c73f) },
    { at: 1.0, color: new THREE.Color(0x1faa5f) },
  ];

  const scratch = new THREE.Color();

  /** Freshness 0..1 to a colour on the health ramp above, written into `out`. */
  const sampleRamp = (value: number, out: THREE.Color) => {
    const t = THREE.MathUtils.clamp(value, 0, 1);

    let upper = 1;

    while (upper < RAMP.length - 1 && RAMP[upper].at < t) {
      upper += 1;
    }

    const from = RAMP[upper - 1];
    const to = RAMP[upper];
    const span = Math.max(to.at - from.at, 1e-6);

    return out.copy(from.color).lerp(to.color, (t - from.at) / span);
  };

  /** Push one cell's current freshness to its instance colour. */
  const paint = (index: number) => {
    sampleRamp(freshness[index], scratch);
    cells.setColorAt(index, scratch);
  };

  for (let i = 0; i < count; i += 1) {
    paint(i);
  }

  return {
    root,
    count,

    fillAll: () => {
      freshness.fill(1);
    },

    setAll: (value: number) => {
      freshness.fill(THREE.MathUtils.clamp(value, 0, 1));
    },

    touchNext: () => {
      freshness[order[cursor]] = 1;
      cursor += 1;

      if (cursor >= count) {
        cursor = 0;
        shuffle();
      }
    },

    setSpread: (value: number) => {
      spread = value;
      layOut();
    },

    age: (delta: number, rate: number) => {
      for (let i = 0; i < count; i += 1) {
        freshness[i] = Math.max(0, freshness[i] - rate * delta);
      }
    },

    commit: () => {
      for (let i = 0; i < count; i += 1) {
        paint(i);
      }

      if (cells.instanceColor) {
        cells.instanceColor.needsUpdate = true;
      }
    },

    dispose: () => {
      backingGeometry.dispose();
      backingMaterial.dispose();
      headerGeometry.dispose();
      headerMaterial.dispose();
      cellGeometry.dispose();
      cellMaterial.dispose();
      cells.dispose();
    },
  };
}
