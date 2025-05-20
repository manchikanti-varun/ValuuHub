"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Set up resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => onAnimationComplete(), 2300)
    return () => clearTimeout(timer)
  }, [onAnimationComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 200 }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/textures/paper-texture.png")' }}
        />

        {/* Text with curtain animation - Matched with Hero component */}
        <div className="relative z-10 overflow-hidden flex flex-col items-center justify-center h-[20vh] pt-8 sm:pt-16">
          {/* VALUU HUB Text */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center mb-2 px-4"
            style={{
              fontFamily: "BankGothic RUSS, BankGothic, Impact, sans-serif",
              fontSize: isMobile ? "40px" : "110px",
              fontWeight: 400,
              letterSpacing: isMobile ? "0.1em" : "0.2em",
              background: "linear-gradient(to bottom, #03369B, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "100%",
              zIndex: 1,
              position: "relative",
            }}
          >
            VALUU HUB
          </motion.h1>

          {/* Curtain Raiser Overlay */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 500, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: 2 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
