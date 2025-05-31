"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react"

interface StockAnimationsProps {
  isPlaying: boolean
}

export function StockAnimations({ isPlaying }: StockAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [stockPrice, setStockPrice] = useState(150.25)
  const [chartData, setChartData] = useState([50, 60, 45, 70, 65, 80, 75])

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 5)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setStockPrice((prev) => prev + (Math.random() - 0.5) * 5)
      setChartData((prev) => [...prev.slice(1), Math.random() * 100])
    }, 500)

    return () => clearInterval(interval)
  }, [isPlaying])

  const demos = [
    // Stock Price Ticker
    <Card key="ticker" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          AAPL
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          key={stockPrice}
          initial={{ scale: 1.1, color: "#10b981" }}
          animate={{ scale: 1, color: "#1f2937" }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold"
        >
          ${stockPrice.toFixed(2)}
        </motion.div>
        <motion.div
          className="flex items-center gap-1 mt-2"
          animate={{
            color: stockPrice > 150 ? "#10b981" : "#ef4444",
          }}
        >
          {stockPrice > 150 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm">
            {stockPrice > 150 ? "+" : ""}
            {(((stockPrice - 150) / 150) * 100).toFixed(2)}%
          </span>
        </motion.div>
      </CardContent>
    </Card>,

    // Animated Chart
    <Card key="chart" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Market Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 flex items-end justify-between gap-2">
          {chartData.map((value, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ width: "12%" }}
            />
          ))}
        </div>
      </CardContent>
    </Card>,

    // Trading Interface
    <Card key="trading" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quick Trade</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white p-4 rounded-lg font-semibold"
          >
            BUY
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white p-4 rounded-lg font-semibold"
          >
            SELL
          </motion.button>
        </div>
        <motion.div
          animate={
            isPlaying
              ? {
                  backgroundColor: ["#f3f4f6", "#dbeafe", "#f3f4f6"],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="p-4 rounded-lg border"
        >
          <p className="text-sm text-slate-600">Market Status</p>
          <p className="font-semibold text-green-600">OPEN</p>
        </motion.div>
      </CardContent>
    </Card>,

    // Portfolio Value
    <Card key="portfolio" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-green-600 mb-2">$24,567.89</div>
          <motion.div
            animate={isPlaying ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex items-center justify-center gap-1 text-green-600"
          >
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% today</span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>,

    // Market Heatmap
    <Card key="heatmap" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }, (_, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded flex items-center justify-center text-white text-xs font-semibold"
              animate={
                isPlaying
                  ? {
                      backgroundColor: ["#ef4444", "#10b981", "#ef4444", "#10b981"],
                    }
                  : { backgroundColor: "#6b7280" }
              }
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
            >
              {Math.random() > 0.5 ? "+" : "-"}
              {(Math.random() * 10).toFixed(1)}%
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,
  ]

  return (
    <div className="flex items-center justify-center h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDemo}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {demos[currentDemo]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
