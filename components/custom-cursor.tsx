"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set mounted state to true when component mounts
    setIsMounted(true)

    // Only add event listeners on the client side
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseOver = (e: MouseEvent) => {
        if (
          e.target instanceof HTMLElement &&
          (e.target.tagName === "A" ||
            e.target.tagName === "BUTTON" ||
            e.target.closest("a") ||
            e.target.closest("button"))
        ) {
          setIsHovering(true)
        } else {
          setIsHovering(false)
        }
      }

      window.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseover", handleMouseOver)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseover", handleMouseOver)
      }
    }
  }, [])

  // Don't render anything during SSR or if not mounted
  if (!isMounted || typeof window === "undefined") {
    return null
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mix-blend-difference pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-300/30 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  )
}
