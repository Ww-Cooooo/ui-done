import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button, Card, Statistic, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  GithubOutlined,
  LoadingOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import ExperienceFrame from "./ExperienceFrame";
import VisualStage from "./VisualStage";
import { capabilities, getPageConfig, showcasePages, viewports } from "./data";
import { CapabilityStrip, GalleryModules, PageModule } from "./PageModules";
import { useReducedMotion } from "./useReducedMotion";

const DataChart = lazy(() => import("./DataChart"));
const repositoryUrl = "https://github.com/Ww-Cooooo/ui-done";

function Hero({ page }) {
  const isGallery = page.id === "gallery";
  return (
    <section className="hero">
      <div className="hero-copy">
        <Tag data-hero-reveal bordered={false} icon={<ThunderboltOutlined />}>{page.eyebrow}</Tag>
        <p data-hero-reveal className="hero-audience">{page.audience}</p>
        <h1 data-hero-reveal>{page.title}</h1>
        <p data-hero-reveal className="hero-intro">{page.intro}</p>
        <div data-hero-reveal className="hero-actions">
          <Button type="primary" size="large" href={isGallery ? "#works" : "#lab"} icon={isGallery ? <ArrowDownOutlined /> : <ArrowRightOutlined />}>
            {isGallery ? "查看六个新作品" : "进入这个页面"}
          </Button>
          <Button
            size="large"
            href={isGallery ? repositoryUrl : "../gallery/"}
            target={isGallery ? "_blank" : undefined}
            rel={isGallery ? "noreferrer" : undefined}
            icon={isGallery ? <GithubOutlined /> : <ArrowLeftOutlined />}
          >
            {isGallery ? "查看开源仓库" : "返回总展厅"}
          </Button>
        </div>
      </div>
      <div data-hero-reveal className="hero-visual"><VisualStage page={page} /></div>
    </section>
  );
}

function ProofRail({ page }) {
  const isGallery = page.id === "gallery";
  const facts = isGallery ? [
    { value: capabilities.length, suffix: " 类", title: "默认能力覆盖" },
    { value: showcasePages.length, suffix: " 个", title: "全新视觉方向" },
    { value: viewports.length, suffix: " 端", title: "默认浏览器验收" }
  ] : [
    { value: capabilities.length, suffix: " / 8", title: "能力真实接入" },
    { value: 1, suffix: " 套", title: "统一视觉系统" },
    { value: 0, suffix: " 份", title: "虚构业务数据" }
  ];

  return (
    <section className="proof-rail" aria-label="页面事实">
      {facts.map(fact => (
        <Card key={fact.title} bordered={false} data-scroll-reveal>
          <Statistic value={fact.value} suffix={fact.suffix} />
          <p>{fact.title}</p>
        </Card>
      ))}
      <div className="proof-rail-note" data-scroll-reveal>
        <span>SIGNATURE</span>
        <strong>{page.signature}</strong>
      </div>
    </section>
  );
}

function ChartFallback() {
  return (
    <section className="chart-panel chart-loading" aria-label="图表正在加载">
      <LoadingOutlined spin />
      <span>正在加载真实数据图形层…</span>
    </section>
  );
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
    }, { rootMargin: "500px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="chart-wrap">
      {ready ? (
        <Suspense fallback={<ChartFallback />}><DataChart page={page} reduced={reduced} /></Suspense>
      ) : <ChartFallback />}
    </div>
  );
}

function FinalCall({ page }) {
  const isGallery = page.id === "gallery";
  return (
    <section className="final-call" data-scroll-reveal>
      <p>{isGallery ? "YOU BRING THE INTENT" : `${page.number} / ${page.shortTitle}`}</p>
      <h2>{isGallery ? "剩下的前端判断，让 UI Done 主动补齐。" : "同一套规则，还能做出完全不同的下一页。"}</h2>
      <div>
        <Button type="primary" size="large" href={isGallery ? repositoryUrl : "../gallery/"} icon={<ArrowRightOutlined />}>
          {isGallery ? "在 GitHub 获取 UI Done" : "继续看其他作品"}
        </Button>
      </div>
    </section>
  );
}

function Footer({ page }) {
  return (
    <footer className="site-footer">
      <div><span>UI DONE</span><small>React-first frontend Skill</small></div>
      <p>React · Ant Design · Anime.js · Lenis · R3F · Pts · AntV G2</p>
      <a href={page.id === "gallery" ? repositoryUrl : "../gallery/"}>
        {page.id === "gallery" ? "OPEN SOURCE" : "ALL WORKS"} <ArrowRightOutlined />
      </a>
    </footer>
  );
}

export default function App({ pageId }) {
  const page = getPageConfig(pageId);
  const isGallery = page.id === "gallery";
  const reduced = useReducedMotion();
  const [sourceFilter, setSourceFilter] = useState("全部");
  const [motionStep, setMotionStep] = useState(0);
  return (
    <ExperienceFrame page={page} reduced={reduced}>
      <main>
        <Hero page={page} />
        <ProofRail page={page} />
        {isGallery ? <GalleryModules /> : (
          <PageModule
            page={page}
            sourceFilter={sourceFilter}
            onSourceFilterChange={setSourceFilter}
            motionStep={motionStep}
            onMotionStepChange={setMotionStep}
          />
        )}
        <CapabilityStrip />
        <ChartGate page={page} reduced={reduced} />
        <FinalCall page={page} />
      </main>
      <Footer page={page} />
    </ExperienceFrame>
  );
}
