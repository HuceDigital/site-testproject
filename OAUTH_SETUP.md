# Office365 OAuth2 Setup Guide

This guide explains how to configure Office365 OAuth2 authentication for SMTP email sending in this application.

## Table of Contents

- [Overview](#overview)
- [Why OAuth2?](#why-oauth2)
- [Prerequisites](#prerequisites)
- [Azure App Registration](#azure-app-registration)
- [Obtaining Refresh Token](#obtaining-refresh-token)
- [Environment Configuration](#environment-configuration)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)

## Overview

This application uses Office365 OAuth2 authentication to send emails via SMTP. OAuth2 is Microsoft's recommended authentication method for Office365, replacing basic username/password authentication which is being phased out for security reasons.

## Why OAuth2?

- **Security**: More secure than basic authentication
- **Compliance**: Required by Microsoft for modern Office365 accounts
- **Token Management**: Automatic token refresh without storing passwords
- **Best Practice**: Industry standard for API authentication

## Prerequisites

Before starting, ensure you have:

1. **Office365 Account**: An active Office365/Microsoft 365 account with email sending permissions
2. **Azure Access**: Access to Azure Portal (usually requires admin privileges)
3. **Application Registration**: An Azure App Registration (or ability to create one)

## Azure App Registration

### Step 1: Create App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **"New registration"**
4. Fill in:
   - **Name**: e.g., "Elanto SMTP Sender"
   - **Supported account types**: Choose based on your needs
   - **Redirect URI**:
     - Platform: **Web**
     - URI: `http://localhost`
5. Click **"Register"**

### Step 2: Configure API Permissions

1. In your app registration, go to **"API permissions"**
2. Click **"Add a permission"**
3. Select **"APIs my organization uses"**
4. Search for and select **"Office 365 Exchange Online"**
5. Under **"Delegated permissions"**, add:
   - `https://outlook.office365.com/SMTP.Send`
   - `offline_access` (required for refresh tokens)
6. Click **"Add permissions"**
7. **Important**: Click **"Grant admin consent"** for your organization

### Step 3: Create Client Secret

1. Go to **"Certificates & secrets"**
2. Click **"New client secret"**
3. Add a description (e.g., "SMTP OAuth Secret")
4. Choose expiration (recommended: 24 months)
5. Click **"Add"**
6. **IMPORTANT**: Copy the secret value immediately - it won't be shown again!

### Step 4: Note Your Credentials

You'll need these values (save them securely):

- **Application (client) ID**: Found in "Overview" section
- **Directory (tenant) ID**: Found in "Overview" section
- **Client secret value**: From step 3 above

## Obtaining Refresh Token

### Method 1: Using the Helper Script (Recommended)

We've provided a helper script to automate the process:

1. **Run the script**:

   ```bash
   node scripts/get-oauth-token.js
   ```

2. **Follow the prompts**:
   - The script will display an authorization URL
   - Open the URL in your browser
   - Sign in with your Office365 account
   - Grant the requested permissions
   - You'll be redirected to `http://localhost/?code=...`
   - Copy the entire `code` parameter from the URL
   - Paste it back into the script when prompted

3. **Get your tokens**:
   - The script will exchange the authorization code for tokens
   - It will display your `OAUTH_REFRESH_TOKEN`
   - Copy this token to your `.env` file

### Method 2: Manual Process

If you prefer to do it manually:

#### Step 1: Get Authorization Code

1. Construct this URL (replace placeholders):

   ```
   https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize?
   client_id={CLIENT_ID}&
   response_type=code&
   redirect_uri=http://localhost&
   response_mode=query&
   scope=https://outlook.office365.com/SMTP.Send offline_access&
   state=12345
   ```

2. Open the URL in your browser
3. Sign in and grant permissions
4. Copy the `code` parameter from the redirect URL

#### Step 2: Exchange for Tokens

Use curl or any HTTP client:

```bash
curl -X POST "https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id={CLIENT_ID}" \
  -d "client_secret={CLIENT_SECRET}" \
  -d "code={AUTHORIZATION_CODE}" \
  -d "redirect_uri=http://localhost" \
  -d "grant_type=authorization_code" \
  -d "scope=https://outlook.office365.com/SMTP.Send offline_access"
```

The response will contain:

- `access_token`: Short-lived (expires in ~1 hour)
- `refresh_token`: Long-lived (use this in your `.env`)

## Environment Configuration

### Development (.env)

Add these variables to your `.env` file:

```env
# Office365 OAuth2 Configuration
OAUTH_CLIENT_ID="your-client-id-here"
OAUTH_CLIENT_SECRET="your-client-secret-here"
OAUTH_TENANT_ID="your-tenant-id-here"
OAUTH_USER="your-email@example.com"
OAUTH_REFRESH_TOKEN="your-refresh-token-here"

# Optional: If you want to specify a custom redirect URI
# OAUTH_REDIRECT_URI="http://localhost"

# SMTP Configuration
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_DEFAULT_USER="your-email@example.com"
SMTP_DEFAULT_NAME="Your Name"
```

### Production (elanto.nl)

**Yes, you can use the same OAuth variables in production!** The same credentials work for both development and production.

**Important Notes:**

1. **Same Credentials**: You can use the exact same `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_TENANT_ID`, and `OAUTH_REFRESH_TOKEN` in production
2. **Redirect URI**: The redirect URI (`http://localhost`) is only needed when initially obtaining the refresh token. Once you have the refresh token, you don't need to change it for production
3. **Azure Configuration**: If you want to be able to refresh tokens from production in the future, add your production domain as a redirect URI in Azure:
   - Go to Azure Portal → App Registrations → Your App → Authentication
   - Add: `https://elanto.nl` (or `https://elanto.nl/auth/callback` if you have a callback route)
   - This is optional - only needed if you need to re-authenticate from production

**Production Environment Variables:**

```env
# Same OAuth credentials as development
OAUTH_CLIENT_ID="your-client-id-here"
OAUTH_CLIENT_SECRET="your-client-secret-here"
OAUTH_TENANT_ID="your-tenant-id-here"
OAUTH_USER="info@elanto.nl"
OAUTH_REFRESH_TOKEN="your-refresh-token-here"

# Production SMTP settings
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_DEFAULT_USER="info@elanto.nl"
SMTP_DEFAULT_NAME="Elanto BV"
```

**Why the same credentials work:**

- The refresh token is not tied to a specific redirect URI
- Once obtained, it can be used from any environment
- The redirect URI is only used during the initial OAuth authorization flow
- For SMTP sending, the refresh token is used server-side to get access tokens - no redirect needed

### Environment Variables Explained

| Variable              | Required | Description                                     |
| --------------------- | -------- | ----------------------------------------------- |
| `OAUTH_CLIENT_ID`     | Yes      | Application (client) ID from Azure              |
| `OAUTH_CLIENT_SECRET` | Yes      | Client secret value from Azure                  |
| `OAUTH_TENANT_ID`     | Yes      | Directory (tenant) ID from Azure                |
| `OAUTH_USER`          | Yes      | Office365 email address for sending             |
| `OAUTH_REFRESH_TOKEN` | Yes      | Refresh token obtained from OAuth flow          |
| `OAUTH_REDIRECT_URI`  | No       | Redirect URI (defaults to `http://localhost`)   |
| `SMTP_HOST`           | No       | SMTP server (defaults to `smtp.office365.com`)  |
| `SMTP_PORT`           | No       | SMTP port (defaults to `587`)                   |
| `SMTP_SECURE`         | No       | Use SSL (`true`) or STARTTLS (`false`, default) |

## How It Works

### Authentication Flow

1. **Initial Setup**: You obtain a refresh token using the OAuth2 authorization flow
2. **Token Storage**: The refresh token is stored in your `.env` file
3. **Automatic Token Refresh**: When sending emails:
   - The application checks if an access token exists and is valid
   - If not, it uses the refresh token to obtain a new access token
   - The access token is used to authenticate SMTP connections
4. **Email Sending**: Emails are sent using the authenticated SMTP connection

### Code Implementation

The application automatically detects OAuth2 configuration:

- If `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` are present → Uses OAuth2
- Otherwise → Falls back to basic SMTP authentication

The configuration is in `src/payload.config.ts`:

```typescript
auth: process.env.OAUTH_CLIENT_ID && process.env.OAUTH_CLIENT_SECRET
  ? {
      type: "OAuth2",
      user: process.env.OAUTH_USER || process.env.SMTP_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessUrl: `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/token`,
    }
  : {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };
```

## Troubleshooting

### Error: "535 5.7.139 SmtpClientAuthentication is disabled for the Tenant"

**Problem**: SMTP authentication is disabled at the tenant level in Office365/Exchange Online. This is the most common issue preventing OAuth2 from working.

**Solution**: Enable SMTP AUTH for your tenant using Exchange Online PowerShell:

#### Option 1: Enable for Entire Tenant (Recommended)

1. **Connect to Exchange Online PowerShell** (requires Exchange Admin role):

   ```powershell
   Install-Module -Name ExchangeOnlineManagement
   Connect-ExchangeOnline
   ```

2. **Enable SMTP AUTH for the tenant**:

   ```powershell
   Set-TransportConfig -SmtpClientAuthenticationDisabled $false
   ```

3. **Verify the setting**:
   ```powershell
   Get-TransportConfig | Select SmtpClientAuthenticationDisabled
   ```
   Should return: `SmtpClientAuthenticationDisabled : False`

#### Option 2: Enable for Specific Mailbox Only

If you only want to enable it for a specific user:

```powershell
Connect-ExchangeOnline
Set-CASMailbox -Identity "info@elanto.nl" -SmtpClientAuthenticationDisabled $false
```

#### Option 3: Using Microsoft 365 Admin Center (Alternative)

1. Go to [Microsoft 365 Admin Center](https://admin.microsoft.com)
2. Navigate to **Settings** → **Org settings** → **Modern authentication**
3. Look for SMTP AUTH settings (may vary by tenant)
4. Enable SMTP AUTH if available

**Important Notes**:

- This requires **Exchange Administrator** or **Global Administrator** permissions
- Changes may take a few minutes to propagate
- Some tenants may have this disabled by security policy - check with your IT admin
- After enabling, wait 5-10 minutes before testing again

**Reference**: [Microsoft Documentation](https://aka.ms/smtp_auth_disabled)

### Error: "AADSTS500113: No reply address is registered"

**Problem**: The redirect URI `http://localhost` is not registered in Azure.

**Solution**:

1. Go to Azure Portal → App Registrations → Your App → Authentication
2. Click "Add a platform" → Select "Web"
3. Add redirect URI: `http://localhost`
4. Click "Configure"

### Error: "Invalid client secret"

**Problem**: The client secret is incorrect or has expired.

**Solution**:

1. Check if the secret has expired in Azure Portal
2. Create a new client secret if needed
3. Update `OAUTH_CLIENT_SECRET` in your `.env` file

### Error: "Insufficient privileges" or "Access denied"

**Problem**: Missing or unconsented API permissions.

**Solution**:

1. Go to Azure Portal → App Registrations → Your App → API permissions
2. Ensure these permissions are added:
   - `https://outlook.office365.com/SMTP.Send` (Delegated)
   - `offline_access` (Delegated)
3. Click "Grant admin consent" for your organization

### Error: "Refresh token expired" or "Invalid refresh token"

**Problem**: The refresh token has been revoked or expired.

**Solution**:

1. Re-run the OAuth flow to obtain a new refresh token
2. Update `OAUTH_REFRESH_TOKEN` in your `.env` file

### Error: "535 5.7.139" or "SmtpClientAuthentication is disabled"

**Problem**: This is the most common error - SMTP authentication is disabled at the tenant level.

**Solution**: See the detailed solution above in the troubleshooting section. You must enable SMTP AUTH using Exchange Online PowerShell.

### Emails not sending

**Problem**: Various possible causes.

**Solution Checklist**:

1. ✅ **CRITICAL**: Verify SMTP AUTH is enabled for your tenant (see error above)
2. ✅ Verify all OAuth environment variables are set correctly
3. ✅ Check that the refresh token is valid (re-obtain if needed)
4. ✅ Ensure API permissions are granted with admin consent
5. ✅ Verify `OAUTH_USER` matches the account that granted permissions
6. ✅ Check application logs for specific error messages
7. ✅ Test with the helper script to verify token exchange works

### Authorization code expired

**Problem**: Authorization codes expire quickly (usually within 10 minutes).

**Solution**: Re-run the authorization flow to get a new code.

## Production Deployment

### Using Same Credentials for Production

**Yes, you can use the same OAuth credentials for both development and production!**

The OAuth credentials (`OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_TENANT_ID`, `OAUTH_REFRESH_TOKEN`) are not environment-specific. Once you obtain a refresh token, you can use it in any environment.

**What to do:**

1. **Use the same variables**: Copy your OAuth environment variables from development to production
2. **Optional - Add production redirect URI**: If you want to be able to refresh tokens from production in the future:
   - Add `https://elanto.nl` (or your production domain) as a redirect URI in Azure
   - This is only needed if you need to re-authenticate from production
   - For normal email sending, this is not required

**Example Production Setup (Vercel/Environment Variables):**

```
OAUTH_CLIENT_ID=6aecdca1-7bcb-40e3-8a22-0dd9433097b3
OAUTH_CLIENT_SECRET=Fr08Q~HGv.wmbQsFHTAPAWjtJmYgTqkADiLpzbY0
OAUTH_TENANT_ID=d42162c8-0cd0-499f-966a-b8451be046b5
OAUTH_USER=info@elanto.nl
OAUTH_REFRESH_TOKEN=<your-refresh-token>
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_DEFAULT_USER=info@elanto.nl
SMTP_DEFAULT_NAME=Elanto BV
```

**Important**: The redirect URI (`http://localhost`) is only used during the initial token acquisition. For sending emails, the refresh token works from any environment without needing a redirect URI.

## Security Best Practices

1. **Never commit `.env` file**: Keep it in `.gitignore`
2. **Rotate secrets regularly**: Update client secrets periodically
3. **Use same credentials across environments**: OAuth credentials can be shared between dev/staging/production (refresh tokens are not environment-specific)
4. **Limit permissions**: Only grant necessary API permissions
5. **Monitor usage**: Check Azure logs for suspicious activity
6. **Secure storage**: Use secret management services in production (e.g., Azure Key Vault, Vercel Environment Variables)
7. **Production secrets**: Store production secrets in your hosting platform's environment variables (not in code)

## Additional Resources

- [Microsoft OAuth2 Documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
- [Office365 SMTP OAuth Guide](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth)
- [Azure App Registration Guide](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## Support

If you encounter issues not covered in this guide:

1. Check the application logs for detailed error messages
2. Review Azure Portal → App Registrations → Your App → Logs
3. Verify all environment variables are correctly set
4. Test the OAuth flow manually using the helper script

---

**Last Updated**: January 2025
