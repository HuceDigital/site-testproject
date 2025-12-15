'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { CardsCarouselBlock as CardsCarouselBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'

export const CardsCarouselBlock = ({ cards, title }: CardsCarouselBlockProps) => {
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
    <div className="flex flex-col gap-20">
      <div className=" w-full">
        <div className="">
          <h2 className="mb-12 text-center text-5xl font-sans text-slate-900">{title}</h2>

          <div className="relative">
            <div
              ref={containerRef}
              className="flex gap-4 overflow-x-auto pb-24 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {cards.map((card, index) => (
                <CMSLink {...card.link} key={card.id}>
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative min-w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 md:min-w-[300px]"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="relative aspect-[2/4] w-full">
                      <Media resource={card.image} fill imgClassName="object-cover" priority />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 p-8">
                        <div className="absolute top-8 left-8">
                          {card.title && (
                            <p className="text-lg font-light text-white/90">{card.title}</p>
                          )}
                          <h3 className="mt-2 text-3xl font-light text-white">{card.subtitle}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CMSLink>
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
      </div>
    </div>
  )
}
