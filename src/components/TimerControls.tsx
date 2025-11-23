import { Play, Pause, RotateCcw } from 'lucide-react'

interface TimerControlsProps {
    isRunning: boolean
    isBreak: boolean
    onStart: () => void
    onPause: () => void
    onReset: () => void
}

export function TimerControls({
    isRunning,
    isBreak,
    onStart,
    onPause,
    onReset,
}: TimerControlsProps) {
    return (
        <div className="flex gap-4 justify-center items-center w-full">
            {!isRunning ? (
                <button
                    onClick={onStart}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-coffee-600 text-white rounded-2xl hover:bg-coffee-700 active:scale-95 transition-all shadow-lg hover:shadow-coffee-600/30 font-semibold text-lg tracking-wide border-2 border-transparent group"
                >
                    <Play
                        size={22}
                        fill="currentColor"
                        className="group-hover:scale-110 transition-transform"
                    />
                    {isBreak ? 'Start Break' : 'Start Brewing'}
                </button>
            ) : (
                <button
                    onClick={onPause}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-coffee-100 text-coffee-900 rounded-2xl hover:bg-coffee-200 active:scale-95 transition-all shadow-md hover:shadow-lg font-semibold text-lg tracking-wide border-2 border-coffee-200 group"
                >
                    <Pause
                        size={22}
                        fill="currentColor"
                        className="group-hover:scale-110 transition-transform"
                    />
                    Pause
                </button>
            )}
            <button
                onClick={onReset}
                className="flex items-center justify-center p-4 bg-white text-coffee-700 rounded-2xl hover:bg-coffee-50 active:scale-95 transition-all shadow-md hover:shadow-lg border-2 border-coffee-100 group"
                aria-label="Reset Timer"
            >
                <RotateCcw
                    size={22}
                    className="group-hover:-rotate-90 transition-transform duration-500"
                />
            </button>
        </div>
    )
}
