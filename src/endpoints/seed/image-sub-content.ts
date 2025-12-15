import { Media } from '@/payload-types'

export const imageSubContent: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Straight metallic shapes with a blue gradient',
}
