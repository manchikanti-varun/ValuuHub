"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Instagram, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Footer() {
    const router = useRouter()

    const handleNavigation = (path: string) => {
        router.push(path)
    }

    return (
        <footer className="w-full text-white overflow-hidden">
            <div
                className="w-full py-8 px-6 md:px-12"
                style={{
                    background: "linear-gradient(to bottom, #1C67FB, #5A90FC)",
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Top section with logo, navigation and contact button */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        {/* Logo */}
                        <div className="mb-6 md:mb-0">
                            <motion.div whileHover={{ scale: 1.05 }} onClick={() => handleNavigation("/")} className="cursor-pointer">
                                <Image src="/ValuuHubLogo.png" alt="ValuuHub Logo" width={80} height={80} />
                            </motion.div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
                            <NavLink href="/" label="Home" />
                            <NavLink href="/services" label="Services" />
                            <NavLink href="/about" label="About us" />
                            <NavLink href="/" label="Our Mission" />
                            <NavLink href="/" label="Blogs" />
                        </nav>

                        {/* Contact Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigation("/contact")}
                            className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg"
                        >
                            CONTACT US
                        </motion.button>
                    </div>

                    {/* Tagline */}
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">WE BUILD | WE BRAND</h2>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/30 my-8"></div>

                    {/* Bottom section with mission and social links */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xl font-medium mb-6 md:mb-0">Your Growth, Our Mission.</p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-6">
                            <SocialIcon href="https://instagram.com" icon={<Instagram size={24} />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin size={24} />} />
                            <SocialIcon href="https://facebook.com" icon={<Facebook size={24} />} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Navigation Link Component
function NavLink({ href, label }: { href: string; label: string }) {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            className="text-white hover:text-blue-100 transition-colors duration-300 font-medium"
        >
            {label}
        </a>
    )
}

// Social Icon Component
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors duration-300"
        >
            {icon}
        </motion.a>
    )
}
