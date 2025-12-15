# Getting Office365 OAuth2 Refresh Token

This guide will help you obtain a refresh token for Office365 SMTP OAuth2 authentication.

## Prerequisites

1. You already have:
   - `OAUTH_CLIENT_ID` (from Azure App Registration)
   - `OAUTH_CLIENT_SECRET` (from Azure App Registration)
   - `OAUTH_TENANT_ID` (your Azure tenant ID)
   - `OAUTH_USER` (your Office365 email address)

2. Make sure your Azure App Registration has:
   - **Redirect URI**: `http://localhost` (or update the script if you use a different one)
   - **API Permissions**: 
     - `https://outlook.office365.com/SMTP.Send` (Delegated)
     - `offline_access` (for refresh token)
   - **Admin consent** granted for these permissions

## Method 1: Using the Helper Script (Recommended)

1. Run the script:
   ```bash
   node scripts/get-oauth-token.js
   ```

2. The script will:
   - Display an authorization URL
   - Ask you to open it in your browser
   - You'll sign in with your Office365 account
   - Grant permissions
   - Copy the authorization code from the redirect URL
   - Paste it back into the script
   - The script will exchange it for a refresh token

3. Add the refresh token to your `.env` file:
   ```env
   OAUTH_REFRESH_TOKEN="your_refresh_token_here"
   ```

## Method 2: Manual Process

### Step 1: Get Authorization Code

1. Construct this URL (replace values with your own):
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
3. Sign in with your Office365 account
4. Grant the requested permissions
5. You'll be redirected to `http://localhost/?code=...&state=12345`
6. Copy the `code` parameter value

### Step 2: Exchange Code for Tokens

Use curl, Postman, or any HTTP client:

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

Replace:
- `{TENANT_ID}` with your `OAUTH_TENANT_ID`
- `{CLIENT_ID}` with your `OAUTH_CLIENT_ID`
- `{CLIENT_SECRET}` with your `OAUTH_CLIENT_SECRET`
- `{AUTHORIZATION_CODE}` with the code from Step 1

### Step 3: Extract Refresh Token

The response will look like:
```json
{
  "access_token": "eyJ0eXAi...",
  "refresh_token": "0.AX...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

Copy the `refresh_token` value and add it to your `.env`:
```env
OAUTH_REFRESH_TOKEN="0.AX..."
```

## Troubleshooting

### "Invalid redirect URI" error
- Make sure `http://localhost` is added as a redirect URI in your Azure App Registration
- Or update the redirect URI in the script to match what's configured in Azure

### "Insufficient privileges" error
- Make sure you've granted admin consent for the API permissions
- Check that `SMTP.Send` and `offline_access` are both added

### "Invalid client secret" error
- Verify your `OAUTH_CLIENT_SECRET` is correct
- Client secrets expire - you may need to create a new one in Azure

### Refresh token not in response
- Make sure you included `offline_access` in the scope
- Verify the app registration has the correct permissions

## Important Notes

- **Refresh tokens are long-lived** - you typically only need to get one once
- **Access tokens expire** (usually in 1 hour) - the refresh token is used to get new ones automatically
- **Keep refresh tokens secure** - treat them like passwords
- If your refresh token expires or is revoked, you'll need to repeat this process

