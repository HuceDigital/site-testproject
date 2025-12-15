import React from "react";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export const HeroCollage: React.FC<Page["hero"]> = ({
  subContent,
  links,
  media,
  collageImages,
}) => {
  return (
    <div className="bg-stone-100 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl  text-gray-900 leading-tight">
              {subContent?.title || "Building Connections, Creating Impact"}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {subContent?.description ||
                "We're a consumer-led digital health company that helps people live healthier, happier lives."}
            </p>

            {Array.isArray(links) && links.length > 0 && links[0]?.link && (
              <div className="pt-4">
                <CMSLink {...links[0].link} className="inline-block" />
              </div>
            )}
          </div>

          {/* Right side - Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-96 lg:h-[500px]">
              {/* Left column with stacked images */}
              <div className="flex flex-col gap-4">
                {/* Top left image */}
                <div className="relative rounded-xl overflow-hidden flex-1">
                  {collageImages?.[0]?.image &&
                    typeof collageImages[0].image === "object" && (
                      <Media
                        resource={collageImages[0].image}
                        fill
                        imgClassName="object-cover"
                        priority
                      />
                    )}
                </div>

                {/* Bottom left image */}
                <div className="relative rounded-xl overflow-hidden flex-1">
                  {collageImages?.[1]?.image &&
                    typeof collageImages[1].image === "object" && (
                      <Media
                        resource={collageImages[1].image}
                        fill
                        imgClassName="object-cover"
                        priority
                      />
                    )}
                </div>
              </div>

              {/* Right side portrait image */}
              <div className="relative rounded-xl overflow-hidden">
                {collageImages?.[2]?.image &&
                  typeof collageImages[2].image === "object" && (
                    <Media
                      resource={collageImages[2].image}
                      fill
                      imgClassName="object-cover"
                      priority
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
