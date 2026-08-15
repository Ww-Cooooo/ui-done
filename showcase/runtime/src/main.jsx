import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "motion/react";
import { animate, inView } from "motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";
import "./runtime.css";

const CONTROL_DOCKS = [
  { code: "D02", color: 0x286148, state: "ready" },
  { code: "D03", color: 0x286148, state: "ready" },
  { code: "D04", color: 0x963b31, state: "risk", attention: true },
  { code: "D06", color: 0x963b31, state: "risk" },
  { code: "D08", color: 0x765c20, state: "loading" },
  { code: "D11", color: 0x765c20, state: "loading" }
];

function addMesh(group, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  group.add(mesh);
  return mesh;
}

function makeDockLabel(text, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 72;
  const context = canvas.getContext("2d");
  context.fillStyle = "#f7f7f2";
  context.fillRect(3, 3, 154, 66);
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.strokeRect(3, 3, 154, 66);
  context.fillStyle = "#181c1f";
  context.font = "700 34px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, 80, 38);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.76, 0.34, 1);
  return sprite;
}

function buildScene(variant, accentColor, inkColor) {
  const group = new THREE.Group();
  const accent = new THREE.Color(accentColor);
  const ink = new THREE.Color(inkColor);
  const pale = accent.clone().lerp(new THREE.Color(0xffffff), 0.54);
  let cameraPosition = [0, 0, 5.6];
  let interactive = false;
  let animationDuration = 4400;
  let update = () => {};

  if (variant === "control") {
    const ground = new THREE.GridHelper(5.2, 12, ink, ink);
    const gridMaterials = Array.isArray(ground.material) ? ground.material : [ground.material];
    gridMaterials.forEach(material => {
      material.opacity = 0.22;
      material.transparent = true;
    });
    group.add(ground);
    let attentionDock;
    CONTROL_DOCKS.forEach((dock, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = -1.55 + column * 1.55;
      const z = -0.72 + row * 1.45;
      const bay = addMesh(
        group,
        new THREE.BoxGeometry(1.12, 0.2, 0.92),
        new THREE.MeshStandardMaterial({ color: dock.color, roughness: 0.7 }),
        [x, 0.1, z]
      );
      const load = addMesh(
        group,
        new THREE.BoxGeometry(0.46, 0.22, 0.26),
        new THREE.MeshStandardMaterial({ color: 0xf7f7f2, roughness: 0.55 }),
        [x - 0.1 + (index % 2) * 0.26, 0.28, z]
      );
      const label = makeDockLabel(dock.code, `#${dock.color.toString(16).padStart(6, "0")}`);
      label.position.set(x, 0.64, z - 0.12);
      group.add(label);
      if (dock.attention) attentionDock = { bay, load, baseZ: load.position.z };
    });
    cameraPosition = [4.5, 4.6, 5.4];
    group.rotation.y = -0.38;
    update = time => {
      if (!attentionDock) return;
      const pulse = 0.5 + Math.sin(time * 0.0022) * 0.5;
      attentionDock.load.position.z = attentionDock.baseZ + pulse * 0.13;
      attentionDock.bay.material.emissive.set(0x963b31);
      attentionDock.bay.material.emissiveIntensity = 0.08 + pulse * 0.16;
    };
  } else if (variant === "corner") {
    interactive = true;
    animationDuration = 4800;
    const body = new THREE.MeshStandardMaterial({ color: 0xffaed9, roughness: 0.58, metalness: 0.06 });
    const handle = new THREE.MeshStandardMaterial({ color: 0x15182b, roughness: 0.38 });
    const bag = new THREE.Group();
    addMesh(bag, new THREE.BoxGeometry(2.1, 1.45, 0.56), body, [0, -0.28, 0], [0.04, -0.24, -0.03]);
    addMesh(bag, new THREE.TorusGeometry(0.54, 0.075, 12, 48), handle, [-0.48, 0.54, 0], [0, 0, 0]);
    addMesh(bag, new THREE.TorusGeometry(0.54, 0.075, 12, 48), handle.clone(), [0.48, 0.54, 0], [0, 0, 0]);
    group.add(bag);
    const rays = new THREE.Group();
    const rayMaterial = new THREE.MeshBasicMaterial({ color: 0x3957ff });
    for (let index = 0; index < 12; index += 1) {
      const angle = (index / 12) * Math.PI * 2;
      addMesh(
        rays,
        new THREE.BoxGeometry(0.08, 0.52, 0.04),
        rayMaterial.clone(),
        [Math.cos(angle) * 1.68, Math.sin(angle) * 1.68, -0.48],
        [0, 0, -angle]
      );
    }
    group.add(rays);
    update = (time, pointer) => {
      bag.rotation.y += (pointer.x * 0.22 - bag.rotation.y) * 0.045;
      bag.rotation.x += (-pointer.y * 0.1 - bag.rotation.x) * 0.045;
      bag.position.y = Math.sin(time * 0.0014) * 0.035;
      rays.rotation.z = time * 0.000045;
    };
  } else if (variant === "gallery") {
    const ring = new THREE.MeshStandardMaterial({ color: pale, metalness: 0.3, roughness: 0.3 });
    addMesh(group, new THREE.TorusGeometry(0.78, 0.105, 14, 64), ring, [0, 0, 0], [0.74, 0.24, -0.16]);
    addMesh(
      group,
      new THREE.SphereGeometry(0.19, 20, 20),
      new THREE.MeshStandardMaterial({ color: accent, metalness: 0.18, roughness: 0.34 }),
      [0.56, 0.44, 0.18]
    );
    cameraPosition = [0, 0, 3.8];
    animationDuration = 0;
  }

  return {
    group,
    cameraPosition,
    interactive,
    animationDuration,
    update
  };
}

function SceneCanvas({ variant, accent, ink, label, staticOnly = false, decorative = true }) {
  const hostRef = useRef(null);
  const controlRef = useRef(null);
  const renderRef = useRef(null);
  const activityRef = useRef({ visible: false, hidden: document.hidden, reduced: false });
  const pointerRef = useRef({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  const [hasEntered, setHasEntered] = useState(staticOnly);
  const [hidden, setHidden] = useState(document.hidden);
  const reducedMotion = useReducedMotion();
  const { ref: inViewRef, inView: visible } = useInView({
    rootMargin: "220px 0px",
    threshold: 0.02,
    fallbackInView: true
  });

  const setHost = node => {
    hostRef.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    if (visible) setHasEntered(true);
  }, [visible]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    activityRef.current = {
      visible,
      hidden,
      reduced: Boolean(reducedMotion)
    };
    if (!staticOnly && visible && !hidden && !reducedMotion) controlRef.current?.start();
    else controlRef.current?.stop();
    renderRef.current?.();
  }, [visible, hidden, reducedMotion, staticOnly]);

  useEffect(() => {
    if (!hasEntered || !hostRef.current) return undefined;

    const host = hostRef.current;
    let renderer;
    let frame = 0;
    let running = false;
    let resizeObserver;
    let sceneState;
    let disposed = false;
    let elapsed = 0;
    let lastFrame = 0;

    try {
      const probe = document.createElement("canvas");
      const probeContext = probe.getContext("webgl2") || probe.getContext("webgl");
      if (!probeContext) {
        setFailed(true);
        return undefined;
      }
      probeContext.getExtension("WEBGL_lose_context")?.loseContext();

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "ui-scene-canvas";
      if (decorative) renderer.domElement.setAttribute("aria-hidden", "true");
      else {
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute("aria-label", label);
      }
      host.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      sceneState = buildScene(variant, accent, ink);
      const baseCameraPosition = [...sceneState.cameraPosition];
      scene.add(sceneState.group);
      camera.position.set(...baseCameraPosition);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 1.9));
      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(3.5, 4.8, 5.2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(accent, 2.4);
      rim.position.set(-4, -1, 2);
      scene.add(rim);

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        const portraitScale = camera.aspect < 0.85 ? 1 + (0.85 - camera.aspect) * 1.1 : 1;
        camera.position.set(
          baseCameraPosition[0] * portraitScale,
          baseCameraPosition[1] * portraitScale,
          baseCameraPosition[2] * portraitScale
        );
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };

      const renderOnce = () => {
        if (disposed) return;
        sceneState.update(elapsed, pointerRef.current);
        renderer.render(scene, camera);
      };

      const tick = time => {
        if (!running || disposed) return;
        if (lastFrame) elapsed += Math.min(time - lastFrame, 48);
        lastFrame = time;
        sceneState.update(elapsed, pointerRef.current);
        renderer.render(scene, camera);
        if (sceneState.animationDuration > 0 && elapsed >= sceneState.animationDuration) {
          stop();
          return;
        }
        frame = requestAnimationFrame(tick);
      };

      const start = () => {
        if (running || disposed || sceneState.animationDuration === 0 || elapsed >= sceneState.animationDuration) return;
        running = true;
        lastFrame = 0;
        frame = requestAnimationFrame(tick);
      };

      const stop = () => {
        running = false;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = 0;
      };

      const onPointerMove = event => {
        const rect = host.getBoundingClientRect();
        pointerRef.current = {
          x: ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1,
          y: -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1)
        };
        if (!running) renderOnce();
      };

      const onPointerLeave = () => {
        pointerRef.current = { x: 0, y: 0 };
        if (!running) renderOnce();
      };

      const onContextLost = event => {
        event.preventDefault();
        stop();
        setFailed(true);
      };

      controlRef.current = { start, stop };
      renderRef.current = renderOnce;
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      if (!staticOnly && sceneState.interactive) {
        host.addEventListener("pointermove", onPointerMove, { passive: true });
        host.addEventListener("pointerleave", onPointerLeave, { passive: true });
      }
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      resize();

      const activity = activityRef.current;
      if (!staticOnly && activity.visible && !activity.hidden && !activity.reduced) start();
      else renderOnce();

      return () => {
        disposed = true;
        stop();
        resizeObserver?.disconnect();
        if (!staticOnly && sceneState?.interactive) {
          host.removeEventListener("pointermove", onPointerMove);
          host.removeEventListener("pointerleave", onPointerLeave);
        }
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        scene.traverse(object => {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => {
              material.map?.dispose?.();
              material.dispose?.();
            });
          } else {
            object.material?.map?.dispose?.();
            object.material?.dispose?.();
          }
        });
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        controlRef.current = null;
        renderRef.current = null;
      };
    } catch (error) {
      console.warn("UI Done 3D scene fell back to a static view.", error);
      setFailed(true);
      renderer?.dispose?.();
      return undefined;
    }
  }, [hasEntered, variant, accent, ink, label, staticOnly, decorative]);

  if (failed) {
    return (
      <div
        ref={setHost}
        className={`ui-scene-static ui-scene-static-${variant}`}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : `${label}. Static fallback.`}
        aria-hidden={decorative ? "true" : undefined}
      >
        {variant === "control" && (
          <div className="ui-yard-fallback" aria-hidden="true">
            {CONTROL_DOCKS.map(dock => (
              <span key={dock.code} className={`ui-yard-fallback-${dock.state}`}>{dock.code}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div ref={setHost} className="ui-scene-renderer" />;
}

function SceneExperience({ slot }) {
  const reducedMotion = useReducedMotion();
  const variant = slot.dataset.uiScene || "gallery";
  const label = slot.dataset.sceneLabel || "Decorative scene";
  const accent = slot.dataset.sceneAccent || "#6ee7b7";
  const ink = slot.dataset.sceneInk || "#172026";
  const isMark = slot.dataset.sceneMode === "mark";
  const decorative = slot.dataset.sceneSemantic !== "true";

  return (
    <motion.div
      className={`ui-scene-experience ui-scene-experience-${variant}${isMark ? " ui-scene-experience-mark" : ""}`}
      initial={isMark || reducedMotion ? false : { opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={decorative ? "true" : undefined}
    >
      <SceneCanvas
        variant={variant}
        accent={accent}
        ink={ink}
        label={label}
        staticOnly={isMark}
        decorative={decorative}
      />
    </motion.div>
  );
}

function setupSmoothScroll() {
  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lenis;

  const mount = () => {
    lenis?.destroy();
    lenis = undefined;
    document.documentElement.classList.remove("ui-lenis-active");
    if (reducedQuery.matches) return;

    lenis = new Lenis({
      autoRaf: true,
      duration: document.body.dataset.showcase === "control" ? 0.72 : 1.04,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      wheelMultiplier: document.body.dataset.showcase === "control" ? 0.9 : 1
    });
    document.documentElement.classList.add("ui-lenis-active");
  };

  mount();
  reducedQuery.addEventListener("change", mount);
  window.addEventListener("pagehide", () => lenis?.destroy(), { once: true });
}

function setupDocumentMotion() {
  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealStops = [];

  document.querySelectorAll("[data-ui-reveal]").forEach((element, index) => {
    if (reducedQuery.matches) return;
    element.style.opacity = "0";
    element.style.transform = `translateY(${18 + (index % 3) * 4}px)`;
    const stop = inView(
      element,
      () => {
        animate(
          element,
          { opacity: [0, 1], transform: [element.style.transform, "translateY(0px)"] },
          { duration: 0.62, delay: Math.min(index, 3) * 0.035, ease: [0.16, 1, 0.3, 1] }
        );
      },
      { amount: 0.14 }
    );
    revealStops.push(stop);
  });

  const animateCurrentState = trigger => {
    const scope = trigger.closest("section, main") || document;
    const visibleItems = [
      ...scope.querySelectorAll(".session:not([hidden]), .product:not([hidden]), tbody tr:not([hidden]), [data-schedule] > *")
    ];
    visibleItems.slice(0, 12).forEach((element, index) => {
      animate(
        element,
        { opacity: [0.38, 1], transform: ["translateY(8px)", "translateY(0px)"] },
        { duration: 0.3, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] }
      );
    });
  };

  const onClick = event => {
    const trigger = event.target.closest("[data-filter], [data-mode], .add-button");
    if (!trigger || reducedQuery.matches) return;
    requestAnimationFrame(() => requestAnimationFrame(() => animateCurrentState(trigger)));
  };

  document.addEventListener("click", onClick);
  window.addEventListener(
    "pagehide",
    () => {
      document.removeEventListener("click", onClick);
      revealStops.forEach(stop => stop?.());
    },
    { once: true }
  );
}

function mountScenes() {
  document.querySelectorAll("[data-ui-scene]").forEach(slot => {
    createRoot(slot).render(<SceneExperience slot={slot} />);
  });
}

function boot() {
  document.documentElement.classList.add("ui-runtime-enabled");
  setupSmoothScroll();
  setupDocumentMotion();
  mountScenes();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
else boot();
