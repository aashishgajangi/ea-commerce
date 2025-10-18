import { ImageResponse } from 'next/og';
import { getAppearanceSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

// Image metadata for Apple devices
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// This serves the Apple touch icon (for iOS home screen)
export default async function AppleIcon() {
  try {
    // Get the favicon from settings (we'll use the same image for Apple icon)
    const appearance = await getAppearanceSettings();
    
    if (appearance.faviconId) {
      // Fetch the favicon media
      const media = await db.media.findUnique({
        where: { id: appearance.faviconId },
      });

      if (media) {
        // Read the actual image file
        const filePath = path.join(process.cwd(), 'public', media.path);
        
        try {
          const imageBuffer = await fs.readFile(filePath);
          
          // Return the actual image with proper content type
          return new Response(new Uint8Array(imageBuffer), {
            headers: {
              'Content-Type': media.mimeType,
              'Cache-Control': 'public, max-age=3600, must-revalidate',
            },
          });
        } catch (error) {
          console.error('Failed to read apple-icon file:', error);
          // Fall through to default
        }
      }
    }

    // Default fallback: Create a simple branded icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 120,
            background: 'linear-gradient(to bottom right, #0070f3, #00c9ff)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          E
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating apple-icon:', error);
    
    // Fallback to a simple icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 120,
            background: 'linear-gradient(to bottom right, #0070f3, #00c9ff)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          E
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
