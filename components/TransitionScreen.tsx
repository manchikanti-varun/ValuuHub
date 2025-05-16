"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import TeamSection from "./TeamSection"

export default function TransitionScreen() {
    const [showFourthScreen, setShowFourthScreen] = useState(false)
    const [showTeam, setShowTeam] = useState(false)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFourthScreen(true)
        }, 500)

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
    }, [router])

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-x-hidden ">
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
                            key="fourth-screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
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
