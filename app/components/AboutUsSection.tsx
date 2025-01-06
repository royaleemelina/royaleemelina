'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"

export default function AboutUsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top, bottom } = ref.current.getBoundingClientRect()
        if (top <= 0 && bottom >= 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={ref} id="about-us" className="relative min-h-screen flex overflow-hidden">
      {/* Left side with parallax image */}
      <div className="hidden md:block w-1/2 relative">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/images/royale (1).jpg')",
          }}
        />
      </div>

      {/* Right side with content */}
      <div className="w-full md:w-1/2 min-h-screen bg-white px-4 sm:px-12 lg:px-24 py-24 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-header text-[#b9a154] mb-8">
            WELCOME TO
            <span className="block mt-2">Royale Emelina</span>
          </h2>
          
          <div className="space-y-6 text-lg text-[#333333] font-subheader">
            <p>
              Royale Emelina is more than just an event center; it's a canvas for your dreams and a stage for your most cherished moments. With our blend of timeless elegance and modern sophistication, we transform ordinary gatherings into extraordinary experiences.
            </p>
            
            <p>
              Founded in 2010, we have spent over a decade perfecting the art of event hosting. Our dedicated team of professionals works tirelessly to ensure that every detail of your event is meticulously planned and flawlessly executed.
            </p>

            <p>
             From intimate gatherings to grand celebrations, Royale Emelina provides the perfect backdrop for weddings, corporate events, birthdays, and any occasion that calls for a touch of elegance and a lot of joy.
            </p>

            <Button 
              className="mt-8 bg-[#b9a154] font-subheader text-white hover:bg-yellow-500 transition-colors duration-300 rounded-none"
              onClick={() => {
                const whatWeOfferSection = document.querySelector('#what-we-offer')
                if (whatWeOfferSection) {
                  whatWeOfferSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Discover What We Offer
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}