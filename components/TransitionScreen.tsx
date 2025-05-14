"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TransitionScreen() {
    const [showFourthScreen, setShowFourthScreen] = useState(false)

    useEffect(() => {
        // After 2.5 seconds, show the fourth screen
        const timer = setTimeout(() => {
            setShowFourthScreen(true)
        }, 2500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden bg-blue-900">
            <AnimatePresence>
                {!showFourthScreen ? (
                    <motion.div
                        key="third-screen"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img src="/third-screen.png" alt="ValuuHub Services" className="w-full h-full object-contain" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="fourth-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img src="/fourth-screen.png" alt="ValuuHub Services Details" className="w-full h-full object-contain" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
