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
const HANDOVER = TRIP * 2;

/**
 * The room every slide is lit in.
 *
 * Deep blue-black rather than the near-neutral the deck used to run — eight
 * hand-picked near-blacks that differed by a digit or two and read as one
 * colour anyway. A cold ground gives the metal something to be warm against
 * and stops the bloom halos looking like they are sitting on grey paper.
 *
 * One constant, so the deck cannot drift out of agreement with itself.
 */
const INK = "#070b16";

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
      kind: "data-gap";

      /**
       * 0 = two systems joined on name alone.
       * 1 = joined on a key that cannot be ambiguous.
       */
      keyed: readonly Keyframe<number>[];
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
       * 0 = every client placed by hand, one at a time, with rechecks.
       * 1 = nobody touches them and nothing queues.
       */
      handsOff: readonly Keyframe<number>[];
    };

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
  /** Which act is on stage, and how it is posed over time. */
  act: ActTrack;
}

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
  {
    id: "cog",
    duration: 15,
    /*
     * The act stopped being one pair roughly as tall as it is wide the
     * moment it became a train, and a tall left-hand column of copy cannot
     * share a frame with a fifteen-unit horizontal run. Same reasoning as
     * the pipeline and the grid: hand the upper frame to the machine.
     */
    layout: "bottom",
    copy: [{ at: 0, value: { title: "I want to have an impact" } }],
    /*
     * Centred on the driver, which sits on the world origin and never leaves
     * it — the gear that changes is the subject, so it holds the middle of
     * the frame and the machine trails off to the right from there.
     *
     * Aimed BELOW it so the act rides high and leaves the foot of the frame
     * to the copy.
     */
    camera: [
      { at: 0, value: [0, 1.2, 22.6] },
      { at: 7, value: [-0.5, 0.7, 21.2] },
      { at: 15, value: [-0.2, 1.0, 22.0] },
    ],
    target: [
      { at: 0, value: [0, -1.2, 0] },
      { at: 7, value: [0, -1.5, 0] },
      { at: 15, value: [0, -1.5, 0] },
    ],
    accent: [{ at: 0, value: "#79f7ff" }],
    background: [{ at: 0, value: INK }],
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
    duration: HANDOVER + 12,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: {
          title: "Data used to require manual exports, now it just arrives",
        },
      },
    ],

    camera: [
      { at: 0, value: [1.6, 5.6, 16.2] },
      { at: TRIP, value: [0.9, 5.1, 15.2] },
      { at: HANDOVER, value: [1.5, 5.5, 16.0] },
      { at: HANDOVER + 6, value: [0.8, 4.9, 14.9] },
      { at: HANDOVER + 12, value: [1.3, 5.3, 15.6] },
    ],

    target: [
      { at: 0, value: [0.3, 3.7, 0] },
      { at: HANDOVER, value: [0.3, 3.5, 0] },
      { at: HANDOVER + 12, value: [0.3, 3.4, 0] },
    ],

    /*
     * Amber for as long as somebody is doing the carrying, green once
     * nobody is. The palette turns at the same instant the figure leaves,
     * which is the one moment in the deck where a colour change has
     * something real to mark.
     */
    accent: [
      { at: 0, value: "#ffb46b" },
      { at: HANDOVER - 0.6, value: "#ffb46b" },
      { at: HANDOVER + 1.6, value: "#7dfcc0" },
      { at: HANDOVER + 12, value: "#7dfcc0" },
    ],

    background: [
      { at: 0, value: "#07070c" },
      { at: HANDOVER - 0.6, value: "#07070c" },
      { at: HANDOVER + 1.6, value: "#05090d" },
      { at: HANDOVER + 12, value: "#05090d" },
    ],

    act: {
      kind: "pipeline",

      /*
       * Crosses 0.5 exactly at HANDOVER: smootherstep is symmetric, so the
       * midpoint of the ramp is the midpoint of its span.
       */
      automated: [
        { at: 0, value: 0 },
        { at: HANDOVER - 0.6, value: 0 },
        { at: HANDOVER + 0.6, value: 1 },
        { at: HANDOVER + 12, value: 1 },
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
    duration: 26,
    bare: true,

    /* Named in the objects themselves; the page adds nothing. */
    copy: [],

    /*
     * Dead centre and dead still. With the copy gone there is nothing to
     * balance against and nothing to keep clear of, so the grid simply owns
     * the middle of the frame — and the usual drift is dropped with it,
     * because a survey the audience is reading should not be moving under
     * them.
     */
    camera: [{ at: 0, value: [0, 2.85, 20.4] }],
    target: [{ at: 0, value: [0, 2.85, 0] }],
    accent: [{ at: 0, value: "#7dd3ff" }],
    background: [{ at: 0, value: INK }],
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
    accent: [{ at: 0, value: "#8ea2ff" }],
    background: [{ at: 0, value: INK }],
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
    duration: 32,
    layout: "bottom",
    copy: [
      {
        at: 0,
        value: {
          title:
            "Onboarding: clients used to require manual sorting and labeling. Now it all funnels cleanly.",
        },
      },
    ],
    /*
     * Wide enough to hold the funnel, the heap under it and all three boxes
     * in one shot. The walk between them is the argument, so the camera can
     * never be tight enough to lose either end of it.
     */
    camera: [
      { at: 0, value: [0.9, 4.9, 16.6] },
      { at: 16, value: [0.3, 4.5, 15.8] },
      { at: 32, value: [0.8, 4.8, 16.4] },
    ],
    target: [
      { at: 0, value: [0.6, 3.4, 0] },
      { at: 32, value: [0.6, 3.2, 0] },
    ],

    /* Amber while it is somebody's job, green once it is nobody's. */
    accent: [
      { at: 0, value: "#ffb46b" },
      { at: 15, value: "#ffb46b" },
      { at: 17.5, value: "#7dfcc0" },
      { at: 32, value: "#7dfcc0" },
    ],
    background: [{ at: 0, value: INK }],
    act: {
      kind: "onboarding",
      handsOff: [
        { at: 0, value: 0 },
        { at: 15.4, value: 0 },
        { at: 16.6, value: 1 },
        { at: 32, value: 1 },
      ],
    },
  },
  {
    id: "missed-data",
    duration: 30,
    layout: "bottom",
    copy: [
      {
        at: 0,
        value: {
          title: "Data is currently mismatched and coming from various sources",
        },
      },
    ],
    camera: [
      { at: 0, value: [0.9, 4.9, 16.6] },
      { at: 16, value: [0.3, 4.5, 15.8] },
      { at: 32, value: [0.8, 4.8, 16.4] },
    ],

    /*
     * Added to make this compile — `target` is required on every slide, and
     * this one had a camera with nothing to look at. Aimed at the
     * architecture act, which sits lower than the funnel this camera was
     * copied from.
     */
    target: [
      { at: 0, value: [0, 3.6, 0] },
      { at: 32, value: [0, 3.4, 0] },
    ],

    accent: [
      { at: 0, value: "#ffb46b" },
      { at: 15, value: "#ffb46b" },
      { at: 17.5, value: "#7dfcc0" },
      { at: 32, value: "#7dfcc0" },
    ],
    background: [{ at: 0, value: INK }],
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
    duration: 14,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: {
          title: "The gap: two sources, joined on name alone.",
        },
      },
    ],

    camera: [
      { at: 0, value: [0, 3.4, 17.4] },
      { at: 11, value: [-0.4, 3.1, 16.6] },
      { at: 22, value: [0, 3.3, 17.2] },
    ],

    target: [
      { at: 0, value: [0, 2.1, 0] },
      { at: 22, value: [0, 1.9, 0] },
    ],

    accent: [{ at: 0, value: "#ffb46b" }],

    background: [{ at: 0, value: INK }],

    act: {
      kind: "data-gap",

      /* Pinned. The gap is the slide; it does not get solved on screen. */
      keyed: [{ at: 0, value: 0 }],
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
    duration: 16,
    layout: "bottom",

    copy: [
      {
        at: 0,
        value: { title: "Local AI: the data never has to leave the building." },
      },
    ],

    camera: [
      { at: 0, value: [0.6, 3.4, 18.6] },
      { at: 11, value: [0, 3.0, 17.8] },
      { at: 22, value: [0.5, 3.3, 18.4] },
    ],

    target: [
      { at: 0, value: [0.4, 1.9, 0] },
      { at: 22, value: [0.4, 1.7, 0] },
    ],

    accent: [{ at: 0, value: "#7dfcc0" }],

    background: [{ at: 0, value: INK }],

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
    camera: [
      { at: 0, value: [0, 4.2, 13.6] },
      { at: 7, value: [-0.4, 4.0, 13.1] },
      { at: 14, value: [0, 4.1, 13.5] },
    ],

    target: [
      { at: 0, value: [0, 3.4, 0] },
      { at: 14, value: [0, 3.2, 0] },
    ],

    accent: [{ at: 0, value: "#b08cff" }],

    background: [{ at: 0, value: INK }],

    act: {
      kind: "owned",
      /* Pinned. Already ours, already open. */
      owned: [{ at: 0, value: 1 }],
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
