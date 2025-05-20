"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import ServicesDetail from "@/components/ServicesDetail"

export default function ServicesPage() {
    const [detailPage, setDetailPage] = useState(1)
    const [isMobile, setIsMobile] = useState(false)

    // Check for mobile on client side
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize() // Initial check
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleNextPage = () => {
        setDetailPage(2)
    }

    const handlePrevPage = () => {
        setDetailPage(1)
    }

    return (
        <main className="min-h-screen w-full text-white overflow-hidden" style={{ backgroundColor: "#044CD9" }}>
            <Navbar />
            {isMobile ? (
                // Mobile version without animations
                <div className="w-full">
                    <ServicesDetail page={detailPage} onNext={handleNextPage} onPrev={handlePrevPage} />
                </div>
            ) : (
                // Desktop version with animations
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full">
                    <ServicesDetail page={detailPage} onNext={handleNextPage} onPrev={handlePrevPage} />
                </motion.div>
            )}
        </main>
    )
}
