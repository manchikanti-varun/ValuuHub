"use client"
import { motion } from "framer-motion"
import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface MobileTransitionScreenProps {
    isAnimating: boolean
    spherePosition: { x: number; y: number }
    onAnimationComplete: () => void
}

const MobileTransitionScreen: React.FC<MobileTransitionScreenProps> = ({
    isAnimating,
    spherePosition,
    onAnimationComplete,
}) => {
    const [animationPhase, setAnimationPhase] = useState(0)
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    const exitingRef = useRef(false)

    useEffect(() => {
        if (isAnimating && !exitingRef.current) {
            // Set all timeouts and store references
            timeoutsRef.current.push(setTimeout(() => setAnimationPhase(1), 500))
            timeoutsRef.current.push(setTimeout(() => setAnimationPhase(2), 1500))
            timeoutsRef.current.push(setTimeout(() => setAnimationPhase(3), 2500))
            timeoutsRef.current.push(setTimeout(() => setAnimationPhase(4), 4000))
            timeoutsRef.current.push(setTimeout(() => onAnimationComplete(), 14000))

            return () => {
                timeoutsRef.current.forEach(clearTimeout)
                timeoutsRef.current = []
            }
        }
    }, [isAnimating, onAnimationComplete])

    const handleClose = () => {
        // Mark as exiting to prevent new timeouts
        exitingRef.current = true

        // Clear all timeouts and stop automatic transition
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []

        // Set to final phase to trigger the sphere expansion
        setAnimationPhase(4)

        // Add a delay before calling onAnimationComplete to allow exit animation to play
        setTimeout(() => {
            onAnimationComplete()
        }, 800)
    }

    if (!isAnimating) return null

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >

            {/* Expanding sphere */}
            <motion.div
                className="absolute rounded-full z-10"
                style={{
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(129, 158, 217, 0.8) 50%, rgba(4, 76, 217, 0.6))",
                    boxShadow: "0 0 60px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.4)",
                    left: spherePosition.x,
                    top: spherePosition.y,
                    x: "-50%",
                    y: "-50%",
                }}
                initial={{
                    width: 120,
                    height: 120,
                    opacity: 0,
                }}
                animate={{
                    width: animationPhase >= 4 ? "200vw" : 120,
                    height: animationPhase >= 4 ? "200vh" : 120,
                    opacity: 1,
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                }}
            />

            {/* Text reveal */}
            <motion.div
                className="relative z-20 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: animationPhase >= 2 ? 1 : 0,
                    scale: animationPhase >= 2 ? 1 : 0.8,
                }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2
                    className="text-4xl font-bold mb-4 text-blue-900"
                    style={{
                        fontFamily: "bankGothic, Impact, sans-serif",
                        letterSpacing: "0.1em",
                    }}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    CONNECTING
                </motion.h2>
                <motion.p
                    className="text-lg text-blue-800 mb-6"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Building your digital presence...
                </motion.p>

                {/* Services image reveal */}
                <motion.div
                    className="relative w-64 h-64 mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: animationPhase >= 3 ? 1 : 0,
                        y: animationPhase >= 3 ? 0 : 30,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Image src="/orbit-services-black.png" alt="Orbit Services" fill className="object-contain" priority />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default MobileTransitionScreen
