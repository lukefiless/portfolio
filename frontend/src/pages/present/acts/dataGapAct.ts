/**
 * ACT — TWO SOURCES, ONE DATABASE
 *
 * Wealthbox holds the client. LPL holds the money. Both feed the same
 * database, continuously, and neither of them knows the other exists.
 *
 * Records stream in from both and meet at a junction in the middle. Most
 * reconcile — a pair becomes one row and carries on into the store. Some do
 * not, because the only thing joining the two sources is a person's NAME,
 * and a name is not an identifier. Those turn red at the junction and fall
 * out of the flow.
 *
 * The act does not resolve. There is no shared key today, so the slide holds
 * the problem and lets it keep failing in front of the room — the drops are
 * still dropping when you move on. A fix animating itself here would answer
 * the question the slide exists to ask.
 *
 * An earlier version of this drew all of it: eighteen record boxes and nine
 * links hunting between candidate rows. It was accurate and far too much —
 * a slide you have to study is a slide nobody listens through. This shows
 * two pipes, one tank, and the fraction that misses.
 *
 * The share that fails is ILLUSTRATIVE. The bridge really does produce
 * matched, needs-review and unmatched buckets; the proportion on stage was
 * chosen to read from the back of a room, not measured.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { clamp01 } from "../parts/easing";

import { createLabel, type Label } from "../parts/label";

/** Records in flight from each source at once. */
const STREAM = 44;

/** Roughly a quarter miss. Enough to be a problem, not so many it is chaos. */
const MISS_RATE = 0.26;

const SOURCE_X = -6.6;
const TOP_Y = 3.3;
const BOTTOM_Y = 0.5;

/** Where the two streams meet and have to agree. */
const JUNCTION = new THREE.Vector3(-0.6, 1.9, 0);

/** Where the survivors end up. */
const STORE = new THREE.Vector3(5.2, 1.9, 0);

const CLIENT = 0x6fd3ff;
const MONEY = 0xffb46b;
const DROPPED = 0xff5f5f;

/**
 * What a record becomes once it has been through the ring.
 *
 * Its own colour, not either source's and not the slide accent — which used
 * to be this amber, so every LPL record came out of the junction looking
 * exactly as it went in and the merge was invisible. A reconciled row is a
 * new thing and has to look like one.
 */
const MERGED = 0x7dfcc0;

export interface DataGapState {
  /**
   * How resolved the join is. The slide pins it at 0 — the gap is the point
   * — but the term is still here, so showing a fix later is a keyframe
   * rather than a rewrite.
   */
  keyed: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type DataGapAct = Act<DataGapState>;

export function createDataGapAct(): DataGapAct {
  const root = new THREE.Group();

  root.position.set(0, 2.2, 0);
  root.rotation.y = -0.1;

  const accent = new THREE.Color(0xffb46b);

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

  /* -------------------------------------------------------------- sources */

  const sourceGeometry = keepGeometry(new THREE.BoxGeometry(2.2, 1.5, 1.3));

  const sourceMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x333c4e,
      metalness: 0.5,
      roughness: 0.55,
    })
  );

  const bandGeometry = keepGeometry(new THREE.BoxGeometry(1.6, 0.12, 0.06));

  const makeSource = (y: number, text: string, tint: number, width: number) => {
    const box = new THREE.Mesh(sourceGeometry, sourceMaterial);
    box.position.set(SOURCE_X, y, 0);
    box.castShadow = true;
    root.add(box);

    const band = new THREE.Mesh(
      bandGeometry,
      keepMaterial(new THREE.MeshBasicMaterial({ color: tint }))
    );

    band.position.set(SOURCE_X, y - 0.42, 0.67);
    root.add(band);

    const label = createLabel(text, { width });
    label.mesh.position.set(SOURCE_X, y + 1.1, 0.2);
    root.add(label.mesh);
    labels.push(label);
  };

  makeSource(TOP_Y, "WEALTHBOX", CLIENT, 2.1);
  makeSource(BOTTOM_Y, "LPL", MONEY, 0.9);

  /* ------------------------------------------------------------- junction */

  /*
   * Where the two have to agree. Drawn as a ring rather than a box: a box
   * reads as another system in the chain, and this is not a system — it is
   * the place a decision gets made with not enough to go on.
   */
  const ringGeometry = keepGeometry(
    new THREE.TorusGeometry(0.72, 0.055, 10, 40)
  );

  const ringMaterial = keepMaterial(
    new THREE.MeshBasicMaterial({ color: 0x64708d })
  );

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.copy(JUNCTION);
  root.add(ring);

  const junctionLabel = createLabel("MATCH ON NAME", {
    width: 2.6,
    color: "#8b93ab",
  });

  junctionLabel.mesh.position.set(JUNCTION.x, JUNCTION.y - 1.25, 0);
  root.add(junctionLabel.mesh);
  labels.push(junctionLabel);

  /* ---------------------------------------------------------------- store */

  /* A tank, because what is being argued about is where everything lands. */
  const storeGeometry = keepGeometry(
    new THREE.CylinderGeometry(1.5, 1.5, 2.4, 36)
  );

  const storeMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2a3346,
      metalness: 0.55,
      roughness: 0.45,
    })
  );

  const store = new THREE.Mesh(storeGeometry, storeMaterial);
  store.position.copy(STORE);
  store.castShadow = true;
  root.add(store);

  const ribGeometry = keepGeometry(new THREE.TorusGeometry(1.51, 0.045, 8, 40));

  const ribMaterial = keepMaterial(
    new THREE.MeshBasicMaterial({ color: 0x46527033 })
  );

  for (const y of [-0.75, 0, 0.75]) {
    const rib = new THREE.Mesh(ribGeometry, ribMaterial);
    rib.position.set(STORE.x, STORE.y + y, 0);
    rib.rotation.x = Math.PI / 2;
    root.add(rib);
  }

  const storeLabel = createLabel("ATIKAN DATABASE", { width: 3.3 });
  storeLabel.mesh.position.set(STORE.x, STORE.y - 1.95, 0);
  root.add(storeLabel.mesh);
  labels.push(storeLabel);

  /* -------------------------------------------------------------- records */

  const recordGeometry = keepGeometry(new THREE.SphereGeometry(0.15, 14, 10));

  const recordMaterial = keepMaterial(new THREE.MeshBasicMaterial());

  /*
   * Two streams plus the merged run they become. Instanced, because this is
   * a hundred-odd identical dots and one draw call is the whole reason the
   * act can afford them.
   */
  const TOTAL = STREAM * 2;

  const records = new THREE.InstancedMesh(
    recordGeometry,
    recordMaterial,
    TOTAL
  );

  records.frustumCulled = false;
  root.add(records);

  /** 0 = from Wealthbox, 1 = from LPL. */
  const from = new Uint8Array(TOTAL);
  const progress = new Float32Array(TOTAL);
  const speed = new Float32Array(TOTAL);
  const misses = new Uint8Array(TOTAL);
  const wobble = new Float32Array(TOTAL);

  for (let i = 0; i < TOTAL; i += 1) {
    from[i] = i < STREAM ? 0 : 1;
    progress[i] = Math.random();
    speed[i] = 0.24 + Math.random() * 0.1;
    misses[i] = Math.random() < MISS_RATE ? 1 : 0;
    wobble[i] = Math.random() * Math.PI * 2;
  }

  /* Scratch, so the loop allocates nothing. */
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);
  const matrix = new THREE.Matrix4();
  const colour = new THREE.Color();

  const client = new THREE.Color(CLIENT);
  const money = new THREE.Color(MONEY);
  const dropped = new THREE.Color(DROPPED);
  const merged = new THREE.Color(MERGED);

  let elapsed = 0;

  const update = (delta: number, state: DataGapState) => {
    elapsed += delta;

    const keyed = clamp01(state.keyed);

    for (let i = 0; i < TOTAL; i += 1) {
      progress[i] += speed[i] * delta;

      if (progress[i] >= 1) {
        progress[i] -= 1;

        /* Re-rolled each pass, so the failures are never the same records. */
        misses[i] = Math.random() < MISS_RATE * (1 - keyed) ? 1 : 0;
      }

      const p = progress[i];

      const startY = from[i] === 0 ? TOP_Y : BOTTOM_Y;

      if (p < 0.5) {
        /* Inbound: source to the junction. */
        const t = p / 0.5;

        position.set(
          THREE.MathUtils.lerp(SOURCE_X + 1.2, JUNCTION.x, t),
          THREE.MathUtils.lerp(startY, JUNCTION.y, t),
          Math.sin(wobble[i] + elapsed) * 0.25 * (1 - t)
        );

        colour.copy(from[i] === 0 ? client : money);
      } else if (misses[i] === 1) {
        /*
         * Failed the match. It does not continue and it does not arrive —
         * it falls out of the flow, which is exactly what an unmatched
         * record does: it is still in the source and absent from the store.
         */
        const t = (p - 0.5) / 0.5;

        position.set(
          JUNCTION.x + t * 1.1,
          JUNCTION.y - t * t * 4.2,
          Math.sin(wobble[i]) * 0.3
        );

        colour.copy(dropped).multiplyScalar(1 - t * 0.75);
      } else {
        /* Matched: one row, on to the store. */
        const t = (p - 0.5) / 0.5;

        position.set(
          THREE.MathUtils.lerp(JUNCTION.x, STORE.x - 1.2, t),
          JUNCTION.y + Math.sin(t * Math.PI) * 0.35,
          Math.sin(wobble[i] + elapsed) * 0.12
        );

        colour.copy(merged);
      }

      matrix.compose(position, quaternion, scale);
      records.setMatrixAt(i, matrix);
      records.setColorAt(i, colour);
    }

    records.instanceMatrix.needsUpdate = true;

    if (records.instanceColor) {
      records.instanceColor.needsUpdate = true;
    }

    /* The junction pulses as it keeps being asked to decide. */
    ringMaterial.color
      .setHex(0x64708d)
      .lerp(dropped, 0.35 + Math.sin(elapsed * 3.1) * 0.2);
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

  const reset = () => {
    elapsed = 0;

    for (let i = 0; i < TOTAL; i += 1) {
      progress[i] = Math.random();
      misses[i] = Math.random() < MISS_RATE ? 1 : 0;
    }
  };

  const dispose = () => {
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
    labels.forEach(l => l.dispose());

    records.dispose();

    geometries.length = 0;
    materials.length = 0;
    labels.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
