import type { Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";
import { iconOptions } from "@/utils/iconOptions";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
       
        {
          label: "Fifty Fifty",
          value: "fiftyFifty",
        },
        {
          label: "Hero Collage",
          value: "heroCollage",
        },
        // TODO: currently we only support high impact hero, add more hero options
        // {
        //   label: 'Medium Impact',
        //   value: 'mediumImpact',
        // },
        // {
        //   label: 'Low Impact',
        //   value: 'lowImpact',
        // },
         // {
        //   label: "Rounded",
        //   value: "rounded",
        // },
      ],
      required: true,
    },
    {
      admin: {
        condition: (_, { type } = {}) => ["highImpact"].includes(type),
      },
      name: "usps",
      type: "array",
      fields: [
        {
          name: "usp",
          type: "text",
          required: true,
        },
        {
          name: "icon",
          type: "select",
          label: "Icon",
          options: iconOptions,
          defaultValue: "Check",
        },
      ],
    },
    {
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "fiftyFifty"].includes(type),
      },
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ["default", "outline", "cta"],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      hidden: true,
      name: "logo",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["rounded"].includes(type),
      },
      relationTo: "media",
      required: false,
    },
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) =>
          ["highImpact", "mediumImpact", "rounded", "fiftyFifty"].includes(type),
      },
      relationTo: "media",
      required: true,
    },
    {
      name: "subContent",
      type: "group",
      admin: {
        condition: (_, { type } = {}) =>
          ["rounded", "heroCollage"].includes(type),
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
        // need to deprecate this but removing it will break prod
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            condition: (_, { type } = {}) => ["rounded"].includes(type),
          },
        },
        //need to deprecate this field
        {
          hidden: true,
          name: "imagePosition",
          type: "select",
          options: ["left", "right"],
          required: false,
        },
      ],
    },
    {
      name: "collageImages",
      type: "array",
      admin: {
        condition: (_, { type } = {}) => ["heroCollage"].includes(type),
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      minRows: 3,
      maxRows: 3,
      required: true,
    },
  ],
  label: false,
};
