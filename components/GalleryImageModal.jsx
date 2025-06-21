'use client';

import { galleryImages } from '@/constants';
import { useGalleryContext } from '@/contexts/GalleryContext';
import Image from 'next/image';

import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

export default function GalleryImageModal() {
  const { selectedIndex, closeModal, prevImage, nextImage } =
    useGalleryContext();

  return (
    <div>
      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
          <button
            onClick={closeModal}
            className='absolute top-6 right-6 bg-yellow-400 rounded-full p-3 text-white text-3xl z-50'>
            <FiX />
          </button>
          <button
            onClick={prevImage}
            className='absolute left-4 md:left-10 bg-yellow-400 rounded-full p-3 text-white text-3xl z-50'>
            <FiChevronLeft />
          </button>

          {/* Square Modal Image */}
          <div className='w-[90vw] h-[90vw] max-w-[600px] max-h-[600px]'>
            <Image
              src={galleryImages[selectedIndex]}
              alt={`Full view of Gallery Image ${selectedIndex + 1}`}
              className='w-full h-full object-cover rounded-xl shadow-xl'
              width={600}
              height={600}
            />
          </div>

          <button
            onClick={nextImage}
            className='absolute right-4 md:right-10 bg-yellow-400 rounded-full p-3 text-white text-3xl z-50'>
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
