'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { IconName } from '@/utils/iconOptions'

type IconProps = {
  name: IconName | string
  size?: number
  color?: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name = 'Check', size = 24, color, className = '' }) => {
  // Default to Check icon if the name is not found
  const LucideIconsMap = LucideIcons as unknown as Record<string, LucideIcon>
  const IconComponent = LucideIconsMap[name] || LucideIcons.Check

  return <IconComponent size={size} color={color} className={className} />
}
