"use client"
import { useState, useEffect, useRef } from "react"
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
    }
]

export default function ClientCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Auto-scroll effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const handleClientClick = (clientId: string) => {
        router.push(`/clients/${clientId}`)
    }

    // Calculate visible clients (show 4 at a time on desktop, fewer on mobile)
    const visibleClients = []
    for (let i = 0; i < clients.length; i++) {
        visibleClients.push(clients[(currentIndex + i) % clients.length])
    }

    return (
        <section className="w-full py-16 px-6 md:px-12 bg-white text-blue-900">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    style={{ color: "#044CD9" }}
                >
                    OUR CLIENTS
                </motion.h2>

                <div className="relative overflow-hidden" ref={carouselRef}>
                    <motion.div
                        className="flex space-x-8 py-8"
                        animate={{
                            x: [`0%`, `-${(100 / clients.length) * currentIndex}%`],
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {clients.map((client) => (
                            <motion.div
                                key={client.id}
                                className="flex-shrink-0 w-1/2 md:w-1/4 lg:w-1/6 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleClientClick(client.id)}
                            >
                                <div className="bg-white rounded-lg shadow-md p-4 h-32 flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={client.logo || "/placeholder.svg"}
                                            alt={`${client.name} logo`}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Navigation dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {clients.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-blue-200"
                                    } transition-colors duration-300`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/clients"
                        className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                        View All Clients
                    </Link>
                </div>
            </div>
        </section>
    )
}
