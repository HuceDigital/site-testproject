'use client'

import React, { useEffect, useCallback } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import type { MarqueeBlock } from '@/payload-types'
import { Media } from '../Media'

interface MarqueeProps {
  duration?: number | null
  logos: MarqueeBlock['logos']
}

export const Marquee: React.FC<MarqueeProps> = ({ duration = 30, logos }) => {
  const controls1 = useAnimationControls()
  const controls2 = useAnimationControls()

  const startAnimation = useCallback(
    async (speed: number) => {
      controls1.set({ x: 0 })
      controls2.set({ x: '100%' })

      await Promise.all([
        controls1.start({
          x: '-100%',
          transition: {
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            ease: 'linear',
          },
        }),
        controls2.start({
          x: '0%',
          transition: {
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            ease: 'linear',
          },
        }),
      ])
    },
    [controls1, controls2],
  )

  useEffect(() => {
    startAnimation(duration || 30)
  }, [duration, startAnimation])

  return (
    <div className="flex overflow-hidden relative MyGradient py-2">
      <motion.div
        initial={{ x: 0 }}
        animate={controls1}
        className="flex flex-shrink-0 items-center"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="mr-20 w-[100px] h-full  flex flex-col items-center gap-y-4 relative justify-center"
          >
            <Media resource={logo.logo} imgClassName="object-cover rounded-lg" priority />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ x: '100%' }}
        animate={controls2}
        className="flex flex-shrink-0 absolute left-0 items-center"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="mr-20 w-[100px] h-full  flex flex-col items-center gap-y-4 relative justify-center"
          >
            <Media resource={logo.logo} imgClassName="object-cover rounded-lg" priority />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
