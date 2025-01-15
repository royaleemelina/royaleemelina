'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: "Elegant Decor",
    description: "Royale Emelina showcases stunning decorations to match your event's theme.",
    image: "/images/decor.png"
  },
  {
    title: "Several Venues to Choose From",
    description: "Our place offers six venue options, each with its own distinct charm, for your special occassion.",
    image: "/images/venues.png"
  },
  {
    title: "Customized Catering",
    description: "Prepared with your guests in mind, our catering is customizable to suit your preference and budget.",
    image: "/images/catering.png"
  },
  {
    title: "Flexible Payment Terms",
    description: "Experience peace of mind ensuring a smooth event planning experience tailored to your convenience.",
    image: "/images/weddingo.png"
  },
  {
    title: "Expandable Venues",
    description: "Royale Emelina provides you an option to expand your desired venue.",
    image: "/images/thomas+emelinahall.jpg"
  },
  {
    title: "Other Accomodations",
    description: "Royale Emelina provides you accomodations such as a bridal car, and shuttle bus travel.",
    image: "/images/thomas+emelinahall.jpg"
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="what-we-offer" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-[#b9a154] font-header sm:text-5xl">
            Why Celebrate with Royale Emelina?
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-none"
            >
              <div className="w-full md:w-1/2 shrink-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-none">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl  font-bold text-[#b9a154] font-header">
                  {feature.title}
                </h3>
                <p className="text-[#333333] font-subheader">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}