import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Badge, Button, Carousel, Collapse, ConfigProvider, Drawer, Dropdown, Empty, Form, Input, Modal, Pagination, Popover, Segmented, Select, Skeleton, Slider, Space, Spin, Steps, Switch, Tabs, Tag, Tooltip, notification } from 'antd';
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined, CopyOutlined, DownOutlined, ExpandOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MinusOutlined, PlusOutlined, ReloadOutlined, SlidersOutlined, ThunderboltOutlined } from '@ant-design/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './interactions.css';

gsap.registerPlugin(useGSAP);

export const interactionEffects = [
  ['049', '模态对话框', '作品清单说明', '点击“说明”'],
  ['050', '侧边抽屉', '本次收藏', '点击收藏计数'],
  ['051', '底部面板', '阅读速查', '点击“展开速查表”'],
  ['052', '手风琴', '阅读指南', '展开任意问题'],
  ['053', '下拉选择', '作品排序', '打开排序菜单并选择'],
  ['054', '悬浮提示', '作品浏览说明', '悬停或聚焦问号'],
  ['055', '气泡卡片', '图像热点', '点击图像上的编号'],
  ['056', '提示通知', '本地演示结果', '完成或取消本地任务'],
  ['057', '标签页', '阅读指南', '切换指南类别'],
  ['058', '轮播', '作品细读', '切换轮播作品'],
  ['059', '开关', '比较与流程设置', '切换网格或失败分支'],
  ['060', '分段控制', '图像细读模式', '切换比较／热点／轮播'],
  ['061', '筛选标签', '作品浏览', '选择形态标签'],
  ['062', '范围滑块', '同图比较', '拖动比较分界线'],
  ['063', '数字步进', '本地演示数量', '点击加减号'],
  ['064', '分页', '作品浏览', '切换作品页'],
  ['069', '骨架屏', '本地预览生成', '开始本地任务'],
  ['070', '旋转指示', '本地预览生成', '开始本地任务'],
  ['071', '角标', '本次收藏数量', '收藏或取消收藏作品'],
  ['072', '空状态', '空筛选／空收藏', '筛选“未收录”或清空收藏'],
  ['080', '荧光标记', '阅读指南重点', '指南进入视野或切换标签'],
  ['081', '悬停抬升', '作品卡片', '悬停或聚焦作品'],
  ['082', '图片缩放', '作品缩略图', '悬停或聚焦作品'],
  ['084', '磁吸按钮', '本地任务按钮内层', '在按钮内移动指针'],
  ['085', '点击涟漪', '本地任务按钮', '点击任务按钮'],
  ['086', '下划线', '阅读快捷链接', '悬停或聚焦链接'],
  ['087', '前后比较', '同一张原创插画', '拖动滑块比较同图颜色'],
  ['158', '浮动标签', '本地演示名称', '聚焦或输入名称'],
  ['159', '行内校验', '本地演示名称', '输入后离开输入框'],
  ['160', '加载按钮', '本地预览任务', '启动本地 Promise 任务'],
  ['161', '共享元素过渡', '缩略图至作品详情', '打开作品并返回'],
  ['162', '灯箱', '作品全屏阅读', '点击作品的“放大”'],
  ['163', '图像热点', '作品结构注释', '选择热点模式并点击编号'],
  ['166', '点赞粒子', '本次收藏', '点击作品心形按钮'],
].map(([id, name, host, trigger]) => ({ id, name, host, trigger }));

const WORKS = [
  { id: 'arc', title: '弧的回声', type: '圆与弧', tone: 'orange', num: '01', blurb: '同心的弧线留下方向，完整的圆保持重心。' },
  { id: 'fold', title: '折叠的日光', type: '线与面', tone: 'lime', num: '02', blurb: '平面相接的边缘，让同一种颜色拥有轻重。' },
  { id: 'orbit', title: '轨道之外', type: '圆与弧', tone: 'lilac', num: '03', blurb: '偏离中心的圆，与细线建立新的平衡。' },
  { id: 'ribbon', title: '一条流动的线', type: '线与面', tone: 'orange', num: '04', blurb: '连续的带状轮廓，把留白串成一个完整的动作。' },
  { id: 'cut', title: '留白切片', type: '线与面', tone: 'lilac', num: '05', blurb: '切开的圆与方形，以清楚的边界相互回应。' },
  { id: 'bloom', title: '慢慢盛放', type: '圆与弧', tone: 'lime', num: '06', blurb: '重复的弧沿着中心展开，留下节奏和呼吸。' },
  { id: 'steps', title: '向上一级', type: '线与面', tone: 'lime', num: '07', blurb: '重复的台阶，以清楚的落差指向上方。' },
  { id: 'twin', title: '两个引力', type: '圆与弧', tone: 'orange', num: '08', blurb: '两枚圆形在同一个框中保持不同的重量。' },
  { id: 'window', title: '窗内有风', type: '线与面', tone: 'lilac', num: '09', blurb: '透过平面的开口，看见另一层的颜色。' },
];
const COLORS = { orange: ['#ed663c', '#f8b99f', '#d7e8a0'], lime: ['#cde68d', '#839b5d', '#ef7951'], lilac: ['#b9a4d7', '#786493', '#dae89b'] };

// All gallery, comparison and shared-transition images use this original local SVG.
function Art({ work = WORKS[0], className = '', muted = false }) {
  const [main, soft, contrast] = COLORS[work.tone];
  const i = WORKS.findIndex(w => w.id === work.id);
  return <svg className={`ix-art ${className}`} viewBox="0 0 600 430" role="img" aria-label={`${work.title}，原创几何插画`} style={muted ? { filter: 'grayscale(1)' } : undefined}>
    <rect width="600" height="430" fill="#e8e3d7" />
    <path d="M0 366H600M0 299H600M0 232H600M0 165H600M0 98H600M96 0V430M197 0V430M298 0V430M399 0V430M500 0V430" stroke="#171b19" strokeOpacity=".055" />
    {i % 3 === 0 ? <>
      <circle cx="282" cy="218" r="144" fill={main} />
      <circle cx="282" cy="218" r="93" fill="#e8e3d7" />
      <path d="M282 74A144 144 0 0 1 426 218H282Z" fill="#171b19" />
      <circle cx="430" cy="320" r="48" fill={contrast} />
      <path d="M106 212V74H244" fill="none" stroke="#171b19" strokeWidth="3" />
      <path d="M146 321L240 226" stroke={soft} strokeWidth="32" />
    </> : i % 3 === 1 ? <>
      <path d="M145 334V95L302 168V407Z" fill={main} />
      <path d="M302 168L453 91V331L302 407Z" fill={soft} />
      <path d="M145 95L298 20L453 91L302 168Z" fill={contrast} />
      <circle cx="426" cy="313" r="61" fill="#171b19" />
      <path d="M93 338H508M94 353H508" stroke="#171b19" strokeWidth="2" />
    </> : <>
      <ellipse cx="307" cy="225" rx="198" ry="94" transform="rotate(-31 307 225)" stroke="#171b19" strokeWidth="4" fill="none" />
      <circle cx="287" cy="217" r="113" fill={main} />
      <path d="M287 104A113 113 0 0 0 287 330Z" fill={soft} />
      <circle cx="447" cy="142" r="45" fill={contrast} />
      <path d="M111 326L499 102" stroke="#171b19" strokeWidth="4" />
      <circle cx="157" cy="299" r="10" fill="#171b19" />
    </>}
    <text x="30" y="395" fontFamily="inherit" fontSize="15" letterSpacing="4" fill="#171b19">FORM STUDY / {work.num}</text>
    <path d="M539 29H570V60M30 60V29H61" stroke="#171b19" strokeWidth="2" fill="none" />
  </svg>;
}

function useActivity(root, paused, reduced) {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(typeof document !== 'undefined' && document.hidden);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    if (root.current) observer.observe(root.current);
    const change = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', change); };
  }, [root]);
  return paused || reduced || hidden || !visible;
}

function AnimatedBody({ children, direction = 'up', muted, className = '' }) {
  const ref = useRef(null);
  useGSAP(() => {
    const displacement = direction === 'right' ? { x: 120 } : direction === 'bottom' ? { y: 150 } : { y: 24, scale: .94 };
    if (muted) gsap.set(ref.current, { x: 0, y: 0, scale: 1, opacity: 1 });
    else gsap.fromTo(ref.current, { ...displacement, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: .56, ease: 'power3.out', overwrite: true });
  }, { scope: ref, dependencies: [muted] });
  return <div ref={ref} className={`ix-overlay-body ${className}`}>{children}</div>;
}

const GUIDE = {
  identity: { label: '追踪同一对象', title: '让眼睛知道，同一对象从哪里来，又到哪里去。', highlight: '同一对象', lines: [
    ['为什么缩略图要一路展开？', '作品从列表中的原位置变大，进入详情。图像身份、颜色和裁切保持连续；返回时沿原路缩回。你能看见变化发生在哪里。'],
    ['开到一半就关闭，会怎样？', '关闭会接着当前画面返回，避免先跳到完整展开状态。Esc、关闭按钮和遮罩都能退出，焦点回到原来的按钮。'],
    ['减少动态效果后，还能看吗？', '可以。内容与选择保持不变，大幅移动直接到达终点；提示、表单校验和任务结果仍然可读。'],
  ] },
  layout: { label: '看见空间变化', title: '展开一个问题，后面的内容会真的让出空间。', highlight: '让出空间', lines: [
    ['手风琴只改变透明度吗？', '不止。展开会增加实际高度，让下一行向下移动；箭头同步转过 180°。关闭后重新收回这块空间。'],
    ['筛选后，剩下的作品怎么排？', '不符合条件的作品会移出布局，留下的作品移动到新的位置。筛选条件、排序和分页显示的都是当前真实结果。'],
    ['标签页与分段控制有什么差别？', '标签页切换阅读内容，分段控制切换同一图像的观察方式。下方可分别尝试同图比较、结构热点与作品轮播。'],
  ] },
  feedback: { label: '读懂操作结果', title: '按钮的变化，跟随实际发生的结果。', highlight: '实际发生', lines: [
    ['等待中的动画在表达什么？', '这里只表示本地演示任务尚未结束，不显示虚构百分比。任务完成才出现结果；选择失败分支后会留下错误与重试入口。'],
    ['快速点很多次会重复执行吗？', '等待期间按钮禁用，防止重复开始。取消会使当前任务失效；稍后到来的旧结果不能覆盖新任务。'],
    ['收藏会上传或者永久保存吗？', '不会。本次收藏仅在当前页面内保留，用来演示角标、心形粒子与空状态。刷新页面后会恢复初始状态。'],
  ] },
};

export default function Interactions({ paused = false, reduced = false }) {
  const root = useRef(null);
  const flowRef = useRef(null);
  const muted = useActivity(root, paused, reduced);
  const flowMuted = useActivity(flowRef, paused, reduced);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const tweens = useRef(new Set());
  const { contextSafe } = useGSAP({ scope: root });
  const animate = contextSafe((target, vars) => {
    if (!target) return null;
    const tween = gsap.to(target, { overwrite: 'auto', ...vars, duration: mutedRef.current ? 0 : vars.duration ?? .4 });
    tweens.current.add(tween);
    if (tweens.current.size > 120) tweens.current = new Set([...tweens.current].filter(t => t.isActive()));
    return tween;
  });
  useEffect(() => { if (muted) tweens.current.forEach(t => { if (t.isActive()) t.progress(1); }); }, [muted]);
  useEffect(() => () => tweens.current.forEach(t => t.kill()), []);

  const [filter, setFilter] = useState('全部');
  const [sort, setSort] = useState('原始顺序');
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(new Set());
  const [drawer, setDrawer] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [about, setAbout] = useState(false);
  const [detail, setDetail] = useState(null);
  const [lightbox, setLightbox] = useState(false);
  const [lightIndex, setLightIndex] = useState(0);
  const [ghost, setGhost] = useState(null);
  const ghostRef = useRef(null);
  const ghostTween = useRef(null);
  const detailRef = useRef(null);
  const sourceRef = useRef(null);
  const detailTrigger = useRef(null);
  const detailClosing = useRef(false);
  const sourceRects = useRef(new Map());
  const priorCards = useRef(new Map());
  const [guide, setGuide] = useState('identity');
  const [study, setStudy] = useState('比较');
  const [compare, setCompare] = useState(51);
  const comparisonDragging = useRef(false);
  const [grid, setGrid] = useState(false);
  const [studyIndex, setStudyIndex] = useState(0);
  const carousel = useRef(null);
  const [hotspot, setHotspot] = useState(null);
  const [notificationApi, notificationContext] = notification.useNotification();
  useEffect(() => {
    // Removing the last focused saved row can leave focus on body. Keep Escape usable then too.
    const escape = event => {
      if (event.key !== 'Escape') return;
      if (drawer) setDrawer(false);
      else if (sheet) setSheet(false);
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [drawer, sheet]);

  const filtered = useMemo(() => {
    const result = WORKS.filter(w => filter === '全部' || w.type === filter);
    return sort === '倒序排列' ? result.reverse() : result;
  }, [filter, sort]);
  const displayed = filtered.slice((page - 1) * 6, page * 6);
  const captureCards = () => { priorCards.current = new Map([...root.current.querySelectorAll('.ix-gallery-card')].map(el => [el.dataset.work, el.getBoundingClientRect()])); };
  const updateCollection = (change) => { captureCards(); change(); };
  useLayoutEffect(() => {
    const cards = [...root.current.querySelectorAll('.ix-gallery-card')];
    cards.forEach((card, index) => {
      const before = priorCards.current.get(card.dataset.work);
      gsap.killTweensOf(card);
      gsap.set(card, { x: 0, y: 0, opacity: 1, scale: 1 });
      const after = card.getBoundingClientRect();
      if (before) {
        gsap.set(card, { x: before.left - after.left, y: before.top - after.top });
        animate(card, { x: 0, y: 0, duration: .63, ease: 'power3.inOut' });
      } else if (priorCards.current.size) {
        gsap.set(card, { y: 52, scale: .94, opacity: 0 });
        animate(card, { y: 0, scale: 1, opacity: 1, duration: .55, delay: muted ? 0 : index * .045, ease: 'power3.out' });
      }
    });
    priorCards.current.clear();
  }, [filter, sort, page]);

  const cardHover = (event, enter) => {
    const face = event.currentTarget.querySelector('.ix-card-face');
    const art = event.currentTarget.querySelector('.ix-art');
    animate(face, { y: enter ? -11 : 0, boxShadow: enter ? '0px 18px 28px rgba(23,27,25,.16)' : '0px 0px 0px rgba(23,27,25,0)', duration: .38, ease: 'power3.out' });
    animate(art, { scale: enter ? 1.09 : 1, duration: .58, ease: 'power3.out' });
  };
  const like = (work, event) => {
    event.stopPropagation();
    const wasLiked = likes.has(work.id);
    setLikes(current => { const next = new Set(current); next.has(work.id) ? next.delete(work.id) : next.add(work.id); return next; });
    const icon = event.currentTarget.querySelector('.ix-heart-icon');
    animate(icon, { keyframes: [{ scale: .7, duration: .07 }, { scale: wasLiked ? 1.15 : 1.5, duration: .16 }, { scale: 1, duration: .45 }], duration: .68, ease: 'elastic.out(1,.5)' });
    if (!wasLiked && !muted) {
      const particles = event.currentTarget.querySelectorAll('.ix-like-particle');
      gsap.set(particles, { x: 0, y: 0, scale: 1, opacity: 1 });
      particles.forEach((particle, index) => {
        const angle = index / particles.length * Math.PI * 2;
        animate(particle, { x: Math.cos(angle) * 35, y: Math.sin(angle) * 35, opacity: 0, scale: .2, duration: .65, ease: 'power2.out' });
      });
    }
  };
  useGSAP(() => {
    if (muted) return;
    gsap.fromTo(root.current.querySelector('.ix-like-count'), { scale: 1.45 }, { scale: 1, duration: .45, ease: 'back.out(2)' });
  }, { scope: root, dependencies: [likes.size, muted] });

  const openDetail = (work, event) => {
    const card = event.currentTarget.closest('.ix-gallery-card');
    const source = card?.querySelector('.ix-art-slot');
    if (!source) return;
    const rect = source.getBoundingClientRect();
    sourceRects.current.set(work.id, rect);
    sourceRef.current = source;
    detailTrigger.current = event.currentTarget;
    detailClosing.current = false;
    setDetail(work);
    if (!muted) { source.style.visibility = 'hidden'; setGhost({ work, rect }); }
  };

  const closeDetail = () => {
    if (!detail || detailClosing.current) return;
    detailClosing.current = true;
    ghostTween.current?.kill();
    const finish = () => {
      if (sourceRef.current) sourceRef.current.style.visibility = '';
      if (detailRef.current) detailRef.current.style.visibility = '';
      setGhost(null);
      setDetail(null);
      detailClosing.current = false;
      requestAnimationFrame(() => detailTrigger.current?.focus({ preventScroll: true }));
    };
    if (muted) { finish(); return; }
    const sourceRect = sourceRef.current?.getBoundingClientRect() || sourceRects.current.get(detail.id);
    const destination = detailRef.current?.getBoundingClientRect();
    if (!sourceRect || !destination) { finish(); return; }
    if (!ghost) {
      setGhost({ work: detail, rect: destination, returning: true });
      if (detailRef.current) detailRef.current.style.visibility = 'hidden';
      requestAnimationFrame(() => {
        if (!ghostRef.current) { finish(); return; }
        ghostTween.current = animate(ghostRef.current, { left: sourceRect.left, top: sourceRect.top, width: sourceRect.width, height: sourceRect.height, borderRadius: 8, duration: .64, ease: 'power3.inOut', onComplete: finish });
      });
    } else {
      if (detailRef.current) detailRef.current.style.visibility = 'hidden';
      ghostTween.current = animate(ghostRef.current, { left: sourceRect.left, top: sourceRect.top, width: sourceRect.width, height: sourceRect.height, borderRadius: 8, duration: .64, ease: 'power3.inOut', onComplete: finish });
    }
  };
  // The ghost survives opening/closing interruption; it always continues from its current geometry.
  const detailReady = (open) => {
    if (!open || !detail || detailClosing.current || muted || !ghostRef.current || !detailRef.current) return;
    const rect = detailRef.current.getBoundingClientRect();
    detailRef.current.style.visibility = 'hidden';
    ghostTween.current?.kill();
    ghostTween.current = animate(ghostRef.current, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, borderRadius: 10, duration: .72, ease: 'power3.inOut', onComplete: () => {
      if (detailClosing.current) return;
      if (detailRef.current) detailRef.current.style.visibility = '';
      setGhost(null);
    } });
  };
  useEffect(() => {
    if (muted && ghost && !detailClosing.current) {
      ghostTween.current?.kill();
      if (detailRef.current) detailRef.current.style.visibility = '';
      setGhost(null);
    }
  }, [muted]);
  useEffect(() => () => { ghostTween.current?.kill(); if (sourceRef.current) sourceRef.current.style.visibility = ''; }, []);
  useEffect(() => {
    const resize = () => {
      if (!detail || !ghostRef.current || detailClosing.current || !detailRef.current) return;
      const rect = detailRef.current.getBoundingClientRect();
      ghostTween.current?.kill();
      animate(ghostRef.current, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, duration: .2, onComplete: () => { if (detailRef.current) detailRef.current.style.visibility = ''; setGhost(null); } });
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [detail]);

  useGSAP(() => {
    const panel = root.current.querySelector('.ix-guide-copy');
    const markers = panel?.querySelectorAll('.ix-highlight-ink');
    if (muted) { gsap.set(panel, { y: 0, opacity: 1 }); gsap.set(markers, { scaleX: 1 }); return; }
    gsap.fromTo(panel, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out' });
    gsap.fromTo(markers, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: .85, delay: .18, ease: 'power3.out' });
  }, { scope: root, dependencies: [guide, muted] });

  useGSAP(() => {
    const surface = root.current.querySelector('.ix-study-surface');
    if (muted) gsap.set(surface, { opacity: 1, y: 0, scale: 1 });
    else gsap.fromTo(surface, { opacity: .35, y: 36, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .55, ease: 'power3.out' });
  }, { scope: root, dependencies: [study, muted] });

  const [form] = Form.useForm();
  const nameValue = Form.useWatch('name', form) || '';
  const [focused, setFocused] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const [fail, setFail] = useState(false);
  const [job, setJob] = useState('idle');
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState(false);
  const token = useRef(0);
  const operationBusy = useRef(false);
  const timer = useRef(null);
  const jobButton = useRef(null);
  const number = useRef(null);
  useEffect(() => () => { token.current++; clearTimeout(timer.current); }, []);
  useGSAP(() => {
    const label = root.current.querySelector('.ix-floating-label');
    gsap.to(label, { y: focused || nameValue ? -25 : 0, scale: focused || nameValue ? .78 : 1, color: focused ? '#d44925' : '#60675f', duration: muted ? 0 : .24, overwrite: true, transformOrigin: 'left center' });
  }, { scope: root, dependencies: [focused, !!nameValue, muted] });
  const changeQuantity = (delta) => {
    setQuantity(n => Math.max(1, Math.min(6, n + delta)));
    animate(number.current, { keyframes: [{ scale: 1.3, y: delta > 0 ? -5 : 5, duration: .11 }, { scale: 1, y: 0, duration: .3 }], duration: .41, ease: 'power3.out' });
  };
  const notify = (type, message, description) => notificationApi[type]({ message, description, placement: 'bottomRight', duration: 3.5, className: 'ix-notification', showProgress: true, pauseOnHover: true });
  const cancel = () => {
    token.current++;
    operationBusy.current = false;
    clearTimeout(timer.current);
    setJob('idle'); setResult(null);
    notify('info', '本地演示已取消', '这一轮结果已作废，可以重新开始。');
  };
  const startJob = async () => {
    if (operationBusy.current) return;
    operationBusy.current = true;
    try { await form.validateFields(); } catch { operationBusy.current = false; setFormError(true); return; }
    const current = ++token.current;
    const values = form.getFieldsValue();
    const requestedFailure = fail;
    const requestedQuantity = quantity;
    setFormError(false); setResult(null); setJob('pending');
    try {
      // This is a deliberately labelled local asynchronous demonstration; no network/persistence.
      await new Promise((resolve, reject) => { timer.current = setTimeout(() => requestedFailure ? reject(new Error('按你选择的失败分支结束。')) : resolve(), 1300); });
      if (current !== token.current) return;
      operationBusy.current = false;
      setResult({ name: values.name.trim(), quantity: requestedQuantity });
      setJob('success');
      notify('success', '本地预览已生成', `${values.name.trim()} · ${requestedQuantity} 张，仅保留在当前页面。`);
    } catch (error) {
      if (current !== token.current) return;
      operationBusy.current = false;
      setJob('error');
      notify('error', '本地演示进入失败分支', '输入内容已保留；关闭失败开关后可以重试。');
    }
  };
  const magnetic = (event, leave = false) => {
    if (muted) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const face = event.currentTarget.querySelector('.ix-magnetic-face');
    animate(face, { x: leave ? 0 : (event.clientX - rect.left - rect.width / 2) * .08, y: leave ? 0 : (event.clientY - rect.top - rect.height / 2) * .16, duration: leave ? .65 : .28, ease: leave ? 'elastic.out(1,.4)' : 'power2.out' });
  };
  const ripple = (event) => {
    if (muted) return;
    const holder = event.currentTarget.querySelector('.ix-ripple-holder');
    const rect = event.currentTarget.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'ix-ripple';
    const size = Math.hypot(rect.width, rect.height) * 2;
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    Object.assign(span.style, { width: `${size}px`, height: `${size}px`, left: `${x - rect.left - size / 2}px`, top: `${y - rect.top - size / 2}px` });
    holder?.appendChild(span);
    gsap.set(span, { scale: 0, opacity: .4 });
    animate(span, { scale: 1, opacity: 0, duration: .75, ease: 'power3.out', onComplete: () => span.remove() });
  };
  const underline = (event, enter) => { const line = event.currentTarget.querySelector('.ix-link-line'); if (line) { gsap.set(line, { transformOrigin: enter ? 'left center' : 'right center' }); animate(line, { scaleX: enter ? 1 : 0, duration: .32, ease: 'power3.out' }); } };
  const currentGuide = GUIDE[guide];
  const removeSaved = id => {
    setLikes(current => { const next = new Set(current); next.delete(id); return next; });
    requestAnimationFrame(() => {
      const target = document.querySelector('.ix-drawer .ix-saved-row .ant-btn') || document.querySelector('.ix-drawer .ant-drawer-close');
      target?.focus();
    });
  };
  const clearSaved = () => {
    setLikes(new Set());
    requestAnimationFrame(() => document.querySelector('.ix-drawer .ant-drawer-close')?.focus());
  };
  const comparePointer = (event) => {
    if (!comparisonDragging.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setCompare(Math.max(0, Math.min(100, Math.round((event.clientX - rect.left) / rect.width * 100))));
  };
  const phraseParts = currentGuide.title.split(currentGuide.highlight);
  const savedWorks = WORKS.filter(w => likes.has(w.id));
  const guideItems = Object.entries(GUIDE).map(([key, value]) => ({ key, label: value.label }));

  return <ConfigProvider wave={{ disabled: true }} theme={{ token: { motion: !muted, colorPrimary: '#ed663c', colorText: '#171b19', colorBgContainer: '#fffcf5', colorBorder: '#bcbcae', borderRadius: 8, fontFamily: 'inherit', controlHeight: 42 }, components: { Button: { fontWeight: 600, primaryShadow: 'none' }, Tabs: { inkBarColor: '#ed663c', itemSelectedColor: '#171b19', itemColor: '#6e736a' }, Segmented: { itemSelectedBg: '#171b19', itemSelectedColor: '#f5f2ea', trackBg: '#e6e4d8' }, Drawer: { colorBgElevated: '#f5f2ea' }, Modal: { contentBg: '#f5f2ea', headerBg: '#f5f2ea' } } }}>
    <section className={`ix-interactions ${muted ? 'ix-muted' : ''}`} ref={root} id="interaction-lab" data-effects={interactionEffects.length}>
      {notificationContext}
      <div className="ix-section-lead">
        <div><p className="ix-kicker">03 / INTERACTION PLAYGROUND</p><h2>动手，<em>画面才完整。</em></h2></div>
        <p className="ix-lead-note">从一个点击开始。打开、拖动、收藏，再试着中途返回——动效跟着你的操作走。</p>
      </div>

      <div className="ix-collection">
        <div className="ix-collection-top">
          <div><span className="ix-mini-index">01—浏览与展开</span><h3>挑一张，<br />让它来到眼前。<Tooltip title="悬停能看到图片缩放；点击作品，图像会从原位置展开。" trigger={['hover', 'focus']}><Button className="ix-info" type="text" aria-label="浏览操作说明" icon={<InfoCircleOutlined />} /></Tooltip></h3></div>
          <div className="ix-collection-actions">
            <Button type="text" onClick={() => setAbout(true)}>说明 <InfoCircleOutlined /></Button>
            <Badge count={likes.size} showZero color="#ed663c"><Button className="ix-saved-trigger" onClick={() => setDrawer(true)} icon={<HeartOutlined />}>本次收藏 <span className="ix-like-count">{likes.size}</span></Button></Badge>
          </div>
        </div>
        <div className="ix-filterbar">
          <div className="ix-filter-chips" role="group" aria-label="按作品形态筛选">
            {['全部', '圆与弧', '线与面', '未收录'].map(item => <Button key={item} aria-pressed={filter === item} className={`ix-chip ${filter === item ? 'ix-chip-selected' : ''}`} onClick={() => updateCollection(() => { setFilter(item); setPage(1); })}>{filter === item && <CheckOutlined />}{item}</Button>)}
          </div>
          <Dropdown trigger={['click']} menu={{ items: ['原始顺序', '倒序排列'].map(label => ({ key: label, label })), selectedKeys: [sort], selectable: true, onClick: ({ key }) => updateCollection(() => { setSort(key); setPage(1); }) }}><Button type="text" className="ix-sort" aria-label={`作品排序：${sort}`}>{sort} <DownOutlined /></Button></Dropdown>
        </div>
        <div className="ix-gallery" aria-live="polite">
          {displayed.map(work => <article className="ix-gallery-card" data-work={work.id} key={work.id} onPointerEnter={e => cardHover(e, true)} onPointerLeave={e => cardHover(e, false)} onFocusCapture={e => cardHover(e, true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) cardHover(e, false); }}>
            <div className="ix-card-face">
              <Button type="text" className="ix-open-work" onClick={e => openDetail(work, e)} aria-label={`打开作品：${work.title}`}>
                <span className="ix-art-slot"><Art work={work} /></span><span className="ix-open-word">展开作品 <ArrowRightOutlined /></span>
              </Button>
              <div className="ix-card-caption"><div><span className="ix-work-no">{work.num} / {work.type}</span><h4>{work.title}</h4></div><Button className={`ix-like ${likes.has(work.id) ? 'ix-liked' : ''}`} type="text" aria-label={`${likes.has(work.id) ? '取消收藏' : '收藏'}：${work.title}`} aria-pressed={likes.has(work.id)} onClick={e => like(work, e)}><span className="ix-heart-icon">{likes.has(work.id) ? <HeartFilled /> : <HeartOutlined />}</span>{Array.from({ length: 6 }, (_, i) => <i key={i} className="ix-like-particle" aria-hidden="true" />)}</Button></div>
            </div>
          </article>)}
          {!displayed.length && <div className="ix-empty"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="这里还没有这类作品。" /><Button onClick={() => updateCollection(() => { setFilter('全部'); setPage(1); })}>查看全部作品</Button></div>}
        </div>
        <div className="ix-gallery-foot"><span>{filtered.length} 张原创几何习作 · 点击心形可加入本次收藏</span><Pagination current={page} total={filtered.length} pageSize={6} hideOnSinglePage showSizeChanger={false} onChange={p => updateCollection(() => setPage(p))} /></div>
      </div>

      <div className="ix-guide" id="ix-reading-guide">
        <div className="ix-guide-side"><span className="ix-mini-index">02—阅读与切换</span><h3>变化有迹可循。</h3><p>切换标签，展开问题。观察文字出现的顺序，和下一行被推开的位置。</p><Button className="ix-underlink" type="link" onMouseEnter={e => underline(e, true)} onMouseLeave={e => underline(e, false)} onFocus={e => underline(e, true)} onBlur={e => underline(e, false)} onClick={() => setSheet(true)}>展开速查表 <ArrowDownOutlined /><i className="ix-link-line" /></Button><div className="ix-guide-stamp" aria-hidden="true">READ<br /><span>THE</span><br />MOTION <ArrowRightOutlined /></div></div>
        <div className="ix-guide-main"><Tabs activeKey={guide} items={guideItems} onChange={setGuide} /><div className="ix-guide-copy" key={guide}><h4>{phraseParts[0]}<span className="ix-highlight">{currentGuide.highlight}<i className="ix-highlight-ink" /></span>{phraseParts[1]}</h4><Collapse className="ix-accordion" bordered={false} expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined style={{ transform: `rotate(${isActive ? 180 : 0}deg)`, transition: muted ? 'none' : 'transform .36s cubic-bezier(.65,0,.35,1)' }} />} items={currentGuide.lines.map(([label, children], index) => ({ key: `${guide}-${index}`, label: <><span className="ix-question-no">0{index + 1}</span>{label}</>, children: <p>{children}</p> }))} /></div></div>
      </div>

      <div className="ix-study">
        <div className="ix-study-top"><div><span className="ix-mini-index">03—拖动与细读</span><h3>换个方式，<em>看同一张图。</em></h3></div><Segmented aria-label="图像观察方式" options={['比较', '热点', '轮播']} value={study} onChange={setStudy} /></div>
        <div className="ix-study-layout">
          <div className="ix-study-surface">
            {study === '比较' && <div className="ix-compare" style={{ '--ix-compare': `${compare}%` }} onPointerDown={event => { if (event.button !== 0) return; comparisonDragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); comparePointer(event); }} onPointerMove={comparePointer} onPointerUp={event => { comparisonDragging.current = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { comparisonDragging.current = false; }}><Art work={WORKS[0]} /><div className="ix-before"><Art work={WORKS[0]} muted /></div><div className="ix-compare-line"><span><ArrowLeftOutlined /><ArrowRightOutlined /></span></div><span className="ix-image-label ix-image-label-left">同图 / 灰度</span><span className="ix-image-label ix-image-label-right">同图 / 彩色</span>{grid && <div className="ix-composition-grid" aria-hidden="true" />}</div>}
            {study === '热点' && <div className="ix-hotspots"><Art work={WORKS[0]} />{[{ x: '47%', y: '28%', title: '圆弧的转折', text: '黑色扇形紧贴圆弧，让方向变得明确。' }, { x: '72%', y: '74%', title: '第二个重心', text: '右下的小圆，让主图形的重量向外延伸。' }, { x: '28%', y: '63%', title: '留白里的线', text: '斜线穿过空隙，连接圆环与画面边缘。' }].map((spot, i) => <Popover key={spot.title} title={spot.title} content={<p className="ix-hotspot-copy">{spot.text}</p>} trigger="click" open={hotspot === i} onOpenChange={open => setHotspot(open ? i : null)}><Button className={`ix-hotspot ix-hotspot-${i}`} style={{ left: spot.x, top: spot.y }} shape="circle" aria-label={`查看热点 ${i + 1}：${spot.title}`}>{i + 1}</Button></Popover>)}</div>}
            {study === '轮播' && <div className="ix-carousel"><Carousel ref={carousel} infinite={false} arrows={false} dots={false} afterChange={setStudyIndex} speed={muted ? 0 : 650} waitForAnimate={false}>{WORKS.slice(0, 3).map(work => <div key={work.id}><Art work={work} /></div>)}</Carousel><div className="ix-carousel-controls"><Button shape="circle" icon={<ArrowLeftOutlined />} aria-label="上一张作品" disabled={studyIndex === 0} onClick={() => carousel.current?.prev()} /><span>0{studyIndex + 1} / 03</span><Button shape="circle" icon={<ArrowRightOutlined />} aria-label="下一张作品" disabled={studyIndex === 2} onClick={() => carousel.current?.next()} /></div></div>}
          </div>
          <div className="ix-study-notes"><span className="ix-mini-index">{study === '比较' ? '087 / BEFORE & AFTER' : study === '热点' ? '163 / HOTSPOTS' : '058 / CAROUSEL'}</span><h4>{study === '比较' ? '颜色变了，构图没有。' : study === '热点' ? '每个细节，都有落点。' : WORKS[studyIndex].title}</h4><p>{study === '比较' ? '左右是同一幅插画。拖动分界线，观察颜色如何改变同一组形状的关系。' : study === '热点' ? '点击插画上的三个编号，注释会出现在它对应的结构旁。也可用 Tab 键逐个访问。' : WORKS[studyIndex].blurb}</p>{study === '比较' && <><label htmlFor="ix-compare-slider">灰度覆盖范围 <strong>{compare}%</strong></label><Slider id="ix-compare-slider" aria-label="灰度覆盖范围" value={compare} onChange={setCompare} tooltip={{ formatter: value => `${value}% 灰度` }} /><div className="ix-setting-row"><span>显示构图网格</span><Switch checked={grid} onChange={setGrid} aria-label="显示构图网格" /></div><p className="ix-small-note">滑块也支持方向键。这里只比较同图色彩，不代表任何修复效果。</p></>}{study === '热点' && <Button onClick={() => { setLightIndex(0); setLightbox(true); }} icon={<ExpandOutlined />}>放大这张作品</Button>}{study === '轮播' && <div className="ix-carousel-dots" role="group" aria-label="选择轮播作品">{WORKS.slice(0, 3).map((work, i) => <Button key={work.id} className={studyIndex === i ? 'ix-dot-active' : ''} aria-label={`切换到${work.title}`} aria-pressed={studyIndex === i} onClick={() => carousel.current?.goTo(i)}>{work.num}</Button>)}</div>}</div>
        </div>
      </div>

      <div className={`ix-flow ${flowMuted ? 'ix-flow-muted' : ''}`} ref={flowRef}>
        <div className="ix-flow-lead"><span className="ix-mini-index">04—输入与结果</span><h3>等一下。<br /><em>然后有个结果。</em></h3><p>试着填一个名字，再点开始。你可以选择成功或失败，也可以在中途取消。</p><Tag className="ix-demo-tag">本地演示 · 不发送、不上传</Tag><div className="ix-flow-outline" aria-hidden="true"><span>INPUT</span><ArrowDownOutlined /><span>WAIT</span><ArrowDownOutlined /><strong>RESULT</strong></div></div>
        <div className="ix-flow-workspace"><Steps className="ix-steps" size="small" current={job === 'pending' ? 1 : job === 'success' || job === 'error' ? 2 : 0} status={job === 'error' ? 'error' : 'process'} items={[{ title: '输入' }, { title: '本地等待' }, { title: '结果' }]} /><Form form={form} initialValues={{ name: '' }} layout="vertical" requiredMark={false} onFinish={startJob}>
          <div className="ix-floating-field"><Form.Item name="name" validateTrigger="onBlur" rules={[{ required: true, whitespace: true, message: '请先为这次演示起个名字。' }, { validator: (_, value) => !value?.trim() || [...value.trim()].length >= 2 && [...value.trim()].length <= 16 ? Promise.resolve() : Promise.reject(new Error('名称需要 2—16 个字。')) }]}><Input id="ix-demo-name" maxLength={32} autoComplete="off" disabled={job === 'pending'} aria-label="演示名称" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={() => setFormError(false)} /></Form.Item><label className="ix-floating-label" htmlFor="ix-demo-name">演示名称 · 2—16 个字</label></div>
          <div className="ix-flow-settings"><div><span className="ix-setting-label">预览数量</span><div className="ix-stepper"><Button icon={<MinusOutlined />} aria-label="减少预览数量" disabled={quantity === 1 || job === 'pending'} onClick={() => changeQuantity(-1)} /><output ref={number} aria-live="polite">{quantity}</output><Button icon={<PlusOutlined />} aria-label="增加预览数量" disabled={quantity === 6 || job === 'pending'} onClick={() => changeQuantity(1)} /></div></div><div className="ix-failure-choice"><span className="ix-setting-label">演示失败分支</span><Switch checked={fail} onChange={setFail} disabled={job === 'pending'} aria-label="演示失败分支" /><small>{fail ? '这一轮将返回错误' : '这一轮将生成本地预览'}</small></div></div>
          <div className="ix-submit-row"><Button ref={jobButton} className={`ix-submit ix-job-${job}`} htmlType="submit" disabled={job === 'pending'} aria-busy={job === 'pending'} onPointerMove={magnetic} onPointerLeave={e => magnetic(e, true)} onPointerCancel={e => magnetic(e, true)} onClick={ripple}><span className="ix-ripple-holder" aria-hidden="true" /><span className="ix-magnetic-face">{job === 'pending' ? <><Spin size="small" /> 本地任务进行中</> : job === 'success' ? <><CheckOutlined /> 再生成一次</> : job === 'error' ? <><ReloadOutlined /> 重试本地演示</> : <>开始本地演示 <ArrowRightOutlined /></>}</span></Button>{job === 'pending' && <Button type="text" onClick={cancel}>取消本轮</Button>}{(job === 'success' || job === 'error') && <Button type="text" onClick={() => { setJob('idle'); setResult(null); }}>收起结果</Button>}</div><p className="ix-small-note">实际运行一个本地异步任务，约 1.3 秒后结束。刷新后不会保留。</p>
        </Form><div className={`ix-result ix-result-${job}`} aria-live="polite" aria-atomic="true">{job === 'idle' && <div className="ix-ready"><div className="ix-ready-cross">＋</div><span>{formError ? '先完成上面的名称输入，再开始演示。' : '你的本地预览会出现在这里。'}</span></div>}{job === 'pending' && <div className="ix-skeleton"><Skeleton.Image active={!flowMuted} /><div><Skeleton active={!flowMuted} paragraph={{ rows: 2 }} title={{ width: '52%' }} /><span>正在运行本地演示任务…</span></div></div>}{job === 'success' && result && <div className="ix-success-result"><div className="ix-result-previews" style={{ gridTemplateColumns: result.quantity === 1 ? "1fr" : "repeat(2,minmax(0,1fr))" }}>{Array.from({ length: result.quantity }, (_, i) => <div className="ix-result-art" key={i}><Art work={WORKS[i]} /></div>)}</div><div><span className="ix-result-label"><CheckOutlined /> 本地演示完成</span><h4>{result.name}</h4><p>{result.quantity} 张预览已在当前页面生成。</p><span className="ix-small-note">这是演示结果，未写入文件或发送到服务。</span></div></div>}{job === 'error' && <div className="ix-error-result"><InfoCircleOutlined /><div><h4>这次按失败分支结束。</h4><p>名称和数量都已保留。关闭上面的失败开关，再点击重试。</p></div></div>}</div></div>
      </div>

      <Modal open={about} title="在这里可以试什么？" onCancel={() => setAbout(false)} onOk={() => setAbout(false)} okText="开始体验" cancelButtonProps={{ style: { display: 'none' } }} transitionName="" maskTransitionName="" rootClassName="ix-modal" destroyOnHidden><AnimatedBody muted={muted}><p className="ix-overlay-copy">九张原创几何习作，连接起筛选、分页、收藏、共享元素详情和灯箱。没有远程图片，也没有后台数据。</p><p className="ix-overlay-copy">先打开一张作品，再在它还没完全展开时按 Esc。之后试试收藏与清空，看看状态如何接上。</p></AnimatedBody></Modal>
      <Drawer open={drawer} onClose={() => setDrawer(false)} title={`本次收藏 · ${likes.size} 张`} rootClassName="ix-drawer" width={460} destroyOnHidden><AnimatedBody muted={muted} direction="right"><p className="ix-overlay-copy">只保留在当前页面，刷新后清空。</p>{savedWorks.length ? <><div className="ix-saved-list">{savedWorks.map(work => <div className="ix-saved-row" key={work.id}><Art work={work} /><div><span>{work.num} / {work.type}</span><h4>{work.title}</h4></div><Button type="text" icon={<CloseOutlined />} aria-label={`移出收藏：${work.title}`} onClick={() => removeSaved(work.id)} /></div>)}</div><Button onClick={clearSaved}>清空本次收藏</Button></> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有收藏。关闭侧栏，点一颗心试试。" />}</AnimatedBody></Drawer>
      <Drawer open={sheet} onClose={() => setSheet(false)} placement="bottom" title="动效速查表" rootClassName="ix-sheet" height="min(560px, 80vh)" destroyOnHidden><AnimatedBody muted={muted} direction="bottom"><div className="ix-sheet-grab" aria-hidden="true" /><div className="ix-cheatsheet">{[{ name: '同一对象', text: '用共享元素连接列表与详情。', ids: '161 / 162' }, { name: '真实空间', text: '展开内容时，让后面的内容让位。', ids: '052 / 061' }, { name: '操作反馈', text: '等待与结果，跟随实际状态。', ids: '069 / 070 / 160' }, { name: '不中断阅读', text: '减少动态效果时，保留完整内容。', ids: 'REDUCED MOTION' }].map(item => <div key={item.name}><span>{item.ids}</span><h4>{item.name}</h4><p>{item.text}</p></div>)}</div></AnimatedBody></Drawer>
      <Modal open={!!detail} footer={null} onCancel={closeDetail} width={1040} centered transitionName="" maskTransitionName="" rootClassName="ix-detail-modal" afterOpenChange={detailReady} destroyOnHidden focusTriggerAfterClose={false}>{detail && <div className="ix-detail"><div className="ix-detail-image" ref={detailRef}><Art work={detail} /></div><div className="ix-detail-text"><span className="ix-mini-index">FORM STUDY / {detail.num}</span><h3>{detail.title}</h3><p>{detail.blurb}</p><p className="ix-small-note">从缩略图连续展开到这里，返回时再回到原处。插画为本页原创 SVG。</p><Space wrap><Button icon={<ArrowLeftOutlined />} onClick={closeDetail}>返回作品列表</Button><Button icon={<ExpandOutlined />} onClick={() => { setLightIndex(WORKS.findIndex(w => w.id === detail.id)); setLightbox(true); }}>放大</Button></Space></div></div>}</Modal>
      <Modal open={lightbox} footer={null} title={WORKS[lightIndex].title} onCancel={() => setLightbox(false)} width="min(1120px, 92vw)" centered transitionName="" maskTransitionName="" rootClassName="ix-lightbox" destroyOnHidden><AnimatedBody muted={muted}><div className="ix-lightbox-art"><Art work={WORKS[lightIndex]} /></div><div className="ix-lightbox-nav"><Button aria-label="上一幅灯箱作品" icon={<ArrowLeftOutlined />} disabled={lightIndex === 0} onClick={() => setLightIndex(i => Math.max(0, i - 1))} /><span>{lightIndex + 1} / {WORKS.length} · {WORKS[lightIndex].title}</span><Button aria-label="下一幅灯箱作品" icon={<ArrowRightOutlined />} disabled={lightIndex === WORKS.length - 1} onClick={() => setLightIndex(i => Math.min(WORKS.length - 1, i + 1))} /></div></AnimatedBody></Modal>
      {ghost && createPortal(<div ref={ghostRef} className="ix-shared-ghost" aria-hidden="true" style={{ left: ghost.rect.left, top: ghost.rect.top, width: ghost.rect.width, height: ghost.rect.height }}><Art work={ghost.work} /></div>, document.body)}
    </section>
  </ConfigProvider>;
}
