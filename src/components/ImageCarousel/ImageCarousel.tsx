'use client'

import type { ImageCarouselBlock as ImageCarouselBlockProps } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Media } from '@/components/Media'

type ImageCarouselProps = {
  images: ImageCarouselBlockProps['images']
  withDialog?: boolean
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, withDialog = true }) => {
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

  return (
    <>
      <Carousel
        opts={{
          align: 'center',
          slidesToScroll: 1,
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images?.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
              <div
                className="relative aspect-video overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                {image.image && <Media resource={image.image} fill className=" " />}

                {image.caption && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="w-full p-4 bg-black/50 text-white">
                      <p className="text-sm text-center">{image.caption}</p>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      {withDialog && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
            <DialogTitle className="sr-only">{getDialogTitle()}</DialogTitle>

            {selectedImage && (
              <div className="relative w-full aspect-[16/9]">
                {selectedImage.image && <Media resource={selectedImage.image} fill className=" " />}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
