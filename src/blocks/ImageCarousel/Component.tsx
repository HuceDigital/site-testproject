import type { ImageCarouselBlock as ImageCarouselProps } from '@/payload-types'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'

export const ImageCarouselBlock: React.FC<ImageCarouselProps> = ({ title, images }) => {
  return (
    <section>
      <h2 className="text-center text-4xl md:text-5xl font-sans mb-12 md:mb-16 ">
        {title}
      </h2>
      <ImageCarousel images={images} withDialog={true} />
    </section>
  )
}
