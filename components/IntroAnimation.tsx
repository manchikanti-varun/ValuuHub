"use client"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onAnimationComplete(), 2000)
    return () => clearTimeout(timer)
  }, [onAnimationComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 500 }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/textures/paper-texture.png")' }}
        />

        {/* Text with curtain animation */}
        <div className="relative z-10 overflow-hidden h-[140px] flex items-center justify-center">
          {/* VALUU HUB Text */}
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-center"
            style={{
              fontFamily: "BankGothic RUSS, BankGothic, Impact, sans-serif",
              fontSize: "clamp(60px, 10vw, 120px)",
              fontWeight: 400,
              letterSpacing: "0.2em",
              background: "linear-gradient(to bottom, #819ED9, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1",
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
