import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface ImageUploadOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  formats?: ("webp" | "jpeg" | "png")[];
}

interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  size: number;
  format: string;
}

export class ImageUploadService {
  private uploadsDir: string;
  private publicDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), "public", "uploads");
    this.publicDir = "/uploads";
  }

  async ensureUploadDir(): Promise<void> {
    if (!existsSync(this.uploadsDir)) {
      await mkdir(this.uploadsDir, { recursive: true });
    }
  }

  async processImage(
    buffer: Buffer,
    filename: string,
    options: ImageUploadOptions = {},
  ): Promise<ProcessedImage[]> {
    await this.ensureUploadDir();

    const {
      quality = 85,
      maxWidth = 1200,
      maxHeight = 1200,
      formats = ["webp", "jpeg"],
    } = options;

    const baseName = path.parse(filename).name;
    const processedImages: ProcessedImage[] = [];

    // Get original image metadata
    const metadata = await sharp(buffer).metadata();

    for (const format of formats) {
      let pipeline = sharp(buffer);

      // Resize if needed
      if (metadata.width && metadata.height) {
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          pipeline = pipeline.resize(maxWidth, maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          });
        }
      }

      // Apply format-specific optimizations
      switch (format) {
        case "webp":
          pipeline = pipeline.webp({ quality, effort: 6 });
          break;
        case "jpeg":
          pipeline = pipeline.jpeg({ quality, progressive: true });
          break;
        case "png":
          pipeline = pipeline.png({ compressionLevel: 9 });
          break;
      }

      const processedBuffer = await pipeline.toBuffer();
      const processedMetadata = await sharp(processedBuffer).metadata();

      const outputFilename = `${baseName}-${Date.now()}.${format}`;
      const outputPath = path.join(this.uploadsDir, outputFilename);
      const publicUrl = `${this.publicDir}/${outputFilename}`;

      await writeFile(outputPath, processedBuffer);

      processedImages.push({
        url: publicUrl,
        width: processedMetadata.width || 0,
        height: processedMetadata.height || 0,
        size: processedBuffer.length,
        format,
      });
    }

    return processedImages;
  }

  generateThumbnail = async (
    buffer: Buffer,
    filename: string,
    size: number = 300,
  ): Promise<ProcessedImage> => {
    await this.ensureUploadDir();

    const baseName = path.parse(filename).name;
    const pipeline = sharp(buffer)
      .resize(size, size, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 80 });

    const processedBuffer = await pipeline.toBuffer();
    const metadata = await sharp(processedBuffer).metadata();

    const outputFilename = `${baseName}-thumb-${Date.now()}.webp`;
    const outputPath = path.join(this.uploadsDir, outputFilename);
    const publicUrl = `${this.publicDir}/${outputFilename}`;

    await writeFile(outputPath, processedBuffer);

    return {
      url: publicUrl,
      width: metadata.width || size,
      height: metadata.height || size,
      size: processedBuffer.length,
      format: "webp",
    };
  };
}

export const imageUploadService = new ImageUploadService();
