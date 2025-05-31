"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AudioManagerProps {
  autoPlay?: boolean
  showControls?: boolean
}

export function AudioManager({ autoPlay = true, showControls = true }: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodeRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const kickReverbRef = useRef<ConvolverNode | null>(null)
  const snareReverbRef = useRef<ConvolverNode | null>(null)
  const hihatReverbRef = useRef<ConvolverNode | null>(null)
  const synthReverbRef = useRef<ConvolverNode | null>(null)
  const padReverbRef = useRef<ConvolverNode | null>(null)

  // Create kick drum sound
  const createKick = (intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime

    const kickOsc = audioContext.createOscillator()
    const kickGain = audioContext.createGain()
    const kickFilter = audioContext.createBiquadFilter()
    const dryGain = audioContext.createGain()
    const wetGain = audioContext.createGain()

    kickOsc.type = "sine"
    kickOsc.frequency.setValueAtTime(65, currentTime)
    kickOsc.frequency.exponentialRampToValueAtTime(25, currentTime + 0.15)

    kickFilter.type = "lowpass"
    kickFilter.frequency.setValueAtTime(120, currentTime)
    kickFilter.Q.setValueAtTime(2, currentTime)

    kickGain.gain.setValueAtTime(0, currentTime)
    kickGain.gain.linearRampToValueAtTime(1.1 * intensity, currentTime + 0.01)
    kickGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.4)

    // Set up dry/wet mix for reverb
    dryGain.gain.setValueAtTime(0.8, currentTime) // 80% dry
    wetGain.gain.setValueAtTime(0.2, currentTime) // 20% wet

    kickOsc.connect(kickFilter)
    kickFilter.connect(kickGain)

    // Split signal for dry and wet paths
    kickGain.connect(dryGain)
    kickGain.connect(wetGain)

    dryGain.connect(gainNodeRef.current!)
    if (kickReverbRef.current) {
      wetGain.connect(kickReverbRef.current)
    }

    kickOsc.start(currentTime)
    kickOsc.stop(currentTime + 0.4)

    oscillatorsRef.current.push(kickOsc)
  }

  // Create snare drum sound
  const createSnare = (intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime

    // Create noise buffer for snare
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)

    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / noiseData.length, 3)
    }

    const noiseSource = audioContext.createBufferSource()
    const snareGain = audioContext.createGain()
    const snareFilter = audioContext.createBiquadFilter()
    const dryGain = audioContext.createGain()
    const wetGain = audioContext.createGain()

    noiseSource.buffer = noiseBuffer
    snareFilter.type = "bandpass"
    snareFilter.frequency.setValueAtTime(800, currentTime)
    snareFilter.Q.setValueAtTime(3, currentTime)

    snareGain.gain.setValueAtTime(0, currentTime)
    snareGain.gain.linearRampToValueAtTime(0.5 * intensity, currentTime + 0.01)
    snareGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15)

    // Set up dry/wet mix
    dryGain.gain.setValueAtTime(0.6, currentTime) // 60% dry
    wetGain.gain.setValueAtTime(0.4, currentTime) // 40% wet

    noiseSource.connect(snareFilter)
    snareFilter.connect(snareGain)

    snareGain.connect(dryGain)
    snareGain.connect(wetGain)

    dryGain.connect(gainNodeRef.current!)
    if (snareReverbRef.current) {
      wetGain.connect(snareReverbRef.current)
    }

    noiseSource.start(currentTime)

    // Add tonal component with reverb
    const toneOsc = audioContext.createOscillator()
    const toneGain = audioContext.createGain()
    const toneDryGain = audioContext.createGain()
    const toneWetGain = audioContext.createGain()

    toneOsc.type = "triangle"
    toneOsc.frequency.setValueAtTime(200, currentTime)
    toneOsc.frequency.exponentialRampToValueAtTime(150, currentTime + 0.1)

    toneGain.gain.setValueAtTime(0, currentTime)
    toneGain.gain.linearRampToValueAtTime(0.2 * intensity, currentTime + 0.005)
    toneGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.1)

    toneDryGain.gain.setValueAtTime(0.7, currentTime)
    toneWetGain.gain.setValueAtTime(0.3, currentTime)

    toneOsc.connect(toneGain)
    toneGain.connect(toneDryGain)
    toneGain.connect(toneWetGain)

    toneDryGain.connect(gainNodeRef.current!)
    if (snareReverbRef.current) {
      toneWetGain.connect(snareReverbRef.current)
    }

    toneOsc.start(currentTime)
    toneOsc.stop(currentTime + 0.1)

    oscillatorsRef.current.push(toneOsc)
  }

  // Create hi-hat sound
  const createHiHat = (open = false, intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime

    const noiseBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * (open ? 0.3 : 0.1),
      audioContext.sampleRate,
    )
    const noiseData = noiseBuffer.getChannelData(0)

    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / noiseData.length, open ? 1 : 4)
    }

    const noiseSource = audioContext.createBufferSource()
    const hihatGain = audioContext.createGain()
    const hihatFilter = audioContext.createBiquadFilter()
    const dryGain = audioContext.createGain()
    const wetGain = audioContext.createGain()

    noiseSource.buffer = noiseBuffer
    hihatFilter.type = "highpass"
    hihatFilter.frequency.setValueAtTime(8000, currentTime)
    hihatFilter.Q.setValueAtTime(1, currentTime)

    hihatGain.gain.setValueAtTime(0, currentTime)
    hihatGain.gain.linearRampToValueAtTime((open ? 0.15 : 0.25) * intensity, currentTime + 0.005)
    hihatGain.gain.exponentialRampToValueAtTime(0.001, currentTime + (open ? 0.3 : 0.08))

    // More reverb for open hi-hats
    dryGain.gain.setValueAtTime(open ? 0.5 : 0.8, currentTime)
    wetGain.gain.setValueAtTime(open ? 0.5 : 0.2, currentTime)

    noiseSource.connect(hihatFilter)
    hihatFilter.connect(hihatGain)

    hihatGain.connect(dryGain)
    hihatGain.connect(wetGain)

    dryGain.connect(gainNodeRef.current!)
    if (hihatReverbRef.current) {
      wetGain.connect(hihatReverbRef.current)
    }

    noiseSource.start(currentTime)
  }

  // Create bass synth
  const createBass = (frequency, duration = 0.5, intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime

    const bassOsc = audioContext.createOscillator()
    const bassGain = audioContext.createGain()
    const bassFilter = audioContext.createBiquadFilter()
    const dryGain = audioContext.createGain()
    const wetGain = audioContext.createGain()

    bassOsc.type = "sawtooth"
    bassOsc.frequency.setValueAtTime(frequency, currentTime)

    bassFilter.type = "lowpass"
    bassFilter.frequency.setValueAtTime(300, currentTime)
    bassFilter.Q.setValueAtTime(5, currentTime)

    bassGain.gain.setValueAtTime(0, currentTime)
    bassGain.gain.linearRampToValueAtTime(0.4 * intensity, currentTime + 0.05)
    bassGain.gain.linearRampToValueAtTime(0.35 * intensity, currentTime + duration - 0.1)
    bassGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration)

    // Light reverb for bass to avoid muddiness
    dryGain.gain.setValueAtTime(0.9, currentTime)
    wetGain.gain.setValueAtTime(0.1, currentTime)

    bassOsc.connect(bassFilter)
    bassFilter.connect(bassGain)

    bassGain.connect(dryGain)
    bassGain.connect(wetGain)

    dryGain.connect(gainNodeRef.current!)
    if (synthReverbRef.current) {
      wetGain.connect(synthReverbRef.current)
    }

    bassOsc.start(currentTime)
    bassOsc.stop(currentTime + duration)

    oscillatorsRef.current.push(bassOsc)
  }

  // Create lead synth
  const createLead = (frequency, duration = 0.3, delay = 0, intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime + delay

    const leadOsc = audioContext.createOscillator()
    const leadGain = audioContext.createGain()
    const leadFilter = audioContext.createBiquadFilter()
    const dryGain = audioContext.createGain()
    const wetGain = audioContext.createGain()

    leadOsc.type = "square"
    leadOsc.frequency.setValueAtTime(frequency, currentTime)

    leadFilter.type = "lowpass"
    leadFilter.frequency.setValueAtTime(2000, currentTime)
    leadFilter.Q.setValueAtTime(2, currentTime)

    leadGain.gain.setValueAtTime(0, currentTime)
    leadGain.gain.linearRampToValueAtTime(0.2 * intensity, currentTime + 0.02)
    leadGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration)

    // Good amount of reverb for leads
    dryGain.gain.setValueAtTime(0.6, currentTime)
    wetGain.gain.setValueAtTime(0.4, currentTime)

    leadOsc.connect(leadFilter)
    leadFilter.connect(leadGain)

    leadGain.connect(dryGain)
    leadGain.connect(wetGain)

    dryGain.connect(gainNodeRef.current!)
    if (synthReverbRef.current) {
      wetGain.connect(synthReverbRef.current)
    }

    leadOsc.start(currentTime)
    leadOsc.stop(currentTime + duration)

    oscillatorsRef.current.push(leadOsc)
  }

  // Create ambient pad
  const createPad = (frequencies, duration = 3.5, intensity = 1) => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlaying) return

    const audioContext = audioContextRef.current
    const currentTime = audioContext.currentTime

    frequencies.forEach((frequency, index) => {
      const padOsc = audioContext.createOscillator()
      const padGain = audioContext.createGain()
      const padFilter = audioContext.createBiquadFilter()
      const dryGain = audioContext.createGain()
      const wetGain = audioContext.createGain()

      padOsc.type = "sine"
      padOsc.frequency.setValueAtTime(frequency, currentTime)

      padFilter.type = "lowpass"
      padFilter.frequency.setValueAtTime(1500, currentTime)
      padFilter.Q.setValueAtTime(0.5, currentTime)

      padGain.gain.setValueAtTime(0, currentTime)
      padGain.gain.linearRampToValueAtTime(0.1 * intensity, currentTime + 1.5)
      padGain.gain.linearRampToValueAtTime(0.08 * intensity, currentTime + duration - 1)
      padGain.gain.linearRampToValueAtTime(0, currentTime + duration)

      // Lots of reverb for pads to create atmosphere
      dryGain.gain.setValueAtTime(0.4, currentTime)
      wetGain.gain.setValueAtTime(0.6, currentTime)

      padOsc.connect(padFilter)
      padFilter.connect(padGain)

      padGain.connect(dryGain)
      padGain.connect(wetGain)

      dryGain.connect(gainNodeRef.current!)
      if (padReverbRef.current) {
        wetGain.connect(padReverbRef.current)
      }

      padOsc.start(currentTime)
      padOsc.stop(currentTime + duration)

      oscillatorsRef.current.push(padOsc)
    })
  }

  // Create reverb effect
  const createReverb = (roomSize = 0.5, decay = 2) => {
    if (!audioContextRef.current) return null

    const audioContext = audioContextRef.current
    const convolver = audioContext.createConvolver()

    // Create impulse response for reverb
    const length = audioContext.sampleRate * decay
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        const n = length - i
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, roomSize * 3)
      }
    }

    convolver.buffer = impulse
    return convolver
  }

  // Create unique song structure
  const createUniqueTrack = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    // Song sections with different characteristics
    const sections = [
      { name: "intro", bars: 4, intensity: 0.6 },
      { name: "verse", bars: 8, intensity: 0.8 },
      { name: "buildup", bars: 4, intensity: 1.0 },
      { name: "drop", bars: 8, intensity: 1.2 },
      { name: "breakdown", bars: 4, intensity: 0.7 },
      { name: "outro", bars: 4, intensity: 0.5 },
    ]

    // Chord progressions for different sections
    const chordProgressions = {
      intro: [
        [261.63, 329.63, 392.0], // C major
        [220.0, 261.63, 329.63], // A minor
      ],
      verse: [
        [261.63, 329.63, 392.0], // C major
        [220.0, 261.63, 329.63], // A minor
        [174.61, 220.0, 261.63], // F major
        [196.0, 246.94, 293.66], // G major
      ],
      buildup: [
        [164.81, 196.0, 246.94], // E minor
        [146.83, 174.61, 220.0], // D minor
        [196.0, 246.94, 293.66], // G major
        [261.63, 329.63, 392.0], // C major
      ],
      drop: [
        [130.81, 164.81, 196.0], // C major (lower octave)
        [110.0, 130.81, 164.81], // A minor (lower octave)
        [87.31, 110.0, 130.81], // F major (lower octave)
        [98.0, 123.47, 146.83], // G major (lower octave)
      ],
      breakdown: [
        [523.25, 659.25, 783.99], // C major (higher octave)
        [440.0, 523.25, 659.25], // A minor (higher octave)
      ],
      outro: [
        [261.63, 329.63, 392.0], // C major
        [220.0, 261.63, 329.63], // A minor
      ],
    }

    // Bass patterns
    const bassPatterns = {
      intro: [130.81, 110.0],
      verse: [130.81, 110.0, 87.31, 98.0],
      buildup: [82.41, 73.42, 98.0, 130.81],
      drop: [65.41, 55.0, 43.65, 49.0],
      breakdown: [261.63, 220.0],
      outro: [130.81, 110.0],
    }

    let currentBar = 0
    let sectionIndex = 0
    let currentSectionBar = 0
    const barDuration = 1750 // 1.75 seconds per bar (faster tempo)
    const beatDuration = barDuration / 4 // 437.5ms per beat

    const playBar = () => {
      if (!isPlaying) return

      const section = sections[sectionIndex]
      const chords = chordProgressions[section.name]
      const bassNotes = bassPatterns[section.name]
      const intensity = section.intensity

      setCurrentSection(sectionIndex)

      // Get current chord and bass note
      const chordIndex = currentSectionBar % chords.length
      const bassIndex = currentSectionBar % bassNotes.length
      const currentChord = chords[chordIndex]
      const currentBass = bassNotes[bassIndex]

      // Play ambient pad
      createPad(currentChord, barDuration / 1000, intensity * 0.8)

      // Create beat pattern based on section
      setTimeout(() => {
        // Beat 1 - Kick
        createKick(intensity)
        if (section.name === "drop" || section.name === "buildup") {
          createBass(currentBass, 0.4, intensity)
        }
      }, 0)

      setTimeout(() => {
        // Beat 1.5 - Hi-hat (off-beat)
        if (section.name !== "intro") {
          createHiHat(false, intensity * 0.6)
        }
      }, beatDuration * 0.5)

      setTimeout(() => {
        // Beat 2 - Snare
        if (section.name !== "intro") {
          createSnare(intensity * 0.8)
        }
        // Lead melody on certain sections
        if (section.name === "verse" || section.name === "drop") {
          const leadNote = currentChord[Math.floor(Math.random() * currentChord.length)] * 2
          createLead(leadNote, 0.3, 0, intensity * 0.7)
        }
      }, beatDuration)

      setTimeout(() => {
        // Beat 2.5 - Hi-hat
        createHiHat(false, intensity * 0.4)
      }, beatDuration * 1.5)

      setTimeout(() => {
        // Beat 3 - Kick (sometimes)
        if (section.name === "drop" || (section.name === "verse" && currentSectionBar % 2 === 1)) {
          createKick(intensity * 0.8)
        }
        // Bass on beat 3 for drop section
        if (section.name === "drop") {
          createBass(currentBass * 1.5, 0.3, intensity * 0.8)
        }
      }, beatDuration * 2)

      setTimeout(() => {
        // Beat 3.5 - Hi-hat
        createHiHat(false, intensity * 0.5)
      }, beatDuration * 2.5)

      setTimeout(() => {
        // Beat 4 - Snare (sometimes) or open hi-hat
        if (section.name === "buildup" && currentSectionBar === section.bars - 1) {
          // Build-up fill
          createSnare(intensity)
          setTimeout(() => createSnare(intensity * 0.8), 100)
          setTimeout(() => createSnare(intensity * 0.6), 200)
        } else if (section.name === "drop") {
          createHiHat(true, intensity * 0.6) // Open hi-hat
        }
      }, beatDuration * 3)

      setTimeout(() => {
        // Beat 4.5 - Hi-hat
        if (section.name === "drop" || section.name === "verse") {
          createHiHat(false, intensity * 0.3)
        }
      }, beatDuration * 3.5)

      // Advance to next bar
      currentBar++
      currentSectionBar++

      // Check if we need to move to next section
      if (currentSectionBar >= section.bars) {
        sectionIndex = (sectionIndex + 1) % sections.length
        currentSectionBar = 0
      }
    }

    // Start the beat loop
    const startBeatLoop = () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
      }

      // Play first bar immediately
      playBar()

      beatIntervalRef.current = setInterval(() => {
        if (isPlaying) {
          playBar()
        }
      }, barDuration)
    }

    startBeatLoop()
  }

  const initializeAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    if (!gainNodeRef.current) {
      const mainGain = audioContextRef.current.createGain()
      mainGain.gain.setValueAtTime(1.2, audioContextRef.current.currentTime) // Increased from 0.4 to 1.2
      mainGain.connect(audioContextRef.current.destination)
      gainNodeRef.current = mainGain

      // Create reverb nodes
      kickReverbRef.current = createReverb(0.3, 1.2) // Short, tight reverb for kick
      snareReverbRef.current = createReverb(0.6, 1.8) // Medium reverb for snare
      hihatReverbRef.current = createReverb(0.8, 0.8) // Bright, short reverb for hi-hats
      synthReverbRef.current = createReverb(0.7, 2.5) // Lush reverb for synths
      padReverbRef.current = createReverb(0.9, 3.5) // Long, spacious reverb for pads

      // Connect reverbs to main output
      if (kickReverbRef.current) kickReverbRef.current.connect(mainGain)
      if (snareReverbRef.current) snareReverbRef.current.connect(mainGain)
      if (hihatReverbRef.current) hihatReverbRef.current.connect(mainGain)
      if (synthReverbRef.current) synthReverbRef.current.connect(mainGain)
      if (padReverbRef.current) padReverbRef.current.connect(mainGain)
    }
  }

  const startMusic = () => {
    initializeAudio()
    setIsPlaying(true)
    setCurrentSection(0)
    createUniqueTrack()
  }

  const stopMusic = () => {
    setIsPlaying(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current)
      beatIntervalRef.current = null
    }

    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = []
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  const toggleMute = () => {
    if (gainNodeRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(1.2, audioContextRef.current!.currentTime) // Increased from 0.4 to 1.2
        setIsMuted(false)
      } else {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current!.currentTime)
        setIsMuted(true)
      }
    }
  }

  // Handle user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      if (autoPlay) {
        setTimeout(() => {
          startMusic()
        }, 1000)
      }
    }

    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("keydown", handleFirstInteraction, { once: true })
    document.addEventListener("touchstart", handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [autoPlay])

  useEffect(() => {
    if (isPlaying && hasInteracted) {
      createUniqueTrack()
    }
  }, [isPlaying, hasInteracted])

  useEffect(() => {
    return () => {
      stopMusic()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const sectionNames = ["Intro", "Verse", "Build", "Drop", "Break", "Outro"]

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex gap-1">
                <div className="w-1.5 h-5 bg-white rounded-full" />
                <div className="w-1.5 h-5 bg-white rounded-full" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-0 h-0 border-l-5 border-l-white border-y-3 border-y-transparent ml-1"
              />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          {/* Advanced Audio visualizer */}
          <div className="flex items-center gap-1 px-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 rounded-full ${
                  i < 2 ? "bg-red-400" : i < 4 ? "bg-yellow-400" : i < 6 ? "bg-green-400" : "bg-blue-400"
                }`}
                animate={
                  isPlaying
                    ? {
                        height: [8, Math.random() * 20 + 10, Math.random() * 15 + 8, Math.random() * 25 + 12, 8],
                      }
                    : { height: 8 }
                }
                transition={{
                  duration: 0.4375, // Match beat duration
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Section indicator */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-white/80 px-3 py-1 bg-white/10 rounded-full border border-white/20"
            >
              {sectionNames[currentSection]}
            </motion.div>
          )}

          {/* Status indicator */}
          {!hasInteracted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/70 px-2">
              Click to enable audio
            </motion.div>
          )}

          {isPlaying && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/70 px-2">
              🎵 Unique Track
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
