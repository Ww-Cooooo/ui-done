import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FrameNode({ position, color, scale = 1 }) {
  const thickness = 0.055 * scale;
  const width = 1.45 * scale;
  const height = 0.92 * scale;
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}><boxGeometry args={[width, thickness, thickness]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, -height / 2, 0]}><boxGeometry args={[width, thickness, thickness]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[width / 2, 0, 0]}><boxGeometry args={[thickness, height, thickness]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[-width / 2, 0, 0]}><boxGeometry args={[thickness, height, thickness]} /><meshStandardMaterial color={color} /></mesh>
    </group>
  );
}

function Connection({ end, color }) {
  const { length, midpoint, quaternion } = useMemo(() => {
    const target = new THREE.Vector3(...end);
    return {
      length: target.length(),
      midpoint: target.clone().multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        target.clone().normalize()
      )
    };
  }, [end]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.012, 0.012, length, 6, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={0.38} />
    </mesh>
  );
}

function SceneObjects({ page, active }) {
  const groupRef = useRef(null);
  const id = page.id;
  const count = id === "motion-foundry" ? 10 : id === "viewport-lab" ? 3 : id === "open-studio" ? 6 : 8;
  const positions = useMemo(() => Array.from({ length: count }, (_, index) => {
    if (id === "brief-machine") {
      const row = index % 4;
      const column = Math.floor(index / 4);
      return [-1.6 + row * 1.05, 0.65 - column * 1.3, (row - 1.5) * 0.16];
    }
    if (id === "viewport-lab") return [[-1.7, 0, 0], [0, 0, 0.25], [1.7, 0, 0]][index];
    if (id === "motion-foundry") return [-2.2 + index * 0.49, Math.sin(index * 0.9) * 0.42, (index - 5) * 0.1];
    if (id === "open-studio") return [0, -1.1 + index * 0.44, (index % 2) * 0.22 - 0.1];
    const angle = (index / count) * Math.PI * 2;
    const radius = id === "source-atlas" ? 1.75 + (index % 2) * 0.45 : 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.66, Math.sin(angle * 2) * 0.35];
  }), [count, id]);

  useFrame((state, delta) => {
    if (!active || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.09;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.07;
  });

  const colorA = page.theme.accent;
  const colorB = page.theme.accent2;

  return (
    <group ref={groupRef}>
      {id === "viewport-lab" ? positions.map((position, index) => (
        <FrameNode key={index} position={position} color={index === 1 ? colorA : colorB} scale={[1.1, 0.82, 0.62][index]} />
      )) : positions.map((position, index) => (
        <mesh key={index} position={position} rotation={[index * 0.08, index * 0.22, index * 0.06]}>
          {id === "source-atlas" ? (
            <icosahedronGeometry args={[index % 3 === 0 ? 0.24 : 0.16, 1]} />
          ) : id === "open-studio" ? (
            <boxGeometry args={[2.15 - index * 0.16, 0.26, 1.22 - index * 0.08]} />
          ) : id === "motion-foundry" ? (
            <boxGeometry args={[0.36, 1.25, 0.18]} />
          ) : id === "brief-machine" ? (
            <boxGeometry args={[0.72, 0.42, 0.24]} />
          ) : (
            <boxGeometry args={[0.42, 1.18, 0.24]} />
          )}
          <meshStandardMaterial
            color={index % 2 ? colorA : colorB}
            roughness={0.42}
            metalness={id === "motion-foundry" ? 0.72 : 0.28}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {id !== "viewport-lab" && id !== "open-studio" && (
        <mesh>
          <octahedronGeometry args={[id === "brief-machine" ? 0.58 : 0.72, 0]} />
          <meshStandardMaterial color={page.theme.ink} roughness={0.22} metalness={0.35} />
        </mesh>
      )}

      {(id === "source-atlas" || id === "signal-room" || id === "gallery") && positions.map((position, index) => (
        <Connection key={`connection-${index}`} end={position} color={index % 2 ? colorA : colorB} />
      ))}
    </group>
  );
}

export default function SpatialScene({ page, active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} color={page.theme.ink} />
      <pointLight position={[-4, -2, 3]} intensity={3} color={page.theme.accent} />
      <SceneObjects page={page} active={active} />
    </Canvas>
  );
}
