/**
 * MODEL INSPECTOR
 *
 * Reports whether a .glb or .gltf can actually be animated, so a candidate
 * can be checked before it is wired into the deck.
 *
 * The thing that matters is whether the file contains a SKIN — a skeleton
 * with bones the mesh is bound to. Without one there is nothing to rotate,
 * and no amount of re-exporting or converting between .gltf and .glb will
 * add it: both are the same data, one packed into a single binary file.
 *
 *   node scripts/inspect-model.mjs frontend/public/models/whatever.glb
 */

import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";

const GLB_MAGIC = "glTF";
const CHUNK_JSON = 0x4e4f534a;

/** Pulls the JSON manifest out of either container format. */
function readManifest(path) {
  const buffer = readFileSync(path);

  if (extname(path).toLowerCase() !== ".glb") {
    return JSON.parse(buffer.toString("utf8"));
  }

  if (buffer.toString("ascii", 0, 4) !== GLB_MAGIC) {
    throw new Error("Not a glTF binary file — the magic header is wrong.");
  }

  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32LE(offset);
    const type = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;

    if (type === CHUNK_JSON) {
      return JSON.parse(buffer.toString("utf8", start, start + length));
    }

    offset = start + length;
  }

  throw new Error("No JSON chunk found in the glb.");
}

const target = process.argv[2];

if (!target) {
  console.error("usage: node scripts/inspect-model.mjs <path to .glb|.gltf>");
  process.exit(1);
}

let gltf;

try {
  gltf = readManifest(target);
} catch (error) {
  console.error(`Could not read ${target}: ${error.message}`);
  process.exit(1);
}

const skins = gltf.skins ?? [];
const animations = gltf.animations ?? [];
const meshes = gltf.meshes ?? [];
const nodes = gltf.nodes ?? [];

const external = (gltf.buffers ?? [])
  .map(buffer => buffer.uri)
  .filter(uri => uri && !uri.startsWith("data:"));

console.log(`\n${basename(target)}`);
console.log(`  generator   ${gltf.asset?.generator ?? "(unknown)"}`);
console.log(`  meshes      ${meshes.length}`);
console.log(`  nodes       ${nodes.length}`);
console.log(`  skins       ${skins.length}`);
console.log(`  animations  ${animations.length}`);

if (animations.length > 0) {
  for (const clip of animations) {
    console.log(`                - ${clip.name ?? "(unnamed)"}`);
  }
}

if (external.length > 0) {
  console.log(`  needs alongside it: ${external.join(", ")}`);
}

/*
 * Bone names are worth printing: they are not standardised, and the mapping
 * from this rig's joints to a model's skeleton has to be written against
 * whatever convention the exporter happened to use.
 */
/*
 * The union across EVERY skin, not skins[0]. A Character Creator export
 * splits the body over twenty-odd skins in no meaningful order, and the first
 * one is routinely something like the tongue — which reports "3 bones" for a
 * fully rigged character and reads as a verdict when it is an accident of
 * ordering.
 */
const joints = new Set();

for (const skin of skins) {
  for (const index of skin.joints ?? []) {
    joints.add(nodes[index]?.name ?? `(node ${index})`);
  }
}

const boneNames = [...joints];

/*
 * Twist, share and scaleCompensation joints are helpers: they spin a limb
 * about its own length so the skin does not candy-wrap. Rotating one swings
 * nothing. riggedFigure.ts skips them for that reason, so this check has to
 * skip them too or it will pass a model the deck then rejects.
 */
const isHelper = name => /twist|share|scalecompensation/i.test(name);

const drivable = boneNames.filter(name => !isHelper(name));

/*
 * The legs are the minimum that makes a walk read at all — the same four
 * slots riggedFigure.ts refuses to load without.
 */
const ESSENTIAL = {
  "left thigh": ["cc_base_l_thigh", "mixamorig:leftupleg", "thigh_l", "leftupleg", "upperleg_l", "l_thigh"],
  "left calf": ["cc_base_l_calf", "mixamorig:leftleg", "calf_l", "leftleg", "lowerleg_l", "l_calf"],
  "right thigh": ["cc_base_r_thigh", "mixamorig:rightupleg", "thigh_r", "rightupleg", "upperleg_r", "r_thigh"],
  "right calf": ["cc_base_r_calf", "mixamorig:rightleg", "calf_r", "rightleg", "lowerleg_r", "r_calf"],
};

const missing = [];

if (skins.length > 0) {
  console.log(
    `\n  skeleton has ${boneNames.length} bones across ${skins.length} skin(s)`
  );

  const helpers = boneNames.length - drivable.length;

  if (helpers > 0) {
    console.log(`  ${helpers} of them are twist/share helpers and cannot pose`);
  }

  console.log("\n  the four joints a walk needs:");

  for (const [label, patterns] of Object.entries(ESSENTIAL)) {
    const hit = drivable.find(name =>
      patterns.some(pattern => name.toLowerCase().includes(pattern))
    );

    if (hit) {
      console.log(`    ${label.padEnd(12)} ${hit}`);
    } else {
      console.log(`    ${label.padEnd(12)} *** MISSING ***`);
      missing.push(label);
    }
  }
}

console.log("");

if (skins.length === 0) {
  console.log("  VERDICT: cannot be animated.");
  console.log("  No skeleton, so the limbs are baked into the mesh and there");
  console.log("  is nothing to rotate. Re-exporting or converting between");
  console.log("  .gltf and .glb will not change this — you need a model that");
  console.log("  was rigged in the first place.\n");
  process.exit(2);
}

/*
 * A skeleton alone is not enough, and this is the case that actually turns
 * up. Fab and Sketchfab conversions routinely ship a rig whose real limb
 * joints have been collapsed away, leaving only the twist helpers bound to
 * the mesh — 85 bones, none of which can bend a knee.
 */
if (missing.length > 0) {
  console.log("  VERDICT: has a skeleton, but cannot walk.");
  console.log(`  No drivable ${missing.join(", ")}.`);
  console.log("  The limb joints were stripped in conversion and only their");
  console.log("  twist helpers remain, which spin a limb about its own length");
  console.log("  and swing nothing. Nothing can recover them from this file —");
  console.log("  you need the original rig, or a Mixamo one.\n");
  process.exit(3);
}

console.log("  VERDICT: riggable.");
console.log(
  animations.length > 0
    ? "  It has a skeleton AND its own clips — either can drive it.\n"
    : "  It has a skeleton, so this rig's animation can drive its bones.\n"
);
