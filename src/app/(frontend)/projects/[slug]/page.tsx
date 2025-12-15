import type { Metadata } from 'next'

import { RelatedProjects } from '@/blocks/RelatedProjects/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Project } from '@/payload-types'

import { ProjectHero } from '@/heros/ProjectHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { GalleryWrapper } from './GalleryWrapper'
import { ProjectCTA } from './ProjectCTA'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = (await queryProjectBySlug({ slug })) as Project | null

  if (!project) return <PayloadRedirects url={url} />

  // Prepare gallery images if they exist
  const hasGallery = project.galleryImages && project.galleryImages.length > 0

  return (
    <>
      <article className="row-start-2 col-span-12 min-h-screen ">
        <PageClient />

        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <ProjectHero project={project} />

        <div className="flex flex-col items-center gap-4  py-12 ">
          <div className="container">
            <RichText
              className=" mx-auto prose prose-headings:text-black prose-headings:font-sans lg:prose-headings:text-5xl text-black "
              data={project.content}
              enableGutter={false}
            />

            {/* Add image gallery if available */}
            {hasGallery && (
              <section className="mt-12">
                {project?.displayMode === 'carousel' ? (
                  <ImageCarousel images={project.galleryImages || []} />
                ) : (
                  <GalleryWrapper galleryImages={project.galleryImages || []} />
                )}
              </section>
            )}

            {/* {project.relatedProjects && project.relatedProjects.length > 0 && (
            <RelatedProjects
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={project.relatedProjects.filter((project) => typeof project === 'object')}
            />
          )} */}
          </div>
        </div>
      </article>
      <section className="bg-white col-span-12 flex flex-col  justify-center  ">
        <ProjectCTA />
      </section>
    </>
  )
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })
  const project = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return generateMeta({ doc: project?.docs[0] as Project | null })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }): Promise<Project | null> => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Ensure we get nested data
  })

  return (result.docs?.[0] as Project) || null
})
