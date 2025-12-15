'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Icon } from '@/components/Icon'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, usps }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative flex items-center justify-center text-white    [&>div>div>div>h1]:font-sans "
      data-theme="dark"
    >
      <div className="container my-8 z-10 relative flex items-center ">
        <div>
          {richText && (
            <RichText className="mb-6 prose-white" data={richText} enableGutter={false} />
          )}
          {usps && (
            <ul className="flex flex-col md:flex-row gap-4 text-2xl mt-10">
              {usps.map(({ usp, icon }, i) => {
                const iconName = icon || 'Check'

                return (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <Icon name={iconName} className="w-6 h-6" />
                    {usp}
                  </li>
                )
              })}
            </ul>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[60vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-overlay-gradient pointer-events-none "></div>
      </div>
    </div>
  )
}
