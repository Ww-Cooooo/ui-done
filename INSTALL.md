# 安装 UI Done

真正需要安装的是仓库里的整个 `skill/ui-done` 文件夹，不能只拿走 `SKILL.md`。核心遵循开放的 Agent Skills 格式；`agents/openai.yaml` 只是 OpenAI 宿主的可选适配信息，不是 UI Done 的唯一入口或规则来源。

## 用 npx 安装

电脑已经装好 Node.js 时，运行：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

这条命令会联网下载并运行当前的 `skills` 安装器。`-g` 表示装到当前电脑的当前用户下，让所选 Agent 以后换项目也能继续用，不是给所有系统用户安装。第一次运行时可能会让你选 Agent，选平时用的那个。执行前确认目标 Agent 和安装目录；安装结束后，按提示重新打开 Agent 或新建一个任务。

## 交给 Agent 安装

如果用户让你安装 UI Done，请按下面的顺序处理：

1. 读取本仓库的 `skill/ui-done/SKILL.md`，确认同目录中的 `references`、`scripts` 和可选 `agents` 适配文件都在。
2. 查清当前 Agent 是否支持 Agent Skills，以及它官方规定的项目级或用户级安装位置和调用方式；不要用另一家 Agent 的目录或命令猜测。
3. 在真正写入前，告诉用户准备运行的命令、联网下载内容、精确目标目录、用户级或项目级影响，以及宿主官方提供的更新和移除方法；等用户确认当前范围后再执行。
4. 当前 Agent 有自己的 Skill 安装工具时，优先使用它；来源仓库是 `Ww-Cooooo/ui-done`，Skill 路径是 `skill/ui-done`。
5. 支持 Agent Skills 但没有安装工具时，把整个 `skill/ui-done` 文件夹复制到该宿主官方规定的位置，保留相对目录结构。
6. 不支持自动 Skill 发现时，把整个文件夹注册为项目或系统说明，确保 Agent 在任务开始和执行阶段都能访问 `name`、`description`、完整 `SKILL.md` 及其引用文件。仅把一句提示词发给 Agent 不等于完成安装，也不能保证自动触发。
7. 如果目标位置已经有 `ui-done`，先问用户是更新还是重装，不要直接覆盖；更新前按宿主支持的方式保留可恢复副本。
8. 安装后确认当前宿主可以读取 `SKILL.md` 及其引用文件，再告诉用户安装位置、是否需要重启、显式调用写法、是否支持隐式发现，以及怎样更新或移除。

不同 Agent 的目录和调用写法可能不同，以当前 Agent 自己的说明为准。
