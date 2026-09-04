import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  PMREMGenerator,
  Shape,
  Vector2,
  Vector3
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const TAU = Math.PI * 2;

function useDisposable(factory, dependencies) {
  const value = useMemo(factory, dependencies);

  useEffect(() => () => {
    const values = Array.isArray(value) ? value : [value];
    values.forEach(item => item?.dispose?.());
  }, [value]);

  return value;
}

function StudioEnvironment() {
  const { gl, scene, invalidate } = useThree();

  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.traverse(child => {
      child.geometry?.dispose?.();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach(material => material?.dispose?.());
    });
    generator.dispose();
    invalidate();

    return () => {
      if (scene.environment === target.texture) scene.environment = null;
      target.dispose();
    };
  }, [gl, invalidate, scene]);

  return null;
}

function makeRibbonGeometry(points, width = 0.42, twists = 1) {
  const curve = new CatmullRomCurve3(points);
  const geometry = new BufferGeometry();
  const positions = [];
  const indices = [];
  const segments = 96;
  const axis = new Vector3();

  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const center = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const side = axis.set(-tangent.y, tangent.x, 0.24).normalize();
    side.applyAxisAngle(tangent, t * twists * Math.PI);
    const swell = width * (0.72 + Math.sin(t * Math.PI) * 0.28);
    const left = center.clone().addScaledVector(side, swell);
    const right = center.clone().addScaledVector(side, -swell);
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    if (index < segments) {
      const offset = index * 2;
      indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
    }
  }

  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makePointCloud(count, transform) {
  const points = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const [x, y, z] = transform(index, count);
    points[index * 3] = x;
    points[index * 3 + 1] = y;
    points[index * 3 + 2] = z;
  }
  return points;
}

function GalleryScene({ page, active }) {
  const root = useRef(null);
  const ribbon = useDisposable(() => makeRibbonGeometry([
    new Vector3(-2.8, -0.8, 0.1),
    new Vector3(-1.2, 1.1, -0.5),
    new Vector3(0.6, -0.3, 0.45),
    new Vector3(2.5, 0.9, -0.2)
  ], 0.34, 3.5), []);

  useFrame((state, delta) => {
    if (!active || !root.current) return;
    root.current.rotation.y += delta * 0.055;
    root.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.34} />
      <spotLight position={[2, 5, 5]} intensity={48} angle={0.38} penumbra={0.7} color={page.theme.ink} />
      <pointLight position={[-4, -2, 2]} intensity={28} color={page.theme.accent} />
      <group ref={root} rotation={[0.14, -0.16, -0.08]}>
        <mesh geometry={ribbon}>
          <meshPhysicalMaterial color={page.theme.accent} metalness={0.74} roughness={0.2} clearcoat={1} side={DoubleSide} />
        </mesh>
        <mesh position={[-1.35, 0.72, -0.55]} rotation={[0.3, 0.2, 0.25]}>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshPhysicalMaterial color={page.theme.accent2} transmission={0.65} thickness={1.1} roughness={0.12} />
        </mesh>
        <mesh position={[1.45, -0.62, 0.42]} rotation={[0.5, 0.2, 0]}>
          <torusGeometry args={[0.62, 0.08, 20, 96]} />
          <meshStandardMaterial color={page.theme.ink} metalness={0.9} roughness={0.18} />
        </mesh>
      </group>
    </>
  );
}

function VelocityScene({ page, active }) {
  const root = useRef(null);
  const curves = useMemo(() => [-1.4, -0.72, 0, 0.72, 1.4].map((offset, index) => new CatmullRomCurve3([
    new Vector3(-4.4, offset * 0.42 - 0.6, -1.2),
    new Vector3(-2.2, offset * 0.26 + Math.sin(index) * 0.25, 0.2),
    new Vector3(0.2, offset * 0.18 - 0.12, -0.2),
    new Vector3(2.3, offset * 0.34 + 0.35, 0.35),
    new Vector3(4.4, offset * 0.5 + 0.7, -0.4)
  ])), []);

  useFrame((state, delta) => {
    if (!active || !root.current) return;
    const target = state.pointer.x * 0.16;
    root.current.rotation.y += (target - root.current.rotation.y) * Math.min(1, delta * 2.4);
    root.current.position.x = ((state.clock.elapsedTime * 1.45) % 6) - 3;
    root.current.children[0].rotation.z -= delta * 2.6;
  });

  return (
    <>
      <fog attach="fog" args={[page.theme.bg, 6, 13]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 4, 5]} intensity={3.6} color="#d8efff" />
      <pointLight position={[-3, 0, 2]} intensity={42} color={page.theme.accent} />
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 96, index === 2 ? 0.038 : 0.018, 8, false]} />
          <meshStandardMaterial color={index === 2 ? page.theme.accent : page.theme.accent2} emissive={index === 2 ? page.theme.accent : page.theme.accent2} emissiveIntensity={index === 2 ? 3 : 1.2} metalness={0.45} roughness={0.28} />
        </mesh>
      ))}
      <group ref={root} position={[-2.5, -0.08, 0.45]} rotation={[0, 0, -0.16]}>
        <mesh scale={[1.25, 0.25, 0.42]}>
          <capsuleGeometry args={[0.35, 1.2, 10, 22]} />
          <meshPhysicalMaterial color="#eef5f7" metalness={0.28} roughness={0.22} clearcoat={1} />
        </mesh>
        <mesh position={[-0.18, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.055, 12, 48]} />
          <meshStandardMaterial color="#0b1117" roughness={0.72} />
        </mesh>
      </group>
    </>
  );
}

const oceanVertex = `
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
`;

const oceanFragment = `
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
`;

function TideScene({ page, active }) {
  const water = useRef(null);
  const sun = useRef(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDeep: { value: new Color("#3f666b") },
    uFoam: { value: new Color("#d9d5c9") }
  }), []);

  useFrame((state, delta) => {
    if (!active) return;
    if (water.current) water.current.uniforms.uTime.value += delta;
    if (sun.current) sun.current.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.22;
  });

  return (
    <>
      <fog attach="fog" args={[page.theme.bg, 5, 12]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[-3, 4, 5]} intensity={2.8} color="#fff3d5" />
      <mesh ref={sun} position={[2.1, 1.3, -2]}>
        <sphereGeometry args={[0.38, 40, 40]} />
        <meshBasicMaterial color={page.theme.accent} />
      </mesh>
      <mesh rotation={[-Math.PI / 2.35, 0, -0.05]} position={[0, -1.2, -0.2]}>
        <planeGeometry args={[13, 8, 112, 72]} />
        <shaderMaterial ref={water} uniforms={uniforms} vertexShader={oceanVertex} fragmentShader={oceanFragment} side={DoubleSide} transparent />
      </mesh>
      <mesh position={[0, -0.15, -2.4]} scale={[6, 0.025, 1]}>
        <boxGeometry />
        <meshBasicMaterial color="#707b76" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

function RedFormScene({ page, active }) {
  const root = useRef(null);
  const ribbons = useDisposable(() => [
    makeRibbonGeometry([new Vector3(-2.8, -1.4, 0), new Vector3(-1.5, 1.2, 0.5), new Vector3(0.2, -0.1, -0.4), new Vector3(2.8, 1.3, 0.2)], 0.44, 2.8),
    makeRibbonGeometry([new Vector3(-2.5, 1.1, -0.6), new Vector3(-0.8, -1.1, 0.2), new Vector3(1.1, 0.7, 0.7), new Vector3(2.4, -1.2, -0.2)], 0.24, -3.6)
  ], []);

  useFrame((state) => {
    if (!active || !root.current) return;
    root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.23;
    root.current.children[1].position.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.18;
  });

  return (
    <>
      <ambientLight intensity={0.28} />
      <spotLight position={[-3.5, 5, 4]} intensity={95} angle={0.28} penumbra={0.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} color="#fff6e9" />
      <pointLight position={[4, -2, 2]} intensity={38} color={page.theme.accent2} />
      <group ref={root} rotation={[0.12, -0.22, -0.08]}>
        <mesh geometry={ribbons[0]} castShadow>
          <meshStandardMaterial color={page.theme.accent} metalness={0.32} roughness={0.28} side={DoubleSide} />
        </mesh>
        <mesh geometry={ribbons[1]} castShadow>
          <meshStandardMaterial color="#111111" metalness={0.82} roughness={0.2} side={DoubleSide} />
        </mesh>
        <mesh position={[0.6, 0, -0.9]} rotation={[0.2, 0.4, -0.4]} castShadow>
          <boxGeometry args={[0.22, 3.8, 0.22]} />
          <meshStandardMaterial color={page.theme.accent2} metalness={0.2} roughness={0.45} />
        </mesh>
      </group>
      <mesh position={[0, -2.25, -0.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial transparent opacity={0.24} />
      </mesh>
    </>
  );
}

const earthVertex = `
  varying vec3 vNormalObject;
  varying vec3 vNormalView;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vNormalObject = normalize(normal);
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragment = `
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
`;

const atmosphereVertex = `
  varying float vIntensity;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 normalView = normalize(normalMatrix * normal);
    vec3 viewDirection = normalize(-viewPosition.xyz);
    vIntensity = pow(1.0 - max(dot(normalView, viewDirection), 0.0), 2.8);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const atmosphereFragment = `
  uniform vec3 uGlow;
  varying float vIntensity;
  void main() {
    gl_FragColor = vec4(uGlow, vIntensity * 0.62);
  }
`;

function OrbitalScene({ page, active }) {
  const system = useRef(null);
  const satellite = useRef(null);
  const earthMaterial = useRef(null);
  const earthUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const atmosphereUniforms = useMemo(() => ({ uGlow: { value: new Color(page.theme.accent2) } }), [page.theme.accent2]);
  const stars = useMemo(() => makePointCloud(420, (index, count) => {
    const phi = Math.acos(1 - 2 * ((index + 0.5) / count));
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const radius = 7 + (index % 9) * 0.14;
    return [Math.cos(theta) * Math.sin(phi) * radius, Math.sin(theta) * Math.sin(phi) * radius, Math.cos(phi) * radius];
  }), []);

  useFrame((state, delta) => {
    if (!active) return;
    if (system.current) system.current.rotation.y += delta * 0.06;
    if (earthMaterial.current) earthMaterial.current.uniforms.uTime.value += delta;
    if (satellite.current) {
      const time = state.clock.elapsedTime * 0.22;
      satellite.current.position.set(Math.cos(time) * 2.55, Math.sin(time * 1.35) * 0.78, Math.sin(time) * 1.1);
      satellite.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 2, 5]} intensity={4.6} color="#dcecff" />
      <pointLight position={[-4, -2, 1]} intensity={46} color={page.theme.accent2} />
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
        <pointsMaterial color="#c9e8ff" size={0.025} sizeAttenuation transparent opacity={0.74} />
      </points>
      <group ref={system} rotation={[0.18, -0.45, -0.08]}>
        <mesh>
          <sphereGeometry args={[1.32, 64, 64]} />
          <shaderMaterial ref={earthMaterial} uniforms={earthUniforms} vertexShader={earthVertex} fragmentShader={earthFragment} />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[1.32, 64, 64]} />
          <shaderMaterial uniforms={atmosphereUniforms} vertexShader={atmosphereVertex} fragmentShader={atmosphereFragment} transparent depthWrite={false} blending={AdditiveBlending} side={BackSide} />
        </mesh>
        {[1.72, 2.15, 2.64].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2 + index * 0.22, index * 0.52, index * 0.18]}>
            <torusGeometry args={[radius, 0.011 + index * 0.004, 8, 120]} />
            <meshBasicMaterial color={index === 1 ? page.theme.accent : page.theme.accent2} transparent opacity={0.54} />
          </mesh>
        ))}
      </group>
      <group ref={satellite} position={[2.5, 0, 0.4]}>
        <mesh><boxGeometry args={[0.44, 0.3, 0.28]} /><meshStandardMaterial color="#ccd6da" metalness={0.9} roughness={0.24} /></mesh>
        <mesh position={[-0.54, 0, 0]}><boxGeometry args={[0.72, 0.04, 0.42]} /><meshStandardMaterial color="#164d78" metalness={0.35} roughness={0.34} /></mesh>
        <mesh position={[0.54, 0, 0]}><boxGeometry args={[0.72, 0.04, 0.42]} /><meshStandardMaterial color="#164d78" metalness={0.35} roughness={0.34} /></mesh>
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.06, 0.12, 0.28, 24]} /><meshStandardMaterial color={page.theme.accent} metalness={0.7} roughness={0.25} /></mesh>
      </group>
    </>
  );
}

function CornerScene({ page, active }) {
  const group = useRef(null);
  const bowlProfile = useMemo(() => [
    new Vector2(0.2, -0.42), new Vector2(0.84, -0.34), new Vector2(1.05, 0.04),
    new Vector2(1.12, 0.22), new Vector2(1.02, 0.3), new Vector2(0.78, 0.06), new Vector2(0.2, -0.02)
  ], []);

  useFrame((state) => {
    if (!active || !group.current) return;
    group.current.rotation.y = -0.26 + Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.8} color="#ffe5bd" />
      <spotLight position={[-3, 5, 4]} intensity={72} angle={0.46} penumbra={0.72} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} color="#ffd293" />
      <group ref={group} position={[0, -0.45, 0]} rotation={[0.06, -0.26, 0]}>
        <mesh position={[0, -0.35, 0]} castShadow>
          <latheGeometry args={[bowlProfile, 64]} />
          <meshStandardMaterial color="#c8a268" roughness={0.62} metalness={0.08} />
        </mesh>
        {[[-0.55, 0.18, 0.1], [0.1, 0.34, -0.18], [0.62, 0.1, 0.16], [-0.05, 0.04, 0.42]].map((position, index) => (
          <mesh key={index} position={position} castShadow>
            <sphereGeometry args={[0.42 - index * 0.018, 36, 28]} />
            <meshStandardMaterial color={index % 2 ? "#d66a28" : "#e98732"} roughness={0.76} />
          </mesh>
        ))}
        <mesh position={[1.72, 0.15, -0.32]} rotation={[0.02, -0.12, -0.05]} castShadow>
          <boxGeometry args={[1.15, 1.85, 0.54]} />
          <meshStandardMaterial color="#d8b67b" roughness={0.9} />
        </mesh>
        <mesh position={[1.72, 0.58, 0]} rotation={[-0.2, 0, 0]}>
          <torusGeometry args={[0.22, 0.035, 10, 36, Math.PI]} />
          <meshStandardMaterial color="#76513a" roughness={0.8} />
        </mesh>
      </group>
      <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11, 8]} />
        <meshStandardMaterial color={page.theme.surface} roughness={0.98} />
      </mesh>
    </>
  );
}

function StillScene({ page, active }) {
  const root = useRef(null);
  useFrame((state) => {
    if (!active || !root.current) return;
    const breath = 1 + Math.sin(state.clock.elapsedTime * 0.46) * 0.025;
    root.current.scale.setScalar(breath);
    root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={1.15} color="#fff7ed" />
      <directionalLight position={[3, 5, 4]} intensity={3.4} color="#fffdf6" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-3, 0, 2]} intensity={18} color={page.theme.accent} />
      <group ref={root} position={[0, 0.12, 0]}>
        {[
          [-1.25, -0.42, 0.1, 0.92, "#c6b4df"],
          [0.08, 0.12, -0.12, 1.18, "#f1e6dd"],
          [1.4, -0.55, 0.32, 0.76, "#9cb08e"],
          [-0.35, -1.05, 0.76, 0.48, "#d7cbdc"]
        ].map(([x, y, z, scale, color], index) => (
          <mesh key={index} position={[x, y, z]} scale={[scale * 1.28, scale * 0.7, scale]} rotation={[0.12 * index, -0.3 * index, 0.12]} castShadow>
            <sphereGeometry args={[0.7, 48, 32]} />
            <meshPhysicalMaterial color={color} roughness={0.26 + index * 0.08} transmission={index === 1 ? 0.42 : 0.08} thickness={1.25} clearcoat={0.45} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  );
}

function AtelierScene({ page, active }) {
  const root = useRef(null);
  const fabrics = useDisposable(() => [
    makeRibbonGeometry([new Vector3(-2.5, 1.1, 0), new Vector3(-1.1, -0.9, 0.6), new Vector3(0.5, 0.75, -0.2), new Vector3(2.5, -0.7, 0.1)], 0.62, 2.2),
    makeRibbonGeometry([new Vector3(-1.9, -1.1, -0.5), new Vector3(-0.5, 0.95, 0.2), new Vector3(1.0, -0.45, 0.65), new Vector3(2.2, 0.88, -0.25)], 0.27, -3.2)
  ], []);

  useFrame((state) => {
    if (!active || !root.current) return;
    root.current.rotation.y = 0.25 + Math.sin(state.clock.elapsedTime * 0.24) * 0.18;
    root.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.17) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.16} />
      <spotLight position={[-4, 5, 4]} intensity={88} angle={0.3} penumbra={0.45} color="#fff2df" />
      <pointLight position={[3, -2, 1]} intensity={34} color={page.theme.accent} />
      <group ref={root} rotation={[0, 0.25, -0.08]}>
        <mesh geometry={fabrics[0]}>
          <meshPhysicalMaterial color="#120f0d" roughness={0.32} metalness={0.16} sheen={1} sheenColor={new Color("#d7b17c")} side={DoubleSide} />
        </mesh>
        <mesh geometry={fabrics[1]}>
          <meshPhysicalMaterial color={page.theme.accent} metalness={0.94} roughness={0.14} clearcoat={1} side={DoubleSide} />
        </mesh>
        <mesh position={[0.72, 0.1, 0.85]} rotation={[0.75, 0.2, 0.45]}>
          <torusGeometry args={[0.66, 0.075, 24, 112]} />
          <meshPhysicalMaterial color="#ece4d7" metalness={1} roughness={0.08} iridescence={0.25} />
        </mesh>
      </group>
    </>
  );
}

const portalVertex = `
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
`;

const portalFragment = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vGlow;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
    vec3 color = mix(uColorA, uColorB, vGlow);
    gl_FragColor = vec4(color, alpha * 0.92);
  }
`;

function NeonScene({ page, active }) {
  const material = useRef(null);
  const rings = useRef(null);
  const count = 780;
  const { positions, scales } = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const scaleArray = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      const t = index / count;
      const angle = t * TAU * 8.5;
      const radius = 0.72 + t * 2.7 + Math.sin(index * 1.71) * 0.11;
      positionArray[index * 3] = Math.cos(angle) * radius;
      positionArray[index * 3 + 1] = Math.sin(angle) * radius;
      positionArray[index * 3 + 2] = (t - 0.5) * 3.2;
      scaleArray[index] = 0.55 + ((index * 37) % 100) / 70;
    }
    return { positions: positionArray, scales: scaleArray };
  }, []);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new Color(page.theme.accent) },
    uColorB: { value: new Color(page.theme.accent2) }
  }), [page.theme.accent, page.theme.accent2]);

  useFrame((state, delta) => {
    if (!active) return;
    if (material.current) material.current.uniforms.uTime.value += delta;
    if (rings.current) rings.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 3]} intensity={54} color={page.theme.accent2} />
      <points rotation={[0.08, -0.12, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial ref={material} uniforms={uniforms} vertexShader={portalVertex} fragmentShader={portalFragment} transparent depthWrite={false} blending={AdditiveBlending} />
      </points>
      <group ref={rings} rotation={[0.25, 0.12, 0]}>
        {[1.05, 1.7, 2.35].map((radius, index) => (
          <mesh key={radius} rotation={[index * 0.52, index * 0.31, index * 0.72]}>
            <torusGeometry args={[radius, index === 1 ? 0.035 : 0.018, 12, 120]} />
            <meshStandardMaterial color={index % 2 ? page.theme.accent : page.theme.accent2} emissive={index % 2 ? page.theme.accent : page.theme.accent2} emissiveIntensity={4.5} transparent opacity={0.74} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0, -1.6]}>
        <circleGeometry args={[0.72, 64]} />
        <meshBasicMaterial color="#050313" />
      </mesh>
    </>
  );
}

function makeMountainShape(seed, height) {
  const shape = new Shape();
  shape.moveTo(-5, -2);
  for (let index = 0; index <= 18; index += 1) {
    const x = -5 + (index / 18) * 10;
    const envelope = Math.sin((index / 18) * Math.PI);
    const ridge = Math.sin(index * (0.72 + seed * 0.11) + seed) * 0.22;
    shape.lineTo(x, -1.15 + envelope * height + ridge);
  }
  shape.lineTo(5, -2);
  shape.closePath();
  return shape;
}

function InkScene({ page, active }) {
  const root = useRef(null);
  const mountains = useMemo(() => [
    makeMountainShape(1, 1.5), makeMountainShape(2, 2.05), makeMountainShape(3, 2.7), makeMountainShape(4, 3.3)
  ], []);
  const mist = useMemo(() => makePointCloud(180, (index, count) => {
    const t = index / count;
    return [-4.5 + t * 9, -0.8 + Math.sin(index * 1.9) * 0.36, -(index % 7) * 0.3];
  }), []);

  useFrame((state) => {
    if (!active || !root.current) return;
    root.current.position.x = state.pointer.x * 0.18;
    root.current.rotation.y = state.pointer.x * 0.025;
  });

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#fff5df" />
      <group ref={root} position={[0, -0.15, 0]}>
        {mountains.map((shape, index) => (
          <mesh key={index} position={[0, -index * 0.06, -2.1 + index * 0.72]} scale={[1, 1, 1]}>
            <shapeGeometry args={[shape, 10]} />
            <meshStandardMaterial color={["#b9ad98", "#92846f", "#655949", "#2b251f"][index]} roughness={1} transparent opacity={0.58 + index * 0.1} side={DoubleSide} />
          </mesh>
        ))}
        <points position={[0, 0.15, 0.8]}>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[mist, 3]} /></bufferGeometry>
          <pointsMaterial color="#f8f1e5" size={0.12} transparent opacity={0.38} depthWrite={false} />
        </points>
        <mesh position={[2.8, 1.28, 0.4]}>
          <circleGeometry args={[0.32, 48]} />
          <meshBasicMaterial color={page.theme.accent} transparent opacity={0.9} />
        </mesh>
      </group>
    </>
  );
}

function GridScene({ page, active }) {
  const building = useRef(null);
  useFrame((state) => {
    if (!active || !building.current) return;
    building.current.rotation.y = -0.62 + Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 7, 6]} intensity={3.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <group ref={building} rotation={[-0.08, -0.62, 0]} position={[0, -0.15, 0]}>
        {[-1.35, -0.45, 0.45, 1.35].map((height, index) => (
          <mesh key={height} position={[0, height, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.4, 0.1, 2.5]} />
            <meshStandardMaterial color={index === 2 ? page.theme.accent : "#dadad5"} roughness={0.72} metalness={0.08} />
          </mesh>
        ))}
        {[-1.8, -0.6, 0.6, 1.8].flatMap((x, column) => [-0.85, 0.85].map((z, row) => (
          <mesh key={`${column}-${row}`} position={[x, 0, z]} castShadow>
            <boxGeometry args={[0.09, 3.55, 0.09]} />
            <meshStandardMaterial color="#26282a" metalness={0.54} roughness={0.38} />
          </mesh>
        )))}
        <mesh position={[0.75, 0, 0.05]} castShadow>
          <boxGeometry args={[0.86, 3.5, 0.92]} />
          <meshStandardMaterial color={page.theme.accent2} roughness={0.62} transparent opacity={0.88} />
        </mesh>
        <mesh position={[-0.72, -0.88, 0.15]} rotation={[0, 0, -0.46]} castShadow>
          <boxGeometry args={[0.78, 0.08, 1.25]} />
          <meshStandardMaterial color="#17191a" metalness={0.4} roughness={0.42} />
        </mesh>
      </group>
      <gridHelper args={[12, 24, page.theme.accent2, "#b7b8b5"]} position={[0, -1.82, 0]} />
    </>
  );
}

const scenes = {
  gallery: GalleryScene,
  "velocity-works": VelocityScene,
  "north-tide": TideScene,
  "red-form": RedFormScene,
  "orbital-grid": OrbitalScene,
  "corner-goods": CornerScene,
  "still-day": StillScene,
  "atelier-noir": AtelierScene,
  "neon-rift": NeonScene,
  "shanshui-now": InkScene,
  "grid-01": GridScene
};

function SceneEffects({ page }) {
  if (page.id === "neon-rift") {
    return <EffectComposer multisampling={0}><Bloom intensity={2.4} luminanceThreshold={0.18} mipmapBlur /><Vignette offset={0.18} darkness={0.72} /></EffectComposer>;
  }
  if (page.id === "orbital-grid") {
    return <EffectComposer multisampling={0}><Bloom intensity={0.92} luminanceThreshold={0.48} mipmapBlur /></EffectComposer>;
  }
  if (page.id === "velocity-works") {
    return <EffectComposer multisampling={0}><Bloom intensity={0.72} luminanceThreshold={0.65} mipmapBlur /></EffectComposer>;
  }
  return null;
}

function cameraFor(page) {
  if (page.id === "grid-01") return { position: [7, 6, 8], zoom: 72, near: 0.1, far: 100 };
  if (page.id === "north-tide") return { position: [0, 1.35, 7.8], fov: 44, near: 0.1, far: 100 };
  if (page.id === "corner-goods") return { position: [0, 1.2, 7], fov: 40, near: 0.1, far: 100 };
  if (page.id === "orbital-grid") return { position: [0, 0, 7.4], fov: 42, near: 0.1, far: 100 };
  return { position: [0, 0, 7], fov: 42, near: 0.1, far: 100 };
}

export default function SpatialScene({ page, active }) {
  const Scene = scenes[page.id] || GalleryScene;
  const shadowScenes = ["red-form", "corner-goods", "still-day", "grid-01"];

  return (
    <Canvas
      orthographic={page.id === "grid-01"}
      camera={cameraFor(page)}
      dpr={[1, 1.35]}
      frameloop={active ? "always" : "demand"}
      shadows={shadowScenes.includes(page.id) ? "percentage" : false}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = page.id === "neon-rift" ? 1.08 : 1;
      }}
      fallback={null}
    >
      <StudioEnvironment />
      <Scene page={page} active={active} />
      <SceneEffects page={page} />
    </Canvas>
  );
}
