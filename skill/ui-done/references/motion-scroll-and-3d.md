# Motion, Scroll, and 3D

For substantial frontend work, motion, scroll enhancement, and 2D Canvas are three distinct default layers. Give each one a role that communicates hierarchy, feedback, state, narrative, atmosphere, or drawing, then tune its intensity to the product. Evaluate true 3D/WebGL separately and adopt it only when the subject is inherently spatial, it adds unique communication value, and the team can finish it to the required quality. A restrained dashboard and an expressive campaign page should use the default layers differently; neither should receive forced 3D.

## Choose one primary owner per layer

| Layer | Default owner | Boundary |
|---|---|---|
| Hover, press, focus, simple reveal | CSS for isolated states, coordinated by the selected motion system when sequencing matters | Do not split ownership of the same property between CSS and the motion library |
| Component state, presence, layout continuity | One maintained UI-motion library or framework-native motion layer | Keep scroll pinning and scrubbing in the scroll layer |
| Scroll storytelling | Anime.js `onScroll` | Limit pinning and scrubbing to the narrative regions that need it; it owns choreography, not scroll mechanics |
| Smooth scrolling | Lenis through `lenis/react` | Default to it on computer, tablet, and phone when the tested path works; preserve reduced motion, nested controls, anchors, focus navigation, and precise regions |
| Conditional signature 3D scene | Three.js through React Three Fiber, only after the suitability gate passes | Use R3F as the React scene boundary, keep it in one bounded product-aligned region, and provide a static/DOM fallback; otherwise do not mount or request WebGL |
| Separate 2D Canvas role | Pts for creative/programmed drawing or Fabric.js for editable objects | This is independent from the R3F scene; use DOM controls and labels for essential interaction |

Research current APIs, maintenance, license, and bundle behavior before choosing the owners. Lenis is the starting scroll selection; Three.js/R3F is the starting 3D selection only after the suitability gate passes. Recheck selected packages at adoption time. For substantial work, missing motion, scroll, or separate 2D Canvas coverage requires an observed hard constraint, not merely “native is simpler.” A failed 3D suitability gate is a valid conditional decision and does not require a hard exemption.

When Anime.js is a serious candidate, read `open-source-ui-sources.md` before selection. Use it as the primary motion or timeline owner for a defined region, not as an extra engine layered over Motion, GSAP, CSS, or another system controlling the same behavior.

Use Lenis as the only smooth-scroll mechanics owner. Its official React component/hook should wrap the intended root or bounded container; Anime.js may consume scroll progress for choreography without becoming a second mechanics engine. Keep Lenis active across the default device matrix when it passes, and prefer excluding one incompatible nested region or scaling behavior before disabling it globally.

When true 3D/WebGL passes the gate, begin with `three` plus `@react-three/fiber`. Add `@react-three/drei` only for named helpers the scene needs. Use direct Three.js lifecycle code only when a low-level integration does not fit R3F; do not choose Pts, Fabric.js, CSS transforms, or a static fake merely to claim that real spatial rendering exists.

## Fit before scale

Name the existing host, the interface job, and the smallest useful footprint before implementing a visible effect. The selected library adapts to the page; the page does not grow a showcase block for the library.

- Motion attaches to an existing state change, hierarchy cue, or feedback loop. Do not invent extra entrances, carousels, or controls to make the animation system visible.
- Smooth scrolling improves an existing scroll path. Do not create a long narrative section merely to demonstrate smoothing or scroll triggers.
- True 3D uses a product object, spatial relationship, real visualization, or established visual motif only when the suitability gate passes. Without a natural host or unique spatial value, omit it instead of shrinking it into a decorative object.
- 2D Canvas receives a different host and job, such as a restrained programmed texture, drawing layer, particle response, or editable object surface. It cannot be counted as the 3D role, and the 3D scene cannot be counted again as Canvas.
- Never add a large standalone 3D panel, scene label, explanatory copy, or control cluster whose only job is to prove that the engine was installed.
- A cluster of stock primitives with one global auto-rotation, generic three-point lighting, and palette swaps is not a finished signature scene unless the subject specifically calls for that object and motion. Establish a scene-specific subject, composition/camera, material/environment response, light hierarchy, and meaningful motion; post-processing may finish that hierarchy but cannot create it.
- Across a set of intentionally different pages, adopted 3D may become a hero environment, an embedded product object, a scroll transition, a spatial diagram, or a quiet accent when that exact role passes the gate. Some pages should have no WebGL at all. Do not append the same framed Canvas after the same content block on every route.

If removing a new visual region changes no product meaning and only hides evidence of the library, the region is filler. Remove it, then relocate a default effect at a smaller scale or attach it to a real interaction. For 3D, removal means the suitability gate failed; do not force a replacement WebGL accent.

## 3D suitability gate

Evaluate 3D on every substantial build or redesign, but adopt it only when all four conditions pass:

1. **Natural host:** an existing product object, spatial relationship, real dataset, or established motif owns the scene.
2. **Inherently spatial subject:** material, volume, depth, or movement through space is central to the content.
3. **Unique communication value:** real 3D explains or expresses something that DOM, photography, video, SVG, or the required 2D Canvas layer cannot express as clearly.
4. **Finishable budget:** modeling, lighting/material response, subject-specific motion, responsive GPU cost, and a static/DOM fallback can all meet the delivery bar.

If any condition fails, record `3D not adopted: suitability gate failed: <specific reason>`. Stop 3D package and demo scouting for that surface before a serious candidate exists, and do not add, mount, download, initialize, or probe a WebGL runtime there. This is a successful evaluation, not a hard exemption. If all conditions pass, inspect the relevant official demos before selection and implementation.

## Geometry integrity and modeling finish

An adopted scene must pass all of these checks in several camera views and across its full animation cycle:

- No accidental mesh interpenetration, self-intersection, z-fighting, coplanar flicker, near/far-plane clipping, or animation-cycle collisions. Intentional structural joins, sockets, contact patches, nested shells, and atmospheric layers are valid only when their construction reads clearly.
- Stock boxes, spheres, cylinders, and toruses may support helpers, blocking, procedural construction, or an explicitly justified low-poly/technical language. They are not a finished-model strategy by themselves.
- The subject has one coherent silhouette, believable joins, intentional proportion and scale hierarchy, meaningful medium/small detail, and materials and lighting that reveal rather than flatten its form.
- Motion belongs to the subject: orbiting objects follow an intelligible path and orientation, mechanisms articulate at plausible joints, environments flow continuously, and nothing clips through another object during the loop.
- Post-processing may polish a good scene but cannot hide crude geometry, broken contacts, a generic primitive cluster, or weak framing.

## Prove host, meaning, and control

Answer these questions for every visible effect before implementation:

1. **Host:** What existing product object, content, data, state, interaction, or visual motif owns the effect?
2. **Meaning:** What does the user understand, accomplish, notice, or feel because it moves or gains depth?
3. **Control:** Why would the user need to pause, reset, rotate, scrub, change speed, or switch views?

If the host or meaning cannot be stated specifically, the effect is arbitrary. “More dynamic,” “more premium,” and “adds visual interest” are not sufficient unless they connect to the brief's content or established visual language. Rework a default effect, shrink it into a genuine accent, or give the tool a different role. For 3D, fail the suitability gate and omit it. A decorative scene name such as “field,” “orbit,” or “spatial view” does not create meaning; if removing the label makes the effect inexplicable, the label was compensating for weak integration.

Prefer motion on a surface the product already expects—a promotional strip, schedule card, product object, map path, progress state, or real chart transition—over a separate animation surface. The reusable lesson is integration into existing content, not copying any particular marquee, orbit, or visual style.

Treat visible controls as product features. Do not surface pause, reset, rotate, speed, view, or scene controls simply because the library provides them. Use them only when direct manipulation serves a real task or when an accessibility requirement calls for a user-operated mechanism. For ambient or decorative motion, prefer brief or bounded behavior plus automatic reduced-motion, hidden-tab, offscreen, and low-power handling. If continuous motion needs a pause mechanism, integrate it into the product's interaction language instead of attaching a generic engine toolbar.

## Assign ownership

- Give one system ownership of each animated property and scroll container.
- Keep UI motion, scroll timelines, and any adopted 3D render loops in separate components/modules with explicit inputs.
- Do not let CSS, a UI-motion library, and a timeline engine all animate the same transform.
- Do not run multiple uncontrolled `requestAnimationFrame` loops for one visual region.
- When Lenis, Anime.js, or R3F share time or scroll signals, coordinate them through one explicit scheduler/bridge where supported; do not let each layer poll and mutate the same target independently.
- Keep 3D and 2D Canvas decorative output separate from semantic navigation and content. Provide DOM controls and labels only for essential interactions, using the product's language rather than engine terminology.
- Keep small decorative accents non-interactive and outside the accessibility tree; render them statically or stop them quickly instead of adding controls that make the accent larger than its purpose.
- Reuse lifecycle, cleanup, failure, and rendering infrastructure freely, but keep public controls opt-in. A shared scene component must not stamp the same toolbar onto unrelated products.
- A shared scene registry may own quality caps, visibility, context loss, and fallback, while each unrelated subject owns its camera, lighting, material, composition, and motion. Do not reduce scene variation to a `shape` or color switch inside one generic renderer.
- In server-rendered frameworks, isolate browser-only motion/Canvas/WebGL in client boundaries and avoid hydrating static layout unnecessarily.

## Runtime lifecycle

Implement and test applicable items:

- Start only after the host element exists and has measurable size.
- Use `ResizeObserver` or an equivalent bounded resize path; cap device pixel ratio for GPU cost.
- Pause or reduce work when `document.hidden`, the element is offscreen, or the user requests reduced motion.
- Cancel animation frames/timelines and remove pointer, resize, visibility, and context listeners on teardown.
- Dispose geometries, materials, textures, render targets, controls, workers, and renderer contexts as applicable.
- Handle loading, decoding, shader/model/texture failure, unsupported APIs, initialization exceptions, and WebGL context loss.
- Avoid per-frame React/state updates. Keep continuous values in the animation/render layer.
- Animate `transform` and `opacity` for ordinary UI; avoid layout-triggering properties in continuous motion.
- Budget main-thread, GPU, memory, texture dimensions, draw calls, and bundle size for mobile/low-power hardware.

## Computer, tablet, and phone policy

- Exercise Lenis on all three default device classes. On touch devices, keep upstream-safe touch behavior unless a stronger synchronization mode has passed the supported iOS/Android checks; a desktop success is not evidence for phone. Verify anchor links, keyboard focus, route restoration, nested Ant Design overlays/tables, text selection, overscroll, and reduced motion.
- When 3D was adopted, exercise R3F/Three.js on phone and tablet. Reduce device-pixel ratio, model/texture size, lights, post-processing, draw calls, update frequency, and interaction density to meet the budget; lazy-load the scene and pause hidden/offscreen work. Do not confuse a suitability-gate rejection with a device-performance fallback.
- Exercise the separate 2D Canvas role on phone and tablet. Reduce pixel ratio, particle/object count, redraw frequency, and interaction density before omitting it; verify resize, teardown, and a static/DOM fallback independently from the 3D scene.
- Fall back only after a reproducible compatibility, accessibility, performance, delivery, or runtime failure. Record the failing device/path and retain a coherent static/DOM result rather than silently shipping an empty region.

## Reduced motion and input safety

- Honor `prefers-reduced-motion` for every automatic, parallax, looping, scroll-scrubbed, or spatial effect.
- Observe preference changes during the session through a framework hook or media-query change listener; do not read reduced motion only once at mount when the effect can remain running.
- Reduced motion must preserve content, state, and navigation; it is not a blank canvas.
- Keep focus order, anchor navigation, browser history, keyboard scrolling, screen-reader announcements, touch inertia, and selection usable.
- Avoid scroll hijacking. If used for a justified narrative, provide an immediate reduced-motion/static layout and an escape from pinned regions.
- Do not rely on hover, pointer parallax, drag, or 3D picking as the only way to reach an action.
- Keep user-triggered feedback interruptible and avoid blocking input until animation completes.

## Fallback ladder

Design fallback before the premium path:

1. Full effect on capable devices within budget.
2. Reduced/paused effect for reduced-motion, low-power, hidden, or offscreen conditions.
3. Static local image/CSS illustration or simplified DOM visualization when the engine/resource is unavailable.
4. Semantic text and controls that preserve the task even if all visual enhancement fails.

For WebGL, cover both initialization failure and runtime `webglcontextlost`. A fallback message alone is insufficient if the visual also carries navigation; retain equivalent DOM navigation.

## Acceptance evidence

- State the purpose of each automatic effect in one sentence.
- Record its host, meaning, and control rationale; “the library supports it” is not a rationale.
- Test normal and reduced-motion modes.
- Test mouse, keyboard, touch where relevant, and at least one low/mobile viewport.
- Confirm no competing scroll regions, clipped pinned content, focus jumps, or input-blocking timelines.
- Exercise initialization/resource/context failure for advanced visuals.
- For adopted 3D, capture several animation phases, inspect the complete motion cycle, and verify the geometry-integrity rules rather than judging one flattering frame.
- For surfaces that rejected 3D, confirm no WebGL canvas, initialization probe, or 3D chunk request occurs.
- Navigate away/unmount and return; check for duplicate canvases, loops, listeners, or rising memory.
- Capture screenshots of the full, reduced, and fallback states.

If an adopted enhanced layer fails, the coherent static fallback must still work. A required fallback is not a reason to omit a default layer. For conditional 3D, decide suitability first; once adopted, fallback quality is mandatory.
