import { NextRequest, NextResponse } from "next/server";
import { getSocialSettings, setSocialSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getSocialSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get social settings:", error);
    return NextResponse.json(
      { error: "Failed to get social settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setSocialSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update social settings:", error);
    return NextResponse.json(
      { error: "Failed to update social settings" },
      { status: 500 }
    );
  }
}