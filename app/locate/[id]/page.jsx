'use client';

import configs from '@/configs';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import { MdOutlineCleanHands } from 'react-icons/md';
import { PiForkKnifeBold } from 'react-icons/pi';
import { RiTeamLine } from 'react-icons/ri';

// StarRating Component
const StarRating = ({ rating }) => {
  const parsedRating = parseFloat(rating) || 0; // parse "5 star" → 5
  const filledStars = Math.floor(parsedRating);
  const halfStar = parsedRating - filledStars >= 0.5;
  const totalStars = 5;

  return (
    <div className='flex gap-0.5 text-yellow-500'>
      {[...Array(filledStars)].map((_, i) => (
        <span key={i}>★</span>
      ))}
      {halfStar && <span>★</span>}
      {[...Array(totalStars - filledStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={i + 'empty'} className='text-gray-300'>
          ★
        </span>
      ))}
    </div>
  );
};

const VendorDetails = () => {
  const [vendor, setVendor] = useState(null);
  const [comment, setComment] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  const params = useParams(); // get the vendorId from URL
  const vendorId = params.id;

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch(
          `${configs.API_BASE_URL}/api/vendors/${vendorId}`
        );
        if (!res.ok) throw new Error('Failed to fetch vendor');
        const data = await res.json();
        setVendor(data); // assuming backend responds with { vendor: {...} }
      } catch (err) {
        console.error('Error fetching vendor:', err);
      }
    };

    if (vendorId) fetchVendor();
  }, [vendorId]);

  // Check if the vendor is already favorited
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const alreadyFavorited = storedFavorites.some(
      (fav) => fav._id === vendorId
    );
    setIsFavorited(alreadyFavorited);
  }, [vendorId]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      alert('Comment submitted: ' + comment);
      setComment('');
    }
  };

  const handleFavoriteClick = () => {
    if (!vendor) return;

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const alreadyFavorited = storedFavorites.some(
      (fav) => fav._id === vendorId
    );

    if (alreadyFavorited) {
      // Remove vendor from favorites
      const updatedFavorites = storedFavorites.filter(
        (fav) => fav._id !== vendorId
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
      toast.success('Vendor removed from favorites!');
    } else {
      // Add vendor to favorites
      storedFavorites.push(vendor.data);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      setIsFavorited(true);
      toast.success('Vendor added to favorites!');
    }
  };

  if (!vendor)
    return <div className='text-center py-20'>Loading vendor details...</div>;

  return (
    <main>
      <div className='bg-gray-100 px-4 py-6 sm:px-6 lg:px-8'>
        <center>
          <div className='rounded-xl max-w-4xl mx-auto mt-24 bg-gray-100'>
            <h2 className='text-3xl font-bold text-center mb-6'>
              <span className='text-gray-700'>VENDOR </span>
              <span className='text-green-600'>DETAILS</span>
            </h2>

            <img
              src={vendor.data.photoUrl}
              alt={vendor.data.name}
              className='w-94 h-64 object-cover rounded-md mb-6'
            />

            <h3 className='text-xl font-semibold text-center mb-2'>
              {vendor.data.name}
            </h3>

            <p className='flex justify-center items-center text-gray-600 mb-6 gap-2 text-xl font-bold sm:text-base'>
              <FaMapMarkerAlt size={20} className='text-red-500' />
              <span className='bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full'>
                {vendor.data.city}
              </span>

              {/* State Badge */}
              <span className='bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full'>
                {vendor.data.state}
              </span>
            </p>

            {/* Ratings */}
            <div className='flex flex-wrap justify-center gap-4 mb-6'>
              <div className='flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28'>
                <PiForkKnifeBold size={24} />
                <p className='text-xs mt-1'>Taste</p>
                <StarRating rating={parseInt(vendor?.data?.tasteRating)} />
              </div>
              <div className='flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28'>
                <MdOutlineCleanHands size={24} />
                <p className='text-xs mt-1'>Hygiene</p>
                <StarRating rating={parseInt(vendor?.data.hygieneRating)} />
              </div>
              <div className='flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow w-28'>
                <RiTeamLine size={24} />
                <p className='text-xs mt-1'>Hospitality</p>
                <StarRating rating={parseInt(vendor?.data.hospitalityRating)} />
              </div>
            </div>

            {/* Food Items */}
            <h4 className='text-lg font-semibold mb-3 text-center'>
              Food Items
            </h4>
            <div className='flex justify-center flex-wrap gap-2 mb-6'>
              {Array.isArray(vendor.data.foodItems) &&
                vendor.data.foodItems.flatMap((item) =>
                  item?.split('/').map((subItem, index) => (
                    <span
                      key={subItem + index}
                      className='bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm'>
                      {subItem.trim()}
                    </span>
                  ))
                )}
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-4 mb-6'>
              <button
                className={`flex items-center justify-center gap-2 border ${
                  isFavorited
                    ? 'border-red-600 text-red-600'
                    : 'border-red-500 text-red-500'
                } px-5 py-2 rounded-full hover:bg-red-50 transition`}
                onClick={handleFavoriteClick}>
                {isFavorited ? (
                  <FaHeart className='fill-red-600' />
                ) : (
                  <FaRegHeart />
                )}
                {isFavorited ? 'Favorited' : 'Add To Favorite'}
              </button>

              <button
                className='bg-green-600 flex items-center justify-center text-white px-5 py-2 rounded-full hover:bg-green-700 transition w-full sm:w-auto'
                onClick={() => {
                  const lat = vendor.location.coordinates[1];
                  const lng = vendor.location.coordinates[0];
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                    '_blank'
                  );
                }}>
                <FaMapMarkerAlt
                  size={20}
                  className='text-white mt-[3px] mr-2'
                />
                <span className='text-sm sm:text-base'>View On Map</span>
              </button>
            </div>

            {/* Comments */}
            <div>
              <label className='block font-medium mb-2 text-gray-700'>
                Comments
              </label>
              <textarea
                className='w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400'
                placeholder='Write your comments here...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className='mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition'
                onClick={handleCommentSubmit}>
                Add Comments
              </button>
            </div>
          </div>
        </center>
      </div>
    </main>
  );
};

export default VendorDetails;
