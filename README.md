<div align="center">

# UI Done

### 给 AI 编程助手的界面设计顾问

**不给强模型套流程和规矩，只提醒它最容易忽略的设计判断。**<br>
让 Agent 做网页、工作台、创作工具或落地页时，设计更有自己的概念，界面更少字、更好懂，老功能不被改坏。

**[立即安装](#install)** · **[读一下 Skill 正文](./skill/ui-done/SKILL.md)** · **[在线展板](https://ww-cooooo.github.io/ui-done/showcase/gallery/)**

</div>

> [!NOTE]
> **2026.11.19 起是一次方向性改版**：早期版本是"必须用 React + Ant Design + GSAP、必须先出方案再确认、固定首尾输出格式"的硬规则手册。实测发现，这些约束在今天的强模型上反而让作品千篇一律、AI 味更重。现在的 UI Done 只给判断视角，技术栈、流程和视觉手法全部交还给模型。[更新记录 →](./CHANGELOG.md)

## 它会提醒 Agent 什么

| 维度 | Agent 容易犯的错 | UI Done 给的视角 |
| --- | --- | --- |
| 🎨 **设计感** | 套模板换皮；重设计只换颜色挪面板；多方案其实是同一骨架 | 从题材里长出概念；把大胆花在一处；重设计就推翻骨架；方案在概念上分岔 |
| 🤖 **AI 味** | 深色玻璃 HUD、紫蓝渐变、等大卡片墙、Emoji 当图标、处处淡入 | 认出这些默认长相，只在题材需要时才把它们当作选择 |
| 👁️ **少字易懂** | 首屏堆说明、摆出内部术语、新建入口找不到 | 首屏只放决策信息；复杂解释收进 `?` 浮窗或详情；核心动作可发现、可重复 |
| 🔍 **产品暗坑** | 只顾表面，不看上下游；改版改坏快捷键和数据；只测三条示例数据 | 多看两步闭环；保护旧契约；用拥挤、超长、窄屏做压力测试 |
| ✅ **交付诚实** | 首屏好看就说做完；把没跑过的说成验证过 | 看真实渲染、走完整路径、可让无上下文子代理试用；如实区分已验证与未验证 |

**它不做的事**：不指定框架或组件库，不规定数值红线，不强制多轮审批或固定输出格式，不替你决定审美方向。用户的明确要求和项目已有设计体系永远优先。

<a id="install"></a>

## 安装

**交给 Agent 安装**：把这段话发给能读写文件、运行命令的 AI 编程助手：

```text
请帮我安装 UI Done：https://github.com/Ww-Cooooo/ui-done
按 INSTALL.md 先说明下载内容、安装位置和覆盖影响，确认后再安装。
```

**命令行安装**（需要 Node.js）：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

这会运行第三方 `skills` 安装器，`-g` 表示装到当前用户范围；安装器默认收集匿名统计，可设置 `DISABLE_TELEMETRY=1` 关闭（[安装器说明](https://www.skills.sh/docs/cli)）。需要安装的是完整的 `skill/ui-done` 文件夹，不只是 `SKILL.md`。宿主差异、更新与核验见 [INSTALL.md](./INSTALL.md)。

## 怎么用

装好后正常描述需求即可，支持隐式触发的宿主会自动参考；也可以点名：

```text
用 UI Done 重新设计当前页面：要更有设计感，保留现有内容和功能。
```

```text
用 UI Done 审查一下这个后台，看看哪里字太多、哪里用户找不到入口。
```

不需要先选库、组件或动画方案——告诉它页面给谁用、要完成什么、想要什么感觉就够了。

## 包里有什么

| 文件 | 作用 |
| --- | --- |
| [`SKILL.md`](./skill/ui-done/SKILL.md) | 主入口，约一屏：界面类型判断、设计感、少字易懂、产品暗坑、交付自检 |
| [`references/ux-craft-playbook.md`](./skill/ui-done/references/ux-craft-playbook.md) | 可选备忘：首次体验、防误操作、AI 功能、无障碍等追问 |
| [`scripts/frontend_preflight.py`](./skill/ui-done/scripts/frontend_preflight.py) | 可选静态扫描（Python 3.10+，零依赖）：失效本地路径、疑似密钥、过小字号、无标签图标按钮、遗留占位词 |
| `agents/openai.yaml` · `assets/agents-snippet.md` | 可选宿主适配与持久规则片段 |

```bash
python -X utf8 skill/ui-done/scripts/frontend_preflight.py <目录或文件> --offline
```

## 在线展板

[展板](https://ww-cooooo.github.io/ui-done/showcase/gallery/)收录 7 个工作型页面、4 个表达型页面和动效实验页（[动效现场](https://ww-cooooo.github.io/ui-done/showcase/motion-atlas/)）。它们**产自早期硬规则版本**，展示的是当时的完成度，不代表新版会产出同样的技术栈或风格。工作型示例使用演示数据，不连接真实后台。

<details>
<summary><strong>本地查看与构建展板</strong></summary>

查看已构建页面只需本地 HTTP 服务，然后打开 `http://127.0.0.1:4173/showcase/gallery/`：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

从源码构建需要 Node.js `^20.19.0` 或 `>=22.12.0` 与 pnpm `11.19.0`：

```sh
pnpm install --frozen-lockfile
pnpm run check
```

`check` 会构建展板、生成许可声明并检查体积预算；浏览器检查可用 `python tooling/check_showcase_motion.py --help` 查看。安装 Skill 不需要构建展板。

</details>

## 许可与反馈

UI Done 自己编写的 Skill、脚本、文档和示例采用 [MIT License](./LICENSE)。展板打包的第三方运行时与字体保留各自许可（字体为 OFL-1.1；GSAP 为 Standard "No Charge" License，不是 MIT），详见 [第三方声明](./THIRD_PARTY_NOTICES.md) 与 [图片来源](./showcase/assets/IMAGE_NOTICES.md)。

[报告问题](https://github.com/Ww-Cooooo/ui-done/issues/new?template=problem.yml) · 涉及密钥或可疑命令请按 [安全说明](./SECURITY.md) 私下报告。
