"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import IntroAnimation from "../components/IntroAnimation"
import OurStorySection from "@/components/OurStorySection"
import ServicesOrbit from "@/components/ServiceOrbit"
import ServicesSection from "@/components/ServicesSection"
import TeamSection from "@/components/TeamSection"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  // Check if this is the first visit in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setShowIntro(false)
    } else {
      sessionStorage.setItem("hasVisited", "true")
    }
  }, [])

  const handleAnimationComplete = () => {
    setShowIntro(false)
  }

  return (
    <main className="min-h-screen w-full bg-white">
      {showIntro ? (
        <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <>
          <Navbar />
          <Hero />
          {/* Services Section */}
          <ServicesSection />

          {/* Our Story Section */}
          <OurStorySection />
        </>
      )}
    </main>
  )
}
