import { RequiredDataFromCollectionSlug } from "payload";
import type { Media } from "@/payload-types";

export const aboutPage: ({
  slug,
  title,
  heroImage,
  collageImage1,
  collageImage2,
  collageImage3,
}: {
  slug: string;
  title: string;
  heroImage: Media;
  collageImage1: Media;
  collageImage2: Media;
  collageImage3: Media;
}) => RequiredDataFromCollectionSlug<"pages"> = ({
  slug,
  title,
  heroImage,
  collageImage1,
  collageImage2,
  collageImage3,
}) => {
  return {
    slug: slug,
    _status: "published",
    hero: {
      type: "heroCollage",
      subContent: {
        title: "Building Connections, Creating Impact",
        description:
          "We're a consumer-led digital health company that helps people live healthier, happier lives.",
      },
      collageImages: [
        { image: collageImage1.id },
        { image: collageImage2.id },
        { image: collageImage3.id },
      ],
      links: [
        {
          link: {
            type: "custom",
            url: "/contact",
            label: "Learn More",
            appearance: "cta",
          },
        },
      ],
    },

    layout: [
      {
        blockType: "textWithImage",
        description:
          "We find ourselves in a transformative era where artificial intelligence (AI) stands at the forefront of technological evolution. The ripple effects of its advancements are reshaping industries at an unprecedented pace. No longer are businesses bound by the limitations of tedious, manual processes. Instead, sophisticated machines, fueled by vast amounts of historical data, are now capable of making decisions previously left to human intuition. These intelligent systems are not only optimizing operations but also pioneering innovative approaches, heralding a new age of business transformation worldwide. ",
        imagePosition: "right",
        media: heroImage.id,
        title: "some title",
      },
      {
        blockType: "contentsection",
        title: "some title",
        richText: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "We find ourselves in a transformative era where artificial intelligence (AI) stands at the forefront of technological evolution. The ripple effects of its advancements are reshaping industries at an unprecedented pace. No longer are businesses bound by the limitations of tedious, manual processes. Instead, sophisticated machines, fueled by vast amounts of historical data, are now capable of making decisions previously left to human intuition. These intelligent systems are not only optimizing operations but also pioneering innovative approaches, heralding a new age of business transformation worldwide. ",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
      },
      {
        blockType: "process",
        type: "style2",
        title: "Hoe Elanto werkt",
        steps: [
          {
            title: "Innovation",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
            color: "#1680C3",
          },
          {
            title: "Advance AI tools",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
            color: "#648252",
          },
          {
            title: "24/7 Support",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
            color: "#E74C3C",
          },
        ],
      },
    ],
    title: title,
  };
};
