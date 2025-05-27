"use client"

import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface SocialIconProps {
  icon: ReactNode
  href: string
  label: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function SocialIcon({ icon, href, label, className = "", onClick }: SocialIconProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link
        href={href}
        aria-label={label}
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-cyan-900/30 shadow-md hover:shadow-lg border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 ${className}`}
        onClick={onClick}
        style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)" }}
      >
        <span>{icon}</span>
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  )
}
