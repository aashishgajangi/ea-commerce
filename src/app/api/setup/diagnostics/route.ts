import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/db';
import { isRedisAvailable, getRedisClient } from '@/lib/redis';
import { isFeatureEnabled } from '@/lib/env';
import fs from 'fs';
import path from 'path';

export interface DiagnosticResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

export interface DiagnosticsResponse {
  success: boolean;
  results: DiagnosticResult[];
  timestamp: string;
}

export async function GET() {
  try {
    const results: DiagnosticResult[] = [];

    // Test 1: Database Connection
    try {
      const dbConnected = await testDatabaseConnection();
      results.push({
        name: 'Database Connection',
        status: dbConnected ? 'pass' : 'fail',
        message: dbConnected 
          ? 'PostgreSQL connection successful' 
          : 'Failed to connect to PostgreSQL',
        details: dbConnected 
          ? 'Database is ready to use' 
          : 'Check DATABASE_URL in environment variables'
      });
    } catch (error) {
      results.push({
        name: 'Database Connection',
        status: 'fail',
        message: 'Database connection error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Redis Connection
    const redisAvailable = isRedisAvailable();
    const redisClient = getRedisClient();
    
    if (redisAvailable && redisClient) {
      try {
        await redisClient.ping();
        results.push({
          name: 'Redis Cache',
          status: 'pass',
          message: 'Redis connection successful',
          details: 'Caching is enabled for better performance'
        });
      } catch {
        results.push({
          name: 'Redis Cache',
          status: 'warning',
          message: 'Redis connection failed',
          details: 'Application will work but caching will be disabled'
        });
      }
    } else {
      results.push({
        name: 'Redis Cache',
        status: 'warning',
        message: 'Redis not configured',
        details: 'Optional: Add REDIS_URL for better performance'
      });
    }

    // Test 3: Environment Variables
    const criticalVars = [
      { key: 'DATABASE_URL', name: 'Database URL' },
    ];

    const recommendedVars = [
      { key: 'NEXTAUTH_SECRET', name: 'NextAuth Secret' },
      { key: 'NEXTAUTH_URL', name: 'NextAuth URL' },
    ];

    const missingCritical = criticalVars
      .filter(v => !process.env[v.key])
      .map(v => v.name);

    const missingRecommended = recommendedVars
      .filter(v => !process.env[v.key])
      .map(v => v.name);

    if (missingCritical.length > 0) {
      results.push({
        name: 'Environment Variables',
        status: 'fail',
        message: `Missing critical: ${missingCritical.join(', ')}`,
        details: 'These variables are required for the app to function'
      });
    } else if (missingRecommended.length > 0) {
      results.push({
        name: 'Environment Variables',
        status: 'warning',
        message: `Missing recommended: ${missingRecommended.join(', ')}`,
        details: 'Setup can continue, but these will be needed for authentication later'
      });
    } else {
      results.push({
        name: 'Environment Variables',
        status: 'pass',
        message: 'All variables configured',
        details: 'Environment configuration is complete'
      });
    }

    // Test 4: Optional Features
    const features = {
      email: isFeatureEnabled('email'),
      cloudStorage: isFeatureEnabled('cloudStorage'),
      stripe: isFeatureEnabled('stripe'),
    };

    const enabledFeatures = Object.entries(features)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name);

    results.push({
      name: 'Optional Features',
      status: 'pass',
      message: enabledFeatures.length > 0 
        ? `Enabled: ${enabledFeatures.join(', ')}`
        : 'No optional features enabled',
      details: 'Optional features can be configured later'
    });

    // Test 5: Node.js Version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    results.push({
      name: 'Node.js Version',
      status: majorVersion >= 18 ? 'pass' : 'warning',
      message: `Running Node.js ${nodeVersion}`,
      details: majorVersion >= 18 
        ? 'Node.js version is compatible'
        : 'Recommended: Node.js v18 or higher'
    });

    // Test 6: File System Write Access
    try {
      const testFile = path.join(process.cwd(), '.write-test');
      
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      
      results.push({
        name: 'File System',
        status: 'pass',
        message: 'Write access verified',
        details: 'Application can write files and uploads'
      });
    } catch {
      results.push({
        name: 'File System',
        status: 'warning',
        message: 'Limited write access',
        details: 'File uploads may not work properly'
      });
    }

    const allPassed = results.every(r => r.status === 'pass' || r.status === 'warning');
    const criticalFailed = results.some(r => 
      r.status === 'fail' && ['Database Connection', 'Environment Variables'].includes(r.name)
    );

    return NextResponse.json({
      success: allPassed && !criticalFailed,
      results,
      timestamp: new Date().toISOString()
    } as DiagnosticsResponse);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        results: [{
          name: 'System Check',
          status: 'fail',
          message: 'Failed to run diagnostics',
          details: error instanceof Error ? error.message : 'Unknown error'
        }],
        timestamp: new Date().toISOString()
      } as DiagnosticsResponse,
      { status: 500 }
    );
  }
}