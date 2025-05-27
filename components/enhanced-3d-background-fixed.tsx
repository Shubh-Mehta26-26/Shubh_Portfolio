"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function FloatingSpheres() {
  const group = useRef<THREE.Group>(null)

  // Create spheres with different sizes and positions
  const spheres = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 5 - 5] as [
      number,
      number,
      number,
    ],
    size: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.2 + 0.1,
    rotationSpeed: Math.random() * 0.02 + 0.01,
    color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.55, 0.8, 0.6), // Blue to indigo range
  }))

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
  })

  return (
    <group ref={group}>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={sphere.speed} rotationIntensity={0.5} floatIntensity={0.5} position={sphere.position}>
          <Sphere args={[sphere.size, 32, 32]}>
            <meshStandardMaterial
              color={sphere.color}
              roughness={0.1}
              metalness={0.8}
              envMapIntensity={1}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function GradientBackground() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color="#f0f4ff" transparent opacity={0.8} />
    </mesh>
  )
}

export default function Enhanced3DBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render during SSR
  if (!isMounted || typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        <FloatingSpheres />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
