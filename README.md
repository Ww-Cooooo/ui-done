<div align="center">

# UI Done

给 Agent 用的前端 Skill。先读项目，选好工具，把页面做出来，再进浏览器检查。

`Agent Skill` &nbsp; `任何能读写项目文件的 Agent` &nbsp; `MIT License`

</div>

<p align="center">
  <a href="https://ww-cooooo.github.io/ui-done/showcase/gallery/">
    <img src="./assets/readme/ui-done-cover.jpg" alt="打开 UI Done 在线页面展厅" width="800">
  </a>
</p>

<p align="center">
  <strong><a href="https://ww-cooooo.github.io/ui-done/showcase/gallery/">打开在线页面展厅 →</a></strong>
</p>

## 先看页面

上面是 UI Done 的页面展厅。点图片或“打开在线页面展厅”，可以依次查看六个实际页面。

六张完整截图放在下面，默认收起，免得 README 一打开就特别长。看到蓝色按钮时，点按钮或它所在的整行都可以展开；再点一次就会收起。

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>AER Run｜跑鞋产品页</strong></summary>

<br>

![AER Run 跑鞋产品页截图](./assets/readme/aer-run.jpg)

深色跑鞋产品页。首屏只用产品照片、文字和参数介绍这双鞋，不再给跑鞋叠加动画或 3D 效果。

[在线打开 AER Run](https://ww-cooooo.github.io/ui-done/showcase/aer-run/) · 下载后打开 `showcase/aer-run/index.html`

</details>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>Tide Journal｜海岸杂志</strong></summary>

<br>

![Tide Journal 海岸杂志截图](./assets/readme/tide-journal.jpg)

一本虚构的海岸杂志。首屏只留标题、照片和导读，没有为了放动效再往照片上叠东西。

[在线打开 Tide Journal](https://ww-cooooo.github.io/ui-done/showcase/tide-journal/) · 下载后打开 `showcase/tide-journal/index.html`

</details>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>Form Shift｜设计节日程</strong></summary>

<br>

![Form Shift 设计节页面截图](./assets/readme/form-shift.jpg)

设计节活动页。装置照片已经够强，动画放在原本就该移动的主题横幅和筛选结果上。日程可以按 Type、Image、Space 筛选。

[在线打开 Form Shift](https://ww-cooooo.github.io/ui-done/showcase/form-shift/) · 下载后打开 `showcase/form-shift/index.html`

</details>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>Control Room｜物流调度台</strong></summary>

<br>

![Control Room 物流调度台截图](./assets/readme/control-room.jpg)

给值班人员看的调度页面。线路表可以按状态筛选，下方的六个装卸口与 D02、D03、D04、D06、D08、D11 六张状态卡一一对应，旁边是当日吞吐量图表。

[在线打开 Control Room](https://ww-cooooo.github.io/ui-done/showcase/control-room/) · 下载后打开 `showcase/control-room/index.html`

</details>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>Corner Store｜家居小店</strong></summary>

<br>

![Corner Store 家居小店截图](./assets/readme/corner-store.jpg)

颜色明快的小店页面。商品可以筛选、加入演示购物袋；首屏的包袋只做轻微倾斜，真正持续移动的是商店本来就会有的促销横幅。

[在线打开 Corner Store](https://ww-cooooo.github.io/ui-done/showcase/corner-store/) · 下载后打开 `showcase/corner-store/index.html`

</details>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>Pocket Planner｜日程应用</strong></summary>

<br>

![Pocket Planner 日程应用截图](./assets/readme/pocket-planner.jpg)

日程应用介绍页。手机模型中的“今天”和“本周”可以切换，切换时直接更新日程卡片，不再额外摆一套动画控制器。

[在线打开 Pocket Planner](https://ww-cooooo.github.io/ui-done/showcase/pocket-planner/) · 下载后打开 `showcase/pocket-planner/index.html`

</details>

下载仓库后，也可以打开 `showcase/gallery/index.html` 查看这六个页面。

## UI Done 是什么

UI Done 是一组给 Agent 阅读的工作说明，入口在 `skill/ui-done/SKILL.md`。它不是独立软件，也不绑某一家 Agent。只要你的 Agent 能读取本地文件、修改目标项目并执行这份说明，就可以使用；原生安装和自动触发方式则要看具体产品。

它可以处理新页面、现有页面改版和前端检查。Agent 会先看项目结构、现有技术栈和未提交改动，再开始设计和实现。页面能运行时，还要实际打开浏览器，查看不同尺寸、主要交互和报错情况。

名字里的 `Done` 是流程目标。环境、账号或测试数据不齐时，Agent 应该写清哪些地方还没验过；文案是否准确、业务是否合理、风格是否合适，最后仍要由人判断。

## 安装

两种方式，选一种就行。

### 用 npx 安装

电脑已经装好 Node.js 时，运行：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

第一次运行时可能会让你选 Agent，选平时用的那个。

### 让 Agent 帮你装

把下面这段发给你正在使用的 Agent：

```text
请帮我安装 UI Done：
https://github.com/Ww-Cooooo/ui-done

先阅读仓库根目录的 INSTALL.md，再按里面适合当前 Agent 的方式安装。
如果已经有同名 Skill，不要直接覆盖，先告诉我是更新还是重装。
装好后告诉我安装到了哪里，并给我一句下次可以直接使用的调用方式。
```

安装细节在 [`INSTALL.md`](./INSTALL.md)。

## 三种用法

| 你现在的情况 | 从哪里开始 |
| --- | --- |
| 刚接触 Agent，对前端也不熟 | 用下面的完整提示词，写清页面给谁用、要做什么、哪些内容不能改。碰到安装和启动步骤时，让 Agent 逐项解释。 |
| 会一点编程，也用过 Agent | 再补上现有框架、允许修改的目录、参考页面和交付方式，减少 Agent 自己猜测。 |
| 经常写代码、经常用 Agent | 把 UI Done 当作执行约束，用它统一技术选型、动效、资源打包、性能边界和浏览器验收。 |

## 第一次使用

安装完成后开一个新任务。下面这段可以直接改：

```text
请按 UI Done Skill 检查并改进当前页面。

这个页面给【谁】使用，主要用来【做什么】。
请保留【不能改的文字、功能、数据或样式】。
我希望它看起来【例如：安静一点、像一本杂志、信息更清楚】。

前端 UI、动画、平滑滚动、3D/Canvas、图表、图标和性能优化，能用于这个页面的类别都请安排上；每类选一套主工具，必须真正用进页面，并保持同一种设计风格。
不要为了证明用了某个库而新增区块、文案、控件或编造数据。没有自然主位时，把它收成原有区域里的小型点缀；性能和构建工具可以只在底层工作。
如果要更换项目原来的框架、改变交付方式、接入付费服务或动到高风险配置，请先告诉我影响，等我确认。

完成后请在可用的浏览器里检查电脑和手机尺寸、主要交互和报错，并说明还有哪些地方没有验证。
```

风格不必写成专业术语。“字大一点”“别太花”“像纸质杂志”“看起来稳重”都能提供方向。有参考图或参考网站时，一起交给 Agent 更省事。

## 默认把前端生态用起来，但不拿内容凑数

UI Done 的默认动作，是先给常用的前端能力分工，而不是先问哪些可以省掉。页面规模够大时，会为 UI、动画、平滑滚动、Three.js 或其他 3D/Canvas、图表、图标和性能优化各选一套主工具。

选中的东西要在页面里做实事。UI 工具负责组件和状态，动画库负责状态切换与进入离开，滚动工具处理滚动手感，3D 负责空间表达，图表呈现数据，性能工具守住加载和运行成本。同一类别通常只留一个主方案，最后都要服从页面本来的视觉方向。

“用上”不等于给每个库单独做一块展板。工具应该进入页面原有的按钮、状态、滚动、数据或视觉线索里。没有合适主位时，就缩成贴合语境的小点缀；性能和构建工具可以安静地留在底层。不能为了露出库名新增无关卡片、操作或假数据。

任务本身很小，或者交付环境、许可证、可访问性和性能边界不允许时，可以少用某些类别；Agent 要把原因说清楚，不能只用“原生就够了”或“少装依赖”带过。

这条已经写进 `skill/ui-done/SKILL.md`，也是以后使用 UI Done 时的默认准则。

## 这次示例站实际用了什么

| 类别 | 选用 | 在页面里的工作 |
| --- | --- | --- |
| UI 与状态 | React | 挂载确实需要 WebGL 的局部画面，并管理它们的生命周期 |
| 动画 | Motion | 内容进入、筛选切换和状态变化 |
| 平滑滚动 | Lenis | 鼠标和触控板滚动；系统要求减少动态效果时停用 |
| 3D | Three.js | 物流台的六个装卸口、商店包袋和展厅小标记 |
| 图表 | Chart.js | Control Room 的当日吞吐量图表 |
| 图标与资源 | 本地 SVG、图片和字体 | 展开提示、产品图片和页面字体；离线打开也能正常显示 |
| 可见性与性能 | react-intersection-observer、Size Limit | 离开屏幕后暂停场景，并检查打包体积 |
| 构建 | Vite | 把共用运行时代码和样式打成仓库内的本地文件 |

这些页面不依赖 CDN，下载后可以直接打开。3D 短动画播完会停住；页面离开屏幕或浏览器切到后台时也不会继续跑。系统开启“减少动态效果”后，页面保留静态画面。

## Agent 会按什么顺序做

1. 读取项目说明、页面结构、现有资源和技术栈，先认出哪些内容应该保留。
2. 确认任务范围和交付方式，为各类工具安排职责。需要换框架、改交付方式或接入付费服务时先说明影响。
3. 建立同一套排版、颜色、间距和交互节奏，再写入代码。装进项目的库必须真正被使用。
4. 页面能运行时，打开浏览器检查。发现横向滚动、遮挡、缺图或交互报错，就在任务范围内继续修。
5. 交付时说明改了什么、保留了什么、测了哪些尺寸和状态，还有什么没测到。

浏览器检查通常覆盖电脑和手机尺寸、主要按钮与筛选、图片和字体加载、横向溢出、控制台错误、键盘操作，以及系统开启“减少动态效果”后的表现。它不能代替正式的业务验收、兼容性测试、性能审计或无障碍审计。

发布网站、推送远端、提交真实表单、付款、发消息和删除数据，都需要用户明确同意。API Key、Token、Cookie 和私钥不能写进前端页面。

<details>
<summary><img src="./assets/readme/expand-more.svg" alt="点开查看详细内容" height="30"> <strong>熟练用户的提示词</strong></summary>

<br>

```text
请按 UI Done Skill 对当前页面做一次 targeted redesign。
保留现有路由、内容结构、埋点和未提交改动。
沿用还能工作的技术栈，并主动为 UI、动画、滚动、3D/Canvas、图表、图标和性能优化各选一套主工具；每一套都要有实际职责。
这些工具要附着在页面已有内容和交互上，不要为了证明用了某个库新增区块、控件或数据；没有自然主位时，只做贴合语境的小型点缀。
先检查当前实现，说明准备保留什么、修改什么，再开始写代码。
交付前检查 1440、1366、768、390 和 320 像素宽度，记录没有覆盖的页面状态和浏览器。
```

</details>

<details>
<summary><img src="./assets/readme/expand-more.svg" alt="点开查看详细内容" height="30"> <strong>项目结构和静态预检</strong></summary>

<br>

```text
ui-done/
├─ skill/ui-done/                         # Skill 本体
│  ├─ SKILL.md                            # 工作流程
│  ├─ references/                         # 选型、字体、动效和浏览器检查说明
│  └─ scripts/                            # 静态预检脚本
├─ showcase/                              # 六个示例页和总览页
├─ assets/readme/                         # README 图片
├─ INSTALL.md                             # 安装说明
├─ THIRD_PARTY_NOTICES.md                 # 第三方资源说明
└─ LICENSE                                # 项目自己的 MIT License
```

静态预检需要 Python 3.10 或更高版本，不依赖第三方包。

Windows PowerShell：

```powershell
python .\skill\ui-done\scripts\frontend_preflight.py .\showcase --offline
```

macOS / Linux：

```bash
python3 ./skill/ui-done/scripts/frontend_preflight.py ./showcase --offline
```

它会查缺失文件、外部网络资源、过小的固定字号、缺少锁定文件的依赖，以及可能误放进前端的密钥。扫描结果是线索，不等于安全审计，也不能代替浏览器检查。

</details>

## 常见问题

### 只能在 Codex 里用吗？

不是。核心文件是 `SKILL.md` 和它引用的本地资料，任何能读取这些文件并修改项目的 Agent 都可以照着执行。是否支持原生安装、自动触发或 `$ui-done` 这种写法，由具体 Agent 决定。

### 对代码不熟，也能试吗？

可以先从静态页面或范围明确的小改动开始。遇到依赖安装、启动命令和接口配置时，让 Agent 解释每一步的作用和影响，再决定是否继续。

### 它会改掉原来的内容吗？

Agent 会先检查现有内容，但这不是绝对保证。不能改的文案、链接、Logo、功能、数据字段和未提交文件，最好在任务开头逐项写明，并保留版本记录或备份。

### 浏览器检查后，我还要自己看吗？

要。自动检查擅长找溢出、缺图、报错和一部分交互问题，业务内容和视觉取舍仍要自己确认。

## 开源许可

项目自己编写的 Skill、脚本、文档和示例页面代码使用 [MIT License](./LICENSE)。仓库同时保留了第三方依赖、字体和示例图片的单独说明；它们不能一概按项目的 MIT License 处理。

<details>
<summary><img src="./assets/readme/expand-more.svg" alt="点开查看详细内容" height="30"> <strong>第三方资源和完整声明</strong></summary>

<br>

- React、Motion、Lenis、Three.js、Chart.js 等示例运行时依赖使用各自的 MIT 或 0BSD 许可。精确版本、版权文字和完整许可证随打包文件保存在 [`showcase/shared/runtime/THIRD_PARTY_LICENSES.txt`](./showcase/shared/runtime/THIRD_PARTY_LICENSES.txt)。
- Outfit、IBM Plex Serif、Red Hat Mono 和 Big Shoulders 字体继续使用 SIL Open Font License 1.1，原作者版权声明和许可证文件都保留在仓库中。
- 示例源图由本项目使用 OpenAI ImageGen 生成，在项目能够授权的范围内提供；AI 输出不保证唯一。
- 文件清单、哈希、来源、作者声明和适用范围见 [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)。再分发仓库或打包后的示例时，请把适用的声明和许可证一起保留。

</details>
