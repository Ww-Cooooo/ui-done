import { Button, Card, Tag } from "antd";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CompassOutlined,
  ExperimentOutlined,
  FireOutlined,
  GlobalOutlined,
  MoonOutlined,
  RadarChartOutlined,
  ShopOutlined,
  SkinOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import VisualStage from "./VisualStage";
import { showcasePages } from "./data";

function ConceptFlag({ page, children }) {
  return <Tag bordered={false}>{children || `${page.styleName} · UI DONE CONCEPT`}</Tag>;
}

function Image({ image, className = "", eager = false }) {
  return <img className={className} src={image.src} alt={image.alt} loading={eager ? "eager" : "lazy"} />;
}

function HeroLinks({ href = "#story", label = "继续阅读" }) {
  return (
    <div className="project-actions" data-hero-reveal>
      <Button type="primary" size="large" href={href} icon={<ArrowDownOutlined />}>{label}</Button>
      <Button size="large" href="../gallery/" icon={<ArrowLeftOutlined />}>返回展厅</Button>
    </div>
  );
}

function TypefaceNote({ page }) {
  return <p className="typeface-note"><span>OPEN-SOURCE TYPE</span>{page.fontStatement}</p>;
}

function Scene({ page, className = "", compact = false }) {
  return (
    <div className={`project-scene ${className}`}>
      <VisualStage page={page} compact={compact} />
    </div>
  );
}

function NextWork({ page }) {
  const index = showcasePages.findIndex(item => item.id === page.id);
  const next = showcasePages[(index + 1) % showcasePages.length];
  return (
    <nav className="next-work" aria-label="下一个展示页面" data-scroll-reveal>
      <span>NEXT WORLD</span>
      <a href={`../${next.id}/`}>
        <strong>{next.shortTitle}</strong>
        <small>{next.styleName}</small>
        <ArrowRightOutlined />
      </a>
    </nav>
  );
}

function VelocityWorks({ page }) {
  return (
    <>
      <section className="velocity-cover">
        <Image image={page.images[0]} eager />
        <div className="velocity-shade" />
        <div className="velocity-copy">
          <ConceptFlag page={page}>NIGHT TRAINING / CONCEPT</ConceptFlag>
          <p data-hero-reveal>RAIN ON CONCRETE · BREATH IN COLD AIR</p>
          <h1 data-hero-reveal>快，不是一句口号。</h1>
          <h2 data-hero-reveal>{page.latinTitle}</h2>
          <HeroLinks label="进入夜训" />
        </div>
        <Scene page={page} className="velocity-scene" />
        <div className="velocity-rail" aria-hidden="true"><span>WET TRACK</span><span>FORWARD ONLY</span><span>NO FINISH LINE</span></div>
      </section>

      <section id="story" className="velocity-material">
        <div className="velocity-material-copy" data-scroll-reveal>
          <ThunderboltOutlined />
          <p>THE SECOND BEFORE IMPACT</p>
          <h2>速度先经过材料，<br />再抵达身体。</h2>
          <span>水珠、织物与抓地结构被拉到近处。页面不展示虚构成绩，只让真实画面承担速度感。</span>
          <TypefaceNote page={page} />
        </div>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>MATERIAL / WET UPPER</figcaption></figure>
      </section>

      <section className="velocity-finish">
        <Image image={page.images[2]} />
        <div data-scroll-reveal>
          <p>TRAIN ALONE / MOVE TOGETHER</p>
          <blockquote>{page.quote}</blockquote>
          <div className="velocity-principles">{page.details.map(([code, copy]) => <span key={code}><b>{code}</b>{copy}</span>)}</div>
        </div>
      </section>
      <NextWork page={page} />
    </>
  );
}

function NorthTide({ page }) {
  return (
    <>
      <section className="tide-masthead">
        <ConceptFlag page={page}>COASTAL FIELD JOURNAL / CONCEPT</ConceptFlag>
        <p data-hero-reveal>VOL. 02 · NORTH EDGE · WIND NOTES</p>
        <h1 data-hero-reveal>沿着风，<br /><em>走到陆地尽头。</em></h1>
        <p data-hero-reveal className="tide-deck">{page.intro}</p>
        <HeroLinks label="翻开海岸笔记" />
      </section>

      <figure className="tide-opening" data-hero-reveal>
        <Image image={page.images[0]} eager />
        <figcaption><span>THE LAST PATH</span><b>风从海上来，路在雾里消失。</b></figcaption>
      </figure>

      <article id="story" className="tide-article">
        <aside data-scroll-reveal><CompassOutlined /><p>FIELD NOTE</p><span>不把海岸调得更甜，也不替远方编造故事。只记录风、盐、岩层和人走过的尺度。</span></aside>
        <div className="tide-prose" data-scroll-reveal>
          <p className="dropcap">潮水每天重新安排边界。岩石留下盐，衣角记住风，而道路只负责把人送到视线之外。</p>
          <blockquote>{page.quote}</blockquote>
          <TypefaceNote page={page} />
        </div>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>SALT / ROCK / RETURN</figcaption></figure>
      </article>

      <section className="tide-horizon">
        <Scene page={page} className="tide-scene" />
        <div data-scroll-reveal><p>THE SEA KEEPS ITS OWN TIME</p><h2>不用赶路。<br />让地平线慢慢靠近。</h2></div>
      </section>

      <figure className="tide-shelter" data-scroll-reveal><Image image={page.images[2]} /><figcaption><b>SHELTER IN FOG</b><span>白色建筑不是终点，只是风里短暂的停顿。</span></figcaption></figure>
      <NextWork page={page} />
    </>
  );
}

function RedForm({ page }) {
  return (
    <>
      <section className="red-poster">
        <div className="red-poster-copy">
          <ConceptFlag page={page}>TEMPORARY EXHIBITION / CONCEPT</ConceptFlag>
          <p data-hero-reveal>FORM / BODY / RESISTANCE</p>
          <h1 data-hero-reveal>红色不是装饰，<br /><span>是事件。</span></h1>
          <HeroLinks label="进入展场" />
        </div>
        <figure data-hero-reveal><Image image={page.images[2]} eager /><figcaption>BODY BREAKS THE GRID</figcaption></figure>
      </section>

      <section id="story" className="red-manifesto">
        <p data-scroll-reveal>FORM BREAKS THE ROOM.</p>
        <blockquote data-scroll-reveal>{page.quote}</blockquote>
        <TypefaceNote page={page} />
      </section>

      <section className="red-wall">
        <figure data-scroll-reveal><Image image={page.images[0]} /><figcaption>OBJECT / SUSPENDED MASS</figcaption></figure>
        <div className="red-wall-copy" data-scroll-reveal>
          <h2>不要替作品<br />保持礼貌。</h2>
          {page.details.map(([code, copy]) => <p key={code}><b>{code}</b><span>{copy}</span></p>)}
        </div>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>SURFACE / TENSION</figcaption></figure>
      </section>

      <section className="red-sculpture">
        <Scene page={page} className="red-scene" />
        <div data-scroll-reveal><ExperimentOutlined /><span>KINETIC STUDY</span><h2>光线切开金属，<br />运动改变空间。</h2></div>
      </section>
      <NextWork page={page} />
    </>
  );
}

function OrbitalGrid({ page }) {
  return (
    <>
      <section className="orbit-command">
        <Scene page={page} className="orbit-scene" />
        <div className="orbit-copy">
          <ConceptFlag page={page}>ORBITAL SYSTEM / CONCEPT</ConceptFlag>
          <p data-hero-reveal>GROUND ↔ ORBIT / ONE CONTINUOUS VIEW</p>
          <h1 data-hero-reveal>把地面，<br />连接到轨道。</h1>
          <p data-hero-reveal>{page.intro}</p>
          <HeroLinks label="打开任务简报" />
          <TypefaceNote page={page} />
        </div>
        <div className="orbit-crosshair" aria-hidden="true" />
      </section>

      <section id="story" className="orbit-brief">
        <header data-scroll-reveal><RadarChartOutlined /><span>MISSION BRIEF / VISUAL EVIDENCE</span><h2>每一层信息，<br />都有真实对象。</h2></header>
        <div className="orbit-panels">
          {page.images.map((image, index) => (
            <figure key={image.src} className={`orbit-panel orbit-panel-${index + 1}`} data-scroll-reveal>
              <Image image={image} />
              <figcaption><b>{image.label}</b><span>{page.details[index][1]}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="orbit-rule" data-scroll-reveal><span>CLARITY OVER NOISE</span><blockquote>{page.quote}</blockquote></section>
      <NextWork page={page} />
    </>
  );
}

function CornerGoods({ page }) {
  return (
    <>
      <section className="corner-front">
        <Image image={page.images[0]} eager />
        <div className="corner-sign" data-hero-reveal>
          <ConceptFlag page={page}>NEIGHBORHOOD STORE / CONCEPT</ConceptFlag>
          <ShopOutlined />
          <h1>今天的好东西，<br />就在街角。</h1>
          <p>{page.intro}</p>
          <HeroLinks label="看看今天有什么" />
        </div>
      </section>

      <section id="story" className="corner-counter">
        <div className="corner-receipt" data-scroll-reveal>
          <p>GOOD THINGS / CLOSE TO HOME</p>
          <h2>新鲜、顺手，<br />还有一点人情味。</h2>
          {page.details.map(([code, copy]) => <span key={code}><b>{code}</b>{copy}</span>)}
          <TypefaceNote page={page} />
        </div>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>COUNTER / TODAY</figcaption></figure>
      </section>

      <section className="corner-shelf">
        <Scene page={page} className="corner-scene" />
        <figure data-scroll-reveal><Image image={page.images[2]} /><figcaption><b>THE KEEPER</b><span>{page.quote}</span></figcaption></figure>
      </section>
      <NextWork page={page} />
    </>
  );
}

function StillDay({ page }) {
  return (
    <>
      <section className="still-opening">
        <div className="still-copy">
          <ConceptFlag page={page}>A QUIETER ROUTINE / CONCEPT</ConceptFlag>
          <MoonOutlined data-hero-reveal />
          <h1 data-hero-reveal>慢一点，<br />日子会重新出现。</h1>
          <p data-hero-reveal>{page.intro}</p>
          <HeroLinks label="留一点空白" />
        </div>
        <figure data-hero-reveal><Image image={page.images[0]} eager /></figure>
        <Scene page={page} className="still-scene" />
      </section>

      <section id="story" className="still-chapters">
        <article data-scroll-reveal><span>MORNING</span><h2>先让光落在桌面。</h2><p>水、纸张和一枝绿叶已经足够。界面不必催促下一步。</p></article>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>MAKE / WITH YOUR HANDS</figcaption></figure>
        <article data-scroll-reveal><span>MAKE</span><blockquote>{page.quote}</blockquote><TypefaceNote page={page} /></article>
        <figure data-scroll-reveal><Image image={page.images[2]} /><figcaption>WALK / OUTSIDE THE SCREEN</figcaption></figure>
      </section>
      <NextWork page={page} />
    </>
  );
}

function AtelierNoir({ page }) {
  return (
    <>
      <section className="atelier-cover">
        <figure data-hero-reveal><Image image={page.images[0]} eager /></figure>
        <div className="atelier-title">
          <ConceptFlag page={page}>COLLECTION STUDY / CONCEPT</ConceptFlag>
          <p data-hero-reveal>ATELIER NOIR · CUT BY LIGHT</p>
          <h1 data-hero-reveal>克制，<br /><em>才让材质发声。</em></h1>
          <HeroLinks label="进入系列" />
        </div>
        <Scene page={page} className="atelier-scene" />
      </section>

      <section id="story" className="atelier-lookbook">
        <header data-scroll-reveal><SkinOutlined /><span>THE MATERIAL EDIT</span><h2>Cut. Skin. Space.</h2></header>
        <div className="atelier-looks">
          <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>OBJECT / SILVER ON SKIN</figcaption></figure>
          <blockquote data-scroll-reveal>{page.quote}</blockquote>
          <figure data-scroll-reveal><Image image={page.images[2]} /><figcaption>MOVEMENT / STONE STAIR</figcaption></figure>
        </div>
        <TypefaceNote page={page} />
      </section>
      <NextWork page={page} />
    </>
  );
}

function NeonRift({ page }) {
  return (
    <>
      <section className="rift-entry">
        <Image image={page.images[2]} eager />
        <Scene page={page} className="rift-scene" />
        <div className="rift-copy">
          <ConceptFlag page={page}>LIVE DIGITAL EXPERIENCE / CONCEPT</ConceptFlag>
          <p data-hero-reveal>THE GATE IS ALREADY OPEN</p>
          <h1 data-hero-reveal>进入裂隙。</h1>
          <h2 data-hero-reveal>规则重新加载。</h2>
          <HeroLinks label="穿过入口" />
        </div>
      </section>

      <section id="story" className="rift-arena">
        <figure data-scroll-reveal><Image image={page.images[0]} /><figcaption>ARENA / LIVE SCALE</figcaption></figure>
        <div data-scroll-reveal><FireOutlined /><p>ONE WORLD / ONE SIGNAL</p><h2>氛围不是特效总量。</h2><blockquote>{page.quote}</blockquote></div>
      </section>

      <section className="rift-input" data-scroll-reveal>
        <div><GlobalOutlined /><span>INPUT BECOMES WORLD</span><h2>手里的触感，<br />连接远处的巨构。</h2><TypefaceNote page={page} /></div>
        <figure><Image image={page.images[1]} /><figcaption>TRANSPARENT CONTROL / NEON LIGHT</figcaption></figure>
      </section>
      <NextWork page={page} />
    </>
  );
}

function ShanshuiNow({ page }) {
  return (
    <>
      <section className="ink-scroll-opening">
        <div className="ink-seal" aria-hidden="true">今</div>
        <div className="ink-title">
          <ConceptFlag page={page}>CONTEMPORARY CULTURE / CONCEPT</ConceptFlag>
          <p data-hero-reveal>TRADITION, STILL IN MOTION</p>
          <h1 data-hero-reveal>山水不是旧图案，<br />是今天的空间。</h1>
          <HeroLinks label="展开长卷" />
          <TypefaceNote page={page} />
        </div>
        <figure data-hero-reveal><Image image={page.images[0]} eager /></figure>
        <Scene page={page} className="ink-scene" />
      </section>

      <section id="story" className="ink-trace">
        <p className="ink-vertical" aria-hidden="true">留白不是空</p>
        <figure data-scroll-reveal><Image image={page.images[1]} /><figcaption>纸 · 墨 · 青铜</figcaption></figure>
        <article data-scroll-reveal><span>TRACE</span><h2>时间留下纹理，<br />当代重新安排尺度。</h2><p>{page.intro}</p><blockquote>{page.quote}</blockquote></article>
      </section>

      <section className="ink-court" data-scroll-reveal><Image image={page.images[2]} /><div><span>COURT</span><h2>竹影、水面、黑白建筑。</h2><p>传统活着的时候，不需要仿古外壳。</p></div></section>
      <NextWork page={page} />
    </>
  );
}

function GridZeroOne({ page }) {
  return (
    <>
      <section className="grid-cover">
        <div className="grid-index" aria-hidden="true">G/01</div>
        <div className="grid-title">
          <ConceptFlag page={page}>ARCHITECTURE DOSSIER / CONCEPT</ConceptFlag>
          <p data-hero-reveal>ORDER MAKES THE IMAGE LOUDER</p>
          <h1 data-hero-reveal>网格不是限制，<br />是共同语言。</h1>
          <HeroLinks label="打开建筑档案" />
        </div>
        <figure data-hero-reveal><Image image={page.images[0]} eager /><figcaption>FIELD / PUBLIC AXIS</figcaption></figure>
      </section>

      <section id="story" className="grid-dossier">
        <header data-scroll-reveal><span>PROJECT FILE</span><h2>图像可以大胆，<br />信息仍然一眼找到。</h2><TypefaceNote page={page} /></header>
        <figure className="grid-detail" data-scroll-reveal><Image image={page.images[1]} /><figcaption>DETAIL / PRIMARY SIGNAL</figcaption></figure>
        <div className="grid-notes" data-scroll-reveal>{page.details.map(([code, copy]) => <p key={code}><b>{code}</b><span>{copy}</span></p>)}</div>
        <figure className="grid-system" data-scroll-reveal><Image image={page.images[2]} /><figcaption>SYSTEM / REPEATED ORDER</figcaption></figure>
      </section>

      <section className="grid-model">
        <div data-scroll-reveal><span>SPATIAL STUDY</span><h2>结构拆开以后，<br />秩序仍然成立。</h2><blockquote>{page.quote}</blockquote></div>
        <Scene page={page} className="grid-scene" />
      </section>
      <NextWork page={page} />
    </>
  );
}

const experiences = {
  "velocity-works": VelocityWorks,
  "north-tide": NorthTide,
  "red-form": RedForm,
  "orbital-grid": OrbitalGrid,
  "corner-goods": CornerGoods,
  "still-day": StillDay,
  "atelier-noir": AtelierNoir,
  "neon-rift": NeonRift,
  "shanshui-now": ShanshuiNow,
  "grid-01": GridZeroOne
};

export default function ProjectExperience({ page }) {
  const Experience = experiences[page.id];
  if (!Experience) return <Card>Unknown showcase route.</Card>;
  return <Experience page={page} />;
}
