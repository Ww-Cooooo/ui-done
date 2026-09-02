import { useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import { Alert, Tag } from "antd";
import { BarChartOutlined, CheckCircleOutlined } from "@ant-design/icons";

function palette(page) {
  return [
    page.theme.accent,
    page.theme.accent2,
    page.theme.ink,
    page.theme.muted,
    page.theme.surfaceAlt,
    page.theme.accent,
    page.theme.accent2,
    page.theme.ink,
    page.theme.muted,
    page.theme.surfaceAlt
  ];
}

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
  const common = {
    autoFit: true,
    data: page.chartData,
    animate: reduced ? false : { enter: { type: "growInY", duration: 460 } },
    theme: {
      type: "classic",
      color: page.theme.accent,
      view: { viewFill: "transparent" }
    },
    scale: {
      color: { range: palette(page) }
    },
    legend: { color: false }
  };

  if (page.chartKind === "radialEqual") {
    return {
      ...common,
      type: "interval",
      animate: false,
      coordinate: { type: "theta", innerRadius: 0.56, outerRadius: 0.88 },
      transform: [{ type: "stackY" }],
      encode: { y: "value", color: "label" },
      style: { stroke: page.theme.bg, lineWidth: 3 },
      axis: false
    };
  }

  if (page.chartKind === "radial") {
    return {
      ...common,
      type: "interval",
      animate: false,
      coordinate: { type: "polar", innerRadius: 0.18, outerRadius: 0.84 },
      encode: { x: "label", y: "value", color: "label" },
      scale: {
        color: { range: palette(page) },
        y: { nice: true }
      },
      style: { radius: 5, stroke: page.theme.bg, lineWidth: 2 },
      axis: {
        x: { ...baseAxis(page), grid: false, line: false, tick: false },
        y: { ...baseAxis(page), label: false, title: false }
      }
    };
  }

  if (page.chartKind === "grouped") {
    return {
      ...common,
      type: "interval",
      encode: { x: "label", y: "value", color: "metric" },
      transform: [{ type: "dodgeX" }],
      style: { radiusTopLeft: 5, radiusTopRight: 5 },
      axis: {
        x: { ...baseAxis(page), grid: false, title: false },
        y: { ...baseAxis(page), title: false }
      },
      legend: {
        color: {
          position: "top",
          itemLabelFill: page.theme.muted,
          itemLabelFontFamily: page.theme.body
        }
      }
    };
  }

  if (page.chartKind === "line") {
    return {
      ...common,
      type: "line",
      encode: { x: "label", y: "value" },
      style: { stroke: page.theme.accent, lineWidth: 4 },
      axis: {
        x: { ...baseAxis(page), grid: false, title: false, labelAutoRotate: true },
        y: { ...baseAxis(page), title: false, tickCount: 5 }
      }
    };
  }

  return {
    ...common,
    type: "interval",
    coordinate: { transform: [{ type: "transpose" }] },
    encode: { x: "label", y: "value", color: "label" },
    style: { radiusTopRight: 7, radiusBottomRight: 7 },
    axis: {
      x: { ...baseAxis(page), grid: false, title: false },
      y: { ...baseAxis(page), title: false }
    }
  };
}

function DataTable({ page }) {
  const hasMetric = page.chartData.some(item => item.metric);
  return (
    <table className="visually-hidden">
      <caption>{page.chartTitle}：{page.chartSummary}</caption>
      <thead>
        <tr><th>项目</th>{hasMetric && <th>维度</th>}<th>值</th></tr>
      </thead>
      <tbody>
        {page.chartData.map((item, index) => (
          <tr key={`${item.label}-${item.metric || index}`}>
            <td>{item.label}</td>
            {hasMetric && <td>{item.metric || "—"}</td>}
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
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

    try {
      chart = new Chart({ container: host, autoFit: true, height: 330 });
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
        <div>
          <Tag bordered={false} icon={<BarChartOutlined />}>ANTV G2 / REAL DATA</Tag>
          <h2 id={`${page.id}-chart-title`}>{page.chartTitle}</h2>
        </div>
        <p>{page.chartSummary}</p>
      </div>
      {error ? (
        <Alert
          type="warning"
          showIcon
          message="图形层已回退"
          description="真实数据仍完整保留在文字表格中。"
        />
      ) : <div ref={hostRef} className="g2-host" aria-hidden="true" />}
      <DataTable page={page} />
      <div className="chart-proof" aria-label="图表数据说明">
        <CheckCircleOutlined />
        <span>本地数据</span>
        <span>无远程请求</span>
        <span>有文字等价内容</span>
      </div>
    </section>
  );
}
