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

import { SAGE_HEX } from "../palette";
import { createCabinet, type Cabinet } from "../parts/cabinet";

/**
 * The lower drawer: work already done.
 *
 * These are the deck's acts 0 to 3 plus the six-project survey, in running
 * order, so the drawer reads top to bottom in the order the deck opens them.
 * `architecture` is not here because its slide is still hidden.
 */
const DONE = [
  { label: "MISSION" },
  { label: "AUTOMATE" },
  { label: "PROCESSES" },
  { label: "ONBOARD" },
];

/**
 * The upper drawer: what is being proposed.
 *
 * Opened second, after the lower drawer has been worked through, which is the
 * deck's whole shape — here is what was built, and here is what is next.
 */
const PROPOSED = [
  { label: "DATA GAP" },
  { label: "MODERNIZE" },
  { label: "HOST" },
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

export function createCabinetAct(): CabinetAct {
  const root = new THREE.Group();

  /*
   * Sat low and turned a few degrees off square. Straight on, a box of
   * drawers is a rectangle; a little rotation gives the carcass a visible
   * side and the drawers somewhere to travel toward the viewer.
   */
  root.position.set(0, 0.4, 0);
  root.rotation.y = -0.34;

  const accent = new THREE.Color(SAGE_HEX);

  const cabinet: Cabinet = createCabinet({
    lower: DONE,
    upper: PROPOSED,
  });

  root.add(cabinet.root);

  /**
   * One frame. Both drawers are posed every frame from the slide's tracks;
   * nothing here keeps time of its own.
   */
  const update = (_delta: number, state: CabinetState) => {
    cabinet.setDrawers(state.lower, state.upper);
    cabinet.setPresented(state.drawer, state.file, state.open);
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
  };

  return { root, update, setAccent, reset, dispose };
}
