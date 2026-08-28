/**
 * THE FILING CABINET
 *
 * Two drawers, each holding a row of hanging files with a handwritten tab.
 * The deck's opening object, and the frame the whole first half runs inside:
 * the lower drawer is work already done, the upper drawer is what is being
 * proposed.
 *
 * WHY THIS IS A PART AND NOT AN ACT
 *
 * Every other object in this deck belongs to one act and vanishes when that
 * act does. The cabinet is the opposite — it has to PERSIST while several
 * slides play in front of it, because a file cannot be pulled out of a
 * cabinet that stopped existing at the slide boundary.
 *
 * So it is built here, owned by `cabinetAct`, and driven by numbers that come
 * from the slide rather than from a clock of its own. Nothing in this file
 * keeps time; ask it for a pose and it takes it.
 *
 * THE DRAWER IS THE TABLE OF CONTENTS
 *
 * The labels are the argument. A drawer of files with legible handwritten
 * tabs says "here is everything, and it is already filed" in one shot, which
 * is a claim a bulleted list of the same words cannot make — a list is
 * something you wrote for this presentation, and a drawer is something that
 * was already there.
 *
 * That is also why the tabs are HANDWRITTEN rather than set in the deck's
 * monospace. Machine type on a file reads as a system's output; handwriting
 * reads as a person having filed it.
 */

import * as THREE from "three";

import { clamp01, smootherstep } from "./easing";
import { createLabel, type Label } from "./label";
import { body } from "./props";
import { FOLDER_HEX, GOLD_HEX, SAGE_HEX, TEXT } from "../palette";

/** Outside dimensions of the carcass. */
const WIDTH = 4.6;
const HEIGHT = 5.4;
const DEPTH = 3.6;

/** How far a drawer travels when fully open. */
const TRAVEL = DEPTH * 0.78;

const DRAWER_H = HEIGHT * 0.42;
const DRAWER_GAP = HEIGHT * 0.04;

/**
 * Centre to centre between the two drawers.
 *
 * Exported because `slides.ts` needs it. The cabinet is only ever moved and
 * turned about Y, so the upper drawer is the lower one raised by exactly this
 * and nothing else — which means every camera pose written for a lower-drawer
 * file works on an upper-drawer file with this added to its height, and the
 * file beat plays identically in both. Hard-coding the number over there
 * instead would put a second copy of this geometry in a file that cannot see
 * when it changes.
 */
export const DRAWER_PITCH = DRAWER_H + DRAWER_GAP;

/** File card size, and how far the tab stands above the card. */
const FILE_W = WIDTH * 0.78;
const FILE_H = DRAWER_H * 0.82;
const TAB_H = 0.34;

export interface CabinetFile {
  /** The handwritten tab text. */
  label: string;
}

export interface Cabinet {
  root: THREE.Group;

  /**
   * Pose both drawers.
   *
   * `lower` and `upper` are each 0 (shut) to 1 (fully out). Both are passed
   * every frame rather than a single "which drawer" flag, so the deck can
   * cross one closing with the other opening without the cabinet needing to
   * know that is what is happening.
   */
  setDrawers: (lower: number, upper: number) => void;

  /**
   * Take one file out of its drawer and open it, 0 to 1.
   *
   * `drawer` is 0 for the lower and 1 for the upper; `index` is the file's
   * place in it. Passing -1 presents nothing, which is the resting state.
   *
   * The whole beat is one number, and it runs in phases inside: the file
   * lifts clear of the drawer, the front cover swings open about the fold
   * while it is still held at arm's length, and only then is the open folder
   * pushed in toward the camera, growing as it comes. Run it backwards and
   * the file shuts and goes back where it came from, which is how the deck
   * puts one file away and takes out the next.
   *
   * Opening BEFORE the push rather than during it is what keeps the cover
   * out of the lens; the note on STAGE_Y in the implementation has the
   * numbers.
   *
   * At 1 the open folder's inside is bigger than the frame. That is the
   * point of the ending: the deck cuts from here to a flat slide whose
   * ground is the same manila, and a cut between two frames that are both
   * nothing but folder is a cut nobody sees.
   */
  setPresented: (drawer: number, index: number, amount: number) => void;

  setAccent: (color: THREE.Color) => void;
  dispose: () => void;
}

export interface CabinetOptions {
  /** Files in the lower drawer — work already done. */
  lower: readonly CabinetFile[];

  /** Files in the upper drawer — what is being proposed. */
  upper: readonly CabinetFile[];
}

/**
 * A flat card with genuinely rounded CORNERS.
 *
 * `body` from `props.ts` cannot do this, and the reason is worth knowing:
 * `RoundedBoxGeometry` rounds every edge with one radius, so it has to cap
 * that radius against the smallest dimension — and a sheet of card is
 * thin. On a 3.6 x 1.9 file only 0.05 deep, the cap lands at 0.023, which
 * is under one percent of the width and reads as a perfectly square corner.
 *
 * So the outline is drawn as a `Shape` and extruded, exactly the way
 * `gear.ts` and `puzzlePiece.ts` build their profiles. The corner radius is
 * then free of the thickness entirely, and a thin sheet can have the same
 * generous corner a real folder does. A small bevel is still applied on the
 * extrusion so the cut edge catches the key light.
 */
const card = (
  w: number,
  h: number,
  thickness: number,
  radius: number
): THREE.ExtrudeGeometry => {
  const r = Math.min(radius, Math.min(w, h) / 2);
  const x = w / 2;
  const y = h / 2;

  const shape = new THREE.Shape();

  shape.moveTo(-x + r, -y);
  shape.lineTo(x - r, -y);
  shape.quadraticCurveTo(x, -y, x, -y + r);
  shape.lineTo(x, y - r);
  shape.quadraticCurveTo(x, y, x - r, y);
  shape.lineTo(-x + r, y);
  shape.quadraticCurveTo(-x, y, -x, y - r);
  shape.lineTo(-x, -y + r);
  shape.quadraticCurveTo(-x, -y, -x + r, -y);
  shape.closePath();

  const bevel = thickness * 0.16;

  /*
   * The depth is REDUCED by the bevel, and that is not a detail.
   *
   * `ExtrudeGeometry` adds `bevelThickness` to BOTH ends of the extrusion, so
   * asking for depth 0.05 with a 0.008 bevel returns a card 0.066 thick whose
   * face sits at 0.033 rather than the 0.025 the caller expects. Anything
   * placed against that face using the thickness it asked for lands INSIDE
   * the card — which is exactly how the tab labels disappeared.
   *
   * Taking the bevel out of the depth makes `thickness` mean what it says, so
   * a caller can put something flush at thickness / 2 and be right.
   */
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(thickness - bevel * 2, 1e-4),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    curveSegments: 5,
    steps: 1,
  });

  /* Recentre, accounting for the bevel the extrusion added at the near end. */
  geometry.translate(0, 0, -(thickness / 2 - bevel));
  geometry.computeVertexNormals();

  return geometry;
};

export function createCabinet(options: CabinetOptions): Cabinet {
  const root = new THREE.Group();

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const labels: Label[] = [];

  const keepG = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };

  const keepM = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  /* -------------------------------------------------------------- carcass */

  /*
   * PAINTED steel, not bare steel, and that distinction is the whole finish.
   *
   * The first pass ran metalness 0.62 against roughness 0.52, which is a
   * polished surface. On an object this size that is not a highlight, it is a
   * mirror: the key and the rim each lay a hard streak down a face nearly six
   * units across, and the streaks clear the bloom threshold — the same trap
   * the sea fell into at roughness 0.34.
   *
   * A filing cabinet is powder-coated anyway. Low metalness with high
   * roughness is what that actually is, and it lets the form carry the object
   * instead of the reflections.
   */
  const shellMaterial = keepM(
    new THREE.MeshStandardMaterial({
      color: 0x3a3f38,
      roughness: 0.78,
      metalness: 0.18,
    })
  );

  /*
   * PANELS, NOT A BLOCK — and this is the whole reason the drawers used to
   * look wrong.
   *
   * The first pass built the carcass as one solid `BoxGeometry` with a dark
   * "cavity" mesh placed inside it. A solid box has no hole in it, so the
   * cavity was sealed in where nothing could ever see it, and a drawer
   * sliding out appeared to emerge from an unbroken steel face. The files
   * genuinely did come out of nowhere: there was nowhere for them to come
   * from.
   *
   * So the carcass is now six panels and two front rails, with a real opening
   * at each drawer. Slightly more geometry, and the only version where an
   * open drawer reveals a recess behind it.
   */
  const WALL = 0.12;

  const panel = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number
  ) => {
    const mesh = new THREE.Mesh(keepG(body(w, h, d, 0.035)), shellMaterial);

    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);

    return mesh;
  };

  /* Sides, back, top and bottom. */
  for (const side of [-1, 1]) {
    panel(WALL, HEIGHT, DEPTH, side * (WIDTH / 2 - WALL / 2), 0, 0);
  }

  panel(WIDTH, HEIGHT, WALL, 0, 0, -(DEPTH / 2 - WALL / 2));
  panel(WIDTH, WALL, DEPTH, 0, HEIGHT / 2 - WALL / 2, 0);
  panel(WIDTH, WALL, DEPTH, 0, -(HEIGHT / 2 - WALL / 2), 0);

  /*
   * A dark liner inside each bay, drawn BACK side out so what shows is the
   * inside of a box rather than the outside of one. That single flag is the
   * difference between a recess and a black brick sitting in the opening.
   */
  const voidMaterial = keepM(
    new THREE.MeshStandardMaterial({
      /*
       * Lifted off black. At 0x14171a the recess read as a hole cut in the
       * frame rather than as the inside of a drawer — a shadowed interior
       * still catches some bounce, and against a cream background a true
       * black reads as absence.
       */
      color: 0x232725,
      roughness: 0.96,
      metalness: 0,
      side: THREE.BackSide,
    })
  );

  /* --------------------------------------------------------------- drawers */

  const drawerFaceMaterial = keepM(
    new THREE.MeshStandardMaterial({
      color: 0x434840,
      roughness: 0.74,
      metalness: 0.2,
    })
  );

  /* Drawer interior. Darker than the outside, as a painted box always is. */
  const drawerInnerMaterial = keepM(
    new THREE.MeshStandardMaterial({
      color: 0x30352f,
      roughness: 0.86,
      metalness: 0.12,
    })
  );

  /*
   * The handle keeps some shine. It is the one small part where a highlight
   * reads as a machined fitting rather than as glare, and it is far too
   * narrow to throw a streak.
   */
  const handleMaterial = keepM(
    new THREE.MeshStandardMaterial({
      color: SAGE_HEX,
      roughness: 0.44,
      metalness: 0.62,
    })
  );

  /*
   * Manila, and it needed to be warmer than it was.
   *
   * The first pass used 0xd8cfbe, which is a grey-beige: against a cream
   * background it read as off-white card, not as a folder. A real manila is
   * yellower and a good deal deeper, and the depth matters as much as the
   * hue — anything pale and diffuse at this size drifts up toward the bloom
   * threshold and starts to glow, which is the trap `materials.ts` warns
   * about.
   *
   * It also now sits in the same warm family as the deck's gold accent
   * instead of fighting it.
   */
  const FILE_COLOR = FOLDER_HEX;

  const fileMaterial = keepM(
    new THREE.MeshStandardMaterial({
      color: FILE_COLOR,
      roughness: 0.88,
      metalness: 0.02,
    })
  );

  /*
   * The tab. Same manila as the card, and the same roughness — the emissive
   * is what marks the live file, not a different paper.
   *
   * ONE MATERIAL PER TAB, and it has to be. This was a single shared
   * material with the live file's brightness written into it every frame,
   * which does not say "this one" — it says "all of them", because every tab
   * in both drawers was reading from it. Seven tabs lit and dimmed together
   * and the cue meant nothing.
   */
  const tabMaterials: THREE.MeshStandardMaterial[] = [];

  const makeTabMaterial = () =>
    keepM(
      new THREE.MeshStandardMaterial({
        color: FILE_COLOR,
        roughness: 0.88,
        metalness: 0.02,
        emissive: new THREE.Color(GOLD_HEX),
        emissiveIntensity: 0,
      })
    );

  /** One file, and everything `setPresented` needs to pose it. */
  interface FileParts {
    /** The whole folder. Lifted, carried and grown by `setPresented`. */
    group: THREE.Group;

    /** The fold. Turning this is what opens the folder. */
    hinge: THREE.Group;

    /**
     * The fold's own height, which RISES as the folder opens.
     *
     * Shut, the fold is the file's bottom edge. Opened, the cover has swung
     * down past it and the folder is twice as tall, so the fold has to end up
     * halfway up for the open folder to stay centred on where the shut one
     * was. Moving the spine is how that happens.
     */
    spine: THREE.Group;

    /** The turn from upright-in-a-drawer to lying open. */
    roll: THREE.Group;

    /** This file's own tab, so lighting one does not light all of them. */
    tabMaterial: THREE.MeshStandardMaterial;

    /** Where it sits when it is just a file in a drawer. */
    restY: number;
    restZ: number;
  }

  interface DrawerParts {
    group: THREE.Group;
    files: FileParts[];
  }

  const drawers: DrawerParts[] = [];

  /*
   * ONE LEAF, USED TWICE PER FILE.
   *
   * A file used to be a single card, which is fine in a drawer and useless
   * the moment one has to open. A folder that opens is two leaves sharing a
   * fold, and the fold has to be an axis something can actually turn about —
   * so the leaf is built with its LEFT EDGE ON THE ORIGIN rather than
   * centred, and the hinge group sits at the fold.
   */
  const leafGeometry = keepG(card(FILE_W, FILE_H, 0.04, 0.075));
  leafGeometry.translate(0, FILE_H / 2, 0);

  /** How far the two leaves sit apart when the folder is shut. */
  const LEAF_GAP = 0.055;
  const tabGeometry = keepG(card(FILE_W * 0.26, TAB_H, 0.05, 0.06));

  const buildDrawer = (
    centreY: number,
    contents: readonly CabinetFile[]
  ): DrawerParts => {
    /*
     * The bay liner, fixed to the carcass rather than to the moving drawer.
     * Sized to the actual opening now that there is one, and pushed back so
     * its open front sits flush with the front rails.
     */
    /*
     * The one part deliberately NOT bevelled. This is an inside corner in
     * folded sheet metal, which is sharp in the real thing — and a rounded
     * box turned inside out softens exactly the edges that tell the eye how
     * deep the recess goes.
     */
    const bay = new THREE.Mesh(
      keepG(
        new THREE.BoxGeometry(WIDTH - WALL * 2, DRAWER_H, DEPTH - WALL * 2)
      ),
      voidMaterial
    );

    bay.position.set(0, centreY, -WALL / 2);
    root.add(bay);

    const group = new THREE.Group();
    group.position.set(0, centreY, 0);
    root.add(group);

    /* The one part anyone ever touches, so it gets the largest radius. */
    const face = new THREE.Mesh(
      keepG(body(WIDTH * 0.96, DRAWER_H, 0.16, 0.05)),
      drawerFaceMaterial
    );

    face.position.z = DEPTH / 2;
    face.castShadow = true;
    group.add(face);

    /*
     * A real box: floor, two sides and a back, open only at the top.
     *
     * The first pass had a face and a floor and nothing else, which from
     * above is not a drawer — it is a shelf with a plank in front of it, and
     * the files appeared to be standing on open air. The sides are what make
     * the opening read as a container with depth, and they are the surfaces
     * that catch the shadow the files cast.
     */
    const inner = WIDTH * 0.86;
    const innerDepth = DEPTH * 0.84;
    const wall = 0.07;

    /* Sides are shorter than the face, so the box reads as sitting inside it. */
    const wallH = DRAWER_H * 0.78;
    const wallY = -DRAWER_H / 2 + wallH / 2;

    const floor = new THREE.Mesh(
      keepG(body(inner, 0.08, innerDepth, 0.02)),
      drawerInnerMaterial
    );

    floor.position.set(0, -DRAWER_H / 2 + 0.04, DEPTH * 0.08);
    floor.receiveShadow = true;
    group.add(floor);

    const sideGeometry = keepG(body(wall, wallH, innerDepth, 0.02));

    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(sideGeometry, drawerInnerMaterial);

      panel.position.set(side * (inner / 2 - wall / 2), wallY, DEPTH * 0.08);
      panel.castShadow = true;
      panel.receiveShadow = true;
      group.add(panel);
    }

    const back = new THREE.Mesh(
      keepG(body(inner, wallH, wall, 0.02)),
      drawerInnerMaterial
    );

    back.position.set(0, wallY, DEPTH * 0.08 - innerDepth / 2 + wall / 2);
    back.receiveShadow = true;
    group.add(back);

    const handle = new THREE.Mesh(
      keepG(body(WIDTH * 0.34, 0.16, 0.14, 0.045)),
      handleMaterial
    );

    handle.position.set(0, 0, DEPTH / 2 + 0.14);
    handle.castShadow = true;
    group.add(handle);

    /*
     * Files stand upright, spread front to back through the drawer. The tabs
     * are staggered left and right so no tab hides the one behind it — which
     * is exactly what a real drawer does, and the only reason all of them can
     * be read at once from a camera above.
     */
    const files: FileParts[] = [];
    const span = DEPTH * 0.62;

    contents.forEach((entry, index) => {
      const file = new THREE.Group();

      const z =
        contents.length > 1
          ? -span / 2 + (span * index) / (contents.length - 1)
          : 0;

      /*
       * Seated ON the drawer floor rather than centred in the drawer. Centred
       * left them floating a finger's width clear of it, which is the kind of
       * gap that reads as "these were placed by a renderer" the moment a
       * shadow falls under them.
       */
      const floorTop = -DRAWER_H / 2 + 0.08;

      file.position.set(0, floorTop + FILE_H / 2, z + DEPTH * 0.06);
      group.add(file);

      /*
       * UPRIGHT. The first pass rotated the card flat, which is a sheet of
       * paper lying on a desk, not a file standing in a drawer — and it put
       * every tab face-down where the camera could never read it.
       *
       * Standing them up and spreading them front to back is also the only
       * arrangement where all four tabs are legible at once from above, which
       * is the entire job of this shot.
       */
      /*
       * THE FOLD, AND THE TWO LEAVES HANGING OFF IT.
       *
       * `spine` sits on the file's left edge, so a rotation about it is the
       * fold and nothing else has to move. The back leaf is fixed to it; the
       * front leaf hangs off `hinge`, which is the only thing that turns
       * when the folder opens.
       *
       * Shut, the two sit a hair apart and read as one card of card — which
       * is all a file in a drawer needs to be. The separation is what stops
       * two coplanar faces fighting over the same pixels.
       */
      /*
       * The turn. Identity in the drawer, a quarter turn by the end.
       */
      const roll = new THREE.Group();
      file.add(roll);

      const spine = new THREE.Group();
      spine.position.y = -FILE_H / 2;
      roll.add(spine);

      const back = new THREE.Mesh(leafGeometry, fileMaterial);
      back.position.z = -LEAF_GAP / 2;
      back.castShadow = true;
      back.receiveShadow = true;
      spine.add(back);

      const hinge = new THREE.Group();
      spine.add(hinge);

      const front = new THREE.Mesh(leafGeometry, fileMaterial);
      front.position.z = LEAF_GAP / 2;
      front.castShadow = true;
      front.receiveShadow = true;
      hinge.add(front);

      const tabMaterial = makeTabMaterial();
      tabMaterials.push(tabMaterial);

      const tab = new THREE.Mesh(tabGeometry, tabMaterial);

      /*
       * Tabs fan across the full width of the file, one lane each.
       *
       * This was `(index % 3) - 1`, which only has three lanes — so a fourth
       * file landed back on the first one's lane and hid behind it the moment
       * the camera came round to the front. Spreading by POSITION IN THE
       * DRAWER instead means no two tabs can ever share a lane, whatever the
       * drawer holds.
       */
      const lane =
        contents.length > 1 ? (index / (contents.length - 1)) * 2 - 1 : 0;

      /*
       * ABOVE the card's top edge, not on its face. A tab is the bit that
       * stands proud of the file so you can read it with the drawer shut;
       * one sitting mid-card is just a sticker.
       */
      /*
       * Measured from the FOLD, and parented to it, because the fold moves.
       * The tab belongs to the back leaf's top edge; hung off the file
       * instead it would stay put while the leaf it is glued to rose.
       */
      const tabY = FILE_H + TAB_H / 2 - 0.02;

      tab.position.set(lane * FILE_W * 0.35, tabY, 0);
      tab.rotation.x = -0.3;
      tab.castShadow = true;
      spine.add(tab);

      /*
       * The writing is the tab's own SURFACE, not a decal in front of it.
       *
       * Backed with the same manila and lit like the paper, so it shades with
       * the folder as the drawer swings out. Unlit and unbacked — which is
       * what every other label in this deck is — it held full brightness
       * while the tab under it fell into shadow, and read as a glowing
       * sticker rather than as ink.
       */
      const label = createLabel(entry.label, {
        /*
         * Narrower than the tab it sits on. The label is a plain rectangle,
         * so at the tab's full width its square corners would poke out past
         * the rounded ones underneath.
         */
        width: FILE_W * 0.21,
        color: TEXT,
        tracking: 0.02,
        weight: 600,

        /* Handwritten. See the note at the top of the file on why. */
        font: "Caveat",

        background: `#${FILE_COLOR.toString(16).padStart(6, "0")}`,
        lit: true,
      });

      /*
       * FLUSH with the tab face, not floating in front of it.
       *
       * The tab is 0.05 thick, so its front face sits 0.025 out; the label
       * goes a thousandth beyond that. The old 0.04 stand-off was there to
       * dodge z-fighting with a transparent plane, and at a low angle it read
       * as a card hovering off the folder with a visible gap under it. An
       * opaque lit label does not need the clearance.
       */
      const faceOut = 0.026;

      label.mesh.position.set(
        lane * FILE_W * 0.35,
        tabY + Math.sin(0.3) * faceOut,
        Math.cos(0.3) * faceOut
      );

      label.mesh.rotation.x = -0.3;

      /* On the spine with the tab it is written on, for the same reason. */
      spine.add(label.mesh);
      labels.push(label);

      files.push({
        group: file,
        hinge,
        spine,
        roll,
        tabMaterial,
        restY: file.position.y,
        restZ: file.position.z,
      });
    });

    return { group, files };
  };

  const lowerY = -(DRAWER_H + DRAWER_GAP) / 2;
  const upperY = (DRAWER_H + DRAWER_GAP) / 2;

  drawers.push(buildDrawer(lowerY, options.lower));
  drawers.push(buildDrawer(upperY, options.upper));

  /*
   * Front rails: the steel that survives between and around the two openings.
   *
   * Without these the front of the cabinet is simply missing, because the
   * panels above only close the sides, back, top and bottom. Each rail spans
   * the gap the drawers do not occupy, which is what turns four separate
   * panels into a face with two holes in it.
   */
  const railTop = HEIGHT / 2;
  const upperOpen = upperY + DRAWER_H / 2;
  const lowerOpen = lowerY - DRAWER_H / 2;

  const rail = (from: number, to: number) => {
    const height = to - from;

    if (height <= 0.001) {
      return;
    }

    panel(
      WIDTH - WALL * 2,
      height,
      WALL,
      0,
      (from + to) / 2,
      DEPTH / 2 - WALL / 2
    );
  };

  /* Above the upper drawer, between the two, and below the lower one. */
  rail(upperOpen, railTop);
  rail(lowerY + DRAWER_H / 2, upperY - DRAWER_H / 2);
  rail(-railTop, lowerOpen);

  const setDrawers = (lower: number, upper: number) => {
    drawers[0].group.position.z = THREE.MathUtils.clamp(lower, 0, 1) * TRAVEL;
    drawers[1].group.position.z = THREE.MathUtils.clamp(upper, 0, 1) * TRAVEL;
  };

  /*
   * WHERE A PRESENTED FILE ENDS UP, in the drawer's own space.
   *
   * Derived, not dialled in. The camera pose the deck flies to during the
   * beat is computed from exactly these three numbers, so moving one here
   * without moving the entry camera in `slides.ts` breaks the ending — which
   * is a cut that only works because the open folder is bigger than the
   * frame. See the note on ENTRY_FILL there.
   */
  const OUT_Y = 1.55;
  const OUT_Z = 3.4;
  const OUT_SCALE = 1.5;

  /*
   * WHERE IT OPENS, which is NOT where it ends up.
   *
   * The file is held here — clear of the drawer, still small, still most of
   * the room away from the camera — for as long as the cover is turning, and
   * only carried in once it is open.
   *
   * That staging pose is the whole reason this beat works, and it is worth
   * being explicit about the geometry that forces it. The cover is a leaf
   * FILE_H long swinging a half turn about the fold; at OUT_SCALE that is an
   * arc nearly three units across. The camera finishes the beat 2.2 units
   * from the folder. Those two numbers cannot both be true while the cover
   * is turning: opening the file where it ends up sweeps the cover clean
   * through the lens, and the near plane slices it on the way past.
   *
   * So the turn happens out here instead, where the arc has room, and the
   * open folder is pushed in afterwards. Held at this distance the cover's
   * nearest corner stays 2.24 units in front of the camera through the worst
   * of the swing, against 3 units BEHIND it before.
   *
   * The margin got better when the fold moved to the bottom edge, because
   * the cover then sweeps FILE_H rather than FILE_W — a little over half the
   * arc. The staging is still what makes it safe, but it is no longer close.
   *
   * Opening toward the viewer is not a style choice either — see the note on
   * the hinge below. Away is the direction that has no room.
   */
  const STAGE_Y = 0.45;
  const STAGE_Z = 2.1;

  /**
   * One number, three overlapping phases: rise, open, push in.
   *
   * Overlapping rather than sequential: a file that finishes rising, then
   * starts opening, then starts moving forward reads as three separate
   * mechanisms taking turns. Letting each begin before the last has finished
   * is what makes it one movement.
   *
   * The ORDER changed, though, and the order is load-bearing. It used to
   * carry the file in and open it at the end, which is the natural way to
   * write it and the one arrangement the camera cannot survive — see
   * STAGE_Y. Opening happens in the middle now, at arm's length, and the
   * push in is what finishes the beat.
   *
   * Both ends are untouched by the reshuffle: at 0 the file is exactly at
   * rest in its drawer, and at 1 it is exactly at OUT_Y / OUT_Z / OUT_SCALE
   * with the cover flat. That matters because the deck cuts on both frames —
   * the entry camera in `slides.ts` is derived from the pose at 1, and
   * running the beat backwards to put a file away lands on the pose at 0.
   */
  const setPresented = (drawer: number, index: number, amount: number) => {
    const a = clamp01(amount);

    const lift = smootherstep(clamp01(a / 0.28));
    const swing = smootherstep(clamp01((a - 0.2) / 0.36));
    const push = smootherstep(clamp01((a - 0.52) / 0.48));

    const scale = THREE.MathUtils.lerp(1, OUT_SCALE, push);

    drawers.forEach((parts, d) => {
      parts.files.forEach((file, i) => {
        if (d !== drawer || i !== index) {
          file.group.position.set(0, file.restY, file.restZ);
          file.group.rotation.set(0, 0, 0);
          file.group.scale.setScalar(1);
          file.hinge.rotation.x = 0;
          file.spine.position.y = -FILE_H / 2;
          file.roll.rotation.z = 0;
          file.tabMaterial.emissiveIntensity = 0;

          return;
        }

        /*
         * Two lerps, not one: out of the drawer to the staging pose, and
         * only then in to where it ends up. The file is at STAGE_* for the
         * whole of the swing, which is the point of splitting them.
         *
         * The hop rides on `lift * (1 - lift)`, so it rises and settles
         * within the rise itself rather than being cancelled later by a
         * phase that has not started yet. The file is pulled out by hand,
         * not tracked along a rail.
         */
        file.group.position.y =
          THREE.MathUtils.lerp(
            THREE.MathUtils.lerp(file.restY, STAGE_Y, lift),
            OUT_Y,
            push
          ) +
          FILE_H * 0.9 * lift * (1 - lift) * (1 - push);

        file.group.position.z = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(file.restZ, STAGE_Z, lift),
          OUT_Z,
          push
        );

        file.group.scale.setScalar(scale);

        /*
         * Tipped back as it comes up, and square again by the time the cover
         * is over. Square is not a style choice: the last frame has to be
         * flat-on manila or the cut into the flat slide shows a folder at an
         * angle becoming a page that is not.
         */
        file.group.rotation.x = -0.3 * lift * (1 - swing) * (1 - push);

        /*
         * IT OPENS UPWARD, ABOUT ITS BOTTOM EDGE.
         *
         * Which is how a file in a drawer is actually built: the fold is at
         * the bottom, the two leaves stand up from it, and the tab is the top
         * of the back one. It used to hinge about the LEFT edge — a folder
         * lying on a desk, not standing in a drawer — and the cover swung out
         * sideways across the frame.
         *
         * POSITIVE, so the cover comes toward the viewer on its way over and
         * finishes below the fold. That is forced rather than preferred: the
         * two leaves sit LEAF_GAP apart with the back one behind, so a cover
         * turning the other way crosses the back leaf's plane within two
         * degrees of leaving it and drags a seam across itself for the rest
         * of the turn. Toward the viewer is the side with nothing in it.
         *
         * The arc is also half what it was — the cover now sweeps FILE_H
         * rather than FILE_W — which is why it clears the camera by 2.24
         * units here against 1.76 before.
         */
        file.hinge.rotation.x = Math.PI * swing;

        /*
         * The fold rides up as the cover comes over, so the folder stays
         * centred on the spot the shut one occupied. Opening doubles the
         * height BELOW the fold; without this the folder walks off the
         * bottom of frame exactly as it becomes the only thing in it, and
         * the camera is already committed.
         */
        file.spine.position.y = (-FILE_H / 2) * (1 - swing);

        /*
         * AND THEN IT TURNS TO BE READ.
         *
         * A quarter turn, taken while it flies in. The folder opens the way
         * it is built — bottom fold, leaves above and below — and that leaves
         * the fold lying HORIZONTALLY across the frame, which is the one
         * thing the ending cannot have: the flat slide it cuts to is a folder
         * with a sheet on the left leaf and the act on the right, so its fold
         * is vertical and dead centre. The turn is what squares the two up.
         *
         * It rides on `push` rather than a phase of its own so the whole
         * back half of the beat is one move — the folder comes at the camera
         * turning, the way you would bring a file up to read it.
         */
        file.roll.rotation.z = (-Math.PI / 2) * push;
      });
    });

    /*
     * Only the live tab takes the accent, so the eye knows which one is next.
     * Every other tab was zeroed in the reset branch above.
     */
    const live = drawers[drawer]?.files[index];

    if (live) {
      live.tabMaterial.emissiveIntensity = lift * 0.9;
    }
  };

  setDrawers(0, 0);
  setPresented(-1, -1, 0);

  return {
    root,
    setDrawers,
    setPresented,

    /**
     * THE ACCENT MARKS A FILE, NOT THE FURNITURE.
     *
     * The handles used to take it too, which meant the cabinet's own metal
     * changed colour the moment the deck turned from finished work to
     * proposal — the drawer pulls went from sage to gold between one slide
     * and the next, on a box that had not moved. An accent is the deck saying
     * where it is in the argument; a filing cabinet is a filing cabinet.
     *
     * So the handles keep the sage they are made of, and the only thing this
     * touches is the glow on the tabs.
     */
    setAccent: color => {
      tabMaterials.forEach(m => m.emissive.copy(color));
    },

    dispose: () => {
      labels.forEach(l => l.dispose());
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());

      labels.length = 0;
      geometries.length = 0;
      materials.length = 0;
    },
  };
}
