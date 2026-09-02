import { Button, Card, Tag } from "antd";
import { ArrowRightOutlined, CheckOutlined, FontSizeOutlined, PictureOutlined } from "@ant-design/icons";
import { capabilities, showcasePages } from "./data";
import VisualStage from "./VisualStage";

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
  return (
    <>
      <section id="works" className="content-section works-section">
        <SectionIntro
          index="01"
          eyebrow="TEN DISTINCT DIRECTIONS"
          title="每一页，先选择自己的审美立场。"
          copy="不是同一个组件模板换十套颜色。题材、字体、构图、图片节奏、空间对象和交互语气都会随页面目标一起改变。"
        />
        <div className="works-grid">
          {showcasePages.map(page => (
            <Card key={page.id} className={`work-card work-card-${page.layout}`} bordered={false} data-scroll-reveal>
              <a href={`../${page.id}/`} aria-label={`打开 ${page.shortTitle}：${page.styleName}`}>
                <div className="work-images">
                  {page.images.map((image, index) => <img key={image.src} src={image.src} alt={index === 0 ? image.alt : ""} loading="lazy" />)}
                  <span>{page.number}</span>
                </div>
                <div className="work-copy">
                  <p>{page.styleName}</p>
                  <h3>{page.shortTitle}</h3>
                  <strong>{page.title}</strong>
                  <small><FontSizeOutlined /> {page.fontStatement}</small>
                  <b>进入作品 <ArrowRightOutlined /></b>
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
          title="小白只管说人话，Agent 负责主动展开。"
          copy="你不需要像专业设计师一样，先把字体、组件、动效、图表和每张图片逐项点名。UI Done 会先为每一类能力安排用途，再以极严格的理由排除真正不合适的部分。"
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
        <h2>每次页面设计，都要选一套真正匹配它的开源字体。</h2>
        <p>中文、英文、数字、代码和符号都必须被考虑；本地自带的普通字体只允许在资源加载失败时兜底。</p>
      </section>
    </>
  );
}

export function ProjectModules({ page, active, onChange }) {
  const activeImage = page.images[active];
  return (
    <>
      <section id="design" className="content-section design-section">
        <SectionIntro
          index="01"
          eyebrow={`${page.shortTitle.toUpperCase()} / DESIGN LOGIC`}
          title="不是把照片放进去，而是让照片决定版式。"
          copy={`这套${page.styleName}方向从三张真实主视觉出发，所有颜色、字体密度和空间层都围绕同一调性收束。`}
        />
        <div className="design-principles">
          {page.details.map(([code, copy], index) => (
            <Card key={code} bordered={false} data-scroll-reveal>
              <span>0{index + 1}</span><h3>{code}</h3><p>{copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={`image-essay image-essay-${page.layout}`} data-scroll-reveal>
        <img src={activeImage.src} alt={activeImage.alt} />
        <div className="image-essay-copy">
          <span>{page.number} / {activeImage.label}</span>
          <blockquote>{page.quote}</blockquote>
          <p>{activeImage.alt}</p>
          <div className="essay-picker" role="group" aria-label="选择当前视觉章节">
            {page.images.map((image, index) => (
              <Button key={image.label} type={index === active ? "primary" : "default"} onClick={() => onChange(index)} aria-pressed={index === active}>
                {String(index + 1).padStart(2, "0")} {image.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section spatial-section">
        <div className="spatial-copy" data-scroll-reveal>
          <Tag bordered={false} icon={<PictureOutlined />}>REAL IMAGE + LIVE MATERIAL</Tag>
          <h2>图片负责叙事，3D 与 Canvas 负责空间气质。</h2>
          <p>这里的 WebGL 对象和二维线场是可降级的视觉强调，不是假装成业务功能，也不会遮住核心内容。</p>
          <ul>
            <li><CheckOutlined /> Three.js / R3F：真实三维材质与空间关系</li>
            <li><CheckOutlined /> Pts：独立二维程序化线场</li>
            <li><CheckOutlined /> 减少动态、无 WebGL 或离屏时自动收束</li>
          </ul>
        </div>
        <div className="spatial-work" data-scroll-reveal><VisualStage page={page} /></div>
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
