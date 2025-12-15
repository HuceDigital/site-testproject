import type { Block } from 'payload'
import { iconOptions } from '@/utils/iconOptions'

export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  imageURL: '/blocks/features.jpg',
  fields: [
    {
      name: 'title', // required
      type: 'text', // required
      required: false,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'leftMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Left Media',
    },
    {
      name: 'rightMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Media',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
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
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: iconOptions,
          defaultValue: 'Check',
        },
      ],
    },
  ],
}
