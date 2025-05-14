"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import TransitionScreen from "./TransitionScreen"

export default function Hero() {
  const [showTransition, setShowTransition] = useState(false)

  const handleGetInTouch = () => {
    setShowTransition(true)
  }

  return (
    <>
      {showTransition ? (
        <TransitionScreen />
      ) : (
        <section className="relative w-full bg-gradient-to-b from-blue-800 to-blue-900 text-white px-6 pt-16 pb-24 text-center overflow-hidden">
          {/* Background large outline text with animations */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute top-1/3 left-0 whitespace-nowrap"
              style={{
                fontFamily: "Impact, sans-serif",
                fontWeight: 400,
                fontSize: "175px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                overflow: "visible",
              }}
            >
              <p>DIGITAL MARKETING AGENCY</p>
            </motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              className="absolute top-1/2 right-0 whitespace-nowrap"
              style={{
                fontFamily: "Impact, sans-serif",
                fontWeight: 400,
                fontSize: "175px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                overflow: "visible",
              }}
            >
              <p>SOCIAL MEDIA SOCIAL MEDIA</p>
            </motion.div>

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
              className="absolute top-2/3 left-0 whitespace-nowrap"
              style={{
                fontFamily: "Impact, sans-serif",
                fontWeight: 400,
                fontSize: "175px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                overflow: "visible",
              }}
            >
              <p>DIGITAL MARKETING AGENCY</p>
            </motion.div>
          </div>

          {/* Foreground content */}
          <div className="relative z-10">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -30 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <h1
                className="mb-4 text-center"
                style={{
                  fontFamily: "bankGothic",
                  fontSize: "110px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  background: "linear-gradient(to bottom, #819ED9, #FFFFFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)",
                }}
              >
                VALUU HUB
              </h1>
            </motion.div>
            {/* Alternative font fallback */}
            <style jsx>{`
              h1 {
                font-family: "BankGothic RUSS", "BankGothic", Impact, sans-serif;
              }
            `}</style>
            <p
              className="mb-6"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "30px",
                lineHeight: "100%",
                fontWeight: 500,
                letterSpacing: "0.2em",
              }}
            >
              <span>B U I L D&nbsp;&nbsp;B R A N D</span> &nbsp;|&nbsp; <span>T H I N K&nbsp;&nbsp;V A L U U</span>
            </p>
            <p
              className="max-w-2xl mx-auto text-blue-100 mb-6"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "16px",
                lineHeight: "150%",
                fontWeight: 500,
              }}
            >
              Hi, at <strong>ValuuHub</strong>, we build, we brand, and we turn clicks into cult followings
            </p>

            {/* Get In Touch Button */}
            <motion.button
              onClick={handleGetInTouch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 cursor-pointer bg-white text-blue-800 font-semibold py-3 px-8 rounded-full mx-auto block mt-6 mb-8"
              style={{
                fontFamily: "var(--font-poppins)",
                letterSpacing: "0.1em",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
              }}
            >
              SERVICES
            </motion.button>
          </div>

          {/* Glowing Sphere as Image */}
          <div className="relative z-10 mt-16 flex justify-center">
            <img src="./Frame 78.png" alt="Glowing Sphere" className="w-[600px] h-[600px] object-contain" />
          </div>
        </section>
      )}
    </>
  )
}
