"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from "lucide-react"
import { LoadingAnimations } from "@/components/loading-animations"
import { AuthAnimations } from "@/components/auth-animations"
import { StockAnimations } from "@/components/stock-animations"
import { DataAnimations } from "@/components/data-animations"
import { UIAnimations } from "@/components/ui-animations"
import { NavigationAnimations } from "@/components/navigation-animations"
import { NotificationAnimations } from "@/components/notification-animations"
import { EcommerceAnimations } from "@/components/ecommerce-animations"
import { SocialAnimations } from "@/components/social-animations"
import { DashboardAnimations } from "@/components/dashboard-animations"
import { FileAnimations } from "@/components/file-animations"
import { MessagingAnimations } from "@/components/messaging-animations"
import { PhoneAnimations } from "@/components/phone-animations"
import { GameAnimationsWithStyles } from "@/components/game-animations"
import { LoadingScreen } from "@/components/loading-screen"
import { AudioManager } from "@/components/audio-manager"

const animationCategories = [
  {
    id: "loading",
    name: "Loading & Progress",
    description: "Spinners, progress bars, and skeleton loaders",
    component: LoadingAnimations,
    count: 12,
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Login forms, withdrawal confirmations, and security flows",
    component: AuthAnimations,
    count: 8,
  },
  {
    id: "navigation",
    name: "Navigation & Menus",
    description: "Mobile menus, breadcrumbs, and navigation transitions",
    component: NavigationAnimations,
    count: 10,
  },
  {
    id: "notifications",
    name: "Notifications & Alerts",
    description: "Toast messages, alerts, and notification systems",
    component: NotificationAnimations,
    count: 8,
  },
  {
    id: "ecommerce",
    name: "E-commerce & Shopping",
    description: "Product cards, cart animations, and checkout flows",
    component: EcommerceAnimations,
    count: 12,
  },
  {
    id: "social",
    name: "Social Media & Interactions",
    description: "Like buttons, comments, shares, and social feeds",
    component: SocialAnimations,
    count: 10,
  },
  {
    id: "dashboard",
    name: "Dashboard & Analytics",
    description: "KPI cards, real-time updates, and admin interfaces",
    component: DashboardAnimations,
    count: 9,
  },
  {
    id: "stocks",
    name: "Financial & Charts",
    description: "Stock charts, trading interfaces, and financial data",
    component: StockAnimations,
    count: 8,
  },
  {
    id: "data",
    name: "Data Visualization",
    description: "Charts, graphs, and animated statistics",
    component: DataAnimations,
    count: 7,
  },
  {
    id: "files",
    name: "File Management",
    description: "Upload progress, file browsers, and document handling",
    component: FileAnimations,
    count: 8,
  },
  {
    id: "messaging",
    name: "Communication & Messaging",
    description: "Chat interfaces, typing indicators, and message flows",
    component: MessagingAnimations,
    count: 9,
  },
  {
    id: "phone",
    name: "Phone & Mobile",
    description: "Device animations, screen transitions, and mobile interactions",
    component: PhoneAnimations,
    count: 8,
  },
  {
    id: "games",
    name: "Interactive Games",
    description: "Memory games, puzzles, quizzes, and interactive challenges",
    component: GameAnimationsWithStyles,
    count: 7,
  },
  {
    id: "ui",
    name: "UI Transitions",
    description: "Button interactions, form animations, and micro-interactions",
    component: UIAnimations,
    count: 15,
  },
]

export default function AnimationShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("loading")
  const [isPlaying, setIsPlaying] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setAnimationKey((prev) => prev + 1)
    setIsPlaying(true)
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const selectedCategoryData = animationCategories.find((cat) => cat.id === selectedCategory)
  const AnimationComponent = selectedCategoryData?.component

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Audio Manager - starts playing after loading screen */}
      {!isLoading && <AudioManager autoPlay={true} showControls={true} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Professional Animation Showcase
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore a curated collection of professional animations for modern web applications. From loading states
              to complex data visualizations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {animationCategories.map((category) => (
              <Card key={category.id} className="text-center">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{category.count}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{category.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Category Selection */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Animation Categories
                    <Badge variant="secondary">{animationCategories.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {animationCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setAnimationKey((prev) => prev + 1)
                        setIsPlaying(true)
                      }}
                    >
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{category.description}</div>
                        <Badge variant="outline" className="mt-2">
                          {category.count} animations
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Animation Display */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedCategoryData?.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleRestart}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[500px] bg-white dark:bg-slate-950 rounded-lg border p-8">
                    {AnimationComponent && <AnimationComponent key={animationKey} isPlaying={isPlaying} />}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
