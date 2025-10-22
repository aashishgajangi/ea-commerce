import { NextResponse } from "next/server";
import { getPWASettings } from "@/lib/settings";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getPWASettings();
    
    // Only return public-safe settings
    return NextResponse.json({
      enabled: settings.enabled,
      appName: settings.appName,
      themeColor: settings.themeColor,
      installPromptEnabled: settings.installPromptEnabled,
      installPromptDelay: settings.installPromptDelay,
      enableOfflineMode: settings.enableOfflineMode, // REQUIRED for service worker registration
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60', // Reduced cache for faster updates
      },
    });
  } catch (error) {
    console.error("Failed to get PWA settings:", error);
    return NextResponse.json(
      { error: "Failed to get PWA settings" },
      { status: 500 }
    );
  }
}
