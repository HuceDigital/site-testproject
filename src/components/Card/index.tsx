'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Project, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import { Button } from '../ui/button'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>
export type CardProjectData = Pick<
  Project,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'beforeImage' | 'afterImage'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData | CardProjectData
  relationTo?: 'posts' | 'projects'
  showCategories?: boolean
  title?: string
  isTallCard?: boolean
  beforeImage?: MediaType | string | number
  afterImage?: MediaType | string | number
  useBeforeAfterSlider?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { 
    className, 
    doc, 
    relationTo, 
    showCategories, 
    title: titleFromProps, 
    beforeImage, 
    afterImage, 
    useBeforeAfterSlider 
  } = props

  // Calculate if this should be a tall card based on properties or random factor
  const isTallCard = props.isTallCard

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}
  
  // Extract beforeImage and afterImage only for projects
  const projectBeforeImage = relationTo === 'projects' && doc && 'beforeImage' in doc 
    ? (doc as CardProjectData).beforeImage 
    : undefined
  const projectAfterImage = relationTo === 'projects' && doc && 'afterImage' in doc 
    ? (doc as CardProjectData).afterImage 
    : undefined

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Check if we should use before/after slider
  const shouldUseBeforeAfterSlider = useBeforeAfterSlider || (
    relationTo === 'projects' && 
    projectBeforeImage && 
    projectAfterImage
  )

  // Get before and after images (manual props take precedence over project fields)
  const beforeImageToUse = beforeImage || projectBeforeImage
  const afterImageToUse = afterImage || projectAfterImage

  // Better size values
  const imageSize = isTallCard ? '50vw' : '40vw'

  return (
    <article
      className={cn('rounded-lg overflow-hidden bg-card hover:cursor-pointer group', className)}
      ref={card.ref}
    >
      {/* Image container with gradient overlay on hover */}
      <div
        className={cn('relative w-full overflow-hidden', {
          'h-[400px]': isTallCard,
          'h-[250px]': !isTallCard,
        })}
      >
        {/* Gradient overlay that appears on hover */}
        {/* <div className="absolute inset-0 bg-custom-gradient opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10"></div> */}

        {!metaImage && !shouldUseBeforeAfterSlider && (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            Geen afbeelding
          </div>
        )}

        {shouldUseBeforeAfterSlider && beforeImageToUse && afterImageToUse ? (
          <BeforeAfterSlider
            beforeImage={beforeImageToUse}
            afterImage={afterImageToUse}
            imageSize={imageSize}
            imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            priority={isTallCard}
          />
        ) : metaImage && typeof metaImage !== 'string' ? (
          <Media
            resource={metaImage}
            size={imageSize}
            fill
            imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            priority={isTallCard}
          />
        ) : null}
      </div>

      <div className="py-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            <div>
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'
                  const isLast = index === categories.length - 1
                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-start">
          {titleToUse && (
            <div className="prose flex-1 min-w-0">
              <h3 className=" font-sans text-4xl break-words">
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {publishedAt && (
            <div className="font-bold text-gray-400 text-3xl lg:text-4xl lg:pl-4 whitespace-nowrap">
              <p>{new Date(publishedAt).getFullYear()}</p>
            </div>
          )}
        </div>

        {description && (
          <div
            className={cn('mt-2', {
              'mt-4': isTallCard,
            })}
          >
            <p className="line-clamp-3">{sanitizedDescription}</p>

            {/* Extra content for tall cards - simplified */}

            {description && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {relationTo === 'projects' ? 'Project' : 'Post'} •{' '}
                  {new Date(publishedAt || '').toLocaleDateString()}
                </p>
                <Button>Bekijken</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
