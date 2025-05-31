"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Phone,
  PhoneOff,
  MessageCircle,
  Bell,
  Battery,
  Wifi,
  Signal,
  Lock,
  Unlock,
  X,
  ArrowUp,
  RotateCw,
  Camera,
  Home,
  Settings,
  Music,
  Mail,
  Calendar,
  Map,
  Clock,
  User,
} from "lucide-react"

interface PhoneAnimationsProps {
  isPlaying: boolean
}

export function PhoneAnimations({ isPlaying }: PhoneAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isRinging, setIsRinging] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  const [swipeProgress, setSwipeProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 8)
      setIsRinging(false)
      setIsUnlocked(false)
      setIsRotated(false)
      setSwipeProgress(0)
    }, 4000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (currentDemo === 0 && isPlaying) {
      setIsRinging(true)
    }
    if (currentDemo === 2 && isPlaying) {
      const timeout = setTimeout(() => {
        setIsUnlocked(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
    if (currentDemo === 5 && isPlaying) {
      const timeout = setTimeout(() => {
        setIsRotated(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
    if (currentDemo === 6 && isPlaying) {
      const interval = setInterval(() => {
        setSwipeProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [currentDemo, isPlaying])

  const demos = [
    // Phone Ringing Animation
    <div key="phone-ringing" className="w-full max-w-xs mx-auto">
      <motion.div
        animate={
          isRinging
            ? {
                rotate: [-2, 2, -2, 2, -2, 2, -2, 0],
                scale: [1, 1.02, 1, 1.02, 1, 1.02, 1],
              }
            : {}
        }
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        className="relative mx-auto"
      >
        <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl relative overflow-hidden">
          {/* Phone Frame */}
          <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
            {/* Screen */}
            <div className="absolute inset-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-[32px] flex flex-col">
              {/* Status Bar */}
              <div className="flex justify-between items-center text-white text-xs px-6 pt-4 pb-2">
                <div className="font-medium">9:41</div>
                <div className="flex items-center space-x-1">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Incoming Call Interface */}
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <motion.div
                  animate={isRinging ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/30"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-blue-500" />
                  </div>
                </motion.div>

                <h3 className="text-white text-2xl font-light mb-2">Incoming call</h3>
                <p className="text-white/90 text-lg mb-2">John Doe</p>
                <p className="text-white/70 text-sm mb-12">+1 (555) 123-4567</p>

                {/* Call Actions */}
                <div className="flex items-center justify-between w-full max-w-xs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <PhoneOff className="w-7 h-7 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Phone className="w-7 h-7 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <Camera className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Sound Waves */}
          <AnimatePresence>
            {isRinging && (
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0.6, 0], scale: [0.8, 2] }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-blue-400 rounded-full pointer-events-none"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,

    // Notification Pop-up
    <div key="notification" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Home Screen */}
            <div className="flex-1 p-6">
              {/* App Grid */}
              <div className="grid grid-cols-4 gap-4 mt-8">
                {[
                  { icon: MessageCircle, color: "from-green-400 to-green-600" },
                  { icon: Phone, color: "from-blue-400 to-blue-600" },
                  { icon: Mail, color: "from-red-400 to-red-600" },
                  { icon: Camera, color: "from-gray-400 to-gray-600" },
                  { icon: Music, color: "from-purple-400 to-purple-600" },
                  { icon: Calendar, color: "from-orange-400 to-orange-600" },
                  { icon: Map, color: "from-teal-400 to-teal-600" },
                  { icon: Settings, color: "from-gray-500 to-gray-700" },
                ].map((app, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}
                  >
                    <app.icon className="w-7 h-7 text-white" />
                  </motion.div>
                ))}
              </div>

              {/* Notification */}
              <motion.div
                initial={{ y: -100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
                className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-semibold">Messages</p>
                      <p className="text-white/60 text-xs">now</p>
                    </div>
                    <p className="text-white/90 text-sm">John: Hey, are we still meeting today?</p>
                    <p className="text-white/70 text-xs mt-1">Slide to view</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
    </div>,

    // Phone Unlock Animation
    <div key="phone-unlock" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Lock Screen Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <AnimatePresence mode="wait">
                {!isUnlocked ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    {/* Time Display */}
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                      <div className="text-white text-6xl font-thin mb-2">9:41</div>
                      <div className="text-white/80 text-lg">Friday, March 15</div>
                    </motion.div>

                    {/* Lock Icon */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="mb-8"
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <Lock className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Unlock Instructions */}
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-center"
                    >
                      <p className="text-white/90 text-lg mb-4">Swipe up to unlock</p>
                      <ArrowUp className="w-8 h-8 text-white/70 mx-auto" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center"
                  >
                    {/* Success Animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="mb-6"
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                        <Unlock className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-white text-2xl font-light mb-2">Welcome back!</h3>
                      <p className="text-white/80">Face ID recognized</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
    </div>,

    // App Switching Animation
    <div key="app-switching" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-slate-900 rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Switcher */}
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="relative w-full h-80">
                {[
                  { color: "from-blue-500 to-blue-700", icon: MessageCircle, name: "Messages" },
                  { color: "from-green-500 to-green-700", icon: Phone, name: "Phone" },
                  { color: "from-red-500 to-red-700", icon: Mail, name: "Mail" },
                ].map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      scale: 0.7,
                      x: index === 1 ? 0 : index === 0 ? -200 : 200,
                      rotateY: index === 1 ? 0 : index === 0 ? -25 : 25,
                    }}
                    animate={{
                      scale: index === 1 ? 1 : 0.8,
                      x: index === 1 ? 0 : index === 0 ? -120 : 120,
                      rotateY: index === 1 ? 0 : index === 0 ? -15 : 15,
                      zIndex: index === 1 ? 10 : 0,
                    }}
                    transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 300 }}
                    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-72 rounded-3xl bg-gradient-to-b ${app.color} shadow-2xl`}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {/* App Preview */}
                    <div className="p-4 h-full flex flex-col">
                      {/* App Header */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white text-sm font-medium">{app.name}</span>
                        <X className="w-5 h-5 text-white/70" />
                      </div>

                      {/* App Content */}
                      <div className="flex-1 flex items-center justify-center">
                        <app.icon className="w-16 h-16 text-white/80" />
                      </div>

                      {/* App Footer */}
                      <div className="text-center">
                        <div className="w-full h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
    </div>,

    // Mobile App Loading
    <div key="app-loading" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-white rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-slate-800 text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Loading Screen */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              {/* App Icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl"
              >
                <MessageCircle className="w-12 h-12 text-white" />
              </motion.div>

              {/* Loading Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
              />

              {/* Loading Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <h3 className="text-slate-800 text-xl font-semibold mb-2">Loading Messages</h3>
                <p className="text-slate-600 text-sm">Please wait...</p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-48 h-1 bg-blue-500 rounded-full mt-8"
              />
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
    </div>,

    // Screen Rotation
    <div key="screen-rotation" className="w-full max-w-lg mx-auto">
      <motion.div
        animate={
          isRotated ? { rotate: 90, width: "580px", height: "320px" } : { rotate: 0, width: "320px", height: "580px" }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-black rounded-[48px] p-2 shadow-2xl mx-auto"
        style={{ transformOrigin: "center" }}
      >
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Rotation Content */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 2, delay: 1 }}
                className="text-center"
              >
                <RotateCw className="w-20 h-20 text-white mb-6 mx-auto" />
                <p className="text-white text-xl font-light">Rotating Screen</p>
                <p className="text-white/80 text-sm mt-2">Landscape mode activated</p>
              </motion.div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </motion.div>
    </div>,

    // Swipe Gesture
    <div key="swipe-gesture" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-white rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-slate-800 text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Swipe Card Interface */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="relative w-full h-80">
                <motion.div
                  animate={{ x: `${swipeProgress * 2}%` }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 flex flex-col justify-between shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-1">Swipe Card</h3>
                      <p className="text-white/80 text-sm">Swipe right to continue</p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowUp className="w-6 h-6 text-white transform rotate-90" />
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/90">Complete your action</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${swipeProgress}%` }}
                      className="h-full bg-white rounded-full"
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </motion.div>

                {/* Success State */}
                {swipeProgress >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-green-500 rounded-3xl p-6 flex items-center justify-center shadow-xl"
                  >
                    <div className="text-white text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <div className="w-10 h-5 border-b-4 border-r-4 border-green-500 transform rotate-45 translate-y-[-25%]" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-2">Success!</h3>
                      <p className="text-white/90">Action completed</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
    </div>,

    // Mobile Menu Transition
    <div key="mobile-menu" className="w-full max-w-xs mx-auto">
      <div className="w-72 h-[580px] bg-black rounded-[48px] p-2 shadow-2xl mx-auto">
        <div className="w-full h-full bg-slate-900 rounded-[40px] relative overflow-hidden">
          {/* Screen */}
          <div className="absolute inset-2 bg-white rounded-[32px] flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-slate-800 text-xs px-6 pt-4 pb-2">
              <div className="font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <Button variant="ghost" size="sm" onClick={() => setIsUnlocked(!isUnlocked)} className="p-2">
                <motion.div animate={isUnlocked ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                  {isUnlocked ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <div className="space-y-1">
                      <div className="w-5 h-0.5 bg-slate-600 rounded" />
                      <div className="w-5 h-0.5 bg-slate-600 rounded" />
                      <div className="w-5 h-0.5 bg-slate-600 rounded" />
                    </div>
                  )}
                </motion.div>
              </Button>
              <h1 className="text-lg font-semibold text-slate-800">My App</h1>
              <div className="w-9" />
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
              {/* Main Content */}
              <motion.div
                animate={isUnlocked ? { x: 200, scale: 0.9 } : { x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-sm"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Side Menu */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={isUnlocked ? { x: 0 } : { x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-y-0 left-0 w-4/5 bg-slate-800 shadow-2xl"
              >
                <div className="p-6 space-y-6">
                  {/* Profile Section */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isUnlocked ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ delay: isUnlocked ? 0.2 : 0 }}
                    className="flex items-center space-x-3 pb-6 border-b border-slate-700"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">John Doe</p>
                      <p className="text-slate-400 text-sm">john@example.com</p>
                    </div>
                  </motion.div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    {[
                      { icon: Home, label: "Home" },
                      { icon: User, label: "Profile" },
                      { icon: MessageCircle, label: "Messages" },
                      { icon: Settings, label: "Settings" },
                      { icon: Bell, label: "Notifications" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isUnlocked ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: isUnlocked ? index * 0.1 + 0.3 : 0 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <item.icon className="w-5 h-5 text-slate-400" />
                        <span className="text-white font-medium">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full" />
        </div>
      </div>
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
