/**
 * WALKING FIGURE
 *
 * A stylised person with a proper articulated rig — pelvis and chest that
 * counter-rotate, two-segment limbs with knees and elbows, and a head that
 * lags behind the body.
 *
 * The build is a crash-test dummy: capsule limbs, exposed ball joints at
 * every pivot, no face and no clothing. Everything is ONE material, so the
 * form has to carry the read entirely — which is why the joints are modelled
 * as spheres rather than painted on. They catch the light differently to the
 * limbs either side of them and articulate the silhouette.
 *
 * A featureless head is a deliberate choice, not a saving. A face has to be
 * animated to stay believable; a blank one never falls into the uncanny gap,
 * and it keeps attention on what the figure is DOING.
 *
 * The fluidity comes from the animation principles rather than from more
 * joints:
 *
 *   squash and stretch  the body compresses on each footfall and extends
 *                       through the passing pose, volume roughly preserved
 *   overlapping action  the head and forearms trail the parts that drag
 *                       them, so nothing arrives all at once
 *   counter-rotation    shoulders twist against the hips, which is what
 *                       stops a walk looking like a marching toy
 *   arcs                the pelvis travels a rounded path, never a straight
 *                       vertical bob
 *   weight              carrying tips the whole body back and drops its
 *                       centre, and the stride gets heavier for it
 *
 * The legs also contribute to the body's final position. The lowest foot is
 * treated as the supporting foot, which prevents the torso from looking like
 * it is floating independently above two swinging legs.
 *
 * Everything is driven by blended amounts rather than switches, so the walk
 * can ease in and out and the load can be picked up gradually. Nothing here
 * ever snaps between states.
 */

import * as THREE from "three";

import { computePose, type FigureInput } from "./pose";

export type { FigureInput };

export interface Figure {
  root: THREE.Group;

  /** Where the hands meet, in the figure's local space. Follow it with a prop. */
  grip: THREE.Object3D;

  step: (input: FigureInput) => void;
  dispose: () => void;
}

/* Segment lengths, bottom to top. */
const SHIN = 0.4;
const THIGH = 0.42;
const UPPER_ARM = 0.32;
const FOREARM = 0.3;

/*
 * Distance from the ankle pivot down to the approximate ground-contact point.
 *
 * This gives the foot a real ankle rather than rotating the foot around its
 * own centre.
 */
const ANKLE_HEIGHT = 0.08;

const HIP_Y = SHIN + THIGH + ANKLE_HEIGHT;

/** Roughly a quarter of total height — the main cartoon lever. */
const HEAD_RADIUS = 0.23;

interface Segment {
  group: THREE.Group;
  end: THREE.Group;
}

/**
 * Hangs a mesh from a joint at the parent's origin and returns both the
 * joint (rotate this) and a group at the far end (chain the next segment
 * here). Rotating a joint swings the limb from the shoulder or hip rather
 * than about its own middle.
 */
function segment(
  parent: THREE.Object3D,
  mesh: THREE.Mesh,
  length: number
): Segment {
  const group = new THREE.Group();

  mesh.position.y = -length / 2;
  group.add(mesh);

  const end = new THREE.Group();
  end.position.y = -length;
  group.add(end);

  parent.add(group);

  return { group, end };
}

export function createFigure(): Figure {
  const root = new THREE.Group();

  /* Everything below body inherits the bob, sway, lean and squash. */
  const body = new THREE.Group();
  root.add(body);

  /*
   * One material for the whole figure. Change this single colour to restyle
   * the character entirely.
   */
  const shell = new THREE.MeshStandardMaterial({
    color: 0xd9d3c7,
    roughness: 0.62,
    metalness: 0.08,
  });

  const geometries: THREE.BufferGeometry[] = [];

  const keep = <T extends THREE.BufferGeometry>(geometry: T): T => {
    geometries.push(geometry);
    return geometry;
  };

  /**
   * A capsule whose TOTAL height is `length`, so it drops straight into the
   * joint helper without the rounded caps pushing it past the segment it is
   * meant to represent.
   */
  const limb = (radius: number, length: number) =>
    keep(
      new THREE.CapsuleGeometry(
        radius,
        Math.max(length - radius * 2, 0.01),
        6,
        16
      )
    );

  const jointGeometry = keep(new THREE.SphereGeometry(1, 18, 14));

  /**
   * A ball joint at a pivot. Placed at the joint group's own origin so it
   * sits exactly where the rotation happens and stays put while the limb
   * swings through it.
   */
  const ballAt = (parent: THREE.Object3D, radius: number) => {
    const ball = new THREE.Mesh(jointGeometry, shell);
    ball.scale.setScalar(radius);
    parent.add(ball);
    return ball;
  };

  /* ---------------------------------------------------------------- pelvis */

  const pelvis = new THREE.Group();
  pelvis.position.y = HIP_Y;
  body.add(pelvis);

  const hips = new THREE.Mesh(
    keep(new THREE.CapsuleGeometry(0.17, 0.12, 6, 16)),
    shell
  );

  hips.rotation.z = Math.PI / 2;
  hips.scale.set(1, 1, 0.85);
  pelvis.add(hips);

  /* ----------------------------------------------------------------- legs */

  const thighGeometry = limb(0.1, THIGH);
  const shinGeometry = limb(0.088, SHIN);
  const footGeometry = keep(new THREE.SphereGeometry(0.125, 18, 14));

  const buildLeg = (side: number) => {
    const thigh = segment(pelvis, new THREE.Mesh(thighGeometry, shell), THIGH);

    thigh.group.position.x = side * 0.115;
    ballAt(thigh.group, 0.125);

    const shin = segment(thigh.end, new THREE.Mesh(shinGeometry, shell), SHIN);

    ballAt(shin.group, 0.105);

    /*
     * The ankle is its own pivot.
     *
     * Previously the foot mesh itself was rotated, which meant it rotated
     * around the middle of the foot. This group now behaves like an actual
     * ankle joint.
     */
    const foot = new THREE.Group();
    shin.end.add(foot);

    ballAt(foot, 0.085);

    /*
     * Visible foot mesh.
     *
     * It sits forward and slightly below the ankle so rotation of `foot`
     * behaves much more like plantar/dorsiflexion at a real ankle.
     */
    const footMesh = new THREE.Mesh(footGeometry, shell);
    footMesh.scale.set(0.92, 0.6, 1.45);
    footMesh.position.set(0, -0.005, 0.09);
    foot.add(footMesh);

    /*
     * Invisible marker representing the approximate ground-contact point
     * underneath the foot.
     *
     * We inspect this during animation to work out how much the body needs
     * to move to remain supported by the legs.
     */
    const sole = new THREE.Object3D();
    sole.position.set(0, -ANKLE_HEIGHT, 0.09);
    foot.add(sole);

    return {
      thigh: thigh.group,
      shin: shin.group,
      foot,
      sole,
    };
  };

  const legL = buildLeg(-1);
  const legR = buildLeg(1);

  /* ----------------------------------------------------------------- chest */

  const chest = new THREE.Group();
  chest.position.y = 0.1;
  pelvis.add(chest);

  const torso = new THREE.Mesh(
    keep(new THREE.CapsuleGeometry(0.215, 0.3, 8, 20)),
    shell
  );

  torso.position.y = 0.2;
  torso.scale.set(1, 1, 0.76);
  chest.add(torso);

  const neck = new THREE.Group();
  neck.position.y = 0.4;
  chest.add(neck);

  ballAt(neck, 0.085);

  /* ----------------------------------------------------------------- head */

  const head = new THREE.Group();
  head.position.y = 0.1 + HEAD_RADIUS * 0.72;
  neck.add(head);

  const skull = new THREE.Mesh(
    keep(new THREE.SphereGeometry(HEAD_RADIUS, 32, 26)),
    shell
  );

  /* Slightly egg-shaped; a perfect sphere reads as a ball, not a head. */
  skull.scale.set(0.94, 1.12, 0.94);
  head.add(skull);

  /* ------------------------------------------------------------------ arms */

  const upperArmGeometry = limb(0.072, UPPER_ARM);
  const forearmGeometry = limb(0.064, FOREARM);
  const handGeometry = keep(new THREE.SphereGeometry(0.082, 18, 14));

  const shoulders = new THREE.Group();
  shoulders.position.y = 0.3;
  chest.add(shoulders);

  const buildArm = (side: number) => {
    const upper = segment(
      shoulders,
      new THREE.Mesh(upperArmGeometry, shell),
      UPPER_ARM
    );

    upper.group.position.x = side * 0.245;
    ballAt(upper.group, 0.1);

    const fore = segment(
      upper.end,
      new THREE.Mesh(forearmGeometry, shell),
      FOREARM
    );

    ballAt(fore.group, 0.082);

    const hand = new THREE.Mesh(handGeometry, shell);
    hand.scale.set(1, 1.1, 0.82);
    fore.end.add(hand);

    return {
      upper: upper.group,
      fore: fore.group,
      hand,
    };
  };

  const armL = buildArm(-1);
  const armR = buildArm(1);

  /* Sits between the hands so a carried prop can simply follow it. */
  const grip = new THREE.Group();
  grip.position.set(0, -0.16, 0.6);
  shoulders.add(grip);

  /* --------------------------------------------------- grounding state */

  /*
   * Scratch vectors reused every frame so the walk does not create garbage
   * for the JS garbage collector.
   */
  const leftSolePosition = new THREE.Vector3();
  const rightSolePosition = new THREE.Vector3();

  /*
   * These are smoothed corrections layered on top of the authored pose.
   *
   * groundOffsetY:
   *   Keeps the lowest foot near the floor.
   *
   * stanceOffsetZ:
   *   Lets the support leg subtly influence where the body's mass sits.
   */
  let groundOffsetY = 0;
  let stanceOffsetZ = 0;

  let previousTime: number | null = null;

  /* ------------------------------------------------------------------ step */

  const step = (input: FigureInput) => {
    const pose = computePose(input);

    /* ---------------------------------------------------------- timing */

    let dt = 1 / 60;
    const firstFrame = previousTime === null;

    if (!firstFrame) {
      dt = THREE.MathUtils.clamp(input.time - previousTime!, 0, 1 / 20);
    }

    previousTime = input.time;

    /*
     * Exponential smoothing gives approximately the same response regardless
     * of frame rate.
     */
    const follow = firstFrame ? 1 : 1 - Math.exp(-22 * dt);

    /* ------------------------------------------------------------ legs */

    legL.thigh.rotation.x = pose.legL.upper;
    legL.shin.rotation.x = pose.legL.lower;
    legL.foot.rotation.x = pose.legL.tip;

    legR.thigh.rotation.x = pose.legR.upper;
    legR.shin.rotation.x = pose.legR.lower;
    legR.foot.rotation.x = pose.legR.tip;

    /* ------------------------------------------------------------ arms */

    armL.upper.rotation.x = pose.armL.upper;
    armL.upper.rotation.z = pose.armL.spread;
    armL.fore.rotation.x = pose.armL.lower;

    armR.upper.rotation.x = pose.armR.upper;
    armR.upper.rotation.z = pose.armR.spread;
    armR.fore.rotation.x = pose.armR.lower;

    /* ------------------------------------------------------------ body */

    /*
     * Begin every frame from the authored body pose.
     *
     * The leg-based correction is calculated afterwards so it does not
     * accumulate indefinitely from one frame to the next.
     */
    body.position.set(pose.body.offsetX, pose.body.offsetY, 0);

    body.rotation.x = pose.body.rotX;
    body.rotation.z = pose.body.rotZ;

    body.scale.set(
      pose.body.stretchXZ,
      pose.body.stretchY,
      pose.body.stretchXZ
    );

    /* ---------------------------------------------------------- pelvis */

    pelvis.rotation.y = pose.pelvis.rotY;
    pelvis.rotation.z = pose.pelvis.rotZ;

    /* ----------------------------------------------------------- chest */

    chest.rotation.y = pose.chest.rotY;
    chest.rotation.z = pose.chest.rotZ;
    chest.scale.y = pose.chest.breathe;

    /* ------------------------------------------------------------ head */

    head.rotation.x = pose.head.rotX;
    head.rotation.y = pose.head.rotY - chest.rotation.y * 0.5;
    head.rotation.z = pose.head.rotZ;

    /* ------------------------------------------------------------ grip */

    grip.position.set(0, pose.grip.y, pose.grip.z);

    /* ================================================================
     * FOOT GROUNDING
     *
     * Everything above this point creates the desired skeletal pose.
     *
     * Now inspect where the feet actually ended up and use them to influence
     * the body's final position. This makes the legs feel like they are
     * supporting the character instead of merely swinging underneath it.
     * ================================================================ */

    root.updateMatrixWorld(true);

    legL.sole.getWorldPosition(leftSolePosition);
    legR.sole.getWorldPosition(rightSolePosition);

    /*
     * Work in root-local coordinates.
     *
     * This keeps the grounding system independent of wherever the entire
     * figure has been placed in the scene.
     */
    root.worldToLocal(leftSolePosition);
    root.worldToLocal(rightSolePosition);

    /* ------------------------------------------------ vertical support */

    /*
     * The lower foot is the one closest to the ground.
     *
     * Correct the body vertically so this foot remains approximately at y=0.
     */
    const lowestSoleY = Math.min(leftSolePosition.y, rightSolePosition.y);

    const targetGroundOffsetY = -lowestSoleY;

    groundOffsetY = THREE.MathUtils.lerp(
      groundOffsetY,
      targetGroundOffsetY,
      follow
    );

    body.position.y += groundOffsetY;

    /* ------------------------------------------------ stance support */

    /*
     * Work out which foot is carrying more weight.
     *
     * A logistic blend avoids a hard left/right switch exactly when the feet
     * trade places.
     */
    const heightDifference = leftSolePosition.y - rightSolePosition.y;

    const leftSupport = 1 / (1 + Math.exp(heightDifference * 45));

    /*
     * Blend between the two foot positions according to which one is lower.
     */
    const supportFootZ = THREE.MathUtils.lerp(
      rightSolePosition.z,
      leftSolePosition.z,
      leftSupport
    );

    /*
     * Allow the stance leg to pull the body slightly opposite its local
     * displacement.
     *
     * Using less than 1 keeps some flexibility in the motion rather than
     * mathematically welding the foot to the floor.
     */
    const targetStanceOffsetZ = -supportFootZ * 0.8;

    stanceOffsetZ = THREE.MathUtils.lerp(
      stanceOffsetZ,
      targetStanceOffsetZ,
      follow
    );

    body.position.z += stanceOffsetZ;
  };

  step({
    phase: 0,
    gait: 0,
    load: 0,
    reach: 0,
    time: 0,
  });

  /* --------------------------------------------------------------- dispose */

  const dispose = () => {
    for (const geometry of geometries) {
      geometry.dispose();
    }

    shell.dispose();
  };

  return {
    root,
    grip,
    step,
    dispose,
  };
}
