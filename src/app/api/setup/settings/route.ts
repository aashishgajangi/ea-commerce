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

    // Validate required fields
    if (!siteName || siteName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Site name is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (siteName.trim().length > 100) {
      return NextResponse.json(
        { error: 'Site name must be 100 characters or less' },
        { status: 400 }
      );
    }

    // Validate optional fields
    if (siteDescription && siteDescription.length > 500) {
      return NextResponse.json(
        { error: 'Site description must be 500 characters or less' },
        { status: 400 }
      );
    }

    // Validate currency
    const validCurrencies = ['USD', 'EUR', 'GBP', 'INR'];
    const finalCurrency = currency || 'USD';
    if (!validCurrencies.includes(finalCurrency)) {
      return NextResponse.json(
        { error: `Currency must be one of: ${validCurrencies.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if settings already exist
    const existingSiteName = await config.get(ConfigKeys.SITE_NAME);
    const isUpdating = existingSiteName !== null;

    // Save or update settings
    await config.setMany({
      [ConfigKeys.SITE_NAME]: siteName.trim(),
      [ConfigKeys.SITE_DESCRIPTION]: siteDescription?.trim() || '',
      [ConfigKeys.CURRENCY]: finalCurrency,
      timezone: timezone || 'UTC',
    });

    return NextResponse.json({
      success: true,
      updated: isUpdating,
      message: isUpdating
        ? 'Settings updated successfully'
        : 'Settings created successfully',
      settings: {
        siteName: siteName.trim(),
        siteDescription: siteDescription?.trim() || '',
        currency: finalCurrency,
        timezone: timezone || 'UTC',
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