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

import { NO_INK_LAYER } from "../layers";

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
   * Pass a webfont family here — `"Cormorant Garamond"` for the file tabs.
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

  const font = `${weight} ${FONT_PX}px ${family}`;

  const characters = [...text];

  const spacing = FONT_PX * tracking;

  /**
   * Paint one text onto a FRESH canvas and hand it back with its aspect.
   *
   * A new canvas every call, never a reused one, because a repaint on the
   * SAME canvas depends on resizing it to actually clear the old pixels — and
   * that assumption breaks the moment a repaint lands on the same rounded
   * width the previous paint did. The fallback pass and the webfont pass
   * measure the same string in two different fonts, which only rarely
   * produces the same total width by coincidence, so most labels never showed
   * it. But the tab labels on the filing cabinet do it on nearly every word,
   * because the fallback (a generic serif, since a bare family name has no
   * fallback stack of its own) and the loaded webfont track close enough
   * through most of a short word that only the last letter or two drifts far
   * enough to stop overlapping — which is exactly why the ghost only ever
   * showed as a trailing fragment, on every tab, once the real face had
   * loaded in.
   *
   * A fresh canvas sidesteps the question entirely: there is no old bitmap to
   * fail to clear.
   */
  const paint = (): { canvas: HTMLCanvasElement; aspect: number } => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

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

    return { canvas, aspect: canvas.width / Math.max(canvas.height, 1) };
  };

  const first = paint();

  const texture = new THREE.CanvasTexture(first.canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  /*
   * No mipmaps. Text minified through a mip chain goes soft exactly at the
   * distances this deck reads labels from, and there is no depth range here
   * wide enough for aliasing to be the bigger problem.
   */
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const aspect = first.aspect;

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
   * NOT OUTLINED.
   *
   * A label is a rectangle of canvas standing in for writing, so the sketch
   * pass — which knows only about depth and normals — would trace the
   * rectangle. That draws a hard box around every caption and, worse, a
   * second box around the handwriting on each file tab, a millimetre off the
   * tab's own outline. See `layers.ts`; the text itself is unaffected, since
   * this hides the plane from the normal prepass only.
   */
  mesh.layers.set(NO_INK_LAYER);

  /* Swapped out from under `dispose` by the repaint below, if one runs. */
  let liveTexture = texture;

  /*
   * THE WEBFONT REPAINT
   *
   * Acts are built at page load, and a Google font has almost certainly not
   * arrived by then. Canvas does not wait: `measureText` and `fillText`
   * silently use the fallback, so a label asking for a webfont gets drawn in
   * monospace and stays that way for the life of the page — with no error and
   * nothing in the console to explain it.
   *
   * So a label that asked for a specific family loads it, then paints again —
   * onto a NEW canvas and a NEW texture, not the original one. See the note
   * on `paint` for why reusing the canvas is what was putting a ghost of the
   * fallback word under the repainted one.
   */
  if (
    family !== FONT_STACK &&
    typeof document !== "undefined" &&
    document.fonts
  ) {
    document.fonts
      .load(font, text)
      .then(() => {
        const repaint = paint();

        const nextTexture = new THREE.CanvasTexture(repaint.canvas);
        nextTexture.colorSpace = THREE.SRGBColorSpace;
        nextTexture.minFilter = THREE.LinearFilter;
        nextTexture.generateMipmaps = false;

        material.map = nextTexture;
        liveTexture.dispose();
        liveTexture = nextTexture;

        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(width, width / repaint.aspect);
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
      liveTexture.dispose();
    },
  };
}
