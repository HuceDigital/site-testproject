import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProjectArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const project3: (args: ProjectArgs) => RequiredDataFromCollectionSlug<'projects'> = ({
  heroImage,
  author,
}) => {
  return {
    slug: 'energiezuinige-ramen-geplaatst',
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
                text: 'Complete raamrenovatie met nieuwe ramen geplaatst',
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
                text: 'Bij deze renovatie hebben we alle oude ramen vervangen door energiezuinige, moderne kozijnen met HR+++ isolatieglas. De nieuwe ramen zorgen niet alleen voor een spectaculair verbeterde isolatie, waardoor de energierekening aanzienlijk daalt, maar geven het hele huis ook een eigentijdse uitstraling. Het installatieproces was zorgvuldig voorbereid om minimale overlast voor de bewoners te garanderen. Door het plaatsen van kwalitatieve kunststof kozijnen heeft de woning nu een hogere waarde en een comfortabeler binnenklimaat. ',
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
    galleryImages: [{ image: heroImage.id, caption: 'Nieuwe energiezuinige ramen' }],
    heroImage: heroImage.id,
    meta: {
      description:
        'Ontdek hoe een woning wordt getransformeerd met nieuwe energiezuinige ramen. Van oude kozijnen naar moderne HR+++ isolatie voor maximale comfort en besparing.',
      image: heroImage.id,
      title: 'Energiezuinige ramen geplaatst',
    },
    relatedProjects: [], // this is populated by the seed script
    title: 'Energiezuinige ramen geplaatst',
  }
}
