import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "topBar",
      type: "group",
      label: "Top Bar",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Show Top Bar",
          defaultValue: true,
        },
        {
          name: "email",
          type: "text",
          label: "Email",
          admin: {
            placeholder: "info@elanto.nl",
            condition: (_, siblingData) => siblingData?.enabled === true,
          },
        },
        {
          name: "phone",
          type: "text",
          label: "Phone",
          admin: {
            placeholder: "+32 123 45 67 89",
            condition: (_, siblingData) => siblingData?.enabled === true,
          },
        },
      ],
      admin: {
        description: "Controls the small top bar above navigation.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
    {
      name: "siteName",
      type: "text",
      label: "Site Name",
      defaultValue: "Elanto",
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        {
          name: "type",
          type: "radio",
          options: [
            {
              label: "Single Link",
              value: "link",
            },
            {
              label: "Dropdown Menu",
              value: "dropdown",
            },
            {
              label: "Button",
              value: "button",
            },
          ],
          defaultValue: "link",
          admin: {
            layout: "horizontal",
          },
        },
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === "dropdown",
          },
        },
        link({
          appearances: false,
        }),
        {
          name: "dropdownItems",
          type: "array",
          admin: {
            condition: (_, siblingData) => siblingData?.type === "dropdown",
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/Header/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
