"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share, ThumbsUp, Users, Eye, Bookmark } from "lucide-react"

interface SocialAnimationsProps {
  isPlaying: boolean
}

export function SocialAnimations({ isPlaying }: SocialAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [likes, setLikes] = useState(42)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState(8)
  const [shares, setShares] = useState(3)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 10)
      setLikes(42)
      setIsLiked(false)
      setComments(8)
      setShares(3)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  const demos = [
    // Like Button Animation
    <div key="like-button" className="w-full max-w-xs mx-auto text-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsLiked(!isLiked)
          setLikes(isLiked ? likes - 1 : likes + 1)
        }}
        className="relative"
      >
        <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
          <Heart className={`w-12 h-12 ${isLiked ? "text-red-500 fill-red-500" : "text-slate-400"}`} />
        </motion.div>
        <AnimatePresence>
          {isLiked && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <motion.p key={likes} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="mt-2 text-slate-600">
        {likes} likes
      </motion.p>
    </div>,

    // Social Media Post
    <Card key="social-post" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-slate-500">2 hours ago</p>
          </div>
        </div>
        <p className="text-slate-700 mb-4">Just finished an amazing hike! The view was incredible 🏔️</p>
        <div className="flex items-center justify-between">
          {[
            { icon: Heart, count: likes, color: "text-red-500" },
            { icon: MessageCircle, count: comments, color: "text-blue-500" },
            { icon: Share, count: shares, color: "text-green-500" },
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
            >
              <action.icon className={`w-5 h-5 ${index === 0 && isLiked ? action.color : ""}`} />
              <span className="text-sm">{action.count}</span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Follow Button
    <div key="follow-button" className="w-full max-w-xs mx-auto text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 mx-auto"
      >
        <Users className="w-4 h-4" />
        Follow
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-sm text-slate-600"
      >
        1.2K followers
      </motion.div>
    </div>,

    // Story Viewer
    <div key="story-viewer" className="w-full max-w-sm mx-auto">
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {["You", "Alice", "Bob", "Carol", "Dave"].map((name, index) => (
          <motion.div
            key={name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                index === 0 ? "from-gray-300 to-gray-400" : "from-pink-500 to-orange-500 p-0.5"
              } cursor-pointer`}
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
              </div>
            </motion.div>
            <p className="text-xs mt-1 text-slate-600">{name}</p>
          </motion.div>
        ))}
      </div>
    </div>,

    // Live Viewer Count
    <div key="live-viewer" className="w-full max-w-xs mx-auto">
      <Card>
        <CardContent className="p-4 text-center">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="flex items-center justify-center space-x-2 mb-2"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-500 font-semibold">LIVE</span>
          </motion.div>
          <div className="flex items-center justify-center space-x-2">
            <Eye className="w-4 h-4 text-slate-600" />
            <motion.span
              key={Math.floor(Math.random() * 100)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-semibold"
            >
              {234 + Math.floor(Math.random() * 50)} viewers
            </motion.span>
          </div>
        </CardContent>
      </Card>
    </div>,

    // Comment Thread
    <Card key="comment-thread" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Comments</h3>
        <div className="space-y-3">
          {[
            { user: "Alice", comment: "Great post!", time: "2m" },
            { user: "Bob", comment: "Love this!", time: "5m" },
            { user: "Carol", comment: "Amazing work 👏", time: "8m" },
          ].map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start space-x-3"
            >
              <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-slate-100 rounded-lg p-2">
                  <p className="font-semibold text-sm">{comment.user}</p>
                  <p className="text-sm">{comment.comment}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">{comment.time} ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Share Modal
    <div key="share-modal" className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white border rounded-lg shadow-lg p-4"
      >
        <h3 className="font-semibold mb-3 text-center">Share this post</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Twitter", color: "bg-blue-400" },
            { name: "Facebook", color: "bg-blue-600" },
            { name: "Instagram", color: "bg-pink-500" },
            { name: "LinkedIn", color: "bg-blue-700" },
            { name: "WhatsApp", color: "bg-green-500" },
            { name: "Copy Link", color: "bg-slate-500" },
          ].map((platform, index) => (
            <motion.button
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${platform.color} text-white p-3 rounded-lg text-xs font-medium`}
            >
              {platform.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>,

    // Reaction Picker
    <div key="reaction-picker" className="w-full max-w-xs mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border rounded-full shadow-lg p-2 flex space-x-2"
      >
        {["👍", "❤️", "😂", "😮", "😢", "😡"].map((emoji, index) => (
          <motion.button
            key={emoji}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 500 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-lg"
          >
            {emoji}
          </motion.button>
        ))}
      </motion.div>
    </div>,

    // Bookmark Animation
    <div key="bookmark" className="w-full max-w-xs mx-auto text-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className="relative"
      >
        <motion.div animate={isLiked ? { y: [0, -5, 0] } : {}} transition={{ duration: 0.5 }}>
          <Bookmark className={`w-12 h-12 ${isLiked ? "text-blue-500 fill-blue-500" : "text-slate-400"}`} />
        </motion.div>
      </motion.button>
      <p className="mt-2 text-slate-600">Save for later</p>
    </div>,

    // Social Feed Item
    <Card key="feed-item" className="w-full max-w-md mx-auto">
      <CardContent className="p-0">
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-slate-600">24 likes</span>
            </div>
            <motion.button whileHover={{ rotate: 15 }} className="text-slate-400 hover:text-slate-600">
              <Share className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-sm text-slate-700">Beautiful sunset from today's adventure!</p>
        </div>
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
