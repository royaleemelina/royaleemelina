'use client'

import {useCallback, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence} from 'framer-motion'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Venue = {
  id: string;
  name: string;
  capacity: string;
  images: string[];
}

const venues = [
  {
    id: '01',
    name: "Betina's Hall",
    capacity: '40 to 130 guests',
    images: [
      '/images/betinahall/bettinahall1.jpg',
      '/images/betinahall/bettinahall.jpg',
      '/images/betinahall/bettinahall2.jpg',
    ]
  },
  {
    id: '02',
    name: "Emelina's Hall",
    capacity: '40 to 130 guests',
    images: [
      '/images/emelinahall/emelinahall.jpg',
      '/images/emelinahall/emelinahall1.jpg',
      '/images/thomas+emelinahall1.jpg',
    ]
  },
  {
    id: '03',
    name: "Emelina's Garden",
    capacity: '40 to 130 guests',
    images: [
      '/images/emelinasgarden/emelinasgarden1.jpg',
      '/images/emelinasgarden/emelinasgarden.jpg',
      '/images/emelinasgarden/emelinasgarden2.jpg',
    ]
  },
  {
    id: '04',
    name: "Jillianne's Hall",
    capacity: '40 to 130 guests',
    images: [
      '/images/jilliannehall/jilliannehall1.jpg',
      '/images/jilliannehall/jilliannehall.jpg',
      '/images/jilliannehall/jilliannehall2.jpg',
    ]
  },
  {
    id: '05',
    name: "Starmark Hall",
    capacity: '40 to 160 guests',
    images: [
      '/images/starmarkhall/starmarkhall.jpg',
      '/images/starmarkhall/starmarkhall.png',
      '/images/starmarkhall/starmarkhall.png',
    ]
  },
  {
    id: '06',
    name: 'Thomas Hall',
    capacity: '120 to 220 guests',
    images: [
      '/images/thomashall/thomashall1.jpg',
      '/images/thomashall/thomashall.jpg',
      '/images/thomashall/thomashall2.jpg',
    ]
  },
  // id='venues'
]

function VenueCarousel({ venue, openGallery }: { venue: Venue; openGallery: (venue: Venue, index: number) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {venue.images.map((image, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0">
            <div className="aspect-[3/2] relative overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${venue.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => openGallery(venue, index)}
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center"
              >
                <span className="sr-only">View gallery</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-[#b9a154]" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-[#b9a154]" />
      </button>
    </div>
  )
}

export default function VenuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentVenue, setCurrentVenue] = useState<Venue | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openGallery = (venue: Venue, index: number) => {
    setCurrentVenue(venue)
    setCurrentImageIndex(index)
  }

  const closeGallery = () => {
    setCurrentVenue(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentVenue) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === currentVenue.images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (currentVenue) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? currentVenue.images.length - 1 : prevIndex - 1
      )
    }
  }

  return (
    <section ref={ref} id='venues' className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold text-[#b9a154] sm:text-5xl font-header">
            Our Exquisite Venues
          </h2>
          <p className="mt-4 text-xl text-[#333333] font-subheader">
            Choose the perfect setting for your unforgettable event
          </p>
        </motion.div>

        <div className="space-y-16">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center py-4`}
            >
              <div className="w-full lg:w-2/3">
                <VenueCarousel venue={venue} openGallery={openGallery} />
              </div>
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-center space-y-2 lg:px-4">
                <div className="font-subheader text-[#333333] text-xl">
                  {venue.id}
                </div>
                <h3 className="text-4xl font-header text-[#b9a154] text-center lg:text-left">
                  {venue.name}
                </h3>
                <p className="font-subheader text-[#333333] text-xl">
                  {venue.capacity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {currentVenue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={currentVenue.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${currentVenue.name} view ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#b9a154]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-[#b9a154]" />
                  </button>
                  <button
                    onClick={closeGallery}
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    aria-label="Close gallery"
                  >
                    <X className="w-6 h-6 text-[#b9a154]" />
                  </button>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-4xl font-header text-[#b9a154]">{currentVenue.name}</h3>
                  <p className="text-black text-base">{currentVenue.capacity}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}