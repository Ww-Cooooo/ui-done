import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Shape({ type, index }) {
  if (type === "tide") return <torusGeometry args={[0.62 + index * 0.08, 0.045, 12, 48]} />;
  if (type === "orbit") return index === 0 ? <sphereGeometry args={[0.78, 24, 24]} /> : <torusGeometry args={[0.95 + index * 0.14, 0.025, 8, 64]} />;
  if (type === "form") return index % 2 ? <tetrahedronGeometry args={[0.58, 0]} /> : <octahedronGeometry args={[0.58, 0]} />;
  if (type === "stack") return <boxGeometry args={[1.8 - index * 0.12, 0.24, 1.1 - index * 0.08]} />;
  if (type === "pebble") return <sphereGeometry args={[0.55 + (index % 2) * 0.16, 24, 18]} />;
  if (type === "ribbon") return <torusKnotGeometry args={[0.54, 0.1, 88, 12, 2, 3]} />;
  if (type === "rift") return <octahedronGeometry args={[0.68 - index * 0.035, 0]} />;
  if (type === "fold") return <dodecahedronGeometry args={[0.58, 0]} />;
  if (type === "grid") return <boxGeometry args={[0.82, 0.82, 0.18]} />;
  if (type === "velocity") return <torusKnotGeometry args={[0.5, 0.09, 72, 10, 2, 5]} />;
  return index % 3 === 0 ? <icosahedronGeometry args={[0.5, 1]} /> : <boxGeometry args={[0.62, 0.62, 0.62]} />;
}

function MaterialObjects({ page, active }) {
  const root = useRef(null);
  const type = page.shape;
  const count = type === "orbit" ? 5 : type === "stack" ? 6 : 7;
  const positions = useMemo(() => Array.from({ length: count }, (_, index) => {
    if (type === "stack") return [0, -1 + index * 0.38, (index % 2) * 0.12];
    if (type === "grid") return [-1.45 + (index % 3) * 1.45, 0.75 - Math.floor(index / 3) * 1.25, (index % 2) * 0.18];
    if (type === "orbit") return [0, 0, index * 0.045];
    if (type === "velocity") return [-1.8 + index * 0.58, Math.sin(index * 1.3) * 0.44, (index - 3) * 0.12];
    if (type === "tide") return [0, 0, (index - 3) * 0.18];
    const angle = (index / count) * Math.PI * 2;
    const radius = type === "pebble" ? 1.45 : 1.7;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.64, Math.sin(angle * 2) * 0.28];
  }), [count, type]);

  useFrame((state, delta) => {
    if (!active || !root.current) return;
    const speed = type === "velocity" || type === "rift" ? 0.2 : 0.08;
    root.current.rotation.y += delta * speed;
    root.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={root} rotation={[0.08, 0.12, type === "velocity" ? -0.2 : 0]}>
      {positions.map((position, index) => (
        <mesh
          key={index}
          position={position}
          rotation={[index * 0.17, index * 0.31, index * 0.11]}
          scale={type === "pebble" ? [1.25, 0.7, 0.88] : 1}
        >
          <Shape type={type} index={index} />
          <meshStandardMaterial
            color={index % 2 ? page.theme.accent : page.theme.accent2}
            roughness={type === "pebble" || type === "fold" ? 0.78 : 0.3}
            metalness={type === "orbit" || type === "ribbon" || type === "velocity" ? 0.72 : 0.24}
            transparent
            opacity={type === "tide" ? 0.64 : 0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SpatialScene({ page, active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color={page.theme.ink} />
      <pointLight position={[-4, -2, 3]} intensity={3.2} color={page.theme.accent} />
      <MaterialObjects page={page} active={active} />
    </Canvas>
  );
}
