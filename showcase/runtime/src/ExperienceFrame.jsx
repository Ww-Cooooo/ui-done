import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Button, ConfigProvider } from "antd";
import {
  ArrowLeftOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { ReactLenis, useLenis } from "lenis/react";
import { animate, createTimeline, onScroll, stagger } from "animejs";

const repositoryUrl = "https://github.com/Ww-Cooooo/ui-done";

function ScrollSignal() {
  const lenis = useLenis(instance => {
    document.documentElement.style.setProperty("--scroll-progress", String(instance.progress || 0));
  });

  useEffect(() => {
    if (!lenis) return undefined;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const followAnchor = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;
      const targetUrl = new URL(anchor.href, window.location.href);
      if (targetUrl.origin !== window.location.origin || targetUrl.pathname !== window.location.pathname || !targetUrl.hash) return;
      const target = document.getElementById(decodeURIComponent(targetUrl.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      window.history.pushState(null, "", targetUrl.hash);
      lenis.scrollTo(target, { offset: -72 });
    };
    const restoreLocation = () => window.requestAnimationFrame(() => {
      lenis.scrollTo(window.location.hash || 0, {
        immediate: true,
        offset: window.location.hash ? -72 : 0
      });
    });
    window.addEventListener("click", followAnchor);
    window.addEventListener("popstate", restoreLocation);
    return () => {
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener("click", followAnchor);
      window.removeEventListener("popstate", restoreLocation);
      document.documentElement.style.removeProperty("--scroll-progress");
    };
  }, [lenis]);

  return null;
}

function GalleryMotion({ rootRef, reduced, enabled }) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || !enabled) return undefined;
    const timeline = createTimeline({ defaults: { duration: 720, ease: "out(3)" } });
    const heroItems = root.querySelectorAll("[data-hero-reveal]");
    if (heroItems.length) {
      timeline.add(heroItems, {
        opacity: [0, 1],
        y: [24, 0],
        delay: stagger(70)
      });
    }
    const observers = [...root.querySelectorAll("[data-scroll-reveal]")].map(node => onScroll({
      target: node,
      repeat: false,
      onEnter: () => animate(node, {
        opacity: [0.62, 1],
        y: [18, 0],
        duration: 560,
        ease: "out(3)"
      })
    }));
    return () => {
      timeline.revert();
      observers.forEach(observer => observer.revert());
    };
  }, [enabled, reduced, rootRef]);

  return null;
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Header({ page }) {
  const isGallery = page.id === "gallery";
  return (
    <header className="site-header">
      <a className="site-brand" href={isGallery ? "./" : "../gallery/"} aria-label="UI Done 展厅首页">
        <BrandMark />
        <span>UI DONE</span>
      </a>

      <div className="header-center" aria-label="当前作品">
        <span>{page.number}</span>
        <strong>{page.shortTitle}</strong>
        <small>{isGallery ? "PRODUCT × VISUAL" : page.product?.type || page.styleName}</small>
      </div>

      <nav className="desktop-nav" aria-label="主要导航">
        {!isGallery && <Button type="text" icon={<ArrowLeftOutlined />} href="../gallery/">全部作品</Button>}
        {isGallery && <Button type="text" href="#works">产品与风格</Button>}
        <Button type="text" icon={<GithubOutlined />} href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</Button>
      </nav>

      <nav className="mobile-quick-nav" aria-label="移动端快速导航">
        {!isGallery && <Button type="text" shape="circle" icon={<ArrowLeftOutlined />} href="../gallery/" aria-label="返回全部作品" />}
        <Button type="text" shape="circle" icon={<GithubOutlined />} href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="打开 GitHub 仓库" />
      </nav>
    </header>
  );
}

function ThemedContent({ page, children, reduced }) {
  const rootRef = useRef(null);
  const style = useMemo(() => ({
    "--page-bg": page.theme.bg,
    "--page-surface": page.theme.surface,
    "--page-surface-alt": page.theme.surfaceAlt,
    "--page-ink": page.theme.ink,
    "--page-muted": page.theme.muted,
    "--page-accent": page.theme.accent,
    "--page-accent-2": page.theme.accent2,
    "--page-on-accent": page.theme.onAccent,
    "--page-line": page.theme.line,
    "--font-display-latin": `"${page.theme.display}"`,
    "--font-display-cjk": `"${page.theme.displayCjk || page.theme.cjk}"`,
    "--font-body-latin": `"${page.theme.body}"`,
    "--font-cjk": `"${page.theme.cjk}"`,
    "--font-mono": `"${page.theme.mono}"`
  }), [page]);

  return (
    <div ref={rootRef} className={`app page-${page.id} tone-${page.theme.mode} product-${page.product?.mode || "expressive"}`} style={style}>
      <GalleryMotion rootRef={rootRef} reduced={reduced} enabled={page.id === "gallery"} />
      <div className="scroll-progress" aria-hidden="true" />
      <Header page={page} />
      {children}
    </div>
  );
}

export default function ExperienceFrame({ page, children, reduced }) {
  const radii = { brutal: 0, command: 2, swiss: 0, soft: 24, retro: 8, luxury: 0, editorial: 2, velocity: 3, cyber: 2 };
  const tokens = useMemo(() => ({
    colorPrimary: page.theme.accent,
    colorTextLightSolid: page.theme.onAccent,
    ...(page.theme.accentHover ? { colorPrimaryHover: page.theme.accentHover } : {}),
    ...(page.theme.accentActive ? { colorPrimaryActive: page.theme.accentActive } : {}),
    colorInfo: page.theme.accent2,
    colorText: page.theme.ink,
    colorTextSecondary: page.theme.muted,
    colorBgContainer: page.theme.surface,
    colorBgElevated: page.theme.surface,
    colorBorder: page.theme.line,
    colorBorderSecondary: page.theme.line,
    borderRadius: radii[page.layout] ?? 10,
    fontFamily: `"${page.theme.body}", "${page.theme.cjk}", sans-serif`,
    controlHeight: 42,
    motion: !reduced
  }), [page, reduced]);

  const content = <ThemedContent page={page} reduced={reduced}>{children}</ThemedContent>;

  return (
    <ConfigProvider theme={{ token: tokens }}>
      {reduced ? content : (
        <ReactLenis
          root
          options={{
            autoRaf: true,
            lerp: 0.085,
            smoothWheel: true,
            syncTouch: false,
            prevent: node => Boolean(node.closest?.("[data-lenis-prevent], [data-native-scroll], .ant-table-body, .ant-picker-panel"))
          }}
        >
          <ScrollSignal />
          {content}
        </ReactLenis>
      )}
    </ConfigProvider>
  );
}
