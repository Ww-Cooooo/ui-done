import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CanvasSpace, Pt } from 'pts';
import { useLenis } from 'lenis/react';
import './experience.css';

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

export const experienceEffects = [
  ['002','交错动画','开场字列','进入页面 / 重播'],
  ['004','线条描绘','开场轨道、时间线','进入页面 / 滚动'],
  ['005','遮罩显现','巨幅中文标题','进入页面 / 重播'],
  ['007','数字递增','192 条目录数字','进入页面'],
  ['008','动态排版','开场「动」字','开场之后'],
  ['010','过冲回弹','开场图形、速度胶囊','开场 / 循环'],
  ['011','挤压与拉伸','第一张叠卡的弹力球','该卡片可见'],
  ['012','形状变形','开场橙色轮廓','开场图形可见'],
  ['014','运动拖尾','光迹画布','该场景可见 / 移动指针'],
  ['015','粒子效果','光迹画布','该场景可见'],
  ['073','视差滚动','开场图形与文字','滚动离开首屏'],
  ['076','滚动固定','「滚动也是表达」段落','滚动进入该段'],
  ['079','滚动进度条','本展览顶部细线','阅读本展览'],
  ['084','磁吸按钮','底部探索按钮内层','靠近按钮'],
  ['094','跑马灯','开场下方连续字带','字带可见'],
  ['095','动态渐变','光迹场景背景光','场景可见'],
  ['096','悬浮动画','开场轨道上的注释','开场可见'],
  ['121','预备动作','第二张叠卡速度胶囊','该卡片可见'],
  ['122','跟随动作','速度胶囊附属旗帜','胶囊停下后'],
  ['124','随机抖动','第二张叠卡的能量星','该卡片可见'],
  ['125','脉冲动画','第三张叠卡的呼吸圆','该卡片可见'],
  ['126','运动路径','光迹主球、开场卫星','场景可见'],
  ['129','文字乱码效果','时间线英文导语','进入时间线'],
  ['130','波浪文字','第三张叠卡「慢一点」','该卡片可见'],
  ['132','可变字体动画','时间线尾部的 MOTION','该段可见'],
  ['145','滚动时间轴','从出现到留下印象的四步','滚动进入各步骤'],
  ['146','滚动文字显现','大幅理念文字','滚动 / 向上回读'],
  ['147','堆叠卡片','三张节奏作品','向下滚动 / 向上回读'],
  ['148','滚动切换背景色','理念段落底色','该段内滚动'],
  ['152','滚动放大','时间线后的放大图形','滚动进入该段'],
  ['153','3D 倾斜','三张节奏作品的图形内层','图形区域移动指针'],
  ['154','聚光灯悬停','深色速度作品','在作品中移动指针'],
  ['156','悬停文字翻滚','底部探索按钮文字','悬停 / 键盘聚焦'],
  ['165','动态形状分隔线','结尾波浪边界','结尾场景可见'],
].map(([id,name,host,trigger])=>({id,name,host,trigger}));

const TAU = Math.PI * 2;
const RefIds = ({children, light=false}) => <span className={`ex-ref ${light?'ex-ref-light':''}`}>{children}</span>;
const SectionLabel = ({n,children,light=false}) => <p className={`ex-section-label ${light?'ex-label-light':''}`}><span>{n}</span>{children}</p>;
const split = (text, className) => [...text].map((c,i)=><span className={className} key={`${c}-${i}`}>{c===' '? '\u00a0':c}</span>);

function contour(mode=0) {
  return Array.from({length:120},(_,i)=>{
    const a=i/120*TAU;
    let r=186;
    if(mode===1) r=167+30*Math.cos(a*5);
    if(mode===2) r=170/(Math.pow(Math.abs(Math.cos(a)),4)+Math.pow(Math.abs(Math.sin(a)),4))**.25;
    if(mode===3) r=166+31*Math.cos(a*8);
    return `${i?'L':'M'}${(Math.cos(a)*r).toFixed(2)},${(Math.sin(a)*r).toFixed(2)}`;
  }).join(' ')+' Z';
}

function MotionField({paused,reduced}) {
  const host=useRef(null);
  const control=useRef(()=>{});
  const mode=useRef({paused,reduced});
  const [failed,setFailed]=useState(false);
  useEffect(()=>{ mode.current={paused,reduced};control.current(); },[paused,reduced]);
  useEffect(()=>{
    const el=host.current;
    if(!el) return;
    let space,observer,visible=false,disposed=false,playing=false,phase=0,lastEmit=0;
    const pointer={active:false,x:0,y:0};
    const head=new Pt(0,0),trail=[],particles=[];
    let lastFrame=performance.now();
    const colors=['#ed663c','#f6bd63','#d7ef86','#b9afea'];
    try {
      space=new CanvasSpace(el).setup({resize:true,retina:true,pixelDensity:Math.min(window.devicePixelRatio||1,1.6),bgcolor:'transparent'});
      const form=space.getForm();
      const draw=(dt=0)=>{
        if(disposed||!form.ready||space.width<2||space.height<2) return;
        const w=space.width,h=space.height;
        const still=mode.current.reduced;
        phase+=dt*.00042;
        const pathPoint=new Pt(w*.5+Math.sin(phase)*w*.36,h*.5+Math.sin(phase*2)*h*.30);
        const dest=pointer.active?new Pt(pointer.x,pointer.y):pathPoint;
        if(!trail.length) head.to(dest);
        else head.add(dest.$subtract(head).multiply(1-Math.exp(-Math.max(dt,16)/80)));
        if(still) {
          const pts=Array.from({length:100},(_,i)=>new Pt(w*.5+Math.sin(i/99*TAU)*w*.36,h*.5+Math.sin(i/99*TAU*2)*h*.30));
          form.strokeOnly('#ed663c',3).line(pts);
          form.fillOnly('#d7ef86').point(new Pt(w*.5,h*.5),15,'circle');
          return;
        }
        trail.push(head.clone());
        if(trail.length>74) trail.shift();
        for(let i=1;i<trail.length;i++) {
          const p=i/trail.length;
          form.strokeOnly(`rgba(237,102,60,${p*.8})`,Math.max(.6,p*19)).line([trail[i-1],trail[i]]);
        }
        if(phase-lastEmit>.026) {
          lastEmit=phase;
          for(let j=0;j<2;j++) particles.push({p:head.clone(),v:new Pt(Math.sin(phase*23+j*3)*48,-50-Math.cos(phase*17+j)*35),life:1,color:colors[(Math.floor(phase*30)+j)%4],r:3+Math.sin(phase*11+j)*1.8});
        }
        for(let i=particles.length-1;i>=0;i--) {
          const p=particles[i];
          p.life-=dt/1450;p.v.y+=dt*.035;p.p.add(p.v.$multiply(dt/1000));
          if(p.life<=0){particles.splice(i,1);continue;}
          space.ctx.globalAlpha=Math.max(0,p.life);
          form.fillOnly(p.color).point(p.p,Math.max(.5,p.r*p.life),'circle');
        }
        space.ctx.globalAlpha=1;
        form.fillOnly('#f5f2ea').point(head,12,'circle');
        form.fillOnly('#ed663c').point(head,5,'circle');
      };
      const update=()=>{
        const active=visible&&!document.hidden&&!mode.current.paused&&!mode.current.reduced;
        if(active&&!playing) {playing=true;lastFrame=performance.now();space.resume();space.replay();}
        else if(!active) {playing=false;space.stop();space.clear();draw(0);}
      };
      control.current=update;
      space.add({
        start:()=>{draw(0);update();},
        animate:()=>{const now=performance.now();const dt=Math.min(now-lastFrame,40);lastFrame=now;draw(dt);},
        resize:()=>{trail.length=0;draw(0);},
      });
      observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{threshold:.01});
      observer.observe(el);
      const move=e=>{const r=el.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true;};
      const leave=()=>{pointer.active=false;};
      const vis=()=>update();
      el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',vis);
      return ()=>{disposed=true;control.current=()=>{};observer?.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',vis);space?.dispose();};
    } catch {setFailed(true);space?.dispose();}
    return ()=>{disposed=true;observer?.disconnect();space?.dispose();};
  },[]);
  return <div className={`ex-field-canvas ${failed?'ex-field-failed':''}`} ref={host} aria-hidden="true">
    <svg className="ex-field-guide" viewBox="0 0 900 500" preserveAspectRatio="none"><path d="M450 250 C110 -80 110 580 450 250 C790 -80 790 580 450 250"/></svg>
  </div>;
}

const findSectionPin = section => ScrollTrigger.getAll().find(trigger=>trigger.pin&&(trigger.pin===section||section.contains(trigger.pin)));

// This boundary snapshots before React mutates the motion class or GSAP removes
// its pin spacers. A layout-effect cleanup already sees the new DOM geometry.
class PreferenceReadingAnchor extends React.Component {
  normalPositions=new WeakMap();
  settleFrame=0;
  componentWillUnmount(){cancelAnimationFrame(this.settleFrame);}
  getSnapshotBeforeUpdate(previous){
    if(previous.reduced===this.props.reduced) return null;
    const root=this.props.rootRef.current;
    const center=document.elementFromPoint(innerWidth*.5,innerHeight*.5);
    if(!root||!center||!root.contains(center)) return null;
    const section=center.closest('.ex-stack-card')||center.closest('section');
    if(!section||!root.contains(section)) return null;
    const anchor=section.querySelector('h1,h2,h3')||section;
    const top=anchor.getBoundingClientRect().top;
    const pin=findSectionPin(section);
    if(!previous.reduced&&pin?.isActive){
      this.normalPositions.set(section,{progress:pin.progress,top});
    }
    const overflowAnchor=root.style.overflowAnchor;
    root.style.overflowAnchor='none';
    return {root,section,anchor,top,overflowAnchor};
  }
  componentDidUpdate(previous,state,snapshot){
    if(!snapshot) return;
    cancelAnimationFrame(this.settleFrame);
    // Child layout effects have now finished rebuilding the selected mode.
    ScrollTrigger.refresh();
    const {root,section,anchor,top,overflowAnchor}=snapshot;
    const moveTo=target=>{
      this.props.lenis?.resize();
      const y=Math.max(0,Math.min(target,document.documentElement.scrollHeight-innerHeight));
      if(this.props.lenis)this.props.lenis.scrollTo(y,{immediate:true,force:true});
      else window.scrollTo({top:y,behavior:'instant'});
      ScrollTrigger.update();
    };
    let target=scrollY+anchor.getBoundingClientRect().top-top;
    const pin=!this.props.reduced&&findSectionPin(section);
    if(pin){
      const remembered=this.normalPositions.get(section);
      if(remembered&&Math.abs(remembered.top-top)<2){
        target=pin.start+remembered.progress*(pin.end-pin.start);
      }else{
        const headerBottom=document.querySelector('.atlas-header')?.getBoundingClientRect().bottom||82;
        const pinnedTop=headerBottom+anchor.getBoundingClientRect().top-pin.pin.getBoundingClientRect().top;
        // Before/after a fixed section, invert its piecewise scroll geometry.
        target=top>=pinnedTop?pin.start-(top-pinnedTop):pin.end+(pinnedTop-top);
      }
    }
    moveTo(target);
    this.settleFrame=requestAnimationFrame(()=>{
      if(!anchor.isConnected)return;
      const drift=anchor.getBoundingClientRect().top-top;
      if(Math.abs(drift)>1&&!(pin?.isActive))moveTo(scrollY+drift);
      root.style.overflowAnchor=overflowAnchor;
    });
  }
  render(){return this.props.children;}
}

export default function Experience(props){
  const root=useRef(null);
  const lenis=useLenis();
  return <PreferenceReadingAnchor rootRef={root} lenis={lenis} reduced={!!props.reduced}><ExperienceContent {...props} rootRef={root}/></PreferenceReadingAnchor>;
}

function ExperienceContent({paused=false,reduced=false,onExplore=()=>{},rootRef}) {
  const root=rootRef,heroTimeline=useRef(null),loops=useRef([]),replay=useRef(()=>{});
  const active=useRef({paused,reduced});
  useEffect(()=>{active.current={paused,reduced};loops.current.forEach(({animation,element})=>{const r=element.getBoundingClientRect();animation.paused(paused||reduced||document.hidden||r.bottom<0||r.top>innerHeight);});if(paused)heroTimeline.current?.pause();else if(!reduced)heroTimeline.current?.resume();},[paused,reduced]);

  useGSAP((context,contextSafe)=>{
    const q=gsap.utils.selector(root);
    const cleanups=[];
    const scopedLoops=[];
    const addLoop=(animation,selector)=>{
      const element=typeof selector==='string'?q(selector)[0]:selector;
      if(!element)return;
      const item={animation,element};scopedLoops.push(item);loops.current.push(item);
      const io=new IntersectionObserver(([entry])=>animation.paused(!entry.isIntersecting||active.current.paused||active.current.reduced||document.hidden),{threshold:.01});
      io.observe(element);cleanups.push(()=>io.disconnect());
    };
    const setVisibility=()=>scopedLoops.forEach(({animation,element})=>{const b=element.getBoundingClientRect();animation.paused(document.hidden||active.current.paused||active.current.reduced||b.bottom<0||b.top>innerHeight);});
    document.addEventListener('visibilitychange',setVisibility);cleanups.push(()=>document.removeEventListener('visibilitychange',setVisibility));
    if(reduced) {
      gsap.set(q('.ex-hero-char,.ex-hero-subline'),{yPercent:0});
      gsap.set(q('.ex-read-char'),{color:'#171b19'});
      gsap.set(q('.ex-hero-draw'),{strokeDashoffset:0});
      q('.ex-catalog-count').forEach(e=>e.textContent='192');
      replay.current=()=>{};
      return ()=>cleanups.forEach(fn=>fn());
    }

    q('.ex-catalog-count').forEach(e=>e.textContent='0');
    const enter=gsap.timeline({defaults:{ease:'power4.out'}});
    heroTimeline.current=enter;
    enter.fromTo(q('.ex-hero-char'),{yPercent:115,rotation:6},{yPercent:0,rotation:0,duration:1.15,stagger:.065},.12)
      .fromTo(q('.ex-hero-subline'),{yPercent:130},{yPercent:0,duration:.85},.65)
      .fromTo(q('.ex-hero-art-core'),{scale:0,rotation:-70},{scale:1,rotation:0,duration:1.4,ease:'back.out(1.4)'},.25)
      .fromTo(q('.ex-hero-stamp'),{scale:.3,rotation:25},{scale:1,rotation:-13,duration:.9,ease:'back.out(2)'},.9)
      .fromTo(q('.ex-hero-meta > *'),{y:14,opacity:0},{y:0,opacity:1,duration:.6,stagger:.1},1);
    const count={n:0};
    enter.to(count,{n:192,duration:1.8,ease:'power3.out',onUpdate:()=>q('.ex-catalog-count').forEach(e=>e.textContent=Math.round(count.n))},.6);
    q('.ex-hero-draw').forEach((path,i)=>{const len=path.getTotalLength();gsap.set(path,{strokeDasharray:len,strokeDashoffset:len});enter.to(path,{strokeDashoffset:0,duration:1.8,ease:'power2.inOut'},.5+i*.13);});
    replay.current=contextSafe(()=>{enter.restart();});

    const morph=gsap.timeline({repeat:-1,repeatDelay:.35});
    [1,2,3,0].forEach(mode=>morph.to(q('.ex-morph'),{attr:{d:contour(mode)},duration:1.25,ease:'back.inOut(1.3)'},'>.6'));
    addLoop(morph,'.ex-hero-art');
    addLoop(gsap.to(q('.ex-hero-spin'),{rotation:360,duration:32,repeat:-1,ease:'none',transformOrigin:'50% 50%'}),'.ex-hero-art');
    addLoop(gsap.to(q('.ex-hero-core-mark'),{rotation:-360,duration:32,repeat:-1,ease:'none',transformOrigin:'50% 50%'}),'.ex-hero-art');
    addLoop(gsap.to(q('.ex-orbit-dot'),{duration:9,repeat:-1,ease:'none',motionPath:{path:q('.ex-orbit-path')[0],align:q('.ex-orbit-path')[0],alignOrigin:[.5,.5],autoRotate:false}}),'.ex-hero-art');
    addLoop(gsap.to(q('.ex-float-a'),{y:-18,rotation:4,duration:2.3,yoyo:true,repeat:-1,ease:'sine.inOut'}),'.ex-hero-art');
    addLoop(gsap.to(q('.ex-float-b'),{y:16,rotation:-4,duration:2.7,yoyo:true,repeat:-1,ease:'sine.inOut'}),'.ex-hero-art');
    addLoop(gsap.timeline({repeat:-1,repeatDelay:3}).to(q('.ex-kinetic'),{scaleX:1.15,scaleY:.87,rotation:-4,duration:.4,ease:'power2.in'}).to(q('.ex-kinetic'),{scaleX:1,scaleY:1,rotation:0,duration:.8,ease:'elastic.out(1,.32)'}),'.ex-hero');
    addLoop(gsap.to(q('.ex-marquee-track'),{xPercent:-100/3,duration:22,ease:'none',repeat:-1}),'.ex-marquee');
    addLoop(gsap.to(q('.ex-gradient-light'),{xPercent:35,yPercent:-25,rotation:65,duration:9,yoyo:true,repeat:-1,ease:'sine.inOut'}),'.ex-trace');

    gsap.to(q('.ex-hero-art'),{y:120,rotation:12,ease:'none',scrollTrigger:{trigger:q('.ex-hero')[0],start:'top top',end:'bottom top',scrub:1}});
    gsap.to(q('.ex-hero-heading'),{y:-65,ease:'none',scrollTrigger:{trigger:q('.ex-hero')[0],start:'top top',end:'bottom top',scrub:1}});
    gsap.to(q('.ex-read-progress'),{scaleX:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:true}});

    const reading=gsap.timeline({scrollTrigger:{trigger:q('.ex-reading')[0],start:'top 82px',end:'+=850',pin:q('.ex-reading-stage')[0],pinSpacing:true,scrub:.5,invalidateOnRefresh:true}});
    reading.to(q('.ex-read-char'),{color:'#171b19',duration:1,stagger:1,ease:'none'},0)
      .to(q('.ex-reading-stage'),{backgroundColor:'#e8e6da',duration:12,ease:'none'},0)
      .fromTo(q('.ex-reading-mark'),{rotation:-20,scale:.7},{rotation:28,scale:1.12,duration:28,ease:'none'},0)
      .fromTo(q('.ex-reading-rule'),{scaleY:0},{scaleY:1,duration:28,ease:'none'},0);

    const cards=q('.ex-stack-card');
    cards.slice(0,-1).forEach((card,i)=>{
      gsap.to(card,{scale:1-(cards.length-i-1)*.045,scrollTrigger:{trigger:cards[i+1],start:'top 90%',end:'top 130px',scrub:.5},ease:'none',transformOrigin:'50% 0%'});
      gsap.to(card.querySelector('.ex-card-shade'),{opacity:(cards.length-i-1)*.08,scrollTrigger:{trigger:cards[i+1],start:'top 90%',end:'top 130px',scrub:.5},ease:'none'});
    });
    const bounce=gsap.timeline({repeat:-1,repeatDelay:.3});
    bounce.set(q('.ex-bounce-ball'),{y:-100,scaleX:1,scaleY:1})
      .to(q('.ex-bounce-ball'),{y:80,scaleX:.83,scaleY:1.2,duration:.62,ease:'power2.in'})
      .to(q('.ex-bounce-ball'),{scaleX:1.35,scaleY:.67,duration:.11,ease:'power2.out'})
      .to(q('.ex-bounce-ball'),{y:-100,scaleX:1,scaleY:1,duration:.75,ease:'power2.out'})
      .to(q('.ex-bounce-ball'),{y:80,scaleX:.85,scaleY:1.18,duration:.75,ease:'power2.in'})
      .to(q('.ex-bounce-ball'),{scaleX:1.3,scaleY:.7,duration:.1})
      .to(q('.ex-bounce-ball'),{y:-100,scaleX:1,scaleY:1,duration:.8,ease:'power2.out'});
    bounce.fromTo(q('.ex-bounce-shadow'),{scaleX:.5,opacity:.12},{scaleX:1.2,opacity:.3,duration:.62,ease:'power2.in'},0)
      .to(q('.ex-bounce-shadow'),{scaleX:.5,opacity:.12,duration:.75,ease:'power2.out'},.73)
      .to(q('.ex-bounce-shadow'),{scaleX:1.2,opacity:.3,duration:.75,ease:'power2.in'},1.48)
      .to(q('.ex-bounce-shadow'),{scaleX:.5,opacity:.12,duration:.8,ease:'power2.out'},2.33);
    addLoop(bounce,cards[0]);

    const speed=gsap.timeline({repeat:-1,repeatDelay:1.4});
    speed.to(q('.ex-speed-actor'),{x:-38,scaleX:.85,scaleY:1.15,rotation:-7,duration:.55,ease:'power2.inOut'})
      .to(q('.ex-speed-actor'),{x:160,scaleX:1.3,scaleY:.8,rotation:3,duration:.48,ease:'power3.in'})
      .to(q('.ex-speed-actor'),{x:150,scaleX:1,scaleY:1,rotation:0,duration:.5,ease:'back.out(2)'})
      .to(q('.ex-speed-actor'),{x:0,duration:.9,ease:'power3.inOut'},'>.9')
      .to(q('.ex-follow-flag'),{rotation:-42,duration:.4},.6)
      .to(q('.ex-follow-flag'),{rotation:30,duration:.24,ease:'power2.out'},1.03)
      .to(q('.ex-follow-flag'),{rotation:-18,duration:.27},1.27)
      .to(q('.ex-follow-flag'),{rotation:8,duration:.24},1.54)
      .to(q('.ex-follow-flag'),{rotation:0,duration:.3},1.78);
    addLoop(speed,cards[1]);
    const wiggle={t:0};
    addLoop(gsap.to(wiggle,{t:TAU,duration:4.7,repeat:-1,ease:'none',onUpdate:()=>gsap.set(q('.ex-energy-star'),{rotation:Math.sin(wiggle.t*23)*3+Math.sin(wiggle.t*31)*2,x:Math.sin(wiggle.t*17)*2,y:Math.sin(wiggle.t*29)*1.5})}),cards[1]);
    const pulse=gsap.timeline({repeat:-1,repeatDelay:1.2}).to(q('.ex-pulse-core'),{scale:1.13,duration:.2,ease:'power2.out'}).to(q('.ex-pulse-core'),{scale:1,duration:.3,ease:'power2.inOut'}).to(q('.ex-pulse-core'),{scale:1.08,duration:.2}).to(q('.ex-pulse-core'),{scale:1,duration:.5});
    pulse.fromTo(q('.ex-pulse-ring'),{scale:.85,opacity:.65},{scale:1.6,opacity:0,duration:1.6,stagger:.3,ease:'power2.out'},0);
    addLoop(pulse,cards[2]);
    addLoop(gsap.to(q('.ex-wave-char'),{y:-18,duration:.65,stagger:{each:.12,repeat:-1,yoyo:true},ease:'sine.inOut'}),cards[2]);

    q('.ex-tilt-target').forEach(target=>{
      const face=target.querySelector('.ex-tilt-face');
      const move=contextSafe(e=>{if(active.current.paused||active.current.reduced)return;const b=target.getBoundingClientRect();const x=(e.clientX-b.left)/b.width;const y=(e.clientY-b.top)/b.height;gsap.to(face,{rotationX:(.5-y)*12,rotationY:(x-.5)*18,duration:.5,ease:'power2.out',overwrite:'auto'});});
      const leave=contextSafe(()=>gsap.to(face,{rotationX:0,rotationY:0,duration:.7,ease:'power3.out',overwrite:'auto'}));
      target.addEventListener('pointermove',move);target.addEventListener('pointerleave',leave);cleanups.push(()=>{target.removeEventListener('pointermove',move);target.removeEventListener('pointerleave',leave);});
    });
    const spotlight=q('.ex-card-speed')[0];
    const spotMove=e=>{const b=spotlight.getBoundingClientRect();spotlight.style.setProperty('--ex-spot-x',`${e.clientX-b.left}px`);spotlight.style.setProperty('--ex-spot-y',`${e.clientY-b.top}px`);};
    spotlight.addEventListener('pointermove',spotMove);cleanups.push(()=>spotlight.removeEventListener('pointermove',spotMove));

    const timeline=q('.ex-timeline')[0];
    gsap.fromTo(q('.ex-time-fill'),{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:timeline,start:'top center',end:'bottom center',scrub:true}});
    q('.ex-time-step').forEach(step=>{
      gsap.fromTo(step.querySelector('.ex-time-dot'),{backgroundColor:'#f5f2ea',scale:.65},{backgroundColor:'#ed663c',scale:1,duration:.4,scrollTrigger:{trigger:step,start:'top 62%',toggleActions:'play none none reverse'}});
      gsap.fromTo(step.querySelector('.ex-time-content'),{x:28,opacity:.4},{x:0,opacity:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:step,start:'top 72%',toggleActions:'play none none reverse'}});
    });
    const scramble=q('.ex-scramble')[0];
    const original='MAKE IT MOVE';
    const scramblePlay=contextSafe(()=>{
      const state={p:0};const chars='ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
      gsap.to(state,{p:1,duration:1.7,ease:'none',onUpdate:()=>{scramble.textContent=[...original].map((c,i)=>c===' '?' ':state.p*17>i+3?c:chars[Math.floor(Math.random()*chars.length)]).join('');},onComplete:()=>scramble.textContent=original});
    });
    ScrollTrigger.create({trigger:scramble,start:'top 85%',once:true,onEnter:scramblePlay});
    addLoop(gsap.to(q('.ex-variable-word'),{fontWeight:850,duration:2.6,yoyo:true,repeat:-1,ease:'sine.inOut'}),'.ex-variable');
    addLoop(gsap.to(q('.ex-weight-knob'),{x:()=>q('.ex-weight-track')[0].clientWidth,duration:2.6,yoyo:true,repeat:-1,ease:'sine.inOut'}),'.ex-variable');

    const zoom=gsap.timeline({scrollTrigger:{trigger:q('.ex-zoom')[0],start:'top 82px',end:'+=750',pin:true,pinSpacing:true,scrub:.8,invalidateOnRefresh:true}});
    zoom.fromTo(q('.ex-zoom-window'),{clipPath:'inset(22% 30% round 120px)'},{clipPath:'inset(0% 0% round 0px)',duration:1,ease:'none'},0)
      .fromTo(q('.ex-zoom-flower'),{scale:.55,rotation:-30},{scale:1.5,rotation:55,duration:1,ease:'none'},0)
      .fromTo(q('.ex-zoom-copy'),{opacity:0,y:45},{opacity:1,y:0,duration:.3},.65);

    const waves={p:0};
    const updateWave=()=>{
      q('.ex-divider-path').forEach((path,k)=>{
        const points=Array.from({length:65},(_,i)=>{const x=i/64*1440;const y=50+Math.sin(x/190+waves.p*(k?-1:1))*16+Math.sin(x/80-waves.p*2+k)*7;return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;}).join(' ');
        path.setAttribute('d',`${points} L1440,140 L0,140 Z`);
      });
    };
    addLoop(gsap.to(waves,{p:TAU,duration:7,repeat:-1,ease:'none',onUpdate:updateWave}),'.ex-ending');
    const magnetic=q('.ex-magnetic')[0],magFace=magnetic.querySelector('.ex-magnetic-face');
    const move=contextSafe(e=>{if(active.current.paused||active.current.reduced)return;const b=magnetic.getBoundingClientRect();gsap.to(magFace,{x:(e.clientX-b.left-b.width/2)*.14,y:(e.clientY-b.top-b.height/2)*.14,duration:.35,ease:'power2.out',overwrite:'auto'});});
    const leave=contextSafe(()=>gsap.to(magFace,{x:0,y:0,duration:.8,ease:'elastic.out(1,.4)',overwrite:'auto'}));
    const roll=contextSafe(()=>gsap.to(q('.ex-roll-line'),{yPercent:-100,stagger:.025,duration:.4,ease:'power3.inOut',overwrite:'auto'}));
    const unroll=contextSafe(()=>gsap.to(q('.ex-roll-line'),{yPercent:0,stagger:.025,duration:.4,ease:'power3.inOut',overwrite:'auto'}));
    magnetic.addEventListener('pointermove',move);magnetic.addEventListener('pointerleave',leave);magnetic.addEventListener('pointerenter',roll);magnetic.addEventListener('pointerleave',unroll);magnetic.addEventListener('focus',roll);magnetic.addEventListener('blur',unroll);
    cleanups.push(()=>{magnetic.removeEventListener('pointermove',move);magnetic.removeEventListener('pointerleave',leave);magnetic.removeEventListener('pointerenter',roll);magnetic.removeEventListener('pointerleave',unroll);magnetic.removeEventListener('focus',roll);magnetic.removeEventListener('blur',unroll);});
    if(paused){enter.pause();scopedLoops.forEach(({animation})=>animation.pause());}
    const refresh=window.setTimeout(()=>ScrollTrigger.refresh(),150);
    return ()=>{clearTimeout(refresh);cleanups.forEach(fn=>fn());loops.current=loops.current.filter(l=>!scopedLoops.includes(l));heroTimeline.current=null;};
  },{scope:root,dependencies:[reduced],revertOnUpdate:true});

  return <div ref={root} className={`ex-root ${reduced?'ex-reduced':''} ${paused?'ex-paused':''}`}>
    <div className="ex-reading-bar" aria-hidden="true"><span className="ex-read-progress"/></div>
    <section className="ex-hero" aria-labelledby="ex-title">
      <div className="ex-hero-top"><SectionLabel n="序章">把动作，写进页面。</SectionLabel><span className="ex-hero-edition">A STUDY OF MOTION · 2026</span></div>
      <div className="ex-hero-main">
        <div className="ex-hero-heading">
          <h1 id="ex-title" aria-label="让灵感动起来。"><span className="ex-hero-line">{split('让灵感','ex-hero-char')}</span><span className="ex-hero-line ex-title-orange"><span className="ex-hero-char"><span className="ex-kinetic">动</span></span>{split('起来。','ex-hero-char')}</span></h1>
          <div className="ex-subline-clip"><p className="ex-hero-subline">不只看动效。让它成为你的阅读方式。</p></div>
          <div className="ex-hero-actions"><Button className="ex-journey-button" href="#ex-trace">向下，进入现场 <ArrowDownOutlined/></Button><Button className="ex-replay-button" icon={<ReloadOutlined/>} onClick={()=>replay.current()} disabled={reduced}>重播开场</Button></div>
        </div>
        <div className="ex-hero-art" aria-hidden="true">
          <svg className="ex-hero-svg" viewBox="-300 -300 600 600">
            <path className="ex-orbit-path ex-hero-draw" d="M-257 14 C-240-164 215-229 267-22 C312 152-203 239-257 14 Z"/>
            <path className="ex-hero-draw ex-orbit-thin" d="M-214-178 C-22-280 196 69 170 225 C130 339-146 117-214-178 Z"/>
            <circle className="ex-orbit-dot" r="12" fill="#171b19"/>
            <g className="ex-hero-art-core"><g className="ex-hero-spin"><path className="ex-morph" d={contour(0)} fill="#ed663c"/><g className="ex-hero-core-mark"><path d="M-75 53 V-36 L0 27 L75-36 V53" fill="none" stroke="#171b19" strokeWidth="26" strokeLinecap="square" strokeLinejoin="bevel"/><circle cx="0" cy="87" r="13" fill="#171b19"/></g></g></g>
            <g className="ex-float-a"><circle cx="-206" cy="-123" r="23" fill="#d7ef86"/><path d="M-217-123h22m-11-11v22" stroke="#171b19" strokeWidth="2"/></g>
            <g className="ex-float-b"><rect x="145" y="170" width="83" height="45" rx="23" fill="#b9afea"/><path d="M171 192h30m-9-9 9 9-9 9" stroke="#171b19" strokeWidth="2" fill="none"/></g>
          </svg>
          <div className="ex-hero-stamp"><span>这一次</span><strong>真的<br/>动起来</strong><svg viewBox="0 0 24 24"><path d="M4 20 20 4M4 4h16v16"/></svg></div>
          <span className="ex-art-caption">FORM FOLLOWS FEELING.</span>
        </div>
      </div>
      <div className="ex-hero-meta"><p><span className="ex-catalog-count" aria-hidden="true">192</span><span>条动效参考<br/>一场真实体验</span></p><RefIds>002 · 004 · 005 · 008 · 010 · 012 · 073 · 096</RefIds><span className="ex-scroll-note">SCROLL TO FEEL <span>↓</span></span></div>
    </section>

    <div className="ex-marquee" aria-label="节奏、方向、变化、感受"><div className="ex-marquee-track" aria-hidden="true">{[0,1,2].map(n=><div className="ex-marquee-set" key={n}><span>RHYTHM</span><i>✳</i><span>DIRECTION</span><i>✳</i><span>TRANSFORM</span><i>✳</i><span>FEELING</span><i>✳</i></div>)}</div><RefIds>094</RefIds></div>

    <section className="ex-trace" id="ex-trace" aria-labelledby="ex-trace-title">
      <div className="ex-gradient-light" aria-hidden="true"/>
      <SectionLabel n="01" light>动作，会留下痕迹。</SectionLabel>
      <div className="ex-trace-copy"><h2 id="ex-trace-title">一条线，<br/>有了生命。</h2><p>靠近这片光迹。<br/>让鼠标接过方向，让残影留下速度。</p><RefIds light>014 · 015 · 095 · 126</RefIds></div>
      <MotionField paused={paused} reduced={reduced}/>
      <div className="ex-trace-bottom"><span>THE BEAUTY IS IN BETWEEN.</span><p>当前位置向前，过去的轨迹慢慢退后。</p><span className="ex-trace-cross">＋</span></div>
    </section>

    <section className="ex-reading" aria-labelledby="ex-reading-title">
      <div className="ex-reading-stage">
        <SectionLabel n="02">滚动，也是表达。</SectionLabel>
        <div className="ex-reading-body"><div className="ex-reading-aside"><span className="ex-reading-rule"/><p>向下，让文字逐字清晰。<br/>向上，让时间轻轻倒流。</p><RefIds>076 · 146 · 148</RefIds></div><h2 id="ex-reading-title" aria-label="好的动效，让目光有方向，让信息有节奏，让每次经过，都留下感受。">{split('好的动效，','ex-read-char')}<br/>{split('让目光有方向，','ex-read-char')}<br/>{split('让信息有节奏，','ex-read-char')}<br/>{split('让每次经过，','ex-read-char')}<br/>{split('都留下感受。','ex-read-char')}</h2><div className="ex-reading-mark" aria-hidden="true">✳</div></div>
        <div className="ex-reading-footer"><span>READ AT YOUR OWN PACE</span><span>↓ 继续滚动</span></div>
      </div>
    </section>

    <section className="ex-stacking" aria-labelledby="ex-stack-title">
      <div className="ex-stack-intro"><SectionLabel n="03">同一灵感，三种节奏。</SectionLabel><h2 id="ex-stack-title">性格，藏在<br/>每一个落点里。</h2><p>从弹跳到疾驰，再到一次缓慢的呼吸。<br/>往下走，让下一种节奏覆盖上一种。</p><RefIds>147 · 153 · 154</RefIds></div>
      <div className="ex-stack-deck">
        <article className="ex-stack-card ex-card-bounce" style={{'--ex-card-index':0}}><div className="ex-card-shade"/><div className="ex-card-copy"><span className="ex-card-no">A / ELASTIC</span><h3>轻一点。</h3><p>先坠落，再回弹。<br/>形状跟着力量改变，<br/>一个圆，也有了性格。</p><RefIds>011 · 010</RefIds><span className="ex-card-word">BOUNCE</span></div><div className="ex-card-art ex-tilt-target" aria-hidden="true"><div className="ex-tilt-face"><div className="ex-bounce-ball"><span>↗</span></div><div className="ex-bounce-floor"/><div className="ex-bounce-shadow"/><span className="ex-art-coordinate">↑ ENERGY / ↓ GRAVITY</span><i className="ex-bounce-tick ex-bt1"/><i className="ex-bounce-tick ex-bt2"/></div></div></article>
        <article className="ex-stack-card ex-card-speed" style={{'--ex-card-index':1}}><div className="ex-spotlight"/><div className="ex-card-shade"/><div className="ex-card-copy"><span className="ex-card-no">B / MOMENTUM</span><h3>快一点。</h3><p>出发之前，先蓄一点力。<br/>主体已经停住，<br/>旗帜还在回味刚才的速度。</p><RefIds light>121 · 122 · 124 · 154</RefIds><span className="ex-card-word">GO AHEAD</span></div><div className="ex-card-art ex-tilt-target" aria-hidden="true"><div className="ex-tilt-face"><div className="ex-speed-lines"><span/><span/><span/><span/></div><div className="ex-speed-actor"><span>↗</span><svg className="ex-follow-flag" viewBox="0 0 90 110"><path d="M8 105V5" fill="none" stroke="#f5f2ea" strokeWidth="5"/><path d="M10 5Q45-9 80 8L70 45Q40 28 10 43Z" fill="#b9afea"/></svg></div><div className="ex-speed-road"/><span className="ex-energy-star">✳</span><span className="ex-art-coordinate">ANTICIPATE → ACCELERATE → SETTLE</span></div></div></article>
        <article className="ex-stack-card ex-card-breathe" style={{'--ex-card-index':2}}><div className="ex-card-shade"/><div className="ex-card-copy"><span className="ex-card-no">C / RESONANCE</span><h3 aria-label="慢一点。">{split('慢一点。','ex-wave-char')}</h3><p>不急着抵达。<br/>让文字起伏，让圆环扩散，<br/>把停留也变成一种节奏。</p><RefIds>125 · 130</RefIds><span className="ex-card-word">TAKE A BREATH</span></div><div className="ex-card-art ex-tilt-target" aria-hidden="true"><div className="ex-tilt-face"><div className="ex-pulse-ring ex-pr1"/><div className="ex-pulse-ring ex-pr2"/><div className="ex-pulse-core"><svg viewBox="0 0 160 160"><path d="M80 20v120M20 80h120M38 38l84 84M38 122l84-84" stroke="#b9afea" strokeWidth="19"/><circle cx="80" cy="80" r="24" fill="#b9afea"/></svg></div><span className="ex-art-coordinate">INHALE / EXHALE / REPEAT</span></div></div></article>
      </div>
    </section>

    <section className="ex-process" aria-labelledby="ex-process-title"><div className="ex-process-heading"><SectionLabel n="04">让每一步，都有来处。</SectionLabel><p className="ex-scramble" aria-label="MAKE IT MOVE" aria-hidden="true">MAKE IT MOVE</p><h2 id="ex-process-title">从出现，<br/>到留下印象。</h2><p>动效把散落的瞬间，<br/>连成一条看得见的过程。</p><RefIds>004 · 129 · 145</RefIds></div><div className="ex-timeline"><div className="ex-time-track"><span className="ex-time-fill"/></div>{[
        ['01','出现','越过固定的边界，文字进入画面。','REVEAL'],
        ['02','引导','顺着同一条线，视线找到下一个落点。','DIRECT'],
        ['03','回应','靠近、滚动、停留，画面接住你的动作。','RESPOND'],
        ['04','记住','动作停下，节奏留下来。','RESONATE'],
      ].map(([n,title,copy,en])=><div className="ex-time-step" key={n}><span className="ex-time-dot"/><div className="ex-time-content"><span className="ex-time-number">{n} <small>{en}</small></span><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>

    <section className="ex-variable" aria-label="字体粗细随时间变化"><p>一样的字，也有不同的分量。</p><div className="ex-variable-word" aria-hidden="true">MOTION</div><div className="ex-weight-line"><span>LIGHT</span><div className="ex-weight-track"><i className="ex-weight-knob"/></div><span>HEAVY</span></div><RefIds>132</RefIds></section>

    <section className="ex-zoom" aria-labelledby="ex-zoom-title"><div className="ex-zoom-window"><div className="ex-zoom-grid" aria-hidden="true"/><svg className="ex-zoom-flower" viewBox="-300 -300 600 600" aria-hidden="true"><path d={contour(3)} fill="#ed663c"/><circle r="85" fill="#d7ef86"/><path d="M-35 0h70M0-35v70" stroke="#171b19" strokeWidth="9"/></svg><div className="ex-zoom-copy"><span>CHANGE YOUR PERSPECTIVE.</span><h2 id="ex-zoom-title">把一个瞬间，<br/>放大成整个世界。</h2><RefIds light>152</RefIds></div></div><span className="ex-zoom-note">继续向下，画面慢慢展开。</span></section>

    <section className="ex-ending" aria-labelledby="ex-end-title"><svg className="ex-divider" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true"><path className="ex-divider-path ex-wave-back" d="M0 50Q360 5 720 50T1440 50V140H0Z"/><path className="ex-divider-path ex-wave-front" d="M0 60Q360 95 720 60T1440 60V140H0Z"/></svg><div className="ex-ending-inner"><SectionLabel n="终章">把感觉，带到下一页。</SectionLabel><div className="ex-ending-main"><div><h2 id="ex-end-title">灵感没有终点。<br/><em>下一次，怎么动？</em></h2><p>继续探索 192 条参考，<br/>把你看见的动作，变成自己的表达。</p><RefIds>084 · 156 · 165</RefIds></div><Button className="ex-magnetic" onClick={onExplore} aria-label="探索全部 192 条动效"><span className="ex-magnetic-face"><ArrowRightOutlined/><span className="ex-roll-word" aria-hidden="true">{'探索全部'.split('').map((c,i)=><span className="ex-roll-slot" key={i}><span className="ex-roll-line"><span>{c}</span><span>{c}</span></span></span>)}</span><small>192 EFFECTS</small></span></Button></div><div className="ex-ending-footer"><span>LET IDEAS MOVE.</span><span>一场关于动效的网页实验</span><span>THE END IS A NEW BEGINNING ↗</span></div></div></section>
  </div>;
}
