import { NextRequest, NextResponse } from "next/server";
import { getThemeSettings, setThemeSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getThemeSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get theme settings:", error);
    return NextResponse.json(
      { error: "Failed to get theme settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setThemeSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update theme settings:", error);
    return NextResponse.json(
      { error: "Failed to update theme settings" },
      { status: 500 }
    );
  }
}