"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Sample client data - replace with your actual clients
const clients = [
    {
        id: "thoothukudi",
        name: "Thoothukudi Cafe",
        logo: "/clients/Thoothukudi-Cafe.png",
        description: "Client since 2025",
        industry: "F&B",
    },
    {
        id: "rivora",
        name: "Rivora The Cafe",
        logo: "/clients/Rivora-The-Cafe.png",
        description: "Client since 2025",
        industry: "F&B",
    },
]

export default function ClientCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Check for mobile on client side
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Auto-scroll effect - pause on mobile
    useEffect(() => {
        if (isMobile) return // Don't auto-scroll on mobile

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [isMobile])

    const handleClientClick = (clientId: string) => {
        if (!isDragging) {
            router.push(`/clients/${clientId}`)
        }
    }

    // Touch and drag handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(false)
        setDragStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setIsDragging(true)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isDragging) {
            const dragEndX = e.changedTouches[0].clientX
            const dragDiff = dragEndX - dragStartX

            if (dragDiff > 50) {
                // Swiped right - go to previous
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? clients.length - 1 : prevIndex - 1))
            } else if (dragDiff < -50) {
                // Swiped left - go to next
                setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
            }
        }

        setTimeout(() => {
            setIsDragging(false)
        }, 100)
    }

    // Manual navigation functions
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
            return prevIndex === 0 ? 0 : prevIndex - 1
        })
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => {
            return prevIndex >= clients.length - 1 ? prevIndex : prevIndex + 1
        })
    }

    return (
        <section className="w-full py-8 sm:py-16 px-4 sm:px-6 md:px-12 bg-white text-blue-900">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-12 text-center"
                    style={{ color: "#044CD9" }}
                >
                    OUR CLIENTS
                </motion.h2>

                {/* Carousel container with touch support */}
                <div
                    className="relative overflow-hidden mb-8 px-10"
                    ref={carouselRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Left/Right navigation arrows - Hidden on very small screens */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                        aria-label="Previous client"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                        aria-label="Next client"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Carousel items */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex py-4 sm:py-8"
                            animate={{
                                x: isMobile ? `-${currentIndex * 100}%` : `-${currentIndex * 100}%`,
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {clients.map((client) => (
                                <motion.div
                                    key={client.id}
                                    className="flex-shrink-0 flex-grow-0 w-full px-4"
                                    style={{
                                        width: isMobile ? "100%" : "33.333%",
                                        boxSizing: "border-box",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleClientClick(client.id)}
                                >
                                    <div
                                        className="bg-white rounded-lg p-4 h-32 sm:h-40 flex flex-col items-center justify-center"
                                        style={{
                                            boxShadow: "0 4px 20px rgba(4, 76, 217, 0.15), 0 8px 30px rgba(4, 76, 217, 0.1)",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={client.logo || "/placeholder.svg"}
                                                alt={`${client.name} logo`}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>

                                        {/* Client info - visible on larger screens */}
                                        <div className="mt-2 text-center hidden sm:block">
                                            <p className="text-sm text-gray-600">{client.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Navigation dots - Larger for mobile touch */}
                <div className="flex justify-center mt-4 sm:mt-6 space-x-3">
                    {clients.map((_, index) => (
                        <button
                            key={index}
                            className={`w-4 h-4 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-blue-200"
                                } transition-colors duration-300`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Swipe instruction for mobile */}
                <div className="text-center text-sm text-gray-500 mb-4 sm:hidden">Swipe left or right to see more clients</div>

                <div className="text-center mt-4 sm:mt-8">
                    <Link
                        href="/clients"
                        className="inline-block bg-blue-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                        View All Clients
                    </Link>
                </div>
            </div>
        </section>
    )
}
