'use client'

import { Button } from "@/components/ui/button"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} id="home" className="relative h-screen pt-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          src='/royaleemelina.mp4'
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } }
          }}
          className="text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-bold sm:text-5xl md:text-8xl text-yellow-100 mb-6 tracking-wide font-header"
          >
            ROYALE EMELINA
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-yellow-50 mb-8 max-w-3xl mx-auto leading-relaxed font-subheader"
          >
            Open your eyes to an experience like no other. Step into a world of extraordinary elegance and timeless taste, where every moment is thoughtfully designed to inspire awe.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button asChild
              size="lg" 
              className="bg-transparent border-white border-2 font-subheader text-white hover:bg-yellow-600 duration-300 text-lg px-8 py-3 rounded-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
             <a href='https://www.royaleemelina.setmore.com' target='_blank' rel='noreferrer'>BOOK NOW</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent opacity-70" />
    </section>
  )
}