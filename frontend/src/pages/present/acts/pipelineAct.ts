/**
 * ACT 1 — HOW THE DATA GETS THERE
 *
 * One scene, two halves. The system on the left holds the records; the
 * spreadsheet on the right is what people actually open. What changes between
 * the halves is only how one reaches the other.
 *
 * Manual: an export is cut, a person carries the whole thing across, drops it
 * in, and the sheet lights up all at once — then decays together while
 * nothing happens, because the next trip is tomorrow.
 *
 * Automated: no export, no trip. Records arrive continuously and land cell by
 * cell, so the sheet never fills and never goes stale — it just stays lit.
 *
 * The argument lives in the SHAPE of the two, and deliberately so: one heavy
 * thing moved rarely against a fine thing moving constantly. The sheet is the
 * same object in both, which is what makes the comparison land.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX } from "../palette";
import { NO_INK_LAYER } from "../layers";

import { clamp01, ease, smootherstep } from "../parts/easing";

import { createCellGrid, type CellGrid } from "../parts/cellGrid";
import { createLabel } from "../parts/label";
import { createCrate, createRack, type Prop } from "../parts/props";
import { retint } from "../parts/materials";
import { createFigure, type Figure } from "../parts/figure";
import { createRiggedFigure, type RiggedFigure } from "../parts/riggedFigure";
import { createParticlePool, type ParticlePool } from "../parts/particles";

const SOURCE_X = -4.9;
const SHEET_X = 3.7;
const SHEET_Y = 2.9;

/**
 * Where the sheet sits while it is still one row.
 *
 * Chosen so that single line ends up level with the middle of the Wealthbox
 * box across the stage — the two are the same thing at that moment, one
 * export's worth of records, and standing them at the same height says the
 * trip is sideways rather than uphill.
 *
 * It cannot simply STAY there once it opens: the grid unfolds downward from
 * its first row, and nine rows below this height would put half the table
 * through the floor the figure is walking on. So the sheet rises as it
 * spreads, and this is only where it starts.
 */
const SHEET_Y_FLAT = 0.05;

/**
 * Where the walk starts and ends.
 *
 * Five units, not eight. The trip is the argument — somebody carries this —
 * and the argument is made by the fact of the walk, not by its length; at
 * eight units the same point took three and a half seconds each way and the
 * slide spent most of itself watching a person cross an empty stage.
 *
 * SOURCE_X and SHEET_X came in with these. The gaps either side are what the
 * figure reaches across, so shortening the walk without moving the props
 * would have left them reaching at things a stride and a half away.
 */
const WALK_FROM = -3.0;
const WALK_TO = 2.2;

/*
 * The trip as an explicit sequence of phases rather than a chain of
 * conditions. Each entry is the moment that phase ENDS, so the last one is
 * the length of the whole loop. Overlapping ranges in a condition chain is
 * exactly how the figure ended up teleporting back to the board after it had
 * already walked home; with a phase table there is one active phase at any
 * time and no gaps to fall through.
 */
const PHASE = {
  waiting: 0.7,
  pulling: 1.9,
  carrying: 4.2,
  placing: 5.5,
  returning: 7.5,
  resting: 8.1,
} as const;

/**
 * Length of one complete trip, in seconds. Exported because the deck has to
 * hand over to the automated half on a trip BOUNDARY — anywhere else and the
 * figure vanishes mid-stride, or halfway through setting the box down.
 */
export const TRIP = PHASE.resting;

/** Where the export sits while still inside the system. */
const IN_SYSTEM = new THREE.Vector3(-4.0, 1.25, 0.55);

/** Where it comes to rest against the board. */
const ON_BOARD = new THREE.Vector3(2.7, 1.45, 0.5);

/**
 * Tuned so one bulk import ages the whole ramp — green through yellow to
 * red — across a single trip, arriving at red just as the next load does.
 *
 * It is a rate, so it is tied to TRIP: this was 0.105 while a trip took 11.1
 * seconds, and a trip now takes 8.1. Left alone the sheet would only have
 * reached amber before the next load rescued it, and "the data goes stale
 * between exports" is the entire point of the first half.
 */
const DECAY_BY_HAND = 0.144;

/**
 * Far slower, and outrun by the arrival rate below. Nothing here should ever
 * reach yellow, let alone red: the point of the page is that it stays
 * current.
 */
const DECAY_AUTOMATED = 0.05;

/** Records landing per second once it runs itself. */
const ARRIVALS = 105;

const POOL = 200;

/*
 * Set to a model path to use an imported character, or null for the
 * procedural dummy. An imported model needs a SKELETON — run
 * scripts/inspect-model.mjs against it first. Its own clips are irrelevant;
 * this deck's walk drives its bones either way.
 */
const CHARACTER_MODEL: string | null = "/models/character.glb";

const CHARACTER_HEIGHT = 2.25;

/*
 * Three-quarter facing rather than flat profile — enough turn to read as
 * walking across, enough front to still read as a person.
 */
const FACE_RIGHT = Math.PI / 2 - 0.4;
const FACE_LEFT = -Math.PI / 2 + 0.4;

export interface PipelineState {
  /** 0 = carried across by hand once a day. 1 = arriving on its own. */
  automated: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 */
export type PipelineAct = Act<PipelineState>;

/**
 * Builds both halves of the room at once: the source rack, the desk and
 * monitor, the spreadsheet grid, the person who carries the export, and the
 * automated plumbing that eventually replaces them.
 *
 * Everything exists from the start and is shown or hidden — `automated` never
 * builds anything, it only decides which half of the room is running.
 */
export function createPipelineAct(): PipelineAct {
  const root = new THREE.Group();

  /*
   * Lifted so the floor clears the copy at the foot of the frame, and swung
   * a little into depth. Much more rotation than this and the figure stops
   * reading as a person walking across.
   */
  root.position.set(0, 1.8, 0);
  root.rotation.y = -0.18;

  const accent = new THREE.Color(SAGE_HEX);

  /* ----------------------------------------------------------------- floor */

  /* Wide enough that no edge ever enters frame; a visible rim reads as a
   * prop rather than as ground. */
  const floorGeometry = new THREE.PlaneGeometry(200, 140);

  /*
   * Renders the shadow and nothing else. A lit ground plane, however dark,
   * always reads as a bright slab with a horizon across it — this keeps the
   * void intact while still putting the figure on a floor.
   */
  const floorMaterial = new THREE.ShadowMaterial({
    opacity: 0.55,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  /*
   * Not drawn, for exactly the reason the note above gives. The sketch pass
   * knows only depth and normals, so it would ink this plane's far edge and
   * put back the horizon this material exists to avoid. See layers.ts.
   */
  floor.layers.set(NO_INK_LAYER);

  root.add(floor);

  /* ---------------------------------------------------------------- source */

  /*
   * A rack rather than a box. This is the first object the deck asks anyone
   * to accept as a real system, and a plain cube with three stripes on it was
   * asking a lot — bays, vents, a status light per unit and four feet say
   * "running equipment" before the label has been read.
   */
  const source: Prop = createRack({
    width: 2.3,
    height: 3.0,
    depth: 1.8,
    units: 5,
  });

  source.root.position.set(SOURCE_X, 1.55, 0);
  root.add(source.root);

  /*
   * The system is named, because "the place the data comes from" is the one
   * thing on this stage an audience cannot infer from its shape — a grey box
   * is any system at all until it is labelled.
   */
  const sourceLabel = createLabel("WEALTHBOX", { width: 1.85 });
  sourceLabel.mesh.position.set(SOURCE_X, 2.24, 0.97);
  root.add(sourceLabel.mesh);

  /* ----------------------------------------------------------------- sheet */

  const grid: CellGrid = createCellGrid();

  /*
   * Smaller than it was. At full size the sheet dominated the frame and the
   * trip across to it read as incidental; shrunk, the journey is the subject
   * and the destination is a destination.
   */
  grid.root.position.set(SHEET_X, SHEET_Y, 0);
  grid.root.rotation.y = -0.34;
  grid.root.scale.setScalar(0.68);
  root.add(grid.root);

  /* -------------------------------------------------------------- postgres */

  /*
   * What is actually holding the records. It is absent until the first load
   * lands, then rises in behind the sheet — so the beat reads as the data
   * arriving somewhere durable rather than as a spreadsheet being filled.
   * The sheet stays: it is the freshness read-out, and it is the only thing
   * on stage that can show data going stale.
   */
  const serverGroup = new THREE.Group();
  serverGroup.position.set(SHEET_X, SHEET_Y, -0.95);
  serverGroup.rotation.y = -0.34;
  root.add(serverGroup);

  /*
   * Deliberately LARGER than the sheet it sits behind. Sized to match, it was
   * perfectly hidden by the thing it was supposed to be holding — the whole
   * object rendered and none of it could be seen. Overhanging on every edge
   * turns it into the chassis the sheet is mounted on, which is also the
   * truer picture: the spreadsheet is a view, the database is the machine.
   */
  const store: Prop = createRack({
    width: 5.4,
    height: 5.3,
    depth: 1.4,
    units: 7,
  });

  serverGroup.add(store.root);

  /* Above the sheet's top edge, on the upper overhang. */
  const serverLabel = createLabel("ATIKAN DATABASE", { width: 3.5 });
  serverLabel.mesh.position.set(0, 2.32, 0.62);
  serverGroup.add(serverLabel.mesh);

  /* ------------------------------------------------------ figure and crate */

  const figure: Figure = createFigure();

  /* Scaled up a touch: the character is the thing the audience watches. */
  figure.root.scale.setScalar(1.18);
  root.add(figure.root);

  const character: RiggedFigure | null = CHARACTER_MODEL
    ? createRiggedFigure(CHARACTER_MODEL, {
        height: CHARACTER_HEIGHT,
        /*
         * The character already faces +Z, which is the direction this rig
         * treats as forward, so it needs no correction. The Math.PI that sat
         * here was a guess made before there was a model to check it against,
         * and it walked the character backwards through every trip.
         */
        turn: 0,
      })
    : null;

  if (character) {
    root.add(character.root);

    character.ready
      .then(matched =>
        console.log(`[character] driving ${matched.length} bones`, matched)
      )
      .catch(error =>
        console.warn(
          "[character] falling back to the procedural rig:",
          error.message
        )
      );
  }

  /* Sized against the character rather than the board it lands on. */
  const crateProp: Prop = createCrate({ size: 0.84 });

  const crate = crateProp.root;
  root.add(crate);

  /* ------------------------------------------------------------- particles */

  const pool: ParticlePool = createParticlePool(POOL, 0.22);
  root.add(pool.points);

  const progress = new Float32Array(POOL);
  const speed = new Float32Array(POOL);
  const lift = new Float32Array(POOL);
  const drift = new Float32Array(POOL);
  const alive = new Uint8Array(POOL);

  let nextFree = 0;
  let spawnDebt = 0;
  let tripTime = 0;
  let walkPhase = 0;
  let elapsed = 0;
  let dropped = false;

  /**
   * 0 before anything has ever landed, 1 once it has. Eased rather than
   * switched, and it does NOT fall back when the trip loop resets — the
   * database does not un-exist between deliveries.
   */
  let holding = 0;

  /*
   * Blended rather than switched. Every one of these eases, which is what
   * keeps the figure from snapping between standing, walking and carrying.
   */
  let gait = 0;
  let carried = 0;
  let reaching = 0;

  /* Undefined until the first frame, so entering either page primes it. */
  let wasByHand: boolean | undefined;
  let facing = FACE_RIGHT;

  const gripWorld = new THREE.Vector3();

  /**
   * Put one record into the stream, taken from the fixed pool.
   *
   * Scans forward from `nextFree` rather than from zero so repeated spawns stay
   * O(1) in the common case, and gives up silently when the pool is saturated.
   */
  const spawn = () => {
    let index = -1;

    for (let step = 0; step < POOL; step += 1) {
      const candidate = (nextFree + step) % POOL;

      if (alive[candidate] === 0) {
        index = candidate;
        nextFree = (candidate + 1) % POOL;
        break;
      }
    }

    if (index < 0) {
      return;
    }

    progress[index] = 0;
    speed[index] = 0.62 + Math.random() * 0.26;
    lift[index] = 0.7 + Math.random() * 1.5;
    drift[index] = (Math.random() - 0.5) * 1.4;
    alive[index] = 1;
  };

  /**
   * One frame. `automated` runs the whole act.
   *
   * The handover is deliberately placed on a trip boundary — see `HANDOVER` in
   * `slides.ts`, which derives its timing from `TRIP` here so the person is
   * standing still at the source when they hand over, not caught mid-stride.
   */
  const update = (delta: number, target: PipelineState) => {
    elapsed += delta;

    const automated = clamp01(target.automated);
    const byHand = automated < 0.5;

    /*
     * THE PERSON LEAVES. THEY DO NOT BLINK OUT.
     *
     * Everything else on this stage crosses over gradually — the server
     * rises, the sheet spreads, the decay rate slides — but the figure was
     * switched by a bare `automated < 0.5`, so on the frame the ramp crossed
     * its midpoint a man vanished off a lit stage and a particle stream
     * appeared where he had been standing. That is the moment the slide is
     * about and it was the one moment nothing was animated.
     *
     * So the switch moved off the midpoint and onto the START of the ramp.
     * The person is gone the instant the handover begins — which is a trip
     * boundary, so they are standing still at the source with empty hands
     * when it happens, never mid-stride and never mid-lift. Everything the
     * machine does then happens in the space they left: the flow starts, the
     * server rises, the sheet spreads.
     *
     * They do NOT walk off. That was tried and it was worse — a five-unit
     * exit is its own small event, and it pulled the eye left exactly when
     * the argument had moved right.
     */
    const leaving = automated > 0.002;

    const imported = character?.isReady() ?? false;

    figure.root.visible = !leaving && !imported;
    crate.visible = !leaving;

    if (character) {
      character.root.visible = !leaving && imported;
    }
    pool.points.visible = leaving;

    /*
     * Held back until the person is gone. Revealing it on the first drop put
     * the database on stage while somebody was still walking exports across
     * to it, which is precisely the arrangement the slide is arguing against
     * — and it stole the one beat the handover has to itself.
     */
    if (leaving) {
      holding = ease(holding, 1, 2.4, delta);
    }

    /* Rises in from behind the sheet rather than fading up on the spot. */
    serverGroup.visible = holding > 0.002;
    serverGroup.scale.set(1, smootherstep(holding), 1);
    serverGroup.position.z = -0.9 - (1 - holding) * 0.8;

    /*
     * Landing on the act primes the sheet to the state the beat opens on:
     * stale, so the first trip visibly rescues it.
     *
     * The handover in the other direction deliberately primes NOTHING. The
     * two halves are one continuous scene now, and the sheet the flow
     * inherits is the decayed one the last trip left behind — watching the
     * arrivals bring it back is the whole argument, and setting it full the
     * instant the figure leaves would hand the flow a job already done.
     *
     * A cold start straight into the automated half is still primed current,
     * because there is no trip behind it to have left a state worth keeping.
     */
    if (byHand !== wasByHand) {
      const coldStart = wasByHand === undefined;

      wasByHand = byHand;

      if (byHand) {
        grid.setAll(0);
        tripTime = 0;
        dropped = false;
      } else if (coldStart) {
        grid.setAll(1);
      }
    }

    /*
     * One row while a person is carrying it, the full table once it arrives
     * on its own. The same records either way — what changes is that they
     * stop being a line somebody pastes and start being something with
     * shape.
     */
    const spread = smootherstep(holding);

    grid.setSpread(spread);

    /*
     * Rises as it opens. Pinned at the flat height it would unfold through
     * the floor; pinned at the open height the single row floats well above
     * the system it was just carried from.
     */
    grid.root.position.y = THREE.MathUtils.lerp(SHEET_Y_FLAT, SHEET_Y, spread);

    grid.age(delta, leaving ? DECAY_AUTOMATED : DECAY_BY_HAND);

    if (!leaving) {
      /* ----------------------------------------------------- the trip */

      const previous = tripTime;
      tripTime = (tripTime + delta) % TRIP;

      if (tripTime < previous) {
        dropped = false;
      }

      /* Exactly one phase is active, and every phase is accounted for. */
      const inPhase = (from: number, to: number) =>
        tripTime >= from && tripTime < to;

      /** Eased 0..1 progress through one segment of the walk cycle. */
      const across = (from: number, to: number) =>
        smootherstep((tripTime - from) / (to - from));

      const pulling = inPhase(PHASE.waiting, PHASE.pulling);
      const carrying = inPhase(PHASE.pulling, PHASE.carrying);
      const placing = inPhase(PHASE.carrying, PHASE.placing);
      const returning = inPhase(PHASE.placing, PHASE.returning);

      let walkX = WALK_FROM;
      let moving = false;
      let headingRight = false;
      let reach = 0;
      let holding = 0;

      if (pulling) {
        /*
         * Reach in, take hold, draw it out. The grasp happens in the first
         * half and the load transfers as the arms come back.
         */
        const t = (tripTime - PHASE.waiting) / (PHASE.pulling - PHASE.waiting);

        reach =
          t < 0.5 ? smootherstep(t / 0.5) : 1 - smootherstep((t - 0.5) / 0.5);
        holding = t < 0.4 ? 0 : smootherstep((t - 0.4) / 0.6);
      } else if (carrying) {
        walkX = THREE.MathUtils.lerp(
          WALK_FROM,
          WALK_TO,
          across(PHASE.pulling, PHASE.carrying)
        );

        moving = true;
        headingRight = true;
        holding = 1;
      } else if (placing) {
        /* Lift it onto the board, let go, lower the arms. */
        const t =
          (tripTime - PHASE.carrying) / (PHASE.placing - PHASE.carrying);

        walkX = WALK_TO;
        headingRight = true;

        reach =
          t < 0.55
            ? smootherstep(t / 0.55)
            : 1 - smootherstep((t - 0.55) / 0.45);
        holding = t < 0.55 ? 1 : 0;
      } else if (returning) {
        walkX = THREE.MathUtils.lerp(
          WALK_TO,
          WALK_FROM,
          across(PHASE.placing, PHASE.returning)
        );

        moving = true;
      }

      gait = ease(gait, moving ? 1 : 0, 7, delta);
      carried = ease(carried, holding, 6, delta);
      reaching = ease(reaching, reach, 8, delta);
      facing = ease(facing, headingRight ? FACE_RIGHT : FACE_LEFT, 6, delta);

      /* Loaded strides are slower, and the phase only runs while walking. */
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

      /* ---------------------------------------------------- the export */

      const hands = imported && character ? character.grip : figure.grip;

      hands.getWorldPosition(gripWorld);
      root.worldToLocal(gripWorld);

      if (pulling) {
        const t = (tripTime - PHASE.waiting) / (PHASE.pulling - PHASE.waiting);

        /* Appears in the grasp, then rides the hands out of the system. */
        crate.scale.setScalar(Math.max(smootherstep(t / 0.4), 0.0001));

        crate.position
          .copy(IN_SYSTEM)
          .lerp(gripWorld, smootherstep(Math.max(0, (t - 0.35) / 0.65)));
      } else if (carrying) {
        crate.scale.setScalar(1);
        crate.position.copy(gripWorld);
      } else if (placing) {
        const t =
          (tripTime - PHASE.carrying) / (PHASE.placing - PHASE.carrying);

        crate.position
          .copy(gripWorld)
          .lerp(ON_BOARD, smootherstep(Math.min(t / 0.55, 1)));

        /* Sinks into the board once it is set down. */
        crate.scale.setScalar(
          Math.max(1 - smootherstep(Math.max(0, (t - 0.6) / 0.4)), 0.0001)
        );
      } else {
        crate.scale.setScalar(0.0001);
        crate.position.copy(IN_SYSTEM);
      }

      crate.rotation.y = THREE.MathUtils.lerp(0.25, facing, carried);

      /* The write lands the moment the box touches the board. */
      if (
        !dropped &&
        tripTime >= PHASE.carrying + 0.55 * (PHASE.placing - PHASE.carrying)
      ) {
        grid.fillAll();
        dropped = true;
      }
    } else {
      /* ------------------------------------------------- it runs itself */

      spawnDebt += ARRIVALS * delta;

      while (spawnDebt >= 1) {
        spawn();
        spawnDebt -= 1;
      }

      for (let i = 0; i < POOL; i += 1) {
        if (alive[i] === 0) {
          pool.colors[i * 3] = 0;
          pool.colors[i * 3 + 1] = 0;
          pool.colors[i * 3 + 2] = 0;
          continue;
        }

        progress[i] += speed[i] * delta;

        if (progress[i] >= 1) {
          alive[i] = 0;

          /* Each arrival writes exactly one cell. */
          grid.touchNext();

          pool.colors[i * 3] = 0;
          pool.colors[i * 3 + 1] = 0;
          pool.colors[i * 3 + 2] = 0;
          continue;
        }

        const p = progress[i];
        const arc = Math.sin(p * Math.PI);

        pool.positions[i * 3] = THREE.MathUtils.lerp(
          SOURCE_X + 1.2,
          SHEET_X,
          p
        );

        pool.positions[i * 3 + 1] =
          THREE.MathUtils.lerp(1.9, SHEET_Y, p) + arc * lift[i];

        pool.positions[i * 3 + 2] = drift[i] * arc;

        /* Brighten on approach, so arrival reads as a write. */
        const glow = 0.55 + 0.45 * smootherstep((p - 0.5) / 0.5);

        pool.colors[i * 3] = accent.r * glow;
        pool.colors[i * 3 + 1] = accent.g * glow;
        pool.colors[i * 3 + 2] = accent.b * glow;
      }

      pool.commit();
    }

    grid.commit();
  };

  /**
   * Puts the trip back to its start.
   *
   * The slide hands over to the automated half on a TRIP boundary, which only
   * lands where it is meant to if the trip clock and the slide clock agree.
   * Replaying the slide restarts one of them; without this it would not
   * restart the other, and the figure would vanish mid-stride at whatever
   * point of the walk the two had drifted to.
   */
  const reset = () => {
    tripTime = 0;
    walkPhase = 0;
    elapsed = 0;
    spawnDebt = 0;
    dropped = false;
    holding = 0;

    gait = 0;
    carried = 0;
    reaching = 0;
    facing = FACE_RIGHT;

    alive.fill(0);
    nextFree = 0;

    /* Undefined rather than true, so the priming branch runs again. */
    wasByHand = undefined;
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    for (const material of source.lit) {
      retint(material, color, 1.9);
    }

    for (const material of store.lit) {
      retint(material, color, 1.9);
    }
  };

  const dispose = () => {
    floorGeometry.dispose();
    floorMaterial.dispose();
    source.dispose();
    store.dispose();
    crateProp.dispose();

    sourceLabel.dispose();
    serverLabel.dispose();

    grid.dispose();
    figure.dispose();
    character?.dispose();
    pool.dispose();
  };

  return { root, update, setAccent, reset, dispose };
}
