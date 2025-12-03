import { motion } from 'motion/react'

interface CoffeeCupProps {
    fillPercentage: number
    isBreak: boolean
    isRunning: boolean
}

export function CoffeeCup({
    fillPercentage,
    isBreak,
    isRunning,
}: CoffeeCupProps) {
    // Calculate the height of the liquid based on fill percentage
    // The cup inner height is roughly 150px (from y=64 to y=214)
    // We want it to fill from the bottom (214) upwards
    const maxLiquidHeight = 150
    const currentHeight = (fillPercentage / 100) * maxLiquidHeight
    const liquidY = 214 - currentHeight

    return (
        <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64">
                <svg
                    viewBox="0 0 240 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xl"
                >
                    {/* Steam animations */}
                    {fillPercentage < 100 && isRunning && !isBreak && (
                        <>
                            <motion.path
                                d="M100 40 L100 20"
                                stroke="#dcc8b5"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: [0, 0.6, 0], y: -20 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                    delay: 0,
                                }}
                            />
                            <motion.path
                                d="M120 35 L120 15"
                                stroke="#dcc8b5"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: [0, 0.6, 0], y: -20 }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                    delay: 0.5,
                                }}
                            />
                            <motion.path
                                d="M140 40 L140 20"
                                stroke="#dcc8b5"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: [0, 0.6, 0], y: -20 }}
                                transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                    delay: 1,
                                }}
                            />
                        </>
                    )}

                    {/* Cup Handle */}
                    <path
                        d="M190 80 H200 C216.569 80 230 93.4315 230 110 V130 C230 146.569 216.569 160 200 160 H190"
                        stroke="#3d2f24"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Cup Body Background (Empty) */}
                    <path
                        d="M40 60 H200 V140 C200 184.183 164.183 220 120 220 C75.8172 220 40 184.183 40 140 V60 Z"
                        fill="#f5f0ea"
                        stroke="#3d2f24"
                        strokeWidth="12"
                        strokeLinejoin="round"
                    />

                    {/* Liquid Mask */}
                    <defs>
                        <clipPath id="liquidMask">
                            <path d="M46 66 H194 V140 C194 180.869 160.869 214 120 214 C79.1309 214 46 180.869 46 140 V66 Z" />
                        </clipPath>
                    </defs>

                    {/* Liquid */}
                    <g clipPath="url(#liquidMask)">
                        <motion.rect
                            x="0"
                            y={liquidY}
                            width="240"
                            height={currentHeight + 20} // Add extra to ensure bottom coverage
                            fill={isBreak ? '#eebb99' : '#6b5444'}
                            initial={false}
                            animate={{
                                y: liquidY,
                                height: currentHeight + 20,
                                fill: isBreak ? '#eebb99' : '#6b5444',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 50,
                                damping: 20,
                            }}
                        />

                        {/* Liquid Surface (Wavy) */}
                        <motion.path
                            d={`M0 ${liquidY} Q 60 ${
                                liquidY - 5
                            } 120 ${liquidY} T 240 ${liquidY} V 240 H 0 Z`}
                            fill={isBreak ? '#eebb99' : '#6b5444'}
                            initial={false}
                            animate={{
                                d: `M0 ${liquidY} Q 60 ${
                                    liquidY - 5
                                } 120 ${liquidY} T 240 ${liquidY} V 240 H 0 Z`,
                                fill: isBreak ? '#eebb99' : '#6b5444',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 50,
                                damping: 20,
                            }}
                        />
                    </g>

                    {/* Cup Rim (Front) */}
                    <path
                        d="M40 60 H200"
                        stroke="#3d2f24"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    )
}
