import { useState } from "react";
import { Badge, Button, Card, Form, Input, Segmented, Space, Steps, Tag, Tree } from "antd";
import {
  ArrowRightOutlined,
  CheckOutlined,
  CodeOutlined,
  CopyOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  RadarChartOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { capabilities, showcasePages, skillFiles, sources, viewports, workflow } from "./data";

const capabilityGroups = {
  全部: capabilities.map(item => item.key),
  界面系统: ["ui", "data", "assets"],
  体验增强: ["motion", "scroll", "spatial", "canvas"],
  交付边界: ["performance"]
};

function SectionIntro({ index, eyebrow, title, copy }) {
  return (
    <div className="section-intro" data-scroll-reveal>
      <span>{index}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}

function PreviewGlyph({ id }) {
  const count = id === "motion-foundry" ? 10 : id === "viewport-lab" ? 3 : id === "open-studio" ? 6 : 8;
  return (
    <div className={`preview-glyph glyph-${id}`} aria-hidden="true">
      <i className="glyph-core" />
      {Array.from({ length: count }, (_, index) => (
        <b key={index} style={{ "--i": index, "--count": count }} />
      ))}
    </div>
  );
}

export function GalleryModules() {
  return (
    <>
      <section id="works" className="content-section work-section">
        <SectionIntro
          index="01"
          eyebrow="SIX NEW DIRECTIONS"
          title="不是六个换色模板。"
          copy="每个作品都有自己的受众、信息密度、排版、空间对象和交互任务；共用的只是同一套严格能力边界。"
        />
        <div className="work-grid">
          {showcasePages.map(page => (
            <Card key={page.id} className={`work-card work-card-${page.id}`} bordered={false} data-scroll-reveal>
              <a href={`../${page.id}/`} className="work-card-link" aria-label={`打开 ${page.shortTitle}`}>
                <div className="work-card-art" style={{
                  "--card-bg": page.theme.bg,
                  "--card-ink": page.theme.ink,
                  "--card-accent": page.theme.accent,
                  "--card-accent-2": page.theme.accent2
                }}>
                  <span>{page.number}</span>
                  <PreviewGlyph id={page.id} />
                  <small>{page.signature}</small>
                </div>
                <div className="work-card-copy">
                  <Tag bordered={false}>{page.audience}</Tag>
                  <h3>{page.shortTitle}</h3>
                  <p>{page.title}</p>
                  <span className="card-action">进入作品 <ArrowRightOutlined /></span>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="content-section manifesto-section">
        <SectionIntro
          index="02"
          eyebrow="ONE BRIEF → FULL SYSTEM"
          title="小白不需要先变成设计师。"
          copy="你说清楚对象、任务、限制和感觉。Agent 主动查看来源、组织能力、实现细节并进入真实浏览器收尾。"
        />
        <div className="manifesto-grid" data-scroll-reveal>
          <div className="manifesto-input">
            <span>YOU SAY</span>
            <blockquote>“给第一次使用 Skill 的人做一个页面，要帅，但不要像模板。”</blockquote>
          </div>
          <ArrowRightOutlined className="manifesto-arrow" />
          <div className="manifesto-output">
            <span>UI DONE EXPANDS</span>
            {capabilities.map(item => <Tag key={item.key}>{item.short}</Tag>)}
          </div>
        </div>
      </section>
    </>
  );
}

export function SignalModule() {
  const [group, setGroup] = useState("全部");
  const visible = capabilities.filter(item => capabilityGroups[group].includes(item.key));

  return (
    <section id="lab" className="content-section signal-console">
      <SectionIntro
        index="01"
        eyebrow="ONE OWNER PER SIGNAL"
        title="每一层都在线，但没有一层抢戏。"
        copy="这里展示的是实际技术主人和工作边界，不是抽象完成率。切换分组，查看每类能力在同一个页面里承担什么。"
      />
      <div className="filter-button-row signal-filter-buttons" role="group" aria-label="筛选能力类别">
        {Object.keys(capabilityGroups).map(option => (
          <Button
            key={option}
            type={group === option ? "primary" : "default"}
            aria-pressed={group === option}
            onClick={() => setGroup(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="signal-grid" aria-live="polite">
        {visible.map((item, index) => (
          <Card key={item.key} className="signal-card" bordered={false} data-scroll-reveal>
            <div className="signal-card-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Badge status="processing" text="ONLINE" />
            </div>
            <strong>{item.label}</strong>
            <code>{item.owner}</code>
            <p>{item.description}</p>
            <Tag bordered={false}>{item.footprint}</Tag>
          </Card>
        ))}
      </div>
    </section>
  );
}

const toneOptions = ["克制", "大胆", "杂志感", "技术感"];

export function BriefModule() {
  const [brief, setBrief] = useState("给第一次安装 Skill 的人做一个首页，让他一眼就想试试。 ");
  const [tone, setTone] = useState("大胆");
  const [result, setResult] = useState({ brief, tone });

  return (
    <section id="lab" className="content-section brief-machine">
      <SectionIntro
        index="01"
        eyebrow="LOCAL BRIEF EXPANDER"
        title="试着只说一句人话。"
        copy="这个表单只在当前浏览器里生成演示计划，不会上传、提交或调用 AI；它把 README 的自然语言输入方式真实呈现出来。"
      />
      <div className="brief-layout">
        <Card className="brief-form-card" bordered={false} data-scroll-reveal>
          <Form layout="vertical" onFinish={() => setResult({ brief: brief.trim() || "做一个清楚、好用的新页面。", tone })}>
            <Form.Item label="你想做什么？" htmlFor="brief-input">
              <Input.TextArea
                id="brief-input"
                value={brief}
                onChange={event => setBrief(event.target.value)}
                autoSize={{ minRows: 4, maxRows: 7 }}
                maxLength={180}
                showCount
              />
            </Form.Item>
            <Form.Item label="大概什么感觉？">
              <Segmented aria-label="选择页面感觉" block options={toneOptions} value={tone} onChange={setTone} />
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<ExperimentOutlined />} block>展开前端计划</Button>
          </Form>
        </Card>

        <div className="brief-output" data-scroll-reveal aria-live="polite">
          <div className="brief-ticket">
            <span>INPUT / 01</span>
            <p>{result.brief}</p>
            <Tag>{result.tone}</Tag>
          </div>
          <div className="brief-connector"><i /><i /><i /><i /></div>
          <div className="brief-plan">
            <div className="brief-plan-head"><span>UI DONE / 08 LAYERS</span><CheckOutlined /></div>
            {capabilities.map(item => (
              <div key={item.key}><strong>{item.short}</strong><span>{item.owner}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const sourceFilters = ["全部", "UI", "动效 / 滚动", "空间 / Canvas", "数据 / 物理", "发现"];

export function SourceModule({ filter, onFilterChange }) {
  const visible = filter === "全部" ? sources : sources.filter(item => item.category === filter);

  return (
    <section id="lab" className="content-section source-atlas">
      <SectionIntro
        index="01"
        eyebrow="CURATED SOURCE MAP"
        title="素材库不是收藏夹，是采用顺序。"
        copy="优先查看用户给出的来源与相关官方 Demo。只有真实任务、兼容性、许可证和交付方式都对得上，才会成为页面里的主人。"
      />
      <div className="filter-button-row source-filter-buttons" role="group" aria-label="筛选素材来源">
        {sourceFilters.map(option => (
          <Button
            key={option}
            type={filter === option ? "primary" : "default"}
            aria-pressed={filter === option}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="source-map" aria-live="polite">
        <div className="source-orbit" aria-hidden="true"><RadarChartOutlined /></div>
        {visible.map((source, index) => (
          <Card key={source.name} className="source-node" bordered={false} data-scroll-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{source.name}</h3>
            <Tag bordered={false}>{source.category}</Tag>
            <p>{source.role}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ViewportModule() {
  const [selected, setSelected] = useState("desktop");
  const viewport = viewports.find(item => item.key === selected);
  const options = viewports.map(item => ({ label: item.label, value: item.key }));

  return (
    <section id="lab" className="content-section viewport-lab">
      <SectionIntro
        index="01"
        eyebrow="THREE REAL BROWSER SIZES"
        title="不是把桌面页缩小。"
        copy="切换本次实际使用的验收视口。画框会改变比例，内容说明同步更新；真正的交付还会在浏览器中检查溢出、触摸和高级层降载。"
      />
      <div className="viewport-workbench">
        <div className="viewport-controls" data-scroll-reveal>
          <Segmented aria-label="选择验收视口" block options={options} value={selected} onChange={setSelected} />
          <div className="viewport-readout">
            <span>{viewport.label.toUpperCase()}</span>
            <strong>{viewport.width} × {viewport.height}</strong>
            <p>{viewport.note}</p>
          </div>
          <Space wrap>
            <Tag icon={<SafetyCertificateOutlined />}>真实浏览器截图</Tag>
            <Tag icon={<CheckOutlined />}>检查横向溢出</Tag>
          </Space>
        </div>
        <div className="device-stage" data-scroll-reveal>
          <div className={`device-frame device-${viewport.key}`} style={{ aspectRatio: `${viewport.width} / ${viewport.height}` }}>
            <div className="device-topbar"><i /><i /><i /></div>
            <div className="device-content"><span>UI DONE</span><b>{viewport.label}</b><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MotionModule({ current, onCurrentChange }) {
  const item = workflow[current];
  const stepItems = workflow.map((step, index) => ({
    title: (
      <span className="foundry-step-button">
        {step.code}
      </span>
    ),
    description: step.label
  }));

  return (
    <section id="lab" className="content-section motion-foundry">
      <SectionIntro
        index="01"
        eyebrow="TEN GATES / NO CONTEXT DROP"
        title="从第一眼，一直管到最后一次浏览器检查。"
        copy="点击生产线节点查看职责。阶段可以共享轻量基础设施，但调研、实现、测试和交付不能各做各的。"
      />
      <div className="foundry-grid">
        <Card className="foundry-steps" bordered={false} data-scroll-reveal>
          <Steps aria-label="选择生产线阶段" direction="vertical" current={current} onChange={onCurrentChange} items={stepItems} />
        </Card>
        <div className="foundry-inspector" data-scroll-reveal aria-live="polite">
          <span>GATE {String(item.index).padStart(2, "0")}</span>
          <h3>{item.code}</h3>
          <p>{item.label}</p>
          <div className="foundry-piston" aria-hidden="true"><i /><i /><i /></div>
          <Tag icon={<CheckOutlined />}>UI Done 持续生效</Tag>
        </div>
      </div>
    </section>
  );
}

const treeData = [
  {
    title: "skill/ui-done/",
    key: "root",
    children: [
      { title: "SKILL.md — 唯一权威契约", key: "skill", icon: <FileTextOutlined /> },
      {
        title: "references/ — 8 份专项参考",
        key: "references",
        icon: <FileTextOutlined />,
        children: skillFiles.find(item => item.key === "references") ? [
          { title: "React 栈 / 选型 / 素材库", key: "ref-a" },
          { title: "字体 / 动效 / 视觉 QA", key: "ref-b" }
        ] : []
      },
      { title: "scripts/ — 静态预检", key: "scripts", icon: <CodeOutlined /> },
      { title: "agents/ — 可选宿主适配", key: "agents", icon: <FileTextOutlined /> }
    ]
  }
];

export function OpenModule() {
  const installCommand = "npx skills add Ww-Cooooo/ui-done -g";
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="lab" className="content-section open-studio">
      <SectionIntro
        index="01"
        eyebrow="READABLE, PORTABLE, FORKABLE"
        title="宿主可以不同，核心规则必须相同。"
        copy="任何 Agent 要真正命中 UI Done，都需要读到完整 Skill 文件夹。宿主适配只帮助发现，不能偷偷拥有另一套规则。"
      />
      <div className="studio-grid">
        <Card className="file-tree-card" bordered={false} data-scroll-reveal>
          <Tree showIcon showLine defaultExpandAll treeData={treeData} />
        </Card>
        <div className="studio-manual" data-scroll-reveal>
          <Tag icon={<SafetyCertificateOutlined />} bordered={false}>AGENT SKILLS FORMAT</Tag>
          <h3>一份可读契约，贯穿完整前端工作。</h3>
          <ul>
            <li><CheckOutlined /> 用户自然语言提到前端时加载</li>
            <li><CheckOutlined /> Agent 自己增删改测时继续生效</li>
            <li><CheckOutlined /> 上下文压缩或交接后重新读取</li>
            <li><CheckOutlined /> 不能读取元数据的宿主明确注册</li>
          </ul>
          <div className="install-strip">
            <code>{installCommand}</code>
            <Button type="primary" icon={copied ? <CheckOutlined /> : <CopyOutlined />} onClick={copyInstall}>
              {copied ? "已复制" : "复制"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageModule({ page, sourceFilter, onSourceFilterChange, motionStep, onMotionStepChange }) {
  if (page.id === "signal-room") return <SignalModule />;
  if (page.id === "brief-machine") return <BriefModule />;
  if (page.id === "source-atlas") return <SourceModule filter={sourceFilter} onFilterChange={onSourceFilterChange} />;
  if (page.id === "viewport-lab") return <ViewportModule />;
  if (page.id === "motion-foundry") return <MotionModule current={motionStep} onCurrentChange={onMotionStepChange} />;
  if (page.id === "open-studio") return <OpenModule />;
  return null;
}

export function CapabilityStrip() {
  return (
    <section className="capability-strip" aria-label="实际采用的八类能力">
      {capabilities.map((item, index) => (
        <div key={item.key} data-scroll-reveal>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.short}</strong>
          <small>{item.owner}</small>
        </div>
      ))}
    </section>
  );
}
