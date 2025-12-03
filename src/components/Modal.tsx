import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    message: string
    actionLabel?: string
    onAction?: () => void
}

export function Modal({
    isOpen,
    onClose,
    title,
    message,
    actionLabel,
    onAction,
}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 max-w-sm w-full text-center relative overflow-hidden"
                        >
                            {/* Decorative background gradient */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-coffee-100/50 to-transparent -z-10" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-coffee-400 hover:text-coffee-700 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold text-coffee-900 mb-3">
                                {title}
                            </h2>
                            <p className="text-coffee-700 mb-8 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex gap-3 justify-center">
                                {actionLabel && onAction && (
                                    <button
                                        onClick={() => {
                                            onAction()
                                            onClose()
                                        }}
                                        className="px-6 py-3 bg-coffee-600 text-white rounded-xl font-semibold shadow-lg shadow-coffee-600/20 hover:bg-coffee-700 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        {actionLabel}
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-coffee-100 text-coffee-800 rounded-xl font-semibold hover:bg-coffee-200 transition-colors"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
