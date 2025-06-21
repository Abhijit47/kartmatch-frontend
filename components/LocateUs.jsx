'use client';

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

import { useLocateContext } from '@/contexts/LocateContext';
import { calculateDistance } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function LocateUs() {
  const {
    vendorData,
    isFiltersVisible,
    searchQuery,
    userLocation,
    onChangeSearchQuery,
    onFiltersVisible,
    radiusType,
    onChangeRadiusType,
    customRadius,
    onChangeCustomRadius,
    radiusInputValue,
    debouncedSearch,
    applyCustomRadiusInput,
    onChangeRadiusInputValue,
    onRadiusInputKeyPress,
  } = useLocateContext();

  return (
    <div>
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
              onChange={(e) => onChangeSearchQuery(e.target.value)}
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
            onClick={() => onFiltersVisible(!isFiltersVisible)}
            className='w-full text-[#FF5722] px-4 py-3 flex justify-between items-center text-sm font-semibold hover:text-black hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out bg-white bg-opacity-90 shadow-md'>
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
                    onChange={onChangeRadiusType}
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
                    onChangeCustomRadius(parseFloat(e.target.value))
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
                      onChange={(e) => onChangeRadiusInputValue(e.target.value)}
                      onBlur={() => applyCustomRadiusInput()}
                      onKeyDown={onRadiusInputKeyPress}
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
              key={vendor._id}
              className='bg-white flex flex-col md:flex-row items-center md:items-start p-4 rounded shadow-sm'>
              <Image
                src={vendor.photoUrl}
                alt={vendor.name}
                className='w-full sm:w-60 md:w-32 h-40 md:h-28 object-cover rounded'
                width={200}
                height={200}
              />
              <div className='flex flex-col md:flex-row justify-between w-full mt-5 md:mt-0 md:ml-4 gap-4'>
                <div className='flex-1'>
                  <h3 className='text-lg mt-1 font-bold'>{vendor.name}</h3>
                  <p className='mt-1 text-black'>
                    {vendor.foodItems.join(', ')}
                  </p>
                  <div className='flex flex-wrap gap-4 text-orange-600 mt-1 text-sm'>
                    <span className='flex items-center gap-1'>
                      <PiForkKnifeBold size={20} className='text-orange-500' />{' '}
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
  );
}
