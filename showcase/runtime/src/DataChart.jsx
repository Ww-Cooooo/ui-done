import { useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import { Alert, Tag } from "antd";
import { BarChartOutlined, CheckCircleOutlined } from "@ant-design/icons";

function baseAxis(page) {
  return {
    labelFill: page.theme.muted,
    labelFontFamily: page.theme.mono,
    labelFontSize: 11,
    lineStroke: page.theme.line,
    tickStroke: page.theme.line,
    gridStroke: page.theme.line,
    titleFill: page.theme.muted,
    titleFontFamily: page.theme.body
  };
}

function chartSpec(page, reduced) {
  if (page.chartKind === "matrix") {
    return {
      type: "cell",
      data: page.chartData,
      autoFit: true,
      encode: { x: "capability", y: "label", color: "value" },
      scale: {
        color: { domain: [0, 1], range: [page.theme.surfaceAlt, page.theme.accent] }
      },
      axis: {
        x: { ...baseAxis(page), grid: false, title: false },
        y: { ...baseAxis(page), grid: false, title: false }
      },
      legend: { color: false },
      style: { inset: 3, radius: 5, stroke: page.theme.line, lineWidth: 1 },
      interaction: { tooltip: { shared: false } },
      animate: reduced ? false : { enter: { type: "fadeIn", duration: 420 } },
      theme: { type: "classic", view: { viewFill: "transparent" } }
    };
  }

  const horizontal = page.chartKind === "blocks";
  const common = {
    data: page.chartData,
    autoFit: true,
    encode: { x: "label", y: "value", color: "label" },
    scale: {
      y: { domain: [0, 255], nice: false },
      color: { range: [page.theme.accent, page.theme.accent2, page.theme.ink, page.theme.muted, page.theme.surfaceAlt] }
    },
    legend: { color: false },
    animate: reduced ? false : { enter: { type: "growInY", duration: 520 } },
    theme: { type: "classic", view: { viewFill: "transparent" } }
  };

  if (page.chartKind === "line") {
    return {
      ...common,
      type: "line",
      encode: { x: "label", y: "value" },
      style: { stroke: page.theme.accent, lineWidth: 4, shape: "smooth" },
      axis: {
        x: { ...baseAxis(page), grid: false, title: false },
        y: { ...baseAxis(page), title: false, tickCount: 6 }
      }
    };
  }

  if (page.chartKind === "area") {
    return {
      ...common,
      type: "area",
      encode: { x: "label", y: "value" },
      style: { fill: page.theme.accent, fillOpacity: 0.62 },
      axis: {
        x: { ...baseAxis(page), grid: false, title: false },
        y: { ...baseAxis(page), title: false, tickCount: 6 }
      }
    };
  }

  return {
    ...common,
    type: "interval",
    coordinate: horizontal ? { transform: [{ type: "transpose" }] } : undefined,
    style: horizontal
      ? { radiusTopRight: 2, radiusBottomRight: 2, insetTop: 7, insetBottom: 7 }
      : { radiusTopLeft: page.layout === "soft" ? 16 : 1, radiusTopRight: page.layout === "soft" ? 16 : 1, insetLeft: 10, insetRight: 10 },
    axis: {
      x: { ...baseAxis(page), grid: false, title: false },
      y: { ...baseAxis(page), title: false, tickCount: 6 }
    }
  };
}

function DataTable({ page }) {
  if (page.chartKind === "matrix") {
    return (
      <table className="visually-hidden">
        <caption>{page.chartTitle}：{page.chartSummary}</caption>
        <thead><tr><th>页面</th><th>工作能力</th><th>是否真实覆盖</th></tr></thead>
        <tbody>{page.chartData.map(item => <tr key={`${item.label}-${item.capability}`}><td>{item.label}</td><td>{item.capability}</td><td>{item.value ? "是" : "否"}</td></tr>)}</tbody>
      </table>
    );
  }

  return (
    <table className="visually-hidden">
      <caption>{page.chartTitle}：{page.chartSummary}</caption>
      <thead><tr><th>视觉方向</th><th>三张本地图片的平均明度，0 到 255</th></tr></thead>
      <tbody>{page.chartData.map(item => <tr key={item.label}><td>{item.label}</td><td>{item.value}</td></tr>)}</tbody>
    </table>
  );
}

export default function DataChart({ page, reduced }) {
  const hostRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let chart;
    let cancelled = false;
    setError(null);
    try {
      chart = new Chart({ container: host, autoFit: true, height: page.chartKind === "matrix" ? 520 : 440 });
      chart.options(chartSpec(page, reduced));
      Promise.resolve(chart.render()).catch(reason => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : String(reason));
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    }
    return () => {
      cancelled = true;
      chart?.destroy();
    };
  }, [page, reduced]);

  return (
    <section className="chart-panel" data-scroll-reveal aria-labelledby={`${page.id}-chart-title`}>
      <div className="chart-heading">
        <div><Tag bordered={false} icon={<BarChartOutlined />}>{page.chartKind === "matrix" ? "ANTV G2 / ROUTE CAPABILITY MATRIX" : "ANTV G2 / LOCAL DATA"}</Tag><h2 id={`${page.id}-chart-title`}>{page.chartTitle}</h2></div>
        <p>{page.chartSummary}</p>
      </div>
      {error ? <Alert type="warning" showIcon message="图形层已回退" description="真实数值仍完整保留在页面的无障碍数据表中。" /> : <div ref={hostRef} className="g2-host" aria-hidden="true" />}
      <DataTable page={page} />
      <div className="chart-proof" aria-label="图表数据说明"><CheckCircleOutlined /><span>10 个公开路由</span><span>6 类工作能力</span><span>由当前页面配置生成</span><span>无虚构经营指标</span></div>
    </section>
  );
}
