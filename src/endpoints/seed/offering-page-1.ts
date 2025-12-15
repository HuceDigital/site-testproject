import { RequiredDataFromCollectionSlug } from "payload";
import type { Media } from "@/payload-types";

// @ts-ignore - Seed file may have incomplete types
export const offeringPage: ({
  slug,
  title,
  heroImage,
}: {
  slug: string;
  title: string;
  heroImage: Media;
}) => any = ({ slug, title, heroImage }) => {
  return {
    slug: slug,
    _status: "published",
    hero: {
      type: "highImpact",
      media: heroImage.id,
      richText: {
        root: {
          type: "root",
          children: [
            {
              type: "heading",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Offering page",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              tag: "h1",
              version: 1,
            },
            {
              type: "heading",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "want something awesome?",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              tag: "h2",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },

      usps: [
        {
          usp: "Description 1",
          icon: "AArrowDown",
        },
        {
          usp: "Description 2",
          icon: "AArrowDown",
        },
        {
          usp: "Description 3",
          icon: "AArrowDown",
        },
      ],
    },

    layout: [
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
        blockType: "mediaBlock",
        media: heroImage.id,
      },
      {
        blockType: "feature",
        features: [
          {
            title: "Feature 1",
            description: "Feature 1 description",
            icon: "AArrowDown",
          },
          {
            title: "Feature 2",
            description: "Feature 2 description",
            icon: "AArrowDown",
          },
          {
            title: "Feature 3",
            description: "Feature 3 description",
            icon: "AArrowDown",
          },
        ],
        title: "Why choose us?",
      },

      {
        blockType: "suitableapplications",
        applications: [
          {
            title: "Application 1",
            icon: "AArrowDown",
          },
          {
            title: "Application 2",
            icon: "AArrowDown",
          },
          {
            title: "Application 3",
            icon: "AArrowDown",
          },
          {
            title: "Application 4",
            icon: "AArrowDown",
          },
        ],

        title: "what you can do with it",
      },
      {
        blockType: "process",
        type: "style1",
        steps: [
          {
            media: heroImage.id,
            title: "Step 1",
            description: "Step 1 description",
          },
          {
            media: heroImage.id,
            title: "Step 2",
            description: "Step 2 description",
          },
          {
            media: heroImage.id,
            title: "Step 3",
            description: "Step 3 description",
          },
        ],
        title: "How it works",
      },
      {
        blockType: "cta",
        type: "style1",
        richText: {
          root: {
            type: "root",
            children: [
              {
                type: "heading",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Get in touch",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                tag: "h2",
                version: 1,
              },
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
        links: [
          {
            link: {
              label: "get in touch",
              type: "custom",
              url: "/contact",
            },
          },
        ],
      },
      {
        blockType: "faq",
        title: "FAQ",
        questions: [
          {
            question: "Question 1",
            answer: "Answer 1",
          },
          {
            question: "Question 2",
            answer: "Answer 2",
          },
          {
            question: "Question 3",
            answer: "Answer 3",
          },
        ],
      },
    ],
    title: title,
  };
};
