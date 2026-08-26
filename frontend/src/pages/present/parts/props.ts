/**
 * THE PROP LIBRARY
 *
 * Real objects, built once, used by every act that needs one.
 *
 * The deck used to represent a server, a database, a desk and a crate with
 * the same thing: a `BoxGeometry`. At a glance that reads as a placeholder,
 * and on a stage this dark it reads as a placeholder from the back of the
 * room — a cube has six flat faces, no silhouette to speak of, and razor
 * edges that catch no light at all.
 *
 * Three things are doing the work in here, in order of how much they matter:
 *
 *   BEVELS      every body is a RoundedBoxGeometry. A one-centimetre chamfer
 *               catches the key light as a bright line along every edge, and
 *               that single highlight is most of the difference between a
 *               render that looks modelled and one that looks blocked out.
 *
 *   SILHOUETTE  feet, ears, bezels, a lip on the crate. The outline is what
 *               an audience reads first, and a box has the same outline as
 *               anything else that is a box.
 *
 *   REPETITION  vents, drive bays, rack units. Fine repeated detail is what
 *               tells the eye something was manufactured rather than drawn,
 *               and it costs one instanced mesh.
 *
 * Every prop returns a `THREE.Group` and its own `dispose`. Nothing here
 * shares geometry between calls, because props get scaled and positioned per
 * act and a shared geometry would have to be uniform to be safe.
 */

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { ANODISED, SHADOWED, STEEL, emissive, surface } from "./materials";

export interface Prop {
  root: THREE.Group;

  /** Surfaces that should take the slide accent. Repaint via `retint`. */
  lit: THREE.MeshBasicMaterial[];

  dispose: () => void;
}

/** Collects everything a prop makes so `dispose` cannot miss any of it. */
const collector = () => {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  return {
    geometries,
    materials,

    g<T extends THREE.BufferGeometry>(geometry: T): T {
      geometries.push(geometry);
      return geometry;
    },

    m<T extends THREE.Material>(material: T): T {
      materials.push(material);
      return material;
    },

    dispose() {
      geometries.forEach(item => item.dispose());
      materials.forEach(item => item.dispose());

      geometries.length = 0;
      materials.length = 0;
    },
  };
};

/**
 * Bevelled body. The single most important call in this file.
 *
 * Segments are kept low — the chamfer only has to catch a highlight, not be
 * inspected — and the radius is capped against the smallest dimension so a
 * thin panel cannot be handed a radius that turns it into a lozenge.
 */
const body = (w: number, h: number, d: number, radius = 0.05) =>
  new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, Math.min(w, h, d) / 2.2));

export interface RackOptions {
  width?: number;
  height?: number;
  depth?: number;

  /** Rack units. Each gets a bay face and a status light. */
  units?: number;

  accent?: THREE.ColorRepresentation;
}

/**
 * A server rack.
 *
 * Used wherever the deck means "a system that holds records" — Wealthbox, the
 * Atikan database, the local model. A stack of bays with vents and a status
 * light per unit says "this is a machine that is running" in a way a labelled
 * cube cannot.
 */
export function createRack(options: RackOptions = {}): Prop {
  const {
    width = 2.3,
    height = 3.0,
    depth = 1.7,
    units = 5,
    accent = 0x7dd3ff,
  } = options;

  const keep = collector();
  const root = new THREE.Group();
  const lit: THREE.MeshBasicMaterial[] = [];

  const shell = keep.m(surface(ANODISED));

  const chassis = new THREE.Mesh(
    keep.g(body(width, height, depth, 0.07)),
    shell
  );
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  root.add(chassis);

  /*
   * The dark recess the bays sit in. Without it every bay floats on the front
   * face and the rack reads as a box with stickers on it.
   */
  const wellDepth = 0.06;

  const well = new THREE.Mesh(
    keep.g(body(width * 0.86, height * 0.9, wellDepth, 0.02)),
    keep.m(surface(SHADOWED))
  );

  well.position.z = depth / 2 + wellDepth / 2 - 0.01;
  root.add(well);

  /* ------------------------------------------------------------- the bays */

  const bayH = (height * 0.9) / units - 0.06;

  const bayGeometry = keep.g(body(width * 0.78, bayH, 0.05, 0.015));
  const bayMaterial = keep.m(surface(STEEL, { roughness: 0.62 }));

  const bays = new THREE.InstancedMesh(bayGeometry, bayMaterial, units);
  bays.castShadow = true;
  root.add(bays);

  /* One status light per bay, and the only thing here allowed to bloom. */
  const lampGeometry = keep.g(body(0.075, 0.075, 0.04, 0.012));
  const lampMaterial = keep.m(emissive(accent, 1.9));

  const lamps = new THREE.InstancedMesh(lampGeometry, lampMaterial, units);
  root.add(lamps);
  lit.push(lampMaterial);

  /*
   * Vents. Three fine slots per bay — the repetition is the point, and as one
   * instanced mesh the whole grille costs a single draw.
   */
  const SLOTS = 3;

  const ventGeometry = keep.g(body(width * 0.4, 0.022, 0.03, 0.008));
  const ventMaterial = keep.m(surface(SHADOWED, { roughness: 0.95 }));

  const vents = new THREE.InstancedMesh(
    ventGeometry,
    ventMaterial,
    units * SLOTS
  );

  root.add(vents);

  const at = new THREE.Vector3();
  const spin = new THREE.Quaternion();
  const size = new THREE.Vector3(1, 1, 1);
  const matrix = new THREE.Matrix4();

  const faceZ = depth / 2 + wellDepth;

  for (let u = 0; u < units; u += 1) {
    const y = height * 0.45 - bayH / 2 - u * (bayH + 0.06);

    at.set(0, y, faceZ);
    matrix.compose(at, spin, size);
    bays.setMatrixAt(u, matrix);

    at.set(width * 0.31, y, faceZ + 0.045);
    matrix.compose(at, spin, size);
    lamps.setMatrixAt(u, matrix);

    for (let v = 0; v < SLOTS; v += 1) {
      at.set(-width * 0.14, y + (v - 1) * 0.055, faceZ + 0.04);
      matrix.compose(at, spin, size);
      vents.setMatrixAt(u * SLOTS + v, matrix);
    }
  }

  bays.instanceMatrix.needsUpdate = true;
  lamps.instanceMatrix.needsUpdate = true;
  vents.instanceMatrix.needsUpdate = true;

  /* ------------------------------------------------------------ the feet */

  /*
   * Four short feet. They lift the body off the floor so the contact shadow
   * reads as an object standing on something rather than as a decal, and the
   * gap underneath is a large part of why a rack looks like equipment.
   */
  const footGeometry = keep.g(body(0.2, 0.12, 0.2, 0.03));
  const footMaterial = keep.m(surface(SHADOWED, { metalness: 0.6 }));

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeometry, footMaterial);

      foot.position.set(
        sx * (width / 2 - 0.22),
        -height / 2 - 0.05,
        sz * (depth / 2 - 0.22)
      );

      foot.castShadow = true;
      root.add(foot);
    }
  }

  return {
    root,
    lit,
    dispose: () => {
      bays.dispose();
      lamps.dispose();
      vents.dispose();
      keep.dispose();
    },
  };
}

export interface MonitorOptions {
  width?: number;
  height?: number;
  accent?: THREE.ColorRepresentation;
}

/**
 * A monitor on a stand.
 *
 * The bezel, the neck and the weighted base are the whole trick — a screen
 * without them is a lit rectangle floating above a desk, which is exactly
 * what the deck had.
 */
export function createMonitor(options: MonitorOptions = {}): Prop {
  const { width = 1.15, height = 0.72, accent = 0x7dd3ff } = options;

  const keep = collector();
  const root = new THREE.Group();
  const lit: THREE.MeshBasicMaterial[] = [];

  const shellMaterial = keep.m(surface(ANODISED, { roughness: 0.5 }));

  const shell = new THREE.Mesh(
    keep.g(body(width, height, 0.07, 0.03)),
    shellMaterial
  );

  shell.castShadow = true;
  root.add(shell);

  /* The panel, inset so the bezel casts a hairline shadow onto it. */
  const panelMaterial = keep.m(emissive(accent, 0.85));

  const panel = new THREE.Mesh(
    keep.g(body(width - 0.09, height - 0.09, 0.02, 0.01)),
    panelMaterial
  );

  panel.position.z = 0.04;
  root.add(panel);
  lit.push(panelMaterial);

  const neck = new THREE.Mesh(
    keep.g(body(0.11, 0.3, 0.09, 0.03)),
    shellMaterial
  );

  neck.position.y = -height / 2 - 0.13;
  neck.castShadow = true;
  root.add(neck);

  const base = new THREE.Mesh(
    keep.g(body(0.52, 0.035, 0.34, 0.015)),
    shellMaterial
  );

  base.position.y = -height / 2 - 0.29;
  base.castShadow = true;
  base.receiveShadow = true;
  root.add(base);

  return { root, lit, dispose: keep.dispose };
}

export interface DeskOptions {
  width?: number;
  depth?: number;
  height?: number;
}

/**
 * A desk with legs and an apron.
 *
 * A solid slab from the floor to the worktop is a plinth, not a desk. The
 * legs and the recessed apron are what put daylight under it, and the gap is
 * what makes a room of them read as furniture.
 */
export function createDesk(options: DeskOptions = {}): Prop {
  const { width = 2.9, depth = 1.5, height = 0.74 } = options;

  const keep = collector();
  const root = new THREE.Group();

  const topMaterial = keep.m(surface(ANODISED, { roughness: 0.52 }));
  const frameMaterial = keep.m(surface(SHADOWED, { metalness: 0.62 }));

  const top = new THREE.Mesh(
    keep.g(body(width, 0.075, depth, 0.025)),
    topMaterial
  );

  top.position.y = height;
  top.castShadow = true;
  top.receiveShadow = true;
  root.add(top);

  /* Set back from the edge, the way a real apron is. */
  const apron = new THREE.Mesh(
    keep.g(body(width - 0.34, 0.16, depth - 0.5, 0.02)),
    frameMaterial
  );

  apron.position.y = height - 0.13;
  apron.castShadow = true;
  root.add(apron);

  const legGeometry = keep.g(body(0.09, height - 0.08, 0.09, 0.02));

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const leg = new THREE.Mesh(legGeometry, frameMaterial);

      leg.position.set(
        sx * (width / 2 - 0.16),
        (height - 0.08) / 2,
        sz * (depth / 2 - 0.16)
      );

      leg.castShadow = true;
      root.add(leg);
    }
  }

  return { root, lit: [], dispose: keep.dispose };
}

export interface CrateOptions {
  size?: number;
  accent?: THREE.ColorRepresentation;
}

/**
 * A shipping crate with corner braces and a banding strap.
 *
 * Carried by the figure on the data slide. The braces are what make it read
 * as a container with something in it rather than as a cube being held.
 */
export function createCrate(options: CrateOptions = {}): Prop {
  const { size = 1.0, accent = 0xffb46b } = options;

  const keep = collector();
  const root = new THREE.Group();
  const lit: THREE.MeshBasicMaterial[] = [];

  const shellMaterial = keep.m(
    surface(STEEL, { color: 0x6d6152, roughness: 0.74, metalness: 0.24 })
  );

  const shell = new THREE.Mesh(
    keep.g(body(size, size * 0.86, size * 0.82, 0.035)),
    shellMaterial
  );

  shell.castShadow = true;
  root.add(shell);

  /* Corner braces down the four vertical edges. */
  const braceMaterial = keep.m(surface(SHADOWED, { metalness: 0.7 }));
  const braceGeometry = keep.g(body(0.07, size * 0.88, 0.07, 0.02));

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const brace = new THREE.Mesh(braceGeometry, braceMaterial);
      brace.position.set(sx * (size / 2 - 0.03), 0, sz * (size * 0.41 - 0.03));
      root.add(brace);
    }
  }

  /* A banding strap, and a small lit tag on the front. */
  const strap = new THREE.Mesh(
    keep.g(body(size * 1.02, 0.06, size * 0.84, 0.01)),
    braceMaterial
  );

  strap.position.y = size * 0.12;
  root.add(strap);

  const tagMaterial = keep.m(emissive(accent, 1.2));

  const tag = new THREE.Mesh(keep.g(body(0.26, 0.16, 0.02, 0.01)), tagMaterial);
  tag.position.set(0, -size * 0.16, size * 0.41 + 0.01);
  root.add(tag);
  lit.push(tagMaterial);

  return { root, lit, dispose: keep.dispose };
}
