import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const FOCUS_TIME = 25 * 60
    const BREAK_TIME = 5 * 60

    const [isActive, setIsActive] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(FOCUS_TIME)
    const [mode, setMode] = useState<'focus' | 'break'>('focus')

    useEffect(() => {
        if (!isActive) return

        const interval = setInterval(() => {
            setSeconds((p) => {
                if (p <= 0) {
                    if (mode === 'focus') {
                        setMode('break')
                        playBeep()
                        return BREAK_TIME
                    }

                    if (mode === 'break') {
                        setMode('focus')
                        playBeep()
                        return FOCUS_TIME
                    }
                }
                return p - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [isActive, mode, BREAK_TIME, FOCUS_TIME, seconds])

    const startTimer = () => {
        setIsActive(true)
    }
    const stopTimer = () => {
        setIsActive(false)
    }
    const resetTimer = () => {
        setIsActive(false)
        setSeconds(FOCUS_TIME)
        setMode('focus')
    }

    function playBeep() {
        const ctx = new window.AudioContext()
        const oscillator = ctx.createOscillator()
        const gain = ctx.createGain()

        oscillator.type = 'sine' // can be 'square', 'triangle', etc.
        oscillator.frequency.setValueAtTime(440, ctx.currentTime) // A4 note
        gain.gain.setValueAtTime(0.1, ctx.currentTime) // volume

        oscillator.connect(gain)
        gain.connect(ctx.destination)

        oscillator.start()
        oscillator.stop(ctx.currentTime + 0.1)
    }

    return (
        <>
            {/* update add a circle loading time */}
            {/* <svg className="progress-ring" width="120" height="120">
                <circle
                    className="progress-ring__track"
                    stroke="#e6e6e6"
                    stroke-width="8"
                    fill="transparent"
                    r="54"
                    cx="60"
                    cy="60"
                />
                <circle
                    className="progress-ring__circle"
                    stroke="#4f46e5"
                    stroke-width="8"
                    fill="transparent"
                    r="54"
                    cx="60"
                    cy="60"
                    stroke-linecap="round"
                    strokeDasharray={339}
                    strokeDashoffset={167}
                />
            </svg> */}

            <div style={{ fontSize: '4rem' }}>{`${String(
                Math.floor(seconds / 60)
            ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`}</div>

            <div
                className="loading-track"
                style={{
                    background: 'black',
                    opacity: 0.2,
                    height: 40,
                    width: 200,
                    marginBottom: 24,
                }}
            >
                {mode == 'focus' ? (
                    <div
                        className="loading-inner"
                        style={{
                            width: `${
                                ((FOCUS_TIME - seconds) / FOCUS_TIME) * 100
                            }%`,
                            background: 'lightblue',
                            height: '100%',
                        }}
                    />
                ) : (
                    <div
                        className="loading-inner"
                        style={{
                            width: `${(seconds / BREAK_TIME) * 100}%`,

                            background: 'green',
                            height: '100%',
                        }}
                    />
                )}
            </div>

            {!isActive ? (
                <button onClick={startTimer}>Start</button>
            ) : (
                <button onClick={stopTimer}>Stop</button>
            )}

            <button onClick={resetTimer}>Reset</button>

            {/* Add Options for custom work time i.e 10m 15m 20m */}
        </>
    )
}

export default App
