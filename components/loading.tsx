"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  // Neural network nodes for the loading animation
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 1,
  }))

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Neural network background animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Add some connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.slice(0, 10).map((node, i) => (
            <motion.line
              key={i}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nodes[(i + 5) % nodes.length].x}%`}
              y2={`${nodes[(i + 5) % nodes.length].y}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          ))}
        </svg>
      </div>

      {/* Brain icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M9.5 2C8.89 2 8.31 2.24 7.88 2.69C7.12 3.5 7.25 4.69 8.16 5.34C8.38 5.5 8.5 5.76 8.5 6.03V7.25C8.5 7.66 8.16 8 7.75 8C7.34 8 7 7.66 7 7.25V6.92C6.46 6.85 5.96 6.65 5.53 6.34C4.5 5.62 4 4.38 4 3.09C4 1.94 4.47 0.91 5.28 0.19C5.69 -0.16 6.32 -0.0300001 6.5 0.5C6.66 0.97 6.41 1.47 5.97 1.69C5.52 1.91 5.25 2.47 5.25 3.09C5.25 3.97 5.56 4.67 6.13 5.06C6.5 5.31 6.91 5.44 7.31 5.44C7.44 5.44 7.56 5.42 7.69 5.41C8.47 5.31 9.25 5.06 9.88 4.66C10.19 4.47 10.56 4.47 10.88 4.66C11.5 5.06 12.28 5.31 13.06 5.41C13.19 5.42 13.31 5.44 13.44 5.44C13.84 5.44 14.25 5.31 14.62 5.06C15.19 4.67 15.5 3.97 15.5 3.09C15.5 2.47 15.23 1.91 14.78 1.69C14.34 1.47 14.09 0.97 14.25 0.5C14.44 -0.0300001 15.06 -0.16 15.47 0.19C16.28 0.91 16.75 1.94 16.75 3.09C16.75 4.38 16.25 5.62 15.22 6.34C14.79 6.65 14.29 6.85 13.75 6.92V7.25C13.75 7.66 13.41 8 13 8C12.59 8 12.25 7.66 12.25 7.25V6.03C12.25 5.76 12.37 5.5 12.59 5.34C13.5 4.69 13.62 3.5 12.87 2.69C12.44 2.24 11.86 2 11.25 2H9.5Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M18.5 8.5C19.88 8.5 21 9.62 21 11C21 11.68 20.72 12.28 20.28 12.72C20.72 13.16 21 13.78 21 14.5C21 15.88 19.88 17 18.5 17H18.25V17.25C18.25 18.77 17.02 20 15.5 20H14.75C14.34 20 14 19.66 14 19.25C14 18.84 14.34 18.5 14.75 18.5H15.5C16.19 18.5 16.75 17.94 16.75 17.25V17H18.5C19.05 17 19.5 16.55 19.5 16C19.5 15.45 19.05 15 18.5 15H17.75C17.34 15 17 14.66 17 14.25C17 13.84 17.34 13.5 17.75 13.5H18.5C19.05 13.5 19.5 13.05 19.5 12.5C19.5 11.95 19.05 11.5 18.5 11.5H17.75C17.34 11.5 17 11.16 17 10.75C17 10.34 17.34 10 17.75 10H18.5Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M5.5 8.5H6.25C6.66 8.5 7 8.84 7 9.25C7 9.66 6.66 10 6.25 10H5.5C4.95 10 4.5 10.45 4.5 11C4.5 11.55 4.95 12 5.5 12H6.25C6.66 12 7 12.34 7 12.75C7 13.16 6.66 13.5 6.25 13.5H5.5C4.12 13.5 3 12.38 3 11C3 9.62 4.12 8.5 5.5 8.5Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M5.5 15H6.25C6.66 15 7 15.34 7 15.75C7 16.16 6.66 16.5 6.25 16.5H5.5C4.95 16.5 4.5 16.95 4.5 17.5C4.5 18.05 4.95 18.5 5.5 18.5H7.25V17.25C7.25 16.56 7.81 16 8.5 16H9.25C9.66 16 10 16.34 10 16.75C10 17.16 9.66 17.5 9.25 17.5H8.5C8.36 17.5 8.25 17.61 8.25 17.75V18.5H9.25C9.66 18.5 10 18.84 10 19.25C10 19.66 9.66 20 9.25 20H8.5C6.98 20 5.75 18.77 5.75 17.25V17.5C5.75 17.5 5.66 17.5 5.5 17.5C4.12 17.5 3 16.38 3 15C3 13.62 4.12 12.5 5.5 12.5H6.25C6.66 12.5 7 12.84 7 13.25C7 13.66 6.66 14 6.25 14H5.5C4.95 14 4.5 14.45 4.5 15C4.5 15.55 4.95 16 5.5 16Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M14.75 9H13.25C12.84 9 12.5 8.66 12.5 8.25C12.5 7.84 12.84 7.5 13.25 7.5H14.75C15.16 7.5 15.5 7.84 15.5 8.25C15.5 8.66 15.16 9 14.75 9Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M10.75 9H9.25C8.84 9 8.5 8.66 8.5 8.25C8.5 7.84 8.84 7.5 9.25 7.5H10.75C11.16 7.5 11.5 7.84 11.5 8.25C11.5 8.66 11.16 9 10.75 9Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M14.75 12H13.25C12.84 12 12.5 11.66 12.5 11.25C12.5 10.84 12.84 10.5 13.25 10.5H14.75C15.16 10.5 15.5 10.84 15.5 11.25C15.5 11.66 15.16 12 14.75 12Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M10.75 12H9.25C8.84 12 8.5 11.66 8.5 11.25C8.5 10.84 8.84 10.5 9.25 10.5H10.75C11.16 10.5 11.5 10.84 11.5 11.25C11.5 11.66 11.16 12 10.75 12Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M14.75 15H13.25C12.84 15 12.5 14.66 12.5 14.25C12.5 13.84 12.84 13.5 13.25 13.5H14.75C15.16 13.5 15.5 13.84 15.5 14.25C15.5 14.66 15.16 15 14.75 15Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M10.75 15H9.25C8.84 15 8.5 14.66 8.5 14.25C8.5 13.84 8.84 13.5 9.25 13.5H10.75C11.16 13.5 11.5 13.84 11.5 14.25C11.5 14.66 11.16 15 10.75 15Z"
            fill="#3B82F6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 3, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Loading text */}
      <motion.h2
        className="text-2xl font-bold text-blue-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Initializing Neural Network
      </motion.h2>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress text */}
      <motion.p
        className="text-blue-300 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {progress.toFixed(0)}% -{" "}
        {progress < 30
          ? "Loading models..."
          : progress < 60
            ? "Training neurons..."
            : progress < 90
              ? "Optimizing synapses..."
              : "Ready to explore!"}
      </motion.p>
    </div>
  )
}
