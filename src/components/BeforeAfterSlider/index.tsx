'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface BeforeAfterSliderProps {
  beforeImage: MediaType | string | number
  afterImage: MediaType | string | number
  className?: string
  imageSize?: string
  imgClassName?: string
  priority?: boolean
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  className,
  imageSize = '40vw',
  imgClassName,
  priority = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    if (e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    if (e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full overflow-hidden cursor-col-resize select-none', className)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none', 
        MozUserSelect: 'none', 
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <Media
          resource={beforeImage}
          size={imageSize}
          fill
          imgClassName={cn('object-cover w-full h-full select-none pointer-events-none', imgClassName)}
          priority={priority}
        />
      </div>

      {/* After Image with clipping */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Media
          resource={afterImage}
          size={imageSize}
          fill
          imgClassName={cn('object-cover w-full h-full select-none pointer-events-none', imgClassName)}
          priority={priority}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center cursor-col-resize">
          <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-medium">
        Voor
      </div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-medium">
        Na
      </div>
    </div>
  )
}
