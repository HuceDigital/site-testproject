'use client'

import React from 'react'
import { useBuilder } from '../context/BuilderContext'

export default function Step3Hero() {
  const { state, updateSiteData } = useBuilder()
  const { siteData } = state

  const heroTypes = [
    {
      value: 'highImpact',
      label: 'High Impact',
      description: 'Full-width hero with large heading and CTA',
      preview: '🖼️ Large Image + Bold Text',
    },
    {
      value: 'fiftyFifty',
      label: 'Fifty Fifty',
      description: 'Split layout with text on one side, image on other',
      preview: '📝 Text | 🖼️ Image',
    },
    {
      value: 'heroCollage',
      label: 'Hero Collage',
      description: 'Multiple images in a collage layout',
      preview: '🖼️🖼️🖼️ Image Grid',
    },
    {
      value: 'none',
      label: 'No Hero',
      description: 'Skip the hero section',
      preview: '➡️ Go straight to content',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Choose your hero section</h2>
        <p className="text-gray-600">This is the first thing visitors see on your homepage</p>
      </div>

      {/* Hero Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() =>
              updateSiteData({
                heroConfig: { ...siteData.heroConfig, heroType: type.value },
              })
            }
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              siteData.heroConfig.heroType === type.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
            }`}
          >
            <div className="text-4xl mb-3">{type.preview}</div>
            <div className="font-semibold text-lg mb-1">{type.label}</div>
            <div className="text-sm text-gray-600">{type.description}</div>
          </button>
        ))}
      </div>

      {/* Hero Configuration (shown if not 'none') */}
      {siteData.heroConfig.heroType !== 'none' && (
        <div className="space-y-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold">Hero Content</h3>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700">
                Hero Title
              </label>
              <input
                type="text"
                id="heroTitle"
                placeholder="Welcome to my website"
                value={siteData.heroConfig.heroData?.title || ''}
                onChange={(e) =>
                  updateSiteData({
                    heroConfig: {
                      ...siteData.heroConfig,
                      heroData: { ...siteData.heroConfig.heroData, title: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700">
                Hero Subtitle
              </label>
              <textarea
                id="heroSubtitle"
                placeholder="A brief description of what you offer..."
                rows={3}
                value={siteData.heroConfig.heroData?.subtitle || ''}
                onChange={(e) =>
                  updateSiteData({
                    heroConfig: {
                      ...siteData.heroConfig,
                      heroData: { ...siteData.heroConfig.heroData, subtitle: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CTA Button */}
            <div className="space-y-2">
              <label htmlFor="heroCTA" className="block text-sm font-medium text-gray-700">
                Call-to-Action Button Text
              </label>
              <input
                type="text"
                id="heroCTA"
                placeholder="Get Started"
                value={siteData.heroConfig.heroData?.ctaText || ''}
                onChange={(e) =>
                  updateSiteData({
                    heroConfig: {
                      ...siteData.heroConfig,
                      heroData: { ...siteData.heroConfig.heroData, ctaText: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CTA Link */}
            <div className="space-y-2">
              <label htmlFor="heroCTALink" className="block text-sm font-medium text-gray-700">
                CTA Button Link
              </label>
              <input
                type="text"
                id="heroCTALink"
                placeholder="/contact"
                value={siteData.heroConfig.heroData?.ctaLink || ''}
                onChange={(e) =>
                  updateSiteData({
                    heroConfig: {
                      ...siteData.heroConfig,
                      heroData: { ...siteData.heroConfig.heroData, ctaLink: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
