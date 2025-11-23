import { Coffee } from 'lucide-react'
import { motion } from 'motion/react'

interface SessionTrackerProps {
    completedSessions: number
    totalSessions: number
}

export function SessionTracker({
    completedSessions,
    totalSessions,
}: SessionTrackerProps) {
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white/80 rounded-xl shadow-sm">
            <h3 className="text-coffee-900 font-medium">Daily Progress</h3>
            <div className="flex gap-3">
                {Array.from({ length: totalSessions }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Coffee
                            size={28}
                            className={`${
                                index < completedSessions
                                    ? 'text-coffee-600 fill-coffee-600'
                                    : 'text-coffee-200 fill-none'
                            } transition-all duration-300`}
                            strokeWidth={2}
                        />
                    </motion.div>
                ))}
            </div>
            <p className="text-sm text-coffee-700">
                {completedSessions} of {totalSessions} sessions completed
            </p>
        </div>
    )
}
