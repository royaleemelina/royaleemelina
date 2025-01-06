"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function TopBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 text-white py-2 px-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">Enjoy a new level of Taste and Elegance</p>
        <Button variant="link" className="text-white hover:text-yellow-400">
            BOOK NOW! <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+639478990466" className="flex items-center hover:text-yellow-400">
              <Phone className="h-4 w-4 mr-2" />
              +63 947 899 0466
            </a>
            <a href="mailto:royaleemelina@yahoo.com.ph" className="flex items-center hover:text-yellow-400">
              <Mail className="h-4 w-4 mr-2" />
              royaleemelina@yahoo.com.ph
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}