/**
 * PARAMETRIC JIGSAW PIECE
 *
 * One extruded piece, with each of its four edges independently flat, tabbed
 * out, or socketed in.
 *
 * WHY THE EDGE CODE MATTERS
 *
 * A jigsaw only reads as a jigsaw because neighbouring pieces INTERLOCK — the
 * tab on one is exactly the socket on the next. Draw each piece with random
 * bumps and you get a field of unrelated blobs that never looks like a puzzle
 * however carefully it is lit.
 *
 * So a piece is built from four signs, one per edge:
 *
 *    1   a tab, bulging outward
 *   -1   a socket, cut inward
 *    0   flat, for the outside border of the puzzle
 *
 * The grid that lays these out is responsible for the one rule that makes it
 * work: a piece's right edge must be the negation of its neighbour's left
 * edge. `puzzleAct` does that; see `edgeFor` there.
 *
 * WHY BEZIERS AND NOT AN ARC
 *
 * A real jigsaw tab is a narrow neck opening into a round head — it has to be,
 * or pieces would fall out. That shape is two cubic curves back to back, and
 * an arc cannot make the undercut at the neck. The control points below are
 * tuned to that silhouette rather than derived from anything.
 */

import * as THREE from "three";

/** Flat, tab out, or socket in. */
export type Edge = -1 | 0 | 1;

export interface PieceEdges {
  top: Edge;
  right: Edge;
  bottom: Edge;
  left: Edge;
}

export interface PieceOptions {
  /** Side length of the piece body, before tabs. */
  size: number;

  /** Extrusion depth. */
  thickness: number;

  /** Tab size as a fraction of `size`. Around 0.2 looks like a jigsaw. */
  tab?: number;
}

/*
 * Where the neck starts and ends along an edge, as fractions of it. The gap
 * between them is the width of the tab's base; the head bulges wider than
 * this, which is what stops a piece pulling straight out.
 */
const NECK_START = 0.42;
const NECK_END = 0.58;

/**
 * Walks one edge from `from` to `to`, adding a tab, a socket, or a straight
 * line depending on `edge`.
 *
 * Works in the edge's own terms — `along` is the direction of travel and
 * `out` is perpendicular to it — so the same code draws all four sides and
 * there is no per-edge special casing to get wrong.
 */
function traceEdge(
  shape: THREE.Shape,
  from: THREE.Vector2,
  to: THREE.Vector2,
  edge: Edge,
  tab: number
): void {
  if (edge === 0) {
    shape.lineTo(to.x, to.y);
    return;
  }

  const along = new THREE.Vector2().subVectors(to, from);
  const length = along.length();

  along.normalize();

  /*
   * Perpendicular, pointing out of the piece for a tab and in for a socket.
   *
   * For a counterclockwise contour the outward normal of an edge running
   * (dx, dy) is (dy, -dx). The other sign convention still produces a valid
   * jigsaw — every shared edge carries E and -E, so flipping both keeps them
   * interlocked — but it silently swaps the meaning of `Edge`, and a 1 that
   * cuts a socket is a trap for whoever reads this next.
   */
  const out = new THREE.Vector2(along.y, -along.x).multiplyScalar(edge);

  /** A point at `t` along the edge and `o` away from it. */
  const at = (t: number, o: number) =>
    new THREE.Vector2(
      from.x + along.x * length * t + out.x * o,
      from.y + along.y * length * t + out.y * o
    );

  const neckStart = at(NECK_START, 0);
  const neckEnd = at(NECK_END, 0);

  shape.lineTo(neckStart.x, neckStart.y);

  /*
   * Out through the neck, around the head, and back. The first and last
   * control points pull sideways to undercut the neck; the middle pair carry
   * the curve wide enough to make the head round.
   */
  const liftA = at(NECK_START - 0.06, tab * 0.72);
  const liftB = at(NECK_START + 0.02, tab * 1.15);
  const crest = at(0.5, tab * 1.15);

  shape.bezierCurveTo(
    liftA.x,
    liftA.y,
    liftB.x,
    liftB.y,
    crest.x,
    crest.y
  );

  const fallA = at(NECK_END - 0.02, tab * 1.15);
  const fallB = at(NECK_END + 0.06, tab * 0.72);

  shape.bezierCurveTo(
    fallA.x,
    fallA.y,
    fallB.x,
    fallB.y,
    neckEnd.x,
    neckEnd.y
  );

  shape.lineTo(to.x, to.y);
}

/**
 * Builds one piece, centred on the origin and lying in the XY plane.
 *
 * Centred rather than corner-anchored so a piece can be rotated and scaled
 * about itself — which is what a piece dropping into place needs to do.
 */
export function createPuzzlePieceGeometry(
  edges: PieceEdges,
  options: PieceOptions
): THREE.ExtrudeGeometry {
  const { size, thickness, tab = 0.2 } = options;

  const half = size / 2;
  const tabDepth = size * tab;

  /* Corners, anticlockwise from bottom left. */
  const bl = new THREE.Vector2(-half, -half);
  const br = new THREE.Vector2(half, -half);
  const tr = new THREE.Vector2(half, half);
  const tl = new THREE.Vector2(-half, half);

  const shape = new THREE.Shape();
  shape.moveTo(bl.x, bl.y);

  /*
   * Anticlockwise, so the perpendicular in `traceEdge` points out of the
   * piece on every side. Reverse the winding and every tab becomes a socket.
   */
  traceEdge(shape, bl, br, edges.bottom, tabDepth);
  traceEdge(shape, br, tr, edges.right, tabDepth);
  traceEdge(shape, tr, tl, edges.top, tabDepth);
  traceEdge(shape, tl, bl, edges.left, tabDepth);

  shape.closePath();

  const bevel = thickness * 0.18;

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 6,
    steps: 1,
  });

  /* Extrusion runs 0 to depth; recentre it so the piece lies on its own plane. */
  geometry.translate(0, 0, -thickness / 2);
  geometry.computeVertexNormals();

  return geometry;
}
