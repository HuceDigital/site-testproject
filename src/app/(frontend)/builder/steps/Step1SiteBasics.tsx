'use client'

import React, { useEffect } from 'react'
import { useBuilder } from '../context/BuilderContext'

export default function Step1SiteBasics() {
  const { state, updateSiteData } = useBuilder()
  const { siteData } = state

  // Auto-generate slug from siteName
  const handleSiteNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')

    updateSiteData({
      siteName: value,
      slug,
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">Give your website a name and choose your brand colors</p>
      </div>

      {/* Site Name */}
      <div className="space-y-2">
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
          Website Name *
        </label>
        <input
          type="text"
          id="siteName"
          value={siteData.siteName}
          onChange={(e) => handleSiteNameChange(e.target.value)}
          placeholder="My Awesome Website"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-sm text-gray-500">This will be the title of your website</p>
      </div>

      {/* Slug (Auto-generated) */}
      <div className="space-y-2">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Website Slug *
        </label>
        <input
          type="text"
          id="slug"
          value={siteData.slug}
          onChange={(e) => updateSiteData({ slug: e.target.value })}
          placeholder="my-awesome-website"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          required
        />
        <p className="text-sm text-gray-500">
          URL-friendly identifier (auto-generated from name)
        </p>
      </div>

      {/* Theme Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Brand Colors</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="primaryColor"
                value={siteData.theme.primaryColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, primaryColor: e.target.value },
                  })
                }
                className="h-12 w-16 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={siteData.theme.primaryColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, primaryColor: e.target.value },
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
              Secondary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="secondaryColor"
                value={siteData.theme.secondaryColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, secondaryColor: e.target.value },
                  })
                }
                className="h-12 w-16 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={siteData.theme.secondaryColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, secondaryColor: e.target.value },
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#8b5cf6"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="accentColor"
                value={siteData.theme.accentColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, accentColor: e.target.value },
                  })
                }
                className="h-12 w-16 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={siteData.theme.accentColor}
                onChange={(e) =>
                  updateSiteData({
                    theme: { ...siteData.theme, accentColor: e.target.value },
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#10b981"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <select
          id="fontFamily"
          value={siteData.theme.fontFamily}
          onChange={(e) =>
            updateSiteData({
              theme: { ...siteData.theme, fontFamily: e.target.value },
            })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="inter">Inter</option>
          <option value="geist">Geist</option>
          <option value="roboto">Roboto</option>
        </select>
        <p className="text-sm text-gray-500">Choose the primary font for your website</p>
      </div>

      {/* Preview */}
      <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Color Preview</h4>
        <div className="grid grid-cols-3 gap-4">
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: siteData.theme.primaryColor }}
          >
            Primary
          </div>
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: siteData.theme.secondaryColor }}
          >
            Secondary
          </div>
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: siteData.theme.accentColor }}
          >
            Accent
          </div>
        </div>
      </div>
    </div>
  )
}
