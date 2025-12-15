import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { iconOptions } from '@/utils/iconOptions'

export const SuiteableApplications: Block = {
  slug: 'suitableapplications',
  interfaceName: 'SuitableApplicationsBlock',
  imageURL: '/blocks/suitable.jpg',
  fields: [
    {
      name: 'title', // required
      type: 'text', // required
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'applications',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
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
  labels: {
    plural: 'Opsomming lijsten',
    singular: 'Opsomming lijst',
  },
}
