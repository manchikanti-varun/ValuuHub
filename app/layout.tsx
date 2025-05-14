import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Import fonts
import { inter, poppins, bankGothic } from "./fonts"

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
      <body className={`${inter.className}`}>{children}</body>
    </html>
  )
}
