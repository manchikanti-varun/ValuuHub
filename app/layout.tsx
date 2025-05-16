import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Import fonts
import { inter, poppins, bankGothic } from "./fonts"
import Footer from "@/components/Footer"
import AnimatedPointer from "@/components/AnimatedPointer"

export const metadata: Metadata = {
  title: "ValuuHub",
  description: "ValuuHub - Build Brand | Think Valuu",
  generator: "ValuuHub",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${bankGothic.variable} `}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AnimatedPointer />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
