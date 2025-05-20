"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogoClick = () => {
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="w-full text-white" style={{ background: "linear-gradient(to bottom, #03369B, #044CD9)" }}>
      <div className="relative flex items-center justify-between px-4 md:justify-center h-24">
        {/* Decorative Lines - Hidden on mobile */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain z-0 hidden md:block"
          style={{
            backgroundImage: 'url("/nav-lines.png")',
          }}
        />

        {/* Mobile menu button - Only visible on mobile */}
        <button
          className="absolute top-6 right-4 z-50 md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={32} className="text-white" /> : <Menu size={32} className="text-white" />}
        </button>

        {/* Logo and Navigation */}
        <div className="z-10 flex flex-col items-center">
          {/* Logo - Made clickable */}
          <div
            className="mb-2 md:mb-4 cursor-pointer"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            aria-label="Go to home page"
            onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
          >
            <Image src="/ValuuHubLogo.png" alt="ValuuHub Logo" width={50} height={50} priority />
          </div>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex space-x-6 lg:space-x-10 text-[16px] lg:text-[18px] font-normal tracking-[2px] uppercase">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact Us" />
          </nav>
        </div>

        {/* Empty div for flex spacing on mobile */}
        <div className="w-8 md:hidden"></div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-blue-900/60 backdrop-blur-md md:hidden">
            <nav className="flex flex-col items-center space-y-8 text-[22px] font-normal tracking-[2px] uppercase">
              <NavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
              <NavLink href="/about" label="About Us" onClick={() => setMobileMenuOpen(false)} />
              <NavLink href="/services" label="Services" onClick={() => setMobileMenuOpen(false)} />
              <NavLink href="/contact" label="Contact Us" onClick={() => setMobileMenuOpen(false)} />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Reusable NavLink component
function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
    if (onClick) onClick()
  }

  return (
    <a href={href} onClick={handleClick} className="transition-colors hover:text-[#E2B01B] cursor-pointer">
      {label}
    </a>
  )
}
