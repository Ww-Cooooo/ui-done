import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Alert, Button, Segmented, Tag, Tooltip } from "antd";
import {
  AimOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  SwapOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { Chart } from "@antv/g2";
import { CanvasSpace, Group, Pt } from "pts";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(useGSAP, Flip, MotionPathPlugin, ScrollTrigger);

const queueSeed = [
  {
    id: "contrast",
    title: "修正弹层文字对比度",
    detail: "打开真实弹层，核对前景色和背景色。",
    tag: "可读性",
    estimate: "01:40",
    tone: "urgent"
  },
  {
    id: "mobile",
    title: "检查手机端按钮遮挡",
    detail: "确认主要操作不会被固定入口盖住。",
    tag: "手机端",
    estimate: "02:15",
    tone: "cool"
  },
  {
    id: "motion",
    title: "确认滚动章节完成态",
    detail: "正常动效和减弱动态模式都要看到全部内容。",
    tag: "动效",
    estimate: "03:10",
    tone: "violet"
  },
  {
    id: "fonts",
    title: "核对开源字体是否加载",
    detail: "检查中文、英文、数字和代码符号。",
    tag: "字体",
    estimate: "01:55",
    tone: "paper"
  }
];

const easeOptions = [
  { label: "稳健", value: "power2.inOut", note: "平稳加速，再平稳停下。" },
  { label: "回弹", value: "back.out(1.7)", note: "越过终点一点，再回到位置。" },
  { label: "弹性", value: "elastic.out(1, 0.4)", note: "快速到达后，留下逐渐减弱的余震。" }
];

function getEaseSamples(easing, total = 41) {
  const calculate = gsap.parseEase(easing);
  return Array.from({ length: total }, (_, index) => {
    const time = index / (total - 1);
    return {
      time: Number(time.toFixed(3)),
      value: Number(calculate(time).toFixed(4))
    };
  });
}

function QueueExperiment({ reduced }) {
  const rootRef = useRef(null);
  const queueRef = useRef(null);
  const [tasks, setTasks] = useState(queueSeed);
  const [announcement, setAnnouncement] = useState("当前第一项是修正弹层文字对比度。");
  const { contextSafe } = useGSAP({ scope: rootRef, dependencies: [reduced], revertOnUpdate: true });

  const prioritize = contextSafe(id => {
    const selected = tasks.find(task => task.id === id);
    if (!selected || tasks[0]?.id === id) {
      setAnnouncement(`${selected?.title || "这项任务"}已经排在第一位。`);
      return;
    }

    const nodes = queueRef.current?.querySelectorAll("[data-queue-task]");
    const previous = nodes?.length ? Flip.getState(nodes) : null;
    flushSync(() => {
      setTasks(current => {
        const target = current.find(task => task.id === id);
        return target ? [target, ...current.filter(task => task.id !== id)] : current;
      });
    });

    if (!reduced && previous) {
      Flip.from(previous, {
        absolute: false,
        scale: true,
        duration: 0.72,
        ease: "power3.inOut",
        stagger: 0.035,
        overwrite: "auto"
      });
      gsap.fromTo(
        `[data-task-id="${id}"] .queue-task-signal`,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 0.58, ease: "power2.out", overwrite: "auto" }
      );
    }
    setAnnouncement(`已将“${selected.title}”移到第一位。`);
  });

  return (
    <section ref={rootRef} id="queue" className="motion-queue-section" aria-labelledby="queue-title">
      <div className="motion-section-heading">
        <div>
          <span>STATE / FLIP</span>
          <h2 id="queue-title">把重要任务移到前面时，其他内容不必突然跳走。</h2>
        </div>
        <p>点击任意一项的“优先处理”。GSAP Flip 会保留变化前的位置，再把四项任务连续地移动到新顺序。</p>
      </div>

      <div className="queue-runway" aria-label="本地演示任务队列">
        <div className="queue-runway-label">
          <Tag bordered={false}>本地演示队列</Tag>
          <span>点击会改变本页状态，但不会发送任何数据。</span>
        </div>
        <div ref={queueRef} className="queue-track">
          {tasks.map((task, index) => (
            <article
              key={task.id}
              data-queue-task
              data-task-id={task.id}
              className={`queue-task queue-task-${task.tone} ${index === 0 ? "is-first" : ""}`}
            >
              <span className="queue-task-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="queue-task-copy">
                <Tag bordered={false}>{task.tag}</Tag>
                <h3>{task.title}</h3>
                <p>{task.detail}</p>
              </div>
              <div className="queue-task-action">
                <code>{task.estimate}</code>
                <Button
                  type={index === 0 ? "primary" : "default"}
                  icon={index === 0 ? <CheckCircleOutlined /> : <SwapOutlined />}
                  onClick={() => prioritize(task.id)}
                >
                  {index === 0 ? "当前优先" : "优先处理"}
                </Button>
              </div>
              <i className="queue-task-signal" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="visually-hidden" aria-live="polite">{announcement}</p>
      </div>
    </section>
  );
}

function ScrollAssembly({ reduced }) {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const meterRef = useRef(null);

  useLenis(() => {
    if (!reduced) ScrollTrigger.update();
  });

  useGSAP(() => {
    const section = sectionRef.current;
    const cells = section?.querySelectorAll("[data-assembly-cell]");
    if (!section || !cells?.length) return undefined;

    if (reduced) {
      gsap.set(cells, { clearProps: "transform,opacity,filter" });
      if (progressRef.current) progressRef.current.textContent = "100%";
      if (meterRef.current) meterRef.current.style.setProperty("--assembly-progress", "1");
      return undefined;
    }

    const starts = [
      { xPercent: -42, yPercent: -70, rotation: -8 },
      { xPercent: 36, yPercent: -62, rotation: 5 },
      { xPercent: 18, yPercent: 58, rotation: -4 },
      { xPercent: -48, yPercent: 44, rotation: 7 },
      { xPercent: 54, yPercent: 38, rotation: 10 }
    ];

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "bottom 30%",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const value = self.progress;
          if (progressRef.current) progressRef.current.textContent = `${Math.round(value * 100)}%`;
          if (meterRef.current) meterRef.current.style.setProperty("--assembly-progress", String(value));
        }
      }
    });

    timeline
      .from(cells, {
        xPercent: index => starts[index].xPercent,
        yPercent: index => starts[index].yPercent,
        rotation: index => starts[index].rotation,
        scale: 0.62,
        opacity: 0.16,
        filter: "blur(8px)",
        stagger: 0.035,
        duration: 0.56
      }, "assemble")
      .to("[data-assembly-cell='output']", {
        scale: 1.045,
        duration: 0.2,
        ease: "power2.out"
      }, "assemble+=0.5")
      .to("[data-assembly-cell]:not([data-assembly-cell='output'])", {
        opacity: 0.72,
        duration: 0.2
      }, "assemble+=0.72")
      .to("[data-assembly-cell]", {
        opacity: 1,
        duration: 0.08
      }, "assemble+=0.92");

    ScrollTrigger.refresh();
    return undefined;
  }, { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true });

  return (
    <section ref={sectionRef} id="scroll" className={`motion-scroll-section ${reduced ? "is-reduced" : ""}`} aria-labelledby="scroll-title">
      <div className="motion-scroll-copy">
        <span>SCROLL / ASSEMBLY</span>
        <h2 id="scroll-title">继续滚动，看看一组信息怎样从散开变成完整流程。</h2>
        <p>Lenis 只负责滚动手感，ScrollTrigger 读取滚动进度并编排五个单元的位置。两者不会同时接管滚动。</p>
      </div>

      <div className="assembly-sticky">
        <div className="assembly-status">
          <span>组装进度</span>
          <strong ref={progressRef}>{reduced ? "100%" : "0%"}</strong>
          <i ref={meterRef} aria-hidden="true" />
        </div>
        <div className="assembly-grid">
          <article data-assembly-cell="trigger" className="assembly-cell assembly-trigger">
            <small>输入</small><strong>用户滚动</strong><p>自然滚动仍然是唯一输入。</p>
          </article>
          <article data-assembly-cell="sequence" className="assembly-cell assembly-sequence">
            <small>编排</small><strong>ScrollTrigger 把进度交给时间线</strong><span aria-hidden="true">→</span>
          </article>
          <article data-assembly-cell="output" className="assembly-cell assembly-output">
            <ThunderboltOutlined aria-hidden="true" />
            <small>输出</small><strong>五个单元落到各自位置</strong><p>每个单元拥有不同尺寸、方向和结束状态。</p>
          </article>
          <article data-assembly-cell="owner" className="assembly-cell assembly-owner">
            <small>滚动边界</small><strong>Lenis 负责手感</strong><p>没有第二个平滑滚动引擎。</p>
          </article>
          <article data-assembly-cell="cleanup" className="assembly-cell assembly-cleanup">
            <CheckCircleOutlined aria-hidden="true" />
            <small>离开页面</small><strong>React 自动清理实例</strong>
          </article>
        </div>
      </div>
    </section>
  );
}

function EasingChart({ easing, samples, label }) {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let chart;
    let disposed = false;
    setFailed(false);
    const reportFailure = error => {
      if (disposed) return;
      console.error("Motion Lab easing chart failed:", error);
      setFailed(true);
    };

    try {
      chart = new Chart({ container: host, autoFit: true, height: 250 });
      chart.options({
        type: "line",
        data: samples,
        encode: { x: "time", y: "value" },
        scale: { x: { domain: [0, 1] }, y: { nice: true } },
        axis: {
          x: { title: "时间", labelFontFamily: "Red Hat Mono", labelFill: "#626b7e", grid: false },
          y: { title: "进度", labelFontFamily: "Red Hat Mono", labelFill: "#626b7e", gridStroke: "rgba(21,25,35,.12)" }
        },
        style: { stroke: "#3156e8", lineWidth: 4, shape: "smooth" },
        interaction: { tooltip: { shared: true } },
        animate: false,
        theme: { type: "classic", view: { viewFill: "transparent" } }
      });
      Promise.resolve(chart.render()).catch(reportFailure);
    } catch (error) {
      reportFailure(error);
    }
    return () => {
      disposed = true;
      chart?.destroy();
    };
  }, [easing, samples]);

  return (
    <>
      <div ref={hostRef} className="easing-chart-host" aria-hidden="true" hidden={failed} />
      {failed && <Alert type="warning" title="曲线暂时无法绘制" description="下表保留真实采样值，路径与任务实验仍可操作。" />}
      <table className={failed ? "easing-data-table" : "visually-hidden"}>
        <caption>{label}缓动曲线的 GSAP 采样值</caption>
        <thead><tr><th>时间</th><th>进度</th></tr></thead>
        <tbody>{samples.filter((_, index) => index % 5 === 0).map(sample => <tr key={sample.time}><td>{sample.time}</td><td>{sample.value}</td></tr>)}</tbody>
      </table>
    </>
  );
}

function EasingTrail({ easing }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const calculate = gsap.parseEase(easing);
    const space = new CanvasSpace(host).setup({ bgcolor: "transparent", resize: true, retina: true });
    const form = space.getForm();

    const draw = () => {
      const width = space.size.x;
      const height = space.size.y;
      if (!width || !height) return;
      space.clear();
      const guide = new Group(new Pt(20, height * 0.52), new Pt(width - 20, height * 0.52));
      form.strokeOnly("rgba(255,255,255,.20)", 1).line(guide);
      for (let index = 0; index < 25; index += 1) {
        const time = index / 24;
        const eased = calculate(time);
        const x = 24 + Math.min(1.08, Math.max(-0.08, eased)) * (width - 48);
        const y = height * 0.52 + Math.sin(eased * Math.PI * 2) * height * 0.16;
        const point = new Pt(x, y);
        form.fillOnly(index % 6 === 0 ? "#ffad99" : "rgba(255,255,255,.72)").point(point, index % 6 === 0 ? 3.5 : 1.8, "circle");
      }
    };

    space.add({ animate: draw, resize: () => space.playOnce(32) });
    space.playOnce(32);
    return () => space.dispose();
  }, [easing]);

  return <div ref={hostRef} className="easing-trail" aria-hidden="true" />;
}

function PathExperiment({ reduced }) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const markerRef = useRef(null);
  const progressRef = useRef(null);
  const meterRef = useRef(null);
  const timelineRef = useRef(null);
  const [easing, setEasing] = useState(easeOptions[0].value);
  const samples = useMemo(() => getEaseSamples(easing), [easing]);
  const selectedEase = easeOptions.find(option => option.value === easing) || easeOptions[0];

  const { contextSafe } = useGSAP(() => {
    const path = pathRef.current;
    const marker = markerRef.current;
    if (!path || !marker) return undefined;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });

    const report = value => {
      const percent = Math.round(value * 100);
      if (progressRef.current) progressRef.current.textContent = `${percent}%`;
      if (meterRef.current) meterRef.current.style.setProperty("--path-progress", String(value));
    };

    if (reduced) {
      gsap.set(marker, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: 1, end: 1 }
      });
      report(1);
      return undefined;
    }

    const timeline = gsap.timeline({ paused: true });
    timeline
      .addLabel("draw")
      .to(path, { strokeDashoffset: 0, duration: 1.45, ease: "power2.inOut" }, "draw")
      .to(marker, {
        duration: 2.25,
        ease: easing,
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }
      }, "draw+=0.08")
      .to(".path-terminal", { attr: { r: 14.2 }, duration: 0.18, repeat: 1, yoyo: true, ease: "power2.out" }, ">-0.12")
      .eventCallback("onUpdate", () => report(timeline.progress()))
      .eventCallback("onComplete", () => report(1));

    timelineRef.current = timeline;
    report(0);
    timeline.restart();
    return () => {
      timelineRef.current = null;
    };
  }, { scope: rootRef, dependencies: [easing, reduced], revertOnUpdate: true });

  const replay = contextSafe(() => {
    if (!reduced) timelineRef.current?.restart();
  });

  return (
    <section ref={rootRef} id="path" className="motion-path-section" aria-labelledby="path-title">
      <div className="path-title-row">
        <div>
          <span>PATH / EASING</span>
          <h2 id="path-title">选择一种缓动曲线，再看同一条路径怎样改变速度。</h2>
        </div>
        <div className="path-controls">
          <Segmented
            aria-label="选择缓动曲线"
            options={easeOptions.map(option => ({ label: option.label, value: option.value }))}
            value={easing}
            onChange={setEasing}
          />
          <Tooltip title={reduced ? "系统正在使用减弱动态模式，页面已直接显示完成态。" : "重新播放当前缓动曲线"}>
            <Button icon={<PlayCircleOutlined />} onClick={replay} disabled={reduced}>重新播放</Button>
          </Tooltip>
        </div>
      </div>

      <div className="path-console">
        <aside className="easing-data-panel">
          <Tag bordered={false} icon={<AimOutlined />}>ANTV / 真实采样值</Tag>
          <h3>真实采样曲线</h3>
          <p>横轴是时间，纵轴是 GSAP 在这个时刻算出的进度。当前选择：{selectedEase.note}</p>
          <EasingChart easing={easing} samples={samples} label={selectedEase.label} />
        </aside>

        <div className="path-stage">
          <EasingTrail easing={easing} />
          <div className="path-stage-head">
            <span>PTS / 等时间采样轨迹</span>
            <strong ref={progressRef}>{reduced ? "100%" : "0%"}</strong>
          </div>
          <svg viewBox="0 0 960 360" role="img" aria-labelledby="motion-path-svg-title motion-path-svg-desc">
            <title id="motion-path-svg-title">当前缓动曲线的路径动画</title>
            <desc id="motion-path-svg-desc">一个箭头沿着弯曲路径从左下方移动到右上方，路径同时被逐步画出。</desc>
            <path className="path-ghost" d="M 62 286 C 200 38 336 338 494 176 C 642 24 748 258 900 74" />
            <path ref={pathRef} className="path-live" d="M 62 286 C 200 38 336 338 494 176 C 642 24 748 258 900 74" />
            <circle className="path-origin" cx="62" cy="286" r="10" />
            <circle className="path-terminal" cx="900" cy="74" r="12" />
            <g ref={markerRef} className="path-marker">
              <path d="M -14 -9 L 15 0 L -14 9 L -7 0 Z" />
            </g>
          </svg>
          <div ref={meterRef} className="path-progress-meter" aria-hidden="true"><i /></div>
          <p>白点由 Pts 按相同的等时间间隔绘制。点越密，说明物体在那一段移动得越慢。</p>
        </div>
      </div>
    </section>
  );
}

export default function MotionLab({ page, reduced }) {
  const rootRef = useRef(null);

  useGSAP(() => {
    if (reduced) return undefined;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .addLabel("open")
      .from(".motion-lab-kicker > *", { yPercent: 120, duration: 0.62, stagger: 0.055 }, "open")
      .from(".motion-lab-title > span", { yPercent: 112, rotation: 2.5, duration: 0.84, stagger: 0.08 }, "open+=0.08")
      .from(".motion-lab-intro", { opacity: 0, x: -24, duration: 0.52 }, "open+=0.36")
      .from(".motion-lab-nav", { opacity: 0, x: 24, duration: 0.52 }, "open+=0.4")
      .fromTo(".motion-time-cursor", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 1.05 }, "open+=0.18");
    return undefined;
  }, { scope: rootRef, dependencies: [reduced], revertOnUpdate: true });

  return (
    <div ref={rootRef} className={`motion-lab ${reduced ? "is-reduced" : ""}`}>
      <header className="motion-lab-hero">
        <div className="motion-lab-topbar">
          <a href="../gallery/" aria-label="返回 UI Done 展示厅"><ArrowLeftOutlined /> UI DONE</a>
          <div className="motion-lab-kicker"><span>GSAP 3.15.0</span><span>REACT 19</span><span>LOCAL DEMO</span></div>
        </div>

        <div className="motion-lab-hero-grid">
          <div>
            <p className="motion-lab-overline">UI DONE / MOTION REHEARSAL BENCH</p>
            <h1 className="motion-lab-title">
              <span>让界面把</span>
              <span><em>变化</em>讲清楚。</span>
            </h1>
          </div>
          <p className="motion-lab-intro">这三个小实验分别回答三个问题：状态改变时，内容怎样连续移动；用户滚动时，信息怎样逐步组装；同一条路径怎样因为缓动曲线产生不同节奏。你可以直接点击、滚动和切换参数。</p>
          <nav className="motion-lab-nav" aria-label="动效实验导航">
            <Button type="primary" href="#queue">先试任务排序</Button>
            <Button href="#scroll">查看滚动组装</Button>
            <Button href="#path">比较缓动曲线</Button>
          </nav>
        </div>

        <div className="motion-time-ruler" aria-hidden="true">
          <i className="motion-time-cursor" />
          <span>00.00</span><span>00.72</span><span>01.45</span><span>02.25</span>
        </div>
      </header>

      <QueueExperiment reduced={reduced} />
      <ScrollAssembly reduced={reduced} />
      <PathExperiment reduced={reduced} />

      <footer className="motion-lab-footer">
        <div><strong>GSAP MOTION LAB</strong><span>{page.fontStatement}</span></div>
        <p>这三个实验只修改本页内的演示状态，不会发送数据，也不会影响其他展示页。</p>
        <a href="../gallery/">返回示例展厅 <ArrowLeftOutlined /></a>
      </footer>
    </div>
  );
}
