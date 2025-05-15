'use client'

import type React from "react"
import { useState } from "react"
import { Facebook, Twitter, Instagram } from 'lucide-react'
import Navbar from "@/components/navbar"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        setFormData({ name: "", email: "", message: "" })
        alert("Thank you for your message! We'll get back to you soon.")
    }

    return (
        <main className="min-h-screen w-full overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Main content area with royal blue background */}
            <div className="relative w-full min-h-[calc(100vh-128px)] bg-gradient-to-b from-[#03369B] to-[#011235] py-16">
                {/* Decorative blue rectangles */}
                <div className="absolute top-14 left-0 w-16 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute top-10 right-48 w-32 h-16 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-10 left-56 w-32 h-24 bg-[#1C67FB] opacity-70 rounded-none blur-sm"></div>
                <div className="absolute bottom-0 right-16 w-20 h-12 bg-[#8BAEFF] opacity-70 rounded-none blur-sm"></div>

                {/* White content box */}
                <div className="max-w-4xl mx-auto bg-white p-8 relative z-10">
                    <div className="absolute left-96 top-20 bottom-20 w-0.5 bg-[#0747CC]" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact information */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-[#0039B5]">Get in Touch</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Address</h3>
                                    <p className="text-gray-600">
                                        Hyderabad, Telangana
                                        <br />
                                        India
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Contact</h3>
                                    <p className="text-gray-600 mb-1">valuuhub@gmail.com</p>
                                    <p className="text-gray-600">+91 6303288470</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                                    <p className="text-gray-600">
                                        Monday – Saturday
                                        <br />
                                        9:30 AM – 6:00 PM
                                    </p>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="text-[#0039B5] hover:text-[#1C67FB] transition-colors"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Twitter"
                                        className="text-[#0039B5] hover:text-[#1C67FB] transition-colors"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="text-[#0039B5] hover:text-[#1C67FB] transition-colors"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-[#0039B5]">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0039B5] text-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0039B5] text-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0039B5] text-black"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-[#0039B5] hover:bg-[#1C67FB] transition-colors text-white font-medium"
                                >
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

