'use client';

import { useGalleryContext } from '@/contexts/GalleryContext';
import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';

export default function GalleryCard({ img, idx }) {
  const { setSelectedIndex } = useGalleryContext();

  return (
    <div
      className='relative group cursor-pointer rounded-lg overflow-hidden'
      onClick={() => setSelectedIndex(idx)}>
      <Image
        src={img}
        alt={`Gallery Image ${idx + 1}`}
        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
        width={1300} // Larger width for images
        height={900} // Larger height for images
      />
      <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
        <div className='bg-yellow-500 rounded-full p-5 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <FiPlus size={25} className='text-white' />
        </div>
      </div>
    </div>
  );
}
