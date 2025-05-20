"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function OurStorySection() {
    const router = useRouter()
    const [isMobile, setIsMobile] = useState(false)

    // Check for mobile on client side
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleTeamClick = () => {
        router.push("/team")
    }

    return (
        <section
            className="relative w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white overflow-hidden"
            style={{
                backgroundColor: "#044CD9",
            }}
        >
            {/* Globe wireframe graphic - top left - hidden on small mobile */}
            <div className="absolute top-0 left-0 hidden sm:block">
                <Image
                    src="/3d sphere.png"
                    alt="Wireframe globe"
                    width={isMobile ? 200 : 400}
                    height={isMobile ? 200 : 400}
                    className="opacity-30 -translate-x-1/2 -translate-y-1/2 transform"
                />
            </div>

            {/* Bottom right wireframe graphic - hidden on small mobile */}
            <div className="absolute bottom-0 right-0 hidden sm:block">
                <Image
                    src="/3d diamond.png"
                    alt="Wireframe corner"
                    width={isMobile ? 150 : 300}
                    height={isMobile ? 150 : 300}
                    className="opacity-30 translate-x-1/3 translate-y-1/3 transform"
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 sm:mb-16 text-center tracking-wider"
                >
                    OUR STORY
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
                >
                    <p>Valuu Hub isn't just a digital marketing agency we're a team that lives and breathes brand growth.</p>

                    <p>
                        Started by three creators who've been on the ground and behind the scenes, we've built Valuu Hub to help
                        brands truly stand out, scale up, and make an impact.
                    </p>

                    <p>
                        With D.S. Sharma steering the vision as CEO, M. Sathwik driving execution as COO, and Md. Afrid leading
                        creative direction, we combine sharp strategy, seamless operations, and scroll-stopping content.
                    </p>

                    <p>We're not just here to run campaigns — we're here to fuel real, lasting growth.</p>
                </motion.div>

                {/* Team V button with wireframe elements - Centered at bottom */}
                <motion.div
                    className="flex justify-center mt-8 sm:mt-16 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <div className="relative flex items-center justify-center w-full max-w-md">
                        {/* Left wireframe sphere - hidden on mobile */}
                        <div className="absolute left-20 top-2/3 transform -translate-y-1/2 hidden sm:block">
                            <Image src="/3d sphere.png" alt="3D Sphere" width={80} height={80} className="opacity-75" />
                        </div>

                        {/* Button with glass effect */}
                        <motion.button
                            onClick={handleTeamClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white font-bold py-2 sm:py-3 px-8 sm:px-16 rounded-full border border-white/30 transition-all duration-300 z-10 mx-4 sm:mx-12 shadow-lg"
                        >
                            TEAM V
                        </motion.button>

                        {/* Right wireframe diamond - hidden on mobile */}
                        <div className="absolute right-24 top-1/4 transform -translate-y-1/2 hidden sm:block">
                            <Image src="/3d diamond.png" alt="3D Diamond" width={60} height={60} className="opacity-75" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
