#!/usr/bin/env node

/**
 * Script to obtain Office365 OAuth2 refresh token for SMTP
 *
 * Usage:
 * 1. Make sure your .env file has OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_TENANT_ID, and OAUTH_USER
 * 2. Run: node scripts/get-oauth-token.js
 * 3. Follow the instructions to get the authorization code
 * 4. The script will exchange it for a refresh token
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file manually
function loadEnv() {
  try {
    const envPath = resolve(__dirname, "../.env");
    const envFile = readFileSync(envPath, "utf-8");
    const envVars = {};

    envFile.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          // Remove quotes if present
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          envVars[key] = value;
        }
      }
    });

    Object.assign(process.env, envVars);
  } catch (error) {
    console.warn("⚠️  Could not load .env file, using process.env directly");
  }
}

loadEnv();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const tenantId = process.env.OAUTH_TENANT_ID;
  const user = process.env.OAUTH_USER || process.env.SMTP_USER;

  // Allow custom redirect URI from env, or use default
  let redirectUri = process.env.OAUTH_REDIRECT_URI || "http://localhost";

  if (!clientId || !clientSecret || !tenantId || !user) {
    console.error("❌ Missing required environment variables:");
    if (!clientId) console.error("  - OAUTH_CLIENT_ID");
    if (!clientSecret) console.error("  - OAUTH_CLIENT_SECRET");
    if (!tenantId) console.error("  - OAUTH_TENANT_ID");
    if (!user) console.error("  - OAUTH_USER or SMTP_USER");
    process.exit(1);
  }

  console.log("\n📧 Office365 OAuth2 Refresh Token Generator\n");
  console.log("Configuration:");
  console.log(`  Client ID: ${clientId}`);
  console.log(`  Tenant ID: ${tenantId}`);
  console.log(`  User: ${user}`);
  console.log(`  Redirect URI: ${redirectUri}\n`);

  // Check if they want to use a different redirect URI
  const useCustomRedirect = await question(
    `Use redirect URI "${redirectUri}"? (y/n, or enter custom URI): `
  );

  if (
    useCustomRedirect.toLowerCase() === "n" ||
    useCustomRedirect.trim() === ""
  ) {
    redirectUri = await question(
      "Enter your redirect URI (must match Azure config): "
    );
    if (!redirectUri || redirectUri.trim() === "") {
      console.error("❌ Redirect URI is required");
      process.exit(1);
    }
    redirectUri = redirectUri.trim();
  } else if (
    useCustomRedirect.toLowerCase() !== "y" &&
    useCustomRedirect.trim() !== ""
  ) {
    // They entered a custom URI directly
    redirectUri = useCustomRedirect.trim();
  }

  console.log(`\n✅ Using redirect URI: ${redirectUri}\n`);

  // Warn if redirect URI might not be configured
  if (redirectUri === "http://localhost") {
    console.log(
      "⚠️  IMPORTANT: Make sure 'http://localhost' is added as a redirect URI in Azure!"
    );
    console.log(
      "   Go to: Azure Portal > App Registrations > Your App > Authentication"
    );
    console.log("   Add 'http://localhost' as a Web platform redirect URI\n");
    const proceed = await question(
      "Have you added this redirect URI in Azure? (y/n): "
    );
    if (proceed.toLowerCase() !== "y") {
      console.log("\n📋 Steps to add redirect URI in Azure:");
      console.log("   1. Go to https://portal.azure.com");
      console.log(
        "   2. Navigate to: Azure Active Directory > App registrations"
      );
      console.log("   3. Find your app (Client ID: " + clientId + ")");
      console.log("   4. Go to 'Authentication' section");
      console.log("   5. Click 'Add a platform' > Select 'Web'");
      console.log("   6. Add redirect URI: http://localhost");
      console.log("   7. Click 'Configure' and come back here\n");
      const retry = await question(
        "Press Enter when you've added the redirect URI, or 'q' to quit: "
      );
      if (retry.toLowerCase() === "q") {
        process.exit(0);
      }
    }
  }

  // Step 1: Generate authorization URL
  const authUrl = new URL(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`
  );
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_mode", "query");
  authUrl.searchParams.set(
    "scope",
    "https://outlook.office365.com/SMTP.Send offline_access"
  );
  authUrl.searchParams.set("state", "12345");

  console.log("🔗 Step 1: Open this URL in your browser:");
  console.log("\n" + authUrl.toString() + "\n");
  console.log(
    "📝 Step 2: Sign in with your Office365 account and grant permissions"
  );
  console.log(
    '📝 Step 3: After redirect, copy the "code" parameter from the URL'
  );
  console.log("   Example: http://localhost/?code=0.AX...&state=12345\n");

  const authCode = await question(
    "Enter the authorization code from the URL: "
  );

  if (!authCode || authCode.trim() === "") {
    console.error("❌ Authorization code is required");
    process.exit(1);
  }

  console.log("\n🔄 Exchanging authorization code for tokens...\n");

  // Step 2: Exchange authorization code for tokens
  try {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authCode.trim(),
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      scope: "https://outlook.office365.com/SMTP.Send offline_access",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error obtaining tokens:");
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log("✅ Success! Tokens obtained:\n");
    console.log("📋 Add these to your .env file:\n");
    console.log(`OAUTH_REFRESH_TOKEN="${data.refresh_token}"`);
    if (data.access_token) {
      console.log(`OAUTH_ACCESS_TOKEN="${data.access_token}"`);
      // Calculate expiration (usually 3600 seconds = 1 hour)
      const expiresIn = data.expires_in || 3600;
      const expiresAt = Date.now() + expiresIn * 1000;
      console.log(`OAUTH_ACCESS_TOKEN_EXPIRES="${expiresIn}"`);
      console.log(
        `\n⚠️  Note: Access token expires at: ${new Date(expiresAt).toISOString()}`
      );
    }
    console.log(
      "\n💡 The refresh token is long-lived and can be used to get new access tokens automatically.\n"
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
