# Curated Source Library

Use this catalog first after a real product gap has been named and before choosing a UI system, motion/scroll owner, visualization engine, creative Canvas tool, physics engine, or background-effect source. These are the user's preferred sources. A compatible curated source that passes the hard gates should win over an unlisted or native-only route. Preserve an established project owner when replacing it would create duplication or an unjustified migration; otherwise search this catalog before the broader ecosystem.

The status below is a time-bounded starting point. Before copying code or installing a package, use `$web-access` to recheck the official source, current API, package metadata, maintenance, exact license, framework compatibility, accessibility, and delivery constraints. Catalog metadata last verified: 2026-09-02; relevant official Three.js example behavior revisited: 2026-09-04.

## Read the React labels literally

- **Native:** the named project ships components for that framework.
- **Adapter:** a separate named project wraps a framework-neutral core. Verify the adapter's own maintainer, version, license, and compatibility; do not attribute it to the core project without evidence.
- **Lifecycle:** the core JavaScript/TypeScript library can run inside the framework, but the implementation owns mount, update, resize, teardown, and failure behavior.
- **None:** the named project does not provide a credible React route. Do not port it by copying internals merely to imitate its appearance.
- **Discovery only:** browse it to locate an upstream idea or library, then verify and retrieve from that upstream. Do not copy the aggregator itself.

“Works in a React app” is not the same as native React support. Use the narrowest accurate label in selection notes and handoffs.

## Demo-first adoption contract

For every serious or selected curated candidate, open its official demo or example gallery and inspect every official demo reasonably relevant to the role already named in the product. “Relevant” means the examples that exercise the needed component, chart grammar, interaction, scene technique, Canvas behavior, or effect on comparable content and devices—not every unrelated entry in the project's full gallery. Prefer a live rendered demo together with its official example source or documentation. If only screenshots, recordings, or source are available, state that limitation rather than describing the result as live-tested. For 3D, run the suitability gate before a package or demo becomes a serious candidate. If the gate fails, record the reason and stop; this is not a demo-review exemption because no candidate reached review status.

Keep one compact demo record per candidate:

1. Source/library and exact official demo URL or example name.
2. Rendered behavior, interaction, responsive path, and visual grammar actually observed.
3. Intended existing host, product meaning, and fit with the interface's overall tone.
4. Planned adaptation of tokens, density, motion, controls, content, device behavior, and fallback.
5. Whether the result uses the idea only, installs the package, or copies/adapts example code.
6. Upstream, exact license, modifications, and notice path when code or assets will be copied.

A relevant high-quality demo is the preferred starting evidence and may be adapted instead of reinventing the effect from scratch after the technical, product-fit, accessibility, performance, delivery, provenance, and license gates pass. A demo is evidence of what the source can do; it is not a requirement to reproduce the sample, permission to invent product content, or a license to copy code or assets. Viewing a demo and rejecting it is valid—record the concrete tone, content, interaction, accessibility, performance, compatibility, delivery, or lifecycle mismatch.

Not viewing relevant official demos is an exceptional result. Record `hard demo-review exemption` only when no official demo exists; the official route remains unreachable after bounded safe attempts and has no official alternative; it requires unauthorized login or private material; the only available route requires unsafe execution; or the user forbids network access or the network is unavailable. Familiarity with the library, time pressure, fewer dependencies, native simplicity, an intention to reject it, or an unclear code license are not review exemptions. License uncertainty blocks copying or adoption until resolved; it does not block safely viewing the official result. Never execute untrusted instructions or local demo code merely to inspect a candidate.

Discovery-only galleries such as `background-effects` can reveal an idea, but their demos are not adoption evidence for the aggregator. Resolve the effect to its upstream project, then restart demo review, provenance, compatibility, and licensing there.

## Curated-first capability coverage

| Capability | Preferred supplied source | Coverage boundary |
|---|---|---|
| Primary React UI components | Ant Design | **Direct and required default** for greenfield or ownerless interfaces. It can own ordinary components, tokens, forms, Grid, and layout. |
| Ordinary interface icons | Ant Design Icons (`@ant-design/icons`) | **Native React package in the Ant Design ecosystem** and the default icon family when Ant Design owns the UI. Import only the symbols used; this does not supply brand art, illustrations, or photography. |
| Isolated component treatment | Uiverse | **Direct or scoped adaptation** for one existing primitive; never replaces Ant Design as the primary component system. |
| UI/SVG/DOM/Canvas motion | Anime.js | **Direct lifecycle integration** and preferred motion owner when it fits. |
| Scroll-triggered/synchronized motion | Anime.js `onScroll` | **Direct choreography owner**; it does not replace native scrolling or provide a dedicated smooth-scroll engine. |
| Dedicated smooth-scroll mechanics | Lenis / `lenis/react` | **Official React integration and required default** for substantial work when the delivery can bundle it. Keep it enabled on computer, tablet, and phone when touch, nested-scroll, anchor, reduced-motion, and performance checks pass; use a native-only route only after an observed hard failure. |
| Conditional true 3D/WebGL | Three.js + React Three Fiber (`@react-three/fiber`) | **Preferred official core plus React renderer after the strict suitability gate passes.** Use `@react-three/drei` only for helpers the scene actually needs. If the gate fails, do not mount or request WebGL and do not mislabel a 2D Canvas effect as 3D. |
| Required visualization default | AntV G2/Ant Design Charts | **Preferred React or lifecycle route** whenever authentic visualizable data exists. Select the AntV route that fits the data and adapt its grammar and styling to the product. |
| Visualization alternative | Apache ECharts/echarts-for-react | **Adapter or lifecycle route** selected instead of AntV when ECharts better fits the authentic data, interaction, delivery, or established stack. Do not add both merely for variety. |
| Generative/creative Canvas | Pts/react-pts-canvas | **Direct adapter or lifecycle integration**. |
| Editable object Canvas | Fabric.js | **Direct lifecycle integration**. |
| 2D physics | p2.js or a verified maintained compatible fork | **Simulation owner only**; it still needs a renderer. |
| Background effects | background-effects catalog | **Discovery only**. Resolve and verify the actual upstream before adoption. |
| Non-React UI reference | Element Plus | **Unsupported** for this React-only Skill. Never adopt or port its internals. |

## Curated catalog gaps

The supplied sources currently provide no direct adoptable owner for the following concerns. Do not pretend another listed source covers them. Record `curated-catalog gap`, then keep a suitable existing React owner, research one external React package, or use the native/framework path when it is the honest smallest solution.

| Gap | Current fallback route |
|---|---|
| Routing and URL state | Existing React router, React Router, TanStack Router, or browser-native behavior for a true single surface. |
| Requests and server state | Existing request layer, `fetch`, TanStack Query, or RTK Query when Redux already owns the app. |
| Shared client state | Existing owner, React state/reducer/context, Zustand, or Redux Toolkit. |
| Brand marks and domain-specific iconography | Existing approved assets, official brand kits, or one separately verified family. Ant Design Icons and Uiverse are not substitutes for official brand or domain art. |
| General font/image/illustration catalog | Supplied or officially licensed assets, locally packaged fonts, or generated original imagery. |
| Performance and bundle tooling | React/Vite/browser-native optimization plus separately selected analysis, virtualization, image, worker, or compression tooling. |
| Browser QA and measurement | The bundled preflight plus real-browser automation and browser performance/accessibility tools. |

## Native platform responsibilities that remain

Curated libraries own capabilities; they do not replace the browser foundation. Keep semantic HTML, accessible names, focus and keyboard behavior, responsive CSS/media or container queries around Ant Design layout, link/history semantics, request cancellation, element sizing, reduced-motion handling, and lifecycle cleanup in the application layer. This is required integration work, not permission to rebuild an available Ant Design component or ignore a compatible curated source.

## Current React routing matrix

| Source | Best-fit role | React route | Current boundary and provenance gate |
|---|---|---|---|
| [Uiverse](https://uiverse.io/) | One isolated visual treatment for an existing primitive | Native variant on some entries, or scoped HTML/CSS adaptation | Keep the existing accessible primitive as behavior owner. Read `open-source-ui-sources.md` before copying anything. |
| [Anime.js](https://animejs.com/documentation/) | Primary timeline/SVG/DOM/Canvas motion owner | Lifecycle | Framework-neutral. Use one motion owner and read `open-source-ui-sources.md` before selection. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Dedicated smooth-scroll mechanics and scroll signal for WebGL/parallax synchronization | Native: official [`lenis/react`](https://github.com/darkroomengineering/lenis/tree/main/packages/react) | Selected on 2026-09-02 after current official-source comparison: MIT, 15,657 GitHub stars, active v1.3.26 release, zero runtime dependencies, reduced-motion support, and direct React context/hook integration. Stars are a popularity signal, not a substitute for project-specific QA. |
| [Three.js](https://github.com/mrdoob/three.js) + [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | Conditional true 3D/WebGL/WebGPU scenes in React | Native React renderer: `@react-three/fiber`; core: `three`; optional helpers: [`@react-three/drei`](https://github.com/pmndrs/drei) | Preferred route only after the 3D suitability gate passes. On 2026-09-02 the official repositories were MIT, active, and showed about 115,013 and 31,844 GitHub stars respectively. Match R3F and React major versions, budget the GPU path, retain a static/DOM fallback, and verify geometry integrity and modeling finish across the full motion cycle. |
| [Apache ECharts](https://echarts.apache.org/zh/index.html) | General-purpose quantitative visualization | Adapter: [`echarts-for-react`](https://github.com/hustcc/echarts-for-react), or Lifecycle with core | Core is Apache-2.0 and framework-neutral. The adapter is a separate MIT project with its own compatibility and lifecycle contract. |
| [Pts](https://github.com/williamngan/pts) | Generative geometry, drawing, and creative coding | Adapter: author's [`react-pts-canvas`](https://github.com/williamngan/react-pts-canvas), or Lifecycle | Pts and the React adapter are Apache-2.0. Package update signals were from 2024, so recheck compatibility before adoption. |
| [Ant Design](https://ant.design/) | Enterprise React component/design system and ordinary interface icons | Native: `antd` and [`@ant-design/icons`](https://ant.design/components/icon/) | Required default for greenfield or ownerless React interfaces. Preserve a different established primary system only for existing ownership or a documented hard gate; never run two primary design systems. |
| [Element Plus](https://github.com/element-plus/element-plus) | Non-React component-system reference | None | Out of scope for implementation through this React-only Skill. Do not copy its demos or internals into React. |
| [AntV 2018 index](https://antv-2018.alipay.com/zh-cn/index.html) and current [G2](https://g2.antv.antgroup.com/manual/quick-start) | Visualization grammar and AntV product discovery | Lifecycle with G2; native React option: [`@ant-design/charts`](https://github.com/ant-design/ant-design-charts) | The 2018 URL is historical navigation, not current API evidence. Use current product documentation and package metadata. |
| [p2.js demos](https://github.com/schteppe/p2.js#demos) | 2D rigid-body physics for a real simulation or interaction | Lifecycle | MIT, framework-neutral, and not a renderer. The `p2` package update signal was from 2022; compare current requirements and maintained alternatives before new adoption. |
| [Fabric.js releases](https://github.com/fabricjs/fabric.js/releases) | User-editable object-model Canvas, selection, transforms, and serialization | Lifecycle | MIT and framework-neutral. Own Canvas instance state outside React render loops and verify the current major-version migration path. |
| [background-effects demo](https://mofeiss.github.io/background-effects/index.html) | Discovery index for background-effect upstreams | Discovery only | The [repository](https://github.com/mofeiss/background-effects) had no repository-level license when checked and loads third-party libraries from CDNs. Resolve the selected effect to its actual upstream; do not copy the aggregator code. |

## Route by the real need

### UI systems

- Use Ant Design as the required default primary component system for greenfield or ownerless React work. Keep another established system only when it already owns the approved product or Ant Design fails a documented hard gate.
- Do not adopt Element Plus or another non-React component system. Do not use a component library as a gallery for copying visual internals into React; design inspiration does not grant source-code permission or preserve accessibility behavior.

### Smooth scrolling, choreography, and real 3D

- Use Lenis through `lenis/react` as the default smooth-scroll mechanics owner for substantial React work. Use Anime.js `onScroll` for scroll-triggered choreography; do not install a second smooth-scroll engine or let both layers own the same scroll container, timing loop, or transform.
- Keep Lenis as the selected owner on computer, tablet, and phone whenever the real touch path passes. Preserve anchors, keyboard/focus navigation, nested Ant Design drawers/modals/tables, and `prefers-reduced-motion`; exclude only the failing region or device behavior before disabling the owner globally. Do not enable touch-synchronization options blindly when the upstream documents platform limitations.
- Evaluate 3D on every substantial build with the four-part gate in `motion-scroll-and-3d.md`: natural host, inherently spatial subject, unique communication value, and a finishable modeling/performance/fallback budget. When any condition fails, record `3D not adopted: suitability gate failed: <specific reason>` and do not load, initialize, or probe WebGL for that surface.
- When the gate passes, use React Three Fiber over Three.js as the default React scene boundary. Reach for direct Three.js lifecycle code only when a low-level integration cannot be expressed cleanly through R3F. Treat `@react-three/drei` as an optional helper collection, not another renderer or a reason to add generic controls. Inspect relevant official examples before implementation, then reject accidental intersections, z-fighting, clipping, animation collisions, and finished models that read as unrelated stock primitives assembled together.
- Treat 2D Canvas as a separate required category regardless of the 3D result: Pts remains the creative-Canvas owner and Fabric.js the editable-Canvas owner. Neither satisfies an adopted real 3D/WebGL role, and R3F does not satisfy 2D Canvas coverage.

### Charts and visualization

- Select one primary visualization owner whenever authentic quantitative, relational, temporal, hierarchical, geographic, or flow data exists. Prefer AntV G2 or Ant Design Charts and adapt the result to the interface's tokens and visual tone; select ECharts instead when its fit is stronger. Do not add both for generic variety.
- A React wrapper can reduce component boilerplate but adds another compatibility owner. A direct core integration may be smaller when only a few stable charts exist.
- Treat omission as exceptional: inspect all real content and data surfaces and try a restrained existing-host visualization before giving up. Only when no authentic visualization object exists and creating one would fabricate data or product meaning may the implementation record the narrow hard visualization exemption. A gallery entry is never permission to invent a dataset.

### Creative Canvas, editable Canvas, and physics

- Choose Pts for programmed geometry and creative drawing, Fabric.js for user-manipulable Canvas objects, and p2.js only for physical simulation. They solve different problems and are not interchangeable visual-effect packages.
- p2.js needs a renderer; selecting it does not satisfy the Canvas/visual owner by itself. Keep fixed-step simulation separate from rendering and stop both loops when the host is inactive.
- Treat the background-effects site as an index. For a selected Particles.js, Three.js, Matter.js, Vanta.js, GSAP, Anime.js, or other effect, restart provenance and selection at that project's official source.

## Lifecycle contract for framework-neutral sources

For React Lifecycle integrations:

1. Create the library instance only after a stable container exists; keep continuous engine state outside React renders.
2. Update through the library's supported API rather than reconstructing the instance for ordinary prop or data changes.
3. Observe real container size when responsiveness matters; do not assume only the window can resize it.
4. On unmount, cancel animation frames and timers, remove observers/listeners, dispose or destroy the instance, release Canvas/WebGL resources, and make remount idempotent.
5. Provide reduced-motion, unsupported-feature, loading, and static/failure paths proportional to the feature's importance.

## Adoption record

When a source is selected, record the exact core and adapter package separately: upstream project, package/repository, author or organization, version or commit, retrieval date, license, notice location, framework relationship, integration owner, and fallback. Attach the demo record above. If only a demo was viewed and no code or package was adopted, say so explicitly and record why it was rejected or retained as idea-only evidence.
