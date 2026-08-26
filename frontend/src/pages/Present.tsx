import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { createCogAct } from "./present/acts/cogAct";
import { createArchitectureAct } from "./present/acts/architectureAct";
import { createDataGapAct } from "./present/acts/dataGapAct";
import { createLocalAiAct } from "./present/acts/localAiAct";
import { createOwnedAct } from "./present/acts/ownedAct";
import BlueprintPanel from "./present/BlueprintPanel";
import { createFunnelAct } from "./present/acts/funnelAct";
import { createProjectsAct } from "./present/acts/projectsAct";
import { createPipelineAct } from "./present/acts/pipelineAct";
import { createStage } from "./present/stage";
import { firstSlide, slides } from "./present/slides";
import {
  sampleColor,
  sampleIndex,
  sampleScalar,
  sampleVec3,
} from "./present/timeline";

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const wheelRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [copyIndex, setCopyIndex] = useState(0);

  /*
   * Bumping this restarts the active slide's timeline. The render loop
   * watches it rather than reading React state, so a replay costs nothing.
   */
  const restartRef = useRef(0);

  const restart = useCallback(() => {
    restartRef.current += 1;
  }, []);

  const goTo = useCallback((requested: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, requested));

    indexRef.current = nextIndex;
    setIndex(nextIndex);

    /* Landing on a slide plays its timeline from the top. */
    restartRef.current += 1;
  }, []);

  const next = useCallback(() => {
    goTo(indexRef.current + 1);
  }, [goTo]);

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
    const onboardingAct = createFunnelAct();
    const projectsAct = createProjectsAct();
    const dataGapAct = createDataGapAct();
    const localAiAct = createLocalAiAct();
    const ownedAct = createOwnedAct();

    scene.add(
      cogAct.root,
      pipelineAct.root,
      architectureAct.root,
      onboardingAct.root,
      projectsAct.root,
      dataGapAct.root,
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
    let seenRestart = restartRef.current;
    let seenCopy = -1;

    const resize = () => {
      stage.resize(mount.clientWidth, mount.clientHeight);
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
         * started together; and the onboarding ledger is write-only by
         * design, so a replay would open on a board already full of records
         * beneath a headline saying none were being kept.
         */
        cogAct.reset();
        pipelineAct.reset();
        architectureAct.reset();
        onboardingAct.reset();
        projectsAct.reset();
        dataGapAct.reset();
        localAiAct.reset();
        ownedAct.reset();
      }

      /*
       * Held at the duration rather than wrapped, so the beat settles on its
       * final state and stays there while you keep talking.
       */
      slideTime = Math.min(slideTime + delta, slide.duration);

      sampleVec3(slide.camera, slideTime, camera.position);
      sampleVec3(slide.target, slideTime, lookAt);
      camera.lookAt(lookAt);

      sampleColor(slide.accent, slideTime, accent);

      sampleColor(slide.background, slideTime, background);
      (scene.background as THREE.Color).copy(background);

      /*
       * Narrowed on the act kind, so each act only ever sees its own
       * controls and adding one cannot silently inherit another's.
       */
      cogAct.root.visible = slide.act.kind === "cog";
      pipelineAct.root.visible = slide.act.kind === "pipeline";
      architectureAct.root.visible = slide.act.kind === "architecture";
      onboardingAct.root.visible = slide.act.kind === "onboarding";
      projectsAct.root.visible = slide.act.kind === "projects";
      dataGapAct.root.visible = slide.act.kind === "data-gap";
      localAiAct.root.visible = slide.act.kind === "local-ai";
      ownedAct.root.visible = slide.act.kind === "owned";

      /*
       * Every branch is spelled out rather than letting the last act fall
       * through on an `else`. A trailing else silently adopts whatever act
       * is added next, which is a mis-render with no error attached to it.
       */
      if (slide.act.kind === "cog") {
        cogAct.setAccent(accent);
        cogAct.update(delta, {
          driverTeeth: sampleScalar(slide.act.driverTeeth, slideTime),
        });
      } else if (slide.act.kind === "pipeline") {
        pipelineAct.setAccent(accent);
        pipelineAct.update(delta, {
          automated: sampleScalar(slide.act.automated, slideTime),
        });
      } else if (slide.act.kind === "architecture") {
        architectureAct.setAccent(accent);
        architectureAct.update(delta, {
          ordered: sampleScalar(slide.act.ordered, slideTime),
        });
      } else if (slide.act.kind === "data-gap") {
        dataGapAct.setAccent(accent);
        dataGapAct.update(delta, {
          keyed: sampleScalar(slide.act.keyed, slideTime),
        });
      } else if (slide.act.kind === "local-ai") {
        localAiAct.setAccent(accent);
        localAiAct.update(delta, {
          inHouse: sampleScalar(slide.act.inHouse, slideTime),
        });
      } else if (slide.act.kind === "owned") {
        ownedAct.setAccent(accent);
        ownedAct.update(delta, {
          owned: sampleScalar(slide.act.owned, slideTime),
        });
      } else if (slide.act.kind === "onboarding") {
        onboardingAct.setAccent(accent);
        onboardingAct.update(delta, {
          handsOff: sampleScalar(slide.act.handsOff, slideTime),
        });
      } else {
        projectsAct.setAccent(accent);
        projectsAct.update(delta, {
          shown: sampleScalar(slide.act.shown, slideTime),
        });
      }

      /*
       * Copy steps at its keyframes, so React only re-renders on the handful
       * of frames where the words actually change.
       */
      const nextCopy =
        slide.copy.length > 0 ? sampleIndex(slide.copy, slideTime) : 0;

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
        cogAct.root,
        pipelineAct.root,
        architectureAct.root,
        onboardingAct.root,
        projectsAct.root,
        dataGapAct.root,
        localAiAct.root,
        ownedAct.root
      );

      cogAct.dispose();
      pipelineAct.dispose();
      architectureAct.dispose();
      onboardingAct.dispose();
      projectsAct.dispose();
      dataGapAct.dispose();
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
  const atBottom = slide.layout === "bottom";

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
  const hasCopy = !slide.bare && slide.copy.length > 0;

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
        color: "white",
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
       */}
      <BlueprintPanel visible={slide.act.kind === "owned"} />

      {!slide.bare && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            /*
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
            left: "clamp(24px, 7vw, 112px)",
            top: atBottom ? "auto" : "50%",
            bottom: atBottom ? "clamp(56px, 11vh, 132px)" : "auto",
            width: atBottom ? "min(900px, 74vw)" : "min(620px, 48vw)",
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
                  color: "rgba(245,247,255,.68)",
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
