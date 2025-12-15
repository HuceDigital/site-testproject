import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProjectArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const project1: (args: ProjectArgs) => RequiredDataFromCollectionSlug<'projects'> = ({
  heroImage,
  author,
}) => {
  return {
    slug: 'gevel-renovatie',
    _status: 'published',
    authors: [author],
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Huisgevel volledig gerenoveerd en geschilderd',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Dit project omvatte een complete renovatie en schilderbeurt van een karakteristieke woning. We hebben de gevel grondig geprepareerd door loslatende verf te strippen en scheuren te dichten. Vervolgens hebben we hoogwaardige verf in moderne, frisse tinten aangebracht die perfect passen bij de architecturale stijl van het pand. Het resultaat is een prachtig opgefriste gevel die niet alleen esthetisch aantrekkelijk is, maar ook jarenlang bescherming biedt tegen de elementen. ',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    galleryImages: [{ image: heroImage.id, caption: 'Voor en na de renovatie' }],
    heroImage: heroImage.id,
    meta: {
      description:
        'Ontdek de transformatie van een karakteristieke woning door middel van professionele gevelrenovatie en schilderwerk. Elke streek telt.',
      image: heroImage.id,
      title: 'Gevel renovatie',
    },
    relatedProjects: [], // this is populated by the seed script
    title: 'Gevel renovatie',
  }
}
