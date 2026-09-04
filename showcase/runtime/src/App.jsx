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
  const heroPages = showcasePages.slice(0, 6);
  return (
    <section className="gallery-hero">
      <div className="gallery-hero-copy">
        <Tag data-hero-reveal bordered={false}>UI DONE / OPEN-SOURCE FRONTEND SKILL</Tag>
        <p data-hero-reveal className="hero-overline">TEN VISUAL DIRECTIONS · ONE ACTIVE SYSTEM</p>
        <h1 data-hero-reveal>不是换色。<br /><em>是换一个世界。</em></h1>
        <p data-hero-reveal className="hero-lead">同一句“做帅一点”，UI Done 会主动补齐图片、字体、组件、动效、滚动、3D、Canvas 与真实图表，再根据你的要求继续细调。</p>
        <div data-hero-reveal className="hero-actions">
          <Button type="primary" size="large" href="#works" icon={<ArrowDownOutlined />}>看十种风格</Button>
          <Button size="large" href={repositoryUrl} target="_blank" rel="noreferrer" icon={<GithubOutlined />}>获取 Skill</Button>
        </div>
      </div>
      <div className="gallery-collage" data-hero-reveal aria-label="十种视觉方向预览">
        {heroPages.map((page, index) => (
          <a key={page.id} className={`collage-tile tile-${index + 1}`} href={`../${page.id}/`}>
            <img src={page.images[0].src} alt={page.images[0].alt} />
            <span>{page.number} / {page.shortTitle}</span>
          </a>
        ))}
        <div className="gallery-spatial"><VisualStage page={getPageConfig("gallery")} compact /></div>
      </div>
      <div className="gallery-hero-foot" data-hero-reveal>
        <span>REACT</span><span>ANT DESIGN</span><span>ANTV</span><span>3D + CANVAS</span><span>OPEN-SOURCE TYPE</span>
      </div>
    </section>
  );
}

function ChartFallback() {
  return <section className="chart-panel chart-loading"><LoadingOutlined spin /><span>正在加载真实图像数据…</span></section>;
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
      <p>{isGallery ? "YOUR BRIEF / UI DONE EXPANDS" : `${page.number} / ${page.shortTitle}`}</p>
      <h2>{isGallery ? "你不用先学会描述每一个设计细节。" : `下一种世界：${nextPage.styleName}`}</h2>
      <span>{isGallery ? "先说清楚页面给谁用、要完成什么，其余选择让 Skill 主动展开。" : "同一套完整前端能力，不复制上一页的视觉答案。"}</span>
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
      <Footer page={page} />
    </ExperienceFrame>
  );
}
