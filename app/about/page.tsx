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
        <main className="min-h-screen w-full overflow-hidden bg-gray-300 flex flex-col">
            {/* Blue content section */}
            <div
                className="relative w-full flex-grow px-6 md:px-12 py-16 text-white overflow-hidden"
                style={{
                    background: "linear-gradient(to bottom, #03369B, #1C67FB)",
                }}
            >
                {/* Globe wireframe graphic - top left */}
                <div className="absolute top-0 left-0">
                    <Image
                        src="/3d sphere.png"
                        alt="Wireframe globe"
                        width={400}
                        height={400}
                        className="opacity-30 -translate-x-1/2 -translate-y-1/2 transform"
                    />
                </div>

                {/* Bottom right wireframe graphic */}
                <div className="absolute bottom-0 right-0">
                    <Image
                        src="/3d diamond.png"
                        alt="Wireframe corner"
                        width={300}
                        height={300}
                        className="opacity-30 translate-x-1/3 translate-y-1/3 transform"
                    />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-extrabold mb-16 text-center tracking-wider"
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
                            Valuu Hub isn't your typical digital marketing agency — we're a team that lives and breathes brand growth.
                        </p>

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
                        className="flex justify-center mt-16 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <div className="relative flex items-center justify-center w-full max-w-md">
                            {/* Left wireframe sphere */}
                            <div className="absolute left-20 top-2/3 transform -translate-y-1/2">
                                <Image src="/3d sphere.png" alt="3D Sphere" width={80} height={80} className="opacity-75" />
                            </div>

                            {/* Button */}
                            <button
                                onClick={handleTeamClick}
                                className="bg-transparent hover:bg-blue-600/30 text-white font-bold py-3 px-16 rounded-full border border-white/30 transition-all duration-300 z-10 mx-12"
                            >
                                Team V
                            </button>

                            {/* Right wireframe diamond */}
                            <div className="absolute right-24 top-1/4 transform -translate-y-1/2">
                                <Image src="/3d diamond.png" alt="3D Diamond" width={60} height={60} className="opacity-75" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
