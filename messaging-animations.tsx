"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

interface MessagingAnimationsProps {
  isPlaying: boolean
}

export function MessagingAnimations({ isPlaying }: MessagingAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string; time: string }>>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 9)
      setMessages([])
      setIsTyping(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (currentDemo === 0 && isPlaying) {
      const messageTexts = ["Hey there! 👋", "How are you doing?", "Want to grab lunch later?"]
      let messageIndex = 0

      const interval = setInterval(() => {
        if (messageIndex < messageTexts.length) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: messageTexts[messageIndex],
              sender: messageIndex % 2 === 0 ? "Alice" : "You",
              time: "now",
            },
          ])
          messageIndex++
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentDemo, isPlaying])

  const demos = [
    // Chat Interface
    <Card key="chat-interface" className="w-full max-w-md mx-auto h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="font-semibold">Alice Johnson</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === "You" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>,

    // Typing Indicator
    <Card key="typing-indicator" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs">
              <p className="text-sm">Hey, are you there?</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-slate-100 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-slate-400 rounded-full"
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
              </div>
            </div>
          </motion.div>
          <p className="text-xs text-slate-500">Alice is typing...</p>
        </div>
      </CardContent>
    </Card>,

    // Message Status
    <Card key="message-status" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="space-y-3">
          {[
            { text: "Hey! How's it going?", status: "read", time: "2:30 PM" },
            { text: "Want to meet up later?", status: "delivered", time: "2:32 PM" },
            { text: "Let me know!", status: "sent", time: "2:33 PM" },
          ].map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex justify-end"
            >
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs">
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className="text-xs opacity-75">{message.time}</span>
                  <div className="flex space-x-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.3 + 0.5 }}
                      className={`w-3 h-3 rounded-full ${
                        message.status === "read"
                          ? "bg-green-400"
                          : message.status === "delivered"
                            ? "bg-white"
                            : "bg-slate-300"
                      }`}
                    />
                    {message.status === "read" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 + 0.7 }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Voice Message
    <Card key="voice-message" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-100 px-3 py-2 rounded-lg flex items-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center"
              >
                <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-0.5" />
              </motion.button>
              <div className="flex space-x-1">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-blue-500 rounded-full"
                    animate={
                      isPlaying
                        ? {
                            height: [8, Math.random() * 20 + 8, 8],
                          }
                        : { height: 8 }
                    }
                    transition={{
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600">0:15</span>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>,

    // Group Chat
    <Card key="group-chat" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((initial, index) => (
                <motion.div
                  key={initial}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white"
                >
                  {initial}
                </motion.div>
              ))}
            </div>
            <span>Team Chat</span>
          </div>
          <Button size="sm" variant="ghost">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { sender: "Alice", message: "Meeting at 3 PM today", avatar: "A" },
            { sender: "Bob", message: "I'll be there!", avatar: "B" },
            { sender: "Carol", message: "Can we reschedule?", avatar: "C" },
          ].map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start space-x-3"
            >
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {chat.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{chat.sender}</p>
                <p className="text-sm text-slate-600">{chat.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Emoji Picker
    <div key="emoji-picker" className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border rounded-lg shadow-lg p-4"
      >
        <div className="grid grid-cols-6 gap-2">
          {["😀", "😂", "😍", "🤔", "😢", "😡", "👍", "👎", "❤️", "🔥", "💯", "🎉"].map((emoji, index) => (
            <motion.button
              key={emoji}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded hover:bg-slate-100 flex items-center justify-center text-lg"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>,

    // Video Call Interface
    <Card key="video-call" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg relative mb-4">
          <div className="absolute top-4 left-4 bg-black/20 text-white px-2 py-1 rounded text-sm">Alice Johnson</div>
          <motion.div
            animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-4 right-4 w-16 h-16 bg-slate-800 rounded-lg"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <Phone className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-slate-500 text-white rounded-full flex items-center justify-center"
          >
            <Video className="w-5 h-5" />
          </motion.button>
        </div>
      </CardContent>
    </Card>,

    // Message Reactions
    <Card key="message-reactions" className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="bg-slate-100 px-3 py-2 rounded-lg max-w-xs">
              <p className="text-sm">That's amazing news! 🎉</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex space-x-1 mt-2"
              >
                {["👍", "❤️", "😂"].map((reaction, index) => (
                  <motion.div
                    key={reaction}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}
                    className="bg-white border rounded-full px-2 py-1 text-xs flex items-center space-x-1"
                  >
                    <span>{reaction}</span>
                    <span className="text-slate-600">{index + 1}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>,

    // Chat List
    <Card key="chat-list" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { name: "Alice Johnson", message: "Hey, how are you?", time: "2m", unread: 2 },
            { name: "Bob Smith", message: "Meeting tomorrow at 10", time: "1h", unread: 0 },
            { name: "Team Chat", message: "Carol: Great work everyone!", time: "3h", unread: 5 },
          ].map((chat, index) => (
            <motion.div
              key={chat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "#f8fafc" }}
              className="flex items-center space-x-3 p-2 rounded cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{chat.name}</p>
                  <span className="text-xs text-slate-500">{chat.time}</span>
                </div>
                <p className="text-sm text-slate-600 truncate">{chat.message}</p>
              </div>
              {chat.unread > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {chat.unread}
                </motion.div>
              )}
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
