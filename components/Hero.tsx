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
        className="relative w-full text-white px-6 pt-16 pb-8 text-center overflow-hidden min-h-screen flex flex-col"
        style={{
          background: "linear-gradient(to bottom, #03369B, #044CD9)",
        }}
      >
        {/* Background large outline text with animations */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute top-[40%] left-0 whitespace-nowrap"
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
            <p>DIGITAL MARKETING DIGITAL MARKETING</p>
          </motion.div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
            className="absolute top-[60%] right-0 whitespace-nowrap"
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
            className="absolute top-[80%] left-0 whitespace-nowrap"
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
            <p>DIGITAL MARKETING DIGITAL MARKETING</p>
          </motion.div>
        </div>

        {/* Main content structure */}
        <div className="flex flex-col min-h-screen">
          {/* Top section with title and content */}
          <div className="flex-none h-[20vh] flex flex-col items-center justify-end relative z-10">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -20 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <h1
                className="mb-2 text-center"
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
              className="mb-2"
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
              className="max-w-2xl mx-auto text-blue-100 mb-2 mt-4"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "16px",
                lineHeight: "150%",
                fontWeight: 500,
              }}
            >
              Hi, at <strong>ValuuHub</strong>, we build, we brand, and we turn clicks into cult followings
            </p>
          </div>

          {/* Sphere section - positioned to be exactly in the center of the background text */}
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Sphere container with button overlay */}
            <div className="relative flex flex-col items-center">
              {/* OUR EDGE button positioned on top of the sphere */}
              <div className="absolute top-20 z-20 flex justify-center items-center">
                <motion.button
                  onClick={handleGetInTouch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer bg-white text-blue-800 font-semibold py-3 px-8 rounded-full"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    letterSpacing: "0.1em",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  OUR EDGE
                </motion.button>
              </div>

              {/* Sphere */}
              <motion.div
                className="cursor-pointer flex items-center justify-center"
                onClick={handleGetInTouch}
                whileHover={{
                  filter: "brightness(1.5) drop-shadow(0 0 40px rgba(255,255,255,1))",
                }}
              >
                <motion.img
                  src="./Frame 78.png"
                  alt="Glowing Sphere"
                  className="w-[800px] h-[800px] object-contain"
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
                    duration: 1,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section */}
      {showTransition && (
        <div id="transition-section" className="w-full">
          <TransitionScreen />
        </div>
      )}
    </>
  )
}
