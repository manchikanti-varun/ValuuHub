"use client"
import { motion } from "framer-motion"
import TeamSection from "@/components/TeamSection"
import Navbar from "@/components/navbar"

export default function TeamPage() {
    return (
        <main className="min-h-screen w-full overflow-hidden bg-[#044CD9]">
            <Navbar />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <TeamSection />
            </motion.div>
        </main>
    )
}
