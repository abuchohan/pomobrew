import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { CoffeeCup } from './components/CoffeeCup.tsx'
import { SessionTracker } from './components/SessionTracker.tsx'
import { TimerControls } from './components/TimerControls.tsx'

const WORK_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds
const TOTAL_SESSIONS = 4

export default function App() {
    const [timeLeft, setTimeLeft] = useState(WORK_TIME)
    const [isRunning, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [completedSessions, setCompletedSessions] = useState(0)
    const intervalRef = useRef<number | null>(null)

    const currentDuration = isBreak ? BREAK_TIME : WORK_TIME
    const fillPercentage = isBreak
        ? (timeLeft / currentDuration) * 100 // Drain during break (100% -> 0%)
        : ((currentDuration - timeLeft) / currentDuration) * 100 // Fill during work (0% -> 100%)

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000) // Changed to 1000ms for real seconds
        } else if (timeLeft === 0) {
            // Timer completed
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }

            // Play notification sound or show alert
            const message = !isBreak
                ? 'Focus session complete! Time for a break.'
                : 'Break is over! Time to focus.'

            // Small timeout to allow the UI to update to 00:00 before alerting
            setTimeout(() => {
                alert(message)
            }, 100)

            if (!isBreak) {
                // Work session completed, increment session counter
                setCompletedSessions((prev) =>
                    Math.min(prev + 1, TOTAL_SESSIONS)
                )
                setIsBreak(true)
                setTimeLeft(BREAK_TIME)
            } else {
                // Break completed, start new work session
                setIsBreak(false)
                setTimeLeft(WORK_TIME)
            }

            setIsRunning(false)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, timeLeft, isBreak])

    const handleStart = () => {
        // Request notification permission on first start
        if (Notification.permission === 'default') {
            Notification.requestPermission()
        }
        setIsRunning(true)
    }

    const handlePause = () => {
        setIsRunning(false)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME)
    }

    const handleFullReset = () => {
        setIsRunning(false)
        setIsBreak(false)
        setTimeLeft(WORK_TIME)
        setCompletedSessions(0)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-coffee-50 via-coffee-100 to-coffee-200">
            <div className="max-w-md w-full flex flex-col items-center gap-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-coffee-900 mb-2 tracking-tight">
                        PomoBrew
                    </h1>
                    <p className="text-lg text-coffee-700 font-light">
                        {isBreak ? 'Take a sip & relax' : 'Brewing your focus'}
                    </p>
                </div>

                {/* Coffee Cup Visualization */}
                <div className="relative w-full flex justify-center py-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-coffee-200/50 rounded-full blur-3xl -z-10 transform translate-y-10" />

                    <CoffeeCup
                        fillPercentage={fillPercentage}
                        isBreak={isBreak}
                        isRunning={isRunning}
                    />
                </div>

                {/* Timer Card */}
                <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 flex flex-col items-center gap-6">
                    <div className="text-center">
                        <div className="text-7xl font-bold text-coffee-800 mb-2 font-mono tracking-tighter">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-coffee-600 uppercase tracking-widest text-xs font-bold">
                            {isBreak ? 'Break Time' : 'Focus Session'}
                        </div>
                    </div>

                    <TimerControls
                        isRunning={isRunning}
                        isBreak={isBreak}
                        onStart={handleStart}
                        onPause={handlePause}
                        onReset={handleReset}
                    />
                </div>

                <SessionTracker
                    completedSessions={completedSessions}
                    totalSessions={TOTAL_SESSIONS}
                />

                {/* Reset and completion messages */}
                {completedSessions > 0 && (
                    <div className="text-center">
                        <button
                            onClick={handleFullReset}
                            className="text-sm text-coffee-600 hover:text-coffee-800 underline decoration-coffee-400 underline-offset-4 transition-colors"
                        >
                            Reset All Sessions
                        </button>
                    </div>
                )}

                {completedSessions === TOTAL_SESSIONS && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-coffee-600 text-white text-center rounded-xl shadow-lg font-medium w-full"
                    >
                        🎉 All sessions completed! Time for a fresh brew.
                    </motion.div>
                )}
            </div>
        </div>
    )
}
