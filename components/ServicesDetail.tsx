"use client"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Define service types
type Service = {
    id: string
    number: string
    title: string
    description: string
    imageUrl: string
    hoverColor: string
}

// First page services
const servicesPage1: Service[] = [
    {
        id: "social-media",
        number: "01",
        title: "Social media marketing",
        description:
            "We build strong, scroll-stopping social media strategies that grow your presence, engage your audience, and drive real results—across platforms that matter most to your brand.",
        imageUrl: "Social Media Marketing.png",
        hoverColor: "#03369B",
    },
    {
        id: "influencer",
        number: "02",
        title: "Influencer Marketing",
        description:
            "We connect your brand with the right voices. From micro to macro influencers, we create impactful collaborations that bring trust, reach, and conversions.",
        imageUrl: "Influencer Marketing.png",
        hoverColor: "#044CD9",
    },
    {
        id: "performance",
        number: "03",
        title: "Performance Marketing",
        description:
            "Our ad strategies are built to perform. From lead generation to sales, we run data-driven campaigns that bring ROI, not just reach.",
        imageUrl: "Performance Marketing.png",
        hoverColor: "#1C67FB",
    },
    {
        id: "branding",
        number: "04",
        title: "Branding",
        description:
            "We craft brands that speak, stand out, and stay. From logos to brand voice, we shape your identity to leave a lasting impression.",
        imageUrl: "Branding.png",
        hoverColor: "#5A90FC",
    },
]

// Second page services - Updated to match the image
const servicesPage2: Service[] = [
    {
        id: "content-creation",
        number: "05",
        title: "Content Creation",
        description:
            "From reels to product shoots, we create content that your audience wants to watch, share, and remember. Every piece is built to tell your story.",
        imageUrl: "Content Creation.png",
        hoverColor: "#03369B",
    },
    {
        id: "ui-ux-design",
        number: "06",
        title: "UI/UX Design",
        description:
            "We design digital experiences that are sleek, smart, and user-first. Whether it's a website or app, our UI/UX work makes every click count.",
        imageUrl: "UI_UX design.png",
        hoverColor: "#044CD9",
    },
    {
        id: "website-development",
        number: "07",
        title: "Website Development",
        description:
            "Fast, functional, and fully tailored. We build websites that look great, load fast, and drive your business forward.",
        imageUrl: "Website Dev.png",
        hoverColor: "#1C67FB",
    },
    {
        id: "consultation-strategy",
        number: "08",
        title: "Consultation & Strategy",
        description:
            "Not sure where to start? We guide you with insights, strategies, and action plans that align with your business goals—clear, focused, and growth-driven.",
        imageUrl: "Consultation.png",
        hoverColor: "#5A90FC",
    },
]

// Combine all service images for cycling
const allServiceImages = [
    ...servicesPage1.map((service) => service.imageUrl),
    ...servicesPage2.map((service) => service.imageUrl),
]

// Service Card Component
function ServiceCard({
    service,
    index,
    currentImageIndex,
}: { service: Service; index: number; currentImageIndex: number }) {
    const [isHovered, setIsHovered] = useState(false)

    // Get the current image to display based on the shared index
    const displayImageUrl = allServiceImages[currentImageIndex]

    return (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col transition-all duration-300 h-full cursor-pointer rounded-lg overflow-hidden ${isHovered ? "text-white" : "bg-white text-black"
                }`}
            style={{
                backgroundColor: isHovered ? service.hoverColor : "",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container - always visible with cycling images */}
            <div className="relative h-48 w-full overflow-hidden">
                {/* Service's own image shown on hover */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    <Image src={service.imageUrl || "/placeholder.svg"} alt={service.title} fill className="object-contain p-4" />
                </div>

                {/* Cycling image shown when not hovered */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}>
                    <motion.div
                        key={currentImageIndex} // Change key to force re-render on image change
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image src={displayImageUrl || "/placeholder.svg"} alt="Service" fill className="object-contain p-4" />
                    </motion.div>
                </div>
            </div>

            {/* Text content */}
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-4xl font-bold mb-2">{service.number}</h2>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm">{service.description}</p>
            </div>
        </motion.div>
    )
}

export default function ServicesDetail({
    page,
    onNext,
    onPrev,
}: {
    page: number
    onNext: () => void
    onPrev: () => void
}) {
    const services = page === 1 ? servicesPage1 : servicesPage2
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Set up the image cycling timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allServiceImages.length)
        }, 2000) // Change image every 2 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="min-h-[calc(100vh-128px)] w-full py-12 px-6 md:px-12 text-white"
            style={{ backgroundColor: "#044CD9" }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extralight mb-16 text-center"
                style={{ fontFamily: "Impact, sans-serif" }}
            >
                Things We&apos;re Great At
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} currentImageIndex={currentImageIndex} />
                ))}
            </div>

            <div className="flex justify-end mt-12 max-w-7xl mx-auto">
                {page === 2 ? (
                    <motion.button
                        onClick={onPrev}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full"
                    >
                        <ArrowLeft size={20} />
                        <span>Previous Services</span>
                    </motion.button>
                ) : (
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full"
                    >
                        <span>Next Services</span>
                        <ArrowRight size={20} />
                    </motion.button>
                )}
            </div>
        </div>
    )
}
