import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  imageURL: '/blocks/cta.jpg',
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "style1",
      label: "Type",
      options: [
        {
          label: "Style 1",
          value: "style1",
        },
        {
          label: "Style 2",
          value: "style2",
        }
      ],
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
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'style1',
      },
    },
    {
      name: 'style2Text',
      type: 'text',
      label: 'Text',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'style2',
      },
    },
    linkGroup({
      appearances: ['default', 'outline', 'cta'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
