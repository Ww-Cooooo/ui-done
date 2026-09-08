import { useEffect, useRef } from "react";
import { CanvasForm, Group, Pt } from "pts";

// Two bounded, static drawing jobs. No RAF loop: redraw only on resize.
export default function WorkGuides({ kind, color }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const canvas = hostRef.current;
    let observer;
    try {
      const context = canvas.getContext("2d");
      if (!context) throw new Error("2D context is unavailable");
      const form = new CanvasForm(context);
      const draw = () => {
        const { width, height } = canvas.getBoundingClientRect();
        const density = window.devicePixelRatio || 1;
        canvas.width = Math.ceil(width * density);
        canvas.height = Math.ceil(height * density);
        context.setTransform(density, 0, 0, density, 0, 0);
        const line = (a, b) => form.strokeOnly(color, 1).line(new Group(new Pt(...a), new Pt(...b)));
        if (kind === "crop") {
          [1 / 3, 2 / 3].forEach(fraction => {
            line([width * fraction, 0], [width * fraction, height]);
            line([0, height * fraction], [width, height * fraction]);
          });
        } else {
          for (let tick = 0; tick <= 40; tick += 1) {
            const x = tick / 40 * (width - 2) + 1;
            line([x, 0], [x, tick % 10 === 0 ? height : height * .45]);
          }
        }
      };
      observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    } catch (error) {
      // The load number/crop rectangle remains in DOM; report, never simulate a successful render.
      observer?.disconnect();
      console.warn("Canvas guide unavailable", error);
    }
    return () => observer?.disconnect();
  }, [kind, color]);
  return <canvas ref={hostRef} className={`work-guide work-guide-${kind}`} aria-hidden="true" />;
}
