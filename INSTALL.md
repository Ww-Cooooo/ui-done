# 安装 UI Done

真正需要安装的是仓库里的整个 `skill/ui-done` 文件夹，不能只拿走 `SKILL.md`。

## 用 npx 安装

电脑已经装好 Node.js 时，运行：

```bash
npx skills add Ww-Cooooo/ui-done -g
```

`-g` 表示装到当前用户下，以后换项目也能继续用。第一次运行时可能会让你选 Agent，选平时用的那个。安装结束后，按提示重新打开 Agent 或新建一个任务。

## 交给 Agent 安装

如果用户让你安装 UI Done，请按下面的顺序处理：

1. 读取本仓库的 `skill/ui-done/SKILL.md`，确认同目录中的 `references`、`scripts` 和 `agents` 文件都在。
2. 当前 Agent 有自己的 Skill 安装工具时，优先使用它；来源仓库是 `Ww-Cooooo/ui-done`，Skill 路径是 `skill/ui-done`。
3. 没有安装工具时，查清当前 Agent 官方约定的用户级 Skill 目录，再复制整个 `skill/ui-done` 文件夹。不要猜目录，也不要只复制一个文件。
4. 如果目标位置已经有 `ui-done`，先问用户是更新还是重装，不要直接覆盖。
5. 安装后确认 `SKILL.md` 及其引用文件可以读取，再告诉用户安装位置、是否需要重启，以及下一次任务怎么调用。

不同 Agent 的目录和调用写法可能不同，以当前 Agent 自己的说明为准。
