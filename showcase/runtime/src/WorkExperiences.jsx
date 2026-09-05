import { lazy, Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  InputNumber,
  Progress,
  Segmented,
  Select,
  Space,
  Tabs,
  Tag
} from "antd";
import {
  AimOutlined,
  ApartmentOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DatabaseOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  PlusOutlined,
  RadarChartOutlined,
  SearchOutlined,
  ShopOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { animate, createDraggable, createTimeline, stagger } from "animejs";
import VisualStage from "./VisualStage";
import { useReducedMotion } from "./useReducedMotion";

const WorkChart = lazy(() => import("./WorkChart"));

function ChartBlock({ page, data, kind, label, height }) {
  return (
    <Suspense fallback={<div className="work-chart-fallback"><LineChartOutlined /><span>正在整理演示记录…</span></div>}>
      <WorkChart page={page} data={data} kind={kind} label={label} height={height} />
    </Suspense>
  );
}

function statusColor(status) {
  if (["已复盘", "已确认", "已通过", "充足", "完成"].includes(status)) return "success";
  if (["待处置", "低库存", "需修改", "阻塞"].includes(status)) return "error";
  if (["跟踪中", "进行中", "待复盘", "待审"].includes(status)) return "warning";
  return "processing";
}

function useScopedMotion(rootRef, reduced, key, build) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;
    const result = build(root);
    const effects = Array.isArray(result) ? result : [result];
    return () => effects.forEach(effect => effect?.revert?.());
  }, [key, reduced, rootRef]);
}

const velocitySeed = [
  { id: "RUN-241", date: "09/04", type: "坡道间歇", distance: 8.4, duration: "48:20", pace: "4′12″", load: 87, status: "待复盘", note: "末组步频下降，关注左侧触地。" },
  { id: "RUN-238", date: "09/02", type: "恢复跑", distance: 6.2, duration: "36:08", pace: "5′49″", load: 42, status: "已复盘", note: "恢复区间稳定。" },
  { id: "RUN-232", date: "08/30", type: "乳酸阈值", distance: 10.1, duration: "51:40", pace: "4′35″", load: 76, status: "待复盘", note: "后半程心率漂移 4%。" },
  { id: "RUN-229", date: "08/28", type: "长距离", distance: 18.0, duration: "1:34:18", pace: "5′14″", load: 91, status: "已复盘", note: "补给节奏符合计划。" },
  { id: "RUN-224", date: "08/26", type: "轻松跑", distance: 7.5, duration: "42:01", pace: "5′36″", load: 48, status: "已复盘", note: "落地噪声降低。" }
];

export function VelocityWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [sessions, setSessions] = useState(velocitySeed);
  const [activeId, setActiveId] = useState("RUN-241");
  const [filter, setFilter] = useState("all");
  const [reviewing, setReviewing] = useState(false);
  const [notice, setNotice] = useState("");
  const active = sessions.find(item => item.id === activeId) || sessions[0];
  const visible = sessions.filter(item => filter === "all" || (filter === "pending" ? item.status === "待复盘" : item.status === "已复盘"));
  const trend = sessions.slice().reverse().map(item => ({ label: item.date, value: item.load }));

  useScopedMotion(rootRef, reduced, `${activeId}-${reviewing}`, root => {
    const intro = createTimeline({ defaults: { ease: "out(4)", duration: 680 } })
      .add(root.querySelector(".velocity-wordmark"), { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] })
      .add(root.querySelectorAll(".velocity-timeline-stop"), { y: [28, 0], opacity: [0, 1], delay: stagger(55) }, "-=360")
      .add(root.querySelector(".velocity-track-path"), { strokeDashoffset: [520, 0], duration: 1000 }, "-=420");
    const runner = animate(root.querySelector(".velocity-runner-dot"), {
      x: [0, 420],
      duration: 2100,
      ease: "inOut(2)",
      alternate: true,
      loop: true
    });
    const activeMotion = animate(root.querySelector(".velocity-active-load"), {
      scale: [0.78, 1],
      opacity: [0.2, 1],
      duration: 520,
      ease: "out(4)"
    });
    const bench = reviewing ? animate(root.querySelector(".velocity-review-dock"), {
      clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
      y: [24, 0],
      duration: 620,
      ease: "out(4)"
    }) : null;
    return [intro, runner, activeMotion, bench];
  });

  const completeReview = values => {
    setSessions(items => items.map(item => item.id === active.id ? { ...item, status: "已复盘", note: values.note } : item));
    setNotice(`${active.id} 已完成复盘，训练带和趋势数据已同步。`);
    setReviewing(false);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell velocity-replay-arena" data-motion-signature="full-bleed-track-replay">
      <img className="velocity-arena-image" src={page.images[0].src} alt={page.images[0].alt} />
      <div className="velocity-arena-shade" aria-hidden="true" />
      <a className="velocity-start-exit" href="../gallery/"><ArrowLeftOutlined /><span>ALL RUNS</span></a>
      <Segmented className="velocity-filter" aria-label="筛选训练复盘状态" size="small" value={filter} onChange={setFilter} options={[
        { label: "全部", value: "all" }, { label: "待复盘", value: "pending" }, { label: "完成", value: "reviewed" }
      ]} />

      <header className="velocity-arena-title">
        <span>COACH REPLAY / {active.id}</span>
        <h1 className="velocity-wordmark">READ<br />THE RUN.</h1>
        <small>{page.fontStatement}</small>
      </header>

      <svg className="velocity-track-map" viewBox="0 0 820 300" aria-hidden="true">
        <path className="velocity-track-guide" d="M40 238 C180 18 470 36 780 218" />
        <path className="velocity-track-path" d="M40 238 C180 18 470 36 780 218" />
      </svg>
      <i className="velocity-runner-dot" aria-hidden="true" />

      <div className="velocity-live-metric velocity-active-load"><small>TRAINING LOAD</small><strong>{active.load}</strong><span>{active.pace} / KM</span></div>
      <div className="velocity-timecode"><small>ELAPSED</small><strong>{active.duration}</strong><span>{active.distance} KM</span></div>
      <blockquote className="velocity-coach-call">“{active.note}”</blockquote>

      <div className="velocity-chart-ribbon"><span><LineChartOutlined /> LOAD REPLAY</span><ChartBlock page={page} data={trend} kind="line" label="近五次训练负荷" height={96} /></div>

      <nav className="velocity-timeline" aria-label="训练记录" data-native-scroll>
        {visible.map((item, index) => (
          <Button key={item.id} type="text" className={`velocity-timeline-stop ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setReviewing(false); }}>
            <span>{String(index + 1).padStart(2, "0")}</span><i /><div><strong>{item.type}</strong><small>{item.date} · {item.load}</small></div>
          </Button>
        ))}
      </nav>

      <Button className="velocity-review-trigger" type="primary" icon={<ThunderboltOutlined />} disabled={active.status === "已复盘"} onClick={() => setReviewing(true)}>
        {active.status === "已复盘" ? "已复盘" : "复盘本圈"}
      </Button>
      {notice && <Alert className="velocity-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
      {reviewing && (
        <div className="velocity-review-dock">
          <b>{active.id} / COACH NOTE</b>
          <Form layout="inline" key={active.id} onFinish={completeReview} initialValues={{ note: active.note }}>
            <Form.Item name="note" rules={[{ required: true, message: "请写下本次复盘结论" }]}><Input.TextArea aria-label="教练结论" autoSize={{ minRows: 2, maxRows: 3 }} maxLength={120} /></Form.Item>
            <Form.Item><Space.Compact><Button onClick={() => setReviewing(false)}>收起</Button><Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>保存复盘</Button></Space.Compact></Form.Item>
          </Form>
        </div>
      )}
    </section>
  );
}

const orbitalSeed = [
  { id: "AL-17", title: "Ka 波段链路抖动", priority: "高", status: "待处置", time: "11:47:08", system: "Relay-04", detail: "连续 3 个采样窗低于链路稳定阈值。", value: "92.4%" },
  { id: "AL-12", title: "姿态轮温升", priority: "中", status: "跟踪中", time: "11:39:42", system: "AOCS", detail: "温度上升速率已回落，继续观察两个轨道段。", value: "48.6°C" },
  { id: "AL-09", title: "地面站切换完成", priority: "低", status: "已确认", time: "11:22:15", system: "GS-NORTH", detail: "主链路已切换，遥测连续性正常。", value: "PASS" }
];

const telemetrySeed = [
  { label: "11:42", value: 98.1 }, { label: "11:43", value: 97.6 }, { label: "11:44", value: 96.8 },
  { label: "11:45", value: 95.2 }, { label: "11:46", value: 93.6 }, { label: "11:47", value: 92.4 }
];

export function OrbitalWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [alerts, setAlerts] = useState(orbitalSeed);
  const [activeId, setActiveId] = useState("AL-17");
  const [armed, setArmed] = useState(false);
  const [notice, setNotice] = useState("");
  const active = alerts.find(item => item.id === activeId) || alerts[0];

  useScopedMotion(rootRef, reduced, `${activeId}-${armed}`, root => {
    const scan = animate(root.querySelector(".orbital-scan"), { rotate: [0, 360], duration: 4200, ease: "linear", loop: true });
    const path = animate(root.querySelector(".orbital-route"), { strokeDashoffset: [360, 0], duration: 1800, ease: "inOut(2)", alternate: true, loop: true });
    const alert = animate(root.querySelector(".orbital-active-ping"), { scale: [0.6, 1.5], opacity: [1, 0], duration: 1200, ease: "out(3)", loop: true });
    const nodes = animate(root.querySelectorAll(".orbital-alert-node"), { scale: [.4, 1], opacity: [0, 1], delay: stagger(90), duration: 640, ease: "out(4)" });
    const slot = armed ? animate(root.querySelector(".orbital-command-arc"), { y: [90, 0], opacity: [0, 1], duration: 560, ease: "out(4)" }) : null;
    return [scan, path, alert, nodes, slot];
  });

  const acknowledge = values => {
    setAlerts(items => items.map(item => item.id === active.id ? { ...item, status: "已确认", detail: `${item.detail} 处置：${values.action}。${values.note || ""}` } : item));
    setNotice(`${active.id} 已确认，任务队列立即收敛。`);
    setArmed(false);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell orbital-radial-cockpit" data-motion-signature="radial-orbit-command-wheel">
      <div className="orbital-space"><VisualStage page={page} /></div>
      <svg className="orbital-flight-overlay" viewBox="0 0 1000 760" aria-hidden="true">
        <ellipse className="orbital-orbit-ring ring-a" cx="500" cy="380" rx="390" ry="210" />
        <ellipse className="orbital-orbit-ring ring-b" cx="500" cy="380" rx="290" ry="330" />
        <path className="orbital-route" d="M112 394 C230 70 770 70 888 394 C770 690 230 690 112 394" />
      </svg>
      <div className="orbital-scan" aria-hidden="true"><i /></div>
      <span className="orbital-active-ping" aria-hidden="true" />

      <a className="orbital-home-node" href="../gallery/" aria-label="返回全部作品"><ArrowLeftOutlined /><small>RETURN<br />VECTOR</small></a>
      <div className="orbital-live-badge"><Badge status="success" text="RELAY-04 ONLINE" /><span>UTC 11:47:20</span></div>
      <div className="orbital-coordinate">ALT 547.2 KM<br />NEXT WINDOW 00:18:42</div>

      <nav className="orbital-node-ring" aria-label="轨道告警">
        {alerts.map((item, index) => (
          <Button key={item.id} type="text" className={`orbital-alert-node ${item.id === active.id ? "is-active" : ""}`} style={{ "--orbit-index": index }} onClick={() => { setActiveId(item.id); setArmed(false); }}>
            <span className={`priority priority-${item.priority}`} /><b>{item.id}</b><small>{item.title}</small>
          </Button>
        ))}
      </nav>

      <article className="orbital-core-readout">
        <span>{active.system} / {active.time}</span><strong>{active.value}</strong><h1>{active.title}</h1><p>{active.detail}</p>
        <Tag color={statusColor(active.status)}>{active.status}</Tag>
        <Button className="orbital-arm-action" type="primary" shape="round" icon={<AimOutlined />} disabled={active.status === "已确认"} onClick={() => setArmed(true)}>{active.status === "已确认" ? "处置已确认" : "展开处置扇区"}</Button>
      </article>

      <div className="orbital-telemetry-arc"><span>LINK STABILITY / FIXTURE</span><ChartBlock page={page} data={telemetrySeed} kind="area" label="链路稳定度最近六个采样" height={104} /></div>
      {notice && <Alert className="orbital-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
      {armed && (
        <div className="orbital-command-arc">
          <b>CMD {active.id.slice(-2)}</b>
          <Form className="orbital-command-form" layout="inline" onFinish={acknowledge} initialValues={{ action: "切换备用链路" }}>
            <Form.Item name="action" rules={[{ required: true }]}><Select aria-label="处置方式" options={["切换备用链路", "继续观察", "转交姿态组"].map(value => ({ label: value, value }))} /></Form.Item>
            <Form.Item name="note"><Input aria-label="值班记录" placeholder="值班记录" maxLength={120} /></Form.Item>
            <Form.Item><Space.Compact><Button onClick={() => setArmed(false)}>收起</Button><Button type="primary" htmlType="submit">确认处置</Button></Space.Compact></Form.Item>
          </Form>
        </div>
      )}
      <small className="orbital-font-note">OPEN TYPE / {page.fontStatement}</small>
    </section>
  );
}

const inventorySeed = [
  { id: "SKU-018", name: "蜜柑纸袋", category: "鲜果", stock: 6, threshold: 12, sold: 18, price: 26 },
  { id: "SKU-031", name: "手作酸面包", category: "烘焙", stock: 4, threshold: 8, sold: 11, price: 32 },
  { id: "SKU-044", name: "山野蜂蜜", category: "杂货", stock: 15, threshold: 6, sold: 5, price: 58 },
  { id: "SKU-052", name: "陶碗小号", category: "器物", stock: 9, threshold: 5, sold: 3, price: 46 },
  { id: "SKU-067", name: "柠檬苏打", category: "饮品", stock: 22, threshold: 10, sold: 14, price: 16 }
];

export function CornerWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [inventory, setInventory] = useState(inventorySeed);
  const [activeId, setActiveId] = useState("SKU-018");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [notice, setNotice] = useState("");
  const active = inventory.find(item => item.id === activeId) || inventory[0];
  const categories = ["全部", ...new Set(inventory.map(item => item.category))];
  const visible = inventory.filter(item => (category === "全部" || item.category === category) && item.name.includes(query.trim()));
  const stockChart = visible.map(item => ({ label: item.name.slice(0, 4), value: item.stock }));

  useScopedMotion(rootRef, reduced, `${activeId}-${notice}`, root => {
    const receipt = createTimeline({ defaults: { ease: "out(4)", duration: 520 } })
      .add(root.querySelector(".corner-receipt"), { y: [-34, 0], rotate: [-1.4, 0], opacity: [0.35, 1] })
      .add(root.querySelectorAll(".corner-receipt-row"), { x: [-20, 0], opacity: [0, 1], delay: stagger(55) }, "-=260");
    const stamp = notice ? animate(root.querySelector(".corner-stamp"), { scale: [1.7, 1], rotate: [-16, -4], opacity: [0, 1], duration: 420, ease: "out(5)" }) : null;
    return [receipt, stamp];
  });

  const replenish = values => {
    setInventory(items => items.map(item => item.id === active.id ? { ...item, stock: item.stock + values.quantity } : item));
    setNotice(`${active.name} +${values.quantity}，补货记录已盖章。`);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell corner-receipt-machine" data-motion-signature="single-receipt-feed-stamp">
      <div className="corner-shop-backdrop"><img src={page.images[0].src} alt="" /><div aria-hidden="true"><VisualStage page={page} compact /></div></div>
      <div className="corner-register-slot" aria-hidden="true"><i /><i /><i /><span>RECEIPT OUT</span></div>
      <article className="corner-receipt">
        <header className="corner-receipt-head">
          <a href="../gallery/"><ArrowLeftOutlined /> CLOSED LOOP</a>
          <ShopOutlined />
          <span>CORNER GOODS / 08:42</span>
          <h1>今天的补货，<br />打印在一张纸上。</h1>
          <b>{inventory.filter(item => item.stock <= item.threshold).length} 个货位低于预警</b>
        </header>

        <div className="corner-receipt-search">
          <Input aria-label="搜索商品" allowClear prefix={<SearchOutlined />} placeholder="扫描或搜索商品" value={query} onChange={event => setQuery(event.target.value)} />
          <Select aria-label="按品类筛选" value={category} onChange={setCategory} options={categories.map(value => ({ label: value, value }))} />
        </div>

        <div className="corner-product-tape" aria-label="商品库存">
          {visible.map((item, index) => (
            <Button key={item.id} type="text" className={`corner-receipt-row ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setNotice(""); }}>
              <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.name}</strong><small>{item.id} / {item.category} / ¥{item.price}</small></div><b className={item.stock <= item.threshold ? "is-low" : ""}>{item.stock}</b>
            </Button>
          ))}
        </div>

        <figure className="corner-torn-window"><img src={page.images[1].src} alt={page.images[1].alt} /><figcaption>柜台只留下正在处理的缺口。</figcaption></figure>
        <div className="corner-barcode-chart"><span>当前筛选 / 货架余量</span><ChartBlock page={page} data={stockChart} kind="horizontal" label="当前筛选商品库存" height={142} /></div>

        <section className="corner-restock-print">
          <div><span>RESTOCK / {active.id}</span><strong>{active.name}</strong><small>现有 {active.stock} / 预警 {active.threshold} / 今日售出 {active.sold}</small></div>
          <Form layout="vertical" key={active.id} onFinish={replenish} initialValues={{ quantity: Math.max(12, active.threshold * 2 - active.stock), reason: "补至两周周转" }}>
            <Form.Item name="quantity" label="补货数量" rules={[{ required: true }]}><InputNumber min={1} max={99} /></Form.Item>
            <Form.Item name="reason" label="补货依据"><Select options={["补至两周周转", "周末活动备货", "替换破损库存"].map(value => ({ label: value, value }))} /></Form.Item>
            <Button className="corner-stamp-action" type="primary" htmlType="submit" block icon={<PlusOutlined />}>盖章并继续出纸</Button>
          </Form>
        </section>
        {notice && <><div className="corner-stamp">RESTOCKED</div><Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} /></>}
        <footer>OPEN TYPE / {page.fontStatement} · LOCAL DEMO / NO SUPPLIER MESSAGE</footer>
      </article>
    </section>
  );
}

const initialAgenda = [
  { id: "A0", day: "02", time: "10:10", title: "收拾书桌", kind: "生活" },
  { id: "A1", day: "04", time: "09:30", title: "整理周计划", kind: "专注" },
  { id: "A2", day: "04", time: "13:40", title: "在河边走 20 分钟", kind: "恢复" },
  { id: "A3", day: "04", time: "19:10", title: "给妈妈打电话", kind: "生活" },
  { id: "A4", day: "05", time: "15:30", title: "读完这一章", kind: "专注" },
  { id: "A5", day: "07", time: "08:20", title: "慢慢做早餐", kind: "生活" }
];

const initialHabits = [
  { id: "H1", label: "喝够六杯水", done: true },
  { id: "H2", label: "阅读 25 分钟", done: false },
  { id: "H3", label: "睡前不看工作消息", done: false }
];

export function StillWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [day, setDay] = useState("04");
  const [agenda, setAgenda] = useState(initialAgenda);
  const [habits, setHabits] = useState(initialHabits);
  const [composing, setComposing] = useState(false);
  const [notice, setNotice] = useState("");
  const done = habits.filter(item => item.done).length;
  const percent = Math.round(done / habits.length * 100);
  const week = [54, 68, 62, 76, percent, 0, 0].map((value, index) => ({ label: ["一", "二", "三", "四", "今", "六", "日"][index], value }));
  const days = ["02", "03", "04", "05", "06", "07", "08"];

  useScopedMotion(rootRef, reduced, `${day}-${agenda.length}-${percent}-${composing}`, root => {
    const columns = animate(root.querySelectorAll(".still-day-cell"), { y: [34, 0], opacity: [0, 1], delay: stagger(55), duration: 620, ease: "out(4)" });
    const blocks = animate(root.querySelectorAll(".still-calendar-event"), { scale: [.76, 1], opacity: [0, 1], delay: stagger(70), duration: 520, ease: "out(4)" });
    const activeCell = animate(root.querySelector(".still-day-cell.is-active"), { backgroundPosition: ["100% 100%", "0% 0%"], duration: 900, ease: "out(3)" });
    const form = composing ? animate(root.querySelector(".still-cell-composer"), { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], opacity: [0, 1], duration: 520, ease: "out(4)" }) : null;
    return [columns, blocks, activeCell, form];
  });

  const addAgenda = values => {
    setAgenda(items => [...items, { id: `A${items.length + 1}`, day, time: values.time, title: values.title, kind: values.kind }].sort((a, b) => a.time.localeCompare(b.time)));
    setNotice(`09/${day} ${values.time} 的“${values.title}”已写入日历。`);
    setComposing(false);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell still-week-calendar" data-motion-signature="calendar-cell-reflow-diagonal-fill">
      <header className="still-calendar-month">
        <div><span>SEPTEMBER / 2026</span><h1>A QUIETER WEEK.</h1><p>今天不必塞满，但每一格都要看得清。</p></div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setComposing(true)}>写入 09/{day}</Button>
      </header>
      <a className="still-date-corner" href="../gallery/"><span>返回展厅</span><b>09</b><i>/</i><strong>{day}</strong></a>
      {notice && <Alert className="still-calendar-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="still-calendar-scroll" data-native-scroll>
        <div className="still-week-grid">
          {days.map((value, index) => {
            const entries = agenda.filter(item => item.day === value);
            return (
              <section key={value} className={`still-day-cell ${day === value ? "is-active" : ""}`}>
                <Button type="text" className="still-day-select" onClick={() => { setDay(value); setComposing(false); }}><small>{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index]}</small><strong>{value}</strong></Button>
                <div className="still-time-marks" aria-hidden="true"><i>08</i><i>12</i><i>16</i><i>20</i></div>
                <div className="still-calendar-events">
                  {entries.map(item => <article key={item.id} className={`still-calendar-event kind-${item.kind}`}><time>{item.time}</time><strong>{item.title}</strong><small>{item.kind}</small></article>)}
                  {!entries.length && <p className="still-open-cell"><FieldTimeOutlined /> 留白</p>}
                </div>
                {composing && day === value && (
                  <Form className="still-cell-composer" layout="vertical" onFinish={addAgenda} initialValues={{ time: "16:00", kind: "专注" }}>
                    <b>NEW / 09.{day}</b>
                    <Form.Item name="title" rules={[{ required: true, message: "写下要安排的事" }]}><Input aria-label="安排内容" placeholder="安排内容" maxLength={40} /></Form.Item>
                    <Form.Item name="time" rules={[{ required: true, pattern: /^([01]\d|2[0-3]):[0-5]\d$/, message: "例如 16:00" }]}><Input aria-label="安排时间" placeholder="16:00" /></Form.Item>
                    <Form.Item name="kind"><Segmented options={["专注", "恢复", "生活"]} /></Form.Item>
                    <Space.Compact block><Button onClick={() => setComposing(false)}>取消</Button><Button type="primary" htmlType="submit">写入</Button></Space.Compact>
                  </Form>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <footer className="still-week-footer">
        <div className="still-habits">{habits.map(item => <Checkbox key={item.id} checked={item.done} onChange={() => setHabits(items => items.map(habit => habit.id === item.id ? { ...habit, done: !habit.done } : habit))}>{item.label}</Checkbox>)}</div>
        <div className="still-week-wave"><span>{percent}% / WEEK RHYTHM</span><ChartBlock page={page} data={week} kind="bars" label="本周习惯完成率" height={84} /></div>
        <small>OPEN TYPE / {page.fontStatement}</small>
      </footer>
    </section>
  );
}

export function AtelierWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [assets, setAssets] = useState(() => [
    { id: "LOOK-01", name: "结构西装主视觉", image: page.images[0], compare: page.images[2], status: "待审", version: "v07", score: 82, owner: "Mina", comments: ["肩线已按上轮意见收紧。", "需要确认最终裁切比例。"] },
    { id: "LOOK-02", name: "银饰材质特写", image: page.images[1], compare: page.images[0], status: "需修改", version: "v04", score: 64, owner: "Eli", comments: ["高光略抢，建议降低 8%。"] },
    { id: "LOOK-03", name: "旋梯动态画面", image: page.images[2], compare: page.images[1], status: "已通过", version: "v06", score: 96, owner: "Aya", comments: ["发布裁切已确认。"] }
  ]);
  const [activeId, setActiveId] = useState("LOOK-01");
  const [compare, setCompare] = useState(54);
  const [notice, setNotice] = useState("");
  const active = assets.find(item => item.id === activeId) || assets[0];
  const readiness = assets.map(item => ({ label: item.id.replace("LOOK-", "L"), value: item.score }));

  useScopedMotion(rootRef, reduced, activeId, root => {
    const film = animate(root.querySelectorAll(".atelier-frame"), { y: [-48, 0], rotate: ["-=5", "+=5"], opacity: [0, 1], delay: stagger(90), duration: 680, ease: "out(4)" });
    const frame = createTimeline({ defaults: { duration: 700, ease: "out(4)" } })
      .add(root.querySelector(".atelier-active-frame .atelier-image-before"), { scale: [1.08, 1] })
      .add(root.querySelector(".atelier-active-frame .atelier-image-after"), { opacity: [0.2, 1] }, "-=620");
    const table = root.querySelector(".atelier-frame-pile");
    const draggables = [...root.querySelectorAll(".atelier-frame")].map(node => createDraggable(node, { container: table, containerPadding: 12, releaseEase: "out(4)" }));
    return [film, frame, ...draggables];
  });

  const updateStatus = status => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, status, score: status === "已通过" ? 100 : Math.min(item.score, 68) } : item));
    setNotice(`${active.id} 已标记为“${status}”，就绪度已同步。`);
  };
  const addComment = values => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, comments: [...item.comments, values.comment] } : item));
    setNotice(`${active.id} 已新增批注。`);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell atelier-light-table" data-motion-signature="free-drag-film-pile">
      <header className="atelier-table-title"><span>ATELIER NOIR / REVIEW 07</span><h1>TOUCH<br />THE FRAME.</h1><p>拖动胶片，把要看的这一版放到最前。</p></header>
      <a className="atelier-film-canister" href="../gallery/"><ArrowLeftOutlined /><span>EXIT<br />DARKROOM</span></a>
      <div className="atelier-readiness-ruler"><span>SERIES READINESS</span><ChartBlock page={page} data={readiness} kind="horizontal" label="三个素材系列就绪度" height={78} /></div>

      <div className="atelier-frame-pile" aria-label="可拖动审片桌">
        {assets.map((item, index) => (
          <button key={item.id} type="button" className={`atelier-frame atelier-frame-${index + 1} ${item.id === active.id ? "atelier-active-frame" : ""}`} onClick={() => { setActiveId(item.id); setCompare(54); setNotice(""); }}>
            <img className="atelier-image-before" src={item.id === active.id ? item.compare.src : item.image.src} alt={item.id === active.id ? `${item.name} 上一版` : item.image.alt} />
            {item.id === active.id && <div className="atelier-image-after" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}><img src={item.image.src} alt={`${item.name} 当前版`} /></div>}
            <span className="atelier-frame-mark"><b>{item.id}</b><small>{item.name} / {item.version}</small></span>
            <Tag color={statusColor(item.status)}>{item.status}</Tag>
          </button>
        ))}
      </div>

      <label className="atelier-compare-slider"><span>BEFORE</span><input aria-label="拖动比较上一版与当前版" type="range" min="8" max="92" value={compare} onChange={event => setCompare(Number(event.target.value))} /><b>{compare}</b><span>CURRENT</span></label>
      <div className="atelier-version-tabs" aria-label="版本记录"><span>{active.version} / NOW</span><span>v06 / ARCHIVE</span><span>v01 / ORIGIN</span></div>

      <aside className="atelier-annotation-tape">
        <div className="atelier-asset-caption"><span>{active.owner} / 2400 × 3000</span><h2>{active.name}</h2>{active.comments.map((comment, index) => <p key={`${comment}-${index}`}><b>0{index + 1}</b>{comment}</p>)}</div>
        <Form layout="inline" onFinish={addComment} key={`${active.id}-${active.comments.length}`}>
          <Form.Item name="comment" rules={[{ required: true, message: "请输入批注" }]}><Input aria-label="新增批注" placeholder="把批注钉在胶片边缘" maxLength={100} /></Form.Item>
          <Form.Item><Button htmlType="submit" icon={<CommentOutlined />}>钉上批注</Button></Form.Item>
        </Form>
        <Space.Compact><Button danger onClick={() => updateStatus("需修改")}>退回</Button><Button type="primary" icon={<CheckCircleOutlined />} onClick={() => updateStatus("已通过")}>批准</Button></Space.Compact>
      </aside>
      {notice && <Alert className="atelier-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
      <small className="atelier-font-note">OPEN TYPE / {page.fontStatement}</small>
    </section>
  );
}

const gridSeed = [
  { id: "AR-118", title: "东侧雨棚净高冲突", discipline: "建筑", floor: "L01", owner: "周屿", status: "待处理", priority: "高", x: 24, y: 30, note: "与机电桥架需联合复核。" },
  { id: "ST-204", title: "连桥节点补充详图", discipline: "结构", floor: "L03", owner: "许岸", status: "进行中", priority: "中", x: 67, y: 28, note: "已收到第一版节点图。" },
  { id: "ME-076", title: "设备井检修距离", discipline: "机电", floor: "B01", owner: "陈祁", status: "待处理", priority: "高", x: 72, y: 67, note: "当前净距不足 150 mm。" },
  { id: "AR-101", title: "入口铺装样板确认", discipline: "建筑", floor: "L01", owner: "林简", status: "已确认", priority: "低", x: 38, y: 73, note: "材料板与施工样一致。" },
  { id: "ST-198", title: "楼梯梁标高复核", discipline: "结构", floor: "L02", owner: "许岸", status: "进行中", priority: "中", x: 50, y: 48, note: "等待建筑专业确认完成面。" },
  { id: "ME-061", title: "风口排布对齐轴网", discipline: "机电", floor: "L02", owner: "陈祁", status: "已确认", priority: "低", x: 83, y: 43, note: "已更新综合天花图。" }
];

const lanes = ["待处理", "进行中", "已确认"];

export function GridWorkspace({ page }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [issues, setIssues] = useState(gridSeed);
  const [discipline, setDiscipline] = useState("全部");
  const [activeId, setActiveId] = useState("AR-118");
  const [notice, setNotice] = useState("");
  const active = issues.find(item => item.id === activeId) || issues[0];
  const filtered = issues.filter(item => discipline === "全部" || item.discipline === discipline);
  const counts = lanes.map(lane => ({ label: lane, value: filtered.filter(item => item.status === lane).length }));

  useScopedMotion(rootRef, reduced, `${activeId}-${active.status}`, root => {
    const line = animate(root.querySelector(".grid-coordinate-line"), { strokeDashoffset: [280, 0], duration: 880, ease: "out(3)" });
    const pinTarget = root.querySelector(`.grid-hotspot[data-id="${activeId}"]`);
    const pin = pinTarget ? animate(pinTarget, { scale: [0.65, 1.15, 1], duration: 640, ease: "out(4)" }) : null;
    const field = animate(root.querySelectorAll(".grid-hotspot"), { opacity: [0, 1], scale: [.2, 1], delay: stagger(45), duration: 480, ease: "out(3)" });
    const callout = animate(root.querySelector(".grid-issue-popover"), { clipPath: ["inset(0 100% 100% 0)", "inset(0 0% 0% 0)"], duration: 520, ease: "out(4)" });
    return [line, pin, field, callout];
  });

  const advanceIssue = values => {
    const currentIndex = lanes.indexOf(active.status);
    const next = lanes[Math.min(currentIndex + 1, lanes.length - 1)];
    setIssues(items => items.map(item => item.id === active.id ? { ...item, status: next, note: values.note || item.note } : item));
    setNotice(`${active.id} 已从“${active.status}”迁移到“${next}”。`);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell grid-infinite-blueprint" data-motion-signature="infinite-canvas-anchored-callout">
      <div className="grid-blueprint-scene"><VisualStage page={page} /></div>
      <div className="grid-paper-grid" aria-hidden="true" />
      <div className="grid-title-watermark"><span>RIVER HALL / COORDINATION</span><h1>问题归位，<br />项目向前。</h1></div>
      <Segmented className="grid-discipline-dial" value={discipline} onChange={setDiscipline} options={["全部", "建筑", "结构", "机电"]} />
      <div className="grid-count-ruler"><span>ISSUE SCALE</span><ChartBlock page={page} data={counts} kind="bars" label="当前专业的问题状态数量" height={72} /></div>

      <svg className="grid-coordinate-svg" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path className="grid-coordinate-line" d={`M40 560 L${active.x * 10} ${active.y * 6} L${Math.min(940, active.x * 10 + 150)} ${Math.min(540, active.y * 6 + 90)}`} /></svg>
      {filtered.map(item => (
        <Button key={item.id} data-id={item.id} aria-label={`查看 ${item.id} ${item.title}`} shape="circle" className={`grid-hotspot priority-${item.priority} ${item.id === active.id ? "is-active" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => { setActiveId(item.id); setNotice(""); }}>{item.id.slice(-2)}</Button>
      ))}
      <div className="grid-axis-label axis-x">X / 01—12 / 1:100</div><div className="grid-axis-label axis-y">Y / A—H</div>

      <aside className="grid-issue-popover" style={{ left: `${Math.min(active.x + 4, 67)}%`, top: `${Math.min(active.y + 6, 54)}%` }}>
        <div><Tag color={statusColor(active.status)}>{active.status}</Tag><span>{active.floor} / {active.discipline} / {active.id}</span></div>
        <h2>{active.title}</h2><p>{active.note}</p><small>负责人 / {active.owner}</small>
        <Form layout="vertical" key={`${active.id}-${active.status}`} onFinish={advanceIssue} initialValues={{ note: active.note }}>
          <Form.Item name="note" label="坐标旁的协调记录" rules={[{ required: true }]}><Input.TextArea rows={2} maxLength={120} /></Form.Item>
          <Button type="primary" htmlType="submit" icon={<ApartmentOutlined />} disabled={active.status === "已确认"}>{active.status === "已确认" ? "问题已确认" : `推进到${lanes[lanes.indexOf(active.status) + 1]}`}</Button>
        </Form>
        {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
      </aside>

      <a className="grid-origin-home" href="../gallery/"><span>0,0</span><ArrowLeftOutlined /><small>RETURN TO INDEX</small></a>
      <small className="grid-font-note">OPEN TYPE / {page.fontStatement}</small>
    </section>
  );
}
