"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cleanPhoneNumber } from "@/utilities/cleanPhoneNumber";

interface WhatsAppContactProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "button" | "link" | "icon";
  children?: React.ReactNode;
}

export const WhatsAppContact: React.FC<WhatsAppContactProps> = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+31612345678",
  message = "Hallo! Ik heb een vraag over jullie schilderdiensten.",
  className = "",
  variant = "button",
  children,
}) => {
  const handleClick = () => {
    const clean = cleanPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${clean}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors ${className}`}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    );
  }

  if (variant === "link") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors ${className}`}
      >
        <MessageCircle className="h-4 w-4" />
        {children || "WhatsApp"}
      </button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {children || "WhatsApp"}
    </Button>
  );
};

export default WhatsAppContact;
