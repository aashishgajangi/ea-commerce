import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    // Call Google Geocoding API (server-side for security)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: 'No address found for these coordinates' },
        { status: 404 }
      );
    }

    const result = data.results[0];
    const addressComponents = result.address_components || [];

    // Extract address components
    let city = '';
    let state = '';
    let postalCode = '';
    let country = '';

    addressComponents.forEach((component: { types: string[]; long_name: string }) => {
      const types = component.types;
      if (types.includes('locality')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
      if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
      if (types.includes('country')) {
        country = component.long_name;
      }
    });

    return NextResponse.json({
      address: result.formatted_address,
      placeId: result.place_id,
      city,
      state,
      postalCode,
      country,
      latitude: lat,
      longitude: lng,
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode coordinates' },
      { status: 500 }
    );
  }
}
