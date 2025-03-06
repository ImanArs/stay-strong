"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CircularProgressProps {
  wins: number
  losses: number
}

export default function CircularProgress({ wins, losses }: CircularProgressProps) {
  const [winsPercentage, setWinsPercentage] = useState(0)
  const [lossesPercentage, setLossesPercentage] = useState(0)

  useEffect(() => {
    const total = wins + losses
    if (total > 0) {
      setWinsPercentage((wins / total) * 100)
      setLossesPercentage((losses / total) * 100)
    } else {
      setWinsPercentage(0)
      setLossesPercentage(0)
    }
  }, [wins, losses])

  // Calculate the stroke dasharray and dashoffset for the circle
  const radius = 60
  const circumference = 2 * Math.PI * radius

  const winsOffset = circumference - (winsPercentage / 100) * circumference
  const lossesOffset = circumference - (lossesPercentage / 100) * circumference

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#374151" strokeWidth="8" />

        {/* Losses circle (red) */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: lossesOffset }}
          transition={{ duration: 1, delay: 0.5 }}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />

        {/* Wins circle (green) */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="#10b981"
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: winsOffset }}
          transition={{ duration: 1 }}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold">{wins + losses}</div>
        <div className="text-sm text-gray-400">Total Challenges</div>
        <div className="flex mt-1 text-xs">
          <span className="text-green-500 mr-2">{wins} W</span>
          <span className="text-red-500">{losses} L</span>
        </div>
      </div>
    </div>
  )
}

