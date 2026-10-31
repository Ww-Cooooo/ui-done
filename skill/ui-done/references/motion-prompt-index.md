# Motion Prompt: complete offline index

Read [the adaptation method](motion-vocabulary.md) before implementation. This is a reference vocabulary, not a checklist of effects to add. Source: [Motion Prompt](https://showheyohtaki.github.io/motion-prompt/), snapshot 2026-10-31, 192 entries. The video title says 168; current IDs 169–192 are a separate supplement. The current first 168 are not claimed to be a byte-identical historical release.

For one complete original specification: `node <ui-done>/scripts/query-motion-catalog.mjs --id 161`. Original data and license: [notice](../assets/motion-prompt/NOTICE.md).

## motion: 动态图形 (001–024)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [001](https://showheyohtaki.github.io/motion-prompt/#001) | Pop-in / 弹性入场 | 元素弹跳着出现 |
| [002](https://showheyohtaki.github.io/motion-prompt/#002) | Stagger / 交错动画 | 多个元素错开时间依次出现 |
| [003](https://showheyohtaki.github.io/motion-prompt/#003) | Burst / 放射爆发 | 元素出现时向外迸出线条和圆点 |
| [004](https://showheyohtaki.github.io/motion-prompt/#004) | Line draw / 线条描绘 | 线条像被画出来一样逐渐延伸 |
| [005](https://showheyohtaki.github.io/motion-prompt/#005) | Mask reveal / 遮罩显现 | 文字从不可见的边界后移出 |
| [006](https://showheyohtaki.github.io/motion-prompt/#006) | Typewriter / 打字机效果 | 文字像打字一样逐字出现 |
| [007](https://showheyohtaki.github.io/motion-prompt/#007) | Count-up / 数字递增 | 数字快速增长到目标值 |
| [008](https://showheyohtaki.github.io/motion-prompt/#008) | Kinetic typography / 动态排版 | 文字随含义和节奏移动、缩放与旋转 |
| [009](https://showheyohtaki.github.io/motion-prompt/#009) | Easing / 缓动 | 动作通过加减速变化而非匀速移动 |
| [010](https://showheyohtaki.github.io/motion-prompt/#010) | Overshoot / 过冲回弹 | 越过目标后回到目标位置并停稳 |
| [011](https://showheyohtaki.github.io/motion-prompt/#011) | Squash & stretch / 挤压与拉伸 | 通过压扁和拉长表现弹性 |
| [012](https://showheyohtaki.github.io/motion-prompt/#012) | Shape morph / 形状变形 | 一种形状平滑变成另一种 |
| [013](https://showheyohtaki.github.io/motion-prompt/#013) | Liquid motion / 液态动效 | 形状像液体一样流动和融合 |
| [014](https://showheyohtaki.github.io/motion-prompt/#014) | Motion trail / 运动拖尾 | 运动物体身后留下逐渐淡去的轨迹 |
| [015](https://showheyohtaki.github.io/motion-prompt/#015) | Particles / 粒子效果 | 大量小碎片喷出并散开 |
| [016](https://showheyohtaki.github.io/motion-prompt/#016) | Parallax / 视差 | 远近图层以不同速度移动形成纵深 |
| [017](https://showheyohtaki.github.io/motion-prompt/#017) | Mask transition / 遮罩转场 | 扩大的形状内部显现下一场景 |
| [018](https://showheyohtaki.github.io/motion-prompt/#018) | Shape transition / 图形转场 | 图形覆盖画面后揭示下一场景 |
| [019](https://showheyohtaki.github.io/motion-prompt/#019) | Liquid transition / 液态转场 | 液体流入画面并替换场景 |
| [020](https://showheyohtaki.github.io/motion-prompt/#020) | Zoom through / 穿越缩放 | 放大并穿过物体进入下一场景 |
| [021](https://showheyohtaki.github.io/motion-prompt/#021) | Flip / 翻转 | 像卡片翻面一样展示另一侧 |
| [022](https://showheyohtaki.github.io/motion-prompt/#022) | Light sweep / 扫光 | 光带扫过物体表面 |
| [023](https://showheyohtaki.github.io/motion-prompt/#023) | Glitch / 故障效果 | 画面像发生故障一样错位和分色 |
| [024](https://showheyohtaki.github.io/motion-prompt/#024) | Impact shake / 冲击震动 | 物体落下时带动整个画面震动 |

## camera: 镜头运动与转场 (025–048)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [025](https://showheyohtaki.github.io/motion-prompt/#025) | Pan / 水平摇镜头 | 机位固定，向左或右转动镜头 |
| [026](https://showheyohtaki.github.io/motion-prompt/#026) | Tilt / 垂直摇镜头 | 机位固定，向上或下转动镜头 |
| [027](https://showheyohtaki.github.io/motion-prompt/#027) | Dolly in / 推镜头 | 相机整体向主体靠近 |
| [028](https://showheyohtaki.github.io/motion-prompt/#028) | Zoom in / 变焦推近 | 相机不动，通过镜头变焦放大 |
| [029](https://showheyohtaki.github.io/motion-prompt/#029) | Tracking shot / 跟拍 | 相机随主体一起移动 |
| [030](https://showheyohtaki.github.io/motion-prompt/#030) | Orbit (Arc shot) / 环绕镜头 | 相机绕主体移动 |
| [031](https://showheyohtaki.github.io/motion-prompt/#031) | Crane up / 升镜头 | 相机整体向上升起 |
| [032](https://showheyohtaki.github.io/motion-prompt/#032) | Dolly zoom (Vertigo) / 滑动变焦 | 主体大小不变，背景发生透视变化 |
| [033](https://showheyohtaki.github.io/motion-prompt/#033) | Rack focus / 焦点转移 | 在近处与远处之间切换对焦 |
| [034](https://showheyohtaki.github.io/motion-prompt/#034) | Handheld / 手持镜头 | 像手持相机一样轻微晃动 |
| [035](https://showheyohtaki.github.io/motion-prompt/#035) | FPV drone shot / FPV 穿越机镜头 | 以第一人称快速穿越场景 |
| [036](https://showheyohtaki.github.io/motion-prompt/#036) | Dutch angle / 荷兰角 | 倾斜相机，使地平线呈对角线 |
| [037](https://showheyohtaki.github.io/motion-prompt/#037) | Slow motion / 慢动作 | 放慢动作的播放速度 |
| [038](https://showheyohtaki.github.io/motion-prompt/#038) | Speed ramp / 速度渐变 | 在同一镜头中改变播放速度 |
| [039](https://showheyohtaki.github.io/motion-prompt/#039) | Time-lapse / 延时摄影 | 把数小时压缩成几秒 |
| [040](https://showheyohtaki.github.io/motion-prompt/#040) | Freeze frame / 定格 | 让动作暂停片刻 |
| [041](https://showheyohtaki.github.io/motion-prompt/#041) | Jump cut / 跳切 | 构图不变，跳过一段时间 |
| [042](https://showheyohtaki.github.io/motion-prompt/#042) | Match cut / 匹配剪辑 | 利用相似形状或动作衔接镜头 |
| [043](https://showheyohtaki.github.io/motion-prompt/#043) | Whip pan / 甩镜头转场 | 快速横摇形成模糊并切入下一镜头 |
| [044](https://showheyohtaki.github.io/motion-prompt/#044) | Cross dissolve / 交叉溶解 | 两个镜头逐渐叠化切换 |
| [045](https://showheyohtaki.github.io/motion-prompt/#045) | Wipe / 划像转场 | 移动的边界逐步替换画面 |
| [046](https://showheyohtaki.github.io/motion-prompt/#046) | Smash cut / 突切 | 突然切到反差强烈的场景 |
| [047](https://showheyohtaki.github.io/motion-prompt/#047) | J-cut / J 型剪辑 | 下一场景的声音先于画面进入 |
| [048](https://showheyohtaki.github.io/motion-prompt/#048) | L-cut / L 型剪辑 | 前一场景的声音延续到下一画面 |

## ui: UI 组件 (049–072)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [049](https://showheyohtaki.github.io/motion-prompt/#049) | Modal dialog / 模态对话框 | 打开浮窗并暂时阻止操作背景 |
| [050](https://showheyohtaki.github.io/motion-prompt/#050) | Drawer (Off-canvas) / 抽屉面板 | 从屏幕侧边滑出的面板 |
| [051](https://showheyohtaki.github.io/motion-prompt/#051) | Bottom sheet / 底部面板 | 从屏幕底部升起的面板 |
| [052](https://showheyohtaki.github.io/motion-prompt/#052) | Accordion / 折叠面板 | 点击标题展开或收起内容 |
| [053](https://showheyohtaki.github.io/motion-prompt/#053) | Dropdown (select) / 下拉选择框 | 点击字段展开选项列表 |
| [054](https://showheyohtaki.github.io/motion-prompt/#054) | Tooltip / 文字提示 | 悬停时显示简短说明 |
| [055](https://showheyohtaki.github.io/motion-prompt/#055) | Popover / 气泡卡片 | 点击后显示指向触发按钮的小面板 |
| [056](https://showheyohtaki.github.io/motion-prompt/#056) | Toast notification / 轻提示 | 短消息出现后自动消失 |
| [057](https://showheyohtaki.github.io/motion-prompt/#057) | Tabs / 标签页 | 点击标签切换内容面板 |
| [058](https://showheyohtaki.github.io/motion-prompt/#058) | Carousel / 轮播图 | 横向滑动切换展示项 |
| [059](https://showheyohtaki.github.io/motion-prompt/#059) | Toggle switch / 开关 | 切换设置的开启与关闭状态 |
| [060](https://showheyohtaki.github.io/motion-prompt/#060) | Segmented control / 分段控制器 | 一排相连按钮用于切换视图 |
| [061](https://showheyohtaki.github.io/motion-prompt/#061) | Filter chips / 筛选标签 | 点击小标签组合筛选条件 |
| [062](https://showheyohtaki.github.io/motion-prompt/#062) | Range slider / 范围滑块 | 双滑块选择最小值与最大值 |
| [063](https://showheyohtaki.github.io/motion-prompt/#063) | Stepper (+/−) / 步进器 | 通过加减按钮逐次修改数值 |
| [064](https://showheyohtaki.github.io/motion-prompt/#064) | Pagination / 分页 | 通过页码切换列表页面 |
| [065](https://showheyohtaki.github.io/motion-prompt/#065) | Hamburger menu / 汉堡菜单 | 三横线图标点击后展开菜单 |
| [066](https://showheyohtaki.github.io/motion-prompt/#066) | Breadcrumbs / 面包屑导航 | 显示页面层级位置的链接路径 |
| [067](https://showheyohtaki.github.io/motion-prompt/#067) | Mega menu / 巨型菜单 | 主导航展开的宽幅分组链接面板 |
| [068](https://showheyohtaki.github.io/motion-prompt/#068) | Step indicator / 步骤指示器 | 显示流程的当前步骤与进度 |
| [069](https://showheyohtaki.github.io/motion-prompt/#069) | Skeleton screen / 骨架屏 | 加载时以灰色块预示内容布局 |
| [070](https://showheyohtaki.github.io/motion-prompt/#070) | Spinner / 加载转圈 | 旋转圆环表示等待 |
| [071](https://showheyohtaki.github.io/motion-prompt/#071) | Badge / 徽标 | 用小圆点或数字显示数量 |
| [072](https://showheyohtaki.github.io/motion-prompt/#072) | Empty state / 空状态 | 列表没有内容时显示的界面 |

## lp: 落地页与网页效果 (073–096)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [073](https://showheyohtaki.github.io/motion-prompt/#073) | Parallax scrolling / 视差滚动 | 滚动时背景层比内容移动得慢 |
| [074](https://showheyohtaki.github.io/motion-prompt/#074) | Fade-in on scroll / 滚动淡入 | 元素进入视口时逐渐出现 |
| [075](https://showheyohtaki.github.io/motion-prompt/#075) | Sticky header / 吸顶页头 | 滚动时页头停留在屏幕顶部 |
| [076](https://showheyohtaki.github.io/motion-prompt/#076) | Pinning / 滚动固定 | 区块固定，滚动推动内部内容变化 |
| [077](https://showheyohtaki.github.io/motion-prompt/#077) | Horizontal scroll / 横向滚动 | 纵向滚动驱动内容横移 |
| [078](https://showheyohtaki.github.io/motion-prompt/#078) | Scroll snap / 滚动吸附 | 滚动结束时自动对齐区块 |
| [079](https://showheyohtaki.github.io/motion-prompt/#079) | Scroll progress bar / 滚动进度条 | 顶部条显示阅读进度 |
| [080](https://showheyohtaki.github.io/motion-prompt/#080) | Highlighter animation / 荧光笔标记动画 | 重点文字下方逐渐画出色带 |
| [081](https://showheyohtaki.github.io/motion-prompt/#081) | Hover lift / 悬停抬升 | 悬停时元素抬高并加深阴影 |
| [082](https://showheyohtaki.github.io/motion-prompt/#082) | Image zoom on hover / 悬停图片放大 | 图片在固定边框内放大 |
| [083](https://showheyohtaki.github.io/motion-prompt/#083) | Cursor follower / 光标跟随 | 图形略带延迟地跟随指针 |
| [084](https://showheyohtaki.github.io/motion-prompt/#084) | Magnetic button / 磁吸按钮 | 按钮向附近光标偏移 |
| [085](https://showheyohtaki.github.io/motion-prompt/#085) | Ripple effect / 涟漪效果 | 从点击位置扩散的圆形波纹 |
| [086](https://showheyohtaki.github.io/motion-prompt/#086) | Underline animation / 下划线动画 | 悬停时链接下划线从左展开 |
| [087](https://showheyohtaki.github.io/motion-prompt/#087) | Before/after slider / 前后对比滑块 | 拖动分隔线比较处理前后 |
| [088](https://showheyohtaki.github.io/motion-prompt/#088) | Exit-intent popup / 离站挽留弹窗 | 访客准备离开时出现的弹窗 |
| [089](https://showheyohtaki.github.io/motion-prompt/#089) | Preloader / 预加载画面 | 页面加载期间显示的过渡界面 |
| [090](https://showheyohtaki.github.io/motion-prompt/#090) | Lazy loading / 懒加载 | 图片接近视口时才开始加载 |
| [091](https://showheyohtaki.github.io/motion-prompt/#091) | Infinite scroll / 无限滚动 | 滚动到底部时自动加载更多条目 |
| [092](https://showheyohtaki.github.io/motion-prompt/#092) | Page transition / 页面转场 | 连接两个页面的过渡动画 |
| [093](https://showheyohtaki.github.io/motion-prompt/#093) | Smooth scroll / 平滑滚动 | 页内链接平滑移动到目标位置 |
| [094](https://showheyohtaki.github.io/motion-prompt/#094) | Marquee / 跑马灯 | 文字或标志组成连续滚动带 |
| [095](https://showheyohtaki.github.io/motion-prompt/#095) | Animated gradient / 动态渐变 | 背景颜色持续移动和交融 |
| [096](https://showheyohtaki.github.io/motion-prompt/#096) | Floating animation / 悬浮动画 | 元素轻柔地上下浮动 |

## photo: 摄影效果、光线与风格 (097–120)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [097](https://showheyohtaki.github.io/motion-prompt/#097) | Backlighting / 逆光 | 光源位于主体后方 |
| [098](https://showheyohtaki.github.io/motion-prompt/#098) | Rim light / 轮廓光 | 后侧光勾勒主体边缘 |
| [099](https://showheyohtaki.github.io/motion-prompt/#099) | Silhouette / 剪影 | 主体成为明亮背景前的深色轮廓 |
| [100](https://showheyohtaki.github.io/motion-prompt/#100) | Split lighting / 分割光 | 侧面光让脸一半明亮、一半阴暗 |
| [101](https://showheyohtaki.github.io/motion-prompt/#101) | Rembrandt lighting / 伦勃朗光 | 侧上方光在背光脸颊留下亮三角 |
| [102](https://showheyohtaki.github.io/motion-prompt/#102) | Butterfly lighting / 蝴蝶光 | 正面高位光在鼻下形成蝶形阴影 |
| [103](https://showheyohtaki.github.io/motion-prompt/#103) | Golden hour / 黄金时刻 | 日出后或日落前的低角度暖光 |
| [104](https://showheyohtaki.github.io/motion-prompt/#104) | Blue hour / 蓝调时刻 | 日落后或日出前的深蓝天空时段 |
| [105](https://showheyohtaki.github.io/motion-prompt/#105) | Bokeh / 散景 | 失焦光点化为柔和光斑 |
| [106](https://showheyohtaki.github.io/motion-prompt/#106) | Tilt-shift / 移轴效果 | 通过选择性模糊让实景像微缩模型 |
| [107](https://showheyohtaki.github.io/motion-prompt/#107) | Long exposure / 长曝光 | 延长快门时间，让移动光源留下轨迹 |
| [108](https://showheyohtaki.github.io/motion-prompt/#108) | Panning shot / 追随拍摄 | 跟随运动主体，使背景产生拖影 |
| [109](https://showheyohtaki.github.io/motion-prompt/#109) | Lens flare / 镜头眩光 | 强光在镜头内产生光环和光斑 |
| [110](https://showheyohtaki.github.io/motion-prompt/#110) | Fisheye lens / 鱼眼镜头 | 超广角使中心鼓起、直线弯曲 |
| [111](https://showheyohtaki.github.io/motion-prompt/#111) | Chromatic aberration / 色差 | 高反差边缘出现不同颜色的色边 |
| [112](https://showheyohtaki.github.io/motion-prompt/#112) | Vignette / 暗角 | 画面四角变暗，视线集中到中央 |
| [113](https://showheyohtaki.github.io/motion-prompt/#113) | High-key / 高调 | 整体明亮、接近白色且阴影很浅 |
| [114](https://showheyohtaki.github.io/motion-prompt/#114) | Low-key / 低调 | 以暗色为主，只突出受光部分 |
| [115](https://showheyohtaki.github.io/motion-prompt/#115) | Black and white / 黑白 | 去除颜色，仅保留明暗 |
| [116](https://showheyohtaki.github.io/motion-prompt/#116) | Duotone / 双色调 | 用一种颜色映射暗部，另一种映射亮部 |
| [117](https://showheyohtaki.github.io/motion-prompt/#117) | Teal and orange / 青橙色调 | 阴影偏青，肤色与高光偏橙 |
| [118](https://showheyohtaki.github.io/motion-prompt/#118) | Film grain / 胶片颗粒 | 画面覆盖细微胶片质感颗粒 |
| [119](https://showheyohtaki.github.io/motion-prompt/#119) | Light leak / 漏光 | 红橙色光像漏入胶片一样侵入画面 |
| [120](https://showheyohtaki.github.io/motion-prompt/#120) | Double exposure / 双重曝光 | 两幅影像叠合在同一画面 |

## motion2: 动态图形（第 2 弹） (121–144)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [121](https://showheyohtaki.github.io/motion-prompt/#121) | Anticipation / 预备动作 | 运动前先向反方向稍稍蓄力 |
| [122](https://showheyohtaki.github.io/motion-prompt/#122) | Follow-through / 跟随动作 | 主体停下后，局部仍延迟摆动 |
| [123](https://showheyohtaki.github.io/motion-prompt/#123) | Bounce / 弹跳 | 落下后越弹越低直至停下 |
| [124](https://showheyohtaki.github.io/motion-prompt/#124) | Wiggle / 随机抖动 | 小幅、随机地持续晃动 |
| [125](https://showheyohtaki.github.io/motion-prompt/#125) | Pulse / 脉冲动画 | 像心跳一样有节奏地缩放 |
| [126](https://showheyohtaki.github.io/motion-prompt/#126) | Motion path / 运动路径 | 沿设定的曲线移动 |
| [127](https://showheyohtaki.github.io/motion-prompt/#127) | Ping-pong loop / 往返循环 | 正放后倒放，反复来回 |
| [128](https://showheyohtaki.github.io/motion-prompt/#128) | Stop-motion style / 定格动画风格 | 抽帧后动作一顿一顿 |
| [129](https://showheyohtaki.github.io/motion-prompt/#129) | Text scramble / 文字乱码效果 | 字符随机变换后定格为正确文字 |
| [130](https://showheyohtaki.github.io/motion-prompt/#130) | Wave text / 波浪文字 | 文字像波浪一样依次上下起伏 |
| [131](https://showheyohtaki.github.io/motion-prompt/#131) | Text on a path / 路径文字 | 文字沿线条或曲线流动 |
| [132](https://showheyohtaki.github.io/motion-prompt/#132) | Variable font animation / 可变字体动画 | 文字粗细平滑变化 |
| [133](https://showheyohtaki.github.io/motion-prompt/#133) | Text mask / 文字遮罩 | 镂空成文字形状，透出内部画面 |
| [134](https://showheyohtaki.github.io/motion-prompt/#134) | Repeater / 中继器 | 复制图形并排列旋转 |
| [135](https://showheyohtaki.github.io/motion-prompt/#135) | Kaleidoscope / 万花筒 | 像万花筒一样对称展开 |
| [136](https://showheyohtaki.github.io/motion-prompt/#136) | Line boil / 线条抖动 | 手绘线条逐帧轻微抖动 |
| [137](https://showheyohtaki.github.io/motion-prompt/#137) | Push transition / 推入转场 | 下一画面把当前画面推出 |
| [138](https://showheyohtaki.github.io/motion-prompt/#138) | Blinds transition / 百叶窗转场 | 从细条缝隙中打开下一画面 |
| [139](https://showheyohtaki.github.io/motion-prompt/#139) | Cube transition / 立方体转场 | 像立方体旋转一样切换画面 |
| [140](https://showheyohtaki.github.io/motion-prompt/#140) | Page curl / 翻页转场 | 像纸张一样卷起，翻到下一页 |
| [141](https://showheyohtaki.github.io/motion-prompt/#141) | Pixelate / 像素化转场 | 马赛克逐渐变粗后切换画面 |
| [142](https://showheyohtaki.github.io/motion-prompt/#142) | Shatter / 玻璃碎裂 | 像玻璃一样碎裂，碎片飞散 |
| [143](https://showheyohtaki.github.io/motion-prompt/#143) | Exploded view / 爆炸图 | 零件分离，展示内部结构 |
| [144](https://showheyohtaki.github.io/motion-prompt/#144) | Split screen / 分屏 | 分割画面，同时展示多个场景 |

## lp2: 落地页与网页效果（第 2 弹） (145–168)

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [145](https://showheyohtaki.github.io/motion-prompt/#145) | Timeline on scroll / 滚动时间轴 | 滚动时时间轴的线条随之延伸 |
| [146](https://showheyohtaki.github.io/motion-prompt/#146) | Scroll text reveal / 滚动文字显现 | 随着阅读，文字逐字变深 |
| [147](https://showheyohtaki.github.io/motion-prompt/#147) | Stacking cards / 堆叠卡片 | 滚动时卡片层层叠起 |
| [148](https://showheyohtaki.github.io/motion-prompt/#148) | Background color change on scroll / 滚动切换背景色 | 按区块切换页面背景色 |
| [149](https://showheyohtaki.github.io/motion-prompt/#149) | Hide-on-scroll header / 滚动隐藏页头 | 向下滚动时隐藏，向上滚动时出现 |
| [150](https://showheyohtaki.github.io/motion-prompt/#150) | Scrollspy / 滚动监听 | 目录高亮当前阅读的章节 |
| [151](https://showheyohtaki.github.io/motion-prompt/#151) | Back-to-top button / 回到顶部按钮 | 往下滚动后出现，点击回到顶部 |
| [152](https://showheyohtaki.github.io/motion-prompt/#152) | Zoom on scroll / 滚动放大 | 图片随滚动放大至铺满屏幕 |
| [153](https://showheyohtaki.github.io/motion-prompt/#153) | 3D tilt on hover / 3D 倾斜 | 卡片随光标方向立体倾斜 |
| [154](https://showheyohtaki.github.io/motion-prompt/#154) | Spotlight hover / 聚光灯悬停 | 只有光标周围变亮 |
| [155](https://showheyohtaki.github.io/motion-prompt/#155) | Image swap on hover / 悬停切换图片 | 悬停时换成另一张照片 |
| [156](https://showheyohtaki.github.io/motion-prompt/#156) | Text roll on hover / 悬停文字翻滚 | 文字向上翻转并替换 |
| [157](https://showheyohtaki.github.io/motion-prompt/#157) | Hover image reveal / 悬停图片预览 | 悬停列表项时显示对应照片 |
| [158](https://showheyohtaki.github.io/motion-prompt/#158) | Floating label / 浮动标签 | 开始输入时标签上移 |
| [159](https://showheyohtaki.github.io/motion-prompt/#159) | Inline validation / 实时校验 | 输入时即时显示对错 |
| [160](https://showheyohtaki.github.io/motion-prompt/#160) | Loading button / 加载按钮 | 点击后在按钮内显示加载中到完成 |
| [161](https://showheyohtaki.github.io/motion-prompt/#161) | View transition (shared element) / 视图过渡 | 列表中的照片直接展开为详情页 |
| [162](https://showheyohtaki.github.io/motion-prompt/#162) | Lightbox / 灯箱 | 点击图片后在变暗的背景上放大 |
| [163](https://showheyohtaki.github.io/motion-prompt/#163) | Hotspots / 图片热点 | 点击图片上的圆点显示说明 |
| [164](https://showheyohtaki.github.io/motion-prompt/#164) | Countdown timer / 倒计时 | 显示距截止时间的剩余时间并递减 |
| [165](https://showheyohtaki.github.io/motion-prompt/#165) | Animated shape divider / 动态形状分隔线 | 持续摆动的波浪形区块分隔线 |
| [166](https://showheyohtaki.github.io/motion-prompt/#166) | Like button animation / 点赞动画 | 点击后爱心迸发弹出 |
| [167](https://showheyohtaki.github.io/motion-prompt/#167) | Scroll-down cue / 向下滚动提示 | 持续循环、引导向下滚动的动画 |
| [168](https://showheyohtaki.github.io/motion-prompt/#168) | Background video / 背景视频 | 首屏背景中播放视频 |

## camera2: 镜头运动与转场（第 2 弹） (169–192) — supplement beyond the video title’s range

| ID | Name / 中文 | Source meaning |
|---|---|---|
| [169](https://showheyohtaki.github.io/motion-prompt/#169) | Pedestal / 垂直升降镜头 | 相机整体垂直上下平移 |
| [170](https://showheyohtaki.github.io/motion-prompt/#170) | Barrel roll / 横滚镜头 | 相机绕镜头光轴旋转一整圈 |
| [171](https://showheyohtaki.github.io/motion-prompt/#171) | Hyperlapse / 移动延时 | 相机边移动边拍的延时摄影 |
| [172](https://showheyohtaki.github.io/motion-prompt/#172) | Long take / 长镜头 | 不切换，一个镜头连续拍到底 |
| [173](https://showheyohtaki.github.io/motion-prompt/#173) | Steadicam / 斯坦尼康 | 消除抖动，平稳流畅地移动 |
| [174](https://showheyohtaki.github.io/motion-prompt/#174) | Follow shot / 背后跟拍 | 跟在主体身后移动 |
| [175](https://showheyohtaki.github.io/motion-prompt/#175) | Locked-off shot / 固定镜头 | 相机固定不动，只有主体移动 |
| [176](https://showheyohtaki.github.io/motion-prompt/#176) | Fly-through / 穿越镜头 | 穿过窗户或门进入下一个空间 |
| [177](https://showheyohtaki.github.io/motion-prompt/#177) | Low angle / 低角度镜头 | 从低处向上拍 |
| [178](https://showheyohtaki.github.io/motion-prompt/#178) | High angle / 高角度镜头 | 从高处向下拍 |
| [179](https://showheyohtaki.github.io/motion-prompt/#179) | POV shot / POV 镜头 | 以角色的视线观看 |
| [180](https://showheyohtaki.github.io/motion-prompt/#180) | Over-the-shoulder / 过肩镜头 | 越过一人的肩膀拍另一人 |
| [181](https://showheyohtaki.github.io/motion-prompt/#181) | Bird's-eye view / 鸟瞰镜头 | 从正上方垂直向下拍 |
| [182](https://showheyohtaki.github.io/motion-prompt/#182) | Deep focus / 深焦镜头 | 从近处到远处全部清晰 |
| [183](https://showheyohtaki.github.io/motion-prompt/#183) | Establishing shot / 定场镜头 | 开场交代地点的远景 |
| [184](https://showheyohtaki.github.io/motion-prompt/#184) | Extreme close-up / 大特写 | 只放大眼睛或指尖等局部 |
| [185](https://showheyohtaki.github.io/motion-prompt/#185) | Insert shot / 插入镜头 | 插入同一场景中的细节 |
| [186](https://showheyohtaki.github.io/motion-prompt/#186) | Morph cut / 变形剪切 | 平滑衔接相同构图的两段画面 |
| [187](https://showheyohtaki.github.io/motion-prompt/#187) | Fade to black / 淡出到黑场 | 画面逐渐变暗直至全黑 |
| [188](https://showheyohtaki.github.io/motion-prompt/#188) | Iris out / 圈出 | 圆形窗口收拢，画面变黑 |
| [189](https://showheyohtaki.github.io/motion-prompt/#189) | Cutaway / 切出镜头 | 切到其他对象后再切回 |
| [190](https://showheyohtaki.github.io/motion-prompt/#190) | Cross-cutting / 交叉剪辑 | 交替呈现同时发生的两个场景 |
| [191](https://showheyohtaki.github.io/motion-prompt/#191) | Bullet time / 子弹时间 | 时间静止，相机绕主体旋转 |
| [192](https://showheyohtaki.github.io/motion-prompt/#192) | Montage / 蒙太奇 | 用一连串短镜头压缩时间 |
