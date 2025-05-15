"use client"
import { motion } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type TeamMember = {
    id: string
    name: string
    title: string
    description: string
    image: string
    linkedin: string
    instagram: string
    position: "top" | "bottom-left" | "bottom-right"
}

const teamMembers: TeamMember[] = [
    {
        id: "md-afrid",
        name: "MD Afrid",
        title: "CD",
        description:
            "brings brands to life with bold visuals and breakthrough ideas. He's the eye behind every scroll-stopping moment that makes Valuu Hub unforgettable.",
        image: "Afrid image.png",
        linkedin: "https://www.linkedin.com/in/afrid-md-afrid-155281309/",
        instagram: "https://www.instagram.com/afridaffumoh/",
        position: "bottom-left",
    },
    {
        id: "ds-sharma",
        name: "D S Sharma",
        title: "CEO",
        description:
            "leads with vision and drives growth. With strategic insight and innovative thinking, he guides Valuu Hub to new heights of success and client satisfaction.",
        image: "CEO.png",
        linkedin: "https://www.linkedin.com/in/dorbala-sadanand-sharma-43a914259/",
        instagram: "https://www.instagram.com/sadanand_sharmaa/",
        position: "top",
    },
    {
        id: "m-sathwik",
        name: "M Sathwik",
        title: "COO",
        description:
            "ensures flawless execution and operational excellence. His attention to detail and process-driven approach keeps Valuu Hub delivering exceptional results.",
        image: "Sathwik image.png",
        linkedin: "https://www.linkedin.com/in/modem-sathwik-ba754b29b/",
        instagram: "https://www.instagram.com/lucckkyyy/",
        position: "bottom-right",
    },
]

function TeamMemberCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Card with fixed dimensions that won't change on hover */}
            <div
                className="bg-white rounded-lg overflow-hidden h-full border-2 border-blue-300 shadow-md relative"
                style={{ minHeight: "400px" }} // Fixed minimum height
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Base card content - always present */}
                <div className="h-72 w-full relative">
                    <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                <div className="bg-blue-800 text-white p-4 text-center">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-md">{member.title}</p>
                </div>

                {/* Hover overlay - absolutely positioned */}
                {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-800 text-white p-6 rounded-lg flex flex-col">
                        <h3 className="font-bold text-2xl text-center mb-3">{member.name}</h3>
                        <p className="text-md text-center mb-4">{member.title}</p>
                        <p className="text-md text-center mb-8">{member.description}</p>
                        <div className="flex justify-center space-x-6 mt-auto">
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full p-3 hover:bg-blue-100 transition-colors"
                            >
                                <Linkedin size={24} className="text-blue-800" />
                            </a>
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full p-3 hover:bg-blue-100 transition-colors"
                            >
                                <Instagram size={24} className="text-blue-800" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function TeamSection() {
    // Separate team members by position
    const topMember = teamMembers.find((member) => member.position === "top")
    const bottomLeftMember = teamMembers.find((member) => member.position === "bottom-left")
    const bottomRightMember = teamMembers.find((member) => member.position === "bottom-right")

    return (
        <section
            className="text-white py-24 px-6 relative"
            style={{ background: "linear-gradient(to bottom, #1C67FB, #5A90FC)" }}
        >
            {/* Decorative lines at top */}
            <div className="absolute top-0 left-0 w-full">
                <div className="max-w-6xl mx-auto relative">
                    <div className="absolute left-0 top-0 w-1/4 h-1 bg-white opacity-30"></div>
                    <div className="absolute right-0 top-0 w-1/4 h-1 bg-white opacity-30"></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-20">OUR TEAM</h2>

                <div className="flex flex-col items-center justify-center">
                    {/* Top member (CEO) - Increased max width */}
                    {topMember && (
                        <div className="w-full max-w-sm mb-24">
                            <TeamMemberCard member={topMember} />
                        </div>
                    )}

                    {/* Bottom row with two members - Increased max width */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl mx-auto">
                        {bottomLeftMember && (
                            <div className="flex justify-center">
                                <div className="w-full max-w-sm">
                                    <TeamMemberCard member={bottomLeftMember} />
                                </div>
                            </div>
                        )}
                        {bottomRightMember && (
                            <div className="flex justify-center">
                                <div className="w-full max-w-sm">
                                    <TeamMemberCard member={bottomRightMember} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center mt-20 text-lg">The minds driving strategy, execution, and creativity at Valuu Hub.</p>
            </div>
        </section>
    )
}
