"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, TrendingUp, Activity } from "lucide-react"

interface DataAnimationsProps {
  isPlaying: boolean
}

export function DataAnimations({ isPlaying }: DataAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [stats, setStats] = useState({
    users: 1250,
    sales: 89,
    revenue: 45678,
    growth: 23.5,
  })

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 10),
        sales: Math.max(0, prev.sales + Math.floor(Math.random() * 20 - 10)),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        growth: Math.max(0, prev.growth + (Math.random() - 0.5) * 2),
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const demos = [
    // Animated Statistics
    <div key="stats" className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
      {[
        { icon: Users, label: "Active Users", value: stats.users, color: "blue" },
        { icon: ShoppingCart, label: "Sales Today", value: stats.sales, color: "green" },
        { icon: TrendingUp, label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, color: "purple" },
        { icon: Activity, label: "Growth Rate", value: `${stats.growth.toFixed(1)}%`, color: "orange" },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <motion.p
                    key={stat.value}
                    initial={{ scale: 1.2, color: `var(--${stat.color}-500)` }}
                    animate={{ scale: 1, color: "inherit" }}
                    className="text-2xl font-bold"
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>,

    // Progress Rings
    <div key="rings" className="flex items-center justify-center space-x-8">
      {[
        { label: "CPU", value: 65, color: "#3b82f6" },
        { label: "Memory", value: 78, color: "#10b981" },
        { label: "Storage", value: 45, color: "#f59e0b" },
      ].map((metric, index) => (
        <div key={metric.label} className="text-center">
          <div className="relative w-24 h-24 mb-2">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke={metric.color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 251.2" }}
                animate={
                  isPlaying
                    ? {
                        strokeDasharray: `${metric.value * 2.512} 251.2`,
                      }
                    : {}
                }
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{metric.value}%</span>
            </div>
          </div>
          <p className="text-sm text-slate-600">{metric.label}</p>
        </div>
      ))}
    </div>,

    // Animated Bar Chart
    <Card key="barchart" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { month: "Jan", value: 85 },
            { month: "Feb", value: 92 },
            { month: "Mar", value: 78 },
            { month: "Apr", value: 96 },
            { month: "May", value: 88 },
          ].map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm text-slate-600">{data.month}</div>
              <div className="flex-1">
                <motion.div
                  className="bg-blue-500 h-6 rounded"
                  initial={{ width: 0 }}
                  animate={isPlaying ? { width: `${data.value}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="w-12 text-sm text-slate-600">{data.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Real-time Activity Feed
    <Card key="activity" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Live Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { user: "John D.", action: "made a purchase", time: "2s ago" },
            { user: "Sarah M.", action: "signed up", time: "5s ago" },
            { user: "Mike R.", action: "left a review", time: "12s ago" },
            { user: "Emma L.", action: "shared content", time: "18s ago" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
              <motion.div
                animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {demos[currentDemo]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
