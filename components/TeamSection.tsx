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
}

const teamMembers: TeamMember[] = [
    {
        id: "ds-sharma",
        name: "D S Sharma",
        title: "CEO",
        description:
            "leads with vision and drives growth. With strategic insight and innovative thinking, he guides Valuu Hub to new heights of success and client satisfaction.",
        image: "CEO.png",
        linkedin: "https://www.linkedin.com/in/dorbala-sadanand-sharma-43a914259/",
        instagram: "https://www.instagram.com/sadanand_sharmaa/",
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
    },
    {
        id: "md-afrid",
        name: "MD Afrid",
        title: "CD",
        description:
            "brings brands to life with bold visuals and breakthrough ideas. He's the eye behind every scroll-stopping moment that makes Valuu Hub unforgettable.",
        image: "Afrid image.png",
        linkedin: "https://www.linkedin.com/in/afrid-md-afrid-155281309/",
        instagram: "https://www.instagram.com/afridaffumoh/",
    },
]

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card with improved design */}
            <div
                className="relative rounded-3xl overflow-hidden h-full shadow-lg transform transition-transform duration-300"
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
    return (
        <section
            className="text-white py-16 px-6 relative"
            style={{ backgroundColor: "#044CD9" }}
        >
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-20">OUR TEAM</h2>

                {/* Horizontal row of team members */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>

                <p className="text-center mt-20 text-lg">The minds driving strategy, execution, and creativity at Valuu Hub.</p>
            </div>
        </section>
    )
}
