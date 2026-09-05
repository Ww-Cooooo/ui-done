import { useMemo, useState } from "react";
import { Card, Segmented, Tag } from "antd";
import { ArrowRightOutlined, CheckOutlined, FontSizeOutlined } from "@ant-design/icons";
import { capabilities, showcasePages } from "./data";

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

function VelocityPreview({ page }) {
  return (
    <div className="preview-velocity">
      <figure><PreviewImage page={page} /><figcaption>RUN-241 / HILL REPEATS</figcaption></figure>
      <div className="velocity-preview-console">
        <span>COACH REVIEW / 09.04</span>
        <h4><span>末组负荷下降，</span><span>先检查左脚触地。</span></h4>
        <div className="velocity-preview-stats"><b>48:20<small>TIME</small></b><b>87<small>LOAD</small></b><b>4′12″<small>PACE</small></b></div>
        <div className="velocity-preview-trace" aria-hidden="true">{[42, 68, 55, 86, 62, 78].map((height, index) => <i key={index} style={{ "--trace": `${height}%` }} />)}</div>
        <p><i /> 2 条记录等待复盘</p>
      </div>
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
      <div className="still-preview-date"><span>SEP</span><strong>04</strong><small>THU</small></div>
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
    <div className="preview-atelier">
      <div className="atelier-preview-film">{page.images.map((_, index) => <span key={index}><PreviewImage page={page} index={index} /><i>{`L${index + 1}`}</i></span>)}</div>
      <figure><PreviewImage page={page} /><i className="atelier-pin pin-a">1</i><i className="atelier-pin pin-b">2</i><figcaption>LOOK—01 / V07</figcaption></figure>
      <aside><span>REVIEW DESK</span><h4><span>这一版先</span><span>检查肩线。</span></h4><div><small>READINESS</small><b>82%</b></div><p><i style={{ width: "82%" }} /></p><em>2 TEAM NOTES</em></aside>
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
  "shanshui-now": ShanshuiPreview
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
    <Card className={`showcase-work showcase-work-${page.id}`} bordered={false} data-scroll-reveal style={style}>
      <a href={`../${page.id}/`} aria-label={`打开 ${page.shortTitle}，查看${page.product.type}页面`}>
        <div className={`work-preview work-preview-${page.id}`}><Preview page={page} /></div>
        <div className="work-meta" data-gallery-meta>
          <div><h3>{page.shortTitle}</h3><span>{page.product.type}</span></div>
          <p>{page.product.role}可以{page.product.galleryAction}。</p>
          <b>{page.product.mode === "work" ? "查看工作页面" : "查看完整页面"} <ArrowRightOutlined /></b>
        </div>
      </a>
    </Card>
  );
}

export function GalleryModules() {
  const [mode, setMode] = useState("all");
  const orderedPages = useMemo(() => [
    ...showcasePages.filter(page => page.product.mode === "work"),
    ...showcasePages.filter(page => page.product.mode === "expressive")
  ], []);
  const visiblePages = orderedPages.filter(page => mode === "all" || page.product.mode === mode);

  return (
    <>
      <section id="works" className="content-section works-section">
        <SectionIntro
          index="01"
          eyebrow="PRODUCT FIRST / VISUAL SECOND"
          title="先确定页面要解决的问题，再选择合适的视觉风格。"
          copy="前六个示例展示训练分析、轨道监控、门店补货、日程安排、创意审批和项目协作。后四个示例展示自然专题、艺术展览、娱乐入口和文化长卷。十个页面的用途和布局都不相同。"
        />
        <div className="gallery-filter" data-scroll-reveal>
          <Segmented
            aria-label="按产品类型筛选作品"
            value={mode}
            onChange={setMode}
            options={[{ label: "全部 10", value: "all" }, { label: "工作型 6", value: "work" }, { label: "表达型 4", value: "expressive" }]}
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
