/**
 * THE COMPANY PALETTE
 *
 * Four colours, and the only place any of them is written down. Everything in
 * the deck — every slide accent, every act's default, the page text — comes
 * from here.
 *
 * WHY THIS FILE EXISTS
 *
 * The deck used to carry a different accent per slide: cyan, mint, lilac,
 * amber, periwinkle. Six hues across eight acts, each one hand-typed into
 * `slides.ts` and hand-typed again as a default inside its act. Changing the
 * look meant finding twenty-one literals and hoping.
 *
 * TWO ACCENTS, AND WHAT THEY MEAN
 *
 * Sage is the default. It carries the work that is already done — the seven
 * acts showing things that were built and are running.
 *
 * Gold marks what is UNRESOLVED: the gap that has not been closed, and the
 * ask at the end of the deck. Two accents used at random are just decoration;
 * used this way the second colour tells the room where it is in the argument
 * before a word is read.
 *
 * THE ONE THING TO WATCH
 *
 * These are mid-tone colours, and the ones they replaced were near-neon. The
 * bloom pass in `stage.ts` thresholds LINEAR light at 1.4, so anything that
 * used to glow on a cyan emissive will sit further under that line on sage.
 * If something is meant to read as LIT and no longer does, raise its
 * `emissiveIntensity` — do not lower the bloom threshold, which is shared by
 * every act.
 */

/** The ground every slide is composed against. */
export const BACKGROUND = "#E7E3E0";

/** The default accent. Work already done. */
export const SAGE = "#777A6B";

/** The second accent. What is unresolved, and what is being asked for. */
export const GOLD = "#B8964F";

/** Body and heading text on the flat pages, and the deck's copy layer. */
export const TEXT = "#242424";

/**
 * Manila. The colour of a file folder, and the ground an opened one presents.
 *
 * Two places need it and they must agree exactly or the illusion breaks: the
 * folders in the cabinet drawer, and the background of any slide that reads as
 * one of those folders lying open. It was two hand-typed values before, close
 * enough to look deliberate and far enough apart to look wrong.
 */
export const FOLDER = "#D2B98F";

/*
 * The same four as numbers, for Three.js. `new THREE.Color("#777A6B")` parses
 * the string perfectly well, so these exist only for the places that want a
 * hex literal — material constructors, mostly — and not as a second source of
 * truth. They are derived, never edited.
 */
export const BACKGROUND_HEX = Number.parseInt(BACKGROUND.slice(1), 16);
export const SAGE_HEX = Number.parseInt(SAGE.slice(1), 16);
export const GOLD_HEX = Number.parseInt(GOLD.slice(1), 16);
export const TEXT_HEX = Number.parseInt(TEXT.slice(1), 16);
export const FOLDER_HEX = Number.parseInt(FOLDER.slice(1), 16);
