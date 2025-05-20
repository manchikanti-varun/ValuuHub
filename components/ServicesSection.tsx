"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
    isMobile,
}: {
    service: Service
    index: number
    currentImageIndex: number
    isMobile: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isTouched, setIsTouched] = useState(false)

    // Get the current image to display based on the shared index
    const displayImageUrl = allServiceImages[currentImageIndex]

    const handleTouchStart = () => {
        if (isMobile) {
            setIsTouched(!isTouched)
        }
    }

    // For mobile, use touch instead of hover
    const isActive = isMobile ? isTouched : isHovered

    // Conditionally render with or without animations based on mobile state
    if (isMobile) {
        // Mobile version - no animations
        return (
            <div
                key={service.id}
                className={`flex flex-col transition-all duration-300 h-full cursor-pointer rounded-lg overflow-hidden ${isActive ? "text-white" : "bg-white text-black"
                    }`}
                style={{
                    backgroundColor: isActive ? service.hoverColor : "",
                }}
                onTouchStart={handleTouchStart}
            >
                {/* Image container - static on mobile */}
                <div className="relative h-48 w-full overflow-hidden">
                    {isActive ? (
                        <Image
                            src={service.imageUrl || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-contain p-4"
                        />
                    ) : (
                        <Image src={service.imageUrl || "/placeholder.svg"} alt="Service" fill className="object-contain p-4" />
                    )}
                </div>

                {/* Text content */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">{service.number}</h2>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-xs sm:text-sm">{service.description}</p>
                </div>
            </div>
        )
    }

    // Desktop version - with animations
    return (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col transition-all duration-300 h-full cursor-pointer rounded-lg overflow-hidden ${isActive ? "text-white" : "bg-white text-black"
                }`}
            style={{
                backgroundColor: isActive ? service.hoverColor : "",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container - always visible with cycling images */}
            <div className="relative h-48 w-full overflow-hidden">
                {/* Service's own image shown on hover */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <Image src={service.imageUrl || "/placeholder.svg"} alt={service.title} fill className="object-contain p-4" />
                </div>

                {/* Cycling image shown when not hovered */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
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
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">{service.number}</h2>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-xs sm:text-sm">{service.description}</p>
            </div>
        </motion.div>
    )
}

export default function ServicesSection() {
    const [detailPage, setDetailPage] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()

    // Check for mobile on client side
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Set up the image cycling timer - only for desktop
    useEffect(() => {
        if (isMobile) return // Don't cycle images on mobile

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allServiceImages.length)
        }, 2000) // Change image every 2 seconds

        return () => clearInterval(interval)
    }, [isMobile])

    const handleNextPage = () => {
        setDetailPage(2)
    }

    const handlePrevPage = () => {
        setDetailPage(1)
    }

    const services = detailPage === 1 ? servicesPage1 : servicesPage2

    // Conditionally render title with or without animation based on mobile state
    const SectionTitle = isMobile ? (
        <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-8 sm:mb-16 text-center"
            style={{ fontFamily: "Impact, sans-serif" }}
        >
            Things We&apos;re Great At
        </h1>
    ) : (
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-8 sm:mb-16 text-center"
            style={{ fontFamily: "Impact, sans-serif" }}
        >
            Things We&apos;re Great At
        </motion.h1>
    )

    // Conditionally render buttons with or without animation based on mobile state
    const PrevButton = isMobile ? (
        <button
            onClick={handlePrevPage}
            className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full text-sm sm:text-base"
        >
            <ArrowLeft size={isMobile ? 16 : 20} />
            <span>{isMobile ? "Previous" : "Previous Services"}</span>
        </button>
    ) : (
        <motion.button
            onClick={handlePrevPage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full text-sm sm:text-base"
        >
            <ArrowLeft size={isMobile ? 16 : 20} />
            <span>{isMobile ? "Previous" : "Previous Services"}</span>
        </motion.button>
    )

    const NextButton = isMobile ? (
        <button
            onClick={handleNextPage}
            className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full text-sm sm:text-base"
        >
            <span>{isMobile ? "Next" : "Next Services"}</span>
            <ArrowRight size={isMobile ? 16 : 20} />
        </button>
    ) : (
        <motion.button
            onClick={handleNextPage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-blue-800 py-2 px-4 rounded-full text-sm sm:text-base"
        >
            <span>{isMobile ? "Next" : "Next Services"}</span>
            <ArrowRight size={isMobile ? 16 : 20} />
        </motion.button>
    )

    return (
        <section
            id="services-section"
            className="w-full py-10 sm:py-16 px-4 sm:px-6 md:px-12 text-white"
            style={{ backgroundColor: "#044CD9" }}
        >
            {SectionTitle}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        currentImageIndex={currentImageIndex}
                        isMobile={isMobile}
                    />
                ))}
            </div>

            {/* Mobile page indicator */}
            {isMobile && (
                <div className="flex justify-center mt-6 mb-2">
                    <span className="text-white text-sm">Page {detailPage} of 2</span>
                </div>
            )}

            <div className="flex justify-center mt-6 sm:mt-12 max-w-7xl mx-auto">
                {detailPage === 2 ? PrevButton : NextButton}
            </div>
        </section>
    )
}
