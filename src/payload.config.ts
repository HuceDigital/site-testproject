// storage-adapter-import-placeholder
import { sqliteAdapter } from "@payloadcms/db-sqlite";

import sharp from "sharp"; // sharp-import
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";
import { Sites } from "./collections/Sites";
import { ComponentRegistry } from "./collections/ComponentRegistry";
import { Footer } from "./Footer/config";
import { Header } from "./Header/config";
import { WhatsAppSettings } from "./globals/WhatsAppSettings";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { monitorDeployment } from "./jobs/monitorDeployment";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ["@/components/BeforeDashboard"],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_DEFAULT_USER ?? process.env.OAUTH_USER ?? "noreply@elanto.nl",
    defaultFromName: process.env.SMTP_DEFAULT_NAME ?? "noreply@elanto.nl",
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // Use SSL/TLS
      auth: process.env.OAUTH_CLIENT_ID && process.env.OAUTH_CLIENT_SECRET
        ? {
            type: "OAuth2",
            user: process.env.OAUTH_USER || process.env.SMTP_USER,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN, // Optional, will be generated from refreshToken if not provided
            expires: process.env.OAUTH_ACCESS_TOKEN_EXPIRES 
              ? parseInt(process.env.OAUTH_ACCESS_TOKEN_EXPIRES) 
              : undefined,
            // Office365 OAuth2 token endpoint
            accessUrl: process.env.OAUTH_TENANT_ID
              ? `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/token`
              : "https://login.microsoftonline.com/common/oauth2/v2.0/token",
          }
        : {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
    },
  }),

  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  collections: [Pages, Posts, Projects, Media, Categories, Users, Sites, ComponentRegistry],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, WhatsAppSettings],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [
      {
        slug: 'monitor-deployment',
        handler: monitorDeployment,
        queue: 'default',
      },
    ],
  },
});
