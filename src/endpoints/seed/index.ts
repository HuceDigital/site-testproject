import type {
  CollectionSlug,
  GlobalSlug,
  Payload,
  PayloadRequest,
  File,
} from "payload";

import { contactForm as contactFormData } from "./contact-form";
import { contact as contactPageData } from "./contact-page";
import { offeringPage } from "./offering-page-1";
import { aboutPage as aboutPageData } from "./about-page";
import { home } from "./home";
import { image1 } from "./image-1";
import { image2 } from "./image-2";
import { imageHero1 } from "./image-hero-1";
import { post1 } from "./post-1";
import { post2 } from "./post-2";
import { post3 } from "./post-3";
import { project1 } from "./project-1";
import { project2 } from "./project-2";
import { project3 } from "./project-3";
import { whatsappSettings } from "./whatsapp-settings";
import { componentRegistryData } from "./component-registry-data";

const collections: CollectionSlug[] = [
  "categories",
  "projects",
  "media",
  "pages",
  "posts",
  "forms",
  "form-submissions",
  "search",
  "component-registry",
];

const offerings = [
  { slug: "offering-page-1", title: "Offering Page 1" },
  { slug: "offering-page-2", title: "Offering Page 2" },
  { slug: "offering-page-3", title: "Offering Page 3" },
];

const globals: GlobalSlug[] = ["header", "footer", "whatsappSettings"];

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload;
  req: PayloadRequest;
}): Promise<void> => {
  payload.logger.info("Seeding database...");

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`);

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data:
        global === "footer"
          ? { navItems: [] }
          : global === "whatsappSettings"
            ? whatsappSettings
            : ({} as any),
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      })
    )
  );

 
  await Promise.all(
    collections.map((collection) =>
      payload.db.deleteMany({ collection, req, where: {} })
    )
  );

  await Promise.all(
    collections
      .filter((collection) =>
        Boolean(payload.collections[collection].config.versions)
      )
      .map((collection) =>
        payload.db.deleteVersions({ collection, req, where: {} })
      )
  );

  payload.logger.info(`— Seeding demo author and user...`);

  await payload.delete({
    collection: "users",
    depth: 0,
    where: {
      email: {
        equals: "demo-author@example.com",
      },
    },
  });

  payload.logger.info(`— Seeding media...`);

  const [
    image1Buffer,
    image2Buffer,
    image3Buffer,
    hero1Buffer,
    logo1Buffer,
    logo2Buffer,
    logo3Buffer,
  ] = await Promise.all([
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp"
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp"
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp"
    ),
    fetchFileByURL(
      "https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp"
    ),
    fetchFileByURL(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png"
    ),
    fetchFileByURL(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/320px-Tailwind_CSS_Logo.svg.png"
    ),
    fetchFileByURL(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png"
    ),
  ]);

  const logo1Data = {
    alt: "React Logo",
    filename: "react-logo.png",
  };

  const logo2Data = {
    alt: "Tailwind Logo",
    filename: "tailwind-logo.png",
  };

  const logo3Data = {
    alt: "Node.js Logo",
    filename: "nodejs-logo.png",
  };

  const [
    demoAuthor,
    image1Doc,
    image2Doc,
    image3Doc,
    imageHomeDoc,
    logo1Doc,
    logo2Doc,
    logo3Doc,
  ] = await Promise.all([
    payload.create({
      collection: "users",
      data: {
        name: "Demo Author",
        email: "demo-author@example.com",
        password: "password",
      },
    }),
    payload.create({
      collection: "media",
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: "media",
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: "media",
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: "media",
      data: imageHero1,
      file: hero1Buffer,
    }),
    payload.create({
      collection: "media",
      data: logo1Data,
      file: logo1Buffer,
    }),
    payload.create({
      collection: "media",
      data: logo2Data,
      file: logo2Buffer,
    }),
    payload.create({
      collection: "media",
      data: logo3Data,
      file: logo3Buffer,
    }),
  ]);

  if (payload.db.defaultIDType === "text") {
  }

  payload.logger.info(`— Seeding posts...`);

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({
      heroImage: image1Doc,
      blockImage: image2Doc,
      author: demoAuthor,
    }),
  });

  const post2Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({
      heroImage: image2Doc,
      blockImage: image3Doc,
      author: demoAuthor,
    }),
  });

  const post3Doc = await payload.create({
    collection: "posts",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({
      heroImage: image3Doc,
      blockImage: image1Doc,
      author: demoAuthor,
    }),
  });

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  });
  await payload.update({
    id: post2Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  });
  await payload.update({
    id: post3Doc.id,
    collection: "posts",
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  });

  payload.logger.info(`— Seeding projects`);

  const project1Doc = await payload.create({
    collection: "projects",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: project1({
      heroImage: image1Doc,
      blockImage: image2Doc,
      author: demoAuthor,
    }),
  });

  const project2Doc = await payload.create({
    collection: "projects",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: project2({
      heroImage: image2Doc,
      blockImage: image3Doc,
      author: demoAuthor,
    }),
  });

  const project3Doc = await payload.create({
    collection: "projects",
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: project3({
      heroImage: image3Doc,
      blockImage: image1Doc,
      author: demoAuthor,
    }),
  });

  payload.logger.info(`— Seeding contact form...`);

  const contactForm = await payload.create({
    collection: "forms",
    depth: 0,
    data: contactFormData,
  });

  let contactFormID: number | string = contactForm.id;

  if (payload.db.defaultIDType === "text") {
    contactFormID = `"${contactFormID}"`;
  }

  payload.logger.info(`— Seeding pages...`);

  const [_, contactPage, aboutPage] = await Promise.all([
    payload.create({
      collection: "pages",
      depth: 0,
      data: home({
        imageHome: imageHomeDoc,
        metaImage: image2Doc,
        logoImages: [logo1Doc, logo2Doc, logo3Doc],
      }),
    }),

    payload.create({
      collection: "pages",
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),

    payload.create({
      collection: "pages",
      depth: 0,
      data: aboutPageData({
        heroImage: imageHomeDoc,
        collageImage1: image1Doc,
        collageImage2: image2Doc,
        collageImage3: image3Doc,
        slug: "about",
        title: "About",
      }),
    }),
  ]);

  const [offeringPage1, offeringPage2, offeringPage3] = await Promise.all(
    offerings.map(async (offering) => {
      return payload.create({
        collection: "pages",
        depth: 0,
        data: offeringPage({
          slug: offering.slug,
          title: offering.title,
          heroImage: imageHomeDoc,
        }),
      });
    })
  );

  payload.logger.info(`— Seeding globals...`);

  await Promise.all([
    payload.updateGlobal({
      slug: "header",
      data: {
        navItems: [
          {
            link: {
              type: "reference",
              label: "Over ons",
              reference: {
                relationTo: "pages",
                value: aboutPage.id,
              },
            },
          },
          {
            link: {
              type: "custom",
              label: "Projecten",
              url: "/projects",
            },
          },
          {
            link: {
              type: "reference",
              label: "Contact",
              reference: {
                relationTo: "pages",
                value: contactPage.id,
              },
            },
          },
          {
            type: "dropdown",
            label: "Diensten",
            link: {
              type: "custom",
              label: "Diensten",
              url: "/diensten",
            },
            dropdownItems: [
              {
                link: {
                  type: "reference",
                  label: "Offering Page 1",
                  reference: {
                    relationTo: "pages",
                    value: offeringPage1?.id,
                  },
                },
              },
              {
                link: {
                  type: "reference",
                  label: "Offering Page 2",
                  reference: {
                    relationTo: "pages",
                    value: offeringPage2?.id,
                  },
                },
              },
              {
                link: {
                  type: "reference",
                  label: "Offering Page 3",
                  reference: {
                    relationTo: "pages",
                    value: offeringPage3?.id,
                  },
                },
              },
              
            ],
          },
          {
            type:'button',
            label: 'WhatsApp',
            link: {
              type: 'custom',
              label: 'Contact',
              url: '/contact',
            },
          },
        ],
      },
    }),

    payload.updateGlobal({
      slug: "footer",
      data: {
        navItems: [
          {
            link: {
              type: "custom",
              label: "Admin",
              url: "/admin",
            },
          },
          {
            link: {
              type: "reference",
              label: "Contact",
              reference: {
                relationTo: "pages",
                value: contactPage.id,
              },
            },
          },
          {
            link: {
              type: "custom",
              label: "Payload",
              newTab: true,
              url: "https://payloadcms.com/",
            },
          },
        ],
        contact: {
          email: "info@elanto.nl",
          phone: "+31 6 12345678",
          kvk: "1234567890",
        },
        googleReviews: 3,
        socials: [
          { social: "Facebook", link: "https://www.facebook.com/" },
          { social: "Instagram", link: "https://www.instagram.com/" },
          { social: "Linkedin", link: "https://www.linkedin.com/" },
          { social: "Youtube", link: "https://www.youtube.com/" },
          { social: "Tiktok", link: "https://www.tiktok.com/" },
        ],
        timeTable: [
          {
            day: "maandag",
            availability: "open",
            openTime: "9:00",
            closeTime: "17:00",
          },
          {
            day: "dinsdag",
            availability: "open",
            openTime: "9:00",
            closeTime: "17:00",
          },
          {
            day: "woensdag",
            availability: "open",
            openTime: "9:00",
            closeTime: "17:00",
          },
          {
            day: "donderdag",
            availability: "open",
            openTime: "9:00",
            closeTime: "17:00",
          },
          {
            day: "vrijdag",
            availability: "open",
            openTime: "9:00",
            closeTime: "17:00",
          },
          { day: "zaterdag", availability: "op afspraak" },
          { day: "zondag", availability: "gesloten" },
        ],
      },
    }),

    payload.updateGlobal({
      slug: "whatsappSettings",
      data: whatsappSettings,
    }),
  ]);

  payload.logger.info(`— Seeding component registry...`);

  // Seed the component registry with all available blocks
  await Promise.all(
    componentRegistryData.map((component) =>
      payload.create({
        collection: "component-registry",
        data: component,
      })
    )
  );

  payload.logger.info("Seeded database successfully!");
};

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`);
  }

  const data = await res.arrayBuffer();

  return {
    name: url.split("/").pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split(".").pop()}`,
    size: data.byteLength,
  };
}
