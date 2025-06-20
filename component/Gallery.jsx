import Image from 'next/image';
import Link from 'next/link';
import Gallery1 from '../public/Gallery1.png';
import Gallery2 from '../public/Gallery2.png';
import Gallery3 from '../public/Gallery3.png';
import Gallery4 from '../public/Gallery4.png';
import Gallery5 from '../public/Gallery5.png';
import Gallery6 from '../public/Gallery6.png';
const images = [Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6];

const Gallery = () => {
  return (
    <div className=' py-10 px-6  w-full'>
      {/* Title Section */}

      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl sm:text-2xl md:text-3xl font-bold text-gray-600'>
          FROM OUR USER <span className='text-green-600'>GALLERY</span>
        </h2>

        <Link href='/gallery'>
          <button className='bg-orange-500 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600'>
            View all →
          </button>
        </Link>
      </div>

      {/* Image Grid */}
      <div className='mt-10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {images.map((src, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-3xl shadow-lg w-full h-80 '>
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              width={250}
              height={250}
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
