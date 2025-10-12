import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getHomepageSettings, setHomepageSettings } from '@/lib/settings';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await getHomepageSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get homepage settings:', error);
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await request.json();
    await setHomepageSettings(settings);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save homepage settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}