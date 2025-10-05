import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Check if setup is already complete
    const isComplete = await config.isSetupComplete();
    if (isComplete) {
      return NextResponse.json(
        { error: 'Setup already completed' },
        { status: 400 }
      );
    }

    // Verify that at least one admin user exists
    const adminCount = await db.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount === 0) {
      return NextResponse.json(
        { error: 'No admin user found. Please create an admin account first.' },
        { status: 400 }
      );
    }

    // Mark setup as complete
    await config.markSetupComplete();

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'SETUP_COMPLETE',
        metadata: JSON.stringify({
          timestamp: new Date().toISOString(),
          event: 'Setup wizard completed successfully',
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Setup completed successfully',
    });
  } catch (error) {
    console.error('Setup completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete setup' },
      { status: 500 }
    );
  }
}