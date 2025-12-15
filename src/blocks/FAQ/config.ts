import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  imageURL: '/blocks/faq.jpg',
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
      name: 'title', // required
      type: 'text', // required
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'FAQ',
    singular: 'FAQ',
  },
}
