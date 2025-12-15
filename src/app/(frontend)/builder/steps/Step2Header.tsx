'use client'

import React from 'react'
import { useBuilder } from '../context/BuilderContext'

export default function Step2Header() {
  const { state, updateSiteData } = useBuilder()
  const { siteData } = state

  const addNavItem = () => {
    const newNavItems = [
      ...siteData.headerConfig.navItems,
      { label: '', url: '' },
    ]
    updateSiteData({
      headerConfig: { ...siteData.headerConfig, navItems: newNavItems },
    })
  }

  const removeNavItem = (index: number) => {
    const newNavItems = siteData.headerConfig.navItems.filter((_, i) => i !== index)
    updateSiteData({
      headerConfig: { ...siteData.headerConfig, navItems: newNavItems },
    })
  }

  const updateNavItem = (index: number, field: 'label' | 'url', value: string) => {
    const newNavItems = siteData.headerConfig.navItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    updateSiteData({
      headerConfig: { ...siteData.headerConfig, navItems: newNavItems },
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Configure your header</h2>
        <p className="text-gray-600">Choose a header style and add navigation links</p>
      </div>

      {/* Header Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Header Style</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'default', label: 'Default', desc: 'Logo left, nav right' },
            { value: 'centered', label: 'Centered', desc: 'Centered logo and nav' },
            { value: 'minimal', label: 'Minimal', desc: 'Simple and clean' },
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                updateSiteData({
                  headerConfig: { ...siteData.headerConfig, headerType: type.value },
                })
              }
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                siteData.headerConfig.headerType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-semibold">{type.label}</div>
              <div className="text-sm text-gray-600">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Show Search */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="showSearch"
          checked={siteData.headerConfig.showSearch}
          onChange={(e) =>
            updateSiteData({
              headerConfig: { ...siteData.headerConfig, showSearch: e.target.checked },
            })
          }
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="showSearch" className="text-sm font-medium text-gray-700">
          Include search bar in header
        </label>
      </div>

      {/* Navigation Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Navigation Links</h3>
          <button
            type="button"
            onClick={addNavItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Link
          </button>
        </div>

        {siteData.headerConfig.navItems.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            No navigation links yet. Click "Add Link" to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {siteData.headerConfig.navItems.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Label (e.g., About)"
                    value={item.label}
                    onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="URL (e.g., /about)"
                    value={item.url}
                    onChange={(e) => updateNavItem(index, 'url', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNavItem(index)}
                  className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
