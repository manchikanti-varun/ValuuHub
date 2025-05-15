"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ServicesOrbit() {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold mb-8 tracking-wider text-center"
                style={{
                    fontFamily: "Impact, sans-serif",
                    letterSpacing: "0.1em",
                }}
            >
                OUR SERVICES
            </motion.h1>

            {/* Orbit Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-4xl h-[600px]"
            >
                <Image src="/orbit-services.png" alt="Services Orbit" fill className="object-contain" priority />
            </motion.div>
        </div>
    )
}
