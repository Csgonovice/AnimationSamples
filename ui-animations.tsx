"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Star, ShoppingCart, Send, Check } from "lucide-react"

interface UIAnimationsProps {
  isPlaying: boolean
}

export function UIAnimations({ isPlaying }: UIAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [liked, setLiked] = useState(false)
  const [rating, setRating] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 5)
      setLiked(false)
      setRating(0)
      setCartCount(0)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  const demos = [
    // Like Button Animation
    <div key="like" className="flex flex-col items-center space-y-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setLiked(!liked)}
        className="relative"
      >
        <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <Heart className={`w-12 h-12 ${liked ? "text-red-500 fill-red-500" : "text-slate-400"}`} />
        </motion.div>
        <AnimatePresence>
          {liked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="text-slate-600">Click to like</p>
    </div>,

    // Star Rating Animation
    <div key="rating" className="flex flex-col items-center space-y-4">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(star)}
            onHoverStart={() => isPlaying && setRating(star)}
          >
            <motion.div
              animate={
                star <= rating
                  ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <Star className={`w-8 h-8 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`} />
            </motion.div>
          </motion.button>
        ))}
      </div>
      <p className="text-slate-600">Rate this item</p>
    </div>,

    // Add to Cart Animation
    <div key="cart" className="flex flex-col items-center space-y-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCartCount((prev) => prev + 1)}
        className="relative bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              {cartCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="text-slate-600">Items in cart: {cartCount}</p>
    </div>,

    // Form Validation Animation
    <Card key="form" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Input placeholder="Your name" />
        </motion.div>

        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Input placeholder="Your email" type="email" />
        </motion.div>

        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <textarea className="w-full p-3 border rounded-lg resize-none" rows={3} placeholder="Your message" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </motion.div>
      </CardContent>
    </Card>,

    // Success State Animation
    <div key="success" className="flex flex-col items-center space-y-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2,
        }}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
          <Check className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-green-600">Success!</h3>
        <p className="text-slate-600">Your action was completed successfully</p>
      </motion.div>
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
