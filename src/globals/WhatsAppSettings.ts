import type { GlobalConfig } from "payload";

export const WhatsAppSettings: GlobalConfig = {
  slug: "whatsappSettings",
  label: "WhatsApp Settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      label: "Enable WhatsApp Integration",
      defaultValue: true,
      admin: {
        description: "Enable or disable the entire WhatsApp integration",
      },
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "WhatsApp Phone Number",
      required: true,
      admin: {
        placeholder: "+31612345678",
        description: "Include country code, no spaces or special characters",
      },
    },
    {
      name: "popupSettings",
      type: "group",
      label: "Popup Settings",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Enable Popup",
          defaultValue: true,
          admin: {
            description: "Show the WhatsApp popup on page load",
          },
        },
        {
          name: "delay",
          type: "number",
          label: "Popup Delay (seconds)",
          defaultValue: 3,
          min: 0,
          max: 30,
          admin: {
            description: "How many seconds to wait before showing the popup",
          },
        },
        {
          name: "disableOnMobile",
          type: "checkbox",
          label: "Disable on Mobile",
          defaultValue: false,
          admin: {
            description: "Hide the popup on mobile devices",
          },
        },
        {
          name: "senderName",
          type: "text",
          label: "Sender Name",
          defaultValue: "Pierre",
          admin: {
            description: "Name shown in the popup",
          },
        },
        {
          name: "companyName",
          type: "text",
          label: "Company Name",
          defaultValue: "van Huce Digital",
          admin: {
            description: "Company name shown in the popup",
          },
        },
        {
          name: "greeting",
          type: "text",
          label: "Greeting",
          defaultValue: "Goedenavond",
          admin: {
            description: "Greeting message in the popup",
          },
        },
        {
          name: "message",
          type: "textarea",
          label: "Popup Message",
          defaultValue: "Heb je een vraag? Ik help je graag verder via:",
          admin: {
            description: "Main message shown in the popup",
          },
        },
        {
          name: "avatarImage",
          type: "upload",
          relationTo: "media",
          label: "Avatar Image",
          admin: {
            description:
              "Optional image to display instead of the green logo. If not provided, the default green logo will be used.",
          },
        },
      ],
      admin: {
        description: "Configure the WhatsApp popup appearance and behavior",
      },
    },
    {
      name: "buttonSettings",
      type: "group",
      label: "Button Settings",
      fields: [
        {
          name: "message",
          type: "textarea",
          label: "Default WhatsApp Message",
          defaultValue: "Hallo! Ik heb een vraag over jullie diensten.",
          admin: {
            description: "Default message when clicking the WhatsApp button",
          },
        },
      ],
      admin: {
        description: "Configure the floating WhatsApp button",
      },
    },
  ],
  admin: {
    description:
      "Configure WhatsApp integration settings including popup and button behavior",
  },
};
