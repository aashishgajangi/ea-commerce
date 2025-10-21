import { NextRequest, NextResponse } from "next/server";
import { getPWASettings, setPWASettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getPWASettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get PWA settings:", error);
    return NextResponse.json(
      { error: "Failed to get PWA settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setPWASettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update PWA settings:", error);
    return NextResponse.json(
      { error: "Failed to update PWA settings" },
      { status: 500 }
    );
  }
}
