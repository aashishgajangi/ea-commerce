import { NextResponse } from "next/server";
import { getWhatsAppSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getWhatsAppSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch WhatsApp settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch WhatsApp settings" },
      { status: 500 }
    );
  }
}
