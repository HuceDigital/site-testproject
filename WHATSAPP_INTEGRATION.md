# WhatsApp Integration

This website now includes comprehensive WhatsApp integration to improve customer communication and engagement.

## Features

### 1. Floating WhatsApp Button

- Appears on all pages after 3 seconds
- Fixed position in bottom-right corner
- Animated with pulse effect
- Hover tooltip for better UX
- Opens WhatsApp with pre-filled message

### 2. Contact Form Integration

- WhatsApp button in contact forms (both traditional and Google Maps integrated)
- Appears in form success messages
- Pre-filled with contextual messages

### 3. Footer Integration

- WhatsApp link in footer contact section
- Consistent with other contact methods

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```bash
# WhatsApp Business Number (include country code, no spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=+31612345678
```

### Customization

#### Phone Number

The WhatsApp number is configured via the `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable. If not set, it defaults to `+31612345678`.

#### Messages

Default messages can be customized in the component files:

- Floating button: `src/components/WhatsApp/WhatsAppConfig.tsx`
- Contact forms: `src/blocks/Form/Component.tsx` and `src/blocks/Form/IntergratedMaps.tsx`
- Footer: `src/Footer/Component.tsx`

#### Styling

All WhatsApp components use Tailwind CSS classes and can be customized by modifying the `className` props.

## Components

### WhatsAppButton

- `src/components/WhatsApp/WhatsAppButton.tsx`
- Main floating button component
- Configurable phone number and message

### WhatsAppContact

- `src/components/WhatsApp/WhatsAppContact.tsx`
- Reusable contact component
- Multiple variants: button, link, icon

### WhatsAppConfig

- `src/components/WhatsApp/WhatsAppConfig.tsx`
- Configuration wrapper
- Handles environment variables

## Usage

The WhatsApp integration is automatically included in:

- Main layout (floating button)
- Contact forms (success messages and contact info)
- Footer (contact section)

No additional setup is required beyond setting the environment variable.

## Testing

1. Set your WhatsApp number in `.env.local`
2. Start the development server
3. Navigate to any page to see the floating button
4. Test contact forms to see WhatsApp integration
5. Check footer for WhatsApp link

## Browser Support

- Works on all modern browsers
- Mobile-optimized
- Opens WhatsApp app on mobile devices
- Opens WhatsApp Web on desktop
