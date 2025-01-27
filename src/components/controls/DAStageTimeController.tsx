import React, { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, SkipBack, Pause } from "lucide-react"
import { useTimeInterval } from "../../context/TimeIntervalContext"
import { Button } from "../ui/button"

const TOTAL_INTERVALS = 24 // 24 hours

export default function DAStageTimeController() {
  const { currentInterval, setCurrentInterval } = useTimeInterval()
  const [isPlaying, setIsPlaying] = useState(false)
  const [playDirection, setPlayDirection] = useState<1 | -1>(1) // 1 for forward, -1 for backward
  const [activeButton, setActiveButton] = useState<string | null>("pause")
  const [lastFrameReached, setLastFrameReached] = useState(false)
  const [isRewindActive, setIsRewindActive] = useState(false)

  const formatInterval = (interval: number) => {
    if (typeof interval !== "number") {
      console.error("Error: interval is not a number:", interval)
      return "Invalid Interval"
    }

    const start = `${(interval - 1).toString().padStart(2, "0")}:00`
    const end = interval === 24 ? "24:00" : `${(interval % 24).toString().padStart(2, "0")}:00`
    return `HE${interval.toString().padStart(2, "0")}  [${start} - ${end}]`
  }

  const handleIntervalChange = useCallback(
    (newInterval: number) => {
      const updatedInterval = Math.max(1, Math.min(TOTAL_INTERVALS, newInterval))
      setCurrentInterval(updatedInterval)

      if (updatedInterval === 1 && playDirection === -1) {
        setIsPlaying(false)
        setPlayDirection(1)
        setActiveButton("pause")
      }
    },
    [setCurrentInterval, playDirection]
  )

  const togglePlay = useCallback((direction: 1 | -1) => {
    setIsPlaying((prev) => !prev)
    setPlayDirection(direction)
    setActiveButton(direction === 1 ? "play" : "rewind")
    setIsRewindActive(direction === -1)
  }, [])

  const restart = useCallback(() => {
    handleIntervalChange(1)
    setIsPlaying(false)
    setPlayDirection(1)
  }, [handleIntervalChange])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isPlaying) {
      intervalId = setInterval(() => {
        if ((currentInterval === 24 && playDirection === 1) || (currentInterval === 1 && playDirection === -1)) {
          setIsPlaying(false)
          setActiveButton("pause")
        } else {
          handleIntervalChange(currentInterval + playDirection)
        }
      }, 1000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, currentInterval, playDirection, handleIntervalChange])

  return (
    <div className="flex items-center justify-center w-full bg-[#202229] p-4 rounded-lg mt-4 mb-0">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              restart()
              setActiveButton("restart")
            }}
            disabled={currentInterval === 1 || isRewindActive}
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
              setIsPlaying(false)
              setActiveButton("pause")
              handleIntervalChange(currentInterval - 1)
            }}
            disabled={currentInterval <= 1 || isRewindActive}
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
              setIsPlaying(false)
              setActiveButton("pause")
              handleIntervalChange(currentInterval + 1)
            }}
            disabled={currentInterval >= TOTAL_INTERVALS || activeButton === "skip-forward"}
            className="bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => togglePlay(1)}
            disabled={currentInterval >= TOTAL_INTERVALS}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] ${
              activeButton === "play" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              handleIntervalChange(TOTAL_INTERVALS)
              setActiveButton("skip-forward")
              setLastFrameReached(true)
            }}
            disabled={currentInterval === TOTAL_INTERVALS}
            className={`bg-[#3f3f4d] text-[#fcfcfc] border-[#3f3f4d] hover:bg-[#ecde65] hover:text-[#121212] disabled:opacity-50 ${
              activeButton === "skip-forward" ? "bg-[#14c8b1] text-[#121212]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polygon points="6 4 16 12 6 20 6 4" />
              <line x1="18" y1="4" x2="18" y2="20" />
            </svg>
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-[#fcfcfc] font-medium h-10 w-48 bg-[#3e3e4b] rounded-md justify-center py-1">
          <span>{formatInterval(currentInterval)}</span>
        </div>
      </div>
    </div>
  )
}