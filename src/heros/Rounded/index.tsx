import { Media } from "@/components/Media";
import Image from "next/image";
import type { Page } from "@/payload-types";
import { CMSLink } from "@/components/Link";

export const RoundedHero: React.FC<Page["hero"]> = ({
  media,
  subContent,
  links,
}) => {
  return (
    <div className="bg-white">
      <div className="flex w-full bg-primaryBlue">
        <div className="flex w-full bg-primaryBlue h-60 lg:h-[30rem]">
          <div className=" py-10 flex justify-center items-center bg-bottom rounded-bl-2xl w-full bg-cover shadow-2xl relative overflow-hidden">
            {media && typeof media === "object" && (
              <Media
                fill
                imgClassName="object-cover"
                priority
                resource={media}
              />
            )}
            <div className="absolute top-0 right-0">
              <div className=" w-40 md:w-60  h-14 md:h-20  py-2 px-4 rounded-bl-2xl relative bg-orange-500 shadow-md">
                <Image
                  src="/logo-horizontal.svg"
                  alt="Elanto logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/12 lg:w-2/12 bg-primaryMarineBlue"></div>
        <div className=" text-white w-10/12 lg:w-9/12 xl:w-8/12  bg-primaryMarineBlue pt-10 xl:pt-14 rounded-br-2xl flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl pr-10 font-bold">
            {subContent?.title}
          </h2>
          <div className="flex flex-col lg:flex-row   w-full lg:justify-between text-white  rounded-br-2xl   ">
            <div className="flex-1 lg:flex-[4] flex flex-col gap-10 pr-10  pb-12">
              <p className="text-lg md:text-2xl font-light">
                {subContent?.description}
              </p>
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex  gap-4">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} size="lg" />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {subContent?.image && (
              <div className="flex-[3] flex justify-end items-end w-full">
                <div
                  className={`relative w-full max-w-md h-64 lg:h-80 rounded-br-2xl overflow-hidden`}
                >
                  <Media
                    resource={subContent.image}
                    priority
                    fill
                    imgClassName="object-contain object-right-bottom"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
