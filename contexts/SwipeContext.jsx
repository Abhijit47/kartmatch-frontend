'use client';

import configs from '@/configs';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import NOT_AVAIL_IMAGE from '@/public/No_Image_Available.jpg'; // Adjust the path as necessary
import toast from 'react-hot-toast';

const SwipeContext = createContext();

export default function SwipeContextProvider({ children }) {
  const [vendors, setVendors] = useState([]);
  const [preferences, setPreferences] = useState([]); // Track preferences state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const swiperRef = useRef(null);
  const [favorites, setFavorites] = useState([]);
  const [currentVendorIndex, setCurrentVendorIndex] = useState(0);
  const [shuffledVendors, setShuffledVendors] = useState(vendors);
  const [cardImage, setCardImage] = useState(NOT_AVAIL_IMAGE);
  const [imageError, setImageError] = useState(false);

  async function fetchVendors() {
    setLoading(true); // Set loading to true when fetching
    try {
      const response = await fetch(
        `${configs.API_BASE_URL}/api/vendors/filter`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVendors(data.data);
        // console.log('Fetched vendors:', data.data);
        setCurrentIndex(0); // Reset index when new vendors arrive
      } else {
        console.error(
          'Failed to fetch vendors:',
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }

  function handlePreferenceClick(preference) {
    setPreferences((prev) => {
      if (prev.includes(preference)) {
        // Deselect preference if already selected
        return prev.filter((item) => item !== preference);
      } else if (prev.length < 2) {
        // Add preference if fewer than 2 are selected
        return [...prev, preference];
      } else {
        // If 2 preferences are already selected, do nothing
        return prev;
      }
    });
  }

  const handleSkip = () => {
    if (currentIndex < vendors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  function handleSwiperSkip() {
    swiperRef.current?.swiper?.slideNext();
  }

  function handleSave() {
    const swiper = swiperRef.current?.swiper;
    const currentIndex = swiper?.realIndex || 0;
    const vendor = vendors[currentIndex];
    if (!vendor) return;

    const alreadyExists = favorites.some((v) => v._id === vendor._id);
    if (alreadyExists) {
      toast.error('Vendor already in favorites!');
      return;
    }

    const newFavs = [...favorites, vendor];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
    toast.success('Vendor saved!');
    swiper.slideNext();
  }

  function handleShuffle() {
    const shuffled = [...shuffledVendors].sort(() => Math.random() - 0.5);
    setShuffledVendors(shuffled);
    setCurrentVendorIndex(0);
    swiperRef.current?.swiper?.slideTo(0);
    toast.success('Vendors shuffled!');
  }

  useEffect(() => {
    if (preferences.length === 2) {
      fetchVendors();
    }
  }, [preferences]);

  useEffect(() => {
    if (imageError) {
      setCardImage(NOT_AVAIL_IMAGE);
    }
  }, [imageError]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    setShuffledVendors(vendors);
  }, [vendors]);

  const values = {
    vendors,
    preferences,
    currentIndex,
    loading,
    onChangeVendors: setVendors,
    onChangePreferences: setPreferences,
    onChangeCurrentIndex: setCurrentIndex,
    onPreferenceClick: handlePreferenceClick,
    onHandleSkip: handleSkip,
    swiperRef,
    onHandleSwiperSkip: handleSwiperSkip,
    onSave: handleSave,
    favorites,
    onChangeFavorites: setFavorites,
    currentVendorIndex,
    onChangeCurrentVendorIndex: setCurrentVendorIndex,
    shuffledVendors,
    onChangeShuffledVendors: setShuffledVendors,
    cardImage,
    onChangeCardImage: setCardImage,
    imageError,
    onImageError: setImageError,
    onHandleShuffle: handleShuffle,
  };

  return (
    <SwipeContext.Provider value={values}>{children}</SwipeContext.Provider>
  );
}

export function useSwipeContext() {
  const context = useContext(SwipeContext);
  if (!context) {
    throw new Error('useSwipeContext must be used within a SwipeProvider');
  }
  return context;
}
