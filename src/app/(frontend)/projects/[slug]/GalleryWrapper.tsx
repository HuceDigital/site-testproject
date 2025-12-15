'use client'

import React from 'react'
import MasonryGallery, { type GalleryImage } from '@/components/MasonryGallery'
import type { Media } from '@/payload-types'

type GalleryWrapperProps = {
  galleryImages: Array<{
    image: Media | number
    caption?: string | null
    id?: string | null
  }>
}

export const GalleryWrapper: React.FC<GalleryWrapperProps> = ({ galleryImages }) => {
  if (!galleryImages || galleryImages.length === 0) return null

  // Map the gallery images to the format expected by MasonryGallery
  const formattedImages: GalleryImage[] = galleryImages.map((item) => ({
    image: item.image,
    caption: item.caption,
    id: item.id,
  }))

  return <MasonryGallery images={formattedImages} />
}
