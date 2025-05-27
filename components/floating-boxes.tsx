"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

export default function FloatingBoxes() {
  const boxesRef = useRef<THREE.Group>(null)

  // Create an array of box configurations
  const boxes = Array.from({ length: 20 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15] as [
      number,
      number,
      number,
    ],
    rotation: [Math.random(), Math.random(), Math.random()],
    scale: Math.random() * 0.5 + 0.1,
    color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5), // Purple to pink range
  }))

  useFrame(({ clock }) => {
    if (boxesRef.current) {
      boxesRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={boxesRef}>
      {boxes.map((box, index) => (
        <Float
          key={index}
          speed={1 + Math.random() * 2} // Random speed between 1-3
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={box.position}
        >
          <mesh rotation={[box.rotation[0], box.rotation[1], box.rotation[2]]}>
            <boxGeometry args={[box.scale, box.scale, box.scale]} />
            <meshStandardMaterial
              color={box.color}
              metalness={0.5}
              roughness={0.2}
              emissive={box.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
