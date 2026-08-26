/**
 * PARTICLE POOL
 *
 * A fixed pool of points with per-particle colour, drawn as soft dots. Used
 * for anything that flows: records through a pipeline, requests against a
 * quota. Positions are written from the CPU each frame, which for a few
 * hundred particles is far simpler than a shader and costs nothing.
 */

import * as THREE from "three";

export interface ParticlePool {
  points: THREE.Points;
  positions: Float32Array;
  colors: Float32Array;
  capacity: number;
  commit: () => void;
  dispose: () => void;
}

/** A soft radial dot. Untextured points render as hard squares. */
function createDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");

  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");

  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function createParticlePool(
  capacity: number,
  size: number
): ParticlePool {
  const positions = new Float32Array(capacity * 3);
  const colors = new Float32Array(capacity * 3);

  const geometry = new THREE.BufferGeometry();

  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  const colorAttribute = new THREE.BufferAttribute(colors, 3);

  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  colorAttribute.setUsage(THREE.DynamicDrawUsage);

  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("color", colorAttribute);

  const texture = createDotTexture();

  const material = new THREE.PointsMaterial({
    size,
    map: texture,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);

  /* Dots are unlit sprites; the stage rig must not dim them. */
  points.frustumCulled = false;

  return {
    points,
    positions,
    colors,
    capacity,

    commit: () => {
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
    },

    dispose: () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
  };
}
