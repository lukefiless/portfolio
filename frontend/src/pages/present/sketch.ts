/**
 * THE INK-AND-WASH PASS
 *
 * The mechanism only. The NUMBERS that decide how sketched the deck looks —
 * `wash`, `grain`, `lineWidth` and the rest — live in `stage.ts`, under
 * `SKETCH`, because the deck's look should stay readable from one file. This
 * file exists so that file never has to think about depth textures.
 *
 * THE IDEA
 *
 * A pen line is not geometry, so it cannot be lit or shaded — it has to be
 * found. Every frame this pass renders a second, throwaway copy of the scene
 * with `MeshNormalMaterial`, which turns surface direction into colour, and
 * reads that alongside the depth buffer. Two neighbouring pixels whose depth
 * jumps or whose normal turns sharply are a silhouette or a crease; anywhere
 * else is a continuous surface. That is the whole detector. It is drawn onto
 * the already-lit, already-bloomed frame the composer hands this pass, then
 * the result is toned toward the paper colour and given a little grain.
 *
 * THE TWO OPT-OUTS, AND WHY THE CAMERA IS WIDENED HERE
 *
 * `layers.ts` defines `NO_INK_LAYER` and `UNDRAWN_LAYER`. Objects that ask for
 * either are moved, by `Layers.set`, OFF the camera's default channel — which
 * would make them invisible to the main render too, if nothing widened the
 * camera back out. That widening happens once, here, at construction: the
 * SAME camera object is what `stage.ts` hands to the `RenderPass` ahead of
 * this one in the chain, so enabling both channels on it here is enough for
 * every ordinary frame to see them without `stage.ts` ever needing to know
 * these layers exist.
 *
 * This pass then narrows the camera right back down, but only for the
 * instant of its OWN two extra renders below, and restores the wide mask
 * before handing the camera back — so the next frame's ordinary render is
 * never affected by what happened in here.
 *
 *   1. THE EDGE SOURCE — normal + depth rendered with the camera narrowed to
 *      channel 0 only, which excludes BOTH opt-outs. Neither a label nor the
 *      cabinet can pick up a pen line, because neither is even present in
 *      the buffer the line-finder reads.
 *
 *   2. THE UNDRAWN OVERLAY — after the wash and the ink are composited, the
 *      camera is narrowed to `UNDRAWN_LAYER` alone and the scene is drawn
 *      again, straight on top, depth cleared first so it is not accidentally
 *      hidden behind whatever the composite left in the depth buffer. There
 *      is exactly one thing on this layer today — the cabinet — so it is
 *      always the topmost, unwashed, unlined thing in the frame, which is
 *      the argument `cabinetAct.ts` is making.
 *
 * CHAIN ORDER (see `stage.ts`)
 *
 * This pass sits between bloom and `OutputPass`. Before it, so the ink reads
 * lit surfaces that have already bloomed rather than raw HDR values it was
 * never tuned against. Before tone mapping and the sRGB encode, because
 * `wash` is written to behave as a mix in LINEAR light — see the comment on
 * it in `stage.ts` — and mixing after encoding would move every value by a
 * different amount than the number suggests.
 */

import * as THREE from "three";
import {
  Pass,
  FullScreenQuad,
} from "three/examples/jsm/postprocessing/Pass.js";

import { NO_INK_LAYER, UNDRAWN_LAYER } from "./layers";

export interface SketchOptions {
  /** Line and grain colour. */
  ink: string;

  /** What the frame is toned toward. */
  paper: string;

  /** 0 = no tint at all, 1 = solid paper. See the long note on it in `stage.ts`. */
  wash: number;

  /** Static per-pixel grain, added after the wash. */
  grain: number;

  /**
   * Colour left in the render, after the wash has taken some out.
   *
   * 1 is untouched. Above 1 pushes back toward what the lighting rig actually
   * produced — which is the point: the wash mixes every pixel toward one warm
   * paper colour, and mixing toward a single hue is desaturation by another
   * name. Lifting this puts the sage, the gold and the cabinet's green back
   * without giving up the paper the deck is drawn on.
   */
  saturation: number;

  /** How opaque a found line is, at most. Held under 1 — see `stage.ts`. */
  strength: number;

  /** Sample spacing for the edge finder, in texels. Fatter reads more as an edge. */
  lineWidth: number;

  /** Per-pixel wander applied to the sample positions, in texels. */
  wobble: number;

  /** How unevenly the line's opacity varies along its own length, 0..1. */
  pressure: number;

  /** Depth discontinuity (as a fraction of distance) that counts as an edge. */
  depthThreshold: number;

  /** Normal discontinuity (1 - cosine of the angle) that counts as an edge. */
  normalThreshold: number;
}

export interface SketchPassHandle {
  /** Add this to the composer, between bloom and `OutputPass`. */
  pass: Pass;

  dispose: () => void;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D tDiffuse;
  uniform sampler2D tSceneDepth;
  uniform sampler2D tSceneNormal;

  uniform vec2 uTexel;

  uniform vec3 uInk;
  uniform vec3 uPaper;

  uniform float uWash;
  uniform float uGrain;
  uniform float uSaturation;
  uniform float uStrength;
  uniform float uLineWidth;
  uniform float uWobble;
  uniform float uPressure;
  uniform float uDepthThreshold;
  uniform float uNormalThreshold;

  uniform float uNear;
  uniform float uFar;

  /** Perspective depth back to a view-space distance, so the threshold below means the same thing near and far. */
  float linearDepth(float depth) {
    float z = depth * 2.0 - 1.0;
    return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 texel = uTexel * max(uLineWidth, 0.0001);

    /*
     * A static jitter on the sample position, so the traced line wanders like
     * a hand rather than tracking the geometry exactly. Per-pixel and time-
     * independent on purpose: a presentation held on one frame for ten
     * seconds must not show a line that crawls.
     */
    vec2 jitter = (vec2(hash(vUv * 811.3), hash(vUv * 911.7 + 4.1)) - 0.5)
      * uWobble * uTexel;

    vec2 uv = vUv + jitter;

    vec2 offN = vec2(0.0, texel.y);
    vec2 offE = vec2(texel.x, 0.0);

    float dC = linearDepth(texture2D(tSceneDepth, uv).r);
    float dN = linearDepth(texture2D(tSceneDepth, uv + offN).r);
    float dS = linearDepth(texture2D(tSceneDepth, uv - offN).r);
    float dE = linearDepth(texture2D(tSceneDepth, uv + offE).r);
    float dW = linearDepth(texture2D(tSceneDepth, uv - offE).r);

    vec3 nC = normalize(texture2D(tSceneNormal, uv).rgb * 2.0 - 1.0);
    vec3 nN = normalize(texture2D(tSceneNormal, uv + offN).rgb * 2.0 - 1.0);
    vec3 nS = normalize(texture2D(tSceneNormal, uv - offN).rgb * 2.0 - 1.0);
    vec3 nE = normalize(texture2D(tSceneNormal, uv + offE).rgb * 2.0 - 1.0);
    vec3 nW = normalize(texture2D(tSceneNormal, uv - offE).rgb * 2.0 - 1.0);

    /* Scaled by distance: a crease ten units out should not need a threshold tuned for one a metre away. */
    float depthEdge = (abs(dC - dN) + abs(dC - dS) + abs(dC - dE) + abs(dC - dW))
      / max(dC, 0.001);

    float normalEdge = (1.0 - dot(nC, nN)) + (1.0 - dot(nC, nS))
      + (1.0 - dot(nC, nE)) + (1.0 - dot(nC, nW));

    float edge = max(
      step(uDepthThreshold, depthEdge),
      step(uNormalThreshold, normalEdge)
    );

    /* Pen pressure: a static noise that lightens the stroke unevenly along its own length. */
    float pressureNoise = mix(1.0, hash(uv * 530.0 + 12.7), clamp(uPressure, 0.0, 1.0));
    edge *= pressureNoise;

    vec4 beauty = texture2D(tDiffuse, vUv);

    vec3 inked = mix(beauty.rgb, uInk, clamp(edge * uStrength, 0.0, 1.0));
    vec3 washed = mix(inked, uPaper, clamp(uWash, 0.0, 1.0));

    /*
     * Colour back in, AFTER the wash and before the grain.
     *
     * Around the pixel's own luminance, so nothing changes brightness — this
     * only reopens the distance between a pixel and grey, which is exactly
     * what mixing toward the paper closed. Done before the grain so the tooth
     * of the paper stays neutral rather than being tinted with everything
     * else.
     */
    float luma = dot(washed, vec3(0.2126, 0.7152, 0.0722));
    washed = mix(vec3(luma), washed, uSaturation);

    /* Static per-pixel grain, the tooth of the paper. */
    washed += (hash(gl_FragCoord.xy) - 0.5) * uGrain;

    gl_FragColor = vec4(washed, beauty.a);
  }
`;

class InkAndWashPass extends Pass {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;

  private readonly normalMaterial = new THREE.MeshNormalMaterial();
  private readonly depthTexture: THREE.DepthTexture;
  private readonly sceneBuffer: THREE.WebGLRenderTarget;

  private readonly material: THREE.ShaderMaterial;
  private readonly quad: FullScreenQuad;

  private width = 1;
  private height = 1;

  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    options: SketchOptions
  ) {
    super();

    this.scene = scene;
    this.camera = camera;

    /*
     * Both opt-out channels join the camera's default one, permanently. See
     * the file header: this is what keeps a label or the cabinet visible to
     * the ORDINARY render, every frame, without `stage.ts` knowing either
     * channel exists. This pass narrows the mask back down for its own two
     * extra renders below and always restores it before returning.
     */
    camera.layers.enable(NO_INK_LAYER);
    camera.layers.enable(UNDRAWN_LAYER);

    this.depthTexture = new THREE.DepthTexture(1, 1);
    this.depthTexture.type = THREE.UnsignedIntType;

    this.sceneBuffer = new THREE.WebGLRenderTarget(1, 1, {
      depthTexture: this.depthTexture,
      depthBuffer: true,
    });

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tDiffuse: { value: null },
        tSceneDepth: { value: this.depthTexture },
        tSceneNormal: { value: this.sceneBuffer.texture },

        uTexel: { value: new THREE.Vector2(1, 1) },

        uInk: { value: new THREE.Color(options.ink) },
        uPaper: { value: new THREE.Color(options.paper) },

        uWash: { value: options.wash },
        uGrain: { value: options.grain },
        uSaturation: { value: options.saturation },
        uStrength: { value: options.strength },
        uLineWidth: { value: options.lineWidth },
        uWobble: { value: options.wobble },
        uPressure: { value: options.pressure },
        uDepthThreshold: { value: options.depthThreshold },
        uNormalThreshold: { value: options.normalThreshold },

        uNear: { value: camera.near },
        uFar: { value: camera.far },
      },
    });

    this.quad = new FullScreenQuad(this.material);
  }

  override setSize(width: number, height: number): void {
    this.width = Math.max(width, 1);
    this.height = Math.max(height, 1);

    this.sceneBuffer.setSize(this.width, this.height);

    const texel = this.material.uniforms.uTexel.value as THREE.Vector2;
    texel.set(1 / this.width, 1 / this.height);
  }

  override render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget
  ): void {
    const { scene, camera } = this;

    const wideMask = camera.layers.mask;
    const previousOverride = scene.overrideMaterial;
    const previousTarget = renderer.getRenderTarget();
    const previousAutoClear = renderer.autoClear;
    const previousBackground = scene.background;

    renderer.autoClear = false;

    /*
     * THE BACKGROUND IS DETACHED FOR BOTH OF THIS PASS'S OWN RENDERS, and it
     * is not an optimisation — it is the difference between this pass working
     * and this pass erasing the frame.
     *
     * `autoClear = false` is NOT enough to stop a clear. When `scene.background`
     * is a Color, three.js's background module raises its own `forceClear` and
     * clears the colour buffer regardless of `autoClear` — so the overlay
     * render in step 3 wiped the composite drawn in step 2 and repainted flat
     * background over the whole frame. Every act vanished behind its own
     * slide's background colour.
     *
     * It hid on the opening slide, which is the worst place for it to hide:
     * the cabinet is the one thing ON the undrawn layer, so it was redrawn on
     * top of the wipe and the frame looked entirely correct. Only a slide
     * whose undrawn layer is empty — every other slide in the deck — showed
     * the damage.
     *
     * Detaching it costs nothing: the composite in step 2 already carries the
     * background, having read it out of `readBuffer`.
     */
    scene.background = null;

    /* ---------------------------------------------------- 1. the edge source */

    camera.layers.set(0);
    scene.overrideMaterial = this.normalMaterial;

    renderer.setRenderTarget(this.sceneBuffer);
    renderer.clear(true, true, false);
    renderer.render(scene, camera);

    scene.overrideMaterial = previousOverride;
    camera.layers.mask = wideMask;

    /* ------------------------------------------------------- 2. the composite */

    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    this.material.uniforms.uNear.value = camera.near;
    this.material.uniforms.uFar.value = camera.far;

    const target = this.renderToScreen ? null : writeBuffer;

    renderer.setRenderTarget(target);

    if (this.clear) {
      renderer.clear();
    }

    this.quad.render(renderer);

    /* --------------------------------------------------- 3. the undrawn overlay */

    camera.layers.set(UNDRAWN_LAYER);

    renderer.setRenderTarget(target);
    renderer.clear(false, true, false);
    renderer.render(scene, camera);

    camera.layers.mask = wideMask;

    scene.background = previousBackground;
    renderer.setRenderTarget(previousTarget);
    renderer.autoClear = previousAutoClear;
  }

  override dispose(): void {
    this.sceneBuffer.dispose();
    this.normalMaterial.dispose();
    this.material.dispose();
    this.quad.dispose();
  }
}

/**
 * Builds the pass. Called once by `createStage`; see the header above for
 * the mechanism and `stage.ts` for the numbers.
 */
export function createSketchPass(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  _renderer: THREE.WebGLRenderer,
  options: SketchOptions
): SketchPassHandle {
  const pass = new InkAndWashPass(scene, camera, options);

  return {
    pass,
    dispose: () => pass.dispose(),
  };
}
