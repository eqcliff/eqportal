"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { SkipBack, Rewind, ChevronLeft, Pause, Play, ChevronRight, FastForward } from "lucide-react"
import { useTimeInterval } from "../../context/TimeIntervalContext"

interface TimeControllerProps {
  interval: string
  bindingInterval?: string
  onFirstInterval?: () => void
  onPreviousInterval?: () => void
  onPrevious?: () => void
  onPlayPause?: () => void
  onNext?: () => void
  onNextInterval?: () => void
  onLastInterval?: () => void
  TOTAL_INTERVALS?: number
  formatInterval?: (interval: number) => string
  handleIntervalChange?: (interval: number) => void
}

export default function TimeController({
  interval,
  bindingInterval = "HE2 [01:00, 02:00]",
  onFirstInterval,
  onPreviousInterval,
  onPrevious,
  onPlayPause,
  onNext,
  onNextInterval,
  onLastInterval,
  TOTAL_INTERVALS = 10,
  formatInterval = (interval: number) => `Interval ${interval + 1}`,
  handleIntervalChange = (interval: number) => {
    console.log("Interval changed to:", interval)
  },
}: TimeControllerProps) {
  const { currentInterval, setCurrentInterval } = useTimeInterval()
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>("pause")
  const [playDirection, setPlayDirection] = useState<number>(1)

  const togglePlay = (direction: number) => {
    setIsPlaying(!isPlaying)
    setPlayDirection(direction)
    onPlayPause?.()
  }

  const restart = () => {
    setCurrentInterval(1)
    setIsPlaying(false)
    setPlayDirection(1)
  }

  return (
    <div className="flex items-center justify-center w-full bg-[#2a2b36] p-4 rounded-lg mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              restart()
              setActiveButton("restart")
            }}
            disabled={currentInterval === 1}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50 ${
              activeButton === "restart" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              togglePlay(-1)
              setActiveButton("rewind")
            }}
            disabled={currentInterval === 1}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50 ${
              activeButton === "rewind" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <Rewind className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentInterval(Math.max(1, currentInterval - 1))}
            disabled={currentInterval <= 1}
            className="bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsPlaying(false)
              setActiveButton("pause")
            }}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] ${
              activeButton === "pause" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <Pause className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              togglePlay(1)
              setActiveButton("play")
            }}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] ${
              activeButton === "play" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentInterval(currentInterval + 1)}
            className="bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-[#fcfcfc] font-medium">
          <span>Current {interval} Interval:</span>
          <span>{currentInterval}</span>
        </div>
      </div>
    </div>
  )
}