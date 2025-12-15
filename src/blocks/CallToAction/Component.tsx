import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";

export const CallToActionBlock: React.FC<
  CTABlockProps & { style2Text?: string | null }
> = (props) => {
  const { links, richText, type, style2Text } = props;
  if (type === "style1") {
    return (
      <div className=" flex flex-col gap-6">
        <div>
          {richText && (
            <RichText
              className="mb-0 text-black [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black &_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_h4]:mb-2 [&_h1]:font-sans
                 [&_h2]:font-sans
                 [&_h3]:font-sans
                 [&_h4]:font-sans
                 "
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} className="w-fit" />;
          })}
        </div>
      </div>
    );
  }
  if (type === "style2") {
    return (
      <div className="w-full mx-auto">
        <div className="bg-primaryBlue rounded-2xl px-8 py-10 flex items-center justify-center text-center lg:text-left lg:justify-between  gap-6 flex-wrap">
          <div>
            {style2Text && (
              <h2 className="text-white text-4xl md:text-5xl font-light">
                {style2Text}
              </h2>
            )}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="bg-white text-primaryBlue hover:bg-white/90 font-medium text-lg px-8 py-2 lg:py-6 rounded-lg shadow-sm w-fit"
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
