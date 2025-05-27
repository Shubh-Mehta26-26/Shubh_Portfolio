"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // Set mounted state to true when component mounts
    setIsMounted(true)

    // Only add event listeners on the client side
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        // Hide the scroll indicator when user has scrolled a bit
        if (window.scrollY > window.innerHeight / 2) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Don't render anything during SSR or if not mounted
  if (!isMounted || typeof window === "undefined") {
    return null
  }

  return (
    <>
      {/* Progress bar at the top of the page */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Scroll down indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-gray-600 text-sm mb-2">Scroll Down</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-1"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <motion.div
            className="w-1 h-2 bg-blue-500 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
