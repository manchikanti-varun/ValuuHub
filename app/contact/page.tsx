'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Navbar from '@/components/navbar';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
        alert("Thank you for your message! We'll get back to you soon.");
    };

    return (
        <main className="min-h-screen w-full bg-white text-[#0A0A0A] overflow-hidden">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Left Column - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0747CC]" />

                        <div className="pl-8">
                            <h1 className="text-5xl md:text-6xl font-bold mb-16">
                                Contact Us<span className="text-[#0747CC]">.</span>
                            </h1>

                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-lg font-medium mb-4">Working Hours</h2>
                                    <p className="text-gray-600">
                                        Monday – Saturday <br />
                                        9:30 AM – 6:00 PM
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-lg font-medium mb-4">Contact</h2>
                                    <p className="text-gray-600 mb-2">valuuhub@gmail.com</p>
                                    <p className="text-gray-600">+91 6303288470</p>
                                </div>

                                <div className="flex space-x-6 pt-8">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="text-gray-600 hover:text-[#0747CC] transition-colors"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Twitter"
                                        className="text-gray-600 hover:text-[#0747CC] transition-colors"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="text-gray-600 hover:text-[#0747CC] transition-colors"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#0747CC]" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#0747CC]" />

                        <div className="p-8 bg-gray-100 relative">
                            <h2 className="text-xl font-medium mb-8">Contact Form</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                                        NAME
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0747CC] text-black"
                                        placeholder="John"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                                        EMAIL
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0747CC] text-black"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                                        MESSAGE
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0747CC] text-black"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-[#0747CC] hover:bg-[#0A5AE2] transition-colors text-white font-medium"
                                >
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>

                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#0747CC]" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#0747CC]" />
                    </motion.div>
                </div>

                <div className="mt-16 text-right text-gray-400 text-sm">© 2025 Valuu Hub</div>
            </div>
        </main>
    );
}
