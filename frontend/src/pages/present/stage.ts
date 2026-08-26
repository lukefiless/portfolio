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
 */

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/*
 * Slides are composed against 16:9, the aspect a projector will actually
 * present at.
 */
const DESIGN_ASPECT = 16 / 9;
const DESIGN_FOV = 38;

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

export function createStage(
  canvasHost: HTMLElement,
  background: string
): Stage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);

  const camera = new THREE.PerspectiveCamera(DESIGN_FOV, 1, 0.1, 400);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  /*
   * Filmic tone mapping is what keeps bright metal highlights from clipping
   * to flat white. Without it, polished surfaces read as paper.
   */
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    renderer.setSize(width, height);
    composer.setSize(width, height);
    bloom.setSize(width, height);
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
