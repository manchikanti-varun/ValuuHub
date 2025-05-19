"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
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

export default function ClientsPage() {
    return (
        <main className="min-h-screen w-full overflow-hidden">
            <Navbar />

            <div className="relative w-full min-h-[calc(100vh-128px)] bg-[#044CD9] py-16 px-6 md:px-12">
                {/* Decorative blue rectangles */}
                <div className="absolute top-14 left-0 w-16 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute top-10 right-48 w-32 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-10 left-56 w-32 h-24 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-0 right-16 w-20 h-12 bg-[#8BAEFF] opacity-70 rounded-none blur-sm"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-extrabold mb-16 text-center tracking-wider text-white"
                    >
                        OUR CLIENTS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-xl text-white text-center max-w-3xl mx-auto mb-16"
                    >
                        We've had the privilege of working with some amazing brands. Here's a showcase of clients who have trusted
                        us with their digital presence.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/clients/${client.id}`}>
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                        <div className="p-6 flex items-center justify-center h-48 bg-white">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={client.logo || "/placeholder.svg"}
                                                    alt={`${client.name} logo`}
                                                    fill
                                                    className="object-contain p-4"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white border-t border-gray-100">
                                            <p className="text-gray-600 mb-2">{client.description}</p>
                                            <p className="text-blue-800 font-medium">Industry: {client.industry}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
