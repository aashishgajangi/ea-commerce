import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    
    // Clear Next.js cache for all pages with headers
    revalidatePath("/", "layout"); // Revalidate all pages
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update header settings:", error);
    return NextResponse.json(
      { error: "Failed to update header settings" },
      { status: 500 }
    );
  }
}