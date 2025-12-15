"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppPopupProps {
  isVisible: boolean;
  onClose: () => void;
  senderName: string;
  companyName: string;
  greeting: string;
  message: string;
  phoneNumber: string;
  onWhatsAppClick: () => void;
  avatarImage?: string | null;
}

export const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({
  isVisible,
  onClose,
  senderName,
  companyName,
  greeting,
  message,
  phoneNumber,
  onWhatsAppClick,
  avatarImage,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-close after 10 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-sm">
      <div
        className={`transform transition-all duration-300 ${
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-3 w-3" />
        </button>

        {/* Popup content */}
        <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header with avatar and sender info */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={`${senderName} ${companyName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {senderName}
                </span>
                <span className="text-gray-600 text-sm">{companyName}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Online nu</div>
            </div>
          </div>

          {/* Message content */}
          <div className="p-4">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {senderName.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-3">
                  <p className="text-sm text-gray-800 mb-2">{greeting} 👋</p>
                  <p className="text-sm text-gray-700">{message}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={onWhatsAppClick}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
