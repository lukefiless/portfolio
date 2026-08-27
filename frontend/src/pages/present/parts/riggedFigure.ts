/**
 * IMPORTED CHARACTER, DRIVEN BY THIS RIG
 *
 * Loads a skinned glTF and applies the deck's own walk to its skeleton, so
 * an imported character moves with the animation authored here rather than
 * with whatever clips it happened to ship with (or, as is common, none).
 *
 * The hard part is that no two rigs agree on anything. Bone names differ per
 * exporter, and — more awkwardly — every bone's local axes point wherever
 * the artist's software left them, so "rotate the thigh forward" is a
 * different local rotation on every model.
 *
 * The fix is to never work in a bone's local space. Each swing is expressed
 * about a WORLD axis, converted into the bone's parent space at the moment
 * it is applied, and composed on top of the bone's rest pose. That is
 * independent of naming, of bind pose, and of which way the artist happened
 * to point the joints.
 */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";

import { computePose, type FigureInput, type LimbPose } from "./pose";

export interface RiggedFigure {
  /** Add to the scene immediately; the character appears once loaded. */
  root: THREE.Group;

  /** Where the hands meet. Follow it with a carried prop. */
  grip: THREE.Object3D;

  /** True once the skeleton is found and drivable. */
  isReady: () => boolean;

  /** Resolves with the bones that were matched, or rejects on failure. */
  ready: Promise<string[]>;

  step: (input: FigureInput) => void;
  dispose: () => void;
}

export interface RiggedOptions {
  /** Height to scale the character to, in world units. */
  height: number;

  /**
   * Y rotation, in radians, that makes the model face +Z — the direction
   * this rig treats as forward. Character exports are split roughly evenly
   * between facing +Z and -Z, and getting it wrong inverts every swing: the
   * arms reach backwards and the walk runs in reverse. Pass Math.PI for a
   * model that ships facing away from the viewer.
   */
  turn?: number;
}

/*
 * Candidate name fragments per slot, most specific first. Covers Reallusion
 * Character Creator (CC_Base_*), Mixamo (mixamorig:*), and the plain names
 * Blender and Unreal exports tend to use.
 */
const BONE_PATTERNS: Record<string, string[]> = {
  hips: ["cc_base_hip", "mixamorig:hips", "pelvis", "hips", "hip"],
  spine: [
    "cc_base_spine02",
    "cc_base_waist",
    "mixamorig:spine1",
    "spine2",
    "spine1",
    "spine",
  ],
  head: ["cc_base_head", "mixamorig:head", "head"],

  thighL: [
    "cc_base_l_thigh",
    "mixamorig:leftupleg",
    "thigh_l",
    "leftupleg",
    "upperleg_l",
    "l_thigh",
  ],
  calfL: [
    "cc_base_l_calf",
    "mixamorig:leftleg",
    "calf_l",
    "leftleg",
    "lowerleg_l",
    "l_calf",
  ],
  footL: [
    "cc_base_l_foot",
    "mixamorig:leftfoot",
    "foot_l",
    "leftfoot",
    "l_foot",
  ],

  thighR: [
    "cc_base_r_thigh",
    "mixamorig:rightupleg",
    "thigh_r",
    "rightupleg",
    "upperleg_r",
    "r_thigh",
  ],
  calfR: [
    "cc_base_r_calf",
    "mixamorig:rightleg",
    "calf_r",
    "rightleg",
    "lowerleg_r",
    "r_calf",
  ],
  footR: [
    "cc_base_r_foot",
    "mixamorig:rightfoot",
    "foot_r",
    "rightfoot",
    "r_foot",
  ],

  upperArmL: [
    "cc_base_l_upperarm",
    "mixamorig:leftarm",
    "upperarm_l",
    "leftarm",
    "l_upperarm",
  ],
  forearmL: [
    "cc_base_l_forearm",
    "mixamorig:leftforearm",
    "lowerarm_l",
    "leftforearm",
    "l_forearm",
  ],
  handL: [
    "cc_base_l_hand",
    "mixamorig:lefthand",
    "hand_l",
    "lefthand",
    "l_hand",
  ],

  upperArmR: [
    "cc_base_r_upperarm",
    "mixamorig:rightarm",
    "upperarm_r",
    "rightarm",
    "r_upperarm",
  ],
  forearmR: [
    "cc_base_r_forearm",
    "mixamorig:rightforearm",
    "lowerarm_r",
    "rightforearm",
    "r_forearm",
  ],
  handR: [
    "cc_base_r_hand",
    "mixamorig:righthand",
    "hand_r",
    "righthand",
    "r_hand",
  ],
};

type Slot = keyof typeof BONE_PATTERNS;

interface Driven {
  bone: THREE.Object3D;
  rest: THREE.Quaternion;
}

const WORLD_X = new THREE.Vector3(1, 0, 0);
const WORLD_Y = new THREE.Vector3(0, 1, 0);
const WORLD_Z = new THREE.Vector3(0, 0, 1);

/**
 * One parse per URL, however many figures ask for it.
 *
 * A character file is several megabytes and GLTFLoader re-parses it on every
 * call — the browser caches the HTTP response, not the result. Six workers in
 * a room meant six parses, and the deck now wants nine figures across three
 * slides.
 *
 * `SkeletonUtils.clone` is the right tool: it copies the node hierarchy and
 * gives the copy its OWN skeleton, while sharing the geometry and materials
 * with the original. Own skeleton is the part that matters — it is what lets
 * six figures hold six different poses. A plain `Object3D.clone` shares the
 * bones too, and every figure would move as one.
 */
const loaded = new Map<string, Promise<THREE.Group>>();

/** Fetch and parse a glTF at most once per URL; later callers share the promise. */
const loadOnce = (url: string): Promise<THREE.Group> => {
  let pending = loaded.get(url);

  if (!pending) {
    pending = new Promise<THREE.Group>((resolve, reject) => {
      new GLTFLoader().load(
        url,
        gltf => resolve(gltf.scene),
        undefined,
        reject
      );
    });

    loaded.set(url, pending);
  }

  return pending;
};

/**
 * Loads a skinned character and returns a figure that walks on the deck's own
 * rig. The GLB arrives asynchronously, so `root` is added to the scene
 * immediately and populated later — `step` is a no-op until `ready` flips.
 *
 * Setup, in order, once the file lands: clone it with its own skeleton, scale
 * it to `options.height`, resolve each bone slot by name, record every bone's
 * rest rotation, then relax the arms down out of whatever bind pose the file
 * shipped with.
 */
export function createRiggedFigure(
  url: string,
  options: RiggedOptions
): RiggedFigure {
  const root = new THREE.Group();

  /* Holds the loaded character so the root stays free for placement. */
  const holder = new THREE.Group();
  root.add(holder);

  const grip = new THREE.Group();
  root.add(grip);

  const bones = new Map<Slot, Driven>();

  let ready = false;

  /* Scratch, so the per-frame work allocates nothing. */
  const parentQuat = new THREE.Quaternion();
  const axis = new THREE.Vector3();
  const delta = new THREE.Quaternion();
  const composed = new THREE.Quaternion();
  const handWorld = new THREE.Vector3();

  /*
   * The character's own orientation. Swings must be expressed about ITS
   * left/right and up axes, not the world's — the moment it turns to face
   * its direction of travel the two stop agreeing, and a forward arm swing
   * becomes a sideways one.
   */
  const frameQuat = new THREE.Quaternion();

  /**
   * Resolve one bone slot by matching the model's node names against the
   * pattern list. Ranked rather than first-hit, because a naive substring
   * match on "hand" also catches every finger.
   */
  const find = (skeletonRoot: THREE.Object3D, slot: Slot) => {
    const candidates: THREE.Object3D[] = [];

    skeletonRoot.traverse(node => {
      /*
       * Deliberately not restricted to THREE.Bone. glTF only promotes a node
       * to a Bone if some skin lists it as a joint, and exporters routinely
       * leave whole limbs out of every joint list while still parenting the
       * hierarchy through them. Any node can be rotated; what matters is the
       * name.
       */
      if (node instanceof THREE.Mesh) {
        return;
      }

      /*
       * Intermediate helper joints (Character Creator emits a
       * "_scaleCompensation" node beside every real bone, plus twist and
       * share bones) must never win, or the rotation lands somewhere the
       * mesh does not follow.
       */
      if (/scalecompensation|twist|share/i.test(node.name)) {
        return;
      }

      candidates.push(node);
    });

    /* Prefer a real Bone when both a Bone and a plain node match. */
    const ranked = [
      ...candidates.filter(node => node instanceof THREE.Bone),
      ...candidates.filter(node => !(node instanceof THREE.Bone)),
    ];

    for (const pattern of BONE_PATTERNS[slot]) {
      const hit = ranked.find(node =>
        node.name.toLowerCase().includes(pattern)
      );

      if (hit) {
        return hit;
      }
    }

    return undefined;
  };

  /**
   * REST CORRECTION — bring the arms down before anything is applied to them.
   *
   * Every angle in `pose.ts` is expressed relative to an arm HANGING AT THE
   * SIDE, because that is how the procedural figure is built. `swing` composes
   * each angle on top of the bone's rest pose, so on a rig whose rest is a
   * T-pose the whole arm chain starts out horizontal and stays there — the
   * carry pose reads as arms held straight out, and `grip`, which is the
   * midpoint of the two hands, lands up beside the head with the carried box
   * following it there.
   *
   * Rather than assume a bind pose, this measures the one the file actually
   * shipped with: take the shoulder-to-hand vector as it rests, and fold in
   * the rotation that brings it to vertical. A T-posed rig gets the quarter
   * turn it needs, an A-pose gets a smaller one, and a rig already hanging
   * gets an identity that changes nothing.
   *
   * Runs once at load, so the allocations here cost nothing per frame.
   */
  const relaxArm = (upperSlot: Slot, handSlot: Slot) => {
    const upper = bones.get(upperSlot);
    const hand = bones.get(handSlot);

    if (!upper || !hand) {
      return;
    }

    const shoulder = upper.bone.getWorldPosition(new THREE.Vector3());
    const fist = hand.bone.getWorldPosition(new THREE.Vector3());

    const along = fist.sub(shoulder);

    /* A hand sitting on top of its shoulder gives no direction to correct. */
    if (along.lengthSq() < 1e-8) {
      return;
    }

    const fix = new THREE.Quaternion().setFromUnitVectors(
      along.normalize(),
      new THREE.Vector3(0, -1, 0)
    );

    /*
     * `rest` is a parent-space quaternion, so the world-space correction has
     * to be carried into that space before it can be composed with it.
     */
    const parentWorld = upper.bone.parent
      ? upper.bone.parent.getWorldQuaternion(new THREE.Quaternion())
      : new THREE.Quaternion();

    const inParentSpace = parentWorld
      .clone()
      .invert()
      .multiply(fix)
      .multiply(parentWorld);

    upper.rest.premultiply(inParentSpace);

    /*
     * Seat the corrected rest immediately. The second arm and the grip are
     * both measured off world matrices, and they must see the arm where it
     * now rests rather than where the file left it.
     */
    upper.bone.quaternion.copy(upper.rest);
    upper.bone.updateWorldMatrix(false, true);
  };

  const readyPromise = new Promise<string[]>((resolve, reject) => {
    loadOnce(url).then(original => {
      const model = cloneSkinned(original) as THREE.Group;

      for (const stray of [...model.children]) {
        if (stray instanceof THREE.Camera || stray instanceof THREE.Light) {
          stray.removeFromParent();
        }
      }

      model.updateWorldMatrix(true, true);

      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const scale = size.y > 1e-6 ? options.height / size.y : 1;

      model.scale.setScalar(scale);
      model.updateWorldMatrix(true, true);

      const seated = new THREE.Box3().setFromObject(model);
      const centre = seated.getCenter(new THREE.Vector3());

      model.position.x -= centre.x;
      model.position.z -= centre.z;
      model.position.y -= seated.min.y;

      model.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;

          /*
           * Skinned meshes are posed on the GPU, so their bounds go stale
           * the moment the skeleton moves and they start being culled at
           * the wrong times.
           */
          child.frustumCulled = false;
        }
      });

      holder.add(model);

      const matched: string[] = [];

      for (const slot of Object.keys(BONE_PATTERNS) as Slot[]) {
        const bone = find(model, slot);

        if (bone) {
          bones.set(slot, { bone, rest: bone.quaternion.clone() });
          matched.push(`${slot} → ${bone.name}`);
        }
      }

      /* The legs are the minimum that makes a walk read at all. */
      const essential: Slot[] = ["thighL", "calfL", "thighR", "calfR"];
      const missing = essential.filter(slot => !bones.has(slot));

      if (missing.length > 0) {
        reject(new Error(`skeleton is missing ${missing.join(", ")}`));

        return;
      }

      model.updateWorldMatrix(true, true);

      relaxArm("upperArmL", "handL");
      relaxArm("upperArmR", "handR");

      ready = true;
      resolve(matched);
    }, reject);
  });

  /**
   * Rotates a bone by `angle` about a WORLD axis, on top of its rest pose.
   * The axis is converted into the bone's parent space first, which is what
   * makes this independent of how the model's joints happen to be oriented.
   */
  const swing = (
    driven: Driven | undefined,
    frameAxis: THREE.Vector3,
    angle: number,
    accumulate = false
  ) => {
    if (!driven) {
      return;
    }

    /* Character frame first, then down into the bone's parent space. */
    axis.copy(frameAxis).applyQuaternion(frameQuat);

    const parent = driven.bone.parent;

    if (parent) {
      parent.getWorldQuaternion(parentQuat);
      axis.applyQuaternion(parentQuat.invert());
    }

    delta.setFromAxisAngle(axis.normalize(), angle);

    if (accumulate) {
      driven.bone.quaternion.premultiply(delta);
    } else {
      composed.copy(delta).multiply(driven.rest);
      driven.bone.quaternion.copy(composed);
    }
  };

  /**
   * Apply one `LimbPose` across a whole chain — upper, lower and optional tip.
   * Spread is accumulated on top of the upper swing rather than replacing it,
   * which is how an arm can swing forward and lift outward at once.
   */
  const poseLimb = (
    upperSlot: Slot,
    lowerSlot: Slot,
    tipSlot: Slot | null,
    limb: LimbPose
  ) => {
    swing(bones.get(upperSlot), WORLD_X, limb.upper);

    if (limb.spread !== 0) {
      swing(bones.get(upperSlot), WORLD_Z, limb.spread, true);
    }

    swing(bones.get(lowerSlot), WORLD_X, limb.lower);

    if (tipSlot) {
      swing(bones.get(tipSlot), WORLD_X, limb.tip);
    }
  };

  /**
   * Pose the skeleton for one frame. Same contract as the procedural figure's
   * `step`, and the same `computePose` call behind it — the difference is only
   * that the numbers land on bones instead of on groups built here.
   *
   * Whole-body motion rides `holder` rather than the hips bone, so it composes
   * cleanly with the per-bone work and cannot be undone by the next swing.
   */
  const step = (input: FigureInput) => {
    if (!ready) {
      return;
    }

    const pose = computePose(input);

    /* Whole-body motion rides the holder, not a bone. */
    holder.position.set(pose.body.offsetX, pose.body.offsetY, 0);
    /*
     * The facing correction lives on the holder rather than on the model, so
     * it is part of the frame the swing axes are resolved against. Applied
     * any deeper and the limbs would still swing the wrong way.
     */
    holder.rotation.set(pose.body.rotX, options.turn ?? 0, pose.body.rotZ);
    holder.scale.set(
      pose.body.stretchXZ,
      pose.body.stretchY,
      pose.body.stretchXZ
    );

    /* Re-read after the lean, so limb axes follow the body they hang from. */
    holder.updateWorldMatrix(true, false);
    holder.getWorldQuaternion(frameQuat);

    /*
     * Applied root-down: each bone's parent must already be in its final
     * orientation before the child converts a world axis into parent space.
     */
    const hips = bones.get("hips");

    if (hips) {
      swing(hips, WORLD_Y, pose.pelvis.rotY);
      swing(hips, WORLD_Z, pose.pelvis.rotZ, true);
      hips.bone.updateWorldMatrix(false, false);
    }

    const spine = bones.get("spine");

    if (spine) {
      swing(spine, WORLD_Y, pose.chest.rotY);
      swing(spine, WORLD_Z, pose.chest.rotZ, true);
      spine.bone.updateWorldMatrix(false, false);
    }

    const head = bones.get("head");

    if (head) {
      swing(head, WORLD_X, pose.head.rotX);
      swing(head, WORLD_Y, pose.head.rotY, true);
      swing(head, WORLD_Z, pose.head.rotZ, true);
    }

    poseLimb("thighL", "calfL", "footL", pose.legL);
    poseLimb("thighR", "calfR", "footR", pose.legR);
    poseLimb("upperArmL", "forearmL", null, pose.armL);
    poseLimb("upperArmR", "forearmR", null, pose.armR);

    /*
     * The grip tracks the actual hands rather than a guessed offset, so a
     * carried prop sits correctly whatever the character's proportions.
     */
    const handL = bones.get("handL");
    const handR = bones.get("handR");

    if (handL && handR) {
      handL.bone.updateWorldMatrix(true, false);
      handR.bone.updateWorldMatrix(true, false);

      handL.bone.getWorldPosition(handWorld);
      grip.position.copy(handWorld);

      handR.bone.getWorldPosition(handWorld);
      grip.position.add(handWorld).multiplyScalar(0.5);

      root.worldToLocal(grip.position);
    } else {
      grip.position.set(0, pose.grip.y + options.height * 0.55, pose.grip.z);
    }
  };

  const dispose = () => {
    /*
     * Detach only. Geometry and materials are SHARED with the cached original
     * and with every other figure cloned from it, so disposing them here
     * would blank every other character on the stage. The one cached copy
     * lives for the life of the page, which is the correct lifetime for it.
     */
    bones.clear();
    root.clear();
  };

  return {
    root,
    grip,
    isReady: () => ready,
    ready: readyPromise,
    step,
    dispose,
  };
}
