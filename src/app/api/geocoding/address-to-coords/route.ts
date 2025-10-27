import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
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
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: 'No coordinates found for this address' },
        { status: 404 }
      );
    }

    const result = data.results[0];
    const location = result.geometry.location;
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
      latitude: location.lat,
      longitude: location.lng,
      address: result.formatted_address,
      placeId: result.place_id,
      city,
      state,
      postalCode,
      country,
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
