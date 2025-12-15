import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Project } from '@/payload-types'

type HomeArgs = {
  metaImage: Media
  imageHome: Media
  logoImages: Media[]
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
  imageHome,
  logoImages,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'fiftyFifty',
      richText: {
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
                  text: 'Schilders met hart voor uw huis',
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
                  text: 'We zijn een team van gedreven schilderessen en professionele rameninstallateurs die uw woning veranderen naar een schitterend, functioneel en energiezuinig huis.',
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
      media: imageHome.id,
    },
    layout: [
      {
        blockName: 'feature',
        blockType: 'feature',
        backgroundImage: imageHome.id,
        title: '',
        features: [
          {
            title: 'Schilderen',
            description: 'We schilderen kamer, woonkamer, keuken, badkamer, slaapkamer, hal, etc.',  
            icon: 'Check',
          },
          {
            title: 'Glas vervangen',
            description: 'We vervangen glas in ramen, deuren, etc.',  
            icon: 'Check',
          },
          {
            title: 'Glas vervangen',
            description: 'We vervangen glas in ramen, deuren, etc.',  
            icon: 'Check',
          }
        ],  
      },
      {
        blockName: 'teamSection',
        blockType: 'teamSection',
        title: 'Ons team',
        intro: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Lorem ipsum dolor sit amet consectetur. Dis semper ante magnis facilisis euismod fermentum a pulvinar. Egestas tellus sed congue nulla urna nisi quisque justo.',
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
        stats: [
          {
            value: '200+',
            label: 'Tevreden klanten',
          },
          {
            value: '5000+',
            label: 'Schilder uren',
          },
          {
            value: '500+',
            label: 'Ramen geplaatst',
          },
        ],
        members: [
          {
            name: 'John Doe',
            role: 'CEO',
            image: metaImage.id,
          },
          {
            name: 'Jane Smith',
            role: 'CTO',
            image: metaImage.id,
          },
          {
            name: 'Mike Johnson',
            role: 'Project Manager',
            image: metaImage.id,
          },
          {
            name: 'Sarah Wilson',
            role: 'Designer',
            image: metaImage.id,
          },
        ],
      },
      {
        blockName: 'marquee',
        blockType: 'marquee',
        type: 'style2',
        duration: 30,
        logos: logoImages.map((logo) => ({ logo: logo.id })),
      },
      {
        blockName: 'Archive Block',
        blockType: 'archive',
        categories: [],
        introContent: {
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
                    text: 'Recente projecten',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        populateBy: 'collection',
        relationTo: 'projects',
      },
      {
        blockName: 'faq',
        blockType: 'faq',
        type: 'style2',
        title: 'Veel gestelde vragen',
        questions: [
          {
            question: 'Wat kost een kamer laten schilderen?',
            answer: 'De kosten zijn afhankelijk van de specifieke wensen en situatie. Neem contact op voor een vrijblijvende offer te op maat.',
          },
          {
            question: 'Welke soorten verf gebruiken jullie en wat is het verschil tussen binnen- en buitenverf?',
            answer: '42',
          },
          {
            question: 'Kunnen jullie ook enkel glas vervangen door dubbel of HR++ glas?',
            answer: '42',
          },
          {
            question: 'Bieden jullie garantie op schilderwerk en geplaatste ruiten?',
            answer: '42',
          },
        ],
      },
      {
        blockName: 'reviews',
        blockType: 'reviews',
        title: 'Reviews van anderen',
        googlePlaceId: 'ChIJaRBUpeA1xkcR2NWc3ggNLqY',
        reviews: [
          {
            reviewerName: 'John Doe',
            reviewerTitle: 'Creative director at The wall',
            reviewText: '"Lorem ipsum dolor sit amet consectetur. Dis semper ante magnis facilisis euismod fermentum a pulvinar. Egestas tellus sed congue nulla urna nisi quisque justo. Feugiat mi eu odio sollicitudin ut convallis eu. Faucibus pellentesque pretium porttitor vulputate leo sed."',
            rating: 5,
          },
          {
            reviewerName: 'John Doe',
            reviewerTitle: 'Creative director at The wall',
            reviewText: '"Lorem ipsum dolor sit amet consectetur. Dis semper ante magnis facilisis euismod fermentum a pulvinar. Egestas tellus sed congue nulla urna nisi quisque justo. Feugiat mi eu odio sollicitudin ut convallis eu. Faucibus pellentesque pretium porttitor vulputate leo sed."',
            rating: 5,
          },
        ],
      },
      {
        blockName: 'cta',
        blockType: 'cta',
        type: 'style2',
        style2Text: 'Vraag een offerte aan!',
        links: [
          {
            link: {
              type: 'custom',
              url: 'https://www.google.com',
              label: 'Offerte opvragen',
              appearance: 'cta',
            },
          },
        ],
      }
    ],
    meta: {
      description: 'Slimme oplossingen voor een veilige toekomst.',
      image: metaImage.id,
      title: 'Home',
    },
    title: 'Home',
  }
}
