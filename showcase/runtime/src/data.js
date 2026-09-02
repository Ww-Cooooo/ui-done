export const capabilities = [
  {
    key: "ui",
    short: "UI",
    label: "React UI 基础",
    owner: "React + Ant Design",
    footprint: "结构",
    description: "组件、语义、表单、布局与设计 token 由一套系统统一。"
  },
  {
    key: "motion",
    short: "MOTION",
    label: "动效编排",
    owner: "Anime.js",
    footprint: "行为",
    description: "让层级、反馈和叙事连续，不制造多余的播放器控件。"
  },
  {
    key: "scroll",
    short: "SCROLL",
    label: "平滑滚动",
    owner: "Lenis",
    footprint: "行为",
    description: "统一电脑、平板和手机的阅读节奏，同时保留原生回退。"
  },
  {
    key: "spatial",
    short: "3D",
    label: "真实 3D / WebGL",
    owner: "Three.js + R3F",
    footprint: "强调",
    description: "用空间关系表达真实对象，并为低性能设备保留静态版本。"
  },
  {
    key: "canvas",
    short: "2D",
    label: "独立 2D Canvas",
    owner: "Pts",
    footprint: "强调",
    description: "让线场、节点和程序化纹理承担独立的二维视觉角色。"
  },
  {
    key: "data",
    short: "DATA",
    label: "数据可视化",
    owner: "AntV G2",
    footprint: "结构",
    description: "只解释真实规则、来源和交付事实，不为图表编造业务指标。"
  },
  {
    key: "assets",
    short: "ICON",
    label: "图标与资产",
    owner: "Ant Design Icons + 本地字体",
    footprint: "结构",
    description: "普通界面图标只有一个家族，关键文字和字体均可离线读取。"
  },
  {
    key: "performance",
    short: "PERF",
    label: "性能与交付",
    owner: "Vite + React lazy + Size Limit",
    footprint: "基础设施",
    description: "高级视觉按需加载，失败时不阻断核心内容与操作。"
  }
];

export const workflow = [
  ["FRAME", "读懂人、任务、内容与交付边界"],
  ["AUDIT", "盘点现有代码、页面与可回退基线"],
  ["STACK", "为八类能力安排真实工作"],
  ["DEMO", "查看相关官方 Demo 与当前 API"],
  ["SCORE", "比较收益、代价、许可与离线能力"],
  ["SYSTEM", "统一颜色、字体、密度和动效语言"],
  ["BUILD", "在明确生命周期边界内实现"],
  ["PACKAGE", "固定依赖、字体、许可与构建产物"],
  ["VERIFY", "在电脑、平板、手机中真实检查"],
  ["HANDOFF", "交付证据、边界和未验证事项"]
].map(([code, label], index) => ({ code, label, index: index + 1 }));

export const sources = [
  ["Ant Design", "UI", "必用主系统"],
  ["Uiverse", "UI", "孤立组件参考"],
  ["Anime.js", "动效 / 滚动", "唯一编排主人"],
  ["Lenis", "动效 / 滚动", "唯一滚动机械"],
  ["Three.js + R3F", "空间 / Canvas", "真实 3D"],
  ["Pts", "空间 / Canvas", "程序化 2D"],
  ["Fabric.js", "空间 / Canvas", "可编辑对象"],
  ["AntV G2", "数据 / 物理", "首选可视化"],
  ["ECharts", "数据 / 物理", "适配时替代 AntV"],
  ["p2.js", "数据 / 物理", "真实物理模拟"],
  ["background-effects", "发现", "只作上游索引"]
].map(([name, category, role]) => ({ name, category, role }));

export const viewports = [
  { key: "desktop", label: "电脑", width: 1440, height: 900, note: "主信息密度与完整空间层" },
  { key: "tablet", label: "平板", width: 768, height: 1024, note: "双列收束、触摸路径保留" },
  { key: "phone", label: "手机", width: 390, height: 844, note: "单列重排、高级层降载" }
];

export const skillFiles = [
  { key: "contract", label: "核心契约", path: "SKILL.md", count: 1 },
  { key: "references", label: "专项参考", path: "references/", count: 8 },
  { key: "scripts", label: "预检脚本", path: "scripts/", count: 1 },
  { key: "adapters", label: "宿主适配", path: "agents/", count: 1 }
];

const themes = {
  gallery: {
    mode: "dark",
    bg: "#090c12",
    surface: "#111722",
    surfaceAlt: "#171e2a",
    ink: "#f6f2e8",
    muted: "#9ba6b5",
    accent: "#ff5c35",
    accent2: "#87f5cf",
    line: "rgba(246,242,232,.16)",
    display: "Big Shoulders",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  signal: {
    mode: "dark",
    bg: "#04131e",
    surface: "#092333",
    surfaceAlt: "#0d2d3f",
    ink: "#e6fbff",
    muted: "#83a5b3",
    accent: "#38f2c2",
    accent2: "#ff7a45",
    line: "rgba(117,228,229,.2)",
    display: "Big Shoulders",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  brief: {
    mode: "light",
    bg: "#f3eadb",
    surface: "#fff8ed",
    surfaceAlt: "#eadcc9",
    ink: "#271f19",
    muted: "#756657",
    accent: "#e44a32",
    accent2: "#2158d6",
    line: "rgba(39,31,25,.18)",
    display: "IBM Plex Serif",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  source: {
    mode: "dark",
    bg: "#110b2c",
    surface: "#1b1440",
    surfaceAlt: "#261d55",
    ink: "#f8f2ff",
    muted: "#aaa0c7",
    accent: "#b596ff",
    accent2: "#62e7dd",
    line: "rgba(216,200,255,.18)",
    display: "Outfit",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  viewport: {
    mode: "light",
    bg: "#f4f4ef",
    surface: "#ffffff",
    surfaceAlt: "#e8ebef",
    ink: "#172033",
    muted: "#687184",
    accent: "#ff5738",
    accent2: "#246bfe",
    line: "rgba(23,32,51,.16)",
    display: "Outfit",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  motion: {
    mode: "dark",
    bg: "#171717",
    surface: "#242321",
    surfaceAlt: "#302e2b",
    ink: "#f3eee4",
    muted: "#aaa298",
    accent: "#d97c47",
    accent2: "#c7d0d8",
    line: "rgba(243,238,228,.16)",
    display: "Big Shoulders",
    body: "Outfit",
    mono: "Red Hat Mono"
  },
  open: {
    mode: "light",
    bg: "#f3eccb",
    surface: "#fff9df",
    surfaceAlt: "#e3d8ab",
    ink: "#173c31",
    muted: "#62736b",
    accent: "#e6492d",
    accent2: "#b6922f",
    line: "rgba(23,60,49,.18)",
    display: "IBM Plex Serif",
    body: "Outfit",
    mono: "Red Hat Mono"
  }
};

export const showcasePages = [
  {
    id: "signal-room",
    number: "01",
    theme: themes.signal,
    eyebrow: "PRO SYSTEM / ALL SIGNALS ONLINE",
    title: "把前端所有能力，接上同一个信号。",
    shortTitle: "Signal Room",
    audience: "给需要完整能力覆盖的开发者",
    intro: "不是把八个库排成展板，而是让 UI、动效、滚动、3D、Canvas、数据、资产和性能围绕同一个产品逻辑协作。",
    signature: "八轨空间核心",
    chartKind: "radial",
    chartTitle: "八类能力的执行顺序",
    chartSummary: "数值只表示 UI Done 真实工作流中的排列顺序，不是虚构评分。",
    chartData: capabilities.map((item, index) => ({ label: item.short, value: index + 1, group: item.footprint }))
  },
  {
    id: "brief-machine",
    number: "02",
    theme: themes.brief,
    eyebrow: "BEGINNER FRIENDLY / BRIEF IN, SYSTEM OUT",
    title: "你只说四件事。剩下的，让 Agent 展开。",
    shortTitle: "Brief Machine",
    audience: "给不想先学一整套设计术语的人",
    intro: "说清楚给谁用、要做什么、不能改什么、希望是什么感觉。UI Done 会主动补齐八类前端能力和三端验收。",
    signature: "纸面机械展开器",
    chartKind: "bars",
    chartTitle: "一句自然语言会展开多少层",
    chartSummary: "4 项来自 README 的用户输入，8 项来自 Skill 的能力矩阵，3 项是默认验收视口。",
    chartData: [
      { label: "你说清", value: 4, group: "输入" },
      { label: "Agent 补齐", value: 8, group: "规划" },
      { label: "默认验收", value: 3, group: "视口" }
    ]
  },
  {
    id: "source-atlas",
    number: "03",
    theme: themes.source,
    eyebrow: "DEMO FIRST / CURATED BEFORE CUSTOM",
    title: "先看最会做的人怎么做，再做成自己的。",
    shortTitle: "Source Atlas",
    audience: "给重视来源、Demo 和许可证的人",
    intro: "UI Done 把组件、动效、滚动、3D、Canvas、图表和素材来源连成一张地图；采用前先看相关官方 Demo，再按整站调性改造。",
    signature: "来源星图",
    chartKind: "bars",
    chartTitle: "React 实现目录里的来源分布",
    chartSummary: "统计来自 UI Done 当前素材库；Element Plus 因非 React 路线没有计入实现目录。",
    chartData: [
      { label: "UI", value: 2, group: "来源" },
      { label: "动效 / 滚动", value: 2, group: "来源" },
      { label: "空间 / Canvas", value: 3, group: "来源" },
      { label: "数据 / 物理", value: 3, group: "来源" },
      { label: "发现", value: 1, group: "来源" }
    ]
  },
  {
    id: "viewport-lab",
    number: "04",
    theme: themes.viewport,
    eyebrow: "RESPONSIVE BY DEFAULT / 3 REAL VIEWPORTS",
    title: "一个设计，必须穿过三种屏幕。",
    shortTitle: "Viewport Lab",
    audience: "给需要可验证响应式交付的人",
    intro: "电脑、平板、手机不是三张缩放图。信息密度、触摸路径、3D 质量和 Canvas 点数都要分别收束，再在真实浏览器里检查。",
    signature: "三框光学实验台",
    chartKind: "grouped",
    chartTitle: "本次展厅的三个验收视口",
    chartSummary: "宽高均是本次浏览器验收的真实像素值，不代表所有真实设备。",
    chartData: viewports.flatMap(item => [
      { label: item.label, metric: "宽", value: item.width },
      { label: item.label, metric: "高", value: item.height }
    ])
  },
  {
    id: "motion-foundry",
    number: "05",
    theme: themes.motion,
    eyebrow: "FULL LOOP / TEN CONTROLLED GATES",
    title: "好看的页面，要经过一条完整生产线。",
    shortTitle: "Motion Foundry",
    audience: "给希望 Agent 从调研一直管到验收的人",
    intro: "UI Done 不在用户说完需求后就消失。它持续管理审计、选型、设计、实现、打包、浏览器验证和交付证据。",
    signature: "十段受控装配线",
    chartKind: "line",
    chartTitle: "UI Done 的十阶段工作流",
    chartSummary: "纵轴只表示阶段顺序；每一项都来自当前 SKILL.md，不是工时或完成率。",
    chartData: workflow.map(item => ({ label: item.code, value: item.index, group: "阶段" }))
  },
  {
    id: "open-studio",
    number: "06",
    theme: themes.open,
    eyebrow: "VENDOR-NEUTRAL CORE / READABLE FILES",
    title: "规则写在文件里，不锁在某一家 Agent 里。",
    shortTitle: "Open Studio",
    audience: "给开源使用者和 Skill 维护者",
    intro: "核心契约、专项参考、预检脚本和宿主适配分层存放。任何能读取 Agent Skills 的执行者，都能看到同一份前端规则。",
    signature: "可拆解文件模块盒",
    chartKind: "bars",
    chartTitle: "当前 Skill 文件结构",
    chartSummary: "数量来自仓库当前 skill/ui-done 目录；README 和展示网页不计入 Skill 本体。",
    chartData: skillFiles.map(item => ({ label: item.label, value: item.count, group: "文件" }))
  }
];

export const galleryPage = {
  id: "gallery",
  number: "00",
  theme: themes.gallery,
  eyebrow: "UI DONE / LIVE PROOF, NOT A TEMPLATE",
  title: "一句话，展开成一整套前端。",
  shortTitle: "UI Done Gallery",
  audience: "给第一次看到 UI Done 的人",
  intro: "六个全新页面、六种完全不同的调性，同一套 React、Ant Design、Anime.js、Lenis、R3F、Pts、AntV 和性能边界。",
  signature: "能力切面引擎",
  chartKind: "radialEqual",
  chartTitle: "本次展厅实际覆盖的八类能力",
  chartSummary: "每一段代表一类已经在页面中承担真实工作的能力；长度相同，不表达虚构优劣。",
  chartData: capabilities.map(item => ({ label: item.short, value: 1, group: item.footprint }))
};

export const allPages = [galleryPage, ...showcasePages];

export function getPageConfig(id) {
  return allPages.find(page => page.id === id) || galleryPage;
}
