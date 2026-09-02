<div align="center">

# UI Done

**给 Agent 用的前端 Skill：先看项目，再做页面，最后进浏览器检查。**

核心采用开放的 [Agent Skills](https://agentskills.io/) 文件格式，不绑定 OpenAI、Anthropic、Google 或其他厂商。支持该标准的 Agent 可以发现并加载它；不支持自动发现的 Agent 也可以把整份 Skill 注册为项目或系统说明。

[在线展厅](https://ww-cooooo.github.io/ui-done/showcase/gallery/) · [安装](#安装) · [第一次使用](#第一次使用) · [MIT License](./LICENSE)

</div>

<p align="center">
  <a href="https://ww-cooooo.github.io/ui-done/showcase/gallery/">
    <img src="./assets/readme/ui-done-cover.jpg" alt="打开 UI Done 在线页面展厅" width="800">
  </a>
</p>

<p align="center">
  <strong><a href="https://ww-cooooo.github.io/ui-done/showcase/gallery/">点上面的图，直接看页面展厅 →</a></strong>
</p>

<details>
<summary><img src="./assets/readme/expand.svg" alt="点开看大图和说明" height="30"> <strong>6 个页面的大图和在线链接</strong></summary>

<br>

<table>
  <tr>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/aer-run/"><img src="./assets/readme/aer-run.jpg" alt="AER Run 跑鞋产品页" width="390"></a><br>
      <strong>AER Run</strong><br>跑鞋产品页 · <a href="https://ww-cooooo.github.io/ui-done/showcase/aer-run/">打开页面</a>
    </td>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/tide-journal/"><img src="./assets/readme/tide-journal.jpg" alt="Tide Journal 海岸杂志" width="390"></a><br>
      <strong>Tide Journal</strong><br>海岸杂志 · <a href="https://ww-cooooo.github.io/ui-done/showcase/tide-journal/">打开页面</a>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/form-shift/"><img src="./assets/readme/form-shift.jpg" alt="Form Shift 设计节日程" width="390"></a><br>
      <strong>Form Shift</strong><br>设计节日程 · <a href="https://ww-cooooo.github.io/ui-done/showcase/form-shift/">打开页面</a>
    </td>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/control-room/"><img src="./assets/readme/control-room.jpg" alt="Control Room 物流调度台" width="390"></a><br>
      <strong>Control Room</strong><br>物流调度台 · <a href="https://ww-cooooo.github.io/ui-done/showcase/control-room/">打开页面</a>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/corner-store/"><img src="./assets/readme/corner-store.jpg" alt="Corner Store 家居小店" width="390"></a><br>
      <strong>Corner Store</strong><br>家居小店 · <a href="https://ww-cooooo.github.io/ui-done/showcase/corner-store/">打开页面</a>
    </td>
    <td width="50%" align="center">
      <a href="https://ww-cooooo.github.io/ui-done/showcase/pocket-planner/"><img src="./assets/readme/pocket-planner.jpg" alt="Pocket Planner 日程应用" width="390"></a><br>
      <strong>Pocket Planner</strong><br>日程应用 · <a href="https://ww-cooooo.github.io/ui-done/showcase/pocket-planner/">打开页面</a>
    </td>
  </tr>
</table>

</details>

## 它是做什么的

UI Done 不是一套固定模板。它是一份给 Agent 的工作说明，入口在 [`skill/ui-done/SKILL.md`](./skill/ui-done/SKILL.md)。无论是新做页面，还是整理一个已经写到一半的前端，Agent 都要先看清现有项目，再决定怎么改、用哪些工具、最后检查什么。

刚接触前端，可以直接从下面的示例提示开始。会写代码的话，再补上框架、目录和验收要求就行。项目越复杂，需要交代的现有接口和限制也会越多。

## 任何 Agent 都遵循同一份规则

- [`SKILL.md`](./skill/ui-done/SKILL.md) 是唯一权威运行契约，触发、规划、选型、编码、测试和交付规则都放在这里。
- `skill/ui-done/agents/` 只保存某些宿主可选的发现适配信息，不能修改或削弱核心规则。其他 Agent 不读取这些适配文件，也不会丢失 UI Done 的能力。
- 支持 Agent Skills 的宿主会先读取 `name` 和 `description`，匹配前端任务后再加载完整说明。宿主不支持 Skill 发现时，需要在它的项目规则、系统说明或技能注册界面中加载整个 `skill/ui-done` 文件夹；如果宿主从未看到 Skill 元数据，就不能声称已经自动触发。
- 显式调用写法由宿主决定，可能是 `$ui-done`、`/ui-done`、`@ui-done`、菜单选择或自然语言。UI Done 不把任何一家厂商的写法当成唯一入口。
- Agent 在自己调研、增删改代码、重构、调试、测试、打包或创建已授权前端子任务时，也必须重新判断是否进入前端范围；一旦进入，就持续遵守 UI Done 到交付结束。

## 默认主动用，不等你点名

这是 UI Done 最核心的优势之一。做完整页面、新站点或较大的改版时，即使用户没有指定任何库，Agent 也会主动从下面这些类别里选择合适的主工具，并真正用进页面：

- React 和一个主 UI 组件系统，默认 Ant Design
- 动画库和平滑滚动
- 分开的真实 3D/WebGL 与 2D Canvas 工具
- 有真实数据时优先使用 AntV、必要时使用 ECharts 的可视化工具
- 图标、图片、字体等资源系统
- 加载、体积和运行性能工具

React 是固定框架，主 UI 组件系统默认使用 Ant Design；其他类别会从现有项目和素材库中选择兼容主人，例如 Anime.js、Lenis、Three.js/React Three Fiber、Pts 或 Fabric.js，以及 AntV 或 ECharts。它不会因为用户没说库名，就只交付一套最基础的页面。这对刚接触前端，或者会写一点代码、但不是专门做前端的人尤其有用：你负责说清页面给谁用、要做什么、希望是什么感觉，UI Done 负责把容易漏掉的前端选型补上。

确定要认真比较或采用某个素材库后，Agent 会先打开它的官方 Demo，查看与当前用途真正相关的示例，再按整站调性改造。不要求把无关展厅全部刷完，也不会把 Demo 的示例文字、假数据、控制栏和展示外壳原样搬进产品。查看 Demo 不等于获得复制代码的许可；要使用示例代码或资源，仍会核对上游来源、许可证和修改记录。

主动使用也不等于乱塞。每个工具都必须服务页面原本的内容和操作，不能为了凑技术栈硬加 3D、假图表或多余的动画开关。没有合适的主位置，就只做贴合页面的小点缀；确实不适合时，也要说明原因。

## 安装

两种方式，选一种。

### 用 npx 安装

电脑里已经有 Node.js，可以运行：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

安装程序让你选择 Agent 时，选平时使用的那个。

### 把安装交给 Agent

不想处理命令行，就把这段发给 Agent：

```text
请帮我安装 UI Done：
https://github.com/Ww-Cooooo/ui-done

先读仓库根目录的 INSTALL.md，再按适合当前 Agent 的方法安装。
如果已经有同名 Skill，不要直接覆盖，先问我是更新还是重装。
装好后告诉我安装位置，以及下次怎么调用。
```

[查看完整安装说明](./INSTALL.md)

## 第一次使用

把方括号里的内容换成自己的话，然后发给 Agent：

```text
请用 UI Done 帮我【新建 / 改进】当前页面。

这个页面给【谁】使用，主要要完成【什么】。
请保留【不能改的文字、功能、数据或样式】。
我希望它看起来【例如：安静一点、像纸质杂志、信息更清楚】。

开始前先看现有项目。如果需要换框架、改变交付方式或接入付费服务，先问我。
完成后请在浏览器里检查电脑、平板和手机，并告诉我还有什么没有验证。
```

不必先学设计术语。“字大一点”“别太花”“像一本杂志”都能说明方向。有参考图或参考网站，也可以一起交给 Agent。

| 你现在的情况 | 建议再告诉 Agent 什么 |
| --- | --- |
| 刚接触 Agent 或前端 | 先用上面的提示词。遇到安装、启动或配置步骤时，让 Agent 解释清楚再继续。 |
| 会一点代码 | 加上项目框架、允许修改的目录、参考页面和不能动的文件。 |
| 经常写代码 | 直接给范围、技术边界和验收尺寸；支持 Skill 名称调用时，使用当前 Agent 支持的 `$ui-done`、`/ui-done`、`@ui-done` 或选择器。 |

## 它做事的规矩

- 先读项目说明、页面结构、现有技术栈和未提交改动，再开始写。
- 做完整页面或较大改版时，即使用户没有点名，也会先为 React UI、动画、滚动、真实 3D、独立 2D Canvas、可视化、图标和性能工具规划主方案并实际使用；省略必须有明确硬理由。
- 认真比较或采用素材库时，先看与当前用途相关的官方 Demo，记录采用、改造或拒绝的原因；除非存在明确的访问、安全或网络硬限制，否则不能跳过。
- 不为了凑技术栈编造内容。动画跟着内容和状态走；3D 要帮助表达产品或空间；图表只在真有数据时出现。没有合适主位，就收成贴合页面的小点缀。
- 能打开浏览器时，会检查电脑、平板和手机尺寸、主要操作、缺图、溢出和报错。检查不了的部分要写清楚。
- 发布网站、推送远端、提交真实表单、付款、发消息和删除数据，需要用户明确同意。API Key、Token、Cookie 和私钥不能写进前端页面。

<details>
<summary><img src="./assets/readme/expand-more.svg" alt="点开查看详细内容" height="30"> <strong>给会写代码的人：技术栈、文件和检查命令</strong></summary>

<br>

示例展厅里的主工具如下。它们不是每个项目都必须照搬，实际选型以现有项目和页面内容为准。

| 工作 | 示例展厅选用 |
| --- | --- |
| UI 与状态 | React |
| 动画 | Motion |
| 平滑滚动 | Lenis |
| 3D / Canvas | Three.js |
| 图表 | Chart.js |
| 图标与资源 | 本地 SVG、图片和字体 |
| 性能 | react-intersection-observer、Size Limit |
| 构建 | Vite |

常用入口：

- [`skill/ui-done/SKILL.md`](./skill/ui-done/SKILL.md)：Skill 本体
- [`skill/ui-done/references/`](./skill/ui-done/references/)：选型、字体、动效和浏览器检查
- [`skill/ui-done/scripts/`](./skill/ui-done/scripts/)：静态预检脚本
- [`showcase/`](./showcase/)：六个示例页和展厅

静态预检需要 Python 3.10 或更高版本：

```powershell
python .\skill\ui-done\scripts\frontend_preflight.py .\showcase --offline
```

macOS 或 Linux 把 `python` 改成 `python3`。重新构建并检查示例时，运行 `pnpm run check`。

</details>

## 开源、反馈和安全

项目自己编写的 Skill、脚本、文档和示例页面代码使用 [MIT License](./LICENSE)。安装或使用中遇到问题，可以打开[问题反馈表单](https://github.com/Ww-Cooooo/ui-done/issues/new?template=problem.yml)；涉及密钥、权限或可疑命令时，请按[安全说明](./SECURITY.md)私下报告。

仓库里的第三方依赖、字体和示例图片有各自的许可或来源说明，不能全部按项目的 MIT License 处理。

<details>
<summary><img src="./assets/readme/expand-more.svg" alt="点开查看详细内容" height="30"> <strong>第三方资源：完整声明</strong></summary>

<br>

- React、Motion、Lenis、Three.js、Chart.js 等示例运行时依赖使用各自的 MIT 或 0BSD 许可。精确版本、版权文字和完整许可证随打包文件保存在 [`showcase/shared/runtime/THIRD_PARTY_LICENSES.txt`](./showcase/shared/runtime/THIRD_PARTY_LICENSES.txt)。
- Outfit、IBM Plex Serif、Red Hat Mono 和 Big Shoulders 字体使用 SIL Open Font License 1.1，原作者版权声明和许可证文件保留在仓库中。
- 示例源图由本项目使用 OpenAI ImageGen 生成，在项目能够授权的范围内提供；AI 输出不保证唯一。
- 文件清单、哈希、来源、作者声明和适用范围见 [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)。再分发仓库或打包后的示例时，请一并保留适用的声明和许可证。

</details>
