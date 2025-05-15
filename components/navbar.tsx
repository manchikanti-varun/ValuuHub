"use client"
import type React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push("/")
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="relative flex items-center justify-center h-32">
        {/* Decorative Lines */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain z-0"
          style={{
            backgroundImage: 'url("/nav-lines.png")',
          }}
        />

        {/* Logo and Navigation */}
        <div className="z-10 flex flex-col items-center">
          {/* Logo - Made clickable */}
          <div
            className="mb-4 cursor-pointer"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            aria-label="Go to home page"
            onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
          >
            <Image src="/ValuuHubLogo.png" alt="ValuuHub Logo" width={50} height={50} priority />
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-10 text-[18px] font-normal tracking-[2px] uppercase">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact Us" />
          </nav>
        </div>
      </div>
    </header>
  )
}

// Extracted NavLink component for consistency and hover color fix
function NavLink({ href, label }: { href: string; label: string }) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className="transition-colors hover:text-[#E2B01B] cursor-pointer">
      {label}
    </a>
  )
}
