import type { Block } from "payload";

export const Process: Block = {
  slug: "process",
  interfaceName: "ProcessBlock",
  imageURL: "/blocks/process.jpg",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "style1",
      label: "Type",
      options: [
        {
          label: "Style 1",
          value: "style1",
        },
        {
          label: "Style 2",
          value: "style2",
        },
      ],
      required: true,
    },
    {
      name: "title", // required
      type: "text", // required
      required: true,
    },
    {
      name: "steps",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "color",
          label: "Number Color (hex)",
          type: "text",
          admin: {
            placeholder: "#000000",
            description: "Hex color for the number square. Defaults to black.",
          },
          validate: (val: any) => {
            if (!val) return true;
            const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
            return (
              hexPattern.test(val) ||
              "Please enter a valid hex color (e.g. #000 or #000000)"
            );
          },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          admin: {
            condition: (_: any, _siblingData: any, context: any) => {
              // Show media only when the block type is style1
              return context?.data?.type === "style1";
            },
          },
          validate: (val: any, context: any) => {
            if (context?.data?.type === "style1" && !val) {
              return "Media is required for Style 1";
            }
            return true;
          },
        },
      ],
    },
  ],
};
