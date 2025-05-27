"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<
    {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      alpha: number
    }[]
  >([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set mounted state to true when component mounts
    setIsMounted(true)

    // Only run canvas code on the client side
    if (typeof window === "undefined" || !canvasRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas to full screen
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
      }
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Initialize canvas context
    contextRef.current = canvas.getContext("2d")
    handleResize()

    // Create particles
    function initParticles() {
      particlesRef.current = []
      // Reduce particle count for better performance
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 80)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // Smaller particles
          color: getRandomColor(),
          speedX: Math.random() * 0.3 - 0.15, // Slower movement
          speedY: Math.random() * 0.3 - 0.15,
          alpha: Math.random() * 0.3 + 0.2, // More transparent
        })
      }
    }

    function getRandomColor() {
      const colors = ["#3b82f6", "#6366f1", "#8b5cf6"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    function animate() {
      if (!contextRef.current || !canvas) return

      // Clear canvas
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        contextRef.current!.beginPath()
        contextRef.current!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        contextRef.current!.fillStyle = particle.color
        contextRef.current!.globalAlpha = particle.alpha
        contextRef.current!.fill()

        // Connect particles within range (reduced connection distance)
        connectParticles(particle, index)

        // React to mouse (reduced interaction distance)
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          contextRef.current!.beginPath()
          contextRef.current!.strokeStyle = particle.color
          contextRef.current!.globalAlpha = 0.1 * (1 - distance / 100)
          contextRef.current!.lineWidth = 0.5
          contextRef.current!.moveTo(particle.x, particle.y)
          contextRef.current!.lineTo(mouseRef.current.x, mouseRef.current.y)
          contextRef.current!.stroke()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    function connectParticles(particle: (typeof particlesRef.current)[0], index: number) {
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const particle2 = particlesRef.current[i]
        const dx = particle.x - particle2.x
        const dy = particle.y - particle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          contextRef.current!.beginPath()
          contextRef.current!.strokeStyle = particle.color
          contextRef.current!.globalAlpha = 0.05 * (1 - distance / 100)
          contextRef.current!.lineWidth = 0.3
          contextRef.current!.moveTo(particle.x, particle.y)
          contextRef.current!.lineTo(particle2.x, particle2.y)
          contextRef.current!.stroke()
        }
      }
    }

    // Start animation
    animate()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isMounted])

  // Don't render during SSR
  if (typeof window === "undefined" || !isMounted) {
    return null
  }

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
