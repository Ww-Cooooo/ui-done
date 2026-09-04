import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Path,
  PMREMGenerator,
  Shape,
  Vector2
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const TAU = Math.PI * 2;
const ORBIT_RADIUS = 2.62;

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

const oceanVertex = `
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
`;

const oceanFragment = `
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
`;

function TideScene({ page, active }) {
  const waterMaterial = useRef(null);
  const sun = useRef(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDeep: { value: new Color("#284c54") },
    uMid: { value: new Color("#78999a") },
    uFoam: { value: new Color("#e1dcd0") }
  }), []);

  useFrame((state, delta) => {
    if (!active) return;
    if (waterMaterial.current) waterMaterial.current.uniforms.uTime.value += delta;
    if (sun.current) sun.current.position.x = 2.45 + Math.sin(state.clock.elapsedTime * 0.07) * 0.08;
  });

  return (
    <>
      <fog attach="fog" args={[page.theme.bg, 6.8, 14.5]} />
      <hemisphereLight args={["#f5ead3", "#2a5359", 2.2]} />
      <directionalLight position={[-3, 5, 3]} intensity={2.1} color="#fff3d8" />
      <mesh ref={sun} position={[2.45, 1.55, -4.8]}>
        <sphereGeometry args={[0.26, 40, 40]} />
        <meshBasicMaterial color="#c76f49" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, -2.45]}>
        <planeGeometry args={[14, 13, 124, 104]} />
        <shaderMaterial
          ref={waterMaterial}
          uniforms={uniforms}
          vertexShader={oceanVertex}
          fragmentShader={oceanFragment}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}

function makeRedFormGeometry() {
  const shape = new Shape();
  shape.moveTo(-1.92, -1.08);
  shape.bezierCurveTo(-2.24, -0.18, -1.66, 1.18, -0.62, 1.68);
  shape.bezierCurveTo(0.34, 2.12, 1.52, 1.68, 1.9, 0.74);
  shape.bezierCurveTo(2.18, 0.04, 1.86, -0.72, 1.18, -1.18);
  shape.bezierCurveTo(0.46, -1.68, -0.7, -1.86, -1.52, -1.46);
  shape.bezierCurveTo(-1.72, -1.36, -1.84, -1.22, -1.92, -1.08);

  const opening = new Path();
  opening.moveTo(-0.42, -0.74);
  opening.bezierCurveTo(-0.74, -0.22, -0.54, 0.68, -0.02, 1.0);
  opening.bezierCurveTo(0.4, 1.26, 0.86, 0.78, 0.78, 0.18);
  opening.bezierCurveTo(0.7, -0.42, 0.08, -0.96, -0.42, -0.74);
  shape.holes.push(opening);

  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.7,
    steps: 1,
    curveSegments: 72,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.12,
    bevelThickness: 0.12
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function RedFormScene({ page, active }) {
  const sculpture = useRef(null);
  const geometry = useDisposable(() => makeRedFormGeometry(), []);

  useFrame((state) => {
    if (!active || !sculpture.current) return;
    sculpture.current.rotation.y = -0.48 + Math.sin(state.clock.elapsedTime * 0.24) * 0.2;
    sculpture.current.rotation.x = 0.1 + Math.cos(state.clock.elapsedTime * 0.17) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[-4, 5, 5]}
        intensity={92}
        angle={0.3}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#fff4df"
      />
      <pointLight position={[4, -1, 2]} intensity={28} color={page.theme.accent2} />
      <mesh ref={sculpture} geometry={geometry} position={[1.12, -0.12, 0]} rotation={[0.1, -0.48, -0.12]} scale={0.84} castShadow>
        <meshPhysicalMaterial
          color={page.theme.accent}
          metalness={0.52}
          roughness={0.22}
          clearcoat={0.72}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <mesh position={[0, -2.02, -0.15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 11]} />
        <shadowMaterial transparent opacity={0.2} />
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
    gl_FragColor = vec4(uGlow, vIntensity * 0.58);
  }
`;

function makeChamferedPanelGeometry(width, height) {
  const x = width / 2;
  const y = height / 2;
  const cut = Math.min(width, height) * 0.12;
  const shape = new Shape();
  shape.moveTo(-x + cut, -y);
  shape.lineTo(x - cut, -y);
  shape.lineTo(x, -y + cut);
  shape.lineTo(x, y - cut);
  shape.lineTo(x - cut, y);
  shape.lineTo(-x + cut, y);
  shape.lineTo(-x, y - cut);
  shape.lineTo(-x, -y + cut);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.018,
    bevelThickness: 0.018
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function SolarWing({ geometry, position, color }) {
  const seamX = [-0.38, -0.13, 0.13, 0.38];

  return (
    <group position={position}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color={color} metalness={0.5} roughness={0.22} clearcoat={0.5} />
      </mesh>
      {seamX.map(offset => (
        <mesh key={offset} position={[offset, 0, 0.075]}>
          <planeGeometry args={[0.012, 0.38]} />
          <meshBasicMaterial color="#73b9dc" transparent opacity={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[1.02, 0.012]} />
        <meshBasicMaterial color="#73b9dc" transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

function OrbitalScene({ page, active }) {
  const { size } = useThree();
  const earth = useRef(null);
  const satellite = useRef(null);
  const earthMaterial = useRef(null);
  const compactOrbit = size.width < 520;
  const orbitRadius = compactOrbit ? 1.9 : ORBIT_RADIUS;
  const satelliteScale = compactOrbit ? 0.25 : 0.58;
  const wingGeometry = useDisposable(() => makeChamferedPanelGeometry(1.16, 0.5), []);
  const bodyProfile = useMemo(() => [
    new Vector2(0.16, -0.5),
    new Vector2(0.28, -0.46),
    new Vector2(0.35, -0.28),
    new Vector2(0.36, 0.22),
    new Vector2(0.3, 0.42),
    new Vector2(0.17, 0.5)
  ], []);
  const dishProfile = useMemo(() => [
    new Vector2(0.045, -0.18),
    new Vector2(0.18, -0.15),
    new Vector2(0.34, -0.07),
    new Vector2(0.48, 0.06),
    new Vector2(0.45, 0.11),
    new Vector2(0.31, 0.01),
    new Vector2(0.16, -0.09),
    new Vector2(0.045, -0.12)
  ], []);
  const earthUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const atmosphereUniforms = useMemo(() => ({ uGlow: { value: new Color(page.theme.accent2) } }), [page.theme.accent2]);
  const stars = useMemo(() => makePointCloud(480, (index, count) => {
    const phi = Math.acos(1 - 2 * ((index + 0.5) / count));
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const radius = 7.2 + (index % 11) * 0.15;
    return [Math.cos(theta) * Math.sin(phi) * radius, Math.sin(theta) * Math.sin(phi) * radius, Math.cos(phi) * radius];
  }), []);

  useFrame((state, delta) => {
    if (!active) return;
    const time = state.clock.elapsedTime * 0.16;
    if (earth.current) earth.current.rotation.y += delta * 0.035;
    if (earthMaterial.current) earthMaterial.current.uniforms.uTime.value += delta;
    if (satellite.current) {
      satellite.current.position.set(Math.cos(time) * orbitRadius, Math.sin(time) * orbitRadius, 0);
      satellite.current.rotation.set(0.12, -0.3, time + Math.PI / 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 2, 5]} intensity={3.2} color="#dcecff" />
      <pointLight position={[-4, -2, 1]} intensity={24} color={page.theme.accent2} />
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
        <pointsMaterial color="#c9e8ff" size={0.024} sizeAttenuation transparent opacity={0.72} />
      </points>

      <group ref={earth} rotation={[0.12, -0.38, -0.04]}>
        <mesh>
          <sphereGeometry args={[1.3, 64, 64]} />
          <shaderMaterial ref={earthMaterial} uniforms={earthUniforms} vertexShader={earthVertex} fragmentShader={earthFragment} />
        </mesh>
        <mesh scale={1.082}>
          <sphereGeometry args={[1.3, 64, 64]} />
          <shaderMaterial
            uniforms={atmosphereUniforms}
            vertexShader={atmosphereVertex}
            fragmentShader={atmosphereFragment}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            side={BackSide}
          />
        </mesh>
      </group>

      <group rotation={[0.52, -0.28, 0.08]}>
        <group ref={satellite} position={[orbitRadius, 0, 0]} scale={satelliteScale}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <latheGeometry args={[bodyProfile, 64]} />
            <meshPhysicalMaterial color="#9eabb2" metalness={0.76} roughness={0.25} clearcoat={0.52} />
          </mesh>
          <mesh position={[0, 0, -0.26]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.37, 0.37, 0.055, 48]} />
            <meshPhysicalMaterial color="#d59b2f" metalness={0.78} roughness={0.24} clearcoat={0.36} />
          </mesh>
          <mesh position={[0, 0, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.37, 0.37, 0.055, 48]} />
            <meshPhysicalMaterial color="#d59b2f" metalness={0.78} roughness={0.24} clearcoat={0.36} />
          </mesh>
          <SolarWing geometry={wingGeometry} position={[-1.03, 0, 0]} color="#0a4268" />
          <SolarWing geometry={wingGeometry} position={[1.03, 0, 0]} color="#0a4268" />
          <mesh position={[-0.405, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.034, 0.034, 0.13, 20]} />
            <meshStandardMaterial color={page.theme.accent} metalness={0.8} roughness={0.24} />
          </mesh>
          <mesh position={[0.405, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.034, 0.034, 0.13, 20]} />
            <meshStandardMaterial color={page.theme.accent} metalness={0.8} roughness={0.24} />
          </mesh>
          <mesh position={[0, 0, 0.57]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.115, 0.15, 0.16, 32]} />
            <meshStandardMaterial color="#747f85" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.74]} rotation={[Math.PI / 2, 0, 0]}>
            <latheGeometry args={[dishProfile, 64]} />
            <meshPhysicalMaterial color="#bbc5c9" metalness={0.68} roughness={0.24} clearcoat={0.56} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.96]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.25, 16]} />
            <meshStandardMaterial color={page.theme.accent} metalness={0.7} roughness={0.24} />
          </mesh>
          <mesh position={[0, 0, 1.09]}>
            <sphereGeometry args={[0.055, 24, 18]} />
            <meshBasicMaterial color={page.theme.accent} />
          </mesh>
          <mesh position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.13, 0.22, 32, 1, true]} />
            <meshStandardMaterial color="#66737b" metalness={0.76} roughness={0.3} side={DoubleSide} />
          </mesh>
        </group>
      </group>
    </>
  );
}

const tunnelVertex = `
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
`;

const tunnelFragment = `
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
`;

function NeonScene({ page, active }) {
  const material = useRef(null);
  const tunnel = useRef(null);
  const rings = 48;
  const pointsPerRing = 34;
  const count = rings * pointsPerRing;
  const { positions, scales, bands } = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const scaleArray = new Float32Array(count);
    const bandArray = new Float32Array(count);
    for (let ring = 0; ring < rings; ring += 1) {
      const depth = -3.7 + (ring / (rings - 1)) * 7.4;
      for (let point = 0; point < pointsPerRing; point += 1) {
        const index = ring * pointsPerRing + point;
        const band = point % 7 === 0 ? 1 : 0;
        const angle = (point / pointsPerRing) * TAU + ring * 0.115;
        const radius = band
          ? 1.68 + Math.sin(ring * 0.47 + point) * 0.11
          : 0.92 + Math.sin(point * 1.7 + ring * 0.31) * 0.13;
        positionArray[index * 3] = Math.cos(angle) * radius;
        positionArray[index * 3 + 1] = Math.sin(angle) * radius;
        positionArray[index * 3 + 2] = depth;
        scaleArray[index] = band ? 0.72 : 0.95 + ((index * 37) % 100) / 120;
        bandArray[index] = band;
      }
    }
    return { positions: positionArray, scales: scaleArray, bands: bandArray };
  }, [count]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new Color(page.theme.accent) },
    uColorB: { value: new Color(page.theme.accent2) }
  }), [page.theme.accent, page.theme.accent2]);

  useFrame((state, delta) => {
    if (!active) return;
    if (material.current) material.current.uniforms.uTime.value += delta;
    if (tunnel.current) {
      tunnel.current.rotation.x = 0.06 + state.pointer.y * 0.08;
      tunnel.current.rotation.y = -0.08 + state.pointer.x * 0.1;
    }
  });

  return (
    <points ref={tunnel} rotation={[0.06, -0.08, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aBand" args={[bands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={tunnelVertex}
        fragmentShader={tunnelFragment}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function makeFoldedModuleGeometry() {
  const shape = new Shape();
  shape.moveTo(-2.1, -0.14);
  shape.lineTo(0.34, -0.14);
  shape.lineTo(0.34, 0.82);
  shape.quadraticCurveTo(0.34, 0.98, 0.5, 0.98);
  shape.lineTo(0.82, 0.98);
  shape.quadraticCurveTo(0.98, 0.98, 0.98, 0.82);
  shape.lineTo(0.98, 0.17);
  shape.lineTo(2.1, 0.17);
  shape.lineTo(2.1, 0.34);
  shape.lineTo(0.78, 0.34);
  shape.lineTo(0.78, 0.76);
  shape.lineTo(0.54, 0.76);
  shape.lineTo(0.54, 0.13);
  shape.lineTo(-2.1, 0.13);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth: 1.86,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    curveSegments: 18
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function GridScene({ page, active }) {
  const building = useRef(null);
  const moduleGeometry = useDisposable(() => makeFoldedModuleGeometry(), []);
  const modules = [
    { position: [-0.58, -1.62, 0.34], rotation: [0, 0.1, 0], color: "#c9cbc9" },
    { position: [0.42, 0, -0.28], rotation: [0, Math.PI + 0.04, 0], color: page.theme.accent },
    { position: [-0.2, 1.62, 0.16], rotation: [0, -0.08, 0], color: "#e4e5e1" }
  ];

  useFrame((state) => {
    if (!active || !building.current) return;
    building.current.rotation.y = -0.56 + Math.sin(state.clock.elapsedTime * 0.19) * 0.055;
    building.current.rotation.x = -0.09 + Math.cos(state.clock.elapsedTime * 0.14) * 0.018;
  });

  return (
    <>
      <ambientLight intensity={0.48} />
      <directionalLight position={[4, 7, 6]} intensity={2.9} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-4, 1, 3]} intensity={10} color={page.theme.accent2} />
      <group ref={building} rotation={[-0.09, -0.56, 0]} position={[0, 0.05, 0]}>
        {modules.map((module, index) => (
          <mesh
            key={index}
            geometry={moduleGeometry}
            position={module.position}
            rotation={module.rotation}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial color={module.color} metalness={index === 1 ? 0.18 : 0.06} roughness={0.62} clearcoat={0.18} />
          </mesh>
        ))}
      </group>
      <gridHelper args={[12, 24, page.theme.accent2, "#b7b8b5"]} position={[0, -2.34, 0]} />
    </>
  );
}

const scenes = {
  "north-tide": TideScene,
  "red-form": RedFormScene,
  "orbital-grid": OrbitalScene,
  "neon-rift": NeonScene,
  "grid-01": GridScene
};

function SceneEffects({ page }) {
  if (page.id === "neon-rift") {
    return <EffectComposer multisampling={0}><Bloom intensity={2.2} luminanceThreshold={0.16} mipmapBlur /><Vignette offset={0.16} darkness={0.68} /></EffectComposer>;
  }
  if (page.id === "orbital-grid") {
    return <EffectComposer multisampling={0}><Bloom intensity={0.46} luminanceThreshold={0.78} mipmapBlur /></EffectComposer>;
  }
  return null;
}

function cameraFor(page) {
  if (page.id === "grid-01") return { position: [7, 5.5, 8.5], zoom: 104, near: 0.1, far: 100 };
  if (page.id === "north-tide") return { position: [0, 1.22, 7.6], fov: 45, near: 0.1, far: 100 };
  if (page.id === "orbital-grid") return { position: [0, 0, 9.2], fov: 42, near: 0.1, far: 100 };
  if (page.id === "neon-rift") return { position: [0, 0, 7], fov: 44, near: 0.1, far: 100 };
  return { position: [0, 0.05, 7.2], fov: 42, near: 0.1, far: 100 };
}

export default function SpatialScene({ page, active }) {
  const Scene = scenes[page.id];
  if (!Scene) return null;
  const shadowScenes = ["red-form", "grid-01"];

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
        gl.toneMappingExposure = page.id === "neon-rift" ? 1.06 : 1;
      }}
      fallback={null}
    >
      <StudioEnvironment />
      <Scene page={page} active={active} />
      <SceneEffects page={page} />
    </Canvas>
  );
}
