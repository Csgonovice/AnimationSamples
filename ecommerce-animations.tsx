"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Star, Plus, Minus, CreditCard, Package, Truck } from "lucide-react"

interface EcommerceAnimationsProps {
  isPlaying: boolean
}

export function EcommerceAnimations({ isPlaying }: EcommerceAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 12)
      setCartCount(0)
      setQuantity(1)
      setIsLiked(false)
      setRating(0)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  const demos = [
    // Product Card
    <Card key="product-card" className="w-full max-w-sm mx-auto overflow-hidden">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "text-red-500 fill-red-500" : "text-slate-400"}`} />
          </motion.button>
        </div>
      </motion.div>
      <CardContent className="p-4">
        <h3 className="font-semibold">Premium Headphones</h3>
        <p className="text-slate-600 text-sm">High-quality wireless headphones</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold">$199.99</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartCount((prev) => prev + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </CardContent>
    </Card>,

    // Shopping Cart Animation
    <div key="cart-animation" className="w-full max-w-md mx-auto">
      <motion.div animate={cartCount > 0 ? { scale: [1, 1.1, 1] } : {}} className="relative inline-block">
        <ShoppingCart className="w-12 h-12 text-slate-600" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              {cartCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mt-4 text-center">
        <Button onClick={() => setCartCount((prev) => prev + 1)}>Add Item</Button>
      </div>
    </div>,

    // Quantity Selector
    <div key="quantity-selector" className="w-full max-w-xs mx-auto">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Select Quantity</h3>
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold w-12 text-center"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </div>,

    // Star Rating
    <div key="star-rating" className="w-full max-w-xs mx-auto text-center">
      <h3 className="font-semibold mb-4">Rate this product</h3>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(star)}
            onHoverStart={() => setRating(star)}
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
      <p className="mt-2 text-sm text-slate-600">{rating} out of 5 stars</p>
    </div>,

    // Price Comparison
    <Card key="price-comparison" className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Price Comparison</h3>
        <div className="space-y-3">
          {[
            { store: "Store A", price: 199.99, savings: 0 },
            { store: "Store B", price: 189.99, savings: 10 },
            { store: "Store C", price: 179.99, savings: 20 },
          ].map((item, index) => (
            <motion.div
              key={item.store}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                index === 2 ? "bg-green-50 border border-green-200" : "bg-slate-50"
              }`}
            >
              <span className="font-medium">{item.store}</span>
              <div className="text-right">
                <span className="font-bold">${item.price}</span>
                {item.savings > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="block text-sm text-green-600"
                  >
                    Save ${item.savings}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Checkout Progress
    <div key="checkout-progress" className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        {["Cart", "Shipping", "Payment", "Confirm"].map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {index + 1}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <p className="text-sm text-slate-600">Step 2: Shipping Information</p>
      </motion.div>
    </div>,

    // Payment Method Selection
    <Card key="payment-methods" className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Payment Method</h3>
        <div className="space-y-3">
          {[
            { method: "Credit Card", icon: CreditCard },
            { method: "PayPal", icon: Package },
            { method: "Apple Pay", icon: Truck },
          ].map((payment, index) => (
            <motion.div
              key={payment.method}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                index === 0 ? "border-blue-500 bg-blue-50" : "border-slate-200"
              }`}
            >
              <payment.icon className="w-5 h-5 mr-3 text-slate-600" />
              <span className="font-medium">{payment.method}</span>
              {index === 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="ml-auto w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Order Tracking
    <Card key="order-tracking" className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Order Status</h3>
        <div className="space-y-4">
          {[
            { status: "Order Placed", completed: true },
            { status: "Processing", completed: true },
            { status: "Shipped", completed: false },
            { status: "Delivered", completed: false },
          ].map((step, index) => (
            <motion.div
              key={step.status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-slate-300"}`}
              />
              <span className={step.completed ? "text-green-600" : "text-slate-600"}>{step.status}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Discount Banner
    <div key="discount-banner" className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg text-center"
      >
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <h3 className="text-xl font-bold">50% OFF</h3>
        </motion.div>
        <p className="text-sm opacity-90">Limited time offer!</p>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-1 bg-white/30 rounded-full mt-2"
        />
      </motion.div>
    </div>,

    // Wishlist Animation
    <Card key="wishlist" className="w-full max-w-sm mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">My Wishlist</h3>
          <motion.div
            animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </motion.div>
        </div>
        <div className="space-y-3">
          {["Wireless Headphones", "Smart Watch", "Laptop Stand"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-between p-2 bg-slate-50 rounded"
            >
              <span className="text-sm">{item}</span>
              <Button size="sm" variant="outline">
                Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Flash Sale Timer
    <Card key="flash-sale" className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <motion.h3
          animate={isPlaying ? { color: ["#ef4444", "#f97316", "#ef4444"] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="text-xl font-bold mb-2"
        >
          FLASH SALE
        </motion.h3>
        <p className="text-slate-600 mb-4">Ends in:</p>
        <div className="flex justify-center space-x-4">
          {[
            { label: "Hours", value: "02" },
            { label: "Minutes", value: "34" },
            { label: "Seconds", value: "56" },
          ].map((time, index) => (
            <motion.div
              key={time.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                animate={isPlaying && time.label === "Seconds" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="bg-red-500 text-white px-3 py-2 rounded font-bold text-lg"
              >
                {time.value}
              </motion.div>
              <p className="text-xs text-slate-600 mt-1">{time.label}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Product Comparison
    <div key="product-comparison" className="w-full max-w-lg mx-auto">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Compare Products</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Product A", "Product B"].map((product, index) => (
              <motion.div
                key={product}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="aspect-square bg-slate-100 rounded-lg mb-2" />
                <h4 className="font-medium">{product}</h4>
                <p className="text-lg font-bold">${199 + index * 50}.99</p>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 - index ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`}
                    />
                  ))}
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
