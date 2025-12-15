declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      // SMTP Configuration
      SMTP_HOST?: string
      SMTP_PORT?: string
      SMTP_SECURE?: string
      SMTP_USER?: string
      SMTP_PASS?: string
      SMTP_DEFAULT_USER?: string
      SMTP_DEFAULT_NAME?: string
      // OAuth2 Configuration for Office365
      OAUTH_CLIENT_ID?: string
      OAUTH_CLIENT_SECRET?: string
      OAUTH_REFRESH_TOKEN?: string
      OAUTH_ACCESS_TOKEN?: string
      OAUTH_ACCESS_TOKEN_EXPIRES?: string
      OAUTH_TENANT_ID?: string
      OAUTH_USER?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
