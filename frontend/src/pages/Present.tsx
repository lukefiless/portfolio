import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { createCogAct } from "./present/acts/cogAct";
import { createArchitectureAct } from "./present/acts/architectureAct";
import { createPuzzleAct } from "./present/acts/puzzleAct";
import { createLocalAiAct } from "./present/acts/localAiAct";
import { createOwnedAct } from "./present/acts/ownedAct";
import BlueprintPanel from "./present/BlueprintPanel";
import SynopsisPanel from "./present/SynopsisPanel";
import MarketPanel from "./present/MarketPanel";
import NotesPanel, { paperEdge } from "./present/NotesPanel";
import { createBoatAct } from "./present/acts/boatAct";
import { createCabinetAct } from "./present/acts/cabinetAct";
import { createProjectsAct } from "./present/acts/projectsAct";
import { createPipelineAct } from "./present/acts/pipelineAct";
import { createStage } from "./present/stage";
import { firstSlide, slides } from "./present/slides";
import { TEXT } from "./present/palette";
import {
  sampleColor,
  sampleIndex,
  sampleScalar,
  sampleVec3,
} from "./present/timeline";

/*
 * FITTING AN ACT ONTO THE RIGHT LEAF
 *
 * A folder lying open gives its left leaf to the paper, so an act composed
 * for the whole frame ends up half underneath the sheet — and merely sliding
 * it sideways does not help, because it is still full-frame WIDE. It has to
 * be shrunk into what the paper leaves as well as moved into it.
 *
 * Both happen in the projection matrix, via `setViewOffset`, and neither
 * touches an act or a slide. Every act keeps the pose its own keyframes give
 * it and every camera track keeps its numbers; what changes is the window
 * they are seen through. The alternative was four acts' worth of hand-tuned
 * positions that would need retuning the day the sheet changed size.
 */

/** Clearance between the sheet's right edge and the act. */
const ACT_GUTTER = 0.025;

/** Where the act's box stops, as a fraction of frame width. */
const ACT_RIGHT = 0.99;

/**
 * How much of the right leaf a slide's DRAWING takes, when it carries one.
 *
 * Only `owned` does: a blueprint of the thing standing built beside it. That
 * slide used to own the whole frame and put the drawing on the left, which
 * stopped being available the moment the left leaf became the notes sheet —
 * so the pair moves over and shares the leaf it has left.
 *
 * A share of the LEAF rather than of the frame, because the leaf is what is
 * actually being divided and it changes width with the sheet.
 */
const DRAWING_SHARE = 0.36;

/**
 * The right leaf, and how it is divided.
 *
 * One function, called from two places that must agree: the render, which
 * positions the drawing in the DOM, and the loop, which frames the act into
 * what is left. Written once for the same reason `paperEdge` is — two
 * copies of this arithmetic drift the first time the sheet changes size, and
 * the failure is silent overlap rather than an error.
 *
 * Everything returned is a fraction of frame width.
 */
/**
 * The fold, as a fraction of frame width.
 *
 * Written down here because two things have to agree about it and only one of
 * them draws it: `NotesPanel` paints the seam at 50%, and everything on the
 * right leaf has to start at or after it.
 */
const FOLD = 0.5;

function leafSplit(width: number, height: number, drawing: boolean) {
  /*
   * THE LEAF BEGINS AT THE FOLD, NOT AT THE EDGE OF THE PAPER.
   *
   * `paperEdge` guards against the act creeping UNDER the sheet, and that is
   * the only thing it is good for. It is not where the right leaf starts —
   * on a large display the sheet stops growing at PAGE_HEIGHT_MAX while the
   * leaf keeps widening, so the paper's edge falls further and further short
   * of the middle. At 4K it lands at 37%, and anything anchored to it starts
   * on the LEFT leaf: the drawing was spanning 39% to 61%, straddling the
   * seam it is supposed to sit beside.
   *
   * So take whichever is further right. On a small window the sheet is the
   * binding constraint and this is `paperEdge`; on a large one the fold is,
   * and the leaf is simply the right half.
   */
  const leafLeft = Math.max(paperEdge(width, height) + ACT_GUTTER, FOLD);

  if (!drawing) {
    return { drawingLeft: 0, drawingWidth: 0, actLeft: leafLeft };
  }

  const drawingWidth = (ACT_RIGHT - leafLeft) * DRAWING_SHARE;

  return {
    drawingLeft: leafLeft,
    drawingWidth,
    actLeft: leafLeft + drawingWidth + ACT_GUTTER,
  };
}

/**
 * How far the act rides above centre, as a fraction of frame height.
 *
 * The caption sits at the foot of the same leaf, so the act gives it room the
 * way it always did on a full frame — see `atBottom` below.
 */
const ACT_LIFT = 0.045;

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const wheelRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);

  /*
   * True while the file beat is running and the cabinet, not the slide's own
   * act, is what the room is looking at.
   *
   * The render loop owns this, but `goTo` sets it too. If it were left to
   * the loop alone there would be one frame after every click where React
   * had already drawn the new slide's sheet and headline and the canvas was
   * still showing a drawer — a flash of the answer over the question.
   */
  const [entering, setEntering] = useState(Boolean(firstSlide.entry));

  /*
   * Canvas size, for the panels that have to line up with the projection.
   * Fed by the ResizeObserver already watching the mount; nothing reads it
   * every frame, so state rather than a ref is the right shape.
   */
  const [frame, setFrame] = useState({ w: 0, h: 0 });

  /*
   * Bumping this restarts the active slide's timeline. The render loop
   * watches it rather than reading React state, so a replay costs nothing.
   */
  const restartRef = useRef(0);

  const restart = useCallback(() => {
    restartRef.current += 1;
  }, []);

  /** Jump to a slide by index, clamped, and play its timeline from the top. */
  const goTo = useCallback((requested: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, requested));

    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setEntering(Boolean(slides[nextIndex].entry));

    /* Landing on a slide plays its timeline from the top. */
    restartRef.current += 1;
  }, []);

  /** Forward one slide. Bound to click, space, arrows and wheel-down. */
  const next = useCallback(() => {
    goTo(indexRef.current + 1);
  }, [goTo]);

  /** Back one slide. */
  const previous = useCallback(() => {
    goTo(indexRef.current - 1);
  }, [goTo]);

  /*
   * Keyboard controls and scroll locking.
   */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      const forwardKeys = [" ", "Enter", "ArrowRight", "ArrowDown", "PageDown"];

      const backwardKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowUp",
        "PageUp",
      ];

      if (forwardKeys.includes(event.key)) {
        event.preventDefault();
        next();
        return;
      }

      if (backwardKeys.includes(event.key)) {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        restart();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goTo, next, previous, restart]);

  /*
   * Build the stage, put act 0 on it, and animate.
   */
  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const stage = createStage(mount, firstSlide.background[0].value);
    const { scene, camera, renderer } = stage;

    camera.position.fromArray(firstSlide.camera[0].value);

    /*
     * Every act is built once and parked on the stage; slides only choose
     * which one is visible. Building on entry would stall the first second
     * of a beat behind a few hundred geometries.
     */
    const cogAct = createCogAct();
    const pipelineAct = createPipelineAct();
    const architectureAct = createArchitectureAct();
    const boatAct = createBoatAct();
    const cabinetAct = createCabinetAct();
    const projectsAct = createProjectsAct();
    const puzzleAct = createPuzzleAct();
    const localAiAct = createLocalAiAct();
    const ownedAct = createOwnedAct();

    scene.add(
      cabinetAct.root,
      cogAct.root,
      pipelineAct.root,
      architectureAct.root,
      boatAct.root,
      projectsAct.root,
      puzzleAct.root,
      localAiAct.root,
      ownedAct.root
    );

    const clock = new THREE.Clock();

    /*
     * Reused every frame so the loop allocates nothing.
     */
    const lookAt = new THREE.Vector3();
    const accent = new THREE.Color();
    const background = new THREE.Color();

    /* Seconds elapsed within the current slide's timeline. */
    let slideTime = 0;

    /* Whether the act is framed to the right leaf, and at what canvas size. */
    let leafApplied = false;
    let leafDrawing = false;
    let leafWidth = 0;
    let leafHeight = 0;
    let seenRestart = restartRef.current;
    let seenCopy = -1;
    let seenEntering: boolean | null = null;

    const resize = () => {
      stage.resize(mount.clientWidth, mount.clientHeight);

      /*
       * The render needs the canvas size too — the drawing on the `owned`
       * slide is a DOM panel positioned against the same leaf split the
       * projection uses, and it cannot ask the loop for it. Pushed from the
       * observer that was already here rather than a second one.
       */
      setFrame({ w: mount.clientWidth, h: mount.clientHeight });
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    renderer.setAnimationLoop(() => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const slide = slides[Math.min(indexRef.current, slides.length - 1)];

      if (seenRestart !== restartRef.current) {
        seenRestart = restartRef.current;
        slideTime = 0;

        /*
         * Acts carry state of their own — a trip part way through, a ledger
         * part written — and restarting the slide clock without restarting
         * theirs leaves the two disagreeing.
         *
         * Both failures are real. The pipeline hands over to its automated
         * half on a trip boundary, which is only a boundary if both clocks
         * started together; and the boat is fitted to its water from a
         * clock of its own, so a replay that restarted one and not the
         * other would open with the hull easing down out of the sky.
         */
        cogAct.reset();
        pipelineAct.reset();
        architectureAct.reset();
        boatAct.reset();
        cabinetAct.reset();
        projectsAct.reset();
        puzzleAct.reset();
        localAiAct.reset();
        ownedAct.reset();
      }

      /*
       * A slide with a file beat runs for the beat AND its own duration, so
       * the act still gets every second it was written for. `actTime` is the
       * slide's own clock: negative while the folder is still opening, which
       * is the cleanest way to say "this act has not started yet".
       */
      const entry = slide.entry;
      const entryLen = entry ? entry.duration : 0;

      /*
       * Held at the duration rather than wrapped, so the beat settles on its
       * final state and stays there while you keep talking.
       */
      slideTime = Math.min(slideTime + delta, slide.duration + entryLen);

      const inEntry = entry !== undefined && slideTime < entryLen;
      const actTime = slideTime - entryLen;

      if (seenEntering !== inEntry) {
        seenEntering = inEntry;
        setEntering(inEntry);
      }

      if (entry && inEntry) {
        sampleVec3(entry.camera, slideTime, camera.position);
        sampleVec3(entry.target, slideTime, lookAt);
      } else {
        sampleVec3(slide.camera, actTime, camera.position);
        sampleVec3(slide.target, actTime, lookAt);
      }

      camera.lookAt(lookAt);

      /*
       * Frame the act on the right leaf when the slide is an opened folder.
       *
       * Recomputed against the live canvas size rather than set once, because
       * `setViewOffset` stores the frame it was given: resize the window and
       * a stale one skews the projection instead of framing with it. The
       * compare is what keeps this from rebuilding the matrix every frame.
       */
      const wantsLeaf = Boolean(slide.notes) && !inEntry;
      const wantsDrawing = slide.act.kind === "owned" && !inEntry;
      const frameWidth = Math.max(mount.clientWidth, 1);
      const frameHeight = Math.max(mount.clientHeight, 1);

      if (
        wantsLeaf !== leafApplied ||
        wantsDrawing !== leafDrawing ||
        frameWidth !== leafWidth ||
        frameHeight !== leafHeight
      ) {
        leafApplied = wantsLeaf;
        leafDrawing = wantsDrawing;
        leafWidth = frameWidth;
        leafHeight = frameHeight;

        if (!wantsLeaf) {
          camera.clearViewOffset();
        } else {
          /*
           * The box the act has to land in, in fractions of the frame. Its
           * left edge is asked of NotesPanel rather than written down here,
           * so the act cannot creep back under the sheet when the window
           * changes shape and the sheet changes width with it.
           */
          const boxLeft = leafSplit(
            frameWidth,
            frameHeight,
            wantsDrawing
          ).actLeft;

          const boxWidth = Math.max(ACT_RIGHT - boxLeft, 0.2);

          /*
           * `setViewOffset` renders the sub-rect (offset, size) of a virtual
           * frame of `full` size. Asking for a window LARGER than the full
           * frame is the zoom-out — three.js scales the frustum by
           * size/full, and nothing in it requires that ratio to be under 1.
           */
          const zoom = 1 / boxWidth;

          /*
           * Where the enlarged frustum has to start for the act to land on
           * the box. Both of these are worth deriving rather than guessing:
           * three.js applies the offset in units of the FULL frame and then
           * scales the frustum, so the two interact, and an offset that
           * looks like the right fraction of the screen is not one.
           *
           * Solving the three.js frustum for "the un-offset image occupies
           * [boxLeft, boxRight]" gives an x offset of exactly -boxLeft, in
           * enlarged-frame units. Vertically the box is the full height, so
           * the act is centred in what is left over and then lifted to leave
           * the caption its foot of the leaf.
           */
          const offsetX = -boxLeft * zoom * frameWidth;

          const offsetY = zoom * frameHeight * (ACT_LIFT - (1 - boxWidth) / 2);

          camera.setViewOffset(
            frameWidth,
            frameHeight,
            offsetX,
            offsetY,
            zoom * frameWidth,
            zoom * frameHeight
          );
        }
      }

      sampleColor(slide.accent, Math.max(actTime, 0), accent);

      /*
       * Manila is the inside of the folder, not the room it is opened in.
       * During the beat the cabinet is on stage, so the ground is the
       * cabinet's — see `background` on SlideEntry.
       */
      if (entry && inEntry) {
        background.set(entry.background);
      } else {
        sampleColor(slide.background, actTime, background);
      }

      (scene.background as THREE.Color).copy(background);

      /*
       * Narrowed on the act kind, so each act only ever sees its own
       * controls and adding one cannot silently inherit another's.
       *
       * The cabinet is the one exception: it is on stage for its own slides
       * AND for every file beat, so it is the only act two different slides
       * can put up.
       */
      cabinetAct.root.visible = inEntry || slide.act.kind === "cabinet";

      cogAct.root.visible = !inEntry && slide.act.kind === "cog";
      pipelineAct.root.visible = !inEntry && slide.act.kind === "pipeline";
      architectureAct.root.visible =
        !inEntry && slide.act.kind === "architecture";
      boatAct.root.visible = !inEntry && slide.act.kind === "boat";
      projectsAct.root.visible = !inEntry && slide.act.kind === "projects";
      puzzleAct.root.visible = !inEntry && slide.act.kind === "puzzle";
      localAiAct.root.visible = !inEntry && slide.act.kind === "local-ai";
      ownedAct.root.visible = !inEntry && slide.act.kind === "owned";

      /*
       * Every branch is spelled out rather than letting the last act fall
       * through on an `else`. A trailing else silently adopts whatever act
       * is added next, which is a mis-render with no error attached to it.
       */
      if (entry && inEntry) {
        /*
         * The beat is two moves sharing one clock: the file that was out
         * goes back, and then the next one comes out. `handover` is the
         * moment the first is seated. With no `from`, handover is 0 and the
         * whole beat is the second move.
         */
        const returning =
          entry.from !== undefined && slideTime < entry.handover;

        const open = returning
          ? 1 - slideTime / Math.max(entry.handover, 1e-4)
          : (slideTime - entry.handover) /
            Math.max(entryLen - entry.handover, 1e-4);

        cabinetAct.setAccent(accent);
        cabinetAct.update(delta, {
          lower: entry.drawer === 0 ? 1 : 0,
          upper: entry.drawer === 1 ? 1 : 0,
          drawer: entry.drawer,
          file: returning ? (entry.from as number) : entry.file,
          open,
        });
      } else if (slide.act.kind === "cog") {
        cogAct.setAccent(accent);
        cogAct.update(delta, {
          driverTeeth: sampleScalar(slide.act.driverTeeth, actTime),
        });
      } else if (slide.act.kind === "pipeline") {
        pipelineAct.setAccent(accent);
        pipelineAct.update(delta, {
          automated: sampleScalar(slide.act.automated, actTime),
        });
      } else if (slide.act.kind === "architecture") {
        architectureAct.setAccent(accent);
        architectureAct.update(delta, {
          ordered: sampleScalar(slide.act.ordered, actTime),
        });
      } else if (slide.act.kind === "synopsis" || slide.act.kind === "market") {
        /*
         * Flat slides. Nothing to pose — every act root is already hidden by
         * the visibility lines above, because none of them match these kinds,
         * so the canvas is left showing the slide's background and the DOM
         * panel draws over it.
         */
      } else if (slide.act.kind === "cabinet") {
        cabinetAct.setAccent(accent);
        cabinetAct.update(delta, {
          lower: sampleScalar(slide.act.lower, actTime),
          upper: sampleScalar(slide.act.upper, actTime),

          /* The cabinet's own slides sit still; nothing is being taken out. */
          drawer: -1,
          file: -1,
          open: 0,
        });
      } else if (slide.act.kind === "puzzle") {
        puzzleAct.setAccent(accent);
        puzzleAct.update(delta, {
          complete: sampleScalar(slide.act.complete, actTime),
        });
      } else if (slide.act.kind === "local-ai") {
        localAiAct.setAccent(accent);
        localAiAct.update(delta, {
          inHouse: sampleScalar(slide.act.inHouse, actTime),
        });
      } else if (slide.act.kind === "owned") {
        ownedAct.setAccent(accent);
        ownedAct.update(delta, {
          owned: sampleScalar(slide.act.owned, actTime),
        });
      } else if (slide.act.kind === "boat") {
        boatAct.setAccent(accent);
        boatAct.update(delta, {
          swell: sampleScalar(slide.act.swell, actTime),
        });
      } else {
        projectsAct.setAccent(accent);
        projectsAct.update(delta, {
          shown: sampleScalar(slide.act.shown, actTime),
        });
      }

      /*
       * Copy steps at its keyframes, so React only re-renders on the handful
       * of frames where the words actually change.
       */
      const nextCopy =
        slide.copy.length > 0
          ? sampleIndex(slide.copy, Math.max(actTime, 0))
          : 0;

      if (nextCopy !== seenCopy) {
        seenCopy = nextCopy;
        setCopyIndex(nextCopy);
      }

      stage.render();
    });

    /*
     * Clean up when React leaves /present.
     */
    return () => {
      observer.disconnect();
      renderer.setAnimationLoop(null);

      scene.remove(
        cabinetAct.root,
        cogAct.root,
        pipelineAct.root,
        architectureAct.root,
        boatAct.root,
        projectsAct.root,
        puzzleAct.root,
        localAiAct.root,
        ownedAct.root
      );

      cogAct.dispose();
      pipelineAct.dispose();
      architectureAct.dispose();
      boatAct.dispose();
      cabinetAct.dispose();
      projectsAct.dispose();
      puzzleAct.dispose();
      localAiAct.dispose();
      ownedAct.dispose();
      stage.dispose();
    };
  }, []);

  /*
   * Clamped rather than indexed directly: editing the deck with the page
   * open leaves the old index behind, and reading past the end takes the
   * whole page down mid-authoring.
   */
  const slide = slides[Math.min(index, slides.length - 1)];

  /*
   * The DOM follows the same timeline as the scene, but only at the copy
   * keyframes — the canvas owns everything that changes per frame.
   */
  /*
   * This slide is a folder lying open: manila ground, sheet on the left leaf,
   * act on the right. It changes four things in the DOM — the copy moves off
   * the paper, the copy drops to the foot of its leaf, the vignette comes
   * off, and NotesPanel draws the folder.
   */
  const opened = Boolean(slide.notes) && !entering;

  /*
   * Always at the foot on an opened folder, whatever the slide asked for.
   *
   * `layout` was a choice between two ways of splitting the WHOLE frame, and
   * an open folder has already spent that choice: half the frame is paper.
   * Centred copy on the remaining half lands across the middle of the act,
   * which is the one place it cannot go. At the foot it reads as a line
   * written under a drawing, which is what it now is.
   */
  const atBottom = slide.layout === "bottom" || opened;

  /*
   * Clamped for the same reason the slide index is, and it is not
   * theoretical. `copyIndex` belongs to whichever slide was on stage when
   * the render loop last moved it, and React re-renders on the index change
   * BEFORE the loop gets a frame to recompute it. Step off a slide carrying
   * two copy keyframes onto one carrying a single keyframe and this reads
   * `copy[1]` of a one-entry track, which is undefined — and taking `.at` of
   * it throws out of render and blanks the deck mid-presentation.
   */
  const safeCopyIndex = Math.max(0, Math.min(copyIndex, slide.copy.length - 1));

  /*
   * A bare slide carries no copy at all, so there is no keyframe to read a
   * time off. The colour tracks still need sampling somewhere, and the top of
   * the timeline is the only defensible choice when nothing is being said.
   */
  const hasCopy = !slide.bare && slide.copy.length > 0 && !entering;

  const copyAt = hasCopy ? slide.copy[safeCopyIndex].at : 0;
  const copy = hasCopy ? slide.copy[safeCopyIndex].value : null;

  /*
   * Sampled at the copy keyframe's own time, not by its index — the colour
   * tracks keyframe independently, so indexing one by the other drifts them
   * out of step with the scene.
   */
  const accent = sampleColor(
    slide.accent,
    copyAt,
    new THREE.Color()
  ).getStyle();

  const background = sampleColor(
    slide.background,
    copyAt,
    new THREE.Color()
  ).getStyle();

  /**
   * Wheel and trackpad navigation, debounced.
   *
   * A trackpad flick emits a burst of events, so without the 450ms gate and the
   * deltaY floor one gesture would skip several slides at once.
   */
  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const now = performance.now();

    /*
     * Prevent trackpads from changing several slides
     * during one gesture.
     */
    if (now - wheelRef.current < 450 || Math.abs(event.deltaY) < 8) {
      return;
    }

    wheelRef.current = now;

    if (event.deltaY > 0) {
      next();
    } else {
      previous();
    }
  };

  return (
    <main
      onPointerDown={event => {
        if (event.button === 0) {
          next();
        }
      }}
      onWheel={handleWheel}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background,
        color: TEXT,
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>
        {`
          @keyframes present-enter {
            from {
              opacity: 0;
              transform: translateY(32px);
              filter: blur(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          .present-copy {
            animation:
              present-enter
              600ms
              cubic-bezier(.2, .8, .2, 1)
              both;
          }

          @media (max-width: 800px) {
            .present-frame {
              left: 24px !important;
              right: 24px;
              bottom: 92px;
              top: auto !important;
              transform: none !important;
              width: auto !important;
            }

            .present-title {
              font-size:
                clamp(2rem, min(14vw, 8.5vh), 5rem)
                !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .present-copy {
              animation-duration: 1ms;
            }
          }
        `}
      </style>

      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/*
       * The drawing half of the "own the systems" slide. Flat, in the DOM,
       * over the canvas — see BlueprintPanel for why it is not geometry.
       *
       * `!entering` matters and did not used to: this slide now opens out of
       * the cabinet like every other, and without the guard the drawing hangs
       * in front of the folder for the whole of that beat. The 3D act has
       * always been hidden during an entry; this had simply never been on a
       * slide that had one.
       *
       * Its box comes from the same `leafSplit` the projection uses, so the
       * drawing and the robot cannot land on top of each other.
       */}
      <BlueprintPanel
        visible={slide.act.kind === "owned" && !entering && frame.w > 0}
        box={leafSplit(Math.max(frame.w, 1), Math.max(frame.h, 1), true)}
      />

      {/*
       * The open folder's left leaf. A slide carrying `notes` reads as a file
       * that has been pulled out and opened; the act on the right is the
       * other half of it.
       */}
      <NotesPanel
        visible={opened}
        /*
         * The folder now shuts in three dimensions, in the beat that opens
         * the next one. So when this panel is dismissed there is already a
         * closing folder filling the canvas behind it, and the sheet has to
         * be gone by the first frame of it rather than politely wiping away
         * on top of it.
         */
        snap={Boolean(slide.entry)}
        notes={slide.notes?.lines ?? []}
        heading={slide.notes?.heading}
        accent={accent}
      />

      {/*
       * The two flat pages. Both read their content straight off the slide,
       * so the deck stays the single place any wording is edited.
       */}
      <SynopsisPanel
        visible={slide.act.kind === "synopsis"}
        role={slide.act.kind === "synopsis" ? slide.act.role : ""}
        points={slide.act.kind === "synopsis" ? slide.act.points : []}
        accent={accent}
      />

      <MarketPanel
        visible={slide.act.kind === "market"}
        roles={slide.act.kind === "market" ? slide.act.roles : []}
        accent={accent}
      />

      {!slide.bare && !opened && !entering && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            /*
             * Off during a file beat as well as on an opened folder. The
             * beat ENDS on a frame that is nothing but manila, and cuts from
             * there to a flat slide that has no vignette — so leaving it on
             * would darken the corners of the last folder frame and light
             * them again on the first flat one, which is the one cut in this
             * deck that has to be invisible.
             *
             * The corner falloff only. The left-hand wash that used to sit
             * on top of this was doing most of the damage: it darkened the
             * whole left half to hold copy legible against a lit machine,
             * and since the key and rim already fall off that way it read as
             * half the stage being switched off. Large white type on a
             * near-black ground does not need the help.
             */
            background: `
            radial-gradient(
              circle at 60% 48%,
              transparent 0 30%,
              rgba(0, 0, 0, 0.16) 66%,
              rgba(0, 0, 0, 0.55) 100%
            )
          `,
          }}
        />
      )}

      {/*
       * Positioning lives on the frame and the entrance animation on the
       * child. They cannot share an element: the animation ends on
       * transform: translateY(0) with fill-mode both, which permanently
       * overrode the centring transform and left the copy hanging off the
       * bottom of the screen.
       */}
      {hasCopy && copy && (
        <section
          className="present-frame"
          aria-live="polite"
          style={{
            position: "absolute",
            zIndex: 2,
            /*
             * On an opened folder the left leaf belongs to the paper, so the
             * headline crosses the fold onto the right one and narrows to fit
             * the leaf it is now living on.
             */
            left: opened ? "54%" : "clamp(24px, 7vw, 112px)",
            top: atBottom ? "auto" : "50%",
            bottom: atBottom ? "clamp(56px, 11vh, 132px)" : "auto",
            width: opened
              ? "min(560px, 38vw)"
              : atBottom
                ? "min(900px, 74vw)"
                : "min(620px, 48vw)",
            transform: atBottom ? "none" : "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          <div className="present-copy" key={`${slide.id}-${safeCopyIndex}`}>
            <h1
              className="present-title"
              style={{
                maxWidth: atBottom ? "24ch" : "10.5ch",
                margin: 0,
                /*
                 * Sized against whichever axis is tighter. Scaling on width
                 * alone means a wide but short window grows the type while the
                 * room to put it stays the same, which is what pushed the copy
                 * off the bottom of the screen.
                 */
                fontSize: atBottom
                  ? "clamp(1.7rem, min(3.8vw, 7vh), 4.2rem)"
                  : "clamp(2.2rem, min(6.2vw, 10.5vh), 7.2rem)",
                fontWeight: 650,
                letterSpacing: "-.065em",
                lineHeight: 0.92,
              }}
            >
              {copy.title}
            </h1>

            {copy.body && (
              <p
                style={{
                  maxWidth: "48ch",
                  marginTop: "clamp(24px, 3.4vh, 42px)",

                  /*
                   * Was a near-white, from when every slide sat on near-black.
                   * The palette moved to a light ground and this did not, so
                   * it was pale text on pale paper. Same ink as the title,
                   * held back rather than recoloured.
                   */
                  color: TEXT,
                  opacity: 0.72,
                  fontSize: "clamp(0.95rem, min(1.25vw, 2.1vh), 1.28rem)",
                  lineHeight: 1.65,
                }}
              >
                {copy.body}
              </p>
            )}
          </div>
        </section>
      )}

      <footer
        style={{
          position: "absolute",
          zIndex: 2,
          right: 40,
          bottom: 32,
          color: accent,
          fontSize: ".75rem",
          letterSpacing: ".12em",
          pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
        {" / "}
        {String(slides.length).padStart(2, "0")}
      </footer>
    </main>
  );
}
