export const capabilities = [
  ["UI", "React + Ant Design"],
  ["MOTION", "Anime.js"],
  ["SCROLL", "Lenis"],
  ["3D", "Three.js + R3F"],
  ["2D", "Pts"],
  ["DATA", "AntV G2"],
  ["TYPE", "Open-source fonts"],
  ["PERF", "Vite + lazy loading"]
].map(([short, owner]) => ({ short, owner }));

const mono = "Red Hat Mono";
const sansCjk = "Noto Sans SC";
const serifCjk = "Noto Serif SC";

const themes = {
  gallery: {
    mode: "dark", bg: "#0b0c0e", surface: "#15171a", surfaceAlt: "#202328",
    ink: "#f4f1e8", muted: "#a7abb2", accent: "#ff5a36", accent2: "#a8ffcf",
    line: "rgba(244,241,232,.18)", display: "Big Shoulders", body: "Outfit", cjk: sansCjk, mono
  },
  velocity: {
    mode: "dark", bg: "#0b1117", surface: "#131c24", surfaceAlt: "#1c2833",
    ink: "#f3f7f8", muted: "#8fa2b2", accent: "#d8ff3e", accent2: "#70a7d9",
    line: "rgba(216,255,62,.22)", display: "Big Shoulders", body: "Outfit", cjk: sansCjk, mono
  },
  coast: {
    mode: "light", bg: "#e7e4dc", surface: "#f4f1e8", surfaceAlt: "#cbc6ba",
    ink: "#253032", muted: "#697476", accent: "#b55d3d", accent2: "#6f8d8a",
    line: "rgba(37,48,50,.2)", display: "Cormorant Garamond", body: "Cormorant Garamond", cjk: serifCjk, mono
  },
  red: {
    mode: "light", bg: "#e8e5df", surface: "#f7f3eb", surfaceAlt: "#d2cec6",
    ink: "#101010", muted: "#535353", accent: "#e41d16", accent2: "#1d5fff",
    line: "rgba(16,16,16,.76)", display: "Syne", body: "Syne", cjk: sansCjk, mono
  },
  orbital: {
    mode: "dark", bg: "#02070d", surface: "#07131f", surfaceAlt: "#0b2032",
    ink: "#e8f4ff", muted: "#7690a6", accent: "#ffb52b", accent2: "#3fb7ff",
    line: "rgba(63,183,255,.22)", display: "Chakra Petch", body: "Outfit", cjk: sansCjk, mono
  },
  corner: {
    mode: "light", bg: "#e8d1a7", surface: "#f3e3bf", surfaceAlt: "#d49b66",
    ink: "#3e241a", muted: "#765b4d", accent: "#bd3c28", accent2: "#356858",
    line: "rgba(62,36,26,.24)", display: "Fraunces", body: "Outfit", cjk: sansCjk, displayCjk: "ZCOOL QingKe HuangYou", mono
  },
  still: {
    mode: "light", bg: "#f2eee7", surface: "#fbf8f2", surfaceAlt: "#dfd7e5",
    ink: "#4c4651", muted: "#817987", accent: "#8b6ccf", accent2: "#819d73",
    line: "rgba(76,70,81,.13)", display: "Outfit", body: "Outfit", cjk: sansCjk, mono
  },
  atelier: {
    mode: "dark", bg: "#0d0b0a", surface: "#171310", surfaceAlt: "#28201a",
    ink: "#f3e7d6", muted: "#a69788", accent: "#d6a96f", accent2: "#e9d9c4",
    line: "rgba(243,231,214,.2)", display: "Bodoni Moda", body: "Cormorant Garamond", cjk: serifCjk, mono
  },
  neon: {
    mode: "dark", bg: "#050313", surface: "#0d0924", surfaceAlt: "#17103d",
    ink: "#f6efff", muted: "#9a8eb5", accent: "#ff3bd4", accent2: "#43d9ff",
    line: "rgba(112,72,255,.32)", display: "Chakra Petch", body: "Syne", cjk: sansCjk, mono
  },
  ink: {
    mode: "light", bg: "#e8e0d1", surface: "#f5efe5", surfaceAlt: "#cfc1aa",
    ink: "#221c17", muted: "#74695c", accent: "#a82d25", accent2: "#776245",
    line: "rgba(34,28,23,.2)", display: "Cormorant Garamond", body: "Noto Serif SC", cjk: serifCjk, mono
  },
  swiss: {
    mode: "light", bg: "#e9e9e5", surface: "#f8f8f4", surfaceAlt: "#d3d4d1",
    ink: "#101214", muted: "#60656a", accent: "#ee2b21", accent2: "#1249ba",
    line: "rgba(16,18,20,.28)", display: "Archivo", body: "Archivo", cjk: sansCjk, mono
  }
};

function images(id, items) {
  return items.map((item, index) => ({ ...item, src: `../assets/${id}/0${index + 1}.webp` }));
}

export const showcasePages = [
  {
    id: "velocity-works", number: "01", shortTitle: "Velocity Works", styleName: "运动性能", journey: "全屏夜训叙事 / 气流轨道",
    layout: "velocity", theme: themes.velocity, chartKind: "bars", shape: "velocity",
    eyebrow: "PERFORMANCE STUDY / 01", audience: "运动品牌与训练产品概念页",
    title: "快，不是一句口号。", latinTitle: "BUILT FOR THE NEXT SECOND.",
    intro: "冷雨、呼吸与碳纤维被压进同一条速度线。页面以强对比排版和倾斜摄影建立冲刺感。",
    signature: "倾斜速度轨道", fontStatement: "Big Shoulders + Noto Sans SC + Red Hat Mono",
    quote: "动作发生以前，界面已经把方向说清楚。",
    details: [["PACE", "倾斜轴线让阅读像一次起跑"], ["GRIP", "局部材质承担产品可信度"], ["AIR", "留白和冷蓝压住速度噪音"]],
    images: images("velocity-works", [
      { label: "MOTION", alt: "雨后跑道上向前冲刺的运动员" },
      { label: "MATERIAL", alt: "带水珠的黑色跑鞋织物与鞋带特写" },
      { label: "SPACE", alt: "阴天混凝土建筑下独自训练的跑者" }
    ]), luminance: [103, 51, 91]
  },
  {
    id: "north-tide", number: "02", shortTitle: "North Tide", styleName: "海岸自然编辑", journey: "海岸长篇 / 潮汐地平线",
    layout: "editorial", theme: themes.coast, chartKind: "line", shape: "tide",
    eyebrow: "COASTAL JOURNAL / 02", audience: "旅行杂志与自然观察概念页",
    title: "沿着风，走到陆地尽头。", latinTitle: "THE SEA KEEPS ITS OWN TIME.",
    intro: "没有旅游海报的甜味，只有风、盐、岩层和雾。缓慢的衬线字与横向留白把海岸写成一篇长文章。",
    signature: "潮汐编辑折页", fontStatement: "Cormorant Garamond + Noto Serif SC + Red Hat Mono",
    quote: "真正的远方，不需要把颜色调得更响。",
    details: [["WIND", "宽行距给海风留下经过的空间"], ["SALT", "岩石微距成为整页的触觉锚点"], ["FOG", "低饱和图像维持安静的叙事温度"]],
    images: images("north-tide", [
      { label: "PATH", alt: "穿浅色外套的人沿海岸草坡走向远方" },
      { label: "TIDE", alt: "海浪冲刷带贝壳和藤壶的深色岩石" },
      { label: "SHELTER", alt: "雾中坐落在海崖上的白色圆顶建筑" }
    ]), luminance: [143, 74, 140]
  },
  {
    id: "red-form", number: "03", shortTitle: "Red Form", styleName: "当代艺术粗野主义", journey: "展览海报墙 / 动态装置",
    layout: "brutal", theme: themes.red, chartKind: "blocks", shape: "form",
    eyebrow: "EXHIBITION STUDY / 03", audience: "当代艺术展览与文化机构概念页",
    title: "红色不是装饰，是事件。", latinTitle: "FORM BREAKS THE ROOM.",
    intro: "硬边、粗线、冲突色与巨型编号把白盒子打破。图像不被温柔地摆放，而是直接占领网格。",
    signature: "破框红色展签", fontStatement: "Syne + Noto Sans SC + Red Hat Mono",
    quote: "如果一切都很和谐，作品就失去了抵抗。",
    details: [["SCALE", "巨型数字先建立展览的公共尺度"], ["TENSION", "红、黑、蓝形成不妥协的视觉冲突"], ["BODY", "人物动作把静态展签变成现场"]],
    images: images("red-form", [
      { label: "OBJECT", alt: "混凝土展厅里的大型红色与金属悬挂装置" },
      { label: "SURFACE", alt: "透明材料、红色颜料和钢索组成的装置细节" },
      { label: "BODY", alt: "强烈光影下身穿红色服装的舞者" }
    ]), luminance: [77, 128, 81]
  },
  {
    id: "orbital-grid", number: "04", shortTitle: "Orbital Grid", styleName: "未来航天科技", journey: "任务简报 / 轨道系统",
    layout: "command", theme: themes.orbital, chartKind: "line", shape: "orbit",
    eyebrow: "ORBITAL SYSTEM / 04", audience: "深科技、航天与数据平台概念页",
    title: "把地面，连接到轨道。", latinTitle: "ONE SYSTEM ABOVE THE HORIZON.",
    intro: "这不是用霓虹假装科技。卫星、碳纤维与控制室给每一层信息一个真实对象，橙色只负责关键状态。",
    signature: "轨道控制舷窗", fontStatement: "Chakra Petch + Noto Sans SC + Red Hat Mono",
    quote: "复杂系统最需要的，是一眼可辨的优先级。",
    details: [["ORBIT", "轨道弧线只解释空间关系"], ["MATERIAL", "碳纤维近景带来工程触感"], ["CONTROL", "数据界面以高密度但清晰的节奏组织"]],
    images: images("orbital-grid", [
      { label: "ORBIT", alt: "卫星掠过夜色地球上空" },
      { label: "SHELL", alt: "航天设备碳纤维外壳与管线特写" },
      { label: "CONTROL", alt: "操作员面向全球轨迹屏幕的深色控制室" }
    ]), luminance: [22, 41, 19]
  },
  {
    id: "corner-goods", number: "05", shortTitle: "Corner Goods", styleName: "温暖复古街角", journey: "街角商店 / 柜台故事",
    layout: "retro", theme: themes.corner, chartKind: "bars", shape: "stack",
    eyebrow: "NEIGHBORHOOD STUDY / 05", audience: "社区零售、餐饮与生活品牌概念页",
    title: "今天的好东西，就在街角。", latinTitle: "GOOD THINGS, CLOSE TO HOME.",
    intro: "旧纸张、手写价签般的节奏和晚灯颜色，让页面像一家已经在这里很多年的小店。",
    signature: "街角票据拼贴", fontStatement: "Fraunces + ZCOOL QingKe HuangYou + Noto Sans SC",
    quote: "亲切不是做旧滤镜，而是让每个东西都有来处。",
    details: [["HELLO", "门店正面先建立人与地点的关系"], ["WEIGHT", "秤、陶碗和果实组成可信的日常细节"], ["HANDS", "人的动作让商品陈列不再像样板间"]],
    images: images("corner-goods", [
      { label: "STREET", alt: "傍晚暖灯下带自行车的社区杂货店门面" },
      { label: "COUNTER", alt: "木台上的柑橘、老式秤与条纹纸袋" },
      { label: "KEEPER", alt: "店员在绿色瓷砖背景前整理新鲜蔬果" }
    ]), luminance: [71, 67, 75]
  },
  {
    id: "still-day", number: "06", shortTitle: "Still Day", styleName: "柔和生活方式", journey: "安静日常 / 呼吸光体",
    layout: "soft", theme: themes.still, chartKind: "area", shape: "pebble",
    eyebrow: "MINDFUL ROUTINE / 06", audience: "健康、日记与轻生活应用概念页",
    title: "慢一点，日子会重新出现。", latinTitle: "MAKE SPACE FOR A QUIETER DAY.",
    intro: "柔光、圆角和浅紫只承担安定感，不拿空洞渐变代替内容。每张照片都对应一个可以被感知的日常动作。",
    signature: "漂浮日光胶囊", fontStatement: "Outfit + Noto Sans SC + Red Hat Mono",
    quote: "好的数字体验，也可以像把手机放下。",
    details: [["PAUSE", "大留白让信息主动降低音量"], ["TOUCH", "纸、石头与手势建立真实触感"], ["WALK", "最终把注意力带回屏幕之外"]],
    images: images("still-day", [
      { label: "MORNING", alt: "晨光桌面上的空白笔记本、清水与枝叶" },
      { label: "MAKE", alt: "双手在浅色纸张、石头和植物旁整理拼贴" },
      { label: "WALK", alt: "背帆布袋的人走在阳光与绿荫间" }
    ]), luminance: [155, 147, 120]
  },
  {
    id: "atelier-noir", number: "07", shortTitle: "Atelier Noir", styleName: "奢侈时装编辑", journey: "横向 Lookbook / 流动材质",
    layout: "luxury", theme: themes.atelier, chartKind: "line", shape: "ribbon",
    eyebrow: "ATELIER STUDY / 07", audience: "时装、珠宝与高端品牌概念页",
    title: "克制，才让材质发声。", latinTitle: "CUT BY LIGHT. HELD BY FORM.",
    intro: "黑色不是背景色，而是控制注意力的舞台。高反差衬线、贴肤金属和石材楼梯构成一段不急于解释的叙事。",
    signature: "黑金杂志跨页", fontStatement: "Bodoni Moda + Cormorant Garamond + Noto Serif SC",
    quote: "奢侈感来自选择的准确，不来自元素的数量。",
    details: [["CUT", "锋利轮廓先说出品牌姿态"], ["SKIN", "珠宝特写把尺度拉到最私密的位置"], ["SPACE", "建筑留白把衣料的流动放大"]],
    images: images("atelier-noir", [
      { label: "SILHOUETTE", alt: "浅色石墙前身穿黑色结构西装的模特" },
      { label: "OBJECT", alt: "深色皮肤、白色织物与银色项圈的局部特写" },
      { label: "MOVEMENT", alt: "米色石材旋梯上流动的白色长裙" }
    ]), luminance: [104, 50, 82]
  },
  {
    id: "neon-rift", number: "08", shortTitle: "Neon Rift", styleName: "赛博娱乐", journey: "沉浸入口 / 粒子裂隙",
    layout: "cyber", theme: themes.neon, chartKind: "blocks", shape: "rift",
    eyebrow: "LIVE EXPERIENCE / 08", audience: "游戏、电竞与数字娱乐概念页",
    title: "进入裂隙，规则重新加载。", latinTitle: "ENTER THE RIFT.",
    intro: "紫蓝光、透明控制器和巨构空间组成同一条世界观。界面像入口，不像贴满发光按钮的设备面板。",
    signature: "霓虹裂隙舞台", fontStatement: "Chakra Petch + Syne + Noto Sans SC + Red Hat Mono",
    quote: "氛围不是特效总量，而是每一层都相信同一个世界。",
    details: [["LIVE", "人物与场馆建立事件正在发生的尺度"], ["INPUT", "控制器特写让交互拥有物理入口"], ["WORLD", "巨构空间承担想象，不挤压真实操作"]],
    images: images("neon-rift", [
      { label: "ARENA", alt: "紫蓝灯光电竞场馆中走过舞台的人" },
      { label: "INPUT", alt: "霓虹灯下透明游戏控制器的细节" },
      { label: "RIFT", alt: "人物站在紫蓝色未来巨构裂隙前" }
    ]), luminance: [40, 41, 54]
  },
  {
    id: "shanshui-now", number: "09", shortTitle: "Shanshui Now", styleName: "当代新中式", journey: "当代长卷 / 云山视差",
    layout: "ink", theme: themes.ink, chartKind: "area", shape: "fold",
    eyebrow: "CONTEMPORARY CULTURE / 09", audience: "文化空间、展览与东方生活方式概念页",
    title: "山水不是旧图案，是今天的空间。", latinTitle: "TRADITION, STILL IN MOTION.",
    intro: "夯土、宣纸、青铜与竹影被放进当代建筑尺度。页面保留东方留白，也拒绝把文化缩成几个符号。",
    signature: "墨迹空间长卷", fontStatement: "Noto Serif SC + Cormorant Garamond + Red Hat Mono",
    quote: "传统真正活着的时候，不需要穿上仿古外壳。",
    details: [["VOID", "留白不是空，而是控制观看速度"], ["TRACE", "纸纤维与青铜纹样连接时间尺度"], ["GARDEN", "建筑、竹影和水面完成当代语境"]],
    images: images("shanshui-now", [
      { label: "HALL", alt: "夯土展厅中人物观看悬浮的红色纱质装置" },
      { label: "TRACE", alt: "红黑墨迹宣纸与古铜器纹样的近景" },
      { label: "COURT", alt: "竹林、水面与黑白建筑围合的安静庭院" }
    ]), luminance: [45, 94, 76]
  },
  {
    id: "grid-01", number: "10", shortTitle: "Grid 01", styleName: "瑞士国际主义", journey: "建筑档案 / 分解模型",
    layout: "swiss", theme: themes.swiss, chartKind: "bars", shape: "grid",
    eyebrow: "INTERNATIONAL STUDY / 10", audience: "建筑事务所、设计机构与公共文化概念页",
    title: "网格不是限制，是共同语言。", latinTitle: "ORDER MAKES THE IMAGE LOUDER.",
    intro: "红、蓝、黑和严格坐标把内容组织得像一张公共海报。照片可以大胆，信息仍然一眼找到。",
    signature: "十二列公共海报", fontStatement: "Archivo + Noto Sans SC + Red Hat Mono",
    quote: "最自由的画面，往往站在最清楚的结构上。",
    details: [["AXIS", "十二列网格明确每块信息的责任"], ["SIGNAL", "原色只用于关键坐标与行动"], ["SERIES", "三张照片用重复比例建立公共秩序"]],
    images: images("grid-01", [
      { label: "FIELD", alt: "蓝天下白色几何建筑前身穿红衣的人" },
      { label: "DETAIL", alt: "红色几何家具与金属构件的俯视构图" },
      { label: "SYSTEM", alt: "白色柱廊中排列整齐的黑蓝座椅" }
    ]), luminance: [122, 114, 101]
  }
];

export const galleryPage = {
  id: "gallery", number: "00", shortTitle: "UI Done Gallery", styleName: "十种设计方向",
  layout: "gallery", theme: themes.gallery, chartKind: "blocks", shape: "gallery",
  eyebrow: "UI DONE / TEN VISUAL DIRECTIONS", audience: "给第一次看到 UI Done 的人",
  title: "同一句“做帅一点”，可以有十种完全不同的答案。",
  latinTitle: "ONE SKILL. TEN WORLDS.",
  intro: "每个作品都有真实图片、独立开源字体、自己的版式与空间语言；共用的是 React、Ant Design 和一套完整的前端能力边界。",
  signature: "十风格视觉索引", fontStatement: "Big Shoulders + Outfit + Noto Sans SC + Red Hat Mono",
  chartTitle: "十个世界的真实光线分布",
  chartSummary: "每个数值来自对应三张本地 WebP 的逐像素平均明度。它只比较这套展示资产的明暗气质，不冒充品牌经营数据。",
  chartData: showcasePages.map(page => ({
    label: page.shortTitle,
    value: Math.round(page.luminance.reduce((sum, value) => sum + value, 0) / page.luminance.length),
    group: page.styleName
  }))
};

export const allPages = [galleryPage, ...showcasePages];

export function getPageConfig(id) {
  return allPages.find(page => page.id === id) || galleryPage;
}
