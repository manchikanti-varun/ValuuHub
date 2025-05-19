"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { Instagram, Facebook, Linkedin, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample client data - replace with your actual clients
const clientsData = {
    thoothukudi: {
        name: "Thoothukudi Cafe",
        logo: "/clients/Thoothukudi-Cafe.png",
        description: "Client since 2025",
        industry: "F&B",
        about: "A cafe",
        services: ["Social Media Marketing", "Influencer Marketing", "Content Creation", "Web Site"],
        socialMedia: {
            website: "https://www.thoothukudicafe.com/",
        },
        projects: [
            {
                title: "launch",
                description: "launch",
                image: "/clients/Thoothukudi-Cafe.png",
                year: "2025",
            },
        ],
        testimonial: {
            quote:
                "ValuuHub has been instrumental in our digital growth. Their strategic approach and creative content have significantly improved our online presence.",
            author: "Marketing Director, Thoothukudi",
        },
    },
}

export default function ClientDetailPage() {
    const { clientId } = useParams()
    const [client, setClient] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (clientId && typeof clientId === "string") {
            // In a real application, you would fetch this data from an API
            const clientData = clientsData[clientId as keyof typeof clientsData]
            setClient(clientData)
            setLoading(false)
        }
    }, [clientId])

    if (loading) {
        return (
            <main className="min-h-screen w-full overflow-hidden bg-[#044CD9]">
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-128px)]">
                    <div className="text-white text-2xl">Loading...</div>
                </div>
            </main>
        )
    }

    if (!client) {
        return (
            <main className="min-h-screen w-full overflow-hidden bg-[#044CD9]">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-128px)] px-6">
                    <h1 className="text-white text-3xl mb-6">Client not found</h1>
                    <Link href="/clients" className="bg-white text-blue-800 py-2 px-6 rounded-full">
                        Back to Clients
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full overflow-hidden">
            <Navbar />

            <div className="relative w-full min-h-[calc(100vh-128px)] bg-[#044CD9] py-16 px-6 md:px-12">
                {/* Decorative blue rectangles */}
                <div className="absolute top-14 left-0 w-16 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute top-10 right-48 w-32 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-10 left-56 w-32 h-24 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-0 right-16 w-20 h-12 bg-[#8BAEFF] opacity-70 rounded-none blur-sm"></div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <Link href="/clients" className="inline-flex items-center text-white mb-8 hover:underline">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Clients
                    </Link>

                    {/* Client Header */}
                    <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                                {/* Placeholder for client logo */}
                                <div className="relative w-48 h-48 bg-white rounded-lg shadow-md">
                                    <Image
                                        src={client.logo || "/placeholder.svg"}
                                        alt={`${client.name} logo`}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            </div>

                            <div className="md:w-2/3 md:pl-8">
                                <h1 className="text-3xl font-bold text-blue-800 mb-4">{client.name}</h1>
                                <p className="text-gray-600 mb-4">{client.description}</p>
                                <p className="text-gray-800 mb-6">{client.about}</p>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Services Provided:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {client.services.map((service: string, index: number) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    {client.socialMedia.instagram && (
                                        <a
                                            href={client.socialMedia.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-800 hover:text-blue-600 transition-colors"
                                        >
                                            <Instagram size={24} />
                                        </a>
                                    )}
                                    {client.socialMedia.facebook && (
                                        <a
                                            href={client.socialMedia.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-800 hover:text-blue-600 transition-colors"
                                        >
                                            <Facebook size={24} />
                                        </a>
                                    )}
                                    {client.socialMedia.linkedin && (
                                        <a
                                            href={client.socialMedia.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-800 hover:text-blue-600 transition-colors"
                                        >
                                            <Linkedin size={24} />
                                        </a>
                                    )}
                                    {client.socialMedia.website && (
                                        <a
                                            href={client.socialMedia.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-800 hover:text-blue-600 transition-colors"
                                        >
                                            <Globe size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <h2 className="text-2xl font-bold text-white mb-6">Our Work with {client.name}</h2>

                    <div className="space-y-8">
                        {client.projects.map((project: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden shadow-lg"
                            >
                                <div className="md:flex">
                                    <div className="md:w-2/5 relative h-64 md:h-auto">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6 md:w-3/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-blue-800">{project.title}</h3>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{project.year}</span>
                                        </div>
                                        <p className="text-gray-700">{project.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial Section */}
                    {client.testimonial && (
                        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                            <blockquote className="text-white text-lg italic mb-4">"{client.testimonial.quote}"</blockquote>
                            <p className="text-white font-medium text-right">— {client.testimonial.author}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
