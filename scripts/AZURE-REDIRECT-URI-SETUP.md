# How to Add Redirect URI in Azure Portal

## Quick Steps

1. **Go to Azure Portal**
   - Visit: https://portal.azure.com
   - Sign in with your admin account

2. **Navigate to App Registrations**
   - Click on **"Azure Active Directory"** (or search for it)
   - In the left menu, click **"App registrations"**
   - Find your application (search by Client ID if needed)

3. **Add Redirect URI**
   - Click on your application
   - In the left menu, click **"Authentication"**
   - Under **"Redirect URIs"**, click **"Add a platform"**
   - Select **"Web"**
   - In the **"Redirect URIs"** field, add: `http://localhost`
   - Click **"Configure"** to save

4. **Verify**
   - You should now see `http://localhost` listed under "Redirect URIs"
   - Make sure it's saved (you may need to click "Save" at the top)

## Visual Guide

```
Azure Portal
  └─ Azure Active Directory
      └─ App registrations
          └─ [Your App Name]
              └─ Authentication (left menu)
                  └─ Redirect URIs section
                      └─ Add a platform
                          └─ Web
                              └─ Redirect URIs: http://localhost
                                  └─ Configure
```

## Alternative: Use Existing Redirect URI

If you already have a redirect URI configured in Azure (like `https://yourdomain.com/callback`), you can:

1. Check what redirect URIs are already configured in Azure
2. Use one of those in the script instead of `http://localhost`
3. When the script asks, enter your existing redirect URI

## Common Redirect URIs

- `http://localhost` (for local development)
- `http://localhost:3000` (if using a specific port)
- `https://yourdomain.com/auth/callback` (for production)
- `https://outlook.office365.com/` (sometimes used for Office365)

**Important**: The redirect URI in the script MUST exactly match one of the redirect URIs configured in Azure (case-sensitive, must include protocol).

