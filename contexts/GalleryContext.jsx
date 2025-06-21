'use client';

import { galleryImages } from '@/constants';
import { createContext, useContext, useState } from 'react';

const GalleryContext = createContext();

export default function GalleryContextProvider({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0
    );

  return (
    <GalleryContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        closeModal,
        prevImage,
        nextImage,
      }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGalleryContext() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
}
