/**
 * THE SEA
 *
 * A large plane displaced by a sum of travelling sine waves, plus the same
 * wave field readable from the CPU so anything floating on it can be placed
 * on the actual surface rather than near it.
 *
 * ONE WAVE FIELD, TWO READERS
 *
 * This is the whole idea of the file, and the reason it is not simply a
 * shader. The water is drawn on the GPU, sixty times a second, across
 * thousands of vertices; the ship has to sit on that same water, which means
 * the CPU needs the answer too — but only at four points.
 *
 * Two implementations of the same maths is a bug waiting to happen: nudge an
 * amplitude in the GLSL, forget the TypeScript, and the ship sails through a
 * swell it cannot feel. So `WAVES` below is the single source, the GLSL is
 * GENERATED from it at build time, and `heightAt` reads the same array. There
 * is no second place to edit.
 *
 * WHY SINES AND NOT GERSTNER
 *
 * Gerstner waves displace horizontally as well as vertically, which is what
 * gives real sharp-crested swell. They also make "the height at x, z" stop
 * being a function you can evaluate — you have to invert the displacement to
 * find which bit of water ended up above a point. For a ship rocking at
 * middle distance, summed sines cost one line of maths and the difference is
 * invisible.
 *
 * WHY THE NORMAL IS ANALYTIC
 *
 * The derivative of a sine is a cosine, so the surface normal is exact and
 * free. Computing it from neighbouring vertices instead would be both slower
 * and wrong at the edges of the plane.
 */

import * as THREE from "three";

interface Wave {
  /** Direction of travel in the XZ plane. Normalised on use. */
  dx: number;
  dz: number;

  /** Crest-to-trough height, in world units. */
  amplitude: number;

  /** Distance between crests, in world units. */
  wavelength: number;

  /** Crests per second along `d`. */
  speed: number;
}

/*
 * Three long swells, and deliberately NOT a realistic sea.
 *
 * An accurate ocean spectrum has energy at every scale, and the short end of
 * it is what makes water look photographic — chop, glitter, a surface too
 * busy to read at a glance. That is the wrong target here. This sits behind
 * a headline on a slide, so it wants to read as "sea" in one look and then
 * stop asking for attention.
 *
 * So the short waves are gone. What is left is rolling swell: long, slow, and
 * smooth enough that the eye takes the whole surface in as one shape rather
 * than tracking detail across it.
 *
 * Wavelengths are still not harmonically related, for the original reason —
 * round multiples produce a surface that visibly returns to the same shape,
 * and a repeat reads as a texture rather than as water.
 */
const WAVES: readonly Wave[] = [
  { dx: 1.0, dz: 0.35, amplitude: 0.58, wavelength: 31.0, speed: 0.38 },
  { dx: -0.6, dz: 1.0, amplitude: 0.34, wavelength: 20.7, speed: 0.47 },
  { dx: 0.8, dz: -0.9, amplitude: 0.11, wavelength: 12.3, speed: 0.61 },
];

/** Precomputed per wave, so neither reader normalises in a loop. */
const PREPARED = WAVES.map(w => {
  const length = Math.hypot(w.dx, w.dz) || 1;

  /* Angular frequency: radians of phase per world unit travelled. */
  const k = (Math.PI * 2) / w.wavelength;

  return {
    dx: w.dx / length,
    dz: w.dz / length,
    amplitude: w.amplitude,
    k,

    /* Radians of phase per second. */
    omega: k * w.speed * w.wavelength * 0.1,
  };
});

export interface Ocean {
  mesh: THREE.Mesh;

  /**
   * Surface height at a point, for the current `swell`.
   *
   * Cheap — three sines. Sample it as often as you need; the ship in
   * `boatAct` reads it at four points every frame.
   */
  heightAt: (x: number, z: number, time: number, swell: number) => number;

  /** Advance the surface. Call once per frame before rendering. */
  update: (time: number, swell: number) => void;

  /** Tint the water. Called with the slide accent. */
  setAccent: (color: THREE.Color) => void;

  dispose: () => void;
}

/**
 * The GLSL for one wave sum, generated from `PREPARED`.
 *
 * Generated rather than written out so it cannot drift from `heightAt`. Every
 * constant is baked in as a literal, which also means the shader has no
 * per-wave uniforms to upload and the loop is fully unrolled.
 */
const waveGLSL = (variable: string) =>
  PREPARED.map(
    w => `
    ${variable} += ${w.amplitude.toFixed(6)} * uSwell * sin(
      (position.x * ${w.dx.toFixed(6)} + position.y * ${w.dz.toFixed(6)})
        * ${w.k.toFixed(6)}
      + uTime * ${w.omega.toFixed(6)}
    );`
  ).join("");

/**
 * The GLSL for the surface slope, generated the same way.
 *
 * `position.y` is the plane's own second axis — the plane is built flat in XY
 * and rotated into place, so what the shader calls y is what the world calls
 * z. Getting this wrong tilts the normals ninety degrees and the light comes
 * from the wrong side of every crest.
 */
const slopeGLSL = () =>
  PREPARED.map(
    w => `
    {
      float c = ${(w.amplitude * w.k).toFixed(6)} * uSwell * cos(
        (position.x * ${w.dx.toFixed(6)} + position.y * ${w.dz.toFixed(6)})
          * ${w.k.toFixed(6)}
        + uTime * ${w.omega.toFixed(6)}
      );

      slope.x += c * ${w.dx.toFixed(6)};
      slope.y += c * ${w.dz.toFixed(6)};
    }`
  ).join("");

export interface OceanOptions {
  /** Side length of the water plane, in world units. */
  size?: number;

  /**
   * Vertices per side.
   *
   * Long swell needs remarkably few — a crest 30 units across is a smooth
   * curve at almost any density. This was 240 while the wave set still had
   * short chop in it, which is 57,600 vertices displaced every frame to
   * resolve detail that has since been removed.
   */
  segments?: number;
}

export function createOcean(options: OceanOptions = {}): Ocean {
  const { size = 420, segments = 220 } = options;

  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

  /*
   * Deep and almost matte, and the roughness is the load-bearing number.
   *
   * This started at 0.34 and washed the slide out. A plane this size is the
   * broadest surface in the deck, and at that gloss the key and rim both put
   * a specular streak across it — arriving at the bloom pass, which
   * thresholds LINEAR light at 1.4, well above the line. The sea lit itself
   * and the ship disappeared into the glare.
   *
   * Raising roughness is the fix rather than lowering the bloom or the
   * lights: bloom and the rig in `stage.ts` are shared by all eight acts, and
   * only this one has a sea in it. Water in this deck is a GROUND, not a
   * subject — it should read as the surface the ship sits on and then get out
   * of the way.
   */
  const material = new THREE.MeshStandardMaterial({
    color: 0x24488F,
    roughness: 0.72,
    metalness: 0.02,
  });

  const uniforms = {
    uTime: { value: 0 },
    uSwell: { value: 1 },
  };

  /*
   * `onBeforeCompile` rather than a bare ShaderMaterial, so the water keeps
   * the stage's lighting, environment map, tone mapping and fog. A hand
   * written ShaderMaterial would have to reimplement all of it to sit in the
   * same room as everything else, and would still not match.
   */
  material.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uSwell = uniforms.uSwell;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform float uTime;
         uniform float uSwell;`
      )
      .replace(
        "#include <beginnormal_vertex>",
        `
         vec2 slope = vec2(0.0);
         ${slopeGLSL()}

         /*
          * Slope is dHeight/dx and dHeight/dz. The upward normal of a
          * height field is (-dh/dx, 1, -dh/dz), and it arrives here in the
          * plane's own space, where its second axis is the world's z.
          */
         vec3 objectNormal = normalize(vec3(-slope.x, -slope.y, 1.0));
        `
      )
      .replace(
        "#include <begin_vertex>",
        `
         float height = 0.0;
         ${waveGLSL("height")}

         vec3 transformed = vec3(position.x, position.y, position.z + height);
        `
      );
  };

  const mesh = new THREE.Mesh(geometry, material);

  /* Built flat in XY and laid down, which is why the shader's y is world z. */
  mesh.rotation.x = -Math.PI / 2;

  /*
   * Water takes shadow but does not cast it. A sea casting a shadow map is
   * both meaningless and the most expensive thing in the scene.
   */
  mesh.receiveShadow = true;
  mesh.castShadow = false;

  /* The plane is larger than any frustum test is going to help with. */
  mesh.frustumCulled = false;

  /**
   * The CPU reader. Identical maths to `waveGLSL`, from the same array.
   */
  const heightAt = (x: number, z: number, time: number, swell: number) => {
    let height = 0;

    for (const w of PREPARED) {
      height +=
        w.amplitude *
        swell *
        Math.sin((x * w.dx + z * w.dz) * w.k + time * w.omega);
    }

    return height;
  };

  const tint = new THREE.Color();

  return {
    mesh,
    heightAt,

    update: (time, swell) => {
      uniforms.uTime.value = time;
      uniforms.uSwell.value = swell;
    },

    /*
     * A HINT of the accent, not the accent. The sea is most of the frame, and
     * a floor painted the same colour as the thing the slide is about leaves
     * nothing for the eye to land on.
     */
    setAccent: color => {
      tint.set(0x24488F).lerp(color, 0.14);
      material.color.copy(tint);
    },

    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}
