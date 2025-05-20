"use client"

import { useState } from "react"
import Navbar from "../components/navbar"
import Hero from "../components/Hero"
import IntroAnimation from "../components/IntroAnimation"
import OurStorySection from "@/components/OurStorySection"
import ServicesSection from "@/components/ServicesSection"
import ClientCarousel from "@/components/ClientCarousel"
import MobileHero from "@/components/mobile-hero"
import { useIsMobile } from "@/hooks/use-mobile" 

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const isMobile = useIsMobile()

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
          {isMobile ? <MobileHero /> : <Hero />}
          <ServicesSection />
          <ClientCarousel />
          <OurStorySection />
        </>
      )}
    </main>
  )
}
