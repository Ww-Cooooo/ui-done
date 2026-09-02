import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const SpatialScene = lazy(() => import("./visuals/SpatialScene"));
const PtsField = lazy(() => import("./visuals/PtsField"));

class VisualErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("UI Done advanced visual fallback activated", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticSpatialFallback({ page }) {
  const count = page.layout === "soft" ? 5 : page.layout === "swiss" ? 7 : 6;
  return (
    <div className={`static-spatial static-${page.id}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i key={index} style={{ "--i": index, "--total": count }} />
      ))}
    </div>
  );
}

function useVisibility() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "160px"
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function supportsContext(type) {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext(type);
    if (!context) return false;
    if (type.startsWith("webgl")) context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function VisualStage({ page, compact = false }) {
  const reduced = useReducedMotion();
  const [hostRef, visible] = useVisibility();
  const [canvas2dReady] = useState(() => supportsContext("2d"));
  const [webglReady] = useState(() => supportsContext("webgl2") || supportsContext("webgl"));
  const fallback = <StaticSpatialFallback page={page} />;

  return (
    <div ref={hostRef} className={`visual-stage ${compact ? "visual-stage-compact" : ""}`}>
      <div className="canvas-layer canvas-layer-2d" aria-hidden="true">
        {canvas2dReady && (
          <VisualErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <PtsField page={page} active={visible && !reduced} />
            </Suspense>
          </VisualErrorBoundary>
        )}
      </div>

      <div className="canvas-layer canvas-layer-3d" role="img" aria-label={`${page.shortTitle}：${page.signature}`}>
        {webglReady ? (
          <VisualErrorBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <SpatialScene page={page} active={visible && !reduced} />
            </Suspense>
          </VisualErrorBoundary>
        ) : fallback}
      </div>

      <div className="stage-corner stage-corner-top">
        <span>LIVE MATERIAL</span>
        <strong>{page.number}</strong>
      </div>
      <div className="stage-corner stage-corner-bottom">
        <span>{page.signature}</span>
        <strong>3D + 2D</strong>
      </div>
    </div>
  );
}
