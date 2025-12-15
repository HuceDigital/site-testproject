# WhatsApp Popup Feature

## Overview

This feature adds a configurable WhatsApp popup that appears on your website, similar to the chat popup shown in your screenshot. The popup is fully manageable through Payload CMS and includes enable/disable functionality.

## Features

### 🎯 Popup Functionality

- **Configurable Content**: Sender name, company name, greeting, and message
- **Timing Control**: Configurable delay before popup appears
- **Auto-close**: Popup automatically closes after 10 seconds
- **Manual Close**: Users can close the popup manually
- **WhatsApp Integration**: Direct link to WhatsApp with pre-filled message

### 🎨 Design

- **Modern UI**: Clean, chat-like interface matching your screenshot
- **Responsive**: Works on all device sizes
- **Animations**: Smooth slide-in animation with fade effects
- **Avatar**: Circular avatar with WhatsApp icon
- **Action Buttons**: WhatsApp button and "Later" option

### ⚙️ Configuration Options

#### Main Settings

- **Enable/Disable**: Turn the entire WhatsApp integration on/off
- **Phone Number**: WhatsApp business number with country code

#### Popup Settings

- **Enable Popup**: Show/hide the popup feature
- **Delay**: How many seconds to wait before showing (0-30 seconds)
- **Sender Name**: Name shown in the popup (e.g., "Pierre")
- **Company Name**: Company name (e.g., "van Huce Digital")
- **Greeting**: Greeting message (e.g., "Goedenavond")
- **Message**: Main popup message

#### Button Settings

- **Default Message**: Message sent when clicking the floating button

## Admin Interface

### Accessing Settings

1. Go to your Payload admin panel
2. Navigate to "Globals" → "WhatsApp Settings"
3. Configure all settings as needed

### Settings Sections

#### Main Configuration

- **Enable WhatsApp Integration**: Master switch for all WhatsApp features
- **WhatsApp Phone Number**: Your business WhatsApp number

#### Popup Configuration

- **Enable Popup**: Toggle the popup feature
- **Popup Delay**: Time delay before popup appears (in seconds)
- **Sender Name**: Name displayed in the popup
- **Company Name**: Company name in the popup
- **Greeting**: Greeting message (e.g., "Goedenavond")
- **Popup Message**: Main message content

#### Button Configuration

- **Default WhatsApp Message**: Message sent when clicking the floating button

## Technical Implementation

### Components Created

- `WhatsAppPopup.tsx` - The popup component
- `WhatsAppWithPopup.tsx` - Main component with popup integration
- `useWhatsAppSettings.ts` - Hook for fetching settings
- `WhatsAppSettings.ts` - Payload global configuration

### API Endpoints

- `/api/whatsapp-settings` - Fetches WhatsApp settings from Payload

### Database

- New global collection: `whatsappSettings`
- Seeded with default values
- Fully configurable through Payload admin

## Usage Examples

### Default Configuration

```typescript
{
  enabled: true,
  phoneNumber: "+31612345678",
  popupSettings: {
    enabled: true,
    delay: 3,
    senderName: "Pierre",
    companyName: "van Huce Digital",
    greeting: "Goedenavond",
    message: "Heb je een vraag? Ik help je graag verder via:",
  },
  buttonSettings: {
    message: "Hallo! Ik heb een vraag over jullie schilderdiensten.",
  }
}
```

### Customizing the Popup

1. **Change Sender Info**: Update "Sender Name" and "Company Name" in admin
2. **Modify Messages**: Edit "Greeting" and "Popup Message" fields
3. **Adjust Timing**: Set "Popup Delay" to control when popup appears
4. **Disable Popup**: Uncheck "Enable Popup" to hide the popup

## Browser Support

- ✅ All modern browsers
- ✅ Mobile devices (opens WhatsApp app)
- ✅ Desktop (opens WhatsApp Web)
- ✅ Responsive design

## Customization

### Styling

The popup uses Tailwind CSS classes and can be customized by modifying the component files:

- `src/components/WhatsApp/WhatsAppPopup.tsx` - Main popup styling
- `src/components/WhatsApp/WhatsAppButton.tsx` - Floating button styling

### Behavior

- **Auto-close timing**: Modify the 10-second timeout in `WhatsAppPopup.tsx`
- **Animation duration**: Adjust transition classes
- **Popup positioning**: Change the `bottom-24 right-6` classes

## Testing

### Manual Testing

1. **Enable Popup**: Set "Enable Popup" to true in admin
2. **Set Delay**: Configure delay (e.g., 3 seconds)
3. **Visit Website**: Navigate to any page
4. **Wait**: Popup should appear after the specified delay
5. **Test Actions**: Click WhatsApp button or "Later" button

### Configuration Testing

1. **Disable Popup**: Set "Enable Popup" to false - popup should not appear
2. **Change Content**: Modify sender name, message, etc.
3. **Adjust Timing**: Test different delay values
4. **Disable Integration**: Turn off entire WhatsApp integration

## Troubleshooting

### Popup Not Appearing

- Check if "Enable WhatsApp Integration" is true
- Verify "Enable Popup" is enabled
- Check browser console for errors
- Ensure phone number is properly configured

### Settings Not Updating

- Clear browser cache
- Check if changes are saved in Payload admin
- Verify API endpoint is working: `/api/whatsapp-settings`

### Styling Issues

- Check Tailwind CSS classes
- Verify responsive breakpoints
- Test on different screen sizes

## Future Enhancements

### Potential Features

- **Multiple Languages**: Support for different languages
- **Time-based Display**: Show popup only during business hours
- **User Preferences**: Remember if user dismissed popup
- **Analytics**: Track popup interactions
- **Custom Avatars**: Upload custom avatar images
- **Multiple Popups**: Different popups for different pages

### Integration Ideas

- **CRM Integration**: Connect with customer management systems
- **A/B Testing**: Test different popup variations
- **Personalization**: Show different content based on user behavior
- **Scheduling**: Set specific times for popup display
