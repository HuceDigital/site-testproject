import { getCachedGlobal } from "@/utilities/getGlobals";
import type { Media, WhatsappSetting } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";

export async function getWhatsAppSettings() {
  try {
    const settings = (await getCachedGlobal(
      "whatsappSettings",
      1
    )()) as WhatsappSetting;
    // Extract the URL from the avatarImage media if it exists
    let avatarImageUrl: string | null = null;
    if (
      settings.popupSettings?.avatarImage &&
      typeof settings.popupSettings.avatarImage === "object" &&
      settings.popupSettings.avatarImage !== null
    ) {
      const media = settings.popupSettings.avatarImage as Media;
      if (media.url) {
        const serverUrl = getServerSideURL();
        avatarImageUrl = `${serverUrl}${media.url}`;
      }
    }

    return {
      enabled: settings.enabled ?? true,
      phoneNumber:
        settings.phoneNumber ||
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
        "+31612345678",
      popupSettings: {
        enabled: settings.popupSettings?.enabled ?? true,
        delay: settings.popupSettings?.delay ?? 3,
        disableOnMobile: settings.popupSettings?.disableOnMobile ?? false,
        senderName: settings.popupSettings?.senderName || "Pierre",
        companyName: settings.popupSettings?.companyName || "van Huce Digital",
        greeting: settings.popupSettings?.greeting || "Goedenavond",
        message:
          settings.popupSettings?.message ||
          "Heb je een vraag? Ik help je graag verder via:",
        avatarImage: avatarImageUrl,
      },
      buttonSettings: {
        message:
          settings.buttonSettings?.message ||
          "Hallo! Ik heb een vraag over jullie schilderdiensten.",
      },
    };
  } catch (error) {
    console.error("Error fetching WhatsApp settings:", error);
    // Return default settings if fetch fails
    return {
      enabled: true,
      phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+31612345678",
      popupSettings: {
        enabled: true,
        delay: 3,
        disableOnMobile: false,
        senderName: "Pierre",
        companyName: "van Huce Digital",
        greeting: "Goedenavond",
        message: "Heb je een vraag? Ik help je graag verder via:",
        avatarImage: null,
      },
      buttonSettings: {
        message: "Hallo! Ik heb een vraag over jullie schilderdiensten.",
      },
    };
  }
}
