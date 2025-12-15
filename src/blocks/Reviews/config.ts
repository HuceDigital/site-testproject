import type { Block } from 'payload'

export const Reviews: Block = {
  slug: 'reviews',
  interfaceName: 'ReviewsBlock',
  imageURL: '/blocks/reviews.jpg',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Reviews van anderen',
      required: true,
    },
    {
      name: 'googlePlaceId',
      type: 'text',
      label: 'Google Place ID',
      required: true,
      admin: {
        description: 'Enter the Google Place ID for your business to fetch the overall rating and review count.',
      },
    },
    {
      name: 'fallbackRating',
      type: 'number',
      label: 'Fallback Rating',
      min: 1,
      max: 5,
      defaultValue: 4.5,
      admin: {
        description: 'Rating to show if Google API is unavailable (1-5)',
      },
    },
    {
      name: 'fallbackDescription',
      type: 'text',
      label: 'Fallback Description',
      defaultValue: 'Based on customer reviews',
      admin: {
        description: 'Description to show if Google API is unavailable',
      },
    },
    {
      name: 'enableGoogleRating',
      type: 'checkbox',
      label: 'Enable Google Rating',
      defaultValue: true,
      admin: {
        description: 'Toggle to enable/disable fetching overall rating from Google Places API',
      },
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Individual Reviews',
      minRows: 0,
      maxRows: 10,
      admin: {
        description: 'Individual review cards displayed on the right side',
      },
      fields: [
        {
          name: 'reviewerName',
          type: 'text',
          label: 'Reviewer Name',
          required: true,
        },
        {
          name: 'reviewerTitle',
          type: 'text',
          label: 'Reviewer Title/Position',
          required: true,
        },
        {
          name: 'reviewText',
          type: 'textarea',
          label: 'Review Text',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
          min: 1,
          max: 5,
          defaultValue: 5,
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Reviews',
    singular: 'Review',
  },
}
