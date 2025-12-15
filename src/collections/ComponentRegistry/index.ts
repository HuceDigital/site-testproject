import type { CollectionConfig } from 'payload'

export const ComponentRegistry: CollectionConfig = {
  slug: 'component-registry',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'category', 'source', 'isActive'],
    description: 'Registry of all available blocks and components for the website builder',
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
    update: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
    delete: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this component (e.g., call-to-action)',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name shown in the builder UI',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of what this component does',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Content', value: 'content' },
        { label: 'CTA', value: 'cta' },
        { label: 'Features', value: 'features' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Form', value: 'form' },
        { label: 'Media', value: 'media' },
        { label: 'Team', value: 'team' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Process', value: 'process' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Category for organizing components in the builder',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Built-in Block', value: 'builtin' },
        { label: 'NPM Package', value: 'npm' },
      ],
      admin: {
        description: 'Whether this is a built-in block or from npm',
      },
    },
    {
      name: 'blockType',
      type: 'text',
      required: true,
      admin: {
        description: 'The blockType slug used in Payload config (e.g., cta, feature)',
      },
    },
    {
      name: 'npmPackage',
      type: 'text',
      admin: {
        condition: (data) => data.source === 'npm',
        description: 'NPM package name (e.g., @huce-digital/sample-block)',
      },
    },
    {
      name: 'importPath',
      type: 'text',
      required: true,
      admin: {
        description: 'Import path for the component (e.g., @/blocks/CallToAction/Component)',
      },
    },
    {
      name: 'configImportPath',
      type: 'text',
      required: true,
      admin: {
        description: 'Import path for the Payload config (e.g., @/blocks/CallToAction/config)',
      },
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Preview thumbnail for the builder UI',
      },
    },
    {
      name: 'defaultConfig',
      type: 'json',
      admin: {
        description: 'Default configuration when adding this block (JSON format)',
      },
    },
    {
      name: 'configSchema',
      type: 'json',
      admin: {
        description: 'JSON Schema for block configuration',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this component is available in the builder',
      },
    },
  ],
  timestamps: true,
}
