import { NextRequest, NextResponse } from 'next/server';
import { config, ConfigKeys } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    // Check if setup is already complete
    const isComplete = await config.isSetupComplete();
    if (isComplete) {
      return NextResponse.json(
        { error: 'Setup already completed' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { siteName, siteDescription, currency, timezone } = body;

    // Validate input
    if (!siteName) {
      return NextResponse.json(
        { error: 'Site name is required' },
        { status: 400 }
      );
    }

    // Save settings
    await config.setMany({
      [ConfigKeys.SITE_NAME]: siteName,
      [ConfigKeys.SITE_DESCRIPTION]: siteDescription || '',
      [ConfigKeys.CURRENCY]: currency || 'USD',
      timezone: timezone || 'UTC',
    });

    return NextResponse.json({
      success: true,
      settings: {
        siteName,
        siteDescription,
        currency,
        timezone,
      },
    });
  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}