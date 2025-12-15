import type { Block } from 'payload'

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  imageURL: '/blocks/marquee.jpg',
  labels: {
    singular: 'Marquee',
    plural: 'Marquees',
  },
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
      name: 'duration',
      type: 'number',
      required: false,
      defaultValue: 30,
    },
    {
      name: 'logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
