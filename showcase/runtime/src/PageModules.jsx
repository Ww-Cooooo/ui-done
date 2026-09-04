import { useMemo, useState } from "react";
import { Card, Segmented, Tag } from "antd";
import { ArrowRightOutlined, CheckOutlined, FontSizeOutlined, UserOutlined } from "@ant-design/icons";
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
          title={<><span className="type-phrase">先看要完成什么，</span><span className="type-phrase">再看它长什么样。</span></>}
          copy="六个工作型产品分别承担分析、监控、经营、计划、审阅和协作；四个表达型页面承担编辑、展览、娱乐与文化叙事。风格和产品结构两条轴都不同。"
        />
        <div className="gallery-filter" data-scroll-reveal>
          <Segmented
            aria-label="按产品类型筛选作品"
            value={mode}
            onChange={setMode}
            options={[{ label: "全部 10", value: "all" }, { label: "工作型 6", value: "work" }, { label: "表达型 4", value: "expressive" }]}
          />
          <span>当前显示 {visiblePages.length} 个不同产品任务</span>
        </div>
        <div className="works-grid">
          {visiblePages.map(page => (
            <Card key={page.id} className={`work-card work-card-${page.id} work-card-${page.layout} work-card-${page.product.mode}`} bordered={false} data-scroll-reveal>
              <a href={`../${page.id}/`} aria-label={`打开 ${page.shortTitle}：${page.styleName}`}>
                <div className="work-images">
                  {(page.product.mode === "work" ? page.images.slice(0, 1) : page.images).map((image, index) => <img key={image.src} src={image.src} alt={index === 0 ? image.alt : ""} loading="lazy" />)}
                  <span>{page.number}</span>
                  {page.product.mode === "work" && <div className="work-task-overlay"><small><UserOutlined /> {page.product.role}</small><b>{page.product.verb}</b><em>{page.product.ia}</em></div>}
                </div>
                <div className="work-copy">
                  <p>{page.product.mode === "work" ? "WORK PRODUCT" : "EXPRESSIVE EXPERIENCE"} / {page.styleName}</p>
                  <h3>{page.shortTitle}</h3>
                  <strong>{page.product.type}</strong>
                  <span className="work-loop">{page.product.loop}</span>
                  <small><FontSizeOutlined /> {page.fontStatement}</small>
                  <b>{page.product.mode === "work" ? "进入工作台" : "进入体验"} <ArrowRightOutlined /></b>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="content-section beginner-section">
        <SectionIntro
          index="02"
          eyebrow="BRIEF IN / FULL SYSTEM OUT"
          title={<><span className="type-phrase">小白说人话，</span><span className="type-phrase">Agent 把产品和视觉一起展开。</span></>}
          copy="不必先规定每张卡、每个图表和每种动效。先说谁要做什么，UI Done 会主动规划产品结构、开源字体、组件、动效、滚动、Canvas、真实数据图形和合适的素材；3D 单独经过严格适配判断。"
        />
        <div className="beginner-grid" data-scroll-reveal>
          <blockquote>“做一个有高级感的文化展览页，手机也要好看。”</blockquote>
          <div className="brief-arrow"><ArrowRightOutlined /></div>
          <div className="expansion-list">
            {capabilities.map(item => <Tag key={item.short} icon={<CheckOutlined />}>{item.short} / {item.owner}</Tag>)}
          </div>
        </div>
      </section>

      <section className="content-section type-manifesto" data-scroll-reveal>
        <div><FontSizeOutlined /><span>TYPE IS A DESIGN DECISION</span></div>
        <h2><span className="type-phrase">每次页面设计，</span><span className="type-phrase">都要选一套真正匹配它的开源字体。</span></h2>
        <p>中文、英文、数字、代码和符号都必须被考虑；本地自带的普通字体只允许在资源加载失败时兜底。</p>
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
