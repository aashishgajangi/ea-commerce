import { NextResponse } from "next/server";
import { config, ConfigKeys } from "@/lib/config";
import {
  getAppearanceSettings,
  getSocialSettings,
  getHeaderSettings,
  getFooterSettings,
} from "@/lib/settings";

/**
 * GET /api/admin/settings
 * Get all settings (general from Configuration, others from SiteSettings)
 */
export async function GET() {
  try {
    // Get general settings from Configuration table (setup wizard data)
    const [siteName, description, currency, timezone, language, tagline] = await Promise.all([
      config.get(ConfigKeys.SITE_NAME),
      config.get(ConfigKeys.SITE_DESCRIPTION),
      config.get(ConfigKeys.CURRENCY),
      config.get("timezone"),
      config.get("language"),
      config.get("tagline"),
    ]);

    // Get other settings from SiteSettings table
    const [appearance, social, header, footer] = await Promise.all([
      getAppearanceSettings(),
      getSocialSettings(),
      getHeaderSettings(),
      getFooterSettings(),
    ]);

    return NextResponse.json({
      general: {
        siteName: siteName || "My Store",
        tagline: tagline || "",
        description: description || "",
        timezone: timezone || "UTC",
        currency: currency || "USD",
        language: language || "en",
      },
      appearance,
      social,
      header,
      footer,
    });
  } catch (error) {
    console.error("Failed to get settings:", error);
    return NextResponse.json(
      { error: "Failed to get settings" },
      { status: 500 }
    );
  }
}