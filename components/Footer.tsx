"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Instagram, Linkedin, Facebook } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full text-white overflow-hidden">
            <div
                className="w-full py-12 px-6 md:px-12"
                style={{
                    background: "linear-gradient(to bottom, #1C67FB, #5A90FC)",
                }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Top section with logo and contact button */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        {/* Logo */}
                        <div className="mb-6 md:mb-0">
                            <Link href="/" className="block">
                                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                                    <Image src="/ValuuHubLogo.png" alt="ValuuHub Logo" width={120} height={120} />
                                </motion.div>
                            </Link>
                        </div>

                        {/* Contact Button */}
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
                            >
                                CONTACT US
                            </motion.button>
                        </Link>
                    </div>

                    {/* Navigation Links - Centered and starting at 30% from left */}
                    <div className="flex flex-col items-center md:items-start mb-12">
                        <div className="w-full pl-0 md:pl-[30%]">
                            <div className="flex flex-col space-y-6">
                                <nav className="flex justify-center md:justify-start">
                                    <span className="text-blue-900 mx-2">|</span>
                                    <NavItem href="/" label="Home" />
                                    <span className="text-blue-900 mx-11">|</span>
                                    <NavItem href="/services" label="Services" />
                                    <span className="text-blue-900 mx-6">|</span>
                                    <NavItem href="/our-mission" label="Our Mission" />
                                </nav>
                                <nav className="flex justify-center md:justify-start">
                                    <span className="text-blue-900 mx-2">|</span>
                                    <NavItem href="/about" label="About us" />
                                    <span className="text-blue-900 mx-6">|</span>
                                    <NavItem href="/blogs" label="Blogs" />
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="mb-12">
                        <h2 className="text-lg md:text-2xl font-bold tracking-wide text-left text-blue-900">WE BUILD | WE BRAND</h2>
                    </div>

                    <div className="relative">
                        {/* Divider Line - Adjusted to start at 30% from left */}
                        <div className="relative mb-8">
                            <div className="h-px bg-blue-900 ml-0 md:ml-[30%] w-full md:w-[70%]"></div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-1/3 text-center mb-4 md:mb-0">
                                <p className="text-xl font-medium text-blue-900">Your Growth, Our Mission.</p>
                            </div>
                            <div className="md:w-1/3 flex justify-center md:justify-end space-x-6">
                                <SocialIcon href="https://instagram.com" icon={<Instagram size={20} />} />
                                <SocialIcon href="https://linkedin.com" icon={<Linkedin size={20} />} />
                                <SocialIcon href="https://facebook.com" icon={<Facebook size={20} />} />
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
        <Link href={href} className="text-white hover:text-blue-100 transition-colors duration-300 font-medium">
            {label}
        </Link>
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
            className="text-blue-900 hover:text-white transition-colors duration-300"
        >
            {icon}
        </motion.a>
    )
}
