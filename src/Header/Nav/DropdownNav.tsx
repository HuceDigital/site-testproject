'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ClientLink } from '@/components/Link/ClientLink'

type DropdownNavProps = {
  label: string
  items: {
    link: {
      type?: ('reference' | 'custom') | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts' | 'projects'
        value: any
      } | null
      url?: string | null
      label: string
    }
    id?: string | null
  }[]
}

export const DropdownNav: React.FC<DropdownNavProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle mouse enter - open the dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }

  // Handle mouse leave - close the dropdown with a delay
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 300) // 300ms delay before closing
  }

  // Handle navigation - close the dropdown
  const handleNavigation = () => {
    setOpen(false)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="text-lg font-medium flex items-center gap-1.5 hover:text-primary transition-colors duration-200 focus:outline-none group">
          <span className="">{label}</span>
          <ChevronDown
            className={`h-6 w-6 transition-transform duration-200 ease-in-out ${
              open ? 'rotate-180' : ''
            }`}
          />
        </DropdownMenuTrigger>
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50">
          <div
            className={`bg-white p-2 w-fit min-w-60 rounded-lg border border-gray-200  shadow-xl overflow-hidden transition-all duration-200 ease-in-out ${
              open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            style={{
              transformOrigin: 'top center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="py-1">
              {items.map((item, i) => (
                <div key={item.id || i} className="w-full transition-colors duration-150">
                  <ClientLink
                    {...item.link}
                    appearance="inline"
                    className="w-full rounded-lg whitespace-nowrap h-full px-4 py-2.5 block text-foreground hover:bg-gray-100 hover:text-primary-marine-blue transition-colors duration-150 text-lg"
                    onNavigate={handleNavigation}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DropdownMenu>
    </div>
  )
}
