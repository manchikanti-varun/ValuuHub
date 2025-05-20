"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileTransitionScreen({
    isAnimating = false,
    spherePosition = { x: 0, y: 0 },
    onAnimationComplete = () => { },
}) {
    const [showFourthScreen, setShowFourthScreen] = useState(false)
    const [showTeam, setShowTeam] = useState(false)
    const [sphereArrived, setSphereArrived] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const orbitRef = useRef<HTMLDivElement>(null)
    const sphereRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Show the orbit services image after a delay
        const timer = setTimeout(() => {
            setShowFourthScreen(true)
        }, 3500)

        // Start animation sequence if isAnimating is true
        if (isAnimating) {
            // Mark as arrived after animation completes
            const arrivalTimer = setTimeout(() => {
                setSphereArrived(true)

                // Notify parent component that animation is complete
                setTimeout(() => {
                    onAnimationComplete()
                }, 500) // Give a little time for the arrival animation to play
            }, 3500)

            return () => {
                clearTimeout(arrivalTimer)
            }
        }

        const handleScroll = () => {
            if (containerRef.current) {
                const scrollPosition = window.scrollY
                const windowHeight = window.innerHeight

                if (scrollPosition > windowHeight * 0.3) {
                    setShowTeam(true)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            clearTimeout(timer)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isAnimating, onAnimationComplete])

    // Calculate the center of the screen and orbit
    // For mobile, adjust the target position to be 20% above the center
    const screenCenterY = typeof window !== "undefined" ? window.innerHeight / 2 : 0
    const targetPositionY = typeof window !== "undefined" ? screenCenterY - window.innerHeight * 0.2 : 0
    const screenCenterX = typeof window !== "undefined" ? window.innerWidth / 2 : 0

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
            {/* Animated sphere */}
            {isAnimating && !sphereArrived && (
                <>
                    {/* Vertical guide line - thinner for mobile */}
                    <motion.div
                        className="fixed z-40 pointer-events-none"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 0.6, height: targetPositionY - spherePosition.y }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            top: spherePosition.y,
                            left: "50%",
                            width: "2px",
                            background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
                            transformOrigin: "top",
                            marginLeft: "-1px",
                        }}
                    />

                    {/* Traveling sphere that shrinks as it descends - smaller for mobile */}
                    <motion.div
                        ref={sphereRef}
                        className="fixed z-50 pointer-events-none"
                        initial={{
                            top: spherePosition.y,
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            scale: 1,
                            opacity: 1,
                        }}
                        animate={{
                            top: targetPositionY + 100,
                            scale: [1, 0.9, 0.8, 0.7, 0.6, 0.5],
                            opacity: 1,
                            filter: [
                                "brightness(1.7) drop-shadow(0 0 40px rgba(255,255,255,1))",
                                "brightness(1.6) drop-shadow(0 0 35px rgba(255,255,255,0.95))",
                                "brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.9))",
                                "brightness(1.4) drop-shadow(0 0 25px rgba(255,255,255,0.85))",
                                "brightness(1.3) drop-shadow(0 0 20px rgba(255,255,255,0.8))",
                                "brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.75))",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        }}
                        style={{
                            width: "300px",
                            height: "300px",
                            position: "fixed",
                        }}
                    >
                        <img src="./Frame 78.png" alt="Traveling Sphere" className="w-full h-full object-contain" />
                    </motion.div>

                    {/* Glow trail - narrower for mobile */}
                    <motion.div
                        className="fixed z-40 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.4, 0.2, 0] }}
                        transition={{ duration: 3, times: [0, 0.2, 0.4, 0.7, 1] }}
                        style={{
                            position: "fixed",
                            top: spherePosition.y,
                            left: "50%",
                            width: "80px",
                            height: targetPositionY + 100 - spherePosition.y,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0))",
                            borderRadius: "40px",
                            marginLeft: "-40px",
                        }}
                    />

                    {/* Destination indicator - smaller for mobile */}
                    <motion.div
                        className="fixed z-40 pointer-events-none"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0.5, 0.7, 0.5],
                            scale: [0, 1, 0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 2.5,
                            times: [0, 0.25, 0.5, 0.75, 1],
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                        style={{
                            position: "fixed",
                            top: targetPositionY + 100,
                            left: "50%",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "2px dashed white",
                            marginLeft: "-25px",
                            marginTop: "-25px",
                        }}
                    />
                </>
            )}

            <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#044CD9" }}>
                <AnimatePresence>
                    {!showFourthScreen ? (
                        <motion.div
                            key="third-screen"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* Mobile-optimized orbit image */}
                            <img src="/orbit.png" alt="ValuuHub Services" className="w-full h-full object-contain px-4" />
                        </motion.div>
                    ) : (
                        <motion.div
                            ref={orbitRef}
                            key="fourth-screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                            id="orbit-center"
                        >
                            {/* Center sphere that appears when the hero sphere "arrives" - smaller for mobile */}
                            {sphereArrived && (
                                <motion.div
                                    className="absolute z-40 flex items-center justify-center"
                                    initial={{ scale: 0.5, opacity: 0.75 }}
                                    animate={{
                                        scale: 0.5,
                                        opacity: [0.75, 0.85, 0.95, 1, 0.95, 0.85, 0.75],
                                        filter: [
                                            "brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.75))",
                                            "brightness(1.4) drop-shadow(0 0 20px rgba(255,255,255,0.85))",
                                            "brightness(1.6) drop-shadow(0 0 25px rgba(255,255,255,0.95))",
                                            "brightness(1.8) drop-shadow(0 0 30px rgba(255,255,255,1))",
                                            "brightness(1.6) drop-shadow(0 0 25px rgba(255,255,255,0.95))",
                                            "brightness(1.4) drop-shadow(0 0 20px rgba(255,255,255,0.85))",
                                            "brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.75))",
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                    style={{
                                        top: targetPositionY + 120,
                                        left: "50%",
                                        x: "-50%",
                                        y: "-50%",
                                        position: "absolute",
                                    }}
                                >
                                    <img src="./Frame 78.png" alt="Center Sphere" className="w-[300px] h-[300px] object-contain" />
                                </motion.div>
                            )}

                            {/* Orbit activation effect - smaller for mobile */}
                            {sphereArrived && (
                                <motion.div
                                    className="absolute z-30 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 0.8, 0.6, 0.4, 0.2, 0],
                                        scale: [0, 1, 1.5, 2, 2.5, 3],
                                    }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    style={{
                                        top: targetPositionY + 100,
                                        left: "50%",
                                        x: "-50%",
                                        y: "-50%",
                                        position: "absolute",
                                    }}
                                >
                                    <div className="w-48 h-48 rounded-full bg-white opacity-70 shadow-[0_0_20px_10px_rgba(255,255,255,0.6)]" />
                                </motion.div>
                            )}

                            {/* Mobile-optimized orbit services image */}
                            <img
                                src="/orbit-services.png"
                                alt="ValuuHub Services Details"
                                className="w-full h-full object-contain px-4"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
