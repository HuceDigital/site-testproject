import React from 'react'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { heroImage } = project

  return (
    <div className="relative flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2"></div>
      </div>
      <div className="min-h-[60vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
