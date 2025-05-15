"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import TransitionScreen from "./TransitionScreen"

export default function Hero() {
  const [showTransition, setShowTransition] = useState(false)

  function handleGetInTouch() {
    setShowTransition(true)
    // Scroll to the transition section after a short delay
    setTimeout(() => {
      const transitionSection = document.getElementById("transition-section")
      if (transitionSection) {
        transitionSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <>
      <section
        className="relative w-full text-white px-6 pt-16 pb-24 text-center overflow-hidden min-h-screen flex flex-col"
        style={{
          background: "linear-gradient(to bottom, #03369B, #044CD9)",
        }}
      >
        {/* Background large outline text with animations - Moved lower */}
        <div className="absolute inset-x-0 top-[13%] bottom-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute top-[35%] left-0 whitespace-nowrap"
            style={{
              fontFamily: "Impact, sans-serif",
              fontWeight: 400,
              fontSize: "175px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              overflow: "visible",
            }}
          >
            <p>DIGITAL MARKETING AGENCY</p>
          </motion.div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
            className="absolute top-[55%] right-0 whitespace-nowrap"
            style={{
              fontFamily: "Impact, sans-serif",
              fontWeight: 400,
              fontSize: "175px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              overflow: "visible",
            }}
          >
            <p>SOCIAL MEDIA SOCIAL MEDIA</p>
          </motion.div>

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
            className="absolute top-[75%] left-0 whitespace-nowrap"
            style={{
              fontFamily: "Impact, sans-serif",
              fontWeight: 400,
              fontSize: "175px",
              lineHeight: "100%",
              letterSpacing: "0",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
              overflow: "visible",
            }}
          >
            <p>DIGITAL MARKETING AGENCY</p>
          </motion.div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 mt-32 mb-96">
          <motion.div initial={{ y: 0 }} animate={{ y: -30 }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}>
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
            OUR EDGE
          </motion.button>
        </div>

        {/* Glowing Sphere - Glow applied directly to the image */}
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="relative cursor-pointer" onClick={handleGetInTouch}>
            {/* Using a single motion.img with filter animations */}
            <motion.img
              src="./Frame 78.png"
              alt="Glowing Sphere"
              className="w-[500px] h-[500px] object-contain"
              style={{
                filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.7))",
              }}
              animate={{
                filter: [
                  "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                  "brightness(1.4) drop-shadow(0 0 30px rgba(255,255,255,0.9))",
                  "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
              }}
              whileHover={{
                scale: 1.05,
                filter: "brightness(1.5) drop-shadow(0 0 40px rgba(255,255,255,1))",
              }}
            />
          </div>
        </div>
      </section>

      {/* Transition Section */}
      {showTransition && (
        <div id="transition-section">
          <TransitionScreen />
        </div>
      )}
    </>
  )
}
