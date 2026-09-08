/**
 * THE STAGE
 *
 * A dark studio void with a three-point rig: a warm key from the upper front
 * left, a cool rim from behind to separate the object from the background,
 * and a low fill so the shadow side never goes fully black.
 *
 * The rig is deliberately RESTRAINED. Every intensity here is roughly half
 * what it was before the composer went in, because bloom thresholds linear
 * light and an over-lit stage blooms its own furniture. Warm key against
 * cool rim is what is doing the work now, not brightness.
 *
 * Every act is lit by this rig, which is what makes acts built weeks apart
 * still look like one presentation. Tune here, not in an act.
 *
 * THE FINISH
 *
 * Rendering goes through a composer rather than straight to the canvas, for
 * one reason: bloom. It is the single largest difference between a scene that
 * looks like a WebGL demo and one that looks like a product film. Every lit
 * surface in this deck is an unlit material at full brightness — screens,
 * status bands, pips, record dots — and with a threshold above the diffuse
 * range those are the ONLY things that bloom. Metal picks up a highlight, the
 * lit parts pick up a halo, and nothing else changes.
 *
 * Threshold is the setting that matters. Drop it and the whole image glows
 * and turns to soup; hold it high and the effect is a sheen on exactly the
 * things that are meant to be emitting.
 *
 * THE INK-AND-WASH PASS IS NOT IN THE CHAIN
 *
 * `sketch.ts` is still in the repo and still works: a pen line on every
 * silhouette and crease, a wash toward the paper colour, a tooth of grain. It
 * is simply not added below any more — the deck wants its acts lit and
 * coloured rather than drawn.
 *
 * TO PUT IT BACK: import `createSketchPass` and its `SketchOptions`, restore
 * the `SKETCH` block of numbers, add the pass BETWEEN bloom and `OutputPass`,
 * and dispose it alongside the composer. The pass's own header explains why
 * both of those neighbours are load-bearing.
 *
 * The one thing that must stay behind either way is the camera's layer mask —
 * see below. That used to be done inside the pass, which meant removing the
 * pass took half the scene with it.
 */

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

import { NO_INK_LAYER, UNDRAWN_LAYER } from "./layers";

/*
 * Slides are composed against 16:9, the aspect a projector will actually
 * present at.
 */
const DESIGN_ASPECT = 16 / 9;
const DESIGN_FOV = 38;

/* ------------------------------------------------- the canvas's own ground
 *
 * THE DOM CANNOT JUST USE THE HEX THE SLIDE ASKED FOR.
 *
 * A slide names its ground as a colour — `#E7E3E0` — and the canvas paints it
 * through the tone mapping set up below, which is not an identity: measured,
 * that hex leaves the renderer as rgb(219, 218, 217). Anything in the DOM that
 * has to sit flush against the canvas and read as the same surface — the band
 * over the contents shot, the veil that covers a file beat's seam — therefore
 * cannot paint the slide's hex. It has to paint what the canvas paints.
 *
 * So the curve is run here too. This is three.js's own ACES fit, transcribed
 * from `tonemapping_pars_fragment.glsl.js`, wrapped in the sRGB decode and
 * encode the renderer does either side of it. It agrees with the canvas to the
 * byte on every colour in the palette, and it is the reason `EXPOSURE` is a
 * constant rather than a literal on the renderer: the two must not drift.
 */

/** The renderer's exposure, and the JS curve's. One number, one place. */
const EXPOSURE = 1.02;

const ACES_INPUT = [
  [0.59719, 0.35458, 0.04823],
  [0.076, 0.90834, 0.01566],
  [0.0284, 0.13383, 0.83777],
];

const ACES_OUTPUT = [
  [1.60475, -0.53108, -0.07367],
  [-0.10208, 1.10813, -0.00605],
  [-0.00327, -0.07276, 1.07602],
];

const apply = (m: number[][], v: number[]) =>
  m.map(row => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);

/** three.js's `RRTAndODTFit`, per channel. */
const rrtAndOdtFit = (v: number) => {
  const a = v * (v + 0.0245786) - 0.000090537;
  const b = v * (0.983729 * v + 0.432951) + 0.238081;

  return a / b;
};

const toSrgb = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;

/**
 * The colour the CANVAS ends up showing for a scene background of `css`.
 *
 * Give it anything `THREE.Color` parses and it returns an `rgb(...)` string
 * for the DOM. See the note above: this is the tone-mapped ground, not the
 * colour the slide asked for, and the two are visibly different.
 */
export function screenColor(css: string): string {
  const linear = new THREE.Color(css);

  /*
   * `THREE.Color` with the default colour management already holds the value
   * in the working (linear) space, so the decode is not repeated here — its
   * `r`, `g` and `b` are what the shader receives. The exposure divide by 0.6
   * is three.js's, not a fudge: it is inside `ACESFilmicToneMapping`.
   */
  const exposed = [linear.r, linear.g, linear.b].map(c => c * (EXPOSURE / 0.6));

  const fitted = apply(ACES_INPUT, exposed).map(rrtAndOdtFit);

  const out = apply(ACES_OUTPUT, fitted).map(c =>
    Math.round(Math.min(Math.max(toSrgb(Math.min(Math.max(c, 0), 1)), 0), 1) * 255)
  );

  return `rgb(${out[0]}, ${out[1]}, ${out[2]})`;
}

/**
 * How many buffer pixels the deck draws per CSS pixel, along each axis.
 *
 * SUPERSAMPLING, and the reason it is worth the fill rate rather than MSAA:
 * `antialias: true` on the renderer below does nothing on its own, because the
 * scene never reaches the default framebuffer and that flag's multisampling is
 * bypassed the moment a composer is in play. Drawing the whole chain larger and
 * letting the final blit average it down is what smooths edges instead.
 *
 * At 2 the deck draws four pixels for every one it shows.
 */
const RENDER_SCALE = 2;

/**
 * Ceiling on total buffer pixels, before the scale is given up.
 *
 * Roughly a 4K frame. Without it the scale multiplies against a display that
 * is already dense: a 4K panel at ratio 2 asks for 33 megapixels, and at
 * RGBA16F across the composer's two buffers and the bloom chain, that is
 * most of a gigabyte for a slide deck.
 */
const MAX_BUFFER_PIXELS = 3840 * 2160;

/**
 * Buffer pixels per CSS pixel for a canvas of this size.
 *
 * Deliberately NOT `window.devicePixelRatio`. What matters for aliasing is how
 * many samples land on a CSS pixel, and a dense display already supplies some
 * of them — so the two are the same lever and asking for both multiplies into
 * absurdity. A 1× display gets the full supersample; a 2× display is already
 * at the target and the budget holds it there.
 *
 * The deck is usually presented through a projector or an external monitor,
 * which is exactly the 1× case that needs this most.
 */
function renderScale(width: number, height: number): number {
  const pixels = Math.max(width * height, 1);

  const wanted = Math.max(window.devicePixelRatio || 1, RENDER_SCALE);

  const affordable = Math.sqrt(MAX_BUFFER_PIXELS / pixels);

  /* Never below 1: a deck blurrier than the screen it is on helps nobody. */
  return Math.max(1, Math.min(wanted, affordable));
}

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  /**
   * Draw a frame. Goes through the composer, so callers must use this rather
   * than `renderer.render` — calling the renderer directly skips every pass
   * and silently loses the finish.
   */
  render: () => void;

  resize: (width: number, height: number) => void;
  dispose: () => void;
}

/**
 * Builds the whole studio and mounts its canvas inside `canvasHost`.
 *
 * Called exactly once, by `Present.tsx` on mount. Everything the deck's look
 * depends on is decided in here — lens, tone mapping, the three lights, the
 * environment map that gives metal something to reflect, and the bloom chain.
 * Nothing about a slide reaches this function; the caller drives the camera
 * from outside.
 */
export function createStage(
  canvasHost: HTMLElement,
  background: string
): Stage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);

  const camera = new THREE.PerspectiveCamera(DESIGN_FOV, 1, 0.1, 400);

  /*
   * THE CAMERA SEES THE TWO OPT-OUT LAYERS, and this is not optional.
   *
   * `layers.ts` moves anything asking for `NO_INK_LAYER` or `UNDRAWN_LAYER`
   * OFF the camera's default channel, using `Layers.set`. That is how those
   * objects were kept out of the sketch pass's edge detector — but it also
   * means a camera that has not been widened cannot see them at all, and the
   * things on those layers are every text label, every particle, every
   * shadow-catching floor, and the entire filing cabinet.
   *
   * The widening used to live inside `createSketchPass`, which was fine until
   * the pass came out of the chain and took half the scene with it. It belongs
   * here, with the camera it applies to.
   */
  camera.layers.enable(NO_INK_LAYER);
  camera.layers.enable(UNDRAWN_LAYER);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  /*
   * Filmic tone mapping is what keeps bright metal highlights from clipping
   * to flat white. Without it, polished surfaces read as paper.
   *
   * IF YOU CHANGE EITHER OF THESE, see `screenColor` at the foot of this file.
   * The DOM has to be able to paint the same ground the canvas does, and it
   * does that by running this same curve in JavaScript.
   */
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = EXPOSURE;

  /*
   * A starting value only. `resize` runs before the first frame and decides
   * this properly against the canvas size — but the composer copies the
   * renderer's ratio when it is constructed below, so it must not be left at
   * the default 1 until then.
   */
  renderer.setPixelRatio(
    renderScale(canvasHost.clientWidth || 1920, canvasHost.clientHeight || 1080)
  );

  /*
   * Only the key casts. A second shadowing light doubles the cost and, on a
   * dark stage, mostly produces a competing shadow that reads as a mistake.
   */
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  canvasHost.appendChild(renderer.domElement);

  /*
   * A generated room gives metal something to reflect. Without an
   * environment map, PBR metal has nothing to sample and renders black.
   */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const environment = pmrem.fromScene(roomEnvironment, 0.04);

  scene.environment = environment.texture;
  /*
   * Lifted from 0.35, but not far. The environment is what gives metal
   * something to reflect; pushed past about half it starts lighting the
   * diffuse surfaces too and the dark studio turns milky, which is the exact
   * opposite of the look this deck wants.
   */
  scene.environmentIntensity = 0.42;

  roomEnvironment.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight(0xfff4e6, 2.05);
  key.position.set(6, 9, 7);
  key.castShadow = true;

  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.02;

  /* Sized to the widest act rather than the default unit box. */
  key.shadow.camera.left = -16;
  key.shadow.camera.right = 16;
  key.shadow.camera.top = 14;
  key.shadow.camera.bottom = -8;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 42;

  scene.add(key);

  const rim = new THREE.DirectionalLight(0x8fb6ff, 2.4);
  rim.position.set(-8, 3, -9);
  scene.add(rim);

  /*
   * Fill, and the reason it is not a token gesture. Key and rim both sit on
   * the right of the stage, so without a real light on the other side every
   * act loses its left third into the dark — which is exactly where the copy
   * sits on most slides, and where a viewer starts reading.
   *
   * Raised well above a conventional fill ratio and swung to front-left. It
   * casts nothing, so it costs one more light and no shadow pass.
   */
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.95);
  fill.position.set(-8, 2.5, 8);
  scene.add(fill);

  /* ------------------------------------------------------------- the finish */

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(1, 1),

    /*
     * Restrained. The first pass at this ran strength 0.62 against threshold
     * 0.82 and every pale surface in the deck qualified — the figures went
     * incandescent and the studio went grey. A presentation glow should be
     * something you notice on the second viewing.
     */
    /* strength  */ 0.5,
    /* radius    */ 0.6,

    /*
     * Bloom runs BEFORE the OutputPass, so what it thresholds is raw linear
     * HDR, not the tone-mapped image — a lit pale surface under a strong key
     * arrives here at three or four, not at one. That is why the first pass
     * at this turned the driver gear into a floodlight while the pips it was
     * meant to catch sat below it.
     *
     * The rig was rebalanced down to suit: with the key at two rather than
     * three and a half, diffuse now lands under this line and emissives sit
     * clearly over it.
     */
    /* threshold */ 1.4
  );

  composer.addPass(bloom);

  /*
   * Tone mapping and colour space conversion move to the END of the chain.
   * Without this the bloom pass works on already-encoded sRGB values and the
   * halo comes out washed and grey instead of taking the colour of whatever
   * is glowing.
   */
  composer.addPass(new OutputPass());

  const render = () => {
    composer.render();
  };

  const resize = (width: number, height: number) => {
    const aspect = width / Math.max(height, 1);

    camera.aspect = aspect;

    /*
     * Vertical FOV alone would crop the sides of every shot on a window
     * narrower than 16:9 — laptops, a half-width browser, a 4:3 projector.
     * Widening the vertical FOV instead holds the horizontal framing fixed,
     * so a shot composed here can never clip on unknown presenting hardware.
     * Wider than 16:9 simply reveals more, which is harmless.
     */
    if (aspect < DESIGN_ASPECT) {
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(DESIGN_FOV) / 2);

      const halfWidth = halfHeight * DESIGN_ASPECT;

      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(halfWidth / aspect));
    } else {
      camera.fov = DESIGN_FOV;
    }

    camera.updateProjectionMatrix();

    /*
     * Resolution is decided HERE and pushed to both, every resize, because the
     * budget depends on the window size — a scale that is comfortable in a
     * half-width browser is not comfortable full-screen on a 4K panel.
     *
     * `composer.setPixelRatio` matters as much as the renderer's: the composer
     * captured a ratio when it was built and sizes every pass's buffers from
     * its own copy, so setting only the renderer would supersample the scene
     * into buffers that were still the old size.
     */
    const ratio = renderScale(width, height);

    renderer.setPixelRatio(ratio);
    composer.setPixelRatio(ratio);

    renderer.setSize(width, height);
    composer.setSize(width, height);

    /*
     * `bloom.setSize` is NOT called here, and that is the fix rather than an
     * omission. `composer.setSize` already calls it, with the buffer size in
     * DEVICE pixels; calling it again with CSS pixels overwrote that with a
     * smaller number and left the bloom chain running at a quarter of the
     * pixels on any display with a pixel ratio of two.
     */
  };

  const dispose = () => {
    environment.texture.dispose();
    scene.environment = null;

    composer.dispose();

    renderer.dispose();
    renderer.domElement.remove();
  };

  return { scene, camera, renderer, render, resize, dispose };
}
