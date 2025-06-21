'use client';

import { useVendorContext } from '@/contexts/VendorContext';
import { CiSearch } from 'react-icons/ci';
import { FaLocationDot } from 'react-icons/fa6';

export default function VendorSearch() {
  const { searchQuery, onSearch, setSearchQuery } = useVendorContext();

  return (
    <div className='flex flex-col sm:flex-row items-center gap-3 mt-10 bg-white rounded-md p-3 shadow-md w-full max-w-6xl mx-auto'>
      <div className='relative w-full flex-grow'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-red-500'>
          <FaLocationDot size={20} />
        </span>
        <input
          type='text'
          placeholder='Search for vendors'
          className='pl-10 pr-4 py-3 w-full text-sm rounded-md bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-[#3FA025]'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch();
          }}
        />
      </div>
      <button
        onClick={onSearch}
        className='bg-gradient-to-r from-[#FF7A7A] to-[#F71010] text-white px-6 py-3 rounded-md flex items-center gap-2 shadow-md hover:opacity-90 w-full sm:w-auto justify-center'>
        <CiSearch size={20} /> Search
      </button>
    </div>
  );
}
