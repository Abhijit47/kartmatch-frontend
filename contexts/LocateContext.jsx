'use client';

import configs from '@/configs';
import { debounce } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const LocateContext = createContext();

export default function LocateContextProvider({ children }) {
  const [vendorData, setVendorData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusType, setRadiusType] = useState('5km');
  const [customRadius, setCustomRadius] = useState(20);
  const [radiusInputValue, setRadiusInputValue] = useState('20');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [appliedRadius, setAppliedRadius] = useState(5);

  // Handle change of radius type
  function handleRadiusTypeChange(e) {
    const value = e.target.value;
    if (['5km', '10km', 'custom'].includes(value)) {
      setRadiusType(value);
    }
  }

  // Handle custom radius change
  function handleCustomRadiusChange(value) {
    setCustomRadius(value); // Make sure value is number
  }

  // Handle radius input change (for manual number input)
  function handleRadiusInputChange(value) {
    setRadiusInputValue(value); // Update the value of input
  }

  // Apply custom radius input
  function applyCustomRadiusInput() {
    const parsed = parseFloat(radiusInputValue);
    if (!isNaN(parsed)) {
      setCustomRadius(parsed);
    }
  }

  // Apply radius input on key press (Enter)
  function handleRadiusInputKeyPress(e) {
    // if (e.key === "Enter") {
    applyCustomRadiusInput();
    // }
  }

  // Fetch vendors nearby based on location
  async function fetchVendors() {
    if (!userLocation) return;
    const radius =
      radiusType === 'custom' ? customRadius : radiusType === '10km' ? 10 : 5;
    setAppliedRadius(radius);
    try {
      const response = await fetch(
        `${configs.API_BASE_URL}/api/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`
      );
      const data = await response.json();
      // console.log('Data vendor', data);
      if (data.success) {
        setVendorData(data.data);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  }
  const debouncedFetchVendors = useCallback(
    debounce(() => {
      fetchVendors();
    }, 500),
    [userLocation, radiusType, customRadius]
  );

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('User location set:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Fetch vendors once location is set
  // useEffect(() => {
  //        if (userLocation) {
  //         fetchVendors();
  //        }
  //     }, [radiusType, customRadius]);

  useEffect(() => {
    if (userLocation) {
      debouncedFetchVendors();
    }
  }, [radiusType, customRadius, debouncedFetchVendors]);

  // Load Google Maps
  useEffect(() => {
    // Check if document is ready and Google Maps is not loaded
    if (typeof window === 'undefined') return;

    if (window.google && (userLocation || vendorData.length > 0)) {
      initializeMap();
    }

    // if (!window.google && (userLocation || vendorData.length > 0)) {
    //   const script = document.createElement('script');
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;

    //   script.async = true;
    //   script.onload = initializeMap();
    //   document.body.appendChild(script);
    // } else if (window.google && userLocation) {
    //   initializeMap();
    // }
  }, [userLocation, vendorData]);

  // Initialize Google Map
  function initializeMap() {
    if (typeof window === 'undefined') return;

    const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    const map = new google.maps.Map(
      window.document.getElementById('vendor-map'),
      {
        center,
        zoom: 11,
      }
    );

    // User marker
    new google.maps.Marker({
      position: center,
      map,
      title: 'Your Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#0000FF',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
      },
    });

    // Radius circle only if appliedRadius exists
    if (appliedRadius) {
      new google.maps.Circle({
        strokeColor: '#3FA025',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3FA025',
        fillOpacity: 0.15,
        map,
        center,
        radius: appliedRadius * 1000,
      });
    }

    // Vendor markers (if any)
    if (vendorData.length > 0) {
      const infoWindow = new google.maps.InfoWindow();

      vendorData.forEach((vendor) => {
        const marker = new google.maps.Marker({
          position: {
            lat: vendor.location.coordinates[1],
            lng: vendor.location.coordinates[0],
          },
          map,
          title: vendor.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        });

        const contentString = `
          <div style="text-align: center; max-width: 200px;">
            <img src="${vendor.photoUrl}" alt="${vendor.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;" />
            <h3 style="margin-top: 8px; font-size: 16px; font-weight: bold;">${vendor.name}</h3>
          </div>
        `;

        marker.addListener('click', () => {
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      });
    }
  }

  useEffect(() => {
    if (userLocation && !appliedRadius) {
      setAppliedRadius(5); // default radius
    }
  }, [userLocation]);

  // Filter vendors based on search
  const debouncedSearch = useCallback(
    debounce((query, vendorList) => {
      if (!query) {
        fetchVendors();
      } else {
        const filtered = vendorList.filter(
          (vendor) =>
            vendor.name.toLowerCase().includes(query.toLowerCase()) ||
            vendor.foodItems.some((item) =>
              item.toLowerCase().includes(query.toLowerCase())
            )
        );
        setVendorData(filtered);
      }
    }, 300),
    [fetchVendors]
  );

  useEffect(() => {
    debouncedSearch(searchQuery, vendorData);
  }, [searchQuery]);

  const values = {
    vendorData,
    userLocation,
    searchQuery,
    onChangeSearchQuery: setSearchQuery,
    radiusType,
    customRadius,
    radiusInputValue,
    isFiltersVisible,
    onFiltersVisible: setIsFiltersVisible,
    appliedRadius,
    onAppliedRadius: setAppliedRadius,

    debouncedSearch,
    applyCustomRadiusInput,

    onChangeRadiusType: handleRadiusTypeChange,
    onChangeCustomRadius: handleCustomRadiusChange,
    onChangeRadiusInputValue: handleRadiusInputChange,
    onRadiusInputKeyPress: handleRadiusInputKeyPress,
  };

  return (
    <LocateContext.Provider value={values}>{children}</LocateContext.Provider>
  );
}

export function useLocateContext() {
  const context = useContext(LocateContext);
  if (!context) {
    throw new Error('useLocate must be used within a LocateContextProvider');
  }
  return context;
}
