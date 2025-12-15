import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  projects: '/projects',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const isProduction = process.env.NODE_ENV === 'production'

  const protocol = isProduction ? 'https:' : req.protocol

  // Use production URL if in production, otherwise use req.host
  const host = isProduction ? process.env.NEXT_PUBLIC_PREVIEW_URL || req.host : req.host

  const url = `${protocol}//${host}/next/preview?${encodedParams.toString()}`

  return url
}
