"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function OurMission() {
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }

    return (
        <main className="min-h-screen w-full text-white overflow-hidden" style={{ backgroundColor: "#044CD9" }}>
            <Navbar />
            <div className="w-full min-h-screen flex flex-col items-start justify-center px-4 md:px-8 py-16">
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-5xl md:text-5xl font-bold mb-16 tracking-wide text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        OUR MISSION
                    </motion.h1>

                    <motion.div
                        className="text-xl md:text-xl leading-relaxed text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p className="mb-8">
                            At VALUU HUB, our mission is clear and ambitious: to become the no.1 digital marketing agency in Hyderabad
                            by delivering exceptional results, creating meaningful impact, and setting new benchmarks in the industry.
                        </p>

                        <p className="mb-8">
                            We are a mission-driven team committed to pushing boundaries. Our work is fueled by creativity, data, and
                            an unwavering focus on performance. Every strategy we craft and every campaign we execute is part of our
                            larger vision to redefine how brands grow in the digital space.
                        </p>

                        <p className="mb-8">
                            What drives us is a deep commitment to client success, a culture of continuous innovation, and a
                            relentless pursuit of excellence. We believe in doing work that speaks for itself, driven by results and
                            built on trust. With a dynamic team, a forward-thinking approach, and a focus on execution, we are
                            building a legacy of impact, one brand at a time.
                        </p>

                        <p className="mb-8">
                            Our goal is not just to be another agency. We are here to lead, to inspire, and to transform the digital
                            marketing landscape. Hyderabad is where our journey begins, but our vision extends far beyond.
                        </p>

                        <p>We are VALUU HUB. Passionate. Strategic. Ready to take the lead.</p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    )
}
