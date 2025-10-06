import { NextRequest, NextResponse } from "next/server";
import { getAppearanceSettings, setAppearanceSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getAppearanceSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get appearance settings:", error);
    return NextResponse.json(
      { error: "Failed to get appearance settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setAppearanceSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update appearance settings:", error);
    return NextResponse.json(
      { error: "Failed to update appearance settings" },
      { status: 500 }
    );
  }
}