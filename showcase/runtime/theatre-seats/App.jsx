import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Collapse, ConfigProvider, Flex, Segmented, Select, theme } from "antd";
import { ArrowLeftOutlined, ArrowUpOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined, EnvironmentOutlined, InfoCircleOutlined, SoundOutlined } from "@ant-design/icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { seats, seatById, seatLabel, recommendSeats, show, zones, zoneSummary, totalPrice } from "./seats";
import { SeatingGuides, AvailabilityChart } from "./visuals";
import "./fonts.css";
import "./style.css";

gsap.registerPlugin(useGSAP);
const date = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "long", day: "numeric", weekday: "long" }).format(new Date(show.startsAt));
const clock = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(show.startsAt));
const blocks = [{ value: "left", label: "左区" }, { value: "center", label: "中区" }, { value: "right", label: "右区" }];
const money = value => `¥${value}`;
const palette = {
  algorithm: theme.defaultAlgorithm,
  token: { colorPrimary: "#60358c", colorText: "#30213f", colorTextSecondary: "#695e75", colorBgContainer: "#ffffff", colorBgElevated: "#ffffff", colorBorder: "#c5b8d2", colorTextDisabled: "#817489", colorBgContainerDisabled: "#e8e1ef", colorTextPlaceholder: "#776a83", borderRadius: 8, controlHeight: 44, fontSize: 14, fontFamily: '"Noto Sans SC", sans-serif', motion: false },
  components: { Segmented: { itemSelectedBg: "#60358c", itemSelectedColor: "#ffffff", trackBg: "#e9e1f0" }, Select: { optionSelectedBg: "#e9def4", optionSelectedColor: "#30213f", optionActiveBg: "#f2edf7" }, Button: { primaryShadow: "none", defaultShadow: "none" } },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function ScrollSettings({ reduced }) {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.options.smoothWheel = !reduced;
    if (reduced) lenis?.scrollTo(window.scrollY, { immediate: true });
  }, [lenis, reduced]);
  return null;
}

function SeatButton({ seat, active, filtered, onSelect }) {
  const zone = zones.find(zone => zone.id === seat.zone);
  // The wrapper owns fixed seat geometry; GSAP owns the button's feedback scale only.
  const curve = -Math.pow(Math.abs(seat.number - 6.5), 1.5) * 2.4;
  return <span className="seat-anchor" style={{ "--curve": `${curve}px`, "--seat-color": zone.color, "--seat-tint": zone.tint }}>
    <Button className={`seat ${active ? "is-selected" : ""} ${!seat.available ? "is-sold" : ""}`}
      data-seat={seat.id} data-zone={seat.zone} disabled={!seat.available || filtered}
      aria-pressed={active} aria-label={`${seatLabel(seat)}，${zone.name}，${money(seat.price)}，${!seat.available ? "已售" : filtered ? "不在当前票区" : active ? "已选，点击取消" : "可选"}`}
      onClick={() => onSelect(seat.id)}>
      <span className="seat-number">{String(seat.number).padStart(2, "0")}</span>
      <span className="seat-mark" aria-hidden="true">{active ? <CheckOutlined /> : !seat.available ? <CloseOutlined /> : null}</span>
    </Button>
  </span>;
}

function Theatre() {
  const root = useRef(null);
  const receipt = useRef(null);
  const previous = useRef([]);
  const justConfirmed = useRef(false);
  const revealRecommendation = useRef(false);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [count, setCount] = useState(2);
  const [zone, setZone] = useState("all");
  const [block, setBlock] = useState("center");
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [notice, setNotice] = useState("可直接点选座位，也可以先试试「推荐连座」。");
  const summary = useMemo(() => zoneSummary(selected), [selected]);
  const total = totalPrice(selected);
  const ready = selected.length === count;

  useGSAP(() => {
    if (reduced) return;
    // One short opening orientation, never replayed by selection, filters or saves.
    gsap.from(".stage-label", { scaleX: .88, opacity: .45, duration: .65, ease: "power2.out" });
    gsap.from(".seat", { opacity: .45, scale: .84, duration: .45, stagger: { each: .007, from: "center" }, ease: "power2.out", clearProps: "transform,opacity" });
  }, { scope: root });

  useGSAP(() => {
    const added = selected.filter(id => !previous.current.includes(id));
    previous.current = selected;
    let travelDelay = 0;
    if (revealRecommendation.current && selected.length) {
      revealRecommendation.current = false;
      const target = root.current.querySelector(`[data-seat="${selected[0]}"]`);
      const rect = target?.getBoundingClientRect();
      if (rect && (rect.bottom > innerHeight - 24 || rect.top < 24)) {
        lenis?.scrollTo(target, { offset: -innerHeight * .45, duration: .45, immediate: reduced });
        travelDelay = reduced ? 0 : .45;
      }
    }
    if (reduced) return;
    added.forEach((id, index) => {
      const seat = root.current.querySelector(`[data-seat="${id}"]`);
      const stub = root.current.querySelector(`[data-stub="${id}"]`);
      gsap.fromTo(seat, { scale: .84 }, { scale: 1, duration: .5, delay: travelDelay + index * .06, ease: "back.out(1.8)", overwrite: true });
      if (stub) gsap.fromTo(stub, { y: 14, opacity: .35, rotate: -3 }, { y: 0, opacity: 1, rotate: 0, duration: .55, delay: .07 + index * .06, ease: "power3.out" });
    });
  }, { scope: root, dependencies: [selected, reduced], revertOnUpdate: true });

  useGSAP(() => {
    if (!confirmed || !justConfirmed.current) return;
    justConfirmed.current = false;
    if (reduced) return;
    gsap.fromTo(".receipt-check", { scale: .55, rotate: -25 }, { scale: 1, rotate: 0, duration: .55, ease: "back.out(1.5)" });
    gsap.fromTo(".receipt-details", { y: 12, opacity: .3 }, { y: 0, opacity: 1, duration: .5, stagger: .07, ease: "power2.out" });
  }, { scope: root, dependencies: [confirmed, reduced], revertOnUpdate: true });

  useEffect(() => {
    if (reduced) {
      const targets = root.current.querySelectorAll(".seat, .stage-label, .ticket-stub, .receipt-check, .receipt-details");
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "transform,opacity" });
    }
  }, [reduced]);

  function selectSeat(id) {
    if (!seatById[id]?.available) return;
    setConfirmed(false);
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
      setNotice(`已取消${seatLabel(seatById[id])}。`);
    } else if (selected.length >= count) {
      setNotice(`已选满${count}座。请先取消一个座位，或增加观演人数。`);
    } else {
      setSelected([...selected, id]);
      setNotice(`已选择${seatLabel(seatById[id])}，${money(seatById[id].price)}。`);
    }
  }
  function recommend() {
    const ids = recommendSeats(count, zone);
    if (!ids.length) {
      setNotice(`这个票区没有${count}个连续空座。请更换票区、减少人数，或手动选择分开的座位。现有选择已保留。`);
      return;
    }
    revealRecommendation.current = true;
    setSelected(ids);
    setBlock(seatById[ids[0]].block);
    setConfirmed(false);
    setNotice(`已选好${count}连座：${ids.map(id => seatLabel(seatById[id])).join("、")}。没有跨过道，可继续更换。`);
  }
  function confirm() {
    if (!ready || confirmed) return;
    justConfirmed.current = true;
    setConfirmed(true);
    setNotice("演示选择已确认。没有锁座、付款或生成真实订单。");
    // The result is in the same document, not a repeated Drawer/Modal.
    requestAnimationFrame(() => {
      receipt.current?.focus({ preventScroll: true });
      const r = receipt.current?.getBoundingClientRect();
      if (r && (r.bottom > innerHeight || r.top < 0)) lenis?.scrollTo(receipt.current, { offset: -24, immediate: reduced });
    });
  }
  function reviewSelection() {
    receipt.current?.focus({ preventScroll: true });
    lenis?.scrollTo(receipt.current, { offset: -24, immediate: reduced });
  }
  function changeCount(value) {
    setCount(value);
    setConfirmed(false);
    setNotice(selected.length > value ? `人数已改为${value}人，原有座位仍保留。请取消${selected.length - value}个座位后确认。` : `人数已改为${value}人，已选座位仍保留。`);
  }

  return <ConfigProvider theme={palette}>
    <ScrollSettings reduced={reduced} />
    <div className="theatre" ref={root}>
      <header className="brand-line"><div className="brand"><SoundOutlined /><span>ECHO<span>回声小剧场</span></span></div><div className="demo-label"><span>UI Done · 选座演示</span><Button type="link" href="../gallery/#work-theatre-seats" icon={<ArrowLeftOutlined aria-hidden="true" />}>返回展板</Button></div></header>
      <main>
        <section className="show-intro" aria-labelledby="show-title">
          <div className="show-name"><span className="show-kicker">FRIDAY / LIVE SESSION</span><h1 id="show-title">{show.title}<span>{show.subtitle}</span></h1></div>
          <div className="show-time"><strong>{date} <span>{clock}</span></strong><span><EnvironmentOutlined /> {show.venue} · 演出约{show.duration}分钟</span></div>
        </section>

        <section className="booking" aria-labelledby="booking-title">
          <div className="booking-heading"><div><h2 id="booking-title" tabIndex={-1}>选一个喜欢的位置。</h2><p>先选人数，再点座位；也可以直接推荐连座。</p></div><span className="available-total"><b>{seats.filter(seat => seat.available).length}</b> / {seats.length} 座可选</span></div>
          <Flex wrap gap={16} align="end" className="booking-tools">
            <div className="labeled-control"><label id="party-label">观演人数</label><Segmented aria-labelledby="party-label" value={count} onChange={changeCount} options={[1, 2, 3, 4].map(value => ({ value, label: `${value}人` }))} /></div>
            <div className="labeled-control price-select"><label htmlFor="price-zone">票区 / 每座价格</label><Select id="price-zone" value={zone} onChange={value => { setZone(value); setNotice("票区筛选已更新，已选座位不会被清空。"); }} options={[{ value: "all", label: "全部票区" }, ...zones.map(item => ({ value: item.id, label: `${item.name} · ${money(item.price)}` }))]} /></div>
            <Button className="recommend-button" onClick={recommend} icon={<SoundOutlined aria-hidden="true" />}>推荐{count}连座</Button>
            {selected.length ? <Button type="link" className="selection-shortcut" onClick={reviewSelection} icon={<ArrowRightOutlined aria-hidden="true" />} iconPlacement="end">核对{selected.length}座 · {money(total)}</Button> : <span className="tool-note">连座不会跨过道</span>}
          </Flex>

          <div className="phone-blocks"><label id="block-label">查看座位分区</label><Segmented block aria-labelledby="block-label" options={blocks} value={block} onChange={setBlock} /></div>
          <div className="seat-map" data-block={block}>
            <SeatingGuides block={block} />
            <div className="stage-label"><span>舞台</span><span>STAGE</span></div>
            <div className="seat-rows" aria-label="座位图，A排最靠近舞台">
              {["A", "B", "C", "D", "E", "F"].map(row => <div className="seat-row" key={row}>
                <span className="row-label">{row}</span>
                {blocks.map(section => <div className={`seat-block block-${section.value}`} key={section.value}>
                  {seats.filter(seat => seat.row === row && seat.block === section.value).map(seat => <SeatButton key={seat.id} seat={seat} active={selected.includes(seat.id)} filtered={zone !== "all" && zone !== seat.zone} onSelect={selectSeat} />)}
                </div>)}
                <span className="row-label row-right" aria-hidden="true">{row}</span>
              </div>)}
            </div>
            <div className="block-captions" aria-hidden="true"><span>左区</span><span>中区</span><span>右区</span></div>
          </div>
          <div className="seat-legend"><span><i className="legend-available" />可选</span><span><i className="legend-selected"><CheckOutlined /></i>已选</span><span><i className="legend-sold"><CloseOutlined /></i>已售</span><span className="orientation-note">A排离舞台最近，座号从左向右递增</span></div>
          <p className="selection-notice" role="status" aria-live="polite"><InfoCircleOutlined /> <span>{notice}</span></p>
        </section>

        <section className={`ticket ${confirmed ? "is-confirmed" : ""}`} ref={receipt} tabIndex={-1} aria-label="所选座位与确认结果">
          <div className="ticket-heading"><span className="ticket-eyebrow">{confirmed ? "SELECTION CONFIRMED" : "YOUR EVENING"}</span><h2>{confirmed ? <><CheckOutlined className="receipt-check" /> 演示选择已确认</> : "今晚的位置"}</h2><span>{confirmed ? <><span className="confirmation-limit">未锁座 · 未付款 · </span><span className="confirmation-limit">不是入场凭证</span></> : `已选${selected.length}座 / 需要${count}座`}</span></div>
          <div className="ticket-body receipt-details">
            <div className="ticket-stubs">
              {selected.length === 0 ? <div className="empty-selection">从上方选座，<br />你的位置会出现在这里。</div> : selected.map(id => <div className="ticket-stub" data-stub={id} key={id}><span>{seatById[id].row}排</span><strong>{String(seatById[id].number).padStart(2, "0")}<small>座</small></strong><span>{money(seatById[id].price)}</span><Button type="text" size="small" aria-label={`取消${seatLabel(seatById[id])}`} icon={<CloseOutlined />} onClick={() => selectSeat(id)} /></div>)}
            </div>
            {selected.length > 0 && <p className="ticket-caption">{date} {clock} · {show.title}</p>}
          </div>
          <div className="ticket-action receipt-details"><span>票价合计</span><strong className="total-price" aria-live="polite">{money(total)}</strong><Button type="primary" disabled={!ready || confirmed} onClick={confirm} icon={confirmed ? <CheckOutlined aria-hidden="true" /> : <ArrowRightOutlined aria-hidden="true" />} iconPlacement="end">{confirmed ? "已确认演示选择" : "确认演示选择"}</Button><span className="no-payment">本页不会扣款或提交订单</span></div>
        </section>

        <section className="booking-footnotes" aria-label="票区余座与选座说明">
          <div className="zone-availability"><div className="subheading"><h3>各票区还有多少座？</h3><span>示例库存，不含实时锁座</span></div><div className="availability-content"><div className="zone-names">{summary.map(item => <span key={item.id}>{item.name}<strong>{money(item.price)}</strong></span>)}</div><AvailabilityChart /><div className="zone-counts">{summary.map(item => <span key={item.id}><strong>{item.available}</strong> / {item.total} 座</span>)}</div></div></div>
          <div className="booking-explanation"><Collapse ghost expandIconPlacement="end" items={[{ key: "rules", label: "选座前，你可能想知道", children: <div><p>这是虚构演出与座位数据。推荐只根据本页空座、同排和同一区块计算，不代表真实视线或音响效果。</p><p>调整人数不会删除已选座位；筛选票区也会保留选择。刷新页面会清空本次选择。</p><p>确认后只在当前页面显示结果，不锁座、不支付，也不发送任何个人信息。</p></div> }]} /><p className="demo-disclosure">演出、票价和已售状态均为演示数据。</p><Button type="link" icon={<ArrowUpOutlined aria-hidden="true" />} onClick={() => { const target = document.getElementById("booking-title"); target?.focus({ preventScroll: true }); lenis?.scrollTo(target, { offset: -24, immediate: reduced }); }}>回到座位图</Button></div>
        </section>
      </main>
      <footer>回声小剧场 · 独立选座交互样例<span>本地运行，不连接订票系统</span></footer>
    </div>
  </ConfigProvider>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><ReactLenis root options={{ autoRaf: true, duration: .72, anchors: true, syncTouch: false }}><Theatre /></ReactLenis></React.StrictMode>);
