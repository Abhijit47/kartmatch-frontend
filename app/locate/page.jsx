import { LazyLocateMap, LazyLocateUs } from '@/components';
import DynamicLoader from '@/components/DynamicLoader';
import LocateContextProvider from '@/contexts/LocateContext';
import { Suspense } from 'react';

export default function Location() {
  return (
    <main>
      <div className='bg-gray-100 mt-24 py-4 min-h-screen'>
        <div className='text-center mb-8 mt-4 px-4'>
          <h1 className='text-3xl sm:text-4xl font-semibold text-[#22343DCC] font-Poppins'>
            VENDOR <span className='text-[#3FA025]'>MAP</span>
          </h1>
        </div>

        {/* This wraps the MAP only */}
        <Suspense fallback={<DynamicLoader />}>
          <LazyLocateMap />
        </Suspense>

        <LocateContextProvider>
          <Suspense fallback={<DynamicLoader />}>
            <LazyLocateUs />
          </Suspense>
        </LocateContextProvider>
      </div>
    </main>
  );
}
