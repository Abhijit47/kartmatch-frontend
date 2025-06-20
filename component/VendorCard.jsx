'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiLocationArrow1 } from 'react-icons/ci';
import { FaHeart, FaHotel, FaRegHeart, FaRegStar } from 'react-icons/fa';
import { PiForkKnifeBold } from 'react-icons/pi';

const VendorCard = ({
  data = [],
  loading = false,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const [favoritedVendors, setFavoritedVendors] = useState([]); // To store all favorited vendor IDs
  const itemsPerPage = 9;

  // Get the current data to display based on the page
  const currentData = data.slice(0, itemsPerPage);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritedVendors(storedFavorites);
  }, []);

  const toggleFavorite = (vendor) => {
    let updatedFavorites = [...favoritedVendors];
    const vendorIndex = updatedFavorites.findIndex(
      (fav) => fav._id === vendor._id
    );

    if (vendorIndex === -1) {
      updatedFavorites.push(vendor);
      toast.success('Vendor added to favorites!');
    } else {
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav._id !== vendor._id
      );
      toast.error('Vendor removed from favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoritedVendors(updatedFavorites);
  };

  // If data is loading, show loading spinner
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-xl font-semibold text-gray-700'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Loading State */}
      {loading ? (
        <p className='my-10 text-lg font-semibold'>Loading vendors...</p>
      ) : (
        <div className='flex flex-wrap justify-center gap-14 mt-10 max-w-7xl'>
          {/* Vendor Cards */}
          {currentData.map((vendor) => {
            // Check if the vendor is favorited
            const isFavorited = favoritedVendors.some(
              (fav) => fav._id === vendor._id
            );
            return (
              <div
                key={vendor._id}
                className='w-80 bg-gray-100 shadow-lg rounded-xl p-4 relative'>
                <div className='relative w-full h-52 rounded-lg overflow-hidden'>
                  <Image
                    src={vendor.photoUrl}
                    alt={vendor.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                  <span className='absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg'>
                    {vendor.name}
                  </span>
                </div>

                <div className='mt-4'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>{vendor.name}</h2>
                    <button
                      className={`flex items-center justify-center gap-2 text-2xl ${
                        isFavorited
                          ? 'border-red-600 text-red-600'
                          : 'border-red-500 text-red-500'
                      } px-5 py-2 rounded-full hover:bg-red-50 transition`}
                      onClick={() => toggleFavorite(vendor)}>
                      {isFavorited ? (
                        <FaHeart className='fill-red-600' /> // filled heart look
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>

                  <div className='flex gap-3 text-md font-bold text-gray-800 mt-4'>
                    <span className='flex items-center gap-1'>
                      <PiForkKnifeBold size={22} className='text-orange-500' />{' '}
                      {parseInt(vendor?.tasteRating)} / 5
                    </span>
                    <span className='flex items-center gap-1'>
                      <FaRegStar size={22} className='text-yellow-500' />{' '}
                      {parseInt(vendor?.hygieneRating)} / 5
                    </span>
                    <span className='flex items-center gap-1'>
                      <FaHotel size={18} className='text-orange-400' />{' '}
                      {parseInt(vendor?.hospitalityRating)} / 5
                    </span>
                  </div>

                  <div className='mt-4 flex flex-wrap gap-1'>
                    {vendor.foodItems?.slice(0, 2).map((item, idx) => (
                      <span
                        key={idx}
                        className='bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full'>
                        {item}
                      </span>
                    ))}
                    {vendor.foodItems?.length > 2 && (
                      <span className='bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full'>
                        +{vendor.foodItems.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className='mt-6 flex justify-between'>
                    <Link href={`/locate/${vendor._id}`}>
                      <button className='px-4 py-2 border border-gray-900 font-bold rounded-lg text-sm'>
                        Details
                      </button>
                    </Link>
                    <button className='px-4 py-2 bg-[#3FA025] text-white rounded-lg text-sm flex items-center gap-2'>
                      <CiLocationArrow1 color='white' size={20} /> Locate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap'>
          <button
            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}>
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
            )
            .reduce((acc, page, idx, arr) => {
              if (idx > 0 && page - arr[idx - 1] > 1) acc.push('ellipsis');
              acc.push(page);
              return acc;
            }, [])
            .map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={idx} className='px-2 py-1'>
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(item)}
                  className={`px-3 py-2 rounded font-semibold ${
                    currentPage === item
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-black'
                  }`}>
                  {item}
                </button>
              )
            )}

          <button
            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorCard;
