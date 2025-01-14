'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

type Venue = {
  name: string;
  capacity: string;
  mainImage: string;
  additionalImages: string[];
}

const venues = [
  {
    id: '01',
    name: "Betina's Hall",
    capacity: 'Up to 130 guests',
    images: [
      '/images/betinahall/bettinahall1.jpg',
      '/images/betinahall/bettinahall.jpg',
      '/images/betinahall/bettinahall2.jpg',
    ]
  },
  {
    id: '02',
    name: "Emelina's Hall",
    capacity: 'Up to 160 guests',
    images: [
      '/images/emelinahall/emelinahall.jpg',
      '/images/emelinahall/emelinahall1.jpg',
      '/images/thomas+emelinahall1.jpg',
    ]
  },
  {
    id: '03',
    name: "Emelina's Garden",
    capacity: 'Up to 160 guests',
    images: [
      '/images/emelinasgarden/emelinasgarden1.jpg',
      '/images/emelinasgarden/emelinasgarden.jpg',
      '/images/emelinasgarden/emelinasgarden2.jpg',
    ]
  },
  {
    id: '04',
    name: "Jillianne's Hall",
    capacity: 'Up to 160 guests',
    images: [
      '/images/jilliannehall/jilliannehall.jpg',
      '/images/jilliannehall/jilliannehall1.jpg',
      '/images/jilliannehall/jilliannehall2.jpg',
    ]
  },
  {
    id: '05',
    name: "Starmark Hall",
    capacity: 'Up to 160 guests',
    images: [
      '/images/starmarkhall/starmarkhall.jpg',
      '/images/jillianneshall1.png',
      '/images/jillianneshall2.png',
    ]
  },
  {
    id: '06',
    name: 'Thomas Hall',
    capacity: 'Up to 160 guests',
    images: [
      '/images/thomashall/thomashall1.jpg',
      '/images/thomashall/thomashall.jpg',
      '/images/thomashall/thomashall2.png',
    ]
  },
]

export default function VenuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id='venues' className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2"
        >
          <h2 className="text-4xl font-bold text-[#b9a154] sm:text-5xl font-header">
            Our Exquisite Venues
          </h2>
          <p className="mt-4 text-xl text-[#333333] font-subheader">
            Choose the perfect setting for your unforgettable event
          </p>
        </motion.div>
        
        
        <div className="divide-y divide-gray-900">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center py-16`}
            >
              <div className="w-full lg:w-2/3">
                <Carousel className="relative w-full">
                  <CarouselContent>
                    {venue.images.map((image, imageIndex) => (
                      <CarouselItem key={imageIndex} className="relative overflow-hidden">
                        <div className="aspect-[16/9] w-full">
                          <Image
                            src={image}
                            alt={`${venue.name} view ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
              </div>
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-center space-y-2 lg:px-4">
                <div className="font-subheader text-[#333333] text-xl">
                  {venue.id}
                </div>
                <h3 className="text-4xl font-header font-bold text-[#b9a154] text-center lg:text-left">
                  {venue.name}
                </h3>
                <p className="font-subheader text-[#333333] text-lg">
                  {venue.capacity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}