'use client'

import React from 'react'
import { CMSLink } from '.'

type ClientLinkProps = React.ComponentProps<typeof CMSLink> & {
  onNavigate?: () => void
}

export const ClientLink: React.FC<ClientLinkProps> = ({ onNavigate, className, ...props }) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  // Use client-side event handling with a wrapper that preserves the original styling
  return (
    <span
      onClick={handleClick}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      <CMSLink {...props} className="w-full h-full block" />
    </span>
  )
}
