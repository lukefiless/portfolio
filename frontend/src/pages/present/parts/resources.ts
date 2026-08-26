/**
 * GPU RESOURCE POOL
 *
 * Three.js does not garbage collect what it puts on the GPU. A geometry or a
 * material that goes out of scope stays allocated until something calls
 * `.dispose()` on it, and in a dev server that hot-reloads twenty times an
 * hour that is how a page ends up hundreds of megabytes deep.
 *
 * Every act built its own pair of arrays and its own two helper functions to
 * handle this — the same fifteen lines, six times over. This is that, once.
 *
 * USAGE
 *
 *   const pool = createResourcePool();
 *
 *   const geometry = pool.geometry(new THREE.BoxGeometry(1, 1, 1));
 *   const material = pool.material(new THREE.MeshStandardMaterial());
 *
 *   // ...and in the act's dispose:
 *   pool.dispose();
 *
 * Wrap EVERYTHING you construct, at the point you construct it. The whole
 * value of the pattern is that you never have to keep a mental list of what
 * needs freeing — if it went through the pool, it gets freed.
 */

import * as THREE from "three";

export interface ResourcePool {
  /** Register a geometry and hand it straight back. */
  geometry: <T extends THREE.BufferGeometry>(item: T) => T;

  /** Register a material and hand it straight back. */
  material: <T extends THREE.Material>(item: T) => T;

  /**
   * Register an InstancedMesh, which owns GPU buffers of its own beyond its
   * geometry and material. Its `.dispose()` is what frees the instance
   * attribute buffers.
   */
  instanced: <T extends THREE.InstancedMesh>(item: T) => T;

  /** Free everything registered, in one call. Safe to call twice. */
  dispose: () => void;
}

export function createResourcePool(): ResourcePool {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const meshes: THREE.InstancedMesh[] = [];

  return {
    geometry(item) {
      geometries.push(item);
      return item;
    },

    material(item) {
      materials.push(item);
      return item;
    },

    instanced(item) {
      meshes.push(item);
      return item;
    },

    dispose() {
      meshes.forEach(item => item.dispose());
      geometries.forEach(item => item.dispose());
      materials.forEach(item => item.dispose());

      meshes.length = 0;
      geometries.length = 0;
      materials.length = 0;
    },
  };
}
