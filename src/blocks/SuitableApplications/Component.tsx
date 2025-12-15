import { Icon } from '@/components/Icon'

import React from 'react'
import type { SuitableApplicationsBlock as SuiteableApplicationsProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const SuitableApplicationsBlock: React.FC<SuiteableApplicationsProps> = ({
  title,
  richText,
  applications,
}) => {
  return (
    <div className="flex">
      <div className="max-w-4xl ">
        <h1 className="text-4xl md:text-5xl font-sans text-gray-900 mb-4">{title}</h1>

        {richText && (
          <RichText className="mb-6 text-gray-700" data={richText} enableGutter={false} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {applications.map((application, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center">
                {application.icon && (
                  <Icon name={application.icon} className="w-5 h-5" color="white" />
                )}
              </div>
              <span className="text-lg text-gray-800 font-medium">{application.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
