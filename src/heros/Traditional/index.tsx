import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const FiftyFiftyHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center  md:justify-between max-w-screen md:h-[80vh]">
      <div className="w-full md:w-1/2 h-full pt-10 md:pt-0 relative flex flex-col items-center justify-center">
      <Image src="/elanto/stripes.svg" alt="Hero Background" width={1000} height={1000} className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 object-cover opacity-90" />

        <div className="  w-full px-10 lg:w-2/3 z-20 ">
          {richText && <RichText  className="mb-6  [&>h2]:mb-6" data={richText} enableGutter={false} enableProse={true}/>}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
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
      <div className="w-full h-60 md:w-1/2 md:h-full overflow-hidden relative">
           {media && typeof media === 'object' && (
             <Media
               className="h-full w-full"
               imgClassName="object-cover h-full w-full"
               priority
               resource={media}
             />
           )}
      </div>
    </div>
  )
}