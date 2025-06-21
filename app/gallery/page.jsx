import GalleryCard from '@/components/GalleryCard';
import GalleryImageModal from '@/components/GalleryImageModal';
import { galleryImages } from '@/constants';
import GalleryContextProvider from '@/contexts/GalleryContext';

export default function Gallery() {
  return (
    <main>
      <GalleryContextProvider>
        <div className='bg-gray-100 mt-24 min-h-screen shadow-lg'>
          <div className='max-w-7xl mx-auto p-4'>
            <center>
              <h1 className='text-3xl mt-6 font-semibold text-[#22343DCC] font-Poppins'>
                YOUR <span className='text-[#3FA025]'>Gallery</span>
              </h1>
            </center>

            <div className='my-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {galleryImages.map((img, i) => (
                <GalleryCard key={i} img={img} idx={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Lightbox */}
        <GalleryImageModal />
      </GalleryContextProvider>
    </main>
  );
}
