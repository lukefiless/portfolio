/**
 * ACT — CLIENTS THROUGH A DOOR
 *
 * A facade, a doorway, and a short queue of people on a loop: approach,
 * turn to face the door, and go in. `automated` is the one thing that
 * changes what that loop looks like, not what it is.
 *
 * THE DOOR IS ALWAYS BUSY
 *
 * Nobody waits. `automated` changes the PACE of the queue and nothing else —
 * the line moves quickly or it moves briskly, but it never stops, and there is
 * always somebody on the pavement and somebody at the threshold.
 *
 * This is a deliberate change from what the act was built to argue. It used to
 * hold the by-hand client at the door for two and a half seconds, which backed
 * the whole queue up behind them: the stall was the point, and "manual intake"
 * read straight off the stall without a word being said. That version made its
 * case better, and it is worth knowing it existed — the dwell constants below
 * are all that is left of it, and putting the argument back is a matter of
 * raising `DWELL_BY_HAND`. What the slide wants now is a door with a constant
 * stream through it.
 *
 * IT IS AN ACTUAL QUEUE
 *
 * Each client is one number — how far along the path they have walked — and
 * one rule: never come closer than `MIN_GAP` to the person in front. That is
 * the entire mechanism, and everything the slide is trying to say falls out
 * of it rather than being animated on top of it.
 *
 * The rule is what keeps a constant stream from turning into a pile-up: seven
 * people at this pace would otherwise close on each other every time the
 * leader so much as breaks stride at the threshold.
 *
 * It replaced a shared lap position with fixed per-client offsets, which could
 * not queue at all: spacing was a constant fraction of the lap, so the moment
 * the door held anyone up the person behind walked into them. It also capped
 * the pavement at three people. The following rule is what makes seven safe,
 * and seven is what makes the street look busy.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { BACKGROUND, SAGE_HEX } from "../palette";
import { NO_INK_LAYER } from "../layers";

import { clamp01, ease, smootherstep } from "../parts/easing";
import { createResourcePool } from "../parts/resources";
import {
  STRUCTURE,
  SHADOWED,
  emissive,
  retint,
  surface,
} from "../parts/materials";
import { body } from "../parts/props";
import { createLabel } from "../parts/label";
import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";

/**
 * The same character the data, local-ai and owned acts use.
 *
 * Every client in the queue is this model, for the reason the deck reuses it
 * everywhere else: the audience has already watched this figure carry an
 * export across a room, so a queue of them at a door reads as the same people
 * the rest of the deck has been about.
 */
const CHARACTER_MODEL: string | null = "/models/character.glb";

/**
 * Height in metres, before `SCALE`. Sized against the door rather than copied
 * from another act: at 1.8 a client clears the 2.4 opening with headroom, and
 * lands at 4.3 on stage — just under the camera's 4.6, which is what the
 * slide means by framing at barely above head height.
 */
const CHARACTER_HEIGHT = 1.8;

/* ---------------------------------------------------------------- geometry */

/**
 * Metres to stage units.
 *
 * EVERYTHING BELOW IS WRITTEN IN METRES — a 4.4m parapet, a 2.4m door, a
 * sidewalk 2.6m out — and this is the one number that puts them on the deck's
 * stage. It is not a fudge factor: the slide frames this act into the right
 * leaf of an open folder, which `Present.tsx` does by ENLARGING the frustum
 * (see `setViewOffset` there), so the leaf is looking at roughly forty units
 * of world width. A building drawn at literal human scale lands as a stamp in
 * the middle of it.
 *
 * Scaling the root rather than inflating every constant keeps the file
 * readable as a building — and keeps the figures, which are authored at human
 * height by `parts/figure.ts`, in proportion to the door they walk through
 * without a second scale of their own.
 */
const SCALE = 2.4;

/*
 * A frontage, not a boundary wall. At 11 it ran off both sides of the leaf and
 * read as fencing — and because the camera sits out at x = 14.5, its near end
 * arrived almost under the lens. Seven puts both ends inside the frame, which
 * is what makes it a building somebody walks into.
 */
const WALL_WIDTH = 7.6;

/*
 * TWO STOREYS, NOT ONE.
 *
 * At 4.4 the frontage was exactly a door and a lintel — the same height as a
 * garage — and the clients walking into it read as people going through a
 * gap in a wall rather than as people going into a firm. Raised, the wall has
 * somewhere to carry a name and the figures at the threshold are the size a
 * person is against a building.
 *
 * The WIDTH barely moves. It is the one dimension the leaf actually
 * constrains: past about eight metres the far end runs out of frame and the
 * near end arrives under the lens, and a frontage with no ends stops being a
 * building. Height is free — there is nothing above it.
 */
const WALL_HEIGHT = 6.2;
/**
 * HOW FAR THE BUILDING RUNS BACK.
 *
 * This was 0.4 — a frontage and nothing behind it. From the deck's
 * three-quarter view that reads as a flat card standing on the pavement:
 * every surface in the shot is the front, so the only thing telling the eye
 * it has depth is the doorway recess.
 *
 * At seven it is a mass roughly as deep as it is wide. The far end recedes to
 * a vanishing point, the side wall catches the light at a different angle from
 * the front, and the whole silhouette becomes a solid the clients disappear
 * INTO rather than a panel they walk behind.
 *
 * The three pieces of the frontage — the two walls and the lintel over the
 * door — are all extruded by this, so the opening between them is a tunnel
 * through a wall seven metres thick rather than a hole in a sheet of card.
 */
const BUILDING_DEPTH = 6.5;

/**
 * The plane of the front wall.
 *
 * Everything MOUNTED on the face — the sign, the intake lamp — is measured
 * from here rather than from the wall's centre, which is now most of a
 * building away. The 0.2 keeps the frontage exactly where it stood when the
 * building was a 0.4-thick slab centred on `WALL_Z`, so nothing outside the
 * facade had to move when it gained a body.
 */
const FACADE_Z = 0.2;

/** Centre of a wall slab, so its front face lands on the facade plane. */
const WALL_CENTRE_Z = FACADE_Z - BUILDING_DEPTH / 2;

/** Local origin. The root is positioned so this lands under the slide's aim. */
const DOOR_X = 0;
const DOOR_HALF_WIDTH = 0.95;
const DOOR_HEIGHT = 2.4;

/**
 * The facade plane. The camera sits at +Z, so the building is at the origin
 * and everything the audience watches happens in FRONT of it, at higher Z.
 */
const WALL_Z = 0;

/** The sidewalk clients travel along before they turn in. In front of the facade. */
const WALK_Z = 2.6;

/**
 * Where the queue starts. +X is screen-right under this slide's camera.
 *
 * Held inside the camera's own x (14.5 world, so 5.8 local): a client spawned
 * beyond it starts behind the lens and pops into frame rather than walking in.
 */
const APPROACH_FROM_X = 5.5;

/**
 * Where a client stops being drawn — through the door and into the dark.
 *
 * BEHIND the facade, not in front of it. Entering has to travel AWAY from the
 * camera or the client walks out of the building toward the audience, which
 * is the one direction that cannot read as going inside.
 */
const ENTER_TO_Z = WALL_Z - 1.4;

/*
 * The rig faces +Z at rest — see the note on this in `pipelineAct.ts`.
 *
 * Approach is -X, which is a quarter turn clockwise from rest; entering is -Z,
 * another quarter turn the same way. Written as -π rather than +π so the turn
 * between them lerps through 90 degrees instead of taking the long way round
 * the other 270.
 */
const FACE_APPROACH = -Math.PI / 2;
const FACE_ENTER = -Math.PI;

/* ------------------------------------------------------------ the queue */

/*
 * THE PATH, AS ONE NUMBER.
 *
 * Every client's whole journey is a single distance travelled: along the
 * pavement to the threshold, then through the door and out of sight. Two
 * segments, one scalar, which is what makes the following rule below a single
 * comparison rather than a special case per phase.
 */
const PATH_TO_DOOR = APPROACH_FROM_X - DOOR_X;
const PATH_THROUGH_DOOR = WALK_Z - ENTER_TO_Z;
const PATH_TOTAL = PATH_TO_DOOR + PATH_THROUGH_DOOR;

/**
 * How many people the pavement holds.
 *
 * Seven, closer together and moving at a steadier pace than before, because
 * the slide now wants a door that is CONSTANTLY busy rather than one that
 * visibly stalls. The queue rule below is what makes a count this high safe:
 * before it, clients were spaced by a fixed fraction of a shared lap and any
 * count past three put two of them in the same square metre at the door.
 */
const CLIENTS = 7;

/** Closest two clients may stand, along the path. */
const MIN_GAP = 0.95;

/** How far apart they are strung out at the top of the slide. */
const SPAWN_STAGGER = 1.7;

/** Walking pace, in metres per second, at each end of `automated`. */
const SPEED_BY_HAND = 1.25;
const SPEED_AUTOMATED = 2.1;

/**
 * How long a client is held at the threshold.
 *
 * NEARLY NOTHING AT EITHER END, and that is a deliberate change of argument.
 * This used to hold the by-hand client for 2.6 seconds, which backed the whole
 * queue up behind them — the stall WAS the point. The slide now wants a door
 * that is simply always busy, so what separates the two ends is pace alone and
 * the line never stops moving.
 *
 * Not quite zero: a client that never pauses at all slides through the
 * threshold without ever addressing it, and the turn into the door stops
 * reading as entering a building. A beat under a fifth of a second is enough
 * to plant the foot and not enough to read as a wait.
 */
const DWELL_BY_HAND = 0.18;
const DWELL_AUTOMATED = 0.06;

/**
 * Stride phase per metre walked.
 *
 * Driven by DISTANCE rather than by time, which is what keeps the feet on the
 * ground: a figure whose legs cycle on a clock while its body moves at a
 * speed slides across the pavement the moment the two disagree, and on this
 * slide they disagree constantly — the queue is forever speeding up and
 * stopping.
 */
const STRIDE_PER_UNIT = 5.2;

export interface OnboardingState {
  /**
   * 0 = each client is stopped at the door and logged by hand. 1 = they walk
   * straight in, closer together and quicker. See the file header for why
   * one number drives all three.
   */
  automated: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type OnboardingAct = Act<OnboardingState>;

export function createOnboardingAct(): OnboardingAct {
  const root = new THREE.Group();

  /*
   * The door, not the building's centre, is put under the slide's aim point —
   * the camera targets (0.5, 1.4, 3) and the door is the local origin, so the
   * queue arrives where the lens is already looking.
   */
  root.position.set(0.5, 0, 0);
  root.scale.setScalar(SCALE);
  /*
   * A touch more than the 0.05 it stood at, now that there is a body behind
   * the frontage: square-on, a seven-metre-deep mass throws its far end wide
   * to the right of frame and the corner runs off the leaf. A few degrees
   * turns the recession back toward the vanishing point without flattening
   * the three-quarter view that makes the side wall visible at all.
   */
  root.rotation.y = 0.08;

  const accent = new THREE.Color(SAGE_HEX);

  const pool = createResourcePool();

  /* ------------------------------------------------------------- the floor */

  const floor = new THREE.Mesh(
    pool.geometry(new THREE.PlaneGeometry(60, 60)),
    pool.material(new THREE.ShadowMaterial({ opacity: 0.38 }))
  );

  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  /* Invisible except for the shadow, so it must not be drawn. See layers.ts. */
  floor.layers.set(NO_INK_LAYER);

  root.add(floor);

  /* ---------------------------------------------------------- the facade */

  const wallMaterial = pool.material(surface(STRUCTURE));

  const doorLeft = DOOR_X - DOOR_HALF_WIDTH;
  const doorRight = DOOR_X + DOOR_HALF_WIDTH;

  const leftWallWidth = doorLeft - -WALL_WIDTH / 2;
  const rightWallWidth = WALL_WIDTH / 2 - doorRight;

  const leftWall = new THREE.Mesh(
    pool.geometry(body(leftWallWidth, WALL_HEIGHT, BUILDING_DEPTH, 0.06)),
    wallMaterial
  );

  leftWall.position.set(
    -WALL_WIDTH / 2 + leftWallWidth / 2,
    WALL_HEIGHT / 2,
    WALL_CENTRE_Z
  );
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  root.add(leftWall);

  const rightWall = new THREE.Mesh(
    pool.geometry(body(rightWallWidth, WALL_HEIGHT, BUILDING_DEPTH, 0.06)),
    wallMaterial
  );

  rightWall.position.set(
    doorRight + rightWallWidth / 2,
    WALL_HEIGHT / 2,
    WALL_CENTRE_Z
  );
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  root.add(rightWall);

  /* The header over the door — a lintel, not a gap in the wall's silhouette. */
  const lintelHeight = WALL_HEIGHT - DOOR_HEIGHT;

  const lintel = new THREE.Mesh(
    pool.geometry(
      body(DOOR_HALF_WIDTH * 2 + 0.3, lintelHeight, BUILDING_DEPTH, 0.06)
    ),
    wallMaterial
  );

  lintel.position.set(DOOR_X, DOOR_HEIGHT + lintelHeight / 2, WALL_CENTRE_Z);
  lintel.castShadow = true;
  root.add(lintel);

  /*
   * The opening itself: dark and recessed, so a client walks INTO something.
   *
   * Runs the full depth of the building, less the step back from the facade.
   * It used to be a 1.8 box inside a 0.4 wall — most of it stuck out behind
   * the frontage into open air, which was invisible only because there was
   * nothing back there to compare it to. Now it fills the tunnel, and a client
   * who has crossed the threshold is occluded by the thing they walked into.
   */
  const doorwayInset = 0.4;
  const doorwayDepth = BUILDING_DEPTH - doorwayInset;

  const doorway = new THREE.Mesh(
    pool.geometry(
      body(DOOR_HALF_WIDTH * 1.9, DOOR_HEIGHT * 0.97, doorwayDepth, 0.03)
    ),
    pool.material(surface(SHADOWED, { roughness: 0.95 }))
  );

  /*
   * Recessed BACK from the facade, away from the camera. Pushed forward
   * instead it stops being an opening and becomes a black box parked on the
   * pavement in front of the wall, which is what it was.
   */
  doorway.position.set(
    DOOR_X,
    DOOR_HEIGHT / 2,
    FACADE_Z - doorwayInset - doorwayDepth / 2
  );
  root.add(doorway);

  /*
   * The one lit surface on this stage — an intake status lamp over the door.
   * Dim and steady while clients are being logged by hand; bright once the
   * queue is waved straight through. The number driving its intensity is the
   * same `automated` the queue itself moves on, so the light changes exactly
   * when the behaviour under it does.
   */
  const lampMaterial = pool.material(emissive(accent, 0.7));

  const lamp = new THREE.Mesh(
    pool.geometry(body(DOOR_HALF_WIDTH * 1.4, 0.16, 0.05, 0.02)),
    lampMaterial
  );

  /*
   * Just over the opening, not halfway up the facade. The lintel used to be
   * two metres of wall and its midpoint was a sensible place for a lamp; it is
   * now most of a building, and a light floating in the middle of it reads as a
   * window. Sitting on the door head it reads as what it is — the intake
   * status, over the intake.
   */
  lamp.position.set(DOOR_X, DOOR_HEIGHT + 0.22, FACADE_Z + 0.03);
  root.add(lamp);

  /* ----------------------------------------------------------- the name */

  /*
   * THE FIRM, ON THE FRONT OF ITS OWN BUILDING.
   *
   * The one thing on this stage an audience cannot infer from its shape —
   * same reasoning as the WEALTHBOX plate in `pipelineAct`. A door with a
   * queue at it is any door until it is named; named, the whole act is about
   * clients arriving HERE.
   *
   * Set in the deck's paper white, because the facade is the dark structural
   * material and the label's default ink is near-black on it. Unlit, like
   * every other label in the deck: it is signage, not a surface catching the
   * key light.
   */
  const sign = createLabel("ATIKAN WEALTH PARTNERS", {
    width: WALL_WIDTH * 0.66,
    color: BACKGROUND,
    tracking: 0.24,
    weight: 700,
  });

  /*
   * On the fascia, above the door head and clear of the lamp. Proud of the
   * wall by a hair so it cannot z-fight with the surface it is mounted on.
   */
  sign.mesh.position.set(
    DOOR_X,
    DOOR_HEIGHT + (WALL_HEIGHT - DOOR_HEIGHT) * 0.55,
    FACADE_Z + 0.02
  );

  root.add(sign.mesh);

  /* --------------------------------------------------------------- clients */

  /*
   * Two rigs per client, and only ever one of them on screen.
   *
   * The imported character is what the audience should see, but a GLB is a
   * network request and acts are built at page load — so every client also
   * gets the procedural dummy, and swaps to the real model the frame it
   * reports ready. Same arrangement as the other acts that use this
   * character; a bad path or a slow file degrades to a walking dummy rather
   * than to an empty pavement.
   */
  const fallbacks: Figure[] = [];
  const characters: (RiggedFigure | null)[] = [];

  for (let i = 0; i < CLIENTS; i += 1) {
    const fallback = createFigure();
    root.add(fallback.root);
    fallbacks.push(fallback);

    const character = CHARACTER_MODEL
      ? createRiggedFigure(CHARACTER_MODEL, {
          height: CHARACTER_HEIGHT,
          /* Already faces +Z, which is this rig's forward. No correction. */
          turn: 0,
        })
      : null;

    if (character) {
      root.add(character.root);

      character.ready.catch(error =>
        console.warn("[onboarding] procedural fallback:", error.message)
      );
    }

    characters.push(character);
  }

  /* Per-client state, hoisted so `update` allocates nothing. Rule 1 in `act.ts`. */

  /** Distance travelled along the path. The one number a client really has. */
  const travelled = new Float32Array(CLIENTS);

  /** Seconds this client has stood at the threshold so far. */
  const waited = new Float32Array(CLIENTS);

  /** Whether this client has finished being logged and may go in. */
  const logged = new Uint8Array(CLIENTS);

  const walkPhase = new Float32Array(CLIENTS);
  const gait = new Float32Array(CLIENTS);
  const reach = new Float32Array(CLIENTS);
  const facing = new Float32Array(CLIENTS);

  /**
   * The queue, front to back. `order[0]` is whoever is nearest the door.
   *
   * Held as an explicit order rather than inferred from the distances each
   * frame, because it is the thing that has to survive a client reaching the
   * end and starting again: they go to the BACK, and everyone else moves up
   * one. Sorting by distance would put a client who has just restarted at the
   * front of the queue they are actually last in.
   */
  const order = new Int32Array(CLIENTS);

  /** Seconds elapsed. Drives idle motion only; undone by `reset`. */
  let elapsed = 0;

  const update = (delta: number, state: OnboardingState) => {
    elapsed += delta;

    const automated = clamp01(state.automated);
    const eased = smootherstep(automated);

    const speed = THREE.MathUtils.lerp(SPEED_BY_HAND, SPEED_AUTOMATED, eased);
    const dwell = THREE.MathUtils.lerp(DWELL_BY_HAND, DWELL_AUTOMATED, eased);

    retint(lampMaterial, accent, THREE.MathUtils.lerp(0.7, 1.9, eased));

    /*
     * FRONT TO BACK, and the order matters.
     *
     * Each client is advanced against the one ahead of it, which has already
     * moved this frame — so a queue starting to flow unpacks itself from the
     * front in a single pass, the way a real one does, instead of taking one
     * frame per person to propagate.
     */
    for (let k = 0; k < CLIENTS; k += 1) {
      const c = order[k];
      const before = travelled[c];

      let next = before + speed * delta;

      /*
       * Being written down at the door. Held at the threshold until the wait
       * is served — and compared against the CURRENT dwell every frame, so a
       * client already standing there when `automated` rises is released by
       * the change rather than serving out the old queue's wait.
       */
      if (logged[c] === 0 && next >= PATH_TO_DOOR) {
        next = PATH_TO_DOOR;
        waited[c] += delta;

        if (waited[c] >= dwell) {
          logged[c] = 1;
        }
      }

      /* Nobody walks through the person in front. This is the whole queue. */
      if (k > 0) {
        next = Math.min(next, travelled[order[k - 1]] - MIN_GAP);
      }

      travelled[c] = next;

      const moved = next - before;

      /* ------------------------------------------------------ pose it */

      let x: number;
      let z: number;

      if (next < PATH_TO_DOOR) {
        x = APPROACH_FROM_X - next;
        z = WALK_Z;
      } else {
        x = DOOR_X;
        z = WALK_Z - (next - PATH_TO_DOOR);
      }

      /* Square to the door a stride before reaching it, not on arrival. */
      const facingDoor = next > PATH_TO_DOOR - 0.35;

      facing[c] = ease(
        facing[c],
        facingDoor ? FACE_ENTER : FACE_APPROACH,
        7,
        delta
      );

      gait[c] = ease(gait[c], moved > 1e-5 ? 1 : 0, 8, delta);

      /*
       * A small "papers changing hands" motion while stalled at the door —
       * the one idle gesture that reads as a manual check rather than a
       * person simply standing there. It only gets time to play out while
       * the dwell is long, which is exactly the by-hand end.
       */
      const beingLogged = logged[c] === 0 && next >= PATH_TO_DOOR - 1e-3;

      reach[c] = ease(
        reach[c],
        beingLogged ? 0.55 + Math.sin(elapsed * 1.6 + c) * 0.15 : 0,
        5,
        delta
      );

      walkPhase[c] += moved * STRIDE_PER_UNIT;

      const imported = characters[c]?.isReady() ?? false;
      const fallback = fallbacks[c];
      const character = characters[c];

      fallback.root.visible = !imported;

      if (character) {
        character.root.visible = imported;
      }

      const drive = {
        phase: walkPhase[c],
        gait: gait[c],
        load: 0,
        reach: reach[c],

        /*
         * Offset per client. The idle motion is driven from `time`, so a queue
         * sharing one clock breathes and sways in unison — which reads as one
         * animation copied six times rather than as six people waiting.
         */
        time: elapsed + c * 1.7,
      };

      fallback.root.position.set(x, 0, z);
      fallback.root.rotation.y = facing[c];
      fallback.step(drive);

      if (character) {
        character.root.position.set(x, 0, z);
        character.root.rotation.y = facing[c];
        character.step(drive);
      }
    }

    /*
     * WHOEVER IS THROUGH THE DOOR GOES TO THE BACK OF THE QUEUE.
     *
     * The jump happens while they are deep inside the doorway recess, which
     * is solid geometry in front of them — so the client is occluded by the
     * building at the moment they are moved, and the recycle is never seen.
     * That is what `PATH_THROUGH_DOOR` is sized for.
     *
     * Bounded rather than a `while`, so a bad path length can never spin the
     * frame; at most one client can finish per frame at any sane speed.
     */
    for (let n = 0; n < CLIENTS; n += 1) {
      const front = order[0];

      if (travelled[front] < PATH_TOTAL) {
        break;
      }

      for (let k = 0; k < CLIENTS - 1; k += 1) {
        order[k] = order[k + 1];
      }

      order[CLIENTS - 1] = front;

      /*
       * Behind everyone, and never closer than the gap to whoever is now last
       * — otherwise a client rejoining a queue that still reaches back to the
       * pavement lands on top of its own tail.
       */
      const last = travelled[order[CLIENTS - 2]];

      travelled[front] = Math.min(0, last - MIN_GAP);
      waited[front] = 0;
      logged[front] = 0;
    }
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
  };

  /**
   * Undo everything that ACCUMULATES — which on this act is the queue itself.
   *
   * Distances, waits, stride clocks and the running order all carry forward
   * forever otherwise, so a replay would open on whatever line happened to be
   * standing there when the slide was last left.
   *
   * The opening state is a queue already strung out along the pavement, not
   * an empty street: this slide's whole first beat is a door that is visibly
   * busy, and a client walking on from nothing has nothing to be a queue of.
   */
  const reset = () => {
    elapsed = 0;

    for (let k = 0; k < CLIENTS; k += 1) {
      order[k] = k;

      /*
       * Negative puts the back of the queue off frame to the right, so the
       * line runs out of shot rather than ending on a visible last person.
       */
      travelled[k] = -k * SPAWN_STAGGER;

      waited[k] = 0;
      logged[k] = 0;
      walkPhase[k] = 0;
      gait[k] = 0;
      reach[k] = 0;
      facing[k] = FACE_APPROACH;
    }
  };

  /* The act is built parked at frame zero, the same as a replay. */
  reset();

  const dispose = () => {
    pool.dispose();
    sign.dispose();
    fallbacks.forEach(f => f.dispose());
    characters.forEach(c => c?.dispose());
  };

  return { root, update, setAccent, reset, dispose };
}
