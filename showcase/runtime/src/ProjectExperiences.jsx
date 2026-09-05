import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Card, Progress, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CompassOutlined,
  FireOutlined,
  GlobalOutlined,
  Loading3QuartersOutlined
} from "@ant-design/icons";
import { animate, createTimeline, onScroll, stagger } from "animejs";
import VisualStage from "./VisualStage";
import { useReducedMotion } from "./useReducedMotion";
import {
  AtelierWorkspace,
  CornerWorkspace,
  GridWorkspace,
  OrbitalWorkspace,
  StillWorkspace,
  VelocityWorkspace
} from "./WorkExperiences";

function useScopedMotion(rootRef, reduced, key, build) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;
    const result = build(root);
    const effects = Array.isArray(result) ? result : [result];
    return () => effects.forEach(effect => effect?.revert?.());
  }, [key, reduced, rootRef]);
}

function NorthTide({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;
    const chapters = [...root.querySelectorAll(".north-threshold-chapter")];
    chapters.forEach(node => {
      node.style.opacity = "0";
      node.style.transform = "translateY(64px)";
    });
    const observers = chapters.map((node, index) => onScroll({
      target: node,
      repeat: true,
      onEnter: () => animate(node, { opacity: [0, 1], y: [64, 0], duration: 760 + index * 90, ease: "out(4)" }),
      onLeaveBackward: () => animate(node, { opacity: [1, 0], y: [0, 46], duration: 360, ease: "in(2)" })
    }));
    const opening = createTimeline({ defaults: { duration: 820, ease: "out(4)" } })
      .add(root.querySelector(".north-cover-copy > span"), { opacity: [0, 1], y: [20, 0] })
      .add(root.querySelector(".north-cover-copy h1"), { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] }, "-=560")
      .add(root.querySelector(".north-cover-image"), { scale: [1.12, 1], opacity: [0.3, 1] }, "-=520");
    const media = root.querySelector(".north-cover-image");
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * .9)));
      media.style.transform = `translate3d(0, ${progress * 8}vh, 0) scale(${1 + progress * .16})`;
      media.style.clipPath = `inset(${progress * 10}% ${progress * 5}% 0 ${progress * 5}%)`;
    };
    const onWindowScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    update();
    return () => {
      observers.forEach(observer => observer.revert());
      opening.revert();
      window.removeEventListener("scroll", onWindowScroll);
      if (frame) window.cancelAnimationFrame(frame);
      media.removeAttribute("style");
      chapters.forEach(node => {
        node.style.opacity = "";
        node.style.transform = "";
      });
    };
  }, [reduced]);

  return (
    <article ref={rootRef} id="experience" className="north-scroll-journal" data-motion-signature="threshold-media-expansion">
      <section className="north-cover">
        <img className="north-cover-image" src={page.images[0].src} alt={page.images[0].alt} />
        <div className="north-cover-wash" aria-hidden="true" />
        <a className="north-return-path" href="../gallery/"><ArrowLeftOutlined /><span>RETURN BY<br />THE NORTH PATH</span></a>
        <div className="north-cover-copy">
          <span>COASTAL FIELD JOURNAL / VOL. 02</span>
          <h1><b>沿着风，</b><em>走到陆地尽头。</em></h1>
          <p>{page.intro}</p>
          <Button type="primary" size="large" href="#north-chapter-salt" icon={<ArrowDownOutlined />}>走进第一段海岸</Button>
          <small>OPEN-SOURCE TYPE / {page.fontStatement}</small>
        </div>
        <div className="north-wind-scale" aria-hidden="true"><span>12</span><i /><span>24</span><i /><span>36</span><b>THE LAST PATH / NORTH EDGE</b></div>
      </section>

      <section id="north-chapter-salt" className="north-threshold-chapter north-salt-chapter">
        <img src={page.images[1].src} alt={page.images[1].alt} />
        <div className="north-chapter-shade" aria-hidden="true" />
        <div className="north-salt-copy"><CompassOutlined /><span>CHAPTER 01 / SALT</span><h2>潮水每天，<br />重新安排边界。</h2><blockquote>{page.quote}</blockquote></div>
        <p className="north-threshold-note">继续滚动，岩石才从雾里出现。</p>
      </section>

      <section className="north-threshold-chapter north-horizon-chapter">
        <VisualStage page={page} />
        <div className="north-horizon-copy"><span>CHAPTER 02 / HORIZON</span><h2>海面不是背景，<br />是时间本身。</h2><p>连续水面、天气与地平线共同说明距离；这里是本页唯一的空间场景。</p></div>
      </section>

      <section className="north-threshold-chapter north-shelter-chapter">
        <img src={page.images[2].src} alt={page.images[2].alt} />
        <div className="north-shelter-copy"><span>CHAPTER 03 / SHELTER</span><h2>在雾里，<br />建筑只是一次停顿。</h2><p>路没有被包装成目的地。读完这一章，海岸仍然留在画面以外。</p><Button href="../gallery/" icon={<ArrowLeftOutlined />}>合上海岸笔记</Button></div>
      </section>
    </article>
  );
}

const redRooms = [
  { code: "01", label: "BODY", title: "身体先打破网格。", copy: "舞者不是配图，而是整间展室的尺度。", image: 2 },
  { code: "02", label: "OBJECT", title: "悬挂物拒绝保持礼貌。", copy: "红色、钢索与重量直接占领白盒子。", image: 0 },
  { code: "03", label: "SURFACE", title: "材料把冲突留在表面。", copy: "透明、颜料与反光不是装饰，它们改变观看距离。", image: 1 },
  { code: "04", label: "KINETIC", title: "运动重新切开空间。", copy: "单体雕塑与光线构成最后一间展室。", scene: true }
];

function RedForm({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [room, setRoom] = useState(0);
  const active = redRooms[room];

  useScopedMotion(rootRef, reduced, room, root => {
    const transition = createTimeline({ defaults: { duration: 620, ease: "out(4)" } })
      .add(root.querySelector(".red-room-media"), { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] })
      .add(root.querySelector(".red-room-media > *"), { scale: [1.08, 1], filter: ["contrast(1.35)", "contrast(1)"] }, "-=520")
      .add(root.querySelectorAll(".red-room-copy > *"), { x: [42, 0], delay: stagger(55) }, "-=430");
    const trace = animate(root.querySelector(".red-trace-path"), { strokeDashoffset: [620, 0], duration: 1200, ease: "out(3)" });
    return [transition, trace];
  });

  return (
    <section ref={rootRef} id="experience" className="red-proscenium" data-motion-signature="single-room-hard-cut-floor-markers">
      <div className="red-room-media">
        {active.scene ? <VisualStage page={page} /> : <img src={page.images[active.image].src} alt={page.images[active.image].alt} />}
        <svg viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true"><path className="red-trace-path" d="M48 682 L48 58 L940 58 L1130 196 L1130 682 L260 682" /></svg>
        <div className="red-halftone" aria-hidden="true" />
        <span className="red-room-number">{active.code}</span>
      </div>
      <a className="red-exit-plaque" href="../gallery/"><ArrowRightOutlined /><span>MUSEUM<br />EXIT</span></a>
      <div className="red-show-title"><span>RED FORM / TEMPORARY EXHIBITION</span><strong>ROOM {active.code}</strong></div>
      <aside className="red-room-copy">
        <Tag bordered={false}>TEMPORARY EXHIBITION / {active.label}</Tag>
        <h1>{active.title}</h1>
        <p>{active.copy}</p>
        <blockquote>“{page.quote}”</blockquote><small>{page.fontStatement}</small>
      </aside>
      <Progress className="red-room-progress" type="circle" size={64} percent={(room + 1) * 25} format={() => `${active.code}/04`} strokeColor="#e41d16" trailColor="rgba(255,255,255,.22)" />
      <nav className="red-floor-markers" aria-label="选择展室">
        {redRooms.map((item, index) => <Button key={item.code} type="text" className={room === index ? "is-active" : ""} onClick={() => setRoom(index)}><i /><b>{item.code}</b><small>{item.label}</small></Button>)}
      </nav>
    </section>
  );
}

const neonPhases = [
  { key: "gate", label: "GATE", title: "信号正在聚拢。", copy: "先确认入口，再让世界出现。", image: 2, action: "准备信号" },
  { key: "arena", label: "ARENA", title: "场馆进入同一频率。", copy: "人物与光场先建立正在发生的尺度。", image: 0, action: "进入裂隙" },
  { key: "input", label: "INPUT", title: "手里的触感连接远处。", copy: "控制器成为最后一个真实入口。", image: 1, action: "重新进入" }
];

function NeonRift({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const active = neonPhases[phase];

  useScopedMotion(rootRef, reduced, phase, root => {
    const transition = createTimeline({ defaults: { duration: 680, ease: "out(4)" } })
      .add(root.querySelector(".neon-phase-image"), { scale: [1.18, 1], opacity: [0.18, 1], filter: ["blur(18px)", "blur(0px)"] })
      .add(root.querySelectorAll(".neon-phase-copy > *"), { y: [34, 0], opacity: [0, 1], delay: stagger(70) }, "-=520");
    const ring = animate(root.querySelector(".neon-energy-ring"), { rotate: [0, 360], scale: [.94, 1.05], duration: 4600, ease: "linear", loop: true });
    const pulse = animate(root.querySelector(".neon-gate-core"), { scale: [.82, 1.12], opacity: [.52, 1], duration: 1300, ease: "inOut(2)", alternate: true, loop: true });
    return [transition, ring, pulse];
  });

  const advance = () => setPhase(value => value === neonPhases.length - 1 ? 0 : value + 1);

  return (
    <section ref={rootRef} id="experience" className={`neon-phase-gate is-${active.key}`} data-motion-signature="state-gate-energy-pulse">
      <div className="neon-world">
        <img className="neon-phase-image" src={page.images[active.image].src} alt={page.images[active.image].alt} />
        <VisualStage page={page} />
        <div className="neon-energy-ring" aria-hidden="true"><i /><i /><i /></div>
        <div className="neon-gate-core" aria-hidden="true" />
      </div>
      <aside className="neon-phase-copy">
        <Tag bordered={false}><FireOutlined /> LIVE DIGITAL EXPERIENCE</Tag>
        <span>PHASE 0{phase + 1} / 03</span>
        <h1>{active.title}</h1>
        <p>{active.copy}</p>
        <small>OPEN TYPE / {page.fontStatement}</small>
      </aside>

      <nav className="neon-phase-notch" aria-label="当前入口阶段">
        <a href="../gallery/" aria-label="离开裂隙"><ArrowLeftOutlined /><span>EXIT</span></a>
        {neonPhases.map((item, index) => <button key={item.key} type="button" className={phase === index ? "is-active" : ""} onClick={() => setPhase(index)}><span>0{index + 1}</span><b>{item.label}</b></button>)}
        <Button className="neon-entry-action" type="primary" shape="circle" onClick={advance} icon={phase === 0 ? <Loading3QuartersOutlined /> : phase === 1 ? <GlobalOutlined /> : <ArrowRightOutlined />} aria-label={active.action} />
      </nav>
      <span className="neon-action-label">{active.action}</span>
    </section>
  );
}

function ShanshuiNow({ page }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onWheel = event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const max = track.scrollWidth - track.clientWidth;
      const movingForward = event.deltaY > 0 && track.scrollLeft < max - 2;
      const movingBackward = event.deltaY < 0 && track.scrollLeft > 2;
      if (movingForward || movingBackward) {
        event.preventDefault();
        track.scrollLeft += event.deltaY;
      }
    };
    let frame = 0;
    const onScrollTrack = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const centers = [...track.children].map(node => Math.abs(node.offsetLeft + node.offsetWidth / 2 - track.scrollLeft - track.clientWidth / 2));
        setActive(centers.indexOf(Math.min(...centers)));
      });
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScrollTrack, { passive: true });
    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScrollTrack);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useScopedMotion(rootRef, reduced, active, root => {
    const panel = root.querySelectorAll(".ink-reel-panel")[active];
    if (!panel) return [];
    const stroke = animate(panel.querySelectorAll(".ink-brush-path"), { strokeDashoffset: [520, 0], duration: 1200, delay: stagger(90), ease: "out(3)" });
    const content = animate(panel.querySelectorAll("[data-ink-arrive]"), { x: [80, 0], opacity: [0, 1], delay: stagger(90), duration: 720, ease: "out(4)" });
    return [stroke, content];
  });

  const moveTo = index => {
    const track = trackRef.current;
    const item = track?.children[index];
    item?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section ref={rootRef} id="experience" className="ink-horizontal-reel" data-motion-signature="horizontal-ink-writing">
      <div ref={trackRef} className="ink-reel-track" data-native-scroll tabIndex="0" onKeyDown={event => {
        if (event.key === "ArrowRight") moveTo(Math.min(2, active + 1));
        if (event.key === "ArrowLeft") moveTo(Math.max(0, active - 1));
      }}>
        <section className="ink-reel-panel ink-reel-cover">
          <a className="ink-return-seal" href="../gallery/"><ArrowLeftOutlined /><span>展</span><small>RETURN</small></a>
          <div data-ink-arrive><Tag bordered={false}>CONTEMPORARY CULTURE / 09</Tag><h1>山水不是旧图案，<br />是今天的空间。</h1><p>{page.intro}</p><small>{page.fontStatement}</small></div>
          <figure data-ink-arrive><img src={page.images[0].src} alt={page.images[0].alt} /><figcaption>HALL / 人与空间</figcaption></figure>
          <svg viewBox="0 0 600 600" aria-hidden="true"><path className="ink-brush-path" d="M20 480 C150 260 220 510 350 240 C430 80 520 180 590 40" /></svg>
          <div className="ink-pts-layer" aria-hidden="true"><VisualStage page={page} compact /></div>
          <p className="ink-scroll-instruction">滚轮 · 拖动 · 方向键 / 横向展开</p>
        </section>

        <section className="ink-reel-panel ink-reel-trace">
          <p className="ink-vertical-line" data-ink-arrive>留白不是空</p>
          <figure data-ink-arrive><img src={page.images[1].src} alt={page.images[1].alt} /><figcaption>纸 · 墨 · 青铜</figcaption></figure>
          <article data-ink-arrive><span>TRACE / 02</span><h2>时间留下纹理，<br />当代重新安排尺度。</h2><blockquote>“{page.quote}”</blockquote></article>
          <svg viewBox="0 0 900 500" aria-hidden="true"><path className="ink-brush-path" d="M40 360 C180 210 260 420 390 210 C520 20 650 300 860 90" /></svg>
        </section>

        <section className="ink-reel-panel ink-reel-court">
          <figure data-ink-arrive><img src={page.images[2].src} alt={page.images[2].alt} /></figure>
          <div data-ink-arrive><span>COURT / 03</span><h2>竹影、水面、<br />黑白建筑。</h2><p>传统活着的时候，不需要仿古外壳。</p><Button href="../gallery/">收起长卷 <ArrowRightOutlined /></Button></div>
          <svg viewBox="0 0 700 500" aria-hidden="true"><path className="ink-brush-path" d="M30 420 C120 330 180 380 260 240 C340 100 470 160 650 40" /></svg>
        </section>
      </div>
      <nav className="ink-reel-seals" aria-label="长卷段落">
        <Button aria-label="上一段" icon={<ArrowLeftOutlined />} disabled={active === 0} onClick={() => moveTo(Math.max(0, active - 1))} />
        {[0, 1, 2].map(index => <button key={index} type="button" className={active === index ? "is-active" : ""} onClick={() => moveTo(index)}><span>{["山", "水", "今"][index]}</span><small>0{index + 1}</small></button>)}
        <Button aria-label="下一段" icon={<ArrowRightOutlined />} disabled={active === 2} onClick={() => moveTo(Math.min(2, active + 1))} />
      </nav>
      <div className="ink-reel-progress" aria-hidden="true"><i style={{ width: `${(active + 1) / 3 * 100}%` }} /></div>
    </section>
  );
}

const experiences = {
  "velocity-works": VelocityWorkspace,
  "north-tide": NorthTide,
  "red-form": RedForm,
  "orbital-grid": OrbitalWorkspace,
  "corner-goods": CornerWorkspace,
  "still-day": StillWorkspace,
  "atelier-noir": AtelierWorkspace,
  "neon-rift": NeonRift,
  "shanshui-now": ShanshuiNow,
  "grid-01": GridWorkspace
};

export default function ProjectExperience({ page }) {
  const Experience = experiences[page.id];
  if (!Experience) return <Card>Unknown showcase route.</Card>;
  return <Experience page={page} />;
}
