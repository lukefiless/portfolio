/**
 * IMPORTED PROPS
 *
 * Loads a static glTF — a desk, a chair, a plant — and drops it into an act
 * already scaled, seated on the floor and casting shadow.
 *
 * This is the unskinned sibling of `riggedFigure`. The difference is what a
 * clone needs: a character needs its OWN skeleton, so it goes through
 * `SkeletonUtils.clone`; a desk has no skeleton, so a plain `Object3D.clone`
 * is correct and cheaper. Both share the same idea — parse once, clone many.
 *
 * WHY A DOWNLOADED PROP USUALLY LOOKS WRONG AT FIRST
 *
 * Three things, all handled here, and all of them things the deck's own
 * `props.ts` objects never have to think about:
 *
 *   SCALE      exporters disagree about units. A Blender desk arrives in
 *              metres, a Mixamo-adjacent asset in centimetres, and a
 *              SketchUp export in inches. Normalising against a measured
 *              bounding box means the caller asks for "0.72 units tall" and
 *              gets it, whatever the file thought it was.
 *
 *   ORIGIN     almost nothing is authored sitting on its own origin. Seating
 *              the model on y = 0 and centring it in x/z is what lets an act
 *              position it by the spot on the floor it should occupy.
 *
 *   SHADOWS    glTF carries no `castShadow` flag, so an imported prop is lit
 *              but casts nothing until every mesh in it is walked and told
 *              to. A prop that takes the key light but drops no shadow is
 *              the single clearest tell that something was imported.
 *
 * AND ONE THIS CANNOT FIX FOR YOU
 *
 * The materials come from whoever made the file, and they were almost
 * certainly not authored for a dark studio with a bloom pass thresholding
 * linear light. A desk with a pale worktop will clear that threshold under
 * the key and turn into a lamp — see the note in `materials.ts`. If an
 * imported prop glows, pass `retint` over it rather than reaching for the
 * bloom settings in `stage.ts`.
 */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface PropModelOptions {
  /**
   * Width to scale the model to, measured on its bounding box AFTER `turn`.
   *
   * PREFER THIS FOR FURNITURE. Sizing a desk by its height sounds right and
   * is usually wrong: the deck's furniture is stylised — a deliberately low
   * worktop, a seat block with no back — so matching a realistic model's
   * height to it squashes the footprint to nothing. A desk normalised to
   * 0.72 tall came out 0.44 wide against the 2.9-wide box it replaced.
   *
   * Footprint is also what actually reads from the deck's camera distances.
   */
  width?: number;

  /**
   * Height to scale the model to. Applied only when `width` is not set.
   * Reasonable for anything whose height is its defining dimension — a
   * standing rack, a door — and wrong for most furniture.
   */
  height?: number;

  /**
   * Depth to scale the model to, measured on Z after `turn`. Applied only
   * when neither `width` nor `height` is set.
   *
   * The right one for anything whose LENGTH is its defining dimension — a
   * ship, a bridge, a train — where beam and height are consequences of it.
   */
  depth?: number;

  /**
   * A plain multiplier on the file's own scale. Wins over `width` and
   * `height`. Use when a model is already correctly proportioned and you
   * just want it bigger.
   */
  scale?: number;

  /**
   * Y rotation in radians applied after loading, for a model that was
   * authored facing a different way than the act needs.
   */
  turn?: number;

  /**
   * Seat the model on y = 0 and centre it in x/z. On by default, which is
   * what an act placing furniture on a floor wants. Turn it off for anything
   * that should keep the offset it was authored with.
   */
  ground?: boolean;
}

export interface PropModel {
  /** Add this to the act. Empty until the file lands, then populated. */
  root: THREE.Group;

  /** True once the model is in the scene graph. */
  isReady: () => boolean;

  /** Resolves when the model is placed, or rejects if the file will not load. */
  ready: Promise<void>;

  /** Detach. Does NOT free geometry — see the note on the implementation. */
  dispose: () => void;
}

/*
 * One parse per URL, however many copies are asked for.
 *
 * Six desks and six chairs is twelve models; without this it would also be
 * twelve downloads and twelve parses. The browser caches the HTTP response,
 * never the parsed result, so the cache has to live here.
 */
const loaded = new Map<string, Promise<THREE.Group>>();

/** Fetch and parse a glTF at most once per URL; later callers share the promise. */
export const loadPropModel = (url: string): Promise<THREE.Group> => {
  let pending = loaded.get(url);

  if (!pending) {
    pending = new Promise<THREE.Group>((resolve, reject) => {
      new GLTFLoader().load(url, gltf => resolve(gltf.scene), undefined, reject);
    });

    loaded.set(url, pending);
  }

  return pending;
};

/*
 * Measured sizes, logged once per URL.
 *
 * Getting an imported prop to sit right is three numbers you cannot know
 * until the file is open — how big it is, which way it faces, and where its
 * origin sits. Printing the first of those turns the usual guess-and-reload
 * loop into arithmetic.
 */
const reported = new Set<string>();

const report = (url: string, raw: THREE.Vector3, scale: number) => {
  if (reported.has(url)) {
    return;
  }

  reported.add(url);

  const fmt = (v: THREE.Vector3) =>
    `${v.x.toFixed(2)} x ${v.y.toFixed(2)} x ${v.z.toFixed(2)}`;

  console.info(
    `[prop] ${url} — measured ${fmt(raw)} (w x h x d, after turn), ` +
      `scaled ${scale.toFixed(3)} to ${fmt(
        raw.clone().multiplyScalar(scale)
      )}`
  );
};

/**
 * One placed copy of an imported prop.
 *
 * Returns immediately with an empty `root` and fills it in when the file
 * arrives, so an act can build its whole scene synchronously and never has to
 * await anything. Position `root` as usual — the model inside it is already
 * normalised, so the act only ever thinks about where on the floor it goes.
 */
export function createPropModel(
  url: string,
  options: PropModelOptions = {}
): PropModel {
  const root = new THREE.Group();

  let ready = false;

  const readyPromise = loadPropModel(url)
    .then(original => {
      const model = original.clone(true);

      /*
       * Exported scenes routinely carry the author's viewport camera and
       * three-point rig along with the object. Left in, they light the act
       * from somewhere the stage never intended.
       */
      for (const stray of [...model.children]) {
        if (stray instanceof THREE.Camera || stray instanceof THREE.Light) {
          stray.removeFromParent();
        }
      }

      /*
       * Turn FIRST, so `width` is measured on the axis that will actually
       * face the camera. Measuring before the turn and rotating after would
       * size a desk by its depth whenever it needed a quarter turn.
       */
      if (options.turn) {
        model.rotation.y = options.turn;
      }

      model.updateWorldMatrix(true, true);

      const raw = new THREE.Box3()
        .setFromObject(model)
        .getSize(new THREE.Vector3());

      let scale = 1;

      if (options.scale !== undefined) {
        scale = options.scale;
      } else if (options.width !== undefined) {
        scale = raw.x > 1e-6 ? options.width / raw.x : 1;
      } else if (options.height !== undefined) {
        scale = raw.y > 1e-6 ? options.height / raw.y : 1;
      } else if (options.depth !== undefined) {
        scale = raw.z > 1e-6 ? options.depth / raw.z : 1;
      }

      if (scale !== 1) {
        model.scale.setScalar(scale);
        model.updateWorldMatrix(true, true);
      }

      report(url, raw, scale);

      if (options.ground ?? true) {
        const placed = new THREE.Box3().setFromObject(model);
        const centre = placed.getCenter(new THREE.Vector3());

        model.position.x -= centre.x;
        model.position.z -= centre.z;
        model.position.y -= placed.min.y;
      }

      /* glTF carries no shadow flags; without this the prop casts nothing. */
      model.traverse(node => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      root.add(model);
      ready = true;
    });

  return {
    root,
    isReady: () => ready,
    ready: readyPromise.then(() => undefined),

    dispose: () => {
      /*
       * Detach only. Geometry and materials are SHARED with the cached
       * original and with every other copy cloned from it, so disposing them
       * here would blank every other instance of the same prop. The one
       * cached copy lives for the life of the page, which is the correct
       * lifetime for it.
       */
      root.clear();
    },
  };
}
