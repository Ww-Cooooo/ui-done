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
import { animate, createTimeline, stagger } from "animejs";
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
      .add(root.querySelectorAll(".velocity-session"), { x: [-42, 0], opacity: [0, 1], delay: stagger(55) }, "-=360")
      .add(root.querySelector(".velocity-track-path"), { strokeDashoffset: [520, 0], duration: 1000 }, "-=420");
    const runner = animate(root.querySelector(".velocity-runner-dot"), {
      x: [0, 250],
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
    const bench = reviewing ? animate(root.querySelector(".velocity-review-bench"), {
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
    <section ref={rootRef} id="experience" className="experience-shell velocity-lab" data-motion-signature="track-sweep-counter">
      <aside className="velocity-session-rail">
        <div className="velocity-rail-brand"><DatabaseOutlined /><span>5 条本地演示训练</span></div>
        <Segmented aria-label="筛选训练复盘状态" size="small" value={filter} onChange={setFilter} options={[
          { label: "全部", value: "all" }, { label: "待复盘", value: "pending" }, { label: "完成", value: "reviewed" }
        ]} />
        <nav aria-label="训练记录" data-native-scroll>
          {visible.map((item, index) => (
            <Button key={item.id} type="text" className={`velocity-session ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setReviewing(false); }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{item.type}</strong><small>{item.date} · {item.pace}</small></div>
              <b>{item.load}</b>
            </Button>
          ))}
        </nav>
        <small className="velocity-font-note">OPEN TYPE / {page.fontStatement}</small>
      </aside>

      <article className="velocity-replay-panel">
        <header>
          <div><span>COACH REPLAY / {active.id}</span><h1 className="velocity-wordmark">READ THE RUN.</h1></div>
          <Tag color={statusColor(active.status)}>{active.status}</Tag>
        </header>
        <div className="velocity-run-visual">
          <img src={page.images[0].src} alt={page.images[0].alt} />
          <svg viewBox="0 0 520 170" aria-hidden="true">
            <path className="velocity-track-guide" d="M15 132 C120 20 275 25 505 116" />
            <path className="velocity-track-path" d="M15 132 C120 20 275 25 505 116" />
          </svg>
          <i className="velocity-runner-dot" aria-hidden="true" />
          <div className="velocity-timecode"><small>ELAPSED</small><strong>{active.duration}</strong><span>{active.distance} KM</span></div>
        </div>
        <div className="velocity-trend-strip">
          <span><LineChartOutlined /> LOAD REPLAY</span>
          <ChartBlock page={page} data={trend} kind="line" label="近五次训练负荷" height={128} />
        </div>
      </article>

      <aside className="velocity-coach-console">
        <div className="velocity-active-load"><span>TRAINING LOAD</span><strong>{active.load}</strong><small>{active.pace} / KM</small></div>
        <blockquote>“{active.note}”</blockquote>
        <dl><div><dt>距离</dt><dd>{active.distance} km</dd></div><div><dt>用时</dt><dd>{active.duration}</dd></div><div><dt>状态</dt><dd>{active.status}</dd></div></dl>
        <Button className="velocity-priority-action" type="primary" icon={<ThunderboltOutlined />} disabled={active.status === "已复盘"} onClick={() => setReviewing(true)}>
          {active.status === "已复盘" ? "本次已完成复盘" : "处理这次训练"}
        </Button>
        {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
        {reviewing && (
          <div className="velocity-review-bench">
            <p>复盘台 / 原位展开，不离开回放</p>
            <Form layout="vertical" key={active.id} onFinish={completeReview} initialValues={{ note: active.note }}>
              <Form.Item name="note" label="教练结论" rules={[{ required: true, message: "请写下本次复盘结论" }]}>
                <Input.TextArea rows={4} maxLength={120} showCount />
              </Form.Item>
              <Button type="primary" htmlType="submit" block icon={<CheckCircleOutlined />}>保存并回到训练带</Button>
            </Form>
          </div>
        )}
      </aside>
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
    const slot = armed ? animate(root.querySelector(".orbital-command-form"), { x: [46, 0], opacity: [0, 1], duration: 560, ease: "out(4)" }) : null;
    return [scan, path, alert, slot];
  });

  const acknowledge = values => {
    setAlerts(items => items.map(item => item.id === active.id ? { ...item, status: "已确认", detail: `${item.detail} 处置：${values.action}。${values.note || ""}` } : item));
    setNotice(`${active.id} 已确认，任务队列立即收敛。`);
    setArmed(false);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell orbital-cockpit" data-motion-signature="radar-motion-path">
      <header className="orbital-cockpit-bar">
        <div><RadarChartOutlined /><strong>ORBITAL OPS / RELAY-04</strong></div>
        <Space wrap><Badge status="success" text="主链路在线" /><Tag>UTC 11:47:20</Tag><Tag color="processing">PASS 1842</Tag></Space>
      </header>

      <div className="orbital-deck" data-native-scroll>
        <aside className="orbital-queue">
          <p>ALERT QUEUE / 03</p>
          <nav aria-label="轨道告警">
            {alerts.map(item => (
              <Button key={item.id} type="text" className={`orbital-alert ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setArmed(false); }}>
                <span className={`priority priority-${item.priority}`} />
                <div><strong>{item.title}</strong><small>{item.id} · {item.time}</small></div>
                <Tag color={statusColor(item.status)}>{item.status}</Tag>
              </Button>
            ))}
          </nav>
          <div className="orbital-telemetry-mini">
            <span>LINK STABILITY / FIXTURE</span>
            <ChartBlock page={page} data={telemetrySeed} kind="area" label="链路稳定度最近六个采样" height={136} />
          </div>
        </aside>

        <article className="orbital-view">
          <VisualStage page={page} />
          <svg className="orbital-flight-overlay" viewBox="0 0 800 560" aria-hidden="true">
            <ellipse className="orbital-orbit-ring" cx="400" cy="280" rx="300" ry="132" />
            <path className="orbital-route" d="M96 296 C190 90 610 90 704 296 C610 480 190 480 96 296" />
          </svg>
          <div className="orbital-scan" aria-hidden="true"><i /></div>
          <span className="orbital-active-ping" aria-hidden="true" />
          <div className="orbital-view-label"><span>{active.system}</span><strong>{active.value}</strong><small>{active.title}</small></div>
          <div className="orbital-coordinate">ALT 547.2 KM<br />NEXT WINDOW 00:18:42</div>
        </article>

        <aside className={`orbital-command-slot ${armed ? "is-armed" : ""}`}>
          <div className="orbital-command-index">CMD<br /><strong>{active.id.slice(-2)}</strong></div>
          <Tag color={statusColor(active.status)}>{active.status}</Tag>
          <h1>{active.title}</h1>
          <p>{active.detail}</p>
          <dl><div><dt>系统</dt><dd>{active.system}</dd></div><div><dt>时间</dt><dd>{active.time}</dd></div><div><dt>读数</dt><dd>{active.value}</dd></div></dl>
          {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
          {!armed ? (
            <Button className="orbital-arm-action" type="primary" icon={<AimOutlined />} disabled={active.status === "已确认"} onClick={() => setArmed(true)}>
              {active.status === "已确认" ? "处置已确认" : "准备处置"}
            </Button>
          ) : (
            <Form className="orbital-command-form" layout="vertical" onFinish={acknowledge} initialValues={{ action: "切换备用链路" }}>
              <Form.Item name="action" label="处置方式" rules={[{ required: true }]}>
                <Select options={["切换备用链路", "继续观察", "转交姿态组"].map(value => ({ label: value, value }))} />
              </Form.Item>
              <Form.Item name="note" label="值班记录"><Input.TextArea rows={3} maxLength={120} /></Form.Item>
              <Space.Compact block><Button onClick={() => setArmed(false)}>取消</Button><Button type="primary" htmlType="submit">确认并关闭告警</Button></Space.Compact>
            </Form>
          )}
          <small>OPEN TYPE / {page.fontStatement}</small>
        </aside>
      </div>
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
    <section ref={rootRef} id="experience" className="experience-shell corner-counter" data-motion-signature="receipt-feed-restock">
      <header className="corner-awning">
        <div aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
        <span><ShopOutlined /> CORNER GOODS / OPENING 08:42</span>
        <strong>{inventory.filter(item => item.stock <= item.threshold).length} 个货位要补齐</strong>
      </header>

      <div className="corner-shop-floor">
        <section className="corner-shelf">
          <div className="corner-shelf-tools">
            <Input aria-label="搜索商品" allowClear prefix={<SearchOutlined />} placeholder="找一件商品" value={query} onChange={event => setQuery(event.target.value)} />
            <Select aria-label="按品类筛选" value={category} onChange={setCategory} options={categories.map(value => ({ label: value, value }))} />
          </div>
          <div className="corner-product-rack" data-native-scroll>
            {visible.map((item, index) => (
              <Button key={item.id} type="text" className={`corner-product ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setNotice(""); }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{item.name}</strong><small>{item.category} · ¥{item.price}</small></div>
                <b className={item.stock <= item.threshold ? "is-low" : ""}>{item.stock}</b>
              </Button>
            ))}
          </div>
          <figure className="corner-store-glimpse"><img src={page.images[0].src} alt={page.images[0].alt} /><figcaption>今天的柜台，从补齐缺口开始。</figcaption></figure>
          <div className="corner-chart-ticket"><span>货架余量 / 当前筛选</span><ChartBlock page={page} data={stockChart} kind="horizontal" label="当前筛选商品库存" height={158} /></div>
        </section>

        <aside className="corner-receipt-wrap">
          <div className="corner-receipt">
            <header><span>RESTOCK / {active.id}</span><b>补货小票</b><small>本地演示，不向供应商发送</small></header>
            <div className="corner-receipt-row"><span>商品</span><strong>{active.name}</strong></div>
            <div className="corner-receipt-row"><span>现有 / 预警</span><strong>{active.stock} / {active.threshold}</strong></div>
            <div className="corner-receipt-row"><span>今日售出</span><strong>{active.sold}</strong></div>
            <Form layout="vertical" key={active.id} onFinish={replenish} initialValues={{ quantity: Math.max(12, active.threshold * 2 - active.stock), reason: "补至两周周转" }}>
              <Form.Item name="quantity" label="补货数量" rules={[{ required: true }]}><InputNumber min={1} max={99} /></Form.Item>
              <Form.Item name="reason" label="补货依据"><Select options={["补至两周周转", "周末活动备货", "替换破损库存"].map(value => ({ label: value, value }))} /></Form.Item>
              <Button className="corner-stamp-action" type="primary" htmlType="submit" block icon={<PlusOutlined />}>盖章入库</Button>
            </Form>
            {notice && <><div className="corner-stamp">RESTOCKED</div><Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} /></>}
            <footer>{page.fontStatement}</footer>
          </div>
        </aside>
        <div className="corner-canvas-thread" aria-hidden="true"><VisualStage page={page} compact /></div>
      </div>
    </section>
  );
}

const initialAgenda = [
  { id: "A1", time: "09:30", title: "整理周计划", kind: "专注" },
  { id: "A2", time: "13:40", title: "在河边走 20 分钟", kind: "恢复" },
  { id: "A3", time: "19:10", title: "给妈妈打电话", kind: "生活" }
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

  useScopedMotion(rootRef, reduced, `${day}-${agenda.length}-${percent}-${composing}`, root => {
    const orbit = animate(root.querySelector(".still-orbit-line"), { rotate: [-18, 342], duration: 1800, ease: "out(3)" });
    const blockTargets = root.querySelectorAll(".still-time-item");
    const blocks = blockTargets.length ? animate(blockTargets, { y: [28, 0], scale: [0.88, 1], opacity: [0, 1], delay: stagger(90), duration: 620, ease: "out(4)" }) : null;
    const ring = animate(root.querySelector(".still-habit-ring i"), { scale: [0.5, 1], rotate: [-90, 0], duration: 700, ease: "out(4)" });
    const form = composing ? animate(root.querySelector(".still-inline-composer"), { width: ["34%", "100%"], opacity: [0, 1], duration: 520, ease: "out(4)" }) : null;
    return [orbit, blocks, ring, form];
  });

  const addAgenda = values => {
    setAgenda(items => [...items, { id: `A${items.length + 1}`, time: values.time, title: values.title, kind: values.kind }].sort((a, b) => a.time.localeCompare(b.time)));
    setNotice(`${values.time} 的“${values.title}”已进入今天的时间河。`);
    setComposing(false);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell still-planner" data-motion-signature="time-block-reflow">
      <div className="still-day-column">
        <span>SEP</span><strong>{day}</strong><small>2026 / THU</small>
        <div className="still-orbit-line" aria-hidden="true"><i /></div>
        <p>今天不必塞满，<br />但要看得清。</p>
      </div>

      <main className="still-time-river">
        <header>
          <div><Tag bordered={false}>LOCAL DAY PLAN</Tag><h1>A QUIETER PLAN.</h1></div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setComposing(true)}>在原位加入安排</Button>
        </header>
        <Tabs activeKey={day} onChange={setDay} items={["02", "03", "04", "05", "06"].map(value => ({ key: value, label: `09/${value}`, children: null }))} />
        {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
        <ol className="still-time-list">
          {(day === "04" ? agenda : []).map(item => (
            <li key={item.id} className="still-time-item"><time>{item.time}</time><i /><div><strong>{item.title}</strong><small>{item.kind}</small></div><Tag>{item.kind}</Tag></li>
          ))}
          {day !== "04" && <li className="still-empty-day"><FieldTimeOutlined /><span>这一天还没有安排，留白也算计划。</span></li>}
        </ol>
        {composing && (
          <Form className="still-inline-composer" layout="inline" onFinish={addAgenda} initialValues={{ time: "16:00", kind: "专注" }}>
            <Form.Item name="title" rules={[{ required: true, message: "写下要安排的事" }]}><Input aria-label="安排内容" placeholder="安排内容" maxLength={40} /></Form.Item>
            <Form.Item name="time" rules={[{ required: true, pattern: /^([01]\d|2[0-3]):[0-5]\d$/, message: "例如 16:00" }]}><Input aria-label="安排时间" placeholder="16:00" /></Form.Item>
            <Form.Item name="kind"><Segmented options={["专注", "恢复", "生活"]} /></Form.Item>
            <Form.Item><Space.Compact><Button onClick={() => setComposing(false)}>收起</Button><Button type="primary" htmlType="submit">加入</Button></Space.Compact></Form.Item>
          </Form>
        )}
        <div className="still-week-wave"><ChartBlock page={page} data={week} kind="bars" label="本周习惯完成率" height={118} /></div>
      </main>

      <aside className="still-rhythm-panel">
        <figure><img src={page.images[0].src} alt={page.images[0].alt} /><div aria-hidden="true"><VisualStage page={page} compact /></div></figure>
        <div className="still-habit-ring" style={{ "--habit-percent": `${percent * 3.6}deg` }}><i><strong>{percent}%</strong><span>今日节奏</span></i></div>
        <div className="still-habits">
          {habits.map(item => <Checkbox key={item.id} checked={item.done} onChange={() => setHabits(items => items.map(habit => habit.id === item.id ? { ...habit, done: !habit.done } : habit))}>{item.label}</Checkbox>)}
        </div>
        <Progress percent={percent} showInfo={false} strokeColor={page.theme.accent} />
        <small>OPEN TYPE / {page.fontStatement}</small>
      </aside>
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
    const film = animate(root.querySelectorAll(".atelier-film-button"), { y: [-28, 0], opacity: [0, 1], delay: stagger(70), duration: 560, ease: "out(4)" });
    const frame = createTimeline({ defaults: { duration: 700, ease: "out(4)" } })
      .add(root.querySelector(".atelier-image-before"), { x: [-42, 0], scale: [1.05, 1] })
      .add(root.querySelector(".atelier-image-after"), { x: [42, 0], opacity: [0.2, 1] }, "-=620");
    return [film, frame];
  });

  const updateStatus = status => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, status, score: status === "已通过" ? 100 : Math.min(item.score, 68) } : item));
    setNotice(`${active.id} 已标记为“${status}”，就绪度已同步。`);
  };
  const addComment = values => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, comments: [...item.comments, values.comment] } : item));
    setNotice(`${active.id} 已新增批注。`);
  };

  const versionItems = [{
    key: "versions",
    label: `版本记录 / ${active.version}`,
    children: <ol className="atelier-version-list"><li><b>{active.version}</b><span>今天 10:42 / 当前审阅</span></li><li><b>v06</b><span>昨天 18:16 / 已归档</span></li><li><b>v01</b><span>8月29日 / 初始提案</span></li></ol>
  }];

  return (
    <section ref={rootRef} id="experience" className="experience-shell atelier-review-room" data-motion-signature="drag-compare-film-change">
      <header className="atelier-review-bar"><div><span>ATELIER NOIR / REVIEW 07</span><strong>把注意力留给这一版。</strong></div><Tag color={statusColor(active.status)}>{active.status}</Tag></header>

      <nav className="atelier-film-rail" aria-label="选择审阅素材" data-native-scroll>
        {assets.map(item => (
          <Button key={item.id} type="text" className={`atelier-film-button ${item.id === active.id ? "is-active" : ""}`} onClick={() => { setActiveId(item.id); setCompare(54); setNotice(""); }}>
            <img src={item.image.src} alt="" /><span><b>{item.id}</b><small>{item.name}</small></span>
          </Button>
        ))}
        <small>OPEN-SOURCE TYPE<br />{page.fontStatement}</small>
      </nav>

      <figure className="atelier-compare-stage">
        <img className="atelier-image-before" src={active.compare.src} alt={`${active.name} 上一版`} />
        <div className="atelier-image-after" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}><img src={active.image.src} alt={`${active.name} 当前版`} /></div>
        <div className="atelier-compare-handle" style={{ left: `${compare}%` }}><span>{compare}</span></div>
        <input aria-label="拖动比较上一版与当前版" type="range" min="8" max="92" value={compare} onChange={event => setCompare(Number(event.target.value))} />
        <figcaption><span>BEFORE</span><strong>{active.name} / {active.version}</strong><span>CURRENT</span></figcaption>
        <button className="atelier-note-pin pin-a" type="button" aria-label="肩线批注">01</button>
        <button className="atelier-note-pin pin-b" type="button" aria-label="裁切批注">02</button>
      </figure>

      <aside className="atelier-review-desk" data-native-scroll>
        <div className="atelier-readiness"><span>SERIES READINESS</span><ChartBlock page={page} data={readiness} kind="horizontal" label="三个素材系列就绪度" height={126} /></div>
        <dl><div><dt>负责人</dt><dd>{active.owner}</dd></div><div><dt>版本</dt><dd>{active.version}</dd></div><div><dt>发布尺寸</dt><dd>2400 × 3000</dd></div></dl>
        <div className="atelier-comment-stack"><span><CommentOutlined /> TEAM NOTES</span>{active.comments.map((comment, index) => <p key={`${comment}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b>{comment}</p>)}</div>
        <Form layout="vertical" onFinish={addComment} key={`${active.id}-${active.comments.length}`}>
          <Form.Item name="comment" label="新增批注" rules={[{ required: true, message: "请输入批注" }]}><Input.TextArea rows={2} maxLength={100} /></Form.Item>
          <Button htmlType="submit" block icon={<CommentOutlined />}>保存批注</Button>
        </Form>
        <Collapse ghost items={versionItems} />
        {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
        <Space.Compact block><Button danger onClick={() => updateStatus("需修改")}>退回修改</Button><Button type="primary" icon={<CheckCircleOutlined />} onClick={() => updateStatus("已通过")}>批准发布</Button></Space.Compact>
      </aside>
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
    const cards = animate(root.querySelectorAll(".grid-track-card"), { x: [-36, 0], opacity: [0.25, 1], delay: stagger(45), duration: 480, ease: "out(3)" });
    return [line, pin, cards];
  });

  const advanceIssue = values => {
    const currentIndex = lanes.indexOf(active.status);
    const next = lanes[Math.min(currentIndex + 1, lanes.length - 1)];
    setIssues(items => items.map(item => item.id === active.id ? { ...item, status: next, note: values.note || item.note } : item));
    setNotice(`${active.id} 已从“${active.status}”迁移到“${next}”。`);
  };

  return (
    <section ref={rootRef} id="experience" className="experience-shell grid-coordinate-board" data-motion-signature="coordinate-line-lane-migration">
      <header className="grid-coordinate-head">
        <div className="grid-code">G/01</div>
        <div><span>RIVER HALL / COORDINATION</span><h1>问题归位，项目向前。</h1></div>
        <Segmented value={discipline} onChange={setDiscipline} options={["全部", "建筑", "结构", "机电"]} />
        <div className="grid-count-chart"><ChartBlock page={page} data={counts} kind="bars" label="当前专业的问题状态数量" height={86} /></div>
      </header>

      <div className="grid-blueprint">
        <VisualStage page={page} />
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path className="grid-coordinate-line" d={`M${active.x * 10} ${active.y * 6} L${Math.min(820, active.x * 10 + 150)} ${Math.min(500, active.y * 6 + 90)} L880 520`} /></svg>
        {filtered.map(item => (
          <Button key={item.id} data-id={item.id} aria-label={`查看 ${item.id} ${item.title}`} shape="circle" className={`grid-hotspot priority-${item.priority} ${item.id === active.id ? "is-active" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => { setActiveId(item.id); setNotice(""); }}>{item.id.slice(-2)}</Button>
        ))}
        <div className="grid-axis-label axis-x">X / 01—12</div><div className="grid-axis-label axis-y">Y / A—H</div>
        <aside className="grid-coordinate-card">
          <Tag color={statusColor(active.status)}>{active.status}</Tag><span>{active.floor} / {active.discipline} / {active.id}</span>
          <h2>{active.title}</h2><p>{active.note}</p><small>负责人 / {active.owner}</small>
          <Form layout="vertical" key={`${active.id}-${active.status}`} onFinish={advanceIssue} initialValues={{ note: active.note }}>
            <Form.Item name="note" label="协调记录" rules={[{ required: true }]}><Input.TextArea rows={2} maxLength={120} /></Form.Item>
            <Button type="primary" htmlType="submit" block icon={<ApartmentOutlined />} disabled={active.status === "已确认"}>{active.status === "已确认" ? "问题已确认" : `推进到${lanes[lanes.indexOf(active.status) + 1]}`}</Button>
          </Form>
          {notice && <Alert type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}
        </aside>
      </div>

      <div className="grid-status-track" data-native-scroll>
        {lanes.map((lane, index) => (
          <section key={lane}><header><span>0{index + 1}</span><strong>{lane}</strong><b>{filtered.filter(item => item.status === lane).length}</b></header><div>{filtered.filter(item => item.status === lane).map(item => <Button key={item.id} type="text" className={`grid-track-card ${item.id === active.id ? "is-active" : ""}`} onClick={() => setActiveId(item.id)}><span>{item.id}</span><strong>{item.title}</strong><small>{item.owner}</small><ArrowRightOutlined /></Button>)}</div></section>
        ))}
      </div>
      <small className="grid-font-note">OPEN TYPE / {page.fontStatement}</small>
    </section>
  );
}
