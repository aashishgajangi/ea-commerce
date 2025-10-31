import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { cache, isRedisAvailable } from '@/lib/redis';

/**
 * GET /api/admin/cache
 * Get cache status and statistics
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAvailable = isRedisAvailable();
    
    // Get cache statistics if Redis is available
    let stats = null;
    if (isAvailable) {
      // Note: Redis client stats would need additional implementation
      // For now, we'll provide basic status
      stats = {
        connected: true,
        uptime: 'Connected',
        memory: 'Available'
      };
    }

    return NextResponse.json({
      redis: {
        available: isAvailable,
        status: isAvailable ? 'Connected' : 'Disconnected',
        stats
      },
      cacheTypes: [
        { key: 'settings:*', name: 'Settings Cache', description: 'Theme, general, and configuration settings' },
        { key: 'menus:*', name: 'Menu Cache', description: 'Navigation menus and menu items' },
        { key: 'search:*', name: 'Search Cache', description: 'Search results and suggestions' },
        { key: 'products:*', name: 'Product Cache', description: 'Product data and listings' },
        { key: 'pages:*', name: 'Pages Cache', description: 'Static pages and content' },
        { key: 'cart:*', name: 'Cart Cache', description: 'Shopping cart sessions' }
      ]
    });
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/cache
 * Clear cache (all or specific patterns)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const pattern = searchParams.get('pattern');

    if (!isRedisAvailable()) {
      return NextResponse.json(
        { error: 'Redis not available' },
        { status: 503 }
      );
    }

    if (pattern && pattern !== 'all') {
      // Clear specific pattern
      await cache.delPattern(pattern);
      return NextResponse.json({
        success: true,
        message: `Cleared cache for pattern: ${pattern}`
      });
    } else {
      // Clear all cache
      await cache.clear();
      return NextResponse.json({
        success: true,
        message: 'All cache cleared successfully'
      });
    }
  } catch (error) {
    console.error('Failed to clear cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
