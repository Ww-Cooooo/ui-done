import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{z as t}from"./antd-C8ywYaKB.js";import{s as n}from"./motion-D0N1SILh.js";import{a as r,c as i,d as a,f as o,h as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _}from"./spatial-Dh7hsjMT.js";var v=e(t(),1),y=n(),b=Math.PI*2;function x(e,t){let n=(0,v.useMemo)(e,t);return(0,v.useEffect)(()=>()=>{(Array.isArray(n)?n:[n]).forEach(e=>e?.dispose?.())},[n]),n}function S(){let{gl:e,scene:t,invalidate:n}=h();return(0,v.useEffect)(()=>{let r=new g,a=new i(e),o=a.fromScene(r,.04);return t.environment=o.texture,r.traverse(e=>{e.geometry?.dispose?.(),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e?.dispose?.())}),a.dispose(),n(),()=>{t.environment===o.texture&&(t.environment=null),o.dispose()}},[e,n,t]),null}function C(e,t=.42,n=1){let r=new _(e),i=new l,a=[],c=[],u=new s;for(let e=0;e<=96;e+=1){let i=e/96,o=r.getPointAt(i),s=r.getTangentAt(i).normalize(),l=u.set(-s.y,s.x,.24).normalize();l.applyAxisAngle(s,i*n*Math.PI);let d=t*(.72+Math.sin(i*Math.PI)*.28),f=o.clone().addScaledVector(l,d),p=o.clone().addScaledVector(l,-d);if(a.push(f.x,f.y,f.z,p.x,p.y,p.z),e<96){let t=e*2;c.push(t,t+1,t+2,t+1,t+3,t+2)}}return i.setAttribute(`position`,new o(a,3)),i.setIndex(c),i.computeVertexNormals(),i}function w(e,t){let n=new Float32Array(e*3);for(let r=0;r<e;r+=1){let[i,a,o]=t(r,e);n[r*3]=i,n[r*3+1]=a,n[r*3+2]=o}return n}function T({page:e,active:t}){let n=(0,v.useRef)(null),r=x(()=>C([new s(-2.8,-.8,.1),new s(-1.2,1.1,-.5),new s(.6,-.3,.45),new s(2.5,.9,-.2)],.34,3.5),[]);return f((e,r)=>{!t||!n.current||(n.current.rotation.y+=r*.055,n.current.rotation.x=Math.sin(e.clock.elapsedTime*.22)*.08)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.34}),(0,y.jsx)(`spotLight`,{position:[2,5,5],intensity:48,angle:.38,penumbra:.7,color:e.theme.ink}),(0,y.jsx)(`pointLight`,{position:[-4,-2,2],intensity:28,color:e.theme.accent}),(0,y.jsxs)(`group`,{ref:n,rotation:[.14,-.16,-.08],children:[(0,y.jsx)(`mesh`,{geometry:r,children:(0,y.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent,metalness:.74,roughness:.2,clearcoat:1,side:2})}),(0,y.jsxs)(`mesh`,{position:[-1.35,.72,-.55],rotation:[.3,.2,.25],children:[(0,y.jsx)(`icosahedronGeometry`,{args:[.72,2]}),(0,y.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent2,transmission:.65,thickness:1.1,roughness:.12})]}),(0,y.jsxs)(`mesh`,{position:[1.45,-.62,.42],rotation:[.5,.2,0],children:[(0,y.jsx)(`torusGeometry`,{args:[.62,.08,20,96]}),(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.ink,metalness:.9,roughness:.18})]})]})]})}function E({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useMemo)(()=>[-1.4,-.72,0,.72,1.4].map((e,t)=>new _([new s(-4.4,e*.42-.6,-1.2),new s(-2.2,e*.26+Math.sin(t)*.25,.2),new s(.2,e*.18-.12,-.2),new s(2.3,e*.34+.35,.35),new s(4.4,e*.5+.7,-.4)])),[]);return f((e,r)=>{if(!t||!n.current)return;let i=e.pointer.x*.16;n.current.rotation.y+=(i-n.current.rotation.y)*Math.min(1,r*2.4),n.current.position.x=e.clock.elapsedTime*1.45%6-3,n.current.children[0].rotation.z-=r*2.6}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`fog`,{attach:`fog`,args:[e.theme.bg,6,13]}),(0,y.jsx)(`ambientLight`,{intensity:.22}),(0,y.jsx)(`directionalLight`,{position:[4,4,5],intensity:3.6,color:`#d8efff`}),(0,y.jsx)(`pointLight`,{position:[-3,0,2],intensity:42,color:e.theme.accent}),r.map((t,n)=>(0,y.jsxs)(`mesh`,{children:[(0,y.jsx)(`tubeGeometry`,{args:[t,96,n===2?.038:.018,8,!1]}),(0,y.jsx)(`meshStandardMaterial`,{color:n===2?e.theme.accent:e.theme.accent2,emissive:n===2?e.theme.accent:e.theme.accent2,emissiveIntensity:n===2?3:1.2,metalness:.45,roughness:.28})]},n)),(0,y.jsxs)(`group`,{ref:n,position:[-2.5,-.08,.45],rotation:[0,0,-.16],children:[(0,y.jsxs)(`mesh`,{scale:[1.25,.25,.42],children:[(0,y.jsx)(`capsuleGeometry`,{args:[.35,1.2,10,22]}),(0,y.jsx)(`meshPhysicalMaterial`,{color:`#eef5f7`,metalness:.28,roughness:.22,clearcoat:1})]}),(0,y.jsxs)(`mesh`,{position:[-.18,-.28,0],rotation:[Math.PI/2,0,0],children:[(0,y.jsx)(`torusGeometry`,{args:[.3,.055,12,48]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#0b1117`,roughness:.72})]})]})]})}var D=`
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float broad = sin(p.x * 0.72 + uTime * 0.42) * 0.24;
    float crossWave = sin(p.y * 1.15 - uTime * 0.27 + p.x * 0.21) * 0.15;
    float ripple = sin((p.x + p.y) * 2.8 + uTime * 0.7) * 0.035;
    p.z += broad + crossWave + ripple;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,O=`
  uniform vec3 uDeep;
  uniform vec3 uFoam;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    float horizon = smoothstep(0.05, 0.95, vUv.y);
    float crest = smoothstep(0.18, 0.42, vHeight);
    vec3 color = mix(uDeep, uFoam, horizon * 0.35 + crest * 0.46);
    gl_FragColor = vec4(color, 0.88);
  }
`;function k({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useRef)(null),i=(0,v.useMemo)(()=>({uTime:{value:0},uDeep:{value:new a(`#3f666b`)},uFoam:{value:new a(`#d9d5c9`)}}),[]);return f((e,i)=>{t&&(n.current&&(n.current.uniforms.uTime.value+=i),r.current&&(r.current.position.x=Math.sin(e.clock.elapsedTime*.08)*.22))}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`fog`,{attach:`fog`,args:[e.theme.bg,5,12]}),(0,y.jsx)(`ambientLight`,{intensity:1.2}),(0,y.jsx)(`directionalLight`,{position:[-3,4,5],intensity:2.8,color:`#fff3d5`}),(0,y.jsxs)(`mesh`,{ref:r,position:[2.1,1.3,-2],children:[(0,y.jsx)(`sphereGeometry`,{args:[.38,40,40]}),(0,y.jsx)(`meshBasicMaterial`,{color:e.theme.accent})]}),(0,y.jsxs)(`mesh`,{rotation:[-Math.PI/2.35,0,-.05],position:[0,-1.2,-.2],children:[(0,y.jsx)(`planeGeometry`,{args:[13,8,112,72]}),(0,y.jsx)(`shaderMaterial`,{ref:n,uniforms:i,vertexShader:D,fragmentShader:O,side:2,transparent:!0})]}),(0,y.jsxs)(`mesh`,{position:[0,-.15,-2.4],scale:[6,.025,1],children:[(0,y.jsx)(`boxGeometry`,{}),(0,y.jsx)(`meshBasicMaterial`,{color:`#707b76`,transparent:!0,opacity:.5})]})]})}function A({page:e,active:t}){let n=(0,v.useRef)(null),r=x(()=>[C([new s(-2.8,-1.4,0),new s(-1.5,1.2,.5),new s(.2,-.1,-.4),new s(2.8,1.3,.2)],.44,2.8),C([new s(-2.5,1.1,-.6),new s(-.8,-1.1,.2),new s(1.1,.7,.7),new s(2.4,-1.2,-.2)],.24,-3.6)],[]);return f(e=>{!t||!n.current||(n.current.rotation.y=Math.sin(e.clock.elapsedTime*.35)*.23,n.current.children[1].position.z=Math.sin(e.clock.elapsedTime*.8)*.18)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.28}),(0,y.jsx)(`spotLight`,{position:[-3.5,5,4],intensity:95,angle:.28,penumbra:.2,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,color:`#fff6e9`}),(0,y.jsx)(`pointLight`,{position:[4,-2,2],intensity:38,color:e.theme.accent2}),(0,y.jsxs)(`group`,{ref:n,rotation:[.12,-.22,-.08],children:[(0,y.jsx)(`mesh`,{geometry:r[0],castShadow:!0,children:(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.accent,metalness:.32,roughness:.28,side:2})}),(0,y.jsx)(`mesh`,{geometry:r[1],castShadow:!0,children:(0,y.jsx)(`meshStandardMaterial`,{color:`#111111`,metalness:.82,roughness:.2,side:2})}),(0,y.jsxs)(`mesh`,{position:[.6,0,-.9],rotation:[.2,.4,-.4],castShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[.22,3.8,.22]}),(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.accent2,metalness:.2,roughness:.45})]})]}),(0,y.jsxs)(`mesh`,{position:[0,-2.25,-.2],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,y.jsx)(`planeGeometry`,{args:[12,12]}),(0,y.jsx)(`shadowMaterial`,{transparent:!0,opacity:.24})]})]})}var j=`
  varying vec3 vNormalObject;
  varying vec3 vNormalView;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vNormalObject = normalize(normal);
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,M=`
  uniform float uTime;
  varying vec3 vNormalObject;
  varying vec3 vNormalView;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x), mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int octave = 0; octave < 5; octave++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + 17.7;
      amplitude *= 0.5;
    }
    return value;
  }
  void main() {
    vec2 mapUv = vec2(vUv.x * 4.6, vUv.y * 2.65);
    float terrain = fbm(mapUv + vec2(fbm(mapUv * 0.72), fbm(mapUv * 0.9 + 3.1)) * 1.2);
    float latitude = abs(vUv.y - 0.5) * 2.0;
    float land = smoothstep(0.52 + latitude * 0.035, 0.61 + latitude * 0.045, terrain);
    float ice = smoothstep(0.76, 0.96, latitude) * smoothstep(0.4, 0.66, terrain);
    vec3 ocean = mix(vec3(0.012, 0.075, 0.14), vec3(0.02, 0.25, 0.43), fbm(mapUv * 1.7));
    vec3 ground = mix(vec3(0.10, 0.22, 0.12), vec3(0.48, 0.38, 0.18), smoothstep(0.56, 0.78, terrain));
    vec3 albedo = mix(ocean, ground, land);
    albedo = mix(albedo, vec3(0.78, 0.88, 0.9), ice);
    vec3 lightDirection = normalize(vec3(-0.48, 0.6, 0.78));
    float diffuse = max(dot(normalize(vNormalObject), lightDirection), 0.0);
    float night = 1.0 - smoothstep(-0.12, 0.2, dot(normalize(vNormalObject), lightDirection));
    float cities = pow(random(floor(vUv * vec2(360.0, 190.0))), 17.0) * land * night;
    float cloudNoise = fbm(mapUv * 2.2 + vec2(uTime * 0.006, 0.0));
    float clouds = smoothstep(0.68, 0.78, cloudNoise) * (0.35 + diffuse * 0.65);
    float rim = pow(1.0 - max(dot(normalize(vNormalView), vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    vec3 color = albedo * (0.11 + diffuse * 1.08);
    color += vec3(1.0, 0.54, 0.12) * cities * 2.8;
    color = mix(color, vec3(0.8, 0.9, 0.96), clouds * 0.55);
    color += vec3(0.04, 0.35, 0.65) * rim * 0.65;
    gl_FragColor = vec4(color, 1.0);
  }
`,N=`
  varying float vIntensity;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 normalView = normalize(normalMatrix * normal);
    vec3 viewDirection = normalize(-viewPosition.xyz);
    vIntensity = pow(1.0 - max(dot(normalView, viewDirection), 0.0), 2.8);
    gl_Position = projectionMatrix * viewPosition;
  }
`,P=`
  uniform vec3 uGlow;
  varying float vIntensity;
  void main() {
    gl_FragColor = vec4(uGlow, vIntensity * 0.62);
  }
`;function F({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useRef)(null),i=(0,v.useRef)(null),o=(0,v.useMemo)(()=>({uTime:{value:0}}),[]),s=(0,v.useMemo)(()=>({uGlow:{value:new a(e.theme.accent2)}}),[e.theme.accent2]),c=(0,v.useMemo)(()=>w(420,(e,t)=>{let n=Math.acos(1-2*((e+.5)/t)),r=Math.PI*(1+Math.sqrt(5))*e,i=7+e%9*.14;return[Math.cos(r)*Math.sin(n)*i,Math.sin(r)*Math.sin(n)*i,Math.cos(n)*i]}),[]);return f((e,a)=>{if(t&&(n.current&&(n.current.rotation.y+=a*.06),i.current&&(i.current.uniforms.uTime.value+=a),r.current)){let t=e.clock.elapsedTime*.22;r.current.position.set(Math.cos(t)*2.55,Math.sin(t*1.35)*.78,Math.sin(t)*1.1),r.current.rotation.y+=a*.35}}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.12}),(0,y.jsx)(`directionalLight`,{position:[4,2,5],intensity:4.6,color:`#dcecff`}),(0,y.jsx)(`pointLight`,{position:[-4,-2,1],intensity:46,color:e.theme.accent2}),(0,y.jsxs)(`points`,{children:[(0,y.jsx)(`bufferGeometry`,{children:(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[c,3]})}),(0,y.jsx)(`pointsMaterial`,{color:`#c9e8ff`,size:.025,sizeAttenuation:!0,transparent:!0,opacity:.74})]}),(0,y.jsxs)(`group`,{ref:n,rotation:[.18,-.45,-.08],children:[(0,y.jsxs)(`mesh`,{children:[(0,y.jsx)(`sphereGeometry`,{args:[1.32,64,64]}),(0,y.jsx)(`shaderMaterial`,{ref:i,uniforms:o,vertexShader:j,fragmentShader:M})]}),(0,y.jsxs)(`mesh`,{scale:1.08,children:[(0,y.jsx)(`sphereGeometry`,{args:[1.32,64,64]}),(0,y.jsx)(`shaderMaterial`,{uniforms:s,vertexShader:N,fragmentShader:P,transparent:!0,depthWrite:!1,blending:2,side:1})]}),[1.72,2.15,2.64].map((t,n)=>(0,y.jsxs)(`mesh`,{rotation:[Math.PI/2+n*.22,n*.52,n*.18],children:[(0,y.jsx)(`torusGeometry`,{args:[t,.011+n*.004,8,120]}),(0,y.jsx)(`meshBasicMaterial`,{color:n===1?e.theme.accent:e.theme.accent2,transparent:!0,opacity:.54})]},t))]}),(0,y.jsxs)(`group`,{ref:r,position:[2.5,0,.4],children:[(0,y.jsxs)(`mesh`,{children:[(0,y.jsx)(`boxGeometry`,{args:[.44,.3,.28]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#ccd6da`,metalness:.9,roughness:.24})]}),(0,y.jsxs)(`mesh`,{position:[-.54,0,0],children:[(0,y.jsx)(`boxGeometry`,{args:[.72,.04,.42]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#164d78`,metalness:.35,roughness:.34})]}),(0,y.jsxs)(`mesh`,{position:[.54,0,0],children:[(0,y.jsx)(`boxGeometry`,{args:[.72,.04,.42]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#164d78`,metalness:.35,roughness:.34})]}),(0,y.jsxs)(`mesh`,{position:[0,.28,0],rotation:[0,0,Math.PI/2],children:[(0,y.jsx)(`cylinderGeometry`,{args:[.06,.12,.28,24]}),(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.accent,metalness:.7,roughness:.25})]})]})]})}function I({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useMemo)(()=>[new u(.2,-.42),new u(.84,-.34),new u(1.05,.04),new u(1.12,.22),new u(1.02,.3),new u(.78,.06),new u(.2,-.02)],[]);return f(e=>{!t||!n.current||(n.current.rotation.y=-.26+Math.sin(e.clock.elapsedTime*.22)*.06)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.8,color:`#ffe5bd`}),(0,y.jsx)(`spotLight`,{position:[-3,5,4],intensity:72,angle:.46,penumbra:.72,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,color:`#ffd293`}),(0,y.jsxs)(`group`,{ref:n,position:[0,-.45,0],rotation:[.06,-.26,0],children:[(0,y.jsxs)(`mesh`,{position:[0,-.35,0],castShadow:!0,children:[(0,y.jsx)(`latheGeometry`,{args:[r,64]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#c8a268`,roughness:.62,metalness:.08})]}),[[-.55,.18,.1],[.1,.34,-.18],[.62,.1,.16],[-.05,.04,.42]].map((e,t)=>(0,y.jsxs)(`mesh`,{position:e,castShadow:!0,children:[(0,y.jsx)(`sphereGeometry`,{args:[.42-t*.018,36,28]}),(0,y.jsx)(`meshStandardMaterial`,{color:t%2?`#d66a28`:`#e98732`,roughness:.76})]},t)),(0,y.jsxs)(`mesh`,{position:[1.72,.15,-.32],rotation:[.02,-.12,-.05],castShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[1.15,1.85,.54]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#d8b67b`,roughness:.9})]}),(0,y.jsxs)(`mesh`,{position:[1.72,.58,0],rotation:[-.2,0,0],children:[(0,y.jsx)(`torusGeometry`,{args:[.22,.035,10,36,Math.PI]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#76513a`,roughness:.8})]})]}),(0,y.jsxs)(`mesh`,{position:[0,-1.65,0],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,y.jsx)(`planeGeometry`,{args:[11,8]}),(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.surface,roughness:.98})]})]})}function L({page:e,active:t}){let n=(0,v.useRef)(null);return f(e=>{if(!t||!n.current)return;let r=1+Math.sin(e.clock.elapsedTime*.46)*.025;n.current.scale.setScalar(r),n.current.rotation.y=Math.sin(e.clock.elapsedTime*.18)*.08}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:1.15,color:`#fff7ed`}),(0,y.jsx)(`directionalLight`,{position:[3,5,4],intensity:3.4,color:`#fffdf6`,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),(0,y.jsx)(`pointLight`,{position:[-3,0,2],intensity:18,color:e.theme.accent}),(0,y.jsx)(`group`,{ref:n,position:[0,.12,0],children:[[-1.25,-.42,.1,.92,`#c6b4df`],[.08,.12,-.12,1.18,`#f1e6dd`],[1.4,-.55,.32,.76,`#9cb08e`],[-.35,-1.05,.76,.48,`#d7cbdc`]].map(([e,t,n,r,i],a)=>(0,y.jsxs)(`mesh`,{position:[e,t,n],scale:[r*1.28,r*.7,r],rotation:[.12*a,-.3*a,.12],castShadow:!0,children:[(0,y.jsx)(`sphereGeometry`,{args:[.7,48,32]}),(0,y.jsx)(`meshPhysicalMaterial`,{color:i,roughness:.26+a*.08,transmission:a===1?.42:.08,thickness:1.25,clearcoat:.45})]},a))}),(0,y.jsxs)(`mesh`,{position:[0,-1.72,0],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,y.jsx)(`planeGeometry`,{args:[10,10]}),(0,y.jsx)(`shadowMaterial`,{transparent:!0,opacity:.1})]})]})}function R({page:e,active:t}){let n=(0,v.useRef)(null),r=x(()=>[C([new s(-2.5,1.1,0),new s(-1.1,-.9,.6),new s(.5,.75,-.2),new s(2.5,-.7,.1)],.62,2.2),C([new s(-1.9,-1.1,-.5),new s(-.5,.95,.2),new s(1,-.45,.65),new s(2.2,.88,-.25)],.27,-3.2)],[]);return f(e=>{!t||!n.current||(n.current.rotation.y=.25+Math.sin(e.clock.elapsedTime*.24)*.18,n.current.rotation.x=Math.cos(e.clock.elapsedTime*.17)*.04)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.16}),(0,y.jsx)(`spotLight`,{position:[-4,5,4],intensity:88,angle:.3,penumbra:.45,color:`#fff2df`}),(0,y.jsx)(`pointLight`,{position:[3,-2,1],intensity:34,color:e.theme.accent}),(0,y.jsxs)(`group`,{ref:n,rotation:[0,.25,-.08],children:[(0,y.jsx)(`mesh`,{geometry:r[0],children:(0,y.jsx)(`meshPhysicalMaterial`,{color:`#120f0d`,roughness:.32,metalness:.16,sheen:1,sheenColor:new a(`#d7b17c`),side:2})}),(0,y.jsx)(`mesh`,{geometry:r[1],children:(0,y.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent,metalness:.94,roughness:.14,clearcoat:1,side:2})}),(0,y.jsxs)(`mesh`,{position:[.72,.1,.85],rotation:[.75,.2,.45],children:[(0,y.jsx)(`torusGeometry`,{args:[.66,.075,24,112]}),(0,y.jsx)(`meshPhysicalMaterial`,{color:`#ece4d7`,metalness:1,roughness:.08,iridescence:.25})]})]})]})}var z=`
  uniform float uTime;
  attribute float aScale;
  varying float vGlow;
  void main() {
    vec3 p = position;
    float pulse = sin(uTime * 1.1 + p.z * 2.2 + p.x * 0.8) * 0.5 + 0.5;
    p.xy *= 1.0 + pulse * 0.045;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * (26.0 / max(1.0, -mvPosition.z));
    vGlow = pulse;
  }
`,B=`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vGlow;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
    vec3 color = mix(uColorA, uColorB, vGlow);
    gl_FragColor = vec4(color, alpha * 0.92);
  }
`;function V({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useRef)(null),{positions:i,scales:o}=(0,v.useMemo)(()=>{let e=new Float32Array(780*3),t=new Float32Array(780);for(let n=0;n<780;n+=1){let r=n/780,i=r*b*8.5,a=.72+r*2.7+Math.sin(n*1.71)*.11;e[n*3]=Math.cos(i)*a,e[n*3+1]=Math.sin(i)*a,e[n*3+2]=(r-.5)*3.2,t[n]=.55+n*37%100/70}return{positions:e,scales:t}},[]),s=(0,v.useMemo)(()=>({uTime:{value:0},uColorA:{value:new a(e.theme.accent)},uColorB:{value:new a(e.theme.accent2)}}),[e.theme.accent,e.theme.accent2]);return f((e,i)=>{t&&(n.current&&(n.current.uniforms.uTime.value+=i),r.current&&(r.current.rotation.z=e.clock.elapsedTime*.08))}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.08}),(0,y.jsx)(`pointLight`,{position:[0,0,3],intensity:54,color:e.theme.accent2}),(0,y.jsxs)(`points`,{rotation:[.08,-.12,0],children:[(0,y.jsxs)(`bufferGeometry`,{children:[(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[i,3]}),(0,y.jsx)(`bufferAttribute`,{attach:`attributes-aScale`,args:[o,1]})]}),(0,y.jsx)(`shaderMaterial`,{ref:n,uniforms:s,vertexShader:z,fragmentShader:B,transparent:!0,depthWrite:!1,blending:2})]}),(0,y.jsx)(`group`,{ref:r,rotation:[.25,.12,0],children:[1.05,1.7,2.35].map((t,n)=>(0,y.jsxs)(`mesh`,{rotation:[n*.52,n*.31,n*.72],children:[(0,y.jsx)(`torusGeometry`,{args:[t,n===1?.035:.018,12,120]}),(0,y.jsx)(`meshStandardMaterial`,{color:n%2?e.theme.accent:e.theme.accent2,emissive:n%2?e.theme.accent:e.theme.accent2,emissiveIntensity:4.5,transparent:!0,opacity:.74})]},t))}),(0,y.jsxs)(`mesh`,{position:[0,0,-1.6],children:[(0,y.jsx)(`circleGeometry`,{args:[.72,64]}),(0,y.jsx)(`meshBasicMaterial`,{color:`#050313`})]})]})}function H(e,t){let n=new p;n.moveTo(-5,-2);for(let r=0;r<=18;r+=1){let i=-5+r/18*10,a=Math.sin(r/18*Math.PI),o=Math.sin(r*(.72+e*.11)+e)*.22;n.lineTo(i,-1.15+a*t+o)}return n.lineTo(5,-2),n.closePath(),n}function U({page:e,active:t}){let n=(0,v.useRef)(null),r=(0,v.useMemo)(()=>[H(1,1.5),H(2,2.05),H(3,2.7),H(4,3.3)],[]),i=(0,v.useMemo)(()=>w(180,(e,t)=>[-4.5+e/t*9,-.8+Math.sin(e*1.9)*.36,-(e%7)*.3]),[]);return f(e=>{!t||!n.current||(n.current.position.x=e.pointer.x*.18,n.current.rotation.y=e.pointer.x*.025)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:1.45}),(0,y.jsx)(`directionalLight`,{position:[3,5,4],intensity:2.4,color:`#fff5df`}),(0,y.jsxs)(`group`,{ref:n,position:[0,-.15,0],children:[r.map((e,t)=>(0,y.jsxs)(`mesh`,{position:[0,-t*.06,-2.1+t*.72],scale:[1,1,1],children:[(0,y.jsx)(`shapeGeometry`,{args:[e,10]}),(0,y.jsx)(`meshStandardMaterial`,{color:[`#b9ad98`,`#92846f`,`#655949`,`#2b251f`][t],roughness:1,transparent:!0,opacity:.58+t*.1,side:2})]},t)),(0,y.jsxs)(`points`,{position:[0,.15,.8],children:[(0,y.jsx)(`bufferGeometry`,{children:(0,y.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[i,3]})}),(0,y.jsx)(`pointsMaterial`,{color:`#f8f1e5`,size:.12,transparent:!0,opacity:.38,depthWrite:!1})]}),(0,y.jsxs)(`mesh`,{position:[2.8,1.28,.4],children:[(0,y.jsx)(`circleGeometry`,{args:[.32,48]}),(0,y.jsx)(`meshBasicMaterial`,{color:e.theme.accent,transparent:!0,opacity:.9})]})]})]})}function W({page:e,active:t}){let n=(0,v.useRef)(null);return f(e=>{!t||!n.current||(n.current.rotation.y=-.62+Math.sin(e.clock.elapsedTime*.2)*.08)}),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`ambientLight`,{intensity:.95}),(0,y.jsx)(`directionalLight`,{position:[4,7,6],intensity:3.8,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),(0,y.jsxs)(`group`,{ref:n,rotation:[-.08,-.62,0],position:[0,-.15,0],children:[[-1.35,-.45,.45,1.35].map((t,n)=>(0,y.jsxs)(`mesh`,{position:[0,t,0],castShadow:!0,receiveShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[4.4,.1,2.5]}),(0,y.jsx)(`meshStandardMaterial`,{color:n===2?e.theme.accent:`#dadad5`,roughness:.72,metalness:.08})]},t)),[-1.8,-.6,.6,1.8].flatMap((e,t)=>[-.85,.85].map((n,r)=>(0,y.jsxs)(`mesh`,{position:[e,0,n],castShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[.09,3.55,.09]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#26282a`,metalness:.54,roughness:.38})]},`${t}-${r}`))),(0,y.jsxs)(`mesh`,{position:[.75,0,.05],castShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[.86,3.5,.92]}),(0,y.jsx)(`meshStandardMaterial`,{color:e.theme.accent2,roughness:.62,transparent:!0,opacity:.88})]}),(0,y.jsxs)(`mesh`,{position:[-.72,-.88,.15],rotation:[0,0,-.46],castShadow:!0,children:[(0,y.jsx)(`boxGeometry`,{args:[.78,.08,1.25]}),(0,y.jsx)(`meshStandardMaterial`,{color:`#17191a`,metalness:.4,roughness:.42})]})]}),(0,y.jsx)(`gridHelper`,{args:[12,24,e.theme.accent2,`#b7b8b5`],position:[0,-1.82,0]})]})}var G={gallery:T,"velocity-works":E,"north-tide":k,"red-form":A,"orbital-grid":F,"corner-goods":I,"still-day":L,"atelier-noir":R,"neon-rift":V,"shanshui-now":U,"grid-01":W};function K({page:e}){return e.id===`neon-rift`?(0,y.jsxs)(m,{multisampling:0,children:[(0,y.jsx)(d,{intensity:2.4,luminanceThreshold:.18,mipmapBlur:!0}),(0,y.jsx)(c,{offset:.18,darkness:.72})]}):e.id===`orbital-grid`?(0,y.jsx)(m,{multisampling:0,children:(0,y.jsx)(d,{intensity:.92,luminanceThreshold:.48,mipmapBlur:!0})}):e.id===`velocity-works`?(0,y.jsx)(m,{multisampling:0,children:(0,y.jsx)(d,{intensity:.72,luminanceThreshold:.65,mipmapBlur:!0})}):null}function q(e){return e.id===`grid-01`?{position:[7,6,8],zoom:72,near:.1,far:100}:e.id===`north-tide`?{position:[0,1.35,7.8],fov:44,near:.1,far:100}:e.id===`corner-goods`?{position:[0,1.2,7],fov:40,near:.1,far:100}:e.id===`orbital-grid`?{position:[0,0,7.4],fov:42,near:.1,far:100}:{position:[0,0,7],fov:42,near:.1,far:100}}function J({page:e,active:t}){let n=G[e.id]||T;return(0,y.jsxs)(r,{orthographic:e.id===`grid-01`,camera:q(e),dpr:[1,1.35],frameloop:t?`always`:`demand`,shadows:[`red-form`,`corner-goods`,`still-day`,`grid-01`].includes(e.id)?`percentage`:!1,gl:{antialias:!0,alpha:!0,powerPreference:`high-performance`},onCreated:({gl:t})=>{t.toneMapping=4,t.toneMappingExposure=e.id===`neon-rift`?1.08:1},fallback:null,children:[(0,y.jsx)(S,{}),(0,y.jsx)(n,{page:e,active:t}),(0,y.jsx)(K,{page:e})]})}export{J as default};