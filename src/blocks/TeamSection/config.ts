import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const TeamSection: Block = {
  slug: "teamSection",
  interfaceName: "TeamSection",
  imageURL: "/blocks/features.jpg",
  labels: {
    singular: "Team Section",
    plural: "Team Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      defaultValue: "Ons team",
    },
    {
      name: "intro",
      type: "richText",
      label: "Intro Text",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          label: "Value (e.g. 200+)",
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Label (e.g. Tevreden klanten)",
        },
      ],
    },
    {
      name: "members",
      type: "array",
      label: "Team Members",
      required: true,
      admin: { initCollapsed: true },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
  ],
};
