import { NextResponse } from 'next/server';
import { config, ConfigKeys } from '@/lib/config';

export async function GET() {
  try {
    // Check if settings exist
    const siteName = await config.get(ConfigKeys.SITE_NAME);
    const siteDescription = await config.get(ConfigKeys.SITE_DESCRIPTION);
    const currency = await config.get(ConfigKeys.CURRENCY);
    const timezone = await config.get('timezone');

    const exists = siteName !== null;

    return NextResponse.json({
      exists,
      settings: exists ? {
        siteName,
        siteDescription: siteDescription || '',
        currency: currency || 'INR',
        timezone: timezone || 'UTC',
      } : null,
    });
  } catch (error) {
    console.error('Check settings error:', error);
    return NextResponse.json(
      { exists: false, settings: null },
      { status: 200 }
    );
  }
}