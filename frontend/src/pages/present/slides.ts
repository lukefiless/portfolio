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
import type { DevSecOpsPart } from "./DevSecOpsHeader";
import type { AppTile } from "./AppsPanel";
import type { OpsArea } from "./OpsPanel";

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

      /**
       * Take a file out while the drawer is open, without a file BEAT.
       *
       * The `entry` mechanism at the top of a slide already does this, but it
       * always ends by opening the folder until its manila fills the frame —
       * that is what makes the cut into a project slide invisible. The handoff
       * wants the other half of the gesture: a file lifted clear of the drawer
       * and held there, going no further.
       *
       * `open` is the same 0..1 the act takes, so keep it well under 1 unless
       * the intention really is to end on a frame of nothing but folder.
       */
      present?: {
        drawer: number;
        file: number;
        open: readonly Keyframe<number>[];

        /**
         * Seconds into the slide after which nothing is presented at all.
         *
         * The file stops being drawn OUTRIGHT rather than being animated back
         * into the drawer, because there is no honest way to put it back: it
         * has just been handed to the page as the corner mark, and running the
         * lift in reverse would show the audience the deck taking it away
         * again. The cut is masked by the mark arriving over the same spot on
         * the same frame — which is the whole reason the two timings are
         * pinned to each other.
         */
        until?: number;
      };

      /**
       * 0 = the cabinet stands where it always has, 1 = it is out of frame.
       *
       * The deck's last gesture with the furniture, and only the handoff uses
       * it. Runs AFTER the file is out, so what leaves the frame is a cabinet
       * with its drawers shut and nothing left in it that the deck still
       * needs — the file it was holding is by then the page's corner mark.
       */
      exit?: readonly Keyframe<number>[];

      /**
       * 0 = the file is still the cabinet's, 1 = it is the page's corner mark.
       *
       * Runs from the moment `present.until` retires the file, so the same
       * frame that stops the cabinet posing it starts this holding it. The two
       * are one handover and have to be written as one.
       */
      park?: readonly Keyframe<number>[];
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
      kind: "security";

      /**
       * Which third of "DevSecOps" this page is, if any.
       *
       * Set, and the page is headed by the word itself with this syllable
       * brought forward and its discipline named underneath — see
       * `DevSecOpsHeader`. Three pages carry it in a row, so the heading is
       * one word being examined a part at a time rather than three unrelated
       * titles.
       *
       * Left off, the page falls back to its own `title`. The kind is shared
       * because all three pages are the same object: a ruled table of things
       * that exist, each with the place it actually lives.
       */
      part?: DevSecOpsPart;

      /** The page's headline, used only when `part` is absent. */
      title: string;

      /**
       * One line under the headline, explaining what the cells are.
       *
       * It exists so the cells do not each have to carry a "where we use it"
       * label. Said once at the top, the structure is understood for all of
       * them and the table stays quiet.
       */
      lede: string;

      /** Six is what the layout is built around; more wrap, fewer is fine. */
      measures: readonly SecurityMeasure[];

      /** Footnote. Leave empty and the rule and the line are both omitted. */
      note: string;
    }
  | {
      kind: "apps";

      /**
       * Which third of "DevSecOps" this page is. See `part` on the security
       * kind — the two pages share a head and nothing else, which is what
       * lets the run read as one document with three chapters.
       */
      part?: DevSecOpsPart;

      /** The page's headline, used only when `part` is absent. */
      title: string;

      /** One line under the heading. */
      lede: string;

      /** Five is what the layout is drawn for: three across, then two centred. */
      apps: readonly AppTile[];

      /** Footnote. Leave empty and the rule and the line are both omitted. */
      note: string;
    }
  | {
      kind: "ops";

      /**
       * Which third of "DevSecOps" this page is. See `part` on the security
       * kind — the three pages share a head and nothing below it.
       */
      part?: DevSecOpsPart;

      /** The page's headline, used only when `part` is absent. */
      title: string;

      /** One line under the heading. */
      lede: string;

      /** The claim, set large down the left. This is the pitch. */
      claim: string;

      /** A paragraph under the claim. Empty omits it. */
      support: string;

      /** The areas of the job. Five is what the rail is drawn for. */
      areas: readonly OpsArea[];

      /** The closing line, under a rule at the foot. Empty omits both. */
      note: string;
    }
  | {
      kind: "diagram";

      /** The page's headline. */
      title: string;

      /** One line under it. Empty omits it. */
      lede: string;

      /**
       * Path to the drawing, under `public/` and without it — so a file at
       * `public/diagrams/architecture.png` is "/diagrams/architecture.png".
       * Empty renders a placeholder rather than a broken image.
       */
      src: string;

      /** Alt text. Say what the diagram SHOWS. */
      alt: string;

      /** Optional note under it — a legend, a date, a caveat. */
      caption: string;
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

/**
 * One control on the security page.
 *
 * The four fields are deliberately a fixed shape rather than free text: the
 * page's whole argument is that every measure has BOTH a standard behind it
 * and a place it actually lives, and a cell that cannot show the second half
 * is a claim without evidence. `applied` is the field the room is really
 * reading.
 */
export interface SecurityMeasure {
  /** The control, in plain words. Set large; keep it to a few. */
  header: string;

  /**
   * The standard, protocol or tool behind it — "TLS 1.3", "OAuth 2.0".
   * Leave empty and the line is omitted.
   */
  subheader: string;

  /** What it is and why it matters, in a line or two. */
  description: string;

  /**
   * Where it lives in OUR system, under the divider. This is the half that
   * turns a checklist into evidence, so it is worth being specific: name the
   * service, the layer, the repo.
   */
  applied: string;
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
   * Strips the page furniture: no copy block. For a slide whose act IS the
   * whole statement and wants the frame to itself.
   */
  bare?: boolean;

  /**
   * Keep the corner mark on screen — the real file, parked against the lens.
   *
   * For every page after the handoff. The cabinet itself is not drawn on these
   * slides; only the one file it gave up, held in the corner by `cabinetAct`.
   * It needs no camera of its own, because the mark is pinned to whatever
   * camera the slide already has.
   */
  fileMark?: boolean;

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
   * The ground behind the beat, over the beat's own clock.
   *
   * A TRACK rather than one colour, so a beat CAN cross between the deck's two
   * grounds under the cover of the folder if it ever needs to. None of them
   * currently does: every beat holds the room's grey, and the manila belongs
   * to the pages either side of it.
   *
   * That was tried the other way — manila across a swap, so the corners never
   * flip while the folder crosses them — and it cost more than it fixed. A
   * beat that opens on a full screen of folder colour reads as heavy, and the
   * drawer it pulls back to is then seen against the inside of a file. The
   * corners are a smaller price than the page not opening cleanly.
   */
  background: readonly Keyframe<string>[];

  camera: readonly Keyframe<Vec3>[];
  target: readonly Keyframe<Vec3>[];

  /**
   * THE HANDOFF VARIANT.
   *
   * Present, and this beat stops being a file swap and becomes whatever these
   * tracks say — the cabinet posed directly, on the entry's own clock, before
   * the slide's page appears.
   *
   * It exists so the deck's one transition out of the cabinet does not need a
   * slide of its own. As a slide it left a blank page in the running order:
   * the cabinet leaves, and then the audience sits looking at an empty room
   * until somebody clicks. As an entry the same animation runs and the page it
   * was leading to is simply THERE when it finishes.
   *
   * `drawer`, `from`, `file` and `handover` are ignored when this is set.
   */
  handoff?: {
    /**
     * The file that is still out, and when it is back in its drawer.
     *
     * The slide before the handoff ends on an open folder filling the frame,
     * exactly as every project slide does — so this beat has to START by
     * putting that folder away, or the deck cuts from a full-frame folder to a
     * drawer that has silently swallowed it. Every other file beat does this
     * through `from`; the handoff needs its own because it goes on to open the
     * OTHER drawer rather than taking another file out of this one.
     */
    returnDrawer: number;
    returnFile: number;
    returnUntil: number;

    lower: readonly Keyframe<number>[];
    upper: readonly Keyframe<number>[];

    /** Which file comes out, and how far. See `present` on the cabinet act. */
    presentDrawer: number;
    presentFile: number;
    open: readonly Keyframe<number>[];

    /** When the file stops being the cabinet's and becomes the corner mark. */
    until: number;

    /**
     * Extra height for the file as it comes out, in drawer-local units.
     *
     * The staging pose only brings a file FORWARD, not up — see `rise` in
     * `parts/cabinet.ts`. Without this the folder held at staging projects low
     * enough to sit over the drawer beneath it, and reads as having come out
     * of the wrong one.
     */
    rise: readonly Keyframe<number>[];

    park: readonly Keyframe<number>[];
    exit: readonly Keyframe<number>[];
  };
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

    /*
     * ELEVEN, NOT SIXTEEN. Every number on this slide was cut by a third.
     *
     * The slide has one event in it — a drawer coming out — and the original
     * timing spent five seconds easing the camera down before it started and
     * another six holding on the tabs afterwards. Read aloud, the line above
     * it is over in four. What is left is the same move at a pace that keeps
     * up with the person saying it.
     */
    duration: 11,
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
      { at: 6, value: [-3.13, 4.33, 9.62] },
    ],

    target: [
      { at: 0, value: [0, 1.2, 0] },
      //{ at: 5.2, value: [-0.2, 0.4, 1.5] },
      //{ at: 10.5, value: [-0.4, -0.15, 1.9] },
      { at: 6, value: [-0.4, -0.15, 1.9] },
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
        { at: 0.9, value: 0 },
        { at: 3.4, value: 1 },
      ],

      upper: [{ at: 0, value: 0 }],
    },
  },

  {
    id: "cog",

    /*
     * CUT FROM THE RUNNING ORDER, not deleted. The act, its keyframes and its
     * copy are all still here and still typechecked.
     *
     * TO PUT IT BACK: unhide, restore "MISSION" to the head of `DONE` in
     * `acts/cabinetAct.ts`, and shift the lower drawer's file indices back up
     * by one — this slide takes file 0 with no `from`, and `how-it-arrives`
     * returns to `from: 0, file: 1`. The drawer labels and these indices are
     * two halves of the same list and have to be edited together.
     */
    hidden: true,

    entry: {
      drawer: 0,
      file: 0,
      handover: 0,
      duration: TAKE_OUT,
      background: [{ at: 0, value: BACKGROUND }],
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

    /*
     * File 0 comes out of the drawer. Nothing to put away first, because the
     * slide before this one is the contents shot — so the beat opens exactly
     * where that slide left the camera and the cut into it is invisible.
     *
     * This inherited the opening slot when `cog` was hidden. A beat with no
     * `from` is the one that OPENS a drawer, so exactly one slide per drawer
     * may be written this way; give it a `from` and it will try to file a
     * folder that was never taken out.
     *
     * AND IT TAKES THE TAKE-OUT TIMING, not the swap's.
     *
     * It kept `SWAP_CAMERA` when it inherited the slot, and that track starts
     * at `FILL_EYE` — nose to an open folder — because a swap opens on the
     * folder the previous slide left filling the frame. There is no such
     * folder here: this beat opens on the contents shot. So the slide began
     * with the lens jammed against nothing, pulled back to the drawer, and
     * only then took the file out. `TAKE_OUT_*` starts where the contents
     * slide actually leaves the camera, which is what makes the cut into it
     * invisible.
     */
    entry: {
      drawer: 0,
      file: 0,

      /* Nothing to put away, so the whole beat is the second move. */
      handover: 0,

      duration: TAKE_OUT,

      /* Out of the contents shot, which stands in the room. */
      background: [{ at: 0, value: BACKGROUND }],
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
      heading: "Automations",
      lines: [
        "Used to be one export done daily",
        "A bloated system constantly freezing",
        "It would regularly letting data expire",
        "Now the records arrive on their own",
        "A 5 minute loop keeps data modern",
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

    /* File 0 goes back, file 1 comes out. */
    entry: {
      drawer: 0,
      from: 0,
      file: 1,
      handover: SWAP_HANDOVER,
      duration: SWAP,

      /*
       * The room's ground, for the whole beat.
       *
       * Manila was tried and it is worse. It holds the ground at folder colour
       * from the first frame, so the beat opens on a full screen of manila and
       * the drawer it pulls back to is seen against the inside of a file —
       * which weighs the cut down instead of letting the page simply open.
       * What the corners do while the folder crosses them is not worth that.
       */
      background: [{ at: 0, value: BACKGROUND }],

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
      heading: "Processes",
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
    /*
     * IN FROM 20.4. The grid is framed into the right leaf of an open folder,
     * which is roughly a third of the screen, and at the old distance the six
     * mechanisms were postage stamps in the middle of it — legible, but not
     * worth looking at. A quarter closer fills the leaf and still leaves the
     * outermost cells clear of the frame edge on 16:9.
     */
    camera: [{ at: 0, value: [-1, 2.85, 16.4] }],
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
       * ON FROM FRAME ONE. No hold, no ramp, no per-cell stagger.
       *
       * The grid used to assemble itself: a beat of empty stage, then the six
       * fading up one after another. It was the only act in the deck that made
       * the audience wait to find out what the slide was, and on a page whose
       * whole job is "here is the survey" that is a cost with no return — the
       * presenter is already talking about the six by the time the sixth
       * arrives.
       */
      shown: [{ at: 0, value: 1 }],
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

    /* File 1 goes back, file 2 comes out — the last of the finished work. */
    entry: {
      drawer: 0,
      from: 1,
      file: 2,
      handover: SWAP_HANDOVER,
      duration: SWAP,

      /*
       * The room's ground, for the whole beat.
       *
       * Manila was tried and it is worse. It holds the ground at folder colour
       * from the first frame, so the beat opens on a full screen of manila and
       * the drawer it pulls back to is seen against the inside of a file —
       * which weighs the cut down instead of letting the page simply open.
       * What the corners do while the folder crosses them is not worth that.
       */
      background: [{ at: 0, value: BACKGROUND }],

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
        "Workflows are now organized and optimized to make sure no steps are missed",
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
     * BACK AND UP FROM WHERE IT WAS, because the building is now two storeys
     * tall and six and a half metres deep (see WALL_HEIGHT and BUILDING_DEPTH
     * in the act). Left at 17 units and aimed at 1.4 it grew straight off the
     * top of the leaf and the name went with it; at 19.5 the mass reached past
     * the right edge as it receded. The aim sits above the door head rather
     * than on it, which drops the whole frontage into the frame and leaves the
     * pavement its own space underneath.
     *
     * HELD, and not a keyframe missing: this slide is a folder lying open on a
     * desk, and a desk does not drift. The act's own loop is what keeps the
     * frame from reading as frozen.
     */
    camera: [{ at: 0, value: [15.2, 6.9, 21.5] }],
    target: [{ at: 0, value: [0.5, 4.4, 3] }],

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
    id: "handoff",

    /*
     * CUT FROM THE RUNNING ORDER — its animation moved onto the synopsis
     * slide's `entry`, where it plays as that page's way in rather than as a
     * slide of its own that ends on an empty room. Kept because the tracks
     * below are the authored timing, and the entry copies them.
     */
    hidden: true,
    duration: 14,
    layout: "bottom",

    /*
     * No copy. The move IS the slide, and a headline over it would be
     * narrating a gesture the room can already read.
     */
    bare: true,
    copy: [],

    /*
     * THE HANDOFF, AND WHERE THE CORNER MARK COMES FROM.
     *
     * The last project file goes back, the lower drawer shuts, the UPPER one
     * opens, and a single file rises out of it. That file is the deck's own
     * summary, and from the next slide on it is the mark in the bottom right
     * of every page — see `FileMark` — standing where the page counter used
     * to. This slide exists to show the audience where that mark came from.
     *
     * So the camera does not walk away. It climbs one drawer, the way it did
     * when this slide was the hinge into the proposal half, and pushes in on
     * the file as it clears the drawer: the last thing on screen is the thing
     * that is about to be sitting in the corner.
     *
     * The hold at the front matters. Leaving on frame zero reads as a cut;
     * letting the lower drawer finish closing first reads as being done with
     * it.
     */
    /*
     * HOLDS ON THE DRAWER. It does NOT push in to `UPPER_FILL_EYE`, which is
     * the pose a project slide ends on — that one is framed for a folder
     * opening until its manila fills the screen, and against a file merely
     * held up it puts the audience about a foot from a sheet of card.
     *
     * The file has to stay an OBJECT here, small enough to read as a thing
     * that could sit in a corner, because that is exactly where it goes next.
     */
    camera: [
      { at: 0, value: DRAWER_EYE },
      { at: 1.2, value: DRAWER_EYE },
      { at: 6.2, value: UPPER_DRAWER_EYE },
      { at: 14, value: UPPER_DRAWER_EYE },
    ],

    target: [
      { at: 0, value: DRAWER_AIM },
      { at: 1.2, value: DRAWER_AIM },
      { at: 6.2, value: UPPER_DRAWER_AIM },
      { at: 14, value: UPPER_DRAWER_AIM },
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
       * The cross. The lower is most of the way shut before the upper starts,
       * so the eye follows one drawer and is handed to the other rather than
       * being asked to watch both at once — and the two are never both still,
       * which is what would read as two events instead of one turn.
       */
      lower: [
        { at: 0, value: 1 },
        { at: 1.2, value: 1 },
        { at: 4.4, value: 0 },
      ],

      upper: [
        { at: 0, value: 0 },
        { at: 3.2, value: 0 },
        { at: 6.2, value: 1 },

        /*
         * And shut again, with the file already out. The cabinet has to leave
         * TIDY — a drawer hanging open on the way off stage reads as an
         * object being dragged away, not as one being finished with.
         */
        { at: 10.2, value: 1 },
        { at: 11.8, value: 0 },
      ],

      /*
       * The file comes out, and STOPS — SHUT.
       *
       * `open` does two things in sequence: it lifts the file clear of the
       * drawer and carries it forward, and then swings the cover open until
       * the inside fills the frame. Only the first half is wanted here. At
       * 0.4 the cover has visibly started to unfold, which is the beginning
       * of a project slide, not the end of this one — the file has to stay a
       * closed object, because the next thing it does is become an icon of
       * one. A fifth of the way is lifted and carried, and no more.
       */
      present: {
        drawer: 1,
        file: 0,
        open: [
          { at: 0, value: 0 },
          { at: 4.5, value: 0 },
          { at: 6, value: 0.28 },
          { at: 9.8, value: 0.28 },
        ],

        /* Handed to the page. See MARK_TRAVEL_DELAY — the two are one moment. */
        until: 10.2,
      },

      /*
       * AND THEN IT LEAVES.
       *
       * Starts only once the drawer is shut behind the file, so the order the
       * audience reads is: the file comes out, the cabinet is closed up, the
       * cabinet goes. Three beats in the order somebody actually does them.
       *
       * The corner mark is timed against this — see `MARK_TRAVEL_DELAY` in
       * `Present.tsx`. The file lands in the corner as the furniture clears
       * the frame, which is the whole point of the beat: what is left of all
       * that machinery is one folder on the page.
       */
      exit: [
        { at: 0, value: 0 },
        { at: 11.8, value: 0 },
        { at: 14, value: 1 },
      ],

      /* The same moment `until` retires it. One handover, two tracks. */
      park: [
        { at: 0, value: 0 },
        { at: 10.2, value: 0 },
        { at: 11.4, value: 1 },
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

    /*
     * CUT FROM THE RUNNING ORDER, not deleted. See the note on `cog`.
     *
     * It was file 0 of the UPPER drawer. With `local-ai` cut too that drawer
     * is now empty and never opens, so restoring this one means putting
     * "DATA GAP" back at the head of `PROPOSED` in `acts/cabinetAct.ts` and
     * giving the deck a slide that opens the upper drawer again — the
     * handoff slide replaced the one that used to.
     */
    hidden: true,

    /* File 0 of the upper drawer. Nothing to put away — the drawer has just
     * been opened by the slide before, so this beat starts on its contents
     * shot exactly as `cog` starts on the lower drawer's. */
    entry: {
      drawer: 1,
      file: 0,
      handover: 0,
      duration: TAKE_OUT,
      background: [{ at: 0, value: BACKGROUND }],
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

    /*
     * CUT FROM THE RUNNING ORDER, not deleted. See the note on `data-gap`.
     *
     * It was file 1 of the upper drawer, so it needs "MODERNIZE" restored to
     * `PROPOSED` after "DATA GAP" to come back.
     */
    hidden: true,

    /* File 0 goes back, file 1 comes out. */
    entry: {
      drawer: 1,
      from: 0,
      file: 1,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: [{ at: 0, value: BACKGROUND }],
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
        value: { title: "" },
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

    /*
     * CUT FROM THE RUNNING ORDER, not deleted. See the note on `cog`.
     *
     * TO PUT IT BACK: unhide and restore "HOST" to the end of `PROPOSED` in
     * `acts/cabinetAct.ts`. Nothing downstream needs reindexing — this was the
     * LAST file in the upper drawer, so removing it left no gap behind it.
     *
     * This is also the deck's only slide carrying a drawing, so `BlueprintPanel`
     * and the `DRAWING_SHARE` split in `Present.tsx` go unused while it is
     * hidden. Both are left wired up so unhiding is the whole job.
     */
    hidden: true,

    /* File 1 goes back, file 2 comes out — the last of the proposal. */
    entry: {
      drawer: 1,
      from: 1,
      file: 2,
      handover: SWAP_HANDOVER,
      duration: SWAP,
      background: [{ at: 0, value: BACKGROUND }],
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

    /*
     * THE WAY OUT OF THE CABINET.
     *
     * The deck's last cabinet beat, and it belongs to this page rather than to
     * one of its own: as a separate slide it ended on an empty room and made
     * the audience click through a blank frame to get here. As an entry the
     * same fourteen seconds play and this page is simply standing there when
     * they finish.
     *
     * Lower drawer shuts, upper opens, the summary file comes out, the file
     * becomes the corner mark, the drawer shuts behind it and the cabinet
     * leaves. `until` and `park` are one moment written twice — see the note
     * on `handoff` in `SlideEntry`.
     */
    entry: {
      /* Ignored under `handoff`, but the type asks for them. */
      drawer: 1,
      file: 0,
      handover: 0,

      /*
       * TEN, NOT FOURTEEN.
       *
       * Every keyframe below was pulled in by three tenths. The beat says four
       * things in sequence — a folder goes back, one drawer shuts and the other
       * opens, a file comes out, the cabinet leaves — and at fourteen seconds
       * each of them had a pause on either side of it. Shortened, they run into
       * one another, which is what makes it read as one gesture instead of four
       * moves waiting their turn.
       */
      duration: 9.8,

      /* The room, from the first frame. See the note on the swaps above. */
      background: [{ at: 0, value: BACKGROUND }],

      /*
       * OPENS NOSE-TO-THE-FOLDER, not on the drawer.
       *
       * The slide before this ends with ONBOARD open and filling the frame, so
       * the beat has to start from that same pose or the cut into it is
       * visible. It pulls back to the drawer as the folder shuts — which is
       * the first half of every swap in the deck — and only then climbs.
       */
      camera: [
        { at: 0, value: FILL_EYE },
        { at: SWAP_HANDOVER, value: DRAWER_EYE },
        { at: 1.5, value: DRAWER_EYE },
        { at: 4.4, value: UPPER_DRAWER_EYE },
        { at: 9.8, value: UPPER_DRAWER_EYE },
      ],

      target: [
        { at: 0, value: FILL_AIM },
        { at: SWAP_HANDOVER, value: DRAWER_AIM },
        { at: 1.5, value: DRAWER_AIM },
        { at: 4.4, value: UPPER_DRAWER_AIM },
        { at: 9.8, value: UPPER_DRAWER_AIM },
      ],

      handoff: {
        /*
         * ONBOARD goes back first. It is file 2 of the lower drawer, which is
         * what the slide before this one left open and filling the frame.
         */
        returnDrawer: 0,
        returnFile: 2,
        returnUntil: SWAP_HANDOVER,

        lower: [
          { at: 0, value: 1 },

          /* Held open until ONBOARD is back inside it. */
          { at: 1, value: 1 },
          { at: 3.2, value: 0 },
        ],

        upper: [
          { at: 0, value: 0 },
          { at: 2.2, value: 0 },
          { at: 4.4, value: 1 },
          { at: 7.1, value: 1 },
          { at: 8.3, value: 0 },
        ],

        presentDrawer: 1,
        presentFile: 0,

        open: [
          { at: 0, value: 0 },
          { at: 4.5, value: 0 },
          { at: 6, value: 0.28 },
          { at: 9.8, value: 0.28 },
        ],

        /*
         * AFTER the park has taken the file, not before.
         *
         * The act releases the file the moment `park` climbs off zero, and a
         * released file is skipped by the cabinet whatever this says — so this
         * only has to avoid being EARLIER than that. Set to the same instant
         * the ramp starts and there is a frame where the file is neither
         * presented nor taken, and the pose loop drops it back into the
         * drawer. Set after, and the two windows overlap harmlessly.
         */
        until: 8,

        /*
         * Up and clear. The drawer's half-height is 1.134, so 1.5 puts the
         * whole card above its top edge rather than half inside it — which is
         * the difference between a file being taken out of the top drawer and
         * a file appearing to hang in front of the bottom one.
         */
        rise: [
          { at: 0, value: 1.5 },
          { at: 9.8, value: 1.5 },
        ],

        park: [
          { at: 0, value: 0 },
          { at: 7.1, value: 0 },
          { at: 8, value: 1 },
        ],

        exit: [
          { at: 0, value: 0 },
          { at: 8.3, value: 0 },
          { at: 9.8, value: 1 },
        ],
      },
    },

    /* The file the handoff took out is still in the corner. */
    fileMark: true,
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
      role: "Then vs. Now",

      /*
       * Pre-filled from what the deck actually shows, in running order, so
       * the summary and the slides cannot drift apart. Rewrite freely — this
       * is the only place the wording lives.
       */
      points: [
        // {
        //   label: "Mission",
        //   note: "I want to have an impact, and I want to be able to see it",
        // },
        {
          label: "Data Then",
          note: 'Daily manual exports and imports were required to keep data "close" to live',
        },
        {
          label: "Onboarding Then",
          note: "All clients had to be manually tracked for Whose Court and On/Off Track",
        },
        {
          label: "Infrastructure Then",
          note: "Google Sheets held all company data",
        },
        {
          label: "Data Now",
          note: "All data is ingested and uploaded in sub-5 minute intervals, feeding all microservices",
        },
        {
          label: "Onboarding Now",
          note: "All clients are automatically tracked and processed automatically, with workflows now organized and optimized",
        },
        {
          label: "Infrastucture Now",
          note: "Full tech stack, server maintained, security implemented, consistent testing and monitoring",
        },
      ],
    },
  },

  /*
   * THE ARCHITECTURE
   *
   * The system as it actually stands, as a drawing. It closes the deck for the
   * same reason the security page precedes it: both are pages the room reads
   * and points at rather than watches, and this is the one somebody will ask
   * questions about.
   *
   * ------------------------------------------------------------------
   * TO PUT THE DIAGRAM IN: drop the file in `frontend/public/diagrams/`
   * and set `src` below to its path without `public` — so a file at
   * `public/diagrams/architecture.png` is "/diagrams/architecture.png".
   * SVG is worth exporting if the drawing tool offers it; it stays sharp
   * at whatever resolution the deck is projected at.
   * ------------------------------------------------------------------
   */
  {
    id: "architecture-diagram",

    /* The file the handoff took out is still in the corner. */
    fileMark: true,

    duration: 60,
    bare: true,
    copy: [],

    /* Nothing is rendered in 3D but the corner mark, which is camera-pinned. */
    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    accent: [{ at: 0, value: SAGE }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "diagram",

      title: "How it fits together.",
      lede: "",

      /*
       * Served from `public/`, so the path has no "public" in it — vite
       * serves that folder at the site root. `frontend/public/...` is the
       * path on disk, and the browser 404s on it.
       */
      src: "/diagrams/architecture.png",

      alt: "Sources feed ingest services into a Postgres database, which fans out to scheduled jobs and on to Google Sheets and Looker Studio",
      caption: "",
    },
  },

  /*
   * WHAT YOU CAN'T SEE
   *
   * The deck's last page, and the only one about work that has no picture.
   * Everything before it showed something running; this is the layer under
   * all of it, which is visible exactly once — the day it does not hold.
   *
   * It sits after the Then vs. Now summary on purpose. That page closes the
   * argument about what changed; this one answers the question a room asks
   * straight afterwards, which is whether any of it is safe.
   *
   * ------------------------------------------------------------------
   * EDIT THE TABLE HERE. Each entry is one cell: the control, the standard
   * behind it, what it is, and — under the divider — where it actually lives
   * in our system. Six is what the layout is built around; three across, two
   * down. Any field left empty is simply omitted, so a half-filled table
   * still renders cleanly while you work through it.
   *
   * The headers below are PROMPTS, not claims — they name the usual
   * categories so the shape is legible, and none of them asserts anything
   * until you fill in the rest of the cell. Replace them with what you
   * actually built, and delete any that do not apply.
   * ------------------------------------------------------------------
   */
  {
    id: "dev",

    /* The file the handoff took out is still in the corner. */
    fileMark: true,

    duration: 60,
    bare: true,
    copy: [],

    /* Nothing is rendered in 3D but the corner mark, which is camera-pinned. */
    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    accent: [{ at: 0, value: SAGE }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      /*
       * A SHELF, NOT A TABLE. The other two pages in the run are lists of
       * things that have to be true; this one is a set of things that were
       * built, and it is drawn as what they are. See `AppsPanel`.
       */
      kind: "apps",

      /* Heads the page with the word, this third of it lit. */
      part: "dev",

      /* Unused while `part` is set — the word is the heading. */
      title: "",

      lede: "Things I have built end to end, from the idea to the thing people open.",

      /* ----------------------------------------------------------------
       * EDIT THE TILES HERE. `label` is the name under the shape; `icon`
       * picks the drawing inside it, from the closed set in `AppsPanel`:
       * "fit", "referral", "meeting", "pipeline", "ai", or "app" for one
       * whose drawing is not decided yet.
       *
       * Five is what the layout is drawn for — three across, then two
       * centred — but it wraps, so six lands as two rows of three.
       * ---------------------------------------------------------------- */
      apps: [
        { label: "Atikan Fit", icon: "fit" },
        { label: "Referral Engine", icon: "referral" },
        { label: "Meeting Assistant", icon: "meeting" },
        { label: "Data Pipeline", icon: "pipeline" },
        { label: "Atikan AI", icon: "ai" },
      ],

      note: "",
    },
  },

  {
    id: "security",

    /* The file the handoff took out is still in the corner. */
    fileMark: true,
    duration: 60,
    bare: true,
    copy: [],

    /*
     * Held, and pointed nowhere in particular. The canvas is empty behind
     * this page — no act matches `security`, so every root is hidden and the
     * background is all that renders. The camera still needs a pose because
     * every slide is sampled the same way.
     */
    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    /*
     * GOLD, the deck's second accent. It marks what is unresolved or being
     * asked for — see `palette.ts` — and certifications still being worked
     * toward is exactly that.
     */
    accent: [{ at: 0, value: GOLD }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      kind: "security",

      /* The middle third of the run. See `part`. */
      part: "sec",

      title: "Security Rules",
      lede: "The compliance that has already been accounted for.",

      measures: [
        {
          header: "Regulation S-P",
          subheader: "17 CFR Part 248 · SEC",
          description:
            "The privacy, safeguards, and dispoal rule for financial institutions.",
          applied: "Passwords encrypted, Two-Factor Authentication,",
        },
        {
          header: "Advisers Act Rule SEC 204-2",
          subheader: "Books & Records Rule",
          description:
            "Required to make and preserve accurate and accessible records.",
          applied:
            "Actions logged, CRM entries to users, raw data never overwritten, data-quality reports, ownership registry",
        },
        {
          header: "Advisers Act Rule 206(4)-7",
          subheader: "Compliance Rule",
          description:
            "Requires written compliance policies and procedures to prevent violations",
          applied:
            "Complete change history log, structural tests, 650+ automated functional tests, code-quality gate",
        },
        {
          header: "SEC Regulation S-ID",
          subheader: "Identity Theft Red Flags",
          description:
            "Requires a program to detect, prevent, and mitigate identity theft in covered accounts, including detecting patterns that indicate hacking attempts",
          applied: "Account lockouts, IP Monitoring",
        },
        {
          header: "SOC 2",
          subheader: "Framework",
          description: "An audit standard organized around trust criteria.",
          applied: "SSH by public key only",
        },
        {
          header: "SEC and FINRA recordkeeping",
          subheader: "Rule 204-2 · FINRA 4511 / 3110",
          description:
            "Business communications must be captured and retained in reviewable form.",
          applied:
            "User-API keys held secure, manage who posts by who took an action",
        },
        {
          header: "CCPA / CPRA",
          subheader: "California",
          description: "California's privacy statutes.",
          applied:
            "Documented inventory of sensitive data held, no biometric data held",
        },
        {
          header: "Gramm-Leach-Bliley Act",
          subheader: "Safeguards",
          description:
            "Financial institutions are required to protect the security and confidentiality of customer inforamtion.",
          applied: "",
        },
        {
          header: "Ohio Data Protection Act",
          subheader: "Ohio Rev. Code 1354 · SB 220",
          description:
            "A legal defence to data-breach claims for organisations that implement a recognised cybersecurity framework and maintain it.",
          applied: "",
        },
        {
          header: "State Breach Notification",
          subheader: "CA Civil Code 1798.82 · Ohio 1349.19",
          description:
            "Both states require notifying affected residents after a breach of personal information.",
          applied: "",
        },
      ],

      /*
       * The footnote. The words "Working toward" are already set in the
       * accent by the panel, so start this string with the certifications
       * themselves — "CompTIA Security+, and AWS Certified Security..." —
       * rather than repeating the lead-in. Leave it empty to drop the
       * footnote and its rule entirely.
       */
      note: "CompTIA Security+ and AWS Certified Security – Specialty, both targeted for this year.",
    },
  },

  {
    id: "ops",

    /* The file the handoff took out is still in the corner. */
    fileMark: true,

    duration: 60,
    bare: true,
    copy: [],

    /* Nothing is rendered in 3D but the corner mark, which is camera-pinned. */
    camera: [{ at: 0, value: [0, 3, 18] }],
    target: [{ at: 0, value: [0, 2, 0] }],

    /*
     * GOLD, like the security page. It is the deck's mark for what is being
     * ASKED FOR rather than reported — see `palette.ts` — and this page is the
     * only one in the deck that asks for something outright.
     */
    accent: [{ at: 0, value: GOLD }],
    background: [{ at: 0, value: BACKGROUND }],

    act: {
      /*
       * A CLAIM AND AN ARC, not a table. This is the page that says the job is
       * bigger than the code, so it is the one page in the deck that argues in
       * the first person. See `OpsPanel`.
       */
      kind: "ops",

      /* Heads the page with the word, this third of it lit. */
      part: "ops",

      /* Unused while `part` is set — the word is the heading. */
      title: "",

      /* ----------------------------------------------------------------
       * EDIT THIS PAGE HERE. Everything below is the wording, and all of
       * it is a first draft written from the brief — say it the way you
       * would say it in the room.
       *
       * `claim` is the pitch, set large down the left. `support` backs it
       * up in a sentence or two. `areas` is the rail: the label is the
       * area, the note is what is actually DONE in it — that is the half
       * that turns an offer into a job description. `note` is the closing
       * line, under a rule at the foot.
       *
       * The rail is not numbered, on purpose. These run at the same time;
       * numbering them would say they happen in an order. See `OpsPanel`.
       * ---------------------------------------------------------------- */
      lede: "The half of the job that never ships as code.",

      claim: "I want the work around the systems, not just the systems.",

      support:
        "Someone has to answer the phone, chase the paperwork, run the seminar and call the client back. I would rather be that person than hand the process to somebody else once I have built it.",

      areas: [
        {
          label: "Client support",
          note: "Own the queue: every request logged with an owner and a due date, so nothing sits waiting for somebody to notice it. I will build that system and then work it.",
        },
        {
          label: "On the phone",
          note: "Scheduling, review reminders, missing paperwork, event RSVPs, checking in after a meeting. I will make the calls, and every one of them lands back on the client record.",
        },
        {
          label: "The day-to-day",
          note: "The call list, the calendar, the follow-ups, account and vendor admin — the recurring work that decides whether a week runs smoothly or gets rescued on Friday.",
        },
        {
          label: "Client events and seminars",
          note: "Plan it, fill the room from the CRM rather than from memory, run the day, and get every attendee back into the system the same week with a next action.",
        },
        {
          label: "Whatever is not getting done",
          note: "The unglamorous half of an operation is usually the part nobody owns. I am happy to be the person who owns it, and to write down how it works so it survives me.",
        },
      ],

      note: "This is sales and service work, and I want it — with the systems already built to make it repeatable.",
    },
  },

  {
    id: "market",

    /*
     * CUT FROM THE RUNNING ORDER, not deleted — the rows below are real and
     * worth keeping. Unhide to bring the job comparison back.
     */
    hidden: true,

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

    /* CUT FROM THE RUNNING ORDER, and empty besides. See the note on `market`. */
    hidden: true,

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
