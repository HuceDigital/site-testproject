"use client";

import React from "react";
import { WhatsAppButton } from "./WhatsAppButton";

interface WhatsAppConfigProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppConfig: React.FC<WhatsAppConfigProps> = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+31612345678",
  message = "Hallo! Ik heb een vraag over jullie schilderdiensten.",
}) => {
  // Don't render if no phone number is provided
  if (!phoneNumber) return null;

  return <WhatsAppButton phoneNumber={phoneNumber} message={message} />;
};

export default WhatsAppConfig;
