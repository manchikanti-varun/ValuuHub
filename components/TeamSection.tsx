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
        image: "ceo.png",
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
            className="relative h-full w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card with improved design */}
            <div
                className="relative rounded-3xl overflow-hidden h-full shadow-lg"
                style={{ maxWidth: "320px", margin: "0 auto" }}
            >
                {/* Image container with rounded corners */}
                <div className="relative bg-white rounded-3xl overflow-hidden border-4 border-blue-100">
                    {/* Image container */}
                    <div className="h-80 w-full relative">
                        <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 300px"
                        />
                    </div>

                    {/* Name and title footer */}
                    <div className="bg-blue-700 text-white py-4 px-4 text-center">
                        <h3 className="font-bold text-2xl">{member.name}</h3>
                        <p className="text-lg">{member.title}</p>
                    </div>
                </div>

                {/* Hover overlay with content */}
                <motion.div
                    className="absolute inset-0 bg-blue-600 text-white rounded-3xl overflow-hidden flex flex-col justify-between p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                    <div className="text-center space-y-4">
                        <h3 className="font-bold text-2xl">{member.name}</h3>
                        <p className="text-xl">{member.title}</p>
                        <div className="w-16 h-1 bg-white mx-auto my-2"></div>
                        <p className="text-md leading-relaxed">{member.description}</p>
                    </div>

                    <div className="flex justify-center space-x-4 mt-4">
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-full p-3 hover:bg-blue-100 transition-colors"
                        >
                            <Linkedin size={24} className="text-blue-700" />
                        </a>
                        <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-full p-3 hover:bg-blue-100 transition-colors"
                        >
                            <Instagram size={24} className="text-blue-700" />
                        </a>
                    </div>
                </motion.div>
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
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full">
                <div className="max-w-6xl mx-auto relative">
                    <div className="absolute left-0 top-0 w-1/4 h-1 bg-white opacity-30"></div>
                    <div className="absolute right-0 top-0 w-1/4 h-1 bg-white opacity-30"></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-20">OUR TEAM</h2>

                <div className="flex flex-col items-center justify-center">
                    {/* Top member (CEO) */}
                    {topMember && (
                        <div className="w-full max-w-xs mb-24">
                            <TeamMemberCard member={topMember} />
                        </div>
                    )}

                    {/* Bottom row with two members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-4xl mx-auto">
                        {bottomLeftMember && (
                            <div className="flex justify-center">
                                <div className="w-full max-w-xs">
                                    <TeamMemberCard member={bottomLeftMember} />
                                </div>
                            </div>
                        )}
                        {bottomRightMember && (
                            <div className="flex justify-center">
                                <div className="w-full max-w-xs">
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
