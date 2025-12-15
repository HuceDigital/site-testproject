'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const services = [
  {
    id: 1,
    category: 'Camerabeveiliging',
    title: 'Camerabeveiliging',
    image: '/services/2.jpg',
  },
  {
    id: 2,
    category: 'Poorten en hekwerken',
    title: 'Poorten en hekwerken',
    image: '/services/3.jpg',
  },
  {
    id: 3,
    category: 'Intercom installaties',
    title: 'Intercom installaties',
    image: '/services/4.jpg',
  },
  {
    id: 4,
    category: 'Alarmsystemen',
    title: 'Alarmsystemen',
    image: '/services/5.jpg',
  },
  {
    id: 5,
    category: 'Toegangscontrole',
    title: 'Toegangscontrole',
    image: '/services/6.jpg',
  },
  {
    id: 6,
    category: 'Slagbomen',
    title: 'Slagbomen',
    image: '/services/banner.jpeg',
  },
  {
    id: 7,
    category: 'Rampalen',
    title: 'Rampalen',
    image: '/services/8.jpg',
  },
  {
    id: 8,
    category: 'Kentekencamera’s',
    title: 'Kentekencamera’s',
    image: '/services/9.jpg',
  },
  {
    id: 9,
    category: 'Brandbeveiliging',
    title: 'Brandbeveiliging',
    image: '/services/10.jpg',
  },
]

export const ServicesCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const hasOverflow = containerRef.current.scrollWidth > containerRef.current.clientWidth
        setShowControls(hasOverflow)
      }
    }

    // Check on initial render
    checkOverflow()

    // Check on window resize
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [])

  const scrollToOffset = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className=" py-16 ">
      <h2 className="mb-12 text-center text-5xl font-sans text-slate-900">Diensten</h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-24 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative min-w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 md:min-w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative aspect-[2/4] w-full">
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 p-8">
                  <div className="absolute top-8 left-8">
                    {service.category && (
                      <p className="text-lg font-light text-white/90">{service.category}</p>
                    )}
                    <h3 className="mt-2 text-3xl font-light text-white">{service.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showControls && (
          <div className="absolute bottom-0 right-4 flex gap-2">
            <button
              onClick={() => scrollToOffset(-400)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scrollToOffset(400)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
