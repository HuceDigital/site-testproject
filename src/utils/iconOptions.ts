import * as LucideIcons from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

// Extract icon component types from LucideIcons
type LucideIconsType = typeof LucideIcons
type LucideIconComponentKeys = {
  [K in keyof LucideIconsType]: LucideIconsType[K] extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >
    ? K
    : never
}[keyof LucideIconsType]

// Filter out non-icon exports (utility functions)
type IconNames = Exclude<
  LucideIconComponentKeys,
  'createLucideIcon' | 'defaultAttributes' | 'toKebabCase' | 'createElement'
>

// Create a typed array of icon names
// This is a compile-time extraction of available icon names
const getIconKeys = (): IconNames[] => {
  // We can't directly use TypeScript's type system at runtime,
  // so we need to filter based on what we know about the Lucide icon exports
  return Object.keys(LucideIcons).filter((key): key is IconNames => {
    // Skip utility functions and non-component exports
    const nonIconPatterns = [
      'createLucideIcon',
      'defaultAttributes',
      'toKebabCase',
      'createElement',
      'sanitizeFileName',
      'default',
      '__esModule',
    ]

    // Skip if it's in the non-icon patterns list
    if (nonIconPatterns.includes(key)) return false

    // Only include PascalCase named exports (component names)
    return /^[A-Z]/.test(key)
  })
}

// Get all available icon names
const iconNames = getIconKeys()

// Create options in the format needed for Payload CMS select fields
export const iconOptions = iconNames.map((name) => ({
  label: name,
  value: name,
}))

// Create a type for icon names to be used in components
export type IconName = IconNames

// Define common icon categories for better organization
type IconCategory = {
  category: string
  icons: IconName[]
}

// Organize icons by category (for better user experience)
const iconCategories: IconCategory[] = [
  {
    category: 'Common',
    icons: [
      'Check',
      'X',
      'Info',
      'AlertCircle',
      'AlertTriangle',
      'ChevronDown',
      'ChevronUp',
      'ChevronLeft',
      'ChevronRight',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ].filter((name): name is IconName => iconNames.includes(name as IconName)),
  },
  {
    category: 'Success & Verification',
    icons: [
      'Check',
      'CheckCircle',
      'CheckSquare',
      'BadgeCheck',
      'Shield',
      'ShieldCheck',
      'Award',
      'Medal',
      'Trophy',
    ].filter((name): name is IconName => iconNames.includes(name as IconName)),
  },
  {
    category: 'Analytics & Performance',
    icons: [
      'BarChart',
      'LineChart',
      'PieChart',
      'TrendingUp',
      'Activity',
      'Zap',
      'Timer',
      'Clock',
      'Gauge',
    ].filter((name): name is IconName => iconNames.includes(name as IconName)),
  },
  {
    category: 'Features & UI',
    icons: [
      'Sparkles',
      'Star',
      'Heart',
      'ThumbsUp',
      'Bookmark',
      'Bell',
      'Settings',
      'Sliders',
      'Wrench',
      'Tool',
      'Gem',
    ].filter((name): name is IconName => iconNames.includes(name as IconName)),
  },
  {
    category: 'Communication',
    icons: ['MessageCircle', 'MessageSquare', 'Mail', 'Phone', 'Share', 'Send', 'Link'].filter(
      (name): name is IconName => iconNames.includes(name as IconName),
    ),
  },
]

// For convenience, export USP-relevant icons
export const uspRelevantIcons = [
  'Check',
  'Star',
  'Heart',
  'Sparkles',
  'ThumbsUp',
  'BadgeCheck',
  'Trophy',
  'Award',
  'Zap',
  'Clock',
  'Shield',
  'CheckCircle',
  'Gem',
  'BarChart',
  'LineChart',
  'TrendingUp',
  'Settings',
  'Tool',
  'Wrench',
  'ShieldCheck',
]
  .filter((name): name is IconName => iconNames.includes(name as IconName))
  .map((name) => ({
    label: name,
    value: name,
  }))

// Export categories for use in the icon gallery
export const categorizedIcons = iconCategories
