import { lazy, Suspense, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  Descriptions,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Progress,
  Segmented,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Tooltip
} from "antd";
import {
  AlertOutlined,
  ApartmentOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DatabaseOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FilterOutlined,
  LineChartOutlined,
  PlusOutlined,
  RadarChartOutlined,
  SearchOutlined,
  ShopOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  WarningOutlined
} from "@ant-design/icons";
import VisualStage from "./VisualStage";

const WorkChart = lazy(() => import("./WorkChart"));

function ChartBlock({ page, data, kind, label, height }) {
  return (
    <Suspense fallback={<div className="work-chart-fallback"><BarChartOutlined /><span>正在整理演示记录…</span></div>}>
      <WorkChart page={page} data={data} kind={kind} label={label} height={height} />
    </Suspense>
  );
}

function DemoLabel({ page, children }) {
  return (
    <div className="demo-label">
      <Tag bordered={false} icon={<DatabaseOutlined />}>DEMO FIXTURES</Tag>
      <span>{children || page.product.data} · 刷新页面可复原</span>
    </div>
  );
}

function TypefaceProof({ page }) {
  return <span className="work-typeface">OPEN-SOURCE TYPE / {page.fontStatement}</span>;
}

function statusColor(status) {
  if (["已复盘", "已确认", "已通过", "充足", "完成"].includes(status)) return "success";
  if (["待处置", "低库存", "需修改", "阻塞"].includes(status)) return "error";
  if (["跟踪中", "进行中", "待复盘", "待审"].includes(status)) return "warning";
  return "processing";
}

const velocitySeed = [
  { id: "RUN-241", date: "09/04", type: "坡道间歇", distance: 8.4, duration: "48:20", pace: "4′12″", load: 87, status: "待复盘", note: "末组步频下降，关注左侧触地。" },
  { id: "RUN-238", date: "09/02", type: "恢复跑", distance: 6.2, duration: "36:08", pace: "5′49″", load: 42, status: "已复盘", note: "恢复区间稳定。" },
  { id: "RUN-232", date: "08/30", type: "乳酸阈值", distance: 10.1, duration: "51:40", pace: "4′35″", load: 76, status: "待复盘", note: "后半程心率漂移 4%。" },
  { id: "RUN-229", date: "08/28", type: "长距离", distance: 18.0, duration: "1:34:18", pace: "5′14″", load: 91, status: "已复盘", note: "补给节奏符合计划。" },
  { id: "RUN-224", date: "08/26", type: "轻松跑", distance: 7.5, duration: "42:01", pace: "5′36″", load: 48, status: "已复盘", note: "落地噪声降低。" }
];

export function VelocityWorkspace({ page }) {
  const [sessions, setSessions] = useState(velocitySeed);
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(null);
  const [notice, setNotice] = useState("");
  const active = sessions.find(item => item.id === activeId);
  const filtered = sessions.filter(item => filter === "all" || (filter === "pending" ? item.status === "待复盘" : item.status === "已复盘"));
  const trend = sessions.slice().reverse().map(item => ({ label: item.date, value: item.load }));
  const reviewed = sessions.filter(item => item.status === "已复盘").length;

  const columns = [
    { title: "训练", dataIndex: "type", key: "type", render: (value, row) => <span className="session-title"><strong>{value}</strong><small>{row.id} · {row.date}</small></span> },
    { title: "距离", dataIndex: "distance", key: "distance", responsive: ["md"], render: value => `${value} km`, sorter: (a, b) => a.distance - b.distance },
    { title: "均配", dataIndex: "pace", key: "pace", responsive: ["sm"] },
    { title: "负荷", dataIndex: "load", key: "load", sorter: (a, b) => a.load - b.load, render: value => <strong className="load-value">{value}</strong> },
    { title: "复盘", dataIndex: "status", key: "status", render: value => <Tag color={statusColor(value)}>{value}</Tag> },
    { title: "", key: "action", render: (_, row) => <Button type="link" onClick={event => { event.stopPropagation(); setActiveId(row.id); }}>查看</Button> }
  ];

  const completeReview = values => {
    setSessions(items => items.map(item => item.id === activeId ? { ...item, status: "已复盘", note: values.note } : item));
    setNotice(`${activeId} 已记录复盘，待复盘列表已同步。`);
    setActiveId(null);
  };

  return (
    <section id="workspace" className="work-surface velocity-work">
      <header className="velocity-work-head">
        <div data-hero-reveal>
          <DemoLabel page={page}>5 条训练记录</DemoLabel>
          <p>VELOCITY / COACH DESK</p>
          <h1>下一秒，<br /><em>从这次复盘开始。</em></h1>
          <span>{page.intro}</span>
          <div className="velocity-quick">
            <span><b>{sessions.length - reviewed}</b> 次待复盘</span>
            <Button type="primary" onClick={() => setActiveId(sessions.find(item => item.status === "待复盘")?.id)}>处理最高优先级</Button>
          </div>
        </div>
        <div className="velocity-athlete" data-hero-reveal>
          <img src={page.images[0].src} alt={page.images[0].alt} />
          <div><b>林川 / 10K BUILD</b><span>训练周 06 · 周目标 42 km</span></div>
        </div>
        <div className="work-atmosphere" aria-hidden="true"><VisualStage page={page} compact /></div>
      </header>

      {notice && <Alert className="work-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="velocity-metrics" data-scroll-reveal>
        <Card bordered={false}><Statistic title="本周距离" value={32.7} suffix="km" precision={1} /><span>目标 42 km</span></Card>
        <Card bordered={false}><Statistic title="训练负荷" value={344} /><span className="metric-up">较上周 +8%</span></Card>
        <Card bordered={false}><Statistic title="待复盘" value={sessions.length - reviewed} /><span>优先看高负荷训练</span></Card>
        <Card bordered={false}><Statistic title="完成率" value={Math.round(reviewed / sessions.length * 100)} suffix="%" /><Progress percent={Math.round(reviewed / sessions.length * 100)} showInfo={false} size="small" /></Card>
      </div>

      <div className="velocity-analysis">
        <Card className="velocity-trend" bordered={false} data-scroll-reveal>
          <div className="work-card-heading"><div><LineChartOutlined /><span>LOAD TREND</span></div><strong>近五次训练负荷</strong></div>
          <ChartBlock page={page} data={trend} kind="line" label="近五次训练负荷" height={240} />
        </Card>
        <Card className="velocity-focus" bordered={false} data-scroll-reveal>
          <img src={page.images[1].src} alt={page.images[1].alt} />
          <div><ThunderboltOutlined /><span>NEXT FOCUS</span><h2>控制末组触地，<br />保住节奏。</h2><p>下一次坡道训练前，先完成 RUN-241 的动作复盘。</p></div>
        </Card>
      </div>

      <Card className="velocity-log" bordered={false} data-scroll-reveal>
        <div className="work-table-head">
          <div><p>SESSION LOG</p><h2>训练记录</h2></div>
          <Segmented
            aria-label="训练复盘状态筛选"
            value={filter}
            onChange={setFilter}
            options={[{ label: "全部", value: "all" }, { label: "待复盘", value: "pending" }, { label: "已复盘", value: "reviewed" }]}
          />
        </div>
        <div data-lenis-prevent className="work-table-scroll">
          <Table columns={columns} dataSource={filtered} rowKey="id" pagination={false} scroll={{ x: 680 }} onRow={row => ({ onClick: () => setActiveId(row.id) })} />
        </div>
        <TypefaceProof page={page} />
      </Card>

      <Drawer title={active ? `${active.id} / ${active.type}` : "训练详情"} width={460} open={Boolean(active)} onClose={() => setActiveId(null)}>
        {active && <div className="work-drawer" data-lenis-prevent>
          <Tag color={statusColor(active.status)}>{active.status}</Tag>
          <Descriptions column={1} size="small" items={[
            { key: "distance", label: "距离", children: `${active.distance} km` },
            { key: "duration", label: "用时", children: active.duration },
            { key: "pace", label: "均配", children: active.pace },
            { key: "load", label: "训练负荷", children: active.load },
            { key: "note", label: "当前观察", children: active.note }
          ]} />
          <Form layout="vertical" onFinish={completeReview} initialValues={{ note: active.note }} key={active.id}>
            <Form.Item name="note" label="复盘记录" rules={[{ required: true, message: "请写下本次复盘结论" }]}>
              <Input.TextArea rows={4} maxLength={120} showCount />
            </Form.Item>
            <Button type="primary" htmlType="submit" block icon={<CheckCircleOutlined />}>保存并标记已复盘</Button>
          </Form>
        </div>}
      </Drawer>
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
  const [alerts, setAlerts] = useState(orbitalSeed);
  const [filter, setFilter] = useState("open");
  const [activeId, setActiveId] = useState("AL-17");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const active = alerts.find(item => item.id === activeId) || alerts[0];
  const visible = alerts.filter(item => filter === "all" || item.status !== "已确认");

  const acknowledge = values => {
    const nextOpen = alerts.find(item => item.id !== active.id && item.status !== "已确认");
    setAlerts(items => items.map(item => item.id === active.id ? { ...item, status: "已确认", detail: `${item.detail} 处置：${values.action}。${values.note || ""}` } : item));
    setNotice(`${active.id} 已确认处置，开放告警计数已更新。`);
    if (nextOpen) setActiveId(nextOpen.id);
    setDrawerOpen(false);
  };

  return (
    <section id="workspace" className="work-surface orbital-work">
      <header className="orbital-statusbar" data-hero-reveal>
        <div><DemoLabel page={page}>3 条告警 · 6 个遥测采样</DemoLabel><h1>ORBITAL / OPS</h1></div>
        <Space wrap><Badge status="success" text="主链路在线" /><Tag>UTC 11:47:20</Tag><Tag color="processing">PASS 1842</Tag></Space>
      </header>

      {notice && <Alert className="work-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="orbital-console">
        <aside className="orbital-alerts" data-scroll-reveal>
          <div className="console-title"><span><AlertOutlined /> ALERT QUEUE</span><Segmented size="small" value={filter} onChange={setFilter} options={[{ label: "开放", value: "open" }, { label: "全部", value: "all" }]} /></div>
          <div className="orbital-alert-list" data-lenis-prevent>
            {visible.map(item => (
              <Button key={item.id} type="text" className={`orbit-alert-row ${item.id === activeId ? "is-active" : ""}`} onClick={() => setActiveId(item.id)}>
                <span className={`priority-dot priority-${item.priority}`} />
                <span><b>{item.title}</b><small>{item.id} · {item.system}</small></span>
                <Tag color={statusColor(item.status)}>{item.status}</Tag>
              </Button>
            ))}
          </div>
          <div className="active-alert-brief">
            <span>{active.time} / {active.system}</span>
            <h2>{active.title}</h2>
            <p>{active.detail}</p>
            <Button type="primary" icon={<FileDoneOutlined />} disabled={active.status === "已确认"} onClick={() => setDrawerOpen(true)}>{active.status === "已确认" ? "已完成处置" : "打开处置单"}</Button>
          </div>
        </aside>

        <section className="orbital-window" data-hero-reveal>
          <VisualStage page={page} />
          <div className="orbit-hud orbit-hud-top"><span>RELAY-04</span><b>ALT 547.2 KM</b></div>
          <div className="orbit-hud orbit-hud-bottom"><span>GROUND TRACK / NORTH</span><b>下一可见窗 00:18:42</b></div>
          <div className="orbit-readout"><RadarChartOutlined /><span>链路稳定度</span><strong>{active.value}</strong></div>
        </section>

        <aside className="orbital-telemetry" data-scroll-reveal>
          <div className="console-title"><span><LineChartOutlined /> LINK TELEMETRY</span><Tag bordered={false}>LIVE FIXTURE</Tag></div>
          <ChartBlock page={page} data={telemetrySeed} kind="line" label="链路稳定度最近六个采样" height={230} />
          <div className="telemetry-facts">
            <span><small>LATENCY</small><b>38 ms</b></span>
            <span><small>DOWNLINK</small><b>2.8 Gb/s</b></span>
            <span><small>POWER</small><b>76%</b></span>
            <span><small>ATTITUDE</small><b>NOMINAL</b></span>
          </div>
          <TypefaceProof page={page} />
        </aside>
      </div>

      <Drawer title={`${active.id} / 处置单`} width={480} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="work-drawer" data-lenis-prevent>
          <Alert type="warning" showIcon message={active.title} description={active.detail} />
          <Form layout="vertical" onFinish={acknowledge} initialValues={{ action: "切换备用链路" }}>
            <Form.Item name="action" label="处置方式" rules={[{ required: true }]}>
              <Select options={["切换备用链路", "继续观察", "转交姿态组"].map(value => ({ label: value, value }))} />
            </Form.Item>
            <Form.Item name="note" label="值班记录"><Input.TextArea rows={4} maxLength={120} showCount placeholder="记录判断依据（可选）" /></Form.Item>
            <Button type="primary" htmlType="submit" block icon={<CheckCircleOutlined />}>确认处置并关闭告警</Button>
          </Form>
        </div>
      </Drawer>
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
  const [inventory, setInventory] = useState(inventorySeed);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [activeId, setActiveId] = useState(null);
  const [notice, setNotice] = useState("");
  const active = inventory.find(item => item.id === activeId);
  const categories = ["全部", ...new Set(inventory.map(item => item.category))];
  const visible = inventory.filter(item => (category === "全部" || item.category === category) && item.name.includes(query.trim()));
  const low = inventory.filter(item => item.stock <= item.threshold).length;
  const stockChart = visible.map(item => ({ label: item.name.slice(0, 4), value: item.stock }));

  const replenish = values => {
    setInventory(items => items.map(item => item.id === activeId ? { ...item, stock: item.stock + values.quantity } : item));
    setNotice(`${active.name} 已建立 ${values.quantity} 件补货记录，当前库存同步更新。`);
    setActiveId(null);
  };

  const columns = [
    { title: "商品", dataIndex: "name", key: "name", render: (value, row) => <span className="stock-name"><strong>{value}</strong><small>{row.id} · {row.category}</small></span> },
    { title: "今日售出", dataIndex: "sold", key: "sold", responsive: ["md"], sorter: (a, b) => a.sold - b.sold },
    { title: "库存", dataIndex: "stock", key: "stock", sorter: (a, b) => a.stock - b.stock, render: (value, row) => <span className="stock-count"><b>{value}</b><small>/ 预警 {row.threshold}</small></span> },
    { title: "状态", key: "status", render: (_, row) => <Tag color={row.stock <= row.threshold ? "error" : "success"}>{row.stock <= row.threshold ? "低库存" : "充足"}</Tag> },
    { title: "", key: "action", render: (_, row) => <Button type={row.stock <= row.threshold ? "primary" : "link"} size="small" onClick={() => setActiveId(row.id)}>补货</Button> }
  ];

  return (
    <section id="workspace" className="work-surface corner-work">
      <header className="corner-work-head">
        <div data-hero-reveal><DemoLabel page={page}>5 个商品库存</DemoLabel><p>CORNER GOODS / MORNING DESK</p><h1>先把缺的补上，<br /><em>再安心开门。</em></h1><div className="corner-quick"><span><b>{low}</b> 个低库存</span><Button type="primary" onClick={() => setActiveId(inventory.find(item => item.stock <= item.threshold)?.id)}>处理低库存</Button></div><TypefaceProof page={page} /></div>
        <figure data-hero-reveal><img src={page.images[0].src} alt={page.images[0].alt} /><figcaption>周四 · 08:42 · 开店准备</figcaption></figure>
        <div className="corner-canvas-accent" aria-hidden="true"><VisualStage page={page} compact /></div>
      </header>

      {notice && <Alert className="work-notice corner-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="corner-ledger">
        <aside className="corner-summary" data-scroll-reveal>
          <ShopOutlined />
          <span>TODAY / 店长摘要</span>
          <Statistic title="今日销售" value={1268} prefix="¥" />
          <div><b>{low}</b><span>个商品低于预警线</span></div>
          <div><b>07</b><span>笔待取订单</span></div>
          <blockquote>“好好补货，柜台就会自己讲故事。”</blockquote>
        </aside>

        <Card className="corner-inventory" bordered={false} data-scroll-reveal>
          <div className="corner-tools">
            <div><span>STOCK LEDGER</span><h2>库存与补货</h2></div>
            <Space wrap>
              <Input aria-label="搜索商品" allowClear prefix={<SearchOutlined />} placeholder="搜索商品" value={query} onChange={event => setQuery(event.target.value)} />
              <Select aria-label="按品类筛选" value={category} onChange={setCategory} options={categories.map(value => ({ label: value, value }))} />
            </Space>
          </div>
          <div className="corner-data-grid">
            <div data-lenis-prevent className="work-table-scroll"><Table columns={columns} dataSource={visible} rowKey="id" pagination={false} scroll={{ x: 620 }} /></div>
            <div className="corner-stock-chart"><span><BarChartOutlined /> 当前筛选库存</span><ChartBlock page={page} data={stockChart} kind="horizontal" label="当前筛选商品库存" height={250} /></div>
          </div>
        </Card>
      </div>

      <Drawer title={active ? `补货 / ${active.name}` : "补货"} width={430} open={Boolean(active)} onClose={() => setActiveId(null)}>
        {active && <div className="work-drawer corner-drawer" data-lenis-prevent>
          <div className="receipt-line"><span>当前库存</span><b>{active.stock}</b></div>
          <div className="receipt-line"><span>预警线</span><b>{active.threshold}</b></div>
          <Form layout="vertical" key={active.id} onFinish={replenish} initialValues={{ quantity: Math.max(12, active.threshold * 2 - active.stock), reason: "补至两周周转" }}>
            <Form.Item name="quantity" label="补货数量" rules={[{ required: true, message: "请填写补货数量" }]}><InputNumber min={1} max={99} style={{ width: "100%" }} /></Form.Item>
            <Form.Item name="reason" label="补货依据" rules={[{ required: true }]}><Select options={["补至两周周转", "周末活动备货", "替换破损库存"].map(value => ({ label: value, value }))} /></Form.Item>
            <Button type="primary" htmlType="submit" block icon={<PlusOutlined />}>建立补货记录</Button>
          </Form>
          <small>本页为演示工作区，不会向真实供应商发送订单。</small>
        </div>}
      </Drawer>
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
  const [selectedDate, setSelectedDate] = useState("9月4日");
  const [agenda, setAgenda] = useState(initialAgenda);
  const [habits, setHabits] = useState(initialHabits);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const done = habits.filter(item => item.done).length;
  const percent = Math.round(done / habits.length * 100);
  const week = [54, 68, 62, 76, percent, 0, 0].map((value, index) => ({ label: ["一", "二", "三", "四", "今", "六", "日"][index], value }));

  const toggleHabit = id => setHabits(items => items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const addAgenda = values => {
    setAgenda(items => [...items, { id: `A${items.length + 1}`, time: values.time, title: values.title, kind: values.kind }].sort((a, b) => a.time.localeCompare(b.time)));
    setNotice(`${values.time} 的“${values.title}”已加入 ${selectedDate}。`);
    setModalOpen(false);
  };

  return (
    <section id="workspace" className="work-surface still-work">
      <header className="still-work-head" data-hero-reveal>
        <div><DemoLabel page={page}>今日清单与一周习惯</DemoLabel><p>STILL DAY / DAILY PLANNER</p><h1>今天不必塞满，<br /><em>但要看得清。</em></h1><div className="still-quick"><span><b>{percent}%</b> 今日习惯</span><Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>新增安排</Button></div></div>
        <figure><img src={page.images[0].src} alt={page.images[0].alt} /><figcaption>MAKE SPACE / {selectedDate}</figcaption></figure>
        <div className="still-canvas-accent" aria-hidden="true"><VisualStage page={page} compact /></div>
      </header>

      {notice && <Alert className="work-notice still-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="still-planner">
        <section className="still-today" data-scroll-reveal>
          <div className="still-section-title"><span><ClockCircleOutlined /> {selectedDate}</span><h2>今天，只安排重要的。</h2><Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>新增安排</Button></div>
          <List
            className="agenda-list"
            dataSource={agenda}
            renderItem={item => <List.Item><span className="agenda-time">{item.time}</span><div><b>{item.title}</b><small>{item.kind}</small></div><Tag>{item.kind}</Tag></List.Item>}
          />
          <div className="habit-block">
            <div><span>DAILY RHYTHM</span><strong>{done}/{habits.length}</strong></div>
            <Progress percent={percent} strokeColor={page.theme.accent} />
            {habits.map(item => <Checkbox key={item.id} checked={item.done} onChange={() => toggleHabit(item.id)}>{item.label}</Checkbox>)}
          </div>
          <TypefaceProof page={page} />
        </section>

        <aside className="still-calendar" data-scroll-reveal data-lenis-prevent>
          <div className="still-section-title"><span><CalendarOutlined /> DATE</span><h2>换一天看看</h2></div>
          <Calendar fullscreen={false} onSelect={value => setSelectedDate(value.format("M月D日"))} />
        </aside>

        <Card className="still-week" bordered={false} data-scroll-reveal>
          <div><span>WEEK / COMPLETION</span><h2>给节奏留一点余地。</h2><p>柱高来自页面中的习惯完成记录；周末尚未发生，因此保持为 0。</p></div>
          <ChartBlock page={page} data={week} kind="bars" label="本周习惯完成率" height={250} />
        </Card>
      </div>

      <Modal title={`新增安排 / ${selectedDate}`} open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} destroyOnHidden>
        <Form layout="vertical" onFinish={addAgenda} initialValues={{ time: "16:00", kind: "专注" }}>
          <Form.Item name="title" label="安排" rules={[{ required: true, message: "请写下要安排的事" }]}><Input maxLength={40} /></Form.Item>
          <Form.Item name="time" label="时间" rules={[{ required: true, pattern: /^([01]\d|2[0-3]):[0-5]\d$/, message: "请输入 24 小时时间，例如 16:00" }]}><Input placeholder="16:00" /></Form.Item>
          <Form.Item name="kind" label="类型"><Segmented block options={["专注", "恢复", "生活"]} /></Form.Item>
          <Button type="primary" htmlType="submit" block>加入今天</Button>
        </Form>
      </Modal>
    </section>
  );
}

export function AtelierWorkspace({ page }) {
  const [assets, setAssets] = useState(() => [
    { id: "LOOK-01", name: "结构西装主视觉", image: page.images[0], status: "待审", version: "v07", score: 82, owner: "Mina", comments: ["肩线已按上轮意见收紧。", "需要确认最终裁切比例。"] },
    { id: "LOOK-02", name: "银饰材质特写", image: page.images[1], status: "需修改", version: "v04", score: 64, owner: "Eli", comments: ["高光略抢，建议降低 8%。"] },
    { id: "LOOK-03", name: "旋梯动态画面", image: page.images[2], status: "已通过", version: "v06", score: 96, owner: "Aya", comments: ["发布裁切已确认。"] }
  ]);
  const [filter, setFilter] = useState("全部");
  const [activeId, setActiveId] = useState("LOOK-01");
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const active = assets.find(item => item.id === activeId) || assets[0];
  const visible = assets.filter(item => filter === "全部" || item.status === filter);
  const readiness = assets.map(item => ({ label: item.id.replace("LOOK-", "L"), value: item.score }));

  const updateStatus = status => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, status, score: status === "已通过" ? 100 : Math.min(item.score, 68) } : item));
    setNotice(`${active.id} 已标记为“${status}”，系列就绪度已同步。`);
  };
  const addComment = values => {
    setAssets(items => items.map(item => item.id === active.id ? { ...item, comments: [...item.comments, values.comment] } : item));
    setNotice(`${active.id} 已新增一条审阅批注。`);
  };

  const reviewTab = (
    <div className="atelier-inspector-body">
      <div className="atelier-decision"><Tag color={statusColor(active.status)}>{active.status}</Tag><span>就绪度</span><strong>{active.score}%</strong></div>
      <Descriptions column={1} size="small" items={[
        { key: "owner", label: "设计负责人", children: active.owner },
        { key: "version", label: "当前版本", children: active.version },
        { key: "output", label: "发布尺寸", children: "2400 × 3000 / 4:5" }
      ]} />
      <div className="atelier-inline-chart"><span>3-ASSET READINESS</span><ChartBlock page={page} data={readiness} kind="horizontal" label="三个素材系列就绪度" height={150} /></div>
      <div className="atelier-comments"><span><CommentOutlined /> TEAM NOTES</span>{active.comments.map((comment, index) => <p key={`${comment}-${index}`}>{String(index + 1).padStart(2, "0")} / {comment}</p>)}</div>
      <Form layout="vertical" onFinish={addComment} key={`${active.id}-${active.comments.length}`}>
        <Form.Item name="comment" label="新增批注" rules={[{ required: true, message: "请输入批注" }]}><Input.TextArea rows={3} maxLength={100} /></Form.Item>
        <Button htmlType="submit" block icon={<CommentOutlined />}>保存批注</Button>
      </Form>
      <div className="atelier-actions"><Button danger onClick={() => updateStatus("需修改")}>退回修改</Button><Button type="primary" icon={<CheckCircleOutlined />} onClick={() => updateStatus("已通过")}>批准发布</Button></div>
    </div>
  );

  return (
    <section id="workspace" className="work-surface atelier-work">
      <header className="atelier-work-bar" data-hero-reveal>
        <div><DemoLabel page={page}>3 个系列素材 · 3 组批注</DemoLabel><h1>ATELIER / REVIEW 07</h1></div>
        <Space wrap><Segmented value={filter} onChange={setFilter} options={["全部", "待审", "需修改", "已通过"]} /><Button icon={<EyeOutlined />} onClick={() => setVersionsOpen(true)}>版本记录</Button></Space>
      </header>

      {notice && <Alert className="work-notice atelier-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="atelier-review">
        <nav className="atelier-filmstrip" aria-label="系列素材" data-lenis-prevent data-scroll-reveal>
          {visible.map(item => (
            <Button key={item.id} type="text" className={`atelier-thumb ${item.id === active.id ? "is-active" : ""}`} onClick={() => setActiveId(item.id)}>
              <img src={item.image.src} alt="" />
              <span><b>{item.id}</b><small>{item.name}</small></span>
              <Tag color={statusColor(item.status)}>{item.status}</Tag>
            </Button>
          ))}
        </nav>

        <figure className="atelier-stage" data-hero-reveal>
          <img src={active.image.src} alt={active.image.alt} />
          <div className="atelier-canvas-accent" aria-hidden="true"><VisualStage page={page} compact /></div>
          <figcaption><span>{active.id} / {active.version}</span><strong>{active.name}</strong></figcaption>
          <Tooltip title="检查肩线与画面左边界"><Button aria-label="查看肩线批注" className="annotation-pin pin-one" shape="circle">1</Button></Tooltip>
          <Tooltip title="确认移动端 4:5 裁切"><Button aria-label="查看裁切批注" className="annotation-pin pin-two" shape="circle">2</Button></Tooltip>
        </figure>

        <aside className="atelier-inspector" data-scroll-reveal data-lenis-prevent>
          <Tabs defaultActiveKey="review" items={[
            { key: "review", label: "审阅", children: reviewTab },
            { key: "data", label: "素材信息", children: <div className="atelier-readiness"><List size="small" dataSource={assets} renderItem={item => <List.Item><span>{item.id}</span><Tag color={statusColor(item.status)}>{item.status}</Tag><strong>{item.score}%</strong></List.Item>} /><p>状态与数值来自同屏三个演示素材；审批后会同步变化。</p></div> }
          ]} />
          <TypefaceProof page={page} />
        </aside>
      </div>

      <Drawer title={`${active.id} / 版本记录`} width={430} open={versionsOpen} onClose={() => setVersionsOpen(false)}>
        <List data-lenis-prevent dataSource={[
          { version: active.version, time: "今天 10:42", note: "当前审阅版本", state: active.status },
          { version: `v${String(Math.max(1, Number(active.version.slice(1)) - 1)).padStart(2, "0")}`, time: "昨天 18:16", note: "已合并造型与摄影意见", state: "已归档" },
          { version: "v01", time: "8月29日", note: "初始提案", state: "已归档" }
        ]} renderItem={item => <List.Item><List.Item.Meta title={`${item.version} · ${item.time}`} description={item.note} /><Tag>{item.state}</Tag></List.Item>} />
      </Drawer>
    </section>
  );
}

const gridSeed = [
  { id: "AR-118", title: "东侧雨棚净高冲突", discipline: "建筑", floor: "L01", owner: "周屿", status: "待处理", priority: "高", imageIndex: 0, note: "与机电桥架需联合复核。" },
  { id: "ST-204", title: "连桥节点补充详图", discipline: "结构", floor: "L03", owner: "许岸", status: "进行中", priority: "中", imageIndex: 1, note: "已收到第一版节点图。" },
  { id: "ME-076", title: "设备井检修距离", discipline: "机电", floor: "B01", owner: "陈祁", status: "待处理", priority: "高", imageIndex: 2, note: "当前净距不足 150 mm。" },
  { id: "AR-101", title: "入口铺装样板确认", discipline: "建筑", floor: "L01", owner: "林简", status: "已确认", priority: "低", imageIndex: 1, note: "材料板与施工样一致。" },
  { id: "ST-198", title: "楼梯梁标高复核", discipline: "结构", floor: "L02", owner: "许岸", status: "进行中", priority: "中", imageIndex: 0, note: "等待建筑专业确认完成面。" },
  { id: "ME-061", title: "风口排布对齐轴网", discipline: "机电", floor: "L02", owner: "陈祁", status: "已确认", priority: "低", imageIndex: 2, note: "已更新综合天花图。" }
];

const lanes = ["待处理", "进行中", "已确认"];

export function GridWorkspace({ page }) {
  const [issues, setIssues] = useState(gridSeed);
  const [discipline, setDiscipline] = useState("全部");
  const [activeLane, setActiveLane] = useState("待处理");
  const [activeId, setActiveId] = useState("AR-118");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const active = issues.find(item => item.id === activeId) || issues[0];
  const filtered = issues.filter(item => discipline === "全部" || item.discipline === discipline);
  const counts = lanes.map(lane => ({ label: lane, value: filtered.filter(item => item.status === lane).length }));

  const advanceIssue = values => {
    const currentIndex = lanes.indexOf(active.status);
    const next = lanes[Math.min(currentIndex + 1, lanes.length - 1)];
    setIssues(items => items.map(item => item.id === active.id ? { ...item, status: next, note: values.note || item.note } : item));
    setActiveLane(next);
    setNotice(`${active.id} 已推进到“${next}”，看板列与数量图已同步。`);
    setDrawerOpen(false);
  };

  return (
    <section id="workspace" className="work-surface grid-work">
      <header className="grid-work-head" data-hero-reveal>
        <div className="grid-project-code">G/01</div>
        <div><DemoLabel page={page}>6 个跨专业问题</DemoLabel><p>RIVER HALL / COORDINATION BOARD</p><h1>问题归位，<br />项目才会向前。</h1></div>
        <div className="grid-team"><TeamOutlined /><span>建筑 / 结构 / 机电</span><b>本周协调会 · 周五 14:00</b></div>
      </header>

      {notice && <Alert className="work-notice grid-notice" type="success" showIcon closable onClose={() => setNotice("")} message={notice} />}

      <div className="grid-overview">
        <section className="grid-model-context" data-scroll-reveal>
          <VisualStage page={page} />
          <div><span>MODEL CONTEXT / {active.floor}</span><strong>{active.id}</strong><p>{active.title}</p></div>
        </section>
        <Card className="grid-counts" bordered={false} data-scroll-reveal>
          <span>ISSUES BY STATUS</span><ChartBlock page={page} data={counts} kind="horizontal" label="当前专业筛选下的问题状态数量" height={190} /><TypefaceProof page={page} />
        </Card>
      </div>

      <section className="grid-board-section" data-scroll-reveal>
        <div className="grid-board-tools">
          <div><span><FilterOutlined /> DISCIPLINE</span><h2>项目问题看板</h2></div>
          <Segmented value={discipline} onChange={setDiscipline} options={["全部", "建筑", "结构", "机电"]} />
          <Segmented className="grid-mobile-lanes" value={activeLane} onChange={setActiveLane} options={lanes.map(lane => ({ label: `${lane} ${counts.find(item => item.label === lane)?.value || 0}`, value: lane }))} />
        </div>
        <div className="grid-kanban" data-lenis-prevent>
          {lanes.map((lane, laneIndex) => (
            <section key={lane} className={`grid-lane ${activeLane === lane ? "is-mobile-active" : ""}`}>
              <header><span>{String(laneIndex + 1).padStart(2, "0")}</span><h3>{lane}</h3><b>{filtered.filter(item => item.status === lane).length}</b></header>
              <div>
                {filtered.filter(item => item.status === lane).map(item => (
                  <Card key={item.id} className={`grid-issue priority-${item.priority}`} bordered={false} hoverable onClick={() => { setActiveId(item.id); setDrawerOpen(true); }}>
                    <div className="issue-meta"><Tag>{item.discipline}</Tag><span>{item.floor}</span><span>{item.id}</span></div>
                    <h4>{item.title}</h4>
                    <p>{item.note}</p>
                    <div><span>{item.owner}</span><Button type="link" onClick={event => { event.stopPropagation(); setActiveId(item.id); setDrawerOpen(true); }}>检查 <ArrowRightOutlined /></Button></div>
                  </Card>
                ))}
                {!filtered.some(item => item.status === lane) && <div className="grid-empty">当前筛选下没有问题</div>}
              </div>
            </section>
          ))}
        </div>
      </section>

      <Drawer title={`${active.id} / ${active.title}`} width={480} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="work-drawer grid-drawer" data-lenis-prevent>
          <img src={page.images[active.imageIndex].src} alt={page.images[active.imageIndex].alt} />
          <Descriptions column={1} size="small" items={[
            { key: "discipline", label: "专业", children: active.discipline },
            { key: "floor", label: "位置", children: active.floor },
            { key: "owner", label: "负责人", children: active.owner },
            { key: "status", label: "状态", children: <Tag color={statusColor(active.status)}>{active.status}</Tag> }
          ]} />
          <Form layout="vertical" key={`${active.id}-${active.status}`} onFinish={advanceIssue} initialValues={{ note: active.note }}>
            <Form.Item name="note" label="协调记录" rules={[{ required: true, message: "请记录当前结论" }]}><Input.TextArea rows={4} maxLength={120} showCount /></Form.Item>
            <Button type="primary" htmlType="submit" block icon={<ApartmentOutlined />} disabled={active.status === "已确认"}>{active.status === "已确认" ? "问题已确认" : `保存并推进到${lanes[lanes.indexOf(active.status) + 1]}`}</Button>
          </Form>
        </div>
      </Drawer>
    </section>
  );
}
