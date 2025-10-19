import { NextRequest, NextResponse } from 'next/server';
import { getSearchSuggestions } from '@/lib/search';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '5');

    // Validate query
    if (!query || query.trim().length < 2) {
      return NextResponse.json([]);
    }

    // Validate limit
    if (limit < 1 || limit > 20) {
      return NextResponse.json(
        { error: 'Invalid limit parameter' },
        { status: 400 }
      );
    }

    // Get suggestions
    const suggestions = await getSearchSuggestions(query, limit);

    return NextResponse.json(suggestions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Search suggestions API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}
