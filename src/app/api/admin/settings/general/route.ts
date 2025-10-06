import { NextRequest, NextResponse } from "next/server";
import { config, ConfigKeys } from "@/lib/config";

/**
 * GET /api/admin/settings/general
 * Get general settings from Configuration table (same as setup wizard)
 */
export async function GET() {
  try {
    const [siteName, description, currency, timezone, language, tagline] = await Promise.all([
      config.get(ConfigKeys.SITE_NAME),
      config.get(ConfigKeys.SITE_DESCRIPTION),
      config.get(ConfigKeys.CURRENCY),
      config.get("timezone"),
      config.get("language"),
      config.get("tagline"),
    ]);

    return NextResponse.json({
      siteName: siteName || "My Store",
      tagline: tagline || "",
      description: description || "",
      timezone: timezone || "UTC",
      currency: currency || "USD",
      language: language || "en",
    });
  } catch (error) {
    console.error("Failed to get general settings:", error);
    return NextResponse.json(
      { error: "Failed to get general settings" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/settings/general
 * Update general settings in Configuration table (synced with setup wizard)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteName, description, timezone, currency, language, tagline } = body;

    // Update Configuration table (same as setup wizard)
    await config.setMany({
      [ConfigKeys.SITE_NAME]: siteName || "My Store",
      [ConfigKeys.SITE_DESCRIPTION]: description || "",
      [ConfigKeys.CURRENCY]: currency || "USD",
      timezone: timezone || "UTC",
      language: language || "en",
      tagline: tagline || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update general settings:", error);
    return NextResponse.json(
      { error: "Failed to update general settings" },
      { status: 500 }
    );
  }
}