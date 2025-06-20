'use client';

import configs from '@/configs';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiLocationArrow1 } from 'react-icons/ci';
import {
  FaChevronDown,
  FaChevronUp,
  FaHotel,
  FaRegStar,
  FaSearchLocation,
} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { PiForkKnifeBold } from 'react-icons/pi';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const Location = () => {
  const [vendorData, setVendorData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusType, setRadiusType] = useState('5km');
  const [customRadius, setCustomRadius] = useState(20);
  const [radiusInputValue, setRadiusInputValue] = useState('20');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [appliedRadius, setAppliedRadius] = useState(5);
  const [mapInstance, setMapInstance] = useState(null);

  // Handle change of radius type
  const handleRadiusTypeChange = (e) => {
    const value = e.target.value;
    if (['5km', '10km', 'custom'].includes(value)) {
      setRadiusType(value);
    }
  };

  // Handle custom radius change
  const handleCustomRadiusChange = (value) => {
    setCustomRadius(value); // Make sure value is number
  };

  // Handle radius input change (for manual number input)
  const handleRadiusInputChange = (value) => {
    setRadiusInputValue(value); // Update the value of input
  };

  // Apply custom radius input
  const applyCustomRadiusInput = () => {
    const parsed = parseFloat(radiusInputValue);
    if (!isNaN(parsed)) {
      setCustomRadius(parsed);
    }
  };

  // Apply radius input on key press (Enter)
  const handleRadiusInputKeyPress = (e) => {
    // if (e.key === "Enter") {
    applyCustomRadiusInput();
    // }
  };

  // Fetch vendors nearby based on location
  const fetchVendors = async () => {
    if (!userLocation) return;
    const radius =
      radiusType === 'custom' ? customRadius : radiusType === '10km' ? 10 : 5;
    setAppliedRadius(radius);
    try {
      const response = await fetch(
        `${configs.API_BASE_URL}/api/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`
      );
      const data = await response.json();
      console.log('Data vendor', data);
      if (data.success) {
        setVendorData(data.data);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };
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
    if (!window.google && (userLocation || vendorData.length > 0)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;

      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else if (window.google && userLocation) {
      initializeMap();
    }
  }, [userLocation, vendorData]);

  // Initialize map with vendors
  const mapRef = useRef(null);

  const initializeMap = () => {
    const center = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    const map = new google.maps.Map(document.getElementById('vendor-map'), {
      center,
      zoom: 11,
    });

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
  };

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

  return (
    <main>
      <div className='bg-gray-100 mt-24 py-4 min-h-screen'>
        <div className='text-center mb-8 mt-4 px-4'>
          <h1 className='text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins'>
            VENDOR <span className='text-[#3FA025]'>MAP</span>
          </h1>
        </div>

        {/* This wraps the MAP only */}
        <div
          id='vendor-map'
          className='w-full h-full aspect-video md:aspect-[22/9] lg:aspect-[26/9] mb-8 relative z-0'></div>

        <div className='relative z-10 max-w-3xl mx-auto px-4'>
          {/* Search Bar + Button Row */}
          <div className='bg-white bg-opacity-90 shadow-md rounded-md p-4 flex flex-wrap gap-4 items-start sm:items-center'>
            {/* Search Input */}
            <div className='relative w-full sm:flex-1'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                <FaLocationDot color='red' size={20} />
              </span>
              <input
                type='text'
                placeholder='Search Vendors Or Food Items'
                className='w-full pl-10 p-3 rounded-md border border-gray-300 shadow-sm outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button
              onClick={() => debouncedSearch(searchQuery, vendorData)}
              className='bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-full sm:w-auto'>
              <FaSearchLocation />
              Find Street Food
            </button>
          </div>

          {/* Radius & Filters Button */}
          <div className='w-full mt-4'>
            <button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className='w-full text-[#FF5722] px-4 py-3 flex justify-between items-center text-sm font-semibold hover:text-black hover:bg-gray-200 rounded-md transition-colors duration-300 ease-in-out bg-white bg-opacity-90 shadow-md'>
              <span>Radius & Filters</span>
              {isFiltersVisible ? (
                <FaChevronUp size={16} />
              ) : (
                <FaChevronDown size={16} />
              )}
            </button>
          </div>

          {/* Filters Section */}
          {isFiltersVisible && (
            <div className='bg-white bg-opacity-90 shadow-md rounded-md mt-4 p-4 border-t border-gray-200'>
              <h3 className='text-sm font-semibold mb-3 text-gray-700'>
                Search Radius
              </h3>

              {/* Radius Radio Options */}
              <div className='flex flex-wrap gap-4 mb-4'>
                {['5km', '10km', 'custom'].map((value, i) => (
                  <div key={value} className='flex items-center space-x-2'>
                    <input
                      type='radio'
                      id={`r${i + 1}`}
                      name='radius'
                      value={value}
                      checked={radiusType === value}
                      onChange={handleRadiusTypeChange}
                      className='accent-orange-500'
                    />
                    <label
                      htmlFor={`r${i + 1}`}
                      className='text-sm text-gray-600 capitalize'>
                      {value}
                    </label>
                  </div>
                ))}
              </div>

              {/* Custom Radius Slider & Input */}
              {radiusType === 'custom' && (
                <div className='mb-4'>
                  {/* Slider with Range Labels */}
                  <div className='flex justify-between text-xs text-gray-400 mb-1'>
                    <span>1km</span>
                    <span>{customRadius}km</span>
                    <span>100km</span>
                  </div>
                  <input
                    type='range'
                    min='1'
                    max='100'
                    value={customRadius}
                    onChange={(e) =>
                      handleCustomRadiusChange(parseFloat(e.target.value))
                    }
                    className='w-full accent-orange-500'
                  />

                  {/* Exact Radius Number Input */}
                  <div className='flex flex-col gap-2 mt-4'>
                    <label
                      htmlFor='custom-radius'
                      className='text-xs font-medium text-gray-600'>
                      Set exact radius:
                    </label>
                    <div className='flex items-center rounded-md overflow-hidden border focus-within:ring-1 focus-within:ring-orange-500'>
                      <input
                        id='custom-radius'
                        type='number'
                        min='1'
                        max='1000'
                        step='0.1'
                        value={radiusInputValue}
                        onChange={(e) =>
                          handleRadiusInputChange(e.target.value)
                        }
                        onBlur={() => applyCustomRadiusInput()}
                        onKeyDown={handleRadiusInputKeyPress}
                        className='w-full py-1.5 px-2 text-sm focus:outline-none'
                      />
                      <div className='bg-gray-100 px-3 border-l text-sm text-gray-500'>
                        km
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Separate the search bar and controls */}

        <div className='flex flex-col sm:flex-row justify-between max-w-6xl mx-auto py-4 mt-4 px-4 gap-2 sm:gap-0'>
          <h2 className='text-lg font-semibold text-gray-700'>
            Nearby Vendors ({vendorData.length})
          </h2>
          <button className='bg-[#FF9534] text-white px-4 py-1 rounded-full shadow self-start sm:self-center'>
            {customRadius || radiusInputValue}km radius
          </button>
        </div>

        <div className='max-w-6xl mx-auto mt-6 space-y-4 px-4'>
          {vendorData.map((vendor) => {
            // Calculate distance from user to vendor
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              vendor.location.coordinates[1],
              vendor.location.coordinates[0]
            ).toFixed(2); // Distance in km (rounded to 2 decimals)

            return (
              <div
                key={vendor.id}
                className='bg-white flex flex-col md:flex-row items-center md:items-start p-4 rounded shadow-sm'>
                <img
                  src={vendor.photoUrl}
                  alt={vendor.name}
                  className='w-full sm:w-60 md:w-32 h-40 md:h-28 object-cover rounded'
                />
                <div className='flex flex-col md:flex-row justify-between w-full mt-5 md:mt-0 md:ml-4 gap-4'>
                  <div className='flex-1'>
                    <h3 className='text-lg mt-1 font-bold'>{vendor.name}</h3>
                    <p className='mt-1 text-black'>
                      {vendor.foodItems.join(', ')}
                    </p>
                    <div className='flex flex-wrap gap-4 text-orange-600 mt-1 text-sm'>
                      <span className='flex items-center gap-1'>
                        <PiForkKnifeBold
                          size={20}
                          className='text-orange-500'
                        />{' '}
                        {parseInt(vendor?.tasteRating)} / 5
                      </span>
                      <span className='flex items-center gap-1'>
                        <FaRegStar size={20} className='text-yellow-500' />{' '}
                        {parseInt(vendor?.hygieneRating)} / 5
                      </span>
                      <span className='flex items-center gap-1'>
                        <FaHotel size={18} className='text-orange-400' />{' '}
                        {parseInt(vendor?.hospitalityRating)} / 5
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col md:items-end gap-2'>
                    <span className='bg-[#FF9534] text-white text-sm px-3 py-1 rounded-full w-fit'>
                      {distance} km
                    </span>
                    <div className='flex flex-col sm:flex-row gap-2'>
                      <Link href={`/locate/${vendor._id}`}>
                        <button className='px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm'>
                          Details
                        </button>
                      </Link>
                      {/* <button
                        onClick={() => handleLocate(vendor.location.coordinates[1], vendor.location.coordinates[0])}
                        className="px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2 justify-center"
                      >
                        <CiLocationArrow1 size={20} />
                        Locate
                      </button> */}
                      <button
                        className='px-4 py-2 bg-[#3FA025] cursor-pointer text-white rounded-lg text-sm flex items-center gap-2'
                        onClick={() => {
                          const lat = vendor.location.coordinates[1];
                          const lng = vendor.location.coordinates[0];
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                            '_blank'
                          );
                        }}>
                        <CiLocationArrow1 color='white' size={20} /> Locate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Location;
