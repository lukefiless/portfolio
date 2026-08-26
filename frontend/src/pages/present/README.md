# The presentation deck

A keynote deck rendered in Three.js, at `/present`.

Start here, then read `acts/act.ts`. Between the two you should be able to
change anything in here without opening a file you did not expect to.

---

## The one idea

**A slide is data. An act is a machine that can pose itself for any number
between 0 and 1.**

A slide says _"show the funnel act, and take it from 0 to 1 between second 15
and second 17."_ The act does not know what slide it is on, when it started,
or where the camera is.

That separation is the whole design. It is why retiming the deck means editing
numbers rather than code, and why an act written weeks after another still
looks like it belongs.

---

## The files

```
present/
  README.md          this
  slides.ts          THE DECK. Every slide, as data. You will edit this most.
  timeline.ts        samples a keyframe track at time t. You will not touch it.
  stage.ts           lights, lens, renderer, bloom. Tune the LOOK here.
  BlueprintPanel.tsx a 2D SVG overlay, used by one slide

  acts/
    act.ts           THE CONTRACT. Read this before writing an act.
    templateAct.ts   copy this to start a new one
    cogAct.ts          gear train                  kind: "cog"
    pipelineAct.ts     Wealthbox -> database       kind: "pipeline"
    projectsAct.ts     six-project grid            kind: "projects"
    funnelAct.ts       onboarding funnel           kind: "onboarding"
    architectureAct.ts containers                  kind: "architecture"
    dataGapAct.ts      two sources, one database   kind: "data-gap"
    localAiAct.ts      a room of workers           kind: "local-ai"
    ownedAct.ts        the drawing and the thing   kind: "owned"

  parts/             shared pieces acts build from
    easing.ts        clamp01, smootherstep, ease  <- the deck's three curves
    resources.ts     GPU resource pool for dispose
    materials.ts     the material palette
    props.ts         real objects: rack, monitor, desk, crate
    label.ts         monospace text on a plane
    figure.ts        the procedural dummy
    riggedFigure.ts  the imported character
    pose.ts          the walk, as pure numbers
    cellGrid.ts      the spreadsheet
    particles.ts     a pool of flowing dots
    gear.ts          parametric gear geometry
```

---

## A slide, field by field

```ts
{
  id: "cog",              // unique; React key
  duration: 15,           // seconds, then it HOLDS on its final state
  layout: "bottom",       // or "left" (default)
  hidden: true,           // optional — in the file, out of the running order
  bare: true,             // optional — no copy, no vignette

  copy:       [{ at: 0, value: { title: "…" } }],   // body is optional
  camera:     [{ at: 0, value: [x, y, z] }, …],
  target:     [{ at: 0, value: [x, y, z] }, …],     // what it looks at
  accent:     [{ at: 0, value: "#79f7ff" }],        // lit parts + counter
  background: [{ at: 0, value: INK }],

  act: { kind: "cog", driverTeeth: [ … ] },
}
```

Every field is a **keyframe track** — `{ at: seconds, value }`. They are
independent and all run off one clock that starts when you land on the slide,
so the camera can drift while the machine transforms while the accent shifts,
and none of them need to know about each other.

Three sampling rules:

- **Numbers, positions and colours blend**, eased with `smootherstep`.
- **Copy steps.** It swaps outright rather than crossfading through an
  unreadable middle.
- **Tracks clamp at both ends.** A track holds its first value before it starts
  and its last value forever after — that is why a slide settles and waits
  while you keep talking.

---

## How to change things

**Retime a slide** — edit its keyframe `at` values. Nothing else.

**Add a slide reusing an existing act** — append to `deck` in `slides.ts` with
an existing `kind`. That is the whole job; the counter, arrow keys, Home/End
and the `r` replay key all derive from `slides.length`.

**Add a slide with a new act** — copy `acts/templateAct.ts`. The five edits are
listed at the top of that file. The compiler catches most of them if you
forget, because the dispatch in `Present.tsx` is exhaustively narrowed on
`kind`.

**Hide a slide without deleting it** — set `hidden: true`. It stays in the
file, still typechecked, and disappears from everything downstream.

**Change the overall look** — `stage.ts`. Lights, exposure and bloom live
there and nowhere else.

**Change what things are made of** — `parts/materials.ts`. One palette; acts
should not declare their own materials.

---

## Controls

| Key                    | Does                    |
| ---------------------- | ----------------------- |
| click / space / → / ↓  | next slide              |
| ← / ↑ / backspace      | previous                |
| Home / End             | first / last            |
| **r**                  | replay the current slide |

`r` is your main tool when tuning timings.

---

## Things that will bite you

These are all mistakes that have actually been made in this codebase.

**Allocating in `update`.** It runs sixty times a second. Hoist every
`Vector3`, `Quaternion`, `Matrix4` and `Color` to closure scope and reuse it.

**Forgetting `reset`.** Anything that accumulates — a clock, a queue, a
ledger, a physics pile — must be undone, or a replay opens halfway through the
previous run.

**Forgetting `dispose`.** Three.js does not garbage collect GPU resources. Use
`createResourcePool` and it is one line.

**Over-lighting.** Bloom thresholds _linear_ light, before tone mapping, so a
pale surface under a strong key arrives at the bloom pass well above 1 and
turns into a lamp. If something washes out, the fix is the material or the
rig — not the bloom settings. Nothing diffuse should be pale; contrast comes
from finish, not brightness.

**`BoxGeometry` as a placeholder.** A cube has no silhouette and razor edges
that catch no light. Use `parts/props.ts`, or build with the same approach:
bevelled bodies, feet and bezels for the outline, fine repeated detail for the
sense that something was manufactured.

**Composing against the wrong aspect.** The stage is framed for 16:9. On a
narrower window it widens the _vertical_ FOV rather than cropping the sides,
so a shot framed on a laptop cannot clip on a projector. Check new framing at
1280×720.

**Trusting the dev preview when a slide looks frozen.** The preview pane
sometimes holds a stale module and renders an act's meshes without ever
calling its `update`. Hard-reload before assuming a bug.
