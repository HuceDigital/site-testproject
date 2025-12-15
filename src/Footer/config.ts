import type { GlobalConfig, FieldHookArgs } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { iconOptions } from '@/utils/iconOptions'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'googleReviews',
      type: 'number',
      defaultValue: 4.5,
      max: 5,
      min: 0,
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'kvk',
          type: 'text',
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'social',
          type: 'select',
          options: ['Instagram', 'Facebook', 'Linkedin', 'Youtube', 'Tiktok'],
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'timeTable',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
          unique: true,
        },
        {
          name: 'availability',
          type: 'select',
          options: ['open', 'gesloten', 'op afspraak'],
          defaultValue: 'open',
          label: 'Beschikbaarheid',
        },
        {
          name: 'openTime',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.availability === 'open',
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.availability === 'open',
          },
        },
      ],
    },
    //media
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Left Media',
    },
    {
      name: 'mediaRight',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Media',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
