"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Mail, MapPin, Phone, Send, Info, X, Shield } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formStatus, setFormStatus] = useState("")
  const [showConsentInfo, setShowConsentInfo] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!consentChecked) {
      setFormStatus("Please accept the data processing consent to proceed.")
      setTimeout(() => setFormStatus(""), 3000)
      return
    }

    setFormStatus("Sending...")
    const form = e.currentTarget
    const body = JSON.stringify({
      access_key: "bcd529e7-8e06-44a0-a406-5d279b68bf2b",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      desireddate: (form.elements.namedItem("desireddate") as HTMLInputElement).value,
      guests: (form.elements.namedItem("guests") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    })
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    })
    const result = await response.json()
    if (result.success) {
      console.log(result)
    }
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setFormStatus("Message sent successfully!")
    // Clear form fields
    e.currentTarget.reset()
    setConsentChecked(false)
    // Reset form status after 3 seconds
    setTimeout(() => setFormStatus(""), 3000)
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
          <h2 className="text-4xl font-header text-white sm:text-5xl mb-4">Get in Touch</h2>
          <p className="text-lg font-subheader text-white/80">Let's start planning your perfect day</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor="name" className="block text-white mb-2 font-subheader text-xl">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-white/10 border-white/20 text-white focus:ring-white"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor="date" className="block text-white mb-2 font-subheader text-xl">
                    Desired Date
                  </label>
                  <Input
                    id="desireddate"
                    type="date"
                    required
                    className="bg-white/10 border-white/20 text-white focus:ring-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor="guests" className="block text-white mb-2 font-subheader text-xl">
                    Number of Guests
                  </label>
                  <Input
                    id="guests"
                    type="number"
                    required
                    min="1"
                    max="300"
                    className="bg-white/10 border-white/20 text-white focus:ring-white"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor="email" className="block text-white mb-2 font-subheader text-xl">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-white/10 border-white/20 text-white focus:ring-white"
                    placeholder="email@example.com"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label htmlFor="phone" className="block text-white mb-2 font-subheader text-xl">
                    Contact Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="bg-white/10 border-white/20 text-white focus:ring-white"
                  />
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <label htmlFor="message" className="block text-white mb-2 font-subheader text-xl">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  required
                  className="bg-white/10 border-white/20 text-white focus:ring-white"
                  placeholder="Enter Message"
                />
              </motion.div>

              {/* Consent Checkbox */}
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#b9a154] focus:ring-[#b9a154]"
                  required
                />
                <label htmlFor="consent" className="text-white font-subheader">
                  I accept the data processing consent
                </label>
                <button
                  type="button"
                  onClick={() => setShowConsentInfo(true)}
                  className="text-white hover:text-white/80 focus:outline-none"
                  aria-label="View data processing information"
                >
                  <Info className="h-5 w-5" />
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-white text-[#b9a154] font-subheader text-xl hover:bg-white/90 transition-all duration-300"
                >
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
                <a href="tel:+639478990466" className="text-white">
                  +63 947 899 0466
                </a>
                <a href="tel:+639177919529" className="text-white">
                  +63 917 791 9529
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <Mail className="w-6 h-6 text-[#b9a154]" />
                </div>
                <a href="mailto:royaleemelina08@gmail.com" className="text-white">
                  royaleemelina08@gmail.com
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2">
                  <Facebook className="w-6 h-6 text-[#b9a154]" />
                </div>
                <a
                  href="https://www.facebook.com/p/Royale-Emelina-100065265409615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  facebook.com/royaleemelina
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Data Processing Consent Modal */}
      <AnimatePresence>
        {showConsentInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowConsentInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top border */}
              <div className="h-1 w-full bg-gradient-to-r from-[#b9a154] to-[#d4bc6a]"></div>

              <div className="relative p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#b9a154] mr-2" />
                  <h3 className="text-xl font-header font-bold text-[#b9a154]">DATA PROCESSING CONSENT</h3>
                </div>
                <button
                  onClick={() => setShowConsentInfo(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 font-subheader">
                    By accepting this consent, you agree that Royale Emelina may collect, store, and process your
                    personal information (including name, email, phone number, and event details) for the following
                    purposes:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 font-subheader">
                    <li>Processing and managing your event reservation</li>
                    <li>Contacting you regarding your booking</li>
                    <li>Providing you with relevant services related to your event</li>
                  </ul>
                  <p className="text-gray-600 text-sm italic mt-4 font-subheader">
                    Your information will be retained only for as long as necessary to fulfill these purposes or as
                    required by law. You may request access to, correction of, or deletion of your personal data at any
                    time by contacting us.
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => {
                      setShowConsentInfo(false)
                      setConsentChecked(true)
                    }}
                    className="bg-[#b9a154] text-white hover:bg-[#b9a154]/90 font-subheader"
                  >
                    Accept & Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
