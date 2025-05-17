import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

// Import fonts
import { inter, poppins, bankGothic } from "./fonts"
import Footer from "@/components/Footer"
import AnimatedPointer from "@/components/AnimatedPointer"

export const metadata: Metadata = {
  title: "ValuuHub",
  description: "ValuuHub - WE BUILD | WE BRAND ",
  generator: "ValuuHub",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/ValuuHubLogo.png", type: "image/png", sizes: "32x32" }],
  },
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
