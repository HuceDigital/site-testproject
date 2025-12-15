import type React from "react";
import { Icon } from "@/components/Icon";
import { Media } from "@/components/Media";
import type { FeatureBlock as FeatureProps } from "@/payload-types";

export const FeatureBlock: React.FC<FeatureProps> = ({
  title,
  features,
  backgroundImage,
  leftMedia,
  rightMedia,
}) => {
  return (
    <section className="relative w-full overflow-hidden ">
      {/* Achtergrond */}
      {backgroundImage &&
        typeof backgroundImage === "object" &&
        backgroundImage.url && (
          <div
            className="absolute inset-0 z-0 pointer-events-none select-none"
            aria-hidden
          >
            <div
              className="hidden md:block w-full h-full bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage.url})` }}
            />
            {/* <div className="absolute inset-0 bg-black/30" /> */}
          </div>
        )}

      {rightMedia && (
        <div className="absolute top-0 right-0 z-20">
          <Media resource={rightMedia} className="w-full h-auto" />
        </div>
      )}

      {/* Inhoud */}
      <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-14 pb-8 md:pb-12">
        {title && (
          <h2 className="text-center text-4xl md:text-5xl font-sans mb-8 md:mb-12 text-white">
            {title}
          </h2>
        )}

        <div className="min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Linker media */}
            {leftMedia && (
              <div className="w-full lg:w-[260px] shrink-0">
                <Media
                  resource={leftMedia}
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            )}

            {/* Cards grid - positioned to overlap the bottom of the image */}
            <div className="flex-1">
              <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8 lg:mt-12">
                {features?.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-none lg:shadow-lg p-6 md:p-10 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-2 mb-2 justify-start md:justify-center">
                      {feature.icon && (
                        <Icon
                          name={feature.icon}
                          className="w-10 h-10 text-[#E91E8C] shrink-0"
                        />
                      )}
                      <h3 className="text-[#003366] font-semibold text-xl md:text-2xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-base md:text-lg text-left md:text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtiele fade onderaan voor contrast */}
      <div className="hidden lg:block pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />
    </section>
  );
};
