'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiLocationArrow1 } from 'react-icons/ci';
import { FaHeart, FaHotel, FaRegStar } from 'react-icons/fa';
import { PiForkKnifeBold } from 'react-icons/pi';

const FavouriteCard = () => {
  const [vendorsData, setVendorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  console.log('fav', vendorsData);
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);

        setVendorsData(parsedFavorites); // Set vendors data directly from favorites
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(vendorsData.length / itemsPerPage);

  const paginatedVendors = vendorsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRemoveFavourite = (vendorId) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const updatedFavorites = storedFavorites.filter(
      (fav) => fav._id !== vendorId
    );

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setVendorsData(updatedFavorites); // ✅ update UI
  };

  return (
    <div className='flex flex-col items-center'>
      {loading ? (
        <p className='my-10 text-lg font-semibold'>Loading favorites...</p>
      ) : vendorsData.length === 0 ? (
        <p className='my-10 text-lg font-semibold'>
          No favorite vendors found.
        </p>
      ) : (
        <>
          <div className='flex flex-wrap justify-center gap-14 mt-10 max-w-7xl bg-gray-100'>
            {paginatedVendors.map((vendor) => (
              <div
                key={vendor?._id || vendor.id}
                className='w-80 border bg-gray-100 border-none shadow-[6px_6px_10px_rgba(0,0,0,0.2)] rounded-xl p-4 relative'>
                <div className='relative w-full h-54 rounded-lg overflow-hidden'>
                  <Image
                    src={vendor?.photoUrl}
                    alt={vendor?.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                  <span className='absolute top-2 left-2 bg-white/40 backdrop-blur-sm text-red-500 text-sm font-bold px-3 py-1 rounded-lg'>
                    {vendor?.name?.length > 20
                      ? vendor.name.slice(0, 20) + '...'
                      : vendor?.name}
                  </span>
                </div>

                <div className='mt-4'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                      {vendor?.name?.length > 20
                        ? vendor.name.slice(0, 20) + '...'
                        : vendor?.name}
                    </h2>
                    {/* {console.log("Vendor data" , vendor?.data._id)} */}
                    <div
                      onClick={() => handleRemoveFavourite(vendor?._id)}
                      className='cursor-pointer'>
                      <FaHeart color='red' size='25' className='text-red-600' />
                    </div>
                  </div>

                  <div className='flex justify-start gap-3 text-md font-bold text-gray-800 mt-4'>
                    <span className='flex items-center'>
                      <PiForkKnifeBold size='25' className='text-orange-500' />{' '}
                      {parseInt(vendor?.tasteRating)}/5
                    </span>
                    <span className='flex items-center gap-1'>
                      <FaRegStar size='25' className='text-yellow-500' />{' '}
                      {parseInt(vendor?.hygieneRating)}/5
                    </span>
                    <span className='flex items-center gap-1'>
                      <FaHotel size='20' className='text-orange-400' />{' '}
                      {parseInt(vendor?.hospitalityRating)}/5
                    </span>
                  </div>

                  <div className='mt-4 flex flex-wrap gap-1'>
                    {vendor?.foodItems?.slice(0, 2).map((item, index) => (
                      <span
                        key={index}
                        className='bg-yellow-200 text-gray-800 px-2 py-1 text-xs rounded-full'>
                        {item}
                      </span>
                    ))}
                    {vendor?.foodItems?.length > 2 && (
                      <span className='bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full'>
                        +{vendor.foodItems.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className='mt-6 flex justify-between'>
                    <Link href={`/locate/${vendor._id}`}>
                      <button className='px-4 py-2 border cursor-pointer border-gray-900 font-bold rounded-lg text-sm'>
                        Details
                      </button>
                    </Link>
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
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap'>
            <button
              className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
              )
              .reduce((acc, page, i, array) => {
                if (i > 0 && page - array[i - 1] > 1) acc.push('ellipsis');
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
              onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavouriteCard;
