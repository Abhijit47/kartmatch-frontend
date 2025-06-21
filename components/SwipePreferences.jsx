'use client';

import { useSwipeContext } from '@/contexts/SwipeContext';
import { FaHotel } from 'react-icons/fa';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { PiForkKnifeBold } from 'react-icons/pi';

export default function SwipePreferences() {
  const { preferences, onPreferenceClick } = useSwipeContext();

  return (
    <div className={'flex flex-col space-y-6'}>
      <div className='flex flex-wrap justify-center gap-4 mt-10'>
        {['Taste', 'Hygiene', 'Hospitality'].map((pref) => {
          const isSelected = preferences.includes(pref);
          return (
            <button
              key={pref}
              onClick={() => onPreferenceClick(pref)}
              className={`px-6 py-2 rounded-3xl text-sm md:text-md flex items-center gap-2 drop-shadow-[0_4px_6px_rgba(255,56,74,0.5)] cursor-pointer 
${
  isSelected
    ? 'bg-white text-black hover:bg-[#FF384A] hover:text-white'
    : 'bg-gradient-to-r from-[#FF384A] to-[#FF5463] text-white hover:bg-white hover:text-black'
}`}>
              {pref === 'Taste' && <PiForkKnifeBold size={20} />}
              {pref === 'Hygiene' && <IoShieldCheckmarkOutline size={20} />}
              {pref === 'Hospitality' && <FaHotel size={20} />}
              {pref}
            </button>
          );
        })}
      </div>
      <p className='text-center text-sm md:text-base font-semibold'>
        Vendors will be sorted based on your preferences
      </p>
    </div>
  );
}
