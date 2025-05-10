"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Define venue type
type Venue = {
  id: string
  name: string
  capacity: string
  images: string[]
  renovated?: boolean
}

// Venue data
const venues = [
  {
    id: "01",
    name: "Betina's Hall",
    capacity: "40 to 130 guests",
    images: [
      "/images/betinahall/bettinahall1.jpg",
      "/images/betinahall/bettinahall.jpg",
      "/images/betinahall/bettinahall2.jpg",
      "/images/betinahall/bettinahall3.jpg",
    ],
  },
  {
    id: "02",
    name: "Emelina's Hall",
    capacity: "120 to 150 guests",
    images: [
      "/images/emelinahall/emelinahall.jpg",
      "/images/emelinahall/emelinahall1.jpg",
      "/images/thomas+emelinahall1.jpg",
      "/images/thomas+emelinahall.jpg",
    ],
  },
  {
    id: "03",
    name: "Emelina's Garden",
    capacity: "40 to 130 guests",
    images: [
      "/images/emelinasgarden/emelinasgarden1.jpg",
      "/images/emelinasgarden/emelinasgarden.jpg",
      "/images/emelinasgarden/emelinasgarden2.jpg",
      "/images/emelinasgarden/emelinasgarden3.jpg",
    ],
  },
  {
    id: "04",
    name: "Jillianne's Hall",
    capacity: "40 to 130 guests",
    images: [
      "/images/jilliannehall/jilliannehall1.jpg",
      "/images/jilliannehall/jilliannehall.jpg",
      "/images/jilliannehall/jilliannehall2.jpg",
    ],
  },
  {
    id: "05",
    name: "Starmark Hall",
    capacity: "120 to 170 guests",
    renovated: true,
    images: [
      "/images/starmarkhall/starmarkhall.jpg",
      "/images/starmarkhall/starmarkhall1.jpg",
      "/images/starmarkhall/starmarkhall2.jpg",
    ],
  },
  {
    id: "06",
    name: "Thomas Hall",
    capacity: "150 to 220 guests",
    renovated: true,
    images: [
      "/images/thomashall/thomashall.jpg",
      "/images/thomashall/thomashall1.jpg",
      "/images/thomashall/thomashall2.jpg",
      "/images/thomashall/thomashall3.jpg",
      "/images/thomashall/thomashall4.jpg",
    ],
  },
]

// Detect if we're on a mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // Check if the user agent contains mobile keywords
      const userAgent = typeof navigator !== 'undefined' ? (navigator.userAgent || navigator.vendor || "") : ""
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i

      // Also check screen width as a fallback
      const isMobileWidth = window.innerWidth <= 768

      setIsMobile(mobileRegex.test(userAgent.toLowerCase()) || isMobileWidth)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Simple carousel component with no dependencies
function BasicCarousel({ venue, openGallery }: { venue: Venue; openGallery: (venue: Venue, index: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? venue.images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === venue.images.length - 1 ? 0 : prev + 1))
  }

  // Fallback image for errors
  const fallbackImage = "/placeholder.svg?height=600&width=900&text=Image+Not+Found"

  // For desktop, use a simpler approach with regular img tags
  if (!isMobile) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-[3/2] relative overflow-hidden">
          <img
            src={venue.images[currentIndex] || fallbackImage}
            alt={`${venue.name} view ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = fallbackImage
            }}
          />
          <div
            onClick={() => openGallery(venue, currentIndex)}
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          >
            <span className="sr-only">View gallery</span>
          </div>
        </div>

        {venue.images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-[#b9a154]" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-[#b9a154]" />
            </button>
          </>
        )}
      </div>
    )
  }

  // For mobile, use the Next.js Image component
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="aspect-[3/2] relative overflow-hidden">
        <Image
          src={venue.images[currentIndex] || fallbackImage}
          alt={`${venue.name} view ${currentIndex + 1}`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = fallbackImage
          }}
        />
        <button
          onClick={() => openGallery(venue, currentIndex)}
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center"
        >
          <span className="sr-only">View gallery</span>
        </button>
      </div>

      {venue.images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-[#b9a154]" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-[#b9a154]" />
          </button>
        </>
      )}
    </div>
  )
}

export default function VenuesSection() {
  const [currentVenue, setCurrentVenue] = useState<Venue | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useIsMobile()

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)

    // Force a re-render after a short delay to ensure proper hydration
    const timer = setTimeout(() => {
      setIsClient(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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
      setCurrentImageIndex((prevIndex) => (prevIndex === currentVenue.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (currentVenue) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? currentVenue.images.length - 1 : prevIndex - 1))
    }
  }

  // Simple loading state for server-side rendering
  if (!isClient) {
    return (
      <section id="venues" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#b9a154] sm:text-5xl">Our Exquisite Venues</h2>
          <p className="mt-8 text-gray-600">Loading venues...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="venues" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-serif font-bold text-[#b9a154] sm:text-5xl">Our Exquisite Venues</h2>
        </div>

        <div className="space-y-16">
          {venues.map((venue, index) => (
            <React.Fragment key={venue.id}>
              <div
                className={`flex flex-col gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center py-16`}
              >
                <div className="w-full lg:w-2/3">
                  <BasicCarousel venue={venue} openGallery={openGallery} />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start justify-center space-y-2 lg:px-4">
                  <div className="font-serif text-[#333333] text-lg">{venue.id}</div>
                  <div className="flex flex-col items-center lg:items-start">
                    <h3 className="text-2xl font-serif font-bold text-[#b9a154] text-center lg:text-left">
                      {venue.name}
                    </h3>
                    {venue.renovated && (
                        <span className="inline-block bg-[#b9a154] text-white text-xs px-2 py-1 rounded mt-1 font-medium">
                          NEWLY RENOVATED
                        </span>
                    )}
                  </div>
                  <p className="text-[#333333] text-sm">{venue.capacity}</p>
                </div>
              </div>
              {index < venues.length - 1 && <hr className="border-t border-black my-8" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {currentVenue && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="relative aspect-[16/9]">
                {/* Use different approaches for mobile vs desktop */}
                {isMobile ? (
                  <Image
                    src={
                      currentVenue.images[currentImageIndex] ||
                      "/placeholder.svg?height=600&width=900&text=Image+Not+Found" ||
                      "/placeholder.svg"
                    }
                    alt={`${currentVenue.name} view ${currentImageIndex + 1}`}
                    fill
                    className="object-contain bg-black"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=600&width=900&text=Image+Not+Found"
                    }}
                  />
                ) : (
                  <img
                    src={
                      currentVenue.images[currentImageIndex] ||
                      "/placeholder.svg?height=600&width=900&text=Image+Not+Found" ||
                      "/placeholder.svg"
                    }
                    alt={`${currentVenue.name} view ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-black"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=600&width=900&text=Image+Not+Found"
                    }}
                  />
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-[#b9a154]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-[#b9a154]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeGallery()
                  }}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6 text-[#b9a154]" />
                </button>
              </div>
              <div className="p-4 text-center">
                {currentVenue.renovated && (
                  <span className="inline-block bg-[#b9a154] text-white text-xs px-2 py-1 rounded mt-1 mb-2 font-medium">
                    NEWLY RENOVATED
                  </span>
                )}
                <h3 className="text-xl font-serif font-bold text-[#b9a154]">{currentVenue.name}</h3>
                <p className="text-[#b9a154] text-sm">{currentVenue.capacity}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
