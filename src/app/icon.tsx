import { ImageResponse } from 'next/og';
import { getAppearanceSettings } from '@/lib/settings';
import { db } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

// Image metadata for Next.js
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// This is a dynamic route that serves the favicon
export default async function Icon() {
  try {
    // Get the favicon from settings
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
          console.error('Failed to read favicon file:', error);
          // Fall through to default favicon
        }
      }
    }

    // Default fallback: Try to serve the static favicon.ico
    try {
      const defaultFavicon = path.join(process.cwd(), 'src/app/favicon.ico');
      const imageBuffer = await fs.readFile(defaultFavicon);
      
      return new Response(new Uint8Array(imageBuffer), {
        headers: {
          'Content-Type': 'image/x-icon',
          'Cache-Control': 'public, max-age=3600, must-revalidate',
        },
      });
    } catch {
      // If no static favicon, create a simple colored square
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 24,
              background: '#0070f3',
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
  } catch (error) {
    console.error('Error generating favicon:', error);
    
    // Fallback to a simple icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#0070f3',
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
