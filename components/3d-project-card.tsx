"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
}

export default function ProjectCard3D({ title, description, tags, image }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth spring physics for card rotation (reduced intensity)
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 })

  // Glow effect based on mouse position
  const glowX = useTransform(x, [-100, 100], [0, 100])
  const glowY = useTransform(y, [-100, 100], [0, 100])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="p-6 rounded-lg futuristic-card h-full flex flex-col"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? `0 10px 30px -15px rgba(0, 255, 255, 0.3), 
               0 0 15px rgba(0, 255, 255, 0.2)`
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 255, 255, 0.3) 0%, transparent 50%)`,
            opacity: hovered ? 0.5 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Card content with 3D effect */}
        <motion.h3
          className="text-xl font-bold mb-3 text-cyan-100 text-center md:text-left"
          style={{ transform: "translateZ(15px)" }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-cyan-200 mb-4 text-center md:text-left flex-grow"
          style={{ transform: "translateZ(10px)" }}
        >
          {description}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-cyan-900/50 text-cyan-300 border border-cyan-500/30"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 255, 0.2)" }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
