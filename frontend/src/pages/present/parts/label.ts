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

  /**
   * Font family to draw with. Defaults to the monospace stack above.
   *
   * Pass a webfont family here — `"Caveat"` for the handwritten file labels.
   * See the repaint note in the body: a webfont has almost certainly NOT
   * arrived by the time acts are built, so a label asking for one paints
   * twice.
   */
  font?: string;

  /**
   * Fill the canvas with this colour before drawing, instead of leaving it
   * transparent.
   *
   * Use it when the label is meant to BE a surface rather than sit in front
   * of one — handwriting on a file tab, a sign painted on a panel. Pair it
   * with `lit`.
   */
  background?: string;

  /**
   * Light the label like any other surface, instead of drawing it unlit.
   *
   * The default is unlit because most labels in this deck are signage
   * floating in space, where shading them would be wrong. But a label stuck
   * to a LIT object has to be lit too: an unlit decal holds full brightness
   * while the surface under it falls into shadow, and the result reads as a
   * glowing sticker rather than as ink on paper.
   */
  lit?: boolean;
}

export interface Label {
  mesh: THREE.Mesh;
  dispose: () => void;
}

/**
 * Typesets one line of text onto a canvas and returns it as a plane, sized to
 * `options.width` with the height following from the measured text.
 *
 * Letters are drawn ONE AT A TIME rather than in a single `fillText`, because
 * canvas has no letter-spacing control and the deck's labels are tracked out.
 * The measure pass and the draw pass therefore have to agree on the same
 * advance list, which is why `advances` is computed once and reused.
 */
export function createLabel(text: string, options: LabelOptions): Label {
  const {
    width,
    color = "#242424",
    tracking = 0.2,
    weight = 600,
    font: family = FONT_STACK,
    background,
    lit = false,
  } = options;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const font = `${weight} ${FONT_PX}px ${family}`;

  const characters = [...text];

  const spacing = FONT_PX * tracking;

  /**
   * Measure, size the canvas, and draw. Kept as one function because the
   * measure and the draw MUST agree on the same advance list, and because a
   * webfont label has to run the whole thing twice.
   */
  const paint = () => {
    let advances: number[] = [];
    let run = 0;

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

      if (background) {
        context.fillStyle = background;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.fillStyle = color;
      context.textBaseline = "middle";

      let x = PAD;

      characters.forEach((character, index) => {
        context.fillText(character, x, canvas.height / 2);
        x += advances[index] + spacing;
      });
    }
  };

  paint();

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
   * Two materials, for two genuinely different jobs.
   *
   * UNLIT (the default) is signage: a name hanging in the scene, which should
   * read at the same brightness wherever the lights happen to be. Its
   * transparent margin needs `depthWrite: false` or it punches a hole in
   * whatever it is mounted on.
   *
   * LIT is a surface. It shades with the object it is stuck to, which is the
   * only way ink on paper looks like ink on paper — and because a backed
   * label is fully opaque, it needs neither transparency nor the depth-write
   * dance, so it also sorts correctly from any angle.
   */
  const material = lit
    ? new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.88,
        metalness: 0.02,
        transparent: !background,
        depthWrite: Boolean(background),
      })
    : new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });

  const mesh = new THREE.Mesh(geometry, material);

  /*
   * THE WEBFONT REPAINT
   *
   * Acts are built at page load, and a Google font has almost certainly not
   * arrived by then. Canvas does not wait: `measureText` and `fillText`
   * silently use the fallback, so a label asking for Caveat gets drawn in
   * monospace and stays that way for the life of the page — with no error and
   * nothing in the console to explain it.
   *
   * So a label that asked for a specific family loads it, then paints again.
   * The second pass re-measures, which matters as much as the redraw: a
   * handwritten face is a completely different width to the fallback, and
   * the plane's aspect has to be rebuilt to match or the text comes out
   * stretched.
   */
  if (family !== FONT_STACK && typeof document !== "undefined" && document.fonts) {
    document.fonts
      .load(font, text)
      .then(() => {
        paint();

        texture.needsUpdate = true;

        const repainted = canvas.width / Math.max(canvas.height, 1);

        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(width, width / repainted);
      })
      .catch(() => {
        /* Fallback face is already on screen; nothing to recover. */
      });
  }

  return {
    mesh,

    dispose: () => {
      /* `mesh.geometry`, not `geometry` — the repaint above may have replaced it. */
      mesh.geometry.dispose();
      material.dispose();
      texture.dispose();
    },
  };
}
