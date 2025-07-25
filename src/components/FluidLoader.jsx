import React, { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

export default function FluidLoader({ onComplete }) {
  const controls = useAnimation()
  const filterRef = useRef(null)

  // Animate the filter turbulence (for moving water-pattern)
  useEffect(() => {
    let frame
    const animate = () => {
      if (filterRef.current) {
        const turbulence = filterRef.current
        const now = Date.now() / 700
        turbulence.setAttribute('seed', 1 + 10 * Math.sin(now))      // animated seed
        turbulence.setAttribute('baseFrequency', 0.03 + 0.02 * Math.cos(now))
      }
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => frame && cancelAnimationFrame(frame)
  }, [])

  // When the fill animation finishes, trigger scale-up and fade
  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({
        scale: 3,
        opacity: 0,
        transition: { duration: 1.3, ease: [0.4, 0.0, 0.2, 1] }
      }).then(() => onComplete?.())
    }, 2200) // Start scaling after the fluid effect plays for 2.2s
    return () => clearTimeout(timer)
  }, [controls, onComplete])

  return (
    <div className="fixed  inset-0 z-50 flex  items-center justify-center bg-black">
      {/* SVG defs for turbulent/animated fill */}
      <svg width="0" height="0">
        <filter id="fluid-fill-filter" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="2"
            result="turb"
          />
          <feDisplacementMap
            in2="turb"
            in="SourceGraphic"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Animated masked text */}
      <motion.svg
        initial={{ scale: 1, opacity: 1 }}
        animate={controls}
        width="800" height="180" viewBox="0 0 800 180"
        style={{ maxWidth: '95vw', maxHeight: 170 }}
      >
        <defs>
          <linearGradient id="fluid-color" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B12C00" />
            <stop offset="60%" stopColor="#FFF9E5" />
            <stop offset="100%" stopColor="#C75D2C" />
          </linearGradient>
        </defs>
        <text
          x="50%" y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="40"
          fontWeight="bold"
          fontFamily="'SamayFont', 'Poppins', Arial, sans-serif"
          fill="url(#fluid-color)"
          filter="url(#fluid-fill-filter)"
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            filter: "url(#fluid-fill-filter)",
            paintOrder: "stroke"
          }}
        >
          
          <tspan>Welcome </tspan>
          <tspan >to </tspan>
          <tspan >my </tspan>
          <tspan >Universe</tspan>
          

          
        </text>
      </motion.svg>
    </div>
  )
}
