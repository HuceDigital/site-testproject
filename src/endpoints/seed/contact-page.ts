import type { Form } from "@/payload-types";
import { RequiredDataFromCollectionSlug } from "payload";

type ContactArgs = {
  contactForm: Form;
};

export const contact: (
  args: ContactArgs
) => RequiredDataFromCollectionSlug<"pages"> = ({ contactForm }) => {
  return {
    slug: "contact",
    _status: "published",
    hero: {
      type: "none",
    },
    layout: [
      {
        blockType: "formBlock",
        formVariant: "googleMaps",
        enableIntro: true,
        form: contactForm,
        contactInfo: {
          address: "Voorbeeldstraat 1\n1000 Brussel\nBelgië",
          phone: "+32 2 123 45 67",
          email: "info@voorbeeld.be",
          mapQuery: "Voorbeeldstraat 1, 1000 Brussel",
        },
        introContent: {
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
                    text: "Example contact form:",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                tag: "h3",
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
    ],
    title: "Contact",
  };
};
