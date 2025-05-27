"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, PerspectiveCamera, Environment } from "@react-three/drei";
import type * as THREE from "three";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll";

function AnimatedSphere({ position, color, size = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.4}
          envMapIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function AnimatedText() {
  const textRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 0.2;
    }
  });

  return (
    <group ref={textRef} position={[0, 0.2, 0]}>
      <Text
        font="/fonts/Geist_Bold.json"
        position={[0, 0, 0]}
        fontSize={0.8}
        color="#1e40af"
        anchorX="center"
        anchorY="middle"
      >
        Shubham Mehta
      </Text>
      <Text
        font="/fonts/Geist_Regular.json"
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Blockchain Developer & Full Stack Engineer
      </Text>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} intensity={0.3} castShadow />

      <AnimatedText />
      <AnimatedSphere position={[-2.5, 0.5, -2]} color="#3b82f6" size={0.6} />
      <AnimatedSphere position={[2.5, -0.5, -1]} color="#6366f1" size={0.4} />
      <AnimatedSphere position={[0, -2, -3]} color="#8b5cf6" size={0.7} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text drop-shadow-sm">
            Hey! It's me, Shubham Mehta
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 text-gray-600">
            🚀 Blockchain Innovator | Full-Stack Developer | Tech Explorer
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <ScrollLink to="work" smooth={true} duration={500}>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                View Projects
              </Button>
            </ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={500}>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Contact Me
              </Button>
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
