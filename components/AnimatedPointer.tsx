"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function AnimatedPointer() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Function to update mouse position
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)
        }

        // Function to handle mouse leaving the window
        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        // Function to handle mouse entering the window
        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        // Add event listeners
        window.addEventListener("mousemove", updateMousePosition)
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseenter", handleMouseEnter)

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [isVisible])

    // Don't render on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full border border-black border-opacity-90 pointer-events-none z-[9999]"
            style={{ backgroundColor: "transparent" }}
            animate={{
                x: mousePosition.x - 10,
                y: mousePosition.y - 10,
                scale: isVisible ? 1 : 0,
            }}
            transition={{
                type: "tween",
                duration: 0.01,
                ease: "linear",
            }}
        />
    )
}
