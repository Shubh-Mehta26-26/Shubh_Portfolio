"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

// Futuristic AI-themed background without lines
export default function NeuralNetworkBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [nodes, setNodes] = useState([])
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)

    // Generate nodes only on client-side
    if (typeof window !== "undefined") {
      generateNodes()

      // Regenerate on window resize
      const handleResize = () => {
        generateNodes()
      }

      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [])

  // Set up canvas animation
  useEffect(() => {
    if (!isMounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray = []
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 80)

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(0.6),
      })
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isMounted])

  // Generate neural network nodes
  const generateNodes = () => {
    try {
      // Create nodes
      const nodeCount = Math.min((window.innerWidth * window.innerHeight) / 20000, 50)
      const newNodes = []

      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: getRandomColor(),
          pulseDelay: Math.random() * 3,
          pulseDuration: Math.random() * 2 + 1,
        })
      }

      setNodes(newNodes)
    } catch (error) {
      console.error("Error generating network:", error)
    }
  }

  // Get a random color from the futuristic AI theme palette
  const getRandomColor = (opacity = 1) => {
    const colors = [
      `rgba(0, 255, 255, ${opacity})`, // Neon Cyan
      `rgba(128, 0, 255, ${opacity})`, // Electric Purple
      `rgba(80, 200, 255, ${opacity})`, // Bright Blue
      `rgba(255, 0, 255, ${opacity})`, // Magenta
      `rgba(0, 200, 200, ${opacity})`, // Teal
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Don't render during SSR
  if (!isMounted || typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-gray-900 via-blue-900/40 to-gray-900 overflow-hidden">
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-900/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>

      {/* Digital brain hologram effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 filter blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 filter blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Neural network nodes (glowing orbs) */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: node.color,
            boxShadow: `0 0 15px ${node.color}`,
            marginLeft: `-${node.size / 2}px`,
            marginTop: `-${node.size / 2}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: node.pulseDuration,
            delay: node.pulseDelay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Digital circuit patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOHYxMmgxMlYxOEgzNnptMTIgMTJWNDJINjBWMzBoLTEyem0wIDEySDM2djEyaDEyVjQyem0tMTIgMEgxMnYxMmgxMlY0MnptMC0xMkgxMlYxOGgxMnYxMnoiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')]"></div>
    </div>
  )
}
