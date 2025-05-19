"use client"
import { useState } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import IntroAnimation from "../components/IntroAnimation"
import OurStorySection from "@/components/OurStorySection"
import ServicesSection from "@/components/ServicesSection"
import ClientCarousel from "@/components/ClientCarousel"

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

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
          <ServicesSection />
          <ClientCarousel />
          <OurStorySection />
        </>
      )}
    </main>
  )
}
