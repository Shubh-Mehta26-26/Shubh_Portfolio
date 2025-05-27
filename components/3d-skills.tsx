"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

const skills = [
  { name: "React", color: "#61dafb", position: [0, 0, 0] },
  { name: "TypeScript", color: "#3178c6", position: [-2, 1, -1] },
  { name: "Solidity", color: "#363636", position: [2, -1, -2] },
  { name: "Next.js", color: "#ffffff", position: [1, 2, -1] },
  { name: "Web3", color: "#ff6b81", position: [-1, -2, -2] },
  { name: "Node.js", color: "#68a063", position: [2, 0, -3] },
  { name: "Blockchain", color: "#8b5cf6", position: [-2, -1, -3] },
  { name: "Rust", color: "#f74c00", position: [0, -3, -2] },
  { name: "Go", color: "#00add8", position: [3, 1, -2] },
]

function SkillNode({ name, color, position }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
    if (textRef.current) {
      // Make text always face the camera
      textRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>
        <group ref={textRef} position={[0, 0.8, 0]}>
          <Text font="/fonts/Geist_Bold.json" fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
            {name}
          </Text>
        </group>
      </group>
    </Float>
  )
}

function SkillsScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillNode key={index} name={skill.name} color={skill.color} position={skill.position} />
      ))}
    </group>
  )
}

export default function Skills3D() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <SkillsScene />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
