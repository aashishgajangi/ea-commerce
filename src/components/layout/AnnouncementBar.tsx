"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  text: string;
  bgColor: string;
  textColor: string;
  link?: string;
  closeable: boolean;
}

export default function AnnouncementBar({
  text,
  bgColor,
  textColor,
  link,
  closeable,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = (
    <div className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium">
      <span>{text}</span>
    </div>
  );

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {link ? (
            <Link href={link} className="flex-1 hover:opacity-80 transition-opacity">
              {content}
            </Link>
          ) : (
            <div className="flex-1">{content}</div>
          )}
          
          {closeable && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
