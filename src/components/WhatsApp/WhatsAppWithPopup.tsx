"use client";

import React, { useState, useEffect } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { WhatsAppPopup } from "./WhatsAppPopup";
import { cleanPhoneNumber } from "@/utilities/cleanPhoneNumber";

interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  popupSettings: {
    enabled: boolean;
    delay: number;
    disableOnMobile: boolean;
    senderName: string;
    companyName: string;
    greeting: string;
    message: string;
    avatarImage?: string | null;
  };
  buttonSettings: {
    message: string;
  };
}

interface WhatsAppWithPopupProps {
  settings: WhatsAppSettings;
}

export const WhatsAppWithPopup: React.FC<WhatsAppWithPopupProps> = ({
  settings,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const finalSettings = settings;

  // Check for mobile device on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initial state
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (
      !finalSettings.enabled ||
      !finalSettings.popupSettings.enabled ||
      popupShown
    ) {
      return;
    }

    // Check if popup should be disabled on mobile
    const shouldDisableOnMobile = finalSettings.popupSettings.disableOnMobile;
    if (shouldDisableOnMobile && isMobile) {
      return;
    }

    const timer = setTimeout(() => {
      setShowPopup(true);
      setPopupShown(true);
    }, finalSettings.popupSettings.delay * 1000);

    return () => clearTimeout(timer);
  }, [
    finalSettings.enabled,
    finalSettings.popupSettings.enabled,
    finalSettings.popupSettings.disableOnMobile,
    finalSettings.popupSettings.delay,
    popupShown,
    isMobile,
  ]);

  const handleWhatsAppClick = () => {
    const clean = cleanPhoneNumber(finalSettings.phoneNumber);
    const encodedMessage = encodeURIComponent(
      `${finalSettings.popupSettings.greeting}! ${finalSettings.popupSettings.message}`
    );
    const whatsappUrl = `https://wa.me/${clean}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!finalSettings.enabled) {
    return null;
  }

  return (
    <>
      <WhatsAppButton
        phoneNumber={finalSettings.phoneNumber}
        message={finalSettings.buttonSettings.message}
      />

      {finalSettings.popupSettings.enabled &&
        !(finalSettings.popupSettings.disableOnMobile && isMobile) && (
          <WhatsAppPopup
            isVisible={showPopup}
            onClose={handleClosePopup}
            senderName={finalSettings.popupSettings.senderName}
            companyName={finalSettings.popupSettings.companyName}
            greeting={finalSettings.popupSettings.greeting}
            message={finalSettings.popupSettings.message}
            phoneNumber={finalSettings.phoneNumber}
            onWhatsAppClick={handleWhatsAppClick}
            avatarImage={finalSettings.popupSettings.avatarImage}
          />
        )}
    </>
  );
};

export default WhatsAppWithPopup;
