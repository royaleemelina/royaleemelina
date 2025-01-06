'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Mail, MapPin, Phone, Send } from 'lucide-react'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formStatus, setFormStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('Sending...')
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormStatus('Message sent successfully!')
  }

  return (
    <section ref={ref} id="contact-section" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#b9a154] transform -skew-y-6 origin-top-left z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-header text-white sm:text-5xl mb-4">
            Get in Touch
          </h2>
          <p className="text-lg font-subheader text-white/80">
            Let's start planning your perfect day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 font-subheader">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Input type="text" placeholder="Your Name" required className="bg-white/10 border-white/20 text-white placeholder-white focus:ring-white rounded-none" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Input type="email" placeholder="Your Email" required className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white rounded-none" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Textarea placeholder="Your Message" required className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white rounded-none" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="w-full bg-white text-[#b9a154] hover:bg-white/90 transition-all duration-300 rounded-none">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </motion.div>
              {formStatus && <p className="text-center text-white">{formStatus}</p>}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg transform rotate-3" />
            <div className="relative bg-white/20 backdrop-blur-lg rounded-lg p-8 space-y-8 font-subheader">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <MapPin className="w-6 h-6 text-[#b9a154]" />
                </div>
                <p className="text-white">J. Miranda Ave, Naga City, 4400</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <Phone className="w-6 h-6 text-[#b9a154]" />
                </div>
                <a href="tel:+639478990466"  className="text-white">+63 947 899 0466</a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <Mail className="w-6 h-6 text-[#b9a154]" />
                </div>
                <p className="text-white">info@royaleemelina.com</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <Facebook className="w-6 h-6 text-[#b9a154]" />
                </div>
                <a href="https://facebook.com/royaleemelina" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                  facebook.com/royaleemelina
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
{/* <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900">Phone</h4>
                <a href="tel:+639478990466" className="text-yellow-700">+63 947 899 0466</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900">Email</h4>
                <a href="mailto:royaleemelina@yahoo.com.ph" className="text-yellow-700">royaleemelina@yahoo.com.ph</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900">Address</h4>
                <p className="text-yellow-700">123 Event Street, Quezon City, Philippines</p>
              </div>
            </div> */}