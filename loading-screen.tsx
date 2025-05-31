"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface LoadingScreenProps {
  onLoadingComplete: () => void
  duration?: number
}

export function LoadingScreen({ onLoadingComplete, duration = 5000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const newProgress = Math.min(100, (elapsed / duration) * 100)

      setProgress(newProgress)

      if (now < endTime) {
        requestAnimationFrame(updateProgress)
      } else {
        onLoadingComplete()
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {
      // Cleanup if component unmounts
    }
  }, [duration, onLoadingComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{
        opacity: progress === 100 ? 0 : 1,
      }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(135deg, 
          hsl(${240 + progress * 1.2}, 80%, 50%), 
          hsl(${320 + progress * 1.2}, 80%, 50%))`,
      }}
    >
      {/* Audio visualizer bars in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="flex items-end gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-white rounded-full"
              animate={{
                height: [20, Math.random() * 100 + 20, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          className="w-32 h-32 mb-8 relative mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-white opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-white opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.364L7.75736 16.2426M21 12H18M18.364 5.63604L16.2427 7.75736M18.364 18.364L16.2427 16.2426M12 18V21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl font-light text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Animation Showcase
        </motion.h1>

        <motion.p
          className="text-white/70 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Loading professional animations...
        </motion.p>

        <motion.p
          className="text-white/50 text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          🎵 Calm ambient music will start after any interaction
        </motion.p>

        <div className="w-64 relative">
          <Progress value={progress} className="h-1" />
          <motion.div
            className="absolute -bottom-6 text-xs text-white/70 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
