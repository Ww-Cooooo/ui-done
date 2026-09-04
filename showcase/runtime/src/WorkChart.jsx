import { useEffect, useRef, useState } from "react";
import { Alert } from "antd";
import { Chart } from "@antv/g2";
import { useReducedMotion } from "./useReducedMotion";

function axisStyle(page) {
  return {
    labelFill: page.theme.muted,
    labelFontFamily: page.theme.mono,
    labelFontSize: 11,
    lineStroke: page.theme.line,
    tickStroke: page.theme.line,
    gridStroke: page.theme.line,
    title: false
  };
}

function chartOptions({ data, kind, page }) {
  const horizontal = kind === "horizontal";
  return {
    type: kind === "line" ? "line" : "interval",
    data,
    autoFit: true,
    encode: { x: "label", y: "value", color: kind === "line" ? undefined : "label" },
    coordinate: horizontal ? { transform: [{ type: "transpose" }] } : undefined,
    scale: {
      y: { nice: true },
      color: { range: [page.theme.accent, page.theme.accent2, page.theme.ink, page.theme.muted] }
    },
    axis: {
      x: { ...axisStyle(page), grid: false },
      y: { ...axisStyle(page), tickCount: 4 }
    },
    legend: { color: false },
    style: kind === "line"
      ? { stroke: page.theme.accent, lineWidth: 3, shape: "smooth" }
      : horizontal
        ? { insetTop: 7, insetBottom: 7, radiusTopRight: 4, radiusBottomRight: 4 }
        : { insetLeft: 8, insetRight: 8, radiusTopLeft: 6, radiusTopRight: 6 },
    interaction: { tooltip: { shared: true } },
    theme: { type: "classic", view: { viewFill: "transparent" } }
  };
}

export default function WorkChart({ page, data, kind = "line", label, height = 220 }) {
  const hostRef = useRef(null);
  const reduced = useReducedMotion();
  const [error, setError] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let chart;
    let cancelled = false;
    setError(false);

    try {
      chart = new Chart({ container: host, autoFit: true, height });
      const options = chartOptions({ data, kind, page });
      options.animate = reduced ? false : { enter: { type: kind === "line" ? "growInX" : "growInY", duration: 420 } };
      chart.options(options);
      Promise.resolve(chart.render()).catch(() => {
        if (!cancelled) setError(true);
      });
    } catch {
      setError(true);
    }

    return () => {
      cancelled = true;
      chart?.destroy();
    };
  }, [data, height, kind, page, reduced]);

  return (
    <div className="work-chart" aria-label={label}>
      {error ? (
        <Alert type="warning" showIcon message="图形层暂不可用" description="下方数值摘要仍可完成判断。" />
      ) : (
        <div ref={hostRef} className="work-chart-host" aria-hidden="true" />
      )}
      <ul className="work-chart-values" aria-label={`${label}数值`}>
        {data.map(item => <li key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong></li>)}
      </ul>
    </div>
  );
}
