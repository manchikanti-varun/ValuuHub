"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import ServicesDetail from "@/components/ServicesDetail"

export default function ServicesPage() {
    const [detailPage, setDetailPage] = useState(1)

    const handleNextPage = () => {
        setDetailPage(2)
    }

    const handlePrevPage = () => {
        setDetailPage(1)
    }

    return (
        <main
            className="min-h-screen w-full text-white overflow-hidden"
            style={{ background: "linear-gradient(to bottom, #03369B, #044CD9)" }}
        >
            <Navbar />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full">
                <ServicesDetail page={detailPage} onNext={handleNextPage} onPrev={handlePrevPage} />
            </motion.div>
        </main>
    )
}
