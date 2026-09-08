import { useEffect, useRef, useState } from "react";
import { CanvasForm, Curve, Group, Pt } from "pts";
import { zoneSummary } from "./seats";

export function SeatingGuides({ block }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    if (!context) return; // Stage label, row letters and every seat remain usable in DOM.
    const form = new CanvasForm(context);
    const draw = () => {
      const host = canvas.parentElement;
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(rect.width * dpr);
      canvas.height = Math.ceil(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      form.strokeOnly("#b5a4c9", 1.5).line(Curve.bezier(new Group(
        new Pt(w * .18, 37), new Pt(w * .31, 81), new Pt(w * .69, 81), new Pt(w * .82, 37)
      ), 40));
      for (const row of host.querySelectorAll(".seat-row")) {
        const points = [...row.querySelectorAll(".seat-anchor")].filter(node => node.getClientRects().length)
          .map(node => { const r = node.getBoundingClientRect(); return new Pt(r.x - rect.x + r.width / 2, r.bottom - rect.y + 7); });
        if (points.length > 1) form.strokeOnly("#dcd3e5", 1).line(new Group(...points));
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas.parentElement);
    draw();
    return () => observer.disconnect();
  }, [block]);
  return <canvas ref={ref} className="seating-guides" aria-hidden="true" />;
}

export function AvailabilityChart() {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let chart;
    let disposed = false;
    const render = async () => {
      try {
      const { Chart } = await import("@antv/g2");
      if (disposed) return;
      chart = new Chart({ container: ref.current, autoFit: true, height: 112 });
      chart.options({
        type: "interval", data: zoneSummary(), paddingLeft: 0, paddingRight: 0,
        paddingTop: 0, paddingBottom: 0, margin: 0, inset: 0,
        encode: { x: "name", y: "available", color: "id" },
        coordinate: { transform: [{ type: "transpose" }] },
        scale: { y: { domain: [0, 24], nice: false }, color: { domain: ["front", "middle", "back"], range: ["#8760b6", "#317a70", "#95602b"] } },
        axis: false, legend: false, interaction: { tooltip: false }, animate: false,
        style: { radius: 3, insetTop: 11, insetBottom: 11 },
      });
      await chart.render();
      } catch { if (!disposed) setFailed(true); }
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); render(); }
    }, { rootMargin: "80px" });
    observer.observe(ref.current);
    return () => { disposed = true; observer.disconnect(); chart?.destroy(); };
  }, []);
  return <div className="availability-chart" ref={ref} aria-hidden="true" data-failed={failed || undefined} />;
}
