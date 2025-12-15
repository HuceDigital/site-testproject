'use client'

import React, { useState } from 'react'
import { Icon } from '../Icon'
import { categorizedIcons, iconOptions } from '@/utils/iconOptions'

/**
 * An icon gallery component that displays all available Lucide icons
 * organized by categories for better browsing
 */
const IconGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter icons based on search
  const filteredIcons = searchTerm
    ? iconOptions
        .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((option) => option.value)
    : []

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Icon Gallery</h2>
        <p>
          Use this gallery to find the icon you want to use. Click on an icon to copy its name to
          the clipboard.
        </p>
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '20px',
          }}
        />

        {/* Category tabs */}
        {!searchTerm && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            <button
              style={{
                padding: '8px 12px',
                background: activeCategory === null ? '#0070f3' : '#f0f0f0',
                color: activeCategory === null ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveCategory(null)}
            >
              All Icons
            </button>
            {categorizedIcons.map((category) => (
              <button
                key={category.category}
                style={{
                  padding: '8px 12px',
                  background: activeCategory === category.category ? '#0070f3' : '#f0f0f0',
                  color: activeCategory === category.category ? 'white' : 'black',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '16px',
        }}
      >
        {searchTerm
          ? // Show search results
            filteredIcons.map((name) => <IconItem key={name} name={name} />)
          : activeCategory
            ? // Show selected category
              categorizedIcons
                .find((cat) => cat.category === activeCategory)
                ?.icons.map((name) => <IconItem key={name} name={name} />)
            : // Show all categories
              categorizedIcons.map((category) => (
                <React.Fragment key={category.category}>
                  {/* Category header spanning the full width */}
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      borderBottom: '1px solid #eee',
                      marginTop: '16px',
                      marginBottom: '8px',
                      paddingBottom: '4px',
                      fontWeight: 'bold',
                    }}
                  >
                    {category.category}
                  </div>

                  {/* Icons in this category */}
                  {category.icons.map((name) => (
                    <IconItem key={name} name={name} />
                  ))}
                </React.Fragment>
              ))}

        {/* Show "no results" message if search has no matches */}
        {searchTerm && filteredIcons.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              padding: '16px',
              textAlign: 'center',
              color: '#666',
            }}
          >
            No icons found matching &quot;{searchTerm}&quot;
          </div>
        )}
      </div>
    </div>
  )
}

// Extracted IconItem component for reuse
const IconItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px',
        border: '1px solid #eee',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={() => {
        // Copy the icon name to clipboard
        navigator.clipboard
          .writeText(name)
          .then(() => {
            alert(`Copied "${name}" to clipboard!`)
          })
          .catch(() => {
            alert('Failed to copy icon name')
          })
      }}
    >
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        <Icon name={name} size={24} />
      </div>
      <span
        style={{
          fontSize: '12px',
          marginTop: '8px',
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {name}
      </span>
    </div>
  )
}

export default IconGallery
