"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle } from "lucide-react"

interface DashboardAnimationsProps {
  isPlaying: boolean
}

export function DashboardAnimations({ isPlaying }: DashboardAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [metrics, setMetrics] = useState({
    revenue: 45678,
    users: 1234,
    orders: 89,
    growth: 12.5,
  })

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 9)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        users: prev.users + Math.floor(Math.random() * 10),
        orders: prev.orders + Math.floor(Math.random() * 5),
        growth: Math.max(0, prev.growth + (Math.random() - 0.5) * 2),
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const demos = [
    // KPI Cards
    <div key="kpi-cards" className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
      {[
        { title: "Revenue", value: `$${metrics.revenue.toLocaleString()}`, icon: DollarSign, color: "green" },
        { title: "Users", value: metrics.users.toLocaleString(), icon: Users, color: "blue" },
        { title: "Orders", value: metrics.orders, icon: Activity, color: "purple" },
        { title: "Growth", value: `${metrics.growth.toFixed(1)}%`, icon: TrendingUp, color: "orange" },
      ].map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{kpi.title}</p>
                  <motion.p
                    key={kpi.value}
                    initial={{ scale: 1.1, color: `var(--${kpi.color}-500)` }}
                    animate={{ scale: 1, color: "inherit" }}
                    className="text-xl font-bold"
                  >
                    {kpi.value}
                  </motion.p>
                </div>
                <kpi.icon className={`w-6 h-6 text-${kpi.color}-500`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>,

    // Real-time Chart
    <Card key="realtime-chart" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Real-time Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-end justify-between gap-1">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="bg-blue-500 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.05, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              style={{ width: "4%" }}
            />
          ))}
        </div>
      </CardContent>
    </Card>,

    // Alert System
    <div key="alert-system" className="w-full max-w-md mx-auto space-y-3">
      {[
        { type: "warning", message: "High CPU usage detected", color: "yellow" },
        { type: "error", message: "Database connection failed", color: "red" },
        { type: "info", message: "System update available", color: "blue" },
      ].map((alert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3 }}
          className={`p-3 rounded-lg border-l-4 bg-${alert.color}-50 border-${alert.color}-500`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className={`w-4 h-4 text-${alert.color}-600`} />
            <span className="text-sm font-medium">{alert.message}</span>
          </div>
        </motion.div>
      ))}
    </div>,

    // Progress Rings
    <div key="progress-rings" className="flex justify-center space-x-8">
      {[
        { label: "CPU", value: 65, color: "#3b82f6" },
        { label: "Memory", value: 78, color: "#10b981" },
        { label: "Storage", value: 45, color: "#f59e0b" },
      ].map((metric, index) => (
        <div key={metric.label} className="text-center">
          <div className="relative w-20 h-20 mb-2">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="none" />
              <motion.circle
                cx="40"
                cy="40"
                r="32"
                stroke={metric.color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 201.06" }}
                animate={
                  isPlaying
                    ? {
                        strokeDasharray: `${metric.value * 2.0106} 201.06`,
                      }
                    : {}
                }
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{metric.value}%</span>
            </div>
          </div>
          <p className="text-xs text-slate-600">{metric.label}</p>
        </div>
      ))}
    </div>,

    // Activity Feed
    <Card key="activity-feed" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { user: "John D.", action: "created a new project", time: "2m ago" },
            { user: "Sarah M.", action: "updated user settings", time: "5m ago" },
            { user: "Mike R.", action: "deleted 3 files", time: "12m ago" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50"
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
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Status Grid
    <div key="status-grid" className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {[
        { service: "API", status: "online", uptime: "99.9%" },
        { service: "Database", status: "online", uptime: "99.8%" },
        { service: "CDN", status: "warning", uptime: "98.5%" },
        { service: "Cache", status: "offline", uptime: "0%" },
      ].map((service, index) => (
        <motion.div
          key={service.service}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <motion.div
                  animate={
                    service.status === "online"
                      ? { scale: [1, 1.2, 1] }
                      : service.status === "warning"
                        ? { backgroundColor: ["#f59e0b", "#fbbf24", "#f59e0b"] }
                        : {}
                  }
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className={`w-3 h-3 rounded-full ${
                    service.status === "online"
                      ? "bg-green-500"
                      : service.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
              </div>
              <p className="font-semibold text-sm">{service.service}</p>
              <p className="text-xs text-slate-600">{service.uptime}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>,

    // Revenue Chart
    <Card key="revenue-chart" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { month: "Jan", amount: 45000, growth: 12 },
            { month: "Feb", amount: 52000, growth: 15 },
            { month: "Mar", amount: 48000, growth: -8 },
            { month: "Apr", amount: 61000, growth: 27 },
          ].map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="font-medium">{data.month}</span>
              <div className="flex items-center space-x-3">
                <span className="font-bold">${data.amount.toLocaleString()}</span>
                <div className={`flex items-center space-x-1 ${data.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                  {data.growth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm">{Math.abs(data.growth)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Task Progress
    <Card key="task-progress" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { task: "Design Phase", progress: 100 },
            { task: "Development", progress: 75 },
            { task: "Testing", progress: 30 },
            { task: "Deployment", progress: 0 },
          ].map((task, index) => (
            <motion.div
              key={task.task}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span>{task.task}</span>
                <span>{task.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    task.progress === 100 ? "bg-green-500" : task.progress > 0 ? "bg-blue-500" : "bg-slate-300"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Live Counter
    <Card key="live-counter" className="w-full max-w-xs mx-auto">
      <CardContent className="p-6 text-center">
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.users.toLocaleString()}</div>
        </motion.div>
        <p className="text-slate-600">Active Users</p>
        <motion.div
          animate={isPlaying ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex items-center justify-center space-x-1 mt-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-green-600">Live</span>
        </motion.div>
      </CardContent>
    </Card>,
  ]

  return (
    <div className="flex items-center justify-center h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDemo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {demos[currentDemo]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
