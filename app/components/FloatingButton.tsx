'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronUp } from 'lucide-react'

export default function FloatingButton() {
  const [isInContactSection, setIsInContactSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact-section')
      if (contactSection) {
        const contactSectionTop = contactSection.offsetTop
        const scrollPosition = window.scrollY + window.innerHeight

        console.log('Scroll Position:', scrollPosition, 'Contact Section Top:', contactSectionTop);

        setIsInContactSection(scrollPosition >= contactSectionTop)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence initial={false}>
        {!isInContactSection ? (
          <motion.button
            key="contact"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToContact}
            className="bg-[#b9a154] text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
            aria-label="Scroll to contact section"
          >
            <HelpCircle size={24} />
          </motion.button>
        ) : (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="bg-[#b9a154] text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}