import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { formatSlug } from './hooks/formatSlug'

export const Sites: CollectionConfig = {
  slug: 'sites',
  access: {
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return { owner: { equals: user?.id } }
    },
    create: authenticated,
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return { owner: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return { owner: { equals: user?.id } }
    },
  },
  admin: {
    useAsTitle: 'siteName',
    defaultColumns: ['siteName', 'slug', 'deploymentStatus', 'createdAt'],
  },
  fields: [
    // Step 1: Site Basics
    {
      name: 'siteName',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of your website',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., my-awesome-site)',
      },
      hooks: {
        beforeValidate: [formatSlug('siteName')],
      },
    },
    {
      name: 'theme',
      type: 'group',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#3b82f6',
          admin: {
            description: 'Primary brand color',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          defaultValue: '#8b5cf6',
          admin: {
            description: 'Secondary brand color',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          defaultValue: '#10b981',
          admin: {
            description: 'Accent color for CTAs',
          },
        },
        {
          name: 'fontFamily',
          type: 'select',
          defaultValue: 'inter',
          options: [
            { label: 'Inter', value: 'inter' },
            { label: 'Geist', value: 'geist' },
            { label: 'Roboto', value: 'roboto' },
          ],
        },
      ],
    },

    // Step 2: Header Configuration
    {
      name: 'headerConfig',
      type: 'group',
      fields: [
        {
          name: 'headerType',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Centered', value: 'centered' },
            { label: 'Minimal', value: 'minimal' },
          ],
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show search bar in header',
          },
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Step 3: Hero Selection
    {
      name: 'heroConfig',
      type: 'group',
      fields: [
        {
          name: 'heroType',
          type: 'select',
          required: true,
          options: [
            { label: 'High Impact', value: 'highImpact' },
            { label: 'Fifty Fifty', value: 'fiftyFifty' },
            { label: 'Hero Collage', value: 'heroCollage' },
            { label: 'None', value: 'none' },
          ],
        },
        {
          name: 'heroData',
          type: 'json',
          admin: {
            description: 'Hero configuration data (title, subtitle, CTA, etc.)',
          },
        },
      ],
    },

    // Step 4: Content Sections
    {
      name: 'selectedBlocks',
      type: 'array',
      label: 'Content Sections',
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          options: [
            { label: 'Call to Action', value: 'cta' },
            { label: 'Content', value: 'content' },
            { label: 'Feature Block', value: 'feature' },
            { label: 'FAQ', value: 'faq' },
            { label: 'Form', value: 'formBlock' },
            { label: 'Media Block', value: 'mediaBlock' },
            { label: 'Text with Image', value: 'textWithImage' },
            { label: 'Content Section', value: 'contentsection' },
            { label: 'Process', value: 'process' },
            { label: 'Team Section', value: 'teamSection' },
            { label: 'Reviews', value: 'reviews' },
            { label: 'Image Carousel', value: 'imageCarousel' },
            { label: 'Cards Carousel', value: 'cardsCarousel' },
            { label: 'Marquee', value: 'marquee' },
            // Will be populated dynamically from component registry
          ],
        },
        {
          name: 'blockConfig',
          type: 'json',
          admin: {
            description: 'Block configuration data',
          },
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },

    // Deployment Info
    {
      name: 'deploymentStatus',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Creating Repository', value: 'creating-repo' },
        { label: 'Configuring', value: 'configuring' },
        { label: 'Deploying', value: 'deploying' },
        { label: 'Deployed', value: 'deployed' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'deploymentError',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => data.deploymentStatus === 'failed',
      },
    },
    {
      name: 'githubRepoUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'GitHub repository URL',
      },
    },
    {
      name: 'vercelProjectId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Vercel project ID',
      },
    },
    {
      name: 'vercelUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Live site URL',
      },
    },
    {
      name: 'lastDeploymentDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },

    // Ownership
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Site owner',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          data.owner = req.user.id
        }
        return data
      },
    ],
  },
  timestamps: true,
}
