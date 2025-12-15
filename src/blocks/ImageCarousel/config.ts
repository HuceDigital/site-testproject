import type { Block } from 'payload'

export const ImageCarouselBlock: Block = {
  slug: 'imageCarousel',
  interfaceName: 'ImageCarouselBlock',
  imageURL: '/blocks/carousel-square.jpg',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', label: 'Caption (optional)' },
      ],
      required: true,
    },
  ],
}
