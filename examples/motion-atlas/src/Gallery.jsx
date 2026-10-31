import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Empty, Input, Modal, Pagination, Select, Slider, Spin, Tooltip } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ExpandOutlined, PauseOutlined, PlayCircleOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useLenis } from 'lenis/react';
import catalog from './catalog-data.json';
import './gallery.css';

const PAGE_SIZE = 24;
const sourceBase = `${import.meta.env.BASE_URL}source/`;
const packPromises = new Map();
let runtimePromise;

function loadScript(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${sourceBase}${file}`;
    script.onload = resolve;
    script.onerror = () => { script.remove(); reject(new Error(`无法载入 ${file}`)); };
    document.head.appendChild(script);
  });
}

export function loadMotionPack(id) {
  if (window.MotionPrompt?.packs[id]) return Promise.resolve(window.MotionPrompt.packs[id]);
  if (!runtimePromise) runtimePromise = (window.MotionPrompt ? Promise.resolve() : loadScript('assets_runtime.js')).catch(error => { runtimePromise = null; throw error; });
  if (!packPromises.has(id)) {
    packPromises.set(id, runtimePromise.then(() => loadScript(`packs_${id}_pack.js`)).then(() => {
      const pack = window.MotionPrompt?.packs[id];
      if (!pack || pack.cells.length !== 24) throw new Error('示例组未完整载入');
      return pack;
    }).catch(error => { packPromises.delete(id); throw error; }));
  }
  return packPromises.get(id);
}

// A single scheduler serves every visible source preview. Hidden/offscreen
// canvases retain their pose without accumulating elapsed playback time.
const renderJobs = new Set();
let frameId = 0;
let lastFrame = 0;
function animate(now) {
  frameId = 0;
  if (document.hidden || !renderJobs.size) { lastFrame = 0; return; }
  const delta = lastFrame ? Math.min((now - lastFrame) / 1000, .065) : 0;
  lastFrame = now;
  renderJobs.forEach(job => job(delta, now));
  if (renderJobs.size) frameId = requestAnimationFrame(animate);
}
function wakeRenderer() {
  if (!frameId && renderJobs.size && !document.hidden) frameId = requestAnimationFrame(animate);
}
function addJob(job) {
  if (!renderJobs.size) document.addEventListener('visibilitychange', onVisibilityChange);
  renderJobs.add(job); wakeRenderer();
  return () => {
    renderJobs.delete(job);
    if (!renderJobs.size) {
      cancelAnimationFrame(frameId); frameId = 0; lastFrame = 0;
      document.removeEventListener('visibilitychange', onVisibilityChange);
    }
  };
}
function onVisibilityChange() {
  if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; lastFrame = 0; }
  else wakeRenderer();
}

function MotionCanvas({ item, playing, replay = 0, speed = 1, seek = null, onTick, onError, focus = false, onComplete, loop = true }) {
  const canvasRef = useRef(null);
  const clock = useRef(item.cycle * (item.poster ?? .32));
  const current = useRef({ playing, speed, onTick, onComplete, loop });
  current.current = { playing, speed, onTick, onComplete, loop };
  const drawRef = useRef(null);
  const syncRef = useRef(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let alive = true;
    let detachJob;
    let observer;
    let resize;
    const canvas = canvasRef.current;
    clock.current = current.current.playing ? 0 : item.cycle * (item.poster ?? .32);
    setState('loading');
    loadMotionPack(item.pack).then(pack => {
      if (!alive) return;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('当前浏览器无法绘制示例');
      let visible = false;
      let sized = false;
      let lastDraw = 0;
      let lastNotify = 0;
      let drawFailed = false;
      const draw = () => {
        if (!sized || drawFailed) return;
        try {
          context.save();
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.scale(canvas.width / pack.width, canvas.height / pack.height);
          // Source packs intentionally draw beyond their cell coordinates.
          // Clip before invoking one cell so it cannot bleed into neighbors.
          context.beginPath(); context.rect(0, 0, pack.width, pack.height); context.clip();
          pack.cells[item.index](context, pack.width, pack.height, clock.current % pack.cycle);
          context.restore();
        } catch (error) {
          try { context.restore(); } catch { /* retain DOM fallback */ }
          drawFailed = true;
          if (alive) setState('error');
          onError?.(item.id, error);
        }
      };
      drawRef.current = draw;
      const job = (delta, now) => {
        if (!visible || !sized || drawFailed || !current.current.playing) return;
        clock.current += delta * current.current.speed;
        if (clock.current >= pack.cycle) {
          clock.current = current.current.loop ? clock.current % pack.cycle : item.cycle * (item.poster ?? .32);
          current.current.onComplete?.();
        }
        if (now - lastDraw >= (focus ? 14 : 33)) { draw(); lastDraw = now; }
        if (now - lastNotify > 100) { current.current.onTick?.(clock.current); lastNotify = now; }
      };
      const updateJob = () => {
        detachJob?.(); detachJob = undefined;
        if (visible && sized && alive && current.current.playing) detachJob = addJob(job);
      };
      syncRef.current = updateJob;
      observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        updateJob();
        if (visible) draw();
      }, { rootMargin: '30px' });
      observer.observe(canvas);
      resize = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        if (width < 1 || height < 1) { sized = false; updateJob(); return; }
        const dpr = Math.min(window.devicePixelRatio || 1, focus ? 2 : 1.5);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        sized = true; draw(); updateJob();
      });
      resize.observe(canvas);
      setState('ready');
    }).catch(error => {
      if (alive) { setState('error'); onError?.(item.id, error); }
    });
    return () => { alive = false; detachJob?.(); observer?.disconnect(); resize?.disconnect(); drawRef.current = null; syncRef.current = null; };
  }, [item.id, item.pack, item.index, focus]);

  useEffect(() => { syncRef.current?.(); }, [playing]);

  useEffect(() => {
    if (replay === 0) return;
    clock.current = 0;
    drawRef.current?.();
    current.current.onTick?.(0);
  }, [replay]);
  useEffect(() => {
    if (seek === null) return;
    clock.current = Math.max(0, Math.min(item.cycle - .001, seek));
    drawRef.current?.();
    current.current.onTick?.(clock.current);
  }, [seek, item.cycle]);
  return <div className={`motion-canvas-wrap ${focus ? 'is-focus' : ''}`} style={{ aspectRatio: `${item.width} / ${item.height}` }} data-demo-id={item.id} data-render-state={state}>
    <canvas ref={canvasRef} className="motion-source-canvas" aria-label={`${item.id} ${item.name}：${item.meaning}`} role="img" />
    {state === 'loading' && <div className="motion-canvas-message"><Spin size="small" /><span>载入示例</span></div>}
    {state === 'error' && <div className="motion-canvas-message is-error"><span>此示例暂未载入</span><small>名称与说明仍可阅读，请刷新后重试。</small></div>}
  </div>;
}

const MotionTile = memo(function MotionTile({ item, paused, reduced, open, active }) {
  const [replay, setReplay] = useState(0);
  const [oneShot, setOneShot] = useState(false);
  const replayItem = () => { setReplay(value => value + 1); if (reduced) setOneShot(true); };
  return <article className={`motion-tile ${active ? 'is-selected' : ''}`} data-effect={item.id}>
    <div className="motion-tile-top"><span className="motion-tile-number">{item.id}</span><span>{catalog.packs.find(pack => pack.id === item.pack)?.title}</span></div>
    <button className="motion-preview-trigger" onClick={() => open(item)} aria-label={`放大查看 ${item.id} ${item.name}`} onMouseEnter={() => { if (!paused && !reduced) setReplay(value => value + 1); }}>
      <MotionCanvas item={item} playing={!paused && (!reduced || oneShot)} replay={replay} loop={!reduced} onComplete={() => { if (reduced) setOneShot(false); }} />
      <span className="motion-preview-expand"><ExpandOutlined /> 放大观察</span>
    </button>
    <div className="motion-tile-caption"><div><h3><button onClick={() => open(item)}>{item.name}</button></h3><p className="motion-original-name">{item.original}</p></div><Tooltip title={paused ? '请先恢复全页播放' : reduced ? '播放一遍' : '从头重播'}><Button shape="circle" size="small" icon={<ReloadOutlined />} disabled={paused} onClick={replayItem} aria-label={`重播 ${item.name}`} /></Tooltip></div>
    <p className="motion-tile-meaning">{item.meaning}</p>
  </article>;
});

function FocusPlayer({ item, paused, reduced, next, previous }) {
  const [playing, setPlaying] = useState(!paused && !reduced);
  const [replay, setReplay] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [position, setPosition] = useState(!paused && !reduced ? 0 : item.cycle * (item.poster ?? .32));
  const [seek, setSeek] = useState(null);
  const [manualReduced, setManualReduced] = useState(false);
  useEffect(() => { if (reduced) { setPlaying(false); setManualReduced(false); } }, [reduced]);
  const toggle = () => { setPlaying(value => !value); if (reduced) setManualReduced(true); };
  const restart = () => { setReplay(value => value + 1); setPosition(0); setSeek(null); setPlaying(true); if (reduced) setManualReduced(true); };
  const pack = catalog.packs.find(value => value.id === item.pack);
  return <div className="motion-focus-player">
    <div className="motion-focus-topline"><span>{pack.title} · 原始示例</span><span>{item.cycle.toFixed(1)} 秒 / 循环</span></div>
    <MotionCanvas item={item} playing={!paused && playing && (!reduced || manualReduced)} replay={replay} seek={seek} speed={speed} onTick={setPosition} focus loop={!reduced} onComplete={() => { if (reduced) { setPlaying(false); setManualReduced(false); } }} />
    <div className="motion-player-controls">
      <Button type="primary" icon={playing && !paused ? <PauseOutlined /> : <PlayCircleOutlined />} onClick={toggle} disabled={paused}>{paused ? '全页已暂停' : playing ? '暂停' : reduced ? '播放一遍' : '播放'}</Button>
      <Button icon={<ReloadOutlined />} onClick={restart} disabled={paused}>重播</Button>
      <div className="motion-player-time"><span>{position.toFixed(1)}s</span><span>/ {item.cycle.toFixed(1)}s</span></div>
      <Select aria-label="播放速度" value={speed} onChange={setSpeed} options={[.25, .5, 1, 1.5, 2].map(value => ({ value, label: `${value}×` }))} popupMatchSelectWidth={false} />
      <div className="motion-focus-neighbors"><Button icon={<ArrowLeftOutlined />} onClick={previous} aria-label="上一个示例" /><Button icon={<ArrowRightOutlined />} onClick={next} aria-label="下一个示例" /></div>
    </div>
    <div className="motion-player-scrub"><Slider aria-label="示例播放进度" min={0} max={item.cycle} step={.01} value={position} tooltip={{ formatter: value => `${Number(value).toFixed(2)} 秒` }} onChange={value => { setPlaying(false); setPosition(value); setSeek(value); }} /><span>拖动进度，观察中间状态</span></div>
    <div className="motion-focus-details"><div className="motion-focus-meaning"><span className="motion-detail-label">画面关系</span><h3>{item.meaning}</h3><p>{item.summary}</p><span className="motion-detail-label">这样告诉 AI</span><blockquote>{item.ask}</blockquote></div><details className="motion-source-spec"><summary>展开原始制作参数（英文）</summary><ul>{item.spec?.map((line, index) => <li key={index}>{line}</li>)}</ul><p>{item.use}</p></details></div>
    <p className="motion-demo-boundary">此处播放 Motion Prompt 的 Canvas 原始示例。画面内的鼠标、滚动和界面状态由时间模拟；本页播放器与筛选可实际操作。</p>
  </div>;
}

export default function Gallery({ paused = false, reduced = false }) {
  const [pack, setPack] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const gridRef = useRef(null);
  const lenis = useLenis();
  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return catalog.items.filter(item => (pack === 'all' || item.pack === pack) && words.every(word => `${item.id} ${item.name} ${item.original} ${item.meaning} ${item.meaningEn} ${item.tags.join(' ')}`.toLowerCase().includes(word)));
  }, [pack, query]);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const open = useCallback(item => setSelected(item), []);
  const choosePack = id => { setPack(id); setPage(1); };
  const changePage = value => {
    setPage(value);
    if (lenis && gridRef.current) lenis.scrollTo(gridRef.current, { offset: -95, immediate: reduced });
    else gridRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };
  const neighbor = direction => {
    const pool = filtered.length ? filtered : catalog.items;
    const index = pool.findIndex(item => item.id === selected.id);
    setSelected(pool[(index + direction + pool.length) % pool.length]);
  };
  return <section className="motion-gallery" id="motion-library" aria-labelledby="motion-library-heading">
    <div className="motion-gallery-heading"><div><span className="motion-section-index">03 / COMPLETE CATALOGUE</span><h2 id="motion-library-heading">把每一种动效，<br /><em>真正播放出来。</em></h2></div><div className="motion-gallery-intro"><p>192 个原始示例，8 组视觉语言。<br />先看它怎么动，再点开放大、慢放和逐段观察。</p><span className="motion-library-status"><i /> {paused ? '已暂停自动播放' : reduced ? '已减少自动动画 · 可手动播放一遍' : '可见示例自动播放 · 移入重播'}</span></div></div>
    <div className="motion-gallery-toolbar"><div className="motion-pack-filters" role="group" aria-label="示例分类"><Button className={pack === 'all' ? 'is-active' : ''} onClick={() => choosePack('all')}>全部 <span>192</span></Button>{catalog.packs.map(value => <Button key={value.id} className={pack === value.id ? 'is-active' : ''} onClick={() => choosePack(value.id)}>{value.title.replace('（第 2 弹）', ' II')} <span>24</span></Button>)}</div><Input className="motion-search" prefix={<SearchOutlined />} placeholder="搜索名称、中文含义或编号" aria-label="搜索示例" value={query} allowClear onChange={event => { setQuery(event.target.value); setPage(1); }} /></div>
    <div className="motion-results-line" aria-live="polite"><span>{query ? `“${query}” · ` : ''}{pack === 'all' ? '全部分类' : catalog.packs.find(value => value.id === pack)?.title} · {filtered.length} 个示例</span><span>{filtered.length ? `${(page - 1) * PAGE_SIZE + 1}—${Math.min(page * PAGE_SIZE, filtered.length)}` : '0'} / {filtered.length}</span></div>
    <div className="motion-gallery-grid" ref={gridRef}>{visible.map(item => <MotionTile key={item.id} item={item} paused={paused || !!selected} reduced={reduced} open={open} active={item.id === selected?.id} />)}</div>
    {!filtered.length && <div className="motion-empty"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有找到对应的示例。试试更短的关键词，或切换到全部分类。" /><Button onClick={() => { setQuery(''); setPack('all'); }}>查看全部 192 项</Button></div>}
    {filtered.length > PAGE_SIZE && <div className="motion-pagination"><span>每页 24 项，翻页继续看。</span><Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} showSizeChanger={false} onChange={changePage} /></div>}
    <div className="motion-source-credit"><span>示例：Motion Prompt · Shohei Ohtaki · MIT</span><div><a href="https://github.com/showheyohtaki/motion-prompt" target="_blank" rel="noreferrer">原始项目 ↗</a><a href={`${sourceBase}LICENSE`} target="_blank" rel="noreferrer">许可</a><a href={`${sourceBase}THIRD-PARTY-NOTICES.md`} target="_blank" rel="noreferrer">第三方声明</a></div></div>
    <Modal className="motion-focus-modal" open={!!selected} onCancel={() => setSelected(null)} footer={null} width={1050} centered destroyOnClose title={selected && <div className="motion-focus-title"><span>{selected.id}</span><div>{selected.name}<small>{selected.original}</small></div></div>}>
      {selected && <FocusPlayer key={selected.id} item={selected} paused={paused} reduced={reduced} previous={() => neighbor(-1)} next={() => neighbor(1)} />}
    </Modal>
  </section>;
}
