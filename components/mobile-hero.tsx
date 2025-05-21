"use client"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import MobileTransitionScreen from "./mobile-transition-screen"
import { useTheme } from "next-themes"
import { MousePointerClick, ChevronDown } from "lucide-react"

export default function MobileHero() {
    const [showTransition, setShowTransition] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [spherePosition, setSpherePosition] = useState({ x: 0, y: 0 })
    const [hideOriginalSphere, setHideOriginalSphere] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)

    const heroRef = useRef<HTMLDivElement>(null)
    const sphereRef = useRef<HTMLDivElement>(null)
    const transitionRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { theme } = useTheme()

    // Track scroll position for animations
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    // Transform values for parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

    // Spring animations for smoother motion
    const springY = useSpring(y, { stiffness: 100, damping: 30 })
    const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

    // Mouse follower effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Particle animation for the canvas
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            if (canvas && canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth
                canvas.height = canvas.parentElement.clientHeight
            }
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Particle system
        const particles: Particle[] = []
        const particleCount = 50

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            alpha: number

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 3 + 1
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5
                this.color = "#FFFFFF"
                this.alpha = Math.random() * 0.5 + 0.1
            }

            update(mouseX: number, mouseY: number) {
                this.x += this.speedX
                this.y += this.speedY

                // Boundary check
                if (this.x > canvas.width) this.x = 0
                else if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                else if (this.y < 0) this.y = canvas.height

                // Mouse interaction
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 100) {
                    const angle = Math.atan2(dy, dx)
                    const force = (100 - distance) / 500
                    this.speedX -= Math.cos(angle) * force
                    this.speedY -= Math.sin(angle) * force
                }

                // Apply some drag
                this.speedX *= 0.99
                this.speedY *= 0.99
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.globalAlpha = this.alpha
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        // Animation loop
        let animationFrameId: number

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach((particle) => {
                particle.update(mousePosition.x, mousePosition.y)
                particle.draw(ctx)
            })

            // Draw connections between particles
            ctx.globalAlpha = 0.1
            ctx.strokeStyle = "#FFFFFF"
            ctx.lineWidth = 0.5

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.globalAlpha = 0.1 * (1 - distance / 100)
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }

        canvas.addEventListener("mousemove", handleMouseMove)

        // Cleanup
        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
            canvas.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [mousePosition])

    // Track mouse movement for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            mouseX.set(clientX)
            mouseY.set(clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [mouseX, mouseY])

    // Loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    function handleGetInTouch() {
        // Capture the current position of the sphere for animation
        if (sphereRef.current) {
            const rect = sphereRef.current.getBoundingClientRect()
            setSpherePosition({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            })
        }

        // Immediately hide the original sphere
        setHideOriginalSphere(true)
        setIsAnimating(true)
        setShowTransition(true)

        // Scroll to transition section with a much slower speed
        setTimeout(() => {
            const transitionSection = document.getElementById("transition-section")
            if (transitionSection) {
                // Use a custom scroll function for slower scrolling
                const startPosition = window.pageYOffset
                const targetPosition = transitionSection.offsetTop
                const distance = targetPosition - startPosition
                const duration = 3000 // 3 seconds for scrolling
                let start: number | null = null

                function step(timestamp: number) {
                    if (!start) start = timestamp
                    const progress = timestamp - start
                    const percentage = Math.min(progress / duration, 1)

                    // Use easeInOutQuad easing function for smoother scrolling
                    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

                    window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage))

                    if (progress < duration) {
                        window.requestAnimationFrame(step)
                    }
                }

                window.requestAnimationFrame(step)
            }
        }, 300) // Longer delay before scrolling starts
    }

    // Handle transition completion
    const handleTransitionComplete = () => {
        setShowTransition(false)

        // Show the original sphere again after a short delay
        setTimeout(() => {
            setHideOriginalSphere(false)
            setIsAnimating(false)
        }, 500)
    }

    return (
        <>
            <section
                ref={heroRef}
                className="relative w-full text-white px-4 pt-8 pb-8 text-center overflow-hidden min-h-screen flex flex-col"
                style={{
                    background: "linear-gradient(135deg, #044CD9 0%, #0A2A8F 100%)",
                }}
            >
                {/* Interactive particle background */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.6 }} />
                </div>

                {/* Animated sphere */}
                <motion.div
                    ref={sphereRef}
                    className={`absolute z-10 ${hideOriginalSphere ? "opacity-0" : ""}`}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(129, 158, 217, 0.8) 50%, rgba(4, 76, 217, 0.6))",
                        boxShadow: "0 0 60px rgba(255, 255, 255, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.4)",
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                        filter: "blur(0.5px)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: isLoaded ? 1 : 0,
                        opacity: isLoaded ? 1 : 0,
                        x: "-50%",
                        y: "-50%",
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                    }}
                />

                {/* Background large outline text with animations - smaller for mobile */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="absolute top-[40%] left-0 whitespace-nowrap"
                        style={{
                            fontFamily: "Impact, sans-serif",
                            fontWeight: 400,
                            fontSize: "50px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                            overflow: "visible",
                        }}
                    >
                        <p>DIGITAL MARKETING DIGITAL MARKETING</p>
                    </motion.div>

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                        className="absolute top-[48%] right-0 whitespace-nowrap"
                        style={{
                            fontFamily: "Impact, sans-serif",
                            fontWeight: 400,
                            fontSize: "50px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                            overflow: "visible",
                        }}
                    >
                        <p>SOCIAL MEDIA MARKETING SOCIAL MEDIA MARKETING</p>
                    </motion.div>

                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
                        className="absolute top-[56%] left-0 whitespace-nowrap"
                        style={{
                            fontFamily: "Impact, sans-serif",
                            fontWeight: 400,
                            fontSize: "50px",
                            lineHeight: "100%",
                            letterSpacing: "0",
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                            overflow: "visible",
                        }}
                    >
                        <p>DIGITAL MARKETING DIGITAL MARKETING</p>
                    </motion.div>
                </div>

                {/* Main content structure */}
                <motion.div
                    className="flex flex-col min-h-screen relative z-10"
                    style={{
                        y: springY,
                        opacity: springOpacity,
                        scale: springScale,
                    }}
                >
                    {/* Top section with title and content */}
                    <div className="flex-none h-[30vh] flex flex-col items-center justify-end relative z-10">
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        >
                            <h1
                                className="mt-16 text-center relative"
                                style={{
                                    fontFamily: "bankGothic",
                                    fontSize: "40px",
                                    lineHeight: "100%",
                                    fontWeight: 400,
                                    letterSpacing: "0.2em",
                                    background: "linear-gradient(to bottom, #819ED9, #FFFFFF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                VALUU HUB
                                <motion.span
                                    className="absolute inset-0"
                                    style={{
                                        fontFamily: "bankGothic",
                                        fontSize: "40px",
                                        lineHeight: "100%",
                                        fontWeight: 400,
                                        letterSpacing: "0.2em",
                                        WebkitTextFillColor: "transparent",
                                        WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                                        filter: "blur(4px)",
                                    }}
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                        filter: ["blur(4px)", "blur(8px)", "blur(4px)"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                >
                                    VALUU HUB
                                </motion.span>
                            </h1>
                        </motion.div>

                        {/* Alternative font fallback */}
                        <style jsx>{`
                          h1 {
                            font-family: "BankGothic RUSS", "BankGothic", Impact, sans-serif;
                          }
                        `}</style>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="mb-2"
                            style={{
                                fontFamily: "var(--font-poppins)",
                                fontSize: "14px",
                                lineHeight: "100%",
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                            }}
                        >
                            <span className="block mb-2">B U I L D&nbsp;&nbsp;B R A N D</span>
                            <span className="block">T H I N K&nbsp;&nbsp;V A L U U</span>
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="max-w-2xl mx-auto text-blue-100 mb-8 mt-4 px-4"
                            style={{
                                fontFamily: "var(--font-poppins)",
                                fontSize: "14px",
                                lineHeight: "150%",
                                fontWeight: 500,
                            }}
                        >
                            Hi, at <strong>ValuuHub</strong>, we build, we brand, and we turn clicks into cult followings
                        </motion.p>

                        {/* Get In Touch Button */}
                        <motion.button
                            onClick={handleGetInTouch}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, delay: 1.1 }}
                            className="relative px-12 py-5 rounded-full overflow-hidden group flex items-center justify-center"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-70 group-hover:opacity-80 transition-opacity duration-300 rounded-full"></span>
                            <span className="absolute inset-0 w-full h-full border border-white opacity-20 rounded-full"></span>
                            <span className="relative z-10 flex items-center justify-center text-white font-semibold tracking-wide text-base">
                                GET IN TOUCH
                                <MousePointerClick className="ml-3 w-5 h-5" />
                            </span>
                        </motion.button>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <span className="text-xs text-blue-100 mb-2 opacity-70">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                        >
                            <ChevronDown className="w-5 h-5 text-blue-100 opacity-70" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Transition screen */}
            <AnimatePresence>
                {showTransition && (
                    <MobileTransitionScreen
                        isAnimating={isAnimating}
                        spherePosition={spherePosition}
                        onAnimationComplete={handleTransitionComplete}
                    />
                )}
            </AnimatePresence>

            {/* Transition section target */}
            <div id="transition-section" className="h-0"></div>
        </>
    )
}
