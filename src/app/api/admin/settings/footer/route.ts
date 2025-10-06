import { NextRequest, NextResponse } from "next/server";
import { getFooterSettings, setFooterSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getFooterSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get footer settings:", error);
    return NextResponse.json(
      { error: "Failed to get footer settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setFooterSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update footer settings:", error);
    return NextResponse.json(
      { error: "Failed to update footer settings" },
      { status: 500 }
    );
  }
}