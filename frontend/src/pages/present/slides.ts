/**
 * PRESENTATION DECK DATA
 *
 * A slide is a scene with its own internal timeline. Its camera, machine and
 * copy are independent keyframe tracks over one clock that starts when the
 * slide is entered, so a whole beat plays on a single page with no clicking.
 *
 * To add a slide, append an object to `slides`. Nothing else needs to change:
 * bounds checking, the slide counter and Home/End all derive from
 * `slides.length`, and each slide's timeline restarts when you land on it.
 */

import { TRIP } from "./acts/pipelineAct";
import { DRAWER_PITCH } from "./parts/cabinet";
import { BACKGROUND, FOLDER, GOLD, SAGE } from "./palette";
import type { Keyframe } from "./timeline";

/**
 * When the person stops being the mechanism. Two complete trips, so the
 * handover lands on a boundary with the figure standing still at the source
 * rather than caught mid-stride.
 *
 * Derived from the act's own phase table rather than typed here, because a
 * trip length that drifted out of step with a hand-written number would
 * misplace the one beat the whole slide turns on.
 */
/*
 * ONE trip, not two.
 *
 * Two was the deck watching the same errand happen twice before anything
 * changed — with TRIP at 11.1 seconds that was 22 seconds of walking before
 * the argument moved, on a slide whose point is made by the first crossing.
 * One complete trip is a complete claim: somebody fetches this, by hand,
 * and the sheet goes stale behind them.
 *
 * It stays a MULTIPLE of TRIP. The figure has to be standing still at the
 * source when the handover starts, and a trip boundary is the only moment
 * they are.
 */
const HANDOVER = TRIP;

/** An `[x, y, z]` triple, in the scene's world units. */
export type Vec3 = readonly [number, number, number];

/** The hero object on stage. Each new act adds a member to the union. */
export type ActTrack =
  | {
      kind: "cog";

      /**
       * Tooth count of the shafted gear over time. The machine takes
       * whatever is left of the fixed total, so this one track drives the
       * whole swap.
       */
      driverTeeth: readonly Keyframe<number>[];
    }
  | {
      kind: "architecture";

      /**
       * 0 = one tangled always-running process, 1 = a container per job on
       * its own schedule. This single track drives the whole reorganisation.
       */
      ordered: readonly Keyframe<number>[];
    }
  | {
      kind: "pipeline";

      /**
       * 0 = a full export carried across by hand, once a day.
       * 1 = records arriving on their own, continuously.
       */
      automated: readonly Keyframe<number>[];
    }
  | {
      kind: "projects";

      /** 0 = an empty grid, 1 = all six placed and running. */
      shown: readonly Keyframe<number>[];
    }
  | {
      kind: "cabinet";

      /** 0 = shut, 1 = the lower drawer fully out. Work already done. */
      lower: readonly Keyframe<number>[];

      /**
       * 0 = shut, 1 = the upper drawer fully out. What is proposed.
       *
       * A second track rather than one "which drawer" number, so the deck can
       * cross one drawer closing with the other opening — which is the moment
       * the whole first half turns on.
       */
      upper: readonly Keyframe<number>[];
    }
  /*
   * The two FLAT kinds.
   *
   * These carry no keyframe tracks, which makes them the odd members of this
   * union — every other act is a machine posed by one number over time, and
   * these are pages. There is nothing to pose: the argument was made by the
   * acts before them, and this is where the room reads rather than watches.
   *
   * They still go through the act system rather than a parallel one, because
   * everything else a slide needs — its clock, its camera, its accent, its
   * place in the running order — is the same, and a second mechanism for
   * "slides that happen to be flat" would have to reimplement all of it.
   */
  | {
      kind: "synopsis";

      /** The job title being asked for. */
      role: string;

      /** What the deck covered. Two columns on a wide screen. */
      points: readonly SynopsisPoint[];
    }
  | {
      kind: "market";

      /** Six is what the layout is built around. */
      roles: readonly MarketRole[];
    }
  | {
      kind: "puzzle";

      /**
       * 0 = the picture with pieces missing, 1 = every gap filled.
       *
       * Held near 0 by the deck. The gap is real and unsolved, so the act
       * states the problem and stops — raising this is for the day there is
       * something to show.
       */
      complete: readonly Keyframe<number>[];
    }
  | {
      kind: "local-ai";

      /** 0 = the work happens outside. 1 = it happens here. */
      inHouse: readonly Keyframe<number>[];
    }
  | {
      kind: "owned";

      /** 0 = sealed units on a meter. 1 = ours, open, rearrangeable. */
      owned: readonly Keyframe<number>[];
    }
  | {
      kind: "onboarding";

      /**
       * 0 = each client is stopped at the door and logged by hand.
       * 1 = they walk straight in, closer together and quicker.
       *
       * Drives the walking speed and the wait at the threshold together,
       * because they are the same claim — the pause is what "by hand" looks
       * like, and there is no version of this where somebody is being written
       * down at the door AND the queue is moving briskly.
       */
      automated: readonly Keyframe<number>[];
    };

/** One line of the closing summary. */
export interface SynopsisPoint {
  /** The beat being summarised. Keep it short; it is set large. */
  label: string;

  /** One line on what it showed. */
  note: string;
}

/** One opening on the market slide. */
export interface MarketRole {
  company: string;
  title: string;

  /** Free text, so it can read "$145k" or "$130-150k" or "DOE". */
  pay: string;

  /** Application link. Leave empty and the Apply button is simply omitted. */
  url: string;
}

/**
 * The sheet clipped inside an opened folder.
 *
 * A slide carrying this renders as an OPEN FILE: the whole frame becomes
 * manila, a sheet of lined paper is clipped to the left leaf, and the act
 * plays on the right leaf. Leave it off and the slide is an ordinary
 * full-frame act on the deck's usual ground.
 *
 * TO WRITE ON THE PAPER: grep this file for "EDIT THE NOTES HERE". There is
 * one such block per opened-file slide, and the strings in it are exactly
 * the bullets that appear on the sheet. Nothing about the wording lives in
 * `NotesPanel.tsx`.
 */
export interface SlideNotes {
  /** Written at the head of the sheet. */
  heading?: string;

  /** One entry per ruled line. Write whatever you like here. */
  lines: readonly string[];
}

export interface SlideCopy {
  title: string;

  /**
   * Optional supporting line. A slide whose act already carries the argument
   * does not need one, and a headline standing alone reads as a statement
   * where the same headline over a paragraph reads as a heading for it.
   */
  body?: string;
}

export interface Slide {
  /** Stable identifier. Used as a React key and, later, for deep links. */
  id: string;

  /** How long the timeline runs. It holds on its final state after this. */
  duration: number;

  /** Headline and supporting line. Steps at each keyframe; it does not blend. */
  copy: readonly Keyframe<SlideCopy>[];

  /** Where the camera sits over time. */
  camera: readonly Keyframe<Vec3>[];

  /** What the camera looks at. Eases independently of the position. */
  target: readonly Keyframe<Vec3>[];

  /** Drives the eyebrow, the lit markers and the slide counter. */
  accent: readonly Keyframe<string>[];

  /** Scene clear colour and the page background behind the canvas. */
  background: readonly Keyframe<string>[];

  /**
   * Where the copy sits against the act. "left" gives it a tall column down
   * the left side, which suits an object that is roughly as tall as it is
   * wide. "bottom" anchors it low and wide and hands the upper frame to the
   * act, which is the only workable arrangement for a long horizontal run.
   * Defaults to "left".
   */
  layout?: "left" | "bottom";

  /**
   * Kept in the file but taken out of the running order. Everything the deck
   * derives — bounds, the counter, Home/End — reads the filtered list, so a
   * hidden slide is invisible to all of it without any of them learning what
   * "hidden" means.
   *
   * Deliberately not deletion: the act, its timings and its copy are all
   * still here and still typechecked, so putting it back is one word.
   */
  hidden?: boolean;

  /**
   * Strips the page furniture: no copy block, no vignette. For a slide whose
   * act IS the whole statement and wants the frame to itself.
   *
   * The vignette exists to hold the copy legible against a lit machine, so a
   * slide with no copy has nothing for it to do — and it darkens the corners,
   * which is exactly where a centred grid puts its outermost cells.
   */
  bare?: boolean;

  /**
   * Notes clipped inside an opened folder, down the left of frame.
   *
   * Present on the project slides and absent everywhere else — which is what
   * makes an opened file look different from a slide that merely has an act
   * on it.
   */
  notes?: SlideNotes;

  /**
   * The file coming out of the drawer before this slide starts.
   *
   * While it runs the cabinet is on stage and the slide's own act is not,
   * and the act's timeline has not started — so a slide with an entry runs
   * for `entry.duration + duration`, and its act still gets every second of
   * `duration` with something to look at.
   */
  entry?: SlideEntry;

  /** Which act is on stage, and how it is posed over time. */
  act: ActTrack;
}

/**
 * A file being put away and the next one taken out.
 *
 * THE JOIN AT BOTH ENDS IS THE WHOLE TRICK. The beat ends with the open
 * folder's inside larger than the frame, and the slide it hands to has that
 * same manila as its background — so the cut between them is a cut between
 * two frames that are both nothing but folder. Going the other way, a beat
 * with a `from` STARTS in that position, which is why stepping off a project
 * slide does not flash: the folder was already filling the frame before the
 * click, and the first thing it does is shut.
 */
export interface SlideEntry {
  /** 0 for the lower drawer, 1 for the upper. It is held open throughout. */
  drawer: number;

  /**
   * The file to put back first, if one is out. Absent on the first file of a
   * drawer, where the beat starts from the contents shot instead.
   */
  from?: number;

  /** The file to take out and open. */
  file: number;

  /** When the outgoing file is back in the drawer and the next one starts. */
  handover: number;

  /** Seconds the whole beat runs, before the act's own timeline begins. */
  duration: number;

  /**
   * The cabinet's own ground, held for as long as the cabinet is on stage.
   *
   * Not the slide's background, which is manila: that is the colour of the
   * INSIDE of the folder this beat is opening, and painting the room it is
   * being opened in with it would flash the moment the camera pulls back to
   * the drawer.
   */
  background: string;

  camera: readonly Keyframe<Vec3>[];
  target: readonly Keyframe<Vec3>[];
}

/* ------------------------------------------------------ the file beat poses
 *
 * Two camera positions, and every file beat in the deck is a move between
 * them. They are DERIVED, not dialled in: `ENTRY_FILL` is computed from
 * OUT_Y, OUT_Z and OUT_SCALE in `parts/cabinet.ts` — where a presented file
 * ends up — and from the stage's 38-degree field. Change any of those and
 * this stops covering the frame, which turns an invisible cut into a visible
 * one. The check is: at this distance the open folder's half-height must
 * exceed the frustum's, on the narrowest screen the deck will ever run on.
 */

/** Looking into the open drawer, reading the tabs. The contents shot. */
const DRAWER_EYE: Vec3 = [-3.13, 3.33, 9.62];
const DRAWER_AIM: Vec3 = [-0.4, -0.15, 1.9];

/** Nose to the open folder's inside, which is bigger than the frame. */
const FILL_EYE: Vec3 = [-2.804, 0.708, 7.927];
const FILL_AIM: Vec3 = [-2.07, 0.708, 5.853];

/** Taking the first file out: there is nothing to put away first. */
const TAKE_OUT = 1.35;

const TAKE_OUT_CAMERA: readonly Keyframe<Vec3>[] = [
  { at: 0, value: DRAWER_EYE },
  { at: TAKE_OUT, value: FILL_EYE },
];

const TAKE_OUT_TARGET: readonly Keyframe<Vec3>[] = [
  { at: 0, value: DRAWER_AIM },
  { at: TAKE_OUT, value: FILL_AIM },
];

/**
 * Swapping one file for the next: back to the drawer and out again.
 *
 * The camera has to go all the way back to the drawer in the middle. It is
 * tempting to shorten the trip and stay close, but the drawer IS the point —
 * every swap is another look at the row of tabs, which is the deck quietly
 * repeating how much work is in there.
 */
const SWAP_HANDOVER = 0.72;
const SWAP = 2;

const SWAP_CAMERA: readonly Keyframe<Vec3>[] = [
  { at: 0, value: FILL_EYE },
  { at: SWAP_HANDOVER, value: DRAWER_EYE },
  { at: SWAP, value: FILL_EYE },
];

const SWAP_TARGET: readonly Keyframe<Vec3>[] = [
  { at: 0, value: FILL_AIM },
  { at: SWAP_HANDOVER, value: DRAWER_AIM },
  { at: SWAP, value: FILL_AIM },
];

/* ---------------------------------------------------- the same, upstairs
 *
 * THE UPPER DRAWER GETS THE LOWER DRAWER'S CAMERA, RAISED.
 *
 * Not a second set of poses to keep in step with the first. The cabinet is
 * only ever moved and turned about Y, so the upper drawer is the lower one
 * lifted by `DRAWER_PITCH` and identical in every other respect — which means
 * a pose that frames a file downstairs frames the matching file upstairs the
 * moment you add that to its height, and the beat plays out the same.
 *
 * That is worth having as one line of arithmetic rather than four more
 * hand-tuned vectors. The originals are derived from where a presented file
 * ends up (see the note above); a hand-copied upper set would be four more
 * numbers that stop being derived the first time anything downstairs moves.
 */
const raise = (v: Vec3): Vec3 => [v[0], v[1] + DRAWER_PITCH, v[2]];

const UPPER_DRAWER_EYE = raise(DRAWER_EYE);
const UPPER_DRAWER_AIM = raise(DRAWER_AIM);
const UPPER_FILL_EYE = raise(FILL_EYE);
const UPPER_FILL_AIM = raise(FILL_AIM);

const UPPER_TAKE_OUT_CAMERA: readonly Keyframe<Vec3>[] = [
  { at: 0, value: UPPER_DRAWER_EYE },
  { at: TAKE_OUT, value: UPPER_FILL_EYE },
];

const UPPER_TAKE_OUT_TARGET: readonly Keyframe<Vec3>[] = [
  { at: 0, value: UPPER_DRAWER_AIM },
  { at: TAKE_OUT, value: UPPER_FILL_AIM },
];

const UPPER_SWAP_CAMERA: readonly Keyframe<Vec3>[] = [
  { at: 0, value: UPPER_FILL_EYE },
  { at: SWAP_HANDOVER, value: UPPER_DRAWER_EYE },
  { at: SWAP, value: UPPER_FILL_EYE },
];

const UPPER_SWAP_TARGET: readonly Keyframe<Vec3>[] = [
  { at: 0, value: UPPER_FILL_AIM },
  { at: SWAP_HANDOVER, value: UPPER_DRAWER_AIM },
  { at: SWAP, value: UPPER_FILL_AIM },
];

/*
 * ACT 0 — THE COG
 *
 * Fifteen seconds, one page, one line of copy. The gears hold
 * small-drives-big for three seconds, trade sizes over the next eight, and
 * settle into big-drives-small for the rest. The camera drifts throughout so
 * the frame is never static.
 *
 * The palette holds steady for the whole beat. With the copy fixed there is
 * nothing for a colour change to mark, and a drifting accent would only pull
 * attention off the machine.
 */
const deck: readonly Slide[] = [
  /*
   * THE OPENING — A CABINET IN A ROOM
   *
   * Before any argument, an object. The deck's first claim is not a sentence
   * but a piece of furniture: this is a body of work, and it was filed before
   * anyone asked to see it.
   *
   * Both drawers stay shut for the whole slide. The only motion is the camera
   * easing in, which is what makes the drawer opening on the NEXT slide read
   * as the first thing that actually happens.
   */
  {
    id: "cabinet",
    duration: 12,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: {
          title: "DevOps Pitch",
          body: "by Luke Files",
        },
      },
    ],

    /*
     * Ends exactly where the contents slide begins. That shared value IS the
     * join: the deck has no cross-slide transition machinery, so a continuous
     * move is made by two slides agreeing on a camera position.
     */
    camera: [
      //{ at: 0, value: [7.4, 6.2, 12.8] },
      { at: 0, value: [5.2, 5.4, 9.6] },
    ],

    target: [
      //{ at: 0, value: [0, 1.6, 0] },
      { at: 12, value: [0, 1.2, 0] },
    ],

    accent: [{ at: 0, value: SAGE }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "cabinet",
      lower: [{ at: 0, value: 0 }],
      upper: [{ at: 0, value: 0 }],
    },
  },

  /*
   * THE CONTENTS — THE LOWER DRAWER
   *
   * The camera continues the push from the slide before and drops over the
   * cabinet while the lower drawer runs out. The handwritten tabs are the
   * table of contents, and they are why the shot ends looking DOWN: a tab
   * reads from above and is edge-on from anywhere else.
   */
  {
    id: "contents-done",
    duration: 16,
    layout: "bottom",

    copy: [{ at: 0, value: { title: "What is already built." } }],

    /*
     * Settles LOW and nearly square to the tabs, not above them.
     *
     * The tabs are tipped back only 17 degrees, so they face forward far more
     * than they face up — the first pass looked down from 56 degrees and read
     * them close to edge-on. This ends at 23 degrees, sitting on the tabs'
     * own facing direction, which puts the handwriting about 6 degrees off
     * square. The drawer still opens under a higher angle so the travel
     * reads; it just does not stay there.
     */
    camera: [
      { at: 0, value: [5.2, 5.4, 9.6] },
      //{ at: 5.2, value: [1.2, 5.8, 9.4] },
      //{ at: 10.5, value: [-3.13, 3.33, 9.62] },
      { at: 10, value: [-3.13, 4.33, 9.62] },
    ],

    target: [
      { at: 0, value: [0, 1.2, 0] },
      //{ at: 5.2, value: [-0.2, 0.4, 1.5] },
      //{ at: 10.5, value: [-0.4, -0.15, 1.9] },
      { at: 10, value: [-0.4, -0.15, 1.9] },
    ],

    accent: [{ at: 0, value: SAGE }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "cabinet",

      /*
       * Held shut for a beat before it moves. The drawer opening is the
       * slide's one event, and an event that starts on frame zero is not read
       * as an event.
       */
      lower: [
        { at: 0, value: 0 },
        { at: 1.6, value: 0 },
        { at: 5.2, value: 1 },
      ],

      upper: [{ at: 0, value: 0 }],
    },
  },

  {
    id: "cog",

    /*
     * File 0 comes out of the drawer. Nothing to put away first, because the
     * slide before this one is the contents shot — so the beat opens exactly
     * where that slide left the camera and the cut into it is invisible.
     */
    entry: {
      drawer: 0,
      file: 0,
      handover: 0,
      duration: TAKE_OUT,
      background: BACKGROUND,
      camera: TAKE_OUT_CAMERA,
      target: TAKE_OUT_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "MISSION",
      lines: [
        "I don't want to be a small cog in a big machine",
        "Having an impact",
        "Do more than just one small thing",
      ],
    },
    duration: 15,
    /*
     * The act stopped being one pair roughly as tall as it is wide the
     * moment it became a train, and a tall left-hand column of copy cannot
     * share a frame with a fifteen-unit horizontal run. Same reasoning as
     * the pipeline and the grid: hand the upper frame to the machine.
     */
    layout: "bottom",
    copy: [{ at: 0, value: { title: "" } }],
    /*
     * Centred on the driver, which sits on the world origin and never leaves
     * it — the gear that changes is the subject, so it holds the middle of
     * the frame and the machine trails off to the right from there.
     *
     * Aimed BELOW it so the act rides high and leaves the foot of the frame
     * to the copy.
     *
     * HELD, and not a keyframe missing.
     *
     * This slide is a folder lying open on a desk. A desk does not drift, so
     * a camera that eases around while you read the sheet turns the page into
     * something floating in space and gives the whole illusion away. The
     * drifts these tracks used to carry were written when every act was a lit
     * object in a void, where a slow push is what stops a still frame looking
     * frozen; here the act's own motion does that job and the frame must not.
     *
     * The pose kept is the WIDEST of the ones that were being eased between,
     * because the act now plays on the right leaf only — see ACT_SHIFT in
     * `Present.tsx` — and the tighter poses were framed for the full frame.
     */
    camera: [{ at: 0, value: [5.5, 6.7, 15.2] }],
    target: [{ at: 0, value: [3, -0.5, -4] }],
    accent: [{ at: 0, value: SAGE }],
    /*
     * Manila, not the deck's usual ground. This slide is a FOLDER LYING
     * OPEN, so the whole frame is the inside of one — the sheet and the act
     * are both sitting on it. Same constant the cabinet's folders use, so
     * the file you saw pulled out of the drawer is the one you are reading.
     */
    background: [{ at: 0, value: FOLDER }],
    act: {
      kind: "cog",
      driverTeeth: [
        { at: 0, value: 13 },
        { at: 3.2, value: 13 },
        { at: 11, value: 43 },
        { at: 15, value: 43 },
      ],
    },
  },

  /*
   * ACT 1 — HOW THE DATA GETS THERE
   *
   * One scene, one take. Two complete trips establish the rhythm — carry,
   * dump, decay, nothing, and then all of it again, because a single trip
   * reads as an event where two read as a routine. Then the person is simply
   * gone, and what replaces them never stops.
   *
   * The handover is pinned to HANDOVER rather than to a number typed by eye,
   * so it always lands on a trip boundary with the figure standing at the
   * source. Timed anywhere else it vanishes mid-stride, or halfway through
   * setting the box down, and the disappearance reads as a glitch rather
   * than as the point.
   *
   * The sheet the flow inherits is the decayed one the last trip left
   * behind. Watching the arrivals haul it back to current is the argument;
   * handing the flow a full sheet would be handing it a finished job.
   */
  {
    id: "how-it-arrives",

    /* File 0 goes back, file 1 comes out. */
    entry: {
      drawer: 0,
      from: 0,
      file: 1,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: BACKGROUND,
      camera: SWAP_CAMERA,
      target: SWAP_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "sync-services",
      lines: [
        "WAS: one export done daily",
        "  a bloated system constantly freezing",
        "  regularly letting data expire",
        "NOW: records arrive on their own",
        "  a 5 minute loop keeping data modern",
      ],
    },
    duration: HANDOVER + 10,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: {
          title: "",
        },
      },
    ],

    /*
     * HELD, and not a keyframe missing.
     *
     * This slide is a folder lying open on a desk. A desk does not drift, so
     * a camera that eases around while you read the sheet turns the page into
     * something floating in space and gives the whole illusion away. The
     * drifts these tracks used to carry were written when every act was a lit
     * object in a void, where a slow push is what stops a still frame looking
     * frozen; here the act's own motion does that job and the frame must not.
     *
     * The pose kept is the WIDEST of the ones that were being eased between,
     * because the act now plays on the right leaf only — see ACT_SHIFT in
     * `Present.tsx` — and the tighter poses were framed for the full frame.
     */
    /*
     * In, with the stage. `pipelineAct` pulled its rack and its sheet toward
     * each other to shorten the walk, and a camera left where it was would
     * have framed the same shot with a smaller scene in the middle of it.
     * Moved along the line it was already looking down, far enough to hold
     * the act at the size it was: the stage occupied 71% of the act's box
     * before and 72% after.
     */
    camera: [{ at: 0, value: [1.34, 5.18, 12.95] }],
    target: [{ at: 0, value: [0.3, 3.5, 0] }],

    /*
     * Amber for as long as somebody is doing the carrying, green once
     * nobody is. The palette turns at the same instant the figure leaves,
     * which is the one moment in the deck where a colour change has
     * something real to mark.
     */
    accent: [{ at: 0, value: SAGE }],

    /*
     * Manila, not the deck's usual ground. This slide is a FOLDER LYING
     * OPEN, so the whole frame is the inside of one — the sheet and the act
     * are both sitting on it. Same constant the cabinet's folders use, so
     * the file you saw pulled out of the drawer is the one you are reading.
     */
    background: [{ at: 0, value: FOLDER }],

    act: {
      kind: "pipeline",

      /*
       * Opens ON the trip boundary, where the person is standing still at
       * the source with empty hands. The act reads the LEADING edge of this
       * ramp, not its midpoint — that is the frame they disappear on — and
       * everything gradual about the handover happens across the rest of it:
       * the flow starting, the server rising, the sheet spreading out of its
       * single line.
       *
       * Two seconds, which is the machinery's business rather than the
       * person's. It was widened to 3.6 while the figure walked off across
       * it; nothing is paced against it now.
       */
      automated: [
        { at: 0, value: 0 },
        { at: HANDOVER, value: 0 },
        { at: HANDOVER + 2, value: 1 },
        { at: HANDOVER + 10, value: 1 },
      ],
    },
  },

  /*
   * ACT — THE SIX
   *
   * The only slide in the deck that is a survey rather than an argument, and
   * it is placed here on purpose: straight after the one pipeline has been
   * shown end to end, so "and five more like it" lands against something the
   * audience has actually watched work.
   *
   * Long, because six mechanisms need time to be looked at one at a time.
   * The cells arrive in reading order over the first few seconds and then
   * every one of them keeps running, so there is no dead frame to talk over.
   */
  {
    id: "projects",

    /* File 1 goes back, file 2 comes out. */
    entry: {
      drawer: 0,
      from: 1,
      file: 2,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: BACKGROUND,
      camera: SWAP_CAMERA,
      target: SWAP_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "Six Processes",
      lines: [
        "Executive dashboards",
        "Notes-Importer",
        "Daily Call List",
        "Birthday-Importer",
        "HR Timecard",
        "Data Cleanup",
      ],
    },
    duration: 26,

    /*
     * Not `bare`. The flag would drop the vignette with the copy, and the
     * corner falloff is still doing work here — it settles the six mechanisms
     * into the room instead of leaving them floating on a flat field.
     *
     * An empty `copy` track is all that is needed to run without words.
     */
    copy: [],

    /*
     * Dead centre and dead still. With the copy gone there is nothing to
     * balance against and nothing to keep clear of, so the grid simply owns
     * the middle of the frame — and the usual drift is dropped with it,
     * because a survey the audience is reading should not be moving under
     * them.
     */
    camera: [{ at: 0, value: [-1, 2.85, 20.4] }],
    target: [{ at: 0, value: [-1, 2.85, 0] }],
    accent: [{ at: 0, value: SAGE }],
    /*
     * Manila, not the deck's usual ground. This slide is a FOLDER LYING
     * OPEN, so the whole frame is the inside of one — the sheet and the act
     * are both sitting on it. Same constant the cabinet's folders use, so
     * the file you saw pulled out of the drawer is the one you are reading.
     */
    background: [{ at: 0, value: FOLDER }],
    act: {
      kind: "projects",
      /*
       * Held dark for a beat before anything arrives.
       *
       * This is the one slide with no copy, so there is no headline to read
       * while the grid assembles — starting the fade on frame one means the
       * six are already resolving before an audience has finished registering
       * that the screen changed at all. The pause gives the cut somewhere to
       * land, and the arrival then reads as an event rather than as the tail
       * of the transition.
       */
      /*
       * A short hold, then in. The pause is there to give the cut somewhere
       * to land — but the ramp behind it was nearly five seconds on top of a
       * per-cell stagger, which is a long time to watch a grid decide whether
       * it is arriving.
       */
      shown: [
        { at: 0, value: 0 },
        { at: 0.7, value: 0 },
        { at: 3.1, value: 1 },
        { at: 26, value: 1 },
      ],
    },
  },

  /*
   * ACT 2 — THE ARCHITECTURE
   *
   * Twenty seconds. Six churning as one mass, seven pulling apart and
   * settling, the rest running as scheduled containers so the difference in
   * rhythm has time to register.
   */
  {
    id: "architecture",
    duration: 20,
    layout: "bottom",

    /* Temporarily out of the running order. Flip to false to bring it back. */
    hidden: true,

    copy: [
      {
        at: 0,
        value: {
          title: "One process became many.",
          body: "A single always-running program became a container per job, each on its own schedule — it starts, does its work, exits, and leaves a record behind. The same work, now separable and auditable.",
        },
      },
    ],
    camera: [
      { at: 0, value: [1.8, 5.4, 13.6] },
      { at: 10, value: [1.0, 4.9, 12.7] },
      { at: 20, value: [1.7, 5.3, 13.4] },
    ],
    target: [
      { at: 0, value: [0, 3.6, 0] },
      { at: 20, value: [0, 3.4, 0] },
    ],
    accent: [{ at: 0, value: SAGE }],
    background: [{ at: 0, value: BACKGROUND }],
    act: {
      kind: "architecture",
      ordered: [
        { at: 0, value: 0 },
        { at: 6, value: 0 },
        { at: 13, value: 1 },
        { at: 20, value: 1 },
      ],
    },
  },

  /*
   * ACT 3 — ONBOARDING, AS THE FUNNEL
   *
   * Clients arrive at the top all at once, leave the neck one at a time, and
   * something has to say where each one goes. First that is a person, and the
   * funnel backs up behind them; then it is a tube that swings, and it does
   * not.
   *
   * Sixteen seconds before the handover, because the stack above the neck is
   * the whole cost of the old arrangement and a stack needs time to build
   * before it reads as one.
   */
  {
    id: "onboarding",

    /* File 2 goes back, file 3 comes out — the last of the finished work. */
    entry: {
      drawer: 0,
      from: 2,
      file: 3,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: BACKGROUND,
      camera: SWAP_CAMERA,
      target: SWAP_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "Onboarding",
      lines: [
        "New Clients / Prospects had to be tracked by hand",
        "Now tracking is fully automated",
      ],
    },
    duration: 32,
    layout: "bottom",
    copy: [
      {
        at: 0,
        value: {
          title: "",
        },
      },
    ],

    /*
     * Low and close to the water, because the horizon is the point. A camera
     * up at the height the funnel needed looks DOWN on a sea, which flattens
     * the swell into a texture and loses the one thing the act is doing.
     *
     * HELD, and not a keyframe missing.
     *
     * This slide is a folder lying open on a desk. A desk does not drift, so
     * a camera that eases around while you read the sheet turns the page into
     * something floating in space and gives the whole illusion away. The
     * drifts these tracks used to carry were written when every act was a lit
     * object in a void, where a slow push is what stops a still frame looking
     * frozen; here the act's own motion does that job and the frame must not.
     *
     * The pose kept is the WIDEST of the ones that were being eased between,
     * because the act now plays on the right leaf only — see ACT_SHIFT in
     * `Present.tsx` — and the tighter poses were framed for the full frame.
     */
    /*
     * Three-quarter on to the doorway, from the side the clients arrive from.
     *
     * Square to the facade the building is a rectangle and the walk toward the
     * door is straight at the lens, where it reads as people getting bigger
     * rather than as people going somewhere. Off to the approach side, both
     * legs of the journey are across the frame and the turn into the door is
     * a turn you can see.
     *
     * Low, and barely above head height. Looking DOWN on this makes a floor
     * plan of it — the door stops being a door and becomes a gap in a shape.
     *
     * HELD, and not a keyframe missing: this slide is a folder lying open on a
     * desk, and a desk does not drift. The act's own loop is what keeps the
     * frame from reading as frozen.
     */
    camera: [{ at: 0, value: [14.5, 4.6, 17] }],
    target: [{ at: 0, value: [0.5, 1.4, 3] }],

    accent: [{ at: 0, value: SAGE }],

    /*
     * Manila, not the deck's usual ground. This slide is a FOLDER LYING
     * OPEN, so the whole frame is the inside of one — the sheet and the act
     * are both sitting on it. Same constant the cabinet's folders use, so
     * the file you saw pulled out of the drawer is the one you are reading.
     */
    background: [{ at: 0, value: FOLDER }],

    act: {
      kind: "onboarding",

      /*
       * Opens ALREADY RUNNING, at a trudge, and never at zero — the door has
       * to be busy from the first frame or the slide starts on an empty
       * street and the loop has nothing to be a loop of.
       *
       * The turn is slow and lands late. The sheet on the left leaf says
       * "had to be tracked by hand" before it says "now fully automated", so
       * the queue is still stopping at the door while that first line is
       * being read, and the change happens under the second.
       */
      automated: [
        { at: 0, value: 0.08 },
        { at: 12, value: 0.12 },
        { at: 24, value: 1 },
      ],
    },
  },

  /*
   * THE TURN — ONE DRAWER SHUTS, THE OTHER OPENS
   *
   * The hinge of the whole deck, and the only slide whose subject is the
   * FURNITURE rather than anything in it.
   *
   * Everything up to here came out of the lower drawer and was already built.
   * Everything after comes out of the upper one and is being proposed. The
   * deck could simply cut from the last finished file to the first proposed
   * one, and the room would have no idea it had crossed anything. So the
   * cabinet says it instead: the finished work slides shut, the proposal
   * slides out, and the argument's two halves are two drawers of one object.
   *
   * THIS IS WHY `lower` AND `upper` ARE SEPARATE TRACKS. A single "which
   * drawer is out" number cannot express a cross — one drawer has to be
   * closing WHILE the other opens, or it reads as two events with a pause
   * between them rather than as one thing turning over. See `CabinetState`.
   *
   * The overlap is deliberate and small: the lower is most of the way shut
   * before the upper starts, so the eye follows one drawer and is handed to
   * the other rather than being asked to watch both at once.
   *
   * IT ENDS ON THE UPPER DRAWER'S CONTENTS SHOT, which is the pose every
   * upper file beat begins from — the same join the opening shot makes with
   * `contents-done`, one floor up. Nothing here transitions to the next
   * slide; the two simply agree on where the camera is.
   */
  {
    id: "whats-to-come",
    duration: 13,
    layout: "bottom",

    copy: [{ at: 0, value: { title: "What's to come." } }],

    /*
     * Rises with the drawers. The camera starts on the lower drawer it has
     * been living in for four slides, and climbs to the upper one as the
     * swap happens, so the move is the argument: this is the same cabinet,
     * one drawer up.
     */
    camera: [
      { at: 0, value: DRAWER_EYE },
      { at: 1.4, value: DRAWER_EYE },
      { at: 7.6, value: UPPER_DRAWER_EYE },
      { at: 13, value: UPPER_DRAWER_EYE },
    ],

    target: [
      { at: 0, value: DRAWER_AIM },
      { at: 1.4, value: DRAWER_AIM },
      { at: 7.6, value: UPPER_DRAWER_AIM },
      { at: 13, value: UPPER_DRAWER_AIM },
    ],

    /*
     * GOLD, and it starts here rather than on the next slide. Gold is the
     * deck's mark for what is unresolved — see `palette.ts` — and the upper
     * drawer is nothing but that. The colour turning over at the same moment
     * the drawers do is the point.
     */
    accent: [{ at: 0, value: GOLD }],

    /*
     * The room, not manila. The frame is a cabinet being operated, not a
     * folder lying open, and the manila belongs to the inside of a file.
     */
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "cabinet",

      /*
       * Held shut for a beat first, for the same reason `contents-done`
       * holds: an event that starts on frame zero is not read as an event.
       */
      lower: [
        { at: 0, value: 1 },
        { at: 1.4, value: 1 },
        { at: 6.4, value: 0 },
      ],

      /*
       * Starts while the lower is still visibly out, and the overlap is
       * WIDE — five seconds against five, offset by less than a third.
       *
       * The first pass staggered these by more and the cross vanished: both
       * curves are smootherstep, which leaves and arrives with zero velocity,
       * so their tails are almost flat and a gap that looks generous in
       * keyframe time buys almost no simultaneous MOTION. Measured, the two
       * drawers were never both moving at once — it played as one drawer
       * shutting, a pause, and another opening, which is the reading this
       * slide exists to avoid. They now pass each other around a quarter
       * open, both travelling.
       */
      upper: [
        { at: 0, value: 0 },
        { at: 2.8, value: 0 },
        { at: 7.8, value: 1 },
      ],
    },
  },
  // {
  //   id: "missed-data",
  //   duration: 30,
  //   layout: "bottom",
  //   copy: [
  //     {
  //       at: 0,
  //       value: {
  //         title: "Data is currently mismatched and coming from various sources",
  //       },
  //     },
  //   ],
  //   camera: [
  //     { at: 0, value: [0.9, 4.9, 16.6] },
  //     { at: 16, value: [0.3, 4.5, 15.8] },
  //     { at: 32, value: [0.8, 4.8, 16.4] },
  //   ],

  //   /*
  //    * Added to make this compile — `target` is required on every slide, and
  //    * this one had a camera with nothing to look at. Aimed at the
  //    * architecture act, which sits lower than the funnel this camera was
  //    * copied from.
  //    */
  //   target: [
  //     { at: 0, value: [0, 3.6, 0] },
  //     { at: 32, value: [0, 3.4, 0] },
  //   ],

  //   accent: [{ at: 0, value: SAGE }],
  //   background: [{ at: 0, value: BACKGROUND }],
  //   act: {
  //     kind: "architecture",
  //     ordered: [
  //       { at: 0, value: 0 },
  //       { at: 6, value: 0 },
  //       { at: 13, value: 1 },
  //       { at: 20, value: 1 },
  //     ],
  //   },
  // },

  /*
   * ACT 4 — THE GAP
   *
   * The first slide in the deck that is a PITCH rather than a record. It runs
   * the same before/after grammar as the rest, but the "after" is a proposal
   * instead of something already shipped — which is exactly why it has to
   * look like the others: the argument is that the fix is the same kind of
   * fix as the four the audience has just watched work.
   */
  {
    id: "data-gap",

    /* File 0 of the upper drawer. Nothing to put away — the drawer has just
     * been opened by the slide before, so this beat starts on its contents
     * shot exactly as `cog` starts on the lower drawer's. */
    entry: {
      drawer: 1,
      file: 0,
      handover: 0,
      duration: TAKE_OUT,
      background: BACKGROUND,
      camera: UPPER_TAKE_OUT_CAMERA,
      target: UPPER_TAKE_OUT_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "Data Gaps",
      lines: [
        "Data in LPL and Wealthbox is misaligned",
        "The gap requires manual cleanups that could be automated",
      ],
    },

    duration: 14,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: {
          title: "",
        },
      },
    ],

    /*
     * HELD, and not a keyframe missing. This slide is a folder lying open on
     * a desk, and a desk does not drift — see the long note on `onboarding`.
     * The pose kept is the WIDEST of the three that were being eased between,
     * because the act now plays on the right leaf only.
     */
    camera: [{ at: 0, value: [2.4, 2.9, 18.6] }],
    target: [{ at: 0, value: [0, 2.4, 0] }],

    accent: [{ at: 0, value: GOLD }],

    /* Manila. The frame is the inside of the file just opened. */
    background: [{ at: 0, value: FOLDER }],

    act: {
      kind: "puzzle",

      /* Pinned. The gap is the slide; it does not get solved on screen. */
      complete: [{ at: 0, value: 0 }],
    },
  },

  /*
   * ACT 5 — WHERE THE MODEL LIVES
   *
   * Held on the crossing for nearly half the slide. The stream has to read as
   * routine before moving its endpoint means anything — one record crossing a
   * line is an anecdote, a steady stream crossing it is a policy.
   */
  {
    id: "local-ai",

    /* File 0 goes back, file 1 comes out. */
    entry: {
      drawer: 1,
      from: 0,
      file: 1,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: BACKGROUND,
      camera: UPPER_SWAP_CAMERA,
      target: UPPER_SWAP_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "Local AI",
      lines: [
        "Owning our own AI creates optimized workflows",
        "It knows us, our data, and out goals",
      ],
    },

    duration: 16,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: { title: "Local AI: the data never has to leave the building." },
      },
    ],

    /*
     * Looking down on the room rather than across it, so the floor plan reads
     * as a plan: six desks in two rows, all feeding the one box.
     *
     * Never put the camera DIRECTLY over the target. `lookAt` resolves against
     * a fixed up vector of (0, 1, 0), and a straight-down view is parallel to
     * it — the shot degenerates and spins. The Z offset below is what keeps
     * the angle at roughly 65 degrees instead of 90.
     */
    /*
     * HELD, and not a keyframe missing. This slide is a folder lying open on
     * a desk, and a desk does not drift — see the long note on `onboarding`.
     * The pose kept is the WIDEST of the three that were being eased between,
     * because the act now plays on the right leaf only.
     */
    camera: [{ at: 0, value: [4.6, 12.6, 9.2] }],
    target: [{ at: 0, value: [0, 1.2, -1.6] }],

    accent: [{ at: 0, value: SAGE }],

    /* Manila. The frame is the inside of the file just opened. */
    background: [{ at: 0, value: FOLDER }],

    act: {
      kind: "local-ai",
      /* Pinned. Three workers, already working. */
      inHouse: [{ at: 0, value: 1 }],
    },
  },

  /*
   * ACT 6 — RENTED, THEN OURS
   *
   * The meters need long enough to be noticed as running before they stop,
   * so the faces stay on until well past the halfway mark.
   */
  {
    id: "owned",

    /* File 1 goes back, file 2 comes out — the last of the proposal. */
    entry: {
      drawer: 1,
      from: 1,
      file: 2,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: BACKGROUND,
      camera: UPPER_SWAP_CAMERA,
      target: UPPER_SWAP_TARGET,
    },

    /* ------------------------------------------------------------------
     * EDIT THE NOTES HERE. This is the sheet clipped inside the open
     * folder, on the left of this slide. One string per bullet — keep it
     * to a handful of short ones; the paper is meant to look jotted on,
     * not typed up. An empty string leaves a blank ruled line.
     * ---------------------------------------------------------------- */
    notes: {
      heading: "owning it",
      lines: ["rented: the meter never stops", "owned: it is ours to change"],
    },

    duration: 14,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: { title: "Own the systems instead of renting them." },
      },
    ],

    /*
     * Framed for a train that grows upward when a module is fitted. The aim
     * sits below the core so the modules and their swap arc get the top of
     * the frame, which is where the only thing worth watching happens.
     */
    /*
     * Square-on and wide enough to hold both sides at once. The whole slide
     * is the relationship between them, so neither can ever be the one the
     * camera favours.
     */
    /*
     * Close, because the 3D half is now one figure rather than a rack of
     * bars — and it has to hold its own beside a drawing that owns the left
     * of the screen.
     */
    /*
     * HELD, and not a keyframe missing. This slide is a folder lying open on
     * a desk, and a desk does not drift — see the long note on `onboarding`.
     * The pose kept is the WIDEST of the three that were being eased between,
     * because the act now plays on the right leaf only.
     */
    /*
     * AIMED AT THE WORK, NOT AT THE MIDDLE OF AN EMPTY STAGE.
     *
     * `ownedAct` stands its figure at STAGE_X = 3.4 and flows the motes in
     * from x = -1.6, because the act was composed for a full frame with the
     * drawing owning the left of it. This camera used to sit at x = 0 and
     * look at x = 0 — the empty middle — from nearly fourteen units out, and
     * that was survivable while the shot had the whole screen.
     *
     * It is not survivable inside a column. The act is now framed into what
     * the sheet and the drawing leave, and a shot that already wasted half
     * its frame on empty stage then gets shrunk again: measured, the figure
     * came out 85 pixels tall on a 1080p screen, against 306 before this
     * slide became a folder. That is the "small and far away".
     *
     * So the target moves ONTO THE FIGURE — x = STAGE_X, not the midpoint of
     * the stage — and the camera comes in to 5.6.
     *
     * Aiming at the midpoint was the first attempt and it was still wrong.
     * It framed the motes' whole run, which meant the figure sat two thirds
     * of the way to the right edge of its own shot; stacked on top of the
     * column offset that put it at 90 to 95 percent of the screen, hard
     * against the frame edge. Centring the shot on the figure brings it back
     * to 83 to 87 percent and halves the distance to the drawing.
     *
     * What fills the space between them is the motes. They run from x = -1.6
     * to x = 2.3, and this framing shows them from 0 onward — so they enter
     * at the drawing's side of the act and flow into the figure. The gap is
     * the flow. Cropping the first stretch of their run is the price, and it
     * is the right one: they read as coming from off-frame, which is what a
     * supply of work looks like.
     *
     * The distance is derived, not dialled. `stage.ts` holds the HORIZONTAL
     * framing fixed and widens the vertical FOV on anything narrower than
     * 16:9, so the binding constraint is vertical: the label under the floor
     * to the top of the figure is 3.4 units, and 5.6 gives 3.86 — a quarter
     * unit of air top and bottom on every aspect from 4:3 to 21:9.
     */
    camera: [{ at: 0, value: [3.4, 3.28, 5.59] }],
    target: [{ at: 0, value: [3.4, 2.95, 0] }],

    accent: [{ at: 0, value: SAGE }],

    /* Manila. The frame is the inside of the file just opened. */
    background: [{ at: 0, value: FOLDER }],

    act: {
      kind: "owned",
      /* Pinned. Already ours, already open. */
      owned: [{ at: 0, value: 1 }],
    },
  },
  /*
   * THE CLOSE — WHAT I AM ASKING FOR
   *
   * Flat. Every slide before this one made a single point with a moving
   * object; this one stops moving and states the ask, with the seven beats
   * gathered underneath it as evidence.
   *
   * `bare: true` because the panel carries its own heading — the deck's copy
   * layer would put a second title over the top of it.
   */
  {
    id: "synopsis",
    duration: 40,
    bare: true,
    copy: [],

    /* Nothing is rendered in 3D, so the camera only has to exist. */
    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    accent: [{ at: 0, value: GOLD }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "synopsis",
      role: "DevOps Engineer",

      /*
       * Pre-filled from what the deck actually shows, in running order, so
       * the summary and the slides cannot drift apart. Rewrite freely — this
       * is the only place the wording lives.
       */
      points: [
        {
          label: "Mission",
          note: "I want to have an impact, and I want to be able to see it",
        },
        {
          label: "Data Sync",
          note: "Data is now consistently being ingested at a rate of <5 minutes",
        },
        {
          label: "Helper Services",
          note: "Several various microservices are now running and constantly available",
        },
        {
          label: "Onboarding",
          note: "Clients once dormant are now always accurately tracked",
        },
        {
          label: "Our Own Model",
          note: "An AI model that stays on site and answers questions tailored to us",
        },
        {
          label: "We hold Services",
          note: "Our own apps, our own data, our own control, our own security",
        },
      ],
    },
  },

  /*
   * THE MARKET — FIRST SIX
   *
   * The only page in the deck with something clickable on it. See the note in
   * `MarketPanel` on why that needed handling: everywhere else a click means
   * "next slide".
   *
   * Duplicate this whole slide for a second six; nothing but the `id` and the
   * rows has to change.
   */
  {
    id: "market",
    duration: 60,
    bare: true,
    copy: [],

    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    accent: [{ at: 0, value: GOLD }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "market",

      /*
       * Fill these in. An empty `url` simply omits that row's Apply button,
       * so a half-filled table still renders cleanly while you work through
       * them.
       */
      roles: [
        {
          company: "LPL Fiancial",
          title: "New Grad - Software Engineer",
          pay: "88,700 - 110,00",
          url: "https://career.lpl.com/search-results?from=10&s=1",
        },
        {
          company: "First American Financial",
          title: "Full Stack Software Engineer",
          pay: "129,300 - 172,300",
          url: "",
        },
        {
          company: "Northrop Grumman",
          title: "Engineer Software - DevOps & Cloud Infrastructure",
          pay: "75,100 - 137,600",
          url: "https://ngc.eightfold.ai/careers?utm_source=position_notification_logged_out_candidate&domain=ngc.com&profile_type=candidate&start=0&pid=1340070573127&sort_by=timestamp",
        },
        {
          company: "Boeing",
          title: "Associate DevOps Developer",
          pay: "98,600 - 133,400",
          url: "https://jobs.boeing.com/job/seal-beach/associate-devops-developer/185/93457590464?utm_source=Indeed&utm_medium=organic&utm_campaign=Indeed",
        },
        {
          company: "Booz Allen Hamilton",
          title: "DevSecOps Engineer",
          pay: "117,000 - 185,000",
          url: "https://careers.boozallen.com/careers/JobDetail?jobId=129016&source=JB-16500",
        },
        { company: "", title: "", pay: "", url: "" },
      ],
    },
  },

  /*
   * THE MARKET — SECOND SIX
   *
   * The same template again. Delete this slide if six is enough.
   */
  {
    id: "market-2",
    duration: 60,
    bare: true,
    copy: [],

    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    accent: [{ at: 0, value: GOLD }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "market",
      roles: [
        { company: "", title: "", pay: "", url: "" },
        { company: "", title: "", pay: "", url: "" },
        { company: "", title: "", pay: "", url: "" },
        { company: "", title: "", pay: "", url: "" },
        { company: "", title: "", pay: "", url: "" },
        { company: "", title: "", pay: "", url: "" },
      ],
    },
  },
];

/**
 * The running order, hidden slides removed. Everything downstream counts and
 * indexes against THIS, which is why hiding one cannot leave a gap in the
 * counter or a dead press of the arrow key.
 */
export const slides: readonly Slide[] = deck.filter(slide => !slide.hidden);

/** The slide the deck opens on, and the stage's initial state. */
export const firstSlide = slides[0];
