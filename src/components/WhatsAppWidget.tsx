"use client";

import { useEffect, useState } from "react";
import { WhatsAppSettings } from "@/lib/settings";

// WhatsApp Logo SVG Component
const WhatsAppIcon = ({ color, className }: { color: string; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ color }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function WhatsAppWidget() {
  const [settings, setSettings] = useState<WhatsAppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/whatsapp/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch WhatsApp settings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  if (isLoading || !settings || !settings.enabled || !settings.phoneNumber) {
    return null;
  }

  const handleClick = () => {
    // Remove any non-digit characters from phone number
    const cleanNumber = settings.phoneNumber.replace(/\D/g, '');
    // Encode the message
    const encodedMessage = encodeURIComponent(settings.message);
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  const positionClasses = settings.position === 'bottom-left' 
    ? 'left-4 md:left-6' 
    : 'right-4 md:right-6';

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 md:bottom-6 ${positionClasses} z-[9999] group`}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      {/* Main circle button */}
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        style={{ backgroundColor: settings.backgroundColor }}
      >
        {/* WhatsApp Icon */}
        <WhatsAppIcon 
          color={settings.iconColor}
          className="w-8 h-8 md:w-9 md:h-9"
        />
        
        {/* Pulse animation ring - conditional based on settings */}
        {settings.showAnimation && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: settings.backgroundColor }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        className={`absolute bottom-full mb-2 ${
          settings.position === 'bottom-left' ? 'left-0' : 'right-0'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}
      >
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          Chat with us on WhatsApp
          <div
            className={`absolute top-full ${
              settings.position === 'bottom-left' ? 'left-4' : 'right-4'
            } w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900`}
          />
        </div>
      </div>
    </button>
  );
}
