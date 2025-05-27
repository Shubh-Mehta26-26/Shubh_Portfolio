"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, PerspectiveCamera, Environment } from "@react-three/drei";
import type * as THREE from "three";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Briefcase } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

function AnimatedSphere({ position, color, size = 1, textureUrl = null }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Remove the texture loading that's causing the error
  // const texture = useTexture(textureUrl || "/textures/default-sphere.jpg")

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          envMapIntensity={1}
          // Remove the texture map
          // map={texture}
          transparent
          opacity={0.9}
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
        color="#1e3a8a"
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

export default function EnhancedHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Background with gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/80 via-white/60 to-indigo-50/80">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 inline-block p-2 bg-blue-100 rounded-full">
              <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Full Stack Blockchain Developer
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text drop-shadow-sm leading-tight">
              Turning Code Into Digital Experiences
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
              I build innovative blockchain solutions and full-stack
              applications that solve real-world problems.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <ScrollLink to="work" smooth={true} duration={500}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Briefcase size={20} />
                  View Projects
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-8 py-6 h-auto text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Code size={20} />
                  Let's Work Together
                </Button>
              </ScrollLink>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex justify-center"
            >
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                <div className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <ArrowDown className="text-blue-500" size={24} />
                </div>
              </ScrollLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
