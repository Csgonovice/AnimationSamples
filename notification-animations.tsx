"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Info, X, Bell, Mail, MessageSquare } from "lucide-react"

interface NotificationAnimationsProps {
  isPlaying: boolean
}

export function NotificationAnimations({ isPlaying }: NotificationAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [notifications, setNotifications] = useState<Array<{ id: number; type: string; message: string }>>([])
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 8)
      setNotifications([])
      setShowToast(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (currentDemo === 1 && isPlaying) {
      const interval = setInterval(() => {
        const newNotification = {
          id: Date.now(),
          type: ["success", "error", "info"][Math.floor(Math.random() * 3)],
          message: ["Task completed!", "Error occurred", "New message"][Math.floor(Math.random() * 3)],
        }
        setNotifications((prev) => [...prev.slice(-2), newNotification])
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentDemo, isPlaying])

  const demos = [
    // Success Toast
    <div key="success-toast" className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
        </motion.div>
        <div className="flex-1">
          <p className="text-green-800 font-medium">Success!</p>
          <p className="text-green-600 text-sm">Your changes have been saved.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100">
          <X className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>,

    // Notification Stack
    <div key="notification-stack" className="w-full max-w-md mx-auto space-y-2">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`p-4 rounded-lg border flex items-center space-x-3 ${
              notification.type === "success"
                ? "bg-green-50 border-green-200"
                : notification.type === "error"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
            }`}
          >
            {notification.type === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
            {notification.type === "error" && <AlertTriangle className="w-5 h-5 text-red-600" />}
            {notification.type === "info" && <Info className="w-5 h-5 text-blue-600" />}
            <span className="flex-1">{notification.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,

    // Alert Banner
    <div key="alert-banner" className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg overflow-hidden"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 flex items-center space-x-3"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div className="flex-1">
            <p className="text-yellow-800 font-medium">System Maintenance</p>
            <p className="text-yellow-600 text-sm">Scheduled maintenance will begin in 30 minutes.</p>
          </div>
          <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-100">
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>,

    // Notification Bell
    <div key="notification-bell" className="w-full max-w-xs mx-auto text-center">
      <motion.div
        animate={isPlaying ? { rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        className="relative inline-block"
      >
        <Bell className="w-8 h-8 text-slate-600" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">3</span>
        </motion.div>
        <motion.div
          animate={isPlaying ? { scale: [1, 1.5, 1], opacity: [1, 0, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 border-2 border-red-500 rounded-full"
        />
      </motion.div>
    </div>,

    // Progress Notification
    <div key="progress-notification" className="w-full max-w-md mx-auto">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
            </motion.div>
            <div>
              <p className="font-medium">Uploading files...</p>
              <p className="text-sm text-slate-600">3 of 5 files completed</p>
            </div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 2 }}
            className="h-2 bg-blue-600 rounded-full"
          />
        </CardContent>
      </Card>
    </div>,

    // Email Notification
    <div key="email-notification" className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
      >
        <div className="flex items-start space-x-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <Mail className="w-5 h-5 text-blue-600" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">New Email</p>
              <span className="text-xs text-slate-500">2m ago</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">You have received a new message from John Doe</p>
          </div>
        </div>
      </motion.div>
    </div>,

    // Floating Notification
    <div key="floating-notification" className="w-full max-w-sm mx-auto relative h-40">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-xs"
      >
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-sm">New Message</p>
            <p className="text-xs text-slate-600 mt-1">Sarah: Hey, are we still on for lunch?</p>
          </div>
        </div>
      </motion.div>
    </div>,

    // Status Indicator
    <div key="status-indicator" className="w-full max-w-xs mx-auto">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">System Status</span>
            <div className="flex items-center space-x-2">
              <motion.div
                animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="text-sm text-green-600">Online</span>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {["API", "Database", "CDN"].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span>{service}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-600">Operational</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>,
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
