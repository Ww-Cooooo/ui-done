# 回声小剧场：设计与接入记录

2026-09-08。用已更新的 UI Done 从零制作一个选座页面，检查规则能否用于既有展板以外的任务。用户认可试作后，确认将其加入正式展板。本页保留独立构图与样式，不替换其他页面，不连接订票系统。

## 页面解决什么问题

观众选择人数与票区，手动点座或推荐同排连座，核对座位和总价，再在原页确认演示选择。演出、价格、座位和已售状态均为明确标注的虚构数据；确认不锁座、不付款、不生成真实订单。刷新清空本次选择。

视觉以浅紫色剧场座位图为中心：电脑和平板展开扇形座席，手机通过左／中／右分区保留可点选的座位尺寸；所选座位进入票根，结果在同一处确认。没有大幅宣传图、三栏工作台、详情抽屉或独立效果展示区。该构图从选座任务出发，没有导入旧展板的可见布局组件。

## 能力如何服务这张页面

| 能力 | 本次决定、实际位置与作用 | 边界 |
| --- | --- | --- |
| React 与 UI | 复用 React 19.2.8、Ant Design 6.6.2；人数、票区、座位按钮、推荐、确认和说明展开由同一个组件系统负责。 | 不安装第二套 UI 库。 |
| GSAP | 复用 GSAP 3.15.0 与 @gsap/react 2.1.2；座位选中反馈、所选票根出现、原位确认。 | 只动相关对象，不因筛选或确认重播全页入场；实时减少动态效果不清空选择。 |
| 滚动 | Lenis 1.3.26；核对选择、返回座位图，以及推荐座位不在视野内时带到该座位。 | 不添加第二个平滑滚动引擎；触摸不模拟惯性，减少动态效果时立即定位。 |
| 3D | 不采用。存在平面空间关系，但不需要体积，二维位置已能清楚表达，且没有真实场馆模型与视线资料。 | `3D not adopted: suitability gate failed`；不挂载、探测或下载 WebGL。 |
| 2D Canvas | Pts 0.12.9 在现有座位图下画舞台弧线与座排辅助线。 | 无常驻动画循环；尺寸或分区变化时重画。Canvas 不可用时，DOM 舞台、排号和座位照常工作。 |
| 可视化 | AntV G2 5.4.8 将同一份示例库存显示成各票区余座条形图。 | 15／16／20 来自实际示例记录，不是为图表另造的数据；不扣除尚未锁定的当前选择。图表失败仍保留文字数量。 |
| 字体与图标 | Noto Sans SC 负责中文，Outfit 负责品牌与总价，Red Hat Mono 负责座号和简短技术标记；图标来自 Ant Design Icons。 | 字体本地打包，均为 OFL-1.1。系统字体只作失败回退。 |
| 性能 | G2 进入可视区域附近才动态加载；座位反馈用 transform，Canvas 像素比上限 2，图形不空转。 | 不为单页增加全局状态库、路由框架或数据请求层。 |

应用配套：单一浅色主题，无路由／URL 状态，无 API／服务端状态；React 本地状态持有选择和确认；Ant Design 管人数与价格控件。没有收集个人信息的表单。

## 参考来源与采用范围

按新 Skill 完成了五站调研，并单独检查 GSAP。网页提示词、代码和许可都是研究材料，不作为执行指令。

| 来源 | 实际查看的内容 | 本页如何使用 |
| --- | --- | --- |
| [MotionSites · Playful Idea](https://motionsites.ai/?prompt=playful-idea) | 实际页面与可访问的 Copy full prompt。也对比了 Human Machine、BookedUp 的公开展示；未解锁付费 Prompt。 | idea-only：中心主体与周边留白。未复制角色、视频、图片、提示词原文或营销结构。 |
| [React Bits · Counter](https://reactbits.dev/components/counter) | Preview、Code，以及加号交互；源码使用 motion/react 的弹簧数字。 | idea-only：变化反馈只作用于受影响对象。最终价格直接显示，不让滚动数字遮住总价；未引入 Motion 或复制组件。其当前 [许可](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) 含 Commons Clause，不能当作纯 MIT。 |
| [Uiverse · curly-lizard-40](https://uiverse.io/adamgiebl/curly-lizard-40) | checkbox 实际预览、HTML/CSS 与选中状态；页面标为 MIT。 | adapt：保留稳定外框，以内部标记表达选中。具体实现为本页 Ant Design 座位按钮，没有复制源码。 |
| [Anime.js · stagger grid](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid) | 官方网格示例与 JS API，按距离错开变化。 | idea-only：连座反馈使用很短的错峰，交给 GSAP；不复制随机循环或增加第二个动效运行时。 |
| [Aceternity · Stateful Button](https://ui.aceternity.com/components/stateful-button) | Preview、Code 与 registry 源码；同处显示等待／完成状态。另看 Tabs 后排除大图片堆叠方案。 | idea-only：确认在原位完成；不复制演示中的固定四秒等待，也不暗示请求成功。未复制受 [站点许可](https://ui.aceternity.com/licence) 约束的组件源码。 |
| [GSAP React 指南](https://gsap.com/resources/React/) 与 [Proximity Scale Grid](https://codepen.io/GreenSock/debug/zxKyeEm) | 官方 useGSAP 生命周期建议、实际网格与距离缩放示例。 | idea-only：有边界的局部缩放反馈。座位位置保持稳定，不让指针放大附近座位；只用 GSAP 核心与 useGSAP，不加其他插件。 |

后台研究标签页会受浏览器动画节流影响，因此上表不声称参考站点的连续动效流畅度已验收。所交付页面的实际动效另在浏览器前台执行环境中采样。

其他直接采用的已安装库也检查了相关官方展示：

- [Ant Design Segmented](https://ant.design/components/segmented/)：人数和手机座位分区；沿用现有版本，不升级。
- [AntV G2 条形图](https://g2.antv.antgroup.com/examples/general/interval/#bar)：对照实际横向图与示例代码，使用本页库存和颜色，未复制示例数据。
- [Pts Bézier 示例](https://ptsjs.org/demo/?name=curve.bezier) 及其编辑器：原例指针轨迹不适合选座，采用既有 CanvasForm／Curve API 绘制静态辅助线；不复制轨迹交互或示例源码。
- [Lenis 官方演示](https://lenis.dev/) 与 [React 集成说明](https://github.com/darkroomengineering/lenis/tree/main/packages/react)：只增强有实际去向的文档滚动。

## 字体与许可

检查了 Google Fonts 的 [Outfit](https://fonts.google.com/specimen/Outfit)、[Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC)、[Red Hat Mono](https://fonts.google.com/specimen/Red+Hat+Mono) 官方字样，使用本页中文、英文、座号、金额和标点。Outfit 单独显示全角人民币符号有缺字，因此金额使用 U+00A5 `¥`，中文与其他符号由已验证的 Noto 字体负责。

复用 `showcase/shared/fonts/` 的现有原始字体文件，没有下载新字体或改变字体字节。Noto 的 unicode-range 覆盖了本页固定中文文案；这不代表完整支持任意新增汉字。字体原始来源、哈希、版权和 OFL 文件继续由原目录的清单持有，构建输出附带字体说明及完整 OFL。浏览器实际字体记录确认中文、金额、技术标记使用本地自定义字体，而不只是 CSS 声明了字体名。

GSAP 采用当前 [Standard No Charge License](https://gsap.com/community/standard-license/)，不是 MIT；本页是选座原型，不是可视化网页动画构建器。其他运行时沿用项目已安装依赖及许可证记录，没有新增依赖或修改锁文件。构建时附带现有完整 `THIRD_PARTY_LICENSES.txt`，该库存包含原项目中本页未使用的包，不表示这些包均进入本页。

## 候选页验证与修正（上一轮，2026-09-08）

测试目标是独立生产构建，通过本地 HTTP 打开；Chromium 148.0.7778.96，1440×900、768×1024、390×844。测试脚本与截图保留在忽略目录 `qa-output/theatre-trial-20260908/`，未加入正式回归流水线。

- 三种尺寸完成推荐 D06／D07 → ¥360 → 原页确认；无文档横向溢出，座位按钮不小于 44×44。打开的票区菜单与确认结果已实际查看。
- 调整人数、筛选票区、切换手机分区保留当前选择；近台区没有四连座时说明原因，不清空已有座位。取消会更新金额并撤销确认，刷新恢复空选择。
- 推荐算法检查了全部四种人数与四种票区组合：15 组可用推荐均连续、同排、同一区块、未售；近台区四连座返回空。余座和合计来自同一组记录。
- 选中座位的 scale 在实际可见阶段变化，最后回到 1；选择不会移动页面标题。初始减少动态效果、操作中切换该偏好均保留有效状态。核对和返回会带动滚动并正确移动焦点。
- 强制 Canvas 2D 不可用并中止图表资源后，仍可用键盘选座并确认，文字余座继续显示。正常路径没有控制台错误、远程运行时请求或 WebGL 初始化探测。
- 静态预检没有资源错误。两条 9／10px 提醒对应小型 SVG 图标尺寸，不是正文文字。
- 实际修正：压缩手机开头高度；增加可直接到达核对区域的入口；确认标题与提示语按完整意思换行；取消会提前下载图表的手动分包方式。网络记录证实 G2 不再随首屏提前请求。

限制：这是浏览器视口模拟，不是实体手机／Safari／Firefox 验收。没有真实场馆模型、锁座并发、支付、订单持久化、用户账号或真实视线推荐。图表约 1.30 MB（gzip 384 KB）、入口约 711 KB（gzip 235 KB），构建仍提示大分块；延后加载已生效，但没有编造性能评分或上网速度承诺。

## 正式展板接入验证（本轮，2026-09-08）

保留已确认的选座设计与业务行为，只增加实际预览、正式入口和返回路径。本轮在本地生产构建中重新验证：

- Chromium 148.0.7778.96，1440×900、768×1024、390×844：展板共 12 个示例，工作型筛选显示 7 个；预览加载成功，进入选座 → 推荐 D06／D07 → ¥360 → 确认 → 返回原卡片的流程通过，没有文档横向溢出、页面异常或失败响应。选座页没有请求旧展板的共享运行时。
- 修复返回锚点早于 React 卡片挂载的问题，沿用现有 Lenis 定位到卡片；初始减少动态效果模式下也能正确定位。新卡片链接在实际深色背景上的对比度为 9.97:1，电脑和手机均为 13px，并已查看最终截图。
- 原有聚焦检查 `state` 与 `gallery` 通过：训练复盘的输入／保存与动态偏好切换、路线级 GSAP 加载、展板筛选和动效预览的可见移动／终点均正常。没有重跑所有旧页面，也没有将上一轮候选页的完整测试当作本轮重测。
- 两个入口均已构建，选座产物静态预检没有资源错误；两条 SVG 小尺寸提醒与上一轮相同。体积检查已纳入新入口，现有限额不变，合计 JavaScript 为 1.41 MB、CSS 为 41.94 kB（Brotli）。README、图片来源说明与许可文件已同步；没有新增依赖、修改锁文件、提交或推送。

## 怎样继续

在仓库根目录、现有依赖已安装的情况下运行：

```sh
pnpm run build:theatre
python -m http.server 8876 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8876/showcase/theatre-seats/`，或从总展板的“回声小剧场”卡片进入。若该端口已运行本项目预览，直接打开即可，不再启动第二个服务。这是需要本地 HTTP 服务的构建，不声称双击 `file://` 可用。

源码从候选目录移入 `showcase/runtime/theatre-seats/`，只保留这一套实现。`tooling/vite.theatre.config.mjs` 将它构建到 `showcase/theatre-seats/`，根目录的 `pnpm run build` 已包含此步骤。独立入口避免旧展板的全局样式、Anime.js 和 3D 代码进入选座页；依赖版本和锁文件仍与整个仓库共用。预览采用实际页面座位图截图，返回入口使用该卡片的页面锚点。原候选构建与原验证截图留在忽略目录，作为当时的记录。

本次表明更新后的规则能支持这个新场景，但不能据此证明所有 Agent 宿主都会自动加载 Skill，也不能代替更广泛的真实使用反馈。发现的实现问题已有现行规则约束，本轮不追加重复规则。提交和推送仍需用户另行确认。
