/**
 * ACT — THE CABINET
 *
 * The deck opens on a filing cabinet and, a slide later, on its lower drawer
 * pulled out with every finished project filed inside under a handwritten
 * tab.
 *
 * THE DRAWER IS THE CONTENTS PAGE
 *
 * That is the whole reason this act exists. A bulleted list of the same
 * projects is something written FOR a presentation; a drawer of files that
 * were already labelled is something that was already there. The claim the
 * deck needs to make in its first thirty seconds is "this is a body of work",
 * and a drawer makes it before a word is read.
 *
 * IT ALSO OPENS THE FILES
 *
 * Each project slide begins by putting the last file away and taking the
 * next one out: it lifts clear of the drawer, carries forward, and the cover
 * swings open until the inside is bigger than the frame. The deck then cuts
 * to that slide's flat layout, whose ground is the same manila — so the cut
 * lands on two frames that are both nothing but folder, and nobody sees it.
 *
 * That beat is driven from the SLIDE, through `entry` in `slides.ts`, not
 * from here. This act only knows how to hold a pose: which drawer is out,
 * which file is being presented, and how far through it is. What the file
 * means, and when, belongs to the deck.
 *
 * WHAT IS DELIBERATELY LEFT TO THE SLIDE
 *
 * The zoom into the drawer is CAMERA, not geometry, and so it lives in
 * `slides.ts` as keyframes like every other camera move in this deck. The act
 * only knows how far each drawer is out. Two slides sharing a continuous move
 * simply means the first one's last camera keyframe equals the second one's
 * first — which is how the opening shot and the contents page are joined.
 */

import * as THREE from "three";

import type { Act } from "./act";

import { SAGE_HEX, TEXT_HEX } from "../palette";
import { clamp01, smootherstep } from "../parts/easing";
import { markUndrawn } from "../layers";
import { createCabinet, FILE_H, FILE_W, type Cabinet } from "../parts/cabinet";

/**
 * The lower drawer: work already done.
 *
 * In running order, so the drawer reads top to bottom in the order the deck
 * opens them. `architecture` is not here because its slide is still hidden,
 * and neither is "MISSION" — the `cog` slide it belonged to is hidden too.
 *
 * THESE ARRAYS ARE ONE HALF OF A PAIR. The other half is the `file` index on
 * every slide's `entry` in `slides.ts`, which indexes straight into them. A
 * label removed here without reindexing there hands a slide the wrong folder,
 * silently — nothing typechecks the two against each other. Edit them
 * together, and see the note on `cog` in `slides.ts` for the whole procedure.
 */
const DONE = [
  { label: "automate" },
  { label: "processes" },
  { label: "onboard" },
];

/**
 * The upper drawer.
 *
 * ONE FILE, and it is not a slide. The three that used to live up here — DATA
 * GAP, MODERNIZE and HOST — are all hidden, so this drawer no longer holds a
 * proposal; it holds the deck's own summary, and the handoff slide opens it,
 * takes that file out, and hands it to the corner of the page as the mark
 * every remaining slide is stamped with.
 *
 * That is why the drawer stayed in the carcass when it emptied. Restoring any
 * of the three hidden slides means adding its label back here AND giving it
 * the right `file` index in `slides.ts` — this entry is index 0.
 */
const PROPOSED = [
  /*
   * THE ONE LABEL THAT ANSWERS THE OTHER DRAWER.
   *
   * The lower drawer's three tabs say what was built. This one says what the
   * deck is for, and it is the only word the upper drawer ever shows — so the
   * moment that drawer runs out, the room has read the turn before a word is
   * said about it.
   *
   * It carried no writing at all for a while, on the argument that this file
   * is never opened and ends up as the corner mark at a size where a word on
   * the tab is a smear. Both halves of that are still true, and neither is a
   * reason for the tab to be blank while it is IN THE DRAWER, which is the
   * only time anybody can read it: `release` takes the lettering off the
   * moment the file parks in the corner — see `labelMesh` in `parts/cabinet`
   * — and `restore` puts it back if the file ever returns. The label is
   * therefore only ever on screen at a size it can be read at.
   */
  { label: "what’s next" },
];

export interface CabinetState {
  /**
   * Which drawer the presented file is in (0 lower, 1 upper), and which file
   * in it. Either at -1 presents nothing, which is the resting cabinet.
   */
  drawer: number;
  file: number;

  /** 0 = that file is shut in its drawer, 1 = out, open and filling frame. */
  open: number;

  /**
   * 0 = both drawers shut, 1 = the lower drawer fully out.
   *
   * The upper drawer has its own track rather than sharing this one. A single
   * "which drawer" number cannot express the moment that matters most — one
   * drawer sliding shut while the other opens — and the deck needs that to
   * carry the turn from finished work to proposed work.
   */
  lower: number;

  /** 0 = shut, 1 = the upper drawer fully out. */
  upper: number;

  /**
   * 0 = the presented file is still the cabinet's, 1 = it is the corner mark.
   *
   * Parking RELEASES the file from the cabinet for good and pins it to the
   * camera instead, so it holds the same corner of the frame whatever pose the
   * slide is holding — including on slides that draw no cabinet at all.
   */
  park: number;

  /** Whether the cabinet body is drawn. The parked file is not part of it. */
  carcass: boolean;

  /**
   * Extra height for the presented file, in drawer-local units.
   *
   * Only the handoff uses it, and it is what makes that beat legible: see the
   * note on `rise` in `parts/cabinet.ts`. Zero everywhere else, which is every
   * ordinary file beat.
   */
  rise: number;

  /**
   * 0 = standing where it has stood all deck, 1 = slid clear of the frame.
   *
   * The deck's last gesture with the cabinet. It is a property of the SLIDE
   * rather than of the act because only one slide ever asks for it — the
   * handoff, which takes a file out and then gets the furniture out of the
   * way so the file can become the page's corner mark.
   */
  exit: number;
}

/**
 * Implements the deck-wide act contract. See `acts/act.ts` for the
 * lifecycle and the four rules every act follows.
 *
 * Note the deviation from rule 3: this act takes more than one number. Two
 * drawers cannot be described by a single "which drawer" value — see
 * `CabinetState` — and the file coming out is a third movement again,
 * running while a drawer is already open.
 */
export type CabinetAct = Act<CabinetState>;

/**
 * Where the cabinet goes when it leaves, in the act's own units.
 *
 * Right and back rather than straight sideways: leaving along the camera's
 * own axis as well as across it means the cabinet recedes as it goes, which
 * reads as being put away rather than as being dragged off a stage.
 *
 * Generously past the frame edge. Sized to clear it from the CLOSEST pose the
 * handoff holds, not the average one — at sixteen the far corner of the
 * carcass was still hanging in shot on the last frame, and a cabinet that is
 * ninety percent gone reads as a bug rather than as an exit.
 */
const EXIT_TRAVEL = new THREE.Vector3(26, -2.5, -10);

/**
 * WHERE THE PARKED FILE SITS, IN THE CAMERA'S OWN FRAME.
 *
 * Pinned to the lens rather than to the room, which is the only way a mark can
 * hold one corner of the screen across slides that each point the camera
 * somewhere different. Every frame the file is placed this far in front of the
 * camera, offset by the share of the frame below, and turned to face it.
 *
 * The offsets are in NDC — -1 is the left or bottom edge, +1 the right or top
 * — so they say where on the SCREEN it goes and stay true at any aspect the
 * deck is projected at.
 */
const PARK_DISTANCE = 14;

/*
 * EXPORTED, because the slide number is drawn ON this file by `FileMark` and
 * has to land on the same spot. Two copies of these numbers drift the first
 * time the corner is nudged, and the failure is a number floating beside the
 * folder rather than on it.
 */
export const PARK_NDC_X = -0.87;
export const PARK_NDC_Y = -0.84;

/** Small enough to read as a mark rather than as a prop still on stage. */
const PARK_SCALE = 0.32;

export function createCabinetAct(camera: THREE.PerspectiveCamera): CabinetAct {
  const root = new THREE.Group();

  /*
   * Sat low and turned a few degrees off square. Straight on, a box of
   * drawers is a rectangle; a little rotation gives the carcass a visible
   * side and the drawers somewhere to travel toward the viewer.
   */
  root.position.set(0, 0.4, 0);
  root.rotation.y = -0.34;

  const accent = new THREE.Color(SAGE_HEX);

  /* Scratch for the mark's facing. Rule 1 in `act.ts`. */
  const spin = new THREE.Quaternion();

  const cabinet: Cabinet = createCabinet({
    lower: DONE,
    upper: PROPOSED,
  });

  root.add(cabinet.root);

  /*
   * Holder for the file once it has left the cabinet.
   *
   * A sibling of the carcass rather than a child, so the cabinet's exit slide
   * does not carry the mark off with it — the whole point of the beat is that
   * the furniture goes and the file stays.
   */
  const markGroup = new THREE.Group();
  markGroup.visible = false;
  root.add(markGroup);

  /*
   * THE MARK'S SHADOW.
   *
   * A card lying on a page has one, and without it the folder in the corner is
   * a flat shape printed on the ground rather than an object resting on it.
   * The deeper paper the file is repapered with on the way out (see
   * `markMaterial` in `parts/cabinet.ts`) gives it contrast; this gives it a
   * place to sit.
   *
   * Drawn rather than cast. A real shadow needs a light and a surface to fall
   * on, and this file is pinned to the LENS — it hangs in front of whatever
   * the slide's camera happens to be looking at, which on a flat page is
   * nothing at all. So it is a rectangle of the deck's ink at low alpha,
   * sized off the card and offset down and right, exactly as a printed drop
   * shadow would be.
   *
   * `depthWrite` off so it never occludes anything behind it, and a child of
   * the mark so it travels, turns and scales with the card without a second
   * line of maths anywhere in `update`.
   */
  const shadeGeometry = new THREE.PlaneGeometry(FILE_W, FILE_H);

  const shadeMaterial = new THREE.MeshBasicMaterial({
    color: TEXT_HEX,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });

  const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
  shade.position.set(0.26, -0.26, -0.08);
  markGroup.add(shade);

  /*
   * THE CABINET IS NOT A DRAWING.
   *
   * Everything else on this stage is inked and washed onto paper; this is the
   * one object that stays a solid, lit thing. That is the deck's own argument
   * made in the finish rather than in the copy — the cabinet and the files in
   * it are what already exists, and what comes OUT of a file is a drawing of
   * something proposed. Outline the cabinet too and there is nothing left for
   * the drawn look to mean.
   *
   * It also protects the ending of every file beat. The folder opens until its
   * manila fills the frame and the deck cuts to a flat slide of the same
   * manila; a wash over the folder but not over that background — or the
   * reverse — turns the deck's one invisible cut into its most visible one.
   *
   * Marked AFTER `root.add`, and by traversal, because layers are not
   * inherited. See `markUndrawn`.
   */
  markUndrawn(root);

  /**
   * One frame. Both drawers are posed every frame from the slide's tracks;
   * nothing here keeps time of its own.
   */
  /* Scratch, reused every frame. Rule 1 in `act.ts`. */
  const parkWorld = new THREE.Vector3();
  const camRight = new THREE.Vector3();
  const camUp = new THREE.Vector3();
  const camForward = new THREE.Vector3();

  /** Which file is currently parked, so the reparent happens once. */
  let parkedDrawer = -1;
  let parkedFile = -1;

  /*
   * WHERE THE FILE WAS WHEN THE CABINET LAST HELD IT.
   *
   * Watched every frame while a file is presented, because the moment the
   * handoff takes it the cabinet has already stopped posing it — so asking
   * then would give the pose it fell back to, not the one the audience was
   * looking at. Recording it continuously means the travel to the corner
   * always starts from the exact frame the file was handed over on.
   */
  const heldPos = new THREE.Vector3();
  const heldQuat = new THREE.Quaternion();
  let heldScale = 1;

  /* The pose the travel starts from, in the act's own space. */
  const fromPos = new THREE.Vector3();
  const fromQuat = new THREE.Quaternion();
  let fromScale = 1;

  const targetQuat = new THREE.Quaternion();

  /**
   * Take the file out of the cabinet and hold it, or give it back.
   *
   * Reparenting is done ONCE on each transition rather than every frame:
   * `Object3D.add` is a splice out of one child array and a push onto
   * another, and doing that sixty times a second to the same object is both
   * wasted work and a good way to lose track of who owns the transform.
   */
  const setParked = (drawer: number, file: number) => {
    if (parkedDrawer === drawer && parkedFile === file) {
      return;
    }

    if (parkedDrawer >= 0) {
      /* The cabinet puts it back in its own drawer. See `restore`. */
      cabinet.restore(parkedDrawer, parkedFile);
    }

    parkedDrawer = drawer;
    parkedFile = file;

    if (drawer >= 0) {
      const group = cabinet.release(drawer, file, markGroup);

      if (group) {
        /*
         * The travel's starting pose, converted out of world space into the
         * act's. `markGroup` is a child of the act root, so this is the frame
         * its position and rotation are actually expressed in.
         */
        fromPos.copy(heldPos);
        root.worldToLocal(fromPos);

        root.getWorldQuaternion(spin);
        fromQuat.copy(spin).invert().multiply(heldQuat);

        fromScale = heldScale;
      }
    }

    markGroup.visible = drawer >= 0;
  };

  const update = (_delta: number, state: CabinetState) => {
    cabinet.setDrawers(state.lower, state.upper);
    cabinet.setPresented(state.drawer, state.file, state.open, state.rise);
    cabinet.setExit(state.exit, EXIT_TRAVEL);

    cabinet.root.visible = state.carcass;

    /*
     * Watch the presented file while the cabinet still owns it. See `heldPos`.
     */
    if (state.drawer >= 0 && state.file >= 0) {
      const held = cabinet.fileGroup(state.drawer, state.file);

      if (held) {
        held.getWorldPosition(heldPos);
        held.getWorldQuaternion(heldQuat);
        heldScale = held.scale.x;
      }
    }

    /*
     * ON THE RAMP ALONE, and deliberately not also on the slide having stopped
     * presenting the file.
     *
     * Those two do not land on the same frame: `until` retires the file the
     * instant it passes, while `park` needs a frame or two to climb off zero.
     * In that gap the file was neither presented nor released, so the pose
     * loop reset it — and the folder visibly dropped back into the drawer
     * before reappearing in the corner. Releasing on the ramp alone closes the
     * gap: once taken, the file is skipped by the cabinet whatever the slide
     * still says about it.
     */
    const parking = state.park > 0.001;

    setParked(parking ? 1 : -1, parking ? 0 : -1);

    if (!markGroup.visible) {
      return;
    }

    /* --------------------------------------------- pin it to the lens */

    camera.updateMatrixWorld();
    camera.matrixWorld.extractBasis(camRight, camUp, camForward);

    /* extractBasis hands back -forward, since a camera looks down its -Z. */
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const halfWidth = halfHeight * camera.aspect;

    parkWorld
      .copy(camera.position)
      .addScaledVector(camForward, -PARK_DISTANCE)
      .addScaledVector(camRight, PARK_NDC_X * halfWidth * PARK_DISTANCE)
      .addScaledVector(camUp, PARK_NDC_Y * halfHeight * PARK_DISTANCE);

    root.worldToLocal(parkWorld);

    /*
     * Square to the lens. The file spent the whole deck being looked at from
     * wherever the cabinet happened to be; as a mark it is a flat thing on the
     * page and has to read that way from any slide's camera.
     */
    root.getWorldQuaternion(spin);
    targetQuat.copy(spin).invert().multiply(camera.quaternion);

    /*
     * IT TRAVELS. Position, turn and size are all carried from where the
     * cabinet was holding the file to where the page keeps it, over the park
     * ramp — the file crosses the frame rather than being gone from one place
     * and present in another. Eased on the deck's house curve so it leaves and
     * arrives with no velocity, the way every other move in here does.
     */
    const journey = smootherstep(clamp01(state.park));

    markGroup.position.lerpVectors(fromPos, parkWorld, journey);
    markGroup.quaternion.slerpQuaternions(fromQuat, targetQuat, journey);
    markGroup.scale.setScalar(
      THREE.MathUtils.lerp(fromScale, PARK_SCALE, journey)
    );

    /*
     * AND THE PAPER DEEPENS ON THE WAY, on the same eased number as the move.
     *
     * The file has to change colour at some point — manila is invisible
     * against the page's ground, which is what the mark colour exists to fix
     * — but it used to change the instant it was released, standing still, and
     * then set off. That read as two things happening: a folder going a
     * different colour, and then a folder flying. Carried on `journey` it is
     * one thing, and the recolour is hidden inside a move the eye is already
     * following. See `setMarkBlend`.
     */
    cabinet.setMarkBlend(journey);
  };

  const setAccent = (color: THREE.Color) => {
    accent.copy(color);
    cabinet.setAccent(accent);
  };

  /**
   * Nothing accumulates. Both drawer positions are pure functions of the
   * slide's tracks, so landing on the slide already puts them where they
   * belong and there is nothing left to undo.
   */
  const reset = () => {
    cabinet.setPresented(-1, -1, 0);
  };

  const dispose = () => {
    cabinet.dispose();
    shadeGeometry.dispose();
    shadeMaterial.dispose();
  };

  return { root, update, setAccent, reset, dispose };
}
