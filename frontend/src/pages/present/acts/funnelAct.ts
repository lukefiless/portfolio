/**
 * ACT — ONBOARDING, AS THE FUNNEL
 *
 * Clients arrive at the top and fall through a funnel. What happens after they
 * come out of the neck is the whole slide.
 *
 * BEFORE. Nothing catches them. They drop out of the neck onto the floor and
 * PILE UP — actually pile up, under gravity, resting on each other — while one
 * person walks over, stoops, picks a single client off the heap, carries it to
 * the right box, and walks back for the next. Arrivals do not wait for the
 * walk, so the heap grows the entire time. It is not a metaphor for a backlog;
 * it is a backlog, obeying the same rule a real one does: things come in faster
 * than one person can place them.
 *
 * AFTER. Straight pipes run from the neck down onto a conveyor, the conveyor
 * carries everything across, and each client drops off it into its own box on
 * the way past. The floor is empty because nothing ever lands on it. Nobody
 * walks anywhere.
 *
 * The arrival rate is identical in both halves, and the boxes never move. The
 * only thing that changed is whether a person is standing between the funnel
 * and the box.
 *
 * The pile is simulated rather than posed. Scripted heaps read as decoration —
 * they settle too neatly and they never grow wrong — and the point of this one
 * is that it is a consequence, not a picture.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { clamp01, ease, smootherstep } from "../parts/easing";

import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";

/** The same character as the pipeline act, so the person is one person. */
const CHARACTER_MODEL: string | null = "/models/character.glb";
const CHARACTER_HEIGHT = 2.25;

const BOXES = 3;
const CLIENTS = 34;

const BALL_R = 0.27;

/** Funnel geometry. The neck is where everything is decided. */
const FUNNEL_TOP = 4.9;
const FUNNEL_NECK = 3.1;
const MOUTH_R = 2.3;
const NECK_R = 0.5;

/** The funnel, the heap under it, and the figure all live around here. */
const DROP_X = -5.4;

const BOX_X = [1.4, 4.0, 6.6];
const BOX_Y = 0.55;

const BELT_Y = 1.5;
const BELT_FROM = -6.9;
const BELT_TO = 7.9;

/** Clients per second. The same before and after — that is the control. */
const ARRIVALS = 1.85;

/*
 * One trip: stoop, carry, place, walk back. Each entry is when that phase
 * ENDS, so the last is the length of the loop. A phase table rather than a
 * chain of conditions, for the same reason the pipeline act uses one — with
 * overlapping ranges the figure ends up in two places.
 */
const PHASE = {
  waiting: 1,
  stoop: 2.2,
  carry: 5.4,
  place: 6.7,
  back: 9.3,
  resting: 9.5,
} as const;

const TRIP = PHASE.resting;

/** Where the figure stands to work the heap, and to reach a box. */
const AT_PILE = DROP_X + 1.5;

const BOX_COLOURS = [0xff9d5c, 0x6fd3ff, 0xb08cff];

/* Facing, matching the pipeline act so the same character reads the same. */
const FACE_RIGHT = Math.PI / 2 - 0.4;
const FACE_LEFT = -Math.PI / 2 + 0.4;

/** Every client is in exactly one of these, and leaves by exactly one door. */
const enum Phase {
  Idle,
  /** Under gravity, inside the funnel or on its way to the heap. */
  Loose,
  /** At rest in the heap, waiting to be picked up. */
  Heaped,
  /** In the figure's hands. */
  Carried,
  /** Riding the conveyor toward its box. */
  Belted,
  /** Dropping into a box. */
  Landing,
}

export interface FunnelState {
  /** 0 = one person and a growing heap. 1 = pipes, a conveyor, and nobody. */
  handsOff: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type FunnelAct = Act<FunnelState>;

export function createFunnelAct(): FunnelAct {
  const root = new THREE.Group();

  root.position.set(0, 2.4, 0);
  root.rotation.y = -0.14;

  const accent = new THREE.Color(0x7dfcc0);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

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

  /* Shadow only, so the void stays a void but the heap still sits on ground. */
  const floorMaterial = keepMaterial(
    new THREE.ShadowMaterial({ opacity: 0.5 })
  );

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);

  /* ---------------------------------------------------------------- funnel */

  const funnelGeometry = keepGeometry(
    new THREE.CylinderGeometry(
      MOUTH_R,
      NECK_R,
      FUNNEL_TOP - FUNNEL_NECK,
      48,
      1,
      true
    )
  );

  /*
   * See-through. The clients backing up inside the hopper are half the
   * argument, and an opaque cone hides every one of them.
   */
  const funnelMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x4a5878,
      metalness: 0.4,
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    })
  );

  const funnel = new THREE.Mesh(funnelGeometry, funnelMaterial);
  funnel.position.set(DROP_X, (FUNNEL_TOP + FUNNEL_NECK) / 2, 0);
  root.add(funnel);

  const rimGeometry = keepGeometry(
    new THREE.TorusGeometry(MOUTH_R, 0.05, 10, 64)
  );

  const rimMaterial = keepMaterial(
    new THREE.MeshBasicMaterial({ color: 0x3d4a63 })
  );

  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(DROP_X, FUNNEL_TOP, 0);
  rim.rotation.x = Math.PI / 2;
  root.add(rim);

  /* ------------------------------------------------------------------ boxes */

  const boxGeometry = keepGeometry(new THREE.BoxGeometry(1.8, 1.1, 1.5));

  const boxMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x232b3c,
      metalness: 0.4,
      roughness: 0.62,
    })
  );

  const lipGeometry = keepGeometry(new THREE.BoxGeometry(1.9, 0.1, 1.6));

  const lipMaterials: THREE.MeshBasicMaterial[] = [];

  for (let b = 0; b < BOXES; b += 1) {
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(BOX_X[b], BOX_Y, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    root.add(box);

    const lipMaterial = keepMaterial(
      new THREE.MeshBasicMaterial({ color: BOX_COLOURS[b] })
    );

    const lip = new THREE.Mesh(lipGeometry, lipMaterial);
    lip.position.set(BOX_X[b], BOX_Y + 0.6, 0);
    root.add(lip);

    lipMaterials.push(lipMaterial);
  }

  /* ------------------------------------------------------------- conveyor */

  /*
   * The replacement, built once and revealed on the handover. It reaches back
   * under the funnel on purpose: with the belt in the way there is no longer
   * any floor beneath the neck to land on, so the clients simply fall the
   * short distance onto it. The same gravity that built the heap now delivers
   * them, which is a stronger thing to show than a chute — nothing had to be
   * routed anywhere, the floor just moved up to meet them.
   */
  const plumbing = new THREE.Group();
  root.add(plumbing);

  const beltGeometry = keepGeometry(
    new THREE.BoxGeometry(BELT_TO - BELT_FROM, 0.16, 1.5)
  );

  const beltMaterial = keepMaterial(
    new THREE.MeshStandardMaterial({
      color: 0x2c3446,
      metalness: 0.45,
      roughness: 0.6,
    })
  );

  const belt = new THREE.Mesh(beltGeometry, beltMaterial);
  belt.position.set((BELT_FROM + BELT_TO) / 2, BELT_Y, 0);
  belt.castShadow = true;
  belt.receiveShadow = true;
  plumbing.add(belt);

  /*
   * Treads. Without something moving on its surface a conveyor is a plank —
   * the belt has to be visibly running even in the instants nothing is on it.
   */
  const TREADS = 26;

  const treadGeometry = keepGeometry(new THREE.BoxGeometry(0.1, 0.04, 1.4));

  const treadMaterial = keepMaterial(
    new THREE.MeshBasicMaterial({ color: 0x4b5a72 })
  );

  const treads = new THREE.InstancedMesh(treadGeometry, treadMaterial, TREADS);

  treads.frustumCulled = false;
  plumbing.add(treads);

  /* ---------------------------------------------------------------- clients */

  const ballGeometry = keepGeometry(new THREE.SphereGeometry(BALL_R, 20, 16));

  const ballMaterials = BOX_COLOURS.map(color =>
    keepMaterial(
      new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.5 })
    )
  );

  const balls: THREE.Mesh[] = [];
  const phase = new Uint8Array(CLIENTS);
  const boxOf = new Uint8Array(CLIENTS);

  const pos = Array.from({ length: CLIENTS }, () => new THREE.Vector3());
  const vel = Array.from({ length: CLIENTS }, () => new THREE.Vector3());
  const from = Array.from({ length: CLIENTS }, () => new THREE.Vector3());

  const travel = new Float32Array(CLIENTS);

  for (let i = 0; i < CLIENTS; i += 1) {
    const box = i % BOXES;
    boxOf[i] = box;

    const mesh = new THREE.Mesh(ballGeometry, ballMaterials[box]);
    mesh.castShadow = true;
    mesh.visible = false;

    root.add(mesh);
    balls.push(mesh);
  }

  /* ---------------------------------------------------------------- figure */

  const figure: Figure = createFigure();
  figure.root.scale.setScalar(1.18);
  root.add(figure.root);

  const character: RiggedFigure | null = CHARACTER_MODEL
    ? createRiggedFigure(CHARACTER_MODEL, {
        height: CHARACTER_HEIGHT,
        turn: 0,
      })
    : null;

  if (character) {
    root.add(character.root);

    character.ready.catch(error =>
      console.warn(
        "[funnel] falling back to the procedural rig:",
        error.message
      )
    );
  }

  /* ------------------------------------------------------------------ loop */

  let elapsed = 0;
  let spawnDebt = 0;
  let drainDebt = 0;
  let tripTime = 0;

  let gait = 0;
  let carried = 0;
  let reaching = 0;
  let facing = FACE_LEFT;
  let walkPhase = 0;

  /** The client currently in the figure's hands, or -1. */
  let inHand = -1;
  let tookThisTrip = false;

  const gripWorld = new THREE.Vector3();
  const separation = new THREE.Vector3();
  const treadMatrix = new THREE.Matrix4();
  const treadPosition = new THREE.Vector3();
  const treadQuat = new THREE.Quaternion();
  const treadScale = new THREE.Vector3(1, 1, 1);
  const scratchColour = new THREE.Color();

  const spawn = () => {
    for (let i = 0; i < CLIENTS; i += 1) {
      if (phase[i] !== Phase.Idle) {
        continue;
      }

      phase[i] = Phase.Loose;

      pos[i].set(
        DROP_X + (Math.random() - 0.5) * MOUTH_R * 1.1,
        FUNNEL_TOP + 0.3 + Math.random() * 0.4,
        (Math.random() - 0.5) * MOUTH_R * 0.8
      );

      vel[i].set(0, -0.4, 0);
      balls[i].visible = true;

      return;
    }
  };

  /** The client sitting highest on the heap — the one a hand would take. */
  const topOfHeap = () => {
    let best = -1;
    let bestY = -Infinity;

    for (let i = 0; i < CLIENTS; i += 1) {
      if (phase[i] === Phase.Heaped && pos[i].y > bestY) {
        bestY = pos[i].y;
        best = i;
      }
    }

    return best;
  };

  /**
   * Gravity, the floor, and clients resting on each other.
   *
   * Deliberately small: a few iterations of positional separation rather than
   * a solver with impulses and friction. A heap only has to be believable at
   * rest and roughly right on the way there, and this is the whole of what
   * that takes.
   */
  const settle = (delta: number, automated: boolean) => {
    for (let i = 0; i < CLIENTS; i += 1) {
      if (phase[i] !== Phase.Loose && phase[i] !== Phase.Heaped) {
        continue;
      }

      vel[i].y -= 15 * delta;

      pos[i].addScaledVector(vel[i], delta);

      /*
       * The funnel walls. Inside the cone the clients are squeezed toward the
       * middle, which is what makes them leave through the neck one at a time
       * instead of raining straight past it.
       */
      if (pos[i].y > FUNNEL_NECK && pos[i].y < FUNNEL_TOP) {
        const t = (pos[i].y - FUNNEL_NECK) / (FUNNEL_TOP - FUNNEL_NECK);
        const wall = THREE.MathUtils.lerp(NECK_R, MOUTH_R, t) - BALL_R;

        const dx = pos[i].x - DROP_X;
        const dz = pos[i].z;
        const radial = Math.hypot(dx, dz);

        if (radial > wall && radial > 1e-5) {
          const pull = wall / radial;

          pos[i].x = DROP_X + dx * pull;
          pos[i].z = dz * pull;

          /* Sliding down a wall costs some of the sideways speed. */
          vel[i].x *= 0.6;
          vel[i].z *= 0.6;
        }
      }

      /*
       * The belt, once there is one. It sits between the neck and the floor
       * and spans the whole run, so a client that would have hit the ground
       * meets a moving surface instead — which is the entire difference
       * between the two halves, expressed as one collision plane.
       */
      if (automated) {
        const beltTop = BELT_Y + 0.08 + BALL_R;

        if (pos[i].y <= beltTop && pos[i].x > BELT_FROM && pos[i].x < BELT_TO) {
          pos[i].y = beltTop;
          vel[i].set(0, 0, 0);
          phase[i] = Phase.Belted;
          continue;
        }
      }

      /* The floor. */
      if (pos[i].y < BALL_R) {
        pos[i].y = BALL_R;

        if (vel[i].y < 0) {
          vel[i].y *= -0.22;
        }

        vel[i].x *= 0.82;
        vel[i].z *= 0.82;

        /*
         * A gentle draw back toward the drop point once they are down.
         *
         * Without it the separation pass alone decides where they end up, and
         * since it only ever pushes outward the heap spreads into a single
         * layer and then keeps creeping — clients wander out of frame and the
         * pile never gets tall enough to read as one. Real spheres on a real
         * floor have friction doing this job; this is the cheap stand-in.
         */
        pos[i].x = ease(pos[i].x, DROP_X, 1.6, delta);
        pos[i].z = ease(pos[i].z, 0, 1.6, delta);
      }
    }

    /* Two relaxation passes is enough to stop a heap interpenetrating. */
    for (let pass = 0; pass < 2; pass += 1) {
      for (let a = 0; a < CLIENTS; a += 1) {
        if (phase[a] !== Phase.Loose && phase[a] !== Phase.Heaped) {
          continue;
        }

        for (let b = a + 1; b < CLIENTS; b += 1) {
          if (phase[b] !== Phase.Loose && phase[b] !== Phase.Heaped) {
            continue;
          }

          separation.subVectors(pos[b], pos[a]);

          const distance = separation.length();
          const minimum = BALL_R * 2;

          if (distance >= minimum || distance < 1e-6) {
            continue;
          }

          const push = (minimum - distance) * 0.5;

          separation.multiplyScalar(push / distance);

          pos[a].sub(separation);
          pos[b].add(separation);

          /* Bleed off the speed they were closing at, so heaps stop moving. */
          vel[a].multiplyScalar(0.94);
          vel[b].multiplyScalar(0.94);
        }
      }
    }

    /* Anything slow and low enough has joined the heap. */
    for (let i = 0; i < CLIENTS; i += 1) {
      if (phase[i] !== Phase.Loose) {
        continue;
      }

      if (pos[i].y < BALL_R * 3.4 && vel[i].lengthSq() < 0.6) {
        phase[i] = Phase.Heaped;
      }
    }
  };

  const update = (delta: number, state: FunnelState) => {
    elapsed += delta;

    const handsOff = clamp01(state.handsOff);
    const automated = handsOff > 0.5;
    const shown = smootherstep(handsOff);

    spawnDebt += ARRIVALS * delta;

    while (spawnDebt >= 1) {
      spawn();
      spawnDebt -= 1;
    }

    /* The plumbing arrives as the person leaves, on one ramp. */
    plumbing.visible = shown > 0.004;
    plumbing.scale.set(1, Math.max(shown, 0.0001), 1);
    plumbing.position.y = (1 - shown) * -1.2;

    /* Treads, running whenever the belt exists. */
    if (plumbing.visible) {
      const run = (elapsed * 1.9) % 0.44;

      for (let t = 0; t < TREADS; t += 1) {
        treadPosition.set(BELT_FROM + run + t * 0.44, BELT_Y + 0.1, 0);
        treadMatrix.compose(treadPosition, treadQuat, treadScale);
        treads.setMatrixAt(t, treadMatrix);
      }

      treads.instanceMatrix.needsUpdate = true;
    }

    settle(delta, automated);

    /* --------------------------------------------------------- the person */

    const imported = character?.isReady() ?? false;

    figure.root.visible = !automated && !imported;

    if (character) {
      character.root.visible = !automated && imported;
    }

    if (!automated) {
      tripTime = (tripTime + delta) % TRIP;

      if (tripTime < delta) {
        tookThisTrip = false;
      }

      const inPhase = (a: number, b: number) => tripTime >= a && tripTime < b;

      const across = (a: number, b: number) =>
        smootherstep((tripTime - a) / (b - a));

      const stooping = inPhase(PHASE.waiting, PHASE.stoop);
      const carrying = inPhase(PHASE.stoop, PHASE.carry);
      const placing = inPhase(PHASE.carry, PHASE.place);
      const returning = inPhase(PHASE.place, PHASE.back);

      /* Which box this trip is for — whatever the client in hand needs. */
      const targetBox = inHand >= 0 ? boxOf[inHand] : 0;
      const dropAt = BOX_X[targetBox] - 1.35;

      let walkX = AT_PILE;
      let moving = false;
      let headingRight = false;
      let reach = 0;
      let holding = 0;

      if (stooping) {
        const t = across(PHASE.waiting, PHASE.stoop);

        /* Reach down, close on one, straighten up with it. */
        reach =
          t < 0.6 ? smootherstep(t / 0.6) : 1 - smootherstep((t - 0.6) / 0.4);

        if (!tookThisTrip && t > 0.5) {
          const picked = topOfHeap();

          if (picked >= 0) {
            inHand = picked;
            phase[picked] = Phase.Carried;
          }

          tookThisTrip = true;
        }

        holding = inHand >= 0 ? 1 : 0;
      } else if (carrying) {
        walkX = THREE.MathUtils.lerp(
          AT_PILE,
          dropAt,
          across(PHASE.stoop, PHASE.carry)
        );

        moving = true;
        headingRight = true;
        holding = inHand >= 0 ? 1 : 0;
      } else if (placing) {
        const t = across(PHASE.carry, PHASE.place);

        walkX = dropAt;
        headingRight = true;

        reach =
          t < 0.55
            ? smootherstep(t / 0.55)
            : 1 - smootherstep((t - 0.55) / 0.45);
        holding = t < 0.55 && inHand >= 0 ? 1 : 0;

        if (t >= 0.55 && inHand >= 0) {
          /* Let go over the box and let it fall the rest of the way. */
          phase[inHand] = Phase.Landing;
          from[inHand].copy(pos[inHand]);
          travel[inHand] = 0;
          inHand = -1;
        }
      } else if (returning) {
        walkX = THREE.MathUtils.lerp(
          dropAt,
          AT_PILE,
          across(PHASE.place, PHASE.back)
        );

        moving = true;
      }

      gait = ease(gait, moving ? 1 : 0, 7, delta);
      carried = ease(carried, holding, 6, delta);
      reaching = ease(reaching, reach, 8, delta);
      facing = ease(facing, headingRight ? FACE_RIGHT : FACE_LEFT, 6, delta);

      walkPhase += delta * (7.6 - carried * 1.9) * gait;

      const drive = {
        phase: walkPhase,
        gait,
        load: carried,
        reach: reaching,
        time: elapsed,
      };

      if (imported && character) {
        character.root.position.x = walkX;
        character.root.rotation.y = facing;
        character.step(drive);
      }

      figure.root.position.x = walkX;
      figure.root.rotation.y = facing;
      figure.step(drive);

      /* Whatever is in hand rides the hands. */
      if (inHand >= 0) {
        const hands = imported && character ? character.grip : figure.grip;

        hands.getWorldPosition(gripWorld);
        root.worldToLocal(gripWorld);

        pos[inHand].copy(gripWorld);
      }
    } else if (inHand >= 0) {
      /* The handover caught them holding one. It still goes in its box. */
      phase[inHand] = Phase.Landing;
      from[inHand].copy(pos[inHand]);
      travel[inHand] = 0;
      inHand = -1;
    }

    /* ------------------------------------------------- pipes and conveyor */

    /*
     * The heap the old arrangement left behind. It is not deleted at the
     * handover and it does not sit there for ever either — the belt picks it
     * up a few at a time, so the backlog visibly drains. Vanishing it would
     * be the one dishonest frame in the act.
     */
    if (automated) {
      drainDebt += delta * 3.4;

      while (drainDebt >= 1) {
        drainDebt -= 1;

        const next = topOfHeap();

        if (next < 0) {
          break;
        }

        phase[next] = Phase.Belted;
        pos[next].y = BELT_Y + 0.08 + BALL_R;
        pos[next].x = THREE.MathUtils.clamp(
          pos[next].x,
          BELT_FROM + 0.4,
          BELT_TO - 0.4
        );
        vel[next].set(0, 0, 0);
      }
    }

    for (let i = 0; i < CLIENTS; i += 1) {
      if (phase[i] === Phase.Belted) {
        pos[i].x += 3.1 * delta;
        pos[i].z = ease(pos[i].z, 0, 5, delta);

        if (pos[i].x >= BOX_X[boxOf[i]]) {
          phase[i] = Phase.Landing;
          from[i].copy(pos[i]);
          travel[i] = 0;
        }
      } else if (phase[i] === Phase.Landing) {
        travel[i] += delta * 2.4;

        const t = clamp01(travel[i]);

        pos[i].x = THREE.MathUtils.lerp(from[i].x, BOX_X[boxOf[i]], t);
        pos[i].z = THREE.MathUtils.lerp(from[i].z, 0, t);
        pos[i].y = THREE.MathUtils.lerp(from[i].y, BOX_Y + 0.3, t);

        if (t >= 1) {
          phase[i] = Phase.Idle;
          balls[i].visible = false;
          lipMaterials[boxOf[i]].color.setHex(0xffffff);
        }
      }
    }

    /*
     * Keep the belt from fusing its cargo into a single lump.
     *
     * Everything on a conveyor moves at exactly the same speed, so two
     * clients that land close together stay close together for ever — and
     * three of them land as one object. The heap has a full separation pass
     * for this; the belt only ever needs it along X, which makes it a good
     * deal cheaper.
     */
    for (let a = 0; a < CLIENTS; a += 1) {
      if (phase[a] !== Phase.Belted) {
        continue;
      }

      for (let b = a + 1; b < CLIENTS; b += 1) {
        if (phase[b] !== Phase.Belted) {
          continue;
        }

        const gap = pos[b].x - pos[a].x;
        const minimum = BALL_R * 2.1;

        if (Math.abs(gap) >= minimum) {
          continue;
        }

        /* The one already further along keeps its place; the other drops back. */
        const push = (minimum - Math.abs(gap)) * 0.5;

        if (gap >= 0) {
          pos[a].x -= push;
          pos[b].x += push;
        } else {
          pos[a].x += push;
          pos[b].x -= push;
        }
      }
    }

    for (let i = 0; i < CLIENTS; i += 1) {
      balls[i].visible = phase[i] !== Phase.Idle;
      balls[i].position.copy(pos[i]);
    }

    /* A box flashes white as something lands in it, then settles back. */
    for (let b = 0; b < BOXES; b += 1) {
      lipMaterials[b].color.lerp(scratchColour.setHex(BOX_COLOURS[b]), 0.12);
    }
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    rimMaterial.color.copy(color).multiplyScalar(0.6);
  };

  const reset = () => {
    elapsed = 0;
    spawnDebt = 0;
    drainDebt = 0;
    tripTime = 0;
    walkPhase = 0;

    gait = 0;
    carried = 0;
    reaching = 0;
    facing = FACE_LEFT;

    inHand = -1;
    tookThisTrip = false;

    for (let i = 0; i < CLIENTS; i += 1) {
      phase[i] = Phase.Idle;
      balls[i].visible = false;
      pos[i].set(DROP_X, FUNNEL_TOP + 4, 0);
      vel[i].set(0, 0, 0);
      travel[i] = 0;
    }
  };

  reset();

  const dispose = () => {
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());

    treads.dispose();
    figure.dispose();
    character?.dispose();

    geometries.length = 0;
    materials.length = 0;
  };

  return { root, update, setAccent, reset, dispose };
}
