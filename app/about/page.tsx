"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
    const router = useRouter()

    const handleTeamClick = () => {
        // Navigate to the team section
        router.push("/team")
    }

    return (
        <main className="min-h-screen w-full overflow-hidden bg-gray-300">
            {/* Blue content section */}
            <div
                className="relative w-full px-6 md:px-12 py-16 text-white overflow-hidden"
                style={{
                    background: "linear-gradient(to bottom, #03369B, #1C67FB)",
                    minHeight: "calc(100vh - 70px)", // Adjust based on the gray header height
                }}
            >
                {/* Globe wireframe graphic - top left */}
                <div className="absolute top-0 left-0">
                    <Image
                        src="3d sphere.png"
                        alt="Wireframe globe"
                        width={400}
                        height={400}
                        className="opacity-30 -translate-x-1/2 -translate-y-1/2 transform"
                    />
                </div>

                {/* Bottom right wireframe graphic - only partially visible */}
                <div className="absolute bottom-0 right-0 overflow-hidden">
                    <div className="relative">
                        <Image
                            src="3d diamond.png"
                            alt="Wireframe corner"
                            width={400}
                            height={400}
                            className="opacity-30 translate-x-1/3 translate-y-1/3 transform"
                        />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-light mb-16 text-center"
                        style={{ fontFamily: "Impact, sans-serif" }}
                    >
                        OUR STORY
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="space-y-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
                    >
                        <p>
                            Valuu Hub isn't your typical digital marketing agency we're a team that lives and breathes brand growth.
                        </p>

                        <p>
                            Started by three creators who've been on the ground and behind the scenes, we've built Valuu Hub to help
                            brands truly stand out, scale up, and make an impact.
                        </p>

                        <p>
                            With D.S. Sharma steering the vision as CEO, M. Sathwik driving execution as COO, and Md. Afrid leading
                            creative direction, we combine sharp strategy, seamless operations, and scroll-stopping content.
                        </p>

                        <p>We're not just here to run campaigns we're here to fuel real, lasting growth.</p>
                    </motion.div>

                    {/* Team V button with wireframe elements */}
                    <motion.div
                        className="flex justify-center mt-16 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <div className="relative">
                            <Image
                                src="3d circle.png"
                                alt="Button wireframe"
                                width={200}
                                height={80}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
                            />
                            <button
                                onClick={handleTeamClick}
                                className="bg-blue-600 bg-opacity-50 hover:bg-opacity-70 text-white font-bold py-4 px-12 rounded-full border border-white border-opacity-30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center relative z-10"
                            >
                                Team V
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
