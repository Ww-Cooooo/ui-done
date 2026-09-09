<div align="center">

# UI Done

### 你用一句话描述页面，Agent 主动完成整套前端设计。

**UI Done 是给 AI 编程助手（Agent）安装的前端设计 Skill。**<br>
你说“帮我做一个有科技感的数据看板”，Agent 就要主动安排框架、组件、布局、字体、图表、素材与动效，并把它们做进页面。

**用户没点名，也要主动用；第一版就以完整、漂亮、可操作为目标。**

**[立即安装](#install)** · **[打开在线展板](https://ww-cooooo.github.io/ui-done/showcase/gallery/)** · **[看看全部案例](#examples)**

</div>

- **一句话就能开始。** 不用先学前端，也不用列组件、字体和动效清单。
- **默认积极采用。** 新页面和大改版，每类默认能力都安排实际用途；省略要有硬性理由，3D 单独判断。
- **首版就认真完成设计。** 先看完整效果，再按你的喜好细调，不等你逐项提醒、补齐。

<table>
  <tr>
    <td width="33%" align="center" valign="top">
      <strong>剧场选座</strong><br>
      <a href="https://ww-cooooo.github.io/ui-done/showcase/theatre-seats/"><img src="./showcase/assets/theatre-seats-preview.jpg" alt="回声小剧场的扇形座位图，两个相邻座位已选中" width="260"></a>
    </td>
    <td width="33%" align="center" valign="top">
      <strong>轨道监控</strong><br>
      <a href="https://ww-cooooo.github.io/ui-done/showcase/orbital-grid/"><img src="./assets/readme/orbital-grid.jpg" alt="轨道监控页面，告警围绕中央地球分布" width="260"></a>
    </td>
    <td width="33%" align="center" valign="top">
      <strong>横向手卷</strong><br>
      <a href="https://ww-cooooo.github.io/ui-done/showcase/shanshui-now/"><img src="./assets/readme/shanshui-now.jpg" alt="当代新中式页面，文字和摄影沿横向手卷排列" width="260"></a>
    </td>
  </tr>
</table>

<p align="center">以上是实际页面截图。点击图片体验交互和动效；展板共收录 <strong>12 个示例</strong>。</p>

<a id="install"></a>

## 现在就装

UI Done 是一组供 Agent 读取的工作规则，不是独立的网站生成软件。请在**能读取项目、修改文件并运行命令的 AI 编程助手**中使用；普通聊天窗口不能直接替你改好本地项目。新页面采用 **React**，主组件系统优先 **Ant Design**。

### 方法一：把这段话发给 AI

不想处理命令行，可以复制下面三行给你正在使用的 Agent：

```text
请帮我安装 UI Done：https://github.com/Ww-Cooooo/ui-done
按 INSTALL.md 先说明下载内容、安装位置和覆盖影响，确认后再安装。
装好后检查完整规则能否读取，并告诉我怎样调用、更新和移除。
```

### 方法二：运行一条命令

电脑已经安装 **Node.js** 时，在终端运行：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

这会联网下载并运行第三方 `skills` 安装器，按提示选择你使用的 Agent。`-g` 表示安装到当前用户范围，不是给电脑上所有用户安装。**安装 Skill 不需要先构建或运行本仓库的展板。**

安装器默认收集匿名使用统计；可以设置 `DISABLE_TELEMETRY=1` 关闭。这是安装器的行为，不是 UI Done 页面在收集数据。[安装器官方说明](https://www.skills.sh/docs/cli)

<details>
<summary><strong>点击展开：关闭安装统计的命令</strong></summary>

Windows PowerShell（只影响当前终端窗口）：

```powershell
$env:DISABLE_TELEMETRY = "1"
npx skills add Ww-Cooooo/ui-done -g
```

macOS 或 Linux：

```bash
DISABLE_TELEMETRY=1 npx skills add Ww-Cooooo/ui-done -g
```

</details>

**装好后，先让 Agent 告诉你安装目录，并确认它能读取 `SKILL.md` 和同目录的 `references`。** 只复制一份 `SKILL.md` 不够，需要完整的 `skill/ui-done` 文件夹。是否需要重启、怎样显式调用或自动识别，由所用 Agent 的平台决定，不能只看到文件就认定已经生效。[完整安装说明 →](./INSTALL.md)

## 第一次使用，可以这样说

在 Agent 中打开要修改的项目，然后可以只说一句：

```text
请用 UI Done 重新设计当前页面：我想要有科技感，保留现有内容和功能。
```

从零做新页面时，先在 Agent 中选择一个新的项目文件夹，再说“请用 UI Done 给我的咖啡馆做一个菜单页”或“请用 UI Done 把这组数据做成分析看板”。无论新建还是改版，告诉它页面给谁用、要完成什么、喜欢什么感觉即可，不必先决定用哪个库、组件或动画。

首次使用时，让 Agent 先读取已安装的 UI Done，报告文件位置，并简要说明本次会按哪些规则做，用于核对它确实找到了规则。

一句话是开始，不是要求 Agent 猜完所有业务细节。它会检查项目和已有内容，补问影响结果的关键问题，再在你授权的范围内实现；缺少真实数据时不能自行编造。

第一版完成后，让 Agent 告诉你怎样启动，并给出可打开的预览入口。打开自己的页面后，继续说“字再大一点”“这个区域简洁一些”“动效慢一点”，就可以细调；不需要先运行本仓库的展板。

## 和其他前端设计 Skill 有什么不同？

比较前端设计 Skill 时，不只看它有没有审美建议，还要看：**用户没点名的组件、字体、图表和动效，它是否明确要求 Agent 主动选用、真正做出来。** UI Done 把下面四项写成了执行要求，你可以据此与其他 Skill 逐项比较。

| 对比时看什么 | UI Done 的明确要求 |
| --- | --- |
| **有没有具体的技术采用要求？** | 新页面走 React 路线，采用主 UI 系统；字体、图表、Canvas、滚动与动效等默认能力都要安排实际用途。 |
| **用户没提，能否直接省略？** | 不能以此为理由。先规划采用、尝试适配，省略必须有硬性理由；3D 先单独判断是否适合。 |
| **是否要求研究真实 Demo？** | 新页面和重大改版默认调研五个参考来源；候选工具还要查看相关官方 Demo，再按页面内容适配。 |
| **计划写了、库导入了，就算完成吗？** | 不算。除了整体设计，还要检查各类已采用能力是否真正落实到页面。 |

**只是“可以考虑使用”，和“默认必须安排用途并实现”，是两种不同力度的要求。** UI Done 选择后者。这里给出的是可核对的比较标准，不点名评价其他项目，也不宣称所有其他 Skill 都缺少这些要求。

## 一句话之后，Agent 要主动做哪些设计？

UI Done 要求 Agent 把你描述的方向，展开成一套具体、可操作的页面方案，并以较高完成度的第一版为目标：

- **框架和组件一起选定。** 新页面使用 React，主 UI 系统优先 Ant Design；按钮、筛选、表单等使用成熟组件，并融入整体设计。
- **布局、配色和字体一起设计。** 页面结构跟随实际用途，不只换颜色和大图；中文、英文、数字与代码符号都选择合适的开源字体。
- **图表和素材主动安排。** 真实数据用 AntV 或 ECharts 表达，图标、图片与独立 2D Canvas 找到贴合内容的用途；不编造数据凑图表。
- **滚动与动效主动实现。** 默认用 Lenis 处理平滑滚动、GSAP 编排动效，让切换、反馈和内容呈现与当前页面相符，不把所有页面都做成同一种淡入。
- **效果要在实际操作中成立。** 工具允许时打开页面，检查关键操作、可读性、动效和代表性屏幕尺寸；未检查的部分明确说明。

**第一版就认真完成设计，是执行目标，不是“一句话必定零修改”的保证。** 具体结果仍受需求、素材、Agent 能力和可用工具影响。采用也不等于堆砌：动效可以轻一些，Canvas 可以只占一个小区域；确有硬性障碍才按规则省略，3D 只在适合且能做好时采用。只改一段文字或一个颜色时，保持小范围修改。

<details>
<summary><strong>点击展开：完整页面的默认技术与采用条件</strong></summary>

| 页面部分 | UI Done 的要求 |
| --- | --- |
| 页面框架 | 新页面、新组件及较大改版使用 **React**。 |
| 主 UI 组件系统 | 每个界面必须采用一套主组件系统，默认 **Ant Design**。已有 React 产品明确采用另一套成熟系统，或 Ant Design 存在硬性限制时，可以保留或选择对应方案。 |
| 字体 | 查看正式字体样张，选择与语言和视觉方向匹配、广泛采用且许可明确的开源字体，检查实际字形和排版，并随项目本地打包。 |
| 主要动效 | 默认 **GSAP + `@gsap/react`**，先看相关官方演示；不用它必须有明确的适用例外，不能以“CSS 够了”“少装依赖”为理由。 |
| 平滑滚动 | 默认 **Lenis**；需要滚动编排时配合 **GSAP ScrollTrigger**，不再叠加第二套平滑滚动引擎。 |
| 独立 2D Canvas | 优先用 **Pts / Fabric.js** 承担与现有内容相符的视觉或操作用途，与 3D 分开考虑。 |
| 数据可视化 | **AntV 优先，ECharts 作为替代**，选择一个主方案。只有确实没有可视化对象且不能编造数据时，才允许不采用。 |
| 真实 3D / WebGL | 评估内容是否天然需要空间表达、是否比二维方式更清楚、是否有足够制作和运行预算；全部条件通过后才采用 **Three.js / React Three Fiber**。不接受穿模或几何体生硬拼接。 |
| 图标与素材 | 优先沿用主组件系统的图标；按内容选择图片与素材，检查来源、许可和清晰度。 |
| 性能与设备 | 按需要懒加载、拆分资源、暂停不可见效果；检查电脑、平板、手机的代表性尺寸，并保留减少动态效果和高级效果失败时的可用状态。 |

除 3D 的独立适用判断外，默认能力应先尝试较小用途或兼容方案。只有明确的用户限制、许可、交付、无障碍、兼容性、性能或运行问题等硬性原因，才可按规则省略。具体条件以 [Skill 主规则](./skill/ui-done/SKILL.md) 为准，不是让 Agent 按个人喜好删减。

主题、路由、数据请求、共享状态和表单根据实际需求选择，不为凑齐功能而新增。不会仅为“完整”就默认引入 SSR、组件测试体系、国际化或 RTL。相关配套见 [React 应用说明](./skill/ui-done/references/react-application-stack.md)。

</details>

## 参考优秀作品，而不是反复套用旧模板

新页面和重大改版要从五个参考来源开始。Agent 要看实际效果和相关代码，说明采用了什么、怎样适配；不是在交付说明里列五个网址就算完成。

| 参考来源 | Agent 从哪里开始 |
| --- | --- |
| [MotionSites](https://motionsites.ai/) | 看整体设计方向，在允许时读取公开的设计提示词。 |
| [React Bits](https://reactbits.dev/) | 看相关 React 组件的预览和代码。 |
| [Uiverse](https://uiverse.io/) | 看局部 UI 的效果和实现。 |
| [Anime.js](https://animejs.com/) | 看与当前任务有关的动画演示和 API，比较表达思路。 |
| [Aceternity UI](https://ui.aceternity.com/) | 看组件或页面结构的预览和代码。 |

此外，Agent 还要单独查看 [GSAP React 指南](https://gsap.com/resources/React/)及相关[官方演示](https://demos.gsap.com/)。GSAP 已经负责动效时，Anime.js 通常只作为思路来源，不自动再装一套动画运行时。

素材库还收录了 Ant Design、AntV、ECharts、Pts、Fabric.js、Lenis、Three.js 等。优先从这些来源选合适的方案，不能满足时再说明缺口并寻找替代。[查看完整素材库 →](./skill/ui-done/references/source-library.md)

**看过 Demo 不等于可以直接复制。** 采用代码和素材前还要核对许可、依赖和项目适配；不能照搬示例数据、无关按钮或整页布局。无法安全访问某个来源时，Agent 应说明缺口并继续处理其他可进行的部分，不能假装已经调研。

<a id="examples"></a>

## 看看它能用于哪些页面

当前展板有 **7 个工作型页面、4 个表达型页面和 1 个动效实验页**。这些是能力展示，不是 UI Done 只能生成的十二套模板。

**[打开全部案例，直接体验 →](https://ww-cooooo.github.io/ui-done/showcase/gallery/)**

<details>
<summary><strong>点击展开：12 个案例的用途和入口</strong></summary>

| 类型 | 页面 | 可以体验什么 |
| --- | --- | --- |
| 工作型 | [回声小剧场](https://ww-cooooo.github.io/ui-done/showcase/theatre-seats/) | 在扇形座位图上选座、推荐同排连座，在票根中核对总价。 |
| 工作型 | [训练复盘 · Velocity Works](https://ww-cooooo.github.io/ui-done/showcase/velocity-works/) | 选择训练记录，比较负荷，填写并保存本页复盘。 |
| 工作型 | [轨道监控 · Orbital Grid](https://ww-cooooo.github.io/ui-done/showcase/orbital-grid/) | 在轨道驾驶舱中查看告警、装填指令并确认演示处置。 |
| 工作型 | [门店补货 · Corner Goods](https://ww-cooooo.github.io/ui-done/showcase/corner-goods/) | 沿一张连续小票查找低库存商品、填写数量并记录处理状态。 |
| 工作型 | [日程习惯 · Still Day](https://ww-cooooo.github.io/ui-done/showcase/still-day/) | 新增日程、完成习惯，查看一周安排。 |
| 工作型 | [照片审阅 · Atelier Noir](https://ww-cooooo.github.io/ui-done/showcase/atelier-noir/) | 并排比较原图与裁切提案，调整画面、添加意见并审阅。 |
| 工作型 | [建筑协作 · Grid 01](https://ww-cooooo.github.io/ui-done/showcase/grid-01/) | 在无限蓝图上选择问题、添加记录并推进演示状态。 |
| 表达型 | [海岸专题 · North Tide](https://ww-cooooo.github.io/ui-done/showcase/north-tide/) | 随滚动逐章阅读海岸摄影和文字。 |
| 表达型 | [艺术展览 · Red Form](https://ww-cooooo.github.io/ui-done/showcase/red-form/) | 在同一座展览舞台中切换作品与展签。 |
| 表达型 | [游戏活动 · Neon Rift](https://ww-cooooo.github.io/ui-done/showcase/neon-rift/) | 经过三个传送门阶段，体验粒子与空间变化。 |
| 表达型 | [横向手卷 · Shanshui Now](https://ww-cooooo.github.io/ui-done/showcase/shanshui-now/) | 用滚轮、拖动或方向键展开连续长卷。 |
| 动效实验 | [GSAP Motion Lab](https://ww-cooooo.github.io/ui-done/showcase/motion-lab/) | 点击重排任务，滚动组装信息，比较路径缓动。 |

</details>

工作型示例使用明确标注的演示数据，操作只改变当前页面的状态，刷新后恢复初始内容。它们没有连接真实业务后台，不会锁座、付款、发送补货消息或执行真实航天指令。

## 使用前，你可能还想知道

### 它能在不同的 Agent 中使用吗？

UI Done 采用 [Agent Skills](https://agentskills.io/) 格式，不绑定某一家 AI 厂商。支持该格式的平台可以发现和加载 Skill；其他平台需要把完整规则文件夹注册到其可读取的项目或系统说明中。具体方法见 [INSTALL.md](./INSTALL.md)。

规则要求 Agent 在调研、增删改代码、调试、测试和交付过程中持续遵守 UI Done；任务恢复、上下文压缩或交接后要重新读取。**这是一项执行要求，不代表所有平台安装后都会自动触发。** 显式调用可能是 `$ui-done`、`/ui-done`、菜单或自然语言，以当前平台实际支持的方式为准。

### 已有 Vue 项目，或者只改几个字，也适合用吗？

只改文字、颜色、图片或现有样式变量，可以保留原方案并控制范围。新增页面、组件或较大改版则要求走 React 路线：先说明迁移范围和影响，获得同意后实施；不同意迁移时只提供审查或方案，不偷偷塞入 React 小页面。

### 会不会装一堆依赖，或者替我发布？

主动选型不等于自动获得权限。新增依赖或修改锁文件前，Agent 要说明用途和影响，取得当前范围的安装授权；已有明确授权后，不必重复询问同一范围。提交、推送、公开发布、登录账号及真实业务操作仍需各自明确授权。

联网调研不能把私有代码、截图和凭据提交给素材网站，使用已有登录账号需单独同意。密钥不能放进前端代码。UI Done 不提供后端或云端存储服务；项目文件仍由你使用的 Agent 平台处理，请同时检查该平台的数据设置。

### 我只想看页面，需要安装开发环境吗？

直接打开[在线展板](https://ww-cooooo.github.io/ui-done/showcase/gallery/)即可。要从下载的仓库查看已构建页面，需要本地 HTTP 服务，不能直接双击 HTML；这与安装 Skill 是两件不同的事。

<details>
<summary><strong>点击展开：本地查看、源码构建和针对性检查</strong></summary>

在仓库根目录运行下面的本地服务命令，然后打开 `http://127.0.0.1:4173/showcase/gallery/`。查看已构建页面不需要 Node.js 或 pnpm。

```sh
# Windows（需要 Python）
python -m http.server 4173 --bind 127.0.0.1

# macOS / Linux（需要 Python 3）
python3 -m http.server 4173 --bind 127.0.0.1
```

从源码构建需要 Node.js `^20.19.0` 或 `>=22.12.0`，以及 pnpm `11.19.0`：

```sh
pnpm install --frozen-lockfile
pnpm run check
```

`check` 会构建展板、生成许可声明和资源版本标记，并检查 JavaScript / CSS 体积预算。它不等于真实用户操作已经通过验收。

已安装 Python Playwright 及其 Chromium 的维护者，可以检查现有构建，例如：

```sh
python tooling/check_showcase_motion.py --case gallery --viewport phone
```

macOS / Linux 使用 `python3`。脚本临时启动本地服务，默认不安装依赖，也不生成报告或截图；其他检查项见 `--help`。需要静态资源检查时，可用 `python skill/ui-done/scripts/frontend_preflight.py showcase --offline`，该脚本需要 Python 3.10+。

| 想进一步了解 | 从这里看 |
| --- | --- |
| Skill 的完整执行规则 | [SKILL.md](./skill/ui-done/SKILL.md) 与 [参考文件](./skill/ui-done/references/) |
| 当前展板的依赖与构建 | [package.json](./package.json) 与 [锁文件](./pnpm-lock.yaml) |
| 原有页面与新增选座页源码 | [共享运行时源码](./showcase/runtime/src/) · [选座页源码](./showcase/runtime/theatre-seats/) |
| 有哪些针对性浏览器检查 | [检查脚本](./tooling/check_showcase_motion.py) |
| 本项目怎样保持维护精简 | [维护约定](./AGENTS.md) |

当前展板复用 React、Ant Design、GSAP / Anime.js、Lenis、Pts、AntV 和按场景加载的 Three.js。八个保留作品仍使用既有 Anime.js，不代表新页面的 GSAP 默认规则被取消。展板锁定的具体版本不要求照搬到每个业务项目。

不同示例的检查范围和时间不同；一次本地浏览器通过不能证明所有 Agent、浏览器和实体设备都适用。维护时按实际改动选择检查，不为 README 修改重跑整套页面测试。

</details>

## 开源与反馈

UI Done 自己编写的 Skill、脚本、文档和示例代码采用 [MIT License](./LICENSE)。**第三方运行时和字体保留各自许可证**：展板打包的字体采用 OFL-1.1；GSAP 使用 Standard “No Charge” License，不是 MIT，采用前需核对当前产品是否符合其条款。

GSAP 对部分与 Webflow 竞争的无代码可视化网页动画制作工具有使用限制；涉及此类产品时，应先核对许可并取得所需的书面许可。具体说明和许可文件见 [第三方声明](./THIRD_PARTY_NOTICES.md)。

[图片来源说明](./showcase/assets/IMAGE_NOTICES.md) · [报告使用问题](https://github.com/Ww-Cooooo/ui-done/issues/new?template=problem.yml)

涉及密钥、权限或可疑命令的问题，请按 [安全说明](./SECURITY.md) 私下报告，不要在公开 Issue 中提交敏感信息。

---

<p align="center"><strong>先让 Agent 拿出设计，再按你的感觉细调。</strong><br><a href="#install">安装 UI Done</a> · <a href="https://ww-cooooo.github.io/ui-done/showcase/gallery/">体验在线展板</a></p>
