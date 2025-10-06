import { NextRequest, NextResponse } from "next/server";
import { getHeaderSettings, setHeaderSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getHeaderSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get header settings:", error);
    return NextResponse.json(
      { error: "Failed to get header settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setHeaderSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update header settings:", error);
    return NextResponse.json(
      { error: "Failed to update header settings" },
      { status: 500 }
    );
  }
}