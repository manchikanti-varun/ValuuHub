"use client"
import { motion } from "framer-motion"
import type React from "react"
import { useState, useEffect } from "react"
import { Instagram, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if we're on the client side
        if (typeof window !== "undefined") {
            // Initial check
            setIsMobile(window.innerWidth < 768)

            // Set up resize listener
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768)
            }

            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <footer className="w-full text-white overflow-hidden">
            <div
                className="w-full py-12 px-6 md:px-12"
                style={{
                    background: "linear-gradient(to bottom, #5A90FC, #FFFFFF)",
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Top section with logo and contact button */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        {/* Logo */}
                        <div className="mb-6 md:mb-0 ml-0 md:ml-16">
                            <Link href="/" className="block">
                                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                                    <Image src="/ValuuHubLogo.png" alt="ValuuHub Logo" width={120} height={120} />
                                </motion.div>
                            </Link>
                        </div>

                        {/* Contact Button */}
                        <Link href="/contact">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#ffffff",
                                    color: "#044CD9",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-300 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
                            >
                                CONTACT US
                            </motion.button>
                        </Link>
                    </div>

                    {/* Navigation Links - Improved scrollable container for mobile */}
                    <div className="w-full mb-12 relative">
                        {/* Horizontal scroll indicator shadows for mobile */}
                        {isMobile && (
                            <>
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#5A90FC] to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#5A90FC] to-transparent z-10"></div>
                            </>
                        )}

                        {/* Scrollable container with improved padding */}
                        <div className="overflow-x-auto py-4 scrollbar-hide">
                            <nav className={`flex justify-center items-center ${isMobile ? "w-max mx-auto px-12" : "w-full"}`}>
                                <div className="flex items-center space-x-6 md:space-x-8">
                                    <NavItem href="/" label="Home" />
                                    <NavDivider />
                                    <NavItem href="/services" label="Services" />
                                    <NavDivider />
                                    <NavItem href="/our-mission" label="Our Mission" />
                                    <NavDivider />
                                    <NavItem href="/about" label="About us" />
                                    <NavDivider />
                                    <NavItem href="/blogs" label="Blogs" />
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-lg md:text-2xl font-bold tracking-wide text-blue-900">WE BUILD | WE BRAND</h2>
                    </div>

                    <div className="relative">
                        {/* Divider Line - Full width on mobile */}
                        <div className="relative mb-8">
                            <div className="h-px bg-blue-900 w-full md:ml-[30%] md:w-[70%]"></div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-1/3 text-center mb-4 md:mb-0">
                                <p className="text-xl font-medium text-blue-900">Your Growth, Our Mission.</p>
                            </div>
                            <div className="md:w-1/3 flex justify-center md:justify-end space-x-6">
                                <SocialIcon href="https://www.instagram.com/valuuhub/" icon={<Instagram size={20} />} />
                                <SocialIcon
                                    href="https://www.linkedin.com/company/valuu-hub-solutions/"
                                    icon={<Linkedin size={20} />}
                                />
                                <SocialIcon href="https://www.facebook.com/valuuhubsolut" icon={<Facebook size={20} />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Navigation Link Component
function NavItem({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="text-white hover:text-blue-100 transition-colors duration-300 font-medium text-sm md:text-base whitespace-nowrap px-1"
        >
            {label}
        </Link>
    )
}

// Navigation Divider Component
function NavDivider() {
    return <span className="text-blue-900">|</span>
}

// Social Icon Component
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-blue-900 hover:text-black transition-colors duration-300"
        >
            {icon}
        </motion.a>
    )
}


