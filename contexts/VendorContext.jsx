'use client';

import configs from '@/configs';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const VendorContext = createContext();

export default function VendorProvider({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page')) || 1;

  const [vendorsData, setVendorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Update URL when currentPage changes
  useEffect(() => {
    router.push(`?page=${currentPage}`, undefined, { shallow: true });
    fetchVendors(currentPage);
  }, [currentPage]);

  async function fetchVendors(page = 1) {
    if (loading) return; // Prevent multiple fetches at the same time
    try {
      setLoading(true);
      const res = await fetch(
        `${configs.API_BASE_URL}/api/fetchvendors?page=${page}`
      );
      const json = await res.json();
      // console.log('data', json);
      if (json.success) {
        setVendorsData(json.data);
        setTotalPages(json.totalPages || 1);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (!searchQuery) {
      fetchVendors(currentPage);
    } else {
      const filtered = vendorsData.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.foodItems.some((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setVendorsData(filtered);
    }
  }
  const value = {
    // Add any state or functions you want to provide to the context
    vendorsData,
    setVendorsData,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    onSearch: handleSearch,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
}

export function useVendorContext() {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendorContext must be used within a VendorProvider');
  }
  return context;
}
