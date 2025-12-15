'use client'

import React, { useState, useEffect } from 'react'
import { useBuilder } from '../context/BuilderContext'

interface Component {
  id: string
  name: string
  displayName: string
  description: string
  category: string
  blockType: string
  defaultConfig: any
}

export default function Step4Content() {
  const { state, updateSiteData } = useBuilder()
  const { siteData } = state
  const [components, setComponents] = useState<Component[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Fetch components from API
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('/api/components')
        const data = await response.json()
        setComponents(data.docs || [])
      } catch (error) {
        console.error('Failed to fetch components:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])

  const categories = [
    { value: 'all', label: 'All Components' },
    { value: 'content', label: 'Content' },
    { value: 'features', label: 'Features' },
    { value: 'cta', label: 'Call to Action' },
    { value: 'faq', label: 'FAQ' },
    { value: 'form', label: 'Forms' },
    { value: 'media', label: 'Media' },
    { value: 'team', label: 'Team' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'carousel', label: 'Carousels' },
    { value: 'other', label: 'Other' },
  ]

  const filteredComponents =
    selectedCategory === 'all'
      ? components
      : components.filter((c) => c.category === selectedCategory)

  const addBlock = (component: Component) => {
    const newBlock = {
      blockType: component.blockType,
      blockConfig: component.defaultConfig || {},
      order: siteData.selectedBlocks.length,
    }

    updateSiteData({
      selectedBlocks: [...siteData.selectedBlocks, newBlock],
    })
  }

  const removeBlock = (index: number) => {
    const newBlocks = siteData.selectedBlocks.filter((_, i) => i !== index)
    // Reorder remaining blocks
    const reorderedBlocks = newBlocks.map((block, i) => ({ ...block, order: i }))
    updateSiteData({
      selectedBlocks: reorderedBlocks,
    })
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...siteData.selectedBlocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return

    // Swap blocks
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]

    // Update order
    const reorderedBlocks = newBlocks.map((block, i) => ({ ...block, order: i }))

    updateSiteData({
      selectedBlocks: reorderedBlocks,
    })
  }

  const getComponentName = (blockType: string) => {
    const component = components.find((c) => c.blockType === blockType)
    return component?.displayName || blockType
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
        <div className="text-gray-500">Loading components...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Build your content</h2>
        <p className="text-gray-600">
          Add and arrange content blocks to create your perfect homepage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Browser */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComponents.length === 0 ? (
              <div className="col-span-2 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                No components found in this category
              </div>
            ) : (
              filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold mb-1">{component.displayName}</h4>
                  <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                  <button
                    onClick={() => addBlock(component)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    + Add to Page
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Blocks */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Your Page ({siteData.selectedBlocks.length} blocks)</h3>

          {siteData.selectedBlocks.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
              No blocks added yet.
              <br />
              Choose from the left!
            </div>
          ) : (
            <div className="space-y-2">
              {siteData.selectedBlocks.map((block, index) => (
                <div
                  key={index}
                  className="p-3 bg-white border border-gray-300 rounded-lg flex items-center gap-2"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{getComponentName(block.blockType)}</div>
                    <div className="text-xs text-gray-500">Order: {index + 1}</div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === siteData.selectedBlocks.length - 1}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeBlock(index)}
                      className="p-1 rounded hover:bg-red-100 text-red-600"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
