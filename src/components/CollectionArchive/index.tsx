'use client'
import { cn } from '@/utilities/ui'
import React, { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Card, CardPostData, CardProjectData } from '@/components/Card'
import { Button } from '../ui/button'

export type Props = {
  posts?: CardPostData[]
  projects?: CardProjectData[]
  relationTo?: 'posts' | 'projects'
  withFilter?: boolean | undefined
  layout?: 'masonry' | 'grid'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, projects, relationTo = 'posts', withFilter, layout = 'masonry' } = props
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get all unique categories from the items
  const allItems = relationTo === 'posts' ? posts : projects

  // Get active categories from URL once
  const categoryParam = useMemo(() => searchParams.get('categories'), [searchParams])
  const activeCategories = useMemo(
    () => (categoryParam ? categoryParam.split(',').filter(Boolean) : []),
    [categoryParam],
  )

  // Collect unique categories from items
  const uniqueCategories = useMemo(() => {
    const categories = new Map<number, { id: number; title: string }>()

    allItems?.forEach((item) => {
      if (item?.categories && Array.isArray(item.categories)) {
        item.categories.forEach((category) => {
          if (
            typeof category === 'object' &&
            category !== null &&
            'id' in category &&
            'title' in category
          ) {
            categories.set(Number(category.id), {
              id: Number(category.id),
              title: category.title as string,
            })
          }
        })
      }
    })

    return [...categories.values()]
  }, [allItems])

  // Filter items based on the selected categories
  const filteredItems = useMemo(() => {
    if (!activeCategories.length) {
      // No filters selected - show all items
      return allItems
    }

    return allItems?.filter((item) => {
      if (!item?.categories || !Array.isArray(item.categories)) {
        return false
      }

      // Check if the item has at least one of the selected categories
      return item.categories.some((category) => {
        if (typeof category === 'object' && category !== null && 'id' in category) {
          return activeCategories.includes(category.id.toString())
        }
        return false
      })
    })
  }, [activeCategories, allItems])

  // Toggle a category in the filter
  const toggleCategory = useCallback(
    (categoryId: string) => {
      // Create a new URLSearchParams object based on the current state
      const params = new URLSearchParams(searchParams.toString())

      // Get current categories, ensure we're working with a clean array
      const currentCategories = params.get('categories')
        ? params.get('categories')!.split(',').filter(Boolean)
        : []

      // Check if category is already selected
      const categoryIndex = currentCategories.indexOf(categoryId)

      if (categoryIndex >= 0) {
        // Remove the category
        currentCategories.splice(categoryIndex, 1)
      } else {
        // Add the category
        currentCategories.push(categoryId)
      }

      // Update URL with new categories
      if (currentCategories.length > 0) {
        params.set('categories', currentCategories.join(','))
      } else {
        params.delete('categories')
      }

      // Navigate to the new URL
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, pathname, router],
  )

  // Select "All" and clear other selections
  const selectAll = useCallback(() => {
    // Simply remove the categories parameter
    const params = new URLSearchParams(searchParams.toString())
    params.delete('categories')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pathname, searchParams, router])

  return (
    <div>
      {withFilter && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {/* "All" pill */}
            <Button
              onClick={selectAll}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeCategories.length === 0
                  ? 'primaryBlue text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
              )}
            >
              Alle
            </Button>

            {uniqueCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id.toString())}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeCategories.includes(category.id.toString())
                    ? 'bg-primaryBlue text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800',
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        {layout === 'masonry' ? (
          /* Masonry layout with 2 columns */
          <div className="columns-1 sm:columns-2 gap-8">
            {filteredItems?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                // Use every 3rd card for better visual rhythm (0, 3, 6, etc.)
                const isAlternate = index % 3 === 0

                return (
                  <div className="break-inside-avoid mb-10" key={index}>
                    <Card
                      className={'bg-transparent'}
                      doc={result}
                      relationTo={relationTo}
                      showCategories
                      isTallCard={isAlternate}
                    />
                  </div>
                )
              }

              return null
            })}
          </div>
        ) : (
          /* Grid layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredItems?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <Card
                    key={index}
                    className={'bg-transparent'}
                    doc={result}
                    relationTo={relationTo}
                    showCategories
                    isTallCard={true}
                  />
                )
              }

              return null
            })}
          </div>
        )}

        {/* Show message when no items match the filter */}
        {filteredItems?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl mb-2">Geen resultaten gevonden</h3>
            <p className="text-gray-600">
              Er zijn geen {relationTo === 'posts' ? 'berichten' : 'projecten'} gevonden met de
              geselecteerde categorie(ën).
            </p>
            <button
              onClick={selectAll}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Alle {relationTo === 'posts' ? 'berichten' : 'projecten'} bekijken
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
