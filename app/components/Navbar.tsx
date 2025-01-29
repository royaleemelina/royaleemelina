'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import TopBanner from './top-banner'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about-us' },
    { name: 'What We Offer', href: '#what-we-offer' },
    { name: 'Venues', href: '#venues' },
  ]

  return (
    <>
      {/* <TopBanner /> */}
      <motion.nav 
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        // className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
        className={'fixed w-full z-50 transition-all duration-300 bg-white shadow-md'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className=" text-3xl md:text-4xl font-bold font-header text-[#b9a154]">
                Royale Emelina
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    // className={`px-3 py-2 rounded-md text-sm font-medium ${
                    //   isScrolled
                    //     ? 'text-gray-700 hover:text-yellow-600'
                    //     : 'text-white hover:text-yellow-300'
                    // } transition-colors duration-300`}
                    className={`px-3 py-2 rounded-md text-xl font-medium font-subheader text-gray-700 hover:text-[#b9a154] transition-colors duration-300`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <Button
                size="sm"
                className={`bg-[#b9a154] hover:bg-yellow-600 text-white transition-colors ${
                  isScrolled ? 'shadow-md' : ''
                }`}
                onClick={() => {
                  const contactSection = document.querySelector('#contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book Now
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                size="sm"
                variant="ghost"
                className={isScrolled ? 'text-gray-700' : 'text-white'}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-black bg-opacity-80'}`}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 }
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isScrolled
                    ? 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100'
                    : 'text-white hover:text-yellow-300 hover:bg-gray-900'
                } transition-colors duration-300`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Button
                size="sm"
                className="w-full bg-[#b9a154] hover:bg-yellow-600 text-white transition-colors"
                onClick={() => {
                  const contactSection = document.querySelector('#contact-section');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}