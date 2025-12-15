import type { Post, Project, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Button } from '@/components/ui/button'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
    withFilter,
    showViewAllLink,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let projects: Project[] = []
  const contentType = relationTo || 'posts'

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedContent = await payload.find({
      collection: contentType,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    if (contentType === 'posts') {
      posts = fetchedContent.docs
    } else if (contentType === 'projects') {
      projects = fetchedContent.docs
    }
  } else {
    if (selectedDocs?.length) {
      selectedDocs.forEach((doc) => {
        if (typeof doc === 'object' && doc !== null) {
          // For docs that have a relationTo property (multi-collection relationships)
          if ('relationTo' in doc && 'value' in doc) {
            if (doc.relationTo === 'posts' && typeof doc.value === 'object') {
              posts.push(doc.value as Post)
            } else if (doc.relationTo === 'projects' && typeof doc.value === 'object') {
              projects.push(doc.value as Project)
            }
          }
        }
      })
    }
  }

  return (
    <div id={`block-${id}`} className="flex flex-col gap-8">
      {introContent && (
        <div>
          <RichText
            className="ml-0 max-w-[48rem]        [&_h2]:font-sans
               [&_h3]:font-sans
               [&_h4]:font-sans"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      {showViewAllLink && (
        <div className="">
          <Button variant="cta" size="lg" asChild>
            <Link href={`/${contentType}`}>
              Bekijk alle {contentType === 'posts' ? 'berichten' : 'projecten'}
            </Link>
          </Button>
        </div>
      )}
      <Suspense fallback={<div>Loading content...</div>}>
        <CollectionArchive
          posts={posts}
          projects={projects}
          relationTo={contentType as 'posts' | 'projects'}
          withFilter={withFilter || false}
          layout='grid'
        />
      </Suspense>
    </div>
  )
}
