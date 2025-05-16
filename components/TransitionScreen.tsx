"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import TeamSection from "./TeamSection"

export default function TransitionScreen({
    isAnimating = false,
    spherePosition = { x: 0, y: 0 },
    onAnimationComplete = () => { },
}) {
    const [showFourthScreen, setShowFourthScreen] = useState(false)
    const [showTeam, setShowTeam] = useState(false)
    const [sphereArrived, setSphereArrived] = useState(false)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const orbitRef = useRef<HTMLDivElement>(null)
    const sphereRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Show the orbit services image after a delay
        const timer = setTimeout(() => {
            setShowFourthScreen(true)
        }, 500)

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
    // Adjust the target position to be 15% above the center, then move down by 38px (approximately 1cm)
    const screenCenterY = typeof window !== "undefined" ? window.innerHeight / 2 : 0
    const targetPositionY = typeof window !== "undefined" ? screenCenterY - window.innerHeight * 0.15 + 38 : 0
    const screenCenterX = typeof window !== "undefined" ? window.innerWidth / 2 : 0

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
            {/* Animated sphere */}
            {isAnimating && !sphereArrived && (
                <>
                    {/* Vertical guide line */}
                    <motion.div
                        className="fixed z-40 pointer-events-none"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 0.6, height: targetPositionY - spherePosition.y }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            top: spherePosition.y,
                            left: "50%",
                            width: "4px",
                            background: "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
                            transformOrigin: "top",
                            marginLeft: "-2px",
                        }}
                    />

                    {/* Traveling sphere that shrinks as it descends */}
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
                            top: targetPositionY,
                            scale: [1, 0.9, 0.8, 0.7, 0.6, 0.5],
                            opacity: 1,
                            filter: [
                                "brightness(1.7) drop-shadow(0 0 60px rgba(255,255,255,1))",
                                "brightness(1.6) drop-shadow(0 0 55px rgba(255,255,255,0.95))",
                                "brightness(1.5) drop-shadow(0 0 50px rgba(255,255,255,0.9))",
                                "brightness(1.4) drop-shadow(0 0 45px rgba(255,255,255,0.85))",
                                "brightness(1.3) drop-shadow(0 0 40px rgba(255,255,255,0.8))",
                                "brightness(1.2) drop-shadow(0 0 35px rgba(255,255,255,0.75))",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        }}
                        style={{
                            width: "800px",
                            height: "800px",
                            position: "fixed",
                        }}
                    >
                        <img src="./Frame 78.png" alt="Traveling Sphere" className="w-full h-full object-contain" />
                    </motion.div>

                    {/* Glow trail */}
                    <motion.div
                        className="fixed z-40 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.4, 0.2, 0] }}
                        transition={{ duration: 3, times: [0, 0.2, 0.4, 0.7, 1] }}
                        style={{
                            position: "fixed",
                            top: spherePosition.y,
                            left: "50%",
                            width: "200px",
                            height: targetPositionY - spherePosition.y,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0))",
                            borderRadius: "100px",
                            marginLeft: "-100px",
                        }}
                    />

                    {/* Destination indicator */}
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
                            top: targetPositionY,
                            left: "50%",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            border: "3px dashed white",
                            marginLeft: "-50px",
                            marginTop: "-50px",
                        }}
                    />
                </>
            )}

            <div
                className="relative w-full h-screen overflow-hidden"
                style={{ background: "linear-gradient(to bottom, #044CD9, #1C67FB)" }}
            >
                <AnimatePresence>
                    {!showFourthScreen ? (
                        <motion.div
                            key="third-screen"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <img src="/orbit.png" alt="ValuuHub Services" className="w-full h-full object-contain" />
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
                            {/* Center sphere that appears when the hero sphere "arrives" */}
                            {sphereArrived && (
                                <motion.div
                                    className="absolute z-40 flex items-center justify-center"
                                    initial={{ scale: 0.5, opacity: 0.75 }}
                                    animate={{
                                        scale: 0.5,
                                        opacity: [0.75, 0.85, 0.95, 1, 0.95, 0.85, 0.75],
                                        filter: [
                                            "brightness(1.2) drop-shadow(0 0 35px rgba(255,255,255,0.75))",
                                            "brightness(1.4) drop-shadow(0 0 40px rgba(255,255,255,0.85))",
                                            "brightness(1.6) drop-shadow(0 0 45px rgba(255,255,255,0.95))",
                                            "brightness(1.8) drop-shadow(0 0 50px rgba(255,255,255,1))",
                                            "brightness(1.6) drop-shadow(0 0 45px rgba(255,255,255,0.95))",
                                            "brightness(1.4) drop-shadow(0 0 40px rgba(255,255,255,0.85))",
                                            "brightness(1.2) drop-shadow(0 0 35px rgba(255,255,255,0.75))",
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                    style={{
                                        top: targetPositionY,
                                        left: "50%",
                                        x: "-50%",
                                        y: "-50%",
                                        position: "absolute",
                                    }}
                                >
                                    <img src="./Frame 78.png" alt="Center Sphere" className="w-[800px] h-[800px] object-contain" />
                                </motion.div>
                            )}

                            {/* Orbit activation effect */}
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
                                        top: targetPositionY,
                                        left: "50%",
                                        x: "-50%",
                                        y: "-50%",
                                        position: "absolute",
                                    }}
                                >
                                    <div className="w-96 h-96 rounded-full bg-white opacity-70 shadow-[0_0_30px_15px_rgba(255,255,255,0.6)]" />
                                </motion.div>
                            )}

                            <img src="/orbit-services.png" alt="ValuuHub Services Details" className="w-full h-full object-contain" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {showFourthScreen && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center py-6"
                        style={{ background: `linear-gradient(to top, #1C67FB, transparent)` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                            className="flex flex-col items-center"
                        >
                            <p className="mb-2 text-sm text-black">Scroll to meet our team</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 5V19M12 19L5 12M12 19L19 12"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Team Section */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{
                    opacity: showTeam ? 1 : 0,
                    y: showTeam ? 0 : 100,
                }}
                transition={{ duration: 0.8 }}
            >
                <TeamSection />
            </motion.div>
        </div>
    )
}
