'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus, FiX } from 'react-icons/fi';
import Vendor1 from '../../public/Gallery1.png';
import Vendor2 from '../../public/Gallery2.png';
import Vendor3 from '../../public/Gallery3.png';
import Vendor4 from '../../public/Gallery4.png';
import Vendor5 from '../../public/Gallery5.png';
import Vendor6 from '../../public/Gallery6.png';

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Images array for the gallery
  const images = [Vendor1, Vendor2, Vendor3, Vendor4, Vendor5, Vendor6];

  const closeModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const nextImage = () =>
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <main>
      <div className='bg-gray-100 mt-24 min-h-screen shadow-lg'>
        <div className='max-w-7xl mx-auto p-4'>
          <center>
            <h1 className='text-3xl mt-6 font-semibold text-[#22343DCC] font-Poppins'>
              YOUR <span className='text-[#3FA025]'>Gallery</span>
            </h1>
          </center>

          <div className='my-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {images.map((img, i) => (
              <div
                key={i}
                className='relative group cursor-pointer rounded-lg overflow-hidden'
                onClick={() => setSelectedIndex(i)}>
                <Image
                  src={img}
                  alt={`Gallery Image ${i + 1}`}
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
            ))}
          </div>
        </div>
      </div>

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
              src={images[selectedIndex]}
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
    </main>
  );
};

export default Gallery;
