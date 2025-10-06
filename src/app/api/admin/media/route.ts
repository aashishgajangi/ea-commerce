import { NextRequest, NextResponse } from "next/server";
import { uploadFile, listMedia } from "@/lib/media";

/**
 * GET /api/admin/media
 * List all media with pagination and search
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || undefined;
    const mimeType = searchParams.get("type") || undefined;

    const result = await listMedia({
      page,
      limit,
      search,
      mimeType,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to list media:", error);
    return NextResponse.json(
      { error: "Failed to list media" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/media
 * Upload new media file
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // TODO: Get userId from session once auth is implemented
    // For now, we'll use null
    const userId = null;

    const result = await uploadFile(file, userId || undefined);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to upload file:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}