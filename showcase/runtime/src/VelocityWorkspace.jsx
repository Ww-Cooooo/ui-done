import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Alert, Button, Empty, Form, Input, Segmented, Table, Tag } from "antd";
import { ArrowRightOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";
import { trainingSeed, averagePace } from "./training-data";
import WorkGuides from "./visuals/WorkGuides";
import "./velocity-workspace.css";

gsap.registerPlugin(useGSAP);
const WorkChart = lazy(() => import("./WorkChart"));
const loadDomain = [0, 100];

export default function VelocityWorkspace({ page }) {
  const root = useRef(null);
  const marker = useRef(null);
  const previousLoad = useRef(trainingSeed[0].load);
  const reduced = useReducedMotion();
  const [records, setRecords] = useState(trainingSeed);
  const [selectedId, setSelectedId] = useState(trainingSeed[0].id);
  const [filter, setFilter] = useState("全部训练");
  const [query, setQuery] = useState("");
  const [mobileView, setMobileView] = useState("分析与复盘");
  const [drafts, setDrafts] = useState({});
  const [notice, setNotice] = useState("");
  const selected = records.find(record => record.id === selectedId);
  const pending = records.filter(record => record.status === "待复盘");
  const filtered = records.filter(record => (filter === "全部训练" || record.status === "待复盘") && `${record.id} ${record.type} ${record.date}`.toLowerCase().includes(query.toLowerCase().trim()));
  const loadKey = records.map(record => `${record.id}:${record.load}`).join("|");
  const chartData = useMemo(() => [...records].reverse().map(record => ({ label: record.date, value: record.load })), [loadKey]);
  const totalDistance = records.reduce((sum, record) => sum + record.distance, 0).toFixed(1);

  useGSAP(() => {
    gsap.fromTo(marker.current, { left: `${previousLoad.current}%` }, { left: `${selected.load}%`, duration: reduced ? 0 : .65, ease: "power3.out", overwrite: true });
    previousLoad.current = selected.load;
    if (!reduced) gsap.fromTo(".training-selection-value", { opacity: .3, y: 9 }, { opacity: 1, y: 0, duration: .4, stagger: .045, clearProps: "transform,opacity" });
  }, { scope: root, dependencies: [selected.id, selected.load, reduced], revertOnUpdate: true });
  useGSAP(() => {
    if (notice && !reduced) gsap.fromTo(".training-result", { x: -18, opacity: .25 }, { x: 0, opacity: 1, duration: .45, clearProps: "transform,opacity" });
  }, { scope: root, dependencies: [notice, reduced], revertOnUpdate: true });

  const select = id => { setSelectedId(id); setNotice(""); setMobileView("分析与复盘"); };
  const save = values => {
    const note = values.note.trim();
    setRecords(items => items.map(item => item.id === selectedId ? { ...item, note, status: "已复盘" } : item));
    setNotice(`${selectedId} 已完成复盘，教练结论已更新。`);
  };
  const columns = [
    { title: "日期 / 训练", dataIndex: "type", render: (_, record) => <Button type="link" className="training-record-link" onClick={() => select(record.id)}><span>{record.date}</span>{record.type}</Button> },
    { title: "距离", dataIndex: "distance", render: value => <span className="training-mono">{value.toFixed(1)} km</span> },
    { title: "用时", dataIndex: "duration", render: value => <span className="training-mono">{value}</span> },
    { title: "平均配速", render: (_, record) => <span className="training-mono">{averagePace(record)} /km</span> },
    { title: "负荷", dataIndex: "load", render: value => <span className="training-row-load"><i style={{ width: `${value}%` }} /><b>{value}</b></span> },
    { title: "复盘状态", dataIndex: "status", render: status => <Tag color={status === "已复盘" ? "success" : "warning"}>{status}</Tag> }
  ];

  return (
    <section ref={root} className="training-desk" data-motion-signature="linked-record-load-marker-and-saved-conclusion">
      <header className="training-heading">
        <div><span className="training-wordmark">VELOCITY / COACHING</span><h1>每一次训练，都有下一步。</h1></div>
        <a href="../gallery/">返回展厅 <ArrowRightOutlined /></a>
      </header>
      <div className="training-period"><span>训练分析 <i /> 2026.08.26—09.04</span><p>本地演示 · 5 次训练 · 刷新后恢复示例</p></div>
      <nav className="training-phone-nav" aria-label="工作视图"><Segmented block value={mobileView} onChange={setMobileView} options={["训练记录", "分析与复盘"]} /></nav>
      <div className="training-brief"><p><strong>{totalDistance}</strong><span>累计公里</span></p><p><strong>{records.length}</strong><span>训练记录</span></p><p><strong>{pending.length}</strong><span>等待复盘</span></p><Button disabled={!pending.length} onClick={() => select([...pending].sort((a, b) => b.load - a.load)[0].id)}>查看最高负荷的待复盘训练 <ArrowRightOutlined /></Button></div>
      <div className={`training-analysis ${mobileView === "分析与复盘" ? "phone-active" : ""}`}>
        <section className="training-trend" aria-labelledby="training-trend-title">
          <div className="training-section-heading"><h2 id="training-trend-title">训练负荷趋势</h2><span>最近 {records.length} 次 · 示意评分 0—100</span></div>
          <Suspense fallback={<p className="training-chart-loading">正在绘制训练负荷…</p>}><WorkChart page={page} data={chartData} kind="line" height={208} yDomain={loadDomain} smooth={false} label="最近五次训练负荷" /></Suspense>
          <div className="training-chart-dates">{[...records].reverse().map(record => <Button key={record.id} type="text" aria-pressed={record.id === selectedId} onClick={() => select(record.id)}>{record.date}<b>{record.load}</b></Button>)}</div>
        </section>
        <section className="training-current" aria-label="当前训练详情">
          <div className="training-current-heading"><span>当前训练</span><Tag color={selected.status === "已复盘" ? "success" : "warning"}>{selected.status}</Tag></div>
          <h2 className="training-selection-value">{selected.type}<small>{selected.date} · {selected.id}</small></h2>
          <div className="training-current-load"><b className="training-selection-value">{selected.load}</b><span>训练负荷<br />/ 100</span></div>
          <div className="training-load-ruler"><WorkGuides kind="load" color="#64798a" /><i ref={marker} style={{ left: `${trainingSeed[0].load}%` }} /></div>
          <div className="training-current-facts training-selection-value"><span>{selected.distance.toFixed(1)} km</span><span>{selected.duration}</span><span>{averagePace(selected)} /km</span></div>
          <p>平均配速按完整用时和总距离计算，不等于间歇段的配速。</p>
        </section>
      </div>
      <section className={`training-records ${mobileView === "训练记录" ? "phone-active" : ""}`} aria-labelledby="training-records-title">
        <div className="training-record-controls"><h2 id="training-records-title">训练记录</h2><Segmented value={filter} onChange={setFilter} options={["全部训练", "待复盘"]} /><Input aria-label="搜索训练记录" prefix={<SearchOutlined />} placeholder="搜索训练或编号" allowClear value={query} onChange={event => setQuery(event.target.value)} /></div>
        <div className="training-table" data-native-scroll><Table rowKey="id" columns={columns} dataSource={filtered} pagination={false} size="small" rowClassName={record => record.id === selectedId ? "training-selected-row" : ""} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有符合条件的训练" /> }} /></div>
        <div className="training-phone-list">{filtered.length ? filtered.map(record => <Button key={record.id} className="training-phone-record" onClick={() => select(record.id)}><span><small>{record.date} · {record.id}</small><b>{record.type}</b><em>{record.distance} km · {averagePace(record)} /km</em></span><span><Tag color={record.status === "已复盘" ? "success" : "warning"}>{record.status}</Tag><strong>{record.load}</strong></span></Button>) : <Empty description="没有符合条件的训练" />}</div>
      </section>
      <section className={`training-review ${mobileView === "分析与复盘" ? "phone-active" : ""}`} aria-label="教练复盘">
        <div className="training-review-context"><span className="training-mono">{selected.id} / COACH NOTE</span><h2>这次训练，下次怎么调整？</h2><p><b>运动员记录：</b>{selected.observation}</p>{!filtered.some(record => record.id === selectedId) && <p>当前训练不符合列表筛选，复盘结果仍保留在这里。</p>}</div>
        <Form key={selectedId} layout="vertical" initialValues={{ note: drafts[selectedId] ?? selected.note }} onValuesChange={values => setDrafts(items => ({ ...items, [selectedId]: values.note }))} onFinish={save}>
          <Form.Item name="note" label="教练结论" rules={[{ required: true, whitespace: true, message: "请写下具体结论，再完成复盘。" }]}><Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="例如：下次减少一组间歇，并记录最后两组的感受。" maxLength={300} /></Form.Item>
          <div className="training-save-row"><small>只更新本页演示记录，不会发送给运动员。</small><Button type="primary" htmlType="submit" icon={<CheckOutlined aria-hidden />}>保存复盘</Button></div>
          {notice && <Alert className="training-result" type="success" showIcon message={notice} />}
        </Form>
      </section>
    </section>
  );
}
