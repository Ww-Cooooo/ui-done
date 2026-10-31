# 动效现场 · Motion Atlas

一个可以观看、慢放和亲手操作的动效示例：从整页叙事进入真实交互，再逐项探索 Motion Prompt 的 192 个原始示例。

[打开在线示例](https://ww-cooooo.github.io/ui-done/showcase/motion-atlas/) 后，先看“整页体验”，再到“交互现场”打开一张作品；进入“192 种效果”可搜索名称或编号、放大播放并拖动进度。

依据：[页面入口](src/main.jsx)、[原始示例播放器](src/Gallery.jsx)。

## 本地打开

下载完整仓库并保留目录结构。已有 Node.js 时，在仓库根目录运行：

```sh
node examples/motion-atlas/serve.mjs
```

浏览器打开 [本地示例](http://127.0.0.1:5198/)。这会提供仓库内已构建的网页，无需先安装开发依赖。服务仅监听本机；若 5198 端口已被占用，可通过 `MOTION_PORT` 环境变量改用其他端口。在 PowerShell 7 中，先运行 `$env:MOTION_PORT = '5200'`，再运行上述命令即可。

## 可以观察什么

| 页面 | 内容与操作 | 实现依据 |
| --- | --- | --- |
| 整页体验 | 34 项机制组成长页：文字遮罩、形变轨道、粒子拖尾、滚动阅读、叠卡、可变字重与滚动放大。 | 依据：[Experience.jsx](src/Experience.jsx) |
| 交互现场 | 34 项机制连接作品筛选、共享图像展开、收藏、抽屉、同图比较、热点、轮播和本地异步演示。 | 依据：[Interactions.jsx](src/Interactions.jsx) |
| 192 种效果 | 8 组各 24 项原始 Canvas 示例，支持分类、中文/英文/编号搜索、重播、0.25–2× 调速和进度拖动。 | 依据：[Gallery.jsx](src/Gallery.jsx)、[目录数据](src/catalog-data.json) |

前两页按编号去重共 67 项，只有 084 磁吸按钮重合。页面底部的“页面应用清单”列出对应位置和触发方式。192 项原始示例采用其上游绘制代码；前两页则是机制的网页适配。162 展示灯箱功能，未复刻源示例缩回缩略图的完整转场。

依据：[应用清单](src/Coverage.jsx)、两个页面导出的编号列表。

页面提供自动动效暂停，并响应系统“减少动态效果”设置。表单、收藏和演示结果只在当前页面保留；刷新后清空。本地异步演示不连接业务服务、不上传内容，也不生成用户文件。网页资源由当前站点提供，未加入分析脚本或远程图片；点击来源链接会访问对应外部网站。

依据：[页面状态](src/main.jsx)、[交互状态和本地任务](src/Interactions.jsx)。

## 修改与构建

以下开发步骤已在 Node.js 24.16.0 / npm 11.13.0 下验证；Node 版本范围见 [package.json](package.json) 的 `engines`。从仓库根目录进入本示例，使用随附锁文件安装依赖：

```sh
cd examples/motion-atlas
npm ci --ignore-scripts
npm run dev
```

开发服务启动后打开 [http://127.0.0.1:5198/](http://127.0.0.1:5198/)。如果开发端口被占用，可运行 `npm run dev -- --port 5200`，并打开输出中的新地址。

构建命令会更新本示例的第三方声明，并将网页直接写入仓库的 `showcase/motion-atlas/`：

```sh
npm run build
```

构建资源使用相对路径，适用于该 GitHub Pages 子目录。请通过 HTTP 服务打开构建目录；直接双击 HTML 文件未作为支持的运行方式。开发依赖采用独立安装，未包含在仓库中。

本次构建与路径检查使用 Windows、Node.js 24.16.0、npm 11.13.0。已检查三个页面、应用清单、8 组原始示例及本地字体/许可资源。未将按时间采样和截图检查表述为全站连续人工观看，也未据此声称所有平台均已验证。

## 来源与许可

原创页面代码采用 [MIT 许可](LICENSE)。Motion Prompt 的原始代码和目录数据来自 [Shohei Ohtaki 的项目](https://github.com/showheyohtaki/motion-prompt)，保留其 [MIT 许可](public/source/LICENSE) 与 [上游第三方声明](public/source/THIRD-PARTY-NOTICES.md)。Noto Sans SC Variable 字体采用 [OFL-1.1](public/licenses/noto-sans-sc-OFL.txt)。

GSAP 和 `@gsap/react` 使用 [GSAP Standard No Charge 条款](public/licenses/GSAP-Standard-No-Charge-License.txt)。其他运行依赖及其版权文字见 [完整第三方声明](THIRD-PARTY-NOTICES.md)；字节摘要、版本与上游地址见 [资源来源清单](public/licenses/asset-provenance.json)。
