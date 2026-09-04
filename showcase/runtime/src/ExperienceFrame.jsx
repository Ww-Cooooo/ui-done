import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ConfigProvider, Button, Drawer, Tag } from "antd";
import { ArrowLeftOutlined, GithubOutlined, MenuOutlined } from "@ant-design/icons";
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
      lenis.scrollTo(target, { offset: -84 });
    };
    const restoreLocation = () => {
      window.requestAnimationFrame(() => {
        lenis.scrollTo(window.location.hash || 0, {
          immediate: true,
          offset: window.location.hash ? -84 : 0
        });
      });
    };
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

function MotionDirector({ rootRef, reduced }) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;

    const heroItems = root.querySelectorAll("[data-hero-reveal]");
    const timeline = createTimeline({
      defaults: { duration: 760, ease: "out(3)" }
    });

    if (heroItems.length) {
      timeline.add(heroItems, {
        opacity: [0, 1],
        y: [28, 0],
        delay: stagger(90)
      });
    }

    const observers = [...root.querySelectorAll("[data-scroll-reveal]")].map(node =>
      onScroll({
        target: node,
        repeat: false,
        onEnter: () => {
          animate(node, {
            opacity: [0.55, 1],
            y: [22, 0],
            duration: 620,
            ease: "out(3)"
          });
        }
      })
    );

    return () => {
      timeline.revert();
      observers.forEach(observer => observer.revert());
    };
  }, [reduced, rootRef]);

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

function Header({ page, onMenu }) {
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
        <small>{isGallery ? "TEN DIRECTIONS" : page.styleName}</small>
      </div>

      <nav className="desktop-nav" aria-label="主要导航">
        {!isGallery && (
          <Button type="text" icon={<ArrowLeftOutlined />} href="../gallery/">
            全部作品
          </Button>
        )}
        <Button type="text" href={isGallery ? "#works" : "#story"}>{isGallery ? "十种风格" : "页面旅程"}</Button>
        <Button type="text" icon={<GithubOutlined />} href={repositoryUrl} target="_blank" rel="noreferrer">
          GitHub
        </Button>
      </nav>

      <Button
        className="mobile-menu"
        type="text"
        icon={<MenuOutlined />}
        aria-label="打开页面导航"
        onClick={onMenu}
      />
    </header>
  );
}

function MobileSheet({ page, open, onClose }) {
  return (
    <Drawer
      rootClassName="mobile-nav-drawer"
      title={<Tag bordered={false}>{page.number} / {page.shortTitle}</Tag>}
      placement="right"
      width={330}
      open={open}
      onClose={onClose}
      styles={{
        content: { color: page.theme.ink, background: page.theme.surface },
        header: { borderColor: page.theme.line, background: page.theme.surface },
        body: { background: page.theme.surface }
      }}
    >
      <nav className="mobile-nav-links" aria-label="移动端导航">
        {page.id !== "gallery" && <Button type="text" block icon={<ArrowLeftOutlined />} href="../gallery/">全部作品</Button>}
        <Button type="text" block href={page.id === "gallery" ? "#works" : "#story"}>{page.id === "gallery" ? "十种风格" : "页面旅程"}</Button>
        <Button type="text" block icon={<GithubOutlined />} href={repositoryUrl} target="_blank" rel="noreferrer">GitHub 仓库</Button>
        <Button block onClick={onClose}>关闭</Button>
      </nav>
    </Drawer>
  );
}

function ThemedContent({ page, children, reduced }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const style = useMemo(() => ({
    "--page-bg": page.theme.bg,
    "--page-surface": page.theme.surface,
    "--page-surface-alt": page.theme.surfaceAlt,
    "--page-ink": page.theme.ink,
    "--page-muted": page.theme.muted,
    "--page-accent": page.theme.accent,
    "--page-accent-2": page.theme.accent2,
    "--page-line": page.theme.line,
    "--font-display-latin": `"${page.theme.display}"`,
    "--font-display-cjk": `"${page.theme.displayCjk || page.theme.cjk}"`,
    "--font-body-latin": `"${page.theme.body}"`,
    "--font-cjk": `"${page.theme.cjk}"`,
    "--font-mono": `"${page.theme.mono}"`
  }), [page]);

  return (
    <div ref={rootRef} className={`app page-${page.id} tone-${page.theme.mode}`} style={style}>
      <MotionDirector rootRef={rootRef} reduced={reduced} />
      <div className="scroll-progress" aria-hidden="true" />
      <Header page={page} onMenu={() => setMenuOpen(true)} />
      <MobileSheet page={page} open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
    </div>
  );
}

export default function ExperienceFrame({ page, children, reduced }) {
  const radii = { brutal: 0, command: 2, swiss: 0, soft: 24, retro: 8, luxury: 0, editorial: 2, velocity: 3, cyber: 2 };
  const tokens = useMemo(() => ({
    colorPrimary: page.theme.accent,
    colorInfo: page.theme.accent2,
    colorText: page.theme.ink,
    colorTextSecondary: page.theme.muted,
    colorBgContainer: page.theme.surface,
    colorBorder: page.theme.line,
    borderRadius: radii[page.layout] ?? 10,
    fontFamily: `"${page.theme.body}", "${page.theme.cjk}", sans-serif`,
    controlHeight: 42,
    motion: !reduced
  }), [page, reduced]);

  const content = (
    <ThemedContent page={page} reduced={reduced}>
      {children}
    </ThemedContent>
  );

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
            prevent: node => Boolean(node.closest?.(".ant-drawer, .ant-modal, .ant-table-body"))
          }}
        >
          <ScrollSignal />
          {content}
        </ReactLenis>
      )}
    </ConfigProvider>
  );
}
