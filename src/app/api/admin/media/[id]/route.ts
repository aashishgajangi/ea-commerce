import { NextRequest, NextResponse } from "next/server";
import { getMediaById, updateMediaMetadata, deleteFile } from "@/lib/media";

/**
 * GET /api/admin/media/[id]
 * Get media by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const media = await getMediaById(id);

    if (!media) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error("Failed to get media:", error);
    return NextResponse.json(
      { error: "Failed to get media" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/media/[id]
 * Update media metadata (alt text, title)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { alt, title, originalName } = body;

    const media = await updateMediaMetadata(id, {
      alt,
      title,
      originalName,
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Failed to update media:", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/media/[id]
 * Delete media file
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteFile(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete media:", error);
    
    if (error instanceof Error && error.message === "Media not found") {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}