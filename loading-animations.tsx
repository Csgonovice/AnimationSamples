"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Download, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface LoadingAnimationsProps {
  isPlaying: boolean
}

export function LoadingAnimations({ isPlaying }: LoadingAnimationsProps) {
  const [progress, setProgress] = useState(0)
  const [currentDemo, setCurrentDemo] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => {
            setCurrentDemo((prev) => (prev + 1) % 6)
            setProgress(0)
          }, 1000)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, currentDemo])

  const demos = [
    // Spinning Loader
    <div key="spinner" className="flex flex-col items-center justify-center h-full space-y-4">
      <motion.div
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-blue-500" />
      </motion.div>
      <p className="text-slate-600">Loading your data...</p>
    </div>,

    // Progress Bar
    <div key="progress" className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between text-sm">
          <span>Downloading files...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={progress === 100 ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <CheckCircle className="w-8 h-8 text-green-500" />
      </motion.div>
    </div>,

    // Skeleton Loader
    <div key="skeleton" className="space-y-4 w-full max-w-md mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <motion.div
            className="w-12 h-12 bg-slate-200 rounded-full"
            animate={
              isPlaying
                ? {
                    backgroundColor: ["#e2e8f0", "#cbd5e1", "#e2e8f0"],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
          />
          <div className="space-y-2 flex-1">
            <motion.div
              className="h-4 bg-slate-200 rounded"
              animate={
                isPlaying
                  ? {
                      backgroundColor: ["#e2e8f0", "#cbd5e1", "#e2e8f0"],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
            <motion.div
              className="h-4 bg-slate-200 rounded w-3/4"
              animate={
                isPlaying
                  ? {
                      backgroundColor: ["#e2e8f0", "#cbd5e1", "#e2e8f0"],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 + 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>,

    // Pulse Loader
    <div key="pulse" className="flex items-center justify-center h-full space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 bg-blue-500 rounded-full"
          animate={
            isPlaying
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>,

    // Wave Loader
    <div key="wave" className="flex items-center justify-center h-full space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 bg-blue-500 rounded-full"
          animate={
            isPlaying
              ? {
                  height: [20, 40, 20],
                }
              : { height: 20 }
          }
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>,

    // Download Progress
    <div key="download" className="flex flex-col items-center justify-center h-full space-y-4">
      <motion.div
        animate={isPlaying ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Download className="w-12 h-12 text-green-500" />
      </motion.div>
      <div className="text-center">
        <p className="text-slate-600">Downloading...</p>
        <p className="text-sm text-slate-400">{Math.round(progress * 2.5)} MB / 250 MB</p>
      </div>
      <div className="w-64 bg-slate-200 rounded-full h-2">
        <motion.div
          className="bg-green-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>,
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {demos[currentDemo]}
      </motion.div>
    </AnimatePresence>
  )
}
