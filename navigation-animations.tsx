"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Home, User, Settings, Search, ChevronRight, ChevronDown } from "lucide-react"

interface NavigationAnimationsProps {
  isPlaying: boolean
}

export function NavigationAnimations({ isPlaying }: NavigationAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 10)
      setIsMenuOpen(false)
      setActiveTab(0)
      setExpandedItem(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  const demos = [
    // Mobile Hamburger Menu
    <div key="hamburger" className="w-full max-w-sm mx-auto">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <h3 className="font-semibold">My App</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:bg-blue-700"
        >
          <motion.div animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-x border-b rounded-b-lg overflow-hidden"
          >
            {["Home", "Profile", "Settings", "Help"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-b last:border-b-0 hover:bg-slate-50 cursor-pointer"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,

    // Animated Tab Navigation
    <div key="tabs" className="w-full max-w-md mx-auto">
      <div className="flex bg-slate-100 rounded-lg p-1">
        {["Dashboard", "Analytics", "Settings"].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className="relative flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors"
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-white rounded-lg border"
      >
        Content for {["Dashboard", "Analytics", "Settings"][activeTab]}
      </motion.div>
    </div>,

    // Breadcrumb Navigation
    <div key="breadcrumb" className="w-full max-w-lg mx-auto">
      <div className="flex items-center space-x-2 text-sm">
        {["Home", "Products", "Electronics", "Smartphones"].map((item, index, array) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center"
          >
            <span
              className={`${
                index === array.length - 1 ? "text-blue-600 font-medium" : "text-slate-600 hover:text-slate-900"
              } cursor-pointer`}
            >
              {item}
            </span>
            {index < array.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />}
          </motion.div>
        ))}
      </div>
    </div>,

    // Sidebar Navigation
    <div key="sidebar" className="w-full max-w-xs mx-auto">
      <Card>
        <CardContent className="p-0">
          {[
            { icon: Home, label: "Dashboard", count: null },
            { icon: User, label: "Users", count: 24 },
            { icon: Settings, label: "Settings", count: null },
            { icon: Search, label: "Search", count: null },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "#f8fafc" }}
              className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-slate-600" />
                <span>{item.label}</span>
              </div>
              {item.count && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {item.count}
                </motion.span>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>,

    // Dropdown Menu
    <div key="dropdown" className="w-full max-w-xs mx-auto">
      <div className="relative">
        <Button
          onClick={() => setExpandedItem(expandedItem === 0 ? null : 0)}
          className="w-full justify-between"
          variant="outline"
        >
          Select Option
          <motion.div animate={{ rotate: expandedItem === 0 ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </Button>
        <AnimatePresence>
          {expandedItem === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10"
            >
              {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 hover:bg-slate-50 cursor-pointer border-b last:border-b-0"
                >
                  {option}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>,

    // Floating Action Button
    <div key="fab" className="w-full max-w-xs mx-auto relative h-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <motion.div
          animate={isPlaying ? { rotate: [0, 180, 360] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Settings className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </div>,

    // Step Navigation
    <div key="steps" className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {step}
            </motion.div>
            {index < 3 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
                className={`h-1 mx-4 ${index < 1 ? "bg-blue-600" : "bg-slate-200"}`}
                style={{ width: "60px" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">Step 2 of 4: Personal Information</p>
      </div>
    </div>,

    // Pagination
    <div key="pagination" className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
              page === 3
                ? "bg-blue-600 text-white"
                : page === "..."
                  ? "text-slate-400"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>
    </div>,

    // Search Bar Animation
    <div key="search" className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ width: "40px" }}
        animate={isPlaying ? { width: "100%" } : { width: "40px" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <motion.input
          initial={{ opacity: 0 }}
          animate={isPlaying ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>
    </div>,

    // Bottom Navigation
    <div key="bottom-nav" className="w-full max-w-sm mx-auto">
      <div className="bg-white border rounded-lg p-2">
        <div className="flex justify-around">
          {[
            { icon: Home, label: "Home" },
            { icon: Search, label: "Search" },
            { icon: User, label: "Profile" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center p-2 rounded-lg ${
                index === 0 ? "text-blue-600 bg-blue-50" : "text-slate-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
          ))}
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
