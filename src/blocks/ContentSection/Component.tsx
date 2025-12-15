import React from 'react'
import type { ContentSectionBlock as ContentSectionProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ContentSectionBlock: React.FC<ContentSectionProps> = ({ title, richText }) => {
  return (
    <section className="">
      <div className="text-center sm:text-left">
        <h2 className="text-4xl sm:text-5xl  text-slate-900 mb-8 font-sans">{title}</h2>
        {richText && (
          <RichText className="mb-0 text-slate-900" data={richText} enableGutter={false} />
        )}
      </div>
    </section>
  )
}
