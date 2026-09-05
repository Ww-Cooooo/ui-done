export const capabilities = [
  ["UI", "React + Ant Design"],
  ["MOTION", "Anime.js"],
  ["SCROLL", "Lenis"],
  ["3D", "Three.js + R3F / selective"],
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
    ink: "#f4f1e8", muted: "#a7abb2", accent: "#ff5a36", accent2: "#a8ffcf", onAccent: "#0b0c0e",
    line: "rgba(244,241,232,.18)", display: "Big Shoulders", body: "Outfit", cjk: sansCjk, mono
  },
  velocity: {
    mode: "dark", bg: "#0b1117", surface: "#131c24", surfaceAlt: "#1c2833",
    ink: "#f3f7f8", muted: "#8fa2b2", accent: "#d8ff3e", accent2: "#70a7d9", onAccent: "#0b1117",
    line: "rgba(216,255,62,.22)", display: "Big Shoulders", body: "Outfit", cjk: sansCjk, mono
  },
  coast: {
    mode: "light", bg: "#e7e4dc", surface: "#f4f1e8", surfaceAlt: "#cbc6ba",
    ink: "#253032", muted: "#697476", accent: "#b55d3d", accent2: "#6f8d8a", onAccent: "#ffffff", accentHover: "#9f4c31", accentActive: "#843c27",
    line: "rgba(37,48,50,.2)", display: "Cormorant Garamond", body: "Cormorant Garamond", cjk: serifCjk, mono
  },
  red: {
    mode: "light", bg: "#e8e5df", surface: "#f7f3eb", surfaceAlt: "#d2cec6",
    ink: "#101010", muted: "#535353", accent: "#e41d16", accent2: "#1d5fff", onAccent: "#ffffff", accentHover: "#c81812", accentActive: "#a8100d",
    line: "rgba(16,16,16,.76)", display: "Syne", body: "Syne", cjk: sansCjk, mono
  },
  orbital: {
    mode: "dark", bg: "#02070d", surface: "#07131f", surfaceAlt: "#0b2032",
    ink: "#e8f4ff", muted: "#7690a6", accent: "#ffb52b", accent2: "#3fb7ff", onAccent: "#02070d",
    line: "rgba(63,183,255,.22)", display: "Chakra Petch", body: "Outfit", cjk: sansCjk, mono
  },
  corner: {
    mode: "light", bg: "#e8d1a7", surface: "#f3e3bf", surfaceAlt: "#d49b66",
    ink: "#3e241a", muted: "#765b4d", accent: "#bd3c28", accent2: "#356858", onAccent: "#ffffff", accentHover: "#a12f20", accentActive: "#852619",
    line: "rgba(62,36,26,.24)", display: "Fraunces", body: "Outfit", cjk: sansCjk, displayCjk: "ZCOOL QingKe HuangYou", mono
  },
  still: {
    mode: "light", bg: "#f2eee7", surface: "#fbf8f2", surfaceAlt: "#dfd7e5",
    ink: "#4c4651", muted: "#817987", accent: "#8b6ccf", accent2: "#819d73", onAccent: "#111014",
    line: "rgba(76,70,81,.13)", display: "Outfit", body: "Outfit", cjk: sansCjk, mono
  },
  atelier: {
    mode: "dark", bg: "#0d0b0a", surface: "#171310", surfaceAlt: "#28201a",
    ink: "#f3e7d6", muted: "#a69788", accent: "#d6a96f", accent2: "#e9d9c4", onAccent: "#0d0b0a",
    line: "rgba(243,231,214,.2)", display: "Bodoni Moda", body: "Cormorant Garamond", cjk: serifCjk, mono
  },
  neon: {
    mode: "dark", bg: "#050313", surface: "#0d0924", surfaceAlt: "#17103d",
    ink: "#f6efff", muted: "#9a8eb5", accent: "#ff3bd4", accent2: "#43d9ff", onAccent: "#050313",
    line: "rgba(112,72,255,.32)", display: "Chakra Petch", body: "Syne", cjk: sansCjk, mono
  },
  ink: {
    mode: "light", bg: "#e8e0d1", surface: "#f5efe5", surfaceAlt: "#cfc1aa",
    ink: "#221c17", muted: "#74695c", accent: "#a82d25", accent2: "#776245", onAccent: "#ffffff", accentHover: "#8d231d", accentActive: "#741c18",
    line: "rgba(34,28,23,.2)", display: "Cormorant Garamond", body: "Noto Serif SC", cjk: serifCjk, mono
  },
  swiss: {
    mode: "light", bg: "#e9e9e5", surface: "#f8f8f4", surfaceAlt: "#d3d4d1",
    ink: "#101214", muted: "#60656a", accent: "#ee2b21", accent2: "#1249ba", onAccent: "#090a0b",
    line: "rgba(16,18,20,.28)", display: "Archivo", body: "Archivo", cjk: sansCjk, mono
  }
};

function images(id, items) {
  return items.map((item, index) => ({ ...item, src: `../assets/${id}/0${index + 1}.webp` }));
}

export const showcasePages = [
  {
    id: "velocity-works", number: "01", shortTitle: "Velocity Works", styleName: "运动性能", journey: "教练复盘舱 / 触地轨迹",
    layout: "velocity", theme: themes.velocity, shape: "velocity",
    product: { mode: "work", type: "训练分析", role: "跑步教练", verb: "分析", ia: "训练列 / 回放轨迹 / 负荷趋势 / 原位复盘", loop: "选择训练 → 比较负荷与触地 → 原位写复盘 → 标记完成", data: "页面内演示训练记录", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 0 } },
    eyebrow: "COACHING DESK / 01", audience: "教练与训练团队的分析工作台",
    title: "下一秒，从这次复盘开始。", latinTitle: "READ THE RUN. SHAPE THE NEXT ONE.",
    intro: "把训练负荷、节奏变化和待复盘记录放在同一工作面上，让教练从筛选直接走到判断与记录。",
    signature: "三栏训练复盘轨迹", fontStatement: "Big Shoulders + Noto Sans SC + Red Hat Mono",
    quote: "动作发生以前，界面已经把方向说清楚。",
    details: [["PACE", "倾斜轴线让阅读像一次起跑"], ["GRIP", "局部材质承担产品可信度"], ["AIR", "留白和冷蓝压住速度噪音"]],
    images: images("velocity-works", [
      { label: "MOTION", alt: "雨后跑道上向前冲刺的运动员" },
      { label: "MATERIAL", alt: "带水珠的黑色跑鞋织物与鞋带特写" },
      { label: "SPACE", alt: "阴天混凝土建筑下独自训练的跑者" }
    ])
  },
  {
    id: "north-tide", number: "02", shortTitle: "North Tide", styleName: "海岸自然编辑", journey: "阈值滚动章节 / 扩张海岸影像",
    layout: "editorial", theme: themes.coast, shape: "tide",
    product: { mode: "expressive", type: "自然编辑专题", role: "旅行与自然读者", verb: "探索", ia: "编辑封面 / 摄影叙事 / 海面章节", loop: "沿专题阅读海岸章节", data: "摄影与编辑文字", coverage: { filter: 0, visualization: 0, detail: 0, form: 0, state: 0, spatial: 1 } },
    spatial3d: { role: "连续水面、天气与地平线的空间关系" },
    eyebrow: "COASTAL JOURNAL / 02", audience: "旅行杂志与自然观察概念页",
    title: "沿着风，走到陆地尽头。", latinTitle: "THE SEA KEEPS ITS OWN TIME.",
    intro: "没有旅游海报的甜味，只有风、盐、岩层和雾。缓慢的衬线字与横向留白把海岸写成一篇长文章。",
    signature: "滚动扩张海岸章节", fontStatement: "Cormorant Garamond + Noto Serif SC + Red Hat Mono",
    quote: "真正的远方，不需要把颜色调得更响。",
    details: [["WIND", "宽行距给海风留下经过的空间"], ["SALT", "岩石微距成为整页的触觉锚点"], ["FOG", "低饱和图像维持安静的叙事温度"]],
    images: images("north-tide", [
      { label: "PATH", alt: "穿浅色外套的人沿海岸草坡走向远方" },
      { label: "TIDE", alt: "海浪冲刷带贝壳和藤壶的深色岩石" },
      { label: "SHELTER", alt: "雾中坐落在海崖上的白色圆顶建筑" }
    ])
  },
  {
    id: "red-form", number: "03", shortTitle: "Red Form", styleName: "当代艺术粗野主义", journey: "四展室切换 / 描线硬切",
    layout: "brutal", theme: themes.red, shape: "form",
    product: { mode: "expressive", type: "当代艺术展览", role: "展览观众", verb: "观看", ia: "展室索引 / 占幅作品 / 策展展签", loop: "切换四间展室并逐件观看", data: "展览视觉与策展文字", coverage: { filter: 0, visualization: 0, detail: 0, form: 0, state: 0, spatial: 1 } },
    spatial3d: { role: "一体成型的当代雕塑与展场光线" },
    eyebrow: "EXHIBITION STUDY / 03", audience: "当代艺术展览与文化机构概念页",
    title: "红色不是装饰，是事件。", latinTitle: "FORM BREAKS THE ROOM.",
    intro: "硬边、粗线、冲突色与巨型编号把白盒子打破。图像不被温柔地摆放，而是直接占领网格。",
    signature: "四室硬切展台", fontStatement: "Syne + Noto Sans SC + Red Hat Mono",
    quote: "如果一切都很和谐，作品就失去了抵抗。",
    details: [["SCALE", "巨型数字先建立展览的公共尺度"], ["TENSION", "红、黑、蓝形成不妥协的视觉冲突"], ["BODY", "人物动作把静态展签变成现场"]],
    images: images("red-form", [
      { label: "OBJECT", alt: "混凝土展厅里的大型红色与金属悬挂装置" },
      { label: "SURFACE", alt: "透明材料、红色颜料和钢索组成的装置细节" },
      { label: "BODY", alt: "强烈光影下身穿红色服装的舞者" }
    ])
  },
  {
    id: "orbital-grid", number: "04", shortTitle: "Orbital Grid", styleName: "未来航天科技", journey: "三舱值班台 / 扫描轨迹",
    layout: "command", theme: themes.orbital, shape: "orbit",
    product: { mode: "work", type: "轨道运营监控", role: "值班控制员", verb: "处置", ia: "告警队列 / 轨道视窗 / 遥测 / 原位指令槽", loop: "选择告警 → 核对轨道与遥测 → 装填指令 → 确认处置", data: "页面内演示遥测与告警记录", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 1 } },
    spatial3d: { role: "地球、轨道与完整航天器的真实空间关系" },
    eyebrow: "ORBITAL OPS / 04", audience: "轨道任务值班控制台",
    title: "先看清异常，再发出处置。", latinTitle: "ONE ORBIT. CLEAR PRIORITIES.",
    intro: "轨道位置、链路遥测和告警队列处在同一任务上下文，橙色只标记需要值班员立即判断的状态。",
    signature: "三舱轨道处置台", fontStatement: "Chakra Petch + Noto Sans SC + Red Hat Mono",
    quote: "复杂系统最需要的，是一眼可辨的优先级。",
    details: [["ORBIT", "轨道弧线只解释空间关系"], ["MATERIAL", "碳纤维近景带来工程触感"], ["CONTROL", "数据界面以高密度但清晰的节奏组织"]],
    images: images("orbital-grid", [
      { label: "ORBIT", alt: "卫星掠过夜色地球上空" },
      { label: "SHELL", alt: "航天设备碳纤维外壳与管线特写" },
      { label: "CONTROL", alt: "操作员面向全球轨迹屏幕的深色控制室" }
    ])
  },
  {
    id: "corner-goods", number: "05", shortTitle: "Corner Goods", styleName: "温暖复古街角", journey: "货架与连续小票 / 盖章补货",
    layout: "retro", theme: themes.corner, shape: "stack",
    product: { mode: "work", type: "门店经营", role: "社区店长", verb: "补货", ia: "经营摘要 / 库存与订单 / 筛选 / 补货", loop: "找到低库存 → 填写补货 → 提交 → 库存更新", data: "页面内演示库存与订单记录", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 0 } },
    eyebrow: "STORE DESK / 05", audience: "社区门店的库存与订单工作台",
    title: "先把缺的补上，再安心开门。", latinTitle: "GOOD STOCK. GOOD DAY.",
    intro: "保留街角小店的温度，把低库存、今日销量和补货动作整理成店长一眼能做完的经营流程。",
    signature: "连续补货小票", fontStatement: "Fraunces + ZCOOL QingKe HuangYou + Noto Sans SC",
    quote: "亲切不是做旧滤镜，而是让每个东西都有来处。",
    details: [["HELLO", "门店正面先建立人与地点的关系"], ["WEIGHT", "秤、陶碗和果实组成可信的日常细节"], ["HANDS", "人的动作让商品陈列不再像样板间"]],
    images: images("corner-goods", [
      { label: "STREET", alt: "傍晚暖灯下带自行车的社区杂货店门面" },
      { label: "COUNTER", alt: "木台上的柑橘、老式秤与条纹纸袋" },
      { label: "KEEPER", alt: "店员在绿色瓷砖背景前整理新鲜蔬果" }
    ])
  },
  {
    id: "still-day", number: "06", shortTitle: "Still Day", styleName: "柔和生活方式", journey: "日期轴与时间河 / 习惯轨道",
    layout: "soft", theme: themes.still, shape: "pebble",
    product: { mode: "work", type: "日程与习惯计划", role: "个人使用者", verb: "安排", ia: "日期脊柱 / 时间河 / 原位编辑 / 习惯环", loop: "选择日期 → 原位新增安排或完成习惯 → 节奏与周趋势更新", data: "页面内演示日程与习惯记录", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 0 } },
    eyebrow: "DAILY PLANNER / 06", audience: "个人日程与习惯计划应用",
    title: "今天不必塞满，但要看得清。", latinTitle: "A QUIETER PLAN FOR TODAY.",
    intro: "日历、今日清单和习惯进度共同服务一个安静的计划动作；浅紫和柔光负责降低噪音，而不是代替内容。",
    signature: "时间河与习惯轨道", fontStatement: "Outfit + Noto Sans SC + Red Hat Mono",
    quote: "好的数字体验，也可以像把手机放下。",
    details: [["PAUSE", "大留白让信息主动降低音量"], ["TOUCH", "纸、石头与手势建立真实触感"], ["WALK", "最终把注意力带回屏幕之外"]],
    images: images("still-day", [
      { label: "MORNING", alt: "晨光桌面上的空白笔记本、清水与枝叶" },
      { label: "MAKE", alt: "双手在浅色纸张、石头和植物旁整理拼贴" },
      { label: "WALK", alt: "背帆布袋的人走在阳光与绿荫间" }
    ])
  },
  {
    id: "atelier-noir", number: "07", shortTitle: "Atelier Noir", styleName: "奢侈时装编辑", journey: "胶片列与拖拽对比 / 固定审阅台",
    layout: "luxury", theme: themes.atelier, shape: "ribbon",
    product: { mode: "work", type: "创意审阅与审批", role: "创意负责人", verb: "审批", ia: "胶片列 / 拖拽前后对比 / 批注 / 固定审批台", loop: "选择画面 → 拖拽比较版本 → 批注或批准 → 就绪度更新", data: "页面内演示素材、版本与批注", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 0 } },
    eyebrow: "CREATIVE REVIEW / 07", audience: "时装系列的创意审阅工作区",
    title: "把注意力留给这一版。", latinTitle: "REVIEW THE CUT. DECIDE THE RELEASE.",
    intro: "主素材、版本差异、团队批注和发布判断围绕同一画面展开；黑色舞台只负责让材质与决定更清楚。",
    signature: "胶片拖拽审阅", fontStatement: "Bodoni Moda + Cormorant Garamond + Noto Serif SC",
    quote: "奢侈感来自选择的准确，不来自元素的数量。",
    details: [["CUT", "锋利轮廓先说出品牌姿态"], ["SKIN", "珠宝特写把尺度拉到最私密的位置"], ["SPACE", "建筑留白把衣料的流动放大"]],
    images: images("atelier-noir", [
      { label: "SILHOUETTE", alt: "浅色石墙前身穿黑色结构西装的模特" },
      { label: "OBJECT", alt: "深色皮肤、白色织物与银色项圈的局部特写" },
      { label: "MOVEMENT", alt: "米色石材旋梯上流动的白色长裙" }
    ])
  },
  {
    id: "neon-rift", number: "08", shortTitle: "Neon Rift", styleName: "赛博娱乐", journey: "三阶段入口 / 能量脉冲",
    layout: "cyber", theme: themes.neon, shape: "rift",
    product: { mode: "expressive", type: "沉浸娱乐入口", role: "活动与游戏观众", verb: "进入", ia: "入口阶段 / 光场 / 能量脉冲 / 行动", loop: "经过 GATE、ARENA、INPUT 三阶段进入世界", data: "原创活动视觉", coverage: { filter: 0, visualization: 0, detail: 0, form: 0, state: 0, spatial: 1 } },
    spatial3d: { role: "粒子裂隙的纵深、速度与入口尺度" },
    eyebrow: "LIVE EXPERIENCE / 08", audience: "游戏、电竞与数字娱乐概念页",
    title: "进入裂隙，规则重新加载。", latinTitle: "ENTER THE RIFT.",
    intro: "紫蓝光、透明控制器和巨构空间组成同一条世界观。界面像入口，不像贴满发光按钮的设备面板。",
    signature: "三阶段能量入口", fontStatement: "Chakra Petch + Syne + Noto Sans SC + Red Hat Mono",
    quote: "氛围不是特效总量，而是每一层都相信同一个世界。",
    details: [["LIVE", "人物与场馆建立事件正在发生的尺度"], ["INPUT", "控制器特写让交互拥有物理入口"], ["WORLD", "巨构空间承担想象，不挤压真实操作"]],
    images: images("neon-rift", [
      { label: "ARENA", alt: "紫蓝灯光电竞场馆中走过舞台的人" },
      { label: "INPUT", alt: "霓虹灯下透明游戏控制器的细节" },
      { label: "RIFT", alt: "人物站在紫蓝色未来巨构裂隙前" }
    ])
  },
  {
    id: "shanshui-now", number: "09", shortTitle: "Shanshui Now", styleName: "当代新中式", journey: "横向卷轴 / 书写显影",
    layout: "ink", theme: themes.ink, shape: "fold",
    product: { mode: "expressive", type: "文化叙事长卷", role: "文化读者", verb: "阅读", ia: "横向卷首 / 纹理追踪 / 当代庭院", loop: "滚轮、拖动或键盘横向展开三段长卷", data: "摄影与文化文字", coverage: { filter: 0, visualization: 0, detail: 0, form: 0, state: 0, spatial: 0 } },
    eyebrow: "CONTEMPORARY CULTURE / 09", audience: "文化空间、展览与东方生活方式概念页",
    title: "山水不是旧图案，是今天的空间。", latinTitle: "TRADITION, STILL IN MOTION.",
    intro: "夯土、宣纸、青铜与竹影被放进当代建筑尺度。页面保留东方留白，也拒绝把文化缩成几个符号。",
    signature: "横向墨迹长卷", fontStatement: "Noto Serif SC + Cormorant Garamond + Red Hat Mono",
    quote: "传统真正活着的时候，不需要穿上仿古外壳。",
    details: [["VOID", "留白不是空，而是控制观看速度"], ["TRACE", "纸纤维与青铜纹样连接时间尺度"], ["GARDEN", "建筑、竹影和水面完成当代语境"]],
    images: images("shanshui-now", [
      { label: "HALL", alt: "夯土展厅中人物观看悬浮的红色纱质装置" },
      { label: "TRACE", alt: "红黑墨迹宣纸与古铜器纹样的近景" },
      { label: "COURT", alt: "竹林、水面与黑白建筑围合的安静庭院" }
    ])
  },
  {
    id: "grid-01", number: "10", shortTitle: "Grid 01", styleName: "瑞士国际主义", journey: "坐标蓝图 / 热点与状态轨",
    layout: "swiss", theme: themes.swiss, shape: "grid",
    product: { mode: "work", type: "建筑项目协作", role: "建筑团队", verb: "推进", ia: "专业筛选 / 坐标热点 / 锚定记录 / 横向状态轨", loop: "筛选专业 → 选择坐标热点 → 写协同记录 → 推进状态轨", data: "页面内演示建筑问题记录", coverage: { filter: 1, visualization: 1, detail: 1, form: 1, state: 1, spatial: 1 } },
    spatial3d: { role: "一体化曲面壳体与连续协作路径的空间关系" },
    eyebrow: "PROJECT BOARD / 10", audience: "建筑与工程团队的协作看板",
    title: "问题归位，项目才会向前。", latinTitle: "ORDER MOVES THE PROJECT.",
    intro: "用红、蓝、黑和严格坐标组织专业、楼层、负责人和状态；模型负责定位问题，看板负责把问题真正推进。",
    signature: "坐标热点协作板", fontStatement: "Archivo + Noto Sans SC + Red Hat Mono",
    quote: "最自由的画面，往往站在最清楚的结构上。",
    details: [["AXIS", "十二列网格明确每块信息的责任"], ["SIGNAL", "原色只用于关键坐标与行动"], ["SERIES", "三张照片用重复比例建立公共秩序"]],
    images: images("grid-01", [
      { label: "FIELD", alt: "蓝天下白色几何建筑前身穿红衣的人" },
      { label: "DETAIL", alt: "红色几何家具与金属构件的俯视构图" },
      { label: "SYSTEM", alt: "白色柱廊中排列整齐的黑蓝座椅" }
    ])
  }
];

export const galleryPage = {
  id: "gallery", number: "00", shortTitle: "UI Done Gallery", styleName: "十种产品与视觉方向",
  layout: "gallery", theme: themes.gallery, chartKind: "matrix", shape: "gallery",
  product: { mode: "index", type: "产品与视觉索引", role: "第一次看到 UI Done 的人", verb: "比较", ia: "任务入口 / 类型筛选 / 能力矩阵 / 作品", loop: "选择产品类型 → 比较能力 → 进入作品", data: "十个路由的实际实现元数据", coverage: { filter: 1, visualization: 1, detail: 1, form: 0, state: 1, spatial: 0 } },
  eyebrow: "UI DONE / PRODUCT RANGE", audience: "给第一次看到 UI Done 的人",
  title: "不只把页面做漂亮，也把工作做完整。",
  latinTitle: "ONE SKILL. REAL WORK. DISTINCT WORLDS.",
  intro: "六个页面直接承担分析、监控、经营、计划、审阅和协作；四个页面继续负责编辑、展览、娱乐与文化叙事。视觉风格是第二维度，不再代替产品任务。",
  signature: "产品任务与视觉双轴索引", fontStatement: "Big Shoulders + Outfit + Noto Sans SC + Red Hat Mono",
  chartTitle: "十个页面实际覆盖哪些工作能力",
  chartSummary: "矩阵来自当前路由配置与已实现交互：亮格表示页面真实拥有该能力，暗格表示没有。它不使用虚构经营指标，也不把表达页硬改成看板。",
  chartData: showcasePages.flatMap(page => [
    ["筛选", page.product.coverage.filter],
    ["可视化", page.product.coverage.visualization],
    ["详情", page.product.coverage.detail],
    ["表单", page.product.coverage.form],
    ["状态反馈", page.product.coverage.state],
    ["空间上下文", page.product.coverage.spatial]
  ].map(([capability, value]) => ({ label: page.shortTitle, capability, value, group: page.product.type })))
};

export const allPages = [galleryPage, ...showcasePages];

export function getPageConfig(id) {
  return allPages.find(page => page.id === id) || galleryPage;
}
