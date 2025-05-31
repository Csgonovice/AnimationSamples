"use client"

import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gamepad2, Trophy, Timer, Zap, Target, Brain, Dices } from "lucide-react"

interface GameAnimationsProps {
  isPlaying: boolean
}

export function GameAnimations({ isPlaying }: GameAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 7)
    }, 10000) // Longer timeout for games

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  const demos = [
    // Memory Card Game
    <MemoryCardGame key="memory-card" isPlaying={isPlaying} />,

    // Whack-a-Mole Game
    <WhackAMoleGame key="whack-a-mole" isPlaying={isPlaying} />,

    // Reaction Time Test
    <ReactionTimeGame key="reaction-time" isPlaying={isPlaying} />,

    // Drag and Drop Puzzle
    <DragDropPuzzle key="drag-drop" isPlaying={isPlaying} />,

    // Runner Game
    <RunnerGame key="runner" isPlaying={isPlaying} />,

    // Quiz Animation
    <QuizAnimation key="quiz" isPlaying={isPlaying} />,

    // Slot Machine
    <SlotMachine key="slot-machine" isPlaying={isPlaying} />,
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
          className="w-full"
        >
          {demos[currentDemo]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Memory Card Game
function MemoryCardGame({ isPlaying }: { isPlaying: boolean }) {
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Card contents (pairs of emojis)
  const cardContents = ["🚀", "🌟", "🎮", "🎯", "🎨", "🎭", "🚀", "🌟", "🎮", "🎯", "🎨", "🎭"]

  useEffect(() => {
    if (!isPlaying) {
      setFlippedCards([])
      setMatchedPairs([])
      setScore(0)
      setGameStarted(false)
      return
    }

    setGameStarted(true)

    // Auto-play demo
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        checkForMatch()
      }, 1000)
      return () => clearTimeout(timer)
    }

    // Auto-flip cards for demo
    if (isPlaying && flippedCards.length < 2 && gameStarted) {
      const availableCards = [...Array(cardContents.length).keys()].filter(
        (i) => !flippedCards.includes(i) && !matchedPairs.includes(i),
      )

      if (availableCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCards.length)
        const timer = setTimeout(() => {
          flipCard(availableCards[randomIndex])
        }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [isPlaying, flippedCards, gameStarted])

  const flipCard = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedPairs.includes(index)) {
      setFlippedCards((prev) => [...prev, index])
    }
  }

  const checkForMatch = () => {
    const [first, second] = flippedCards

    if (cardContents[first] === cardContents[second]) {
      setMatchedPairs((prev) => [...prev, first, second])
      setScore((prev) => prev + 10)
    }

    setFlippedCards([])
  }

  const resetGame = () => {
    setFlippedCards([])
    setMatchedPairs([])
    setScore(0)
    setGameStarted(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Memory Match
          </div>
          <div className="text-sm font-normal">Score: {score}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {cardContents.map((content, index) => (
            <motion.div
              key={index}
              className="aspect-square cursor-pointer"
              onClick={() => flipCard(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{
                  rotateY: flippedCards.includes(index) || matchedPairs.includes(index) ? 180 : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                  ?
                </div>

                {/* Card Front */}
                <div className="absolute inset-0 backface-hidden rotateY-180 bg-white rounded-lg border-2 flex items-center justify-center text-3xl">
                  {content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={resetGame}>New Game</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Whack-a-Mole Game
function WhackAMoleGame({ isPlaying }: { isPlaying: boolean }) {
  const [score, setScore] = useState(0)
  const [activeMole, setActiveMole] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (!isPlaying) {
      setScore(0)
      setActiveMole(null)
      setGameStarted(false)
      setTimeLeft(30)
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    // Spawn moles
    const moleInterval = setInterval(() => {
      if (gameStarted) {
        setActiveMole(Math.floor(Math.random() * 9))

        // Auto-whack for demo
        setTimeout(() => {
          setScore((prev) => prev + 1)
          setActiveMole(null)
        }, 800)
      }
    }, 1200)

    // Timer
    const timerInterval = setInterval(() => {
      if (gameStarted) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStarted(false)
            return 30
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => {
      clearInterval(moleInterval)
      clearInterval(timerInterval)
    }
  }, [isPlaying, gameStarted])

  const whackMole = (index: number) => {
    if (index === activeMole) {
      setScore((prev) => prev + 1)
      setActiveMole(null)
    }
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameStarted(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Whack-a-Mole
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-normal">Score: {score}</div>
            <div className="text-sm font-normal">Time: {timeLeft}s</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <motion.div
              key={index}
              className="aspect-square bg-amber-800 rounded-lg relative overflow-hidden"
              onClick={() => whackMole(index)}
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-amber-900 rounded-b-lg" />

              {activeMole === index && (
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  exit={{ y: 60 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-2xl">
                      🐹
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={startGame} disabled={gameStarted}>
            {gameStarted ? "Game in Progress" : "Start Game"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Reaction Time Test
function ReactionTimeGame({ isPlaying }: { isPlaying: boolean }) {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "clicked" | "results">("waiting")
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    if (!isPlaying) {
      setGameState("waiting")
      return
    }

    if (gameState === "waiting") {
      // Random delay before showing the target
      const delay = Math.random() * 2000 + 1000
      const timer = setTimeout(() => {
        setGameState("ready")
        setStartTime(Date.now())
        controls.start({
          backgroundColor: ["#ef4444", "#ef4444"],
          transition: { duration: 0.1 },
        })
      }, delay)

      return () => clearTimeout(timer)
    }

    if (gameState === "ready") {
      // Auto-click for demo
      const timer = setTimeout(() => {
        handleClick()
      }, 300)

      return () => clearTimeout(timer)
    }

    if (gameState === "results") {
      // Reset after showing results
      const timer = setTimeout(() => {
        setGameState("waiting")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, gameState])

  const handleClick = () => {
    if (gameState === "waiting") {
      // Clicked too early
      setGameState("clicked")
      controls.start({
        backgroundColor: ["#f97316", "#f97316"],
        transition: { duration: 0.1 },
      })

      setTimeout(() => {
        setGameState("waiting")
      }, 1000)
    } else if (gameState === "ready") {
      // Good click, calculate reaction time
      const endTime = Date.now()
      const time = endTime - startTime
      setReactionTime(time)

      if (bestTime === null || time < bestTime) {
        setBestTime(time)
      }

      setGameState("results")
      controls.start({
        backgroundColor: ["#22c55e", "#22c55e"],
        transition: { duration: 0.1 },
      })
    }
  }

  const getInstructions = () => {
    switch (gameState) {
      case "waiting":
        return "Wait for the red box..."
      case "ready":
        return "Click now!"
      case "clicked":
        return "Too early! Try again."
      case "results":
        return `Your time: ${reactionTime}ms`
    }
  }

  const getBackgroundColor = () => {
    switch (gameState) {
      case "waiting":
        return "bg-blue-500"
      case "ready":
        return "bg-red-500"
      case "clicked":
        return "bg-orange-500"
      case "results":
        return "bg-green-500"
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Reaction Time Test
          </div>
          {bestTime && <div className="text-sm font-normal">Best: {bestTime}ms</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          animate={controls}
          className={`w-full aspect-video rounded-lg ${getBackgroundColor()} flex items-center justify-center cursor-pointer`}
          onClick={handleClick}
        >
          <motion.p
            className="text-white text-xl font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {getInstructions()}
          </motion.p>
        </motion.div>

        <div className="mt-4 text-center text-sm text-slate-600">
          Click when the box turns red. Test your reaction time!
        </div>
      </CardContent>
    </Card>
  )
}

// Drag and Drop Puzzle
function DragDropPuzzle({ isPlaying }: { isPlaying: boolean }) {
  const [pieces, setPieces] = useState([
    { id: 1, x: 0, y: 0, correctX: 0, correctY: 0, isCorrect: false },
    { id: 2, x: 100, y: 0, correctX: 100, correctY: 0, isCorrect: false },
    { id: 3, x: 0, y: 100, correctX: 0, correctY: 100, isCorrect: false },
    { id: 4, x: 100, y: 100, correctX: 100, correctY: 100, isCorrect: false },
  ])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!isPlaying) {
      // Shuffle pieces
      setPieces((prev) =>
        prev.map((piece) => ({
          ...piece,
          x: Math.random() * 200 - 50,
          y: Math.random() * 200 - 50,
          isCorrect: false,
        })),
      )
      setCompleted(false)
      return
    }

    // Auto-solve for demo
    if (isPlaying && !completed) {
      const timer = setTimeout(() => {
        setPieces((prev) =>
          prev.map((piece) => ({
            ...piece,
            x: piece.correctX,
            y: piece.correctY,
            isCorrect: true,
          })),
        )
        setCompleted(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying])

  const handleDrag = (id: number, x: number, y: number) => {
    setPieces((prev) =>
      prev.map((piece) => {
        if (piece.id === id) {
          // Check if piece is close to correct position
          const isCorrect = Math.abs(x - piece.correctX) < 20 && Math.abs(y - piece.correctY) < 20

          return {
            ...piece,
            x: isCorrect ? piece.correctX : x,
            y: isCorrect ? piece.correctY : y,
            isCorrect,
          }
        }
        return piece
      }),
    )

    // Check if all pieces are correct
    const allCorrect = pieces.every((piece) => piece.isCorrect)
    if (allCorrect) {
      setCompleted(true)
    }
  }

  const resetPuzzle = () => {
    setPieces((prev) =>
      prev.map((piece) => ({
        ...piece,
        x: Math.random() * 200 - 50,
        y: Math.random() * 200 - 50,
        isCorrect: false,
      })),
    )
    setCompleted(false)
  }

  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dices className="w-5 h-5" />
            Puzzle Challenge
          </div>
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-sm font-normal text-green-600 flex items-center gap-1"
            >
              <Trophy className="w-4 h-4" /> Completed!
            </motion.div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square bg-slate-100 rounded-lg overflow-hidden">
          {/* Target grid */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 pointer-events-none opacity-30">
            <div className="bg-blue-200 rounded"></div>
            <div className="bg-green-200 rounded"></div>
            <div className="bg-yellow-200 rounded"></div>
            <div className="bg-purple-200 rounded"></div>
          </div>

          {/* Puzzle pieces */}
          {pieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              className={`absolute w-[calc(50%-2px)] h-[calc(50%-2px)] ${colors[index]} rounded-lg cursor-move shadow-lg`}
              style={{ left: 0, top: 0 }}
              drag
              dragConstraints={{ left: -100, right: 200, top: -100, bottom: 200 }}
              dragElastic={0.1}
              dragMomentum={false}
              animate={{
                x: piece.x,
                y: piece.y,
                scale: piece.isCorrect ? 1 : 0.95,
                boxShadow: piece.isCorrect ? "0px 0px 0px rgba(0,0,0,0)" : "0px 5px 10px rgba(0,0,0,0.2)",
              }}
              onDragEnd={(_, info) => {
                handleDrag(piece.id, piece.x + info.offset.x, piece.y + info.offset.y)
              }}
              whileDrag={{ scale: 1.05, zIndex: 10 }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                {piece.id}
              </div>
            </motion.div>
          ))}

          {/* Completion animation */}
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-20 h-20 rounded-full border-4 border-t-transparent border-white"
              />
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={resetPuzzle}>Reset Puzzle</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Runner Game
function RunnerGame({ isPlaying }: { isPlaying: boolean }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState<{ id: number; position: number }[]>([])
  const [gameOver, setGameOver] = useState(false)
  const nextObstacleId = useRef(0)

  useEffect(() => {
    if (!isPlaying) {
      setGameStarted(false)
      setScore(0)
      setObstacles([])
      setGameOver(false)
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    if (gameOver) {
      const timer = setTimeout(() => {
        setGameStarted(true)
        setScore(0)
        setObstacles([])
        setGameOver(false)
      }, 2000)

      return () => clearTimeout(timer)
    }

    // Score counter
    const scoreInterval = setInterval(() => {
      if (gameStarted && !gameOver) {
        setScore((prev) => prev + 1)
      }
    }, 100)

    // Obstacle generator
    const obstacleInterval = setInterval(() => {
      if (gameStarted && !gameOver) {
        setObstacles((prev) => [...prev, { id: nextObstacleId.current, position: 100 }])
        nextObstacleId.current += 1
      }
    }, 2000)

    // Move obstacles
    const moveInterval = setInterval(() => {
      if (gameStarted && !gameOver) {
        setObstacles((prev) => {
          // Remove obstacles that have moved off screen
          const filtered = prev.filter((obs) => obs.position > -10)

          // Move remaining obstacles
          return filtered.map((obs) => ({
            ...obs,
            position: obs.position - 5,
          }))
        })
      }
    }, 100)

    // Auto jump for demo
    const jumpInterval = setInterval(() => {
      if (gameStarted && !gameOver && obstacles.some((obs) => obs.position > 10 && obs.position < 30)) {
        jump()
      }
    }, 100)

    // Collision detection
    const collisionInterval = setInterval(() => {
      if (gameStarted && !gameOver && !isJumping) {
        const collision = obstacles.some((obs) => obs.position > 0 && obs.position < 10)
        if (collision) {
          setGameOver(true)
          setGameStarted(false)
        }
      }
    }, 100)

    return () => {
      clearInterval(scoreInterval)
      clearInterval(obstacleInterval)
      clearInterval(moveInterval)
      clearInterval(jumpInterval)
      clearInterval(collisionInterval)
    }
  }, [isPlaying, gameStarted, gameOver, isJumping, obstacles])

  const jump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true)
      setTimeout(() => {
        setIsJumping(false)
      }, 500)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setObstacles([])
    setGameOver(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Runner Game
          </div>
          <div className="text-sm font-normal">Score: {score}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-40 bg-slate-100 rounded-lg relative overflow-hidden" onClick={jump}>
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-400" />

          {/* Character */}
          <motion.div
            className="absolute bottom-1 left-5 w-8 h-12 bg-blue-500 rounded"
            animate={{ y: isJumping ? -40 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />

          {/* Obstacles */}
          {obstacles.map((obstacle) => (
            <motion.div
              key={obstacle.id}
              className="absolute bottom-1 w-6 h-8 bg-red-500 rounded"
              initial={{ right: `-10%` }}
              animate={{ right: `${obstacle.position}%` }}
              transition={{ type: "linear", duration: 0 }}
            />
          ))}

          {/* Game Over Overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="text-white text-xl font-bold">Game Over!</div>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={startGame} disabled={gameStarted && !gameOver}>
            {gameStarted && !gameOver ? "Playing..." : "Start Game"}
          </Button>
        </div>

        <div className="mt-2 text-center text-sm text-slate-600">Click or tap to jump over obstacles</div>
      </CardContent>
    </Card>
  )
}

// Quiz Animation
function QuizAnimation({ isPlaying }: { isPlaying: boolean }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
    },
  ]

  useEffect(() => {
    if (!isPlaying) {
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setScore(0)
      setShowResult(false)
      setTimeLeft(10)
      return
    }

    // Timer countdown
    const timerInterval = setInterval(() => {
      if (!showResult) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up, move to next question
            handleNextQuestion()
            return 10
          }
          return prev - 1
        })
      }
    }, 1000)

    // Auto-answer for demo
    if (isPlaying && selectedAnswer === null && !showResult) {
      const timer = setTimeout(() => {
        const correctAnswer = questions[currentQuestion].correctAnswer
        setSelectedAnswer(correctAnswer)
        setScore((prev) => prev + 1)

        setTimeout(() => {
          handleNextQuestion()
        }, 1500)
      }, 2000)

      return () => {
        clearTimeout(timer)
        clearInterval(timerInterval)
      }
    }

    return () => clearInterval(timerInterval)
  }, [isPlaying, currentQuestion, selectedAnswer, showResult])

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || showResult) return

    setSelectedAnswer(index)

    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }

    // Move to next question after delay
    setTimeout(() => {
      handleNextQuestion()
    }, 1500)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setTimeLeft(10)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(10)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Quiz Challenge
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-normal">
              Score: {score}/{questions.length}
            </div>
            {!showResult && (
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span className="text-sm font-normal">{timeLeft}s</span>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <>
            <div className="mb-4">
              <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
              <div className="mt-1 text-xs text-slate-500 text-right">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>

              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedAnswer === null
                        ? "hover:bg-slate-50"
                        : selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : index === questions[currentQuestion].correctAnswer
                            ? "bg-green-100 border-green-500"
                            : "opacity-50"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    disabled={selectedAnswer !== null}
                  >
                    {option}

                    {selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-10 h-10 text-green-600" />
            </motion.div>

            <h3 className="text-xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-lg mb-6">
              Your score: {score}/{questions.length}
            </p>

            <Button onClick={resetQuiz}>Play Again</Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

// Slot Machine
function SlotMachine({ isPlaying }: { isPlaying: boolean }) {
  const [spinning, setSpinning] = useState(false)
  const [reels, setReels] = useState([0, 0, 0])
  const [win, setWin] = useState(false)
  const [credits, setCredits] = useState(100)

  const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "7️⃣"]

  useEffect(() => {
    if (!isPlaying) {
      setSpinning(false)
      setReels([0, 0, 0])
      setWin(false)
      setCredits(100)
      return
    }

    // Auto-spin for demo
    if (isPlaying && !spinning) {
      const timer = setTimeout(() => {
        spin()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, spinning])

  const spin = () => {
    if (spinning || credits < 10) return

    setCredits((prev) => prev - 10)
    setSpinning(true)
    setWin(false)

    // Spin each reel with different durations
    const newReels = reels.map(() => Math.floor(Math.random() * symbols.length))

    setTimeout(() => {
      setReels([newReels[0], reels[1], reels[2]])

      setTimeout(() => {
        setReels([newReels[0], newReels[1], reels[2]])

        setTimeout(() => {
          setReels(newReels)
          setSpinning(false)

          // Check for win
          if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
            setWin(true)
            // Bigger win for higher value symbols
            const winAmount = (newReels[0] + 1) * 20
            setCredits((prev) => prev + winAmount)
          } else if (newReels[0] === newReels[1] || newReels[1] === newReels[2] || newReels[0] === newReels[2]) {
            setWin(true)
            setCredits((prev) => prev + 20)
          }
        }, 500)
      }, 400)
    }, 300)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dices className="w-5 h-5" />
            Lucky Slots
          </div>
          <div className="text-sm font-normal">Credits: {credits}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-b from-purple-900 to-purple-700 rounded-lg p-6 mb-4">
          <div className="flex justify-center space-x-2 mb-4">
            {reels.map((reel, index) => (
              <motion.div
                key={index}
                className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl"
                animate={spinning ? { y: [0, -20, 0, -10, 0] } : {}}
                transition={{
                  duration: 0.5,
                  repeat: spinning ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.1,
                }}
              >
                {symbols[reel]}
              </motion.div>
            ))}
          </div>

          {win && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-yellow-300 font-bold text-xl mb-4"
            >
              🎉 YOU WIN! 🎉
            </motion.div>
          )}

          <Button
            onClick={spin}
            disabled={spinning || credits < 10}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {spinning ? "Spinning..." : "Spin (10 credits)"}
          </Button>
        </div>

        <div className="text-center text-sm text-slate-600">Match symbols to win! Three of a kind pays big!</div>
      </CardContent>
    </Card>
  )
}

// Add CSS for 3D card effect
const styles = `
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotateY-180 {
  transform: rotateY(180deg);
}
`

export function GameAnimationsWithStyles({ isPlaying }: GameAnimationsProps) {
  return (
    <>
      <style>{styles}</style>
      <GameAnimations isPlaying={isPlaying} />
    </>
  )
}
