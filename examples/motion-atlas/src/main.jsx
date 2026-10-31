import React, {Suspense, lazy, useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button, ConfigProvider, Drawer, Spin} from 'antd';
import {PauseOutlined, CaretRightOutlined, ArrowUpOutlined, RadarChartOutlined} from '@ant-design/icons';
import {ReactLenis, useLenis} from 'lenis/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import '@fontsource-variable/noto-sans-sc/wght.css';
import './shell.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);
const Experience = lazy(()=>import('./Experience.jsx'));
const Interactions = lazy(()=>import('./Interactions.jsx'));
const Gallery = lazy(()=>import('./Gallery.jsx'));
const Coverage = lazy(()=>import('./Coverage.jsx'));
const pages = [{id:'experience', label:'整页体验', n:'01'},{id:'interactions',label:'交互现场',n:'02'},{id:'gallery',label:'192 种效果',n:'03'}];
function usePreference(){const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);return reduced;}
function ScrollBridge({reduced}){const lenis=useLenis(()=>ScrollTrigger.update());useEffect(()=>{if(lenis)lenis.options.smoothWheel=!reduced;},[lenis,reduced]);return null;}
class Boundary extends React.Component{state={error:null};static getDerivedStateFromError(error){return{error};}render(){return this.state.error?<div className="load-error" role="alert"><h2>这一部分没能载入</h2><p>刷新页面后可以重新尝试。</p><Button onClick={()=>location.reload()}>重新载入</Button><pre>{String(this.state.error.message)}</pre></div>:this.props.children;}}
function App(){
 const reduced=usePreference();const [paused,setPaused]=useState(false);const [hidden,setHidden]=useState(document.hidden);
 const [page,setPage]=useState(()=>pages.some(p=>p.id===location.hash.slice(1))?location.hash.slice(1):'experience');
 const [mapOpen,setMapOpen]=useState(false);const root=useRef(null);const nav=useRef(null);const lenis=useLenis();
 useEffect(()=>{const change=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
 useEffect(()=>{const read=()=>{const id=location.hash.slice(1);if(pages.some(p=>p.id===id))setPage(id);};addEventListener('hashchange',read);return()=>removeEventListener('hashchange',read);},[]);
 const go=(id)=>{if(id===page)return;setPage(id);history.pushState(null,'','#'+id);lenis?.scrollTo(0,{immediate:true});window.scrollTo(0,0);};
 useEffect(()=>{lenis?.scrollTo(0,{immediate:true});window.scrollTo(0,0);},[page,lenis]);
 useGSAP(()=>{const active=nav.current?.querySelector('[aria-current="page"]');const marker=nav.current?.querySelector('.nav-marker');if(active&&marker)gsap.to(marker,{x:active.offsetLeft,y:active.offsetTop,width:active.offsetWidth,height:active.offsetHeight,duration:reduced?0:.45,ease:'power3.inOut',overwrite:true});},{scope:root,dependencies:[page,reduced]});
 useEffect(()=>{const resize=()=>{const active=nav.current?.querySelector('[aria-current="page"]');const marker=nav.current?.querySelector('.nav-marker');if(active&&marker)gsap.set(marker,{x:active.offsetLeft,y:active.offsetTop,width:active.offsetWidth,height:active.offsetHeight});};addEventListener('resize',resize);return()=>removeEventListener('resize',resize);},[]);
 const stopped=paused||hidden;
 return <div ref={root} className={'atlas-shell'+(paused?' atlas-paused':'')}>
 <a className="skip-link" href="#main">跳到内容</a>
 <header className="atlas-header"><button className="atlas-brand" onClick={()=>go('experience')} aria-label="动效现场首页"><span className="brand-symbol">✳</span><span>动效现场<small>MOTION ATLAS</small></span></button>
 <nav className="atlas-nav" ref={nav} aria-label="主要导航"><span className="nav-marker" aria-hidden="true"/>{pages.map(p=><button key={p.id} aria-current={page===p.id?'page':undefined} onClick={()=>go(p.id)}><small>{p.n}</small>{p.label}</button>)}</nav>
 <Button className="pause-control" icon={paused?<CaretRightOutlined/>:<PauseOutlined/>} onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'继续自动动效':'暂停自动动效'}</Button></header>
 {reduced&&<div className="motion-note" role="status">已按系统设置减少动画，内容与交互仍可使用。</div>}
 <main id="main" tabIndex={-1}><Boundary key={page}><Suspense fallback={<div className="page-loading"><Spin size="large"/><p>正在准备画面</p></div>}>
 {page==='experience'?<Experience paused={stopped} reduced={reduced} onExplore={()=>go('gallery')}/>:page==='interactions'?<Interactions paused={stopped} reduced={reduced}/>:<Gallery paused={stopped} reduced={reduced}/>}</Suspense></Boundary></main>
 <footer className="atlas-footer"><div><strong>看见变化，也能亲手试。</strong><p>整页编排 · 可操作交互 · Motion Prompt 原始示例</p></div><div className="footer-actions"><Button icon={<RadarChartOutlined/>} onClick={()=>setMapOpen(true)}>页面应用清单</Button><a href="https://showheyohtaki.github.io/motion-prompt/" target="_blank" rel="noreferrer">参考来源 ↗</a><Button aria-label="回到顶部" icon={<ArrowUpOutlined/>} onClick={()=>lenis?lenis.scrollTo(0,{immediate:reduced}):window.scrollTo({top:0,behavior:reduced?'instant':'smooth'})}/></div></footer>
 <Drawer title="页面应用清单" open={mapOpen} onClose={()=>setMapOpen(false)} width={650} destroyOnClose><Suspense fallback={<Spin/>}>{mapOpen&&<Coverage/>}</Suspense></Drawer>
 </div>;
}
createRoot(document.getElementById('root')).render(<ConfigProvider theme={{token:{colorPrimary:'#d94c25',colorText:'#171b19',fontFamily:'"Noto Sans SC Variable", sans-serif',borderRadius:12,controlHeight:40},components:{Button:{fontWeight:500}}}}><ReactLenis root options={{lerp:.1,autoRaf:true,smoothWheel:!matchMedia('(prefers-reduced-motion: reduce)').matches}}><App/><ScrollPreference/></ReactLenis></ConfigProvider>);
function ScrollPreference(){const reduced=usePreference();return <ScrollBridge reduced={reduced}/>;}
