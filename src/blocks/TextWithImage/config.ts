import type { Block } from 'payload'

export const TextWithImage: Block = {
  slug: 'textWithImage',
  interfaceName: 'TextWithImage',
  imageURL: '/blocks/text-image.jpg',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: ['left', 'right'],
      required: true,
    },
  ],
}
