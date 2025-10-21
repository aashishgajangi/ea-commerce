import { NextRequest, NextResponse } from "next/server";
import { getWhatsAppSettings, setWhatsAppSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getWhatsAppSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to get WhatsApp settings:", error);
    return NextResponse.json(
      { error: "Failed to get WhatsApp settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await setWhatsAppSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update WhatsApp settings:", error);
    return NextResponse.json(
      { error: "Failed to update WhatsApp settings" },
      { status: 500 }
    );
  }
}
