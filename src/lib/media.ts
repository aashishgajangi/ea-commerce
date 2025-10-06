import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { db as prisma } from "./db";

// Upload directory configuration
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export interface UploadResult {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  width?: number;
  height?: number;
}

/**
 * Ensure upload directory exists
 */
export async function ensureUploadDir(): Promise<void> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const uploadPath = path.join(UPLOAD_DIR, String(year), month);

  if (!existsSync(uploadPath)) {
    await mkdir(uploadPath, { recursive: true });
  }
}

/**
 * Generate unique filename
 */
function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .substring(0, 50);

  return `${sanitizedName}-${timestamp}-${random}${ext}`;
}

/**
 * Get relative upload path for current date
 */
function getUploadPath(): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  return `/uploads/${year}/${month}`;
}

/**
 * Validate file type and size
 */
function validateFile(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }
}

/**
 * Get image dimensions using sharp
 */
async function getImageDimensions(
  buffer: Buffer
): Promise<{ width: number; height: number } | null> {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Optimize image using sharp
 */
async function optimizeImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
  try {
    // Skip optimization for SVG
    if (mimeType === "image/svg+xml") {
      return buffer;
    }

    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Resize if image is too large (max 2000px width)
    if (metadata.width && metadata.width > 2000) {
      image.resize(2000, null, { withoutEnlargement: true });
    }

    // Optimize based on format
    switch (mimeType) {
      case "image/jpeg":
      case "image/jpg":
        return await image.jpeg({ quality: 85, progressive: true }).toBuffer();
      case "image/png":
        return await image.png({ quality: 85, compressionLevel: 9 }).toBuffer();
      case "image/webp":
        return await image.webp({ quality: 85 }).toBuffer();
      default:
        return buffer;
    }
  } catch {
    // If optimization fails, return original
    return buffer;
  }
}

/**
 * Upload file to local storage
 */
export async function uploadFile(
  file: File,
  userId?: string
): Promise<UploadResult> {
  // Validate file
  validateFile(file);

  // Ensure upload directory exists
  await ensureUploadDir();

  // Generate filename and paths
  const filename = generateFilename(file.name);
  const relativePath = getUploadPath();
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const fullPath = path.join(UPLOAD_DIR, String(year), month, filename);

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  let buffer: Buffer = Buffer.from(arrayBuffer);

  // Get image dimensions before optimization
  const dimensions = await getImageDimensions(buffer);

  // Optimize image if it's an image type
  if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
    const optimized = await optimizeImage(buffer, file.type);
    buffer = optimized;
  }

  // Write file to disk
  await writeFile(fullPath, buffer);

  // Save to database
  const media = await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: buffer.length,
      path: `${relativePath}/${filename}`,
      userId: userId || null,
    },
  });

  return {
    id: media.id,
    filename: media.filename,
    originalName: media.originalName,
    mimeType: media.mimeType,
    size: media.size,
    path: media.path,
    url: media.path,
    width: dimensions?.width,
    height: dimensions?.height,
  };
}

/**
 * Delete file from local storage and database
 */
export async function deleteFile(id: string): Promise<void> {
  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  // Delete physical file
  const fullPath = path.join(process.cwd(), "public", media.path);
  if (existsSync(fullPath)) {
    await unlink(fullPath);
  }

  // Delete from database
  await prisma.media.delete({
    where: { id },
  });
}

/**
 * Get media by ID
 */
export async function getMediaById(id: string) {
  return await prisma.media.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

/**
 * List all media with pagination
 */
export async function listMedia(options: {
  page?: number;
  limit?: number;
  search?: string;
  mimeType?: string;
}) {
  const page = options.page || 1;
  const limit = options.limit || 20;
  const skip = (page - 1) * limit;

  interface WhereClause {
    OR?: Array<{
      originalName?: { contains: string; mode: "insensitive" };
      alt?: { contains: string; mode: "insensitive" };
      title?: { contains: string; mode: "insensitive" };
    }>;
    mimeType?: { startsWith: string };
  }

  const where: WhereClause = {};

  if (options.search) {
    where.OR = [
      { originalName: { contains: options.search, mode: "insensitive" } },
      { alt: { contains: options.search, mode: "insensitive" } },
      { title: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options.mimeType) {
    where.mimeType = { startsWith: options.mimeType };
  }

  const [media, total] = await Promise.all([
    prisma.media.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.media.count({ where }),
  ]);

  return {
    media,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Update media metadata
 */
export async function updateMediaMetadata(
  id: string,
  data: {
    alt?: string;
    title?: string;
    originalName?: string;
  }
) {
  return await prisma.media.update({
    where: { id },
    data,
  });
}