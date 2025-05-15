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
        title: "CD of Valuu Hub",
        description:
            "brings brands to life with bold visuals and breakthrough ideas. He's the eye behind every scroll-stopping moment that makes Valuu Hub unforgettable.",
        image: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/md-afrid",
        instagram: "https://instagram.com/md-afrid",
        position: "bottom-left",
    },
    {
        id: "ds-sharma",
        name: "D S Sharma",
        title: "CEO",
        description:
            "leads with vision and drives growth. With strategic insight and innovative thinking, he guides Valuu Hub to new heights of success and client satisfaction.",
        image: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/ds-sharma",
        instagram: "https://instagram.com/ds-sharma",
        position: "top",
    },
    {
        id: "m-sathwik",
        name: "M Sathwik",
        title: "COO",
        description:
            "ensures flawless execution and operational excellence. His attention to detail and process-driven approach keeps Valuu Hub delivering exceptional results.",
        image: "/placeholder.svg?height=200&width=200",
        linkedin: "https://linkedin.com/in/m-sathwik",
        instagram: "https://instagram.com/m-sathwik",
        position: "bottom-right",
    },
]

function TeamMemberCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Card with light blue border */}
            <div className="bg-white rounded-lg overflow-hidden h-full border-2 border-blue-300 shadow-md">
                {!isHovered ? (
                    <>
                        <div className="h-48 w-full relative">
                            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                        </div>
                        <div className="bg-blue-800 text-white p-3 text-center">
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-sm">{member.title.split(" ")[0]}</p>
                        </div>
                    </>
                ) : (
                    /* Hover state - show description and social links */
                    <div className="bg-gradient-to-b from-blue-400 to-blue-800 text-white p-5 h-full rounded-lg flex flex-col">
                        <h3 className="font-bold text-xl text-center mb-2">{member.name}</h3>
                        <p className="text-sm text-center mb-3">{member.title}</p>
                        <p className="text-sm text-center mb-6">{member.description}</p>
                        <div className="flex justify-center space-x-4 mt-auto">
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full p-2 hover:bg-blue-100 transition-colors"
                            >
                                <Linkedin size={20} className="text-blue-800" />
                            </a>
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full p-2 hover:bg-blue-100 transition-colors"
                            >
                                <Instagram size={20} className="text-blue-800" />
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
        <section className="bg- text-black py-24 px-6 relative">
            {/* Decorative lines at top */}
            <div className="absolute top-0 left-0 w-full">
                <div className="max-w-6xl mx-auto relative">
                    <div className="absolute left-0 top-0 w-1/4 h-1 bg-gray-300 opacity-50"></div>
                    <div className="absolute right-0 top-0 w-1/4 h-1 bg-gray-300 opacity-50"></div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-3xl mx-auto">
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
