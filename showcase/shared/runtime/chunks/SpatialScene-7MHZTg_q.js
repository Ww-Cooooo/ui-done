import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{X as t}from"./antd-XPXhukLV.js";import{c as n}from"./motion-4_RHs14w.js";import{a as r,c as i,d as a,f as o,g as s,h as c,i as l,l as u,m as d,n as f,o as p,p as m,r as h,s as g,t as _,u as v}from"./spatial-NMMnPf8S.js";var y=e(t(),1),b=n(),x=Math.PI*2,S=2.62;function C(e,t){let n=(0,y.useMemo)(e,t);return(0,y.useEffect)(()=>()=>{(Array.isArray(n)?n:[n]).forEach(e=>e?.dispose?.())},[n]),n}function w(){let{gl:e,scene:t,invalidate:n}=g();return(0,y.useEffect)(()=>{let r=new _,a=new i(e),o=a.fromScene(r,.04);return t.environment=o.texture,r.traverse(e=>{e.geometry?.dispose?.(),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e?.dispose?.())}),a.dispose(),n(),()=>{t.environment===o.texture&&(t.environment=null),o.dispose()}},[e,n,t]),null}function T(e,t){let n=new Float32Array(e*3);for(let r=0;r<e;r+=1){let[i,a,o]=t(r,e);n[r*3]=i,n[r*3+1]=a,n[r*3+2]=o}return n}var E=`
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float broad = sin(p.x * 0.58 + uTime * 0.32) * 0.068;
    float crossWave = sin(p.y * 0.82 - uTime * 0.23 + p.x * 0.16) * 0.045;
    float ripple = sin((p.x + p.y) * 2.15 + uTime * 0.56) * 0.014;
    p.z += broad + crossWave + ripple;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,D=`
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uFoam;
  varying float vHeight;
  varying vec2 vUv;
  void main() {
    float distanceLight = smoothstep(0.02, 0.98, vUv.y);
    float crest = smoothstep(0.13, 0.25, vHeight);
    float sunPath = exp(-pow((vUv.x - 0.67) * 7.0, 2.0)) * smoothstep(0.18, 0.9, vUv.y);
    float fineRipple = pow(0.5 + 0.5 * sin(vUv.y * 96.0 + vUv.x * 21.0), 18.0) * smoothstep(0.12, 0.92, vUv.y);
    vec3 color = mix(uDeep, uMid, distanceLight * 0.72);
    color = mix(color, uFoam, crest * 0.32 + sunPath * 0.22 + fineRipple * 0.1);
    gl_FragColor = vec4(color, 0.96);
  }
`;function O({page:e,active:t}){let n=(0,y.useRef)(null),r=(0,y.useRef)(null),i=(0,y.useMemo)(()=>({uTime:{value:0},uDeep:{value:new v(`#284c54`)},uMid:{value:new v(`#78999a`)},uFoam:{value:new v(`#e1dcd0`)}}),[]);return p((e,i)=>{t&&(n.current&&(n.current.uniforms.uTime.value+=i),r.current&&(r.current.position.x=2.45+Math.sin(e.clock.elapsedTime*.07)*.08))}),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`fog`,{attach:`fog`,args:[e.theme.bg,6.8,14.5]}),(0,b.jsx)(`hemisphereLight`,{args:[`#f5ead3`,`#2a5359`,2.2]}),(0,b.jsx)(`directionalLight`,{position:[-3,5,3],intensity:2.1,color:`#fff3d8`}),(0,b.jsxs)(`mesh`,{ref:r,position:[2.45,1.55,-4.8],children:[(0,b.jsx)(`sphereGeometry`,{args:[.26,40,40]}),(0,b.jsx)(`meshBasicMaterial`,{color:`#c76f49`})]}),(0,b.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,-1.18,-2.45],children:[(0,b.jsx)(`planeGeometry`,{args:[14,13,124,104]}),(0,b.jsx)(`shaderMaterial`,{ref:n,uniforms:i,vertexShader:E,fragmentShader:D,side:2})]})]})}function k(){let e=new m;e.moveTo(-1.92,-1.08),e.bezierCurveTo(-2.24,-.18,-1.66,1.18,-.62,1.68),e.bezierCurveTo(.34,2.12,1.52,1.68,1.9,.74),e.bezierCurveTo(2.18,.04,1.86,-.72,1.18,-1.18),e.bezierCurveTo(.46,-1.68,-.7,-1.86,-1.52,-1.46),e.bezierCurveTo(-1.72,-1.36,-1.84,-1.22,-1.92,-1.08);let t=new o;t.moveTo(-.42,-.74),t.bezierCurveTo(-.74,-.22,-.54,.68,-.02,1),t.bezierCurveTo(.4,1.26,.86,.78,.78,.18),t.bezierCurveTo(.7,-.42,.08,-.96,-.42,-.74),e.holes.push(t);let n=new a(e,{depth:.7,steps:1,curveSegments:72,bevelEnabled:!0,bevelSegments:6,bevelSize:.12,bevelThickness:.12});return n.center(),n.computeVertexNormals(),n}function A({page:e,active:t}){let n=(0,y.useRef)(null),r=C(()=>k(),[]);return p(e=>{!t||!n.current||(n.current.rotation.y=-.48+Math.sin(e.clock.elapsedTime*.24)*.2,n.current.rotation.x=.1+Math.cos(e.clock.elapsedTime*.17)*.035)}),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`ambientLight`,{intensity:.3}),(0,b.jsx)(`spotLight`,{position:[-4,5,5],intensity:92,angle:.3,penumbra:.5,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,color:`#fff4df`}),(0,b.jsx)(`pointLight`,{position:[4,-1,2],intensity:28,color:e.theme.accent2}),(0,b.jsx)(`mesh`,{ref:n,geometry:r,position:[1.12,-.12,0],rotation:[.1,-.48,-.12],scale:.84,castShadow:!0,children:(0,b.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent,metalness:.52,roughness:.22,clearcoat:.72,clearcoatRoughness:.18})}),(0,b.jsxs)(`mesh`,{position:[0,-2.02,-.15],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[(0,b.jsx)(`planeGeometry`,{args:[12,11]}),(0,b.jsx)(`shadowMaterial`,{transparent:!0,opacity:.2})]})]})}var j=`
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
    vec2 mapUv = vec2(vUv.x * 4.6 + uTime * 0.004, vUv.y * 2.65);
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
    gl_FragColor = vec4(uGlow, vIntensity * 0.58);
  }
`;function F(e,t){let n=e/2,r=t/2,i=Math.min(e,t)*.12,o=new m;o.moveTo(-n+i,-r),o.lineTo(n-i,-r),o.lineTo(n,-r+i),o.lineTo(n,r-i),o.lineTo(n-i,r),o.lineTo(-n+i,r),o.lineTo(-n,r-i),o.lineTo(-n,-r+i),o.closePath();let s=new a(o,{depth:.055,steps:1,bevelEnabled:!0,bevelSegments:3,bevelSize:.018,bevelThickness:.018});return s.center(),s.computeVertexNormals(),s}function I({geometry:e,position:t,color:n}){return(0,b.jsxs)(`group`,{position:t,children:[(0,b.jsx)(`mesh`,{geometry:e,children:(0,b.jsx)(`meshPhysicalMaterial`,{color:n,metalness:.5,roughness:.22,clearcoat:.5})}),[-.38,-.13,.13,.38].map(e=>(0,b.jsxs)(`mesh`,{position:[e,0,.075],children:[(0,b.jsx)(`planeGeometry`,{args:[.012,.38]}),(0,b.jsx)(`meshBasicMaterial`,{color:`#73b9dc`,transparent:!0,opacity:.7})]},e)),(0,b.jsxs)(`mesh`,{position:[0,0,.076],children:[(0,b.jsx)(`planeGeometry`,{args:[1.02,.012]}),(0,b.jsx)(`meshBasicMaterial`,{color:`#73b9dc`,transparent:!0,opacity:.62})]})]})}function L({page:e,active:t}){let{size:n}=g(),r=(0,y.useRef)(null),i=(0,y.useRef)(null),a=(0,y.useRef)(null),o=n.width<520,s=o?1.9:S,l=o?.25:.58,u=C(()=>F(1.16,.5),[]),d=(0,y.useMemo)(()=>[new c(.16,-.5),new c(.28,-.46),new c(.35,-.28),new c(.36,.22),new c(.3,.42),new c(.17,.5)],[]),f=(0,y.useMemo)(()=>[new c(.045,-.18),new c(.18,-.15),new c(.34,-.07),new c(.48,.06),new c(.45,.11),new c(.31,.01),new c(.16,-.09),new c(.045,-.12)],[]),m=(0,y.useMemo)(()=>({uTime:{value:0}}),[]),h=(0,y.useMemo)(()=>({uGlow:{value:new v(e.theme.accent2)}}),[e.theme.accent2]),_=(0,y.useMemo)(()=>T(480,(e,t)=>{let n=Math.acos(1-2*((e+.5)/t)),r=Math.PI*(1+Math.sqrt(5))*e,i=7.2+e%11*.15;return[Math.cos(r)*Math.sin(n)*i,Math.sin(r)*Math.sin(n)*i,Math.cos(n)*i]}),[]);return p((e,n)=>{if(!t)return;let o=e.clock.elapsedTime*.16;r.current&&(r.current.rotation.y+=n*.035),a.current&&(a.current.uniforms.uTime.value+=n),i.current&&(i.current.position.set(Math.cos(o)*s,Math.sin(o)*s,0),i.current.rotation.set(.12,-.3,o+Math.PI/2))}),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`ambientLight`,{intensity:.12}),(0,b.jsx)(`directionalLight`,{position:[4,2,5],intensity:3.2,color:`#dcecff`}),(0,b.jsx)(`pointLight`,{position:[-4,-2,1],intensity:24,color:e.theme.accent2}),(0,b.jsxs)(`points`,{children:[(0,b.jsx)(`bufferGeometry`,{children:(0,b.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[_,3]})}),(0,b.jsx)(`pointsMaterial`,{color:`#c9e8ff`,size:.024,sizeAttenuation:!0,transparent:!0,opacity:.72})]}),(0,b.jsxs)(`group`,{ref:r,rotation:[.12,-.38,-.04],children:[(0,b.jsxs)(`mesh`,{children:[(0,b.jsx)(`sphereGeometry`,{args:[1.3,64,64]}),(0,b.jsx)(`shaderMaterial`,{ref:a,uniforms:m,vertexShader:j,fragmentShader:M})]}),(0,b.jsxs)(`mesh`,{scale:1.082,children:[(0,b.jsx)(`sphereGeometry`,{args:[1.3,64,64]}),(0,b.jsx)(`shaderMaterial`,{uniforms:h,vertexShader:N,fragmentShader:P,transparent:!0,depthWrite:!1,blending:2,side:1})]})]}),(0,b.jsx)(`group`,{rotation:[.52,-.28,.08],children:(0,b.jsxs)(`group`,{ref:i,position:[s,0,0],scale:l,children:[(0,b.jsxs)(`mesh`,{rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`latheGeometry`,{args:[d,64]}),(0,b.jsx)(`meshPhysicalMaterial`,{color:`#9eabb2`,metalness:.76,roughness:.25,clearcoat:.52})]}),(0,b.jsxs)(`mesh`,{position:[0,0,-.26],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.37,.37,.055,48]}),(0,b.jsx)(`meshPhysicalMaterial`,{color:`#d59b2f`,metalness:.78,roughness:.24,clearcoat:.36})]}),(0,b.jsxs)(`mesh`,{position:[0,0,.27],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.37,.37,.055,48]}),(0,b.jsx)(`meshPhysicalMaterial`,{color:`#d59b2f`,metalness:.78,roughness:.24,clearcoat:.36})]}),(0,b.jsx)(I,{geometry:u,position:[-1.03,0,0],color:`#0a4268`}),(0,b.jsx)(I,{geometry:u,position:[1.03,0,0],color:`#0a4268`}),(0,b.jsxs)(`mesh`,{position:[-.405,0,0],rotation:[0,0,Math.PI/2],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.034,.034,.13,20]}),(0,b.jsx)(`meshStandardMaterial`,{color:e.theme.accent,metalness:.8,roughness:.24})]}),(0,b.jsxs)(`mesh`,{position:[.405,0,0],rotation:[0,0,Math.PI/2],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.034,.034,.13,20]}),(0,b.jsx)(`meshStandardMaterial`,{color:e.theme.accent,metalness:.8,roughness:.24})]}),(0,b.jsxs)(`mesh`,{position:[0,0,.57],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.115,.15,.16,32]}),(0,b.jsx)(`meshStandardMaterial`,{color:`#747f85`,metalness:.72,roughness:.3})]}),(0,b.jsxs)(`mesh`,{position:[0,0,.74],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`latheGeometry`,{args:[f,64]}),(0,b.jsx)(`meshPhysicalMaterial`,{color:`#bbc5c9`,metalness:.68,roughness:.24,clearcoat:.56,side:2})]}),(0,b.jsxs)(`mesh`,{position:[0,0,.96],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.018,.018,.25,16]}),(0,b.jsx)(`meshStandardMaterial`,{color:e.theme.accent,metalness:.7,roughness:.24})]}),(0,b.jsxs)(`mesh`,{position:[0,0,1.09],children:[(0,b.jsx)(`sphereGeometry`,{args:[.055,24,18]}),(0,b.jsx)(`meshBasicMaterial`,{color:e.theme.accent})]}),(0,b.jsxs)(`mesh`,{position:[0,0,-.6],rotation:[Math.PI/2,0,0],children:[(0,b.jsx)(`cylinderGeometry`,{args:[.2,.13,.22,32,1,!0]}),(0,b.jsx)(`meshStandardMaterial`,{color:`#66737b`,metalness:.76,roughness:.3,side:2})]})]})})]})}var R=`
  uniform float uTime;
  attribute float aScale;
  attribute float aBand;
  varying float vGlow;
  varying float vBand;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTime * 0.46 + 3.7, 7.4) - 3.7;
    float twist = uTime * 0.06 + p.z * 0.16;
    mat2 turn = mat2(cos(twist), -sin(twist), sin(twist), cos(twist));
    p.xy = turn * p.xy;
    float pulse = sin(uTime * 1.05 + p.z * 1.7 + p.x * 0.65) * 0.5 + 0.5;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * (34.0 / max(1.0, -mvPosition.z));
    vGlow = pulse;
    vBand = aBand;
  }
`,z=`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vGlow;
  varying float vBand;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.1, 0.5, distanceToCenter);
    vec3 nearColor = mix(uColorA, uColorB, vGlow);
    vec3 color = mix(nearColor, uColorB, vBand * 0.72);
    gl_FragColor = vec4(color, alpha * mix(0.78, 0.48, vBand));
  }
`;function B({page:e,active:t}){let n=(0,y.useRef)(null),r=(0,y.useRef)(null),i=1632,{positions:a,scales:o,bands:s}=(0,y.useMemo)(()=>{let e=new Float32Array(i*3),t=new Float32Array(i),n=new Float32Array(i);for(let r=0;r<48;r+=1){let i=-3.7+r/47*7.4;for(let a=0;a<34;a+=1){let o=r*34+a,s=+(a%7==0),c=a/34*x+r*.115,l=s?1.68+Math.sin(r*.47+a)*.11:.92+Math.sin(a*1.7+r*.31)*.13;e[o*3]=Math.cos(c)*l,e[o*3+1]=Math.sin(c)*l,e[o*3+2]=i,t[o]=s?.72:.95+o*37%100/120,n[o]=s}}return{positions:e,scales:t,bands:n}},[i]),c=(0,y.useMemo)(()=>({uTime:{value:0},uColorA:{value:new v(e.theme.accent)},uColorB:{value:new v(e.theme.accent2)}}),[e.theme.accent,e.theme.accent2]);return p((e,i)=>{t&&(n.current&&(n.current.uniforms.uTime.value+=i),r.current&&(r.current.rotation.x=.06+e.pointer.y*.08,r.current.rotation.y=-.08+e.pointer.x*.1))}),(0,b.jsxs)(`points`,{ref:r,rotation:[.06,-.08,0],children:[(0,b.jsxs)(`bufferGeometry`,{children:[(0,b.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[a,3]}),(0,b.jsx)(`bufferAttribute`,{attach:`attributes-aScale`,args:[o,1]}),(0,b.jsx)(`bufferAttribute`,{attach:`attributes-aBand`,args:[s,1]})]}),(0,b.jsx)(`shaderMaterial`,{ref:n,uniforms:c,vertexShader:R,fragmentShader:z,transparent:!0,depthWrite:!1,blending:2})]})}function V(){let e=new m;e.moveTo(-2.48,-.74),e.bezierCurveTo(-1.92,-1.04,-1.02,-1.02,-.42,-.58),e.bezierCurveTo(.16,-.15,.42,.58,1.18,.72),e.bezierCurveTo(1.72,.82,2.18,.52,2.5,.08),e.bezierCurveTo(2.26,.74,1.86,1.12,1.18,1.22),e.bezierCurveTo(.16,1.38,-.28,.58,-.9,.2),e.bezierCurveTo(-1.46,-.14,-2.02,-.18,-2.48,.14),e.closePath();let t=new o;t.absellipse(.12,.34,.7,.25,0,x,!0,0),e.holes.push(t);let n=new a(e,{depth:1.34,steps:2,bevelEnabled:!0,bevelSegments:8,bevelSize:.09,bevelThickness:.09,curveSegments:42});return n.center(),n.computeVertexNormals(),n}function H(e,t){return new d(new u(e.map(e=>new s(...e))),96,t,12,!1)}function U({page:e,active:t}){let n=(0,y.useRef)(null),r=C(()=>V(),[]),i=C(()=>[H([[-2.2,-.42,.78],[-1.2,-.08,.9],[-.2,.34,.74],[.86,.52,.42],[2.16,.12,.08]],.065),H([[-1.92,.08,-.78],[-.9,.54,-.9],[.18,.82,-.68],[1.18,.86,-.28],[2.06,.54,.12]],.04)],[]);return p(e=>{!t||!n.current||(n.current.rotation.y=-.5+Math.sin(e.clock.elapsedTime*.19)*.045,n.current.rotation.x=-.18+Math.cos(e.clock.elapsedTime*.14)*.014)}),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`ambientLight`,{intensity:.48}),(0,b.jsx)(`directionalLight`,{position:[4,7,6],intensity:2.9,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024}),(0,b.jsx)(`pointLight`,{position:[-4,1,3],intensity:10,color:e.theme.accent2}),(0,b.jsxs)(`group`,{ref:n,rotation:[-.18,-.5,0],position:[0,.05,0],children:[(0,b.jsx)(`mesh`,{geometry:r,castShadow:!0,receiveShadow:!0,children:(0,b.jsx)(`meshPhysicalMaterial`,{color:`#e4e5e1`,metalness:.08,roughness:.46,clearcoat:.24})}),(0,b.jsx)(`mesh`,{geometry:i[0],castShadow:!0,children:(0,b.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent,emissive:e.theme.accent,emissiveIntensity:.08,metalness:.12,roughness:.36})}),(0,b.jsx)(`mesh`,{geometry:i[1],castShadow:!0,children:(0,b.jsx)(`meshPhysicalMaterial`,{color:e.theme.accent2,metalness:.2,roughness:.32})})]}),(0,b.jsx)(`gridHelper`,{args:[12,24,e.theme.accent2,`#b7b8b5`],position:[0,-2.34,0]})]})}var W={"north-tide":O,"red-form":A,"orbital-grid":L,"neon-rift":B,"grid-01":U};function G({page:e}){return e.id===`neon-rift`?(0,b.jsxs)(h,{multisampling:0,children:[(0,b.jsx)(f,{intensity:2.2,luminanceThreshold:.16,mipmapBlur:!0}),(0,b.jsx)(l,{offset:.16,darkness:.68})]}):e.id===`orbital-grid`?(0,b.jsx)(h,{multisampling:0,children:(0,b.jsx)(f,{intensity:.46,luminanceThreshold:.78,mipmapBlur:!0})}):null}function K(e){return e.id===`grid-01`?{position:[7,5.5,8.5],zoom:104,near:.1,far:100}:e.id===`north-tide`?{position:[0,1.22,7.6],fov:45,near:.1,far:100}:e.id===`orbital-grid`?{position:[0,0,9.2],fov:42,near:.1,far:100}:e.id===`neon-rift`?{position:[0,0,7],fov:44,near:.1,far:100}:{position:[0,.05,7.2],fov:42,near:.1,far:100}}function q({page:e,active:t}){let n=W[e.id];return n?(0,b.jsxs)(r,{orthographic:e.id===`grid-01`,camera:K(e),dpr:[1,1.35],frameloop:t?`always`:`demand`,shadows:[`red-form`,`grid-01`].includes(e.id)?`percentage`:!1,gl:{antialias:!0,alpha:!0,powerPreference:`high-performance`},onCreated:({gl:t})=>{t.toneMapping=4,t.toneMappingExposure=e.id===`neon-rift`?1.06:1},fallback:null,children:[(0,b.jsx)(w,{}),(0,b.jsx)(n,{page:e,active:t}),(0,b.jsx)(G,{page:e})]}):null}export{q as default};