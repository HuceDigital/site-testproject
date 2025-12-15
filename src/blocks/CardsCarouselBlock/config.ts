import { link } from '@/fields/link'
import type { Block } from 'payload'

export const CardsCarousel: Block = {
  slug: 'cardsCarousel',
  interfaceName: 'CardsCarouselBlock',
  imageURL: '/blocks/carousel-vertical.jpg',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        link({
          appearances: false,
          disableLabel: true,
        }),
        {
          name: 'title',
          type: 'text',
          required: false,
        },

        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
