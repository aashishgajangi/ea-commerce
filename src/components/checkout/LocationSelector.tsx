'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';

const libraries: ('places' | 'geometry')[] = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 28.6139, // Delhi
  lng: 77.2090,
};

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  placeId?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface LocationSelectorProps {
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: LocationData;
}

export default function LocationSelector({ onLocationSelect, initialLocation }: LocationSelectorProps) {
  const [location, setLocation] = useState(initialLocation ? {
    lat: initialLocation.latitude,
    lng: initialLocation.longitude
  } : defaultCenter);
  const [address, setAddress] = useState(initialLocation?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState(location);
  
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // Reverse geocode coordinates to address
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch('/api/geocoding/coords-to-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng }),
      });

      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();
      
      if (data.address) {
        setAddress(data.address);
        
        // Call parent callback with full location data
        onLocationSelect({
          latitude: lat,
          longitude: lng,
          address: data.address,
          placeId: data.placeId,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        });
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      setError('Failed to get address for this location');
    }
  }, [onLocationSelect]);

  // Get current GPS location
  const getCurrentLocation = () => {
    setLoading(true);
    setError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          
          setLocation(newLocation);
          setMapCenter(newLocation);
          setLoading(false);
          
          // Reverse geocode to get address
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          let errorMessage = 'Failed to get your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          
          setError(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation is not supported by your browser');
    }
  };

  // Handle marker drag
  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    
    if (lat && lng) {
      setLocation({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  // Handle autocomplete place selection
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newLocation = { lat, lng };
        
        setLocation(newLocation);
        setMapCenter(newLocation);
        setAddress(place.formatted_address || '');
        
        // Extract address components
        const addressComponents = place.address_components || [];
        let city = '';
        let state = '';
        let postalCode = '';
        let country = '';
        
        addressComponents.forEach((component) => {
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
        
        onLocationSelect({
          latitude: lat,
          longitude: lng,
          address: place.formatted_address || '',
          placeId: place.place_id,
          city,
          state,
          postalCode,
          country,
        });
      }
    }
  };

  // Load initial location
  useEffect(() => {
    if (initialLocation) {
      reverseGeocode(initialLocation.latitude, initialLocation.longitude);
    }
  }, [initialLocation, reverseGeocode]);

  if (loadError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading maps. Please check your API key.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* GPS Location Button */}
      <Button
        onClick={getCurrentLocation}
        disabled={loading}
        className="w-full sm:w-auto"
        variant="outline"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting location...
          </>
        ) : (
          <>
            <Navigation className="mr-2 h-4 w-4" />
            Use Current Location
          </>
        )}
      </Button>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Address Search (Google Places Autocomplete) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search Address</label>
        <Autocomplete
          onLoad={(autocomplete: google.maps.places.Autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={onPlaceChanged}
          options={{
            componentRestrictions: { country: 'in' }, // Restrict to India
            fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
          }}
        >
          <Input
            type="text"
            placeholder="Search for your address..."
            className="w-full"
          />
        </Autocomplete>
        <p className="text-xs text-gray-500">
          Start typing to search for an address
        </p>
      </div>

      {/* Google Map */}
      <Card>
        <CardContent className="p-0">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
            onLoad={(map: google.maps.Map) => {
              mapRef.current = map;
            }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              gestureHandling: 'greedy',
            }}
          >
            <Marker
              position={location}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
              animation={google.maps.Animation.DROP}
            />
          </GoogleMap>
        </CardContent>
      </Card>

      {/* Selected Address Display */}
      {address && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Delivery Address:</p>
                <p className="text-sm text-gray-600 mt-1">{address}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> You can drag the marker to adjust your exact delivery location
        </p>
      </div>
    </div>
  );
}
