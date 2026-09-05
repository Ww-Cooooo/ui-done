import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  GithubOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import ExperienceFrame from "./ExperienceFrame";
import VisualStage from "./VisualStage";
import ProjectExperience from "./ProjectExperiences";
import { getPageConfig, showcasePages } from "./data";
import { CapabilityStrip, GalleryModules } from "./PageModules";
import { useReducedMotion } from "./useReducedMotion";

const DataChart = lazy(() => import("./DataChart"));
const repositoryUrl = "https://github.com/Ww-Cooooo/ui-done";

function GalleryHero() {
  const workPages = showcasePages.filter(page => page.product.mode === "work");
  return (
    <section className="gallery-hero">
      <div className="gallery-hero-copy">
        <Tag data-hero-reveal bordered={false}>UI DONE / OPEN-SOURCE FRONTEND SKILL</Tag>
        <p data-hero-reveal className="hero-overline">REAL WORK · DISTINCT VISUAL WORLDS</p>
        <h1 data-hero-reveal>
          <span className="type-line"><span className="type-lock">你只要说清需求。</span></span>
          <span className="type-line"><em className="type-lock">页面交给 UI Done。</em></span>
        </h1>
        <p data-hero-reveal className="hero-lead">你只需要告诉 Agent，这个页面给谁用、要解决什么问题，以及你希望它给人什么感觉。UI Done 会主动选择组件、开源字体、动效、滚动方式、Canvas、数据图表和合适的视觉素材；只有真正适合页面时，才会加入 3D。</p>
        <div data-hero-reveal className="hero-actions">
          <Button type="primary" size="large" href="#works" icon={<ArrowDownOutlined />}>直接看 10 个示例</Button>
          <Button size="large" href={repositoryUrl} target="_blank" rel="noreferrer" icon={<GithubOutlined />}>在 GitHub 获取 Skill</Button>
        </div>
      </div>
      <div className="gallery-dispatch" data-hero-reveal>
        <div className="gallery-task-board" aria-label="六种工作型产品入口">
          <div className="task-board-head"><span>WORK PAGES / 06</span><b>先选你要完成的工作，再看页面怎么设计。</b></div>
          <div className="task-board-list">
            {workPages.map(page => (
              <a key={page.id} className={`task-board-row task-${page.layout}`} href={`../${page.id}/`}>
                <span>{page.number}</span>
                <img src={page.images[0].src} alt="" />
                <div><small>{page.product.type}</small><strong>{page.product.role}可以{page.product.galleryAction}</strong></div>
                <Tag bordered={false}>{page.shortTitle}</Tag>
                <ArrowRightOutlined />
              </a>
            ))}
          </div>
          <div className="task-board-foot">
            <span>另外还有 4 个表达型页面</span><span>自然专题、艺术展览、娱乐入口和文化长卷</span>
          </div>
        </div>
        <div className="gallery-task-pulse" aria-hidden="true">
          <VisualStage page={getPageConfig("gallery")} compact />
        </div>
      </div>
      <div className="gallery-hero-foot" data-hero-reveal>
        <span>REACT</span><span>ANT DESIGN</span><span>ANTV</span><span>REAL WORKFLOWS</span><span>SELECTIVE 3D + CANVAS</span><span>OPEN-SOURCE TYPE</span>
      </div>
    </section>
  );
}

function ChartFallback() {
  return <section className="chart-panel chart-loading"><LoadingOutlined spin /><span>正在加载页面能力矩阵…</span></section>;
}

function ChartGate({ page, reduced }) {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setReady(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "420px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={hostRef} className="chart-wrap">{ready ? <Suspense fallback={<ChartFallback />}><DataChart page={page} reduced={reduced} /></Suspense> : <ChartFallback />}</div>;
}

function FinalCall({ page }) {
  const isGallery = page.id === "gallery";
  const currentIndex = showcasePages.findIndex(item => item.id === page.id);
  const nextPage = showcasePages[(currentIndex + 1) % showcasePages.length];
  const href = isGallery ? repositoryUrl : `../${nextPage.id}/`;
  return (
    <section className="final-call" data-scroll-reveal>
      <p>{isGallery ? "YOUR TASK / UI DONE EXPANDS" : `${page.number} / ${page.shortTitle}`}</p>
      <h2>{isGallery ? "你不懂前端或设计，也能把需求说明白。" : `下一种世界：${nextPage.styleName}`}</h2>
      <span>{isGallery ? "你只要告诉 Agent 页面给谁用、要解决什么问题。UI Done 会补全产品结构和视觉方案，并根据你的反馈继续调整。" : "同一套完整前端能力，不复制上一页的视觉答案。"}</span>
      <Button type="primary" size="large" href={href} target={isGallery ? "_blank" : undefined} rel={isGallery ? "noreferrer" : undefined} icon={<ArrowRightOutlined />}>
        {isGallery ? "在 GitHub 获取 UI Done" : `打开 ${nextPage.shortTitle}`}
      </Button>
    </section>
  );
}

function Footer({ page }) {
  return (
    <footer className="site-footer">
      <div><span>UI DONE</span><small>React-first open-source frontend Skill</small></div>
      <p>Images generated for this showcase · Fonts self-hosted under OFL-1.1</p>
      <a href={page.id === "gallery" ? repositoryUrl : "../gallery/"}>{page.id === "gallery" ? "SOURCE" : "ALL WORKS"} <ArrowRightOutlined /></a>
    </footer>
  );
}

export default function App({ pageId }) {
  const page = getPageConfig(pageId);
  const reduced = useReducedMotion();
  const isGallery = page.id === "gallery";

  return (
    <ExperienceFrame page={page} reduced={reduced}>
      <main>
        {isGallery ? (
          <>
            <GalleryHero />
            <GalleryModules />
            <CapabilityStrip />
            <ChartGate page={page} reduced={reduced} />
            <FinalCall page={page} />
          </>
        ) : <ProjectExperience page={page} />}
      </main>
      {isGallery && <Footer page={page} />}
    </ExperienceFrame>
  );
}
