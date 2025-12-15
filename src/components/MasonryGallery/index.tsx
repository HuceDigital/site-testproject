'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/utilities/ui'
import { Media } from '../Media'
import type { Media as MediaType } from '@/payload-types'
import { X } from 'lucide-react'

export type GalleryImage = {
  image: MediaType | string | number
  caption?: string | null
  id?: string | null
}

type MasonryGalleryProps = {
  images: GalleryImage[]
  className?: string
  columns?: number
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  images,
  className,
  columns = 4,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(null)

  const handleImageClick = (image: (typeof images)[0]) => {
    setSelectedImage(image)
    setOpenModal(true)
  }

  // Get alt text for the selected image if available
  const getDialogTitle = () => {
    if (!selectedImage || !selectedImage.image) return 'Image preview'

    if (typeof selectedImage.image === 'object' && 'alt' in selectedImage.image) {
      return selectedImage.image.alt || 'Image preview'
    }

    return 'Image preview'
  }

  if (!images || images.length === 0) return null

  // Map the columns prop to Tailwind class
  const getColumnsClass = () => {
    switch (columns) {
      case 1:
        return 'columns-1 md:columns-1'
      case 2:
        return 'columns-1 sm:columns-2'
      case 3:
        return 'columns-1 sm:columns-2 lg:columns-3'
      case 4:
        return 'columns-1 sm:columns-2 lg:columns-4'
      case 5:
        return 'columns-1 sm:columns-2 md:columns-3 lg:columns-5'
      default:
        return 'columns-1 sm:columns-2 lg:columns-3'
    }
  }

  return (
    <div className={cn('w-full py-6', className)}>
      <div className="">
        <div className={cn(getColumnsClass(), 'gap-4 space-y-4')}>
          {images.map((image, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <div
                className="relative overflow-hidden rounded-xl shadow cursor-pointer transform transition-transform hover:scale-[1.02]"
                onClick={() => handleImageClick(image)}
              >
                <Media
                  resource={typeof image.image === 'string' ? image.image : image.image}
                  imgClassName="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <DialogTitle className="sr-only">{getDialogTitle()}</DialogTitle>

          {selectedImage && (
            <div className="relative w-full max-h-[80vh] flex items-center justify-center">
              {selectedImage.image && (
                <Media
                  resource={selectedImage.image}
                  imgClassName="max-w-full max-h-[80vh] object-contain"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* 
      <Dialog.Root
        modal={true}
        open={!!openImage}
        onOpenChange={(open) => {
          if (!open) setOpenImage(null)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm cursor-pointer"
            onClick={() => setOpenImage(null)}
          />
          <Dialog.Content
            className="fixed inset-4 md:inset-10 z-50 outline-none flex items-center justify-center"
            onPointerDownOutside={(e) => {
              e.preventDefault()
              setOpenImage(null)
            }}
            onClick={() => setOpenImage(null)}
          >
            <Dialog.Close asChild>
              <button
                className="absolute top-0 right-0 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </Dialog.Close>

            {openImage && (
              <div className="max-w-full max-h-full w-fit overflow-auto flex flex-col items-center">
                <div className="relative max-h-[80vh] overflow-hidden rounded-lg">
                  <Media
                    resource={
                      typeof openImage.image === 'string' ? openImage.image : openImage.image
                    }
                    imgClassName="max-w-full max-h-[80vh] object-contain"
                  />
                </div>
                {openImage.caption && (
                  <div className="mt-2 bg-black/60 text-white p-2 rounded text-center max-w-2xl">
                    {openImage.caption}
                  </div>
                )}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div> */}
    </div>
  )
}

export default MasonryGallery
