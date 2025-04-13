"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield } from "lucide-react"

export default function ConsentSplash() {
  const [showSplash, setShowSplash] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("userConsent") === "true"
    if (!hasConsented) {
      setShowSplash(true)
    }
    setLoading(false)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("userConsent", "true")
    setShowSplash(false)
  }

  if (loading) {
    return null // Don't render anything while checking localStorage
  }

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full border border-[#b9a154]/30"
          >
            {/* Decorative top border */}
            <div className="h-1 w-full bg-gradient-to-r from-[#b9a154] to-[#d4bc6a]"></div>

            <div className="relative p-8 text-center border-b border-gray-100">
              <div className="absolute top-8 left-8">
                <Shield className="h-8 w-8 text-[#b9a154]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#b9a154] mb-2">DATA PROCESSING CONSENT FORM</h2>
              <p className="text-gray-600 italic">Royale Emelina Event Venue</p>
            </div>

            <div className="p-8">
              <div className="mb-8 space-y-6">
                <p className="text-gray-700 text-lg text-center">
                  Before proceeding, we need your consent to collect and process your personal information for the
                  purpose of storing and managing your event reservation details.
                </p>

                <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
                  <p className="text-gray-700 mb-4">
                    By clicking "I Accept", you agree that Royale Emelina may collect, store, and process your personal
                    information (including name, email, phone number, and event details) for the following purposes:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                    <li>Processing and managing your event reservation</li>
                    <li>Contacting you regarding your booking</li>
                    <li>Providing you with relevant services related to your event</li>
                  </ul>
                  <p className="text-gray-600 text-sm italic">
                    Your information will be retained only for as long as necessary to fulfill these purposes or as
                    required by law. You may request access to, correction of, or deletion of your personal data at any
                    time by contacting us.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAccept}
                  className="px-10 py-3 text-lg bg-[#b9a154] text-white rounded-md hover:bg-opacity-90 transition-colors font-serif font-bold"
                >
                  I Accept
                </button>
              </div>

              {/* Decorative element */}
              <div className="flex justify-center mt-6">
                <div className="w-24 h-px bg-[#b9a154]/30"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
