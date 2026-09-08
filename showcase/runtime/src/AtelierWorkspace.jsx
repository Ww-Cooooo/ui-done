import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, Form, Input, Segmented, Slider, Tag } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CommentOutlined, UndoOutlined } from "@ant-design/icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";
import WorkGuides from "./visuals/WorkGuides";
import "./atelier-workspace.css";

gsap.registerPlugin(useGSAP);
const WorkChart = lazy(() => import("./WorkChart"));

function cropRectangle(sourceRatio, targetRatio, zoom, horizontal, vertical) {
  const width = Math.min(1, targetRatio / sourceRatio) / zoom;
  const height = Math.min(1, sourceRatio / targetRatio) / zoom;
  return { width, height, left: (1 - width) * horizontal / 100, top: (1 - height) * vertical / 100 };
}

function CropProof({ image, crop, reduced, onReady }) {
  const root = useRef(null);
  const proposal = useRef(null);
  const [sourceRatio, setSourceRatio] = useState(2 / 3);
  const [width, setWidth] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const ratio = crop.ratio === "4:5" ? 4 / 5 : 1;
  const rect = cropRectangle(sourceRatio, ratio, crop.zoom / 100, crop.x, crop.y);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(proposal.current);
    return () => observer.disconnect();
  }, []);
  useGSAP(() => {
    gsap.to(".proof-proposed-image", {
      scale: 1 / rect.width,
      x: -rect.left * width / rect.width,
      y: -rect.top * width / sourceRatio / rect.width,
      duration: reduced ? 0 : .4, ease: "power3.out", overwrite: true
    });
  }, { scope: root, dependencies: [width, sourceRatio, crop.ratio, crop.zoom, crop.x, crop.y, reduced] });
  return (
    <div ref={root} className="proof-pair" data-crop={JSON.stringify(rect)}>
      <figure className="proof-sheet proof-original">
        <figcaption><b>原始照片</b><span>浅色框内是保留范围</span></figcaption>
        <div className="proof-image-area">
          <div className="proof-original-plane" style={{ aspectRatio: sourceRatio, "--proof-ratio": sourceRatio }}>
            <img src={image.src} alt={image.alt} onLoad={event => { setSourceRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight); onReady(true); }} onError={() => { setUnavailable(true); onReady(false); }} />
            <div className="proof-crop-frame" style={{ left: `${rect.left * 100}%`, top: `${rect.top * 100}%`, width: `${rect.width * 100}%`, height: `${rect.height * 100}%` }}><WorkGuides kind="crop" color="rgba(255,255,255,.8)" /></div>
          </div>
        </div>
        <div className="proof-sheet-footer"><span>ORIGINAL</span><span>未修改原始文件</span></div>
      </figure>
      <figure className="proof-sheet proof-proposed">
        <figcaption><b>裁切提案</b><span>{crop.ratio} · {crop.zoom}%</span></figcaption>
        <div className="proof-image-area">
          <div ref={proposal} className="proof-proposed-plane" style={{ aspectRatio: ratio, "--proof-ratio": ratio }}>
            <img className="proof-proposed-image" src={image.src} alt={`同一张照片的 ${crop.ratio} 裁切提案`} />
          </div>
        </div>
        <div className="proof-sheet-footer"><span>PROPOSED CROP</span><span>与左侧使用同一素材</span></div>
      </figure>
      {unavailable && <Alert type="error" showIcon message="原始照片未能加载，暂时无法核对裁切效果。" />}
    </div>
  );
}

export default function AtelierWorkspace({ page }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [assets, setAssets] = useState(() => page.images.map((image, index) => ({
    id: `LOOK-0${index + 1}`, image, title: ["黑色轮廓", "银色项圈", "流动的长裙"][index],
    status: "待审", crop: { ratio: "4:5", zoom: 100, x: 50, y: 35 }, comments: []
  })));
  const [activeId, setActiveId] = useState("LOOK-01");
  const [notice, setNotice] = useState("");
  const [drafts, setDrafts] = useState({});
  const [imageReady, setImageReady] = useState(false);
  const active = assets.find(asset => asset.id === activeId);
  const statuses = ["待审", "需修改", "已批准"];
  const statusKey = assets.map(asset => asset.status).join("|");
  const statusData = useMemo(() => statuses.map(label => ({ label, value: assets.filter(asset => asset.status === label).length })), [statusKey]);
  const approved = assets.filter(asset => asset.status === "已批准").length;

  useGSAP(() => {
    if (!reduced) gsap.fromTo(".proof-image-area", { opacity: .35, y: 12 }, { opacity: 1, y: 0, duration: .55, stagger: .08, clearProps: "transform,opacity" });
  }, { scope: root, dependencies: [activeId, reduced], revertOnUpdate: true });
  useGSAP(() => {
    if (notice && !reduced) gsap.fromTo(".atelier-result", { scale: .98, opacity: .2 }, { scale: 1, opacity: 1, duration: .35, clearProps: "transform,opacity" });
  }, { scope: root, dependencies: [notice, reduced], revertOnUpdate: true });
  const choose = id => { if (id === activeId) return; setActiveId(id); setNotice(""); setImageReady(false); };
  const updateCrop = patch => {
    setAssets(items => items.map(asset => asset.id === activeId ? { ...asset, crop: { ...asset.crop, ...patch }, status: "待审" } : asset));
    setNotice("");
  };
  const decide = status => {
    setAssets(items => items.map(asset => asset.id === activeId ? { ...asset, status } : asset));
    setNotice(`${activeId} 的当前裁切提案${status === "已批准" ? "已批准" : "已标记为需修改"}。只更新本页，不会发布图片。`);
  };
  const comment = values => {
    setAssets(items => items.map(asset => asset.id === activeId ? { ...asset, comments: [...asset.comments, values.comment.trim()] } : asset));
    setDrafts(items => ({ ...items, [activeId]: "" }));
    setNotice(`${activeId} 已添加一条审阅意见。`);
  };
  return (
    <section ref={root} className="atelier-proofroom" data-motion-signature="same-photo-crop-transform-continuity">
      <header className="atelier-masthead"><span>ATELIER / CREATIVE REVIEW</span><h1>把画面，定在恰好的位置。</h1><p>比较原图与裁切提案，再留下你的审阅意见。</p></header>
      <div className="atelier-contact-bar">
        <div className="atelier-contact-items" role="group" aria-label="选择审阅素材">{assets.map(asset => <Button key={asset.id} className={`atelier-contact ${asset.id === activeId ? "is-selected" : ""}`} aria-pressed={asset.id === activeId} onClick={() => choose(asset.id)}><img src={asset.image.src} alt="" /><span><b>{asset.title}</b><small>{asset.id} · {asset.status}</small></span></Button>)}</div>
        <span className="atelier-count"><b>{approved}</b> / {assets.length}<small>已批准</small></span>
      </div>
      <div className="atelier-current-line"><h2>{active.title}<span>{active.id}</span></h2><Tag color={active.status === "已批准" ? "success" : active.status === "需修改" ? "error" : "default"}>{active.status}</Tag></div>
      <div className="atelier-visual-work">
        <CropProof key={active.id} image={active.image} crop={active.crop} reduced={reduced} onReady={setImageReady} />
        <div className="atelier-crop-controls" data-lenis-prevent>
          <div><label htmlFor="crop-ratio">输出比例</label><Segmented id="crop-ratio" value={active.crop.ratio} onChange={ratio => updateCrop({ ratio })} options={["4:5", "1:1"]} /></div>
          <div><label id="crop-zoom">画面放大 <b>{active.crop.zoom}%</b></label><Slider min={100} max={180} value={active.crop.zoom} onChange={zoom => updateCrop({ zoom })} ariaLabelledByForHandle="crop-zoom" /></div>
          <div><label id="crop-x">水平位置</label><Slider min={0} max={100} value={active.crop.x} onChange={x => updateCrop({ x })} ariaLabelledByForHandle="crop-x" /></div>
          <div><label id="crop-y">垂直位置</label><Slider min={0} max={100} value={active.crop.y} onChange={y => updateCrop({ y })} ariaLabelledByForHandle="crop-y" /></div>
          <Button icon={<UndoOutlined />} onClick={() => updateCrop({ zoom: 100, x: 50, y: 35, ratio: "4:5" })}>恢复初始裁切</Button>
        </div>
        <p className="atelier-crop-note">调整裁切后，该素材会重新变为“待审”。原始图片不会被覆盖。</p>
      </div>
      <section className="atelier-decision" aria-label="审阅意见与决定">
        <div className="atelier-comments"><h3><CommentOutlined /> {active.id} 的审阅意见 <span>{active.comments.length}</span></h3><div className="atelier-comment-list" data-native-scroll>{active.comments.length ? active.comments.map((text, index) => <p key={index}><b>意见 {index + 1}</b>{text}</p>) : <p className="atelier-no-comments">还没有意见。可以先检查人物是否完整、画面重心是否合适。</p>}</div>
          <Form key={`${active.id}-${active.comments.length}`} layout="vertical" initialValues={{ comment: drafts[active.id] || "" }} onValuesChange={values => setDrafts(items => ({ ...items, [active.id]: values.comment }))} onFinish={comment}>
            <Form.Item name="comment" label="添加意见" rules={[{ required: true, whitespace: true, message: "请先写下具体意见。" }]}><Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} maxLength={300} placeholder="例如：请保留肩线右侧的空间，再检查衣袖是否被裁掉。" /></Form.Item><Button htmlType="submit">添加审阅意见</Button>
          </Form>
        </div>
        <div className="atelier-signoff"><span>REVIEW DECISION</span><h3>这张裁切，可以通过吗？</h3><p>决定只针对 {active.id} 的当前裁切。之后修改位置或比例，需要重新审阅。</p><div className="atelier-actions"><Button onClick={() => decide("需修改")} disabled={!imageReady || active.status === "需修改"}>标记需修改</Button><Button type="primary" icon={<CheckOutlined aria-hidden />} onClick={() => decide("已批准")} disabled={!imageReady || active.status === "已批准"}>批准当前裁切</Button></div>
          <Suspense fallback={<p>正在汇总审阅状态…</p>}><WorkChart page={page} data={statusData} kind="horizontal" height={132} label="三张素材的实际审阅状态" /></Suspense>
        </div>
        {notice && <Alert className="atelier-result" type="success" showIcon message={notice} />}
      </section>
      <footer className="atelier-proof-footer"><a href="../gallery/"><ArrowLeftOutlined /> 返回展厅</a><p>本地演示 · 3 张示例素材 · 不连接团队或发布系统 · 刷新后恢复示例</p><span>Atelier Noir.</span></footer>
    </section>
  );
}
