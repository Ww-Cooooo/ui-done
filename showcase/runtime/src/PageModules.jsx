import { useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Card, Segmented, Tag } from "antd";
import { ArrowRightOutlined, CheckOutlined, FontSizeOutlined } from "@ant-design/icons";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { capabilities, galleryPages } from "./data";
import { trainingSeed, averagePace } from "./training-data";
import "./work-previews.css";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

function SectionIntro({ index, eyebrow, title, copy }) {
  return (
    <div className="section-intro" data-scroll-reveal>
      <span>{index}</span>
      <div><p>{eyebrow}</p><h2>{title}</h2></div>
      <p>{copy}</p>
    </div>
  );
}

function PreviewImage({ page, index = 0, className = "" }) {
  return <img className={className} src={page.images[index].src} alt="" loading="lazy" />;
}

function VelocityPreview() {
  const records = trainingSeed;
  return (
    <div className="preview-training">
      <header><span>VELOCITY / COACHING</span><b>训练分析</b><small>50.2 km · 5 次训练</small></header>
      <div className="preview-training-analysis">
        <div><span>最近五次训练负荷</span><svg viewBox="0 0 340 100" aria-hidden="true"><path d="M 8 83 H 332 M 8 43 H 332" stroke="#30414f" fill="none" /><polyline points={records.slice().reverse().map((record, index) => `${12 + index * 79},${100 - record.load}`).join(" ")} fill="none" stroke="#d8ff3e" strokeWidth="3" />{records.slice().reverse().map((record,index)=><circle key={record.id} cx={12 + index * 79} cy={100-record.load} r="3.5" fill="#d8ff3e" />)}</svg></div>
        <aside><span>坡道间歇 / 09.04</span><b>87</b><small>训练负荷</small><em>8.4 km · {averagePace(records[0])} /km</em></aside>
      </div>
      <div className="preview-training-records">{records.slice(0,2).map(record => <p key={record.id}><span>{record.date}</span><b>{record.type}</b><span>{record.distance} km</span><em>{record.status}</em></p>)}</div>
      <footer><span>RUN-241 · 教练结论</span><i>保存复盘</i></footer>
    </div>
  );
}

function OrbitalPreview({ page }) {
  return (
    <div className="preview-orbital">
      <PreviewImage page={page} />
      <div className="orbital-preview-top"><b>RELAY—04</b><span>UTC 11:47:20</span></div>
      <div className="orbital-preview-radar" aria-hidden="true"><i /><i /><i /><em /></div>
      <div className="orbital-preview-alert"><small>AL—17 / HIGH</small><strong>Ka 波段链路抖动</strong><span>待处置</span></div>
      <div className="orbital-preview-readout"><span><small>LINK</small><b>92.4%</b></span><span><small>LATENCY</small><b>38 ms</b></span><span><small>POWER</small><b>76%</b></span></div>
    </div>
  );
}

function CornerPreview({ page }) {
  return (
    <div className="preview-corner">
      <PreviewImage page={page} />
      <div className="corner-preview-awning" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="corner-preview-ticket">
        <span>CORNER GOODS / OPENING</span>
        <h4>补货单</h4>
        <p><b>蜜柑纸袋</b><em>06 / 12</em></p>
        <p><b>手作酸面包</b><em>04 / 08</em></p>
        <div><strong>2</strong><small>LOW STOCK</small></div>
      </div>
      <small className="corner-preview-time">THU · 08:42</small>
    </div>
  );
}

function StillPreview({ page }) {
  return (
    <div className="preview-still">
      <div className="still-preview-date"><span>SEP</span><strong>04</strong><small>FRI</small></div>
      <div className="still-preview-plan">
        <p>STILL DAY / TODAY</p>
        <h4><span>今天，</span><span>只排重要的。</span></h4>
        <ol><li><time>09:30</time><span>整理周计划</span></li><li><time>13:40</time><span>河边走 20 分钟</span></li><li><time>19:10</time><span>给妈妈打电话</span></li></ol>
        <div className="still-preview-habit"><span>DAILY RHYTHM</span><b>1 / 3</b></div>
      </div>
      <figure><PreviewImage page={page} /><figcaption>MAKE SPACE</figcaption></figure>
    </div>
  );
}

function AtelierPreview({ page }) {
  return (
    <div className="preview-proofroom">
      <header><span>ATELIER / CREATIVE REVIEW</span><h4>原图与裁切提案</h4></header>
      <div className="preview-proof-pair"><figure><small>原始照片</small><div><PreviewImage page={page} /></div></figure><figure><small>裁切提案 · 4:5</small><div><PreviewImage page={page} /></div></figure></div>
      <div className="preview-proof-controls"><span>画面放大</span><i /><b>100%</b></div>
      <footer><span>LOOK-01 · 待审</span><b>批准当前裁切</b></footer>
    </div>
  );
}

function GridPreview({ page }) {
  return (
    <div className="preview-grid">
      <header><b>G/01</b><span>RIVER HALL / COORDINATION</span><em>建筑 · 结构 · 机电</em></header>
      <div className="grid-preview-model"><PreviewImage page={page} /><span>MODEL CONTEXT / L01</span><strong>AR—118</strong></div>
      <div className="grid-preview-lanes"><span><small>待处理</small><b>02</b></span><span><small>进行中</small><b>02</b></span><span><small>已确认</small><b>02</b></span></div>
      <p>东侧雨棚净高冲突</p>
    </div>
  );
}

function NorthPreview({ page }) {
  return (
    <div className="preview-north">
      <div className="north-preview-copy"><span>FIELD NOTE / VOL. II</span><h4><span>沿着海岸，</span><span>继续向北走。</span></h4><p>THE SEA KEEPS<br />ITS OWN TIME.</p></div>
      <figure><PreviewImage page={page} /><figcaption>THE LAST PATH</figcaption></figure>
      <div className="north-preview-detail"><PreviewImage page={page} index={1} /><span>SALT / ROCK / RETURN</span></div>
    </div>
  );
}

function RedPreview({ page }) {
  return (
    <div className="preview-red">
      <div className="red-preview-type"><span>FORM / BODY</span><h4><span>红色打破</span><span>白色展厅。</span></h4><p>TEMPORARY EXHIBITION</p></div>
      <figure className="red-preview-body"><PreviewImage page={page} index={2} /></figure>
      <figure className="red-preview-object"><PreviewImage page={page} /><figcaption>OBJECT / 01</figcaption></figure>
      <i className="red-preview-line" aria-hidden="true" />
    </div>
  );
}

function NeonPreview({ page }) {
  return (
    <div className="preview-neon">
      <PreviewImage page={page} index={2} />
      <div className="neon-preview-gate" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="neon-preview-copy"><span>LIVE / 23:00</span><h4>ENTER<br />THE RIFT</h4><p>入口信号已同步</p></div>
      <div className="neon-preview-pass"><PreviewImage page={page} index={1} /><span>INPUT / READY</span></div>
    </div>
  );
}

function ShanshuiPreview({ page }) {
  return (
    <div className="preview-shanshui">
      <div className="shanshui-preview-title"><span>当代山水 / 甲辰</span><h4><span>山水，</span><span>也属于</span><span>今天。</span></h4><i>今</i></div>
      <figure className="shanshui-preview-hall"><PreviewImage page={page} /><figcaption>HALL / VOID</figcaption></figure>
      <figure className="shanshui-preview-court"><PreviewImage page={page} index={2} /></figure>
      <p>夯土、竹影与水面，让传统材料进入今天的建筑空间。</p>
    </div>
  );
}

function MotionLabPreview() {
  const rootRef = useRef(null);

  useGSAP(() => {
    const root = rootRef.current;
    const path = root?.querySelector(".motion-preview-path");
    const marker = root?.querySelector(".motion-preview-marker");
    if (!root || !path || !marker) return undefined;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(marker, { autoAlpha: 0 });

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });
      timeline
        .from(".motion-preview-task", {
          y: index => index % 2 ? -22 : 24,
          rotation: index => index % 2 ? 5 : -5,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.42
        }, "tasks")
        .to(".motion-preview-task-a", { x: 118, y: 48, rotation: 3, duration: 0.74 }, "tasks+=0.36")
        .to(".motion-preview-task-c", { x: -102, y: -38, rotation: -2, duration: 0.74 }, "tasks+=0.36")
        .to(path, { strokeDashoffset: 0, duration: 1.06, ease: "power2.inOut" }, "path")
        .set(marker, {
          autoAlpha: 1,
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0 }
        }, "path")
        .to(marker, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 },
          duration: 1.06,
          ease: "power2.inOut"
        }, "path")
        .from(".motion-preview-cell", {
          x: index => [54, -36, 42, -48, 28, -34][index],
          y: index => [-50, 46, -36, 42, 38, -44][index],
          rotation: index => [-8, 7, 5, -6, 8, -4][index],
          scale: 0.54,
          autoAlpha: 0,
          stagger: 0.055,
          duration: 0.52
        }, "path+=0.55")
        .to(".motion-preview-terminal", {
          attr: { r: 13 },
          duration: 0.16,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut"
        }, "path+=0.92");

      const play = () => timeline.play(0);
      if (!("IntersectionObserver" in window)) {
        play();
        return undefined;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      }, { threshold: 0.28 });
      observer.observe(root);
      return () => observer.disconnect();
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(marker, {
        autoAlpha: 1,
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 1, end: 1 }
      });
    });

    return () => media.revert();
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="preview-motion-lab" aria-hidden="true">
      <span className="motion-preview-kicker">UI DONE / GSAP MOTION LAB</span>
      <strong className="motion-preview-title"><span>MAKE CHANGE</span><em>LEGIBLE.</em></strong>

      <div className="motion-preview-tasks">
        <i className="motion-preview-task motion-preview-task-a"><b>01</b><span>CONTRAST</span></i>
        <i className="motion-preview-task motion-preview-task-b"><b>02</b><span>TYPE</span></i>
        <i className="motion-preview-task motion-preview-task-c"><b>03</b><span>MOBILE</span></i>
        <i className="motion-preview-task motion-preview-task-d"><b>04</b><span>MOTION</span></i>
      </div>

      <svg className="motion-preview-route" viewBox="0 0 1000 390" preserveAspectRatio="none">
        <path className="motion-preview-guide" d="M 62 296 C 208 64 430 330 604 142 S 846 54 938 112" />
        <path className="motion-preview-path" d="M 62 296 C 208 64 430 330 604 142 S 846 54 938 112" />
        <circle className="motion-preview-terminal" cx="938" cy="112" r="9" />
        <circle className="motion-preview-marker" cx="0" cy="0" r="7" />
      </svg>

      <div className="motion-preview-assembly">
        {Array.from({ length: 6 }, (_, index) => <i key={index} className="motion-preview-cell" />)}
        <span>COMPLETE</span>
      </div>

      <div className="motion-preview-legend"><span>FLIP / REORDER</span><span>SCROLL / ASSEMBLE</span><span>PATH / EASE</span></div>
    </div>
  );
}

function TheatrePreview({ page }) {
  return <img className="theatre-preview-image" src={page.images[0].src} alt={page.images[0].alt} loading="lazy" width="878" height="439" />;
}

const previewOwners = {
  "velocity-works": VelocityPreview,
  "orbital-grid": OrbitalPreview,
  "corner-goods": CornerPreview,
  "still-day": StillPreview,
  "atelier-noir": AtelierPreview,
  "grid-01": GridPreview,
  "north-tide": NorthPreview,
  "red-form": RedPreview,
  "neon-rift": NeonPreview,
  "shanshui-now": ShanshuiPreview,
  "motion-lab": MotionLabPreview,
  "theatre-seats": TheatrePreview
};

function GalleryWork({ page }) {
  const Preview = previewOwners[page.id];
  const style = {
    "--work-bg": page.theme.bg,
    "--work-surface": page.theme.surface,
    "--work-surface-alt": page.theme.surfaceAlt,
    "--work-ink": page.theme.ink,
    "--work-muted": page.theme.muted,
    "--work-accent": page.theme.accent,
    "--work-accent-2": page.theme.accent2,
    "--work-line": page.theme.line,
    "--work-display": `"${page.theme.display}"`,
    "--work-cjk": `"${page.theme.displayCjk || page.theme.cjk}"`,
    "--work-body": `"${page.theme.body}"`,
    "--work-mono": `"${page.theme.mono}"`
  };

  return (
    <Card id={`work-${page.id}`} className={`showcase-work showcase-work-${page.id}`} bordered={false} data-gallery-work={page.id} data-scroll-reveal style={style}>
      <a href={`../${page.id}/`} aria-label={`打开 ${page.shortTitle}，查看${page.product.type}页面`}>
        <div className={`work-preview work-preview-${page.id}`}><Preview page={page} /></div>
        <div className="work-meta" data-gallery-meta>
          <div><h3>{page.shortTitle}</h3><span>{page.product.type}</span></div>
          <p>{page.product.role}可以{page.product.galleryAction}。</p>
          <b>{page.product.mode === "work" ? "查看工作页面" : page.product.mode === "lab" ? "进入动效试验" : "查看完整页面"} <ArrowRightOutlined /></b>
        </div>
      </a>
    </Card>
  );
}

export function GalleryModules() {
  const [mode, setMode] = useState("all");
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis || !window.location.hash.startsWith("#work-")) return;
    const id = window.location.hash.slice(1);
    let active = true;
    document.fonts.ready.then(() => {
      const target = document.getElementById(id);
      if (active && target) lenis.scrollTo(target, { immediate: true, offset: -84 });
    });
    return () => { active = false; };
  }, [lenis]);
  const orderedPages = useMemo(() => [
    ...galleryPages.filter(page => page.product.mode === "work"),
    ...galleryPages.filter(page => page.product.mode === "expressive"),
    ...galleryPages.filter(page => page.product.mode === "lab")
  ], []);
  const visiblePages = orderedPages.filter(page => mode === "all" || page.product.mode === mode);
  const count = value => galleryPages.filter(page => value === "all" || page.product.mode === value).length;

  return (
    <>
      <section id="works" className="content-section works-section">
        <SectionIntro
          index="01"
          eyebrow="PRODUCT FIRST / VISUAL SECOND"
          title="先确定页面要解决的问题，再选择合适的视觉风格。"
          copy="七个工作型示例可以体验训练分析、轨道监控、门店补货、日程安排、创意审批、项目协作和剧场选座。另外还有四个内容与视觉体验页面，以及一个可以操作任务重排、滚动组装和路径缓动的试验台。每个页面都围绕自己的用途组织内容。"
        />
        <div className="gallery-filter" data-scroll-reveal>
          <Segmented
            aria-label="按产品类型筛选作品"
            value={mode}
            onChange={setMode}
            options={[
              { label: `全部 ${count("all")}`, value: "all" },
              { label: `工作型 ${count("work")}`, value: "work" },
              { label: `表达型 ${count("expressive")}`, value: "expressive" },
              { label: `动效实验 ${count("lab")}`, value: "lab" }
            ]}
          />
          <span>当前显示 {visiblePages.length} 个页面</span>
        </div>
        <div className="works-grid">
          {visiblePages.map(page => <GalleryWork key={page.id} page={page} />)}
        </div>
      </section>

      <section className="content-section beginner-section">
        <SectionIntro
          index="02"
          eyebrow="BRIEF IN / FULL SYSTEM OUT"
          title="你不需要提前指定卡片、图表和动效。"
          copy="你不用提前决定每张卡片怎么排、图表放在哪里，或者使用哪一种动效。先告诉 Agent 这个页面给谁用、要完成什么任务、希望呈现什么感觉。UI Done 会据此安排产品结构、开源字体、组件、动效、滚动方式、Canvas、真实数据图表和视觉素材；3D 只有通过适配判断后才会使用。"
        />
        <div className="beginner-grid" data-scroll-reveal>
          <blockquote>“请做一个面向年轻观众的文化展览页。页面要有高级感，电脑和手机上都要好看。”</blockquote>
          <div className="brief-arrow"><ArrowRightOutlined /></div>
          <div className="expansion-list">
            {capabilities.map(item => <Tag key={item.short} icon={<CheckOutlined />}>{item.short} / {item.owner}</Tag>)}
          </div>
        </div>
      </section>

      <section className="content-section type-manifesto" data-scroll-reveal>
        <div><FontSizeOutlined /><span>TYPE IS A DESIGN DECISION</span></div>
        <h2>每次设计页面时，UI Done 都会选择一套适合它的开源字体。</h2>
        <p>它会分别检查中文、英文、数字、代码和符号的显示效果。只有字体资源加载失败时，页面才会使用系统字体作为备用。</p>
      </section>
    </>
  );
}

export function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-label="本展厅实际采用的八类前端能力">
      {capabilities.map((item, index) => (
        <div key={item.short} data-scroll-reveal>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.short}</strong>
          <small>{item.owner}</small>
        </div>
      ))}
    </section>
  );
}
