"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Lock, User, Mail } from "lucide-react"

interface AuthAnimationsProps {
  isPlaying: boolean
}

export function AuthAnimations({ isPlaying }: AuthAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [loginStep, setLoginStep] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentDemo === 0) {
        setLoginStep((prev) => {
          if (prev >= 3) {
            setCurrentDemo(1)
            return 0
          }
          return prev + 1
        })
      } else {
        setCurrentDemo((prev) => (prev + 1) % 4)
        setLoginStep(0)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo, loginStep])

  const demos = [
    // Login Form Animation
    <Card key="login" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={loginStep >= 1 ? "user@example.com" : ""}
              readOnly
            />
          </div>
        </motion.div>

        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              value={loginStep >= 2 ? "••••••••" : ""}
              readOnly
            />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full" disabled={loginStep < 2} variant={loginStep === 3 ? "default" : "default"}>
            {loginStep === 3 ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Success!
              </motion.div>
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>,

    // Withdrawal Confirmation
    <Card key="withdrawal" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-red-600">Confirm Withdrawal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold">$5,000.00</p>
          <p className="text-slate-600">Will be withdrawn from your account</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Button variant="destructive" className="w-full">
            Confirm Withdrawal
          </Button>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </motion.div>
      </CardContent>
    </Card>,

    // Security Verification
    <Card key="security" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Security Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          animate={isPlaying ? { rotate: [0, 360] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="text-center"
        >
          <Lock className="w-16 h-16 text-blue-500 mx-auto" />
        </motion.div>

        <div className="text-center">
          <p className="text-slate-600">Verifying your identity...</p>
          <motion.div className="flex justify-center space-x-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={
                  isPlaying
                    ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
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
          </motion.div>
        </div>
      </CardContent>
    </Card>,

    // Profile Setup
    <Card key="profile" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Button className="w-full">Complete Setup</Button>
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
