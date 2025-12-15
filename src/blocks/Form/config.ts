import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const FormBlock: Block = {
  slug: "formBlock",
  interfaceName: "FormBlock",
  fields: [
    {
      name: "formVariant",
      type: "select",
      label: "Form Variant",
      required: true,
      defaultValue: "traditional",
      options: [
        {
          label: "Traditional",
          value: "traditional",
        },
        {
          label: "Google Maps Integrated",
          value: "googleMaps",
        },
      ],
      admin: {
        description:
          "Choose between the traditional form or a Google Maps integrated version.",
      },
    },
    {
      name: "contactInfo",
      type: "group",
      label: "Contact Info (right column)",
      fields: [
        {
          name: "address",
          type: "textarea",
          label: "Address",
        },
        {
          name: "phone",
          type: "text",
          label: "Phone",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
        },
        {
          name: "mapQuery",
          type: "text",
          label: "Google Maps Location Query",
          admin: {
            description:
              "Example: 'Voorbeeldstraat 1, 1000 Brussel' or 'Amsterdam, Netherlands'",
          },
        },
      ],
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
    {
      name: "enableIntro",
      type: "checkbox",
      label: "Enable Intro Content",
    },
    {
      name: "introContent",
      type: "richText",
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
      label: "Intro Content",
    },
  ],
  graphQL: {
    singularName: "FormBlock",
  },
  labels: {
    plural: "Form Blocks",
    singular: "Form Block",
  },
};
