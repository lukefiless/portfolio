/**
 * TYPESET LABEL
 *
 * A line of monospace text, drawn to a canvas and hung in the scene on a
 * plane. Used for the few places in the deck where a thing has to be NAMED
 * rather than merely shown — the system the data comes out of, the database
 * it lands in, the caption under a project.
 *
 * Canvas rather than TextGeometry on purpose. TextGeometry wants a converted
 * typeface asset, extrudes to real geometry, and gives back something that
 * has to be lit; a label is not part of the machinery and should not catch
 * the key light like it is. This route ships no asset, renders unlit, and
 * stays legible at any distance the deck actually uses.
 *
 * Letters are placed one at a time rather than through `ctx.letterSpacing`,
 * which is recent and unevenly supported. Tracking matters here: monospace
 * set tight reads as code, and set loose reads as a plate on a machine, which
 * is what these are.
 */

import * as THREE from "three";

/*
 * Stack rather than a single family: whichever of these the presenting
 * machine has, all of them are fixed-pitch, so the tracking maths holds and
 * the label never silently falls back to a proportional face.
 */
const FONT_STACK =
  '"SF Mono", "Menlo", "DejaVu Sans Mono", "Consolas", "Liberation Mono", monospace';

/** Drawn large and scaled down, so the texture never turns to mush up close. */
const FONT_PX = 96;

const PAD = 28;

export interface LabelOptions {
  /** Width in world units. Height follows from the text's own aspect. */
  width: number;

  color?: string;

  /** Extra space between letters, in ems. */
  tracking?: number;

  weight?: number;
}

export interface Label {
  mesh: THREE.Mesh;
  dispose: () => void;
}

export function createLabel(text: string, options: LabelOptions): Label {
  const { width, color = "#e6ebf7", tracking = 0.2, weight = 600 } = options;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const font = `${weight} ${FONT_PX}px ${FONT_STACK}`;

  const characters = [...text];

  let advances: number[] = [];
  let run = 0;

  const spacing = FONT_PX * tracking;

  if (context) {
    context.font = font;

    advances = characters.map(
      character => context.measureText(character).width
    );

    run = advances.reduce((total, w) => total + w + spacing, 0);

    /* The gap only sits BETWEEN letters, so the last one does not add it. */
    run = Math.max(run - spacing, 1);
  }

  canvas.width = Math.ceil(run) + PAD * 2;
  canvas.height = Math.ceil(FONT_PX * 1.5);

  if (context) {
    /* Resizing the canvas clears every context property, including the font. */
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = "middle";

    let x = PAD;

    characters.forEach((character, index) => {
      context.fillText(character, x, canvas.height / 2);
      x += advances[index] + spacing;
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  /*
   * No mipmaps. Text minified through a mip chain goes soft exactly at the
   * distances this deck reads labels from, and there is no depth range here
   * wide enough for aliasing to be the bigger problem.
   */
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const aspect = canvas.width / Math.max(canvas.height, 1);

  const geometry = new THREE.PlaneGeometry(width, width / aspect);

  /*
   * Unlit and non-occluding: a label is signage, not a surface. depthWrite
   * off keeps its transparent margin from punching a hole in whatever it is
   * mounted on.
   */
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,

    dispose: () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
  };
}
