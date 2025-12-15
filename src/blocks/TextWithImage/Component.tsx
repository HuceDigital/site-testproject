import { Media } from '@/components/Media'
import type { TextWithImage as TextWithImageProps } from '@/payload-types'

export const TextWithImageBlock: React.FC<TextWithImageProps> = ({
  description,
  media,
  title,
  imagePosition,
}) => {
  return (
    <section>
      <div className="flex flex-col  md:flex-row gap-12">
        <div className="flex flex-col gap-2 md:w-2/3 w-full">
          <h2 className="text-4xl md:text-5xl font-sans mb-8">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>

        <div
          className={`relative w-full md:w-1/3 h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden ${
            imagePosition === 'left' ? 'order-first' : ''
          }`}
        >
          <Media resource={media} fill imgClassName="object-cover rounded-lg" priority />
        </div>
      </div>
    </section>
  )
}
